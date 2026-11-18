// Behaviour tests for the paid path: signed download links, the route that
// honours them, and Stripe session fulfilment. Nothing here calls a provider;
// fetch is replaced in every case.
//
//   node --experimental-strip-types --test scripts/tests/paid-delivery.test.mjs
import { register } from 'node:module'
import { pathToFileURL, fileURLToPath } from 'node:url'
import { resolve, dirname } from 'node:path'
import test from 'node:test'
import assert from 'node:assert/strict'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
register(pathToFileURL(resolve(ROOT, 'scripts/test-utils/alias-loader.mjs')).href, import.meta.url, { data: { root: ROOT } })
const load = (path) => import(pathToFileURL(resolve(ROOT, path)).href)

process.env.EMAIL_TOKEN_SECRET = 'test-only-secret'
process.env.NEXT_PUBLIC_SITE_URL = 'https://www.frankx.ai'

const { buildPaidDownloadUrl, verifyPaidDownload, resolvePaidBlobKey, PaidDownloadConfigError, PAID_DOWNLOAD_TTL_MS } =
  await load('lib/paid-download.ts')
const { generateProductEmailData } = await load('lib/delivery.ts')
const { fulfilCheckoutSession } = await load('lib/purchase-fulfilment.ts')
const { CHECKOUT_PRODUCTS } = await load('lib/checkout-products.ts')
const { PURCHASABLE_STATUS_PREFIX } = await load('lib/checkout-gate.ts')
const { GET } = await load('app/api/download/paid/route.ts')

// A product whose file has a blob registered in data/products.json, and one whose file has none.
const DELIVERABLE = { id: 'system-architect-starter-kit', file: 'starter-kit-v1.zip', blobKey: 'products/starter-kit/starter-kit-v1.zip' }
const UNDELIVERABLE = { id: 'creative-ai-toolkit', file: 'creative-ai-toolkit-v1.pdf' }
const PURCHASED_AT = Date.UTC(2026, 10, 18)

const linkParts = (url) => {
  const { searchParams } = new URL(url)
  return [searchParams.get('product'), searchParams.get('file'), Number(searchParams.get('exp')), searchParams.get('sig')]
}
const withoutSecret = async (run) => {
  const saved = process.env.EMAIL_TOKEN_SECRET
  delete process.env.EMAIL_TOKEN_SECRET
  try { return await run() } finally { process.env.EMAIL_TOKEN_SECRET = saved }
}
const withFetch = async (impl, run) => {
  const saved = globalThis.fetch
  const calls = []
  globalThis.fetch = async (...args) => { calls.push(args); return impl(...args) }
  try { return [await run(), calls] } finally { globalThis.fetch = saved }
}

test('a signed link verifies, and any altered part does not', () => {
  const [product, file, exp, sig] = linkParts(buildPaidDownloadUrl(DELIVERABLE.id, DELIVERABLE.file, PURCHASED_AT, 'https://www.frankx.ai'))
  assert.equal(exp, PURCHASED_AT + PAID_DOWNLOAD_TTL_MS)
  assert.equal(verifyPaidDownload(product, file, exp, sig, PURCHASED_AT), 'ok')
  assert.equal(verifyPaidDownload('command-center-template', file, exp, sig, PURCHASED_AT), 'invalid')
  assert.equal(verifyPaidDownload(product, 'other.zip', exp, sig, PURCHASED_AT), 'invalid')
  assert.equal(verifyPaidDownload(product, file, exp + 1, sig, PURCHASED_AT), 'invalid')
  assert.equal(verifyPaidDownload(product, file, exp, sig.replace(/.$/, (c) => (c === '0' ? '1' : '0')), PURCHASED_AT), 'invalid')
  assert.equal(verifyPaidDownload(product, file, exp, '', PURCHASED_AT), 'invalid')
  assert.equal(verifyPaidDownload(product, file, exp, sig, exp + 1), 'expired')
})

