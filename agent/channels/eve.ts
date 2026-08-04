import { eveChannel } from 'eve/channels/eve'
import { ForbiddenError, localDev, none, type AuthFn, vercelOidc } from 'eve/channels/auth'

const WINDOW_MS = 60_000
const MAX_REQUESTS = 30
const MAX_BUCKETS = 2_048
const buckets = new Map<string, { count: number; resetAt: number }>()
const anonymous = none<Request>()

function requesterKey(request: Request): string {
  return (
    request.headers.get('x-vercel-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'anonymous'
  )
}

const publicWithBurstLimit: AuthFn<Request> = async (request) => {
  const now = Date.now()
  const key = requesterKey(request)
  const current = buckets.get(key)

  if (current && current.resetAt > now) {
    if (current.count >= MAX_REQUESTS) {
      throw new ForbiddenError({
        code: 'public_agent_rate_limit',
        message: 'Too many agent requests. Wait a minute, then continue.',
      })
    }
    current.count += 1
  } else {
    if (buckets.size >= MAX_BUCKETS) {
      for (const [bucketKey, bucket] of buckets) {
        if (bucket.resetAt <= now) buckets.delete(bucketKey)
      }
      while (buckets.size >= MAX_BUCKETS) {
        const oldest = buckets.keys().next().value
        if (oldest === undefined) break
        buckets.delete(oldest)
      }
    }
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS })
  }

  return anonymous(request)
}

export default eveChannel({
  auth: [vercelOidc(), localDev(), publicWithBurstLimit],
  uploadPolicy: 'disabled',
})
