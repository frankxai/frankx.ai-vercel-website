'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import {
  Image as ImageIcon,
  Music,
  PenTool,
  Rocket,
  Code,
  Clock,
  ArrowUpRight,
  Sparkles,
  ChevronRight,
  Layers
} from 'lucide-react'

// ============================================================================
// V5: VISUAL-FIRST PREMIUM WITH SIDEBAR
// Best of v3 (premium) + v4 (sidebar) + actual images
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

interface GuidesV5ClientProps {
  guides: GuideDoc[]
}

// Image map for guides with premium images
const GUIDE_IMAGES: Record<string, string> = {
  'midjourney-guide': '/images/guides/midjourney-guide.png',
  'claude-anthropic-guide': '/images/guides/claude-anthropic-guide.png',
  'founder-ai-stack-2026': '/images/guides/founder-ai-stack-2026.png',
  'image-generation-mastery': '/images/guides/image-generation-mastery.png',
  'suno-prompt-playbook': '/images/guides/suno-prompt-playbook.png',
}

const FEATURED_SLUGS = [
  'midjourney-guide',
  'claude-anthropic-guide',
  'founder-ai-stack-2026',
  'image-generation-mastery',
  'suno-prompt-playbook'
]

const CATEGORIES = [
  {
    id: 'all',
    title: 'All Guides',
    icon: Layers,
    color: 'text-white/60',
  },
  {
    id: 'visual',
    title: 'Visual Creation',
    icon: ImageIcon,
    color: 'text-purple-400',
    slugs: ['midjourney-guide', 'image-generation-mastery']
  },
  {
    id: 'content',
    title: 'Content & AI',
    icon: PenTool,
    color: 'text-emerald-400',
    slugs: ['ai-writing-system', 'claude-anthropic-guide', 'openai-chatgpt-guide', 'perplexity-ai-guide', 'top-50-ai-prompts']
  },
  {
    id: 'audio',
    title: 'Audio & Music',
    icon: Music,
    color: 'text-orange-400',
    slugs: ['suno-prompt-playbook', 'elevenlabs-voice-guide']
  },
  {
    id: 'founder',
    title: 'Founder Stack',
    icon: Rocket,
    color: 'text-blue-400',
    slugs: ['modern-guide', 'skills-library-playbook', 'agent-collective-operating-system', 'founder-ai-stack-2026']
  },
  {
    id: 'dev',
    title: 'AI Development',
    icon: Code,
    color: 'text-rose-400',
    slugs: ['claude-code-getting-started']
  },
]

