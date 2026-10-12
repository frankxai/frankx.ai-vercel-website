import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const article = readFileSync(
  new URL('../../content/blog/golden-age-of-intelligence.mdx', import.meta.url),
  'utf8',
)
const caseSignals = article.split('## Case Signals & Proof Stories')[1].split('### Measurement Dashboard')[0]
const aboutShell = readFileSync(
  new URL('../../components/about/AboutShell.tsx', import.meta.url),
  'utf8',
)

test('case signals omit unsupported claims, quotes and the unbacked rating', () => {
  assert.doesNotMatch(
    caseSignals,
    /organic traffic up 62%|\+62% traffic|Retention up 38%|\+38% retention|\$2\.3M budget|pipeline value tripled|churn decreased by 33%|Customer satisfaction hit 4\.9\/5|\*\*Quote\*\*/,
  )
  assert.ok(!caseSignals.includes('4.9/5'))
})

test('case signals omit unsourced client results and the pipeline signals block', () => {
  for (const claim of [
    '### Case Signal Examples',
    '### Case Signal Table',
    'Publishing frequency increased from 3 posts/week to 9/day',
    'newsletter subscriptions doubled',
    'Weekly event attendance doubled',
    '150+ testimonials',
    '28% lift in marketing qualified leads',
    'Discord activity up 240%',
    '+240% engagement',
    '14 percentage points',
    'Enrollment filled in 48 hours',
    'media mentions spiked',
    'keynote collaborations',
    '### Additional Signals in the Pipeline',
    'Boutique Agency Reinvention',
    'two flagships, 120 HFIBs',
    '120 HFIBs',
    'University Innovation Lab',
    'co-created an "AI for Civic Good" challenge',
    'Wellness Startup',
  ]) assert.ok(!caseSignals.includes(claim), claim)
  assert.ok(caseSignals.includes('### Case Signal Production Workflow'))
  assert.ok(caseSignals.includes('### Storytelling Best Practices'))
})

test('about story carries no unsourced revenue tier', () => {
  assert.doesNotMatch(aboutShell, /seven-figure|7-figure/i)
  assert.ok(aboutShell.includes('Alex built a solar business.'))
})
