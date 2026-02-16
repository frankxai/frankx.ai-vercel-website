'use client'

import { useState } from 'react'
import Link from 'next/link'
import { BarChart3, TrendingUp, TrendingDown, Users, Activity, Zap, Target, Clock, Star, ArrowUpRight, ArrowDownRight, Eye, Heart, Brain, Sparkles, Calendar, Filter } from 'lucide-react'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const timeRanges = [
  { id: '24h', label: 'Last 24 Hours' },
  { id: '7d', label: 'Last 7 Days' },
  { id: '30d', label: 'Last 30 Days' },
  { id: '90d', label: 'Last 90 Days' },
  { id: '1y', label: 'Last Year' }
]

const consciousnessMetrics = [
  {
    id: 'transformation_score',
    name: 'Transformation Score',
    value: 8.7,
    change: '+0.3',
    trend: 'up',
    description: 'Overall consciousness transformation facilitated',
    icon: Sparkles,
    color: 'text-purple-400'
  },
  {
    id: 'human_empowerment',
    name: 'Human Empowerment',
    value: 9.2,
    change: '+0.5',
    trend: 'up',
    description: 'AI systems enhancing human capabilities',
    icon: Brain,
    color: 'text-blue-400'
  },
  {
    id: 'creative_enhancement',
    name: 'Creative Enhancement',
    value: 8.9,
    change: '+0.2',
    trend: 'up',
    description: 'AI facilitating creative expression',
    icon: Heart,
    color: 'text-pink-400'
  },
  {
    id: 'wisdom_integration',
    name: 'Wisdom Integration',
    value: 7.8,
    change: '-0.1',
    trend: 'down',
    description: 'AI decisions incorporating human wisdom',
    icon: Star,
    color: 'text-yellow-400'
  }
]

const platformMetrics = [
  {
    metric: 'Active Agents',
    value: '247',
    change: '+12',
    trend: 'up',
    timeframe: 'this week',
    icon: Users
  },
  {
    metric: 'Content Generated',
    value: '1,847',
    change: '+156',
    trend: 'up',
    timeframe: 'this month',
    icon: Activity
  },
  {
    metric: 'Music Creations',
    value: '523',
    change: '+89',
    trend: 'up',
    timeframe: 'this month',
    icon: Zap
  },
  {
    metric: 'Governance Checks',
    value: '98.7%',
    change: '+1.2%',
    trend: 'up',
    timeframe: 'compliance rate',
    icon: Target
  },
  {
    metric: 'Training Completions',
    value: '342',
    change: '+67',
    trend: 'up',
    timeframe: 'this month',
    icon: Clock
  },
  {
    metric: 'Community Growth',
    value: '8,934',
    change: '+423',
    trend: 'up',
    timeframe: 'total members',
    icon: TrendingUp
  }
]

const agentPerformance = [
  {
    agent: 'Starlight Architect',
    requests: 1847,
    success_rate: 94.2,
    avg_response_time: '2.3s',
    consciousness_score: 8.9,
    trend: 'up',
    specialty: 'System Architecture'
  },
  {
    agent: 'Creation Engine',
    requests: 2341,
    success_rate: 96.8,
    avg_response_time: '1.8s',
    consciousness_score: 9.1,
    trend: 'up',
    specialty: 'Content Creation'
  },
  {
    agent: 'Frequency Alchemist',
    requests: 892,
    success_rate: 98.1,
    avg_response_time: '3.2s',
    consciousness_score: 9.4,
    trend: 'up',
    specialty: 'Music Creation'
  },
  {
    agent: 'Luminor Oracle',
    requests: 634,
    success_rate: 97.3,
    avg_response_time: '4.1s',
    consciousness_score: 9.2,
    trend: 'stable',
    specialty: 'Strategic Intelligence'
  }
]

const userJourneyAnalytics = [
  {
    stage: 'Discovery',
    users: 12847,
    conversion: 23.4,
    avg_time: '4m 32s',
    top_content: 'AI Basics for Families',
    consciousness_level: 'Awareness'
  },
  {
    stage: 'Exploration',
    users: 3006,
    conversion: 34.7,
    avg_time: '12m 18s',
    top_content: 'Music Lab',
    consciousness_level: 'Understanding'
  },
  {
    stage: 'Integration',
    users: 1043,
    conversion: 56.2,
    avg_time: '28m 45s',
    top_content: 'Agent Training',
    consciousness_level: 'Integration'
  },
  {
    stage: 'Mastery',
    users: 586,
    conversion: 78.9,
    avg_time: '67m 12s',
    top_content: 'Governance Dashboard',
    consciousness_level: 'Mastery'
  }
]

