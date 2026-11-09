import type { NextRequest } from 'next/server'
import { apiRouteNotFoundResponse } from '@/lib/api-problem'

// [...slug] is a required catch-all, so it does not match the exact /api URL.
export const dynamic = 'force-dynamic'

function handle(request: NextRequest): Response {
  return apiRouteNotFoundResponse(request.method, request.nextUrl.pathname)
}

export const GET = handle
export const HEAD = handle
export const POST = handle
export const PUT = handle
export const PATCH = handle
export const DELETE = handle
export const OPTIONS = handle
