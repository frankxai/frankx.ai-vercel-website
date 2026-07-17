import { NextResponse } from 'next/server'
import { agenticLifeMarketRegistry } from '@/lib/research/agentic-life-market'

export const revalidate = 86400

export async function GET() {
  return NextResponse.json(agenticLifeMarketRegistry, {
    headers: {
      'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
      'X-Registry-Version': agenticLifeMarketRegistry.schemaVersion,
      'X-Registry-Verified': agenticLifeMarketRegistry.lastVerified,
    },
  })
}
