import { NextRequest, NextResponse } from 'next/server'
import {
  PRIVATE_ACCESS_COOKIE,
  checkPasscode,
  isPasscodeConfigured,
} from '@/lib/private-access'
import { clientKey, rateLimited } from '@/lib/rate-limit'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/** Hard upper bound on a passcode payload — anything past this is abuse. */
const MAX_PASSCODE_LENGTH = 256

/**
 * POST: validate a passcode. On success, set the access cookie and return
 * { ok: true } as JSON — the client (PasscodeGate) reloads to pick up the
 * server-rendered /engagements/strategic-advisor page.
 *
 * On failure (or if no passcode is configured server-side), surface a
 * generic 401 — never reveal whether the passcode env is set.
 *
 * Rate-limited per IP via the shared limiter so the door isn't only as
 * strong as brute-force cost. Same 5-req/min/IP as /api/intake — the
 * passcode-holder pool is small and won't bump up against this in practice.
 */
export async function POST(request: NextRequest) {
  if (rateLimited('private-access', clientKey(request))) {
    return NextResponse.json(
      { ok: false, error: 'Too many requests. Please try again shortly.' },
      { status: 429, headers: { 'Retry-After': '60' } },
    )
  }

  const body = await request.json().catch(() => null)

  // Boundary validation: only a string passcode under the length cap.
  // Reject everything else with the same generic 401 so we don't leak the
  // shape of the expected payload.
  const raw =
    body && typeof body === 'object'
      ? (body as { passcode?: unknown }).passcode
      : undefined
  const passcode =
    typeof raw === 'string' && raw.length > 0 && raw.length <= MAX_PASSCODE_LENGTH
      ? raw
      : null

  if (!passcode || !isPasscodeConfigured() || !checkPasscode(passcode)) {
    return NextResponse.json(
      { ok: false, error: 'Access denied.' },
      { status: 401 },
    )
  }

  const res = NextResponse.json({ ok: true })
  res.cookies.set(PRIVATE_ACCESS_COOKIE, passcode, {
    httpOnly: true,
    // Only require Secure in production. Local dev runs on http://localhost,
    // and Secure would silently drop the cookie there.
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    // 30 days — passcode-holders are pre-qualified; long session is fine.
    maxAge: 60 * 60 * 24 * 30,
  })
  return res
}
