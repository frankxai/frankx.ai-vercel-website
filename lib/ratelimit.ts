import { Ratelimit } from '@upstash/ratelimit'

import { createLocalLimiter } from './local-ratelimit'
import { redisRestConfig } from './redis-env'
import { createRedisClient } from './redis-client'
import { describeStoreFailure } from './store-failure'

const redisConfig = redisRestConfig()
const kv = createRedisClient(redisConfig)
// An empty integration is not an outage. Skip the request that would throw and count locally.
const sharedLimiterReady = Boolean(redisConfig.url && redisConfig.token)

// Falls back to a per-instance window when Redis is unreachable, so an outage of
// the shared store weakens protection instead of refusing every request.
function resilient(remote: Ratelimit, max: number, windowMs: number) {
  const allowLocally = createLocalLimiter(max, windowMs)
  return {
    async limit(key: string): Promise<{ success: boolean }> {
      if (!sharedLimiterReady) return { success: allowLocally(key) }
      try {
        return await remote.limit(key)
      } catch (error) {
        console.error('Shared rate limiter unavailable; using the per-instance fallback:', describeStoreFailure(error, 'ratelimit'))
        return { success: allowLocally(key) }
      }
    },
  }
}

/**
 * Rate Limiting Configuration
 *
 * Protects API endpoints from abuse using sliding window algorithm.
 * Configured for Vercel KV (Redis-compatible).
 *
 * Limits:
 * - Email sending: 5 requests per 10 minutes per IP
 * - Analytics tracking: 100 requests per minute per IP
 * - Lead creation: 10 requests per hour per IP
 */

// Email sending rate limit - Strict to prevent spam
export const emailRatelimit = resilient(new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(5, '10 m'),
  analytics: true,
  prefix: 'ratelimit:email'
}), 5, 10 * 60_000)

// QR rendering rate limit - keeps uncached raster requests bounded
export const qrRatelimit = resilient(new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(60, '1 m'),
  analytics: true,
  prefix: 'ratelimit:qr'
}), 60, 60_000)

// Analytics tracking rate limit - Generous for normal usage
export const analyticsRatelimit = resilient(new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(100, '1 m'),
  analytics: true,
  prefix: 'ratelimit:analytics'
}), 100, 60_000)

// Book download counting is optional. Keep network identifiers out of the
// long-lived Upstash analytics dashboard, and skip counting if Redis fails.
export const bookDownloadRatelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(100, '1 m'),
  analytics: false,
  prefix: 'ratelimit:book-download'
})

// Lead creation rate limit - Moderate to prevent abuse
export const leadRatelimit = resilient(new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(10, '1 h'),
  analytics: true,
  prefix: 'ratelimit:leads'
}), 10, 60 * 60_000)

// Public read-only MCP. One agent turn is initialize, tools/list, and a few
// tool calls. 30 requests per minute per IP allows that turn and rejects a scrape.
export const mcpRatelimit = resilient(new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(30, '1 m'),
  analytics: true,
  prefix: 'ratelimit:mcp'
}), 30, 60_000)

/**
 * Get client identifier from request
 * Uses IP address for rate limiting
 */
export function getClientIdentifier(request: Request): string {
  // Try to get real IP from headers (Vercel forwards real IP)
  const forwardedFor = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')

  return forwardedFor?.split(',')[0] || realIp || 'anonymous'
}
