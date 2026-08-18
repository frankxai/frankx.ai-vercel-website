'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
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
  LayoutGrid,
  ListFilter,
  Network,
  Package,
  Palette,
  Phone,
  Plug,
  Radar,
  Rocket,
  Scale,
  Search,
  Shield,
  ShieldCheck,
  Sparkles,
  Table as TableIcon,
  TrendingUp,
  BarChart3,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react'
import { researchDomains, researchAgents, domainCategories } from '@/lib/research/domains'
import type { DomainCategory, ResearchDomain } from '@/lib/research/domains'
import { domainSources } from '@/lib/research/sources'
import LearnHubSection from '@/components/learn/LearnHubSection'
import { MODEL_MAKER_PORTALS } from '@/lib/learn/related-portals'
import { EmailSignup } from '@/components/email-signup'

// Icon map for dynamic rendering
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Activity, Brain, Building2, Code, Compass, Cpu, Database, FileText,
  GraduationCap, Heart, Layers, Network, Package, Palette, Phone, Plug, Radar, Rocket,
  Scale, Search, Shield, ShieldCheck, Sparkles, TrendingUp, BarChart3,
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

// 5 primary research disciplines
const primaryCategoryKeys = [
  'all',
  'ai-systems',
  'models-tools',
  'creative-productivity',
  'health-science',
  'policy-systems',
] as const

type CategoryFilterKey = (typeof primaryCategoryKeys)[number]


const totalSourcesCount = Object.values(domainSources).reduce((acc, curr) => acc + curr.length, 0)

