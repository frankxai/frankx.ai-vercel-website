import { NextRequest, NextResponse } from 'next/server'

// Same Resend audience as app/api/subscribe/route.ts — the canonical list.
const RESEND_AUDIENCE_ID = '4d2e913e-6903-4dd4-8749-c02cdb844331'

async function subscribeConvertKit(email: string) {
  const apiKey = process.env.CONVERTKIT_API_KEY
  const formId = process.env.CONVERTKIT_FORM_ID
  if (!apiKey || !formId) return { ok: false, reason: 'ConvertKit env missing' }
  const res = await fetch(`https://api.convertkit.com/v3/forms/${formId}/subscribe`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ api_key: apiKey, email })
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
    body: JSON.stringify({ email_address: email, status: 'subscribed' })
  })
  return { ok: res.ok, status: res.status }
}

async function subscribeWebhook(email: string) {
  const hook = process.env.NEWSLETTER_WEBHOOK_URL
  if (!hook) return { ok: false, reason: 'Webhook env missing' }
  const res = await fetch(hook, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, source: 'frankx.ai' })
  })
  return { ok: res.ok, status: res.status }
}

async function subscribeResend(email: string) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return { ok: false, reason: 'Resend env missing' }
  const res = await fetch(`https://api.resend.com/audiences/${RESEND_AUDIENCE_ID}/contacts`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, unsubscribed: false })
  })
  // 409 = already subscribed — success from the visitor's point of view
  return { ok: res.ok || res.status === 409, status: res.status }
}

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') || ''
    let email = ''
    let isJsonClient = false

    if (contentType.includes('application/json')) {
      isJsonClient = true
      const body = await request.json().catch(() => ({}))
      email = String(body?.email || '').trim().toLowerCase()
    } else {
      const formData = await request.formData()
      email = String(formData.get('email') || '').trim().toLowerCase()
    }

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email address required' }, { status: 400 })
    }

    const provider = (process.env.NEWSLETTER_PROVIDER || '').toLowerCase()
    let outcome = { ok: true }
    if (provider === 'convertkit') {
      const r = await subscribeConvertKit(email)
      if (!r.ok) outcome = { ok: false }
    } else if (provider === 'mailchimp') {
      const r = await subscribeMailchimp(email)
      if (!r.ok) outcome = { ok: false }
    } else if (provider === 'webhook') {
      const r = await subscribeWebhook(email)
      if (!r.ok) outcome = { ok: false }
    } else {
      const r = await subscribeResend(email)
      if (!r.ok) outcome = { ok: false }
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
