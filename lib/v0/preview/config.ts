import "server-only"

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

export class PreviewConfigurationError extends Error {
  readonly status: number

  constructor(message: string, status = 404) {
    super(message)
    this.name = "PreviewConfigurationError"
    this.status = status
  }
}

export function isPreviewKey(value: string): boolean {
  return previewKeySchema.safeParse(value).success
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

function readChatMap(): Record<string, string> {
  const raw = process.env.V0_PREVIEW_CHAT_MAP
  if (!raw) return {}

  try {
    const parsed: unknown = JSON.parse(raw)
    const result = chatMapSchema.safeParse(parsed)
    return result.success ? result.data : {}
  } catch {
    return {}
  }
}

export function getPreviewReadiness(previewKey: string): PreviewReadiness {
  if (!isPreviewBetaEnabled()) return "disabled"
  if (!process.env.V0_API_KEY) return "credentials-required"
  if (!isPreviewKey(previewKey) || !readChatMap()[previewKey]) {
    return "mapping-required"
  }
  if (isProductionDeployment() && !hasSharedPreviewCache()) {
    return "shared-cache-required"
  }
  return "ready"
}

export function resolvePreviewChatId(previewKey: string): string {
  const readiness = getPreviewReadiness(previewKey)
  if (readiness !== "ready") {
    throw new PreviewConfigurationError("Preview is not available.")
  }

  return readChatMap()[previewKey]
}
