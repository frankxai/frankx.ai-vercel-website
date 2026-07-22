import "server-only"

import {
  getPreviewConfigurationForEnvironment,
  isPreviewKey,
  type PreviewEnvironment,
  type PreviewReadiness,
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
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN)
}

function currentEnvironment(): PreviewEnvironment {
  return {
    V0_PREVIEW_BETA_ENABLED: process.env.V0_PREVIEW_BETA_ENABLED,
    V0_API_KEY: process.env.V0_API_KEY,
    V0_PREVIEW_CHAT_MAP: process.env.V0_PREVIEW_CHAT_MAP,
    VERCEL_ENV: process.env.VERCEL_ENV,
    KV_REST_API_URL: process.env.KV_REST_API_URL,
    KV_REST_API_TOKEN: process.env.KV_REST_API_TOKEN,
  }
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
