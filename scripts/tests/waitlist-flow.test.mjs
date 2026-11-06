import test from 'node:test'
import assert from 'node:assert/strict'

// The store reads its env once at import, so set it before the first import.
process.env.KV_REST_API_URL = 'https://kv.test'
process.env.KV_REST_API_TOKEN = 'test-token'
process.env.RESEND_API_KEY = 're_test'
process.env.RESEND_AUDIENCE_ID = 'shared-newsletter-audience'
process.env.RESEND_AUDIENCE_ID__STARLIGHT_ACADEMY_OPERATOR_LAB = 'operator-lab-audience'

const { createWaitlistRoute, STORE_UNAVAILABLE, ALLOWED_ORIGINS } = await import(
  '../../lib/demand-capture/waitlist-route.ts'
)
const { WAITLIST_PRODUCTS } = await import('../../lib/demand-capture/products.ts')
const { claimWithSignal } = await import('../../lib/demand-capture/store.ts')
const { landingUtm, joinPayload, refinePayload } = await import('../../lib/demand-capture/form-payload.ts')

const PRODUCT = 'starlight-academy-operator-lab'
const URL_BASE = 'https://www.frankx.ai/api/waitlist'

/**
 * An in-memory stand-in for the Upstash REST endpoint and the Resend contacts API.
 * `failWith` makes Upstash answer the way it does for a quota-limited or suspended
 * database: HTTP 200 with a single { error } object.
 */
function fakeServices({ failWith, failCommands = [] } = {}) {
  const hashes = new Map()
  const strings = new Map()
  const resend = []
  const hash = (k) => hashes.get(k) ?? hashes.set(k, new Map()).get(k)

  globalThis.fetch = async (url, init) => {
    if (String(url).startsWith('https://api.resend.com/')) {
      resend.push({ url: String(url), body: JSON.parse(init.body) })
      return new Response('{}', { status: 200 })
    }
    if (failWith) return new Response(JSON.stringify({ error: failWith }), { status: 200 })
    const [cmd, ...args] = JSON.parse(init.body)
    if (failCommands.includes(cmd.toLowerCase())) {
      return new Response(JSON.stringify({ error: 'ERR injected failure on ' + cmd }), { status: 200 })
    }
    let result = null
    switch (cmd.toLowerCase()) {
      case 'eval': {
        // Mirrors CLAIM_WITH_SIGNAL: one atomic step for position, count and first signal.
        const [, , positionsKey, countKey, signalsKey, email, json] = args
        let position = hash(positionsKey).get(email)
        let created = 0
        if (position === undefined) {
          position = String(Number(strings.get(countKey) ?? 0) + 1)
          strings.set(countKey, position)
          hash(positionsKey).set(email, position)
          created = 1
        }
        if (!hash(signalsKey).has(email)) {
          hash(signalsKey).set(email, '{"position":' + position + json.slice('{"position":-1'.length))
        }
        result = [Number(position), created]
        break
      }
      case 'hget':
        result = hash(args[0]).get(args[1]) ?? null
        break
      case 'hset':
        hash(args[0]).set(args[1], args[2])
        result = 1
        break
      case 'get':
        result = strings.get(args[0]) ?? null
        break
      case 'hgetall':
        result = [...hash(args[0]).entries()].flat()
        break
      default:
        throw new Error('unexpected command ' + cmd)
    }
    return new Response(JSON.stringify({ result }), { status: 200 })
  }

  const signal = (email) => {
    const raw = hash(`waitlist:${PRODUCT}:signals`).get(email)
    return raw ? JSON.parse(raw) : null
  }
  return { resend, signal, count: () => Number(strings.get(`waitlist:${PRODUCT}:count`) ?? 0), hashes }
}

function route() {
  const keys = []
  const handlers = createWaitlistRoute({
    products: WAITLIST_PRODUCTS,
    limit: async (key) => {
      keys.push(key)
      return { success: true }
    },
    storeReady: () => true,
  })
  return { ...handlers, keys }
}

const post = (body, headers = {}) =>
  new Request(URL_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-forwarded-for': '198.51.100.7', ...headers },
    body: JSON.stringify(body),
  })

test('P1: an Upstash HTTP 200 { error } payload is a failure, not a signup', async () => {
  fakeServices({ failWith: 'ERR max requests limit exceeded' })
  await assert.rejects(
    () => claimWithSignal({ productId: PRODUCT, email: 'a@example.com', consent: true, createdAt: 'now' }),
    /max requests limit exceeded/,
  )

  const res = await route().POST(post({ productId: PRODUCT, email: 'a@example.com', consent: true }))
  assert.equal(res.status, 503)
  assert.equal((await res.json()).error, STORE_UNAVAILABLE)
})

