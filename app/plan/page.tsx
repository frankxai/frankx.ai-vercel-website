'use client'

import { useState, useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  Clock,
  Code,
  FileText,
  Layers,
  Lightbulb,
  Map,
  Music,
  Package,
  Palette,
  Play,
  Rocket,
  Search,
  Share2,
  Shield,
  Smartphone,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
} from 'lucide-react'
import {
  planInitiatives,
  planTrackConfig,
  planStatusConfig,
  planPriorityConfig,
} from '@/lib/plan/initiatives'
import type { PlanTrack, PlanStatus, PlanAgentComment } from '@/lib/plan/initiatives'

// ── Icon Map ──

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2, Code, FileText, Layers, Map, Music, Package, Palette,
  Play, Rocket, Search, Share2, Shield, Smartphone, Sparkles,
  Target, TrendingUp, Zap,
}

// ── Color Config ──

const colorConfig: Record<string, { border: string; text: string; bg: string; gradient: string; glow: string; progressBg: string; progressBar: string }> = {
  emerald: { border: 'border-emerald-500/30', text: 'text-emerald-400', bg: 'bg-emerald-500/10', gradient: 'from-emerald-500/20 to-emerald-500/5', glow: 'shadow-emerald-500/20', progressBg: 'bg-emerald-500/10', progressBar: 'bg-emerald-500' },
  cyan: { border: 'border-cyan-500/30', text: 'text-cyan-400', bg: 'bg-cyan-500/10', gradient: 'from-cyan-500/20 to-cyan-500/5', glow: 'shadow-cyan-500/20', progressBg: 'bg-cyan-500/10', progressBar: 'bg-cyan-500' },
  violet: { border: 'border-violet-500/30', text: 'text-violet-400', bg: 'bg-violet-500/10', gradient: 'from-violet-500/20 to-violet-500/5', glow: 'shadow-violet-500/20', progressBg: 'bg-violet-500/10', progressBar: 'bg-violet-500' },
  amber: { border: 'border-amber-500/30', text: 'text-amber-400', bg: 'bg-amber-500/10', gradient: 'from-amber-500/20 to-amber-500/5', glow: 'shadow-amber-500/20', progressBg: 'bg-amber-500/10', progressBar: 'bg-amber-500' },
  rose: { border: 'border-rose-500/30', text: 'text-rose-400', bg: 'bg-rose-500/10', gradient: 'from-rose-500/20 to-rose-500/5', glow: 'shadow-rose-500/20', progressBg: 'bg-rose-500/10', progressBar: 'bg-rose-500' },
  blue: { border: 'border-blue-500/30', text: 'text-blue-400', bg: 'bg-blue-500/10', gradient: 'from-blue-500/20 to-blue-500/5', glow: 'shadow-blue-500/20', progressBg: 'bg-blue-500/10', progressBar: 'bg-blue-500' },
  orange: { border: 'border-orange-500/30', text: 'text-orange-400', bg: 'bg-orange-500/10', gradient: 'from-orange-500/20 to-orange-500/5', glow: 'shadow-orange-500/20', progressBg: 'bg-orange-500/10', progressBar: 'bg-orange-500' },
  teal: { border: 'border-teal-500/30', text: 'text-teal-400', bg: 'bg-teal-500/10', gradient: 'from-teal-500/20 to-teal-500/5', glow: 'shadow-teal-500/20', progressBg: 'bg-teal-500/10', progressBar: 'bg-teal-500' },
}

// ── Computed Stats ──

const totalInitiatives = planInitiatives.length
const activeInitiatives = planInitiatives.filter(i => i.status === 'in-progress').length
const shippedInitiatives = planInitiatives.filter(i => i.status === 'shipped').length
const totalTasks = planInitiatives.reduce((sum, i) => sum + i.tasks.length, 0)
const completedTasks = planInitiatives.reduce(
  (sum, i) => sum + i.tasks.filter(t => t.status === 'done').length,
  0,
)

