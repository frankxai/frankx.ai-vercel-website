'use client'

import { useState, useMemo, type ReactNode, type ComponentType } from 'react'
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
  Network,
  Palette,
  Plug,
  Radar,
  Rocket,
  Scale,
  Search,
  Shield,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  BarChart3,
  DraftingCompass,
  Image,
} from 'lucide-react'
import { researchDomains, researchAgents, domainCategories } from '@/lib/research/domains'
import type { DomainCategory } from '@/lib/research/domains'
import { domainSources } from '@/lib/research/sources'
import { TrackedLink } from '@/components/analytics/TrackedLink'
import LearnHubSection from '@/components/learn/LearnHubSection'
import { MODEL_MAKER_PORTALS } from '@/lib/learn/related-portals'
import { EmailSignup } from '@/components/email-signup'
import { coreQualitiesNavigationEvent } from '@/lib/core-qualities-analytics'

// Icon map for dynamic rendering
const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  Activity, Brain, Building2, Code, Compass, Cpu, Database, FileText,
  GraduationCap, Heart, Layers, Network, Palette, Plug, Radar, Rocket,
  Scale, Search, Shield, ShieldCheck, Sparkles, TrendingUp, BarChart3,
  DraftingCompass, Image,
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

// Get featured domains (3 most recently updated) — exclude removed/pending domains
const featuredDomains = [...researchDomains]
  .filter((d) => 
    !d.slug.startsWith('REMOVED-') && 
    !d.title.startsWith('[REMOVED]') && 
    d.sourceCount > 0
  )
  .sort((a, b) => b.lastUpdated.localeCompare(a.lastUpdated))
  .slice(0, 3)

const totalSources = new Set(
  Object.values(domainSources).flat().map((source) => source.url),
).size
const sourcedDomainCount = researchDomains.filter(
  (domain) => 
    !domain.slug.startsWith('REMOVED-') && 
    !domain.title.startsWith('[REMOVED]') && 
    domain.sourceCount > 0 &&
    (domainSources[domain.slug]?.length ?? 0) > 0,
).length
const sourceCountFor = (slug: string) => domainSources[slug]?.length ?? 0

