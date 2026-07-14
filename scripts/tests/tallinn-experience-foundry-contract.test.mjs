import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import test from 'node:test'

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
    'Agentic Creator Studio',
    'Build Your Agentic Team',
    'Human + Agent Team Charter',
    'Founder Integration Salon',
  ]) {
    assert.match(portfolio, new RegExp(title.replace(/[+]/g, '\\+')))
  }
})

test('hub and offer pages preserve operational truth and affiliation boundary', () => {
  assert.match(registry, /not affiliated with, sponsored by, or endorsed by Mindvalley/)
  assert.match(registry, /no room is booked/)
  assert.match(hub, /TALLINN_EVENT\.independenceNotice/)
  assert.match(offer, /TALLINN_EVENT\.independenceNotice/)
  assert.match(hub, /Venue not booked/)
  assert.match(offer, /No room is booked/)
  assert.match(hub, /Leave Tallinn with one thing running/)
  assert.match(hub, /Human/)
  assert.match(hub, /Practice/)
  assert.match(hub, /System/)
  assert.match(hub, /Team/)
})

test('preview mode is no-storage, dummy-email only, and does not create a marketing audience', () => {
  assert.match(route, /TALLINN_CAPTURE_MODE === 'live'/)
  assert.ok(route.includes("const REVIEW_EMAIL = /@example\\.com$/i"))
  assert.match(route, /No data was stored and no email was sent/)
  assert.doesNotMatch(service, /audiences|contacts|newsletter/i)
  assert.match(form, /No newsletter or unrelated marketing/)
})

test('request safety, identity fallback, and CRM classification are release-gated', () => {
  assert.match(route, /readJsonWithinLimit\(request, MAX_BODY_BYTES\)/)
  assert.match(route, /request\.body\.getReader\(\)/)
  assert.doesNotMatch(route, /request\.json\(\)/)
  assert.match(form, /function createSubmissionId\(\)/)
  assert.match(form, /cryptoApi\?\.getRandomValues/)
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
  assert.match(registry, /A two-page Human \+ AI Practice Map/)
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
  assert.match(offerRoute, /generateStaticParams/)
})
