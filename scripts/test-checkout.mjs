#!/usr/bin/env node
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

const { buildCheckoutSessionParams, resolveCheckoutProduct } = await import(
  pathToFileURL(resolve(ROOT, 'lib/checkout.ts')).href
)
const { processCheckoutSessionDelivery } = await import(
  pathToFileURL(resolve(ROOT, 'lib/stripe-delivery.ts')).href
)
const { NextRequest } = await import('next/server.js')
const { POST: createCheckoutSession } = await import(
  pathToFileURL(resolve(ROOT, 'app/api/checkout/route.ts')).href
)

const VALID_ENV = {
  STRIPE_PRICE_ACOS: 'price_acos123',
  STRIPE_PRICE_SUNO: 'price_suno123',
  STRIPE_PRICE_TOOLKIT: 'price_toolkit123',
}

test('checkout rejects a missing product ID', () => {
  assert.deepEqual(resolveCheckoutProduct(undefined, VALID_ENV), {
    ok: false,
    code: 'invalid_product_id',
  })
})

test('checkout rejects an unknown product ID', () => {
  const result = resolveCheckoutProduct('not-a-product', VALID_ENV)
  assert.equal(result.ok, false)
  assert.equal(result.code, 'product_not_found')
})

test('checkout fails closed when a Stripe price is empty or malformed', () => {
  const missing = resolveCheckoutProduct('agentic-creator-os', {})
  assert.equal(missing.ok, false)
  assert.equal(missing.code, 'price_not_configured')

  const malformed = resolveCheckoutProduct('agentic-creator-os', {
    STRIPE_PRICE_ACOS: 'prod_not_a_price',
  })
  assert.equal(malformed.ok, false)
  assert.equal(malformed.code, 'invalid_price_id')
})

test('checkout fails closed when canonical delivery artifacts are missing', () => {
  for (const productId of ['creative-ai-toolkit', 'suno-prompt-library']) {
    const result = resolveCheckoutProduct(productId, VALID_ENV)
    assert.equal(result.ok, false)
    assert.equal(result.code, 'delivery_not_configured')
  }
})

test('checkout parameters carry the product contract into Stripe metadata', () => {
  const result = resolveCheckoutProduct('agentic-creator-os', VALID_ENV)
  assert.equal(result.ok, true)

  const params = buildCheckoutSessionParams({
    product: result.product,
    origin: 'https://www.frankx.ai',
    email: '  buyer@example.com  ',
  })

  assert.equal(params.get('line_items[0][price]'), 'price_acos123')
  assert.equal(params.get('line_items[0][quantity]'), '1')
  assert.equal(params.get('metadata[productSlug]'), 'agentic-creator-os')
  assert.equal(
    params.get('payment_intent_data[metadata][productSlug]'),
    'agentic-creator-os'
  )
  assert.equal(params.get('customer_email'), 'buyer@example.com')
})

function restoreEnvironment(key, value) {
  if (value === undefined) {
    delete process.env[key]
  } else {
    process.env[key] = value
  }
}

test('checkout route rejects missing price configuration before calling Stripe', async () => {
  const previousSecret = process.env.STRIPE_SECRET_KEY
  const previousPrice = process.env.STRIPE_PRICE_ACOS
  const previousFetch = globalThis.fetch
  const previousConsoleError = console.error
  let fetchCalled = false

  process.env.STRIPE_SECRET_KEY = 'test-placeholder'
  delete process.env.STRIPE_PRICE_ACOS
  globalThis.fetch = async () => {
    fetchCalled = true
    throw new Error('Stripe must not be called')
  }
  console.error = () => {}

  try {
    const request = new NextRequest('https://www.frankx.ai/api/checkout', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ productId: 'agentic-creator-os' }),
    })
    const response = await createCheckoutSession(request)
    const payload = await response.json()

    assert.equal(response.status, 503)
    assert.equal(fetchCalled, false)
    assert.match(payload.error, /pricing is not configured/i)
  } finally {
    restoreEnvironment('STRIPE_SECRET_KEY', previousSecret)
    restoreEnvironment('STRIPE_PRICE_ACOS', previousPrice)
    globalThis.fetch = previousFetch
    console.error = previousConsoleError
  }
})

