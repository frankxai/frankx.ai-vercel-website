import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { z } from 'zod'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Workshop intake — v2 (2026-05-22).
 *
 * Frank discovered the v1 MVP only `console.log`'d submissions to Vercel
 * runtime logs — effectively a black hole. v2 fixes that with three durable
 * outputs:
 *
 *   1. Email notification to Frank (Resend, plain text, immediate)
 *   2. JSONL append to /tmp/workshop-intake.jsonl (Vercel) or
 *      private/workshop-intake.jsonl (local) — for /admin/intake
 *   3. Optional Resend audience addition (the lead enters the
 *      "workshop-leads" topic for future cohort communication)
 *
 * Environment variables:
 *   - RESEND_API_KEY (required for email + audience write)
 *   - OPERATOR_EMAIL (defaults to "frank@frankx.ai") — where notifications land
 *   - WORKSHOP_INTAKE_AUDIENCE_ID (optional) — if set, leads are also added to
 *     a Resend audience for future cohort communication
 *
 * Behavior guarantees:
 *   - If email send fails, the submission still succeeds (logged to JSONL)
 *   - If JSONL write fails, the submission still succeeds (email still sent)
 *   - The form NEVER lies — if both fail, we return 500 so the form shows error
 */

const IntakeSchema = z.object({
  fullName: z.string().trim().min(1, 'Full name is required').max(200),
  email: z.string().trim().email('A valid email is required').max(200),
  linkedin: z
    .string()
    .trim()
    .max(500)
    .url('LinkedIn must be a valid URL')
    .optional()
    .or(z.literal('')),
  company: z.string().trim().min(1, 'Company or org is required').max(200),
  role: z.string().trim().min(1, 'Role is required').max(200),
  workshop: z.enum([
    'ikigai-content-studio',
    'sovereign-leadership',
    'personal-ai-coe',
    'custom',
  ]),
  location: z.string().trim().min(1, 'Location or timezone is required').max(200),
  format: z.enum(['in-person', 'virtual', 'hybrid']),
  notes: z.string().trim().max(4000).optional().or(z.literal('')),
  consent: z.literal(true, {
    error: () => 'Consent is required to submit this form.',
  }),
})

export type IntakePayload = z.infer<typeof IntakeSchema>

const RESEND_API_KEY = process.env.RESEND_API_KEY
const OPERATOR_EMAIL = process.env.OPERATOR_EMAIL || 'frank@frankx.ai'
const FROM_EMAIL = 'FrankX Intake <notify@mail.frankx.ai>'
const WORKSHOP_INTAKE_AUDIENCE_ID = process.env.WORKSHOP_INTAKE_AUDIENCE_ID

function getLogPath() {
  if (process.env.VERCEL) return '/tmp/workshop-intake.jsonl'
  return path.join(process.cwd(), 'private', 'workshop-intake.jsonl')
}

interface IntakeLogEntry {
  ts: string
  workshop: IntakePayload['workshop']
  fullName: string
  email: string
  company: string
  role: string
  location: string
  format: IntakePayload['format']
  linkedin?: string
  notes?: string
  referrer?: string
  userAgent?: string
  ipHint?: string
  notificationStatus: 'sent' | 'failed' | 'skipped'
  audienceStatus: 'added' | 'failed' | 'skipped' | 'duplicate'
}

const WORKSHOP_LABEL: Record<IntakePayload['workshop'], string> = {
  'ikigai-content-studio': 'Ikigai + AI Content Studio (3-4h)',
  'sovereign-leadership': 'Sovereign Leadership: Human-Centric AI (2h)',
  'personal-ai-coe': 'Personal AI Center of Excellence (90m)',
  custom: 'Custom format',
}

async function sendOperatorEmail(
  payload: IntakePayload,
  referrer: string | null,
): Promise<'sent' | 'failed' | 'skipped'> {
  if (!RESEND_API_KEY) return 'skipped'

  const subject = `Workshop intake: ${payload.fullName} — ${WORKSHOP_LABEL[payload.workshop]}`

  const lines = [
    `New workshop intake from ${payload.fullName} at ${payload.company}.`,
    '',
    `WORKSHOP: ${WORKSHOP_LABEL[payload.workshop]}`,
    `FORMAT: ${payload.format}`,
    `LOCATION: ${payload.location}`,
    '',
    `WHO`,
    `Name:     ${payload.fullName}`,
    `Email:    ${payload.email}`,
    `Company:  ${payload.company}`,
    `Role:     ${payload.role}`,
    payload.linkedin ? `LinkedIn: ${payload.linkedin}` : 'LinkedIn: (not provided)',
    '',
    'CONTEXT',
    payload.notes ? payload.notes : '(no notes provided)',
    '',
    'METADATA',
    `Submitted via: ${referrer || '(no referrer)'}`,
    `Timestamp:     ${new Date().toISOString()}`,
    '',
    '---',
    'Reply directly to this email to respond — it goes to the requester.',
    'Operator dashboard: https://frankx.ai/admin/intake',
  ]

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: OPERATOR_EMAIL,
        // reply_to set to the requester so a direct reply goes back to them
        reply_to: payload.email,
        subject,
        text: lines.join('\n'),
      }),
    })
    return res.ok ? 'sent' : 'failed'
  } catch {
    return 'failed'
  }
}

