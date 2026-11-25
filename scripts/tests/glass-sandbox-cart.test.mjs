import test from 'node:test'
import assert from 'node:assert/strict'
import { randomBytes } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { registerHooks } from 'node:module'

registerHooks({ resolve(specifier, context, next) {
  if (specifier === './glass-edition' || specifier === '../product-fulfillment') return next(specifier + '.ts', context)
  return next(specifier, context)
} })
const { prepareGlassSandboxCart } = await import('../../lib/commerce/glass-sandbox-cart.ts')
const { glassPublicManifest } = await import('../../lib/commerce/glass-edition.ts')
const products = JSON.parse(readFileSync(new URL('../../data/products.json', import.meta.url)))
const manifest = glassPublicManifest(products)
const item = { productId: manifest.product.id, edition: manifest.product.edition, quantity: 1 }
const request = { schema: 'starlight.glass.cart-request.v1', item }
const denied = { ok: false, reason: 'cart-unavailable' }
function decision() {
  return { purpose: 'prepare-nonbinding-test-cart', actor: 'human', mode: 'test', channel: 'frankx-owned-web-sandbox',
    scope: 'personal', subjectId: 'alice', tenantId: 'alice', nonce: randomBytes(32).toString('hex'),
    acceptedAt: new Date(Date.now() - 1000).toISOString(), expiresAt: new Date(Date.now() + 60_000).toISOString(),
    ...item, artifactSha256: manifest.assets[0].sha256, draftTermsSha256: manifest.license.draft.sha256,
    amountMinor: manifest.commerce.priceHypothesis.amountMinor, currency: manifest.commerce.priceHypothesis.currency }
}
test('one server-authorized test selection produces a reusable, non-payable, non-secret reference', () => {
  const approved = decision()
  const result = prepareGlassSandboxCart(request, { products, decision: approved })
  assert.equal(result.ok, true)
  assert.deepEqual(result.item, item)
  assert.deepEqual(result.proposedSubtotal, { amountMinor: 7900, currency: 'EUR' })
  assert.equal(result.payableTotal, null)
  assert.equal(result.tax, null)
  assert.equal(result.terms.operativeGrant, null)
  assert.equal(result.checkoutAuthorized, false)
  assert.match(result.reference, /^[A-Za-z0-9_-]{43}$/)
  assert.deepEqual(prepareGlassSandboxCart(request, { products, decision: { ...approved } }), result)
  const other = prepareGlassSandboxCart(request, { products, decision: { ...approved, subjectId: 'bob', tenantId: 'bob' } })
  assert.notEqual(other.reference, result.reference)
  assert.ok(!JSON.stringify(result).includes(approved.nonce))
  assert.doesNotMatch(JSON.stringify(result), /alice|stripe|checkout\.com|cs_test|price_/)
})
test('paid, third-party, plugin, anonymous, expired and mismatched decisions never prepare a cart', () => {
  const approved = decision()
  for (const patch of [
    { mode: 'live' }, { purpose: 'checkout' }, { channel: 'chatgpt-plugin' }, { channel: 'unknown' },
    { channel: 'remote-mcp' }, { actor: 'agent' }, { tenantId: 'bob' }, { scope: 'organization' },
    { amountMinor: 7800 }, { currency: 'USD' }, { quantity: 2 }, { productId: 'other' },
    { draftTermsSha256: 'b'.repeat(64) }, { artifactSha256: 'c'.repeat(64) }, { nonce: 'short' },
    { expiresAt: new Date(0).toISOString() }, { acceptedAt: new Date(Date.now() + 60_000).toISOString() },
    { expiresAt: new Date(Date.now() + 16 * 60_000).toISOString() },
  ]) assert.deepEqual(prepareGlassSandboxCart(request, { products, decision: { ...approved, ...patch } }), denied)
  assert.deepEqual(prepareGlassSandboxCart(request, { products, decision: null }), denied)
  assert.deepEqual(prepareGlassSandboxCart(request, { products: [], decision: approved }), denied)
})
test('client cannot assign identity, channel, pricing, a second item, consent or checkout authority', () => {
  const host = { products, decision: decision() }
  for (const patch of [{ channel: 'frankx-owned-web-sandbox' }, { subjectId: 'alice' }, { decision: host.decision },
    { item: { ...item, quantity: 2 } }, { item: { ...item, amountMinor: 1 } }, { items: [item, item] },
    { action: 'start_checkout' }, { schema: 'starlight.glass.cart-request.v2' }]) {
    assert.deepEqual(prepareGlassSandboxCart({ ...request, ...patch }, host), denied)
  }
})
