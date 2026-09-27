import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const read = (path) => readFile(new URL(`../../${path}`, import.meta.url), 'utf8')

test('owned entry points do not promote an unreviewed Vibe OS music guide', async () => {
  const files = await Promise.all([
    read('app/products/(index)/page.tsx'),
    read('components/products/ProductsShell.tsx'),
    read('components/products/products-data.ts'),
    read('components/NavigationMega.tsx'),
    read('components/MobileNavOverlay.tsx'),
    read('components/music-lab/MusicLabShell.tsx'),
  ])

  for (const source of files) {
    assert.doesNotMatch(source, /\/pdf-templates\/vibe-os-guide\.html/)
    assert.doesNotMatch(source, /\/downloads\/preview\/vibe-os/)
    assert.doesNotMatch(source, /\/products\/Vibe-OS-Guide\.pdf/)
    assert.doesNotMatch(source, /Vibe OS music guide/)
    assert.doesNotMatch(source, /AI music creation method/)
  }
})

test('product entry points retain only the workspace concept', async () => {
  const files = await Promise.all([
    read('app/products/(index)/page.tsx'),
    read('components/products/ProductsShell.tsx'),
    read('components/products/products-data.ts'),
  ])

  for (const source of files) {
    assert.match(source, /Vibe OS creative-state workspace/)
    assert.match(source, /href: '\/products\/vibe-os'/)
  }
})

test('music navigation retains Music Lab without a Vibe OS guide item', async () => {
  const files = await Promise.all([
    read('components/NavigationMega.tsx'),
    read('components/MobileNavOverlay.tsx'),
  ])

  for (const source of files) {
    assert.match(source, /name: 'Music Lab', href: '\/music-lab'/)
  }
})

test('workspace registry describes a concept without delivery claims', async () => {
  const products = JSON.parse(await read('data/products.json'))
  const workspace = products.find((product) => product.id === 'vibe-os')

  assert.equal(workspace.badge, 'CONCEPT')
  assert.equal(workspace.offer, undefined)
  assert.equal(workspace.delivery, undefined)
  assert.equal(workspace.bonuses, undefined)
  assert.equal(workspace.socialProof.stats.length, 0)
  assert.match(workspace.summary, /unreleased creative-state workspace concept/i)
  assert.doesNotMatch(
    JSON.stringify(workspace),
    /Pre-built workflows|FREE TOOL|Always Free|Active Development|music guide/,
  )
})
