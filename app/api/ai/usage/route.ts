/**
 * GET /api/ai/usage — current tier + remaining free messages for the caller.
 * Powers the UsageMeter component in the chat sheet.
 */

import { NextResponse } from 'next/server'
import { getUsage, resolveTier } from '@/lib/ai/usage'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  const ctx = await resolveTier(req)
  const status = await getUsage(ctx)
  return NextResponse.json({
    tier: status.tier,
    used: status.used,
    limit: status.limit,
    remaining: status.remaining,
    resetsAt: status.resetsAt,
    isSignedIn: !!ctx.userId,
  })
}
