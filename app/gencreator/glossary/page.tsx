'use client'

import { useState, useMemo } from 'react'
import Script from 'next/script'
import { Search, BookOpen, ArrowRight } from 'lucide-react'

import PremiumButton from '@/components/ui/PremiumButton'
import GenCreatorNav from '@/components/gencreator/GenCreatorNav'

interface GlossaryEntry {
  term: string
  definition: string
  category: string
  related?: string[]
}

const glossary: GlossaryEntry[] = [
  {
    term: 'GenCreator',
    definition: 'A creator who operates at the intersection of human taste and machine scale. Part architect, part artist, part engineer of the invisible — building compounding systems with AI as a creative force multiplier.',
    category: 'Core',
    related: ['soul.md', 'Shipping', 'Compounding'],
  },
  {
    term: 'soul.md',
    definition: 'Your personal configuration file as a creator. Like CLAUDE.md defines an AI agent, soul.md defines you — your identity, craft, energy, voice, capital, circle, and legacy. You become the document you write about yourself.',
    category: 'Core',
    related: ['7 Dimensions', 'Weekly Review'],
  },
  {
    term: '7 Dimensions',
    definition: 'The seven facets of a complete GenCreator: Energy, Mind, Craft, Voice, Capital, Circle, and Legacy. Each scored 1-10, reviewed weekly, refined monthly.',
    category: 'Core',
    related: ['soul.md', 'Self-Assessment'],
  },
  {
    term: 'Shipping',
    definition: 'Putting something real into the world that did not exist yesterday. A blog post, a song, a product update, a community contribution. The fundamental act of creation. Ship daily, compound forever.',
    category: 'Practice',
    related: ['3-Tier System', 'Compounding'],
  },
  {
    term: '3-Tier System',
    definition: 'Energy-aware shipping cadence. Tier 1: Full Ship (2-4 hours, high energy). Tier 2: Quick Ship (30-60 min, medium). Tier 3: Micro Ship (15-30 min, low). The rule: at least a Tier 3 every day.',
    category: 'Practice',
    related: ['Shipping', 'Energy'],
  },
  {
    term: 'Compounding',
    definition: 'The principle that every artifact, every skill, every relationship grows in value over time when consistently maintained. A GenCreator builds systems that compound — where today\'s work amplifies tomorrow\'s output.',
    category: 'Core',
    related: ['Shipping', 'Systems Thinking'],
  },
  {
    term: 'Skill Stack',
    definition: 'A combination of complementary skills that amplify each other. AI architecture + music production + content writing is a stack. Each skill makes the others more valuable — the intersection is where uniqueness lives.',
    category: 'Strategy',
    related: ['Craft', 'Voice'],
  },
  {
    term: 'Blueprint',
    definition: 'An actionable framework for a specific creative workflow. Copy it, customize it, execute it. The GenCreator Framework includes 12 blueprints covering content, products, community, automation, and more.',
    category: 'Framework',
    related: ['Handbook', 'Principles'],
  },
  {
    term: 'Handbook',
    definition: 'The 8-chapter operating manual for GenCreators. Covers identity, energy management, craft development, voice building, monetization, community, systems design, and legacy planning.',
    category: 'Framework',
    related: ['Blueprint', 'Principles'],
  },
  {
    term: 'Weekly Review',
    definition: 'A 15-minute ritual of opening your soul.md and asking: Did my actions align with my identity? Which dimension grew? Which was neglected? One adjustment for next week.',
    category: 'Practice',
    related: ['soul.md', '7 Dimensions'],
  },
  {
    term: 'Self-Assessment',
    definition: 'A 2-minute scoring of all 7 dimensions that produces a radar chart of your current state. Reveals your strongest dimension (your superpower) and your growth edge (your biggest unlock).',
    category: 'Tool',
    related: ['7 Dimensions', 'soul.md'],
  },
  {
    term: 'AI as Amplifier',
    definition: 'The third principle — AI handles volume and production bandwidth, you provide taste, judgment, and creative direction. The human remains the artist, AI becomes the orchestra.',
    category: 'Principle',
    related: ['GenCreator', 'Stack'],
  },
  {
    term: 'Stack',
    definition: 'Your curated set of tools — AI, automation, publishing, design, audio, analytics. Every tool earns its place. A GenCreator is stack-aware: they know their tools, own their infrastructure, and can articulate every choice.',
    category: 'Strategy',
    related: ['Toolkit', 'AI as Amplifier'],
  },
  {
    term: 'Build in Public',
    definition: 'The seventh principle — transparency builds trust faster than marketing. Share the process, the failures, the iterations. Your audience becomes your community when they see the work happening.',
    category: 'Principle',
    related: ['Community', 'Voice'],
  },
  {
    term: 'Legacy Artifact',
    definition: 'Something you create that outlives the moment — a framework, a product, a system, a body of work. GenCreators think in decades, building artifacts that compound and serve others long after the initial creation.',
    category: 'Strategy',
    related: ['Legacy', 'Compounding'],
  },
  {
    term: 'Creative Compass',
    definition: 'What your soul.md becomes over time — a living document that guides decisions, reveals patterns, and keeps you aligned with your trajectory through every creative season.',
    category: 'Core',
    related: ['soul.md', 'Weekly Review'],
  },
  {
    term: 'Manifesto',
    definition: 'A short, powerful declaration of what it means to be a GenCreator. The philosophical anchor of the framework — meant to be read, shared, and lived.',
    category: 'Framework',
    related: ['Principles', 'GenCreator'],
  },
  {
    term: 'Systems Thinking',
    definition: 'The second principle — build systems that compound, because goals expire while systems grow. A GenCreator designs workflows, automations, and processes that produce output beyond individual effort.',
    category: 'Principle',
    related: ['Compounding', 'Stack'],
  },
]

