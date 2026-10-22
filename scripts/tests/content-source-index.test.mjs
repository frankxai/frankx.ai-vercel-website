import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { buildContentIndex } from '../generate-content-index.mjs'

function fixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'content-source-index-'))
  fs.mkdirSync(path.join(root, 'content/blog/_drafts'), { recursive: true })
  fs.mkdirSync(path.join(root, 'data'))
  const product = { id: 'product-keep', type: 'product', href: '/products/keep', custom: 'preserve' }
  fs.writeFileSync(path.join(root, 'data/content-index.json'), JSON.stringify({ version: '1.0', entries: [product, { id: 'stable-id', type: 'blog', slug: 'visible', streams: ['technical'] }, { id: 'withdrawn', type: 'blog', slug: 'removed' }] }))
  const article = '---\ntitle: "A: quoted title"\ndescription: A useful description\ndate: "2026-10-20"\ntags: [coding, founders]\n---\nAn original example.\n'
  for (const name of ['visible.mdx', '01-ai-doesnt-have-to-be-soulless.mdx', '_drafts/private.mdx']) fs.writeFileSync(path.join(root, 'content/blog', name), article)
  fs.writeFileSync(path.join(root, 'content/blog/unsupported.md'), article)
  return { root, product }
}

test('canonical root MDX only; withdrawn records drop; other owners and IDs survive', t => {
  const { root, product } = fixture(); t.after(() => fs.rmSync(root, { recursive: true, force: true }))
  const result = buildContentIndex(root, '2026-10-22T00:00:00Z')
  assert.deepEqual(result.entries.map(x => x.id), ['stable-id', 'product-keep'])
  assert.deepEqual(result.entries[1], product)
  assert.equal(result.entries[0].title, 'A: quoted title')
  assert.deepEqual(result.entries[0].streams, ['technical'])
  assert.equal(result.stats.blog, 1)
  assert.equal(result.stats.total, 2)
  assert.equal(result.provenance.publicationVerified, false)
  assert.equal(result.provenance.indexingVerified, false)
})
test('fixed source and timestamp give a deterministic complete inventory', t => {
  const { root } = fixture(); t.after(() => fs.rmSync(root, { recursive: true, force: true }))
  assert.deepEqual(buildContentIndex(root, '2026-10-22T00:00:00Z'), buildContentIndex(root, '2026-10-22T00:00:00Z'))
})
test('incomplete source fails without replacing the last good index', t => {
  const { root } = fixture(); t.after(() => fs.rmSync(root, { recursive: true, force: true }))
  const target = path.join(root, 'data/content-index.json'); const before = fs.readFileSync(target, 'utf8')
  fs.writeFileSync(path.join(root, 'content/blog/broken.mdx'), '---\ntitle: Missing date\n---\n')
  assert.throws(() => buildContentIndex(root), /Missing source metadata: broken/)
  assert.equal(fs.readFileSync(target, 'utf8'), before)
})