test('the same purchase time always builds the same link', () => {
  const build = () => buildPaidDownloadUrl(DELIVERABLE.id, DELIVERABLE.file, PURCHASED_AT, 'https://www.frankx.ai')
  assert.equal(build(), build())
})

test('no link is signed or verified without a secret', async () => {
  await withoutSecret(() => {
    assert.throws(() => buildPaidDownloadUrl(DELIVERABLE.id, DELIVERABLE.file, PURCHASED_AT, 'https://www.frankx.ai'), PaidDownloadConfigError)
    assert.throws(() => generateProductEmailData(DELIVERABLE.id, 'Ada', 'ada@example.com', PURCHASED_AT), PaidDownloadConfigError)
  })
})

test('a file resolves only to the blob the catalog registers for that product', () => {
  assert.equal(resolvePaidBlobKey(DELIVERABLE.id, DELIVERABLE.file), DELIVERABLE.blobKey)
  assert.equal(resolvePaidBlobKey(UNDELIVERABLE.id, UNDELIVERABLE.file), null)
  assert.equal(resolvePaidBlobKey('command-center-template', DELIVERABLE.file), null)
  assert.equal(resolvePaidBlobKey('not-a-product', DELIVERABLE.file), null)
})

test('the download route streams a paid file for a valid link and never redirects', async () => {
  const url = buildPaidDownloadUrl(DELIVERABLE.id, DELIVERABLE.file, Date.now(), 'https://www.frankx.ai')
  const [response, calls] = await withFetch(
    () => new Response('zip-bytes', { headers: { 'content-type': 'application/zip', 'content-length': '9' } }),
    () => GET(new Request(url)),
  )
  assert.equal(response.status, 200)
  assert.equal(response.headers.get('location'), null)
  assert.equal(await response.text(), 'zip-bytes')
  assert.equal(response.headers.get('content-disposition'), `attachment; filename="${DELIVERABLE.file}"`)
  assert.equal(response.headers.get('cache-control'), 'private, no-store')
  assert.equal(calls.length, 1)
  assert.ok(String(calls[0][0]).endsWith(`/${DELIVERABLE.blobKey}`))
})

test('the download route refuses every link it cannot honour, before touching storage', async () => {
  const good = new URL(buildPaidDownloadUrl(DELIVERABLE.id, DELIVERABLE.file, Date.now(), 'https://www.frankx.ai'))
  const variant = (edit) => { const url = new URL(good); edit(url.searchParams); return url.toString() }
  const cases = [
    [variant((p) => p.delete('sig')), 400],
    [variant((p) => p.set('sig', 'f'.repeat(64))), 403],
    [variant((p) => p.set('product', 'command-center-template')), 403],
    [buildPaidDownloadUrl(DELIVERABLE.id, DELIVERABLE.file, Date.now() - PAID_DOWNLOAD_TTL_MS - 1000, 'https://www.frankx.ai'), 410],
    [buildPaidDownloadUrl(UNDELIVERABLE.id, UNDELIVERABLE.file, Date.now(), 'https://www.frankx.ai'), 404],
  ]
  for (const [url, status] of cases) {
    const [response, calls] = await withFetch(() => new Response('x'), () => GET(new Request(url)))
    assert.equal(response.status, status, url)
    assert.equal(calls.length, 0, 'storage must not be read for a refused link')
  }
  const [unconfigured] = await withFetch(() => new Response('x'), () => withoutSecret(() => GET(new Request(good))))
  assert.equal(unconfigured.status, 503)
  const [missing] = await withFetch(() => new Response('gone', { status: 404 }), () => GET(new Request(good)))
  assert.equal(missing.status, 502)
})

const session = (over = {}) => ({ id: 'cs_test_1', created: PURCHASED_AT / 1000, email: 'ada@example.com', name: 'Ada Lovelace', productSlug: DELIVERABLE.id, ...over })
const fulfil = async (sessionOver, { resend = () => Response.json({ id: 'em_1' }), key = 're_test' } = {}) => {
  const calls = []
  const fetchStub = async (url, init) => { calls.push({ url: String(url), init }); return String(url).includes('/emails') ? resend() : Response.json({}) }
  const result = await fulfilCheckoutSession(session(sessionOver), { resendApiKey: key, audienceId: 'aud_1', fetch: fetchStub })
  return { result, calls, emails: calls.filter((call) => call.url.endsWith('/emails')) }
}

