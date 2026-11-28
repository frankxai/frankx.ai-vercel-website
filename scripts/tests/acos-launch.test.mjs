import { test } from 'node:test'
import assert from 'node:assert/strict'
import { acosCampaign } from '../../lib/commerce/acos-campaign.ts'
import { dailyReport, reportWindow } from '../commerce/acos-revenue.mjs'

const source = {
  utm_source: 'linkedin',
  utm_medium: 'social',
  utm_campaign: '2026-11-acos-fieldnote',
}
const metadata = { productSlug: 'agentic-creator-os', ...source }
const day = '2026-11-22'
const now = Date.parse('2026-11-23T01:00Z')
const paid = {
  id: 'pi_fixture',
  status: 'succeeded',
  currency: 'usd',
  amount_received: 4700,
  metadata,
}
const refund = {
  id: 're_fixture',
  status: 'succeeded',
  currency: 'usd',
  amount: 1200,
  payment_intent: paid.id,
}
const event = (object, previous_attributes = {}) => ({
  id: 'evt_fixture',
  created: Date.parse('2026-11-22T12:00:00Z') / 1000,
  livemode: false,
  data: { object, previous_attributes },
})
function provider(groups, legacy = []) {
  return {
    events: {
      list: ({ type, created }) =>
        (groups[type] || []).filter(
          (event) => event.created >= created.gte && event.created < created.lt,
        ),
    },
    paymentIntents: { retrieve: async () => paid },
    checkout: {
      sessions: { list: async () => ({ has_more: false, data: legacy }) },
    },
  }
}
test('only the two issued campaign links pass; free text and extra metadata stay out', () => {
  assert.deepEqual(acosCampaign({ ...source, privateNote: 'discard' }), source)
  assert.equal(acosCampaign({ ...source, utm_source: 'private-person' }), null)
  assert.equal(acosCampaign({ ...source, utm_medium: 'email' }), null)
  assert.equal(acosCampaign({ ...source, utm_campaign: 'other' }), null)
  assert.equal(
    acosCampaign({ ...source, utm_medium: 'email', utm_source: 'newsletter' })
      .utm_source,
    'newsletter',
  )
})
test('Amsterdam day length follows both clock changes', () => {
  for (const [day, hours] of [
    ['2026-03-29', 23],
    ['2026-10-25', 25],
    ['2026-11-22', 24],
  ]) {
    const bounds = reportWindow(day)
    assert.equal(bounds.lt - bounds.gte, hours * 3600)
  }
})
test('successful purchase, duplicate event, delayed refund and pending refund reconcile', async () => {
  const groups = {
    'payment_intent.succeeded': [
      event(paid),
      event(paid),
      event({ ...paid, id: 'other', metadata: { productSlug: 'another' } }),
    ],
    'refund.created': [event({ ...refund, status: 'pending' })],
    'refund.updated': [
      event(refund, { status: 'pending' }),
      event(refund, { status: 'pending' }),
      event({ ...refund, id: 'older' }, { description: 'old' }),
    ],
  }
  const r = await dailyReport(provider(groups), day, false, now)
  assert.deepEqual(r.totals.usd, {
    purchases: 1,
    gross_minor: 4700,
    refunds_minor: 1200,
    gross_less_refunds_minor: 3500,
    purchase_sources: { '2026-11-acos-fieldnote/linkedin': 1 },
  })
  assert.equal(r.coverage, 'complete')
  assert.equal(r.purchase_events.length, 1)
  assert.equal(r.purchase_events[0].name, 'purchase')
  assert.equal(r.purchase_events[0].transaction_id, paid.id)
})
test('Amsterdam midnight belongs to the following revenue report', async () => {
  const atBoundary = {
    ...event(paid),
    created: Date.parse('2026-11-22T23:00:00Z') / 1000,
  }
  const api = provider({ 'payment_intent.succeeded': [atBoundary] })
  const closed = Date.parse('2026-11-24T03:00:00Z')
  assert.equal(
    (await dailyReport(api, day, false, closed)).purchase_events.length,
    0,
  )
  assert.equal(
    (await dailyReport(api, '2026-11-23', false, closed)).purchase_events
      .length,
    1,
  )
})
test('legacy Session metadata identifies sale, and unknown product counts stay partial', async () => {
  const groups = {
    'payment_intent.succeeded': [event({ ...paid, metadata: {} })],
  }
  assert.equal(
    (
      await dailyReport(
        provider(groups, [{ metadata: { productSlug: 'agentic-creator-os' } }]),
        day,
        false,
        now,
      )
    ).totals.usd.purchase_sources.unattributed,
    1,
  )
  const unresolved = await dailyReport(provider(groups), day, false, now)
  assert.equal(unresolved.coverage, 'partial')
  assert.equal(unresolved.unresolved_objects, 1)
})
test('mode mismatch, pending day and expired coverage fail explicitly', async () => {
  await assert.rejects(
    dailyReport(
      provider({ 'payment_intent.succeeded': [event(paid)] }),
      day,
      true,
      now,
    ),
    /mode mismatch/,
  )
  for (const date of ['2026-11-23', '2026-09-01'])
    await assert.rejects(
      dailyReport(provider({}), date, false, now),
      /retention/,
    )
})

