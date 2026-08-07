import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const RESEND_API_KEY = process.env.RESEND_API_KEY
const AUDIENCE_ID = '4d2e913e-6903-4dd4-8749-c02cdb844331'
const FROM_EMAIL = 'Frank <frank@mail.frankx.ai>'
// frank@mail.frankx.ai is the Resend SEND-ONLY subdomain and does not receive
// mail. Notifications must land on the IONOS-hosted root domain inbox. Never
// fall back to RESEND_FROM_EMAIL: that is the sender address, and using it as
// the destination routes applications into an unmonitored inbox.
const NOTIFY_EMAIL = process.env.OPERATOR_EMAIL || 'frank@frankx.ai'

const ApplicationSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your full name.').max(120),
  email: z.string().trim().email('Please enter a valid email address.').max(200),
  company: z.string().trim().max(200).optional().or(z.literal('')),
  bodyOfWork: z
    .string()
    .trim()
    .url('Please enter a link starting with https://')
    .max(400),
  campaign: z
    .string()
    .trim()
    .min(20, 'Describe the live campaign in a sentence or two.')
    .max(2000),
  drift: z
    .string()
    .trim()
    .min(20, 'Tell me where your voice is being flattened today.')
    .max(2000),
  scanPercent: z.number().int().min(0).max(100).optional(),
  scanBand: z.string().trim().max(40).optional(),
})

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function row(label: string, value: string): string {
  return `
      <tr>
        <td style="padding: 8px 0; color: #94a3b8; width: 150px; vertical-align: top;">${escapeHtml(label)}</td>
        <td style="padding: 8px 0; color: #ffffff; white-space: pre-wrap;">${escapeHtml(value)}</td>
      </tr>`
}

export async function POST(request: NextRequest) {
  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const parsed = ApplicationSchema.safeParse(payload)
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? 'Please check the form and try again.' },
      { status: 400 }
    )
  }

  const { name, email, company, bodyOfWork, campaign, drift, scanPercent, scanBand } =
    parsed.data

  if (!RESEND_API_KEY) {
    console.error('founder-signal/apply: RESEND_API_KEY not configured')
    return NextResponse.json(
      { error: 'The application service is not available right now. Please email frank@frankx.ai.' },
      { status: 503 }
    )
  }

  try {
    const contactResponse = await fetch(
      `https://api.resend.com/audiences/${AUDIENCE_ID}/contacts`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, first_name: name, unsubscribed: false }),
      }
    )

    // 409 means the contact already exists, which is expected for returning readers.
    if (!contactResponse.ok && contactResponse.status !== 409) {
      console.error('founder-signal/apply: Resend contact error', await contactResponse.text())
      return NextResponse.json(
        { error: 'Failed to submit your application. Please try again.' },
        { status: 502 }
      )
    }

    const scanLine =
      scanPercent === undefined
        ? 'Not run before applying'
        : `${scanPercent}%${scanBand ? ` (${scanBand})` : ''}`

    const notificationHtml = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0a0a0b; color: #e2e8f0; padding: 40px 20px;">
  <div style="max-width: 620px; margin: 0 auto; background: #1a1a1f; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 32px;">
    <h1 style="font-size: 22px; margin: 0 0 24px; color: #ffffff;">Founder Signal OS pilot application</h1>
    <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
      ${row('Name', name)}
      ${row('Email', email)}
      ${row('Company or role', company || 'Not provided')}
      ${row('Body of work', bodyOfWork)}
      ${row('Signal Scan', scanLine)}
      ${row('Live campaign', campaign)}
      ${row('Where it flattens', drift)}
    </table>
    <div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.1);">
      <a href="mailto:${escapeHtml(email)}" style="display: inline-block; background: #34d399; color: #0a0a0b; text-decoration: none; padding: 10px 24px; border-radius: 999px; font-size: 14px; font-weight: 600;">Reply to applicant</a>
    </div>
  </div>
</body>
</html>`

    const notifyResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: NOTIFY_EMAIL,
        subject: `Founder Signal OS application: ${name}`,
        html: notificationHtml,
        reply_to: email,
      }),
    })

    if (!notifyResponse.ok) {
      console.error('founder-signal/apply: Resend notify error', await notifyResponse.text())
      return NextResponse.json(
        { error: 'Failed to submit your application. Please try again.' },
        { status: 502 }
      )
    }

    const confirmationHtml = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0a0a0b; color: #e2e8f0; padding: 40px 20px;">
  <div style="max-width: 560px; margin: 0 auto; background: #1a1a1f; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 32px;">
    <h1 style="font-size: 22px; margin: 0 0 16px; color: #ffffff;">Application received</h1>
    <p style="color: #94a3b8; line-height: 1.7; margin: 0 0 16px;">
      Hi ${escapeHtml(name.split(' ')[0])}, thanks for putting your work forward for the Founder Signal OS pilot.
    </p>
    <p style="color: #94a3b8; line-height: 1.7; margin: 0 0 16px;">
      One founder gets selected. I read every application myself and reply either way, so you will hear back rather than wondering.
    </p>
    <p style="color: #94a3b8; line-height: 1.7; margin: 0 0 24px;">
      The stack is public in the meantime: <a href="https://github.com/frankxai/creator-intelligence-system" style="color: #34d399;">creator-intelligence-system</a> and the <a href="https://github.com/frankxai/agentic-operating-system-standard" style="color: #34d399;">Agentic Operating System Standard</a>.
    </p>
    <p style="color: #64748b; font-size: 14px; margin: 0;">Frank Riemer</p>
  </div>
</body>
</html>`

    // Fire and forget: a failed confirmation must not fail the application.
    fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: email,
        subject: 'Your Founder Signal OS application has been received',
        html: confirmationHtml,
      }),
    }).catch((error) => console.error('founder-signal/apply: confirmation error', error))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('founder-signal/apply: unexpected error', error)
    return NextResponse.json(
      { error: 'Something went wrong on my side. Please email frank@frankx.ai.' },
      { status: 500 }
    )
  }
}
