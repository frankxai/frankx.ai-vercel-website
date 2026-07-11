type AnalyticsProperty = string | number | boolean | null | undefined

const SENSITIVE_PROPERTY =
  /(^|_)(email|name|phone|address|message|text|person|user|customer|referrer|query|search|url|href)($|_)/i
const EMAIL_LIKE_VALUE = /\b[^\s@]+@[^\s@]+\.[^\s@]+\b/
const EXPLICIT_MEASUREMENT_VALUES = new Set(['0', 'no', 'unspecified'])

export function hasDoNotTrack(value: string | null | undefined): boolean {
  const normalized = value?.trim().toLowerCase()
  if (!normalized) return false

  return !EXPLICIT_MEASUREMENT_VALUES.has(normalized)
}

export function allowsAnalyticsMeasurement(value: string | null | undefined): boolean {
  return !hasDoNotTrack(value)
}

export function sanitizeAnalyticsUrl(value: string): string {
  try {
    const url = new URL(value, 'https://frankx.invalid')
    return url.pathname || '/'
  } catch {
    const pathname = value.split(/[?#]/, 1)[0]
    return pathname.startsWith('/') ? pathname : '/'
  }
}

export function sanitizeAnalyticsProperties(
  properties: Record<string, unknown> = {}
): Record<string, AnalyticsProperty> {
  const safe: Record<string, AnalyticsProperty> = {}

  for (const [key, value] of Object.entries(properties).slice(0, 10)) {
    if (SENSITIVE_PROPERTY.test(key)) continue
    if (!['string', 'number', 'boolean'].includes(typeof value) && value !== null) continue

    if (typeof value === 'string') {
      const normalized = value.trim()
      if (!normalized) continue
      if (/^https?:\/\//i.test(normalized) || normalized.startsWith('/')) {
        safe[key] = sanitizeAnalyticsUrl(normalized)
        continue
      }
      if (EMAIL_LIKE_VALUE.test(normalized)) continue
      safe[key] = normalized.slice(0, 100)
      continue
    }

    safe[key] = value as number | boolean | null
  }

  return safe
}
