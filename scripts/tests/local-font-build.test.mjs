import assert from 'node:assert/strict'
import { access, readFile } from 'node:fs/promises'
import { execFileSync } from 'node:child_process'
import { test } from 'node:test'

const families = {
  'cormorant-garamond': [['300', '400', '500', '600', '700'], true],
  'dancing-script': [['400', '500', '600', '700'], false],
  'dm-serif-display': [['400'], false],
  'eb-garamond': [['400', '500', '600', '700', '800'], false],
  inter: [['300', '400', '500', '600', '700'], false],
  'jetbrains-mono': [['100', '200', '300', '400', '500', '600', '700', '800'], false],
  lora: [['400', '500', '600', '700'], true],
  outfit: [['100', '200', '300', '400', '500', '600', '700', '800', '900'], false],
  'playfair-display': [['400', '500', '600', '700', '800', '900'], true],
  poppins: [['600', '700', '800'], false],
}

const sampleCodePoints = ['Ä', 'Ö', 'Ü', 'ä', 'ö', 'ü', 'ß', 'Ā', 'Č', 'Ł', 'ő', 'Ț']

test('Fontsource CSS keeps real subset ranges and selected faces', async () => {
  const manifest = JSON.parse(await readFile('package.json', 'utf8'))
  const localCss = await readFile('app/local-fonts.css', 'utf8')

  for (const [family, [weights, italic]] of Object.entries(families)) {
    assert.equal(manifest.dependencies[`@fontsource/${family}`], '5.3.0')
    await access(`node_modules/@fontsource/${family}/LICENSE`)
    const unicode = JSON.parse(await readFile(`node_modules/@fontsource/${family}/unicode.json`, 'utf8'))
    assert.match(unicode.latin, /U\+0000-00FF/)
    assert.match(unicode['latin-ext'], /U\+0100/)

    for (const weight of weights) {
      assert.match(localCss, new RegExp(`@fontsource/${family}/${weight}\\.css`))
      if (italic) assert.match(localCss, new RegExp(`@fontsource/${family}/${weight}-italic\\.css`))
      for (const subset of ['latin', 'latin-ext']) {
        const normal = `node_modules/@fontsource/${family}/files/${family}-${subset}-${weight}-normal.woff2`
        await access(normal)
        assert.equal((await readFile(normal)).subarray(0, 4).toString('ascii'), 'wOF2')
        if (italic) await access(`node_modules/@fontsource/${family}/files/${family}-${subset}-${weight}-italic.woff2`)
      }
    }
  }
})

test('installed Latin and Latin-ext binaries contain German and extended samples', () => {
  for (const family of Object.keys(families)) {
    const files = ['latin', 'latin-ext'].map(
      (subset) => `node_modules/@fontsource/${family}/files/${family}-${subset}-${families[family][0][0]}-normal.woff2`,
    )
    const charset = execFileSync('fc-scan', ['--format=%{charset}', ...files], { encoding: 'utf8' })
    const ranges = charset.trim().split(/\s+/).map((entry) => entry.split('-').map((value) => Number.parseInt(value, 16)))
    for (const character of sampleCodePoints) {
      const codePoint = character.codePointAt(0)
      assert.ok(
        ranges.some(([start, end = start]) => codePoint >= start && codePoint <= end),
        `${family} lacks U+${codePoint.toString(16).toUpperCase()}`,
      )
    }
  }
})

test('affected font plumbing has no build-time Google dependency or eager local preload', async () => {
  const source = await readFile('app/layout.tsx', 'utf8')
  assert.match(source, /import '\.\/local-fonts\.css'/)
  assert.doesNotMatch(source, /next\/font\/google|next\/font\/local/)
  const css = await readFile('app/local-fonts.css', 'utf8')
  assert.match(css, /Fontsource CSS preserves each upstream subset's unicode-range/)
  assert.doesNotMatch(css, /rel=[\"']preload/i)
  const upstreamCss = await readFile('node_modules/@fontsource/eb-garamond/400.css', 'utf8')
  assert.match(upstreamCss, /eb-garamond-latin-ext-400-normal/)
  assert.match(upstreamCss, /unicode-range: U\+0100-02BA/)
})
