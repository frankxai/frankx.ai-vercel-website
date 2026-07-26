#!/usr/bin/env node
// Regression test for the AI CoE Readiness Assessment scoring engine
// (lib/ai-coe-readiness/engine.ts). Verifies every maturity level is reachable, every question
// maps to one of the six dimensions, and the tier boundaries score correctly. Mirrors
// scripts/test-scorecard-engine.mjs's pattern for the Operator Scorecard.
//
// No test runner is configured in this repo (package.json has no "test" script). This engine
// has zero '@/*'-aliased imports, so it runs directly with node:test:
//   node --experimental-strip-types scripts/test-ai-coe-readiness-engine.mjs
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
  scoreReadiness,
  getTierForScore,
} = await import(pathToFileURL(resolve(ROOT, 'lib/ai-coe-readiness/engine.ts')).href)

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

test('spec calls for 6 dimensions and ~12 questions', () => {
  assert.equal(DIMENSIONS.length, 6)
  assert.equal(QUESTIONS.length, 12)
})

test('every dimension has exactly two questions', () => {
  const counts = new Map()
  for (const q of QUESTIONS) counts.set(q.dimension, (counts.get(q.dimension) ?? 0) + 1)
  for (const dim of DIMENSIONS) {
    assert.equal(counts.get(dim.id), 2, `dimension "${dim.id}" should have exactly 2 questions`)
  }
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

test('an empty answer set scores 0 and resolves to the lowest maturity level', () => {
  const result = scoreReadiness({})
  assert.equal(result.totalScore, 0)
  assert.equal(result.tier.id, 'ad-hoc')
})

test('answering every question with the top option scores 100 and resolves to Autonomous-Ready', () => {
  const answers = {}
  for (const q of QUESTIONS) {
    const top = q.options.find((o) => o.points === 3)
    answers[q.id] = top.id
  }
  const result = scoreReadiness(answers)
  assert.equal(result.totalScore, 100)
  assert.equal(result.tier.id, 'autonomous-ready')
})

test('all five maturity levels are reachable', () => {
  const seen = new Set()
  for (let score = 0; score <= 100; score++) {
    seen.add(getTierForScore(score).id)
  }
  const expected = new Set(TIERS.map((t) => t.id))
  assert.deepEqual(seen, expected, 'every declared tier must be reachable by some integer score 0-100')
})

test('tier boundaries are correct, contiguous quintiles', () => {
  const sorted = [...TIERS].sort((a, b) => a.minScore - b.minScore)
  assert.equal(sorted[0].minScore, 0, 'lowest tier must start at 0')
  assert.equal(sorted[sorted.length - 1].minScore < 100, true, 'top tier must start below 100')

  assert.equal(getTierForScore(0).id, 'ad-hoc')
  assert.equal(getTierForScore(19).id, 'ad-hoc')
  assert.equal(getTierForScore(20).id, 'piloting')
  assert.equal(getTierForScore(39).id, 'piloting')
  assert.equal(getTierForScore(40).id, 'scaling')
  assert.equal(getTierForScore(59).id, 'scaling')
  assert.equal(getTierForScore(60).id, 'industrializing')
  assert.equal(getTierForScore(79).id, 'industrializing')
  assert.equal(getTierForScore(80).id, 'autonomous-ready')
  assert.equal(getTierForScore(100).id, 'autonomous-ready')
})

test('dimension scores sum to the total raw score', () => {
  const answers = {}
  for (const [i, q] of QUESTIONS.entries()) {
    // Mix of answers so this is not just the all-zero or all-max case.
    const pick = q.options[i % q.options.length]
    answers[q.id] = pick.id
  }
  const result = scoreReadiness(answers)
  const summed = result.dimensionScores.reduce((acc, d) => acc + d.raw, 0)
  assert.equal(summed, result.totalRaw)
  const summedMax = result.dimensionScores.reduce((acc, d) => acc + d.max, 0)
  assert.equal(summedMax, result.totalMax)
})

test('the named ceiling (with risk exposure) is always the lowest-scoring dimension', () => {
  // Force "governanceRisk" to be the clear lowest, everything else near-max.
  const answers = {}
  for (const q of QUESTIONS) {
    if (q.dimension === 'governanceRisk') {
      answers[q.id] = q.options.find((o) => o.points === 0).id
    } else {
      answers[q.id] = q.options.find((o) => o.points === 3).id
    }
  }
  const result = scoreReadiness(answers)
  assert.equal(result.ceiling.dimension, 'governanceRisk')
  assert.ok(result.ceiling.riskExposure && result.ceiling.riskExposure.length > 0, 'ceiling must carry a named risk-exposure callout')

  const governanceScore = result.dimensionScores.find((d) => d.dimension === 'governanceRisk')
  for (const d of result.dimensionScores) {
    assert.ok(d.pct >= governanceScore.pct, `${d.dimension} (${d.pct}%) should not score below the ceiling dimension`)
  }
})

test('every dimension has a ceiling with a non-empty risk-exposure callout and 3 actions', async () => {
  const { CEILINGS } = await import(pathToFileURL(resolve(ROOT, 'lib/ai-coe-readiness/engine.ts')).href)
  for (const dim of DIMENSIONS) {
    const ceiling = CEILINGS[dim.id]
    assert.ok(ceiling, `dimension "${dim.id}" has no ceiling copy`)
    assert.ok(ceiling.riskExposure.length > 0, `dimension "${dim.id}" ceiling has an empty riskExposure`)
    assert.equal(ceiling.actions.length, 3, `dimension "${dim.id}" ceiling should have exactly 3 actions`)
  }
})

test('an unanswered question contributes 0 points, not a crash', () => {
  const [first] = QUESTIONS
  const result = scoreReadiness({ [first.id]: 'not-a-real-option-id' })
  assert.equal(result.totalRaw, 0)
})
