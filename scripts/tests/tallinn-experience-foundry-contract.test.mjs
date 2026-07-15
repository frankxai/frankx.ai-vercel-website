import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { join } from 'node:path'
import test from 'node:test'
import ts from 'typescript'

const root = process.cwd()
const read = (path) => readFileSync(join(root, path), 'utf8')

const registry = read('data/tallinn-experiences.ts')
const hub = read('components/tallinn-experience/TallinnFoundryPage.tsx')
const offer = read('components/tallinn-experience/TallinnOfferPage.tsx')
const form = read('components/tallinn-experience/TallinnInterestForm.tsx')
const route = read('app/api/tallinn-interest/route.ts')
const service = read('lib/tallinn-interest/service.ts')
const threshold = read('lib/tallinn-interest/threshold.ts')
const worksheet = read('app/experiences/tallinn-2026/purpose-to-practice/map/page.tsx')
const packageJson = read('package.json')
const portfolio = read('docs/specs/tallinn-workshop-portfolio-2026-07-14.md')

const nodeRequire = createRequire(import.meta.url)

function loadCaptureService() {
  const output = ts.transpileModule(service, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
    },
    fileName: 'lib/tallinn-interest/service.ts',
  }).outputText
  const serviceModule = { exports: {} }
  const requireForService = (id) => {
    if (id === '@/lib/email-templates-tallinn') {
      const template = { subject: 'Test', text: 'Test', html: '<p>Test</p>' }
      return {
        buildTallinnInterestReceipt: () => template,
        buildTallinnOperatorNotification: () => template,
      }
    }
    if (id === '@/lib/intake-types') {
      return { INTENT_LABEL: { general: 'General Inquiry' } }
    }
    if (id === '@/lib/tallinn-interest/schema') return {}
    return nodeRequire(id)
  }

  Function('require', 'module', 'exports', output)(
    requireForService,
    serviceModule,
    serviceModule.exports,
  )
  return serviceModule.exports.captureTallinnInterest
}

const captureTallinnInterest = loadCaptureService()

const capturePayload = {
  fullName: 'Review Person',
  email: 'review@example.com',
  experienceSlug: 'purpose-to-practice',
  variantId: 'default',
  roleLens: 'creator',
  attendanceIntent: 'ready-if-time-works',
  slotIds: ['wed-0815'],
  companyOrProject: '',
  note: '',
  aftercareConsent: false,
  consentToContact: true,
  submissionId: '00000000-0000-4000-8000-000000000001',
  website: '',
}

const captureEnvironment = {
  notionToken: 'test-notion-token',
  notionDatabaseId: 'test-database',
  resendApiKey: 'test-resend-key',
  operatorEmail: 'operator@example.com',
}

function createMemoryIdempotency({ completeResult = true } = {}) {
  const states = new Map()
  return {
    states,
    async reserve(key, token, startedAt) {
      if (states.has(key)) return false
      states.set(key, { status: 'pending', token, startedAt })
      return true
    },
    async get(key) {
      return states.get(key) ?? null
    },
    async complete(key, token, recordId, completedAt) {
      const current = states.get(key)
      if (!current || current.token !== token) return false
      if (!completeResult) return false
      states.set(key, { status: 'completed', token, recordId, completedAt })
      return true
    },
    async recover(key, token, recordId, completedAt) {
      if (!states.has(key)) return false
      states.set(key, { status: 'completed', token, recordId, completedAt })
      return true
    },
  }
}

function createCaptureFetch({ writeStatus = 200 } = {}) {
  const calls = []
  const fetchImpl = async (url, init) => {
    calls.push({ url: String(url), method: init?.method })
    if (String(url).includes('/databases/')) {
      return new Response(JSON.stringify({ results: [] }), { status: 200 })
    }
    if (String(url).endsWith('/pages')) {
      return new Response(JSON.stringify({ id: 'notion-record-1' }), {
        status: writeStatus,
      })
    }
    if (String(url).includes('api.resend.com/emails')) {
      return new Response(JSON.stringify({ id: 'email-1' }), { status: 200 })
    }
    throw new Error(`Unexpected URL: ${url}`)
  }
  return { calls, fetchImpl }
}

test('registry exposes exactly ten unique offer routes and five ranked reviews', () => {
  const slugs = [...registry.matchAll(/\n\s{4}slug: '([^']+)'/g)].map((match) => match[1])
  assert.equal(slugs.length, 10)
  assert.equal(new Set(slugs).size, 10)

  const reviewRanks = [...registry.matchAll(/\n\s{4}reviewRank: ([1-5]),/g)]
    .map((match) => Number(match[1]))
    .sort((a, b) => a - b)
  assert.deepEqual(reviewRanks, [1, 2, 3, 4, 5])
})

