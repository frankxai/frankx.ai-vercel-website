import { createClient } from '@vercel/kv'

import { redisRestConfig } from './redis-env'

// Auto-pipelining batches commands to `<url>/pipeline` and expects an array back.
// When Upstash refuses a database (rate-limited, over quota, suspended) it answers
// HTTP 200 with a single `{ error }` object, which the batching path reported only
// as "s.map is not a function". Sending one command per request lets the client
// raise Upstash's own message, so an outage names its cause.
export function createRedisClient() {
  return createClient({ ...redisRestConfig(), enableAutoPipelining: false })
}