// ── Featured (top 3 by priority weight then progress) ──

const priorityWeight: Record<string, number> = { critical: 4, high: 3, medium: 2, low: 1 }
const featuredInitiatives = [...planInitiatives]
  .sort((a, b) => {
    const pw = (priorityWeight[b.priority] || 0) - (priorityWeight[a.priority] || 0)
    if (pw !== 0) return pw
    return b.progress - a.progress
  })
  .slice(0, 3)

// ── Recent Agent Comments (last 5 across all initiatives) ──

const recentComments: (PlanAgentComment & { initiativeSlug: string; initiativeTitle: string })[] =
  planInitiatives
    .flatMap(i =>
      i.agentComments.map(c => ({
        ...c,
        initiativeSlug: i.slug,
        initiativeTitle: i.title,
      })),
    )
    .sort((a, b) => b.timestamp.localeCompare(a.timestamp))
    .slice(0, 5)

// ── Track Tab Keys ──

const trackKeys: (PlanTrack | 'all')[] = ['all', 'content', 'product', 'distribution', 'technical', 'creative']

const trackIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  all: Layers,
  content: FileText,
  product: Package,
  distribution: Share2,
  technical: Code,
  creative: Palette,
}

// ── Status Keys ──

const statusKeys: PlanStatus[] = ['in-progress', 'planned', 'idea', 'shipped']

// ── Comment Type Icons ──

const commentTypeConfig: Record<string, { icon: React.ComponentType<{ className?: string }>; color: string }> = {
  update: { icon: ArrowRight, color: 'text-blue-400' },
  insight: { icon: Lightbulb, color: 'text-amber-400' },
  blocker: { icon: Shield, color: 'text-rose-400' },
  celebration: { icon: Sparkles, color: 'text-emerald-400' },
}

// ── Relative Time ──

