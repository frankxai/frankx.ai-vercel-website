import assert from 'node:assert/strict'
import test from 'node:test'
import { readFileSync } from 'node:fs'
import { estimateApifyEvents, estimateAcceptedCost } from '../../lib/apify-cost-model.ts'
import { makeResearchPlan } from '../../examples/apify-research/request-plan.mjs'

test('published default example reproduces the dated event arithmetic for each tier', () => {
  assert.equal(estimateApifyEvents('BRONZE', 10, 0, 1, 1), 0.019225)
  assert.equal(estimateApifyEvents('FREE', 10, 0, 1, 1), 0.023025)
  assert.equal(estimateApifyEvents('BRONZE', 10, 1, 2, 2), 0.0228)
})
test('unknown and invalid assumptions cannot produce a reassuring estimate', () => {
  assert.equal(estimateApifyEvents('BRONZE', NaN, 0, 1, 1), null)
  assert.equal(estimateApifyEvents('BRONZE', -1, 0, 1, 1), null)
  assert.equal(estimateApifyEvents('BRONZE', 1.2, 0, 1, 1), null)
  assert.equal(estimateApifyEvents('BRONZE', 1, 0, 1, 0), null)
  assert.equal(estimateAcceptedCost(1, null, 1), null)
  assert.equal(estimateAcceptedCost(1, 2, 0), null)
  assert.equal(estimateAcceptedCost(null, 2, 1), null)
  assert.equal(estimateAcceptedCost(1, 2, 2), 1.5)
})
test('embedded request artifacts stay identical to the tested offline planner', () => {
  const fixture = JSON.parse(readFileSync(new URL('../../examples/apify-research/fixtures/mission.json', import.meta.url)))
  const embedded = JSON.parse(readFileSync(new URL('../../data/guides/apify-research-plan.json', import.meta.url)))
  assert.deepEqual(embedded, makeResearchPlan(fixture))
})

test('public download and shipped client evidence template preserve the source contract', () => {
  const read = path => JSON.parse(readFileSync(new URL(path, import.meta.url)))
  const canonical = read('../../docs/ops/apify-product-lane/evaluation.template.json')
  assert.deepEqual(read('../../data/guides/apify-evidence-template.json'), canonical)
  assert.deepEqual(read('../../public/downloads/apify-research/evidence-receipt.json'), canonical)
  assert.equal(canonical.actorRunId, null)
  assert.equal(canonical.evidenceClass, 'template_not_a_run')
})