test('portfolio contains thirty scored ideas and the five Ana-review formats', () => {
  const numberedRows = portfolio.match(/^\| \d{1,2} \|/gm) ?? []
  assert.equal(numberedRows.length, 30)

  for (const title of [
    'Purpose to Practice',
    'Creator Studio: From Idea to Draft',
    'Build Your AI Support Team',
    'Human + AI Team Agreement',
    'Founder Decision Circle',
  ]) {
    assert.match(portfolio, new RegExp(title.replace(/[+]/g, '\\+')))
  }
})

test('hub and offer pages preserve operational truth and affiliation boundary', () => {
  assert.match(registry, /not affiliated with, sponsored by, or endorsed by Mindvalley/)
  assert.match(registry, /Possible venue only · nothing is reserved/)
  assert.match(hub, /TALLINN_EVENT\.independenceNotice/)
  assert.match(offer, /TALLINN_EVENT\.independenceNotice/)
  assert.match(hub, /Nothing is booked yet/)
  assert.match(offer, /No room has been reserved/)
  assert.match(hub, /Leave Tallinn with one clear plan you can use the next morning/)
  assert.match(hub, /What matters/)
  assert.match(hub, /Practical result/)
  assert.match(hub, /Weekly rhythm/)
  assert.match(hub, /Team use/)
})

test('review mode hides the form, stores nothing, sends nothing, and creates no marketing audience', () => {
  assert.match(route, /TALLINN_CAPTURE_MODE === 'live'/)
  assert.match(route, /TALLINN_PRIVACY_NOTICE_APPROVED === 'true'/)
  assert.match(form, /if \(!captureEnabled\)/)
  assert.match(form, /Interest collection is not open yet/)
  assert.match(route, /No data was stored and no email was sent/)
  assert.doesNotMatch(form, /test@example\.com|Simulate request/)
  assert.doesNotMatch(route, /test@example\.com|Preview simulation passed/)
  assert.doesNotMatch(service, /audiences|contacts|newsletter/i)
  assert.match(form, /not be added to a newsletter or used for unrelated marketing/)
})

test('attendee copy assumes no Ana role and excludes internal market language', () => {
  assert.match(registry, /No role is assumed/)
  assert.match(hub, /No role assumed/)
  assert.doesNotMatch(registry, /producer by default|thought-leadership route|people-work pipeline/i)
  assert.doesNotMatch(hub, /Outcome router|Demand signal|market variants|smuggle people/i)
  assert.doesNotMatch(offer, /Host architecture|Operational truth|demand clears the gate/i)
})

