import assert from 'node:assert/strict'
import test from 'node:test'
import { registerHooks } from 'node:module'
import { pathToFileURL, fileURLToPath } from 'node:url'
import { resolve, dirname } from 'node:path'
import { readFileSync } from 'node:fs'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
const fakeAuth = `export const hasGoogleCredentials=()=>globalThis.__measurementCredentials; export const getGoogleAuthResult=async()=>globalThis.__measurementAuth;`
const authUrl = `data:text/javascript,${encodeURIComponent(fakeAuth)}`
registerHooks({ resolve(specifier, context, next) {
  if (specifier.endsWith('/google-auth.ts') || specifier === './google-auth.ts') return { url: authUrl, shortCircuit: true }
  if (specifier.startsWith('@/')) return next(pathToFileURL(resolve(root, specifier.slice(2) + '.ts')).href, context)
  return next(specifier, context)
} })
const ga = await import('../../lib/observability/google-analytics.ts')
const gsc = await import('../../lib/observability/google-search-console.ts')
const summary = await import('../../lib/observability/observability-summary.ts')
const analytics = await import('../../app/api/admin/observability/analytics/route.ts')
const search = await import('../../app/api/admin/observability/search-console/route.ts')
const inspect = await import('../../app/api/admin/observability/inspect/route.ts')
const summaryRoute = await import('../../app/api/admin/observability/summary/route.ts')
const originalFetch = globalThis.fetch
const response = (data, status = 200) => new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } })
const gaResponse = (init, data, status = 200) => {
  const body = JSON.parse(init.body)
  return response({ metricHeaders: body.metrics.map(({ name }) => ({ name, type: 'TYPE_INTEGER' })), dimensionHeaders: (body.dimensions ?? []).map(({ name }) => ({ name })), ...data }, status)
}
const values = (...nums) => ({ metricValues: nums.map((n) => ({ value: String(n) })) })
let requests = []
function reset() {
  globalThis.__measurementCredentials = true
  globalThis.__measurementAuth = { status: 'ok', token: 'test-token' }
  process.env.GA4_PROPERTY_ID = '123'
  process.env.GA4_HOSTNAMES = 'frankx.ai,www.frankx.ai'
  process.env.GA4_STREAM_ID = '456'
  process.env.GOOGLE_SEARCH_CONSOLE_SITE_URL = 'sc-domain:frankx.ai'
  requests = []
  globalThis.fetch = async (url, init) => { requests.push({ url, body: JSON.parse(init.body) }); return String(url).includes('analyticsdata.googleapis.com') ? gaResponse(init, { rows: [] }) : response({ rows: [] }) }
}
test.after(() => { globalThis.fetch = originalFetch })

