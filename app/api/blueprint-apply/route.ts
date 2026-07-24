import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { z } from 'zod'
import { leadRatelimit, getClientIdentifier } from '@/lib/ratelimit'

export const dynamic = 'force-dynamic'

/**
 * Starlight Intelligence Blueprint application intake (/agentic-company).
 *
 * Combines the two most recent intake patterns in this repo:
 *   - app/api/workshop-intake — Zod validation, JSONL backstop, parallel
 *     email + audience writes, honest failure handling.
 *   - app/api/foundry/apply — rate limiting (fail-open) + honeypot.
 */

const REVENUE_BANDS = [
  'Under €500k',
  '€500k – €1m',
  '€1m – €2.5m',
  '€2.5m – €5m',
  '€5m – €10m',
  '€10m+',
] as const

const BlueprintApplicationSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your full name.').max(200),
  email: z.string().trim().email('Please enter a valid email address.').max(200),
  company: z.string().trim().min(1, 'Company name is required.').max(200),
  website: z.string().trim().max(300).optional().or(z.literal('')),
  revenueBand: z.enum(REVENUE_BANDS, {
    error: () => 'Please select a revenue band.',
  }),
  blocker: z
    .string()
    .trim()
    .min(20, 'Please describe where work currently waits on you (a few sentences).')
    .max(4000),
  // Honeypot — real applicants never see or fill this field (see form: visually
  // hidden + aria-hidden). Bots that autofill it get a quiet fake-success.
  phone: z.string().trim().max(200).optional().or(z.literal('')),
})

export type BlueprintApplication = z.infer<typeof BlueprintApplicationSchema>

const RESEND_API_KEY = process.env.RESEND_API_KEY
// Canonical Resend audience — same list used by /api/newsletter, /api/coaching-apply,
// and /api/foundry/apply. frank@mail.frankx.ai is the Resend SEND-ONLY subdomain and
// does not receive mail — notifications must land at OPERATOR_EMAIL (default the
// IONOS-hosted root inbox), never at the send-only FROM address. See app/api/coaching-apply.
const AUDIENCE_ID = '4d2e913e-6903-4dd4-8749-c02cdb844331'
const FROM_EMAIL = 'Frank <frank@mail.frankx.ai>'
const NOTIFY_EMAIL = process.env.OPERATOR_EMAIL || 'frank@frankx.ai'

function logPath() {
  if (process.env.VERCEL) return '/tmp/blueprint-applications.jsonl'
  return path.join(process.cwd(), 'private', 'blueprint-applications.jsonl')
}

interface LogEntry {
  ts: string
  name: string
  email: string
  company: string
  website?: string
  revenueBand: string
  blocker: string
  referrer?: string
  notificationStatus: 'sent' | 'failed' | 'skipped'
  audienceStatus: 'added' | 'failed' | 'skipped' | 'duplicate'
}

async function sendNotification(
  input: BlueprintApplication,
): Promise<'sent' | 'failed' | 'skipped'> {
  if (!RESEND_API_KEY) return 'skipped'

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0a0a0b; color: #e2e8f0; padding: 40px 20px;">
  <div style="max-width: 560px; margin: 0 auto; background: #131417; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 32px;">
    <h1 style="font-size: 22px; margin: 0 0 24px; color: #ffffff;">New Blueprint Application</h1>
    <table style="width: 100%; border-collapse: collapse;">
      <tr><td style="padding: 8px 0; color: #94a3b8; width: 130px; vertical-align: top;">Name</td><td style="padding: 8px 0; color: #ffffff;">${input.name}</td></tr>
      <tr><td style="padding: 8px 0; color: #94a3b8; vertical-align: top;">Email</td><td style="padding: 8px 0; color: #ffffff;"><a href="mailto:${input.email}" style="color: #34d399;">${input.email}</a></td></tr>
      <tr><td style="padding: 8px 0; color: #94a3b8; vertical-align: top;">Company</td><td style="padding: 8px 0; color: #ffffff;">${input.company}</td></tr>
      <tr><td style="padding: 8px 0; color: #94a3b8; vertical-align: top;">Website</td><td style="padding: 8px 0; color: #ffffff;">${input.website || 'Not provided'}</td></tr>
      <tr><td style="padding: 8px 0; color: #94a3b8; vertical-align: top;">Revenue band</td><td style="padding: 8px 0; color: #ffffff;">${input.revenueBand}</td></tr>
      <tr><td style="padding: 8px 0; color: #94a3b8; vertical-align: top;">Where work waits</td><td style="padding: 8px 0; color: #ffffff; white-space: pre-wrap;">${input.blocker}</td></tr>
    </table>
    <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.1);">
      <a href="mailto:${input.email}" style="display: inline-block; background: linear-gradient(to right, #10b981, #06b6d4); color: #04110c; text-decoration: none; padding: 10px 24px; border-radius: 999px; font-size: 14px; font-weight: 700;">Reply to Applicant</a>
    </div>
  </div>
