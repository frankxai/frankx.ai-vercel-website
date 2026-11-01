import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

/**
 * Every productId handed to a CheckoutButton must be a key in the PRODUCTS map
 * of app/api/checkout/route.ts. A slug that is not a key returns 404 "Product
 * not found", so the failure is invisible until a buyer clicks Pay — the money
 * path breaks silently. This shipped once: /acos passed "acos-creator-kit"
 * while the route only knew "agentic-creator-os".
 */

const ROOT = process.cwd()

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    if (entry === 'node_modules' || entry === '.next' || entry === '.worktrees' || entry.startsWith('.git')) continue
    const full = join(dir, entry)
    const info = statSync(full)
    if (info.isDirectory()) walk(full, out)
    else if (/\.(tsx|ts)$/.test(entry)) out.push(full)
  }
  return out
}

function knownSkus() {
  const source = readFileSync(join(ROOT, 'app/api/checkout/route.ts'), 'utf8')
  const map = source.slice(source.indexOf('const PRODUCTS'), source.indexOf('export async function POST'))
  return new Set([...map.matchAll(/^\s*'([^']+)':\s*\{/gm)].map((m) => m[1]))
}

test('every CheckoutButton productId resolves to a SKU the checkout route knows', () => {
  const skus = knownSkus()
  assert.ok(skus.size > 0, 'could not parse any SKU out of the checkout route PRODUCTS map')

  const offenders = []
  for (const file of [...walk(join(ROOT, 'app')), ...walk(join(ROOT, 'components'))]) {
    const source = readFileSync(file, 'utf8')
    if (!source.includes('CheckoutButton')) continue

    for (const match of source.matchAll(/productId=(?:"([^"]+)"|\{'([^']+)'\}|\{"([^"]+)"\})/g)) {
      const sku = match[1] ?? match[2] ?? match[3]
      if (!skus.has(sku)) offenders.push(`${file.replace(ROOT, '.')}: "${sku}"`)
    }
    // checkoutId fields feed the same component through a tier/config object.
    for (const match of source.matchAll(/checkoutId:\s*'([^']+)'/g)) {
      if (!skus.has(match[1])) offenders.push(`${file.replace(ROOT, '.')}: checkoutId "${match[1]}"`)
    }
  }

  assert.deepEqual(
    offenders,
    [],
    `checkout SKU(s) absent from the route PRODUCTS map (${[...skus].join(', ')}):\n  ${offenders.join('\n  ')}`
  )
})

/**
 * The Stripe route must fail closed. These cases call the real gate the route
 * uses (lib/checkout-gate.ts), so inverting or dropping a condition there fails
 * here: a status-text grep could not catch that (Grok review on PR #1146).
 */
const { stripeCheckoutGate } = await import('../../lib/checkout-gate.ts')

const KEY = 'sk_test_x'
const closed = { status: 'pre-stage (not for sale)', priceId: 'price_x' }
const open = { status: 'for sale', priceId: 'price_x' }

test('a configured key and price do not open a product that is not for sale', () => {
  const gate = stripeCheckoutGate(closed, KEY)
  assert.equal(gate.ok, false)
  assert.equal(gate.refusal, 'checkout_gated')
})

test('a for-sale product without a key or price stays closed', () => {
  assert.equal(stripeCheckoutGate(open, undefined).refusal, 'checkout_unconfigured')
  assert.equal(stripeCheckoutGate(open, '  ').refusal, 'checkout_unconfigured')
  assert.equal(stripeCheckoutGate({ ...open, priceId: '' }, KEY).refusal, 'checkout_unconfigured')
})

test('checkout opens only with for-sale status, key and price', () => {
  assert.deepEqual(stripeCheckoutGate(open, KEY), { ok: true, secretKey: KEY, priceId: 'price_x' })
})

test('every product in the Stripe route ships closed and the route calls the gate before Stripe', () => {
  const source = readFileSync(join(ROOT, 'app/api/checkout/route.ts'), 'utf8')
  const map = source.slice(source.indexOf('const PRODUCTS'), source.indexOf('export async function POST'))
  const entries = [...map.matchAll(/^\s*'([^']+)':\s*\{([\s\S]*?)^\s*\},/gm)]
  assert.ok(entries.length > 0, 'could not parse PRODUCTS entries')
  const open = entries.filter(([, , body]) => !/status:\s*NOT_FOR_SALE/.test(body)).map(([, id]) => id)
  assert.deepEqual(open, [], `products not shipped closed (opening one needs a reviewed PR that also updates this test): ${open.join(', ')}`)

  const post = source.slice(source.indexOf('export async function POST'))
  assert.ok(post.indexOf('stripeCheckoutGate(') > 0, 'POST does not call stripeCheckoutGate')
  assert.ok(post.indexOf('api.stripe.com') > post.indexOf('stripeCheckoutGate('), 'gate must run before the Stripe API call')
  assert.match(post, /gate\.priceId/, 'Stripe must receive the gated price id')
})
