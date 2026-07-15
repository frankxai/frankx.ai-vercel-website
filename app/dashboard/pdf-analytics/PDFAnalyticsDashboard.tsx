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
      <div className="text-center py-20">
        <p className="text-red-400 mb-4">{error || 'Failed to load analytics'}</p>
        <button
          onClick={() => fetchData()}
          className="px-6 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-white font-medium transition-all"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Time range selector */}
      <div className="flex gap-2">
        {[7, 30, 90].map((d) => (
          <button
            key={d}
            onClick={() => setDays(d)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              days === d
                ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:text-white'
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
        <div className="rounded-xl border border-gray-800 bg-gradient-to-br from-gray-900 to-gray-950 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
              <Target className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Avg Completion</h3>
              <p className="text-sm text-gray-400">How much readers complete</p>
            </div>
          </div>
          <div className="text-4xl font-bold text-white mb-2">
            {Math.round(summary.averageCompletionRate)}%
          </div>
          <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-purple-600"
              style={{ width: `${summary.averageCompletionRate}%` }}
            />
          </div>
        </div>

        <div className="rounded-xl border border-gray-800 bg-gradient-to-br from-gray-900 to-gray-950 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Avg Time Spent</h3>
              <p className="text-sm text-gray-400">Reader engagement time</p>
            </div>
          </div>
          <div className="text-4xl font-bold text-white">
            {Math.round(summary.averageTimeSpent / 60)}m
          </div>
          <p className="text-sm text-gray-400 mt-2">
            {Math.round(summary.averageTimeSpent)} seconds average
          </p>
        </div>
      </div>

      {/* Top guides */}
      <div className="rounded-xl border border-gray-800 bg-gradient-to-br from-gray-900 to-gray-950 p-6">
        <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-cyan-400" />
          Top Performing Guides
        </h3>

        <div className="space-y-4">
          {summary.topGuides.map((guide, index) => (
            <div
              key={guide.slug}
              className="flex items-center gap-4 p-4 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-all"
            >
              <div className="text-2xl font-bold text-gray-600">#{index + 1}</div>
              <div className="flex-1">
                <h4 className="font-semibold text-white mb-1">{guide.title}</h4>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span>{guide.views} views</span>
                  <span>•</span>
                  <span>{guide.downloads} downloads</span>
                  <span>•</span>
                  <span>{guide.leads} leads</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-cyan-400">
                  {guide.conversionRate.toFixed(1)}%
                </div>
                <div className="text-xs text-gray-500">conversion</div>
              </div>
            </div>
          ))}

          {summary.topGuides.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No guide data yet. Start sharing your guides!
            </div>
          )}
        </div>
      </div>

      {/* Lead insights */}
      {(Object.keys(summary.leadsByInterest).length > 0 || Object.keys(summary.leadsBySource).length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.keys(summary.leadsByInterest).length > 0 && (
            <div className="rounded-xl border border-gray-800 bg-gradient-to-br from-gray-900 to-gray-950 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Leads by Interest</h3>
              <div className="space-y-3">
                {Object.entries(summary.leadsByInterest)
                  .sort(([, a], [, b]) => b - a)
                  .map(([interest, count]) => (
                    <div key={interest} className="flex items-center justify-between">
                      <span className="text-gray-300 capitalize">
                        {interest.replace('-', ' ')}
                      </span>
                      <span className="font-semibold text-white">{count}</span>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {Object.keys(summary.leadsBySource).length > 0 && (
            <div className="rounded-xl border border-gray-800 bg-gradient-to-br from-gray-900 to-gray-950 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Leads by Source</h3>
              <div className="space-y-3">
                {Object.entries(summary.leadsBySource)
                  .sort(([, a], [, b]) => b - a)
                  .map(([source, count]) => (
                    <div key={source} className="flex items-center justify-between">
                      <span className="text-gray-300 capitalize">{source}</span>
                      <span className="font-semibold text-white">{count}</span>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Recent activity */}
      <div className="rounded-xl border border-gray-800 bg-gradient-to-br from-gray-900 to-gray-950 p-6">
        <h3 className="text-xl font-semibold text-white mb-6">Recent Activity</h3>

        <div className="space-y-3">
          {summary.recentActivity.map((activity, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-all"
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                activity.type === 'view'
                  ? 'bg-cyan-500/10 text-cyan-400'
                  : activity.type === 'download'
                  ? 'bg-purple-500/10 text-purple-400'
                  : 'bg-green-500/10 text-green-400'
              }`}>
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
              <div className="text-xs text-gray-500 flex-shrink-0">
                {new Date(activity.timestamp).toLocaleDateString()}
              </div>
            </div>
          ))}

          {summary.recentActivity.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No recent activity
            </div>
          )}
        </div>
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
  color: string
}) {
  const colorClasses = {
    cyan: 'from-cyan-500/10 to-cyan-500/5 border-cyan-500/20 text-cyan-400',
    purple: 'from-purple-500/10 to-purple-500/5 border-purple-500/20 text-purple-400',
    green: 'from-green-500/10 to-green-500/5 border-green-500/20 text-green-400',
    blue: 'from-blue-500/10 to-blue-500/5 border-blue-500/20 text-blue-400'
  }

  return (
    <div className={`rounded-xl border bg-gradient-to-br p-6 ${colorClasses[color as keyof typeof colorClasses]}`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${color === 'cyan' ? 'from-cyan-500/20 to-cyan-500/10' : color === 'purple' ? 'from-purple-500/20 to-purple-500/10' : color === 'green' ? 'from-green-500/20 to-green-500/10' : 'from-blue-500/20 to-blue-500/10'} flex items-center justify-center`}>
          {icon}
        </div>
      </div>
      <div className="text-3xl font-bold text-white mb-1">{value.toLocaleString()}</div>
      <div className="text-sm text-gray-400">{label}</div>
    </div>
  )
}
