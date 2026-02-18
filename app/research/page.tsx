'use client'

import { useState, useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Brain,
  Building2,
  Calendar,
  Code,
  Compass,
  Cpu,
  Database,
  FileText,
  GraduationCap,
  Heart,
  Layers,
  Network,
  Palette,
  Plug,
  Radar,
  Rocket,
  Search,
  Shield,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  BarChart3,
} from 'lucide-react'
import { researchDomains, researchAgents, domainCategories } from '@/lib/research/domains'
import type { DomainCategory } from '@/lib/research/domains'
import { getSourceCountForDomain } from '@/lib/research/sources'

// Icon map for dynamic rendering
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Activity, Brain, Building2, Code, Compass, Cpu, Database, FileText,
  GraduationCap, Heart, Layers, Network, Palette, Plug, Radar, Rocket,
  Search, Shield, ShieldCheck, Sparkles, TrendingUp, BarChart3,
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

// Get featured domains (3 most recently updated)
const featuredDomains = [...researchDomains]
  .sort((a, b) => b.lastUpdated.localeCompare(a.lastUpdated))
  .slice(0, 3)

const totalSources = researchDomains.reduce((sum, d) => sum + (getSourceCountForDomain(d.slug) || d.sourceCount), 0)
const totalFindings = researchDomains.reduce((sum, d) => sum + d.keyFindings.length, 0)

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
              href="#featured"
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
            { label: 'Research Domains', value: String(researchDomains.length), icon: Layers },
            { label: 'Validated Findings', value: `${totalFindings}+`, icon: ShieldCheck },
            { label: 'Sources Cross-Referenced', value: `${totalSources}+`, icon: Search },
            { label: 'Research Agents', value: String(researchAgents.length), icon: Radar },
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

