import type { NextRequest } from 'next/server'

/**
 * Shared in-memory rate limiter.
 *
 * Token-bucket per (scope, key). One Map per scope so /api/intake and
 * /api/private-access don't compete for cap space. Per-Vercel-instance, so
 * effective limit is N × instances under load — still meaningful against
 * simple abuse loops. For production-grade limiting across all instances,
 * swap for Vercel KV + Upstash rate-limiter, or enable Vercel WAF.
 *
 * The cap is a HARD cap on Map size, enforced via insertion-order LRU
 * eviction (Map preserves insertion order). When a burst of unique keys
 * inside the window would push the map past `cap`, the oldest entries are
 * evicted — even if they're not expired — so the limiter itself can't grow
 * into an unbounded in-memory structure under distributed abuse.
 */

interface Bucket {
  count: number
  reset: number
}

interface ScopeConfig {
  windowMs: number
  max: number
  cap: number
}

const SCOPES = {
  // /api/intake — public contact form
  intake: { windowMs: 60_000, max: 5, cap: 1024 },
  // /api/private-access — passcode guesses
  'private-access': { windowMs: 60_000, max: 5, cap: 1024 },
} satisfies Record<string, ScopeConfig>

const stores = new Map<string, Map<string, Bucket>>()

function storeFor(scope: string): Map<string, Bucket> {
  let s = stores.get(scope)
  if (!s) {
    s = new Map<string, Bucket>()
    stores.set(scope, s)
  }
  return s
}

/**
 * Derives a bucketing key from the request. `x-forwarded-for` can be
 * comma-separated (proxy chain); we take the leftmost (the originating client
 * per the RFC). Spoofable behind hostile proxies; good enough for abuse-
 * prevention bucketing.
 */
export function clientKey(request: NextRequest): string {
  const xff = request.headers.get('x-forwarded-for') || ''
  return xff.split(',')[0]?.trim() || 'unknown'
}

export function rateLimited(scope: keyof typeof SCOPES, key: string): boolean {
  const cfg = SCOPES[scope]
  const store = storeFor(scope)
  const now = Date.now()

  // Check the caller's own bucket FIRST, before any cap eviction runs. If
  // eviction ran first, a client whose bucket happens to be the oldest
  // insertion could have their own in-window counter reset right before we
  // read it — silently weakening the throttle for exactly the traffic
  // pattern (many requests from one key) the limiter exists to catch.
  const existing = store.get(key)
  if (existing && existing.reset >= now) {
    if (existing.count >= cfg.max) return true
    existing.count++
    return false
  }

  // Step 1 — drop expired entries any time we're at/over cap. This is cheap
  // (only runs at the boundary) and reclaims most of the space in practice.
  if (store.size >= cfg.cap) {
    for (const [k, v] of store) if (v.reset < now) store.delete(k)
  }

  // Step 2 — hard cap. If still at the cap after expired eviction, evict
  // the oldest insertion (Map iteration order = insertion order) until under.
  // Without this, a burst of unique keys inside the window grows the map
  // unboundedly. `key` itself was already excluded above if it had a live
  // bucket, so this only ever evicts other entries.
  while (store.size >= cfg.cap) {
    const oldest = store.keys().next().value
    if (oldest === undefined) break
    store.delete(oldest)
  }

  store.set(key, { count: 1, reset: now + cfg.windowMs })
  return false
}

/**
 * Test hook — only used by unit tests. Don't call from app code.
 * @internal
 */
export function __resetRateLimiterForTests(): void {
  stores.clear()
}
