import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import { audiences, buildCollaborationMessage, challengeBriefs, researchTracks } from '../../content/partnerships/university-collaboration.ts'
import { universityProgrammes, campusIdeas } from '../../content/partnerships/university-programmes.ts'
import { enumerateRoutes, hasAppRoute } from '../../lib/route-enumeration.mjs'

test('public collaboration route is discoverable while the meeting proposal remains unlisted', () => {
  assert.equal(hasAppRoute('/partnerships/universities'), true)
  const routes = enumerateRoutes().map(item => item.href)
  assert.ok(routes.includes('/partnerships/universities'))
  assert.ok(!routes.includes('/partnerships/proposal/uva-rec-impact'))
})

test('every audience and challenge produces an attributable inquiry within the intake limit', () => {
  for (const audience of audiences) {
    for (const challenge of challengeBriefs) {
      const message = buildCollaborationMessage(audience.id, 'Mentoring or technical support', challenge.title, 'x'.repeat(3500))
      assert.ok(message.length <= 4000)
      assert.ok(message.includes(`Role: ${audience.label}`))
      assert.ok(message.includes(`Challenge: ${challenge.title}`))
    }
  }
  assert.match(buildCollaborationMessage('student', 'Guest lecture', challengeBriefs[0].title, '  A course question.  '), /\n\nA course question\.$/)
})

test('each bookable programme fits the intake limit with complete host context', () => {
  for (const offer of universityProgrammes) {
    const format = [offer.name, offer.format, offer.fee].join(' · ')
    const message = buildCollaborationMessage('academic', format, '', 'x'.repeat(3375))
    assert.ok(message.length <= 4000)
    assert.ok(message.includes(offer.fee))
    assert.ok(offer.output && offer.buyer && offer.host)
    assert.doesNotMatch(message, /Challenge:/)
  }
  assert.equal(new Set(campusIdeas.map(([region]) => region)).size, 8)
})

test('proposed studies carry competing explanations, comparison and limits', () => {
  for (const track of researchTracks) {
    assert.equal(track.conditions.length, 3)
    assert.ok(track.hypothesis && track.compare && track.limit && track.output)
    assert.ok(track.measures.length >= 3)
  }
})

test('rendered public page exposes functional intake without personal meeting copy', {skip: !process.env.UNIVERSITY_RENDERED_HTML}, () => {
  const html = fs.readFileSync(process.env.UNIVERSITY_RENDERED_HTML, 'utf8')
  assert.match(html, /rel="canonical" href="https:\/\/www\.frankx\.ai\/partnerships\/universities"/)
  assert.doesNotMatch(html, /name="robots" content="noindex/)
  assert.match(html, /University collaboration inquiry/)
  assert.match(html, /Send inquiry to Frank/)
  for (const offer of universityProgrammes) assert.ok(html.includes(offer.fee))
  for (const [, institution] of campusIdeas) assert.ok(html.includes(institution))
  assert.match(html, /Request dates and a written scope/)
  assert.doesNotMatch(html, /href="[^"]*proposal\/uva-rec-impact/)
  assert.match(html, /No marketing subscription/)
  assert.match(html, /Fellowship participation and a collaboration agreement are not confirmed/)
  assert.match(html, /Conceptual study design\. No measured results are shown/)
  assert.doesNotMatch(html, /Following the conversation with Erik Boer|mail\.google\.com|agentic-ops\/|x-vercel-protection-bypass/)
})
