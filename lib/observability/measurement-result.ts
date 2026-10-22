export type MeasurementStatus = 'ok' | 'not_configured' | 'unauthorized' | 'upstream_error' | 'partial'

export interface MeasurementSource {
  provider: 'ga4' | 'search_console' | 'business_ledger'
  property: string | null
  hostnames: string[] | null
  dateRange: { start: string; end: string } | null
  timeZone: string | null
  retrievedAt: string
  dataMaturity: string
  coverage: string
}

export interface MeasurementResult<T> {
  status: MeasurementStatus
  data: T | null
  source: MeasurementSource
  issues: string[]
}

export function result<T>(source: MeasurementSource, status: MeasurementStatus, data: T | null, issues: string[] = []): MeasurementResult<T> {
  return { status, data, source, issues }
}

export function failureStatus(status: number): MeasurementStatus {
  return status === 401 || status === 403 ? 'unauthorized' : 'upstream_error'
}

export function combinedStatus(results: Array<{ status: MeasurementStatus }>): MeasurementStatus {
  if (results.every((entry) => entry.status === 'ok')) return 'ok'
  if (results.some((entry) => entry.status === 'ok' || entry.status === 'partial')) return 'partial'
  if (results.some((entry) => entry.status === 'upstream_error')) return 'upstream_error'
  if (results.some((entry) => entry.status === 'unauthorized')) return 'unauthorized'
  return 'not_configured'
}

export function measurementHttpStatus(status: MeasurementStatus): number {
  if (status === 'ok' || status === 'partial') return 200
  if (status === 'not_configured') return 503
  return 502 // provider authorization failure is not the caller's session failure
}

export function boundedInteger(value: unknown, fallback: number, max: number): number {
  const parsed = typeof value === 'number' ? value : Number(value)
  return Number.isInteger(parsed) && parsed >= 1 && parsed <= max ? parsed : fallback
}

export function metric(value: unknown, name: string): number {
  if ((typeof value !== 'string' && typeof value !== 'number') || (typeof value === 'string' && value.trim() === '')) throw new Error(`Missing ${name}`)
  const parsed = Number(value)
  if (!Number.isFinite(parsed) || parsed < 0) throw new Error(`Invalid ${name}`)
  return parsed
}

export function rowsFrom(data: { rows?: unknown }): any[] {
  if (data.rows === undefined) return [] // provider's documented empty report representation
  if (!Array.isArray(data.rows)) throw new Error('Invalid report rows')
  return data.rows
}

export function reportSource(provider: MeasurementSource['provider'], property: string | null, dateRange: MeasurementSource['dateRange'], hostnames: string[] | null = null): MeasurementSource {
  return {
    provider, property, hostnames, dateRange, timeZone: provider === 'search_console' ? 'America/Los_Angeles' : null,
    retrievedAt: new Date().toISOString(),
    dataMaturity: provider === 'search_console' ? 'final data requested; settled-through date unavailable' : 'processing completeness unverified',
    coverage: 'unavailable',
  }
}
