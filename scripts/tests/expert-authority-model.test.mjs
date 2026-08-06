import assert from 'node:assert/strict'
import test from 'node:test'

import {
  deriveExpertAuthorityResult,
  expertAuthorityEngineKeys,
  isExpertAuthorityAnswers,
} from '../../lib/expert-authority-intelligence.ts'

function answersForScore(total) {
  let remaining = total
  const answers = Object.fromEntries(
    expertAuthorityEngineKeys.map((key) => {
      const value = Math.min(4, remaining)
      remaining -= value
      return [key, value]
    }),
  )

  assert.equal(remaining, 0)
  return answers
}

test('stage boundaries are derived from the answer vector', () => {
  for (const [score, expected] of [
    [0, 'Hidden Expert'],
    [5, 'Hidden Expert'],
    [6, 'Emerging Authority'],
    [10, 'Emerging Authority'],
    [11, 'Market Machine'],
    [15, 'Market Machine'],
    [16, 'Intelligence Operator'],
    [20, 'Intelligence Operator'],
  ]) {
    const result = deriveExpertAuthorityResult(answersForScore(score))
    assert.equal(result.score, score)
    assert.equal(result.stage, expected)
  }
})

test('a weakest-engine tie resolves to the earliest upstream engine', () => {
  const result = deriveExpertAuthorityResult({
    expert: 3,
    audience: 1,
    authority: 1,
    product: 2,
    funnel: 4,
  })

  assert.equal(result.weakestEngine, 'Audience Intelligence')
})

test('answer validation rejects malformed or out-of-range vectors', () => {
  assert.equal(isExpertAuthorityAnswers({ expert: 0 }), false)
  assert.equal(
    isExpertAuthorityAnswers({ expert: 0, audience: 1, authority: 2, product: 3, funnel: 5 }),
    false,
  )
  assert.equal(
    isExpertAuthorityAnswers({ expert: 0, audience: 1, authority: 2, product: 3, funnel: 4 }),
    true,
  )
})
