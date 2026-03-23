'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BarChart3,
  CheckCircle2,
  Clock,
  Component,
  CreditCard,
  ExternalLink,
  FlaskConical,
  Layout,
  Megaphone,
  ShoppingBag,
  Star,
  Trophy,
} from 'lucide-react'
import type { DesignExperiment, AgentEntry } from '@/lib/design-lab/experiments'
import { experimentCategoryConfig, experimentStatusConfig } from '@/lib/design-lab/experiments'

// ── Icon Map ──

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Layout, Component, BarChart3, Megaphone, ShoppingBag, CreditCard,
  FlaskConical, Award, Star, Trophy,
}

// ── Color Config ──

const colorConfig: Record<string, { border: string; text: string; bg: string; gradient: string }> = {
  emerald: { border: 'border-emerald-500/30', text: 'text-emerald-400', bg: 'bg-emerald-500/10', gradient: 'from-emerald-500/20 to-emerald-500/5' },
  cyan: { border: 'border-cyan-500/30', text: 'text-cyan-400', bg: 'bg-cyan-500/10', gradient: 'from-cyan-500/20 to-cyan-500/5' },
  violet: { border: 'border-violet-500/30', text: 'text-violet-400', bg: 'bg-violet-500/10', gradient: 'from-violet-500/20 to-violet-500/5' },
  amber: { border: 'border-amber-500/30', text: 'text-amber-400', bg: 'bg-amber-500/10', gradient: 'from-amber-500/20 to-amber-500/5' },
  rose: { border: 'border-rose-500/30', text: 'text-rose-400', bg: 'bg-rose-500/10', gradient: 'from-rose-500/20 to-rose-500/5' },
  blue: { border: 'border-blue-500/30', text: 'text-blue-400', bg: 'bg-blue-500/10', gradient: 'from-blue-500/20 to-blue-500/5' },
  orange: { border: 'border-orange-500/30', text: 'text-orange-400', bg: 'bg-orange-500/10', gradient: 'from-orange-500/20 to-orange-500/5' },
  teal: { border: 'border-teal-500/30', text: 'text-teal-400', bg: 'bg-teal-500/10', gradient: 'from-teal-500/20 to-teal-500/5' },
}

// ── Rating Dimensions ──

const ratingDimensions: { key: keyof AgentEntry['ratings']; label: string; color: string; barColor: string }[] = [
  { key: 'design', label: 'Design', color: 'text-violet-400', barColor: 'bg-violet-400' },
  { key: 'code', label: 'Code Quality', color: 'text-cyan-400', barColor: 'bg-cyan-400' },
  { key: 'accessibility', label: 'Accessibility', color: 'text-emerald-400', barColor: 'bg-emerald-400' },
  { key: 'performance', label: 'Performance', color: 'text-amber-400', barColor: 'bg-amber-400' },
  { key: 'creativity', label: 'Creativity', color: 'text-rose-400', barColor: 'bg-rose-400' },
]

interface Props {
  experiment: DesignExperiment
}

