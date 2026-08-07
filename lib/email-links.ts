/**
 * Safe link construction for HTML emails.
 *
 * escapeHtml() protects markup, but it is NOT URI encoding — a value can be
 * free of HTML metacharacters and still change the meaning of the URI it sits
 * inside. The intake routes validate addresses with /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
 * which admits `?` and `&`, so `foo?bcc=attacker@example.com` passes validation
 * and silently adds a bcc header when the operator clicks "Reply".
 *
 * Encode URI components first, then escape the finished URI for HTML.
 */
import { escapeHtml } from './escape-html'

/** Percent-encode an address without destroying the local@domain separator. */
function encodeAddress(address: string): string {
  const at = address.lastIndexOf('@')
  if (at === -1) return encodeURIComponent(address)
  return `${encodeURIComponent(address.slice(0, at))}@${encodeURIComponent(address.slice(at + 1))}`
}

/**
 * Build an HTML-safe mailto href. Params are percent-encoded per RFC 6068 —
 * spaces become %20, not `+`, which some clients render literally in a body.
 * Pass real newlines in `body`; they encode to %0A.
 */
export function mailtoHref(address: string, params?: Record<string, string>): string {
  const query = Object.entries(params ?? {})
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&')
  return escapeHtml(`mailto:${encodeAddress(address)}${query ? `?${query}` : ''}`)
}

/**
 * Return an HTML-safe href for a user-supplied link, or null when it is not a
 * plain https URL on an allowed host. Callers render null as escaped text so
 * the submitted value is still visible without being clickable.
 */
export function safeLinkHref(value: string, allowedHosts?: string[]): string | null {
  let url: URL
  try {
    url = new URL(value.trim())
  } catch {
    return null
  }
  if (url.protocol !== 'https:') return null
  if (allowedHosts && !allowedHosts.some((h) => url.hostname === h || url.hostname.endsWith(`.${h}`))) {
    return null
  }
  return escapeHtml(url.toString())
}
