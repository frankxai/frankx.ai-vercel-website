'use server'

import { redirect } from 'next/navigation'

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

export async function subscribeToNewsletter(formData: FormData) {
  const email = (formData.get('email') as string)?.trim().toLowerCase()
  const redirectTo = formData.get('redirect') as string | null

  if (!email || !email.includes('@')) {
    return { error: 'Valid email address required' }
  }

  try {
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
      // Fallback: log only
      console.log('Newsletter signup (no provider configured):', email)
    }

    if (!outcome.ok) {
      return { error: 'Subscription failed. Please try again.' }
    }

    if (redirectTo) {
      redirect(redirectTo)
    }

    return { success: true, message: 'Successfully subscribed!' }
  } catch (error) {
    console.error('Newsletter signup error:', error)
    return { error: 'Internal server error. Please try again later.' }
  }
}
