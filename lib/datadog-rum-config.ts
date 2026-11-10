/**
 * Datadog Real User Monitoring for frankx.ai (EU site, datadoghq.eu).
 *
 * Off by default: returns null until both public identifiers are set, so a deploy
 * without the env vars loads nothing and the CSP stays unchanged. The client token
 * is a public identifier by Datadog's design; it is not a secret and grants no read access.
 * Keep this file free of relative imports so `node --test` can load it directly.
 */

export const DATADOG_RUM_SITE = 'datadoghq.eu'
export const DATADOG_RUM_SCRIPT_ORIGIN = 'https://www.datadoghq-browser-agent.com'
export const DATADOG_RUM_SCRIPT_URL = `${DATADOG_RUM_SCRIPT_ORIGIN}/eu1/v6/datadog-rum.js`
export const DATADOG_RUM_INTAKE_SOURCES = [
  'https://browser-intake-datadoghq.eu',
  'https://*.browser-intake-datadoghq.eu',
] as const

/**
 * Routes whose path carries a bearer credential. Everything after the prefix is the secret, so it
 * is rewritten to ":token" in views and all other events on these pages are dropped.
 * Add a prefix here whenever a new route puts a credential in the URL.
 */
const CREDENTIAL_PATH_PREFIXES = ['/workshops/me/'] as const

function credentialPrefix(pathname: string): string | undefined {
  const lower = pathname.toLowerCase()
  return CREDENTIAL_PATH_PREFIXES.find((prefix) => lower.startsWith(prefix) && lower.length > prefix.length)
}

export function isSensitiveRumPath(pathname: string): boolean {
  return credentialPrefix(pathname) !== undefined
}

export function redactRumPath(pathname: string): string {
  const prefix = credentialPrefix(pathname)
  return prefix ? `${prefix}:token` : pathname
}

/** RUM is billed per session, so the default samples a tenth of them. */
const DEFAULT_SESSION_SAMPLE_RATE = 10

type DatadogRumEnv = Readonly<Record<string, string | undefined>>

export type DatadogRumConfig = {
  applicationId: string
  clientToken: string
  site: typeof DATADOG_RUM_SITE
  service: 'frankx-ai'
  env: string
  sessionSampleRate: number
  sessionReplaySampleRate: 0
  defaultPrivacyLevel: 'mask'
  trackUserInteractions: false
  trackResources: false
}

function parseSampleRate(raw: string | undefined): number {
  const trimmed = raw?.trim()
  if (!trimmed) return DEFAULT_SESSION_SAMPLE_RATE
  const parsed = Number(trimmed)
  if (!Number.isFinite(parsed)) return DEFAULT_SESSION_SAMPLE_RATE
  return Math.min(100, Math.max(0, parsed))
}

export function datadogRumConfig(env: DatadogRumEnv): DatadogRumConfig | null {
  const applicationId = env.NEXT_PUBLIC_DD_RUM_APPLICATION_ID?.trim()
  const clientToken = env.NEXT_PUBLIC_DD_RUM_CLIENT_TOKEN?.trim()
  if (!applicationId || !clientToken) return null

  return {
    applicationId,
    clientToken,
    site: DATADOG_RUM_SITE,
    service: 'frankx-ai',
    env: env.NEXT_PUBLIC_DD_RUM_ENV?.trim() || 'production',
    sessionSampleRate: parseSampleRate(env.NEXT_PUBLIC_DD_RUM_SAMPLE_RATE),
    sessionReplaySampleRate: 0,
    defaultPrivacyLevel: 'mask',
    trackUserInteractions: false,
    trackResources: false,
  }
}
