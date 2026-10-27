import test from 'node:test'
import assert from 'node:assert/strict'
import { createWaitlistRoute, STORE_UNAVAILABLE } from '../../lib/demand-capture/waitlist-route.ts'
import { WAITLIST_PRODUCTS } from '../../lib/demand-capture/products.ts'

const PRODUCT = 'starlight-academy-operator-lab'
const URL_BASE = 'https://www.frankx.ai/api/waitlist'

function route({ storeReady = true, allow = true } = {}) {
  const keys = []
  const handlers = createWaitlistRoute({
    products: WAITLIST_PRODUCTS,
    limit: async (key) => {
      keys.push(key)
      return { success: allow }
    },
    storeReady: () => storeReady,
  })
  return { ...handlers, keys }
}

const post = (body, headers = {}) =>
  new Request(URL_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...headers },
    body: JSON.stringify(body),
  })

test('rejects an unknown productId with 404 and never touches the limiter', async () => {
  const r = route()
  const res = await r.POST(post({ productId: 'not-a-product', email: 'a@example.com', consent: true }))
  assert.equal(res.status, 404)
  assert.equal(r.keys.length, 0)

  const get = await r.GET(new Request(`${URL_BASE}?productId=not-a-product`))
  assert.equal(get.status, 404)
})

test('rejects a malformed email with 400', async () => {
  const res = await route().POST(post({ productId: PRODUCT, email: 'not-an-email', consent: true }))
  assert.equal(res.status, 400)
  assert.match((await res.json()).error, /email/i)
})

test('rejects a signup without consent with 400', async () => {
  for (const consent of [undefined, false, 'true']) {
    const res = await route().POST(post({ productId: PRODUCT, email: 'a@example.com', consent }))
    assert.equal(res.status, 400)
    assert.match((await res.json()).error, /consent/i)
  }
})

test('rejects a body that is not a JSON object with 400', async () => {
  const res = await route().POST(
    new Request(URL_BASE, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: 'nope' }),
  )
  assert.equal(res.status, 400)
})

test('returns 503 and saves nothing when the store env is absent', async () => {
  const r = route({ storeReady: false })
  const res = await r.POST(post({ productId: PRODUCT, email: 'a@example.com', consent: true }))
  assert.equal(res.status, 503)
  assert.equal((await res.json()).error, STORE_UNAVAILABLE)
  assert.match(STORE_UNAVAILABLE, /Nothing was saved/)
  assert.equal(r.keys.length, 0)

  const get = await r.GET(new Request(`${URL_BASE}?productId=${PRODUCT}`))
  assert.equal(get.status, 503)
})

test('returns 429 when the rate guard refuses, keyed per IP', async () => {
  const r = route({ allow: false })
  const res = await r.POST(
    post({ productId: PRODUCT, email: 'a@example.com', consent: true }, { 'x-forwarded-for': '203.0.113.9, 10.0.0.1' }),
  )
  assert.equal(res.status, 429)
  assert.deepEqual(r.keys, ['waitlist:ip:203.0.113.9'])
})

test('grants CORS only to allowlisted origins, never a wildcard', async () => {
  const allowed = [
    'https://starlightintelligence.academy',
    'https://www.starlightintelligence.academy',
    'https://starlightintelligence.ai',
    'https://www.starlightintelligence.ai',
    'https://www.frankx.ai',
  ]
  const refused = ['https://evil.example', 'http://starlightintelligence.ai', 'https://starlightintelligence.ai.evil.example', 'null']

  for (const origin of allowed) {
    const preflight = route().OPTIONS(new Request(URL_BASE, { method: 'OPTIONS', headers: { Origin: origin } }))
    assert.equal(preflight.status, 204)
    assert.equal(preflight.headers.get('access-control-allow-origin'), origin)
    assert.equal(preflight.headers.get('access-control-allow-methods'), 'POST, GET, OPTIONS')
    assert.equal(preflight.headers.get('access-control-allow-headers'), 'Content-Type')

    const res = await route().POST(post({ productId: 'nope' }, { Origin: origin }))
    assert.equal(res.headers.get('access-control-allow-origin'), origin)
  }

  for (const origin of refused) {
    const preflight = route().OPTIONS(new Request(URL_BASE, { method: 'OPTIONS', headers: { Origin: origin } }))
    assert.equal(preflight.headers.get('access-control-allow-origin'), null)
    const res = await route().POST(post({ productId: 'nope' }, { Origin: origin }))
    assert.equal(res.headers.get('access-control-allow-origin'), null)
    assert.equal(res.headers.get('vary'), 'Origin')
  }
})