test('actual checkout route transfers only issued campaign codes to both Stripe objects', async (t) => {
  const { registerHooks } = await import('node:module')
  const { pathToFileURL, fileURLToPath } = await import('node:url')
  const { resolve } = await import('node:path')
  const root = fileURLToPath(new URL('../../', import.meta.url))
  const hooks = registerHooks({
    resolve(specifier, context, next) {
      if (specifier.startsWith('@/'))
        return next(
          pathToFileURL(resolve(root, specifier.slice(2) + '.ts')).href,
          context,
        )
      return next(
        specifier === 'next/server' ? 'next/server.js' : specifier,
        context,
      )
    },
  })
  t.after(() => hooks.deregister())
  const oldKey = process.env.STRIPE_SECRET_KEY
  const oldPrice = process.env.STRIPE_PRICE_ACOS
  process.env.STRIPE_SECRET_KEY = 'sk_test_local_fixture'
  process.env.STRIPE_PRICE_ACOS = 'price_local_fixture'
  t.after(() => {
    for (const [name, old] of [
      ['STRIPE_SECRET_KEY', oldKey],
      ['STRIPE_PRICE_ACOS', oldPrice],
    ]) {
      if (old === undefined) delete process.env[name]
      else process.env[name] = old
    }
  })
  const { POST } = await import('../../app/api/checkout/route.ts')
  const { CHECKOUT_PRODUCTS } = await import('../../lib/checkout-products.ts')
  const { NextRequest } = await import('next/server.js')
  const req = (headers = {}) =>
    new NextRequest('https://example.test/api/checkout', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        productId: 'agentic-creator-os',
        attribution: { ...source, email: 'discard' },
      }),
    })
  const calls = []
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    assert.equal(url, 'https://api.stripe.com/v1/checkout/sessions')
    calls.push(new URLSearchParams(options.body))
    return Response.json({ url: 'https://checkout.stripe.test/local-fixture' })
  })
  assert.equal((await POST(req())).status, 503)
  assert.equal(calls.length, 0)
  const sku = CHECKOUT_PRODUCTS['agentic-creator-os']
  const previous = sku.status
  t.after(() => {
    sku.status = previous
  })
  sku.status = 'for sale (test fixture in this process)'
  assert.equal((await POST(req())).status, 200)
  assert.equal((await POST(req({ 'sec-gpc': '1' }))).status, 200)
  for (const prefix of ['metadata', 'payment_intent_data[metadata]']) {
    assert.equal(calls[0].get(prefix + '[productSlug]'), 'agentic-creator-os')
    assert.equal(calls[0].get(prefix + '[utm_source]'), 'linkedin')
    assert.equal(calls[1].has(prefix + '[utm_source]'), false)
  }
  assert.equal(calls[0].get('line_items[0][price]'), 'price_local_fixture')
  assert.equal(calls[0].toString().includes('discard'), false)
  const paidMetadata = Object.fromEntries(
    ['productSlug', 'utm_source', 'utm_medium', 'utm_campaign'].map((key) => [
      key,
      calls[0].get('payment_intent_data[metadata][' + key + ']'),
    ]),
  )
  const report = await dailyReport(
    provider({
      'payment_intent.succeeded': [event({ ...paid, metadata: paidMetadata })],
    }),
    day,
    false,
    now,
  )
  assert.equal(
    report.purchase_events[0].source,
    '2026-11-acos-fieldnote/linkedin',
  )
})
