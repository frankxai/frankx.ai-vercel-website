import { notFound } from 'next/navigation'
import type { NextRequest } from 'next/server'
import { agentNotFoundResponse, wantsMarkdownNotFound } from '@/lib/agent-not-found'

// Unknown URLs land here. HTML still renders app/not-found.tsx.
// Reading Accept there would opt every page out of static generation.
export const dynamic = 'force-dynamic'

async function handle(request: NextRequest): Promise<Response> {
  if (
    (request.method === 'GET' || request.method === 'HEAD') &&
    wantsMarkdownNotFound(request.headers.get('accept'))
  ) {
    return agentNotFoundResponse(request.method, request.nextUrl.pathname)
  }
  notFound()
}

export const GET = handle
export const HEAD = handle
export const POST = handle
export const PUT = handle
export const PATCH = handle
export const DELETE = handle
export const OPTIONS = handle
