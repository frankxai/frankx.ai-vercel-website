'use client'

import React, { useRef, useState } from 'react'
import Link from 'next/link'
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  Clock,
  Compass,
  Copy,
  ExternalLink,
  Eye,
  Globe,
  Layers,
  Lightbulb,
  Search,
  ShieldAlert,
  Sparkles,
  Terminal,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react'
import type { ObservabilitySummary } from '@/lib/observability/observability-summary'
import { createLatestRequest } from '@/lib/observability/latest-request'
import type { MeasurementResult } from '@/lib/observability/measurement-result'
import type { UrlInspectionResult } from '@/lib/observability/google-search-console'

interface Props {
  initialSummary: ObservabilitySummary
}

export function AnalyticsDashboardClient({ initialSummary }: Props) {
  const [summary, setSummary] = useState<ObservabilitySummary>(initialSummary)
  const [selectedPeriod, setSelectedPeriod] = useState<number>(initialSummary.periodDays)
  const [activeTab, setActiveTab] = useState<'seo' | 'traffic' | 'demand' | 'agents'>('seo')
  const [queryFilter, setQueryFilter] = useState('')
  const [copied, setCopied] = useState(false)
  const [pendingPeriod, setPendingPeriod] = useState<number | null>(null)
  const [requestError, setRequestError] = useState<string | null>(null)
  const loadLatest = useRef(createLatestRequest())

  // URL inspection state
  const [inspectUrl, setInspectUrl] = useState('https://frankx.ai/blog/08-golden-age-of-intelligence')
  const [inspecting, setInspecting] = useState(false)
  const [inspectionResult, setInspectionResult] = useState<MeasurementResult<UrlInspectionResult> | null>(null)

  const { credentialsStatus } = summary
  const traffic = summary.traffic.data
  const seo = summary.seo.data
  const realtime = summary.realtime.data
  const opportunities = seo?.opportunities ?? []
  const demandCapture = summary.demandCapture.data
  const dailyTrends = traffic?.dailyTrends ?? []
  const fmt = (value: number | null | undefined) => value == null ? 'Unavailable' : value.toLocaleString()
  const pct = (value: number | null | undefined) => value == null ? 'Unavailable' : `${(value * 100).toFixed(1)}%`
  const inspection = inspectionResult?.data

  // Keep the displayed period tied to the displayed snapshot, including during failures.
  const handlePeriodChange = async (days: number) => {
    setPendingPeriod(days)
    setRequestError(null)
    await loadLatest.current(async () => {
      const res = await fetch(`/api/admin/observability/summary?days=${days}`)
      const json = await res.json()
      if (!json.data || json.data.periodDays !== days) throw new Error('Reporting window mismatch')
      return json.data as ObservabilitySummary
    }, {
      commit: (next) => { setSummary(next); setSelectedPeriod(next.periodDays) },
      fail: () => setRequestError('Could not load the requested window. The previous snapshot remains displayed.'),
      settled: () => setPendingPeriod(null),
    })
  }

  // Handle copy markdown brief
  const handleCopyBrief = async () => {
    try {
      const res = await fetch(`/api/admin/observability/summary?days=${selectedPeriod}&format=markdown`)
      const text = await res.text()
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch (err) {
      console.error('Copy brief error:', err)
    }
  }

  // Handle URL Inspection
  const handleInspect = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inspectUrl) return
    setInspecting(true)
    setInspectionResult(null)
    try {
      const res = await fetch('/api/admin/observability/inspect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: inspectUrl }),
      })
      const json = await res.json()
      if (json.data) setInspectionResult(json.data)
    } catch (err) {
      console.error('Inspection failed:', err)
    } finally {
      setInspecting(false)
    }
  }

  const filteredQueries = (seo?.topQueries ?? []).filter((q) =>
    q.query.toLowerCase().includes(queryFilter.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 px-4 pb-24 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Navigation Breadcrumb */}
        <div className="mb-4 flex items-center gap-2 text-xs font-medium text-slate-400">
          <Link href="/admin" className="hover:text-amber-400 transition-colors">
            Admin
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-amber-400">Analytics & Search Console</span>
        </div>

        {/* Top Header Bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Analytics & Search Console
              </h1>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Provider status: {summary.status}
              </span>
            </div>
            <p className="mt-1.5 text-sm text-slate-400">
              Unified intelligence across Google Analytics 4, Google Search Console, and Agent Swarm operations.
            </p>
          </div>

          {/* Action Bar */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Period Filter */}
            <div className="inline-flex rounded-lg border border-white/10 bg-white/[0.03] p-0.5">
              {[7, 28, 90].map((days) => (
                <button
                  key={days}
                  onClick={() => handlePeriodChange(days)}
                  className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                    selectedPeriod === days
                      ? 'bg-amber-400/20 text-amber-300 shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {days}d
                </button>
              ))}
            </div>

            {/* Copy Markdown Brief */}
            <button
              onClick={handleCopyBrief}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-semibold text-slate-200 transition-colors hover:border-amber-400/40 hover:bg-white/[0.08]"
            >
              {copied ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? 'Copied Brief!' : 'Copy Agent Brief'}</span>
            </button>
          </div>
        </div>

        {/* Credentials Status Banner */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="text-slate-400">Data Source:</span>
            {credentialsStatus.hasGoogleAuth ? (
              <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
                <CheckCircle2 className="h-3.5 w-3.5" /> Credentials configured; provider results checked separately
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-amber-400 font-medium">
                <Lightbulb className="h-3.5 w-3.5" /> Measurement unavailable: Google read credentials are not configured
              </span>
            )}
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Property: <code className="text-slate-300">{credentialsStatus.ga4PropertyId ?? 'Not configured'}</code></span>
            <span>Site: <code className="text-slate-300">{credentialsStatus.gscSiteUrl ?? 'Not configured'}</code></span>
          </div>
        </div>

        <div className="mt-4 space-y-2 text-xs text-slate-300" role="status" aria-live="polite">
          {[summary.traffic, summary.topPages, summary.trafficSources, summary.realtime, summary.seo, summary.demandCapture].map((entry, index) => (
            <p key={index}>{entry.source.provider}: {entry.status}. {entry.issues.join(' ')} {entry.source.coverage}</p>
          ))}
        </div>

        <p className="mt-3 text-xs text-slate-300" role="status" aria-live="polite">
          Displayed window: {summary.periodDays} days. Snapshot: {summary.timestamp}.
          {pendingPeriod != null ? ` Loading ${pendingPeriod} days…` : ''}
          {requestError ? ` ${requestError}` : ''}
        </p>

        {/* Primary KPI Ribbon (6 cards) */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {/* Realtime Active Users */}
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.04] p-4">
            <div className="flex items-center justify-between text-xs text-emerald-400/90 font-medium">
              <span>Active Now</span>
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <div className="mt-2 text-2xl font-bold text-white tracking-tight">
              {fmt(realtime?.activeUsersLast30Min)}
            </div>
            <span className="mt-1 block text-[11px] text-emerald-400/70">Visitors in last 30m</span>
          </div>

          {/* Monthly Visitors */}
          <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/[0.04] p-4">
            <div className="flex items-center justify-between text-xs text-cyan-400/90 font-medium">
              <span>Visitors</span>
              <Users className="h-3.5 w-3.5" />
            </div>
            <div className="mt-2 text-2xl font-bold text-white tracking-tight">
              {fmt(traffic?.totalUsers)}
            </div>
            <span className="mt-1 block text-[11px] text-cyan-400/70">{fmt(traffic?.activeUsers)} active</span>
          </div>

          {/* Pageviews */}
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
              <span>Pageviews</span>
              <Eye className="h-3.5 w-3.5" />
            </div>
            <div className="mt-2 text-2xl font-bold text-white tracking-tight">
              {fmt(traffic?.pageviews)}
            </div>
            <span className="mt-1 block text-[11px] text-slate-400">
              {traffic?.totalUsers ? (traffic.pageviews / traffic.totalUsers).toFixed(1) : 'Unavailable'} per visitor
            </span>
          </div>

          {/* Organic Search Clicks */}
          <div className="rounded-xl border border-amber-500/20 bg-amber-500/[0.04] p-4">
            <div className="flex items-center justify-between text-xs text-amber-400/90 font-medium">
              <span>Search Clicks</span>
              <Compass className="h-3.5 w-3.5" />
            </div>
            <div className="mt-2 text-2xl font-bold text-white tracking-tight">
              {fmt(seo?.totalClicks)}
            </div>
            <span className="mt-1 block text-[11px] text-amber-400/70">Search Console: {summary.seo.status}</span>
          </div>

          {/* Search Impressions & Avg Pos */}
          <div className="rounded-xl border border-violet-500/20 bg-violet-500/[0.04] p-4">
            <div className="flex items-center justify-between text-xs text-violet-400/90 font-medium">
              <span>Impressions</span>
              <TrendingUp className="h-3.5 w-3.5" />
            </div>
            <div className="mt-2 text-2xl font-bold text-white tracking-tight">
              {fmt(seo?.totalImpressions)}
            </div>
            <span className="mt-1 block text-[11px] text-violet-400/70">
              {pct(seo?.averageCtr)} CTR · Pos {fmt(seo?.averagePosition)}
            </span>
          </div>

          {/* Waitlist / Demand */}
          <div className="rounded-xl border border-rose-500/20 bg-rose-500/[0.04] p-4">
            <div className="flex items-center justify-between text-xs text-rose-400/90 font-medium">
              <span>Demand</span>
              <Zap className="h-3.5 w-3.5" />
            </div>
            <div className="mt-2 text-2xl font-bold text-white tracking-tight">
              {fmt(demandCapture?.waitlistCount)}
            </div>
            <span className="mt-1 block text-[11px] text-rose-400/70">Waitlist members</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mt-8 flex border-b border-white/10 text-sm font-medium">
          {[
            { id: 'seo', label: 'Google Search Console & SEO', icon: Compass },
            { id: 'traffic', label: 'Traffic & GA4 Audiences', icon: BarChart3 },
            { id: 'demand', label: 'Demand & Conversions', icon: Zap },
            { id: 'agents', label: 'Agent Tools & API Hub', icon: Terminal },
          ].map((tab) => {
            const Icon = tab.icon
            const active = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 border-b-2 px-4 py-3 text-xs transition-colors ${
                  active
                    ? 'border-amber-400 text-amber-300 font-semibold'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* TAB 1: Search Console & SEO */}
        {activeTab === 'seo' && (
          <div className="mt-6 space-y-6">
            {/* Keyword Opportunities Spotlight */}
            <div className="rounded-2xl border border-amber-500/20 bg-amber-500/[0.02] p-5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                <Lightbulb className="h-4 w-4" />
                <span>Keyword review candidates</span>
              </div>
              <p className="mt-1 text-xs text-slate-400">
                Candidates derived from returned query rows. Review intent, source coverage and competing pages before proposing an experiment.
              </p>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {opportunities.map((opp, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col justify-between rounded-xl border border-white/10 bg-white/[0.02] p-3.5 hover:border-amber-400/30 transition-colors"
                  >
                    <div>
                      <span className="block text-sm font-semibold text-white">"{opp.query}"</span>
                      <div className="mt-2 flex items-center gap-3 text-xs text-slate-400">
                        <span>Pos: <strong className="text-amber-300">{opp.position}</strong></span>
                        <span>Impressions: <strong className="text-white">{opp.impressions.toLocaleString()}</strong></span>
                        <span>CTR: <strong className="text-white">{(opp.ctr * 100).toFixed(1)}%</strong></span>
                      </div>
                      <p className="mt-2 text-[11px] leading-snug text-slate-400 italic">
                        {opp.recommendation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* URL Inspection Tool */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
                <Search className="h-4 w-4" />
                <span>Google Index Inspector</span>
              </div>
              <p className="mt-1 text-xs text-slate-400">
                Test any URL on frankx.ai against the Google Search Console URL Inspection API.
              </p>

              <form onSubmit={handleInspect} className="mt-3 flex gap-2">
                <input
                  type="url"
                  value={inspectUrl}
                  onChange={(e) => setInspectUrl(e.target.value)}
                  placeholder="https://frankx.ai/blog/..."
                  className="flex-1 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60"
                />
                <button
                  type="submit"
                  disabled={inspecting}
                  className="rounded-xl bg-amber-400/20 px-4 py-2 text-xs font-semibold text-amber-300 border border-amber-400/30 hover:bg-amber-400/30 transition-colors disabled:opacity-50"
                >
                  {inspecting ? 'Inspecting...' : 'Inspect Index Status'}
                </button>
              </form>

              {inspectionResult && (
                <div className="mt-4 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.03] p-4 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white">Verdict:</span>
                    <span className="inline-flex items-center gap-1 text-emerald-400 font-bold">
                      <CheckCircle2 className="h-3.5 w-3.5" /> {inspection?.verdict ?? 'Unavailable'} ({inspection?.indexingState ?? inspectionResult.status})
                    </span>
                  </div>
                  <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2 text-slate-400">
                    <div>Robots.txt: <strong className="text-white">{inspection?.robotsTxtState ?? 'Unavailable'}</strong></div>
                    <div>Fetch: <strong className="text-white">{inspection?.pageFetchState ?? 'Unavailable'}</strong></div>
                    <div>Mobile: <strong className="text-white">{inspection?.mobileUsabilityVerdict ?? 'Unavailable'}</strong></div>
                    <div>Coverage: <strong className="text-white">{inspection?.coverageState ?? 'Unavailable'}</strong></div>
                  </div>
                </div>
              )}
            </div>

            {/* Queries Table */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4">
                <div>
                  <h3 className="text-sm font-semibold text-white">Top Search Queries</h3>
                  <p className="text-xs text-slate-400">Real Google Search Console queries driving visibility.</p>
                </div>
                <input
                  type="text"
                  placeholder="Filter queries..."
                  value={queryFilter}
                  onChange={(e) => setQueryFilter(e.target.value)}
                  className="w-full sm:w-64 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60"
                />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-white/10 text-slate-400">
                      <th className="pb-2.5 font-medium">Search Query</th>
                      <th className="pb-2.5 font-medium text-right">Clicks</th>
                      <th className="pb-2.5 font-medium text-right">Impressions</th>
                      <th className="pb-2.5 font-medium text-right">CTR</th>
                      <th className="pb-2.5 font-medium text-right">Position</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredQueries.map((q, i) => (
                      <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-2.5 font-medium text-white">{q.query}</td>
                        <td className="py-2.5 text-right font-mono text-amber-300 font-semibold">{q.clicks}</td>
                        <td className="py-2.5 text-right font-mono text-slate-300">{q.impressions.toLocaleString()}</td>
                        <td className="py-2.5 text-right font-mono text-slate-300">{(q.ctr * 100).toFixed(1)}%</td>
                        <td className="py-2.5 text-right font-mono text-slate-300">{q.position}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Traffic & Audiences (GA4) */}
        {activeTab === 'traffic' && (
          <div className="mt-6 space-y-6">
            {/* Traffic Trend Visualizer */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <div className="flex items-center justify-between pb-4">
                <div>
                  <h3 className="text-sm font-semibold text-white">Daily Traffic Velocity</h3>
                  <p className="text-xs text-slate-400">Daily users from the provider report; a person can appear on multiple days.</p>
                </div>
                <span className="text-xs text-cyan-400 font-mono">
                  Mean {dailyTrends.length ? (dailyTrends.reduce((sum, day) => sum + day.users, 0) / dailyTrends.length).toFixed(1) : 'Unavailable'} daily users
                </span>
              </div>

              {/* Responsive Bar Chart */}
              <div className="flex h-36 items-end gap-1 sm:gap-2 pt-4 border-b border-white/10">
                {dailyTrends.map((d, idx) => {
                  const maxUsers = Math.max(...dailyTrends.map((t) => t.users), 1)
                  const heightPercent = Math.max(8, Math.round((d.users / maxUsers) * 100))
                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center group relative">
                      <div
                        style={{ height: `${heightPercent}%` }}
                        className="w-full rounded-t bg-cyan-400/30 group-hover:bg-cyan-400/70 transition-colors"
                      />
                      <div className="hidden group-hover:block absolute bottom-full mb-1 z-20 whitespace-nowrap rounded border border-white/20 bg-slate-900 px-2 py-1 text-[10px] text-white shadow-lg">
                        {d.date}: <strong>{d.users}</strong> visitors ({d.pageviews} views)
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="flex justify-between pt-2 text-[10px] text-slate-500">
                <span>{dailyTrends[0]?.date}</span>
                <span>{dailyTrends[dailyTrends.length - 1]?.date}</span>
              </div>
            </div>

            {/* Two Column: Top Landing Pages & Traffic Acquisition Channels */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Top Landing Pages */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <h3 className="text-sm font-semibold text-white pb-3">Top Landing Pages</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-white/10 text-slate-400">
                        <th className="pb-2 font-medium">Page Path</th>
                        <th className="pb-2 font-medium text-right">Views</th>
                        <th className="pb-2 font-medium text-right">Users</th>
                        <th className="pb-2 font-medium text-right">Time</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {(summary.topPages.data ?? []).slice(0, 8).map((page, i) => (
                        <tr key={i} className="hover:bg-white/[0.02]">
                          <td className="py-2.5 font-mono text-cyan-300 truncate max-w-[200px]">
                            {page.path}
                          </td>
                          <td className="py-2.5 text-right font-mono text-white font-semibold">
                            {page.pageviews.toLocaleString()}
                          </td>
                          <td className="py-2.5 text-right font-mono text-slate-300">
                            {page.activeUsers.toLocaleString()}
                          </td>
                          <td className="py-2.5 text-right font-mono text-slate-400">
                            {page.engagementTimeSeconds == null ? 'Unavailable' : `${Math.round(page.engagementTimeSeconds)}s`}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Channels & AI Referral Traffic */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <div className="flex items-center justify-between pb-3">
                  <h3 className="text-sm font-semibold text-white">Acquisition sources and AI referrals</h3>
                  <span className="text-[11px] text-amber-400/90 font-medium">AEO / Search Radar</span>
                </div>
                <div className="space-y-3">
                  {(summary.trafficSources.data ?? []).map((source, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-medium text-white flex items-center gap-1.5">
                          {source.channelGroup === 'AI Chatbots' && (
                            <Sparkles className="h-3 w-3 text-amber-400" />
                          )}
                          {source.source}
                        </span>
                        <span className="text-slate-400 font-mono">
                          {source.users.toLocaleString()} users · {source.sessions} sessions ({source.percentage == null ? 'Unavailable' : source.percentage.toFixed(1) + '%'} of returned sessions)
                        </span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-white/[0.05]">
                        <div
                          style={{ width: `${source.percentage ?? 0}%` }}
                          className={`h-full rounded-full ${
                            source.channelGroup === 'AI Chatbots'
                              ? 'bg-amber-400'
                              : source.channelGroup === 'Organic Search'
                              ? 'bg-cyan-400'
                              : 'bg-slate-400'
                          }`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Demand & Conversions */}
        {activeTab === 'demand' && (
          <div className="mt-6 space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <span className="text-xs text-slate-400 font-medium">Waitlist Members</span>
                <div className="mt-2 text-3xl font-bold text-white">{fmt(demandCapture?.waitlistCount)}</div>
                <span className="mt-1 block text-xs text-rose-400">Verified waitlist ledger required</span>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <span className="text-xs text-slate-400 font-medium">Newsletter Audience</span>
                <div className="mt-2 text-3xl font-bold text-white">{fmt(demandCapture?.newsletterCount)}</div>
                <span className="mt-1 block text-xs text-emerald-400">Verified subscriber ledger required</span>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <span className="text-xs text-slate-400 font-medium">Lead Magnet Deliveries</span>
                <div className="mt-2 text-3xl font-bold text-white">{fmt(demandCapture?.leadMagnetDownloads)}</div>
                <span className="mt-1 block text-xs text-cyan-400">Verified delivery ledger required</span>
              </div>
            </div>

            <p className="text-sm text-slate-300">Business outcomes are unavailable until verified lead, order and delivery records are connected. Pageviews do not establish demand or accepted delivery.</p>
          </div>
        )}

        {/* TAB 4: Agent Tools & API Hub */}
        {activeTab === 'agents' && (
          <div className="mt-6 space-y-6">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                <Terminal className="h-4 w-4" />
                <span>Agent CLI Commands & Workflows</span>
              </div>
              <p className="mt-1 text-xs text-slate-400">
                Autonomous agents (Hermes, Claude Code, Codex, Antigravity, Kilo) can query this observability suite directly using terminal commands or HTTP API calls.
              </p>

              <div className="mt-4 space-y-3 font-mono text-xs">
                <div className="rounded-xl border border-white/10 bg-black/50 p-3">
                  <span className="text-slate-500"># 1. Generate full markdown executive brief for context:</span>
                  <div className="text-amber-300 mt-1">pnpm run analytics:summary</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/50 p-3">
                  <span className="text-slate-500"># 2. Extract high-leverage keyword opportunities for content planning:</span>
                  <div className="text-amber-300 mt-1">pnpm run analytics:opportunities</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/50 p-3">
                  <span className="text-slate-500"># 3. Pull Google Search Console queries and CTR:</span>
                  <div className="text-amber-300 mt-1">pnpm run analytics:gsc --days=28</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/50 p-3">
                  <span className="text-slate-500"># 4. Check Google index status of any URL:</span>
                  <div className="text-amber-300 mt-1">pnpm run analytics:inspect https://frankx.ai/blog/my-post</div>
                </div>
              </div>
            </div>

            {/* Machine-Readable JSON Endpoints */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <h3 className="text-sm font-semibold text-white">Machine-Readable HTTP Endpoints</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Direct endpoints available for agents via `curl` or `fetch`:
              </p>

              <div className="mt-3 space-y-2 text-xs font-mono">
                {[
                  { path: '/api/admin/observability/summary', desc: 'Unified JSON snapshot of all metrics' },
                  { path: '/api/admin/observability/summary?format=markdown', desc: 'Raw Markdown brief ready for LLM context' },
                  { path: '/api/admin/observability/search-console', desc: 'Search queries, impressions, CTR, and positions' },
                  { path: '/api/admin/observability/analytics', desc: 'GA4 overview, top pages, referrers, and realtime' },
                  { path: '/api/admin/observability/inspect', desc: 'POST { url } to check Google Search Console index status' },
                ].map((ep, i) => (
                  <div key={i} className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.01] p-2.5">
                    <span className="text-cyan-300">{ep.path}</span>
                    <span className="text-slate-400 text-[11px] font-sans">{ep.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
