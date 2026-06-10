import { type NextRequest, NextResponse } from 'next/server'
import { timingSafeEqual } from 'crypto'

/**
 * Shared admin auth for protected API routes.
 *
 * Fail-closed: the admin secret comes ONLY from `process.env.ADMIN_SECRET`.
 * There is intentionally NO hardcoded fallback — if the env var is unset, every
 * admin request is rejected (503) rather than falling back to a public,
 * committed password.
 */
export function getAdminSecret(): string | null {
  const secret = process.env.ADMIN_SECRET
  return secret && secret.length > 0 ? secret : null
}

/** Constant-time string comparison (avoids leaking the secret via timing). */
export function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a)
  const bb = Buffer.from(b)
  if (ab.length !== bb.length) return false
  return timingSafeEqual(ab, bb)
}

/**
 * Returns a NextResponse to short-circuit with when the request is NOT
 * authorized, or `null` when it is. Usage:
 *
 *   const denied = requireAdmin(request)
 *   if (denied) return denied
 */
export function requireAdmin(request: NextRequest): NextResponse | null {
  const secret = getAdminSecret()
  if (!secret) {
    return NextResponse.json(
      { error: 'Admin access is not configured (ADMIN_SECRET unset).' },
      { status: 503 }
    )
  }
  const provided = request.headers.get('x-admin-secret')
  if (!provided || !safeEqual(provided, secret)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  return null
}
