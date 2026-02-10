'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'
import {
  Image,
  Music,
  PenTool,
  Rocket,
  Code,
  Clock,
  ArrowRight,
  Search,
  Command,
  Layers
} from 'lucide-react'

// ============================================================================
// V2: LINEAR-STYLE MINIMALIST
// Ultra-clean typography, subtle interactions, keyboard-first aesthetic
// ============================================================================

interface GuideDoc {
  slug: string
  title: string
  description: string
  date: string
  readingTime: string
  category?: string
  tags?: string[]
}

interface GuidesV2ClientProps {
  guides: GuideDoc[]
}

const CATEGORIES = [
  { id: 'all', label: 'All Guides', icon: Layers },
  { id: 'visual', label: 'Visual', icon: Image, slugs: ['midjourney-guide', 'image-generation-mastery'] },
  { id: 'content', label: 'Content', icon: PenTool, slugs: ['ai-writing-system', 'claude-anthropic-guide', 'openai-chatgpt-guide', 'perplexity-ai-guide', 'top-50-ai-prompts'] },
  { id: 'audio', label: 'Audio', icon: Music, slugs: ['suno-prompt-playbook', 'elevenlabs-voice-guide'] },
  { id: 'founder', label: 'Founder', icon: Rocket, slugs: ['modern-guide', 'skills-library-playbook', 'agent-collective-operating-system', 'founder-ai-stack-2026'] },
  { id: 'dev', label: 'Development', icon: Code, slugs: ['claude-code-getting-started'] },
]

function CategoryPill({
  category,
  active,
  onClick
}: {
  category: typeof CATEGORIES[0]
  active: boolean
  onClick: () => void
}) {
  const Icon = category.icon
  return (
    <button
      onClick={onClick}
      className={`
        inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
        ${active
          ? 'bg-white text-black'
          : 'text-white/60 hover:text-white hover:bg-white/5'
        }
      `}
    >
      <Icon className="w-4 h-4" />
      {category.label}
    </button>
  )
}

function GuideRow({ guide, index }: { guide: GuideDoc; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.03 }}
    >
      <Link
        href={`/guides/${guide.slug}`}
        className="group flex items-center justify-between py-5 border-b border-white/5 hover:bg-white/[0.02] -mx-4 px-4 transition-all"
      >
        <div className="flex-1 min-w-0 pr-8">
          <h3 className="text-base font-medium text-white group-hover:text-emerald-400 transition-colors truncate">
            {guide.title}
          </h3>
          <p className="text-sm text-white/40 mt-1 line-clamp-1">
            {guide.description}
          </p>
        </div>

        <div className="flex items-center gap-6 flex-shrink-0">
          <span className="text-xs text-white/30 font-mono hidden sm:block">
            {guide.readingTime}
          </span>
          <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
        </div>
      </Link>
    </motion.div>
  )
}

function FeaturedCard({ guide }: { guide: GuideDoc }) {
  return (
    <Link
      href={`/guides/${guide.slug}`}
      className="group block p-6 rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent hover:border-emerald-500/30 transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <span className="text-xs font-medium uppercase tracking-wider text-emerald-400">
          Featured
        </span>
        <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-emerald-400 transition-colors" />
      </div>

      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-emerald-100 transition-colors">
        {guide.title}
      </h3>
      <p className="text-sm text-white/50 line-clamp-2 mb-4">
        {guide.description}
      </p>

      <div className="flex items-center gap-2 text-xs text-white/30">
        <Clock className="w-3.5 h-3.5" />
        {guide.readingTime}
      </div>
    </Link>
  )
}

export default function GuidesV2Client({ guides }: GuidesV2ClientProps) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [search, setSearch] = useState('')

  const filteredGuides = guides.filter(guide => {
    const matchesSearch = guide.title.toLowerCase().includes(search.toLowerCase()) ||
                         guide.description.toLowerCase().includes(search.toLowerCase())

    if (activeCategory === 'all') return matchesSearch

    const category = CATEGORIES.find(c => c.id === activeCategory)
    return matchesSearch && category?.slugs?.includes(guide.slug)
  })

  const featuredGuides = guides.filter(g =>
    ['modern-guide', 'claude-anthropic-guide', 'midjourney-guide'].includes(g.slug)
  ).slice(0, 3)

  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white">
      {/* Hero */}
      <section className="pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-sm font-medium text-emerald-400 mb-4">
              Creator Guides
            </p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Learn. Build. Ship.
            </h1>
            <p className="text-lg text-white/50 max-w-xl">
              Practical guides for creators who ship. No fluff, just systems that work.
            </p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-8"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search guides..."
                className="w-full pl-11 pr-16 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-emerald-500/50 focus:bg-white/[0.07] transition-all"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 text-white/20">
                <Command className="w-3.5 h-3.5" />
                <span className="text-xs">K</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Guides */}
      <section className="pb-12">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid md:grid-cols-3 gap-4"
          >
            {featuredGuides.map(guide => (
              <FeaturedCard key={guide.slug} guide={guide} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="pb-8 border-b border-white/5">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-2"
          >
            {CATEGORIES.map(category => (
              <CategoryPill
                key={category.id}
                category={category}
                active={activeCategory === category.id}
                onClick={() => setActiveCategory(category.id)}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Guides List */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-6">
          {filteredGuides.length === 0 ? (
            <div className="py-12 text-center text-white/40">
              No guides found matching your search.
            </div>
          ) : (
            <div>
              {filteredGuides.map((guide, i) => (
                <GuideRow key={guide.slug} guide={guide} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-xl font-semibold mb-3">
            Want more?
          </h2>
          <p className="text-white/50 mb-6">
            Get premium templates and tools to accelerate your work.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-white/90 transition-colors"
          >
            View Products
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  )
}
