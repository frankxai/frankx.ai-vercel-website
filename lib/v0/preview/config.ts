import "server-only"

import {
  getPreviewConfigurationForEnvironment,
  getSharedPreviewCacheProviderForEnvironment,
  isPreviewKey,
  type PreviewEnvironment,
  type PreviewReadiness,
  type SharedPreviewCacheProvider,
} from "./config-policy"

export { isPreviewKey, type PreviewReadiness }

export class PreviewConfigurationError extends Error {
  readonly status: number

  constructor(message: string, status = 404) {
    super(message)
    this.name = "PreviewConfigurationError"
    this.status = status
  }
}

export function isPreviewBetaEnabled(): boolean {
  return process.env.V0_PREVIEW_BETA_ENABLED === "true"
}

export function isProductionDeployment(): boolean {
  return process.env.VERCEL_ENV === "production"
}

export function hasSharedPreviewCache(): boolean {
  return getSharedPreviewCacheProvider() !== null
}

function currentEnvironment(): PreviewEnvironment {
  return {
    V0_PREVIEW_BETA_ENABLED: process.env.V0_PREVIEW_BETA_ENABLED,
    V0_API_KEY: process.env.V0_API_KEY,
    V0_PREVIEW_CHAT_MAP: process.env.V0_PREVIEW_CHAT_MAP,
    VERCEL_ENV: process.env.VERCEL_ENV,
    KV_REST_API_URL: process.env.KV_REST_API_URL,
    KV_REST_API_TOKEN: process.env.KV_REST_API_TOKEN,
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
  }
}

export function getSharedPreviewCacheProvider(): SharedPreviewCacheProvider {
  return getSharedPreviewCacheProviderForEnvironment(currentEnvironment())
}

export function getPreviewReadiness(previewKey: string): PreviewReadiness {
  return getPreviewConfigurationForEnvironment(
    previewKey,
    currentEnvironment(),
  ).readiness
}

export function resolvePreviewChatId(previewKey: string): string {
  const configuration = getPreviewConfigurationForEnvironment(
    previewKey,
    currentEnvironment(),
  )
  if (configuration.readiness !== "ready" || !configuration.chatId) {
    throw new PreviewConfigurationError("Preview is not available.")
  }

  return configuration.chatId
}
