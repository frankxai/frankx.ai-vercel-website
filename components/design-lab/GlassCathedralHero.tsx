'use client'

import { useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Brain, Music, Zap } from 'lucide-react'
import { GlassCard } from '@/components/liquid-glass/GlassCard'

// ── Stat Card Data ──

const stats = [
  {
    label: 'Enterprise AI',
    value: '4+ years',
    sublabel: 'Oracle AI Architect',
    icon: Brain,
    element: 'water' as const,
  },
  {
    label: 'AI Songs Created',
    value: '12,000+',
    sublabel: 'Suno & beyond',
    icon: Music,
    element: 'fire' as const,
  },
  {
    label: 'Open Source Skills',
    value: '75+',
    sublabel: 'Claude Code ecosystem',
    icon: Zap,
    element: 'arcane' as const,
  },
]

// ── Main Hero ──

export function GlassCathedralHero() {
  const shouldReduceMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)

  return (
    <section
      ref={ref}
      className="relative flex flex-col items-center justify-center overflow-hidden"
      style={{ minHeight: '90vh', backgroundColor: '#0a0a0b' }}
    >
      {/* Static void background with subtle radial gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[20%] left-[15%] w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.03) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute top-[10%] right-[20%] w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(6,182,212,0.025) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute bottom-[15%] left-[40%] w-[450px] h-[450px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(16,185,129,0.02) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-6 py-20"
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, ease: 'easeOut' }}
      >
        {/* Monospace brand label */}
        <p className="font-mono text-xs text-white/20 tracking-[0.4em] uppercase mb-10">
          frankx.ai
        </p>

        {/* Headline — pure white, no gradient. Stillness is the statement. */}
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] text-white mb-5">
          Intelligence that compounds.
        </h1>

        {/* Subtitle */}
        <p className="text-base text-white/35 max-w-lg mx-auto mb-16 leading-relaxed">
          AI architecture, creative systems, and open tools.
          <br className="hidden sm:block" />
          Built at Oracle. Documented here.
        </p>

        {/* Crystal stat cards — 3 across */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-14">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <GlassCard
                key={stat.label}
                material="crystal"
                elevation="medium"
                element={stat.element}
                padding="md"
                rounded="2xl"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-white/50" />
                  </div>
                  <p className="text-2xl font-semibold text-white mb-1">{stat.value}</p>
                  <p className="text-xs text-white/35 font-medium">{stat.label}</p>
                  <p className="text-[10px] text-white/20 mt-1">{stat.sublabel}</p>
                </div>
              </GlassCard>
            )
          })}
        </div>

        {/* CTA */}
        <div className="flex items-center justify-center gap-4">
          <button className="inline-flex items-center justify-center rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white px-6 h-12 text-sm font-medium transition-all shadow-lg shadow-emerald-500/15 active:scale-[0.98]">
            Explore the Work
          </button>
          <button className="inline-flex items-center justify-center rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-white/60 hover:text-white/80 px-6 h-12 text-sm font-medium transition-all">
            Read the Blog
          </button>
        </div>
      </motion.div>
    </section>
  )
}
