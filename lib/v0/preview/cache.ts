import "server-only"

import {
  getSharedPreviewCacheProvider,
  hasSharedPreviewCache,
  isProductionDeployment,
} from "./config"
import { getPreviewTtlSeconds, isPreviewFresh } from "./cache-policy"

export interface CachedPreview {
  url: string
  token: string
  expiresAt: string
}

const CACHE_PREFIX = "frankx:v0-preview:v1"

declare global {
  var __frankxV0PreviewCache: Map<string, CachedPreview> | undefined
}

const memoryCache =
  globalThis.__frankxV0PreviewCache ??
  (globalThis.__frankxV0PreviewCache = new Map<string, CachedPreview>())

let sharedClientPromise: ReturnType<typeof createSharedClient> | null = null

function cacheKey(previewKey: string): string {
  return `${CACHE_PREFIX}:${previewKey}`
}

async function createSharedClient() {
  const provider = getSharedPreviewCacheProvider()
  const { createClient, kv } = await import("@vercel/kv")

  if (provider === "vercel-kv") return kv
  if (provider === "upstash") {
    const url = process.env.UPSTASH_REDIS_REST_URL
    const token = process.env.UPSTASH_REDIS_REST_TOKEN
    if (!url || !token) {
      throw new Error("Shared preview cache is not configured.")
    }
    return createClient({ url, token })
  }

  throw new Error("Shared preview cache is not configured.")
}

function getSharedClient() {
  sharedClientPromise ??= createSharedClient()
  return sharedClientPromise
}

async function getShared(previewKey: string): Promise<CachedPreview | null> {
  const client = await getSharedClient()
  return (await client.get<CachedPreview>(cacheKey(previewKey))) ?? null
}

async function setShared(
  previewKey: string,
  preview: CachedPreview,
): Promise<void> {
  const client = await getSharedClient()
  const ttlSeconds = getPreviewTtlSeconds(preview)
  await client.set(cacheKey(previewKey), preview, { ex: ttlSeconds })
}

async function deleteShared(previewKey: string): Promise<void> {
  const client = await getSharedClient()
  await client.del(cacheKey(previewKey))
}

export async function getCachedPreview(
  previewKey: string,
): Promise<CachedPreview | null> {
  const preview = hasSharedPreviewCache()
    ? await getShared(previewKey)
    : memoryCache.get(previewKey) ?? null

  if (!preview || !isPreviewFresh(preview)) {
    await deleteCachedPreview(previewKey)
    return null
  }

  return preview
}

export async function setCachedPreview(
  previewKey: string,
  preview: CachedPreview,
): Promise<void> {
  if (hasSharedPreviewCache()) {
    await setShared(previewKey, preview)
    return
  }

  if (isProductionDeployment()) {
    throw new Error("Shared preview cache is required in production.")
  }

  memoryCache.set(previewKey, preview)
}

export async function deleteCachedPreview(previewKey: string): Promise<void> {
  memoryCache.delete(previewKey)
  if (hasSharedPreviewCache()) {
    await deleteShared(previewKey)
  }
}
