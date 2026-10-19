import type { NextRequest } from 'next/server'
import { apiRouteNotFoundResponse } from '@/lib/api-problem'

// Unknown /api paths land here. A specific route such as /api/quote/today or
// /api/v1 still wins. The HTML not-found page is the wrong response here.
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