test('request safety, identity fallback, and CRM classification are release-gated', () => {
  assert.match(route, /readJsonWithinLimit\(request, MAX_BODY_BYTES\)/)
  assert.match(route, /request\.body\.getReader\(\)/)
  assert.doesNotMatch(route, /request\.json\(\)/)
  assert.match(route, /errorName: safeErrorName\(error\)/)
  assert.doesNotMatch(route, /unexpected error['"], error/)
  assert.match(form, /function createSubmissionId\(\)/)
  assert.match(form, /cryptoApi\?\.getRandomValues/)
  assert.match(form, /Choose at least one possible time\./)
  assert.match(service, /INTENT_LABEL\.general/)
  assert.doesNotMatch(service, /Workshop \(1-day team build\)/)
  assert.match(packageJson, /"test:ana-release"/)
  assert.match(packageJson, /"merge:gate": "npm run test:homepage-release && npm run test:ana-release/)
  assert.match(packageJson, /"merge:gate:ci": "npm run test:homepage-release && npm run test:ana-release/)
})

test('capacity and participant artifact promises match each selected experience', () => {
  assert.match(registry, /capacity: '8–10 people',\s*roomCapacityTarget: 10,/)
  assert.equal((registry.match(/roomCapacityTarget: 12,/g) ?? []).length, 10)
  assert.match(threshold, /experience\.slug === experienceSlug/)
  assert.match(threshold, /\?\.roomCapacityTarget/)
  assert.match(registry, /A two-page Purpose-to-Practice Plan/)
})

test('the print route isolates the worksheet without hiding the Next.js root', () => {
  assert.match(worksheet, /body \* \{ visibility: hidden; \}/)
  assert.match(worksheet, /#tallinn-worksheet, #tallinn-worksheet \* \{ visibility: visible; \}/)
  assert.doesNotMatch(worksheet, /body > \*:not\(#main\)/)
})

test('live capture stores first and sends only transactional mail afterward', () => {
  const createIndex = service.indexOf('createRecord(payload')
  const receiptIndex = service.indexOf('buildTallinnInterestReceipt(payload)')
  assert.ok(createIndex > -1)
  assert.ok(receiptIndex > createIndex)
  assert.match(service, /Source/)
  assert.match(service, /submissionId/)
})

test('capture behavior reserves, stores, finalizes, and only then sends mail', async () => {
  const idempotency = createMemoryIdempotency()
  const { calls, fetchImpl } = createCaptureFetch()
  const result = await captureTallinnInterest(capturePayload, captureEnvironment, {
    fetchImpl,
    idempotency,
    createReservationToken: () => 'reservation-1',
    now: () => new Date('2026-07-14T12:00:00.000Z'),
  })

  assert.equal(result.stored, true)
  assert.equal(result.duplicate, false)
  assert.equal(result.receiptSent, true)
  assert.equal(result.operatorNotified, true)
  assert.equal(calls.filter((call) => call.url.endsWith('/pages')).length, 1)
  assert.equal(calls.filter((call) => call.url.includes('api.resend.com/emails')).length, 2)
  assert.ok(
    calls.findIndex((call) => call.url.endsWith('/pages')) <
      calls.findIndex((call) => call.url.includes('api.resend.com/emails')),
  )
  assert.equal([...idempotency.states.values()][0].status, 'completed')
})

test('a failed Notion write sends no mail and leaves the reservation fail-closed', async () => {
  const idempotency = createMemoryIdempotency()
  const { calls, fetchImpl } = createCaptureFetch({ writeStatus: 500 })
  const result = await captureTallinnInterest(capturePayload, captureEnvironment, {
    fetchImpl,
    idempotency,
    createReservationToken: () => 'reservation-1',
  })

  assert.equal(result.stored, false)
  assert.equal(result.error, 'notion-write-failed')
  assert.equal(calls.filter((call) => call.url.includes('api.resend.com/emails')).length, 0)
  assert.equal([...idempotency.states.values()][0].status, 'pending')
})

test('a failed reservation finalization sends no mail and remains fail-closed', async () => {
  const idempotency = createMemoryIdempotency({ completeResult: false })
  const { calls, fetchImpl } = createCaptureFetch()
  const result = await captureTallinnInterest(capturePayload, captureEnvironment, {
    fetchImpl,
    idempotency,
    createReservationToken: () => 'reservation-1',
  })

  assert.equal(result.stored, true)
  assert.equal(result.pending, true)
  assert.equal(result.error, 'reservation-finalize-failed')
  assert.equal(result.receiptSent, false)
  assert.equal(result.operatorNotified, false)
  assert.equal(calls.filter((call) => call.url.endsWith('/pages')).length, 1)
  assert.equal(calls.filter((call) => call.url.includes('api.resend.com/emails')).length, 0)
  assert.equal([...idempotency.states.values()][0].status, 'pending')
})

test('concurrent retries allow one Notion write and one pair of transactional emails', async () => {
  const idempotency = createMemoryIdempotency()
  const { calls, fetchImpl } = createCaptureFetch()
  const first = captureTallinnInterest(capturePayload, captureEnvironment, {
    fetchImpl,
    idempotency,
    createReservationToken: () => 'reservation-1',
  })
  const second = captureTallinnInterest(capturePayload, captureEnvironment, {
    fetchImpl,
    idempotency,
    createReservationToken: () => 'reservation-2',
  })
  const results = await Promise.all([first, second])

  assert.equal(results.filter((result) => result.stored && !result.duplicate).length, 1)
  assert.equal(results.filter((result) => result.duplicate).length, 1)
  assert.equal(calls.filter((call) => call.url.endsWith('/pages')).length, 1)
  assert.equal(calls.filter((call) => call.url.includes('api.resend.com/emails')).length, 2)
})

test('external capture endpoints are centralized and have one canonical source', () => {
  assert.match(service, /const NOTION_API_BASE = 'https:\/\/api\.notion\.com\/v1'/)
  assert.match(service, /const RESEND_EMAILS_URL = 'https:\/\/api\.resend\.com\/emails'/)
  assert.equal((service.match(/https:\/\/api\.notion\.com\/v1/g) ?? []).length, 1)
  assert.equal((service.match(/https:\/\/api\.resend\.com\/emails/g) ?? []).length, 1)
  assert.match(service, /`\$\{NOTION_API_BASE\}\/databases\/\$\{env\.notionDatabaseId\}\/query`/)
  assert.match(service, /`\$\{NOTION_API_BASE\}\/pages`/)
  assert.match(service, /fetchWithTimeout\(fetchImpl, RESEND_EMAILS_URL/)
})

test('unlisted routes remain noindex and generate all ten static paths', () => {
  const hubRoute = read('app/experiences/tallinn-2026/page.tsx')
  const offerRoute = read('app/experiences/tallinn-2026/[slug]/page.tsx')
  assert.match(hubRoute, /noindex: true/)
  assert.match(offerRoute, /noindex: true/)
  assert.match(hubRoute, /TALLINN_PRIVACY_NOTICE_APPROVED === 'true'/)
  assert.match(offerRoute, /TALLINN_PRIVACY_NOTICE_APPROVED === 'true'/)
  assert.match(offerRoute, /generateStaticParams/)
})
