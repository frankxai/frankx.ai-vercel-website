import { createHash, createHmac, timingSafeEqual } from 'node:crypto'
import { NextRequest, NextResponse } from 'next/server'
import { musicPromptsEmail } from '@/lib/email-templates'
import { welcomeEmail1 } from '@/lib/email-templates-welcome'
import { ikigaiBrandingEmail } from '@/lib/email-templates-ikigai'
import { innerCircleWaitlistEmail } from '@/lib/email-templates-inner-circle'
import { mvuRsvpConfirmation, mvuRsvpAlert } from '@/lib/email-templates-mvu'
import { emailRatelimit, getClientIdentifier } from '@/lib/ratelimit'
import { siteConfig } from '@/lib/seo'

export const runtime = 'nodejs'

const RESEND_API_KEY = process.env.RESEND_API_KEY
const PREFERENCES_SECRET = process.env.NEWSLETTER_PREFERENCES_SECRET
const AUDIENCE_ID = '4d2e913e-6903-4dd4-8749-c02cdb844331'
const FROM_EMAIL = 'Frank <frank@mail.frankx.ai>'
const PREFERENCE_TOKEN_TTL_MS = 30 * 60 * 1000

// Resend topic IDs. Native topic state is the only preference source of truth;
// contact metadata never mirrors it because two provider writes cannot be atomic.
const TOPICS = {
  newsletter: 'b613f6ff-9c56-4b4c-86df-9217843c5d78',
  'music-suno': '018a5159-10c8-4595-8ecc-63d7a2c6b442',
  'product-updates': '811064ed-7444-45db-9a2a-fd8c83a21053',
} as const

type TopicKey = keyof typeof TOPICS
const TOPIC_KEYS = Object.keys(TOPICS) as TopicKey[]

// Map each list type to its topics. The KEY set is also the allow-list of valid
// list types — anything else falls back to `newsletter`.
const LIST_CONFIG: Record<string, { topics: string[] }> = {
  newsletter: { topics: [TOPICS.newsletter] },
  'creation-chronicles': { topics: [TOPICS.newsletter] },
  'ai-architect': { topics: [TOPICS.newsletter] },
  'founder-stack': { topics: [TOPICS.newsletter, TOPICS['product-updates']] },
  'operator-scorecard': { topics: [TOPICS.newsletter] },
  'inner-circle': { topics: [TOPICS.newsletter, TOPICS['product-updates']] },
  'music-lab': { topics: [TOPICS['music-suno'], TOPICS.newsletter] },
  arcanea: { topics: [TOPICS.newsletter] },
  investor: { topics: [TOPICS.newsletter] },
  'courses-waitlist': { topics: [TOPICS.newsletter] },
  'ikigai-branding': { topics: [TOPICS.newsletter] },
  'premium-packs': { topics: [TOPICS.newsletter, TOPICS['product-updates']] },
  'mvu-tallinn-2026': { topics: [TOPICS.newsletter] },
  // No topics on purpose. The lab RSVP form states "Nothing else, ever", so
  // subscribing these people to newsletter messaging would be a promise broken
  // in code. `properties.source` still segments them for the one email they
  // did consent to: the confirm-or-cancel note about the lab.
  'mvu-porto-2027': { topics: [] },
  all: { topics: [TOPICS.newsletter, TOPICS['music-suno'], TOPICS['product-updates']] },
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_EMAIL_LEN = 320
const MAX_NAME_LEN = 100
const MAX_SOURCE_LEN = 120
const GROWTH_CAPTURE_URL =
  process.env.GROWTH_CAPTURE_URL ??
  'https://gfrfcqyprekhazzugdkr.supabase.co/functions/v1/growth-capture'

interface GrowthCaptureInput {
  email: string
  name: string
  listType: string
  source: string
  intention: string
  raw: Record<string, unknown>
}

function optionalText(value: unknown) {
  return typeof value === 'string' && value.trim() ? value.trim() : undefined
}

function pagePathFromReferer(request: NextRequest) {
  const referer = request.headers.get('referer')
  if (!referer) return undefined
  try {
    const url = new URL(referer)
    return url.pathname + url.search
  } catch {
    return undefined
  }
}

async function captureGrowthLead(request: NextRequest, input: GrowthCaptureInput) {
  const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Origin: new URL(request.url).origin,
  }
  if (clientIp) headers['x-growth-client-ip'] = clientIp

  try {
    const response = await fetch(GROWTH_CAPTURE_URL, {
      method: 'POST',
      headers,
      cache: 'no-store',
      signal: AbortSignal.timeout(5_000),
      body: JSON.stringify({
        email: input.email,
        name: input.name || undefined,
        program: 'frankx-' + input.listType,
        source: input.source || input.listType,
        intention: input.intention || undefined,
        referrer: request.headers.get('referer') ?? undefined,
        page_path: pagePathFromReferer(request),
        utm_source: optionalText(input.raw.utm_source),
        utm_medium: optionalText(input.raw.utm_medium),
        utm_campaign: optionalText(input.raw.utm_campaign),
        utm_content: optionalText(input.raw.utm_content),
        utm_term: optionalText(input.raw.utm_term),
        metadata: { list_type: input.listType },
      }),
    })
    const result = (await response.json().catch(() => null)) as
      | { accepted?: boolean }
      | null

    if (!response.ok || result?.accepted !== true) {
      console.error('Growth Core capture rejected:', response.status)
      return { ok: false, status: response.status === 429 ? 429 : 503 }
    }
    return { ok: true, status: response.status }
  } catch (error) {
    console.error('Growth Core capture unavailable:', error)
    return { ok: false, status: 503 }
  }
}

