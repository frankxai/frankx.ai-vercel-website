import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

// Pages that have a /de/ version available
const deAvailablePages = ['/valentines-day']

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // ─── 0. /links → /linktree redirect ─────────────────────
  if (pathname === '/links') {
    const url = request.nextUrl.clone()
    url.pathname = '/linktree'
    return NextResponse.redirect(url, 301)
  }

  // ─── 1. /md Markdown endpoint (terminal rewrite) ──────────
  if (pathname.endsWith('/md') && pathname !== '/md') {
    const contentPath = pathname.slice(0, -3)
    const url = request.nextUrl.clone()
    url.pathname = '/api/md'
    url.searchParams.set('path', contentPath)
    return NextResponse.rewrite(url)
  }

  // ─── 2. German language detection (pass-through) ──────────
  if (deAvailablePages.includes(pathname)) {
    const acceptLang = request.headers.get('accept-language') || ''
    const prefersGerman = /de(?:-[A-Z]{2})?/i.test(acceptLang)
    const hasLangPref = request.cookies.get('lang-pref')

    if (prefersGerman && !hasLangPref) {
      const response = NextResponse.next()
      response.cookies.set('x-show-lang-banner', 'de', {
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      })
      response.headers.set('x-pathname', pathname)
      return response
    }
  }

  // ─── 3. Auth redirect (defense in depth; private routes re-check on the server) ───
  // /api/admin/upload and /api/admin/verify implement their own ADMIN_SECRET
  // header/body check — they stay out of the session gate below.
  const selfGatedApiPaths = ['/api/admin/upload', '/api/admin/verify']
  const protectedPaths = ['/dashboard', '/admin', '/api/dashboard', '/api/leads', '/api/admin']
  // Exact-segment match — `startsWith` alone would also catch a future
  // public route like /admin-settings or /dashboard-assets.
  const matchesPath = (path: string) => pathname === path || pathname.startsWith(path + '/')
  const isPrivateFamilyArchiveRoute = pathname === '/family/tree' || pathname.startsWith('/familie/')
  const isProtectedRoute =
    isPrivateFamilyArchiveRoute ||
    (!selfGatedApiPaths.some(matchesPath) && protectedPaths.some(matchesPath))

  if (isProtectedRoute) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    })

    if (!token) {
      if (isPrivateFamilyArchiveRoute) {
        const familyGatewayUrl = new URL('/familie', request.url)
        familyGatewayUrl.searchParams.set('zugang', 'erforderlich')
        return NextResponse.redirect(familyGatewayUrl)
      }

      const signInUrl = new URL('/auth/signin', request.url)
      signInUrl.searchParams.set('callbackUrl', request.url)
      return NextResponse.redirect(signInUrl)
    }
  }

  // ─── 4. Forward pathname for soft-404 routing ──────────────
  // The 404 page (app/not-found.tsx) runs server-side fuzzy match against
  // data/route-index.json to suggest the most likely intended page. It needs
  // the requested pathname, which Next.js doesn't expose to server components
  // by default — so we forward it via header.
  const response = NextResponse.next()
  response.headers.set('x-pathname', pathname)
  return response
}

export const config = {
  // Match all paths except API routes, static files, and Next.js internals.
  // Auth-gated paths (/dashboard, /admin, /api/dashboard, /api/leads, /api/admin) and
  // language/redirect logic still trigger via the explicit checks inside
  // the proxy function above — they don't need to be in the matcher.
  //
  // Exceptions:
  //   - /api/dashboard, /api/leads, /api/admin stay protected via explicit matcher entries
  //   - everything under /api/* (except those three), static assets, and Next
  //     internals are excluded for perf reasons.
  matcher: [
    '/api/dashboard/:path*',
    '/api/leads/:path*',
    '/api/admin/:path*',
    '/((?!api/|_next/static|_next/image|_next/data|favicon.ico|robots.txt|sitemap.xml|llms.txt|llms-full.txt|images/|fonts/).*)',
  ],
}
