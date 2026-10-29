import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createHmac } from 'node:crypto'
import { createRequire } from 'node:module'
import test from 'node:test'
import ts from 'typescript'

const require = createRequire(import.meta.url)
const products = JSON.parse(readFileSync(new URL('../../data/products.json', import.meta.url), 'utf8'))
const source = path => readFileSync(new URL(`../../${path}`, import.meta.url), 'utf8')
const secret = 'test-only-product-download-signing-secret'
const now = Date.UTC(2026, 9, 20)
const env = {
  PRODUCT_DOWNLOAD_SECRET: secret,
  NEXT_PUBLIC_SITE_URL: 'https://www.frankx.ai',
  RESEND_API_KEY: 'test-only-resend-key',
  LEMON_SQUEEZY_API_KEY: 'fixture-only-api-key',
  LEMON_SQUEEZY_STORE_ID: 'fixture-only-store',
  LEMON_SQUEEZY_EXPECT_TEST_MODE: 'false',
  LEMON_SQUEEZY_WEBHOOK_SECRET: 'test-only-webhook-secret',
  LEMON_SQUEEZY_VARIANT_STARTER_KIT: '1001',
  LEMON_SQUEEZY_VARIANT_COMMAND_CENTER_TEMPLATE: '1002',
  STRIPE_SECRET_KEY: 'rk_live_fixture_only_not_a_credential',
  STRIPE_WEBHOOK_SECRET: 'test-only-stripe-webhook-secret',
  STRIPE_PRICE_SYSTEM_ARCHITECT: 'price_test_starter',
}
const actualEnv = Object.fromEntries(Object.keys(env).map(key => [key, process.env[key]]))
Object.assign(process.env, env)
process.on('exit', () => {
  for (const [key, value] of Object.entries(actualEnv)) {
    if (value === undefined) delete process.env[key]
    else process.env[key] = value
  }
})

function load(path, imports = {}, fetch = () => assert.fail('unexpected network call')) {
  const { outputText } = ts.transpileModule(source(path), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true, jsx: ts.JsxEmit.ReactJSX } })
  const module = { exports: {} }
  new Function('require', 'module', 'exports', 'fetch', outputText)(id => {
    if (id === 'node:crypto' || id === 'crypto') return require(id)
    assert.ok(Object.hasOwn(imports, id), `unexpected import: ${id}`)
    return imports[id]
  }, module, module.exports, fetch)
  return module.exports
}
const helpers = load('lib/product-fulfillment.ts')
const emailTemplates = load('lib/email-templates.ts', {
  '@/lib/social-links': load('lib/social-links.ts'),
  '@/lib/email-config': load('lib/email-config.ts', { resend: require('resend') }),
  '@/lib/product-fulfillment': helpers,
})
const catalog = { products, getProductById: id => products.find(product => product.id === id), getProductBySlug: slug => products.find(product => product.slug === slug) }
const delivery = load('lib/delivery.ts', { './products': catalog, './product-fulfillment': helpers })
const starter = products.find(product => product.id === 'system-architect-starter-kit')
const command = products.find(product => product.id === 'command-center-template')
const key = starter.delivery.files[0].blobKey
const url = () => helpers.createProductDownloadUrl(products, starter.id, key, { secret, now })
const token = () => new URL(url()).searchParams.get('token')
const next = { NextResponse: { json: (data, init) => Response.json(data, init) } }

test('canonical identities resolve IDs or exact slugs without title guesses or conflicts', () => {
  assert.equal(helpers.canonicalProduct(products, 'starter-kit').id, starter.id)
  assert.equal(helpers.productFromCheckoutMetadata(products, { productId: starter.id, productSlug: 'starter-kit' }).id, starter.id)
  assert.equal(helpers.productFromCheckoutMetadata(products, { productId: starter.id, productSlug: command.id }), undefined)
  for (const value of ['The Command Center Template', 'the-command-center-template', 'toString', {}, null]) assert.equal(helpers.canonicalProduct(products, value), undefined)
  assert.equal(helpers.productFromCheckoutMetadata(products, {}), undefined)
})