function resolveListType(value: unknown): keyof typeof LIST_CONFIG {
  return typeof value === 'string' && value in LIST_CONFIG
    ? (value as keyof typeof LIST_CONFIG)
    : 'newsletter'
}

function canonicalizeTopics(value: unknown): TopicKey[] | null {
  if (!Array.isArray(value)) return null
  const selected = new Set<TopicKey>()
  for (const topic of value) {
    if (typeof topic !== 'string' || !TOPIC_KEYS.includes(topic as TopicKey)) return null
    selected.add(topic as TopicKey)
  }
  return TOPIC_KEYS.filter((topic) => selected.has(topic))
}

function sameTopics(left: TopicKey[], right: TopicKey[]) {
  return left.length === right.length && left.every((topic, index) => topic === right[index])
}

function preferenceSignature(email: string, payload: string) {
  if (!PREFERENCES_SECRET) return null
  return createHmac('sha256', PREFERENCES_SECRET)
    .update(`${email}\n${payload}`)
    .digest('base64url')
}

function createPreferenceToken(email: string, topics: TopicKey[]) {
  const payload = Buffer.from(
    JSON.stringify({ v: 1, topics, exp: Date.now() + PREFERENCE_TOKEN_TTL_MS }),
  ).toString('base64url')
  const signature = preferenceSignature(email, payload)
  return signature ? `${payload}.${signature}` : null
}

function topicsFromPreferenceToken(email: string, token: string): TopicKey[] | null {
  if (!PREFERENCES_SECRET || token.length > 2048) return null
  const parts = token.split('.')
  if (parts.length !== 2) return null
  const [payloadPart, signature] = parts
  const expected = preferenceSignature(email, payloadPart)
  if (!expected) return null

  const receivedBytes = Buffer.from(signature)
  const expectedBytes = Buffer.from(expected)
  if (
    receivedBytes.length !== expectedBytes.length ||
    !timingSafeEqual(receivedBytes, expectedBytes)
  ) {
    return null
  }

  try {
    const payload = JSON.parse(Buffer.from(payloadPart, 'base64url').toString('utf8')) as {
      v?: unknown
      topics?: unknown
      exp?: unknown
    }
    const topics = canonicalizeTopics(payload.topics)
    if (
      payload.v !== 1 ||
      typeof payload.exp !== 'number' ||
      !Number.isSafeInteger(payload.exp) ||
      payload.exp <= Date.now() ||
      !topics
    ) {
      return null
    }
    return topics
  } catch {
    return null
  }
}

