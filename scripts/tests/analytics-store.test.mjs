import test from 'node:test'
import assert from 'node:assert/strict'
import { registerHooks } from 'node:module'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

// All I/O is intercepted. No live Redis, form submission or email provider is used.
const repo = new URL('../../', import.meta.url)
const fakeLimiter = 'data:text/javascript,' + encodeURIComponent(`
  export const analyticsRatelimit = { limit: async () => ({ success: true }) };
  export const getClientIdentifier = () => 'synthetic-client';
`)
const fakeNext = 'data:text/javascript,' + encodeURIComponent(`
  export const NextRequest = Request;
  export const NextResponse = Response;
`)
registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier === 'next/server') return { url: fakeNext, shortCircuit: true }
    if (specifier === '@/lib/ratelimit') return { url: fakeLimiter, shortCircuit: true }
    if (specifier.startsWith('@/')) return { url: new URL(specifier.slice(2) + '.ts', repo).href, shortCircuit: true }
    if (specifier.startsWith('.') && context.parentURL?.startsWith('file:')) {
      const url = new URL(specifier + '.ts', context.parentURL)
      if (existsSync(fileURLToPath(url))) return { url: url.href, shortCircuit: true }
    }
    return nextResolve(specifier, context)
  },
})

test('real Redis client and analytics routes keep outages distinct from empty results', async (t) => {
  const originalFetch = globalThis.fetch
  const originalError = console.error
  const envKeys = ['KV_REST_API_URL', 'KV_REST_API_TOKEN', 'UPSTASH_REDIS_REST_URL', 'UPSTASH_REDIS_REST_TOKEN']
  const originalEnv = Object.fromEntries(envKeys.map(key => [key, process.env[key]]))
  process.env.KV_REST_API_URL = 'https://redis.example.invalid'
  process.env.KV_REST_API_TOKEN = 'synthetic-token'
  let behavior = 'refused'
  const paths = []
  const logs = []
  console.error = (...args) => logs.push(args)
  globalThis.fetch = async (input, init) => {
    const url = new URL(input instanceof Request ? input.url : input)
    assert.equal(url.hostname, 'redis.example.invalid', 'unexpected network destination')
    assert.equal(new Headers(init.headers).get('authorization'), 'Bearer synthetic-token')
    paths.push(url.pathname)
    if (behavior === 'network') throw new TypeError('fetch failed', { cause: { code: 'ENOTFOUND' } })
    if (behavior === 'refused') return Response.json({ error: 'Rate limited Ada Visitor synthetic-token, command was: ["rpush", "ada@example.invalid"]' })
    const command = JSON.parse(init.body)
    return Response.json({ result: command[0].toLowerCase() === 'lrange' ? [] : 'OK' })
  }
  try {
    const { createClient } = await import('@vercel/kv')
    const { createRedisClient } = await import('../../lib/redis-client.ts')
    const analytics = await import('../../lib/pdf-analytics.ts')
    const recent = await import('../../app/api/analytics/recent-downloads/route.ts')
    const trackView = await import('../../app/api/analytics/track-view/route.ts')
    const trackDownload = await import('../../app/api/analytics/track-download/route.ts')
    const lead = await import('../../app/api/leads/create/route.ts')
    const dashboard = await import('../../app/api/dashboard/analytics/route.ts')
    const leads = await import('../../app/api/dashboard/leads/route.ts')
    const weekly = await import('../../app/api/dashboard/weekly-stats/route.ts')
    const client = await import('../../lib/client-analytics.ts')
    const request = (payload) => new Request('https://app.example.invalid', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload) })
    const readRequest = { nextUrl: new URL('https://app.example.invalid?guideSlug=soulbook') }
    const common = { guideSlug: 'soulbook', guideTitle: 'Synthetic guide', sessionId: 'synthetic-session' }

    await t.test('reproduces the HTTP 200 refusal and preserves the UpstashError without auto-pipelining', async () => {
      const pipelined = createClient({ url: process.env.KV_REST_API_URL, token: 'synthetic-token' })
      await assert.rejects(pipelined.get('synthetic'), TypeError)
      assert.equal(paths.at(-1), '/pipeline')
      const single = createRedisClient()
      await assert.rejects(single.get('synthetic'), error => error.name === 'UpstashError')
      assert.notEqual(paths.at(-1), '/pipeline')
    })
    await t.test('read helpers reject storage refusal instead of returning zero or empty collections', async () => {
      for (const read of [() => analytics.getRecentDownloadCount('soulbook'), () => analytics.getAllLeads(), () => analytics.getAnalyticsSummary(), () => analytics.getWeeklyStats()]) {
        await assert.rejects(read(), error => error.name === 'UpstashError')
      }
    })
    await t.test('read and write routes return failure with safe diagnostics; dashboards cannot return empty success', async () => {
      const calls = [
        () => recent.GET(readRequest),
        () => trackView.POST(request(common)),
        () => trackDownload.POST(request({ ...common, downloadMethod: 'direct' })),
        () => lead.POST(request({ ...common, email: 'ada@example.invalid', name: 'Ada Visitor' })),
        () => dashboard.GET(readRequest), () => leads.GET(), () => weekly.GET(readRequest),
      ]
      for (const call of calls) {
        const response = await call()
        assert.equal(response.status, 500)
        const payload = await response.json()
        assert.notEqual(payload.success, true)
        assert.doesNotMatch(JSON.stringify(payload), /Ada|Visitor|synthetic-token|ada@example|command was|redis\.example/)
      }
      assert.doesNotMatch(JSON.stringify(logs), /Ada|Visitor|synthetic-token|ada@example|command was|redis\.example/)
    })
    await t.test('successful empty reads remain zero and writes still return tracked records', async () => {
      behavior = 'healthy'
      assert.equal(await analytics.getRecentDownloadCount('soulbook'), 0)
      const count = await recent.GET(readRequest)
      assert.deepEqual(await count.json(), { success: true, count: 0 })
      const response = await trackDownload.POST(request({ ...common, downloadMethod: 'direct' }))
      const payload = await response.json()
      assert.equal(response.status, 200)
      assert.equal(payload.success, true)
      assert.equal(payload.download.guideSlug, 'soulbook')
    })
    await t.test('network outage returns safe failure and validation still rejects missing inputs', async () => {
      behavior = 'network'
      const response = await recent.GET(readRequest)
      const payload = await response.json()
      assert.equal(response.status, 500)
      assert.equal(payload.kind, 'network:ENOTFOUND')
      assert.equal((await trackView.POST(request({}))).status, 400)
    })
    await t.test('shared limiter still falls back locally without leaking its provider error', async () => {
      behavior = 'refused'
      const limiters = await import('../../lib/ratelimit.ts')
      for (let attempt = 0; attempt < 6; attempt++) {
        const result = await limiters.emailRatelimit.limit('synthetic-client')
        assert.equal(result.success, attempt < 5)
      }
      assert.doesNotMatch(JSON.stringify(logs), /Ada|Visitor|synthetic-token|ada@example|command was|redis\.example/)
    })
    await t.test('missing integration skips remote requests and enforces the existing local window', async () => {
      for (const key of envKeys) delete process.env[key]
      const before = paths.length
      const limiters = await import('../../lib/ratelimit.ts?unconfigured')
      for (let attempt = 0; attempt < 6; attempt++) {
        const result = await limiters.emailRatelimit.limit('synthetic-client')
        assert.equal(result.success, attempt < 5)
      }
      assert.equal(paths.length, before)
    })
    await t.test('client download counter rejects HTTP errors and malformed success; real zero stays valid', async () => {
      for (const [status, payload] of [[500, { error: 'Unavailable' }], [200, { success: false, count: 0 }], [200, { success: true, count: '0' }], [200, { success: true, count: -1 }]]) {
        globalThis.fetch = async () => Response.json(payload, { status })
        await assert.rejects(client.getRecentDownloadCount('soulbook'), /unavailable/)
      }
      globalThis.fetch = async () => Response.json({ success: true, count: 0 })
      assert.equal(await client.getRecentDownloadCount('soulbook'), 0)
      globalThis.fetch = async () => { throw new TypeError('fetch failed') }
      await assert.rejects(client.getRecentDownloadCount('soulbook'))
    })
  } finally {
    globalThis.fetch = originalFetch
    console.error = originalError
    for (const key of envKeys) {
      if (originalEnv[key] === undefined) delete process.env[key]
      else process.env[key] = originalEnv[key]
    }
  }
})
