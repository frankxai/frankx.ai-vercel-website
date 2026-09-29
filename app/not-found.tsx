'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import NotFoundClient from './_components/NotFoundClient'
import type { ScoredRoute } from '@/lib/fuzzy-route-match'

/**
 * Soft-404 with semantic route recovery.
 *
 * This component runs on the client and asks /api/404/match for suggestions.
 * It used to be a server component reading the `x-pathname` header set by
 * proxy.ts — correct, but `headers()` in not-found.tsx is a dynamic API inside
 * the boundary that wraps EVERY route, which opted the entire site out of
 * static generation: 610 of 678 route patterns compiled to on-demand functions
 * and served `Cache-Control: private, no-store`, even the ones that set
 * `export const revalidate`. Reading the pathname here instead is what lets
 * those pages be prerendered again.
 *
 * Fuse.js and the 276KB data/route-index.json stay on the server behind that
 * API route rather than shipping to every visitor.
 *
 * Behavior per Frank's policy (2026-05-21 plan) is unchanged:
 *   - Curated aliases (data/redirect-aliases.json) → handled by next.config.mjs
 *     `redirects()` before this page is ever reached.
 *   - Fuzzy matches → ALWAYS rendered as suggestions, never auto-redirected.
 *
 * One deliberate change: the alias safety net (for an alias the config missed)
 * now replaces the URL client-side instead of issuing a server 308. It is a
 * fallback for config drift that should not normally fire, and the redirect
 * that matters for SEO still happens in next.config.mjs.
 */
export default function NotFound() {
  const pathname = usePathname() ?? '/'
  const router = useRouter()
  const [suggestions, setSuggestions] = useState<{
    matches: ScoredRoute[]
    topConfidence: number
  }>({ matches: [], topConfidence: 0 })

  useEffect(() => {
    const controller = new AbortController()

    fetch(`/api/404/match?path=${encodeURIComponent(pathname)}`, {
      signal: controller.signal,
    })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (!data) return
        if (data.aliasHit && data.aliasHit !== pathname) {
          router.replace(data.aliasHit)
          return
        }
        setSuggestions({
          matches: data.matches ?? [],
          topConfidence: data.topConfidence ?? 0,
        })
      })
      // A failed lookup is not worth an error state: NotFoundClient already
      // renders a full navigation fallback when there are no matches.
      .catch(() => {})

    return () => controller.abort()
  }, [pathname, router])

  return (
    <NotFoundClient
      pathname={pathname}
      matches={suggestions.matches}
      topConfidence={suggestions.topConfidence}
    />
  )
}
