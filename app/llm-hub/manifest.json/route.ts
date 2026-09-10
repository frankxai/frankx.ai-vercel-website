import { NextResponse } from 'next/server'
import { fetchLivePricing } from '@/lib/llm-hub/openrouter'
import { buildHubManifest } from '@/lib/llm-hub/manifest'

export const dynamic = 'force-dynamic'

export async function GET() {
  return NextResponse.json(buildHubManifest(await fetchLivePricing()))
}
