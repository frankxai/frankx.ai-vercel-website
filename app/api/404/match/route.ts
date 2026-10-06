/**
 * GET /api/404/match?path=/some/typo — soft-404 route suggestions.
 *
 * Exists so app/not-found.tsx does not have to read `headers()`. A dynamic API
 * anywhere in the not-found boundary opts the WHOLE app out of static
 * generation, because that boundary is part of every route's render tree —
 * which is what made all 610 route patterns render on demand and serve
 * `Cache-Control: private, no-store` on every request.
 *
 * Keeping the match here also keeps Fuse.js and the 276KB route-index.json on
 * the server instead of shipping them to every visitor who hits a 404.
 */

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { matchRoute } from '@/lib/fuzzy-route-match'

export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  const raw = request.nextUrl.searchParams.get('path') ?? '/'

  // Only ever treat this as a path. An absolute URL here would let a caller
  // hand back an off-site `aliasHit` for the client to redirect to.
  const pathname = raw.startsWith('/') && !raw.startsWith('//') ? raw : '/'

  const { matches, topConfidence, aliasHit } = matchRoute(pathname)

  return NextResponse.json(
    { matches, topConfidence, aliasHit },
    {
      headers: {
        // Suggestions for a given path never change between deploys, so let
        // the edge answer repeat 404s on the same bad link.
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    },
  )
}
