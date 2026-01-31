import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { homepageTest, getRandomVariant } from '@/lib/ab-testing'

/**
 * Combined Middleware
 *
 * 1. A/B Testing: Sets variant cookie for homepage visitors
 * 2. Authentication: Protects dashboard and API routes
 */

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // =========================================
  // A/B TESTING - Homepage variant assignment
  // =========================================
  if (pathname === '/' && homepageTest.enabled) {
    const response = NextResponse.next()
    const existingVariant = request.cookies.get(homepageTest.cookieName)

    // Only set cookie if not already set
    if (!existingVariant) {
      const variant = getRandomVariant(homepageTest)
      response.cookies.set(homepageTest.cookieName, variant, {
        maxAge: homepageTest.cookieMaxAge,
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      })
    }

    return response
  }

  // =========================================
  // AUTHENTICATION - Protected routes
  // =========================================
  const protectedPaths = ['/dashboard', '/api/dashboard', '/api/leads']
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

// Routes that need middleware processing
export const config = {
  matcher: [
    '/',
    '/dashboard/:path*',
    '/api/dashboard/:path*',
    '/api/leads/:path*'
  ]
}
