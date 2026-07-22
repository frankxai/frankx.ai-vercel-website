export interface ExpiringPreview {
  expiresAt: string
}

export const PREVIEW_REFRESH_SKEW_MS = 60_000

export function isPreviewFresh(
  preview: ExpiringPreview,
  now = Date.now(),
): boolean {
  const expiresAt = new Date(preview.expiresAt).getTime()
  return (
    Number.isFinite(expiresAt) &&
    expiresAt - now > PREVIEW_REFRESH_SKEW_MS
  )
}

export function getPreviewTtlSeconds(
  preview: ExpiringPreview,
  now = Date.now(),
): number {
  const expiresAt = new Date(preview.expiresAt).getTime()
  if (!Number.isFinite(expiresAt)) return 1

  return Math.max(
    1,
    Math.floor((expiresAt - now) / 1000) -
      PREVIEW_REFRESH_SKEW_MS / 1000,
  )
}