// Premium mesh gradient background
function MeshBackground() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[#050507]" />
      <motion.div
        className="absolute top-0 left-1/4 w-[1000px] h-[1000px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 60%)',
          filter: 'blur(100px)',
        }}
        animate={shouldReduceMotion ? undefined : {
          x: [0, 80, 0],
          y: [0, 40, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-[800px] h-[800px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.06) 0%, transparent 60%)',
          filter: 'blur(100px)',
        }}
        animate={shouldReduceMotion ? undefined : {
          x: [0, -60, 0],
          y: [0, -40, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

// Featured visual card with image
function FeaturedCard({ guide, index }: { guide: GuideDoc; index: number }) {
  const hasImage = GUIDE_IMAGES[guide.slug]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={index === 0 ? 'md:col-span-2 md:row-span-2' : ''}
    >
      <Link
        href={`/guides/${guide.slug}`}
        className="group relative block h-full overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02]"
      >
        {/* Image */}
        {hasImage ? (
          <div className={`relative ${index === 0 ? 'h-64 md:h-80' : 'h-40'} overflow-hidden`}>
            <Image
              src={hasImage}
              alt={guide.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-[#050507]/60 to-transparent" />
          </div>
        ) : (
          <div className={`relative ${index === 0 ? 'h-32 md:h-40' : 'h-24'} bg-gradient-to-br from-violet-500/20 to-purple-600/20`}>
            <div className="absolute inset-0 bg-gradient-to-t from-[#050507] to-transparent" />
          </div>
        )}

        {/* Content overlay */}
        <div className="relative p-5 -mt-16">
          {index === 0 && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-500/20 backdrop-blur-sm text-xs font-medium text-violet-300 mb-3">
              <Sparkles className="w-3 h-3" />
              Featured
            </span>
          )}

          <h3 className={`font-semibold text-white group-hover:text-violet-200 transition-colors ${index === 0 ? 'text-xl md:text-2xl' : 'text-base'}`}>
            {guide.title}
          </h3>

          {index === 0 && (
            <p className="text-sm text-white/50 mt-2 line-clamp-2">
              {guide.description}
            </p>
          )}

          <div className="flex items-center justify-between mt-3">
            <span className="flex items-center gap-1.5 text-xs text-white/40">
              <Clock className="w-3 h-3" />
              {guide.readingTime}
            </span>
            <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-violet-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

// Compact guide card (no image)
function CompactCard({ guide }: { guide: GuideDoc }) {
  return (
    <Link
      href={`/guides/${guide.slug}`}
      className="group flex items-center gap-4 p-4 rounded-xl border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/10 transition-all"
    >
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-white group-hover:text-violet-300 transition-colors truncate">
          {guide.title}
        </h3>
        <span className="text-xs text-white/30 mt-0.5 block">
          {guide.readingTime}
        </span>
      </div>
      <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-violet-400 transition-colors flex-shrink-0" />
    </Link>
  )
}

// Sidebar category button
function SidebarCategory({
  category,
  isActive,
  count,
  onClick
}: {
  category: typeof CATEGORIES[0]
  isActive: boolean
  count: number
  onClick: () => void
}) {
  const Icon = category.icon

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
        isActive
          ? 'bg-white/10 text-white'
          : 'text-white/50 hover:text-white hover:bg-white/5'
      }`}
    >
      <Icon className={`w-5 h-5 ${isActive ? category.color : ''}`} />
      <span className="flex-1 font-medium text-sm">{category.title}</span>
      <span className="text-xs text-white/30 tabular-nums">{count}</span>
    </button>
  )
}

export default function GuidesV5Client({ guides }: GuidesV5ClientProps) {
  const [activeCategory, setActiveCategory] = useState('all')

  // Get featured guides with images
  const featuredGuides = FEATURED_SLUGS
    .map(slug => guides.find(g => g.slug === slug))
    .filter(Boolean) as GuideDoc[]

  // Filter guides by category
  const getFilteredGuides = () => {
    if (activeCategory === 'all') return guides
    const category = CATEGORIES.find(c => c.id === activeCategory)
    return guides.filter(g => category?.slugs?.includes(g.slug))
  }

  const filteredGuides = getFilteredGuides()
  const otherGuides = filteredGuides.filter(g => !FEATURED_SLUGS.includes(g.slug))

  // Count guides per category
  const getCategoryCount = (cat: typeof CATEGORIES[0]) => {
    if (cat.id === 'all') return guides.length
    return guides.filter(g => cat.slugs?.includes(g.slug)).length
  }

  return (
    <main className="relative min-h-screen text-white">
      <MeshBackground />

      <div className="relative z-10 flex">
        {/* Sidebar */}
        <aside className="hidden lg:block w-72 flex-shrink-0 h-screen sticky top-0 border-r border-white/[0.04] bg-black/20 backdrop-blur-xl">
          <div className="p-6 h-full flex flex-col">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-white">Guides</h1>
                <p className="text-xs text-white/40">Creator Knowledge</p>
              </div>
            </div>

            {/* Categories */}
            <nav className="flex-1 space-y-1">
              {CATEGORIES.map(category => (
                <SidebarCategory
                  key={category.id}
                  category={category}
                  isActive={activeCategory === category.id}
                  count={getCategoryCount(category)}
                  onClick={() => setActiveCategory(category.id)}
                />
              ))}
            </nav>

            {/* Bottom CTA */}
            <div className="pt-6 border-t border-white/5">
              <Link
                href="/products"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-medium text-sm hover:from-violet-500 hover:to-purple-500 transition-all"
              >
                View Products
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Hero - Visual Grid */}
          <section className="p-6 md:p-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                {activeCategory === 'all' ? (
                  <>
                    What will you
                    <span className="block bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                      create today?
                    </span>
                  </>
                ) : (
                  CATEGORIES.find(c => c.id === activeCategory)?.title
                )}
              </h2>
            </motion.div>

            {/* Featured Visual Grid - Only show on "All" */}
            {activeCategory === 'all' && (
              <div className="grid md:grid-cols-3 gap-4 mb-10">
                {featuredGuides.slice(0, 5).map((guide, i) => (
                  <FeaturedCard key={guide.slug} guide={guide} index={i} />
                ))}
              </div>
            )}

            {/* Other Guides */}
            {(activeCategory !== 'all' || otherGuides.length > 0) && (
              <div>
                {activeCategory === 'all' && (
                  <h3 className="text-lg font-semibold text-white mb-4">More Guides</h3>
                )}
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
                  {(activeCategory === 'all' ? otherGuides : filteredGuides).map(guide => (
                    <CompactCard key={guide.slug} guide={guide} />
                  ))}
                </div>
              </div>
            )}

            {filteredGuides.length === 0 && (
              <div className="py-20 text-center text-white/40">
                No guides in this category yet.
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}
