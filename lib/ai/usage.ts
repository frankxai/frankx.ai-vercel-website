/**
 * Freemium tier resolution + KV-backed daily usage counter for the Studio Crew chat.
 *
 * Tiers (best → worst):
 *   byok      — visitor brought their own Gemini key (client localStorage →
 *               x-studio-byok-key header). Unlimited. Resolved by the chat
 *               route from the header, NOT here — see withByok().
 *   pro       — signed-in + studio_pro flag set in KV.      Unlimited.
 *   signedIn  — signed in via NextAuth.                     STUDIO_SIGNEDIN_LIMIT/24h.
 *   anon      — anonymous IP.                                STUDIO_FREE_LIMIT/24h.
 */

import { kv } from '@vercel/kv'
import { getClientIdentifier } from '@/lib/ratelimit'
import { auth as authFn } from '@/lib/auth'

// KV is wired by Vercel in production. Locally KV_REST_API_URL is unset and
// every kv.* call throws — we detect that once and skip the metering instead
// of hard-blocking every chat request in dev/preview without KV.
const KV_AVAILABLE = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN)

// NextAuth v5 exports `auth` with multiple overloads; the route-handler overload
// returns Promise<Session | null>. The inferred type picks the middleware overload,
// so we wrap it once and type the result loosely.
type SessionLike = { user?: { id?: string; email?: string | null } | null } | null
const auth = authFn as unknown as () => Promise<SessionLike>

export type Tier = 'anon' | 'signedIn' | 'pro' | 'byok'

const FREE_LIMIT = Number(process.env.STUDIO_FREE_LIMIT || 10)
const SIGNEDIN_LIMIT = Number(process.env.STUDIO_SIGNEDIN_LIMIT || 50)
const ONE_DAY_SECONDS = 60 * 60 * 24

export interface TierContext {
  tier: Tier
  identifier: string
  userId: string | null
  email: string | null
}

export interface UsageStatus {
  tier: Tier
  used: number
  limit: number | null // null = unlimited
  remaining: number | null
  resetsAt: number // epoch ms (00:00 UTC tomorrow)
}

function dayKey(d = new Date()): string {
  return d.toISOString().slice(0, 10)
}

function endOfUtcDay(d = new Date()): number {
  const next = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() + 1))
  return next.getTime()
}

async function isPro(userId: string | null): Promise<boolean> {
  if (!userId || !KV_AVAILABLE) return false
  try {
    const v = await kv.get<string | number>(`studio_pro:${userId}`)
    return !!v
  } catch {
    return false
  }
}

/**
 * Resolve the caller's tier from request + session + KV state.
 * Does not consume any quota. BYOK is layered on top by the chat route
 * (withByok) once it reads the x-studio-byok-key header.
 */
export async function resolveTier(req: Request): Promise<TierContext> {
  const identifier = getClientIdentifier(req)
  let session: SessionLike = null
  try {
    session = await auth()
  } catch {
    session = null
  }
  const userId = session?.user?.id || session?.user?.email || null
  const email = session?.user?.email || null

  if (userId && (await isPro(userId))) {
    return { tier: 'pro', identifier, userId, email }
  }

  if (userId) return { tier: 'signedIn', identifier, userId, email }

  return { tier: 'anon', identifier, userId: null, email: null }
}

/**
 * Upgrade a resolved context to the unlimited BYOK tier when the visitor
 * supplied their own key. The key never touches the server's storage — it
 * arrives per-request in a header and is used transiently for the model call.
 */
export function withByok(ctx: TierContext, hasByokKey: boolean): TierContext {
  return hasByokKey ? { ...ctx, tier: 'byok' } : ctx
}

function counterKey(ctx: TierContext): string {
  const subject = ctx.userId || ctx.identifier || 'anonymous'
  return `studio:usage:${dayKey()}:${subject}`
}

function limitForTier(tier: Tier): number | null {
  if (tier === 'byok' || tier === 'pro') return null
  if (tier === 'signedIn') return SIGNEDIN_LIMIT
  return FREE_LIMIT
}

/**
 * Read current usage without incrementing.
 */
export async function getUsage(ctx: TierContext): Promise<UsageStatus> {
  const limit = limitForTier(ctx.tier)
  let used = 0
  if (KV_AVAILABLE) {
    try {
      const v = await kv.get<number>(counterKey(ctx))
      used = typeof v === 'number' ? v : 0
    } catch {
      used = 0
    }
  }
  return {
    tier: ctx.tier,
    used,
    limit,
    remaining: limit === null ? null : Math.max(0, limit - used),
    resetsAt: endOfUtcDay(),
  }
}

/**
 * Atomically increment and check. Returns { allowed, status }.
 * For unlimited tiers, allowed=true and used returns 0 (we still log a count for analytics).
 */
export async function consumeMessage(ctx: TierContext): Promise<{
  allowed: boolean
  status: UsageStatus
}> {
  const limit = limitForTier(ctx.tier)

  // No KV available (local dev, preview without KV addon) → don't meter at all.
  // Production Vercel deploys always have KV wired so this never bypasses real users.
  if (!KV_AVAILABLE) {
    return {
      allowed: true,
      status: {
        tier: ctx.tier,
        used: 0,
        limit,
        remaining: limit,
        resetsAt: endOfUtcDay(),
      },
    }
  }

  const key = counterKey(ctx)
  let used = 0
  try {
    used = await kv.incr(key)
    // Always (re)apply the TTL — `expire` is idempotent and cheap. The previous
    // `if (used === 1) expire(...)` gate would orphan a counter without TTL if
    // the very first request's expire call failed transiently, permanently
    // locking the visitor out of the daily reset.
    await kv.expire(key, ONE_DAY_SECONDS)
  } catch {
    // KV outage — fail open so a broken cache never silences the studio.
    return {
      allowed: true,
      status: {
        tier: ctx.tier,
        used: 0,
        limit,
        remaining: limit,
        resetsAt: endOfUtcDay(),
      },
    }
  }

  if (limit !== null && used > limit) {
    return {
      allowed: false,
      status: {
        tier: ctx.tier,
        used,
        limit,
        remaining: 0,
        resetsAt: endOfUtcDay(),
      },
    }
  }

  return {
    allowed: true,
    status: {
      tier: ctx.tier,
      used,
      limit,
      remaining: limit === null ? null : Math.max(0, limit - used),
      resetsAt: endOfUtcDay(),
    },
  }
}