test('provider variants bind only to configured canonical IDs, with no duplicate ambiguity', () => {
  assert.equal(helpers.productForLemonVariant(products, 1002, env).id, command.id)
  assert.equal(helpers.productForLemonVariant(products, '1001', env).id, starter.id)
  for (const value of [1003, '1001?product=other', ' 1001', {}, null]) assert.equal(helpers.productForLemonVariant(products, value, env), undefined)
  const duplicate = { ...env, LEMON_SQUEEZY_VARIANT_COMMAND_CENTER_TEMPLATE: '1001' }
  assert.equal(helpers.productForLemonVariant(products, 1001, duplicate), undefined)
  assert.equal(helpers.lemonVariantForProduct(starter.id, duplicate), undefined)
  assert.equal(helpers.stripePriceForProduct(starter.id, env), env.STRIPE_PRICE_SYSTEM_ARCHITECT)
  assert.equal(helpers.stripePriceForProduct(starter.id, { ...env, STRIPE_PRICE_COMMAND_CENTER: env.STRIPE_PRICE_SYSTEM_ARCHITECT }), undefined)
})

test('paid checkout configuration fails closed without signer or catalog files', () => {
  assert.equal(helpers.productDownloadConfigured(starter, undefined), false)
  assert.equal(helpers.productDownloadConfigured(starter, 'short'), false)
  assert.equal(helpers.productDownloadConfigured(starter, secret), true)
  for (const origin of ['https://evil.invalid', 'invalid origin', 'https://www.frankx.ai/other']) assert.equal(helpers.productDownloadConfigured(starter, secret, origin), false)
  assert.equal(helpers.productDownloadConfigured({ ...starter, delivery: { files: [] } }, secret), false)
  assert.equal(helpers.productDownloadConfigured(products.find(product => product.slug === 'vibe-os'), secret), false)
})

test('both provider rails require email, callback verification, signer and live product configuration', () => {
  for (const provider of ['stripe', 'lemon']) {
    assert.equal(helpers.productFulfillmentConfigured(starter, provider, env), true)
    const required = ['RESEND_API_KEY', 'PRODUCT_DOWNLOAD_SECRET', ...(provider === 'stripe' ? ['STRIPE_SECRET_KEY', 'STRIPE_WEBHOOK_SECRET', 'STRIPE_PRICE_SYSTEM_ARCHITECT'] : ['LEMON_SQUEEZY_API_KEY', 'LEMON_SQUEEZY_STORE_ID', 'LEMON_SQUEEZY_WEBHOOK_SECRET', 'LEMON_SQUEEZY_VARIANT_STARTER_KIT', 'LEMON_SQUEEZY_EXPECT_TEST_MODE'])]
    for (const key of required) assert.equal(helpers.productFulfillmentConfigured(starter, provider, { ...env, [key]: undefined }), false, `${provider}: ${key}`)
  }
  assert.equal(helpers.productFulfillmentConfigured(starter, 'lemon', { ...env, LEMON_SQUEEZY_EXPECT_TEST_MODE: 'true' }), false)
  assert.equal(helpers.productFulfillmentConfigured(starter, 'stripe', { ...env, STRIPE_SECRET_KEY: 'rk_test_fixture_only' }), false)
})

test('the actual purchase template escapes text/attributes, rejects unsafe URLs and uses token TTL', () => {
  const data = { customerName: '<img src=x onerror="bad">', productName: 'Product <script>bad</script>', downloadLinks: [{ name: 'File <svg onload="bad">', url: `${url()}&label=%22unsafe%22` }], receiptUrl: 'https://app.lemonsqueezy.com/my-orders/fixture?one=1&two=%22two%22' }
  const result = emailTemplates.purchaseConfirmationEmail(data)
  assert.match(result.html, /&lt;img src=x onerror=&quot;bad&quot;&gt;/)
  assert.match(result.html, /Product &lt;script&gt;bad&lt;\/script&gt;/)
  assert.match(result.html, /File &lt;svg onload=&quot;bad&quot;&gt;/)
  assert.match(result.html, /one=1&amp;two=/)
  assert.match(result.html, new RegExp(`valid for ${helpers.PRODUCT_DOWNLOAD_TTL_SECONDS / 3600} hours`))
  assert.doesNotMatch(result.html, /valid for 7 days|<img src=x|<script>|<svg onload=/)
  for (const receiptUrl of ['javascript:alert(1)', 'data:text/html,bad', 'http://example.invalid', 'https://user:password@example.invalid', 'https://example.invalid/\nmalformed']) {
    assert.doesNotMatch(emailTemplates.purchaseConfirmationEmail({ ...data, receiptUrl }).html, /View your receipt/)
  }
  assert.throws(() => emailTemplates.purchaseConfirmationEmail({ ...data, downloadLinks: [{ name: 'unsafe', url: 'javascript:alert(1)' }] }))
})

