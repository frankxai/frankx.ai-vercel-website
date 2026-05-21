/**
 * workshop-portal.ts
 *
 * Stateless HMAC token auth for the attendee self-serve portal.
 *
 * Token format:
 *   base64url( personId + ':' + workshopId + ':' + expiryUnixMs ) + '.' + base64url( HMAC-SHA256 )
 *
 * No session store. No database. Verifiable server-side in the RSC.
 *
 * SECRET env var: WORKSHOP_PORTAL_SECRET
 * If not set, all token operations return null (portal shows "not configured").
 */

import { createHmac, timingSafeEqual } from 'crypto'

// ─── Types ────────────────────────────────────────────────────────

export interface PortalTokenPayload {
  personId: string
  workshopId: string
  expiresAt: number // Unix ms
}

// ─── Encoding helpers ─────────────────────────────────────────────

function toBase64Url(input: string | Buffer): string {
  const buf = typeof input === 'string' ? Buffer.from(input, 'utf8') : input
  return buf.toString('base64url')
}

function fromBase64Url(input: string): string {
  return Buffer.from(input, 'base64url').toString('utf8')
}

// ─── HMAC ─────────────────────────────────────────────────────────

function sign(payload: string, secret: string): string {
  return createHmac('sha256', secret).update(payload).digest('base64url')
}

// ─── Public API ───────────────────────────────────────────────────

/**
 * Sign a token for a person+workshop combination.
 * Returns null if WORKSHOP_PORTAL_SECRET is not configured.
 *
 * @param personId - CRM person ID (e.g. "p_r3k9x2m7")
 * @param workshopId - CRM workshop ID (e.g. "w_nldigital_may19")
 * @param expiresInDays - Token lifetime in days (default: 30)
 */
export function signToken(
  personId: string,
  workshopId: string,
  expiresInDays = 30
): string | null {
  const secret = process.env.WORKSHOP_PORTAL_SECRET
  if (!secret) return null

  const expiresAt = Date.now() + expiresInDays * 24 * 60 * 60 * 1000
  const rawPayload = `${personId}:${workshopId}:${expiresAt}`
  const encodedPayload = toBase64Url(rawPayload)
  const signature = sign(rawPayload, secret)

  return `${encodedPayload}.${signature}`
}

/**
 * Verify a portal token.
 * Returns the payload if valid and not expired, null otherwise.
 * Never throws — all errors return null.
 *
 * Deliberately does not distinguish between "expired" and "invalid"
 * to avoid leaking information to clients.
 */
export function verifyToken(token: string): PortalTokenPayload | null {
  const secret = process.env.WORKSHOP_PORTAL_SECRET
  if (!secret) return null

  try {
    const dotIndex = token.lastIndexOf('.')
    if (dotIndex === -1) return null

    const encodedPayload = token.slice(0, dotIndex)
    const suppliedSig = token.slice(dotIndex + 1)

    const rawPayload = fromBase64Url(encodedPayload)
    const parts = rawPayload.split(':')
    if (parts.length !== 3) return null

    const [personId, workshopId, expiresAtStr] = parts
    const expiresAt = parseInt(expiresAtStr, 10)
    if (isNaN(expiresAt)) return null

    // Timing-safe signature comparison
    const expectedSig = sign(rawPayload, secret)
    const suppliedBuf = Buffer.from(suppliedSig, 'base64url')
    const expectedBuf = Buffer.from(expectedSig, 'base64url')

    if (suppliedBuf.length !== expectedBuf.length) return null
    if (!timingSafeEqual(suppliedBuf, expectedBuf)) return null

    // Check expiry
    if (Date.now() > expiresAt) return null

    return { personId, workshopId, expiresAt }
  } catch {
    return null
  }
}
