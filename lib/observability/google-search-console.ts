import { getGoogleAccessToken, hasGoogleCredentials } from './google-auth'

export interface SearchQueryMetric {
  query: string
  clicks: number
  impressions: number
  ctr: number
  position: number
}

export interface SearchPageMetric {
  page: string
  clicks: number
  impressions: number
  ctr: number
  position: number
}

export interface KeywordOpportunity {
  query: string
  page?: string
  impressions: number
  clicks: number
  ctr: number
  position: number
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
  isSimulated?: boolean
}

export interface SearchConsoleOverview {
  siteUrl: string
  dateRange: { start: string; end: string }
  totalClicks: number
  totalImpressions: number
  averageCtr: number
  averagePosition: number
  topQueries: SearchQueryMetric[]
  topPages: SearchPageMetric[]
  opportunities: KeywordOpportunity[]
  isSimulated: boolean
}

const GSC_SCOPE = ['https://www.googleapis.com/auth/webmasters.readonly']

export function getSearchConsoleSiteUrl(): string {
  return (
    process.env.GOOGLE_SEARCH_CONSOLE_SITE_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    'sc-domain:frankx.ai'
  )
}

/**
 * Generates realistic fallback SEO data for FrankX domain when credentials are not yet connected.
 */
function getSimulatedGSCData(days: number): SearchConsoleOverview {
  const endDate = new Date().toISOString().slice(0, 10)
  const startDate = new Date(Date.now() - days * 86400000).toISOString().slice(0, 10)

  const sampleQueries: SearchQueryMetric[] = [
    { query: 'agentic creator os', clicks: 284, impressions: 3420, ctr: 0.083, position: 2.8 },
    { query: 'multi-agent orchestration architecture', clicks: 195, impressions: 4890, ctr: 0.039, position: 4.1 },
    { query: 'frankx ai architect', clicks: 172, impressions: 1210, ctr: 0.142, position: 1.2 },
    { query: 'enterprise ai center of excellence', clicks: 148, impressions: 3950, ctr: 0.037, position: 6.4 },
    { query: 'suno ai music prompt engineering', clicks: 132, impressions: 5820, ctr: 0.022, position: 8.2 },
    { query: 'golden age of intelligence', clicks: 94, impressions: 2140, ctr: 0.043, position: 5.3 },
    { query: 'autonomous agent swarm patterns', clicks: 88, impressions: 4210, ctr: 0.020, position: 9.6 },
    { query: 'nextjs agent team blueprint', clicks: 76, impressions: 1840, ctr: 0.041, position: 4.8 },
    { query: 'starlight intelligence system', clicks: 65, impressions: 890, ctr: 0.073, position: 2.1 },
    { query: 'ai model comparison 2026', clicks: 58, impressions: 7200, ctr: 0.008, position: 14.5 },
    { query: 'oracle genai solution design', clicks: 52, impressions: 1650, ctr: 0.031, position: 7.9 },
    { query: 'hermes agent harness tutorial', clicks: 47, impressions: 1120, ctr: 0.041, position: 3.4 },
    { query: 'creative ai prompt vault', clicks: 43, impressions: 1980, ctr: 0.021, position: 11.2 },
    { query: 'vibe os music production', clicks: 39, impressions: 940, ctr: 0.041, position: 6.7 },
    { query: 'agentdb vector memory architecture', clicks: 35, impressions: 1420, ctr: 0.024, position: 8.9 },
  ]

  const samplePages: SearchPageMetric[] = [
    { page: 'https://frankx.ai/', clicks: 412, impressions: 6840, ctr: 0.060, position: 3.2 },
    { page: 'https://frankx.ai/blog/08-golden-age-of-intelligence', clicks: 234, impressions: 5410, ctr: 0.043, position: 4.7 },
    { page: 'https://frankx.ai/products/agentic-creator-os', clicks: 198, impressions: 3820, ctr: 0.051, position: 3.8 },
    { page: 'https://frankx.ai/intelligence-atlas', clicks: 164, impressions: 4120, ctr: 0.039, position: 5.1 },
    { page: 'https://frankx.ai/prompt-library', clicks: 152, impressions: 5930, ctr: 0.025, position: 8.4 },
    { page: 'https://frankx.ai/blog/multi-agent-system-architecture', clicks: 128, impressions: 3640, ctr: 0.035, position: 6.2 },
    { page: 'https://frankx.ai/products/creative-ai-toolkit', clicks: 94, impressions: 2180, ctr: 0.043, position: 4.9 },
  ]

  const opportunities: KeywordOpportunity[] = [
    {
      query: 'ai model comparison 2026',
      page: 'https://frankx.ai/intelligence-atlas',
      impressions: 7200,
      clicks: 58,
      ctr: 0.008,
      position: 14.5,
      opportunityType: 'striking_distance',
      recommendation: 'Position 14.5 with 7.2k impressions. Add a dedicated comparison table and refresh title tag to capture Page 1 traffic.',
    },
    {
      query: 'suno ai music prompt engineering',
      page: 'https://frankx.ai/prompt-library',
      impressions: 5820,
      clicks: 132,
      ctr: 0.022,
      position: 8.2,
      opportunityType: 'low_ctr_high_impressions',
      recommendation: 'Position 8.2 with high search volume. Optimize meta description with actionable CTA to boost CTR from 2.2% to 5%+',
    },
    {
      query: 'autonomous agent swarm patterns',
      page: 'https://frankx.ai/blog/multi-agent-system-architecture',
      impressions: 4210,
      clicks: 88,
      ctr: 0.020,
      position: 9.6,
      opportunityType: 'striking_distance',
      recommendation: 'Bottom of Page 1. Add internal links from top authority pages and an interactive diagram to push into top 3.',
    },
    {
      query: 'enterprise ai center of excellence',
      page: 'https://frankx.ai/',
      impressions: 3950,
      clicks: 148,
      ctr: 0.037,
      position: 6.4,
      opportunityType: 'quick_win',
      recommendation: 'Rank 6.4. Target exact phrase in H2 and add FAQ schema to claim the rich snippet.',
    },
  ]

  const totalClicks = sampleQueries.reduce((acc, q) => acc + q.clicks, 0)
  const totalImpressions = sampleQueries.reduce((acc, q) => acc + q.impressions, 0)
  const averageCtr = totalImpressions > 0 ? totalClicks / totalImpressions : 0
  const averagePosition =
    sampleQueries.reduce((acc, q) => acc + q.position * q.impressions, 0) / totalImpressions

  return {
    siteUrl: getSearchConsoleSiteUrl(),
    dateRange: { start: startDate, end: endDate },
    totalClicks,
    totalImpressions,
    averageCtr,
    averagePosition: Number(averagePosition.toFixed(1)),
    topQueries: sampleQueries,
    topPages: samplePages,
    opportunities,
    isSimulated: true,
  }
}

