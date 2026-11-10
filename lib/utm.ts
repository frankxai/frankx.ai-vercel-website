/**
 * UTM helpers. Convention lives in docs/analytics-utm.md.
 *
 * No imports, so node:test can load this file directly.
 */

export type UtmMedium = 'social' | 'email' | 'community' | 'referral' | 'partner'

export interface UtmParams {
  /** Platform: x | linkedin | youtube | newsletter | circle | github | <partner-name> */
  source: string
  medium: UtmMedium
  /** yyyy-mm-slug, for example 2026-11-launch */
  campaign: string
  content?: string
}

export interface InboundUtm {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
}

const SAFE_VALUE = /[^a-z0-9_-]+/g

function clean(value: string): string {
  return value.trim().toLowerCase().replace(SAFE_VALUE, '-').replace(/^-+|-+$/g, '')
}

/**
 * Appends utm_* to an outbound URL. Existing utm_* on the URL are kept, never
 * overwritten. Relative URLs stay relative. Non-http(s) schemes (mailto:, tel:)
 * and unparsable input come back unchanged.
 */
export function withUtm(url: string, params: UtmParams): string {
  const isRelative = url.startsWith('/') && !url.startsWith('//')
  let parsed: URL
  try {
    parsed = isRelative ? new URL(url, 'https://relative.invalid') : new URL(url)
  } catch {
    return url
  }
  if (!isRelative && parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return url

  const entries: Array<[string, string | undefined]> = [
    ['utm_source', params.source],
    ['utm_medium', params.medium],
    ['utm_campaign', params.campaign],
    ['utm_content', params.content],
  ]
  for (const [key, raw] of entries) {
    if (!raw || parsed.searchParams.has(key)) continue
    const value = clean(raw)
    if (value) parsed.searchParams.set(key, value)
  }

  return isRelative
    ? `${parsed.pathname}${parsed.search}${parsed.hash}`
    : parsed.toString()
}

/** Reads utm_source/medium/campaign from a query string. Empty object when none. */
export function readInboundUtm(search: string): InboundUtm {
  const query = new URLSearchParams(search)
  const out: InboundUtm = {}
  for (const key of ['utm_source', 'utm_medium', 'utm_campaign'] as const) {
    const value = query.get(key)
    const cleaned = value ? clean(value).slice(0, 60) : ''
    if (cleaned) out[key] = cleaned
  }
  return out
}

const STORAGE_KEY = 'frankx_utm'

/**
 * Inbound UTM for this visit. The first landing page carries the utm_* query;
 * later pages do not, so it is kept in sessionStorage for the tab's lifetime.
 * Safe on the server and when storage is blocked.
 */
export function getInboundUtm(): InboundUtm {
  if (typeof window === 'undefined') return {}
  const fromUrl = readInboundUtm(window.location.search)
  try {
    if (Object.keys(fromUrl).length > 0) {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(fromUrl))
      return fromUrl
    }
    const stored = window.sessionStorage.getItem(STORAGE_KEY)
    return stored ? (JSON.parse(stored) as InboundUtm) : {}
  } catch {
    return fromUrl
  }
}
