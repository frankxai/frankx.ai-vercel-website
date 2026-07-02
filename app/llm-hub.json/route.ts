import { NextResponse } from 'next/server'
import { fetchLivePricing } from '@/lib/llm-hub/openrouter'
import { buildModelRows } from '@/lib/llm-hub/rows'

export const revalidate = 3600

export async function GET() {
  const live = await fetchLivePricing()
  const rows = buildModelRows(live)
  return NextResponse.json(rows)
}
