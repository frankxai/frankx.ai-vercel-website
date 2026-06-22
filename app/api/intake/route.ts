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
 *       JSONL · Slack) → honest response.
 * GET:  operator endpoint for /admin/intake (auth-gated by ADMIN_TOKEN).
 */
export async function POST(request: NextRequest) {
  try {
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
      ipHint: request.headers.get('x-forwarded-for'),
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
  const adminToken = process.env.ADMIN_TOKEN
  const requestToken =
    request.nextUrl.searchParams.get('token') ||
    request.cookies.get('admin-token')?.value

  if (adminToken && requestToken !== adminToken) {
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
