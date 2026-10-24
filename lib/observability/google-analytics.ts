import { getGoogleAuthResult, hasGoogleCredentials } from './google-auth.ts'
import { boundedInteger, failureStatus, metric, reportSource, result, rowsFrom } from './measurement-result.ts'
import type { MeasurementResult, MeasurementSource } from './measurement-result.ts'

export interface GA4OverviewData {
  propertyId: string
  totalUsers: number
  activeUsers: number
  sessions: number
  pageviews: number
  bounceRate: number | null
  avgSessionDurationSeconds: number | null
  dailyTrends: Array<{ date: string; users: number; pageviews: number }> | null
}
export interface GA4PageMetric { path: string; title?: string; pageviews: number; activeUsers: number; engagementTimeSeconds: number | null; bounceRate: number | null }
export interface GA4SourceMetric {
  source: string
  channelGroup: 'Organic Search' | 'Direct' | 'AI Chatbots' | 'Referral' | 'Social' | 'Other'
  users: number
  sessions: number
  percentage: number | null
}
export interface GA4RealtimeData { activeUsersLast30Min: number; activePages: Array<{ path: string; activeUsers: number }> | null }
const GA4_SCOPE = ['https://www.googleapis.com/auth/analytics.readonly']

export function getGA4PropertyId(): string | null {
  const id = process.env.GA4_PROPERTY_ID?.trim()
  return id && /^\d+$/.test(id) ? id : null
}
export function getGA4Hostnames(): string[] {
  const hosts = (process.env.GA4_HOSTNAMES || '').split(',').map((host) => host.trim().toLowerCase()).filter(Boolean)
  return hosts.length && hosts.every((host) => /^[a-z0-9]+(?:[.-][a-z0-9]+)*\.[a-z]{2,}$/.test(host)) ? [...new Set(hosts)] : []
}
function context(days: number, realtime = false): MeasurementSource {
  return reportSource('ga4', getGA4PropertyId(), realtime ? { start: '30minutesAgo', end: 'now' } : { start: `${boundedInteger(days, 30, 365)}daysAgo`, end: 'yesterday' }, getGA4Hostnames())
}
async function report<T>(source: MeasurementSource, body: Record<string, unknown>, parse: (data: any) => T, realtime = false): Promise<MeasurementResult<T>> {
  if (realtime && !/^\d+$/.test(process.env.GA4_STREAM_ID || '')) return result<T>(source, 'not_configured', null, ['Set the verified GA4_STREAM_ID for realtime stream scoping.'])
  if (!source.property || !source.hostnames?.length) return result<T>(source, 'not_configured', null, ['Set a verified GA4_PROPERTY_ID and comma-separated GA4_HOSTNAMES.'])
  if (!hasGoogleCredentials()) return result<T>(source, 'not_configured', null, ['Google read credentials are not configured.'])
  try {
    const auth = await getGoogleAuthResult(GA4_SCOPE)
    const token = auth.token
    if (!token) return result<T>(source, auth.status === 'ok' ? 'upstream_error' : auth.status, null, ['Google token exchange did not return an access token.'])
    const res = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${source.property}:${realtime ? 'runRealtimeReport' : 'runReport'}`, {
      method: 'POST', cache: 'no-store', signal: AbortSignal.timeout(15000),
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...body, dimensionFilter: { filter: realtime ? { fieldName: 'streamId', stringFilter: { matchType: 'EXACT', value: process.env.GA4_STREAM_ID } } : { fieldName: 'hostName', inListFilter: { values: source.hostnames, caseSensitive: false } } } }),
    })
    if (!res.ok) return result<T>(source, failureStatus(res.status), null, [`GA4 request returned HTTP ${res.status}.`])
    const raw = await res.json()
    validateReportShape(raw, body)
    const data = parse(raw)
    source.timeZone = typeof raw.metadata?.timeZone === 'string' ? raw.metadata.timeZone : null
    source.coverage = realtime ? 'configured web stream aggregate; stream-to-host mapping must be verified separately' : 'hostname-scoped provider report'
    const limited = raw.metadata?.subjectToThresholding || raw.metadata?.dataLossFromOtherRow || raw.metadata?.samplingMetadatas?.length
    return result(source, limited ? 'partial' : 'ok', data, limited ? ['Provider reports thresholding, sampling or data loss.'] : [])
  } catch {
    return result<T>(source, 'upstream_error', null, ['GA4 request failed or returned an invalid report.'])
  }
}
function validateReportShape(raw: any, request: Record<string, unknown>): void {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) throw new Error('Invalid report object')
  const metrics = request.metrics as Array<{ name: string }>
  const dimensions = (request.dimensions ?? []) as Array<{ name: string }>
  if (!Array.isArray(raw.metricHeaders) || raw.metricHeaders.length !== metrics.length || raw.metricHeaders.some((header: any, index: number) => header?.name !== metrics[index].name)) throw new Error('Invalid metric headers')
  const headers = raw.dimensionHeaders ?? []
  if (!Array.isArray(headers) || headers.length !== dimensions.length || headers.some((header: any, index: number) => header?.name !== dimensions[index].name)) throw new Error('Invalid dimension headers')
  for (const row of rowsFrom(raw)) {
    if (!Array.isArray(row.metricValues) || row.metricValues.length !== metrics.length) throw new Error('Invalid metric row')
    if (dimensions.length && (!Array.isArray(row.dimensionValues) || row.dimensionValues.length !== dimensions.length)) throw new Error('Invalid dimension row')
  }
}
const values = (row: any, names: string[]) => names.map((name, i) => {
  const value = metric(row.metricValues?.[i]?.value, name)
  if ((name === 'bounceRate' && value > 1) || (/Users|sessions|Views/.test(name) && !Number.isInteger(value))) throw new Error(`Invalid ${name}`)
  return value
})

export async function getGA4Overview(days = 30): Promise<MeasurementResult<GA4OverviewData>> {
  const source = context(days)
  const metrics = ['totalUsers', 'activeUsers', 'sessions', 'screenPageViews', 'bounceRate', 'averageSessionDuration']
  const overview = await report(source, { dateRanges: [{ startDate: source.dateRange!.start, endDate: source.dateRange!.end }], metrics: metrics.map((name) => ({ name })) }, (raw) => {
    const rows = rowsFrom(raw)
    const [totalUsers, activeUsers, sessions, pageviews, bounce, duration] = rows.length ? values(rows[0], metrics) : [0, 0, 0, 0, 0, 0]
    return { propertyId: source.property!, totalUsers, activeUsers, sessions, pageviews, bounceRate: sessions ? bounce : null, avgSessionDurationSeconds: sessions ? duration : null, dailyTrends: null } as GA4OverviewData
  })
  if (!overview.data) return overview
  const trends = await report({ ...source }, { dateRanges: [{ startDate: source.dateRange!.start, endDate: source.dateRange!.end }], dimensions: [{ name: 'date' }], metrics: [{ name: 'totalUsers' }, { name: 'screenPageViews' }], orderBys: [{ dimension: { dimensionName: 'date' } }] }, (raw) => rowsFrom(raw).map((row) => {
    const date = row.dimensionValues?.[0]?.value
    if (typeof date !== 'string' || !/^\d{8}$/.test(date)) throw new Error('Invalid date')
    const [users, pageviews] = values(row, ['totalUsers', 'screenPageViews'])
    return { date: `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)}`, users, pageviews }
  }))
  return { ...overview, status: overview.status === 'ok' && trends.status === 'ok' ? 'ok' : 'partial', data: { ...overview.data, dailyTrends: trends.data }, issues: [...overview.issues, ...trends.issues] }
}

export async function getGA4TopPages(days = 30, limit = 15): Promise<MeasurementResult<GA4PageMetric[]>> {
  const source = context(days)
  return report(source, { dateRanges: [{ startDate: source.dateRange!.start, endDate: source.dateRange!.end }], dimensions: [{ name: 'pagePath' }, { name: 'pageTitle' }], metrics: ['screenPageViews', 'activeUsers', 'userEngagementDuration', 'bounceRate'].map((name) => ({ name })), orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }], limit: boundedInteger(limit, 15, 100) }, (raw) => rowsFrom(raw).map((row) => {
    const [pageviews, activeUsers, duration, bounce] = values(row, ['screenPageViews', 'activeUsers', 'userEngagementDuration', 'bounceRate'])
    if (typeof row.dimensionValues?.[0]?.value !== 'string') throw new Error('Missing page')
    return { path: row.dimensionValues[0].value, title: row.dimensionValues?.[1]?.value, pageviews, activeUsers, engagementTimeSeconds: activeUsers ? duration / activeUsers : null, bounceRate: pageviews ? bounce : null }
  }))
}

export async function getGA4TrafficSources(days = 30): Promise<MeasurementResult<GA4SourceMetric[]>> {
  const source = context(days)
  source.coverage = 'rows limited to 100 sources; percentages are shares of returned sessions, not property users'
  return report(source, { dateRanges: [{ startDate: source.dateRange!.start, endDate: source.dateRange!.end }], dimensions: [{ name: 'sessionSource' }, { name: 'sessionDefaultChannelGroup' }], metrics: [{ name: 'activeUsers' }, { name: 'sessions' }], limit: 100, orderBys: [{ metric: { metricName: 'sessions' }, desc: true }] }, (raw) => {
    const rows = rowsFrom(raw)
    const parsed = rows.map((row) => {
      const [users, sessions] = values(row, ['activeUsers', 'sessions'])
      const sourceName = row.dimensionValues?.[0]?.value
      const group = row.dimensionValues?.[1]?.value
      if (typeof sourceName !== 'string' || typeof group !== 'string') throw new Error('Missing source')
      const channelGroup: GA4SourceMetric['channelGroup'] = /^(chatgpt\.com|chat\.openai\.com|perplexity\.ai|claude\.ai|gemini\.google\.com)$/.test(sourceName) ? 'AI Chatbots' : group === 'Organic Search' ? 'Organic Search' : group === 'Direct' ? 'Direct' : /Social/.test(group) ? 'Social' : group === 'Referral' ? 'Referral' : 'Other'
      return { source: sourceName, channelGroup, users, sessions }
    })
    const sessions = parsed.reduce((sum, row) => sum + row.sessions, 0)
    return parsed.map((row) => ({ ...row, percentage: sessions ? 100 * row.sessions / sessions : null }))
  }).then((response) => ({ ...response, source: { ...response.source, coverage: 'up to 100 source rows; percentages use returned sessions, not distinct users' } }))
}

export async function getGA4Realtime(): Promise<MeasurementResult<GA4RealtimeData>> {
  const source = context(1, true)
  // Aggregate total users separately; summing page rows can count a person more than once.
  return report(source, { metrics: [{ name: 'activeUsers' }] }, (raw) => {
    const rows = rowsFrom(raw)
    return { activeUsersLast30Min: rows.length ? values(rows[0], ['activeUsers'])[0] : 0, activePages: null }
  }, true)
}
