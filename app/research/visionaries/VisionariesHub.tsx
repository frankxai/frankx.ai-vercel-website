'use client'

import { useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Filter,
  Search,
  Sparkles,
  Users,
} from 'lucide-react'
import {
  qualityLegend,
  topVisionaries,
  visionaryCategories,
  visionaryFitLens,
  visionaryMethodology,
  visionarySources,
  visionaryUpdatedAt,
  visionaries,
  type VisionaryCategory,
  type VisionaryQualityTag,
} from '@/lib/research/visionaries'
import { getPeopleGroupLinks } from '@/lib/research/people-groups'

const colorConfig: Record<
  VisionaryCategory['color'],
  { text: string; border: string; bg: string; gradient: string }
> = {
  cyan: {
    text: 'text-cyan-300',
    border: 'border-cyan-500/30',
    bg: 'bg-cyan-500/10',
    gradient: 'from-cyan-500/15 to-cyan-500/5',
  },
  indigo: {
    text: 'text-indigo-300',
    border: 'border-indigo-500/30',
    bg: 'bg-indigo-500/10',
    gradient: 'from-indigo-500/15 to-indigo-500/5',
  },
  amber: {
    text: 'text-amber-300',
    border: 'border-amber-500/30',
    bg: 'bg-amber-500/10',
    gradient: 'from-amber-500/15 to-amber-500/5',
  },
  rose: {
    text: 'text-rose-300',
    border: 'border-rose-500/30',
    bg: 'bg-rose-500/10',
    gradient: 'from-rose-500/15 to-rose-500/5',
  },
  fuchsia: {
    text: 'text-fuchsia-300',
    border: 'border-fuchsia-500/30',
    bg: 'bg-fuchsia-500/10',
    gradient: 'from-fuchsia-500/15 to-fuchsia-500/5',
  },
  emerald: {
    text: 'text-emerald-300',
    border: 'border-emerald-500/30',
    bg: 'bg-emerald-500/10',
    gradient: 'from-emerald-500/15 to-emerald-500/5',
  },
}

function categoryFor(id: VisionaryCategory['id']) {
  return visionaryCategories.find((category) => category.id === id)
}

