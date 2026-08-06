import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const pagePath = new URL('../../app/mvu/expert-authority/page.tsx', import.meta.url)
const experiencePath = new URL('../../components/expert-authority/ExpertAuthorityExperience.tsx', import.meta.url)
const leadRoutePath = new URL('../../app/api/expert-authority/lead/route.ts', import.meta.url)
const intelligencePath = new URL('../../lib/expert-authority-intelligence.ts', import.meta.url)
const insightsPath = new URL('../../app/mvu/expert-authority/insights/page.tsx', import.meta.url)
const qrRoutePath = new URL('../../app/api/qr/expert-authority/route.ts', import.meta.url)
const skillPath = new URL('../../public/skills/expert-authority/SKILL.md', import.meta.url)
const promptPackPath = new URL('../../public/skills/expert-authority/PROMPT-PACK.md', import.meta.url)

const [page, experience, leadRoute, intelligence, insights, qrRoute, skill, promptPack] = await Promise.all([
  readFile(pagePath, 'utf8'),
  readFile(experiencePath, 'utf8'),
  readFile(leadRoutePath, 'utf8'),
  readFile(intelligencePath, 'utf8'),
  readFile(insightsPath, 'utf8'),
  readFile(qrRoutePath, 'utf8'),
  readFile(skillPath, 'utf8'),
  readFile(promptPackPath, 'utf8'),
])

test('public route has canonical metadata and social image', () => {
  assert.match(page, /https:\/\/frankx\.ai\/mvu\/expert-authority/)
  assert.match(page, /opengraph-image/)
  assert.match(page, /Expert Authority Intelligence System/)
})

test('experience presents one system with five governed engines', () => {
  for (const engine of [
    'Expert Intelligence',
    'Audience Intelligence',
    'Authority Engine',
    'Product Intelligence',
    'Funnel Intelligence',
  ]) {
    assert.match(experience, new RegExp(engine))
  }

  assert.match(experience, /Do not market five systems\. Operate five engines\./)
  assert.match(experience, /Map my authority system/)
  assert.match(experience, /Generate my authority map/)
})

test('diagnostic delivers a result, blueprint, and optional research signal', () => {
  assert.match(experience, /Hidden Expert/)
  assert.match(experience, /Emerging Authority/)
  assert.match(experience, /Market Machine/)
  assert.match(experience, /Intelligence Operator/)
  assert.match(experience, /downloadBlueprint/)
  assert.match(experience, /\/api\/expert-authority\/lead/)
  assert.match(experience, /researchInvitationOptIn/)
  assert.match(experience, /submissionId/)
  assert.match(experience, /No newsletter/)
})

test('lead route derives scores server-side and delivers idempotently', () => {
  assert.match(leadRoute, /isExpertAuthorityAnswers/)
  assert.match(leadRoute, /deriveExpertAuthorityResult\(answers\)/)
  assert.match(leadRoute, /SUBMISSION_ID_PATTERN/)
  assert.match(leadRoute, /Idempotency-Key/)
  assert.match(leadRoute, /expert-authority-result\/\$\{submissionId\}/)
  assert.match(leadRoute, /expert-authority-research\/\$\{submissionId\}/)
  assert.match(leadRoute, /researchInvitationOptIn[\s\S]*\? resend/)
  assert.match(leadRoute, /emailRatelimit/)
  assert.doesNotMatch(leadRoute, /continuing open/)
  assert.match(leadRoute, /RESEND_API_KEY/)
  assert.match(leadRoute, /OPERATOR_EMAIL/)
  assert.match(leadRoute, /Your Expert Authority Map/)
  assert.doesNotMatch(leadRoute, /\/audiences\//)
  assert.doesNotMatch(leadRoute, /unsubscribed:\s*false/)
  assert.doesNotMatch(leadRoute, /recordExpertAuthoritySignal/)
})

test('honeypot exits before rate limiting and every email path', () => {
  const jsonIndex = leadRoute.indexOf('const payload = await request.json()')
  const honeypotIndex = leadRoute.indexOf("if (typeof website === 'string'")
  const limiterIndex = leadRoute.indexOf('await emailRatelimit.limit')
  const deliveryIndex = leadRoute.indexOf("resend('/emails'")

  assert.ok(jsonIndex >= 0, 'request JSON must be parsed')
  assert.ok(honeypotIndex > jsonIndex, 'honeypot must be checked after JSON parsing')
  assert.ok(limiterIndex > honeypotIndex, 'honeypot must return before rate limiting')
  assert.ok(deliveryIndex > limiterIndex, 'rate limiting must still precede email delivery')
})

test('honeypot stays bot-fillable but is absent from assistive navigation', () => {
  assert.match(
    experience,
    /<label[\s\S]{0,160}aria-hidden="true"[\s\S]{0,240}<input[\s\S]{0,120}name="website"[\s\S]{0,120}type="text"[\s\S]{0,120}tabIndex=\{-1\}/,
  )
})

test('individual response data is not publicly persisted or aggregated', () => {
  assert.match(intelligence, /deriveExpertAuthorityResult/)
  assert.doesNotMatch(intelligence, /@vercel\/blob|access:\s*'public'|capturedAt|loadSignals/)
  assert.match(insights, /redirect\('\/mvu\/expert-authority'\)/)
})

test('QR and downloadable assets resolve to the public release route', () => {
  assert.match(qrRoute, /https:\/\/frankx\.ai\/mvu\/expert-authority/)
  assert.match(qrRoute, /errorCorrectionLevel: 'H'/)
  assert.match(experience, /\/skills\/expert-authority\/SKILL\.md/)
  assert.match(experience, /\/skills\/expert-authority\/PROMPT-PACK\.md/)
  assert.match(skill, /Expert Authority Intelligence/)
  assert.match(promptPack, /Seven-Day Production Release/)
})
