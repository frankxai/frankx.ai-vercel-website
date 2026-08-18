'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check, Sparkles, ArrowRight, ShieldCheck, Zap, Layers, Briefcase, Crown } from 'lucide-react'
import { getValueLadderTiers, ValueLadderTier } from '@/lib/value-ladder'
import { cn } from '@/lib/utils'

const ICONS = [Zap, Layers, Sparkles, ShieldCheck, Briefcase, Crown]

interface MultiTierValueLadderProps {
  className?: string
  title?: string
  subtitle?: string
}

export function MultiTierValueLadder({
  className,
  title = 'The FrankX Value Ladder',
  subtitle = 'From free foundational blueprints to custom enterprise agent swarms and advisory.',
}: MultiTierValueLadderProps) {
  const tiers = getValueLadderTiers()
  const [filter, setFilter] = useState<'all' | 'creators' | 'technical' | 'enterprise'>('all')

  const filteredTiers = tiers.filter((t) => {
    if (filter === 'creators') return t.tier <= 1
    if (filter === 'technical') return t.tier === 2 || t.tier === 3
    if (filter === 'enterprise') return t.tier >= 4
    return true
  })

  return (
    <section className={cn('relative py-16 sm:py-24', className)} id="value-ladder">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-300 mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Sovereign Creator & AI Architect Ladder</span>
          </div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="mt-4 text-base text-white/60 sm:text-lg">{subtitle}</p>

          {/* Filter Pills */}
          <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] p-1 backdrop-blur-md">
            {[
              { id: 'all', label: 'All 6 Tiers' },
              { id: 'creators', label: 'Creators & Solopreneurs' },
              { id: 'technical', label: 'Engineers & Swarms' },
              { id: 'enterprise', label: 'Founders & Enterprise' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id as any)}
                className={cn(
                  'rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors',
                  filter === tab.id
                    ? 'bg-emerald-500/20 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.25)] border border-emerald-500/30'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tier Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTiers.map((tier) => {
            const TierIcon = ICONS[tier.tier] || Sparkles
            const isHighlighted = tier.highlight

            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: tier.tier * 0.05 }}
                className={cn(
                  'relative flex flex-col justify-between rounded-2xl border p-6 sm:p-8 transition-[border-color,background-color,box-shadow] duration-300 hover:border-white/20',
                  isHighlighted
                    ? 'border-emerald-500/40 bg-gradient-to-b from-emerald-950/20 via-[#0d1314] to-[#0a0a0f] shadow-xl shadow-emerald-950/30'
                    : 'border-white/10 bg-[#0c0c12]/90 hover:bg-[#0f0f18]'
                )}
              >
                {/* Highlight Ribbon */}
                {isHighlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-black shadow-md">
                    Recommended Architecture
                  </div>
                )}

                <div>
                  {/* Top Metadata */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-emerald-400">
                        <TierIcon className="h-4 w-4" />
                      </div>
                      <span className="text-[11px] font-mono font-medium uppercase tracking-wider text-white/50">
                        Tier {tier.tier}
                      </span>
                    </div>
                    <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
                      {tier.badge}
                    </span>
                  </div>

                  {/* Title & Price */}
                  <h3 className="font-display text-xl font-bold text-white">{tier.name}</h3>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold tracking-tight text-white">
                      {tier.priceDisplay}
                    </span>
                    <span className="text-xs text-white/50">{tier.billingPeriod}</span>
                  </div>

                  <p className="mt-4 text-xs font-medium text-emerald-300/90 leading-relaxed">
                    {tier.headline}
                  </p>
                  <p className="mt-1 text-xs text-white/60 leading-relaxed">{tier.subheadline}</p>

                  {/* Deliverables */}
                  <div className="mt-6 pt-5 border-t border-white/5">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-white/50 mb-3">
                      What&apos;s Included:
                    </p>
                    <ul className="space-y-2.5 text-xs text-white/80">
                      {tier.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom CTA & ROI */}
                <div className="mt-8 pt-5 border-t border-white/5">
                  <div className="mb-4 rounded-lg border border-white/5 bg-white/[0.02] p-2.5 text-[11px] text-white/60">
                    <strong className="text-emerald-300 block mb-0.5">ROI Impact:</strong>
                    {tier.roiArgument}
                  </div>

                  <Link
                    href={tier.ctaHref}
                    className={cn(
                      'group flex min-h-11 w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition-[background-color,border-color,box-shadow,color] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400',
                      isHighlighted
                        ? 'bg-emerald-400 text-black hover:bg-emerald-300 shadow-lg shadow-emerald-500/20'
                        : 'border border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20'
                    )}
                  >
                    <span>{tier.ctaText}</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
export default MultiTierValueLadder
