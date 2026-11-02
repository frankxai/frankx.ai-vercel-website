import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')

test('docs/design/products/DESIGN.md contract exists and locks Refero references + 16:9 SVG plates', () => {
  const designPath = path.join(root, 'docs/design/products/DESIGN.md')
  assert.equal(fs.existsSync(designPath), true, 'DESIGN.md must exist')
  const text = fs.readFileSync(designPath, 'utf8')
  for (const required of ['Warp', 'Linear Changelog', 'Cycle', '640x360', 'ProductFileInspector.tsx']) {
    assert.equal(text.includes(required), true, `DESIGN.md missing ${required}`)
  }
  assert.equal(text.includes('—'), false, 'DESIGN.md must contain zero em-dashes')
})

test('every product in data/products.json has mechanism-first copy, sentence-case badge, and a valid 640x360 SVG schematic plate', () => {
  const products = JSON.parse(fs.readFileSync(path.join(root, 'data/products.json'), 'utf8'))
  assert.equal(products.length >= 33, true)

  for (const p of products) {
    assert.ok(p.name && p.name.trim().length > 0, `${p.id}: missing name`)
    assert.ok(p.headline && p.headline.trim().length > 0, `${p.id}: missing headline`)
    assert.notEqual(p.headline.trim(), p.name.trim(), `${p.id}: headline must not repeat name`)
    assert.ok(p.summary && p.summary.trim().length > 0, `${p.id}: missing summary`)
    assert.equal(
      p.summary.includes('provides a substrate for builders in the'),
      false,
      `${p.id}: placeholder substrate summary must be replaced`,
    )
    assert.ok(Array.isArray(p.modules) && p.modules.length >= 1, `${p.id}: must list at least 1 module`)
    for (const m of p.modules) {
      assert.equal(
        m.description.startsWith('Implementation files for '),
        false,
        `${p.id}: boilerplate module description on ${m.title}`,
      )
    }

    if (p.badge) {
      const allowedAllCapsTokens = new Set(['PDF', 'UI', 'OSS', 'AI', 'OS', 'CLI', 'MCP', 'DPI'])
      const words = p.badge.split(/\s+/)
      const firstWord = words[0]
      if (!allowedAllCapsTokens.has(firstWord)) {
        assert.notEqual(
          p.badge,
          p.badge.toUpperCase(),
          `${p.id}: badge "${p.badge}" must use sentence case rather than ALL CAPS`,
        )
      }
    }

    const serialized = JSON.stringify(p)
    assert.equal(serialized.includes('—'), false, `${p.id}: must contain zero em-dashes`)
    assert.equal(
      serialized.toLowerCase().includes('passive income'),
      false,
      `${p.id}: must not publish passive income claims`,
    )

    const platePath = path.join(root, 'public/images/products/plates', `${p.slug}.svg`)
    assert.equal(fs.existsSync(platePath), true, `${p.slug}: missing SVG schematic plate`)
    const svg = fs.readFileSync(platePath, 'utf8')
    assert.match(svg, /viewBox="0 0 640 360"/, `${p.slug}: SVG plate must use 640x360 16:9 viewBox`)
    assert.match(svg, /<title id="title-/, `${p.slug}: SVG plate must include accessible <title>`)
    assert.equal(
      /&(?!(?:amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);)/.test(svg),
      false,
      `${p.slug}: SVG plate contains an unescaped XML ampersand (&)`,
    )
  }

  const arcanea = products.find((p) => p.id === 'arcanea-mythic-codex')
  assert.equal(arcanea?.brand, 'arcanea', 'arcanea-mythic-codex must carry brand="arcanea"')
})

test('products index enforces launch-list waitlist routing, application routing, and PreOrder JSON-LD gating', () => {
  const indexPage = fs.readFileSync(path.join(root, 'app/products/(index)/page.tsx'), 'utf8')
  assert.match(indexPage, /launch list/i, 'products index must recognize "Join the Launch List" as waitlist')
  assert.match(indexPage, /isApplication/, 'products index must preserve application CTAs rather than /checkout fallback')
  assert.match(indexPage, /LIVE_PUBLIC_SLUGS/, 'products index must gate InStock JSON-LD behind LIVE_PUBLIC_SLUGS')
  assert.equal(indexPage.includes('—'), false, 'products index must contain zero em-dashes')
})

test('ProductFileInspector and ProductsShell enforce accessible hit targets, tablist semantics, and zero em-dashes', () => {
  const inspector = fs.readFileSync(
    path.join(root, 'components/products/ProductFileInspector.tsx'),
    'utf8',
  )
  assert.match(inspector, /role="tablist"/)
  assert.match(inspector, /role="tabpanel"/)
  assert.match(inspector, /ArrowDown/)
  assert.match(inspector, /min-h-11/)
  assert.match(inspector, /focus-visible:ring-2/)
  assert.equal(inspector.includes('—'), false, 'ProductFileInspector must contain zero em-dashes')

  for (const rel of [
    'components/products/ProductsShell.tsx',
    'components/products/products-data.ts',
    'lib/products/preview-manifests.ts',
    'app/products/[slug]/page.tsx',
  ]) {
    const content = fs.readFileSync(path.join(root, rel), 'utf8')
    assert.equal(content.includes('—'), false, `${rel} must contain zero em-dashes`)
  }

  const shell = fs.readFileSync(path.join(root, 'components/products/ProductsShell.tsx'), 'utf8')
  assert.equal(shell.includes("tagline: ''"), false, 'ProductsShell Vibe OS tagline must not be empty')
})