test('missing identity and credentials return unavailable from every reader, never synthetic rows', async () => {
  reset(); delete process.env.GA4_PROPERTY_ID; delete process.env.GOOGLE_SEARCH_CONSOLE_SITE_URL; globalThis.__measurementCredentials = false
  for (const reader of [ga.getGA4Overview, ga.getGA4TopPages, ga.getGA4TrafficSources, ga.getGA4Realtime, gsc.getSearchPerformance, () => gsc.inspectUrlIndexStatus('https://www.frankx.ai/blog/a')]) {
    const result = await reader(); assert.equal(result.status, 'not_configured'); assert.equal(result.data, null)
  }
  assert.equal(requests.length, 0)
  assert.equal(ga.getGA4PropertyId(), null); assert.equal(gsc.getSearchConsoleSiteUrl(), null)
})
test('Google auth failures preserve unauthorized versus upstream failure', async () => {
  for (const status of ['unauthorized', 'upstream_error']) {
    reset(); globalThis.__measurementAuth = { status, token: null }
    assert.equal((await ga.getGA4Overview()).status, status)
    assert.equal((await gsc.getSearchPerformance()).status, status)
  }
})
test('provider HTTP failures are unavailable in each GA4 view', async () => {
  for (const status of [401, 403, 429, 500]) {
    reset(); globalThis.fetch = async () => response({}, status)
    for (const reader of [ga.getGA4Overview, ga.getGA4TopPages, ga.getGA4TrafficSources, ga.getGA4Realtime]) {
      const result = await reader(); assert.equal(result.status, [401, 403].includes(status) ? 'unauthorized' : 'upstream_error'); assert.equal(result.data, null)
    }
  }
})
test('successful empty provider reports distinguish observed zero from unknown ratios', async () => {
  reset()
  const result = await ga.getGA4Overview(); assert.equal(result.status, 'ok'); assert.equal(result.data.totalUsers, 0); assert.equal(result.data.bounceRate, null); assert.deepEqual(result.data.dailyTrends, [])
  const seo = await gsc.getSearchPerformance(); assert.equal(seo.status, 'ok'); assert.equal(seo.data.totalClicks, 0); assert.equal(seo.data.averageCtr, null); assert.equal(seo.data.averagePosition, null)
})
test('overview remains partial when daily trends fail and never borrows fabricated trend values', async () => {
  reset(); let call = 0
  globalThis.fetch = async (_url, init) => ++call === 1 ? gaResponse(init, { rows: [values(12, 10, 14, 20, .25, 99)] }) : response({}, 503)
  const result = await ga.getGA4Overview(); assert.equal(result.status, 'partial'); assert.equal(result.data.totalUsers, 12); assert.equal(result.data.dailyTrends, null); assert.equal(result.issues.length, 1)
})
test('malformed provider metrics fail instead of returning NaN, partial numeric parses or invented defaults', async () => {
  for (const bad of ['12garbage', 'NaN', '', ' ', '\t', '-1']) {
    reset(); globalThis.fetch = async (_url, init) => gaResponse(init, { rows: [values(bad, 1, 1, 1, .2, 10)] })
    const result = await ga.getGA4Overview(); assert.equal(result.status, 'upstream_error'); assert.equal(result.data, null)
  }
})
test('GA4 historical reports enforce exact hostname scope and carry provider timezone', async () => {
  reset(); globalThis.fetch = async (url, init) => { requests.push({ url, body: JSON.parse(init.body) }); return gaResponse(init, { rows: [], metadata: { timeZone: 'Europe/Amsterdam' } }) }
  const result = await ga.getGA4Overview(28)
  assert.equal(result.source.timeZone, 'Europe/Amsterdam')
  assert.deepEqual(requests[0].body.dimensionFilter.filter.inListFilter.values, ['frankx.ai', 'www.frankx.ai'])
  assert.equal(requests[0].body.dateRanges[0].endDate, 'yesterday')
})
test('realtime uses configured web stream scope and distinct aggregate total, without a hostname dimension', async () => {
  reset(); await ga.getGA4Realtime()
  assert.equal(requests[0].body.dimensionFilter.filter.fieldName, 'streamId'); assert.equal(requests[0].body.dimensionFilter.filter.stringFilter.value, '456'); assert.equal(requests[0].body.dimensions, undefined)
  delete process.env.GA4_STREAM_ID; assert.equal((await ga.getGA4Realtime()).status, 'not_configured')
})
test('acquisition sources use provider rows and label session-share denominator', async () => {
  reset(); globalThis.fetch = async (_url, init) => gaResponse(init, { rows: [ { ...values(3, 4), dimensionValues: [{ value: 'chatgpt.com' }, { value: 'Referral' }] }, { ...values(2, 6), dimensionValues: [{ value: 'google' }, { value: 'Organic Search' }] } ] })
  const result = await ga.getGA4TrafficSources(); assert.equal(result.data[0].source, 'chatgpt.com'); assert.equal(result.data[0].percentage, 40); assert.match(result.source.coverage, /returned sessions/)
})
test('GSC totals come from the dimensionless provider request, not top query sum', async () => {
  reset(); globalThis.fetch = async (url, init) => {
    const body = JSON.parse(init.body); requests.push({ url, body })
    const metrics = { clicks: body.dimensions ? 2 : 100, impressions: body.dimensions ? 20 : 1000, ctr: .1, position: 8 }
    return response({ rows: [ { ...metrics, ...(body.dimensions ? { keys: [body.dimensions[0] === 'query' ? 'voice prompting' : 'https://www.frankx.ai/blog/a'] } : {}) } ] })
  }
  const result = await gsc.getSearchPerformance({ days: 28 }); assert.equal(result.data.totalClicks, 100); assert.equal(result.data.topQueries[0].clicks, 2)
  assert.equal(requests[0].body.dimensions, undefined); assert.equal(requests[0].body.dataState, 'final'); assert.equal(result.source.timeZone, 'America/Los_Angeles'); assert.match(result.source.coverage, /anonymized/)
})
test('partial GSC keeps available page/query evidence with unknown property totals', async () => {
  reset(); globalThis.fetch = async (url, init) => JSON.parse(init.body).dimensions ? response({ rows: [] }) : response({}, 500)
  const result = await gsc.getSearchPerformance(); assert.equal(result.status, 'partial'); assert.equal(result.data.totalClicks, null); assert.deepEqual(result.data.topQueries, [])
})
test('inspection has no passing fallback and rejects targets outside configured property', async () => {
  reset(); globalThis.fetch = async () => response({}, 403)
  const denied = await gsc.inspectUrlIndexStatus('https://www.frankx.ai/blog/a'); assert.equal(denied.status, 'unauthorized'); assert.equal(denied.data, null)
  const outside = await gsc.inspectUrlIndexStatus('https://frankx.ai.evil.example/blog/a'); assert.equal(outside.status, 'not_configured'); assert.equal(outside.data, null)
  globalThis.fetch = async () => response({ inspectionResult: { indexStatusResult: { verdict: 'PASS' } } })
  const real = await gsc.inspectUrlIndexStatus('https://www.frankx.ai/blog/a'); assert.equal(real.status, 'ok'); assert.equal(real.data.mobileUsabilityVerdict, undefined)
})
test('all API views return success false and non-success HTTP when unconfigured', async () => {
  reset(); delete process.env.GA4_PROPERTY_ID; delete process.env.GOOGLE_SEARCH_CONSOLE_SITE_URL
  for (const view of ['all', 'overview', 'pages', 'sources', 'realtime']) {
    const res = await analytics.GET(new Request(`https://example.test/api?view=${view}`)); assert.equal(res.status, 503); const body = await res.json(); assert.equal(body.success, false); assert.equal(body.status, 'not_configured')
  }
  for (const route of [search, summaryRoute]) { const res = await route.GET(new Request('https://example.test/api')); assert.equal(res.status, 503); assert.equal((await res.json()).success, false) }
  const res = await inspect.POST(new Request('https://example.test/api', { method: 'POST', body: JSON.stringify({ url: 'https://www.frankx.ai/blog/a' }) })); assert.equal(res.status, 503); assert.equal((await res.json()).success, false)
})
test('API validation rejects unknown views and malformed inspection bodies', async () => {
  reset(); assert.equal((await analytics.GET(new Request('https://example.test/api?view=bogus'))).status, 400)
  assert.equal((await inspect.POST(new Request('https://example.test/api', { method: 'POST', body: '{' }))).status, 400)
})
test('summary and Markdown expose unknown business counts without fabricated demand or crashes', async () => {
  reset(); globalThis.__measurementCredentials = false
  const report = await summary.getObservabilitySummary(); assert.equal(report.demandCapture.data, null); assert.equal(report.status, 'not_configured')
  const markdown = summary.formatObservabilityMarkdownBrief(report); assert.match(markdown, /Total users: unavailable/); assert.doesNotMatch(markdown, /482|1240|890|Simulated/)
})
test('dashboard consumes every result envelope and has no passing inspection or demand fixtures', () => {
  const source = readFileSync(resolve(root, 'app/admin/analytics/AnalyticsDashboardClient.tsx'), 'utf8')
  assert.match(source, /summary\.traffic\.data/); assert.match(source, /summary\.seo\.data/); assert.match(source, /summary\.topPages\.data/); assert.match(source, /summary\.trafficSources\.data/)
  assert.doesNotMatch(source, /High-Fidelity Simulation|284 would-pay|142 orders|56 would-pay|198 downloads|\|\| 'ALLOWED'|\|\| 'PASS'/)
})
test('URL-prefix inspection compares origins rather than accepting a hostname prefix attack', async () => {
  reset(); process.env.GOOGLE_SEARCH_CONSOLE_SITE_URL = 'https://frankx.ai'
  const result = await gsc.inspectUrlIndexStatus('https://frankx.ai.evil.example/blog/a')
  assert.equal(result.status, 'not_configured'); assert.equal(result.data, null); assert.equal(requests.length, 0)
})
test('all-unavailable API responses identify upstream failure without returning a successful snapshot', async () => {
  reset(); globalThis.fetch = async () => response({}, 500)
  const res = await analytics.GET(new Request('https://example.test/api?view=sources'))
  assert.equal(res.status, 502); const body = await res.json(); assert.equal(body.success, false); assert.equal(body.status, 'upstream_error'); assert.equal(body.data.data, null)
})
test('malformed Search Console rows and unavailable inspection payloads fail closed', async () => {
  reset(); globalThis.fetch = async () => response({ rows: [{ clicks: '2junk', impressions: 10, ctr: .2, position: 2 }] })
  const search = await gsc.getSearchPerformance(); assert.equal(search.status, 'upstream_error'); assert.equal(search.data, null)
  globalThis.fetch = async () => response({})
  const inspected = await gsc.inspectUrlIndexStatus('https://www.frankx.ai/blog/a'); assert.equal(inspected.status, 'upstream_error'); assert.equal(inspected.data, null)
})
test('CLI shares the result contract and exits nonzero when identities are unavailable', async () => {
  const { spawnSync } = await import('node:child_process')
  const child = spawnSync(process.execPath, ['scripts/observability/analytics-cli.mjs', '--json'], { cwd: root, encoding: 'utf8', env: { PATH: process.env.PATH } })
  assert.equal(child.status, 2); const data = JSON.parse(child.stdout)
  assert.equal(data.status, 'not_configured'); assert.equal(data.traffic.data, null); assert.equal(data.demandCapture.data, null)
})
test('GA4 rejects HTTP 200 objects without report headers while preserving valid omitted-row empty reports', async () => {
  for (const raw of [{}, { rows: [] }, { metricHeaders: [{ name: 'wrongMetric' }] }]) {
    reset(); globalThis.fetch = async () => response(raw)
    const result = await ga.getGA4Overview(); assert.equal(result.status, 'upstream_error'); assert.equal(result.data, null)
  }
  reset(); globalThis.fetch = async (_url, init) => gaResponse(init, {})
  const result = await ga.getGA4Overview(); assert.equal(result.status, 'ok'); assert.equal(result.data.totalUsers, 0); assert.deepEqual(result.data.dailyTrends, [])
})
test('GA4 rejects wrong report dimensions and metric arity', async () => {
  reset(); globalThis.fetch = async (_url, init) => gaResponse(init, { dimensionHeaders: [{ name: 'incorrect' }], rows: [] })
  assert.equal((await ga.getGA4TopPages()).status, 'upstream_error')
  reset(); globalThis.fetch = async (_url, init) => gaResponse(init, { rows: [values(12)] })
  assert.equal((await ga.getGA4Overview()).status, 'upstream_error')
})
test('realtime reports aggregate users while leaving unqueried active pages unknown', async () => {
  reset(); globalThis.fetch = async (_url, init) => gaResponse(init, { rows: [values(5)] })
  const result = await ga.getGA4Realtime(); assert.equal(result.status, 'ok'); assert.equal(result.data.activeUsersLast30Min, 5); assert.equal(result.data.activePages, null)
})
test('whitespace GSC metrics are rejected rather than converted to observed zero', async () => {
  reset(); globalThis.fetch = async () => response({ rows: [{ clicks: ' ', impressions: 10, ctr: .2, position: 2 }] })
  const result = await gsc.getSearchPerformance(); assert.equal(result.status, 'upstream_error'); assert.equal(result.data, null)
})
test('request ordering commits only the latest reporting window when responses arrive in reverse order', async () => {
  const { createLatestRequest } = await import('../../lib/observability/latest-request.ts')
  const run = createLatestRequest(), commits = [], errors = []
  let first, second
  const firstTask = run(() => new Promise((resolve) => { first = resolve }), { commit: (value) => commits.push(value), fail: () => errors.push('first') })
  const secondTask = run(() => new Promise((resolve) => { second = resolve }), { commit: (value) => commits.push(value), fail: () => errors.push('second') })
  second({ periodDays: 90 }); await secondTask
  first({ periodDays: 7 }); await firstTask
  assert.deepEqual(commits, [{ periodDays: 90 }]); assert.deepEqual(errors, [])
})
test('a failed latest request preserves the previous displayed snapshot and stale failures cannot reset it', async () => {
  const { createLatestRequest } = await import('../../lib/observability/latest-request.ts')
  const run = createLatestRequest(); let displayed = { periodDays: 28 }, settled = 0, errors = 0, rejectOld
  const callbacks = { commit: (value) => { displayed = value }, fail: () => { errors++ }, settled: () => { settled++ } }
  const oldTask = run(() => new Promise((_resolve, reject) => { rejectOld = reject }), callbacks)
  await run(async () => { throw new Error('Network unavailable') }, callbacks)
  assert.deepEqual(displayed, { periodDays: 28 }); assert.equal(errors, 1); assert.equal(settled, 1)
  rejectOld(new Error('Late failure')); await oldTask
  assert.equal(errors, 1); assert.equal(settled, 1)
})
