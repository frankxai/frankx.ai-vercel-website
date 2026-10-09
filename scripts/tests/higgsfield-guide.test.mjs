import assert from 'node:assert/strict'
import fs from 'node:fs'
import test from 'node:test'
import { buildHiggsfieldBrief, higgsfieldWorkflows, higgsfieldLessons, HIGGSFIELD_REFERRAL } from '../../data/higgsfield-guide.ts'
import { portalsForGuide } from '../../lib/learn/related-portals.ts'

test('each goal produces a distinct brief with review and cost boundaries', () => {
  const briefs = higgsfieldWorkflows.map(workflow => buildHiggsfieldBrief(workflow, '', '9:16'))
  assert.equal(new Set(briefs).size, 6)
  for (const brief of briefs) {
    assert.match(brief, /Review:/)
    assert.match(brief, /Budget: \[set a limit/)
    assert.match(brief, /Official reference: https:\/\/higgsfield.ai\//)
    assert.doesNotMatch(brief, /fal-ai\/higgsfield|98\.4%|Face Lock/)
  }
  assert.match(briefs[5], /Marketing Studio is currently web-only/)
})

test('custom objectives remain brief content and whitespace falls back to the deliverable', () => {
  const workflow = higgsfieldWorkflows[0]
  assert.ok(buildHiggsfieldBrief(workflow, '  Ceramic mug reveal  ', '1:1').includes('Objective: Ceramic mug reveal\nDelivery ratio: 1:1'))
  assert.ok(buildHiggsfieldBrief(workflow, '  ', '16:9').includes(`Objective: ${workflow.deliverable}`))
})

test('guide preserves the exact referral and uses its dedicated learning portal', () => {
  assert.equal(HIGGSFIELD_REFERRAL, 'https://higgsfield.ai?fpr=frank-255866')
  assert.deepEqual(portalsForGuide('higgsfield-ai-video-guide'), ['higgsfield-mastery'])
  const component = fs.readFileSync('components/guides/higgsfield/HiggsfieldWorkbench.tsx', 'utf8')
  assert.match(component, /rel="sponsored noopener"/)
  assert.doesNotMatch(component, /trackEvent\([^,]+,\s*\{[^}]*\b(objective|brief|ratio)\b/)
})

test('all workflow anchors resolve and the guide contains no duplicate h1 or broken hero', () => {
  const guide = fs.readFileSync('content/guides/higgsfield-ai-video-guide.mdx', 'utf8')
  for (const workflow of higgsfieldWorkflows) assert.ok(guide.includes(`id="${workflow.anchor}"`))
  assert.doesNotMatch(guide, /^# /m)
  assert.doesNotMatch(guide, /ai-video-generation-2026.jpg|98\.4%|fal-ai\/higgsfield/)
})

test('curation includes two verified creators and the official channel, with original exercises', () => {
  assert.deepEqual(higgsfieldLessons.map(lesson => lesson.youtubeId), ['-vqocuhO1YE', 'R7GZjRMsrzM', '2OwMjg5As2g'])
  assert.equal(new Set(higgsfieldLessons.map(lesson => lesson.creator)).size, 3)
  for (const lesson of higgsfieldLessons) assert.ok(lesson.exercise && lesson.scope && lesson.creatorChannel)
})
