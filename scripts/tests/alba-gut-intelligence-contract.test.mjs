import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const pagePath = new URL('../../app/share/alba-health/page.tsx', import.meta.url)
const demoPath = new URL('../../components/alba/GutJourneyDemo.tsx', import.meta.url)
const redirectPath = new URL('../../app/mvu/nora/page.tsx', import.meta.url)

const [page, demo, redirectPage] = await Promise.all([
  readFile(pagePath, 'utf8'),
  readFile(demoPath, 'utf8'),
  readFile(redirectPath, 'utf8'),
])

test('recipient page is unlisted and makes no partnership claim', () => {
  assert.match(page, /index: false/)
  assert.match(page, /noarchive: true/)
  assert.match(page, /No affiliation, endorsement, or/)
  assert.match(page, /fictional/i)
  assert.match(page, /collects no personalized health data/i)
})

test('journey demonstrates all five governed stages', () => {
  for (const stage of [
    "id: 'context'",
    "id: 'interpretation'",
    "id: 'first-week'",
    "id: 'reflection'",
    "id: 'handoff'",
  ]) {
    assert.match(demo, new RegExp(stage.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
  }

  assert.match(demo, /role="tablist"/)
  assert.match(demo, /aria-selected/)
  assert.match(demo, /motion-reduce:transition-none/)
})

test('open core, brief, and convenience route are wired', () => {
  assert.match(page, /health-intelligence-system\/tree\/main\/verticals\/gut-intelligence-system/)
  assert.match(page, /alba-gut-intelligence-partner-brief\.docx/)
  assert.match(redirectPage, /redirect\('\/share\/alba-health'\)/)
})

test('analytics records interaction only, never health context', () => {
  assert.match(demo, /alba_gut_journey_stage_selected/)
  assert.doesNotMatch(demo, /trackEvent\([^)]*(alias|allergy|food|health)/s)
})
