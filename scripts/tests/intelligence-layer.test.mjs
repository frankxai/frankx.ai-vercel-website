/**
 * Contract for the model-intelligence data layer.
 *
 * The guarantees under test are the ones the public page will lean on:
 *   - a seeded snapshot is a first-class state, not a crash and not fake data
 *   - a model is never credited with a measurement it did not appear in
 *   - near-miss names ("GPT-5" vs "GPT-5.5") never inherit each other's results
 *   - third-party figures and first-party measurements stay in separate fields
 *
 * The last two matter most. Both failure modes invent evidence, and inventing evidence
 * is exactly what this surface was rebuilt to stop doing.
 */

import assert from 'node:assert/strict'
import test from 'node:test'

import { buildIntelligenceRows } from '../../lib/intelligence/rows.ts'
import {
  isSeed,
  getExternalModels,
  getSources,
  getLinkOnly,
  getSnapshotAgeDays,
} from '../../lib/intelligence/loader.ts'
import { getReceipts, lastMeasured, getReceiptProblems } from '../../lib/intelligence/receipts.ts'

const receipt = (over = {}) => ({
  round_id: 'round-1',
  date: '2026-07-01',
  title: 'Round 1',
  contestants: ['Claude Sonnet 5'],
  methodology: 'test',
  href: '/research/arena-receipts/round-1.json',
  tasks: [{ id: 'task-a', prompt: 'p', results: { 'sonnet-5': { status: 'pass' } } }],
  ...over,
})

const model = (over = {}) => ({
  id: 'sonnet-5',
  name: 'Claude Sonnet 5',
  org: 'anthropic',
  in_registry: true,
  names: {},
  pricing: null,
  adoption: null,
  context_tokens: null,
  benchmarks: [],
  ...over,
})

test('a model named as a contestant is credited with that round', () => {
  const [row] = buildIntelligenceRows([model()], [receipt()])
  assert.equal(row.hasReceipt, true)
  assert.equal(row.measured.length, 1)
  assert.equal(row.measured[0].roundId, 'round-1')
  assert.deepEqual(row.measured[0].taskStatuses, { 'task-a': 'pass' })
})

test('a model absent from a round is credited with nothing', () => {
  const other = model({ id: 'gemini-4', name: 'Gemini 4' })
  const [row] = buildIntelligenceRows([other], [receipt()])
  assert.equal(row.hasReceipt, false)
  assert.deepEqual(row.measured, [])
})

test('near-miss model names never inherit each other results', () => {
  // The bug this prevents: substring matching would let GPT-5 claim GPT-5.5's pass.
  const r = receipt({ contestants: ['GPT-5.5'], tasks: [{ id: 't', prompt: 'p', results: { 'gpt-5-5': { status: 'pass' } } }] })
  const [row] = buildIntelligenceRows([model({ id: 'gpt-5', name: 'GPT-5' })], [r])
  assert.equal(row.hasReceipt, false, 'GPT-5 must not inherit GPT-5.5 evidence')
})

test('a contestant listed but absent from results still counts as an appearance', () => {
  // The round entered it; the receipt is the record of what happened, including nothing.
  const r = receipt({ tasks: [{ id: 'task-a', prompt: 'p', results: {} }] })
  const [row] = buildIntelligenceRows([model()], [r])
  assert.equal(row.hasReceipt, true)
  assert.deepEqual(row.measured[0].taskStatuses, {})
})

test('external figures and measurements stay in separate fields', () => {
  const priced = model({
    pricing: {
      in_usd_per_m: 3,
      out_usd_per_m: 15,
      source: 'models-dev',
      source_url: 'https://models.dev/api.json',
      license: 'MIT',
      retrieved_at: '2026-08-31T06:00:00.000Z',
      modified: true,
    },
  })
  const [row] = buildIntelligenceRows([priced], [receipt()])
  assert.equal(row.external.pricing.in_usd_per_m, 3)
  assert.equal(row.external.pricing.source, 'models-dev', 'figure keeps its provenance')
  assert.ok(Array.isArray(row.measured), 'measurements are not merged into the figure')
  assert.equal(row.measured.length, 1)
  assert.equal(row.external.pricing.measured, undefined, 'no cross-contamination of the two claim types')
})

test('measured models sort ahead of unmeasured ones', () => {
  const rows = buildIntelligenceRows(
    [model({ id: 'aaa-unmeasured', name: 'AAA Unmeasured' }), model()],
    [receipt()],
  )
  assert.equal(rows[0].id, 'sonnet-5', 'first-party evidence leads regardless of alphabetical order')
})

test('an empty snapshot yields rows, not a crash', () => {
  assert.deepEqual(buildIntelligenceRows([], []), [])
  const rows = buildIntelligenceRows([model()], [])
  assert.equal(rows.length, 1)
  assert.equal(rows[0].hasReceipt, false)
})

test('the committed snapshot loads and reports its seed state honestly', () => {
  const models = getExternalModels()
  assert.ok(models.length > 0, 'snapshot carries registry models even while seeded')
  assert.ok(getSources().length > 0)
  assert.ok(getLinkOnly().length > 0, 'no-redistribution sources are still named')

  if (isSeed()) {
    // While seeded, no model may carry a figure — that is the whole point of the state.
    for (const m of models) {
      assert.equal(m.pricing, null, `${m.id} must carry no pricing while seeded`)
      assert.equal(m.adoption, null, `${m.id} must carry no adoption while seeded`)
    }
    assert.equal(getSnapshotAgeDays(), null, 'never-populated is null age, not a large number')
  }
})

test('receipts on disk parse and expose a real last-measured date', () => {
  assert.deepEqual(getReceiptProblems(), [], 'every committed receipt must validate')
  const receipts = getReceipts()
  if (receipts.length === 0) {
    assert.equal(lastMeasured(), null, 'no receipts means no measurement date, not a guess')
  } else {
    assert.match(lastMeasured(), /^\d{4}-\d{2}-\d{2}$/)
    assert.equal(lastMeasured(), receipts[0].date, 'last measured is the newest receipt')
    for (const r of receipts) assert.ok(r.href.startsWith('/research/arena-receipts/'))
  }
})