const categories = ['All', ...Array.from(new Set(glossary.map((g) => g.category))).sort()]

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTermSet',
  name: 'GenCreator Glossary',
  description: 'Key terms and concepts of the GenCreator Framework.',
  url: 'https://frankx.ai/gencreator/glossary',
  hasDefinedTerm: glossary.map((g) => ({
    '@type': 'DefinedTerm',
    name: g.term,
    description: g.definition,
  })),
}

export default function GlossaryPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = useMemo(() => {
    let items = glossary
    if (activeCategory !== 'All') {
      items = items.filter((g) => g.category === activeCategory)
    }
    if (search.trim()) {
      const q = search.toLowerCase()
      items = items.filter(
        (g) =>
          g.term.toLowerCase().includes(q) ||
          g.definition.toLowerCase().includes(q)
      )
    }
    return items.sort((a, b) => a.term.localeCompare(b.term))
  }, [search, activeCategory])

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-slate-100">
      <GenCreatorNav />

      {/* Hero */}
      <section className="relative overflow-hidden pt-20 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/20 via-[#02030b] to-teal-950/15" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-emerald-200">
            <BookOpen className="h-4 w-4" />
            Glossary
          </div>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
            <span className="bg-gradient-to-r from-white via-emerald-100 to-teal-100 bg-clip-text text-transparent">
              The GenCreator Vocabulary
            </span>
          </h1>
          <p className="mt-6 text-lg text-white/60 sm:text-xl">
            Every concept, every principle, every term — defined with precision.
            <br className="hidden sm:block" />
            The language shapes the thinking. The thinking shapes the work.
          </p>
        </div>
      </section>

      {/* Search + Filter */}
      <section className="border-y border-white/[0.08] bg-white/[0.03] py-6">
        <div className="mx-auto max-w-4xl px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search terms..."
                className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] py-2.5 pl-10 pr-4 text-sm text-white/80 placeholder:text-white/25 focus:border-emerald-400/40 focus:outline-none focus:ring-1 focus:ring-emerald-400/20"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                    activeCategory === cat
                      ? 'bg-emerald-500/15 text-emerald-300'
                      : 'text-white/40 hover:bg-white/[0.05] hover:text-white/70'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Terms */}
      <section className="py-12">
        <div className="mx-auto max-w-4xl px-6">
          <p className="mb-6 text-xs text-white/30">{filtered.length} terms</p>
          <div className="space-y-4">
            {filtered.map((entry) => (
              <div
                key={entry.term}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 transition-colors hover:border-white/[0.1]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{entry.term}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/55">{entry.definition}</p>
                    {entry.related && entry.related.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {entry.related.map((r) => (
                          <span
                            key={r}
                            className="rounded-full border border-white/[0.06] bg-white/[0.03] px-2.5 py-0.5 text-[10px] text-white/35"
                          >
                            {r}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="shrink-0 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-2.5 py-0.5 text-[10px] font-medium text-emerald-300/60">
                    {entry.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/[0.08] py-16">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Language is architecture.
          </h2>
          <p className="mt-4 text-white/50">
            When you speak the vocabulary, you think in the framework. When you think in the framework, you ship like a GenCreator.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <PremiumButton variant="luxury" size="lg" href="/gencreator/principles">
              Read the Principles
              <ArrowRight className="h-5 w-5" />
            </PremiumButton>
            <PremiumButton variant="ghost" size="lg" href="/gencreator">
              Back to Hub
            </PremiumButton>
          </div>
        </div>
      </section>

      <Script id="glossary-schema" type="application/ld+json">
        {JSON.stringify(structuredData)}
      </Script>
    </div>
  )
}
