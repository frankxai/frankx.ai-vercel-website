import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'

test('Creation Chronicles and waitlist-tiered products do not route /products primary CTA to dead /checkout/* routes', () => {
  const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'))
  const cc = products.find((p) => p.id === 'creation-chronicles')
  assert.ok(cc, 'creation-chronicles must exist in data/products.json')
  assert.equal(cc.offer.ctaPrimaryHref, '/waitlist?intent=creation-chronicles')
  assert.match(cc.offer.ctaPrimary, /waitlist/i)

  const indexPage = fs.readFileSync('app/products/(index)/page.tsx', 'utf8')
  assert.ok(indexPage.includes('allTiersWaitlist'), 'app/products/(index)/page.tsx must check allTiersWaitlist')
})

test('lib/qualities.ts does not link to non-existent /research/meaning-os route', () => {
  const qualities = fs.readFileSync('lib/qualities.ts', 'utf8')
  assert.ok(!qualities.includes("'/research/meaning-os'"), 'lib/qualities.ts must not link to 404 /research/meaning-os')
  assert.ok(qualities.includes("'/research/series/architecture-of-intelligence'"))
})
