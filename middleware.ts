import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

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

export default withAuth(
  function middleware(req) {
    // Additional middleware logic can go here
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
    pages: {
      signIn: '/auth/signin'
    }
  }
)

// Specify which routes require authentication
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/dashboard/:path*',
    '/api/leads/:path*'
  ]
}
