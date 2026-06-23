import { NextRequest, NextResponse } from 'next/server'
import {
  PRIVATE_ACCESS_COOKIE,
  checkPasscode,
  isPasscodeConfigured,
} from '@/lib/private-access'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * POST: validate a passcode. On success, set the access cookie and
 * redirect to /engagements/private.
 * On failure (or if no passcode is configured server-side), surface
 * a generic error — never reveal whether the passcode env is set.
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
    secure: true,
    sameSite: 'lax',
    path: '/',
    // 30 days — passcode-holders are pre-qualified; long session is fine.
    maxAge: 60 * 60 * 24 * 30,
  })
  return res
}
