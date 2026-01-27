import { Ratelimit } from '@upstash/ratelimit'
import { kv } from '@vercel/kv'

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
export const emailRatelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(5, '10 m'),
  analytics: true,
  prefix: 'ratelimit:email'
})

// Analytics tracking rate limit - Generous for normal usage
export const analyticsRatelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(100, '1 m'),
  analytics: true,
  prefix: 'ratelimit:analytics'
})

// Lead creation rate limit - Moderate to prevent abuse
export const leadRatelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(10, '1 h'),
  analytics: true,
  prefix: 'ratelimit:leads'
})

// BYOK API rate limit - Protects against abuse of user-provided API keys
// 20 requests per minute per IP (enough for normal chat, prevents runaway costs)
export const byokRatelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(20, '1 m'),
  analytics: true,
  prefix: 'ratelimit:byok'
})

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
