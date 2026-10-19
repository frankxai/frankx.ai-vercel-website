import { test } from 'node:test'
import assert from 'node:assert/strict'

import { createLocalLimiter } from '../../lib/local-ratelimit.ts'

test('allows up to the limit inside the window, then refuses', () => {
  let t = 0
  const allow = createLocalLimiter(3, 1000, () => t)
  assert.deepEqual([allow('ip'), allow('ip'), allow('ip'), allow('ip')], [true, true, true, false])
})

test('frees capacity once earlier hits leave the window', () => {
  let t = 0
  const allow = createLocalLimiter(2, 1000, () => t)
  allow('ip')
  allow('ip')
  assert.equal(allow('ip'), false)
  t = 1001
  assert.equal(allow('ip'), true)
})

test('counts keys independently', () => {
  const allow = createLocalLimiter(1, 1000, () => 0)
  assert.equal(allow('a'), true)
  assert.equal(allow('b'), true)
  assert.equal(allow('a'), false)
})
