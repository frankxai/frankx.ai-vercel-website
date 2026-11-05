import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import test from 'node:test'
import ts from 'typescript'

const require = createRequire(import.meta.url)
const repoFile = (path) => new URL(`../../${path}`, import.meta.url)

const RESEND_TOPICS = {
  newsletter: 'b613f6ff-9c56-4b4c-86df-9217843c5d78',
  'music-suno': '018a5159-10c8-4595-8ecc-63d7a2c6b442',
  'product-updates': '811064ed-7444-45db-9a2a-fd8c83a21053',
}

// Run the real route. Only the framework, rate limiter, templates, and network
// are replaced, so list routing and the welcome-email decision execute unchanged.
function loadSubscribeRoute(fetchStub) {
  const source = readFileSync(repoFile('app/api/subscribe/route.ts'), 'utf8')
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  })
  const imports = {
    'next/server': {
      NextRequest: class {},
      NextResponse: { json: (body, init = {}) => ({ body, status: init.status ?? 200 }) },
    },
    '@/lib/email-templates': { musicPromptsEmail: () => ({ subject: 'prompts', html: '<p>prompts</p>' }) },
    '@/lib/email-templates-welcome': { welcomeEmail1: () => ({ subject: 'newsletter welcome', html: '<p>welcome</p>' }) },
    '@/lib/email-templates-ikigai': { ikigaiBrandingEmail: () => ({ subject: 'ikigai', html: '<p>ikigai</p>' }) },
    '@/lib/email-templates-inner-circle': { innerCircleWaitlistEmail: () => ({ subject: 'inner', plainText: 'inner' }) },
    '@/lib/email-templates-mvu': {
      mvuRsvpConfirmation: () => ({ subject: 'mvu', plainText: 'mvu' }),
      mvuRsvpAlert: () => ({ subject: 'mvu alert', plainText: 'mvu alert' }),
    },
    '@/lib/diagnostic/waitlist-intents': { sanitizeIntent: () => undefined },
    '@/lib/ratelimit': {
      emailRatelimit: { limit: async () => ({ success: true }) },
      getClientIdentifier: () => 'test-client',
    },
    '@/lib/seo': { siteConfig: { url: 'https://www.frankx.ai' } },
  }
  const module = { exports: {} }
  const localRequire = (id) => Object.hasOwn(imports, id) ? imports[id] : require(id)
  const previousKey = process.env.RESEND_API_KEY
  process.env.RESEND_API_KEY = 'test-key'
  try {
    new Function('require', 'module', 'exports', 'fetch', outputText)(
      localRequire, module, module.exports, fetchStub,
    )
  } finally {
    if (previousKey === undefined) delete process.env.RESEND_API_KEY
    else process.env.RESEND_API_KEY = previousKey
  }
  return module.exports
}

async function subscribe(body) {
  const calls = []
  const route = loadSubscribeRoute(async (url, options = {}) => {
    calls.push({ url: String(url), method: options.method, body: options.body ? JSON.parse(options.body) : undefined })
    if (String(url).includes('growth-capture')) return { ok: true, status: 200, json: async () => ({ accepted: true }) }
    if (String(url).endsWith('/contacts')) return { ok: true, status: 200, json: async () => ({ id: 'contact-1' }) }
    return { ok: true, status: 200, json: async () => ({}) }
  })
  const response = await route.POST({
    url: 'https://www.frankx.ai/api/subscribe',
    headers: new Headers(),
    json: async () => body,
  })
  return { response, calls }
}

const topicsOptedIn = (calls) => {
  const patch = calls.find((call) => call.method === 'PATCH' && call.url.includes('/topics'))
  assert.ok(patch, 'topic state must always be written')
  return patch.body.topics.filter((topic) => topic.subscription === 'opt_in').map((topic) => topic.id)
}
const emailsSent = (calls) => calls.filter((call) => call.url === 'https://api.resend.com/emails')

test('Vault applicants are stored under their own list with no topics and no automatic email', async () => {
  const { response, calls } = await subscribe({
    email: 'Applicant@Example.invalid',
    name: 'Ada',
    listType: 'reality-architect-vault-waitlist',
    source: 'realityarchitect.ai/apply',
    intention: 'Aim: ship the vault | Priority: health',
  })

  assert.equal(response.status, 200)
  assert.equal(response.body.success, true)
  assert.equal(response.body.welcomeSent, false)
  assert.deepEqual(topicsOptedIn(calls), [], 'applicants must not be opted in to the newsletter or any topic')
  assert.deepEqual(emailsSent(calls), [], 'applicants are promised a hand-written reply, not an automatic one')

  const contact = calls.find((call) => call.url.endsWith('/contacts'))
  assert.equal(contact.body.email, 'applicant@example.invalid')
  assert.equal(contact.body.properties.source, 'reality-architect-vault-waitlist')
  assert.equal(contact.body.properties.referrer, 'realityarchitect.ai/apply')
  assert.equal(contact.body.properties.intention, 'Aim: ship the vault | Priority: health')

  const capture = calls.find((call) => call.url.includes('growth-capture'))
  assert.equal(capture.body.program, 'frankx-reality-architect-vault-waitlist')
})

test('a newsletter signup still subscribes to the newsletter and receives its welcome', async () => {
  const { response, calls } = await subscribe({ email: 'reader@example.invalid', listType: 'newsletter' })

  assert.equal(response.status, 200)
  assert.equal(response.body.welcomeSent, true)
  assert.deepEqual(topicsOptedIn(calls), [RESEND_TOPICS.newsletter])
  assert.equal(emailsSent(calls).length, 1)
})

test('an unregistered list type still falls back to the newsletter, so every form must register its own', async () => {
  const { calls } = await subscribe({ email: 'reader@example.invalid', listType: 'not-a-registered-list' })

  assert.deepEqual(topicsOptedIn(calls), [RESEND_TOPICS.newsletter])
  assert.equal(emailsSent(calls).length, 1)
})
