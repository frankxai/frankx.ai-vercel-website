import { NextResponse } from 'next/server'
import { getPlaybackCatalog } from '@/lib/music-playback-catalog'

// Built once at deploy time from committed data. The site-wide player fetches this on the
// listener's first search instead of embedding ~370 tracks in every page's HTML.
export const dynamic = 'force-static'

export function GET() {
  return NextResponse.json(getPlaybackCatalog())
}
