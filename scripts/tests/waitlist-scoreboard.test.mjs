import test from 'node:test'
import assert from 'node:assert/strict'
import { tally, toMarkdown } from '../waitlist/scoreboard-core.mjs'

const now = new Date('2026-11-10T12:00:00Z')
const sig = (o) => ({ productId: 'p', consent: true, position: 1, createdAt: '2026-11-09T10:00:00Z', ...o })

test('counts real signups by source, campaign, price band and urgency; test addresses excluded', () => {
  const t = tally(
    [
      sig({ email: 'a@acme.io', source: '/community', utm: { utm_source: 'linkedin', utm_campaign: 'launch' }, priceBand: '300-999', urgency: 'now' }),
      sig({ email: 'b@acme.io', source: 'starlightintelligence.academy/apply', priceBand: 'under-25' }),
      sig({ email: 'c@acme.io', source: '/community', createdAt: '2026-10-01T00:00:00Z' }),
      sig({ email: 'friemerx+waitlist-test@gmail.com', source: '/community' }),
      sig({ email: 'x@example.com', source: '/community' }),
    ],
    { now },
  )
  assert.equal(t.total, 3)
  assert.equal(t.testSignalsExcluded, 2)
  assert.equal(t.last7Days, 2)
  assert.equal(t.paidIntent, 1)
  assert.equal(t.startNow, 1)
  assert.deepEqual(t.source, [['frankx.ai/community', 2], ['academy', 1]])
  assert.deepEqual(t.campaign[0], ['none', 2])
  assert.deepEqual(t.urgency, [['not answered', 2], ['now', 1]])
})

test('an empty list reads as zero, not as an estimate', () => {
  const t = tally([], { now })
  assert.equal(t.total, 0)
  const md = toMarkdown('starlight-academy-operator-lab', t)
  assert.match(md, /\| Total signups \| 0 \|/)
  assert.doesNotMatch(md, /estimate|projected|~/i)
})