test('P1: GET state also answers 503 when Upstash refuses the database', async () => {
  fakeServices({ failWith: 'ERR database is suspended' })
  const res = await route().GET(new Request(`${URL_BASE}?productId=${PRODUCT}`))
  assert.equal(res.status, 503)
})

test('codex P2: a failed claim stores nothing and counts nothing', async () => {
  const svc = fakeServices({ failCommands: ['eval'] })
  const res = await route().POST(post({ productId: PRODUCT, email: 'atomic@example.com', consent: true }))
  assert.equal(res.status, 503)
  assert.equal(svc.count(), 0)
  assert.equal(svc.signal('atomic@example.com'), null)
})

test('codex P2: a first join writes its signal inside the claim, not in a second write that can fail', async () => {
  // Every plain HSET fails. A first join must not need one, so the signup is whole.
  const svc = fakeServices({ failCommands: ['hset'] })
  const res = await route().POST(
    post({ productId: PRODUCT, email: 'whole@example.com', consent: true, source: '/community', utm: { utm_source: 'x' } }),
  )
  assert.equal(res.status, 200)
  assert.equal(svc.count(), 1)
  const stored = svc.signal('whole@example.com')
  assert.equal(stored.position, 1)
  assert.equal(stored.source, '/community')
  assert.deepEqual(stored.utm, { utm_source: 'x' })
})

test('P2: landing-page UTM parameters are read from the page and kept on the signal', async () => {
  assert.deepEqual(landingUtm('?utm_source=newsletter&utm_campaign=launch&ref=x'), {
    utm_source: 'newsletter',
    utm_campaign: 'launch',
  })
  assert.equal(landingUtm(''), undefined)

  const svc = fakeServices()
  const body = joinPayload({
    productId: PRODUCT,
    email: 'utm@example.com',
    consent: true,
    pathname: '/community',
    search: '?utm_source=newsletter&utm_campaign=launch',
  })
  const res = await route().POST(post(body))
  assert.equal(res.status, 200)
  const stored = svc.signal('utm@example.com')
  assert.equal(stored.source, '/community')
  assert.deepEqual(stored.utm, { utm_source: 'newsletter', utm_campaign: 'launch' })
})

test('P2: body UTM is sanitised: only utm_* string keys, clipped, at most 8', async () => {
  const svc = fakeServices()
  const utm = { utm_source: 'x'.repeat(500), evil: 'nope', utm_medium: 42 }
  for (let i = 0; i < 12; i++) utm['utm_k' + i] = 'v'
  const res = await route().POST(post({ productId: PRODUCT, email: 's@example.com', consent: true, utm }))
  assert.equal(res.status, 200)
  const stored = svc.signal('s@example.com').utm
  assert.equal(stored.evil, undefined)
  assert.equal(stored.utm_medium, undefined)
  assert.equal(stored.utm_source.length, 160)
  assert.ok(Object.keys(stored).length <= 8)
})

test('P2: the refine step posts the email that joined, not the one typed afterwards', () => {
  const payload = refinePayload({
    productId: PRODUCT,
    joinedEmail: 'first@example.com',
    answers: { role: 'founder', priceBand: '300-999' },
  })
  assert.equal(payload.email, 'first@example.com')
  assert.equal(payload.step, 'refine')
  assert.equal(payload.role, 'founder')
})

