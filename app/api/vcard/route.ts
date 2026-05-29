import { NextResponse } from 'next/server'
import { buildFrankVCard, VCARD_FILENAME } from '@/lib/connect/vcard'

export const runtime = 'nodejs'
export const dynamic = 'force-static'

export function GET() {
  const vcard = buildFrankVCard()

  return new NextResponse(vcard, {
    status: 200,
    headers: {
      'Content-Type': 'text/vcard; charset=utf-8',
      'Content-Disposition': `attachment; filename="${VCARD_FILENAME}"`,
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
