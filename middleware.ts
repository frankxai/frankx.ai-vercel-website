import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

/**
 * Authentication Middleware
 *
 * Protects sensitive routes that contain PII and analytics data:
 * - /dashboard/* - All dashboard pages
 * - /api/dashboard/* - Dashboard API routes
 * - /api/leads/* - Lead management APIs
 *
 * Redirects unauthenticated users to /auth/signin
 */

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  })

  // Check if user is authenticated
  if (!token) {
    // Redirect to signin page
    const signInUrl = new URL('/auth/signin', request.url)
    signInUrl.searchParams.set('callbackUrl', request.url)
    return NextResponse.redirect(signInUrl)
  }

  // User is authenticated, proceed
  return NextResponse.next()
}

// Specify which routes require authentication
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/dashboard/:path*',
    '/api/leads/:path*'
  ]
}
