import type { NextAuthConfig } from 'next-auth'

/**
 * Auth.js throws UnknownAction for any request under /api/auth that maps to no
 * action: a scanner asking for /api/auth/config, or an OPTIONS request. Auth.js
 * already answers those with a 400, so the request is handled and only the log
 * level is wrong. They log as warnings here so they stop counting as runtime
 * errors. Every other error keeps the Auth.js default level and format.
 */
export const authLogger: NonNullable<NextAuthConfig['logger']> = {
  error(error) {
    const type = (error as { type?: unknown }).type

    if (type === 'UnknownAction') {
      console.warn(`[auth][warn] UnknownAction: ${error.message}`)
      return
    }

    console.error(`[auth][error] ${typeof type === 'string' ? type : error.name}: ${error.message}`)

    const cause = error.cause
    if (cause && typeof cause === 'object' && 'err' in cause && cause.err instanceof Error) {
      const { err, ...details } = cause
      console.error('[auth][cause]:', err.stack)
      console.error('[auth][details]:', JSON.stringify(details, null, 2))
    } else if (error.stack) {
      console.error(error.stack.replace(/.*/, '').substring(1))
    }
  },
}
