#!/usr/bin/env node
// Regression test for the Operator Scorecard scoring engine
// (lib/scorecard/engine.ts). Verifies every tier is reachable, every question
// maps to one of the six dimensions, and the tier boundaries score correctly.
//
// No test runner is configured in this repo (package.json has no "test"
// script) — see scripts/test-delivery.mjs for the established pattern. This
// engine has zero '@/*'-aliased imports, so it runs directly with node:test:
//   node --experimental-strip-types scripts/test-scorecard-engine.mjs
import test from 'node:test'
import assert from 'node:assert/strict'
import { resolve, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')

const {
  DIMENSIONS,
  QUESTIONS,
  TIERS,
  scoreScorecard,
  getTierForScore,
} = await import(pathToFileURL(resolve(ROOT, 'lib/scorecard/engine.ts')).href)

test('every question maps to a declared dimension', () => {
  const dimensionIds = new Set(DIMENSIONS.map((d) => d.id))
  for (const q of QUESTIONS) {
    assert.ok(dimensionIds.has(q.dimension), `question "${q.id}" references unknown dimension "${q.dimension}"`)
  }
})

test('all six dimensions are covered by at least one question', () => {
  const covered = new Set(QUESTIONS.map((q) => q.dimension))
  for (const dim of DIMENSIONS) {
    assert.ok(covered.has(dim.id), `dimension "${dim.id}" has no question mapped to it`)
  }
})

test('spec calls for ~11 questions across 6 dimensions', () => {
  assert.equal(DIMENSIONS.length, 6)
  assert.equal(QUESTIONS.length, 11)
})

test('every question has exactly 4 options scored 0-3 with no gaps', () => {
  for (const q of QUESTIONS) {
    assert.equal(q.options.length, 4, `question "${q.id}" should have 4 options`)
    const points = q.options.map((o) => o.points).sort((a, b) => a - b)
    assert.deepEqual(points, [0, 1, 2, 3], `question "${q.id}" options should score exactly 0,1,2,3`)
  }
})

test('every option id is unique within its question', () => {
  for (const q of QUESTIONS) {
    const ids = q.options.map((o) => o.id)
    assert.equal(new Set(ids).size, ids.length, `question "${q.id}" has duplicate option ids`)
  }
})

test('an empty answer set scores 0 and resolves to the lowest tier', () => {
  const result = scoreScorecard({})
  assert.equal(result.totalScore, 0)
  assert.equal(result.tier.id, 'solo-operator')
})

test('answering every question with the top option scores 100 and resolves to the top tier', () => {
  const answers = {}
  for (const q of QUESTIONS) {
    const top = q.options.find((o) => o.points === 3)
    answers[q.id] = top.id
  }
  const result = scoreScorecard(answers)
  assert.equal(result.totalScore, 100)
  assert.equal(result.tier.id, 'ambient-operator')
})

test('all four tiers are reachable', () => {
  const seen = new Set()
  for (let score = 0; score <= 100; score++) {
    seen.add(getTierForScore(score).id)
  }
  const expected = new Set(TIERS.map((t) => t.id))
  assert.deepEqual(seen, expected, 'every declared tier must be reachable by some integer score 0-100')
})

test('tier boundaries are correct and contiguous', () => {
  const sorted = [...TIERS].sort((a, b) => a.minScore - b.minScore)
  assert.equal(sorted[0].minScore, 0, 'lowest tier must start at 0')
  assert.equal(sorted[sorted.length - 1].minScore < 100, true, 'top tier must start below 100')

  // Boundary values resolve to the tier that owns them, not a neighbor.
  assert.equal(getTierForScore(0).id, 'solo-operator')
  assert.equal(getTierForScore(24).id, 'solo-operator')
  assert.equal(getTierForScore(25).id, 'hybrid-delegator')
  assert.equal(getTierForScore(49).id, 'hybrid-delegator')
  assert.equal(getTierForScore(50).id, 'agentic-leader')
  assert.equal(getTierForScore(74).id, 'agentic-leader')
  assert.equal(getTierForScore(75).id, 'ambient-operator')
  assert.equal(getTierForScore(100).id, 'ambient-operator')
})

test('dimension scores sum to the total raw score', () => {
  const answers = {}
  for (const [i, q] of QUESTIONS.entries()) {
    // Mix of answers so this is not just the all-zero or all-max case.
    const pick = q.options[i % q.options.length]
    answers[q.id] = pick.id
  }
  const result = scoreScorecard(answers)
  const summed = result.dimensionScores.reduce((acc, d) => acc + d.raw, 0)
  assert.equal(summed, result.totalRaw)
  const summedMax = result.dimensionScores.reduce((acc, d) => acc + d.max, 0)
  assert.equal(summedMax, result.totalMax)
})

test('the named ceiling is always the lowest-scoring dimension', () => {
  // Force "systemization" to be the clear lowest, everything else near-max.
  const answers = {}
  for (const q of QUESTIONS) {
    if (q.dimension === 'systemization') {
      answers[q.id] = q.options.find((o) => o.points === 0).id
    } else {
      answers[q.id] = q.options.find((o) => o.points === 3).id
    }
  }
  const result = scoreScorecard(answers)
  assert.equal(result.ceiling.dimension, 'systemization')

  const systemizationScore = result.dimensionScores.find((d) => d.dimension === 'systemization')
  for (const d of result.dimensionScores) {
    assert.ok(d.pct >= systemizationScore.pct, `${d.dimension} (${d.pct}%) should not score below the ceiling dimension`)
  }
})

test('an unanswered question contributes 0 points, not a crash', () => {
  const [first] = QUESTIONS
  const result = scoreScorecard({ [first.id]: 'not-a-real-option-id' })
  assert.equal(result.totalRaw, 0)
})
