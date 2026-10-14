import assert from 'node:assert/strict'
import { access, readFile } from 'node:fs/promises'
import { execFileSync } from 'node:child_process'
import { test } from 'node:test'

const originalRevision = '2ddfe2f8c68632aaa250ca2469ca720844958364'
const layouts = [
  'app/layout.tsx',
  'app/books/layout.tsx',
  'app/golden-age/layout.tsx',
  'app/hoffnung/layout.tsx',
  'app/year-of-the-fire-horse/layout.tsx',
  'app/valentines-day/layout.tsx',
  'app/de/valentines-day/layout.tsx',
  'app/vibe/page.tsx',
]
const staticFamilies = {
  'cormorant-garamond': [['300', '400', '500', '600', '700'], true],
  'dancing-script': [['400', '500', '600', '700'], false],
  'dm-serif-display': [['400'], false],
  inter: [['300', '400', '500', '600', '700'], false],
  poppins: [['600', '700', '800'], false],
}
const variableFamilies = {
  'eb-garamond': { range: '400 800', italic: false },
  'jetbrains-mono': { range: '100 800', italic: false },
  lora: { range: '400 700', italic: true },
  outfit: { range: '100 900', italic: false },
  'playfair-display': { range: '400 900', italic: true },
}
const sampleCodePoints = ['Ä', 'Ö', 'Ü', 'ä', 'ö', 'ü', 'ß', 'Ā', 'Č', 'Ł', 'ő', 'Ț']

function scanCharset(files) {
  const charset = execFileSync('fc-scan', ['--format=%{charset}\n', ...files], { encoding: 'utf8' })
  return charset.trim().split(/\s+/).map((entry) => entry.split('-').map((value) => Number.parseInt(value, 16)))
}

function assertCoverage(family, files) {
  const ranges = scanCharset(files)
  for (const character of sampleCodePoints) {
    const codePoint = character.codePointAt(0)
    assert.ok(
      ranges.some(([start, end = start]) => codePoint >= start && codePoint <= end),
      `${family} lacks U+${codePoint.toString(16).toUpperCase()}`,
    )
  }
}

