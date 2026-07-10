#!/usr/bin/env node
// Regression test for the checkout -> delivery slug contract.
//
// lib/checkout.ts's product keys are the productId sent to
// Stripe as session metadata; the webhook (app/api/webhooks/stripe/route.ts)
// looks that slug up via lib/delivery.ts's generateProductEmailData(), which
// composes getProductById() (data/products.json) + getDeliveryConfig()
// (lib/delivery.ts DELIVERY_CONFIG). A product is checkout-ready only when its
// canonical registry entry also declares at least one Blob delivery artifact.
//
// No test runner is configured in this repo (package.json has no "test"
// script), so this uses node:test directly:
//   node --experimental-strip-types scripts/test-delivery.mjs
//
// lib/delivery.ts and lib/products.ts are TypeScript and use the '@/*'
// tsconfig path alias for the products.json import. Plain node has no
// equivalent without adding a ts-node/tsx dependency, so we register a tiny
// loader (scripts/test-utils/alias-loader.mjs) that resolves '@/*' the same
// way tsconfig.json's "paths" does, purely for this test run.
import { register } from 'node:module'
import { pathToFileURL } from 'node:url'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import test from 'node:test'
import assert from 'node:assert/strict'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')

register(
  pathToFileURL(resolve(__dirname, 'test-utils/alias-loader.mjs')).href,
  import.meta.url,
  { data: { root: ROOT } }
)

const { generateProductEmailData, isProductDeliveryReady } = await import(
  pathToFileURL(resolve(ROOT, 'lib/delivery.ts')).href
)

const DELIVERY_READY_CHECKOUT_SLUGS = ['agentic-creator-os']

test('every delivery-ready checkout slug resolves to an email payload', () => {
  for (const slug of DELIVERY_READY_CHECKOUT_SLUGS) {
    assert.equal(isProductDeliveryReady(slug), true)
    const data = generateProductEmailData(slug, 'Test Buyer', 'buyer@example.com')
    assert.ok(data, `expected generateProductEmailData("${slug}") to resolve — webhook would silently drop this buyer's email`)
  }
})

test('a product without canonical delivery artifacts is not checkout-ready', () => {
  assert.equal(isProductDeliveryReady('creative-ai-toolkit'), false)
  assert.equal(isProductDeliveryReady('suno-prompt-library'), false)
})

test('every delivery-ready payload has a non-empty product name', () => {
  for (const slug of DELIVERY_READY_CHECKOUT_SLUGS) {
    const data = generateProductEmailData(slug, 'Test Buyer', 'buyer@example.com')
    assert.equal(typeof data.productName, 'string')
    assert.ok(data.productName.trim().length > 0, `expected a product name for "${slug}"`)
  }
})

test('every delivery-ready payload has canonical Blob redirect links', () => {
  for (const slug of DELIVERY_READY_CHECKOUT_SLUGS) {
    const data = generateProductEmailData(slug, 'Test Buyer', 'buyer@example.com')
    assert.ok(Array.isArray(data.downloadLinks), `expected downloadLinks array for "${slug}"`)
    assert.ok(data.downloadLinks.length > 0, `expected at least one download link for "${slug}"`)
    for (const link of data.downloadLinks) {
      assert.equal(typeof link.name, 'string')
      assert.equal(typeof link.url, 'string')
      const url = new URL(link.url)
      assert.equal(url.pathname, '/api/download/file')
      assert.ok(url.searchParams.get('key'), `expected a Blob key for "${slug}"`)
    }
  }
})

test('payload carries through the customer name and email unchanged', () => {
  const data = generateProductEmailData('agentic-creator-os', 'Ada Lovelace', 'ada@example.com')
  assert.equal(data.customerName, 'Ada Lovelace')
  assert.equal(data.customerEmail, 'ada@example.com')
})

test('an unknown slug resolves to null (no silent fallback delivery)', () => {
  const data = generateProductEmailData('not-a-real-product', 'Test Buyer', 'buyer@example.com')
  assert.equal(data, null)
})
