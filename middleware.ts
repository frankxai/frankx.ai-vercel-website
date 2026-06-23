import { NextRequest, NextResponse } from 'next/server'

/**
 * Admin gate.
 *
 * Every `/admin/*` route is server-rendered with PII (names, emails,
 * messages from /api/intake). Without this gate, the URL is open to anyone
 * who guesses or links to it — and `/admin/intake` does exactly that.
 *
 * Mechanics:
 *   - `ADMIN_TOKEN` env var must be set in production. Without it, /admin/*
 *     is unreachable (fail-closed).
 *   - Access is granted when a request carries the token in either the
 *     `admin-token` cookie or the `?token=` query param (the latter lets
 *     Frank set the cookie via a one-time URL on a fresh device).
 *   - Mismatch → redirect to /, the token never appears in logs or error
 *     pages.
 *
 * This is intentionally not a session system; the admin surface is for one
 * operator. If the surface ever grows beyond Frank, replace with NextAuth.
 */

const ADMIN_TOKEN = process.env.ADMIN_TOKEN

export function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith('/admin')) return

  // Fail-closed: if no token is configured server-side, no one gets in.
  if (!ADMIN_TOKEN) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  const cookieToken = request.cookies.get('admin-token')?.value
  const queryToken = request.nextUrl.searchParams.get('token')

  // Accept the query-token (useful for first-time access from a new device)
  // and persist it as the cookie for the rest of the session.
  if (queryToken && queryToken === ADMIN_TOKEN) {
    const url = new URL(request.nextUrl)
    url.searchParams.delete('token')
    const res = NextResponse.redirect(url)
    res.cookies.set('admin-token', ADMIN_TOKEN, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/admin',
      maxAge: 60 * 60 * 24 * 30,
    })
    return res
  }

  if (cookieToken === ADMIN_TOKEN) return

  return NextResponse.redirect(new URL('/', request.url))
}

export const config = {
  matcher: ['/admin/:path*'],
}