test('immutable original variable declarations have real bindings and consumers', async () => {
  const css = await readFile('app/local-fonts.css', 'utf8')
  const originalVariables = new Set()
  const consumedClasses = new Set()
  const currentSources = new Map(await Promise.all(layouts.map(async (file) => [file, await readFile(file, 'utf8')])))

  for (const file of layouts) {
    const original = execFileSync('git', ['show', `${originalRevision}:${file}`], { encoding: 'utf8' })
    for (const match of original.matchAll(/variable:\s*['"](--font-[\w-]+)['"]/g)) originalVariables.add(match[1])

    const current = currentSources.get(file)
    const bindings = new Map([...current.matchAll(/const\s+(\w+)\s*=\s*\{\s*variable:\s*['"](fx-font-var-[\w-]+)['"]\s*\}/g)].map((match) => [match[1], match[2]]))
    // A consumer in another route cannot stand in for this route's original binding.
    for (const declaration of original.matchAll(/const\s+(\w+)\s*=\s*[\w.]+\(\{([\s\S]*?)\}\)/g)) {
      const variable = declaration[2].match(/variable:\s*['"](--font-[\w-]+)['"]/)?.[1]
      if (!variable) continue
      const className = bindings.get(declaration[1])
      assert.ok(className, `${file} lacks its original ${declaration[1]} binding`)
      const definition = css.match(new RegExp(`\\.${className}\\s*\\{([^}]*)\\}`))?.[1]
      assert.ok(definition, `${file} has no CSS definition for ${className}`)
      const properties = Object.fromEntries([...definition.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)].map((match) => [match[1], match[2]]))
      assert.ok(Object.hasOwn(properties, variable), `${file} no longer supplies its original ${variable}`)
    }
    for (const [identifier, className] of bindings) {
      assert.match(current, new RegExp(`${identifier}\\.variable`), `${file} does not consume ${identifier}.variable`)
      consumedClasses.add(className)
      assert.match(css, new RegExp(`\\.${className}\\s*\\{[^}]*--font-[\\w-]+:`), `${className} has no CSS variable binding`)
    }
  }

  for (const variable of originalVariables) {
    const definitions = [...css.matchAll(new RegExp(`\\.(fx-font-var-[\\w-]+)\\s*\\{[^}]*${variable.replace('-', '\\-')}:`, 'g'))]
    assert.ok(definitions.length > 0, `${variable} from ${originalRevision} has no new binding`)
    assert.ok(definitions.some(([, className]) => consumedClasses.has(className)), `${variable} has no layout consumer`)
  }

  for (const className of css.matchAll(/\.(font-[\w-]+)\s*\{/g)) {
    assert.fail(`font variable binding collides with Tailwind utility namespace: ${className[1]}`)
  }
})

test('static Fontsource CSS keeps selected faces, licenses, and coverage', async () => {
  const manifest = JSON.parse(await readFile('package.json', 'utf8'))
  const localCss = await readFile('app/local-fonts.css', 'utf8')
  for (const [family, [weights, italic]] of Object.entries(staticFamilies)) {
    assert.equal(manifest.dependencies[`@fontsource/${family}`], '5.3.0')
    await access(`node_modules/@fontsource/${family}/LICENSE`)
    const unicode = JSON.parse(await readFile(`node_modules/@fontsource/${family}/unicode.json`, 'utf8'))
    assert.match(unicode.latin, /U\+0000-00FF/)
    assert.match(unicode['latin-ext'], /U\+0100/)
    for (const weight of weights) {
      assert.match(localCss, new RegExp(`@fontsource/${family}/${weight}\\.css`))
      if (italic) assert.match(localCss, new RegExp(`@fontsource/${family}/${weight}-italic\\.css`))
    }
    assertCoverage(family, ['latin', 'latin-ext'].map((subset) => `node_modules/@fontsource/${family}/files/${family}-${subset}-${weights[0]}-normal.woff2`))
  }
})

test('variable packages preserve continuous axes, subset CSS, binaries, and coverage', async () => {
  const manifest = JSON.parse(await readFile('package.json', 'utf8'))
  const localCss = await readFile('app/local-fonts.css', 'utf8')
  for (const [family, { range, italic }] of Object.entries(variableFamilies)) {
    assert.equal(manifest.dependencies[`@fontsource-variable/${family}`], '5.3.0')
    await access(`node_modules/@fontsource-variable/${family}/LICENSE`)
    const metadata = JSON.parse(await readFile(`node_modules/@fontsource-variable/${family}/metadata.json`, 'utf8'))
    assert.deepEqual([metadata.variable.wght.min, metadata.variable.wght.max].map(String), range.split(' '))
    const css = await readFile(`node_modules/@fontsource-variable/${family}/index.css`, 'utf8')
    assert.match(css, new RegExp(`font-weight: ${range};`))
    assert.match(css, new RegExp(`${family}-latin-ext-wght-normal\\.woff2`))
    assert.match(css, /unicode-range: U\+0100-02BA/)
    assert.match(localCss, new RegExp(`@fontsource-variable/${family}/index\\.css`))
    if (italic) assert.match(localCss, new RegExp(`@fontsource-variable/${family}/wght-italic\\.css`))

    const files = ['latin', 'latin-ext'].map((subset) => `node_modules/@fontsource-variable/${family}/files/${family}-${subset}-wght-normal.woff2`)
    for (const file of files) assert.equal((await readFile(file)).subarray(0, 4).toString('ascii'), 'wOF2')
    assertCoverage(family, files)
    const axes = execFileSync('fc-scan', ['--format=%{variable}', files[0]], { encoding: 'utf8' })
    assert.match(axes, /True/, `${family} WOFF2 has no variable axis`)
  }
})

test('fallback descriptors exactly match Next 16.4 packaged metrics', async () => {
  const css = await readFile('app/local-fonts.css', 'utf8')
  const { calculateSizeAdjustValues } = await import('next/dist/server/font-utils.js')
  const families = ['Inter', 'Poppins', 'Playfair Display', 'JetBrains Mono', 'Cormorant Garamond', 'Lora', 'Dancing Script', 'EB Garamond', 'DM Serif Display', 'Outfit']
  for (const family of families) {
    const key = family.toLowerCase().replaceAll(' ', '-')
    const metric = calculateSizeAdjustValues(family)
    const face = [...css.matchAll(/@font-face\s*\{([^}]*)\}/g)].map((match) =>
      Object.fromEntries([...match[1].matchAll(/([\w-]+)\s*:\s*([^;]+);/g)].map((property) => [property[1], property[2].trim()])),
    ).find((properties) => properties['font-family'] === `'FX ${key} Fallback'`)
    assert.ok(face, `${family} has no local metric fallback face`)
    for (const [property, expected] of Object.entries({
      src: `local('${metric.fallbackFont}')`,
      'ascent-override': `${metric.ascent}%`, 'descent-override': `${metric.descent}%`,
      'line-gap-override': `${metric.lineGap}%`, 'size-adjust': `${metric.sizeAdjust}%`,
    })) assert.equal(face[property], expected, `${family} ${property}`)
    assert.match(css, new RegExp(`--font-[\\w-]+:[^;]*'FX ${key} Fallback'`))
  }
})

test('affected font plumbing has no build-time Google dependency or eager local preload', async () => {
  const source = await readFile('app/layout.tsx', 'utf8')
  assert.match(source, /import '\.\/local-fonts\.css'/)
  assert.doesNotMatch(source, /next\/font\/google|next\/font\/local/)
  assert.doesNotMatch(await readFile('app/local-fonts.css', 'utf8'), /rel=["']preload/i)
})
