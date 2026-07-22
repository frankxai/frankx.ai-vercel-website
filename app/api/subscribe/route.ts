import { NextRequest, NextResponse } from 'next/server'
import { musicPromptsEmail } from '@/lib/email-templates'
import { welcomeEmail1 } from '@/lib/email-templates-welcome'
import { ikigaiBrandingEmail } from '@/lib/email-templates-ikigai'
import { innerCircleWaitlistEmail } from '@/lib/email-templates-inner-circle'
import { mvuRsvpConfirmation, mvuRsvpAlert } from '@/lib/email-templates-mvu'

export const runtime = 'nodejs'

const RESEND_API_KEY = process.env.RESEND_API_KEY
const AUDIENCE_ID = '4d2e913e-6903-4dd4-8749-c02cdb844331'
const FROM_EMAIL = 'Frank <frank@mail.frankx.ai>'

// Resend topic IDs (dashboard "topics" — recorded on the contact as a `topics`
// property for segmentation/reporting. NOTE: the contacts endpoint itself does
// not subscribe contacts to topics; that is a dashboard/Broadcast concept, so we
// persist the intent as a queryable custom property instead).
const TOPICS = {
  newsletter: 'b613f6ff-9c56-4b4c-86df-9217843c5d78',
  'music-suno': '018a5159-10c8-4595-8ecc-63d7a2c6b442',
  'product-updates': '811064ed-7444-45db-9a2a-fd8c83a21053',
} as const

// Map each list type to its topics. The KEY set is also the allow-list of valid
// list types — anything else falls back to `newsletter`.
const LIST_CONFIG: Record<string, { topics: string[] }> = {
  newsletter: { topics: [TOPICS.newsletter] },
  'creation-chronicles': { topics: [TOPICS.newsletter] },
  'ai-architect': { topics: [TOPICS.newsletter] },
  'operator-scorecard': { topics: [TOPICS.newsletter] },
  'inner-circle': { topics: [TOPICS.newsletter, TOPICS['product-updates']] },
  'music-lab': { topics: [TOPICS['music-suno'], TOPICS.newsletter] },
  arcanea: { topics: [TOPICS.newsletter] },
  investor: { topics: [TOPICS.newsletter] },
  'courses-waitlist': { topics: [TOPICS.newsletter] },
  'ikigai-branding': { topics: [TOPICS.newsletter] },
  'premium-packs': { topics: [TOPICS.newsletter, TOPICS['product-updates']] },
  'mvu-tallinn-2026': { topics: [TOPICS.newsletter] },
  all: { topics: [TOPICS.newsletter, TOPICS['music-suno'], TOPICS['product-updates']] },
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_EMAIL_LEN = 320
const MAX_NAME_LEN = 100
const MAX_SOURCE_LEN = 120

function resolveListType(value: unknown): keyof typeof LIST_CONFIG {
  return typeof value === 'string' && value in LIST_CONFIG
    ? (value as keyof typeof LIST_CONFIG)
    : 'newsletter'
}

/**
 * Premium-packs waitlist gets a concise, plain-text confirmation that matches the
 * high-status, no-marketing-chrome aesthetic. Keeps the waitlist feeling
 * intentional rather than a generic newsletter opt-in.
 */
function premiumPacksConfirmation(name: string) {
  const first = name ? name.split(' ')[0] : 'there'
  return {
    subject: "You're on the premium packs waitlist",
    text: [
      `Hi ${first},`,
      '',
      "You're on the list for the FrankX premium agent packs.",
      '',
      'These are the same pillar packs I run on my own machine — content, music,',
      'visuals, books, research, and the rest. Each ships nine specialist agents you',
      'install into Claude Code, Cursor, or Antigravity and run with your own keys.',
      '',
      "When a pack ships, you'll be the first to install it — plus the build notes",
      'along the way. No spam, and nothing to pay until a pack is in your hands.',
      '',
      'In the meantime, the free Foundation pack is ready now:',
      'https://frankx.ai/agents/packs/meta',
      '',
      '— Frank',
    ].join('\n'),
  }
}

async function sendEmail(payload: Record<string, unknown>) {
  if (!RESEND_API_KEY) return
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from: FROM_EMAIL, ...payload }),
  })
}