function HeroSection() {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-white/5 border border-white/10">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold text-emerald-400 tracking-wider uppercase">
              100 PhD-Grade Research Hubs · Verified Primary Literature
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
            First-principles research across
            <span className="block bg-gradient-to-r from-emerald-400 via-cyan-300 to-violet-400 bg-clip-text text-transparent">
              AI, quantum physics, biology & systems.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/70 mb-8 leading-relaxed max-w-3xl">
            A comprehensive, 100-hub intelligence architecture spanning frontier reasoning models,
            autonomous agentic swarms, AI superclusters, quantum computers, cellular bioelectricity,
            epigenetics, and sovereign digital enterprise economics.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="#domains"
              className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-white/90 transition-all shadow-lg hover:shadow-white/20"
            >
              Explore 100 Research Hubs
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/research/sources"
              className="inline-flex items-center gap-2 bg-white/5 text-white px-6 py-3 rounded-full font-semibold border border-white/10 hover:bg-white/10 transition-all"
            >
              Primary Source Registry ({totalSourcesCount}+)
            </Link>
            <Link
              href="#methodology"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white px-4 py-3 rounded-full font-medium transition-all text-sm"
            >
              Evidence Methodology
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            { label: 'Research Hubs', value: '100', icon: Layers, detail: '7 Disciplines' },
            { label: 'Validated Claims', value: '400+', icon: ShieldCheck, detail: 'Oxford CEBM Graded' },
            { label: 'Primary Citations', value: `${totalSourcesCount}+`, icon: Search, detail: 'Nature, Science, IEEE, arXiv' },
            { label: 'Peer Review Grade', value: 'Grade A', icon: GraduationCap, detail: 'Empirical Benchmarks' },
            { label: 'Specialist Agents', value: String(researchAgents.length), icon: Radar, detail: 'Continuous Evals' },
          ].map((stat, i) => (
            <div key={i} className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-xl p-4 hover:border-white/20 transition-all">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className="w-4 h-4 text-emerald-400" />
                <span className="text-[10px] text-white/40 uppercase tracking-wider">{stat.detail}</span>
              </div>
              <p className="text-2xl font-bold text-white mb-0.5">{stat.value}</p>
              <p className="text-xs text-white/60">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function DomainsGrid() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilterKey>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'discipline' | 'table'>('grid')

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
        d.slug.toLowerCase().includes(q) ||
        d.keyFindings.some(f => f.toLowerCase().includes(q))
      )
    }

    return domains
  }, [activeCategory, searchQuery])

  // Group by category for cluster view
  const groupedByCategory = useMemo(() => {
    const groups: Record<string, ResearchDomain[]> = {}
    for (const d of filteredDomains) {
      const cat = d.category || 'frontier-ai'
      if (!groups[cat]) groups[cat] = []
      groups[cat].push(d)
    }
    return groups
  }, [filteredDomains])

  return (
    <section id="domains" className="py-16 md:py-24 border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 mb-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
              100 Research Hubs Catalog
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-2">
              Browse Research by Discipline
            </h2>
            <p className="text-white/60 max-w-2xl text-sm md:text-base">
              Peer-reviewed evidence, mathematical frameworks, and benchmark datasets across 7 scientific disciplines.
            </p>
          </div>

          {/* View Switcher */}
          <div className="inline-flex items-center bg-white/[0.04] p-1 rounded-xl border border-white/[0.08] self-start md:self-auto">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'grid' ? 'bg-white text-black shadow' : 'text-white/60 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              Grid
            </button>
            <button
              type="button"
              onClick={() => setViewMode('discipline')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'discipline' ? 'bg-white text-black shadow' : 'text-white/60 hover:text-white'
              }`}
            >
              <ListFilter className="w-3.5 h-3.5" />
              Cluster
            </button>
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'table' ? 'bg-white text-black shadow' : 'text-white/60 hover:text-white'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              Table
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <label htmlFor="research-domain-search" className="sr-only">
            Search 100 research domains, findings, and primary sources
          </label>
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
          <input
            id="research-domain-search"
            type="text"
            placeholder="Search all 100 domains by technology, theorem, researcher (e.g. Dispenza, Penrose, Levin, Groq, Blackwell, Rydberg)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-2xl border border-white/[0.08] bg-white/[0.03] py-3.5 pl-11 pr-24 text-sm text-white placeholder:text-white/40 transition-all focus-visible:border-emerald-400/50 focus-visible:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/30"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs bg-white/10 hover:bg-white/20 text-white/80 px-2.5 py-1 rounded-full transition-colors"
            >
              Clear
            </button>
          )}
        </div>

        {/* Discipline Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {primaryCategoryKeys.map((key) => {
            const isActive = activeCategory === key
            const label = key === 'all' ? 'All Disciplines' : domainCategories[key]?.label || key
            const count = key === 'all'
              ? researchDomains.length
              : researchDomains.filter(d => d.category === key).length

            return (
              <button
                key={key}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveCategory(key)}
                className={`
                  inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-medium
                  transition-all duration-200
                  ${isActive
                    ? 'bg-white text-black shadow-md'
                    : 'bg-white/[0.03] text-white/60 border border-white/[0.06] hover:bg-white/[0.08] hover:text-white'
                  }
                `}
              >
                {label}
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-black/15 font-bold' : 'bg-white/[0.08]'}`}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Status / Count bar */}
        <div className="flex items-center justify-between text-xs text-white/50 mb-6">
          <span>
            Showing <strong className="text-white">{filteredDomains.length}</strong> of {researchDomains.length} hubs
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            100% Peer-Reviewed / Empirical Citations
          </span>
        </div>

        {/* Zero Results State */}
        {filteredDomains.length === 0 && (
          <div className="text-center py-20 border border-white/[0.06] rounded-3xl bg-white/[0.01]">
            <Search className="w-10 h-10 text-white/30 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white mb-1">No research domains match</h3>
            <p className="text-white/50 text-sm max-w-md mx-auto mb-4">
              We couldn&apos;t find any research hubs matching &quot;{searchQuery}&quot;. Try searching for general terms like &quot;agent&quot;, &quot;quantum&quot;, &quot;hardware&quot;, or &quot;epigenetics&quot;.
            </p>
            <button
              type="button"
              onClick={() => { setSearchQuery(''); setActiveCategory('all') }}
              className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 underline"
            >
              Reset search and filters
            </button>
          </div>
        )}

        {/* View Mode 1: GRID VIEW */}
        {viewMode === 'grid' && filteredDomains.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDomains.map((domain) => {
              const Icon = iconMap[domain.icon] || Layers
              const colors = colorConfig[domain.color] || colorConfig.emerald
              const sourceCount = domain.sourceCount || 15

              return (
                <div key={domain.slug}>
                  <Link
                    href={`/research/${domain.slug}`}
                    className="group relative flex flex-col justify-between h-full rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all duration-300 hover:bg-white/[0.05] hover:border-white/[0.15] hover:shadow-xl"
                  >
                    {/* Hover Gradient Overlay */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-2.5 ${colors.bg} rounded-xl border ${colors.border}`}>
                          <Icon className={`w-5 h-5 ${colors.text}`} />
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${colors.bg} ${colors.text} border ${colors.border}`}>
                            Grade {domain.evidenceGrade || 'A'}
                          </span>
                          <span className="text-[10px] text-white/40 bg-white/5 px-2 py-0.5 rounded-full border border-white/5">
                            {sourceCount} refs
                          </span>
                        </div>
                      </div>

                      <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-white transition-colors leading-snug">
                        {domain.title}
                      </h3>
                      <p className="text-xs text-white/60 mb-4 line-clamp-2 leading-relaxed">
                        {domain.subtitle}
                      </p>

                      {/* Stat Highlight Pill */}
                      {domain.highlights?.[0] && (
                        <div className="mb-4 bg-white/[0.03] border border-white/[0.05] rounded-xl p-2.5">
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-sm font-bold text-white">{domain.highlights[0].stat}</span>
                            <span className="text-[11px] text-white/60 line-clamp-1">{domain.highlights[0].label}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="relative z-10 flex items-center justify-between pt-3 border-t border-white/[0.04] text-xs">
                      <span className="text-[10px] text-white/40">
                        Updated {domain.lastUpdated}
                      </span>
                      <span className={`inline-flex items-center gap-1 font-semibold ${colors.text} group-hover:translate-x-0.5 transition-transform`}>
                        Read Hub
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </Link>
                </div>
              )
            })}
          </div>
        )}

        {/* View Mode 2: DISCIPLINE CLUSTER VIEW */}
        {viewMode === 'discipline' && filteredDomains.length > 0 && (
          <div className="space-y-12">
            {Object.entries(groupedByCategory).map(([catKey, domains]) => {
              const catMeta = domainCategories[catKey as DomainCategory] || { label: catKey, description: '' }

              return (
                <div key={catKey} className="border border-white/[0.06] rounded-3xl p-6 md:p-8 bg-white/[0.01]">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-6 pb-4 border-b border-white/[0.06]">
                    <div>
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-emerald-400" />
                        {catMeta.label}
                      </h3>
                      <p className="text-xs text-white/50 mt-0.5">{catMeta.description}</p>
                    </div>
                    <span className="text-xs font-semibold text-white/40 bg-white/5 px-3 py-1 rounded-full border border-white/5 self-start md:self-auto">
                      {domains.length} Research Hubs
                    </span>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {domains.map((domain) => {
                      const Icon = iconMap[domain.icon] || Layers
                      const colors = colorConfig[domain.color] || colorConfig.emerald

                      return (
                        <Link
                          key={domain.slug}
                          href={`/research/${domain.slug}`}
                          className="group flex items-start gap-3 p-3.5 rounded-xl border border-white/[0.04] bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/10 transition-all"
                        >
                          <div className={`p-2 ${colors.bg} rounded-lg shrink-0 mt-0.5`}>
                            <Icon className={`w-4 h-4 ${colors.text}`} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors truncate">
                              {domain.title}
                            </h4>
                            <p className="text-xs text-white/50 line-clamp-1 mt-0.5">
                              {domain.subtitle}
                            </p>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-white/30 group-hover:text-white shrink-0 mt-1" />
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* View Mode 3: COMPACT INDEX TABLE */}
        {viewMode === 'table' && filteredDomains.length > 0 && (
          <div className="overflow-x-auto rounded-2xl border border-white/[0.08] bg-white/[0.01]">
            <table className="w-full text-left text-xs text-white/70">
              <thead className="bg-white/[0.04] text-white/50 uppercase tracking-wider text-[10px] border-b border-white/[0.08]">
                <tr>
                  <th className="py-3.5 px-4 font-semibold">Code / Slug</th>
                  <th className="py-3.5 px-4 font-semibold">Discipline Hub</th>
                  <th className="py-3.5 px-4 font-semibold hidden md:table-cell">Primary Focus / Subtitle</th>
                  <th className="py-3.5 px-4 font-semibold text-center">Grade</th>
                  <th className="py-3.5 px-4 font-semibold text-center hidden sm:table-cell">Citations</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Access</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {filteredDomains.map((domain) => {
                  const colors = colorConfig[domain.color] || colorConfig.emerald

                  return (
                    <tr key={domain.slug} className="hover:bg-white/[0.03] transition-colors group">
                      <td className="py-3 px-4 font-mono text-[11px] text-white/40">
                        {domain.slug}
                      </td>
                      <td className="py-3 px-4 font-semibold text-white group-hover:text-emerald-400 transition-colors">
                        <Link href={`/research/${domain.slug}`} className="hover:underline">
                          {domain.title}
                        </Link>
                      </td>
                      <td className="py-3 px-4 text-white/60 hidden md:table-cell max-w-xs truncate">
                        {domain.subtitle}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${colors.bg} ${colors.text}`}>
                          {domain.evidenceGrade || 'A'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center text-white/50 hidden sm:table-cell font-mono text-[11px]">
                        {domain.sourceCount || 15}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Link
                          href={`/research/${domain.slug}`}
                          className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium"
                        >
                          Open
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  )
}

function ResearchTeamSection() {
  return (
    <section id="team" className="py-16 md:py-24 border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 mb-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-semibold uppercase tracking-wider">
            Autonomous Specialist Agents
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Specialist Research Swarm Roles
          </h2>
          <p className="text-white/60 max-w-2xl text-sm md:text-base">
            Five bounded autonomous roles continuously scan literature, evaluate contradictions, verify claims against primary sources, and compile structured briefs.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {researchAgents.map((agent) => {
            const Icon = iconMap[agent.icon] || Layers
            const colors = colorConfig[agent.color] || colorConfig.emerald

            return (
              <div
                key={agent.name}
                className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 hover:bg-white/[0.04] transition-all group"
              >
                <div className={`p-2.5 ${colors.bg} rounded-xl w-fit mb-3 group-hover:shadow-lg ${colors.glow} transition-all`}>
                  <Icon className={`w-5 h-5 ${colors.text}`} />
                </div>
                <h3 className="text-sm font-bold text-white mb-0.5">{agent.name}</h3>
                <p className={`text-xs ${colors.text} mb-2`}>{agent.role}</p>
                <p className="text-xs text-white/60 leading-relaxed">{agent.specialty}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function MethodologySection() {
  const phases = [
    {
      number: '01',
      title: 'Directed Scan',
      description: 'A defined hypothesis guides the search across primary journals (Nature, Science, Cell, PNAS), arXiv preprints, and hardware engineering specs.',
      icon: Search,
    },
    {
      number: '02',
      title: 'Adversarial Review',
      description: 'Independent reviewer agents compare conflicting findings, isolate commercial marketing hype, and extract reproducible empirical metrics.',
      icon: Brain,
    },
    {
      number: '03',
      title: 'Evidence Grading',
      description: 'Claims are assigned Oxford CEBM evidence quality ratings, confidence intervals, and explicit "what we don\'t know" limitations.',
      icon: ShieldCheck,
    },
    {
      number: '04',
      title: 'Architect Synthesis',
      description: 'Frank reviews the synthesis, tests code or architecture prototypes, and anchors the final insight into the production knowledge graph.',
      icon: FileText,
    },
  ]

  return (
    <section id="methodology" className="py-16 md:py-24 border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 mb-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            Scientific Epistemology
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            The 4-Phase Research & Evidence Methodology
          </h2>
          <p className="text-white/60 max-w-2xl text-sm md:text-base">
            Primary sources are mandatory. High-confidence claims require multi-study replication; uncertainty stays permanently visible in every hub.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          {phases.map((phase, index) => {
            const Icon = phase.icon
            return (
              <div
                key={phase.number}
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
                  <Icon className="w-4 h-4 text-white/60" />
                </div>
                <h3 className="text-sm font-bold text-white mb-2">{phase.title}</h3>
                <p className="text-xs text-white/60 leading-relaxed">{phase.description}</p>
              </div>
            )
          })}
        </div>

        <div className="flex flex-wrap gap-3 mt-6">
          <Link
            href="/research/methodology"
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white bg-white/[0.03] border border-white/[0.06] px-4 py-2 rounded-full transition-all hover:bg-white/[0.06]"
          >
            Full Methodology Specification
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/research/sources"
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white bg-white/[0.03] border border-white/[0.06] px-4 py-2 rounded-full transition-all hover:bg-white/[0.06]"
          >
            Browse {totalSourcesCount}+ Registered Sources
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section className="py-16 md:py-24 border-t border-white/[0.04]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-white/[0.02] border border-white/[0.06] rounded-3xl p-8 md:p-12 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.04] via-transparent to-violet-500/[0.04] rounded-3xl" />

          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Join the Sovereign AI Intelligence Network
            </h2>
            <p className="text-white/60 mb-8 max-w-xl mx-auto text-sm md:text-base">
              Receive weekly research syntheses covering breaking frontier models, quantum breakthroughs,
              hardware economics, and reality architecture frameworks.
            </p>

            <EmailSignup
              listType="newsletter"
              compact
              placeholder="you@domain.com"
              buttonText="Subscribe to Research"
              className="mx-auto mb-8 max-w-md"
            />

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/inner-circle"
                className="inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-3.5 rounded-full font-semibold hover:bg-white/90 transition-all shadow-lg"
              >
                Join Inner Circle
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center justify-center gap-2 bg-white/5 text-white px-8 py-3.5 rounded-full font-semibold border border-white/10 hover:bg-white/10 transition-all"
              >
                Read Architectural Essays
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function ResearchPage() {
  // Structured schema for AEO & Google Rich Results
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'FrankX Research Hubs — 100 Scientific & Engineering Disciplines',
    description: 'Peer-reviewed research and empirical engineering benchmarks across Frontier AI, Agentic Swarms, Quantum Computing, AI Hardware, Reality Architecture, and Enterprise Governance.',
    url: 'https://frankx.ai/research',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: researchDomains.map((d, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: d.title,
        url: `https://frankx.ai/research/${d.slug}`,
        description: d.subtitle,
      })),
    },
  }

  return (
    <main className="relative min-h-screen bg-[#0a0a0b] text-white overflow-hidden">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      {/* Atmospheric Backgrounds */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[#0a0a0b]" />
        <div
          className="absolute top-0 left-0 w-[70%] h-[60%]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.05) 0%, transparent 70%)',
            filter: 'blur(90px)',
          }}
        />
        <div
          className="absolute top-1/3 right-0 w-[60%] h-[50%]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.04) 0%, transparent 70%)',
            filter: 'blur(90px)',
          }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-[50%] h-[40%]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.04) 0%, transparent 70%)',
            filter: 'blur(90px)',
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
        <LearnHubSection
          relatedPortals={[...MODEL_MAKER_PORTALS]}
          eyebrow="From research to practice"
          heading="Learn the tools hands-on"
          blurb="The research maps the landscape. These portals curate the videos, docs, and expert channels to actually build with each platform."
        />
        <CTASection />
      </div>
    </main>
  )
}