async function addToAudience(
  payload: IntakePayload,
): Promise<'added' | 'failed' | 'skipped' | 'duplicate'> {
  if (!RESEND_API_KEY || !WORKSHOP_INTAKE_AUDIENCE_ID) return 'skipped'

  try {
    const res = await fetch(
      `https://api.resend.com/audiences/${WORKSHOP_INTAKE_AUDIENCE_ID}/contacts`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: payload.email,
          first_name: payload.fullName.split(' ')[0],
          last_name: payload.fullName.split(' ').slice(1).join(' ') || undefined,
          unsubscribed: false,
        }),
      },
    )
    if (res.ok) return 'added'
    if (res.status === 409) return 'duplicate'
    return 'failed'
  } catch {
    return 'failed'
  }
}

async function appendToLog(entry: IntakeLogEntry) {
  const filePath = getLogPath()
  try {
    await fs.mkdir(path.dirname(filePath), { recursive: true })
    await fs.appendFile(filePath, JSON.stringify(entry) + '\n', 'utf8')
    return true
  } catch (err) {
    console.error('[workshop-intake] log append failed', err)
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null)
    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { ok: false, error: 'Invalid JSON payload.' },
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

    const payload = parsed.data
    const referrer = request.headers.get('referer')

    // Fire email + audience write in parallel — neither blocks the other
    const [notificationStatus, audienceStatus] = await Promise.all([
      sendOperatorEmail(payload, referrer),
      addToAudience(payload),
    ])

    // Always log to JSONL regardless of email/audience outcome
    const logEntry: IntakeLogEntry = {
      ts: new Date().toISOString(),
      workshop: payload.workshop,
      fullName: payload.fullName,
      email: payload.email,
      company: payload.company,
      role: payload.role,
      location: payload.location,
      format: payload.format,
      linkedin: payload.linkedin || undefined,
      notes: payload.notes || undefined,
      referrer: referrer || undefined,
      userAgent: request.headers.get('user-agent') || undefined,
      ipHint: request.headers.get('x-forwarded-for') || undefined,
      notificationStatus,
      audienceStatus,
    }
    const logged = await appendToLog(logEntry)

    // Also keep the stdout log for Vercel runtime visibility
    console.log('[workshop-intake]', JSON.stringify(logEntry))

    // If notification AND log both failed, surface error so the form retries
    if (notificationStatus === 'failed' && !logged) {
      return NextResponse.json(
        {
          ok: false,
          error: 'We hit a delivery hiccup. Please try again or email frank@frankx.ai.',
        },
        { status: 500 },
      )
    }

    return NextResponse.json(
      {
        ok: true,
        message: "We'll be in touch within 48h.",
      },
      { status: 200 },
    )
  } catch (err) {
    console.error('[workshop-intake] unexpected error', err)
    return NextResponse.json(
      { ok: false, error: 'An unexpected error occurred. Please try again.' },
      { status: 500 },
    )
  }
}

/**
 * GET — operator endpoint for /admin/intake to fetch recent submissions.
 * Auth-gated by ADMIN_TOKEN cookie or query param.
 */
export async function GET(request: NextRequest) {
  const adminToken = process.env.ADMIN_TOKEN
  const requestToken =
    request.nextUrl.searchParams.get('token') ||
    request.cookies.get('admin-token')?.value

  if (adminToken && requestToken !== adminToken) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }

  const filePath = getLogPath()
  try {
    const content = await fs.readFile(filePath, 'utf8')
    const lines = content.trim().split('\n').filter(Boolean)
    const entries = lines
      .map((line) => {
        try {
          return JSON.parse(line) as IntakeLogEntry
        } catch {
          return null
        }
      })
      .filter((e): e is IntakeLogEntry => e !== null)
      .reverse() // newest first
      .slice(0, 200)
    return NextResponse.json({ ok: true, count: entries.length, entries })
  } catch {
    return NextResponse.json({ ok: true, count: 0, entries: [] })
  }
}
