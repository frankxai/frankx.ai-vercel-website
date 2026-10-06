import { test } from 'node:test'
import assert from 'node:assert/strict'

import { redisRestConfig } from '../../lib/redis-env.ts'

test('uses the Upstash integration names when KV names are absent (production today)', () => {
  assert.deepEqual(
    redisRestConfig({ UPSTASH_REDIS_REST_URL: 'https://u.upstash.io', UPSTASH_REDIS_REST_TOKEN: 't' }),
    { url: 'https://u.upstash.io', token: 't' },
  )
})

test('prefers the KV names when both are set', () => {
  assert.deepEqual(
    redisRestConfig({
      KV_REST_API_URL: 'https://kv.upstash.io',
      KV_REST_API_TOKEN: 'k',
      UPSTASH_REDIS_REST_URL: 'https://u.upstash.io',
      UPSTASH_REDIS_REST_TOKEN: 't',
    }),
    { url: 'https://kv.upstash.io', token: 'k' },
  )
})

test('yields empty strings, not undefined, when nothing is configured', () => {
  assert.deepEqual(redisRestConfig({}), { url: '', token: '' })
})