test('signed links use the real handler and exact catalog identity/file with a 24-hour expiry', () => {
  const link = new URL(url())
  assert.equal(link.origin, 'https://www.frankx.ai')
  assert.equal(link.pathname, '/api/download/purchased')
  assert.deepEqual(helpers.verifyProductDownloadToken(token(), secret, now), { version: 1, productId: starter.id, blobKey: key, expiresAt: now / 1000 + 86400 })
  assert.equal(helpers.verifyProductDownloadToken(token(), secret, now + 86400_000), undefined)
  assert.equal(helpers.verifyProductDownloadToken(token(), 'another-valid-length-secret-for-test', now), undefined)
})

test('minting rejects arbitrary paths, cross-product files, free products and untrusted origins', () => {
  for (const blobKey of ['../secret.zip', '/secret.zip', 'https://evil.invalid/a.zip', 'x%2f..%2fsecret.zip', 'secret.zip', command.delivery.files[0].blobKey]) {
    assert.throws(() => helpers.createProductDownloadUrl(products, starter.id, blobKey, { secret, now }))
  }
  for (const origin of ['http://www.frankx.ai', 'https://evil.invalid', 'https://www.frankx.ai@evil.invalid', 'https://user@www.frankx.ai', 'https://www.frankx.ai/other', 'https://www.frankx.ai?redirect=evil']) {
    assert.throws(() => helpers.createProductDownloadUrl(products, starter.id, key, { secret, now, origin }))
  }
  assert.throws(() => helpers.createProductDownloadUrl(products, 'starter-kit', key, { secret, now }))
  assert.throws(() => helpers.createProductDownloadUrl(products, starter.id, key, { secret: undefined, now }))
})

test('tampered, malformed, oversized and incorrectly scoped tokens cannot reach storage', async () => {
  const [payload, signature] = token().split('.')
  const tampered = Buffer.from(JSON.stringify({ ...JSON.parse(Buffer.from(payload, 'base64url')), productId: command.id })).toString('base64url')
  for (const value of ['', 'x', `${payload}.x`, `${tampered}.${signature}`, `${payload}.${signature}.extra`, 'a'.repeat(3000), `${payload}.${signature}=`]) {
    const response = await helpers.purchasedDownload(new Request(`https://www.frankx.ai/api/download/purchased?token=${encodeURIComponent(value)}`), { products, secret, now, fetch: () => assert.fail('invalid token reached storage') })
    assert.equal(response.status, 401)
    assert.equal(response.headers.get('cache-control'), 'private, no-store')
  }
  const duplicate = await helpers.purchasedDownload(new Request(`${url()}&token=${token()}`), { products, secret, now })
  assert.equal(duplicate.status, 401)
  const wrongPath = await helpers.purchasedDownload(new Request(url().replace('/purchased', '/file')), { products, secret, now })
  assert.equal(wrongPath.status, 401)
})

test('a valid token still requires the product/file to remain in the current allowlist', async () => {
  const response = await helpers.purchasedDownload(new Request(url()), { products: products.filter(product => product.id !== starter.id), secret, now, fetch: () => assert.fail('removed product reached storage') })
  assert.equal(response.status, 404)
  const unavailable = await helpers.purchasedDownload(new Request(url()), { products, secret: undefined, now, fetch: () => assert.fail('missing signer reached storage') })
  assert.equal(unavailable.status, 503)
})

