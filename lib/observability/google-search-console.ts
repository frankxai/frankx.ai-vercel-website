import { getGoogleAuthResult, hasGoogleCredentials } from './google-auth.ts'
import { boundedInteger, combinedStatus, failureStatus, metric, reportSource, result, rowsFrom } from './measurement-result.ts'
import type { MeasurementResult, MeasurementSource } from './measurement-result.ts'

export interface SearchQueryMetric { query: string; clicks: number; impressions: number; ctr: number; position: number }
export interface SearchPageMetric { page: string; clicks: number; impressions: number; ctr: number; position: number }
export interface KeywordOpportunity extends SearchQueryMetric {
  page?: string
  opportunityType: 'striking_distance' | 'low_ctr_high_impressions' | 'quick_win'
  recommendation: string
}
export interface UrlInspectionResult {
  url: string
  indexingState: 'INDEXED' | 'NOT_INDEXED' | 'EXCLUDED' | 'NEUTRAL' | 'UNKNOWN'
  verdict: 'PASS' | 'NEUTRAL' | 'FAIL'
  lastCrawlTime?: string
  coverageState?: string
  robotsTxtState?: string
  pageFetchState?: string
  userCanonical?: string
  googleCanonical?: string
  mobileUsabilityVerdict?: string
}
export interface SearchConsoleOverview {
  siteUrl: string
  totalClicks: number | null
  totalImpressions: number | null
  averageCtr: number | null
  averagePosition: number | null
  topQueries: SearchQueryMetric[] | null
  topPages: SearchPageMetric[] | null
  opportunities: KeywordOpportunity[] | null
}
const GSC_SCOPE = ['https://www.googleapis.com/auth/webmasters.readonly']
export function getSearchConsoleSiteUrl(): string | null {
  const site = process.env.GOOGLE_SEARCH_CONSOLE_SITE_URL?.trim()
  if (!site) return null
  if (/^sc-domain:[a-z0-9]+(?:[.-][a-z0-9]+)*\.[a-z]{2,}$/.test(site)) return site
  try { const url = new URL(site); return url.protocol === 'https:' && !url.username && !url.password && !url.search && !url.hash ? site : null } catch { return null }
}
function context(days: number): MeasurementSource {
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Los_Angeles', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date())
  const end = new Date(`${today}T00:00:00Z`)
  end.setUTCDate(end.getUTCDate() - 3)
  const start = new Date(end); start.setUTCDate(start.getUTCDate() - boundedInteger(days, 28, 365) + 1)
  return reportSource('search_console', getSearchConsoleSiteUrl(), { start: start.toISOString().slice(0, 10), end: end.toISOString().slice(0, 10) })
}
async function report<T>(source: MeasurementSource, body: Record<string, unknown>, parse: (raw: any) => T, inspection = false): Promise<MeasurementResult<T>> {
  if (!source.property) return result<T>(source, 'not_configured', null, ['Set the exact verified GOOGLE_SEARCH_CONSOLE_SITE_URL.'])
  if (!hasGoogleCredentials()) return result<T>(source, 'not_configured', null, ['Google read credentials are not configured.'])
  try {
    const auth = await getGoogleAuthResult(GSC_SCOPE)
    if (!auth.token) return result<T>(source, auth.status === 'ok' ? 'upstream_error' : auth.status, null, ['Google token exchange did not return an access token.'])
    const res = await fetch(inspection ? 'https://searchconsole.googleapis.com/v1/urlInspection/index:inspect' : `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(source.property)}/searchAnalytics/query`, {
      method: 'POST', cache: 'no-store', signal: AbortSignal.timeout(15000), headers: { Authorization: `Bearer ${auth.token}`, 'Content-Type': 'application/json' }, body: JSON.stringify(body),
    })
    if (!res.ok) return result<T>(source, failureStatus(res.status), null, [`Search Console request returned HTTP ${res.status}.`])
    const raw = await res.json()
    const data = parse(raw)
    return result(source, 'ok', data)
  } catch {
    return result<T>(source, 'upstream_error', null, ['Search Console request failed or returned an invalid report.'])
  }
}
function parseMetrics(row: any) {
  const clicks = metric(row.clicks, 'clicks'), impressions = metric(row.impressions, 'impressions')
  const ctr = metric(row.ctr, 'ctr'), position = metric(row.position, 'position')
  if (ctr > 1) throw new Error('Invalid ctr')
  return { clicks, impressions, ctr, position }
}
export async function getSearchPerformance(options: { days?: number; rowLimit?: number } = {}): Promise<MeasurementResult<SearchConsoleOverview>> {
  const source = context(options.days ?? 28)
  const rowLimit = boundedInteger(options.rowLimit, 50, 25000)
  const base = { startDate: source.dateRange!.start, endDate: source.dateRange!.end, type: 'web', dataState: 'final', aggregationType: 'byProperty' }
  const totals = await report({ ...source, coverage: 'provider property totals; not a sum of query rows' }, base, (raw) => {
    const rows = rowsFrom(raw)
    return rows.length ? parseMetrics(rows[0]) : { clicks: 0, impressions: 0, ctr: 0, position: 0 }
  })
  if (!totals.data && totals.status !== 'upstream_error') return result<SearchConsoleOverview>(source, totals.status, null, totals.issues)
  const queries = await report({ ...source }, { ...base, dimensions: ['query'], rowLimit }, (raw) => rowsFrom(raw).map((row) => {
    if (typeof row.keys?.[0] !== 'string') throw new Error('Missing query')
    return { query: row.keys[0], ...parseMetrics(row) }
  }))
  const pages = await report({ ...source }, { ...base, aggregationType: 'auto', dimensions: ['page'], rowLimit: 20 }, (raw) => rowsFrom(raw).map((row) => {
    if (typeof row.keys?.[0] !== 'string') throw new Error('Missing page')
    return { page: row.keys[0], ...parseMetrics(row) }
  }))
  const status = combinedStatus([totals, queries, pages])
  const opportunities: KeywordOpportunity[] | null = queries.data?.filter((q) => q.impressions > 100 && q.position >= 5 && q.position <= 20).slice(0, 8).map((q) => ({ ...q, opportunityType: 'striking_distance', recommendation: 'Review page/query intent and competing coverage before testing a refresh; this is a heuristic, not a traffic forecast.' })) ?? null
  return result({ ...source, coverage: `totals queried separately; query rows limited to ${rowLimit}, page rows to 20; anonymized queries may be omitted` }, status,
    totals.data || queries.data || pages.data ? { siteUrl: source.property!, totalClicks: totals.data?.clicks ?? null, totalImpressions: totals.data?.impressions ?? null, averageCtr: totals.data?.impressions ? totals.data.ctr : null, averagePosition: totals.data?.impressions ? totals.data.position : null, topQueries: queries.data, topPages: pages.data, opportunities } : null,
    [...totals.issues, ...queries.issues, ...pages.issues])
}

