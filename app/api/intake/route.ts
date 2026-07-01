import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'node:fs'

import {
  IntakeSchema,
  processIntake,
  getLogPath,
  type IntakeLogEntry,
} from '@/lib/contact-intake'
import { clientKey, rateLimited } from '@/lib/rate-limit'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Unified intake endpoint — the single front door.
 *
 * POST: validate → run the five-stage pipeline (notify · auto-ack · Notion ·
 *       JSONL · Slack) → honest response. Rate-limited per IP via lib/rate-limit.
 * GET:  operator endpoint for /admin/intake. Fail-closed: if ADMIN_TOKEN is
 *       not configured server-side, every request is denied.
 */

export async function POST(request: NextRequest) {
  try {
    if (rateLimited('intake', clientKey(request))) {
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
  //
  // Secret comes from the HttpOnly `admin-token` cookie or the
  // `Authorization: Bearer <token>` header. Never from a query param —
  // that puts the secret into browser history, copied URLs, access
  // logs, and `Referer` propagation. PII handler == cookie/header only.
  const adminToken = process.env.ADMIN_TOKEN
  const bearer = request.headers.get('authorization')?.match(/^Bearer\s+(.+)$/i)?.[1]
  const requestToken = bearer || request.cookies.get('admin-token')?.value

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
