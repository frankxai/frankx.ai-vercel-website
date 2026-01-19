/* eslint-disable @typescript-eslint/no-explicit-any */
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

const { handlers } = NextAuth(authOptions) as any

export const GET = handlers.GET
export const POST = handlers.POST