test('the installed route streams only the allowlisted file, without a public-origin redirect', async () => {
  const calls = []
  const GET = load('app/api/download/purchased/route.ts', {
    '@/data/products.json': { __esModule: true, default: products },
    '@/lib/product-fulfillment': { purchasedDownload: (request, options) => helpers.purchasedDownload(request, { ...options, now, fetch: async (input, init) => { calls.push({ input: String(input), init }); return new Response('test ZIP bytes', { headers: { 'content-type': 'application/zip' } }) } }) },
  }).GET
  const response = await GET(new Request(url()))
  assert.equal(response.status, 200)
  assert.equal(await response.text(), 'test ZIP bytes')
  assert.equal(calls.length, 1)
  assert.equal(calls[0].input, `${helpers.PRODUCT_BLOB_ORIGIN}/${key}`)
  assert.equal(calls[0].init.redirect, 'error')
  assert.equal(calls[0].init.cache, 'no-store')
  assert.equal(response.headers.get('location'), null)
  assert.match(response.headers.get('content-disposition'), /^attachment; filename\*=UTF-8''starter-kit-v1.zip$/)
  assert.equal(response.headers.get('x-content-type-options'), 'nosniff')
})

test('upstream redirects, wrong content types, missing files and transport failures do not deliver', async () => {
  for (const fetch of [
    async () => new Response('login', { status: 302, headers: { location: 'https://evil.invalid' } }),
    async () => new Response('<script>bad</script>', { headers: { 'content-type': 'text/html' } }),
    async () => new Response('missing', { status: 404 }),
    async () => { throw new Error('private upstream diagnostic') },
  ]) {
    const response = await helpers.purchasedDownload(new Request(url()), { products, secret, now, fetch })
    assert.equal(response.status, 502)
    assert.doesNotMatch(await response.text(), /private|evil|script|token/i)
  }
})

test('email delivery resolves catalog Blob keys and fails closed for absent commercial artifacts', () => {
  for (const id of [starter.id, command.id, 'suno-prompt-library', 'aurora-ui-kit', 'agentic-content-engine']) {
    const result = delivery.generateProductEmailData(id, 'Fixture Buyer', 'buyer@example.invalid')
    assert.equal(result.productId, id)
    const product = products.find(product => product.id === id)
    assert.equal(result.downloadLinks.length, product.delivery.files.length)
    result.downloadLinks.forEach((link, index) => {
      const claim = helpers.verifyProductDownloadToken(new URL(link.url).searchParams.get('token'), secret)
      assert.equal(claim.productId, id)
      assert.equal(claim.blobKey, product.delivery.files[index].blobKey)
    })
  }
  for (const id of ['creative-ai-toolkit', 'not-a-real-product', 'starter-kit']) assert.equal(delivery.generateProductEmailData(id, 'Buyer', 'buyer@example.invalid'), null)
})

function lemon(body, overrides = {}) {
  const calls = []
  const capture = []
  const fetch = async (url, options) => { calls.push({ url, options }); return Response.json({ id: 'test-email-id' }, { status: overrides.emailStatus ?? 200 }) }
  const lemonApi = load('lib/lemon-squeezy.ts', {}, fetch)
  const { POST } = load('app/api/webhooks/lemon-squeezy/route.ts', {
    'next/server': next,
    '@/lib/lemon-squeezy': lemonApi,
    '@/lib/delivery': delivery,
    '@/lib/products': catalog,
    '@/lib/product-fulfillment': helpers,
    '@/lib/email-templates': { purchaseConfirmationEmail: data => { capture.push(data); return emailTemplates.purchaseConfirmationEmail(data) } },
    '@/lib/clients': { getClientOrDefault: () => ({ id: 'frankx', artistName: 'FrankX', commerce: {} }) },
  }, fetch)
  const text = JSON.stringify(body)
  const signature = createHmac('sha256', env.LEMON_SQUEEZY_WEBHOOK_SECRET).update(text).digest('hex')
  return { run: () => POST(new Request('https://www.frankx.ai/api/webhooks/lemon-squeezy', { method: 'POST', body: text, headers: { 'x-signature': overrides.invalidSignature ? 'invalid' : signature } })), calls, capture }
}
const lemonOrder = () => ({ meta: { event_name: 'order_created', custom_data: { productId: starter.id } }, data: { id: 'fixture-order', type: 'orders', attributes: { status: 'paid', test_mode: false, user_email: 'buyer@example.invalid', user_name: 'Fixture Buyer', first_order_item: { variant_id: 1002, test_mode: false, product_name: 'Renamed title that must not control delivery' } } } })

