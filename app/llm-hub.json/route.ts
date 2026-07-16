import { NextResponse } from 'next/server'
import { fetchLivePricing } from '@/lib/llm-hub/openrouter'
import { buildModelRows } from '@/lib/llm-hub/rows'

// Keep the live catalog out of deploy-time prerendering. fetchLivePricing() still
// uses the Next Data Cache and refreshes the upstream response at most hourly.
export const dynamic = 'force-dynamic'

export async function GET() {
  const live = await fetchLivePricing()
  const rows = buildModelRows(live)
  return NextResponse.json(rows)
}