test('P2: the email input is read-only while the join request is in flight', async () => {
  const { readFile } = await import('node:fs/promises')
  const src = await readFile(new URL('../../lib/demand-capture/WaitlistForm.tsx', import.meta.url), 'utf8')
  assert.match(src, /readOnly=\{busy\}/)
  assert.match(src, /refinePayload\(\{[^}]*joinedEmail/)
})

test('P2: two-step signup stores once, spends one join token, adds to the audience once', async () => {
  const svc = fakeServices()
  const r = route()

  const join = await r.POST(
    post({ productId: PRODUCT, email: 'two@example.com', consent: true, source: '/community', utm: { utm_source: 'x' } }),
  )
  assert.equal(join.status, 200)
  assert.equal((await join.json()).position, 1)

  const refine = await r.POST(
    post(refinePayload({ productId: PRODUCT, joinedEmail: 'two@example.com', answers: { priceBand: '300-999', urgency: 'now' } })),
  )
  assert.equal(refine.status, 200)
  assert.equal((await refine.json()).position, 1)

  assert.equal(svc.count(), 1)
  assert.equal(svc.resend.length, 1)
  assert.deepEqual(r.keys, ['waitlist:ip:198.51.100.7', 'waitlist:refine:ip:198.51.100.7'])

  const stored = svc.signal('two@example.com')
  assert.equal(stored.source, '/community')
  assert.deepEqual(stored.utm, { utm_source: 'x' })
  assert.equal(stored.position, 1)
  assert.equal(stored.priceBand, '300-999')
  assert.equal(stored.urgency, 'now')
})

test('P2: three people behind one NAT can each finish both steps', async () => {
  fakeServices()
  const used = new Map()
  const handlers = createWaitlistRoute({
    products: WAITLIST_PRODUCTS,
    // The production limiter: 5 per key per window.
    limit: async (key) => {
      used.set(key, (used.get(key) ?? 0) + 1)
      return { success: used.get(key) <= 5 }
    },
    storeReady: () => true,
  })
  for (const email of ['n1@example.com', 'n2@example.com', 'n3@example.com']) {
    const join = await handlers.POST(post({ productId: PRODUCT, email, consent: true }))
    assert.equal(join.status, 200)
    const refine = await handlers.POST(post(refinePayload({ productId: PRODUCT, joinedEmail: email, answers: { role: 'founder' } })))
    assert.equal(refine.status, 200)
  }
})

test('P2: refine never creates a signup for an address that did not join', async () => {
  const svc = fakeServices()
  const res = await route().POST(
    post(refinePayload({ productId: PRODUCT, joinedEmail: 'ghost@example.com', answers: { role: 'founder' } })),
  )
  assert.equal(res.status, 404)
  assert.equal(svc.signal('ghost@example.com'), null)
  assert.equal(svc.count(), 0)
  assert.equal(svc.resend.length, 0)
})

test('the audience add uses the per-product audience only, never the shared newsletter one', async () => {
  const svc = fakeServices()
  await route().POST(post({ productId: PRODUCT, email: 'aud@example.com', consent: true }))
  assert.equal(svc.resend.length, 1)
  assert.match(svc.resend[0].url, /audiences\/operator-lab-audience\/contacts$/)

  // The consent line promises the address stays with this list, so with no per-product
  // audience configured the signal stays in KV and nobody lands on the newsletter audience.
  const saved = process.env.RESEND_AUDIENCE_ID__STARLIGHT_ACADEMY_OPERATOR_LAB
  delete process.env.RESEND_AUDIENCE_ID__STARLIGHT_ACADEMY_OPERATOR_LAB
  try {
    const bare = fakeServices()
    const res = await route().POST(post({ productId: PRODUCT, email: 'bare@example.com', consent: true }))
    assert.equal(res.status, 200)
    assert.equal(bare.resend.length, 0)
    assert.ok(bare.signal('bare@example.com'))
  } finally {
    process.env.RESEND_AUDIENCE_ID__STARLIGHT_ACADEMY_OPERATOR_LAB = saved
  }
})

test('P3: the apex origin is allowlisted explicitly', () => {
  assert.ok(ALLOWED_ORIGINS.has('https://frankx.ai'))
})

test('codex P2: overlapping refine and re-join never erase each other’s answers', async () => {
  const svc = fakeServices()
  const r = route()
  await r.POST(post({ productId: PRODUCT, email: 'race@example.com', consent: true, source: '/community' }))

  // Hold every HGET of the signal until both requests have read, so both merge from the
  // same pre-refinement record: the interleaving that used to drop the refine's answers.
  const realFetch = globalThis.fetch
  let reads = 0
  let release
  const bothRead = new Promise((resolve) => (release = resolve))
  globalThis.fetch = async (url, init) => {
    const [cmd, , field] = JSON.parse(init.body)
    if (cmd === 'hget' && field === 'race@example.com' && reads < 2) {
      reads++
      const res = await realFetch(url, init)
      if (reads === 2) release()
      await bothRead
      return res
    }
    return realFetch(url, init)
  }
  try {
    const [refine, rejoin] = await Promise.all([
      r.POST(post(refinePayload({ productId: PRODUCT, joinedEmail: 'race@example.com', answers: { priceBand: '300-999', urgency: 'now' } }))),
      r.POST(post({ productId: PRODUCT, email: 'race@example.com', consent: true, role: 'founder' })),
    ])
    assert.equal(refine.status, 200)
    assert.equal(rejoin.status, 200)
  } finally {
    globalThis.fetch = realFetch
  }
  const stored = svc.signal('race@example.com')
  assert.equal(stored.priceBand, '300-999')
  assert.equal(stored.urgency, 'now')
  assert.equal(stored.role, 'founder')
  assert.equal(stored.source, '/community')
  assert.equal(svc.count(), 1)
})
