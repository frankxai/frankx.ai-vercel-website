import test from 'node:test'
import assert from 'node:assert/strict'
import { describeStoreFailure } from '../../lib/store-failure.ts'

test('classifies a refusal without returning any arbitrary provider text', () => {
  const error = new Error('Rate limited for Ada Visitor, token short-secret, email ada@example.invalid, command was: ["rpush", "private-lead"]')
  error.name = 'UpstashError'
  assert.deepEqual(describeStoreFailure(error, 'store'), {
    stage: 'store', cause: 'UpstashError', kind: 'store-refused',
    detail: 'The analytics store refused the request.',
  })
})

test('never reflects credentials, names, hostnames, commands or arbitrary error names', () => {
  for (const name of ['Error', 'Ada Visitor short-secret', 'UpstashError']) {
    const error = new Error('https://redis.example.invalid Bearer abc Ada Visitor ada@example.invalid COMMAND WAS ["GET", "private-lead"]')
    error.name = name
    const output = JSON.stringify(describeStoreFailure(error, 'read'))
    assert.doesNotMatch(output, /Ada|Visitor|short-secret|example|Bearer|abc|COMMAND|private-lead/)
  }
})

test('network diagnostics accept only known codes', () => {
  const network = new TypeError('fetch failed', { cause: { code: 'ENOTFOUND' } })
  assert.equal(describeStoreFailure(network, 'read').kind, 'network:ENOTFOUND')
  const arbitrary = new Error('failed', { cause: { code: 'PRIVATE_PERSON' } })
  assert.equal(describeStoreFailure(arbitrary, 'read').kind, 'other')
})

test('non-Error throws receive a fixed safe response', () => {
  assert.deepEqual(describeStoreFailure({ email: 'ada@example.invalid' }, 'request'), {
    stage: 'request', cause: 'unknown', kind: 'other',
    detail: 'The request could not be completed.',
  })
})
