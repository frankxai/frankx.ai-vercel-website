import type { CachedPreview } from "./cache"
import { isPreviewFresh } from "./cache-policy"

export const SAFE_PREVIEW_REQUEST_HEADERS = [
  "accept",
  "accept-language",
  "if-modified-since",
  "if-none-match",
  "if-range",
  "range",
] as const

export const SAFE_PREVIEW_RESPONSE_HEADERS = [
  "accept-ranges",
  "content-language",
  "content-range",
  "content-type",
  "etag",
  "last-modified",
  "vary",
] as const

const REDIRECT_STATUSES_REQUIRING_LOCATION = new Set([
  301,
  302,
  303,
  305,
  307,
  308,
])

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

export interface PreviewResponseContext {
  request: Request
  previewKey: string
  preview: CachedPreview | null
  fallbackUrl: string
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

function proxyPathPrefix(previewKey: string): string {
  return `/api/v0-preview/${previewKey}`
}

export function resolveSafePreviewRedirect(
  location: string,
  context: PreviewResponseContext,
): string | null {
  try {
    const requestUrl = new URL(context.request.url)
    const prefix = proxyPathPrefix(context.previewKey)
    const requestTarget = new URL(location, requestUrl)
    if (
      requestTarget.origin === requestUrl.origin &&
      (requestTarget.pathname === prefix ||
        requestTarget.pathname.startsWith(`${prefix}/`))
    ) {
      return requestTarget.pathname + requestTarget.search + requestTarget.hash
    }

    if (!context.preview) return null

    const previewUrl = new URL(context.preview.url)
    const previewTarget = new URL(location, previewUrl)
    if (previewTarget.origin !== previewUrl.origin) return null

    return (
      prefix +
      previewTarget.pathname +
      previewTarget.search +
      previewTarget.hash
    )
  } catch {
    return null
  }
}

export function sanitizePreviewResponse(
  response: Response,
  context: PreviewResponseContext,
): Response {
  const headers = new Headers()
  for (const name of SAFE_PREVIEW_RESPONSE_HEADERS) {
    const value = response.headers.get(name)
    if (value) headers.set(name, value)
  }
  headers.set("cache-control", "private, no-store")
  headers.set("referrer-policy", "no-referrer")
  headers.set("x-content-type-options", "nosniff")

  const location = response.headers.get("location")
  if (
    REDIRECT_STATUSES_REQUIRING_LOCATION.has(response.status) &&
    !location
  ) {
    headers.set("content-type", "text/plain; charset=utf-8")
    return new Response("Preview redirect was blocked.", {
      status: 502,
      headers,
    })
  }
  if (response.status >= 300 && response.status < 400 && location) {
    const safeLocation = resolveSafePreviewRedirect(location, context)
    if (!safeLocation) {
      headers.delete("location")
      headers.set("content-type", "text/plain; charset=utf-8")
      return new Response("Preview redirect was blocked.", {
        status: 502,
        headers,
      })
    }
    headers.set("location", safeLocation)
  } else {
    headers.delete("location")
  }

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

function normalizeRemotePreview(remote: RemotePreview): CachedPreview | null {
  try {
    const previewUrl = new URL(remote.url)
    const expiresAt =
      remote.expiresAt instanceof Date
        ? remote.expiresAt
        : new Date(remote.expiresAt)
    if (
      previewUrl.protocol !== "https:" ||
      !remote.token.trim() ||
      !Number.isFinite(expiresAt.getTime())
    ) {
      return null
    }

    const normalized: CachedPreview = {
      url: remote.url,
      token: remote.token,
      expiresAt: expiresAt.toISOString(),
    }
    return isPreviewFresh(normalized) ? normalized : null
  } catch {
    return null
  }
}

export async function loadPreviewWithDependencies(
  previewKey: string,
  chatId: string,
  dependencies: PreviewLoaderDependencies,
): Promise<CachedPreview | null> {
  const cached = await dependencies.getCachedPreview(previewKey)
  if (cached && isPreviewFresh(cached)) return cached
  if (cached) await dependencies.deleteCachedPreview(previewKey)

  const remote = await dependencies.getRemotePreview(chatId)
  if (!remote) {
    if (!cached) await dependencies.deleteCachedPreview(previewKey)
    return null
  }

  const normalized = normalizeRemotePreview(remote)
  if (!normalized) {
    await dependencies.deleteCachedPreview(previewKey)
    return null
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
  const fallbackUrl = buildPreviewFallbackUrl(request, previewKey)
  const response = await dependencies.fetchPreview({
    request: createReadOnlyPreviewRequest(request),
    preview: preview
      ? { ...preview, expiresAt: new Date(preview.expiresAt) }
      : null,
    path,
    fallbackUrl,
    onPreviewRefresh: () =>
      dependencies.deleteCachedPreview(previewKey),
  })

  return sanitizePreviewResponse(response, {
    request,
    previewKey,
    preview,
    fallbackUrl,
  })
}

export function getSafePreviewReturnTo(
  value: string | null,
  previewKey: string,
): string {
  const prefix = `${proxyPathPrefix(previewKey)}/`
  if (!value) return prefix

  try {
    const base = new URL("https://preview.invalid")
    const target = new URL(value, base)
    if (
      target.origin !== base.origin ||
      !target.pathname.startsWith(prefix)
    ) {
      return prefix
    }
    return target.pathname + target.search
  } catch {
    return prefix
  }
}
