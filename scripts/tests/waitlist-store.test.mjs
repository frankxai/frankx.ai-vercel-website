import test from 'node:test'
import assert from 'node:assert/strict'

process.env.KV_REST_API_URL = 'https://kv.test'
process.env.KV_REST_API_TOKEN = 'test-token'

const { mergeSignal, claimPosition } = await import('../../lib/demand-capture/store.ts')

const first = {
  productId: 'starlight-academy-operator-lab',
  email: 'a@example.com',
  source: 'academy',
  referrer: 'https://starlightintelligence.academy/',
  utm: { utm_source: 'newsletter' },
  position: 3,
  createdAt: '2026-10-29T08:00:00.000Z',
  consent: true,
  role: 'founder',
}

test('mergeSignal returns the incoming signal when nothing is stored', () => {
  assert.deepEqual(mergeSignal(null, first), first)
})

test('mergeSignal keeps first-touch facts when step 2 arrives from another page', () => {
  const second = {
    ...first,
    source: 'frankx-community',
    referrer: undefined,
    utm: undefined,
    position: 99,
    createdAt: '2026-10-29T09:00:00.000Z',
    pain: 'I lose a day a week to manual agent babysitting',
    priceBand: '300-999',
  }
  const merged = mergeSignal(first, second)
  assert.equal(merged.source, 'academy')
  assert.equal(merged.referrer, first.referrer)
  assert.deepEqual(merged.utm, first.utm)
  assert.equal(merged.position, 3)
  assert.equal(merged.createdAt, first.createdAt)
  assert.equal(merged.pain, second.pain)
  assert.equal(merged.priceBand, '300-999')
})

test('mergeSignal never erases an earlier answer with a skipped field', () => {
  const merged = mergeSignal(first, { ...first, role: undefined, urgency: 'now' })
  assert.equal(merged.role, 'founder')
  assert.equal(merged.urgency, 'now')
})

test('mergeSignal lets a new answer replace an old one', () => {
  assert.equal(mergeSignal(first, { ...first, role: 'agency' }).role, 'agency')
})

test('claimPosition sends one EVAL so the read, increment and write run as one step', async () => {
  const calls = []
  const realFetch = globalThis.fetch
  globalThis.fetch = async (url, init) => {
    calls.push(JSON.parse(init.body))
    return new Response(JSON.stringify({ result: 7 }), { status: 200 })
  }
  try {
    const position = await claimPosition('starlight-academy-operator-lab', 'a@example.com')
    assert.equal(position, 7)
    assert.equal(calls.length, 1)
    const [command, script, numKeys, positionsKey, countKey, email] = calls[0]
    assert.equal(command, 'eval')
    assert.match(script, /HGET[\s\S]*INCR[\s\S]*HSET/)
    assert.equal(numKeys, '2')
    assert.equal(positionsKey, 'waitlist:starlight-academy-operator-lab:positions')
    assert.equal(countKey, 'waitlist:starlight-academy-operator-lab:count')
    assert.equal(email, 'a@example.com')
  } finally {
    globalThis.fetch = realFetch
  }
})
