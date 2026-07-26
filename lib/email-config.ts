import crypto from 'crypto'
import { Resend } from 'resend'

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || 'https://www.frankx.ai'
export const NEWSLETTER_AUDIENCE_ID =
  process.env.RESEND_AUDIENCE_ID || '4d2e913e-6903-4dd4-8749-c02cdb844331'

const TOKEN_SECRET = process.env.EMAIL_TOKEN_SECRET || process.env.NEWSLETTER_TOKEN_SECRET || ''
const RESEND_API_KEY = process.env.RESEND_API_KEY || ''

export type EmailTokenPurpose = 'confirm' | 'unsubscribe'

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase()
}

export function signEmailToken(email: string, purpose: EmailTokenPurpose): string {
  if (!TOKEN_SECRET) return ''

  return crypto
    .createHmac('sha256', TOKEN_SECRET)
    .update(`${purpose}:${normalizeEmail(email)}`)
    .digest('hex')
}

export function verifyEmailToken(email: string, purpose: EmailTokenPurpose, token: string): boolean {
  const expected = signEmailToken(email, purpose)
  if (!expected || !token || expected.length !== token.length) return false

  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(token))
}

/**
 * One-click unsubscribe link for email footers. Falls back to the plain
 * /unsubscribe page (manual reply-based opt-out, still CAN-SPAM compliant)
 * when EMAIL_TOKEN_SECRET isn't configured, so a missing env var degrades
 * gracefully instead of shipping a link that always fails verification.
 */
export function buildUnsubscribeUrl(email: string): string {
  const token = signEmailToken(email, 'unsubscribe')
  if (!token) return `${SITE_URL}/unsubscribe`

  const url = new URL('/api/unsubscribe', SITE_URL)
  url.searchParams.set('email', normalizeEmail(email))
  url.searchParams.set('token', token)
  return url.toString()
}

export async function updateResendContact(email: string, unsubscribed: boolean) {
  if (!RESEND_API_KEY) {
    return { ok: false, reason: 'missing-resend-api-key' as const }
  }

  const resend = new Resend(RESEND_API_KEY)
  const { error } = await resend.contacts.update({
    email: normalizeEmail(email),
    unsubscribed,
  })

  if (error) {
    return { ok: false, reason: error.message || 'resend-update-failed' }
  }

  return { ok: true, reason: 'updated' as const }
}
