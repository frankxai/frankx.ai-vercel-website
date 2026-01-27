import NextAuth from 'next-auth'
import { authOptions } from '@/lib/auth'

/**
 * NextAuth API Route Handler
 *
 * Handles all authentication endpoints:
 * - /api/auth/signin - Login page
 * - /api/auth/signout - Logout
 * - /api/auth/session - Session check
 * - /api/auth/csrf - CSRF token
 */

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
