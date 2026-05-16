import type { ReactNode } from 'react'

/**
 * /work layout — server-component boundary for the route group.
 *
 * Tech-spectrum surface. The deep dark foundation (`#0a0a0b` = void) ships
 * via the site shell; this layout just provides the route boundary so future
 * work-specific metadata / loading states can attach here.
 *
 * /work is the engagements hub — substrate-provider, whitelabel, creator
 * builds, advisory. Sister surface to /partnerships (model/cloud/silicon
 * provider relationships) — both share the tech-spectrum visual language.
 */
export default function WorkLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-[#0a0a0b]">{children}</div>
}
