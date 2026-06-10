/**
 * Newsletter unsubscribe endpoint.
 *
 * Required for CAN-SPAM compliance. Every email we send includes a
 * one-click unsubscribe link with an HMAC-signed token so that only the
 * email owner (who received the token) can flip the bit.
 *
 * GET  /api/unsubscribe?email=foo@bar.com&token=...   (link click)
 * POST /api/unsubscribe?email=foo@bar.com&token=...   (RFC 8058 one-click)
 */

import { NextResponse } from 'next/server'
import {
  RESEND_AUDIENCE_ID,
  SITE_URL,
  verifyToken,
} from '@/lib/email-config'

async function unsubscribe(request: Request): Promise<Response> {
  const url = new URL(request.url)
  const email = url.searchParams.get('email')?.toLowerCase().trim()
  const token = url.searchParams.get('token')
  // RFC 8058: mail clients send a programmatic POST and expect a 200,
  // not a redirect. Humans clicking the link arrive via GET and get the
  // landing page.
  const isPost = request.method === 'POST'

  if (!email || !token) {
    if (isPost) return new Response('Missing parameters', { status: 400 })
    return NextResponse.redirect(`${SITE_URL}/newsletter/unsubscribe?status=missing`)
  }

  if (!verifyToken(email, 'unsubscribe', token)) {
    if (isPost) return new Response('Invalid token', { status: 400 })
    return NextResponse.redirect(`${SITE_URL}/newsletter/unsubscribe?status=invalid`)
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY
  if (!RESEND_API_KEY) {
    console.error('RESEND_API_KEY not configured')
    if (isPost) return new Response('Configuration error', { status: 500 })
    return NextResponse.redirect(`${SITE_URL}/newsletter/unsubscribe?status=error`)
  }

  const resendResp = await fetch(
    `https://api.resend.com/audiences/${RESEND_AUDIENCE_ID}/contacts/${encodeURIComponent(email)}`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ unsubscribed: true }),
    },
  )

  if (!resendResp.ok) {
    const detail = await resendResp.text().catch(() => '')
    console.error('Resend unsubscribe error:', resendResp.status, detail)
    if (isPost) return new Response('Failed to unsubscribe', { status: 500 })
    return NextResponse.redirect(`${SITE_URL}/newsletter/unsubscribe?status=error`)
  }

  if (isPost) return new Response('OK', { status: 200 })

  return NextResponse.redirect(`${SITE_URL}/newsletter/unsubscribe?status=ok`)
}

export async function GET(request: Request) {
  return unsubscribe(request)
}

export async function POST(request: Request) {
  return unsubscribe(request)
}