test('a signed paid Lemon callback delivers the configured variant product despite display-name changes', async () => {
  const fixture = lemon(lemonOrder())
  assert.equal((await fixture.run()).status, 200)
  assert.equal(fixture.capture[0].productName, command.name)
  const claim = helpers.verifyProductDownloadToken(new URL(fixture.capture[0].downloadLinks[0].url).searchParams.get('token'), secret)
  assert.equal(claim.productId, command.id)
  assert.equal(fixture.calls.filter(call => call.url.endsWith('/emails')).length, 1)
  assert.equal(fixture.calls.length, 1, 'a receipt must never subscribe or resubscribe a buyer')
})

test('the actual Lemon callback sends escaped transactional HTML without marketing enrollment', async () => {
  const order = lemonOrder()
  order.data.attributes.user_name = '<img src=x onerror="bad">'
  order.data.attributes.urls = { receipt: 'javascript:alert(1)' }
  const fixture = lemon(order)
  assert.equal((await fixture.run()).status, 200)
  const email = JSON.parse(fixture.calls[0].options.body)
  assert.match(email.html, /&lt;img src=x onerror=&quot;bad&quot;&gt;/)
  assert.match(email.html, /valid for 24 hours/)
  assert.doesNotMatch(email.html, /View your receipt|<img src=x/)
  assert.deepEqual(fixture.calls.map(call => call.url), ['https://api.resend.com/emails'])
  assert.doesNotMatch(fixture.calls[0].options.body, /unsubscribed|audiences|contacts/)
  const subscription = lemon({ meta: { event_name: 'subscription_created' }, data: { id: 'fixture-subscription', attributes: { user_email: 'opted-out@example.invalid', user_name: 'Previously opted out' } } })
  assert.equal((await subscription.run()).status, 200)
  assert.equal(subscription.calls.length, 0, 'subscription callbacks cannot infer marketing consent')
})

test('Lemon mode policy is explicit, rejects mixed modes, and sandbox callbacks send no real product mail', async () => {
  const order = lemonOrder()
  order.data.attributes.test_mode = true
  order.data.attributes.first_order_item.test_mode = true
  const mismatched = lemon(order)
  assert.equal((await mismatched.run()).status, 422)
  assert.equal(mismatched.calls.length, 0)
  const previous = process.env.LEMON_SQUEEZY_EXPECT_TEST_MODE
  try {
    delete process.env.LEMON_SQUEEZY_EXPECT_TEST_MODE
    const absent = lemon(lemonOrder()); assert.equal((await absent.run()).status, 503); assert.equal(absent.calls.length, 0)
    process.env.LEMON_SQUEEZY_EXPECT_TEST_MODE = 'true'
    const sandbox = lemon(order); assert.equal((await sandbox.run()).status, 200); assert.equal(sandbox.calls.length, 0); assert.equal(sandbox.capture.length, 0)
    delete order.data.attributes.first_order_item.test_mode
    const mixed = lemon(order); assert.equal((await mixed.run()).status, 422); assert.equal(mixed.calls.length, 0)
  } finally { process.env.LEMON_SQUEEZY_EXPECT_TEST_MODE = previous }
})

test('Lemon rejects forged or unknown-variant callbacks and never acknowledges failed delivery as success', async () => {
  const invalid = lemon(lemonOrder(), { invalidSignature: true })
  assert.equal((await invalid.run()).status, 401)
  assert.equal(invalid.calls.length, 0)
  const order = lemonOrder(); order.data.attributes.first_order_item.variant_id = 9999
  const unknown = lemon(order)
  assert.equal((await unknown.run()).status, 422)
  assert.equal(unknown.calls.length, 0)
  const unpaidOrder = lemonOrder(); unpaidOrder.data.attributes.status = 'pending'
  const unpaid = lemon(unpaidOrder)
  assert.equal((await unpaid.run()).status, 200)
  assert.equal(unpaid.calls.length, 0)
  const failed = lemon(lemonOrder(), { emailStatus: 503 })
  assert.equal((await failed.run()).status, 502)
  assert.equal(failed.calls.length, 1)
  const before = process.env.PRODUCT_DOWNLOAD_SECRET
  delete process.env.PRODUCT_DOWNLOAD_SECRET
  try { const closed = lemon(lemonOrder()); assert.equal((await closed.run()).status, 503); assert.equal(closed.calls.length, 0) } finally { process.env.PRODUCT_DOWNLOAD_SECRET = before }
})