export default function DesignLabExperimentPage({ experiment }: Props) {
  const shouldReduceMotion = useReducedMotion()
  const colors = colorConfig[experiment.color] || colorConfig.teal
  const Icon = iconMap[experiment.icon] || FlaskConical
  const statusCfg = experimentStatusConfig[experiment.status]
  const categoryCfg = experimentCategoryConfig[experiment.category]

  return (
    <main className="relative min-h-screen bg-[#0a0a0b] text-white overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[#0a0a0b]" />
        <div
          className="absolute top-0 left-0 w-[70%] h-[60%]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(20, 184, 166, 0.04) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute top-1/4 right-0 w-[60%] h-[50%]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.03) 0%, transparent 70%)',
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
              className="mb-8"
            >
              <Link
                href="/design-lab"
                className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Design Lab
              </Link>
            </motion.div>

            {/* Hero */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.1, duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <div className={`p-2.5 ${colors.bg} rounded-xl ${colors.border} border`}>
                  <Icon className={`w-6 h-6 ${colors.text}`} />
                </div>
                <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${colors.bg} ${statusCfg.color}`}>
                  {statusCfg.label}
                </span>
                <span className="text-[10px] text-white/30 px-2 py-1 rounded-full bg-white/[0.04] border border-white/[0.06]">
                  {categoryCfg.label}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight leading-[1.1]">
                {experiment.title}
              </h1>
              <p className="text-lg text-white/50 mb-6 max-w-3xl leading-relaxed">
                {experiment.subtitle}
              </p>

              {/* Highlights */}
              <div className="flex flex-wrap gap-2 mb-6">
                {experiment.highlights.map((h, i) => (
                  <span
                    key={i}
                    className={`text-xs px-3 py-1.5 rounded-full ${colors.bg} ${colors.text} font-medium`}
                  >
                    {h.stat} {h.label}
                  </span>
                ))}
                {experiment.startedAt && (
                  <span className="text-xs px-3 py-1.5 rounded-full bg-white/[0.04] text-white/40 border border-white/[0.06]">
                    <Clock className="w-3 h-3 inline mr-1" />
                    {experiment.startedAt}
                  </span>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* The Brief */}
        <section className="pb-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.15 }}
              className={`bg-white/[0.02] border ${colors.border} rounded-2xl p-6 md:p-8`}
            >
              <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <FlaskConical className={`w-5 h-5 ${colors.text}`} />
                The Design Brief
              </h2>
              <p className="text-white/60 leading-relaxed mb-6">{experiment.brief}</p>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Constraints */}
                <div>
                  <h3 className="text-sm font-semibold text-white/70 mb-3">Constraints</h3>
                  <ul className="space-y-2">
                    {experiment.constraints.map((c, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-white/50">
                        <CheckCircle2 className="w-4 h-4 text-teal-400/60 mt-0.5 shrink-0" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Judging Criteria */}
                <div>
                  <h3 className="text-sm font-semibold text-white/70 mb-3">Judging Criteria</h3>
                  <ul className="space-y-2">
                    {experiment.judgingCriteria.map((c, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-white/50">
                        <Star className="w-4 h-4 text-amber-400/60 mt-0.5 shrink-0" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Agent Entries — Side by Side Comparison */}
        <section className="pb-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.2 }}
              className="mb-8"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Agent Entries
              </h2>
              <p className="text-white/50 max-w-2xl">
                {experiment.entries.length} agents competed. Each received the same brief and constraints.
              </p>
            </motion.div>

            <div className="space-y-6">
              {experiment.entries.map((entry, index) => (
                <AgentEntryCard
                  key={index}
                  entry={entry}
                  index={index}
                  colors={colors}
                  shouldReduceMotion={shouldReduceMotion ?? false}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Description */}
        <section className="pb-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.3 }}
              className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 md:p-8"
            >
              <h2 className="text-lg font-bold text-white mb-4">About This Experiment</h2>
              <p className="text-white/50 leading-relaxed">{experiment.description}</p>
            </motion.div>
          </div>
        </section>

        {/* Related Links */}
        {experiment.relatedLinks.length > 0 && (
          <section className="pb-16">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-lg font-bold text-white mb-4">Related</h2>
              <div className="flex flex-wrap gap-3">
                {experiment.relatedLinks.map((link, i) => (
                  <Link
                    key={i}
                    href={link.href}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.04] border border-white/[0.08] rounded-full text-sm text-white/60 hover:text-white/80 hover:bg-white/[0.06] transition-all"
                  >
                    {link.label}
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="pb-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/design-lab"
                className="inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-3.5 rounded-full font-semibold hover:bg-white/90 transition-all"
              >
                More Experiments
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 bg-white/5 text-white px-8 py-3.5 rounded-full font-semibold border border-white/10 hover:bg-white/10 transition-all"
              >
                Browse Products
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

// ── Agent Entry Card ──

function AgentEntryCard({
  entry,
  index,
  colors,
  shouldReduceMotion,
}: {
  entry: AgentEntry
  index: number
  colors: { border: string; text: string; bg: string; gradient: string }
  shouldReduceMotion: boolean
}) {
  const hasScores = entry.overallScore > 0

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.25 + index * 0.08 }}
      className={`
        relative bg-white/[0.02] border rounded-2xl p-6 md:p-8
        ${entry.isWinner ? `${colors.border} border-opacity-60` : 'border-white/[0.06]'}
      `}
    >
      {/* Winner gradient overlay */}
      {entry.isWinner && (
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${colors.gradient} opacity-40`} />
      )}

      <div className="relative z-10">
        {/* Header: Agent + Tool + Winner Badge */}
        <div className="flex items-start justify-between mb-4 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h3 className="text-lg font-bold text-white">{entry.agent}</h3>
              {entry.isWinner && (
                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full ${colors.bg} ${colors.text} text-[10px] font-semibold`}>
                  <Trophy className="w-3 h-3" />
                  Winner
                </span>
              )}
              {entry.isProductized && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold">
                  <ShoppingBag className="w-3 h-3" />
                  Productized
                </span>
              )}
            </div>
            <p className="text-sm text-white/40">{entry.tool}</p>
          </div>

          {hasScores && (
            <div className="text-right">
              <p className={`text-2xl font-bold ${entry.isWinner ? colors.text : 'text-white'}`}>
                {entry.overallScore}
              </p>
              <p className="text-[10px] text-white/30">/10 overall</p>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-white/50 leading-relaxed mb-6">{entry.description}</p>

        {/* Rating Bars */}
        {hasScores && (
          <div className="space-y-3 mb-6">
            {ratingDimensions.map((dim) => {
              const val = entry.ratings[dim.key]
              return (
                <div key={dim.key} className="flex items-center gap-3">
                  <span className={`text-xs w-24 ${dim.color} font-medium`}>{dim.label}</span>
                  <div className="flex-1 h-2 rounded-full bg-white/[0.06]">
                    <div
                      className={`h-full rounded-full ${dim.barColor} transition-all duration-700`}
                      style={{ width: `${val * 10}%` }}
                    />
                  </div>
                  <span className="text-xs text-white/40 w-6 text-right font-mono">{val}</span>
                </div>
              )
            })}
          </div>
        )}

        {/* Verdict */}
        {entry.verdict && entry.verdict !== 'Awaiting submission.' && (
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 mb-4">
            <p className="text-xs font-semibold text-white/50 mb-1">Verdict</p>
            <p className="text-sm text-white/70 leading-relaxed">{entry.verdict}</p>
          </div>
        )}

        {/* Links */}
        {(entry.productUrl || entry.liveUrl || entry.codeUrl) && (
          <div className="flex flex-wrap gap-2 pt-3 border-t border-white/[0.04]">
            {entry.productUrl && (
              <Link
                href={entry.productUrl}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${colors.bg} ${colors.text} hover:opacity-80 transition-opacity`}
              >
                <ShoppingBag className="w-3 h-3" />
                Get This Design
              </Link>
            )}
            {entry.liveUrl && (
              <Link
                href={entry.liveUrl}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white/[0.04] text-white/60 border border-white/[0.08] hover:text-white/80 transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                Live Demo
              </Link>
            )}
            {entry.codeUrl && (
              <Link
                href={entry.codeUrl}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white/[0.04] text-white/60 border border-white/[0.08] hover:text-white/80 transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                View Code
              </Link>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}
