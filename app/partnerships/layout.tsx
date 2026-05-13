import type { ReactNode } from 'react'

/**
 * /partnerships layout — server-component boundary for the route group.
 *
 * Tech-spectrum surface. The deep dark foundation (`#0a0a0b` = void) ships
 * via the site shell; this layout just provides the route boundary so future
 * partnership-specific metadata / loading states can attach here.
 */
export default function PartnershipsLayout({
  children,
}: {
  children: ReactNode
}) {
  return <div className="min-h-screen bg-[#0a0a0b]">{children}</div>
}