test('Stripe checkout normalizes catalog slug to canonical metadata and requires delivery configuration', async () => {
  const calls = []
  const { POST } = load('app/api/checkout/route.ts', { 'next/server': next, '@/lib/products': catalog, '@/lib/product-fulfillment': helpers }, async (_url, options) => { calls.push(new URLSearchParams(options.body)); return Response.json({ url: 'https://checkout.stripe.com/test-fixture' }) })
  const request = () => Object.assign(new Request('https://www.frankx.ai/api/checkout', { method: 'POST', body: JSON.stringify({ productId: 'starter-kit' }) }), { nextUrl: new URL('https://www.frankx.ai/api/checkout') })
  assert.equal((await POST(request())).status, 200)
  assert.equal(calls[0].get('metadata[productId]'), starter.id)
  assert.equal(calls[0].get('metadata[productSlug]'), starter.id)
  const before = process.env.PRODUCT_DOWNLOAD_SECRET
  delete process.env.PRODUCT_DOWNLOAD_SECRET
  try { assert.equal((await POST(request())).status, 503); assert.equal(calls.length, 1) } finally { process.env.PRODUCT_DOWNLOAD_SECRET = before }
  for (const key of ['RESEND_API_KEY', 'STRIPE_WEBHOOK_SECRET']) {
    const previous = process.env[key]; delete process.env[key]
    try { assert.equal((await POST(request())).status, 503); assert.equal(calls.length, 1) } finally { process.env[key] = previous }
  }
})

test('the actual hosted checkout page stays closed without its email/callback/mode prerequisites', async () => {
  const jsx = (type, props) => ({ type, props })
  const { default: CheckoutPage } = load('app/checkout/[slug]/page.tsx', {
    'react/jsx-runtime': { jsx, jsxs: jsx }, 'next/link': { __esModule: true, default: 'a' },
    'next/navigation': { notFound: () => { throw new Error('not found') } }, 'lucide-react': { ArrowRight: 'arrow', ShieldCheck: 'shield', Clock: 'clock' },
    '@/lib/products': catalog, '@/lib/lemon-squeezy': load('lib/lemon-squeezy.ts'), '@/lib/seo': { createMetadata: value => value }, '@/lib/product-fulfillment': helpers,
  })
  const render = async () => JSON.stringify(await CheckoutPage({ params: Promise.resolve({ slug: 'starter-kit' }) }))
  assert.match(await render(), /lemonsqueezy.com\/checkout\/buy\/1001/)
  for (const key of ['RESEND_API_KEY', 'LEMON_SQUEEZY_WEBHOOK_SECRET', 'PRODUCT_DOWNLOAD_SECRET', 'LEMON_SQUEEZY_EXPECT_TEST_MODE']) {
    const previous = process.env[key]; delete process.env[key]
    try { const page = await render(); assert.doesNotMatch(page, /lemonsqueezy.com\/checkout\/buy/); assert.match(page, /Join the Launch List/) } finally { process.env[key] = previous }
  }
})