function HeroSection() {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-white/5 border border-white/10">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="text-xs font-semibold text-emerald-400 tracking-wider uppercase">
              Research hub · architecture routing
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
            Which model for which architecture —
            <span className="block bg-gradient-to-r from-emerald-400 to-cyan-300 bg-clip-text text-transparent">
              with sources, tests, and a named author.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/70 mb-8 leading-relaxed max-w-3xl">
            The swarm recommends a job and a system shape first, then a model. Vendor scores,
            independent composites, and first-party receipts stay labeled. Frank still publishes.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="#recommend"
              className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-white/90 transition-[background-color,color]"
            >
              Swarm recommendations
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/research/model-arena"
              className="inline-flex items-center gap-2 bg-white/5 text-white px-6 py-3 rounded-full font-semibold border border-white/10 hover:bg-white/10 transition-[background-color,color,border-color]"
            >
              Model Arena
            </Link>
            <Link
              href="#methodology"
              className="inline-flex items-center gap-2 bg-white/5 text-white px-6 py-3 rounded-full font-semibold border border-white/10 hover:bg-white/10 transition-[background-color,color,border-color]"
            >
              Methodology
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Research domains', value: String(researchDomains.filter(d => !d.slug.startsWith('REMOVED-') && !d.title.startsWith('[REMOVED]') && d.sourceCount > 0).length), icon: Layers },
            { label: 'Domains with sources', value: String(sourcedDomainCount), icon: ShieldCheck },
            { label: 'Source references', value: `${totalSources}+`, icon: Search },
            { label: 'Specialist agent roles', value: String(researchAgents.length), icon: Radar },
          ].map((stat, i) => (
            <div key={i} className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-xl p-4">
              <stat.icon className="w-4 h-4 text-white/60 mb-2" />
              <p className="text-2xl font-bold text-white mb-0.5">{stat.value}</p>
              <p className="text-xs text-white/60">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FeaturedSpotlight() {
  return (
    <section id="featured" className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Recently refreshed
            </h2>
          </div>
          <p className="text-white/60 max-w-2xl">
            The domains I have most recently revisited, with source dates and unresolved questions
            kept close to the synthesis.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {featuredDomains.map((domain, index) => {
            const Icon = iconMap[domain.icon] || Layers
            const colors = colorConfig[domain.color] || colorConfig.emerald

            return (
              <div key={domain.slug}>
                <Link
                  href={`/research/${domain.slug}`}
                  className={`
                    group relative block rounded-2xl border bg-white/[0.02] p-6 h-full
                    transition-[background-color,border-color,color,opacity,box-shadow] duration-300 hover:bg-white/[0.05]
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
                        <span className="flex items-center gap-1 text-[10px] text-white/55">
                          <Calendar className="w-3 h-3" />
                          {domain.lastUpdated}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-1.5">
                      {domain.title}
                    </h3>
                    <p className="text-sm text-white/60 mb-4">
                      {domain.subtitle}
                    </p>

                    {/* Scope preview — avoid lifting provisional claims out of context */}
                    <p className="text-xs text-white/60 leading-relaxed line-clamp-3 mb-4">
                      {domain.description}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-white/[0.04]">
                      <span className="text-[10px] text-white/55">
                        {sourceCountFor(domain.slug) > 0
                          ? `${sourceCountFor(domain.slug)} source references`
                          : 'Source registry pending'}
                      </span>
                      <span className={`inline-flex items-center gap-1 text-xs font-medium ${colors.text} group-hover:gap-2 transition-[gap,color]`}>
                        Read Brief
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

const categoryKeys: (DomainCategory | 'all')[] = [
  'all',
  'frontier-ai',
  'agentic-systems',
  'ai-infrastructure',
  'quantum-technology',
  'reality-architecture',
  'agentic-products',
  'enterprise-governance',
]

function DomainsGrid() {
  const [activeCategory, setActiveCategory] = useState<DomainCategory | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredDomains = useMemo(() => {
    // Exclude removed/pending domains from display
    let domains = (activeCategory === 'all'
      ? researchDomains
      : researchDomains.filter(d => d.category === activeCategory)
    ).filter((d) =>
      !d.slug.startsWith('REMOVED-') &&
      !d.title.startsWith('[REMOVED]') &&
      d.sourceCount > 0
    )

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
            All research domains
          </h2>
          <p className="text-white/60 max-w-2xl">
            {researchDomains.filter(d => !d.slug.startsWith('REMOVED-') && !d.title.startsWith('[REMOVED]') && d.sourceCount > 0).length} research areas organized by topic. Specialist agents map the
            evidence and contradictions; I review what the page can responsibly conclude.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <label htmlFor="research-domain-search" className="sr-only">
            Search research domains, findings, and insights
          </label>
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
          <input
            id="research-domain-search"
            type="text"
            placeholder="Search domains, findings, insights..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] py-3 pl-11 pr-4 text-sm text-white placeholder:text-white/50 transition-[border-color,background-color,box-shadow] focus-visible:border-white/20 focus-visible:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
          />
          {searchQuery && (
            <button
              type="button"
              aria-label="Clear research search"
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-white/50 hover:text-white/70 transition-colors"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categoryKeys.map((key) => {
            const isActive = activeCategory === key
            const label = key === 'all' ? 'All Domains' : (domainCategories[key]?.label || key)
            const activeDomains = researchDomains.filter((d) =>
              !d.slug.startsWith('REMOVED-') &&
              !d.title.startsWith('[REMOVED]') &&
              d.sourceCount > 0
            )
            const count = key === 'all'
              ? activeDomains.length
              : activeDomains.filter(d => d.category === key).length

            return (
              <button
                key={key}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveCategory(key)}
                className={`
                  inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
                  transition-[background-color,border-color,color] duration-200
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
          <p className="text-xs text-white/50 mb-4">
            Showing {filteredDomains.length} of {researchDomains.filter(d => !d.slug.startsWith('REMOVED-') && !d.title.startsWith('[REMOVED]') && d.sourceCount > 0).length} domains
          </p>
        )}

        {filteredDomains.length === 0 ? (
          <div className="text-center py-16">
            <Search className="w-8 h-8 text-white/55 mx-auto mb-4" />
            <p className="text-white/60 text-sm">No domains match your search.</p>
            <button
              type="button"
              onClick={() => { setSearchQuery(''); setActiveCategory('all') }}
              className="mt-3 text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              Clear filters
            </button>
          </div>
        ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDomains.map((domain) => {
            const Icon = iconMap[domain.icon] || Layers
            const colors = colorConfig[domain.color] || colorConfig.emerald

            return (
              <div key={domain.slug}>
                <Link
                  href={`/research/${domain.slug}`}
                  className="group relative block rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-[background-color,border-color,color,opacity,box-shadow] duration-300 hover:bg-white/[0.04] hover:border-white/[0.12]"
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
                          {sourceCountFor(domain.slug) > 0
                            ? `${sourceCountFor(domain.slug)} sources`
                            : 'Sources pending'}
                        </span>
                        <ArrowUpRight className="w-4 h-4 text-white/55 group-hover:text-white/50 transition-colors" />
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-white transition-colors">
                      {domain.title}
                    </h3>
                    <p className="text-sm text-white/60 mb-4 line-clamp-2">
                      {domain.subtitle}
                    </p>

                    <p className="text-xs leading-5 text-white/50">
                      {sourceCountFor(domain.slug) > 0
                        ? `Evidence grade ${domain.evidenceGrade ?? 'pending'}`
                        : 'Evidence review pending'}
                      {' · '}Updated {domain.lastUpdated}
                    </p>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>
        )}
      </div>
    </section>
  )
}

function ResearchTeamSection() {
  return (
    <section id="team" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Specialist research roles
          </h2>
          <p className="text-white/60 max-w-2xl">
            Five bounded roles support scanning, evidence review, synthesis, and production.
            They work inside directed sessions; none has authority to publish on its own.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {researchAgents.map((agent) => {
            const Icon = iconMap[agent.icon] || Layers
            const colors = colorConfig[agent.color] || colorConfig.emerald

            return (
              <div
                key={agent.name}
                className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 hover:bg-white/[0.04] transition-[background-color,box-shadow] group"
              >
                <div className={`p-2.5 ${colors.bg} rounded-xl w-fit mb-3 group-hover:shadow-lg ${colors.glow} transition-[box-shadow]`}>
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
      title: 'Directed scan',
      description: 'A defined question guides the search across primary material, research papers, official releases, and credible expert analysis',
      icon: Search,
    },
    {
      number: '02',
      title: 'Specialist passes',
      description: 'Separate agents compare sources, inspect contradictions, and distinguish reported fact from interpretation',
      icon: Brain,
    },
    {
      number: '03',
      title: 'Evidence review',
      description: 'Claims are checked against the available sources, given a confidence level, and narrowed when the evidence is incomplete',
      icon: ShieldCheck,
    },
    {
      number: '04',
      title: 'Human decision',
      description: 'Frank reviews the synthesis, changes or rejects weak claims, and decides whether the artifact is useful enough to publish',
      icon: FileText,
    },
  ]

  return (
    <section id="methodology" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Research methodology
          </h2>
          <p className="text-white/60 max-w-2xl">
            Primary sources are preferred. High-confidence claims require independent support;
            uncertainty stays visible when the material cannot justify certainty.
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
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white bg-white/[0.03] border border-white/[0.06] px-4 py-2 rounded-full transition-[background-color,color] hover:bg-white/[0.06]"
          >
            Full Methodology
            <ArrowRight className="w-3 h-3" />
          </Link>
          <Link
            href="/research/sources"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white bg-white/[0.03] border border-white/[0.06] px-4 py-2 rounded-full transition-[background-color,color] hover:bg-white/[0.06]"
          >
            Browse {totalSources} Registered Sources
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

            <EmailSignup
              listType="newsletter"
              compact
              placeholder="you@example.com"
              buttonText="Get the briefs"
              className="mx-auto mb-8 max-w-md"
            />

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/inner-circle"
                className="inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-3.5 rounded-full font-semibold hover:bg-white/90 transition-[background-color,color]"
              >
                Join Inner Circle
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center justify-center gap-2 bg-white/5 text-white px-8 py-3.5 rounded-full font-semibold border border-white/10 hover:bg-white/10 transition-[background-color,color,border-color]"
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

function FlagshipArticles() {
  const articles = [
    {
      kanji: '長',
      label: 'meaning · longevity · ai era',
      title: 'Blue Zones, Ikigai, and the AI Era',
      href: '/research/blue-zones-ikigai-ai-era',
      blurb:
        'Longevity research from Okinawa and Sardinia, read as a systems question: what keeps work meaningful when AI does more of it.',
      readingTime: '12 min',
    },
    // Human-Centered AI Operating Systems removed: no primary source on /research/conscious-ai-operating-systems (Estate Editor 17 Aug 2026)
  ]
  return (
    <section className="py-12 md:py-16 border-b border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <FileText className="w-5 h-5 text-cyan-300" />
            <h2 className="text-2xl md:text-3xl font-bold text-white">Flagship Articles</h2>
          </div>
          <p className="text-white/60 max-w-2xl">
            Long-form investigations that preserve sources, questions, and the distinction
            between reported evidence and my interpretation.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {articles.map((a) => (
            <div key={a.href}>
              <Link
                href={a.href}
                className="group relative block rounded-2xl border border-cyan-500/[0.18] bg-cyan-500/[0.03] hover:bg-cyan-500/[0.06] hover:border-cyan-500/[0.32] p-6 h-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <span
                    className="text-4xl text-white/85 leading-none font-light group-hover:text-white transition-colors"
                    aria-hidden="true"
                    style={{ fontFamily: 'var(--font-jp-serif), serif' }}
                  >
                    {a.kanji}
                  </span>
                  <ArrowUpRight aria-hidden="true" className="w-4 h-4 text-cyan-300 group-hover:text-white transition-colors flex-shrink-0 mt-1" />
                </div>
                <p className="text-[10px] uppercase tracking-[0.24em] text-white/55 mb-2">
                  {a.label}
                </p>
                <h3 className="text-lg font-semibold text-white mb-2 leading-snug">
                  {a.title}
                </h3>
                <p className="text-sm text-white/70 leading-relaxed mb-3">{a.blurb}</p>
                <p className="text-[11px] text-white/55 uppercase tracking-wider">
                  {a.readingTime} read
                </p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function QualitiesResearchBridge() {
  return (
    <section className="border-b border-white/[0.04] py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.035] p-6 md:grid-cols-[0.85fr_1.15fr] md:p-10">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-300/75">
              New foundational program
            </p>
            <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight text-white md:text-4xl">
              Four personal qualities. Four research lenses.
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/65">
              Freedom, Mastery, Meaning, and Connection begin as autobiographical commitments. This
              research program asks what autonomy, expertise, meaning, belonging, and collective
              intelligence can responsibly add — without turning a personal constitution into a
              universal personality theory.
            </p>
          </div>
          <div className="flex flex-col justify-between gap-8 border-t border-white/10 pt-7 md:border-l md:border-t-0 md:pl-10 md:pt-0">
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10">
              {[
                ['Freedom', 'Autonomy'],
                ['Mastery', 'Expertise'],
                ['Meaning', 'Coherence'],
                ['Connection', 'Belonging'],
              ].map(([quality, lens]) => (
                <div key={quality} className="bg-[#0b0b0c] p-4">
                  <p className="font-display text-sm font-semibold text-white">{quality}</p>
                  <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.16em] text-white/40">{lens} lens</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <TrackedLink
                href="/research/core-qualities-and-human-drives"
                {...coreQualitiesNavigationEvent({
                  source: 'research_hub',
                  placement: 'qualities_bridge_primary',
                  destination: 'research_program',
                })}
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-emerald-300 px-5 text-sm font-semibold text-void transition-colors hover:bg-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200 focus-visible:ring-offset-2 focus-visible:ring-offset-void"
              >
                Inspect sources and limits
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </TrackedLink>
              <TrackedLink
                href="/qualities"
                {...coreQualitiesNavigationEvent({
                  source: 'research_hub',
                  placement: 'qualities_bridge_secondary',
                  destination: 'overview',
                })}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/[0.12] px-5 text-sm font-medium text-white/70 transition-colors hover:border-white/25 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/70"
              >
                Read the personal constitution
              </TrackedLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function ResearchHubClient({
  children,
}: {
  children?: ReactNode
}) {
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
        {children}
        <FlagshipArticles />
        <QualitiesResearchBridge />
        <FeaturedSpotlight />
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
