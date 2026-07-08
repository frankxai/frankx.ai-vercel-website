#!/usr/bin/env node
// Regression test for the checkout -> delivery slug contract.
//
// app/api/checkout/route.ts's PRODUCTS map keys are the productId sent to
// Stripe as session metadata; the webhook (app/api/webhooks/stripe/route.ts)
// looks that slug up via lib/delivery.ts's generateProductEmailData(), which
// composes getProductById() (data/products.json) + getDeliveryConfig()
// (lib/delivery.ts DELIVERY_CONFIG). If any of the three slugs don't line up
// across all three, a paid buyer is charged and receives no delivery email.
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

const { generateProductEmailData } = await import(pathToFileURL(resolve(ROOT, 'lib/delivery.ts')).href)

// Must match the PRODUCTS map keys in app/api/checkout/route.ts exactly.
const CHECKOUT_SLUGS = ['creative-ai-toolkit', 'agentic-creator-os', 'suno-prompt-library']

test('every checkout slug resolves to a non-null delivery email payload', () => {
  for (const slug of CHECKOUT_SLUGS) {
    const data = generateProductEmailData(slug, 'Test Buyer', 'buyer@example.com')
    assert.ok(data, `expected generateProductEmailData("${slug}") to resolve — webhook would silently drop this buyer's email`)
  }
})

test('every checkout slug payload has a non-empty product name', () => {
  for (const slug of CHECKOUT_SLUGS) {
    const data = generateProductEmailData(slug, 'Test Buyer', 'buyer@example.com')
    assert.equal(typeof data.productName, 'string')
    assert.ok(data.productName.trim().length > 0, `expected a product name for "${slug}"`)
  }
})

test('every checkout slug payload has at least one download link', () => {
  for (const slug of CHECKOUT_SLUGS) {
    const data = generateProductEmailData(slug, 'Test Buyer', 'buyer@example.com')
    assert.ok(Array.isArray(data.downloadLinks), `expected downloadLinks array for "${slug}"`)
    assert.ok(data.downloadLinks.length > 0, `expected at least one download link for "${slug}"`)
    for (const link of data.downloadLinks) {
      assert.equal(typeof link.name, 'string')
      assert.equal(typeof link.url, 'string')
      assert.ok(link.url.startsWith('http'), `expected an absolute download URL for "${slug}"`)
    }
  }
})

test('payload carries through the customer name and email unchanged', () => {
  const data = generateProductEmailData('creative-ai-toolkit', 'Ada Lovelace', 'ada@example.com')
  assert.equal(data.customerName, 'Ada Lovelace')
  assert.equal(data.customerEmail, 'ada@example.com')
})

test('an unknown slug resolves to null (no silent fallback delivery)', () => {
  const data = generateProductEmailData('not-a-real-product', 'Test Buyer', 'buyer@example.com')
  assert.equal(data, null)
})