async function subscriptionRateLimit(request: NextRequest, email: string) {
  const emailDigest = createHash('sha256').update(email).digest('hex')
  try {
    const [ipResult, emailResult] = await Promise.all([
      emailRatelimit.limit(`subscribe:ip:${getClientIdentifier(request)}`),
      emailRatelimit.limit(`subscribe:email:${emailDigest}`),
    ])
    return ipResult.success && emailResult.success ? 'allowed' : 'limited'
  } catch (error) {
    console.error('Subscription rate limit unavailable:', error)
    return 'unavailable'
  }
}

async function sendPreferenceConfirmation(email: string, topics: TopicKey[]) {
  const token = createPreferenceToken(email, topics)
  if (!token) throw new Error('Preference signing is not configured')
  const url = `${siteConfig.url}/newsletter/preferences?token=${encodeURIComponent(token)}`
  const labels = topics.length ? topics.join(', ') : 'no optional topics'
  await sendEmail({
    to: email,
    subject: 'Confirm your FrankX email preferences',
    text: [
      'Confirm your FrankX email preferences.',
      '',
      `Requested topics: ${labels}`,
      '',
      'Open this short-lived link, re-enter your email, and confirm:',
      url,
      '',
      'If you did not request this change, ignore this email. Nothing has changed.',
    ].join('\n'),
  })
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
      `${siteConfig.url}/agents/packs/meta`,
      '',
      '— Frank',
    ].join('\n'),
  }
}

async function sendEmail(payload: Record<string, unknown>) {
  if (!RESEND_API_KEY) throw new Error('Email service not configured')
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from: FROM_EMAIL, ...payload }),
  })
  if (!response.ok) throw new Error(`Email delivery failed with status ${response.status}`)
}

