'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowRight,
  ArrowUpRight,
  Brain,
  Building2,
  Code,
  Cpu,
  Database,
  FileText,
  Heart,
  Layers,
  Network,
  Plug,
  Radar,
  Search,
  Shield,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  BarChart3,
} from 'lucide-react'
import { researchDomains, researchAgents } from '@/lib/research/domains'

// Icon map for dynamic rendering
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Brain,
  Building2,
  Code,
  Cpu,
  Database,
  FileText,
  Heart,
  Layers,
  Network,
  Plug,
  Radar,
  Search,
  Shield,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  BarChart3,
}

// Color utility
const colorConfig: Record<string, { border: string; text: string; bg: string; gradient: string; glow: string }> = {
  emerald: { border: 'border-emerald-500/30', text: 'text-emerald-400', bg: 'bg-emerald-500/10', gradient: 'from-emerald-500/20 to-emerald-500/5', glow: 'shadow-emerald-500/20' },
  cyan: { border: 'border-cyan-500/30', text: 'text-cyan-400', bg: 'bg-cyan-500/10', gradient: 'from-cyan-500/20 to-cyan-500/5', glow: 'shadow-cyan-500/20' },
  violet: { border: 'border-violet-500/30', text: 'text-violet-400', bg: 'bg-violet-500/10', gradient: 'from-violet-500/20 to-violet-500/5', glow: 'shadow-violet-500/20' },
  amber: { border: 'border-amber-500/30', text: 'text-amber-400', bg: 'bg-amber-500/10', gradient: 'from-amber-500/20 to-amber-500/5', glow: 'shadow-amber-500/20' },
  rose: { border: 'border-rose-500/30', text: 'text-rose-400', bg: 'bg-rose-500/10', gradient: 'from-rose-500/20 to-rose-500/5', glow: 'shadow-rose-500/20' },
  blue: { border: 'border-blue-500/30', text: 'text-blue-400', bg: 'bg-blue-500/10', gradient: 'from-blue-500/20 to-blue-500/5', glow: 'shadow-blue-500/20' },
  orange: { border: 'border-orange-500/30', text: 'text-orange-400', bg: 'bg-orange-500/10', gradient: 'from-orange-500/20 to-orange-500/5', glow: 'shadow-orange-500/20' },
  teal: { border: 'border-teal-500/30', text: 'text-teal-400', bg: 'bg-teal-500/10', gradient: 'from-teal-500/20 to-teal-500/5', glow: 'shadow-teal-500/20' },
  indigo: { border: 'border-indigo-500/30', text: 'text-indigo-400', bg: 'bg-indigo-500/10', gradient: 'from-indigo-500/20 to-indigo-500/5', glow: 'shadow-indigo-500/20' },
  lime: { border: 'border-lime-500/30', text: 'text-lime-400', bg: 'bg-lime-500/10', gradient: 'from-lime-500/20 to-lime-500/5', glow: 'shadow-lime-500/20' },
  fuchsia: { border: 'border-fuchsia-500/30', text: 'text-fuchsia-400', bg: 'bg-fuchsia-500/10', gradient: 'from-fuchsia-500/20 to-fuchsia-500/5', glow: 'shadow-fuchsia-500/20' },
  sky: { border: 'border-sky-500/30', text: 'text-sky-400', bg: 'bg-sky-500/10', gradient: 'from-sky-500/20 to-sky-500/5', glow: 'shadow-sky-500/20' },
}

function HeroSection() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-white/5 border border-white/10">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold text-emerald-400 tracking-wider uppercase">
              Active Research
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
            Research Intelligence
            <span className="block bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
              Hub
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/60 mb-8 leading-relaxed max-w-3xl">
            Validated research across enterprise AI, production patterns, multi-agent systems,
            and emerging technology. Every claim cross-referenced, every insight actionable.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="#domains"
              className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-white/90 transition-all"
            >
              Explore Research
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="#methodology"
              className="inline-flex items-center gap-2 bg-white/5 text-white px-6 py-3 rounded-full font-semibold border border-white/10 hover:bg-white/10 transition-all"
            >
              Methodology
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
            { label: 'Research Domains', value: '15', icon: Layers },
            { label: 'Validated Claims', value: '120+', icon: ShieldCheck },
            { label: 'Sources Cross-Referenced', value: '200+', icon: Search },
            { label: 'Research Agents', value: '5', icon: Radar },
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

