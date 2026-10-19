import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import test from 'node:test'
import ts from 'typescript'

const require = createRequire(import.meta.url)
const { NextRequest, NextResponse } = require('next/server')
const repoFile = (path) => new URL(`../../${path}`, import.meta.url)
const registry = JSON.parse(readFileSync(repoFile('data/products.graph.json'), 'utf8'))

// Runs the real modules. Only the store's network calls and the rate limiter are replaced.
function loadModule(path, imports = {}, fetch = () => assert.fail('unexpected network request')) {
  const source = readFileSync(repoFile(path), 'utf8')
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  })
  const module = { exports: {} }
  const localRequire = (id) => (Object.hasOwn(imports, id) ? imports[id] : require(id))
  new Function('require', 'module', 'exports', 'fetch', outputText)(localRequire, module, module.exports, fetch)
  return module.exports
}

const productsModule = (rows = registry) =>
  loadModule('lib/waitlist/products.ts', { '@/data/products.graph.json': { default: rows } })

/** Upstash REST in memory: the same commands the shared store sends. */
function fakeKv() {
  const hashes = new Map()
  const strings = new Map()
  const fetch = async (url, options) => {
    assert.equal(url, 'https://kv.example.invalid')
    const [cmd, key, field, value] = JSON.parse(options.body)
    const hash = hashes.get(key) ?? new Map()
    hashes.set(key, hash)
    let result = null
    if (cmd === 'hget') result = hash.get(field) ?? null
    if (cmd === 'hset') hash.set(field, value), (result = 1)
    if (cmd === 'incr') strings.set(key, String(Number(strings.get(key) ?? 0) + 1)), (result = Number(strings.get(key)))
    if (cmd === 'get') result = strings.get(key) ?? null
    return { ok: true, json: async () => ({ result }) }
  }
  return { fetch, hashes }
}

function loadCapture(kvFetch) {
  process.env.KV_REST_API_URL = 'https://kv.example.invalid'
  process.env.KV_REST_API_TOKEN = 'test-token'
  delete process.env.RESEND_API_KEY
  const store = loadModule('lib/demand-capture/store.ts', {}, kvFetch)
  const handler = loadModule('lib/demand-capture/handler.ts', { './store': store })
  const products = productsModule()
  const join = loadModule('lib/waitlist/join.ts', {
    '@/lib/demand-capture/handler': handler,
    '@/lib/ratelimit': { emailRatelimit: { limit: async () => ({ success: true }) }, getClientIdentifier: () => 'test' },
    '@/lib/waitlist/products': products,
  })
  return { handler, products, join }
}

function loadDemandRoute({ join, products }, legacy) {
  return loadModule('app/api/demand/route.ts', {
    '@/lib/diagnostic/waitlist-intents': loadModule('lib/diagnostic/waitlist-intents.ts'),
    '@/lib/waitlist/join': join,
    '@/lib/waitlist/legacy-demand': { patchDemandProperties: legacy },
    '@/lib/waitlist/products': products,
  })
}

const post = (path, body) =>
  new NextRequest(`https://frankx.ai${path}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  })

test('both frankx registry products are waitlist-only until their row records a gate PASS', () => {
  const { isWaitlistOnly } = productsModule()
  assert.equal(isWaitlistOnly('creative-ai-toolkit'), true)
  assert.equal(isWaitlistOnly('creation-chronicles'), true)
  assert.equal(isWaitlistOnly('agentic-creator-os'), false, 'a product with no registry row is untouched')

  const passed = { products: registry.products.map((row) => ({ ...row, gate: 'G5 PASS 2026-10-14 receipt queen/reports/product-gates/x.md' })) }
  assert.equal(productsModule(passed).isWaitlistOnly('creative-ai-toolkit'), false)

  const intermediate = { products: registry.products.map((row) => ({ ...row, gate: 'G1 PASS 2026-10-14 receipt queen/reports/product-gates/x.md' })) }
  assert.equal(productsModule(intermediate).isWaitlistOnly('creative-ai-toolkit'), true, 'only a G5 PASS lifts the hold, not an intermediate gate')

  const revoked = { products: registry.products.map((row) => ({ ...row, gate: 'G1 FAIL 2026-10-14; earlier PASS revoked' })) }
  assert.equal(productsModule(revoked).isWaitlistOnly('creative-ai-toolkit'), true, 'a PASS mentioned later in the text is not a pass')

  const closedList = { products: registry.products.map((row) => ({ ...row, waitlist: { ...row.waitlist, enabled: false } })) }
  assert.equal(productsModule(closedList).isWaitlistOnly('creative-ai-toolkit'), true, 'closing the waitlist never opens a sale')
})

test('a consented /api/demand call becomes a DemandSignal through the shared handler', async () => {
  const kv = fakeKv()
  const capture = loadCapture(kv.fetch)
  const route = loadDemandRoute(capture, async () => assert.fail('the legacy path must not run'))

  const response = await route.POST(post('/api/demand', {
    email: 'Unit-Test@Example.invalid',
    intent: 'creative-ai-toolkit',
    consent: true,
    priceBand: '25-99',
    role: 'Creator',
    pain: 'Ship one piece a week',
  }))
  assert.equal(response.status, 200)
  const body = await response.json()
  assert.equal(body.success, true)
  assert.equal(body.position, undefined, 'for a first signup the position equals the count, so it is withheld below the threshold')
  assert.equal(body.publicCount, null, 'a count below the threshold is withheld')
  assert.equal('count' in body, false, 'the raw count is not part of the public response')
  assert.equal(body.foundingSeatsLeft, null, 'seats left would reveal the withheld count')

  const stored = JSON.parse(kv.hashes.get('waitlist:creative-ai-toolkit:signals').get('unit-test@example.invalid'))
  assert.equal(stored.productId, 'creative-ai-toolkit')
  assert.equal(stored.priceBand, '25-99')
  assert.equal(stored.role, 'Creator')
  assert.equal(stored.consent, true)
})

test('callers without product consent keep the pre-migration behaviour', async () => {
  const capture = loadCapture(() => assert.fail('no DemandSignal without consent'))
  const legacyCalls = []
  const route = loadDemandRoute(capture, async (_request, raw) => {
    legacyCalls.push(raw)
    return NextResponse.json({ success: true })
  })

  for (const body of [
    { email: 'a@example.invalid', intent: 'creative-ai-toolkit', priceBand: 'under-25' },
    { email: 'a@example.invalid', intent: 'bv-kit', consent: true, role: 'Creator' },
  ]) {
    const response = await route.POST(post('/api/demand', body))
    assert.equal(response.status, 200)
  }
  assert.equal(legacyCalls.length, 2)
})

test('/api/waitlist refuses a product with no registry row and requires consent', async () => {
  const capture = loadCapture(fakeKv().fetch)
  const unknown = await capture.join.joinWaitlist(post('/api/waitlist', {}), { productId: 'agentic-creator-os', email: 'a@example.invalid', consent: true })
  assert.equal(unknown.status, 404)
  const noConsent = await capture.join.joinWaitlist(post('/api/waitlist', {}), { productId: 'creation-chronicles', email: 'a@example.invalid' })
  assert.equal(noConsent.status, 400)
})
