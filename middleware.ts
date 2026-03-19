import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // /links → /linktree redirect (301 permanent)
  if (pathname === '/links') {
    const url = request.nextUrl.clone()
    url.pathname = '/linktree'
    return NextResponse.redirect(url, 301)
  }

  const protectedPaths = ['/dashboard', '/admin', '/api/dashboard', '/api/leads']
  const isProtectedRoute = protectedPaths.some(path => pathname.startsWith(path))

  if (isProtectedRoute) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET
    })

    if (!token) {
      const signInUrl = new URL('/auth/signin', request.url)
      signInUrl.searchParams.set('callbackUrl', request.url)
      return NextResponse.redirect(signInUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/links',
    '/dashboard/:path*',
    '/admin/:path*',
    '/api/dashboard/:path*',
    '/api/leads/:path*'
  ]
}
