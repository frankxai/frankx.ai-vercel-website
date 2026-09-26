import { test } from 'node:test'
import assert from 'node:assert/strict'

import { describeStoreFailure } from '../../lib/store-failure.ts'

function upstashError(message) {
  const error = new Error(message)
  error.name = 'UpstashError'
  return error
}

test('names a database Upstash refuses (production on 2026-09-26)', () => {
  const failure = describeStoreFailure(
    upstashError('Your database has been temporarily rate-limited, please contact support@upstash.com for further details.'),
    'store',
  )
  assert.equal(failure.stage, 'store')
  assert.equal(failure.cause, 'UpstashError')
  assert.equal(failure.kind, 'store-refused')
  assert.match(failure.detail, /^Your database has been temporarily rate-limited/)
})

test('drops the echoed command, which carries the visitor data', () => {
  const failure = describeStoreFailure(
    upstashError('WRONGPASS invalid token, command was: ["rpush","pdf-analytics:leads",{"email":"a@b.co"}]'),
    'store',
  )
  assert.equal(failure.detail, 'WRONGPASS invalid token')
})

test('redacts hosts, URLs and token-shaped strings', () => {
  const failure = describeStoreFailure(
    new Error('fetch to https://x-1.upstash.io/pipeline failed for x-1.upstash.io with AbCdEfGhIjKlMnOpQrStUvWx'),
    'store',
  )
  assert.doesNotMatch(failure.detail, /upstash\.io|AbCdEfGhIjKlMnOpQrStUvWx/)
})

test('classifies network failures by their code', () => {
  const error = new TypeError('fetch failed', { cause: { code: 'ENOTFOUND' } })
  assert.equal(describeStoreFailure(error, 'store').kind, 'network:ENOTFOUND')
})

test('tolerates non-Error throws', () => {
  assert.deepEqual(describeStoreFailure('boom', 'read'), { stage: 'read', cause: 'unknown', kind: 'other', detail: '' })
})