</body>
</html>`

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: NOTIFY_EMAIL,
        reply_to: input.email,
        subject: `Blueprint Application: ${input.name} — ${input.revenueBand}`,
        html,
      }),
    })
    return res.ok ? 'sent' : 'failed'
  } catch {
    return 'failed'
  }
}

async function sendConfirmation(input: BlueprintApplication) {
  if (!RESEND_API_KEY) return

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0a0a0b; color: #e2e8f0; padding: 40px 20px;">
  <div style="max-width: 560px; margin: 0 auto; background: #131417; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 32px;">
    <h1 style="font-size: 22px; margin: 0 0 16px; color: #ffffff;">Application received</h1>
    <p style="color: #94a3b8; line-height: 1.6; margin: 0 0 16px;">
      Hi ${input.name.split(' ')[0]}, thanks for applying for a Starlight Intelligence Blueprint slot.
      I read every application myself and will reply within a few business days.
    </p>
    <p style="color: #64748b; font-size: 14px; margin: 0;">— Frank</p>
  </div>
</body>
</html>`

  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: input.email,
        subject: 'Your Blueprint application has been received',
        html,
      }),
    })
  } catch (err) {
    console.error('[blueprint-apply] confirmation email error:', err)
  }
}

async function addToAudience(
  input: BlueprintApplication,
): Promise<'added' | 'failed' | 'skipped' | 'duplicate'> {
  if (!RESEND_API_KEY) return 'skipped'
  try {
    const res = await fetch(`https://api.resend.com/audiences/${AUDIENCE_ID}/contacts`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: input.email,
        first_name: input.name.split(' ')[0],
        unsubscribed: false,
      }),
    })
    if (res.ok) return 'added'
    if (res.status === 409) return 'duplicate'
    return 'failed'
  } catch {
    return 'failed'
  }
}

async function appendLog(entry: LogEntry) {
  try {
    const filePath = logPath()
    await fs.mkdir(path.dirname(filePath), { recursive: true })
    await fs.appendFile(filePath, JSON.stringify(entry) + '\n', 'utf8')
    return true
  } catch (err) {
    console.error('[blueprint-apply] log append failed', err)
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    // Rate limit: 10 applications/hour/IP. Fail-open — a KV outage must
    // never block a legitimate application.
    try {
      const { success } = await leadRatelimit.limit(getClientIdentifier(request))
      if (!success) {
        return NextResponse.json(
          { ok: false, error: 'Too many submissions. Please try again later.' },
          { status: 429 },
        )
      }
    } catch (err) {
      console.error('[blueprint-apply] rate-limit check failed (continuing open):', err)
    }

    const body = await request.json().catch(() => null)
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 })
    }

    const parsed = BlueprintApplicationSchema.safeParse(body)
    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0]
      return NextResponse.json(
        { ok: false, error: firstIssue?.message ?? 'Validation failed.' },
        { status: 400 },
      )
    }

    const input = parsed.data

    // Honeypot tripped — return a quiet fake-success, no signal to the bot.
    if (input.phone) {
      return NextResponse.json({ ok: true, message: 'Application received.' })
    }

    const referrer = request.headers.get('referer')

    const [notificationStatus, audienceStatus] = await Promise.all([
      sendNotification(input),
      addToAudience(input),
    ])
    sendConfirmation(input).catch((err) =>
      console.error('[blueprint-apply] confirmation dispatch error:', err),
    )

    const logged = await appendLog({
      ts: new Date().toISOString(),
      name: input.name,
      email: input.email,
      company: input.company,
      website: input.website || undefined,
      revenueBand: input.revenueBand,
      blocker: input.blocker,
      referrer: referrer || undefined,
      notificationStatus,
      audienceStatus,
    })

    console.log(
      '[blueprint-apply]',
      JSON.stringify({
        name: input.name,
        email: input.email,
        revenueBand: input.revenueBand,
        notificationStatus,
        audienceStatus,
      }),
    )

    // If notification AND log both failed, surface an error so the form retries.
    if (notificationStatus === 'failed' && !logged) {
      return NextResponse.json(
        {
          ok: false,
          error: 'We hit a delivery hiccup. Please try again or email frank@frankx.ai directly.',
        },
        { status: 500 },
      )
    }

    return NextResponse.json({
      ok: true,
      message: 'Application received. Frank reviews every one personally.',
    })
  } catch (error) {
    console.error('[blueprint-apply] error:', error)
    return NextResponse.json(
      { ok: false, error: 'An unexpected error occurred. Please try again.' },
      { status: 500 },
    )
  }
}
