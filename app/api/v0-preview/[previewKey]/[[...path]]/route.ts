import "server-only"

import {
  PreviewConfigurationError,
  isPreviewKey,
} from "@/lib/v0/preview/config"
import { proxyPreviewRequest } from "@/lib/v0/preview/proxy"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"
export const maxDuration = 30

interface RouteContext {
  params: Promise<{
    previewKey: string
    path?: string[]
  }>
}

async function handle(
  request: Request,
  context: RouteContext,
): Promise<Response> {
  const { previewKey, path = [] } = await context.params

  if (!isPreviewKey(previewKey)) {
    return new Response("Not found", { status: 404 })
  }

  try {
    return await proxyPreviewRequest(request, previewKey, path)
  } catch (error) {
    if (error instanceof PreviewConfigurationError) {
      return new Response("Not found", { status: error.status })
    }

    return new Response("Preview temporarily unavailable", {
      status: 502,
      headers: {
        "cache-control": "no-store",
        "retry-after": "5",
      },
    })
  }
}

export const GET = handle
export const HEAD = handle
