import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { matchRoute } from '@/lib/fuzzy-route-match'
import NotFoundClient from './_components/NotFoundClient'

/**
 * Soft-404 with semantic route recovery.
 *
 * Runs as a server component on every unmatched request. Reads the requested
 * pathname from the `x-pathname` header (set by middleware.ts) and runs a
 * server-side fuzzy match against data/route-index.json (built at prebuild time
 * from lib/route-enumeration.mjs).
 *
 * Behavior per Frank's policy (2026-05-21 plan):
 *   - Curated aliases (data/redirect-aliases.json) → handled by next.config.mjs
 *     `redirects()` BEFORE we get here, so they 301 cleanly without ever touching
 *     this page. If somehow one slips through, we honor it with a 308.
 *   - Fuzzy matches → ALWAYS render as suggestions, never auto-redirect.
 *     This keeps SEO clean (one 404 hop, no misroute risk) and lets the user
 *     verify intent before clicking.
 *
 * No phone-home in Phase 1 — the /api/404/log endpoint lands in Phase 2 and
 * gets wired into the client component then.
 */
export default async function NotFound() {
  const h = await headers()
  const pathname = h.get('x-pathname') ?? '/'

  const { matches, topConfidence, aliasHit } = matchRoute(pathname)

  // Safety net: if an alias is in the corpus but next.config didn't catch it
  // (e.g. case mismatch, edge config drift), redirect manually.
  if (aliasHit && aliasHit !== pathname) {
    redirect(aliasHit)
  }

  return (
    <NotFoundClient
      pathname={pathname}
      matches={matches}
      topConfidence={topConfidence}
    />
  )
}
