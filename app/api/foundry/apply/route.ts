import { NextRequest, NextResponse } from 'next/server'
import { appendFile, mkdir } from 'fs/promises'
import path from 'path'
import { leadRatelimit, getClientIdentifier } from '@/lib/ratelimit'
import {
  foundryApplicationReceivedEmail,
  foundryApplicationNotifyEmail,
  type FoundryApplicationInput,
} from '@/lib/email-templates-foundry'

const RESEND_API_KEY = process.env.RESEND_API_KEY
const AUDIENCE_ID = '4d2e913e-6903-4dd4-8749-c02cdb844331'

const VALID_STAGES = ['idea', 'pre-launch', 'revenue', 'scaling'] as const

/**
 * Foundry application intake.
 * Mirrors the 404-log storage pattern: private/ locally (gitignored),
 * /tmp on Vercel. Applications also land in Frank's inbox via Resend,
 * so the JSONL is a backstop, not the system of record.
 */
function applicationsPath() {
  const dir = process.env.VERCEL ? '/tmp' : path.join(process.cwd(), 'private')
  return { dir, file: path.join(dir, 'foundry-applications.jsonl') }
}

async function sendEmails(input: FoundryApplicationInput) {
  if (!RESEND_API_KEY) return

  const send = (to: string, subject: string, text: string) =>
    fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ from: 'Frank <frank@mail.frankx.ai>', to, subject, text }),
    })

  const confirmation = foundryApplicationReceivedEmail(input)
  const notification = foundryApplicationNotifyEmail(input)

  await Promise.allSettled([
    send(input.email, confirmation.subject, confirmation.plainText),
    send('frank@frankx.ai', notification.subject, notification.plainText),
  ])
}

export async function POST(request: NextRequest) {
  try {
    // Rate limit: 10 applications per hour per client. Fail-open — a KV
    // outage must never block a legitimate application.
    try {
      const { success } = await leadRatelimit.limit(getClientIdentifier(request))
      if (!success) {
        return NextResponse.json(
          { error: 'Too many submissions. Please try again later.' },
          { status: 429 }
        )
      }
    } catch (err) {
      console.error('Foundry rate-limit check failed (continuing open):', err)
    }

    const body = await request.json()

    // Honeypot: real users never see or fill this field. Bots that fill it
    // get a success response and silence — no signal that they were caught.
    if (typeof body.website === 'string' && body.website.trim() !== '') {
      return NextResponse.json({ success: true, message: 'Application received.' })
    }

    const input: FoundryApplicationInput = {
      name: String(body.name ?? '').slice(0, 200).trim(),
      email: String(body.email ?? '').slice(0, 200).trim(),
      company: String(body.company ?? '').slice(0, 200).trim(),
      building: String(body.building ?? '').slice(0, 2000).trim(),
      why: String(body.why ?? '').slice(0, 2000).trim(),
      stage: String(body.stage ?? '').slice(0, 50).trim(),
      link: body.link ? String(body.link).slice(0, 500).trim() : undefined,
    }

    if (!input.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) {
      return NextResponse.json({ error: 'Please enter a valid email address' }, { status: 400 })
    }
    if (!input.name || !input.company || !input.building || !input.why) {
      return NextResponse.json(
        { error: 'Name, company, what you are building, and why it matters are required' },
        { status: 400 }
      )
    }
    if (!VALID_STAGES.includes(input.stage as (typeof VALID_STAGES)[number])) {
      return NextResponse.json({ error: 'Please select a stage' }, { status: 400 })
    }

    // Backstop log (gitignored locally, ephemeral on Vercel)
    try {
      const { dir, file } = applicationsPath()
      await mkdir(dir, { recursive: true })
      await appendFile(
        file,
        JSON.stringify({ ...input, receivedAt: new Date().toISOString() }) + '\n'
      )
    } catch (err) {
      console.error('Foundry application log write failed:', err)
    }

    // Add to Resend audience so the applicant exists as a contact (idempotent-ish:
    // a 409 just means they already exist — not an error for an application).
    if (RESEND_API_KEY) {
      const res = await fetch(`https://api.resend.com/audiences/${AUDIENCE_ID}/contacts`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: input.email,
          first_name: input.name || undefined,
          unsubscribed: false,
        }),
      })
      if (!res.ok && res.status !== 409) {
        console.error('Resend contact creation failed for foundry application:', await res.text())
      }
    } else {
      console.error('RESEND_API_KEY not configured — foundry application stored to log only')
    }

    // Confirmation + internal notification (non-blocking for the response)
    sendEmails(input).catch((err) => console.error('Foundry application email error:', err))

    return NextResponse.json({
      success: true,
      message: 'Application received. Frank reads every one personally.',
    })
  } catch (error) {
    console.error('Foundry application error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    )
  }
}