test('a delivered purchase sends one email with links that verify', async () => {
  const { result, emails } = await fulfil()
  assert.deepEqual(result, { status: 200, delivered: true })
  assert.equal(emails.length, 1)
  assert.equal(emails[0].init.headers['Idempotency-Key'], 'purchase-confirmation/cs_test_1')
  const html = JSON.parse(emails[0].init.body).html
  const link = html.match(/https:\/\/www\.frankx\.ai\/api\/download\/paid\?[^"]+/)[0].replaceAll('&amp;', '&')
  const [product, file, exp, sig] = linkParts(link)
  assert.equal(verifyPaidDownload(product, file, exp, sig, PURCHASED_AT), 'ok')
})

test('a retried webhook builds a byte-identical email, so the provider can deduplicate it', async () => {
  const first = await fulfil()
  const second = await fulfil()
  assert.equal(first.emails[0].init.body, second.emails[0].init.body)
})

test('a paid session that cannot be delivered is never acknowledged', async () => {
  const cases = [
    [{ productSlug: 'not-a-real-product' }, {}, 'unknown_product', 0],
    [{ productSlug: UNDELIVERABLE.id }, {}, 'undeliverable_files', 0],
    [{ email: null }, {}, 'no_customer_email', 0],
    [{}, { key: '' }, 'email_unconfigured', 0],
    [{}, { resend: () => Response.json({ message: 'down' }, { status: 500 }) }, 'email_rejected', 1],
  ]
  for (const [sessionOver, deps, failure, emailCalls] of cases) {
    const { result, calls, emails } = await fulfil(sessionOver, deps)
    assert.deepEqual(result, { status: 500, delivered: false, failure })
    assert.equal(emails.length, emailCalls, failure)
    assert.equal(calls.length, emailCalls, `${failure}: nothing else may run after a failed delivery`)
  }
})

test('an idempotency conflict is not proof of delivery', async () => {
  for (const name of ['concurrent_idempotent_requests', 'invalid_idempotent_request']) {
    const { result, calls } = await fulfil({}, { resend: () => Response.json({ name }, { status: 409 }) })
    assert.deepEqual(result, { status: 500, delivered: false, failure: 'email_rejected' }, name)
    assert.equal(calls.length, 1, 'the audience is not written for an undelivered purchase')
  }
})

test('a failed audience write does not undo a delivery', async () => {
  const fetchStub = async (url) => { if (String(url).includes('/audiences/')) throw new Error('network'); return Response.json({ id: 'em_1' }) }
  const result = await fulfilCheckoutSession(session(), { resendApiKey: 're_test', audienceId: 'aud_1', fetch: fetchStub })
  assert.deepEqual(result, { status: 200, delivered: true })
})

test('a session this site did not create is acknowledged and untouched', async () => {
  const { result, calls } = await fulfil({ productSlug: undefined })
  assert.deepEqual(result, { status: 200, delivered: false })
  assert.equal(calls.length, 0)
})

test('no product is marked for sale unless every one of its files can be delivered', () => {
  const forSale = Object.entries(CHECKOUT_PRODUCTS).filter(([, product]) =>
    product.status.trim().toLowerCase().startsWith(PURCHASABLE_STATUS_PREFIX))
  for (const [id] of forSale) {
    const data = generateProductEmailData(id, 'Buyer', 'buyer@example.com', PURCHASED_AT)
    assert.ok(data, `${id} is for sale but has no delivery configuration`)
    assert.ok(data.downloadLinks.length > 0, `${id} is for sale but delivers no file`)
    assert.deepEqual(data.undeliverableFiles, [], `${id} is for sale but these files have no stored blob`)
  }
})