async function sendWelcomeEmail(
  email: string,
  name: string,
  listType: string,
  intention = '',
) {
  if (!RESEND_API_KEY) return

  // Native RSVP for the Tallinn lab (frankx.ai/mvu/lab). Plain text — it lands
  // right after a personal decision, and it echoes the person's own words back.
  // The RSVP also pings Frank directly for the by-hand approve/decline call,
  // since he's at a summit and won't be watching a dashboard.
  if (listType === 'mvu-tallinn-2026') {
    const confirmation = mvuRsvpConfirmation({ name, intention })
    await sendEmail({ to: email, subject: confirmation.subject, text: confirmation.plainText })

    const alert = mvuRsvpAlert({ email, name, intention })
    await sendEmail({
      to: process.env.MVU_ALERT_EMAIL || 'friemerx@gmail.com',
      subject: alert.subject,
      text: alert.plainText,
    }).catch((err) => console.error('MVU RSVP alert error:', err))
    return
  }

  // Plain-text confirmations for the waitlist tiers — no HTML wrapper, no chrome.
  if (listType === 'inner-circle') {
    const innerCircle = innerCircleWaitlistEmail({
      email,
      name,
      joinedAt: new Date().toISOString(),
    })
    await sendEmail({ to: email, subject: innerCircle.subject, text: innerCircle.plainText })
    return
  }

  if (listType === 'premium-packs') {
    const confirmation = premiumPacksConfirmation(name)
    await sendEmail({ to: email, subject: confirmation.subject, text: confirmation.text })
    return
  }

  // All other list types use the styled HTML templates.
  let template
  if (listType === 'music-lab') {
    template = musicPromptsEmail({
      recipientName: name || 'Creator',
      downloadUrl: 'https://frankx.ai/api/download?product=5-suno-prompts',
      recipientEmail: email,
    })
  } else if (listType === 'ikigai-branding') {
    template = ikigaiBrandingEmail({ recipientName: name || 'Creator', recipientEmail: email })
  } else {
    template = welcomeEmail1({ recipientName: name || 'Creator', recipientEmail: email })
  }

  await sendEmail({ to: email, subject: template.subject, html: template.html })
}

interface ContactBody {
  email: string
  first_name?: string
  unsubscribed: boolean
  properties?: Record<string, string>
}

async function createContact(body: ContactBody) {
  return fetch(`https://api.resend.com/audiences/${AUDIENCE_ID}/contacts`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null)
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
    }
    const raw = body as Record<string, unknown>

    // Honeypot — bots fill hidden fields humans never see. Silently 200 so the
    // bot believes it succeeded while we create nothing.
    const honeypot = raw.website ?? raw.company
    if (typeof honeypot === 'string' && honeypot.trim().length > 0) {
      return NextResponse.json({ success: true, message: 'Successfully subscribed!' })
    }

    const email = String(raw.email ?? '').trim().toLowerCase()
    const name = String(raw.name ?? '').trim().slice(0, MAX_NAME_LEN)
    const source = String(raw.source ?? '').trim().slice(0, MAX_SOURCE_LEN)
    const intention = String(raw.intention ?? '').trim().slice(0, 280)
    const listType = resolveListType(raw.listType)

    if (!email || email.length > MAX_EMAIL_LEN || !EMAIL_RE.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 },
      )
    }

    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured')
      return NextResponse.json(
        { error: 'Email service not configured. Please try again later.' },
        { status: 500 },
      )
    }

    const config = LIST_CONFIG[listType]

    // Custom properties make the list genuinely segmentable inside Resend. The
    // create-contact endpoint accepts a string→string `properties` map.
    const properties: Record<string, string> = { source: listType }
    if (config.topics.length) properties.topics = config.topics.join(',')
    if (source) properties.referrer = source
    // Persist the RSVP intention so the approve/decline decision and the room's
    // makeup are backed by a queryable segment, not only the alert emails.
    if (intention) properties.intention = intention

    const fullBody: ContactBody = {
      email,
      first_name: name || undefined,
      unsubscribed: false,
      properties,
    }

    let resendResponse = await createContact(fullBody)

    // Resilience: if the audience/plan rejects custom properties (422), retry
    // once with the minimal payload so segmentation can never block a signup.
    if (resendResponse.status === 422) {
      console.warn('Resend rejected contact properties; retrying minimal payload')
      const { properties: _omit, ...minimal } = fullBody
      void _omit
      resendResponse = await createContact(minimal)
    }

    if (!resendResponse.ok) {
      const errorData = await resendResponse.json().catch(() => ({}))
      console.error('Resend API error:', resendResponse.status, errorData)

      if (resendResponse.status === 409) {
        return NextResponse.json(
          { error: 'This email is already subscribed!' },
          { status: 400 },
        )
      }

      return NextResponse.json(
        { error: 'Failed to subscribe. Please try again.' },
        { status: 500 },
      )
    }

    const data = await resendResponse.json().catch(() => ({}))

    // Welcome/delivery email is non-blocking — a delivery hiccup must not fail
    // the subscription itself.
    sendWelcomeEmail(email, name, listType, intention).catch((err) =>
      console.error('Welcome email error:', err),
    )

    return NextResponse.json({
      success: true,
      message:
        listType === 'music-lab'
          ? 'Check your email for your free prompts!'
          : 'Successfully subscribed!',
      subscriber: data.id,
    })
  } catch (error) {
    console.error('Subscription error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 },
    )
  }
}