function VisualShowcaseSection() {
  const shouldReduceMotion = useReducedMotion()

  const infographics = [
    {
      title: 'AI Architecture Landscape 2026',
      description: 'Gartner-style Magic Quadrant positioning vendors across enterprise AI, multi-agent, and observability',
      image: '/images/research/landscape-ai-architecture-2026.png',
      category: 'Landscape',
      color: 'emerald',
    },
    {
      title: 'Multi-Agent Orchestration Maturity',
      description: '5-stage maturity model from single agents to autonomous swarms with current adoption metrics',
      image: '/images/research/maturity-multi-agent-orchestration.png',
      category: 'Framework',
      color: 'cyan',
    },
    {
      title: 'Enterprise AI Adoption Journey',
      description: 'Timeline from 2024 PoC to 2028 autonomous systems with key decision points',
      image: '/images/research/timeline-enterprise-ai-adoption.png',
      category: 'Timeline',
      color: 'violet',
    },
    {
      title: 'Production AI Stack Architecture',
      description: '6-layer technology stack showing model layer through memory systems',
      image: '/images/research/stack-production-ai-architecture.png',
      category: 'Architecture',
      color: 'amber',
    },
    {
      title: 'Research Domain Constellation',
      description: 'Interactive network showing 27 research domains across 4 categories with connections',
      image: '/images/research/constellation-research-domains.png',
      category: 'Network',
      color: 'rose',
    },
  ]

  return (
    <section className="py-12 md:py-16 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.1 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20">
            <Sparkles className="w-3 h-3 text-violet-400" />
            <span className="text-xs font-semibold text-violet-400 tracking-wider uppercase">
              Visual Intelligence
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Research Landscapes & Frameworks
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Gartner-style infographics visualizing AI architecture landscapes, maturity models, and technology stacks
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {infographics.map((infographic, index) => {
            const colors = colorConfig[infographic.color as keyof typeof colorConfig]
            return (
              <motion.div
                key={infographic.title}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.1 + index * 0.05 }}
                className="group relative bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden hover:border-white/[0.12] transition-all"
              >
                <div className="aspect-video relative overflow-hidden bg-black/40">
                  <Image
                    src={infographic.image}
                    alt={infographic.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className={`absolute top-3 left-3 px-3 py-1 rounded-full ${colors.bg} border ${colors.border} backdrop-blur-sm`}>
                    <span className={`text-xs font-semibold ${colors.text}`}>
                      {infographic.category}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-white/90 transition-colors">
                    {infographic.title}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed">
                    {infographic.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

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
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Recently Updated
            </h2>
          </div>
          <p className="text-white/50 max-w-2xl">
            Our most recently refreshed research domains with the latest data and analysis.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4">
          {featuredDomains.map((domain, index) => {
            const Icon = iconMap[domain.icon] || Layers
            const colors = colorConfig[domain.color] || colorConfig.emerald

            return (
              <motion.div
                key={domain.slug}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.15 + index * 0.08 }}
              >
                <Link
                  href={`/research/${domain.slug}`}
                  className={`
                    group relative block rounded-2xl border bg-white/[0.02] p-6 h-full
                    transition-all duration-300 hover:bg-white/[0.05]
                    ${index === 0
                      ? `${colors.border} border-opacity-50`
                      : 'border-white/[0.08]'
                    }
                  `}
                >
                  {/* Accent gradient */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${colors.gradient} opacity-30 group-hover:opacity-60 transition-opacity duration-300`} />

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 ${colors.bg} rounded-xl ${colors.border} border`}>
                        <Icon className={`w-6 h-6 ${colors.text}`} />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1 text-[10px] text-white/30">
                          <Calendar className="w-3 h-3" />
                          {domain.lastUpdated}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-1.5">
                      {domain.title}
                    </h3>
                    <p className="text-sm text-white/40 mb-4">
                      {domain.subtitle}
                    </p>

                    {/* TL;DR preview */}
                    <p className="text-xs text-white/35 leading-relaxed line-clamp-3 mb-4">
                      {domain.tldr}
                    </p>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {domain.highlights.slice(0, 2).map((h, i) => (
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
                      <span className="text-[10px] text-white/25">{getSourceCountForDomain(domain.slug) || domain.sourceCount} sources</span>
                      <span className={`inline-flex items-center gap-1 text-xs font-medium ${colors.text} group-hover:gap-2 transition-all`}>
                        Read Brief
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

const categoryKeys: (DomainCategory | 'all')[] = ['all', 'ai-systems', 'models-tools', 'creative-productivity', 'health-science']

function DomainsGrid() {
  const shouldReduceMotion = useReducedMotion()
  const [activeCategory, setActiveCategory] = useState<DomainCategory | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredDomains = useMemo(() => {
    let domains = activeCategory === 'all'
      ? researchDomains
      : researchDomains.filter(d => d.category === activeCategory)

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      domains = domains.filter(d =>
        d.title.toLowerCase().includes(q) ||
        d.subtitle.toLowerCase().includes(q) ||
        d.tldr.toLowerCase().includes(q) ||
        d.keyFindings.some(f => f.toLowerCase().includes(q))
      )
    }

    return domains
  }, [activeCategory, searchQuery])

  return (
    <section id="domains" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            All Research Domains
          </h2>
          <p className="text-white/50 max-w-2xl">
            {researchDomains.length} research areas organized by topic. Each domain synthesizes
            validated findings from multiple sources into actionable intelligence.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            type="text"
            placeholder="Search domains, findings, insights..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/20 focus:bg-white/[0.05] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-white/30 hover:text-white/60 transition-colors"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categoryKeys.map((key) => {
            const isActive = activeCategory === key
            const label = key === 'all' ? 'All Domains' : domainCategories[key].label
            const count = key === 'all'
              ? researchDomains.length
              : researchDomains.filter(d => d.category === key).length

            return (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`
                  inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
                  transition-all duration-200
                  ${isActive
                    ? 'bg-white text-black'
                    : 'bg-white/[0.04] text-white/50 border border-white/[0.08] hover:bg-white/[0.08] hover:text-white/70'
                  }
                `}
              >
                {label}
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-black/10' : 'bg-white/[0.08]'}`}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Results count */}
        {(searchQuery || activeCategory !== 'all') && (
          <p className="text-xs text-white/30 mb-4">
            Showing {filteredDomains.length} of {researchDomains.length} domains
          </p>
        )}

        {filteredDomains.length === 0 ? (
          <div className="text-center py-16">
            <Search className="w-8 h-8 text-white/20 mx-auto mb-4" />
            <p className="text-white/40 text-sm">No domains match your search.</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('all') }}
              className="mt-3 text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              Clear filters
            </button>
          </div>
        ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDomains.map((domain, index) => {
            const Icon = iconMap[domain.icon] || Layers
            const colors = colorConfig[domain.color] || colorConfig.emerald

            return (
              <motion.div
                key={domain.slug}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={shouldReduceMotion ? { duration: 0 } : { delay: Math.min(index * 0.04, 0.3) }}
              >
                <Link
                  href={`/research/${domain.slug}`}
                  className="group relative block rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all duration-300 hover:bg-white/[0.04] hover:border-white/[0.12]"
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
                          {getSourceCountForDomain(domain.slug) || domain.sourceCount} sources
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
        )}
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
                {/* Connector line */}
                {index < phases.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-px bg-white/[0.08]" />
                )}
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

        <div className="flex flex-wrap gap-3 mt-6">
          <Link
            href="/research/methodology"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white bg-white/[0.03] border border-white/[0.06] px-4 py-2 rounded-full transition-all hover:bg-white/[0.06]"
          >
            Full Methodology
            <ArrowRight className="w-3 h-3" />
          </Link>
          <Link
            href="/research/sources"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white bg-white/[0.03] border border-white/[0.06] px-4 py-2 rounded-full transition-all hover:bg-white/[0.06]"
          >
            Browse All {totalSources}+ Sources
            <ArrowRight className="w-3 h-3" />
          </Link>
          <Link
            href="/research/visionaries"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white bg-white/[0.03] border border-white/[0.06] px-4 py-2 rounded-full transition-all hover:bg-white/[0.06]"
          >
            Visionaries Hub (Top 100)
            <ArrowRight className="w-3 h-3" />
          </Link>
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
        <VisualShowcaseSection />
        <FeaturedSpotlight />
        <DomainsGrid />
        <ResearchTeamSection />
        <MethodologySection />
        <CTASection />
      </div>
    </main>
  )
}