function DomainsGrid() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="domains" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Research Domains
          </h2>
          <p className="text-white/50 max-w-2xl">
            15 active research areas. Each domain synthesizes validated findings from
            multiple sources into actionable intelligence.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {researchDomains.map((domain, index) => {
            const Icon = iconMap[domain.icon] || Layers
            const colors = colorConfig[domain.color] || colorConfig.emerald

            return (
              <motion.div
                key={domain.slug}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={shouldReduceMotion ? { duration: 0 } : { delay: Math.min(index * 0.05, 0.4) }}
              >
                <Link
                  href={`/research/${domain.slug}`}
                  className={`
                    group relative block rounded-2xl border border-white/[0.06] bg-white/[0.02]
                    p-6 transition-all duration-300
                    hover:bg-white/[0.04] hover:${colors.border} hover:shadow-lg hover:${colors.glow}
                  `}
                >
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-2.5 ${colors.bg} rounded-xl`}>
                        <Icon className={`w-5 h-5 ${colors.text}`} />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${colors.bg} ${colors.text}`}>
                          {domain.sourceCount} sources
                        </span>
                        <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors" />
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-white transition-colors">
                      {domain.title}
                    </h3>
                    <p className="text-sm text-white/40 mb-4 line-clamp-2">
                      {domain.subtitle}
                    </p>

                    {/* Key highlights */}
                    <div className="flex flex-wrap gap-1.5">
                      {domain.highlights.slice(0, 2).map((h, i) => (
                        <span
                          key={i}
                          className="text-[10px] px-2 py-1 bg-white/[0.04] border border-white/[0.06] rounded-full text-white/50"
                        >
                          <span className="font-semibold text-white/70">{h.stat}</span> {h.label}
                        </span>
                      ))}
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

function ResearchTeamSection() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="team" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Research Operations Team
          </h2>
          <p className="text-white/50 max-w-2xl">
            Five specialized AI research agents that continuously scan, validate,
            synthesize, and publish intelligence across all domains.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {researchAgents.map((agent, index) => {
            const Icon = iconMap[agent.icon] || Layers
            const colors = colorConfig[agent.color] || colorConfig.emerald

            return (
              <motion.div
                key={agent.name}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={shouldReduceMotion ? { duration: 0 } : { delay: index * 0.08 }}
                className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 hover:bg-white/[0.04] transition-all group"
              >
                <div className={`p-2.5 ${colors.bg} rounded-xl w-fit mb-3 group-hover:shadow-lg ${colors.glow} transition-all`}>
                  <Icon className={`w-5 h-5 ${colors.text}`} />
                </div>
                <h3 className="text-sm font-bold text-white mb-0.5">{agent.name}</h3>
                <p className={`text-xs ${colors.text} mb-2`}>{agent.role}</p>
                <p className="text-xs text-white/40 leading-relaxed">{agent.specialty}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function MethodologySection() {
  const shouldReduceMotion = useReducedMotion()

  const phases = [
    {
      number: '01',
      title: 'Signal Detection',
      description: 'Continuous scanning of research papers, industry reports, press releases, and expert discussions across all domains',
      icon: Search,
    },
    {
      number: '02',
      title: 'Deep Analysis',
      description: 'Multi-agent deep dives into promising signals with cross-referencing across primary and secondary sources',
      icon: Brain,
    },
    {
      number: '03',
      title: 'Validation',
      description: 'Evidence quality assessment, confidence rating, and claims validation with minimum 2 cross-references for high confidence',
      icon: ShieldCheck,
    },
    {
      number: '04',
      title: 'Publication',
      description: 'Synthesis into SEO-optimized briefs with TL;DR summaries, FAQ schema, and structured data for AI citations',
      icon: FileText,
    },
  ]

  return (
    <section id="methodology" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Research Methodology
          </h2>
          <p className="text-white/50 max-w-2xl">
            Every claim is validated against primary sources. High-confidence ratings
            require 2+ independent cross-references.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          {phases.map((phase, index) => {
            const Icon = phase.icon
            return (
              <motion.div
                key={phase.number}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={shouldReduceMotion ? { duration: 0 } : { delay: index * 0.1 }}
                className="relative bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                    {phase.number}
                  </span>
                  <Icon className="w-4 h-4 text-white/30" />
                </div>
                <h3 className="text-sm font-bold text-white mb-2">{phase.title}</h3>
                <p className="text-xs text-white/40 leading-relaxed">{phase.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-white/[0.02] border border-white/[0.06] rounded-3xl p-8 md:p-12 text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.03] via-transparent to-violet-500/[0.03] rounded-3xl" />

          <div className="relative">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Stay Current
            </h2>
            <p className="text-white/50 mb-8 max-w-xl mx-auto">
              Get weekly intelligence briefs synthesizing the most important
              developments across AI architecture, production patterns, and emerging technology.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/inner-circle"
                className="inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-3.5 rounded-full font-semibold hover:bg-white/90 transition-all"
              >
                Join Inner Circle
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center justify-center gap-2 bg-white/5 text-white px-8 py-3.5 rounded-full font-semibold border border-white/10 hover:bg-white/10 transition-all"
              >
                Read Latest Articles
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function ResearchPage() {
  return (
    <main className="relative min-h-screen bg-[#0a0a0b] text-white overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[#0a0a0b]" />
        <div
          className="absolute top-0 left-0 w-[70%] h-[60%]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.04) 0%, transparent 70%)',
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
            background: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.03) 0%, transparent 70%)',
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
        <DomainsGrid />
        <ResearchTeamSection />
        <MethodologySection />
        <CTASection />
      </div>
    </main>
  )
}
