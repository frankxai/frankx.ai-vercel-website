'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Building2,
  Calendar,
  CheckCircle2,
  Circle,
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
import type { PlanInitiative } from '@/lib/plan/initiatives'
import { planTrackConfig, planStatusConfig, planPriorityConfig } from '@/lib/plan/initiatives'

// ── Icon Map ──

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2, Code, FileText, Layers, Map, Music, Package, Palette,
  Play, Rocket, Search, Share2, Shield, Smartphone, Sparkles,
  Target, TrendingUp, Zap,
}

// ── Color Config ──

const colorConfig: Record<string, { border: string; text: string; bg: string; gradient: string; progressBg: string; progressBar: string }> = {
  emerald: { border: 'border-emerald-500/30', text: 'text-emerald-400', bg: 'bg-emerald-500/10', gradient: 'from-emerald-500/20 to-emerald-500/5', progressBg: 'bg-emerald-500/10', progressBar: 'bg-emerald-500' },
  cyan: { border: 'border-cyan-500/30', text: 'text-cyan-400', bg: 'bg-cyan-500/10', gradient: 'from-cyan-500/20 to-cyan-500/5', progressBg: 'bg-cyan-500/10', progressBar: 'bg-cyan-500' },
  violet: { border: 'border-violet-500/30', text: 'text-violet-400', bg: 'bg-violet-500/10', gradient: 'from-violet-500/20 to-violet-500/5', progressBg: 'bg-violet-500/10', progressBar: 'bg-violet-500' },
  amber: { border: 'border-amber-500/30', text: 'text-amber-400', bg: 'bg-amber-500/10', gradient: 'from-amber-500/20 to-amber-500/5', progressBg: 'bg-amber-500/10', progressBar: 'bg-amber-500' },
  rose: { border: 'border-rose-500/30', text: 'text-rose-400', bg: 'bg-rose-500/10', gradient: 'from-rose-500/20 to-rose-500/5', progressBg: 'bg-rose-500/10', progressBar: 'bg-rose-500' },
  blue: { border: 'border-blue-500/30', text: 'text-blue-400', bg: 'bg-blue-500/10', gradient: 'from-blue-500/20 to-blue-500/5', progressBg: 'bg-blue-500/10', progressBar: 'bg-blue-500' },
  orange: { border: 'border-orange-500/30', text: 'text-orange-400', bg: 'bg-orange-500/10', gradient: 'from-orange-500/20 to-orange-500/5', progressBg: 'bg-orange-500/10', progressBar: 'bg-orange-500' },
  teal: { border: 'border-teal-500/30', text: 'text-teal-400', bg: 'bg-teal-500/10', gradient: 'from-teal-500/20 to-teal-500/5', progressBg: 'bg-teal-500/10', progressBar: 'bg-teal-500' },
}

// ── Task Status Config ──

const taskStatusIcons: Record<string, { icon: React.ComponentType<{ className?: string }>; color: string }> = {
  done: { icon: CheckCircle2, color: 'text-emerald-400' },
  active: { icon: Zap, color: 'text-amber-400' },
  pending: { icon: Circle, color: 'text-white/20' },
  blocked: { icon: Shield, color: 'text-rose-400' },
}

// ── Milestone Status Config ──

const milestoneStatusConfig: Record<string, { color: string; label: string }> = {
  hit: { color: 'text-emerald-400', label: 'Hit' },
  upcoming: { color: 'text-blue-400', label: 'Upcoming' },
  missed: { color: 'text-rose-400', label: 'Missed' },
  adjusted: { color: 'text-amber-400', label: 'Adjusted' },
}

// ── Comment Type Config ──

const commentTypeConfig: Record<string, { icon: React.ComponentType<{ className?: string }>; color: string; label: string }> = {
  update: { icon: ArrowRight, color: 'text-blue-400', label: 'Update' },
  insight: { icon: Lightbulb, color: 'text-amber-400', label: 'Insight' },
  blocker: { icon: Shield, color: 'text-rose-400', label: 'Blocker' },
  celebration: { icon: Sparkles, color: 'text-emerald-400', label: 'Shipped' },
}

// ── Link Type Config ──

const linkTypeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  blog: FileText,
  research: Search,
  feed: Sparkles,
  product: Package,
  external: ArrowUpRight,
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

// ── Props ──

interface PlanInitiativePageProps {
  initiative: PlanInitiative
  relatedInitiatives: PlanInitiative[]
}

