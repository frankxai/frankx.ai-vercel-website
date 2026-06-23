import { NextRequest, NextResponse } from 'next/server'
import {
  PRIVATE_ACCESS_COOKIE,
  checkPasscode,
  isPasscodeConfigured,
} from '@/lib/private-access'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * POST: validate a passcode. On success, set the access cookie and return
 * { ok: true } as JSON — the client (PasscodeGate) reloads to pick up the
 * server-rendered /engagements/strategic-advisor page.
 *
 * On failure (or if no passcode is configured server-side), surface a
 * generic 401 — never reveal whether the passcode env is set.
 */
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null)
  const passcode =
    body && typeof body === 'object' && 'passcode' in body
      ? String((body as { passcode?: unknown }).passcode ?? '')
      : ''

  if (!isPasscodeConfigured() || !checkPasscode(passcode)) {
    // Identical response either way — don't leak config state.
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
