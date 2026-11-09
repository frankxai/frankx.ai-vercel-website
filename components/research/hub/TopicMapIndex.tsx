'use client'

import { useMemo, useState, type ComponentType } from 'react'
import Link from 'next/link'
import {
  Activity,
  ArrowUpRight,
  BookOpen,
  Brain,
  Building2,
  CheckCircle,
  Code,
  Compass,
  Cpu,
  Database,
  FileText,
  GraduationCap,
  Heart,
  Layers,
  Network,
  Package,
  Palette,
  Phone,
  Radar,
  Rocket,
  Scale,
  Search,
  Shield,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react'

import type { DomainCategory } from '@/lib/research/domains'
import { domainSources } from '@/lib/research/sources'
import {
  publicCategoryLabels,
  publicResearchCategory,
  publicTopicMaps,
} from '@/lib/research/topic-maps.public'

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  Activity, BookOpen, Brain, Building2, CheckCircle, Code, Compass, Cpu, Database,
  FileText, GraduationCap, Heart, Layers, Network, Package, Palette, Phone, Radar,
  Rocket, Scale, Search, Shield, ShieldCheck, Sparkles, Users,
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

const PREVIEW_COUNT = 12

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]'

const isVisibleMap = (map: (typeof publicTopicMaps)[number]) =>
  !map.slug.startsWith('REMOVED-') && !map.title.startsWith('[REMOVED]')

const activeMaps = publicTopicMaps.filter(isVisibleMap)

const sourceCountFor = (slug: string) => domainSources[slug]?.length ?? 0

/**
 * The topic map index: search, category filters with counts, a preview, and the
 * empty state. Logic is carried over from the previous hub client; the row list
 * replaces the card grid so an expanded index of 100+ maps stays scannable.
 */
export default function TopicMapIndex() {
  const [activeCategory, setActiveCategory] = useState<DomainCategory | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showAll, setShowAll] = useState(false)

  const filteredMaps = useMemo(() => {
    let maps =
      activeCategory === 'all'
        ? activeMaps
        : activeMaps.filter((map) => publicResearchCategory(map.category) === activeCategory)

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      maps = maps.filter(
        (map) =>
          map.title.toLowerCase().includes(query) ||
          (map.category ?? '').toLowerCase().includes(query),
      )
    }

    return maps
  }, [activeCategory, searchQuery])

  const expanded = showAll || Boolean(searchQuery) || activeCategory !== 'all'
  const visibleMaps = expanded ? filteredMaps : filteredMaps.slice(0, PREVIEW_COUNT)

  return (
    <section
      id="domains"
      aria-labelledby="domains-title"
      className="scroll-mt-24 border-b border-white/[0.08] py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="font-mono text-[10.5px] tracking-[0.1em] text-white/45">
            04 / Topic maps
          </p>
          <h2
            id="domains-title"
            className="mt-3 font-display text-2xl font-semibold tracking-tight text-white md:text-3xl"
          >
            All research domains
          </h2>
          <p className="mt-3 text-sm leading-6 text-white/65">
            {publicTopicMaps.length} topic maps organized by question. Briefs return when
            their sources and claims pass review.
          </p>
        </div>

        <div className="relative mt-8">
          <label htmlFor="research-domain-search" className="sr-only">
            Search research topics
          </label>
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/45"
          />
          <input
            id="research-domain-search"
            type="text"
            placeholder="Search research topics"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="h-12 w-full rounded-xl border border-white/[0.08] bg-white/[0.03] pl-11 pr-20 text-sm text-white placeholder:text-white/40 transition-colors focus-visible:border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
          />
          {searchQuery ? (
            <button
              type="button"
              aria-label="Clear research search"
              onClick={() => setSearchQuery('')}
              className="absolute right-1 top-1/2 min-h-11 -translate-y-1/2 rounded-full px-4 text-xs text-white/55 transition-colors hover:text-white"
            >
              Clear
            </button>
          ) : null}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {categoryKeys.map((key) => {
            const isActive = activeCategory === key
            const label = key === 'all' ? 'All domains' : (publicCategoryLabels[key] ?? key)
            const count =
              key === 'all'
                ? activeMaps.length
                : activeMaps.filter((map) => publicResearchCategory(map.category) === key).length

            return (
              <button
                key={key}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveCategory(key)}
                className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-[13px] font-medium transition-colors ${focusRing} ${
                  isActive
                    ? 'border-white bg-white text-[#0a0a0b]'
                    : 'border-white/[0.08] bg-white/[0.04] text-white/55 hover:bg-white/[0.07] hover:text-white'
                }`}
              >
                {label}
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                    isActive ? 'bg-black/10' : 'bg-white/[0.08]'
                  }`}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          {(searchQuery || activeCategory !== 'all') && (
            <p className="font-mono text-[10.5px] text-white/45">
              Showing {filteredMaps.length} of {publicTopicMaps.length} domains
            </p>
          )}
          {!searchQuery && activeCategory === 'all' ? (
            <button
              type="button"
              onClick={() => setShowAll((value) => !value)}
              aria-expanded={showAll}
              className={`inline-flex min-h-11 items-center rounded-full border border-white/15 px-5 text-[13px] text-white/75 transition-colors hover:border-white/25 hover:text-white ${focusRing}`}
            >
              {showAll ? 'Show fewer briefs' : `Show all ${activeMaps.length} briefs`}
            </button>
          ) : null}
        </div>

        {filteredMaps.length === 0 ? (
          <div className="py-16 text-center">
            <Search aria-hidden="true" className="mx-auto h-7 w-7 text-white/40" />
            <p className="mt-4 text-sm text-white/60">No domains match your search.</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('')
                setActiveCategory('all')
              }}
              className="mt-2 min-h-11 rounded-full px-4 text-xs text-emerald-300 transition-colors hover:text-emerald-200"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <ul className="mt-6 grid gap-x-10 border-t border-white/[0.08] sm:grid-cols-2">
            {visibleMaps.map((map) => {
              const Icon = iconMap[map.icon] ?? Layers
              const sources = sourceCountFor(map.slug)
              const status =
                map.slug === 'agentic-life-observatory'
                  ? 'Published dataset'
                  : sources > 0
                    ? `${sources} sources`
                    : 'Sources pending'

              return (
                <li key={map.slug} className="border-b border-white/[0.08]">
                  <Link
                    href={`/research/${map.slug}`}
                    className={`group flex items-start gap-4 py-4 ${focusRing}`}
                  >
                    <span className="mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-white/[0.04]">
                      <Icon className="h-4 w-4 text-emerald-300/80" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm leading-6 text-white/85 transition-colors group-hover:text-white">
                        {map.title}
                      </span>
                      <span className="mt-1 block font-mono text-[10.5px] tracking-[0.03em] text-white/40">
                        {status}
                      </span>
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="mt-1 h-3.5 w-3.5 flex-none text-white/25 transition-colors group-hover:text-emerald-300"
                    />
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </section>
  )
}