export default function VisionariesHub() {
  const shouldReduceMotion = useReducedMotion()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<VisionaryCategory['id'] | 'all'>('all')
  const [activeQuality, setActiveQuality] = useState<VisionaryQualityTag | 'all'>('all')

  const qualityCounts = useMemo(() => {
    const counts = new Map<VisionaryQualityTag, number>()

    qualityLegend.forEach((quality) => counts.set(quality, 0))

    visionaries.forEach((person) => {
      person.qualities.forEach((quality) => {
        counts.set(quality, (counts.get(quality) ?? 0) + 1)
      })
    })

    return counts
  }, [])

  const filteredVisionaries = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    return visionaries
      .filter((person) => {
        if (activeCategory !== 'all' && person.category !== activeCategory) {
          return false
        }

        if (activeQuality !== 'all' && !person.qualities.includes(activeQuality)) {
          return false
        }

        if (!query) {
          return true
        }

        const haystack = [person.name, person.role, person.builds, person.why].join(' ').toLowerCase()
        return haystack.includes(query)
      })
      .sort((a, b) => {
        const aRank = a.top10Rank ?? 999
        const bRank = b.top10Rank ?? 999
        if (aRank !== bRank) {
          return aRank - bRank
        }
        return a.name.localeCompare(b.name)
      })
  }, [searchQuery, activeCategory, activeQuality])

  const updatedLabel = useMemo(() => {
    return new Date(`${visionaryUpdatedAt}T00:00:00Z`).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }, [])

  const peopleGroupLinks = useMemo(() => getPeopleGroupLinks(), [])

  return (
    <main className="relative min-h-screen bg-[#0a0a0b] text-white overflow-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute inset-0 bg-[#0a0a0b]" />
        <div
          className="absolute top-0 left-0 w-[70%] h-[60%]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.06) 0%, transparent 70%)',
            filter: 'blur(90px)',
          }}
        />
        <div
          className="absolute top-1/3 right-0 w-[60%] h-[55%]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(168, 85, 247, 0.05) 0%, transparent 70%)',
            filter: 'blur(90px)',
          }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-[50%] h-[45%]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.05) 0%, transparent 70%)',
            filter: 'blur(90px)',
          }}
        />
      </div>

      <div className="relative z-10">
        <section className="pt-28 pb-12 md:pt-36 md:pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/research"
              className="inline-flex items-center gap-2 text-sm text-white/45 hover:text-white/75 transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Research Hub
            </Link>

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.7 }}
              className="max-w-4xl"
            >
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-white/5 border border-white/10">
                <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                <span className="text-xs font-semibold text-cyan-300 tracking-wider uppercase">
                  Research Hub / Visionaries
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] mb-6">
                Visionaries You Should
                <span className="block bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-emerald-300 bg-clip-text text-transparent">
                  Actively Study
                </span>
              </h1>

              <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-3xl mb-8">
                A research-backed curation of people worth admiring for your specific path: AI systems,
                creator leverage, music direction, design craft, and long-game execution.
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  href="#top-10"
                  className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-white/90 transition-all"
                >
                  Explore Top 10
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#all-100"
                  className="inline-flex items-center gap-2 bg-white/5 text-white px-6 py-3 rounded-full border border-white/10 font-semibold hover:bg-white/10 transition-all"
                >
                  Browse Top 100
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.15, duration: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-12"
            >
              {[
                { label: 'Visionaries', value: String(visionaries.length) },
                { label: 'Top Priority', value: String(topVisionaries.length) },
                { label: 'Categories', value: String(visionaryCategories.length) },
                { label: 'Qualities', value: String(qualityLegend.length) },
                { label: 'Updated', value: updatedLabel },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4"
                >
                  <p className="text-xl font-bold text-white">{stat.value}</p>
                  <p className="text-[11px] text-white/45">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="pb-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-lg md:text-xl font-bold text-white mb-2">Browse by Archetype</h2>
            <p className="text-white/55 mb-4">
              If “visionaries” feels too broad, use these role-specific research indexes.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {peopleGroupLinks.map((entry) => (
                <Link
                  key={entry.key}
                  href={entry.href}
                  className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 hover:bg-white/[0.05] transition-colors"
                >
                  <p className="text-sm font-semibold text-white mb-1">{entry.title}</p>
                  <p className="text-xs text-white/45">{entry.count} profiles</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
              <h2 className="text-xl font-bold text-white mb-4">Selection Method</h2>
              <ul className="space-y-3">
                {visionaryMethodology.map((line) => (
                  <li key={line} className="text-sm text-white/60 leading-relaxed flex items-start gap-2.5">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
              <h2 className="text-xl font-bold text-white mb-4">FrankX Fit Lens</h2>
              <ul className="space-y-3">
                {visionaryFitLens.map((line) => (
                  <li key={line} className="text-sm text-white/60 leading-relaxed flex items-start gap-2.5">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-300" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="top-10" className="py-12 md:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Top 10 to Study First</h2>
              <p className="text-white/55 max-w-3xl">
                Ranked by immediate imitation value for your current season: building systems, shipping creative work,
                and leading with depth.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {topVisionaries.map((person, index) => {
                const category = categoryFor(person.category)
                const colors = colorConfig[category?.color ?? 'cyan']

                return (
                  <motion.article
                    key={person.id}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={shouldReduceMotion ? { duration: 0 } : { delay: index * 0.05 }}
                    className={`relative rounded-2xl border bg-white/[0.02] p-6 ${colors.border}`}
                  >
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${colors.gradient} opacity-30`} />
                    <div className="relative z-10">
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-white/10 text-white/75">
                          #{person.top10Rank}
                        </span>
                        <span className={`text-[11px] px-2 py-1 rounded-full ${colors.bg} ${colors.text}`}>
                          {category?.label}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-white mb-1">{person.name}</h3>
                      <p className="text-sm text-white/55 mb-3">{person.role}</p>

                      <p className="text-sm text-white/70 leading-relaxed mb-3">
                        <span className="text-white/45">Builds:</span> {person.builds}
                      </p>
                      <p className="text-sm text-white/70 leading-relaxed mb-4">{person.why}</p>

                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {person.qualities.map((quality) => (
                          <span
                            key={`${person.id}-${quality}`}
                            className="text-[11px] px-2 py-1 rounded-full bg-white/[0.07] border border-white/[0.12] text-white/75"
                          >
                            {quality}
                          </span>
                        ))}
                      </div>

                      <a
                        href={person.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-white/75 hover:text-white transition-colors"
                      >
                        Learn from {person.name.split(' ')[0]}
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </motion.article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-7">
              <h2 className="text-2xl font-bold text-white mb-2">Quality Matrix</h2>
              <p className="text-white/55">Traits that repeat across this list and where to bias your own development.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {qualityLegend.map((quality) => {
                const count = qualityCounts.get(quality) ?? 0
                const width = Math.max(5, Math.round((count / visionaries.length) * 100))

                return (
                  <div key={quality} className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-white/80">{quality}</span>
                      <span className="text-white/45">{count}</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-white/[0.07] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-emerald-300"
                        style={{ width: `${width}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section id="all-100" className="py-12 md:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-7">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Top 100 Visionaries</h2>
              <p className="text-white/55">Search and filter by domain and quality. This is your rolling admiration map.</p>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 md:p-5 mb-5">
              <div className="relative mb-4">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search name, role, builds, or reason"
                  className="w-full bg-white/[0.03] border border-white/[0.1] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-white/25"
                />
              </div>

              <div className="flex items-center gap-2 mb-2">
                <Filter className="w-3.5 h-3.5 text-white/35" />
                <p className="text-[11px] text-white/45 uppercase tracking-wider">Category</p>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                <button
                  onClick={() => setActiveCategory('all')}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                    activeCategory === 'all'
                      ? 'bg-white text-black border-white'
                      : 'bg-white/[0.02] text-white/60 border-white/[0.12] hover:bg-white/[0.08]'
                  }`}
                >
                  All ({visionaries.length})
                </button>
                {visionaryCategories.map((category) => {
                  const count = visionaries.filter((person) => person.category === category.id).length
                  return (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(activeCategory === category.id ? 'all' : category.id)}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                        activeCategory === category.id
                          ? 'bg-white text-black border-white'
                          : 'bg-white/[0.02] text-white/60 border-white/[0.12] hover:bg-white/[0.08]'
                      }`}
                    >
                      {category.label} ({count})
                    </button>
                  )
                })}
              </div>

              <div className="flex items-center gap-2 mb-2">
                <Users className="w-3.5 h-3.5 text-white/35" />
                <p className="text-[11px] text-white/45 uppercase tracking-wider">Quality</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveQuality('all')}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                    activeQuality === 'all'
                      ? 'bg-white text-black border-white'
                      : 'bg-white/[0.02] text-white/60 border-white/[0.12] hover:bg-white/[0.08]'
                  }`}
                >
                  All
                </button>
                {qualityLegend.map((quality) => (
                  <button
                    key={quality}
                    onClick={() => setActiveQuality(activeQuality === quality ? 'all' : quality)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                      activeQuality === quality
                        ? 'bg-white text-black border-white'
                        : 'bg-white/[0.02] text-white/60 border-white/[0.12] hover:bg-white/[0.08]'
                    }`}
                  >
                    {quality}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-sm text-white/45 mb-4">Showing {filteredVisionaries.length} people</p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredVisionaries.map((person) => {
                const category = categoryFor(person.category)
                const colors = colorConfig[category?.color ?? 'cyan']

                return (
                  <article
                    key={person.id}
                    className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 hover:bg-white/[0.04] transition-all"
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h3 className="text-base font-bold text-white">{person.name}</h3>
                      {person.top10Rank ? (
                        <span className="text-[10px] px-2 py-1 rounded-full bg-white text-black font-semibold">
                          Top {person.top10Rank}
                        </span>
                      ) : null}
                    </div>

                    <p className="text-xs text-white/50 mb-2">{person.role}</p>
                    <p className="text-sm text-white/70 leading-relaxed mb-2 line-clamp-2">{person.builds}</p>
                    <p className="text-xs text-white/55 leading-relaxed mb-3 line-clamp-2">{person.why}</p>

                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {person.qualities.map((quality) => (
                        <span
                          key={`${person.id}-badge-${quality}`}
                          className={`text-[10px] px-2 py-0.5 rounded-full border ${colors.border} ${colors.bg} ${colors.text}`}
                        >
                          {quality}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] text-white/35">{category?.label}</span>
                      <a
                        href={person.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-white/70 hover:text-white transition-colors"
                      >
                        Profile
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-white mb-2">Research Sources</h2>
            <p className="text-white/55 mb-6">External and internal sources used to shape this curated list.</p>

            <div className="grid md:grid-cols-2 gap-3">
              {visionarySources.map((source) => {
                const isInternal = source.url.startsWith('/')

                return (
                  <article
                    key={source.label}
                    className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4"
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="text-sm font-semibold text-white">{source.label}</h3>
                      {isInternal ? null : <ExternalLink className="w-3.5 h-3.5 text-white/40" />}
                    </div>
                    <p className="text-xs text-white/50 leading-relaxed mb-3">{source.note}</p>
                    {isInternal ? (
                      <Link
                        href={source.url}
                        className="inline-flex items-center gap-1 text-xs text-cyan-300 hover:text-cyan-200"
                      >
                        Open internal source
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    ) : (
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-cyan-300 hover:text-cyan-200"
                      >
                        Open source
                        <ArrowRight className="w-3 h-3" />
                      </a>
                    )}
                  </article>
                )
              })}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
