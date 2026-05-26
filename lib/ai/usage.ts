/**
 * Freemium tier resolution + KV-backed daily usage counter for the Studio Crew chat.
 *
 * Tiers (best → worst):
 *   byok      — visitor pasted their own Gemini key.        Unlimited.
 *   pro       — signed-in + studio_pro flag set in KV.      Unlimited.
 *   signedIn  — signed in via NextAuth.                     STUDIO_SIGNEDIN_LIMIT/24h.
 *   anon      — anonymous IP.                                STUDIO_FREE_LIMIT/24h.
 */

import { kv } from '@vercel/kv'
import { getClientIdentifier } from '@/lib/ratelimit'
import { auth as authFn } from '@/lib/auth'
import { loadByokKey } from '@/lib/ai/byok'

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
  /** Decrypted BYOK key when tier === 'byok'; null for all other tiers. */
  byokKey: string | null
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
 * Resolve the caller's tier from request + session + KV state, AND decrypt the
 * BYOK key when present. The decrypted key (or null) is returned in the
 * context so the chat route never has to re-fetch it — eliminating the
 * window where `tier === 'byok'` but the key is unusable (which previously
 * caused a silent fallback to the owner's GOOGLE_GENERATIVE_AI_API_KEY).
 *
 * Does not consume any quota.
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

  // BYOK promotion ONLY when we can actually decrypt the stored key.
  // loadByokKey itself refuses to read when the caller is unidentifiable
  // (no userId AND no real IP — see byok.ts:canStoreByok).
  const byokKey = await loadByokKey(userId, identifier)
  if (byokKey) {
    return { tier: 'byok', identifier, userId, email, byokKey }
  }

  if (userId && (await isPro(userId))) {
    return { tier: 'pro', identifier, userId, email, byokKey: null }
  }

  if (userId) return { tier: 'signedIn', identifier, userId, email, byokKey: null }

  return { tier: 'anon', identifier, userId: null, email: null, byokKey: null }
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