function relativeTime(timestamp: string): string {
  const now = new Date()
  const then = new Date(timestamp)
  const diffMs = now.getTime() - then.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  if (diffMins < 60) return `${diffMins}m ago`
  const diffHrs = Math.floor(diffMins / 60)
  if (diffHrs < 24) return `${diffHrs}h ago`
  const diffDays = Math.floor(diffHrs / 24)
  if (diffDays < 7) return `${diffDays}d ago`
  return then.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

// ── Hero Section ──

function HeroSection() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-white/5 border border-white/10">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
            <span className="text-xs font-semibold text-violet-400 tracking-wider uppercase">
              Build in Public
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
            The
            <span className="block bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Plan
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/60 mb-8 leading-relaxed max-w-3xl">
            Everything we&apos;re building, why we&apos;re building it, and how AI agents
            collaborate with human direction. Full transparency, real-time updates.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="#featured"
              className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-white/90 transition-all"
            >
              View Initiatives
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/feed"
              className="inline-flex items-center gap-2 bg-white/5 text-white px-6 py-3 rounded-full font-semibold border border-white/10 hover:bg-white/10 transition-all"
            >
              Agent Feed
            </Link>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.3, duration: 0.8 }}
          className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: 'Initiatives', value: String(totalInitiatives), icon: Layers },
            { label: 'Active Now', value: String(activeInitiatives), icon: Zap },
            { label: 'Shipped', value: String(shippedInitiatives), icon: Rocket },
            { label: 'Tasks Done', value: `${completedTasks}/${totalTasks}`, icon: CheckCircle2 },
          ].map((stat, i) => (
            <div key={i} className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-xl p-4">
              <stat.icon className="w-4 h-4 text-white/30 mb-2" />
              <p className="text-2xl font-bold text-white mb-0.5">{stat.value}</p>
              <p className="text-xs text-white/40">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ── Featured Spotlight ──

function FeaturedSpotlight() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="featured" className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-3">
            <Target className="w-5 h-5 text-violet-400" />
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Top Priority
            </h2>
          </div>
          <p className="text-white/50 max-w-2xl">
            The initiatives we&apos;re focused on right now, ranked by priority and progress.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4">
          {featuredInitiatives.map((initiative, index) => {
            const Icon = iconMap[initiative.icon] || Layers
            const colors = colorConfig[initiative.color] || colorConfig.emerald
            const statusCfg = planStatusConfig[initiative.status]
            const priorityCfg = planPriorityConfig[initiative.priority]

            return (
              <motion.div
                key={initiative.slug}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.15 + index * 0.08 }}
              >
                <Link
                  href={`/plan/${initiative.slug}`}
                  className={`
                    group relative block rounded-2xl border bg-white/[0.02] p-6 h-full
                    transition-all duration-300 hover:bg-white/[0.05]
                    ${index === 0 ? `${colors.border} border-opacity-50` : 'border-white/[0.08]'}
                  `}
                >
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${colors.gradient} opacity-30 group-hover:opacity-60 transition-opacity duration-300`} />

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 ${colors.bg} rounded-xl ${colors.border} border`}>
                        <Icon className={`w-6 h-6 ${colors.text}`} />
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${colors.bg} ${statusCfg.color}`}>
                          {statusCfg.label}
                        </span>
                        <span className={`text-[10px] font-medium ${priorityCfg.color}`}>
                          {priorityCfg.label}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-1.5">
                      {initiative.title}
                    </h3>
                    <p className="text-sm text-white/40 mb-4 line-clamp-2">
                      {initiative.subtitle}
                    </p>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] text-white/30">Progress</span>
                        <span className={`text-[10px] font-semibold ${colors.text}`}>{initiative.progress}%</span>
                      </div>
                      <div className={`h-1.5 rounded-full ${colors.progressBg}`}>
                        <div
                          className={`h-full rounded-full ${colors.progressBar} transition-all duration-500`}
                          style={{ width: `${initiative.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {initiative.highlights.slice(0, 2).map((h, i) => (
                        <span
                          key={i}
                          className={`text-[10px] px-2 py-1 rounded-full ${colors.bg} ${colors.text} font-medium`}
                        >
                          {h.stat} {h.label}
                        </span>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-white/[0.04]">
                      <span className="text-[10px] text-white/25">
                        {planTrackConfig[initiative.track].label} &middot; {initiative.leadAgent}
                      </span>
                      <span className={`inline-flex items-center gap-1 text-xs font-medium ${colors.text} group-hover:gap-2 transition-all`}>
                        Details
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ── Initiatives Grid (with track + status filters) ──

function InitiativesGrid() {
  const shouldReduceMotion = useReducedMotion()
  const [activeTrack, setActiveTrack] = useState<PlanTrack | 'all'>('all')
  const [activeStatus, setActiveStatus] = useState<PlanStatus | 'all'>('all')

  const filteredInitiatives = useMemo(() => {
    let initiatives = planInitiatives

    if (activeTrack !== 'all') {
      initiatives = initiatives.filter(i => i.track === activeTrack)
    }

    if (activeStatus !== 'all') {
      initiatives = initiatives.filter(i => i.status === activeStatus)
    }

    return initiatives
  }, [activeTrack, activeStatus])

  return (
    <section id="initiatives" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            All Initiatives
          </h2>
          <p className="text-white/50 max-w-2xl">
            {totalInitiatives} initiatives across {Object.keys(planTrackConfig).length} tracks.
            Filter by track or status to find what you&apos;re interested in.
          </p>
        </div>

        {/* Track Tabs */}
        <div className="flex flex-wrap gap-2 mb-4">
          {trackKeys.map((key) => {
            const isActive = activeTrack === key
            const label = key === 'all' ? 'All Tracks' : planTrackConfig[key].label
            const count = key === 'all'
              ? planInitiatives.length
              : planInitiatives.filter(i => i.track === key).length
            const TrackIcon = trackIcons[key] || Layers

            return (
              <button
                key={key}
                onClick={() => setActiveTrack(key)}
                className={`
                  inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
                  transition-all duration-200
                  ${isActive
                    ? 'bg-white text-black'
                    : 'bg-white/[0.04] text-white/50 border border-white/[0.08] hover:bg-white/[0.08] hover:text-white/70'
                  }
                `}
              >
                <TrackIcon className={`w-3.5 h-3.5 ${isActive ? '' : 'opacity-60'}`} />
                {label}
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-black/10' : 'bg-white/[0.08]'}`}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Status Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveStatus('all')}
            className={`
              px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200
              ${activeStatus === 'all'
                ? 'bg-white/10 text-white border border-white/20'
                : 'text-white/40 border border-white/[0.06] hover:border-white/[0.12] hover:text-white/60'
              }
            `}
          >
            All Status
          </button>
          {statusKeys.map((key) => {
            const isActive = activeStatus === key
            const cfg = planStatusConfig[key]
            const count = (activeTrack === 'all'
              ? planInitiatives
              : planInitiatives.filter(i => i.track === activeTrack)
            ).filter(i => i.status === key).length

            return (
              <button
                key={key}
                onClick={() => setActiveStatus(key)}
                className={`
                  px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200
                  ${isActive
                    ? 'bg-white/10 text-white border border-white/20'
                    : 'text-white/40 border border-white/[0.06] hover:border-white/[0.12] hover:text-white/60'
                  }
                `}
              >
                <span className={isActive ? '' : cfg.color}>{cfg.label}</span>
                {count > 0 && (
                  <span className="ml-1.5 text-[10px] opacity-60">{count}</span>
                )}
              </button>
            )
          })}
        </div>

        {/* Results count */}
        {(activeTrack !== 'all' || activeStatus !== 'all') && (
          <p className="text-xs text-white/30 mb-4">
            Showing {filteredInitiatives.length} of {totalInitiatives} initiatives
          </p>
        )}

        {filteredInitiatives.length === 0 ? (
          <div className="text-center py-16">
            <Search className="w-8 h-8 text-white/20 mx-auto mb-4" />
            <p className="text-white/40 text-sm">No initiatives match your filters.</p>
            <button
              onClick={() => { setActiveTrack('all'); setActiveStatus('all') }}
              className="mt-3 text-xs text-violet-400 hover:text-violet-300 transition-colors"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredInitiatives.map((initiative, index) => {
              const Icon = iconMap[initiative.icon] || Layers
              const colors = colorConfig[initiative.color] || colorConfig.emerald
              const statusCfg = planStatusConfig[initiative.status]

              return (
                <motion.div
                  key={initiative.slug}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={shouldReduceMotion ? { duration: 0 } : { delay: Math.min(index * 0.04, 0.3) }}
                >
                  <Link
                    href={`/plan/${initiative.slug}`}
                    className="group relative block rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all duration-300 hover:bg-white/[0.04] hover:border-white/[0.12]"
                  >
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-2.5 ${colors.bg} rounded-xl`}>
                          <Icon className={`w-5 h-5 ${colors.text}`} />
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${colors.bg} ${statusCfg.color}`}>
                            {statusCfg.label}
                          </span>
                          <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors" />
                        </div>
                      </div>

                      <h3 className="text-base font-bold text-white mb-1.5">
                        {initiative.title}
                      </h3>
                      <p className="text-sm text-white/40 mb-4 line-clamp-2">
                        {initiative.subtitle}
                      </p>

                      {/* Progress Bar */}
                      {initiative.progress > 0 && (
                        <div className="mb-4">
                          <div className={`h-1 rounded-full ${colors.progressBg}`}>
                            <div
                              className={`h-full rounded-full ${colors.progressBar} transition-all`}
                              style={{ width: `${initiative.progress}%` }}
                            />
                          </div>
                          <span className="text-[10px] text-white/25 mt-1 block">{initiative.progress}%</span>
                        </div>
                      )}

                      {/* Highlights */}
                      <div className="flex flex-wrap gap-1.5">
                        {initiative.highlights.slice(0, 2).map((h, i) => (
                          <span
                            key={i}
                            className="text-[10px] px-2 py-1 bg-white/[0.04] border border-white/[0.06] rounded-full text-white/50"
                          >
                            <span className="font-semibold text-white/70">{h.stat}</span> {h.label}
                          </span>
                        ))}
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-3 mt-3 border-t border-white/[0.04]">
                        <span className="text-[10px] text-white/25">
                          {planTrackConfig[initiative.track].label} &middot; {initiative.leadAgent}
                        </span>
                        <span className="text-[10px] text-white/20">
                          {initiative.lastUpdated}
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

// ── Recent Agent Activity ──

function AgentActivitySection() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="activity" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Agent Activity
            </h2>
          </div>
          <p className="text-white/50 max-w-2xl">
            Recent updates from AI agents working across all initiatives.
          </p>
        </div>

        <div className="space-y-3">
          {recentComments.map((comment, index) => {
            const typeCfg = commentTypeConfig[comment.type] || commentTypeConfig.update
            const TypeIcon = typeCfg.icon

            return (
              <motion.div
                key={`${comment.initiativeSlug}-${index}`}
                initial={shouldReduceMotion ? false : { opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={shouldReduceMotion ? { duration: 0 } : { delay: index * 0.06 }}
              >
                <Link
                  href={`/plan/${comment.initiativeSlug}`}
                  className="group block bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 hover:bg-white/[0.04] hover:border-white/[0.1] transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-1.5 rounded-lg bg-white/[0.04] mt-0.5`}>
                      <TypeIcon className={`w-3.5 h-3.5 ${typeCfg.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-white">{comment.agent}</span>
                        <span className="text-[10px] text-white/20">&middot;</span>
                        <span className="text-[10px] text-white/30">{comment.initiativeTitle}</span>
                        <span className="ml-auto text-[10px] text-white/20 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {relativeTime(comment.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm text-white/50 leading-relaxed line-clamp-2">
                        {comment.content}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ── CTA Section ──

function CTASection() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-white/[0.02] border border-white/[0.06] rounded-3xl p-8 md:p-12 text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/[0.03] via-transparent to-cyan-500/[0.03] rounded-3xl" />

          <div className="relative">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Follow the Journey
            </h2>
            <p className="text-white/50 mb-8 max-w-xl mx-auto">
              Watch initiatives evolve, see agent commentary unfold, and track real-time
              progress on everything we&apos;re building.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/feed"
                className="inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-3.5 rounded-full font-semibold hover:bg-white/90 transition-all"
              >
                Agent Feed
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/research"
                className="inline-flex items-center justify-center gap-2 bg-white/5 text-white px-8 py-3.5 rounded-full font-semibold border border-white/10 hover:bg-white/10 transition-all"
              >
                Research Hub
              </Link>
              <Link
                href="/inner-circle"
                className="inline-flex items-center justify-center gap-2 bg-white/5 text-white px-8 py-3.5 rounded-full font-semibold border border-white/10 hover:bg-white/10 transition-all"
              >
                Inner Circle
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Main Page ──

export default function PlanPage() {
  return (
    <main className="relative min-h-screen bg-[#0a0a0b] text-white overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[#0a0a0b]" />
        <div
          className="absolute top-0 left-0 w-[70%] h-[60%]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.04) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute top-1/4 right-0 w-[60%] h-[50%]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.03) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-[50%] h-[40%]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.03) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.012]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10">
        <HeroSection />
        <FeaturedSpotlight />
        <InitiativesGrid />
        <AgentActivitySection />
        <CTASection />
      </div>
    </main>
  )
}
