import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

// Pages that have a /de/ version available
const deAvailablePages = ['/valentines-day']

// ─── Mind Palace gate helpers ──────────────────────────────
// The 3D memory palace is proxied from frankx.ai/mind-palace (see next.config
// rewrites) and gated behind a shared password. SHA-256(password) cookie, scoped
// to /mind-palace. Fails closed when MIND_PALACE_PASSWORD is unset.
const MP_COOKIE = 'mp_access'

async function mpSha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input)
  const digest = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

function mindPalacePrompt(status: number, message = ''): NextResponse {
  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Mind Palace — private</title>
<style>
  :root { color-scheme: dark; }
  body { margin:0; min-height:100vh; display:grid; place-items:center;
    background:#07070b; color:#e8e8ee; font:16px/1.5 ui-sans-serif,system-ui,sans-serif; }
  .card { width:min(92vw,360px); padding:32px; border:1px solid rgba(255,255,255,.08);
    border-radius:16px; background:rgba(255,255,255,.03); backdrop-filter:blur(8px); text-align:center; }
  h1 { font-size:18px; font-weight:600; margin:0 0 4px; }
  p { margin:0 0 20px; color:#9aa0ad; font-size:13px; }
  input { width:100%; box-sizing:border-box; padding:11px 13px; border-radius:10px;
    border:1px solid rgba(255,255,255,.12); background:#0e0e15; color:#fff; font-size:15px; }
  button { width:100%; margin-top:12px; padding:11px; border:0; border-radius:10px;
    background:#7da3ff; color:#06060a; font-weight:600; font-size:15px; cursor:pointer; }
  .err { color:#ff8a8a; font-size:12px; min-height:16px; margin-top:10px; }
</style></head>
<body><form class="card" method="POST">
  <h1>Mind Palace</h1>
  <p>This room is private. Enter the password to continue.</p>
  <input type="password" name="password" autocomplete="current-password" autofocus required />
  <button type="submit">Enter</button>
  <div class="err">${message}</div>
</form></body></html>`
  return new NextResponse(html, {
    status,
    headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' },
  })
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // ─── 0a. Mind Palace password gate ────────────────────────
  if (pathname === '/mind-palace' || pathname.startsWith('/mind-palace/')) {
    const password = process.env.MIND_PALACE_PASSWORD || ''
    if (!password) return mindPalacePrompt(503, 'Gate not configured.')
    const expected = await mpSha256Hex(password)
    if (request.cookies.get(MP_COOKIE)?.value !== expected) {
      if (request.method === 'POST') {
        const form = await request.formData()
        const submitted = String(form.get('password') || '')
        if (submitted && (await mpSha256Hex(submitted)) === expected) {
          const res = NextResponse.redirect(new URL(pathname, request.url))
          res.cookies.set(MP_COOKIE, expected, {
            httpOnly: true,
            sameSite: 'lax',
            secure: true,
            path: '/mind-palace',
            maxAge: 60 * 60 * 24 * 30,
          })
          return res
        }
        return mindPalacePrompt(401, 'Wrong password.')
      }
      return mindPalacePrompt(401)
    }
    // Authed → fall through so the next.config rewrite proxies to PALACE_ORIGIN.
  }

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

  // ─── 3. Auth protection (existing) ────────────────────────
  const protectedPaths = ['/dashboard', '/admin', '/api/dashboard', '/api/leads']
  const isProtectedRoute = protectedPaths.some(path => pathname.startsWith(path))

  if (isProtectedRoute) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    })

    if (!token) {
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
  // Auth-gated paths (/dashboard, /admin, /api/dashboard, /api/leads) and
  // language/redirect logic still trigger via the explicit checks inside
  // the proxy function above — they don't need to be in the matcher.
  //
  // Exceptions:
  //   - /api/dashboard + /api/leads stay protected via explicit matcher entries
  //   - everything under /api/* (except those two), static assets, and Next
  //     internals are excluded for perf reasons.
  matcher: [
    '/api/dashboard/:path*',
    '/api/leads/:path*',
    '/((?!api/|_next/static|_next/image|_next/data|favicon.ico|robots.txt|sitemap.xml|llms.txt|llms-full.txt|images/|fonts/).*)',
  ],
}
