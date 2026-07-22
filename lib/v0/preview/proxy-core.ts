import type { CachedPreview } from "./cache"

export const SAFE_PREVIEW_REQUEST_HEADERS = [
  "accept",
  "accept-encoding",
  "accept-language",
  "if-modified-since",
  "if-none-match",
  "range",
] as const

export interface RemotePreview {
  url: string
  token: string
  expiresAt: Date | string
}

export interface PreviewLoaderDependencies {
  getCachedPreview: (previewKey: string) => Promise<CachedPreview | null>
  getRemotePreview: (chatId: string) => Promise<RemotePreview | null>
  setCachedPreview: (
    previewKey: string,
    preview: CachedPreview,
  ) => Promise<void>
  deleteCachedPreview: (previewKey: string) => Promise<void>
}

export interface PreviewFetchInput {
  request: Request
  preview: {
    url: string
    token: string
    expiresAt: Date
  } | null
  path: string[]
  fallbackUrl: string
  onPreviewRefresh: () => Promise<void>
}

export interface PreviewProxyDependencies extends PreviewLoaderDependencies {
  resolvePreviewChatId: (previewKey: string) => string
  fetchPreview: (input: PreviewFetchInput) => Promise<Response>
}

export function createReadOnlyPreviewRequest(request: Request): Request {
  const headers = new Headers()
  for (const name of SAFE_PREVIEW_REQUEST_HEADERS) {
    const value = request.headers.get(name)
    if (value) headers.set(name, value)
  }

  return new Request(request.url, {
    method: request.method,
    headers,
    redirect: "manual",
  })
}

export function sanitizePreviewResponse(response: Response): Response {
  const headers = new Headers(response.headers)
  headers.delete("set-cookie")
  headers.delete("x-powered-by")
  headers.set("cache-control", "private, no-store")
  headers.set("referrer-policy", "no-referrer")
  headers.set("x-content-type-options", "nosniff")

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  })
}

export function buildPreviewFallbackUrl(
  request: Request,
  previewKey: string,
): string {
  const requestUrl = new URL(request.url)
  const returnTo = requestUrl.pathname + requestUrl.search
  return `/api/v0-preview/${previewKey}/loading?returnTo=${encodeURIComponent(returnTo)}`
}

export async function loadPreviewWithDependencies(
  previewKey: string,
  chatId: string,
  dependencies: PreviewLoaderDependencies,
): Promise<CachedPreview | null> {
  const cached = await dependencies.getCachedPreview(previewKey)
  if (cached) return cached

  const remote = await dependencies.getRemotePreview(chatId)
  if (!remote) {
    await dependencies.deleteCachedPreview(previewKey)
    return null
  }

  const normalized: CachedPreview = {
    url: remote.url,
    token: remote.token,
    expiresAt:
      remote.expiresAt instanceof Date
        ? remote.expiresAt.toISOString()
        : new Date(remote.expiresAt).toISOString(),
  }
  await dependencies.setCachedPreview(previewKey, normalized)
  return normalized
}

export async function proxyPreviewRequestWithDependencies(
  request: Request,
  previewKey: string,
  path: string[],
  dependencies: PreviewProxyDependencies,
): Promise<Response> {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return new Response("Method not allowed", {
      status: 405,
      headers: { allow: "GET, HEAD" },
    })
  }

  const chatId = dependencies.resolvePreviewChatId(previewKey)
  const preview = await loadPreviewWithDependencies(
    previewKey,
    chatId,
    dependencies,
  )
  const response = await dependencies.fetchPreview({
    request: createReadOnlyPreviewRequest(request),
    preview: preview
      ? { ...preview, expiresAt: new Date(preview.expiresAt) }
      : null,
    path,
    fallbackUrl: buildPreviewFallbackUrl(request, previewKey),
    onPreviewRefresh: () =>
      dependencies.deleteCachedPreview(previewKey),
  })

  return sanitizePreviewResponse(response)
}
