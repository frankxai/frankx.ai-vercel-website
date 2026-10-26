import { hasGoogleCredentials } from './google-auth.ts'
import { getSearchPerformance, getSearchConsoleSiteUrl } from './google-search-console.ts'
import { getGA4Overview, getGA4TopPages, getGA4TrafficSources, getGA4Realtime, getGA4PropertyId } from './google-analytics.ts'
import { combinedStatus, reportSource, result, boundedInteger } from './measurement-result.ts'
import type { MeasurementResult, MeasurementStatus } from './measurement-result.ts'
import type { SearchConsoleOverview } from './google-search-console.ts'
import type { GA4OverviewData, GA4PageMetric, GA4SourceMetric, GA4RealtimeData } from './google-analytics.ts'

export interface ObservabilitySummary {
  timestamp: string
  status: MeasurementStatus
  periodDays: number
  credentialsStatus: { hasGoogleAuth: boolean; authMethod: 'configured' | 'none'; ga4PropertyId: string | null; gscSiteUrl: string | null }
  realtime: MeasurementResult<GA4RealtimeData>
  traffic: MeasurementResult<GA4OverviewData>
  topPages: MeasurementResult<GA4PageMetric[]>
  trafficSources: MeasurementResult<GA4SourceMetric[]>
  seo: MeasurementResult<SearchConsoleOverview>
  demandCapture: MeasurementResult<{ waitlistCount: number; newsletterCount: number; leadMagnetDownloads: number; productViews: number }>
}

export async function getObservabilitySummary(days = 30): Promise<ObservabilitySummary> {
  const periodDays = boundedInteger(days, 30, 365)
  const hasAuth = hasGoogleCredentials()
  const [traffic, topPages, trafficSources, realtime, seo] = await Promise.all([
    getGA4Overview(periodDays), getGA4TopPages(periodDays, 10), getGA4TrafficSources(periodDays), getGA4Realtime(), getSearchPerformance({ days: periodDays, rowLimit: 30 }),
  ])
  const demandCapture: ObservabilitySummary['demandCapture'] = result<{ waitlistCount: number; newsletterCount: number; leadMagnetDownloads: number; productViews: number }>(reportSource('business_ledger', null, null), 'not_configured', null, ['No verified business event ledger is connected to this report.'])
  return { timestamp: new Date().toISOString(), periodDays, status: combinedStatus([traffic, topPages, trafficSources, realtime, seo, demandCapture]), credentialsStatus: { hasGoogleAuth: hasAuth, authMethod: hasAuth ? 'configured' : 'none', ga4PropertyId: getGA4PropertyId(), gscSiteUrl: getSearchConsoleSiteUrl() }, realtime, traffic, topPages, trafficSources, seo, demandCapture }
}
const cell = (value: unknown) => String(value ?? 'unavailable').replace(/[|\n\r]/g, ' ')
const number = (value: number | null | undefined) => value == null ? 'unavailable' : value.toLocaleString('en-US')
const percent = (value: number | null | undefined) => value == null ? 'unavailable' : `${(value * 100).toFixed(2)}%`

export function formatObservabilityMarkdownBrief(summary: ObservabilitySummary): string {
  const traffic = summary.traffic.data, seo = summary.seo.data, realtime = summary.realtime.data
  let md = `# FrankX measurement brief (${summary.periodDays} days)\nGenerated: ${summary.timestamp}\nStatus: ${summary.status}\n\n`
  for (const [name, entry] of Object.entries({ traffic: summary.traffic, realtime: summary.realtime, topPages: summary.topPages, trafficSources: summary.trafficSources, search: summary.seo, demandCapture: summary.demandCapture })) {
    md += `- ${name}: ${entry.status}; ${cell(entry.source.provider)}; property ${cell(entry.source.property)}; timezone ${cell(entry.source.timeZone)}; window ${cell(entry.source.dateRange?.start)}–${cell(entry.source.dateRange?.end)}; retrieved ${entry.source.retrievedAt}. ${cell(entry.source.coverage)}. ${cell(entry.source.dataMaturity)}.\n`
    entry.issues.forEach((issue) => { md += `  - ${cell(issue)}\n` })
  }
  md += `\n## Performance\n- Active users, last 30 minutes: ${number(realtime?.activeUsersLast30Min)}\n- Total users: ${number(traffic?.totalUsers)}\n- Pageviews: ${number(traffic?.pageviews)}\n- Bounce rate: ${percent(traffic?.bounceRate)}\n- Search clicks: ${number(seo?.totalClicks)}\n- Search impressions: ${number(seo?.totalImpressions)}\n- Search CTR: ${percent(seo?.averageCtr)}\n- Search position: ${number(seo?.averagePosition)}\n\n## Search queries\n| Query | Clicks | Impressions | CTR | Position |\n|---|---|---|---|---|\n`
  seo?.topQueries?.slice(0, 8).forEach((q) => { md += `| ${cell(q.query)} | ${q.clicks} | ${q.impressions} | ${percent(q.ctr)} | ${q.position} |\n` })
  md += '\n## Review candidates\n'
  if (!seo?.opportunities) md += 'Unavailable.\n'
  seo?.opportunities?.forEach((q) => { md += `- ${cell(q.query)}: ${cell(q.recommendation)}\n` })
  md += '\n## Top pages\n| Path | Pageviews | Users | Engagement seconds per user |\n|---|---|---|---|\n'
  summary.topPages.data?.slice(0, 6).forEach((page) => { md += `| ${cell(page.path)} | ${page.pageviews} | ${page.activeUsers} | ${number(page.engagementTimeSeconds)} |\n` })
  md += '\n## Acquisition sources\n'
  summary.trafficSources.data?.forEach((source) => { md += `- ${cell(source.source)}: ${source.sessions} sessions; ${source.percentage == null ? 'unavailable' : source.percentage.toFixed(1) + '%'} of returned sessions.\n` })
  md += '\n## Demand capture\nUnavailable until a verified business event ledger is connected. No conversion or revenue conclusion is supported.\n'
  return md
}
