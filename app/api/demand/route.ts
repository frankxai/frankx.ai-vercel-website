import { createHash } from 'node:crypto'
import { NextRequest, NextResponse } from 'next/server'
import { isPriceBand, MAX_PAIN_LENGTH } from '@/lib/diagnostic/demand'
import { listTypeForIntent, sanitizeIntent } from '@/lib/diagnostic/waitlist-intents'
import { emailRatelimit, getClientIdentifier } from '@/lib/ratelimit'

export const runtime = 'nodejs'

const RESEND_API_KEY = process.env.RESEND_API_KEY
const AUDIENCE_ID = '4d2e913e-6903-4dd4-8749-c02cdb844331'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_EMAIL_LEN = 320
const MAX_ROLE_LEN = 80

/**
 * Step 2 of the waitlist — the three demand questions, asked after the email is already
 * captured so skipping them costs no signups. They are a PATCH rather than a second POST
 * because /api/subscribe short-circuits on an existing contact (409) and would drop them.
 *
 * Answering is never required and a failure here is never surfaced as a blocked signup:
 * the person is already on the list.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null)
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
    }
    const raw = body as Record<string, unknown>

    const email = String(raw.email ?? '').trim().toLowerCase()
    if (!email || email.length > MAX_EMAIL_LEN || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address' }, { status: 400 })
    }

    const intent = sanitizeIntent(raw.intent)

    const priceBand = isPriceBand(raw.priceBand) ? raw.priceBand : ''
    const role = String(raw.role ?? '').trim().slice(0, MAX_ROLE_LEN)
    const pain = String(raw.pain ?? '').trim().slice(0, MAX_PAIN_LENGTH)

    if (!priceBand && !role && !pain) {
      return NextResponse.json({ error: 'Nothing to record.' }, { status: 400 })
    }

    const emailDigest = createHash('sha256').update(email).digest('hex')
    const limited = await Promise.all([
      emailRatelimit.limit(`demand:ip:${getClientIdentifier(request)}`),
      emailRatelimit.limit(`demand:email:${emailDigest}`),
    ])
      .then((results) => results.some((result) => !result.success))
      .catch(() => true)
    if (limited) {
      return NextResponse.json({ error: 'Too many requests. Please try again shortly.' }, { status: 429 })
    }

    if (!RESEND_API_KEY) {
      console.error('Demand capture: RESEND_API_KEY is not configured')
      return NextResponse.json({ error: 'Not configured.' }, { status: 503 })
    }

    // Rebuilds the full property set rather than merging, because Resend replaces
    // `properties` wholesale. `source` mirrors what /api/subscribe wrote in step 1.
    const properties: Record<string, string> = { source: listTypeForIntent(intent) }
    if (intent) properties.intent = intent
    if (priceBand) properties.price_band = priceBand
    if (role) properties.role = role
    if (pain) properties.pain = pain

    const response = await fetch(
      `https://api.resend.com/audiences/${AUDIENCE_ID}/contacts/${encodeURIComponent(email)}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ properties }),
      },
    )

    if (!response.ok) {
      console.error('Demand capture: Resend rejected the update', response.status)
      return NextResponse.json({ error: 'Could not save your answers.' }, { status: 502 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Demand capture error:', error)
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 })
  }
}