/**
 * Fetches Google Search Console performance metrics for the requested date range.
 */
export async function getSearchPerformance(options: {
  days?: number
  rowLimit?: number
} = {}): Promise<SearchConsoleOverview> {
  const days = options.days || 28
  const rowLimit = options.rowLimit || 50

  const token = await getGoogleAccessToken(GSC_SCOPE)
  if (!token) {
    return getSimulatedGSCData(days)
  }

  const siteUrl = getSearchConsoleSiteUrl()
  const endDate = new Date().toISOString().slice(0, 10)
  const startDate = new Date(Date.now() - days * 86400000).toISOString().slice(0, 10)

  try {
    const queryUrl = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(
      siteUrl
    )}/searchAnalytics/query`

    // Fetch queries
    const queryRes = await fetch(queryUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        startDate,
        endDate,
        dimensions: ['query'],
        rowLimit,
      }),
    })

    if (!queryRes.ok) {
      console.warn('[GSC] Query API returned error, falling back to simulated data:', queryRes.status)
      return getSimulatedGSCData(days)
    }

    const queryData = await queryRes.json()
    const rows = (queryData.rows || []) as Array<{
      keys: string[]
      clicks: number
      impressions: number
      ctr: number
      position: number
    }>

    const topQueries: SearchQueryMetric[] = rows.map((r) => ({
      query: r.keys[0] || '',
      clicks: r.clicks,
      impressions: r.impressions,
      ctr: Number(r.ctr.toFixed(4)),
      position: Number(r.position.toFixed(1)),
    }))

    // Fetch pages
    const pageRes = await fetch(queryUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        startDate,
        endDate,
        dimensions: ['page'],
        rowLimit: 20,
      }),
    })

    const pageData = pageRes.ok ? await pageRes.json() : { rows: [] }
    const topPages: SearchPageMetric[] = (pageData.rows || []).map((r: any) => ({
      page: r.keys[0] || '',
      clicks: r.clicks,
      impressions: r.impressions,
      ctr: Number(r.ctr.toFixed(4)),
      position: Number(r.position.toFixed(1)),
    }))

    // Calculate opportunities
    const opportunities: KeywordOpportunity[] = topQueries
      .filter((q) => q.impressions > 100)
      .map((q) => {
        if (q.position >= 5 && q.position <= 20) {
          return {
            query: q.query,
            impressions: q.impressions,
            clicks: q.clicks,
            ctr: q.ctr,
            position: q.position,
            opportunityType: 'striking_distance',
            recommendation: `Position ${q.position}. Striking distance of top 3. Strengthen on-page content and add internal links.`,
          }
        }
        if (q.ctr < 0.02 && q.impressions > 500) {
          return {
            query: q.query,
            impressions: q.impressions,
            clicks: q.clicks,
            ctr: q.ctr,
            position: q.position,
            opportunityType: 'low_ctr_high_impressions',
            recommendation: `High visibility (${q.impressions} impressions) but low CTR (${(q.ctr * 100).toFixed(1)}%). Rewrite meta title/description.`,
          }
        }
        if (q.position < 5 && q.ctr < 0.05) {
          return {
            query: q.query,
            impressions: q.impressions,
            clicks: q.clicks,
            ctr: q.ctr,
            position: q.position,
            opportunityType: 'quick_win',
            recommendation: `Top ranking spot (${q.position}) with room for CTR optimization. Add rich snippets or direct answer hooks.`,
          }
        }
        return null
      })
      .filter(Boolean) as KeywordOpportunity[]

    const totalClicks = topQueries.reduce((acc, q) => acc + q.clicks, 0)
    const totalImpressions = topQueries.reduce((acc, q) => acc + q.impressions, 0)
    const averageCtr = totalImpressions > 0 ? totalClicks / totalImpressions : 0
    const averagePosition =
      topQueries.length > 0
        ? topQueries.reduce((acc, q) => acc + q.position * q.impressions, 0) /
          Math.max(1, totalImpressions)
        : 0

    return {
      siteUrl,
      dateRange: { start: startDate, end: endDate },
      totalClicks,
      totalImpressions,
      averageCtr: Number(averageCtr.toFixed(4)),
      averagePosition: Number(averagePosition.toFixed(1)),
      topQueries,
      topPages,
      opportunities: opportunities.slice(0, 8),
      isSimulated: false,
    }
  } catch (error) {
    console.error('[GSC] Failed to fetch live Search Console performance:', error)
    return getSimulatedGSCData(days)
  }
}

/**
 * Inspects a specific URL's indexing status via the Google Search Console URL Inspection API.
 */
export async function inspectUrlIndexStatus(targetUrl: string): Promise<UrlInspectionResult> {
  const token = await getGoogleAccessToken(GSC_SCOPE)
  const siteUrl = getSearchConsoleSiteUrl()

  if (!token) {
    // Return realistic simulated inspection verdict
    return {
      url: targetUrl,
      indexingState: 'INDEXED',
      verdict: 'PASS',
      lastCrawlTime: new Date(Date.now() - 36 * 3600000).toISOString(),
      coverageState: 'Submitted and indexed',
      robotsTxtState: 'ALLOWED',
      pageFetchState: 'SUCCESSFUL',
      userCanonical: targetUrl,
      googleCanonical: targetUrl,
      mobileUsabilityVerdict: 'PASS',
      isSimulated: true,
    }
  }

  try {
    const res = await fetch('https://searchconsole.googleapis.com/v1/urlInspection/index:inspect', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inspectionUrl: targetUrl,
        siteUrl,
      }),
    })

    if (!res.ok) {
      throw new Error(`URL Inspection returned ${res.status}: ${await res.text()}`)
    }

    const data = await res.json()
    const inspection = data.inspectionResult || {}
    const indexStatus = inspection.indexStatusResult || {}
    const mobileStatus = inspection.mobileUsabilityResult || {}

    return {
      url: targetUrl,
      indexingState: indexStatus.verdict === 'PASS' ? 'INDEXED' : 'NEUTRAL',
      verdict: indexStatus.verdict || 'NEUTRAL',
      lastCrawlTime: indexStatus.lastCrawlTime,
      coverageState: indexStatus.coverageState,
      robotsTxtState: indexStatus.robotsTxtState,
      pageFetchState: indexStatus.pageFetchState,
      userCanonical: indexStatus.userCanonical,
      googleCanonical: indexStatus.googleCanonical,
      mobileUsabilityVerdict: mobileStatus.verdict || 'PASS',
      isSimulated: false,
    }
  } catch (error) {
    console.error('[GSC] URL inspection failed:', error)
    return {
      url: targetUrl,
      indexingState: 'UNKNOWN',
      verdict: 'NEUTRAL',
      coverageState: String(error),
      isSimulated: true,
    }
  }
}
