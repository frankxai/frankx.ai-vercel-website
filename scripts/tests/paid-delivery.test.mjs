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
// The Lemon Squeezy library reads its store config when it loads.
process.env.LEMON_SQUEEZY_WEBHOOK_SECRET = 'local_lemon_fixture'
process.env.LEMON_SQUEEZY_API_KEY = 'test-only-key'
process.env.LEMON_SQUEEZY_STORE_ID = 'test-store'
process.env.LEMON_SQUEEZY_VARIANT_STARTER_KIT = '111'
process.env.LEMON_SQUEEZY_VARIANT_COMMAND_CENTER_TEMPLATE = '222'

const { buildPaidDownloadUrl, verifyPaidDownload, resolvePaidBlobKey, PaidDownloadConfigError, PAID_DOWNLOAD_TTL_MS } =
  await load('lib/paid-download.ts')
const { generateProductEmailData } = await load('lib/delivery.ts')
const { fulfilCheckoutSession } = await load('lib/purchase-fulfilment.ts')
const { CHECKOUT_PRODUCTS } = await load('lib/checkout-products.ts')
const { PURCHASABLE_STATUS_PREFIX } = await load('lib/checkout-gate.ts')
const { GET } = await load('app/api/download/paid/route.ts')
const { lemonSqueezyCheckoutUrl, LEMON_SQUEEZY_VARIANT_ENV_KEYS } = await load('lib/lemon-squeezy.ts')
const { getProductBySlug } = await load('lib/products.ts')

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
  const result = await fulfilCheckoutSession(session(sessionOver), { resendApiKey: key, fetch: fetchStub })
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

