import { NextResponse } from 'next/server'

import { dream100 } from '@/lib/dream100'

export async function GET(request: Request) {
  const etag = `"${dream100.snapshotId}"`
  if (request.headers.get('if-none-match') === etag) {
    return new Response(null, { status: 304, headers: { ETag: etag } })
  }

  return NextResponse.json(dream100, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      ETag: etag,
      'X-Dream100-Snapshot': dream100.snapshotId,
    },
  })
}
