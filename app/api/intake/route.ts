import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'node:fs'

import {
  IntakeSchema,
  processIntake,
  getLogPath,
  type IntakeLogEntry,
} from '@/lib/contact-intake'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Unified intake endpoint — the single front door.
 *
 * POST: validate → run the five-stage pipeline (notify · auto-ack · Notion ·
 *       JSONL · Slack) → honest response. Rate-limited per IP.
 * GET:  operator endpoint for /admin/intake. Fail-closed: if ADMIN_TOKEN is
 *       not configured server-side, every request is denied.
 */

// ── Rate limit ──────────────────────────────────────────────────────────────
// In-memory token bucket per IP. Per-Vercel-instance, so the effective limit
// is N × instances under load; still meaningful against simple abuse loops.
// For production-grade limiting across all instances, swap for Vercel KV +
// Upstash rate-limiter, or enable Vercel WAF rate-limiting on the route.
const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX = 5
const RATE_LIMIT_BUCKET_CAP = 1024
const rateBuckets = new Map<string, { count: number; reset: number }>()

function clientKey(request: NextRequest): string {
  // x-forwarded-for can be comma-separated (proxy chain); take the leftmost
  // (the originating client per the RFC). Spoofable behind hostile proxies;
  // good enough for abuse-prevention bucketing.
  const xff = request.headers.get('x-forwarded-for') || ''
  return xff.split(',')[0]?.trim() || 'unknown'
}

function rateLimited(key: string): boolean {
  const now = Date.now()
  if (rateBuckets.size > RATE_LIMIT_BUCKET_CAP) {
    // Prevent unbounded growth: evict expired entries on overflow.
    for (const [k, v] of rateBuckets) if (v.reset < now) rateBuckets.delete(k)
  }
  const bucket = rateBuckets.get(key)
  if (!bucket || bucket.reset < now) {
    rateBuckets.set(key, { count: 1, reset: now + RATE_LIMIT_WINDOW_MS })
    return false
  }
  if (bucket.count >= RATE_LIMIT_MAX) return true
  bucket.count++
  return false
}

export async function POST(request: NextRequest) {
  try {
    if (rateLimited(clientKey(request))) {
      return NextResponse.json(
        { ok: false, error: 'Too many requests. Please try again shortly.' },
        { status: 429, headers: { 'Retry-After': '60' } },
      )
    }

    const body = await request.json().catch(() => null)
    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { ok: false, error: 'Invalid request.' },
        { status: 400 },
      )
    }

    const parsed = IntakeSchema.safeParse(body)
    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0]
      return NextResponse.json(
        {
          ok: false,
          error: firstIssue?.message ?? 'Validation failed.',
          issues: parsed.error.issues.map((i) => ({
            path: i.path.join('.'),
            message: i.message,
          })),
        },
        { status: 400 },
      )
    }

    // Honeypot tripped — pretend success, drop silently.
    if (parsed.data.website) {
      return NextResponse.json({ ok: true, message: 'Thanks.' }, { status: 200 })
    }

    const result = await processIntake(parsed.data, {
      referrer: request.headers.get('referer'),
      userAgent: request.headers.get('user-agent'),
    })

    if (!result.ok) {
      return NextResponse.json(
        {
          ok: false,
          error:
            'We hit a delivery hiccup. Please try again or email frank@frankx.ai directly.',
        },
        { status: 500 },
      )
    }

    return NextResponse.json(
      { ok: true, message: "Got it — you'll hear back within 1–2 working days." },
      { status: 200 },
    )
  } catch (err) {
    console.error('[intake] unexpected error', err)
    return NextResponse.json(
      { ok: false, error: 'An unexpected error occurred. Please try again.' },
      { status: 500 },
    )
  }
}

export async function GET(request: NextRequest) {
  // Deny-by-default: if ADMIN_TOKEN is unset, no one reads PII.
  const adminToken = process.env.ADMIN_TOKEN
  const requestToken =
    request.nextUrl.searchParams.get('token') ||
    request.cookies.get('admin-token')?.value

  if (!adminToken || requestToken !== adminToken) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const content = await fs.readFile(getLogPath(), 'utf8')
    const entries = content
      .trim()
      .split('\n')
      .filter(Boolean)
      .map((line) => {
        try {
          return JSON.parse(line) as IntakeLogEntry
        } catch {
          return null
        }
      })
      .filter((e): e is IntakeLogEntry => e !== null)
      .reverse()
      .slice(0, 200)
    return NextResponse.json({ ok: true, count: entries.length, entries })
  } catch {
    return NextResponse.json({ ok: true, count: 0, entries: [] })
  }
}
