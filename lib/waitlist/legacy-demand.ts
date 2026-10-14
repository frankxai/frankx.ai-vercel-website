import { createHash } from 'node:crypto'
import { NextRequest, NextResponse } from 'next/server'
import { isPriceBand, MAX_PAIN_LENGTH } from '@/lib/diagnostic/demand'
import { listTypeForIntent, sanitizeIntent } from '@/lib/diagnostic/waitlist-intents'
import { emailRatelimit, getClientIdentifier } from '@/lib/ratelimit'

const RESEND_API_KEY = process.env.RESEND_API_KEY
const AUDIENCE_ID = '4d2e913e-6903-4dd4-8749-c02cdb844331'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_EMAIL_LEN = 320
const MAX_ROLE_LEN = 80

/**
 * The pre-migration /api/demand behaviour, unchanged: the three answers are PATCHed onto the
 * existing Resend contact as properties. It stays only for callers that did not collect
 * product-specific consent (EmailSignup's step 2), because the shared handler refuses to store
 * a DemandSignal without it and inventing that consent would be worse than a split schema.
 */
export async function patchDemandProperties(request: NextRequest, raw: Record<string, unknown>) {
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
}
