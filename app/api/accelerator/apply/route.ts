import { NextRequest, NextResponse } from 'next/server'
import { appendFile, mkdir } from 'fs/promises'
import path from 'path'
import { leadRatelimit, getClientIdentifier } from '@/lib/ratelimit'
import {
  acceleratorApplicationReceivedEmail,
  acceleratorApplicationNotifyEmail,
  type AcceleratorApplicationInput,
} from '@/lib/email-templates-accelerator'

const RESEND_API_KEY = process.env.RESEND_API_KEY
const AUDIENCE_ID = '4d2e913e-6903-4dd4-8749-c02cdb844331'

const VALID_ROUTES = ['program', 'fund', 'partner', 'founder'] as const
const VALID_SIZES = ['1-10', '11-30', '31-100', '100+', 'pre'] as const

function applicationsPath() {
  const dir = process.env.VERCEL ? '/tmp' : path.join(process.cwd(), 'private')
  return { dir, file: path.join(dir, 'accelerator-applications.jsonl') }
}

async function sendEmails(input: AcceleratorApplicationInput) {
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

  const confirmation = acceleratorApplicationReceivedEmail(input)
  const notification = acceleratorApplicationNotifyEmail(input)

  await Promise.allSettled([
    send(input.email, confirmation.subject, confirmation.plainText),
    send('frank@frankx.ai', notification.subject, notification.plainText),
  ])
}

export async function POST(request: NextRequest) {
  try {
    try {
      const { success } = await leadRatelimit.limit(getClientIdentifier(request))
      if (!success) {
        return NextResponse.json(
          { error: 'Too many submissions. Please try again later.' },
          { status: 429 }
        )
      }
    } catch (err) {
      console.error('Accelerator rate-limit check failed (continuing open):', err)
    }

    const body = await request.json()

    if (typeof body.website === 'string' && body.website.trim() !== '') {
      return NextResponse.json({ success: true, message: 'Application received.' })
    }

    const input: AcceleratorApplicationInput = {
      name: String(body.name ?? '')
        .slice(0, 200)
        .trim(),
      email: String(body.email ?? '')
        .slice(0, 200)
        .trim(),
      organization: String(body.organization ?? '')
        .slice(0, 200)
        .trim(),
      role: String(body.role ?? '')
        .slice(0, 200)
        .trim(),
      route: String(body.route ?? '')
        .slice(0, 50)
        .trim(),
      building: String(body.building ?? '')
        .slice(0, 2000)
        .trim(),
      why: String(body.why ?? '')
        .slice(0, 2000)
        .trim(),
      size: String(body.size ?? '')
        .slice(0, 50)
        .trim(),
      link: body.link
        ? String(body.link)
            .slice(0, 500)
            .trim()
        : undefined,
    }

    if (!input.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) {
      return NextResponse.json({ error: 'Please enter a valid email address' }, { status: 400 })
    }
    if (!input.name || !input.organization || !input.role || !input.building || !input.why) {
      return NextResponse.json(
        { error: 'Name, organization, role, program context, and why-now are required' },
        { status: 400 }
      )
    }
    if (!VALID_ROUTES.includes(input.route as (typeof VALID_ROUTES)[number])) {
      return NextResponse.json({ error: 'Please select a route' }, { status: 400 })
    }
    if (!VALID_SIZES.includes(input.size as (typeof VALID_SIZES)[number])) {
      return NextResponse.json({ error: 'Please select a program size' }, { status: 400 })
    }

    try {
      const { dir, file } = applicationsPath()
      await mkdir(dir, { recursive: true })
      await appendFile(
        file,
        JSON.stringify({ ...input, receivedAt: new Date().toISOString() }) + '\n'
      )
    } catch (err) {
      console.error('Accelerator application log write failed:', err)
    }

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
        console.error('Resend contact creation failed for accelerator application:', await res.text())
      }
    } else {
      console.error('RESEND_API_KEY not configured — accelerator application stored to log only')
    }

    sendEmails(input).catch((err) => console.error('Accelerator application email error:', err))

    return NextResponse.json({
      success: true,
      message: 'Application received. Frank reads every one personally.',
    })
  } catch (error) {
    console.error('Accelerator application error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    )
  }
}
