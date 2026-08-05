'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { getValueLadderTiers, ValueLadderTier } from '@/lib/value-ladder'

export default function ValueLadderPage() {
  const tiers = getValueLadderTiers()
  const [selectedFilter, setSelectedFilter] = useState<string>('all')

  const filteredTiers = tiers.filter((t) => {
    if (selectedFilter === 'all') return true
    if (selectedFilter === 'creators') return t.icp.toLowerCase().includes('creator') || t.icp.toLowerCase().includes('solopreneur')
    if (selectedFilter === 'engineers') return t.icp.toLowerCase().includes('engineer') || t.icp.toLowerCase().includes('architect') || t.icp.toLowerCase().includes('technical')
    if (selectedFilter === 'enterprise') return t.icp.toLowerCase().includes('founder') || t.icp.toLowerCase().includes('executive') || t.icp.toLowerCase().includes('agency')
    return true
  })

  return (
    <div className="min-h-screen bg-[#0A0D14] text-white selection:bg-amber-500/30 selection:text-amber-200">
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-amber-500/10 rounded-full blur-[180px]" />
        <div className="absolute bottom-1/3 left-1/4 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[160px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-amber-400 hover:border-amber-500/40 transition-colors mb-6"
          >
            <span>← FrankX Sovereign Intelligence Hub</span>
          </Link>

          <div className="inline-block text-xs font-mono font-bold uppercase tracking-widest text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3.5 py-1 rounded-full mb-4">
            The Agentic Age Product Ladder
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Sovereign AI Systems & <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200 bg-clip-text text-transparent">
              High-Leverage Value Ladder
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-xl text-neutral-300">
            From free flagship blueprints to €10,000 custom enterprise swarms. Structured for zero-headcount leverage and sovereign execution.
          </p>

          {/* ICP Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {[
              { id: 'all', label: 'All Tiers (€0 - €10k)' },
              { id: 'creators', label: 'For Creators & Solopreneurs' },
              { id: 'engineers', label: 'For Engineers & AI Architects' },
              { id: 'enterprise', label: 'For Founders & Enterprise Leads' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFilter(f.id)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                  selectedFilter === f.id
                    ? 'bg-amber-500 text-black font-bold shadow-lg shadow-amber-500/20'
                    : 'bg-white/5 border border-white/10 text-neutral-300 hover:bg-white/10'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Value Ladder Tier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTiers.map((tier) => (
            <div
              key={tier.id}
              className={`bg-neutral-900/70 backdrop-blur-xl border rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 relative ${
                tier.highlight
                  ? 'border-amber-500/60 shadow-2xl shadow-amber-500/10 ring-1 ring-amber-500/50'
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
              {tier.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-amber-500 text-black text-[10px] font-bold uppercase tracking-wider rounded-full">
                  Most Popular
                </div>
              )}

              <div>
                {/* Header info */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded border border-amber-400/20">
                    {tier.badge}
                  </span>
                  <span className="text-xs text-neutral-500 font-mono">Tier {tier.tier}</span>
                </div>

                <h3 className="text-2xl font-extrabold text-white mb-2">{tier.name}</h3>
                
                {/* Price */}
                <div className="mb-4">
                  <span className="text-4xl font-black text-white">{tier.priceDisplay}</span>
                  <span className="text-xs text-neutral-400 ml-2">{tier.billingPeriod}</span>
                </div>

                <p className="text-sm font-semibold text-neutral-200 mb-2">{tier.headline}</p>
                <p className="text-xs text-neutral-400 leading-relaxed mb-6">{tier.subheadline}</p>

                {/* Deliverables List */}
                <div className="space-y-3 pt-4 border-t border-white/10 mb-6">
                  <div className="text-xs uppercase font-mono font-semibold text-neutral-400">Included Deliverables:</div>
                  {tier.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-neutral-300">
                      <span className="text-amber-400 font-bold shrink-0">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* ROI Argument Box */}
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-neutral-300 mb-6">
                  <span className="text-amber-400 font-semibold block mb-0.5">ROI Argument:</span>
                  {tier.roiArgument}
                </div>
              </div>

              {/* Action Button */}
              <Link
                href={tier.ctaHref}
                className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs text-center transition-all shadow-lg block ${
                  tier.highlight
                    ? 'bg-amber-500 text-black hover:bg-amber-400 shadow-amber-500/25'
                    : 'bg-white/10 border border-white/20 text-white hover:bg-white/15'
                }`}
              >
                {tier.ctaText}
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom Guarantee & Philosophy Section */}
        <div className="mt-16 bg-neutral-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8 sm:p-12 text-center max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
            Built for the Agentic Era — Grounded in Human Sovereignty
          </h2>
          <p className="text-sm text-neutral-400 leading-relaxed max-w-2xl mx-auto mb-6">
            Unlike legacy programs selling basic ChatGPT prompts, FrankX AI systems combine enterprise-grade multi-agent architecture, custom MCP tollbooths, and strict quality gates. Every tier is engineered to pay for itself within 30 days.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-400 font-mono">
            <span>✓ Verified 2026 SOTA Tech Stack</span>
            <span>✓ Zero AI Slop Quality Guarantee</span>
            <span>✓ Instant Digital & Repository Access</span>
          </div>
        </div>
      </div>
    </div>
  )
}
