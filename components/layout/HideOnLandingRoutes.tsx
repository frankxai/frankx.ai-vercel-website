'use client'

import { usePathname } from 'next/navigation'

const LANDING_PREFIXES = ['/connect']

export function HideOnLandingRoutes({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? ''
  const isLanding = LANDING_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))
  if (isLanding) return null
  return <>{children}</>
}
