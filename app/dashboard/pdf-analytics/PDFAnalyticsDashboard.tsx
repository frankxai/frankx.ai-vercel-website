'use client'

import { useState, useEffect, useCallback } from 'react'
import { BarChart3, Download, Eye, Mail, Users, TrendingUp, Clock, Target } from 'lucide-react'
import type { AnalyticsSummary, WeeklyStats } from '@/lib/types/pdf-analytics'

export default function PDFAnalyticsDashboard() {
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null)
  const [weeklyStats, setWeeklyStats] = useState<WeeklyStats[]>([])
  const [days, setDays] = useState(30)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const [summaryRes, statsRes] = await Promise.all([
        fetch(`/api/dashboard/analytics?days=${days}`),
        fetch('/api/dashboard/weekly-stats?weeks=12')
      ])

      if (!summaryRes.ok || !statsRes.ok) {
        throw new Error('Failed to fetch analytics data')
      }

      const summaryData = await summaryRes.json()
      const statsData = await statsRes.json()

      setSummary(summaryData.summary)
      setWeeklyStats(statsData.stats)
    } catch (err) {
      setError('Failed to load analytics. Please try again.')
      console.error('Analytics fetch error:', err)
    } finally {
      setIsLoading(false)
    }
  }, [days])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading analytics...</p>
        </div>
      </div>
    )
  }

  if (error || !summary) {
    return (
      <div className="text-center py-20" role="alert">
        <p className="text-red-300 mb-4">{error || 'Failed to load analytics'}</p>
        <button
          onClick={() => fetchData()}
          className="px-6 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-white font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Time range selector */}
      <div className="flex gap-2" role="tablist" aria-label="Time range">
        {[7, 30, 90].map((d) => (
          <button
            key={d}
            role="tab"
            aria-selected={days === d}
            onClick={() => setDays(d)}
            className={`px-4 py-2 rounded-lg font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b] ${
              days === d
                ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/20'
                : 'bg-white/[0.04] border border-white/10 text-gray-300 hover:text-white hover:bg-white/[0.08]'
            }`}
          >
            Last {d} days
          </button>
        ))}
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          icon={<Eye className="w-6 h-6" />}
          label="Total Views"
          value={summary.totalViews}
          color="cyan"
        />
        <MetricCard
          icon={<Download className="w-6 h-6" />}
          label="Total Downloads"
          value={summary.totalDownloads}
          color="purple"
        />
        <MetricCard
          icon={<Users className="w-6 h-6" />}
          label="New Leads"
          value={summary.totalLeads}
          color="green"
        />
        <MetricCard
          icon={<Mail className="w-6 h-6" />}
          label="Emails Sent"
          value={summary.totalEmails}
          color="blue"
        />
      </div>

      {/* Engagement metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center" aria-hidden="true">
              <Target className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Avg completion</h3>
              <p className="text-sm text-gray-400">How much readers complete</p>
            </div>
          </div>
          <div className="text-4xl font-bold text-white mb-2 tabular-nums">
            {Math.round(summary.averageCompletionRate)}%
          </div>
          <div
            className="w-full h-2 bg-white/5 rounded-full overflow-hidden"
            role="progressbar"
            aria-valuenow={Math.round(summary.averageCompletionRate)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Average completion rate"
          >
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-purple-600"
              style={{ width: `${summary.averageCompletionRate}%` }}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center" aria-hidden="true">
              <Clock className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Avg time spent</h3>
              <p className="text-sm text-gray-400">Reader engagement time</p>
            </div>
          </div>
          <div className="text-4xl font-bold text-white tabular-nums">
            {Math.round(summary.averageTimeSpent / 60)}m
          </div>
          <p className="text-sm text-gray-400 mt-2 tabular-nums">
            {Math.round(summary.averageTimeSpent)} seconds average
          </p>
        </div>
      </div>

      {/* Top guides */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6">
        <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-cyan-400" aria-hidden="true" />
          Top performing guides
        </h3>

        <ol className="space-y-3">
          {summary.topGuides.map((guide, index) => (
            <li
              key={guide.slug}
              className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-all"
            >
              <div className="text-2xl font-bold text-gray-600 tabular-nums w-10" aria-hidden="true">#{index + 1}</div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-white mb-1 truncate">{guide.title}</h4>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-400 tabular-nums">
                  <span>{guide.views.toLocaleString()} views</span>
                  <span aria-hidden="true">•</span>
                  <span>{guide.downloads.toLocaleString()} downloads</span>
                  <span aria-hidden="true">•</span>
                  <span>{guide.leads.toLocaleString()} leads</span>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-lg font-semibold text-cyan-400 tabular-nums">
                  {guide.conversionRate.toFixed(1)}%
                </div>
                <div className="text-xs text-gray-500">conversion</div>
              </div>
            </li>
          ))}

          {summary.topGuides.length === 0 && (
            <li className="text-center py-8 text-gray-500 list-none">
              No guide data yet. Start sharing your guides.
            </li>
          )}
        </ol>
      </div>

      {/* Lead insights */}
      {(Object.keys(summary.leadsByInterest).length > 0 || Object.keys(summary.leadsBySource).length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.keys(summary.leadsByInterest).length > 0 && (
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Leads by interest</h3>
              <dl className="space-y-3">
                {Object.entries(summary.leadsByInterest)
                  .sort(([, a], [, b]) => b - a)
                  .map(([interest, count]) => (
                    <div key={interest} className="flex items-center justify-between">
                      <dt className="text-gray-300 capitalize">
                        {interest.replace('-', ' ')}
                      </dt>
                      <dd className="font-semibold text-white tabular-nums">{count}</dd>
                    </div>
                  ))}
              </dl>
            </div>
          )}

          {Object.keys(summary.leadsBySource).length > 0 && (
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Leads by source</h3>
              <dl className="space-y-3">
                {Object.entries(summary.leadsBySource)
                  .sort(([, a], [, b]) => b - a)
                  .map(([source, count]) => (
                    <div key={source} className="flex items-center justify-between">
                      <dt className="text-gray-300 capitalize">{source}</dt>
                      <dd className="font-semibold text-white tabular-nums">{count}</dd>
                    </div>
                  ))}
              </dl>
            </div>
          )}
        </div>
      )}

      {/* Recent activity */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6">
        <h3 className="text-xl font-semibold text-white mb-6">Recent activity</h3>

        <ul className="space-y-3">
          {summary.recentActivity.map((activity, index) => (
            <li
              key={index}
              className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] transition-all"
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  activity.type === 'view'
                    ? 'bg-cyan-500/10 text-cyan-400'
                    : activity.type === 'download'
                    ? 'bg-purple-500/10 text-purple-400'
                    : 'bg-green-500/10 text-green-400'
                }`}
                aria-hidden="true"
              >
                {activity.type === 'view' && <Eye size={16} />}
                {activity.type === 'download' && <Download size={16} />}
                {activity.type === 'lead' && <Users size={16} />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-white font-medium truncate">
                  {activity.guideTitle}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {activity.details}
                </div>
              </div>
              <time
                dateTime={new Date(activity.timestamp).toISOString()}
                className="text-xs text-gray-500 flex-shrink-0 tabular-nums"
              >
                {new Date(activity.timestamp).toLocaleDateString()}
              </time>
            </li>
          ))}

          {summary.recentActivity.length === 0 && (
            <li className="text-center py-8 text-gray-500 list-none">
              No recent activity
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

function MetricCard({
  icon,
  label,
  value,
  color
}: {
  icon: React.ReactNode
  label: string
  value: number
  color: 'cyan' | 'purple' | 'green' | 'blue'
}) {
  const accent = {
    cyan: 'text-cyan-400 from-cyan-500/20 to-cyan-500/10',
    purple: 'text-purple-400 from-purple-500/20 to-purple-500/10',
    green: 'text-green-400 from-green-500/20 to-green-500/10',
    blue: 'text-blue-400 from-blue-500/20 to-blue-500/10'
  } as const

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${accent[color]} flex items-center justify-center`} aria-hidden="true">
          {icon}
        </div>
      </div>
      <div className="text-3xl font-bold text-white mb-1 tabular-nums">{value.toLocaleString()}</div>
      <div className="text-sm text-gray-400">{label}</div>
    </div>
  )
}
