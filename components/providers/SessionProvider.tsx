'use client'

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'

/**
 * Client-side Session Provider
 *
 * Wraps the app to provide authentication context.
 * Required for useSession() hook in client components.
 */

export default function SessionProvider({ children }: { children: ReactNode }) {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
}
