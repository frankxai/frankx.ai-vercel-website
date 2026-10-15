import { NextResponse } from 'next/server'
import { publicOpenApi } from '@/lib/public-openapi'

export const revalidate = 86400

export function GET() {
  return NextResponse.json(publicOpenApi, {
    headers: {
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      'Access-Control-Allow-Origin': '*',
      'X-Content-Type-Options': 'nosniff',
    },
  })
}