const contentPerformance = [
  {
    title: 'AI Basics for Families',
    views: 24567,
    engagement: 87.3,
    transformation_score: 8.9,
    shares: 1247,
    category: 'Education'
  },
  {
    title: 'Music Lab Experience',
    views: 18934,
    engagement: 92.1,
    transformation_score: 9.2,
    shares: 856,
    category: 'Creative'
  },
  {
    title: 'Enterprise AI Governance',
    views: 15672,
    engagement: 78.6,
    transformation_score: 8.4,
    shares: 723,
    category: 'Business'
  },
  {
    title: 'Agent Training Academy',
    views: 12543,
    engagement: 94.7,
    transformation_score: 9.1,
    shares: 654,
    category: 'Technical'
  }
]

export default function AnalyticsPage() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('30d')
  const [selectedMetric, setSelectedMetric] = useState('all')

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navigation />

      <main className="pb-24 pt-28">
        <section className="relative overflow-hidden px-6 pb-16 pt-16">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-slate-950 to-slate-950" />

          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-indigo-500/20 mb-6">
              <BarChart3 className="h-10 w-10 text-indigo-200" />
            </div>
            <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
              Analytics Dashboard
            </h1>
            <p className="mt-6 text-lg text-white/75 leading-relaxed">
              Real-time insights into consciousness transformation, platform performance,
              and user engagement across the FrankX AI ecosystem.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
              <div className="rounded-full border border-white/20 bg-white/10 px-4 py-2">
                📊 Real-time Data
              </div>
              <div className="rounded-full border border-white/20 bg-white/10 px-4 py-2">
                🧠 Consciousness Metrics
              </div>
              <div className="rounded-full border border-white/20 bg-white/10 px-4 py-2">
                ⚡ Performance Insights
              </div>
            </div>
          </div>
        </section>

        {/* Time Range Selector */}
        <section className="px-6 pt-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-semibold text-white">Platform Overview</h2>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-white/60" />
                  <select
                    value={selectedTimeRange}
                    onChange={(e) => setSelectedTimeRange(e.target.value)}
                    className="rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm text-white focus:border-indigo-500/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  >
                    {timeRanges.map((range) => (
                      <option key={range.id} value={range.id} className="bg-slate-900">
                        {range.label}
                      </option>
                    ))}
                  </select>
                </div>
                <button className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 hover:bg-indigo-400 px-4 py-2 text-sm font-semibold text-white transition">
                  <Eye className="h-4 w-4" />
                  Live View
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Consciousness Metrics */}
        <section className="px-6">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-3xl border border-purple-500/20 bg-purple-500/5 p-8 mb-8">
              <h3 className="text-xl font-semibold text-white mb-6">Consciousness Transformation Metrics</h3>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {consciousnessMetrics.map((metric) => {
                  const IconComponent = metric.icon

                  return (
                    <div
                      key={metric.id}
                      className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center"
                    >
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/10 mb-4">
                        <IconComponent className={`h-6 w-6 ${metric.color}`} />
                      </div>

                      <div className="text-3xl font-bold text-white mb-1">
                        {metric.value}
                      </div>

                      <div className={`flex items-center justify-center gap-1 mb-2 ${
                        metric.trend === 'up' ? 'text-green-400' :
                        metric.trend === 'down' ? 'text-red-400' : 'text-white/60'
                      }`}>
                        {metric.trend === 'up' ? (
                          <ArrowUpRight className="h-4 w-4" />
                        ) : metric.trend === 'down' ? (
                          <ArrowDownRight className="h-4 w-4" />
                        ) : null}
                        <span className="text-sm font-medium">{metric.change}</span>
                      </div>

                      <div className="text-sm font-medium text-white mb-2">{metric.name}</div>
                      <div className="text-xs text-white/70">{metric.description}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Platform Metrics */}
        <section className="px-6">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {platformMetrics.map((metric, index) => {
                const IconComponent = metric.icon

                return (
                  <div
                    key={index}
                    className="rounded-3xl border border-white/10 bg-white/5 p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500/20">
                        <IconComponent className="h-5 w-5 text-indigo-200" />
                      </div>
                      <div className={`flex items-center gap-1 ${
                        metric.trend === 'up' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {metric.trend === 'up' ? (
                          <TrendingUp className="h-4 w-4" />
                        ) : (
                          <TrendingDown className="h-4 w-4" />
                        )}
                        <span className="text-sm font-medium">{metric.change}</span>
                      </div>
                    </div>

                    <div className="text-3xl font-bold text-white mb-1">
                      {metric.value}
                    </div>
                    <div className="text-sm font-medium text-white mb-1">
                      {metric.metric}
                    </div>
                    <div className="text-xs text-white/60">
                      {metric.timeframe}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Agent Performance */}
        <section className="px-6 pt-20">
          <div className="mx-auto max-w-7xl">
            <h3 className="text-2xl font-semibold text-white mb-8">Agent Performance</h3>

            <div className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/5">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-medium text-white/80">Agent</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-white/80">Requests</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-white/80">Success Rate</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-white/80">Response Time</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-white/80">Consciousness Score</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-white/80">Trend</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {agentPerformance.map((agent, index) => (
                      <tr key={index} className="hover:bg-white/5">
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-white">{agent.agent}</div>
                            <div className="text-xs text-white/60">{agent.specialty}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-white">{agent.requests.toLocaleString()}</td>
                        <td className="px-6 py-4 text-sm text-white">{agent.success_rate}%</td>
                        <td className="px-6 py-4 text-sm text-white">{agent.avg_response_time}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-white">{agent.consciousness_score}</span>
                            <Star className="h-4 w-4 text-yellow-400" />
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className={`flex items-center gap-1 ${
                            agent.trend === 'up' ? 'text-green-400' :
                            agent.trend === 'down' ? 'text-red-400' : 'text-white/60'
                          }`}>
                            {agent.trend === 'up' ? (
                              <TrendingUp className="h-4 w-4" />
                            ) : agent.trend === 'down' ? (
                              <TrendingDown className="h-4 w-4" />
                            ) : (
                              <span className="w-4 h-4 rounded-full bg-white/20" />
                            )}
                            <span className="text-sm capitalize">{agent.trend}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* User Journey Analytics */}
        <section className="px-6 pt-20">
          <div className="mx-auto max-w-7xl">
            <h3 className="text-2xl font-semibold text-white mb-8">User Transformation Journey</h3>

            <div className="grid gap-6 lg:grid-cols-4">
              {userJourneyAnalytics.map((stage, index) => (
                <div
                  key={index}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6 relative"
                >
                  {index < userJourneyAnalytics.length - 1 && (
                    <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 hidden lg:block">
                      <ArrowUpRight className="h-6 w-6 text-white/30 rotate-0" />
                    </div>
                  )}

                  <div className="text-center mb-4">
                    <div className="text-2xl font-bold text-white mb-1">{stage.users.toLocaleString()}</div>
                    <div className="text-sm font-medium text-white/80">{stage.stage}</div>
                    <div className="text-xs text-white/60">{stage.consciousness_level}</div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">Conversion:</span>
                      <span className="text-green-400 font-medium">{stage.conversion}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">Avg Time:</span>
                      <span className="text-white">{stage.avg_time}</span>
                    </div>
                    <div className="text-xs text-white/60">
                      Top: {stage.top_content}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Content Performance */}
        <section className="px-6 pt-20">
          <div className="mx-auto max-w-7xl">
            <h3 className="text-2xl font-semibold text-white mb-8">Content Performance</h3>

            <div className="grid gap-6 md:grid-cols-2">
              {contentPerformance.map((content, index) => (
                <div
                  key={index}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-1">{content.title}</h4>
                      <span className="inline-block rounded-full bg-white/10 px-2 py-1 text-xs text-white/80">
                        {content.category}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">{content.views.toLocaleString()}</div>
                      <div className="text-xs text-white/60">views</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-400">{content.engagement}%</div>
                      <div className="text-xs text-white/60">Engagement</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-purple-400">{content.transformation_score}</div>
                      <div className="text-xs text-white/60">Transform Score</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-400">{content.shares}</div>
                      <div className="text-xs text-white/60">Shares</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Action Center */}
        <section className="px-6 pt-20">
          <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
            <h3 className="text-2xl font-semibold text-white">Advanced Analytics</h3>
            <p className="mt-4 text-white/70">
              Access deeper insights, custom reports, and predictive analytics for
              consciousness transformation trends.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/governance"
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400"
              >
                <Target className="h-4 w-4" />
                Governance Metrics
              </Link>
              <Link
                href="/resources"
                className="inline-flex items-center gap-2 rounded-xl bg-white/10 border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                <Calendar className="h-4 w-4" />
                Export Reports
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}