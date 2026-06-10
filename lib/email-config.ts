/**
 * Email & Newsletter configuration — single source of truth.
 *
 * All from-addresses, audience IDs, topic IDs, list types, and HMAC
 * token helpers for double-opt-in + unsubscribe flows live here.
 *
 * If you change Resend audience/topic IDs, change them once here.
 */

import { createHmac, timingSafeEqual } from 'crypto'

// ─── Resend identity ─────────────────────────────────────────────

export const RESEND_AUDIENCE_ID = '4d2e913e-6903-4dd4-8749-c02cdb844331'

export const RESEND_TOPICS = {
  newsletter: 'b613f6ff-9c56-4b4c-86df-9217843c5d78',
  'music-suno': '018a5159-10c8-4595-8ecc-63d7a2c6b442',
  'product-updates': '811064ed-7444-45db-9a2a-fd8c83a21053',
} as const

export type ListType =
  | 'newsletter'
  | 'creation-chronicles'
  | 'ai-architect'
  | 'family'
  | 'music-lab'
  | 'soul-frequency'
  | 'ikigai-branding'
  | 'guides-download'
  | 'general'

// ─── From-address ────────────────────────────────────────────────

export const FROM_ADDRESS = 'Frank <frank@mail.frankx.ai>'
export const REPLY_TO = 'frank@frankx.ai'

// ─── Site URL (used in confirmation + unsubscribe links) ─────────

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://frankx.ai'

// ─── HMAC helpers for confirmation + unsubscribe tokens ──────────

/**
 * Secret used to sign confirmation + unsubscribe tokens.
 * In production this should be `process.env.NEWSLETTER_TOKEN_SECRET`
 * (a 32+ char random string). Falls back to a deterministic value
 * so dev works without env config — but DO NOT rely on the fallback
 * in production.
 */
function tokenSecret(): string {
  const secret = process.env.NEWSLETTER_TOKEN_SECRET
  if (!secret && process.env.NODE_ENV === 'production') {
    throw new Error('NEWSLETTER_TOKEN_SECRET is required in production')
  }
  return secret || 'frankx-newsletter-token-dev-fallback-NOT-FOR-PROD'
}

/** Sign a payload (email + action) → URL-safe base64 token. */
export function signToken(email: string, action: 'confirm' | 'unsubscribe'): string {
  const payload = `${action}:${email.toLowerCase().trim()}`
  const mac = createHmac('sha256', tokenSecret()).update(payload).digest('base64url')
  return mac
}

/** Verify a token. Returns true if signature matches. */
export function verifyToken(
  email: string,
  action: 'confirm' | 'unsubscribe',
  token: string,
): boolean {
  try {
    const expected = signToken(email, action)
    const a = Buffer.from(expected)
    const b = Buffer.from(token)
    if (a.length !== b.length) return false
    return timingSafeEqual(a, b)
  } catch {
    return false
  }
}

// ─── URL builders ────────────────────────────────────────────────

export function confirmUrl(email: string): string {
  const token = signToken(email, 'confirm')
  const u = new URL(`${SITE_URL}/api/subscribe/confirm`)
  u.searchParams.set('email', email.toLowerCase().trim())
  u.searchParams.set('token', token)
  return u.toString()
}

export function unsubscribeUrl(email: string): string {
  const token = signToken(email, 'unsubscribe')
  const u = new URL(`${SITE_URL}/api/unsubscribe`)
  u.searchParams.set('email', email.toLowerCase().trim())
  u.searchParams.set('token', token)
  return u.toString()
}

// ─── Required-by-Resend headers for compliance ───────────────────

/**
 * Returns the headers every transactional/newsletter email must include
 * for CAN-SPAM + Resend's deliverability requirements.
 *
 * `List-Unsubscribe` is the RFC 8058 header; some inboxes (Gmail, Apple
 * Mail) parse it for one-click unsubscribe.
 */
export function complianceHeaders(email: string): Record<string, string> {
  const u = unsubscribeUrl(email)
  return {
    'List-Unsubscribe': `<${u}>`,
    'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
  }
}
