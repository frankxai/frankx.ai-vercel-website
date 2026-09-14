import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Same Resend audience as app/api/subscribe/route.ts — the canonical list.
const RESEND_AUDIENCE_ID = '4d2e913e-6903-4dd4-8749-c02cdb844331'
const GROWTH_CAPTURE_URL =
  process.env.GROWTH_CAPTURE_URL ??
  'https://gfrfcqyprekhazzugdkr.supabase.co/functions/v1/growth-capture'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_EMAIL_LEN = 320
const MAX_SOURCE_LEN = 120

function optionalText(value: unknown, maxLength = MAX_SOURCE_LEN) {
  return typeof value === 'string' && value.trim()
    ? value.trim().slice(0, maxLength)
    : undefined
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

async function captureGrowthLead(
  request: NextRequest,
  email: string,
  source: string,
  raw: Record<string, unknown>,
) {
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
        email,
        program: 'frankx-newsletter',
        source,
        referrer: request.headers.get('referer') ?? undefined,
        page_path: pagePathFromReferer(request),
        utm_source: optionalText(raw.utm_source),
        utm_medium: optionalText(raw.utm_medium),
        utm_campaign: optionalText(raw.utm_campaign),
        utm_content: optionalText(raw.utm_content),
        utm_term: optionalText(raw.utm_term),
        metadata: {
          legacy_route: '/api/newsletter',
          legacy_tag: optionalText(raw.tag),
        },
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

async function subscribeConvertKit(email: string) {
  const apiKey = process.env.CONVERTKIT_API_KEY
  const formId = process.env.CONVERTKIT_FORM_ID
  if (!apiKey || !formId) return { ok: false, reason: 'ConvertKit env missing' }
  const res = await fetch(`https://api.convertkit.com/v3/forms/${formId}/subscribe`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ api_key: apiKey, email }),
  })
  return { ok: res.ok, status: res.status }
}

async function subscribeMailchimp(email: string) {
  const apiKey = process.env.MAILCHIMP_API_KEY
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID
  const dc = apiKey?.split('-')[1]
  if (!apiKey || !audienceId || !dc) return { ok: false, reason: 'Mailchimp env missing' }
  const url = `https://${dc}.api.mailchimp.com/3.0/lists/${audienceId}/members`
  const auth = Buffer.from(`anystring:${apiKey}`).toString('base64')
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Basic ${auth}` },
    body: JSON.stringify({ email_address: email, status: 'subscribed' }),
  })
  return { ok: res.ok, status: res.status }
}

async function subscribeWebhook(email: string) {
  const hook = process.env.NEWSLETTER_WEBHOOK_URL
  if (!hook) return { ok: false, reason: 'Webhook env missing' }
  const res = await fetch(hook, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, source: 'frankx.ai' }),
  })
  return { ok: res.ok, status: res.status }
}

async function subscribeResend(email: string) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return { ok: false, reason: 'Resend env missing' }
  const res = await fetch(`https://api.resend.com/audiences/${RESEND_AUDIENCE_ID}/contacts`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, unsubscribed: false }),
  })
  // 409 = already subscribed — success from the visitor's point of view
  return { ok: res.ok || res.status === 409, status: res.status }
}

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') || ''
    const isJsonClient = contentType.includes('application/json')
    let raw: Record<string, unknown> = {}

    if (isJsonClient) {
      const body = await request.json().catch(() => null)
      if (body && typeof body === 'object' && !Array.isArray(body)) {
        raw = body as Record<string, unknown>
      }
    } else {
      const formData = await request.formData()
      raw = Object.fromEntries(formData.entries())
    }

    // Keep the compatibility route safe for old forms while centralizing storage.
    const honeypot = raw.website ?? raw.company
    if (typeof honeypot === 'string' && honeypot.trim()) {
      return NextResponse.json({ success: true, message: 'Successfully subscribed!' })
    }

    const email = String(raw.email ?? '').trim().toLowerCase()
    const source = optionalText(raw.source ?? raw.tag) ?? 'legacy-newsletter'

    if (!email || email.length > MAX_EMAIL_LEN || !EMAIL_RE.test(email)) {
      return NextResponse.json(
        { error: 'Valid email address required' },
        { status: 400 },
      )
    }

    const growthCapture = await captureGrowthLead(request, email, source, raw)
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

    const provider = (process.env.NEWSLETTER_PROVIDER || '').toLowerCase()
    let outcome = { ok: true }
    if (provider === 'convertkit') {
      const result = await subscribeConvertKit(email)
      if (!result.ok) outcome = { ok: false }
    } else if (provider === 'mailchimp') {
      const result = await subscribeMailchimp(email)
      if (!result.ok) outcome = { ok: false }
    } else if (provider === 'webhook') {
      const result = await subscribeWebhook(email)
      if (!result.ok) outcome = { ok: false }
    } else {
      const result = await subscribeResend(email)
      if (!result.ok) outcome = { ok: false }
    }

    if (!outcome.ok) {
      return NextResponse.json({ error: 'Subscription failed' }, { status: 502 })
    }

    if (isJsonClient) {
      return NextResponse.json({ success: true, message: 'Successfully subscribed!' })
    }

    const thankYouUrl = new URL('/newsletter/thank-you', request.url)
    return NextResponse.redirect(thankYouUrl, 303)
  } catch (error) {
    console.error('Newsletter signup error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
