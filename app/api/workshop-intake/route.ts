import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Workshop intake — MVP.
 *
 * Per the Workshop OS spec (docs/superpowers/specs/2026-04-22-workshop-os-design.md),
 * the MVP writes nothing to Notion and sends no email yet. Submissions are logged
 * to stdout; Frank consumes them from the Vercel runtime logs and mirrors the
 * intake into data/crm/*.json manually via the /crm-log skill.
 *
 * Tier 4 will wire this route to:
 *   - data/crm/linkedin-profiles.json (staging)
 *   - Resend notification to Frank
 *   - optional Notion sync
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
    // zod v4 uses `error` (string | function) in place of v3's `errorMap`.
    error: () => 'Consent is required to submit this form.',
  }),
})

export type IntakePayload = z.infer<typeof IntakeSchema>

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

    // MVP: stdout log only. Vercel runtime logs are the source of truth until
    // the Notion sync lands in Tier 4.
    const logRecord = {
      type: 'workshop-intake',
      received_at: new Date().toISOString(),
      referrer: request.headers.get('referer') ?? null,
      user_agent: request.headers.get('user-agent') ?? null,
      ip_hint: request.headers.get('x-forwarded-for') ?? null,
      data: payload,
    }
    console.log('[workshop-intake]', JSON.stringify(logRecord))

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
