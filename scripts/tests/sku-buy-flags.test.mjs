import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { SKU_BUY_FLAGS, checkoutHrefFor, isBuyEnabled } from '../../lib/commerce/sku-buy-flags.ts'

/**
 * Buying sits behind one per-SKU flag in lib/commerce/sku-buy-flags.ts.
 * These tests pin three things: every priced SKU has a flag, every flag ships
 * off, and every buy surface (product pages, /checkout/<slug>, POST
 * /api/checkout) reads the flag before it links to or calls a provider.
 */

const ROOT = process.cwd()
const read = (path) => readFileSync(join(ROOT, path), 'utf8')
const catalog = JSON.parse(read('data/products.json'))

function stripeRouteSkus() {
  const source = read('app/api/checkout/route.ts')
  const map = source.slice(source.indexOf('const PRODUCTS'), source.indexOf('export async function POST'))
  return [...map.matchAll(/^\s*'([^']+)':\s*\{/gm)].map((m) => m[1])
}

const pricedProducts = catalog.filter((p) => (p.offer?.primaryPrice ?? p.price ?? 0) > 0)

test('the 15 priced catalog SKUs and every Stripe route SKU have a buy flag', () => {
  assert.equal(pricedProducts.length, 15, 'priced SKU count changed: add or remove its flag entry')
  const missing = [...pricedProducts.map((p) => p.id), ...stripeRouteSkus()].filter(
    (id) => !Object.prototype.hasOwnProperty.call(SKU_BUY_FLAGS, id)
  )
  assert.deepEqual(missing, [])
})

test('every buy flag ships off, so nothing goes live without a reviewed flip', () => {
  const on = Object.entries(SKU_BUY_FLAGS)
    .filter(([, flag]) => flag.buyEnabled)
    .map(([id]) => id)
  assert.deepEqual(on, [], 'flipping a flag is Frank’s call; update this test in the same reviewed change')
})

test('flag keys are real catalog ids', () => {
  const ids = new Set(catalog.map((p) => p.id))
  assert.deepEqual(Object.keys(SKU_BUY_FLAGS).filter((id) => !ids.has(id)), [])
})

test('default state: every priced product keeps the waitlist CTA', () => {
  for (const product of pricedProducts) {
    assert.equal(checkoutHrefFor(product), null, product.id)
  }
})

test('flag on: a priced product links to its own /checkout/<slug> route', () => {
  const product = catalog.find((p) => p.id === 'system-architect-starter-kit')
  const flags = { ...SKU_BUY_FLAGS, [product.id]: { ...SKU_BUY_FLAGS[product.id], buyEnabled: true } }
  assert.equal(checkoutHrefFor(product, flags), '/checkout/starter-kit')
  assert.equal(isBuyEnabled(product.id, flags), true)
  // Other products are untouched by one flip.
  const other = catalog.find((p) => p.id === 'command-center-template')
  assert.equal(checkoutHrefFor(other, flags), null)
})

test('flag on never opens checkout for a free product', () => {
  const free = catalog.find((p) => p.id === 'agentic-creator-os')
  const flags = { [free.id]: { buyEnabled: true, delivery: 'in-repo', note: '' } }
  assert.equal(checkoutHrefFor(free, flags), null)
})

test('unknown and prototype ids are gated', () => {
  for (const id of ['nope', '__proto__', 'constructor', 'toString', '']) {
    assert.equal(isBuyEnabled(id), false, id)
  }
})

test('every buy surface reads the flag', () => {
  assert.match(read('app/products/[slug]/page.tsx'), /checkoutHrefFor\(product\)/)
  assert.match(read('app/products/(index)/page.tsx'), /checkoutHrefFor\(p\)/)
  for (const slug of ['creative-ai-toolkit', 'creation-chronicles', 'suno-prompt-library', 'visual-creation-loop']) {
    const source = read(`app/products/${slug}/page.tsx`)
    assert.match(source, /checkoutHrefFor\(product\)/, slug)
    assert.match(source, /checkoutHref=\{checkoutHref\}/, slug)
  }
  assert.match(read('app/checkout/[slug]/page.tsx'), /isBuyEnabled\(product\.id\) \? getLiveCheckoutUrl/)

  // The Stripe route refuses before it reads the secret key or calls Stripe.
  const route = read('app/api/checkout/route.ts')
  const gate = route.indexOf('if (!isBuyEnabled(productId))')
  assert.ok(gate > 0, 'checkout route must check the buy flag')
  assert.ok(gate < route.indexOf('if (!STRIPE_SECRET_KEY)'), 'flag check must run before the key check')
  assert.ok(gate < route.indexOf("fetch('https://api.stripe.com"), 'flag check must run before the Stripe call')
})