export default function PlanInitiativePage({ initiative, relatedInitiatives }: PlanInitiativePageProps) {
  const shouldReduceMotion = useReducedMotion()
  const Icon = iconMap[initiative.icon] || Layers
  const colors = colorConfig[initiative.color] || colorConfig.emerald
  const statusCfg = planStatusConfig[initiative.status]
  const priorityCfg = planPriorityConfig[initiative.priority]
  const trackCfg = planTrackConfig[initiative.track]
  const doneTasks = initiative.tasks.filter(t => t.status === 'done').length

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
      </div>

      <div className="relative z-10">
        {/* Breadcrumb + Hero */}
        <section className="pt-28 pb-12 md:pt-36 md:pb-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5 }}
            >
              <Link
                href="/plan"
                className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors mb-8"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to The Plan
              </Link>
            </motion.div>

            {/* Header */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <div className={`p-3 ${colors.bg} rounded-xl ${colors.border} border`}>
                  <Icon className={`w-7 h-7 ${colors.text}`} />
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${colors.bg} ${statusCfg.color}`}>
                    {statusCfg.label}
                  </span>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full bg-white/[0.04] ${priorityCfg.color}`}>
                    {priorityCfg.label} Priority
                  </span>
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/[0.04] text-white/50">
                    {trackCfg.label}
                  </span>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 tracking-tight leading-[1.1]">
                {initiative.title}
              </h1>
              <p className="text-lg text-white/50 mb-6">
                {initiative.subtitle}
              </p>

              {/* Progress Bar */}
              <div className="max-w-md mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white/40">Progress</span>
                  <span className={`text-sm font-bold ${colors.text}`}>{initiative.progress}%</span>
                </div>
                <div className={`h-2 rounded-full ${colors.progressBg}`}>
                  <div
                    className={`h-full rounded-full ${colors.progressBar} transition-all duration-500`}
                    style={{ width: `${initiative.progress}%` }}
                  />
                </div>
              </div>

              {/* Meta */}
              <div className="flex flex-wrap gap-4 text-xs text-white/30">
                {initiative.leadAgent && (
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Lead: {initiative.leadAgent}
                  </span>
                )}
                {initiative.startedAt && (
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    Started: {initiative.startedAt}
                  </span>
                )}
                {initiative.targetDate && (
                  <span className="flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5" />
                    Target: {initiative.targetDate}
                  </span>
                )}
                {initiative.shippedAt && (
                  <span className="flex items-center gap-1.5">
                    <Rocket className="w-3.5 h-3.5 text-emerald-400" />
                    Shipped: {initiative.shippedAt}
                  </span>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Highlights */}
        {initiative.highlights.length > 0 && (
          <section className="pb-12">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {initiative.highlights.map((h, i) => (
                  <motion.div
                    key={i}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={shouldReduceMotion ? { duration: 0 } : { delay: i * 0.06 }}
                    className={`bg-white/[0.03] border border-white/[0.06] rounded-xl p-4`}
                  >
                    <p className={`text-2xl font-bold ${colors.text} mb-0.5`}>{h.stat}</p>
                    <p className="text-xs text-white/40">{h.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Description + TL;DR */}
        <section className="pb-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`bg-white/[0.02] border ${colors.border} rounded-2xl p-6 md:p-8 mb-6`}>
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className={`w-4 h-4 ${colors.text}`} />
                <span className={`text-xs font-bold ${colors.text} uppercase tracking-wider`}>TL;DR</span>
              </div>
              <p className="text-sm text-white/70 leading-relaxed">
                {initiative.tldr}
              </p>
            </div>

            <p className="text-sm text-white/50 leading-relaxed">
              {initiative.description}
            </p>
          </div>
        </section>

        {/* Task List */}
        {initiative.tasks.length > 0 && (
          <section className="pb-12">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Tasks</h2>
                <span className="text-xs text-white/30">
                  {doneTasks}/{initiative.tasks.length} completed
                </span>
              </div>

              <div className="space-y-2">
                {initiative.tasks.map((task, index) => {
                  const taskCfg = taskStatusIcons[task.status] || taskStatusIcons.pending
                  const TaskStatusIcon = taskCfg.icon

                  return (
                    <motion.div
                      key={task.id}
                      initial={shouldReduceMotion ? false : { opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={shouldReduceMotion ? { duration: 0 } : { delay: index * 0.04 }}
                      className={`
                        flex items-start gap-3 p-3 rounded-xl border transition-all
                        ${task.status === 'done'
                          ? 'bg-emerald-500/[0.03] border-emerald-500/10'
                          : task.status === 'active'
                            ? 'bg-amber-500/[0.03] border-amber-500/10'
                            : 'bg-white/[0.01] border-white/[0.04]'
                        }
                      `}
                    >
                      <TaskStatusIcon className={`w-4 h-4 mt-0.5 ${taskCfg.color} flex-shrink-0`} />
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm ${task.status === 'done' ? 'text-white/40 line-through' : 'text-white/80'}`}>
                          {task.title}
                        </p>
                        {(task.assignedAgent || task.completedAt) && (
                          <div className="flex items-center gap-3 mt-1">
                            {task.assignedAgent && (
                              <span className="text-[10px] text-white/25">{task.assignedAgent}</span>
                            )}
                            {task.completedAt && (
                              <span className="text-[10px] text-emerald-400/50">{task.completedAt}</span>
                            )}
                          </div>
                        )}
                        {task.note && (
                          <p className="text-[11px] text-white/30 mt-1">{task.note}</p>
                        )}
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </section>
        )}

        {/* Milestones Timeline */}
        {initiative.milestones.length > 0 && (
          <section className="pb-12">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-xl font-bold text-white mb-6">Milestones</h2>

              <div className="relative space-y-4 pl-6">
                {/* Vertical line */}
                <div className="absolute left-[7px] top-2 bottom-2 w-px bg-white/[0.06]" />

                {initiative.milestones.map((milestone, index) => {
                  const msCfg = milestoneStatusConfig[milestone.status] || milestoneStatusConfig.upcoming

                  return (
                    <motion.div
                      key={index}
                      initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={shouldReduceMotion ? { duration: 0 } : { delay: index * 0.08 }}
                      className="relative flex items-start gap-4"
                    >
                      {/* Dot */}
                      <div className={`
                        absolute -left-6 top-1.5 w-3.5 h-3.5 rounded-full border-2
                        ${milestone.status === 'hit'
                          ? 'bg-emerald-500 border-emerald-500'
                          : milestone.status === 'upcoming'
                            ? 'bg-transparent border-blue-400'
                            : milestone.status === 'missed'
                              ? 'bg-rose-500 border-rose-500'
                              : 'bg-amber-500 border-amber-500'
                        }
                      `} />

                      <div className="flex-1 bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-sm font-semibold text-white">{milestone.title}</h3>
                          <span className={`text-[10px] font-medium ${msCfg.color}`}>{msCfg.label}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-white/30">
                          <Calendar className="w-3 h-3" />
                          {milestone.targetDate}
                        </div>
                        {milestone.description && (
                          <p className="text-xs text-white/40 mt-2">{milestone.description}</p>
                        )}
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </section>
        )}

        {/* Agent Commentary */}
        {initiative.agentComments.length > 0 && (
          <section className="pb-12">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <h2 className="text-xl font-bold text-white">Agent Commentary</h2>
              </div>

              <div className="space-y-3">
                {initiative.agentComments.map((comment, index) => {
                  const typeCfg = commentTypeConfig[comment.type] || commentTypeConfig.update
                  const TypeIcon = typeCfg.icon

                  return (
                    <motion.div
                      key={index}
                      initial={shouldReduceMotion ? false : { opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={shouldReduceMotion ? { duration: 0 } : { delay: index * 0.06 }}
                      className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4"
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-1.5 rounded-lg bg-white/[0.04]">
                          <TypeIcon className={`w-3.5 h-3.5 ${typeCfg.color}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="text-xs font-bold text-white">{comment.agent}</span>
                            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                              comment.type === 'celebration' ? 'bg-emerald-500/10 text-emerald-400' :
                              comment.type === 'insight' ? 'bg-amber-500/10 text-amber-400' :
                              comment.type === 'blocker' ? 'bg-rose-500/10 text-rose-400' :
                              'bg-blue-500/10 text-blue-400'
                            }`}>
                              {typeCfg.label}
                            </span>
                            <span className="ml-auto text-[10px] text-white/20 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {relativeTime(comment.timestamp)}
                            </span>
                          </div>
                          <p className="text-sm text-white/50 leading-relaxed">
                            {comment.content}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </section>
        )}

        {/* Related Links */}
        {initiative.relatedLinks.length > 0 && (
          <section className="pb-12">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-xl font-bold text-white mb-6">Related</h2>
              <div className="flex flex-wrap gap-3">
                {initiative.relatedLinks.map((link, index) => {
                  const LinkIcon = linkTypeIcons[link.type] || ArrowUpRight
                  return (
                    <Link
                      key={index}
                      href={link.href}
                      className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white bg-white/[0.03] border border-white/[0.06] px-4 py-2 rounded-full transition-all hover:bg-white/[0.06]"
                    >
                      <LinkIcon className="w-3.5 h-3.5" />
                      {link.label}
                    </Link>
                  )
                })}
              </div>
            </div>
          </section>
        )}

        {/* Related Initiatives */}
        {relatedInitiatives.length > 0 && (
          <section className="pb-16">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-xl font-bold text-white mb-6">Connected Initiatives</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {relatedInitiatives.map((related) => {
                  const RelatedIcon = iconMap[related.icon] || Layers
                  const relatedColors = colorConfig[related.color] || colorConfig.emerald
                  const relatedStatus = planStatusConfig[related.status]
                  const isDependency = initiative.dependsOn.includes(related.slug)

                  return (
                    <Link
                      key={related.slug}
                      href={`/plan/${related.slug}`}
                      className="group block bg-white/[0.02] border border-white/[0.06] rounded-xl p-5 hover:bg-white/[0.04] hover:border-white/[0.1] transition-all"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className={`p-2 ${relatedColors.bg} rounded-lg`}>
                          <RelatedIcon className={`w-4 h-4 ${relatedColors.text}`} />
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-white/25">
                            {isDependency ? 'Depends on' : 'Enables'}
                          </span>
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${relatedColors.bg} ${relatedStatus.color}`}>
                            {relatedStatus.label}
                          </span>
                        </div>
                      </div>
                      <h3 className="text-sm font-bold text-white mb-1 group-hover:text-white transition-colors">
                        {related.title}
                      </h3>
                      <p className="text-xs text-white/40 line-clamp-2">
                        {related.subtitle}
                      </p>
                    </Link>
                  )
                })}
              </div>
            </div>
          </section>
        )}

        {/* Back CTA */}
        <section className="pb-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Link
              href="/plan"
              className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to all initiatives
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
