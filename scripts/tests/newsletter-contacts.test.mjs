import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import vm from 'node:vm'
import ts from 'typescript'

const source = readFileSync(new URL('../../lib/newsletter/contacts.ts', import.meta.url), 'utf8')
const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText
const exports = {}
vm.runInNewContext(code, { exports, Response, AbortSignal })
const { createNewsletterContact, updateConfirmedNewsletterPreferences } = exports
const input = { email: ' Reader@Example.COM ', firstName: 'Reader', properties: { source: 'newsletter' }, segmentId: 'segment-fixture', newsletterTopicId: 'weekly-fixture', topics: [{ id: 'weekly-fixture', subscription: 'opt_in' }, { id: 'daily-fixture', subscription: 'opt_out' }] }

test('existing suppressed contact is never rewritten or enrolled', async () => {
  const calls = []
  const response = await createNewsletterContact(input, { apiKey: 'fixture', fetchImpl: async (...args) => { calls.push(args); return Response.json({ unsubscribed: true }) } })
  assert.equal(response.kind, 'existing')
  assert.equal(response.response.status, 200)
  assert.equal(calls.length, 1)
  assert.equal(calls[0][0], 'https://api.resend.com/contacts/reader%40example.com')
  assert.equal(calls[0][1].method, undefined)
})

test('creation binds segment and explicit topic states in one current API call', async () => {
  const calls = []
  const response = await createNewsletterContact(input, { apiKey: 'fixture', fetchImpl: async (...args) => { calls.push(args); return calls.length === 1 ? new Response(null, { status: 404 }) : Response.json({ id: 'contact-fixture' }, { status: 201 }) } })
  assert.equal(response.response.status, 201)
  assert.equal(calls.length, 2)
  assert.equal(calls[1][0], 'https://api.resend.com/contacts')
  const body = JSON.parse(calls[1][1].body)
  assert.deepEqual(body.segments, [{ id: 'segment-fixture' }])
  assert.deepEqual(body.topics, input.topics)
  assert.equal(body.email, 'reader@example.com')
  assert.equal(Object.hasOwn(body, 'unsubscribed'), false)
})

for (const status of [401, 403, 409, 429, 500]) {
  test('lookup failure ' + status + ' never creates or resubscribes a contact', async () => {
    let calls = 0
    const response = await createNewsletterContact(input, { apiKey: 'fixture', fetchImpl: async () => { calls++; return new Response(null, { status }) } })
    assert.equal(response.response.status, status)
    assert.equal(calls, 1)
  })
}

test('network failure is not treated as a missing contact', async () => {
  let calls = 0
  await assert.rejects(createNewsletterContact(input, { apiKey: 'fixture', fetchImpl: async () => { calls++; throw new Error('fixture timeout') } }), /fixture timeout/)
  assert.equal(calls, 1)
})

test('missing segment or key fails before network IO', async () => {
  let calls = 0
  const fetchImpl = async () => { calls++; return new Response() }
  await assert.rejects(createNewsletterContact({ ...input, segmentId: '' }, { apiKey: 'fixture', fetchImpl }), /configuration/)
  await assert.rejects(createNewsletterContact(input, { apiKey: '', fetchImpl }), /configuration/)
  assert.equal(calls, 0)
})

test('minimal-property retry retains segment and all topic states', async () => {
  let posts = 0
  const seen = []
  const fetchImpl = async (url, init) => {
    if (!init.method) return new Response(null, { status: 404 })
    posts++; seen.push(JSON.parse(init.body))
    return new Response(null, { status: posts === 1 ? 422 : 201 })
  }
  assert.equal((await createNewsletterContact(input, { apiKey: 'fixture', fetchImpl })).response.status, 422)
  const { properties, ...minimal } = input
  assert.equal((await createNewsletterContact(minimal, { apiKey: 'fixture', fetchImpl })).response.status, 201)
  assert.deepEqual(seen[1].segments, seen[0].segments)
  assert.deepEqual(seen[1].topics, seen[0].topics)
  assert.equal(Object.hasOwn(seen[1], 'properties'), false)
})

test('provider create conflict remains an error, never a known existing contact', async () => {
  let calls = 0
  const result = await createNewsletterContact(input, { apiKey: 'fixture', fetchImpl: async () => new Response(null, { status: ++calls === 1 ? 404 : 409 }) })
  assert.equal(result.kind, 'provider-error')
  assert.equal(result.response.status, 409)
})

test('a resource-only signup does not join the newsletter Segment', async () => {
  const calls = []
  await createNewsletterContact({ ...input, topics: input.topics.map(t => ({ ...t, subscription: 'opt_out' })) }, { apiKey: 'fixture', fetchImpl: async (...args) => { calls.push(args); return new Response(null, { status: calls.length === 1 ? 404 : 201 }) } })
  assert.equal(Object.hasOwn(JSON.parse(calls[1][1].body), 'segments'), false)
})

test('confirmed enrollment fails closed pending durable revision fencing', async () => {
  const calls = []
  const result = await updateConfirmedNewsletterPreferences(input, { apiKey: 'fixture', fetchImpl: async (...args) => { calls.push(args); return calls.length === 1 ? Response.json({ unsubscribed: false }) : new Response(null, { status: 200 }) } })
  assert.equal(result.kind, 'pending')
  assert.equal(result.response.status, 503)
  assert.deepEqual(calls.map(c => c[1].method || 'GET'), ['GET'])
})

