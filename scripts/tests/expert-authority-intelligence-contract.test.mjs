import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const pagePath = new URL('../../app/mvu/expert-authority/page.tsx', import.meta.url)
const experiencePath = new URL('../../components/expert-authority/ExpertAuthorityExperience.tsx', import.meta.url)
const leadRoutePath = new URL('../../app/api/expert-authority/lead/route.ts', import.meta.url)
const qrRoutePath = new URL('../../app/api/qr/expert-authority/route.ts', import.meta.url)
const skillPath = new URL('../../public/skills/expert-authority/SKILL.md', import.meta.url)
const promptPackPath = new URL('../../public/skills/expert-authority/PROMPT-PACK.md', import.meta.url)

const [page, experience, leadRoute, qrRoute, skill, promptPack] = await Promise.all([
  readFile(pagePath, 'utf8'),
  readFile(experiencePath, 'utf8'),
  readFile(leadRoutePath, 'utf8'),
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

test('diagnostic delivers a result, blueprint, lead capture, and founding signal', () => {
  assert.match(experience, /Hidden Expert/)
  assert.match(experience, /Emerging Authority/)
  assert.match(experience, /Market Machine/)
  assert.match(experience, /Intelligence Operator/)
  assert.match(experience, /downloadBlueprint/)
  assert.match(experience, /\/api\/expert-authority\/lead/)
  assert.match(experience, /foundingInterest/)
})

test('lead route validates scores and delivers through the governed email surface', () => {
  assert.match(leadRoute, /isValidAnswers/)
  assert.match(leadRoute, /score < 0 \|\| score > 20/)
  assert.match(leadRoute, /RESEND_API_KEY/)
  assert.match(leadRoute, /AUDIENCE_ID/)
  assert.match(leadRoute, /OPERATOR_EMAIL/)
  assert.match(leadRoute, /Your Expert Authority Map/)
})

test('QR and downloadable assets resolve to the public release route', () => {
  assert.match(qrRoute, /https:\/\/frankx\.ai\/mvu\/expert-authority/)
  assert.match(qrRoute, /errorCorrectionLevel: 'H'/)
  assert.match(experience, /\/skills\/expert-authority\/SKILL\.md/)
  assert.match(experience, /\/skills\/expert-authority\/PROMPT-PACK\.md/)
  assert.match(skill, /Expert Authority Intelligence/)
  assert.match(promptPack, /Seven-Day Production Release/)
})