test('checkout route sends the delivery metadata contract to Stripe', async () => {
  const previousSecret = process.env.STRIPE_SECRET_KEY
  const previousPrice = process.env.STRIPE_PRICE_ACOS
  const previousFetch = globalThis.fetch
  const previousConsoleInfo = console.info
  let capturedParams

  process.env.STRIPE_SECRET_KEY = 'test-placeholder'
  process.env.STRIPE_PRICE_ACOS = 'price_acos123'
  console.info = () => {}
  globalThis.fetch = async (_url, init) => {
    capturedParams = new URLSearchParams(init.body)
    return new Response(
      JSON.stringify({
        id: 'cs_test_123',
        url: 'https://checkout.stripe.com/c/pay/cs_test_123',
      }),
      { status: 200, headers: { 'content-type': 'application/json' } }
    )
  }

  try {
    const request = new NextRequest('https://www.frankx.ai/api/checkout', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ productId: 'agentic-creator-os' }),
    })
    const response = await createCheckoutSession(request)
    const payload = await response.json()

    assert.equal(response.status, 200)
    assert.equal(payload.url, 'https://checkout.stripe.com/c/pay/cs_test_123')
    assert.equal(capturedParams.get('metadata[productSlug]'), 'agentic-creator-os')
    assert.equal(
      capturedParams.get('payment_intent_data[metadata][productSlug]'),
      'agentic-creator-os'
    )
  } finally {
    restoreEnvironment('STRIPE_SECRET_KEY', previousSecret)
    restoreEnvironment('STRIPE_PRICE_ACOS', previousPrice)
    globalThis.fetch = previousFetch
    console.info = previousConsoleInfo
  }
})

const DELIVERY_INPUT = {
  eventId: 'evt_test_123',
  sessionId: 'cs_test_123',
  paymentStatus: 'paid',
  productId: 'agentic-creator-os',
  customerEmail: 'buyer@example.com',
  customerName: 'Test Buyer',
}

test('delivery emits a PII-free, idempotent success receipt', async () => {
  let idempotencyKey
  const receipt = await processCheckoutSessionDelivery(DELIVERY_INPUT, {
    now: () => new Date('2026-07-10T10:00:00.000Z'),
    sendEmail: async (emailData, key) => {
      idempotencyKey = key
      assert.equal(emailData.customerEmail, 'buyer@example.com')
      return { providerMessageId: 'email_test_123' }
    },
  })

  assert.equal(idempotencyKey, 'stripe-checkout/evt_test_123')
  assert.deepEqual(receipt, {
    schemaVersion: 'starlight.delivery_receipt.v1',
    receiptId: 'stripe:evt_test_123:product-email',
    eventId: 'evt_test_123',
    sessionId: 'cs_test_123',
    productId: 'agentic-creator-os',
    provider: 'resend',
    status: 'delivered',
    retryable: false,
    providerMessageId: 'email_test_123',
    occurredAt: '2026-07-10T10:00:00.000Z',
  })
  assert.equal(JSON.stringify(receipt).includes('buyer@example.com'), false)
  assert.equal(JSON.stringify(receipt).includes('Test Buyer'), false)
})

test('delivery marks fixable contract and provider failures as retryable', async () => {
  const missingMetadata = await processCheckoutSessionDelivery({
    ...DELIVERY_INPUT,
    productId: undefined,
  })
  assert.equal(missingMetadata.status, 'failed')
  assert.equal(missingMetadata.reason, 'product_metadata_missing')
  assert.equal(missingMetadata.retryable, true)

  const missingProvider = await processCheckoutSessionDelivery(DELIVERY_INPUT)
  assert.equal(missingProvider.status, 'failed')
  assert.equal(missingProvider.reason, 'delivery_provider_not_configured')
  assert.equal(missingProvider.retryable, true)

  const failedProvider = await processCheckoutSessionDelivery(DELIVERY_INPUT, {
    sendEmail: async () => {
      throw new Error('simulated provider failure')
    },
  })
  assert.equal(failedProvider.status, 'failed')
  assert.equal(failedProvider.reason, 'delivery_provider_failed')
  assert.equal(failedProvider.retryable, true)

  const unavailableArtifact = await processCheckoutSessionDelivery({
    ...DELIVERY_INPUT,
    productId: 'suno-prompt-library',
  })
  assert.equal(unavailableArtifact.status, 'failed')
  assert.equal(unavailableArtifact.reason, 'product_delivery_not_configured')
  assert.equal(unavailableArtifact.retryable, true)
})

test('delivery never fulfills an unconfirmed payment', async () => {
  let called = false
  const receipt = await processCheckoutSessionDelivery(
    { ...DELIVERY_INPUT, paymentStatus: 'unpaid' },
    {
      sendEmail: async () => {
        called = true
        return { providerMessageId: 'should-not-send' }
      },
    }
  )

  assert.equal(called, false)
  assert.equal(receipt.status, 'failed')
  assert.equal(receipt.reason, 'payment_not_confirmed')
  assert.equal(receipt.retryable, false)
})
