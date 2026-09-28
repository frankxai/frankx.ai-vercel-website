import { Ratelimit } from '@upstash/ratelimit'
import { createClient } from '@vercel/kv'

import { createLocalLimiter } from './local-ratelimit'
import { redisRestConfig } from './redis-env'

const kv = createClient(redisRestConfig())

// Falls back to a per-instance window when Redis is unreachable, so an outage of
// the shared store weakens protection instead of refusing every request.
function resilient(remote: Ratelimit, max: number, windowMs: number) {
  const allowLocally = createLocalLimiter(max, windowMs)
  return {
    async limit(key: string): Promise<{ success: boolean }> {
      try {
        return await remote.limit(key)
      } catch (error) {
        console.error('Shared rate limiter unavailable; using the per-instance fallback:', error)
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

// Lead creation rate limit - Moderate to prevent abuse
export const leadRatelimit = resilient(new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(10, '1 h'),
  analytics: true,
  prefix: 'ratelimit:leads'
}), 10, 60 * 60_000)

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