async function sendWelcomeEmail(
  email: string,
  name: string,
  listType: string,
  intention = '',
) {
  if (!RESEND_API_KEY) return

  // Native RSVP for the independent MVU lab (frankx.ai/mvu/lab). Plain text —
  // it lands right after a personal decision, and it echoes the person's own
  // words back. The RSVP also pings Frank directly for the by-hand
  // approve/decline call.
  //
  // Deliberately Porto-only. 'mvu-tallinn-2026' must NOT reach this branch: a
  // retried or delayed submission from the old form would receive a Porto 2027
  // confirmation for an event the person never opted into. Contacts already
  // stored from 2026 never call this function, so nothing needs the alias.
  if (listType === 'mvu-porto-2027') {
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
      downloadUrl: `${siteConfig.url}/api/download?product=5-suno-prompts`,
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

async function updateContactTopics(email: string, selectedTopicKeys: Array<keyof typeof TOPICS>) {
  const selected = new Set(selectedTopicKeys)
  return fetch(
    `https://api.resend.com/contacts/${encodeURIComponent(email)}/topics`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        topics: Object.entries(TOPICS).map(([key, id]) => ({
          id,
          subscription: selected.has(key as keyof typeof TOPICS) ? 'opt_in' : 'opt_out',
        })),
      }),
    },
  )
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
    const hasExplicitTopics = Object.prototype.hasOwnProperty.call(raw, 'topics')
    const explicitTopics = hasExplicitTopics ? canonicalizeTopics(raw.topics) : null
    const preferenceToken =
      typeof raw.preferenceToken === 'string' ? raw.preferenceToken.trim() : ''

    if (!email || email.length > MAX_EMAIL_LEN || !EMAIL_RE.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 },
      )
    }

    if (hasExplicitTopics && !explicitTopics) {
      return NextResponse.json({ error: 'Invalid topic preferences.' }, { status: 400 })
    }
    if (raw.preferenceToken != null && typeof raw.preferenceToken !== 'string') {
      return NextResponse.json({ error: 'Invalid preference token.' }, { status: 400 })
    }

    const rateLimit = await subscriptionRateLimit(request, email)
    if (rateLimit === 'unavailable') {
      return NextResponse.json(
        { error: 'Subscription protection is temporarily unavailable. Please try again.' },
        { status: 503 },
      )
    }
    if (rateLimit === 'limited') {
      return NextResponse.json(
        { error: 'Too many requests. Please try again shortly.' },
        { status: 429, headers: { 'Retry-After': '600' } },
      )
    }

    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured')
      return NextResponse.json(
        { error: 'Email service not configured. Please try again later.' },
        { status: 500 },
      )
    }

    if (hasExplicitTopics || preferenceToken) {
      if (!PREFERENCES_SECRET) {
        console.error('NEWSLETTER_PREFERENCES_SECRET not configured')
        return NextResponse.json(
          { error: 'Preference confirmation is temporarily unavailable.' },
          { status: 503 },
        )
      }

      if (!preferenceToken) {
        await sendPreferenceConfirmation(email, explicitTopics ?? [])
        return NextResponse.json(
          {
            success: true,
            confirmationRequired: true,
            message:
              'Check your inbox. Preferences are unchanged until you open the link and re-enter your email.',
          },
          { status: 202 },
        )
      }

      const tokenTopics = topicsFromPreferenceToken(email, preferenceToken)
      if (!tokenTopics || (explicitTopics && !sameTopics(explicitTopics, tokenTopics))) {
        return NextResponse.json(
          { error: 'This preference confirmation is invalid or expired.' },
          { status: 401 },
        )
      }

      const topicResponse = await updateContactTopics(email, tokenTopics).catch(() => null)
      if (!topicResponse?.ok) {
        console.error('Resend verified topic preference update failed', topicResponse?.status)
        return NextResponse.json(
          { error: 'The verified preferences could not be saved. Please try again.' },
          { status: 502 },
        )
      }

      return NextResponse.json({
        success: true,
        confirmationRequired: false,
        updated: true,
        welcomeSent: false,
        message: 'Your verified email preferences are saved.',
      })
    }

    const growthCapture = await captureGrowthLead(request, {
      email,
      name,
      listType,
      source,
      intention,
      raw,
    })
    if (!growthCapture.ok) {
      return NextResponse.json(
        {
          error:
            growthCapture.status === 429
              ? 'Too many requests. Please try again shortly.'
              : 'Subscription storage is temporarily unavailable. Please try again.',
        },
        {
          status: growthCapture.status,
          headers: growthCapture.status === 429 ? { 'Retry-After': '600' } : undefined,
        },
      )
    }

    const config = LIST_CONFIG[listType]

    // Source metadata describes the signup surface only. Topic subscriptions
    // live exclusively in Resend's native topic state.
    const properties: Record<string, string> = { source: listType }
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

    if (resendResponse.status === 409) {
      return NextResponse.json({
        success: true,
        duplicate: true,
        updated: false,
        welcomeSent: false,
        message: 'This email is already on file. No duplicate email was sent.',
      })
    }

    if (!resendResponse.ok) {
      const errorData = await resendResponse.json().catch(() => ({}))
      console.error('Resend API error:', resendResponse.status, errorData)

      return NextResponse.json(
        { error: 'Failed to subscribe. Please try again.' },
        { status: 500 },
      )
    }

    const data = await resendResponse.json().catch(() => ({}))

    const configuredTopicKeys = Object.entries(TOPICS)
      .filter(([, id]) => config.topics.includes(id))
      .map(([key]) => key as keyof typeof TOPICS)
    const topicResponse = await updateContactTopics(
      email,
      configuredTopicKeys,
    ).catch(() => null)

    if (!topicResponse?.ok) {
      console.error('Resend topic opt-in failed:', topicResponse?.status)
      return NextResponse.json(
        { error: 'The subscription was created, but its topics could not be saved.' },
        { status: 502 },
      )
    }

    let welcomeSent = false
    try {
      await sendWelcomeEmail(email, name, listType, intention)
      welcomeSent = true
    } catch (error) {
      console.error('Welcome email error:', error)
    }

    if (listType === 'music-lab' && !welcomeSent) {
      return NextResponse.json(
        {
          error:
            'Your subscription was saved, but the prompt email could not be sent. Please try again.',
        },
        { status: 502 },
      )
    }

    return NextResponse.json({
      success: true,
      message:
        listType === 'music-lab'
          ? 'Check your email for your free prompts!'
          : 'Successfully subscribed!',
      subscriber: data.id,
      updated: false,
      welcomeSent,
    })
  } catch (error) {
    console.error('Subscription error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 },
    )
  }
}