test('confirmed opt-in cannot reactivate a globally suppressed contact', async () => {
  let calls = 0
  const result = await updateConfirmedNewsletterPreferences(input, { apiKey: 'fixture', fetchImpl: async () => { calls++; return Response.json({ unsubscribed: true }) } })
  assert.equal(result.kind, 'suppressed')
  assert.equal(calls, 1)
})

test('withdrawal removes targeting before updating Topics, including already absent membership', async () => {
  const calls = []
  const result = await updateConfirmedNewsletterPreferences({ ...input, topics: input.topics.map(t => ({ ...t, subscription: 'opt_out' })) }, { apiKey: 'fixture', fetchImpl: async (...args) => { calls.push(args); return calls.length === 1 ? Response.json({ unsubscribed: true }) : new Response(null, { status: calls.length === 2 ? 404 : 200 }) } })
  assert.equal(result.kind, 'updated')
  assert.deepEqual(calls.map(c => c[1].method || 'GET'), ['GET', 'DELETE', 'PATCH'])
})

test('failed Topic update never adds a confirmed contact to targeting', async () => {
  const calls = []
  const result = await updateConfirmedNewsletterPreferences({ ...input, topics: input.topics.map(t => ({ ...t, subscription: 'opt_out' })) }, { apiKey: 'fixture', fetchImpl: async (...args) => { calls.push(args); return calls.length === 1 ? Response.json({ unsubscribed: false }) : new Response(null, { status: calls.length === 2 ? 200 : 500 }) } })
  assert.equal(result.kind, 'provider-error')
  assert.equal(calls.length, 3)
})

import crypto from 'node:crypto'
function routeHandler(file, fetchImpl) {
  const helperExports = {}
  const common = { Response, Headers, URL, AbortSignal, fetch: fetchImpl, Buffer, console: { warn() {}, error() {} } }
  vm.runInNewContext(code, { ...common, exports: helperExports })
  const routeSource = readFileSync(new URL('../../' + file, import.meta.url), 'utf8')
  const compiled = ts.transpileModule(routeSource, { compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true } }).outputText
  const routeExports = {}
  const require = name => {
    if (name === 'node:crypto') return crypto
    if (name === 'next/server') return { NextResponse: { json: Response.json.bind(Response), redirect: (url, status = 307) => new Response(null, { status, headers: { location: String(url) } }) } }
    if (name === '@/lib/newsletter/contacts') return helperExports
    if (name === '@/lib/ratelimit') return { emailRatelimit: { limit: async () => ({ success: true }) }, getClientIdentifier: () => 'fixture' }
    if (name === '@/lib/seo') return { siteConfig: { url: 'https://frankx.ai' } }
    if (name === '@/lib/diagnostic/waitlist-intents') return { sanitizeIntent: () => undefined }
    return new Proxy({}, { get: () => () => ({ subject: 'Fixture', html: '<p>Fixture</p>' }) })
  }
  vm.runInNewContext(compiled, { ...common, exports: routeExports, require, process: { env: { RESEND_API_KEY: 'fixture', RESEND_SEGMENT_ID: 'segment-fixture', NEWSLETTER_PREFERENCES_SECRET: 'fixture' } } })
  return routeExports.POST
}
for (const route of ['app/api/subscribe/route.ts', 'app/api/newsletter/route.ts']) {
  for (const conflictAt of ['lookup', 'create']) {
    test(route + ' rejects provider ' + conflictAt + ' conflict instead of reporting success', async () => {
      const handler = routeHandler(route, async (url, init) => {
        if (url.includes('growth-capture')) return Response.json({ accepted: true })
        if (!init.method) return new Response(null, { status: conflictAt === 'lookup' ? 409 : 404 })
        return new Response(null, { status: 409 })
      })
      const response = await handler({ url: 'https://frankx.ai/api/newsletter', headers: new Headers({ 'content-type': 'application/json' }), json: async () => ({ email: 'reader@example.com' }) })
      assert.equal(response.status, route.includes('/subscribe/') ? 500 : 502)
      assert.notEqual((await response.json()).success, true)
    })
  }
}

test('signed route enrollment reports pending without preference writes', async () => {
  const email = 'reader@example.com'
  const payload = Buffer.from(JSON.stringify({ v: 1, topics: ['newsletter'], exp: Date.now() + 60000 })).toString('base64url')
  const signature = crypto.createHmac('sha256', 'fixture').update([email, payload].join(String.fromCharCode(10))).digest('base64url')
  const calls = []
  const handler = routeHandler('app/api/subscribe/route.ts', async (url, init) => {
    calls.push({ url, method: init.method || 'GET' })
    return !init.method ? Response.json({ unsubscribed: false }) : Response.json({})
  })
  const response = await handler({ url: 'https://frankx.ai/api/subscribe', headers: new Headers({ 'content-type': 'application/json' }), json: async () => ({ email, topics: ['newsletter'], preferenceToken: payload + '.' + signature }) })
  assert.equal(response.status, 503)
  assert.notEqual((await response.json()).updated, true)
  assert.deepEqual(calls.map(c => c.method), ['GET'])
})

test('legacy existing contact response is on-file, never new enrollment', async () => {
  const handler = routeHandler('app/api/newsletter/route.ts', async url => url.includes('growth-capture') ? Response.json({ accepted: true }) : Response.json({ unsubscribed: true }))
  const response = await handler({ url: 'https://frankx.ai/api/newsletter', headers: new Headers({ 'content-type': 'application/json' }), json: async () => ({ email: 'reader@example.com' }) })
  const body = await response.json()
  assert.equal(body.duplicate, true)
  assert.equal(body.updated, false)
  assert.match(body.message, /Confirm your preferences/)
})
