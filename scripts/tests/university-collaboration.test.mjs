import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import { audiences, buildCollaborationMessage, challengeBriefs, researchTracks } from '../../content/partnerships/university-collaboration.ts'
import { universityProgrammes } from '../../content/partnerships/university-programmes.ts'
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

test('programme requests preserve fees, campus, dates and the host message within the intake limit', () => {
  for (const programme of universityProgrammes) {
    const format = [programme.name, programme.format, programme.fee].join(' · ')
    const context = ['c'.repeat(100), 't'.repeat(70)].join(' · ')
    const message = buildCollaborationMessage('academic', format, '', context + '\n\n' + 'm'.repeat(3200))
    assert.ok(message.length <= 4000)
    assert.ok(message.includes(format))
    assert.ok(message.includes(context))
    assert.doesNotMatch(message, /Challenge:/)
  }
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
  assert.match(html, /Printable university host brief/)
  assert.match(html, /Facilitator workbook/)
  for (const programme of universityProgrammes) {
    assert.ok(html.includes('?programme=' + programme.id + '#programmes'))
  }
  assert.match(html, /No marketing subscription/)
  assert.match(html, /Fellowship participation and a collaboration agreement are not confirmed/)
  assert.match(html, /Conceptual study design\. No measured results are shown/)
  assert.doesNotMatch(html, /Following the conversation with Erik Boer|mail\.google\.com|agentic-ops\/|x-vercel-protection-bypass/)
})

test('source-check replay removes the response record while retaining independent attendance evidence', async () => {
  const { evidence, rounds, samplePath, teachingKit } = await import('../../app/partnerships/universities/source-check/case.ts')
  assert.ok(enumerateRoutes().some(item => item.href === samplePath))
  assert.deepEqual(rounds.map(round => round.sources), [['REG', 'ATT', 'EXIT'], ['REG', 'ATT']])
  assert.deepEqual(rounds.map(round => round.expected), ['revise', 'request'])
  for (const round of rounds) {
    assert.ok(round.citations.every(id => round.sources.includes(id)))
    assert.ok(teachingKit().includes(round.finding))
  }
  assert.ok(evidence.every(record => teachingKit().includes(record.file)))
})