test('Stripe callback resolves canonical metadata and rejects conflicting or unpaid claims', async () => {
  const events = []
  const sent = []
  const emailCalls = []
  class StripeFixture {
    webhooks = { constructEvent: () => events.shift() }
    checkout = { sessions: { listLineItems: async () => ({ data: [{ quantity: 1, currency: 'eur', amount_total: 9700, price: { id: env.STRIPE_PRICE_SYSTEM_ARCHITECT, currency: 'eur' } }], has_more: false }) } }
  }
  const { POST } = load('app/api/webhooks/stripe/route.ts', { 'next/server': next, stripe: { __esModule: true, default: StripeFixture }, '@/lib/products': catalog, '@/lib/product-fulfillment': helpers, '@/lib/delivery': delivery, '@/lib/email-templates': { purchaseConfirmationEmail: data => { sent.push(data); return emailTemplates.purchaseConfirmationEmail(data) } } }, async (url, options) => { emailCalls.push({ url, body: JSON.parse(options.body) }); return Response.json({ id: 'fixture-email' }) })
  const event = metadata => ({ type: 'checkout.session.completed', livemode: true, data: { object: { id: 'fixture-session', mode: 'payment', currency: 'eur', amount_total: 9700, payment_status: 'paid', metadata, customer_email: 'buyer@example.invalid' } } })
  const run = () => POST(new Request('https://www.frankx.ai/api/webhooks/stripe', { method: 'POST', body: '{}', headers: { 'stripe-signature': 'fixture-signature' } }))
  events.push(event({ productId: starter.id, productSlug: 'starter-kit' }))
  assert.equal((await run()).status, 200)
  assert.equal(sent[0].productName, starter.name)
  assert.deepEqual(emailCalls.map(call => call.url), ['https://api.resend.com/emails'])
  assert.match(emailCalls[0].body.html, /valid for 24 hours/)
  assert.doesNotMatch(JSON.stringify(emailCalls), /audiences|contacts|unsubscribed/)
  events.push(event({ productId: starter.id, productSlug: command.id }))
  assert.equal((await run()).status, 422)
  const unpaid = event({ productId: starter.id }); unpaid.data.object.payment_status = 'unpaid'; events.push(unpaid)
  assert.equal((await run()).status, 200)
  assert.equal(sent.length, 1)
  const delayed = event({ productId: starter.id }); delayed.type = 'checkout.session.async_payment_succeeded'; delayed.data.object.id = 'fixture-delayed-session'; events.push(delayed)
  assert.equal((await run()).status, 200)
  assert.equal(sent.length, 2)
  const sandbox = event({ productId: starter.id }); sandbox.livemode = false; events.push(sandbox)
  assert.equal((await run()).status, 422)
  const previous = process.env.STRIPE_SECRET_KEY
  try {
    process.env.STRIPE_SECRET_KEY = 'rk_test_fixture_only'
    events.push(sandbox)
    assert.equal((await run()).status, 200)
    assert.equal(emailCalls.length, 2)
  } finally { process.env.STRIPE_SECRET_KEY = previous }
})

test('Stripe callback verifies one charged Price, currency and quantity before any email', async () => {
  let lineItems
  const calls = []
  let session = { id: 'fixture-session', mode: 'payment', currency: 'eur', amount_total: 9700, payment_status: 'paid', metadata: { productId: starter.id }, customer_email: 'buyer@example.invalid' }
  class StripeFixture {
    webhooks = { constructEvent: () => ({ type: 'checkout.session.completed', livemode: true, data: { object: session } }) }
    checkout = { sessions: { listLineItems: async (id, options) => { calls.push({ id, options }); if (lineItems instanceof Error) throw lineItems; return lineItems } } }
  }
  const { POST } = load('app/api/webhooks/stripe/route.ts', { 'next/server': next, stripe: { __esModule: true, default: StripeFixture }, '@/lib/products': catalog, '@/lib/product-fulfillment': helpers, '@/lib/delivery': delivery, '@/lib/email-templates': { purchaseConfirmationEmail: () => assert.fail('invalid payment reached email composition') } }, () => assert.fail('invalid payment reached email provider'))
  const run = () => POST(new Request('https://www.frankx.ai/api/webhooks/stripe', { method: 'POST', body: '{}', headers: { 'stripe-signature': 'fixture-signature' } }))
  const item = { quantity: 1, currency: 'eur', amount_total: 9700, price: { id: env.STRIPE_PRICE_SYSTEM_ARCHITECT, currency: 'eur' } }
  for (const data of [[], [item, item], [{ ...item, quantity: 2 }], [{ ...item, currency: 'usd' }], [{ ...item, amount_total: 0 }], [{ ...item, price: { id: 'price_wrong', currency: 'eur' } }], [{ ...item, price: null }], [{ ...item, price: { ...item.price, currency: 'usd' } }]]) {
    lineItems = { data, has_more: false }
    assert.equal((await run()).status, 422)
  }
  lineItems = { data: [item], has_more: true }
  assert.equal((await run()).status, 422)
  lineItems = new Error('fixture-only provider read failure')
  assert.equal((await run()).status, 502)
  for (const invalid of [{ mode: 'subscription' }, { currency: 'usd' }, { amount_total: 0 }]) {
    const original = session; session = { ...session, ...invalid }
    const count = calls.length
    assert.equal((await run()).status, 422)
    assert.equal(calls.length, count)
    session = original
  }
  assert.deepEqual(calls[0], { id: 'fixture-session', options: { limit: 2 } })
})
