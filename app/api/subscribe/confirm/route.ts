/**
 * Newsletter double-opt-in confirmation endpoint.
 *
 * Called when a user clicks the confirmation link in their initial signup
 * email. The token is HMAC-signed at signup time; we verify the signature,
 * then PATCH the Resend contact to `unsubscribed: false` so they start
 * receiving issues.
 *
 * GET /api/subscribe/confirm?email=foo@bar.com&token=...
 */

import { NextResponse } from 'next/server'
import {
  RESEND_AUDIENCE_ID,
  SITE_URL,
  verifyToken,
} from '@/lib/email-config'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const email = url.searchParams.get('email')?.toLowerCase().trim()
  const token = url.searchParams.get('token')

  if (!email || !token) {
    return NextResponse.redirect(`${SITE_URL}/newsletter/confirm?status=missing`)
  }

  if (!verifyToken(email, 'confirm', token)) {
    return NextResponse.redirect(`${SITE_URL}/newsletter/confirm?status=invalid`)
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY
  if (!RESEND_API_KEY) {
    console.error('RESEND_API_KEY not configured')
    return NextResponse.redirect(`${SITE_URL}/newsletter/confirm?status=error`)
  }

  // Resend uses the contact's email as part of the contact lookup. The
  // `PATCH /audiences/{id}/contacts/{email-or-id}` endpoint accepts the
  // email directly.
  const resendResp = await fetch(
    `https://api.resend.com/audiences/${RESEND_AUDIENCE_ID}/contacts/${encodeURIComponent(email)}`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ unsubscribed: false }),
    },
  )

  if (!resendResp.ok) {
    const detail = await resendResp.text().catch(() => '')
    console.error('Resend confirm error:', resendResp.status, detail)
    return NextResponse.redirect(`${SITE_URL}/newsletter/confirm?status=error`)
  }

  return NextResponse.redirect(`${SITE_URL}/newsletter/confirm?status=ok`)
}
