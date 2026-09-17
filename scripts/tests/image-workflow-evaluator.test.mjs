import { test } from 'node:test'
import assert from 'node:assert/strict'
import { evaluateAttempts } from '../../public/research/image-workflows/evaluate.mjs'

const attempt = (overrides = {}) => ({
  attempt_id: 'a1', run_id: 'r1', task_id: 'background-edit',
  provider_model_id: 'test-model', fixture_set_id: 'fixtures-v1', comparison_mode: 'shared_fixtures',
  approved: false, mandatory_checks_passed: false, api_cost_usd: 0.2,
  elapsed_ms: 1000, manual_correction_minutes: 0, ...overrides,
})

test('includes rejected attempts in spend and denominator', () => {
  const { groups: [r] } = evaluateAttempts([attempt(), attempt({ attempt_id: 'a2', approved: true, mandatory_checks_passed: true, api_cost_usd: 0.3 })])
  assert.equal(r.costPerApprovedAssetUsd, 0.5)
  assert.equal(r.attemptAcceptanceRate, 0.5)
  assert.equal(r.taskRuns, 1)
})

test('unknown costs and zero approved outputs do not become free production', () => {
  assert.equal(evaluateAttempts([attempt()]).groups[0].costPerApprovedAssetUsd, null)
  const result = evaluateAttempts([attempt({ api_cost_usd: null, elapsed_ms: null, manual_correction_minutes: null, approved: true, mandatory_checks_passed: true })]).groups[0]
  assert.equal(result.costPerApprovedAssetUsd, null)
  assert.equal(result.medianElapsedMs, null)
  assert.equal(result.totalCorrectionMinutes, null)
})

test('rejects approval of hard failures, duplicate records and double-counted assets', () => {
  assert.throws(() => evaluateAttempts([attempt({ approved: true })]), /mandatory/)
  assert.throws(() => evaluateAttempts([attempt(), attempt()]), /duplicate/)
  assert.throws(() => evaluateAttempts([attempt({ approved: true, mandatory_checks_passed: true }), attempt({ attempt_id: 'a2', approved: true, mandatory_checks_passed: true })]), /one approved/)
})

test('keeps different fixtures and evaluation modes separate', () => {
  const result = evaluateAttempts([attempt(), attempt({ attempt_id: 'a2', fixture_set_id: 'fixtures-v2' }), attempt({ attempt_id: 'a3', comparison_mode: 'end_to_end' })])
  assert.equal(result.groups.length, 3)
  assert.equal(result.evidenceStatus, 'user_supplied_unverified')
})

test('rejects missing, negative and nonfinite costs', () => {
  for (const api_cost_usd of [undefined, -1, Infinity, '0']) {
    assert.throws(() => evaluateAttempts([attempt({ api_cost_usd })]), /api_cost_usd/)
  }
})