test('transactional fulfillment makes only the receipt call', async () => {
  const { result, calls } = await fulfil()
  assert.deepEqual(result, { status: 200, delivered: true })
  assert.deepEqual(calls.map(call => call.url), ['https://api.resend.com/emails'])
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

test('a configured Lemon Squeezy store does not open a buy button on its own', () => {
  // Every env var the buy page reads is set above, and no product is marked for sale.
  for (const slug of Object.keys(LEMON_SQUEEZY_VARIANT_ENV_KEYS)) {
    const product = getProductBySlug(slug)
    assert.ok(product, `${slug} is wired for checkout and missing from the catalog`)
    assert.ok(CHECKOUT_PRODUCTS[product.id], `${slug} has no row in the for-sale registry`)
    const buyable = { id: product.id, slug, primaryPrice: product.offer.primaryPrice }
    assert.equal(lemonSqueezyCheckoutUrl(buyable), null)
  }
})

test('a buy button opens only for a wired, paid product that a reviewed edit marked for sale', () => {
  const kit = { id: 'system-architect-starter-kit', slug: 'starter-kit', primaryPrice: 97 }
  const open = { [kit.id]: { ...CHECKOUT_PRODUCTS[kit.id], status: `${PURCHASABLE_STATUS_PREFIX} (test)` } }
  assert.equal(lemonSqueezyCheckoutUrl(kit, open), 'https://test-store.lemonsqueezy.com/checkout/buy/111')
  assert.equal(lemonSqueezyCheckoutUrl({ ...kit, primaryPrice: 0 }, open), null)
  assert.equal(lemonSqueezyCheckoutUrl({ ...kit, slug: 'not-wired' }, open), null)
  assert.equal(lemonSqueezyCheckoutUrl({ ...kit, id: 'not-in-the-registry' }, open), null)
})


test('signed provider callbacks deliver only paid orders, with retryable receipts and zero contact writes', async t => {
  const {readFileSync} = await import('node:fs')
  const {createHmac} = await import('node:crypto')
  const {default: ts} = await import('typescript')
  const {default: Stripe} = await import('stripe')
  // These values exist only in this isolated test process. All network I/O below is intercepted.
  const priorHost = process.env.VERCEL_ENV
  t.after(() => { if (priorHost === undefined) delete process.env.VERCEL_ENV; else process.env.VERCEL_ENV = priorHost })
  process.env.VERCEL_ENV = 'production'
  process.env.STRIPE_SECRET_KEY = 'sk_live_local_fixture_not_a_credential'
  process.env.STRIPE_WEBHOOK_SECRET = 'whsec_fake_local_stripe'
  process.env.RESEND_API_KEY = 'local_receipt_fixture'
  const lemonSecret = 'local_lemon_fixture'
  const lemon = await load('lib/lemon-squeezy.ts')
  const {products} = await load('lib/products.ts')
  const {canonicalProduct} = await load('lib/product-fulfillment.ts')
  assert.equal(canonicalProduct([{id:'x',slug:'y'},{id:'y',slug:'z'}],'y'), undefined)
  const routes = {}
  // Execute each actual Route Handler and its real settlement, delivery and mail functions.
  const imports = {
    'next/server':{NextResponse:Response}, stripe:{default:Stripe},
    '@/lib/paid-download':{PaidDownloadConfigError},
    '@/lib/purchase-fulfilment':{fulfilCheckoutSession}, '@/lib/products':{products},
    '@/lib/product-fulfillment':{canonicalProduct},
    '@/lib/lemon-squeezy':lemon,
  }
  for (const name of ['lemon-squeezy','stripe']) {
    const raw = readFileSync(resolve(ROOT,'app/api/webhooks/' + name + '/route.ts'),'utf8')
    const compiled = ts.transpileModule(raw,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText
    const exports = {}
    new Function('require','exports',compiled)(key => { assert.ok(Object.hasOwn(imports,key),key); return imports[key] }, exports)
    routes[name] = exports.POST
  }
  const logs = []
  t.mock.method(console,'log',(...args) => logs.push(JSON.stringify(args)))
  t.mock.method(console,'error',(...args) => logs.push(JSON.stringify(args)))
  const buyer = 'isolated-buyer@example.invalid'
  const stripeFacts = {id:'cs_fixture', created:PURCHASED_AT / 1000, mode:'payment', payment_status:'paid', livemode:true,
    customer_email:buyer, metadata:{productSlug:DELIVERABLE.id}}
  const stripeEvent = {type:'checkout.session.completed',livemode:true,data:{object:stripeFacts}}
  const lemonFacts = {status:'paid', test_mode:false, created_at:new Date(PURCHASED_AT).toISOString(), user_email:buyer,
    user_name:'Synthetic buyer', first_order_item:{variant_id:111,product_name:'Renamed display title'},
    urls:{receipt:'https://app.lemonsqueezy.com/my-orders/example'}}
  const lemonEvent = {meta:{event_name:'order_created'},data:{id:'300',type:'orders',attributes:lemonFacts}}
  const deliver = async (name, event, {valid = true, accepted = true} = {}) => {
    const body = JSON.stringify(event)
    const headers = name === 'stripe'
      ? {'stripe-signature':Stripe.webhooks.generateTestHeaderString({payload:body,secret:valid ? process.env.STRIPE_WEBHOOK_SECRET : 'wrong'})}
      : {'x-signature':createHmac('sha256',valid ? lemonSecret : 'wrong').update(body).digest('hex')}
    return withFetch(() => Response.json({id:'fixture_receipt'}, {status:accepted ? 200 : 503}),
      () => routes[name](new Request('https://test.invalid/callback',{method:'POST',body,headers})))
  }
  for (const [name, event] of [['stripe',stripeEvent],['lemon-squeezy',lemonEvent]]) {
    const [invalid, ignored] = await deliver(name,event,{valid:false})
    assert.equal(invalid.status,401); assert.equal(ignored.length,0)
    const [paid, sent] = await deliver(name,event)
    assert.equal(paid.status,200)
    assert.deepEqual(sent.map(([url]) => url),['https://api.resend.com/emails'])
    assert.deepEqual(JSON.parse(sent[0][1].body).to,[buyer])
    const [retry, repeated] = await deliver(name,event)
    assert.equal(retry.status,200)
    assert.deepEqual(repeated,sent)
    assert.ok(sent[0][1].headers['Idempotency-Key'])
    const [failed, attempts] = await deliver(name,event,{accepted:false})
    assert.equal(failed.status,500)
    assert.deepEqual(attempts.map(([url]) => url),['https://api.resend.com/emails'])
  }
  const stripeWith = patch => ({...stripeEvent,data:{object:{...stripeFacts,...patch}}})
  const lemonWith = patch => ({...lemonEvent,data:{...lemonEvent.data,attributes:{...lemonFacts,...patch}}})
  for (const [name, event] of [
    ['stripe',stripeWith({payment_status:'unpaid'})],['stripe',stripeWith({livemode:false})],
    ['lemon-squeezy',lemonWith({status:'pending'})],['lemon-squeezy',lemonWith({test_mode:true})],
    ['lemon-squeezy',{...lemonEvent,meta:{event_name:'subscription_created'}}],
  ]) {
    const [response,calls] = await deliver(name,event)
    assert.equal(response.status,200); assert.equal(calls.length,0)
  }
  const [late,delayed] = await deliver('stripe',{...stripeEvent,type:'checkout.session.async_payment_succeeded'})
  assert.equal(late.status,200)
  assert.equal(delayed[0][1].headers['Idempotency-Key'],'purchase-confirmation/cs_fixture')
  const [unmapped,calls] = await deliver('lemon-squeezy',lemonWith({first_order_item:{variant_id:8888,product_name:'Starter Kit'}}))
  assert.equal(unmapped.status,500); assert.equal(calls.length,0)
  process.env.VERCEL_ENV = 'preview'
  for (const [name,event] of [['stripe',stripeEvent],['lemon-squeezy',lemonEvent]]) {
    const [preview,network] = await deliver(name,event)
    assert.equal(preview.status,200); assert.equal(network.length,0)
  }
  assert.ok(logs.every(line => !line.includes(buyer) && !line.includes('Synthetic buyer')))
})