export async function inspectUrlIndexStatus(targetUrl: string): Promise<MeasurementResult<UrlInspectionResult>> {
  const source = { ...context(1), dateRange: null, dataMaturity: 'latest provider inspection; not a live fetch', coverage: 'single URL inspection' }
  let target: URL
  try { target = new URL(targetUrl); if (target.protocol !== 'https:' || target.username || target.password) throw new Error('Invalid URL') } catch { return result<UrlInspectionResult>(source, 'not_configured', null, ['Provide an HTTPS URL without credentials.']) }
  if (source.property) {
    const domain = source.property.startsWith('sc-domain:') ? source.property.slice(10) : null
    const prefix = domain ? null : new URL(source.property)
    const matches = domain ? target.hostname === domain || target.hostname.endsWith(`.${domain}`) : target.origin === prefix!.origin && target.pathname.startsWith(prefix!.pathname)
    if (!matches) return result<UrlInspectionResult>(source, 'not_configured', null, ['The target URL is outside the configured Search Console property.'])
  }
  return report(source, { inspectionUrl: target.href, siteUrl: source.property }, (raw) => {
    const index = raw.inspectionResult?.indexStatusResult
    if (!index || !['PASS', 'FAIL', 'NEUTRAL', 'VERDICT_UNSPECIFIED'].includes(index.verdict)) throw new Error('Missing inspection result')
    const verdict: UrlInspectionResult['verdict'] = index.verdict === 'PASS' ? 'PASS' : index.verdict === 'FAIL' ? 'FAIL' : 'NEUTRAL'
    return { url: target.href, indexingState: verdict === 'PASS' ? 'INDEXED' : 'UNKNOWN', verdict, lastCrawlTime: index.lastCrawlTime, coverageState: index.coverageState, robotsTxtState: index.robotsTxtState, pageFetchState: index.pageFetchState, userCanonical: index.userCanonical, googleCanonical: index.googleCanonical, mobileUsabilityVerdict: raw.inspectionResult?.mobileUsabilityResult?.verdict }
  }, true)
}
