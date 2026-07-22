import { z } from "zod"

const previewKeySchema = z
  .string()
  .min(2)
  .max(64)
  .regex(/^[a-z0-9][a-z0-9-]*$/, "Invalid preview key")

const chatIdSchema = z
  .string()
  .min(6)
  .max(128)
  .regex(/^[A-Za-z0-9_-]+$/, "Invalid v0 chat id")

const chatMapSchema = z.record(previewKeySchema, chatIdSchema)

export type PreviewReadiness =
  | "disabled"
  | "credentials-required"
  | "mapping-required"
  | "shared-cache-required"
  | "ready"

export interface PreviewEnvironment {
  V0_PREVIEW_BETA_ENABLED?: string
  V0_API_KEY?: string
  V0_PREVIEW_CHAT_MAP?: string
  VERCEL_ENV?: string
  KV_REST_API_URL?: string
  KV_REST_API_TOKEN?: string
}

export interface PreviewConfiguration {
  readiness: PreviewReadiness
  chatId: string | null
}

function readChatMap(raw: string | undefined): Record<string, string> {
  if (!raw) return {}

  try {
    const parsed: unknown = JSON.parse(raw)
    const result = chatMapSchema.safeParse(parsed)
    return result.success ? result.data : {}
  } catch {
    return {}
  }
}

export function isPreviewKey(value: string): boolean {
  return previewKeySchema.safeParse(value).success
}

export function getPreviewConfigurationForEnvironment(
  previewKey: string,
  environment: PreviewEnvironment,
): PreviewConfiguration {
  if (environment.V0_PREVIEW_BETA_ENABLED !== "true") {
    return { readiness: "disabled", chatId: null }
  }
  if (!environment.V0_API_KEY) {
    return { readiness: "credentials-required", chatId: null }
  }

  const chatMap = readChatMap(environment.V0_PREVIEW_CHAT_MAP)
  const chatId =
    isPreviewKey(previewKey) && Object.hasOwn(chatMap, previewKey)
      ? chatMap[previewKey]
      : undefined
  if (!chatId) {
    return { readiness: "mapping-required", chatId: null }
  }

  const hasSharedCache = Boolean(
    environment.KV_REST_API_URL && environment.KV_REST_API_TOKEN,
  )
  if (environment.VERCEL_ENV === "production" && !hasSharedCache) {
    return { readiness: "shared-cache-required", chatId: null }
  }

  return { readiness: "ready", chatId }
}
