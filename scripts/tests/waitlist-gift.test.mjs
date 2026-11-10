import test from 'node:test'
import assert from 'node:assert/strict'

process.env.KV_REST_API_URL = 'https://kv.test'
process.env.KV_REST_API_TOKEN = 'test-token'
process.env.RESEND_API_KEY = 're_test'

const { GIFTS, giftEmail, sendGift, giftCopy } = await import('../../lib/demand-capture/gift.ts')
const { createWaitlistRoute } = await import('../../lib/demand-capture/waitlist-route.ts')
const { WAITLIST_PRODUCTS } = await import('../../lib/demand-capture/products.ts')

const PRODUCT = 'starlight-academy-operator-lab'

/** Upstash + Resend stand-in. `emails` are POSTs to /emails, `contacts` audience adds. */
function services({ resendFails = false } = {}) {
  const hashes = new Map()
  const strings = new Map()
  const emails = []
  const attempts = []
  const ctl = { resendFails }
  const hash = (k) => hashes.get(k) ?? hashes.set(k, new Map()).get(k)
  globalThis.fetch = async (url, init) => {
    const u = String(url)
    if (u === 'https://api.resend.com/emails') {
      attempts.push(init.headers)
      if (ctl.resendFails) return new Response('{"message":"down"}', { status: 500 })
      emails.push(JSON.parse(init.body))
      return new Response('{"id":"e1"}', { status: 200 })
    }
    if (u.startsWith('https://api.resend.com/')) return new Response('{}', { status: 200 })
    const [cmd, ...args] = JSON.parse(init.body)
    let result = null
    switch (cmd.toLowerCase()) {
      case 'eval': {
        if (args[1] === '1') {
          const [, , signalsKey, email, expected, next] = args
          const current = hash(signalsKey).get(email) ?? ''
          if (current === expected) {
            hash(signalsKey).set(email, next)
            result = 1
          } else result = 0
          break
        }
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
      case 'set': {
        const [k, v, ...opts] = args
        if (opts.includes('NX') && strings.has(k)) result = null
        else {
          strings.set(k, v)
          result = 'OK'
        }
        break
      }
      case 'del':
        result = strings.delete(args[0]) ? 1 : 0
        break
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
      default:
        throw new Error('unexpected ' + cmd)
    }
    return new Response(JSON.stringify({ result }), { status: 200 })
  }
  return { emails, strings, attempts, ctl }
}

const route = () =>
  createWaitlistRoute({ products: WAITLIST_PRODUCTS, limit: async () => ({ success: true }), storeReady: () => true })

const post = (body) =>
  new Request('https://www.frankx.ai/api/waitlist', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-forwarded-for': '203.0.113.9' },
    body: JSON.stringify(body),
  })

const withLive = async (fn) => {
  GIFTS[PRODUCT].live = true
  try {
    await fn()
  } finally {
    GIFTS[PRODUCT].live = false
  }
}

test('the gift ships switched off: sending email is Frank’s call', () => {
  assert.equal(GIFTS[PRODUCT].live, false)
})

test('the email links one practice, says how long it takes, and invents nothing', () => {
  const mail = giftEmail(GIFTS[PRODUCT], { email: 'a@example.com' })
  assert.match(mail.subject, /first practice/i)
  for (const body of [mail.text, mail.html]) {
    assert.ok(body.includes(GIFTS[PRODUCT].url.replace(/&/g, body === mail.html ? '&amp;' : '&')))
    assert.match(body, /15 minutes/)
    assert.doesNotMatch(body, /only \d+ (left|seats|spots)|hours? left|expires|countdown|limited time/i)
  }
  assert.match(mail.text, /reply/i, 'a plain way out is stated')
})

test('switched off, a join sends nothing', async () => {
  const svc = services()
  const res = await route().POST(post({ productId: PRODUCT, email: 'off@example.com', consent: true }))
  assert.equal(res.status, 200)
  assert.equal(svc.emails.length, 0)
})

test('switched on, the gift is sent inside the join request, once per address', async () => {
  await withLive(async () => {
    const svc = services()
    const r = route()
    const res = await r.POST(post({ productId: PRODUCT, email: 'Gift@Example.com', consent: true }))
    assert.equal(res.status, 200)
    // Sent before the response resolved, so well inside the 60-second promise.
    assert.equal(svc.emails.length, 1)
    assert.deepEqual(svc.emails[0].to, ['gift@example.com'])
    assert.equal(svc.emails[0].from, GIFTS[PRODUCT].from)

    await r.POST(post({ productId: PRODUCT, email: 'gift@example.com', consent: true }))
    await r.POST(post({ productId: PRODUCT, email: 'gift@example.com', step: 'refine', role: 'founder' }))
    assert.equal(svc.emails.length, 1, 'a repeat join or step 2 never sends again')
  })
})

test('a failed send never fails the signup, and the guard is released for a later retry', async () => {
  await withLive(async () => {
    const svc = services({ resendFails: true })
    const res = await route().POST(post({ productId: PRODUCT, email: 'fail@example.com', consent: true }))
    assert.equal(res.status, 200)
    assert.equal([...svc.strings.keys()].some((k) => k.includes(':gift:')), false)
  })
})

test('sendGift reports what it did', async () => {
  services()
  assert.equal(await sendGift(PRODUCT, 'x@example.com'), 'off')
  await withLive(async () => {
    assert.equal(await sendGift(PRODUCT, 'x@example.com'), 'sent')
    assert.equal(await sendGift(PRODUCT, 'x@example.com'), 'already-sent')
  })
})

test('the form copy only promises the gift while it is switched on', async () => {
  assert.deepEqual(giftCopy(PRODUCT), {})
  await withLive(async () => {
    const copy = giftCopy(PRODUCT)
    assert.match(copy.quiet, /first practice/i)
    // The response cannot know whether the email arrived, and must not say whether the
    // address was new, so the copy states the practice and a fallback, never a delivery.
    assert.doesNotMatch(copy.doneText, /is in your inbox|has been sent|is on its way|we sent/i)
    assert.match(copy.doneText, /first practice/i)
    assert.match(copy.doneText, /spam|frank@frankx\.ai/i)
  })
})

test('a send that failed is retried on the next join, and delivered at most once', async () => {
  await withLive(async () => {
    const svc = services({ resendFails: true })
    const r = route()
    const join = () => r.POST(post({ productId: PRODUCT, email: 'retry@example.com', consent: true }))
    assert.equal((await join()).status, 200)
    assert.equal(svc.emails.length, 0)

    svc.ctl.resendFails = false
    assert.equal((await join()).status, 200)
    assert.equal(svc.attempts.length, 2, 'the repeat join retried the failed send')
    assert.equal(svc.emails.length, 1)

    await join()
    await join()
    assert.equal(svc.emails.length, 1, 'once delivered, repeat joins never send again')
    assert.equal(svc.attempts.length, 2)
  })
})

test('each send carries a stable idempotency key, so a lost marker cannot double-send', async () => {
  await withLive(async () => {
    const svc = services()
    await sendGift(PRODUCT, 'idem@example.com')
    assert.equal(svc.attempts[0]['Idempotency-Key'], `gift/${PRODUCT}/idem@example.com`)
  })
})
