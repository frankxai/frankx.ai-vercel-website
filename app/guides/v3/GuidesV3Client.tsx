'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import {
  Image,
  Music,
  PenTool,
  Rocket,
  Code,
  Clock,
  ArrowUpRight,
  Sparkles,
  BookOpen,
  Zap,
  Star,
  ChevronRight
} from 'lucide-react'

// ============================================================================
// V3: VERCEL/RAYCAST PREMIUM DARK
// Mesh gradients, glassmorphic cards, command palette aesthetic
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

interface GuidesV3ClientProps {
  guides: GuideDoc[]
}

const FEATURED_SLUGS = ['modern-guide', 'midjourney-guide', 'claude-anthropic-guide']

const CATEGORIES = [
  {
    id: 'visual',
    title: 'Visual Creation',
    description: 'Master AI image generation',
    icon: Image,
    gradient: 'from-violet-500 to-purple-600',
    glow: 'shadow-violet-500/20',
    slugs: ['midjourney-guide', 'image-generation-mastery']
  },
  {
    id: 'content',
    title: 'Content Systems',
    description: 'Build your content engine',
    icon: PenTool,
    gradient: 'from-emerald-500 to-teal-600',
    glow: 'shadow-emerald-500/20',
    slugs: ['ai-writing-system', 'claude-anthropic-guide', 'openai-chatgpt-guide', 'perplexity-ai-guide', 'top-50-ai-prompts']
  },
  {
    id: 'audio',
    title: 'Audio & Music',
    description: 'Professional AI sound',
    icon: Music,
    gradient: 'from-orange-500 to-amber-600',
    glow: 'shadow-orange-500/20',
    slugs: ['suno-prompt-playbook', 'elevenlabs-voice-guide']
  },
  {
    id: 'founder',
    title: "Founder's Playbook",
    description: 'Scale your startup with AI',
    icon: Rocket,
    gradient: 'from-blue-500 to-cyan-600',
    glow: 'shadow-blue-500/20',
    slugs: ['modern-guide', 'skills-library-playbook', 'agent-collective-operating-system', 'founder-ai-stack-2026']
  },
  {
    id: 'dev',
    title: 'AI Development',
    description: 'Code smarter, ship faster',
    icon: Code,
    gradient: 'from-rose-500 to-pink-600',
    glow: 'shadow-rose-500/20',
    slugs: ['claude-code-getting-started']
  },
]

// Premium mesh gradient background
function MeshBackground() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[#09090b]" />

      {/* Primary mesh blob */}
      <motion.div
        className="absolute top-0 left-1/4 w-[800px] h-[800px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        animate={shouldReduceMotion ? undefined : {
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Secondary mesh blob */}
      <motion.div
        className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        animate={shouldReduceMotion ? undefined : {
          x: [0, -80, 0],
          y: [0, -60, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
    </div>
  )
}

function HeroCard({ guide, rank }: { guide: GuideDoc; rank: number }) {
  const badges = ['Popular', 'Essential', 'New']
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: rank * 0.1 }}
    >
      <Link
        href={`/guides/${guide.slug}`}
        className="group relative block h-full p-6 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm overflow-hidden hover:border-white/20 transition-all duration-500"
      >
        {/* Hover gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Badge */}
        <div className="absolute top-4 right-4">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-sm text-xs font-medium text-white/80">
            {rank === 0 && <Star className="w-3 h-3 text-amber-400" />}
            {badges[rank] || 'Guide'}
          </span>
        </div>

        <div className="relative">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-600/20 flex items-center justify-center mb-4">
            <BookOpen className="w-5 h-5 text-violet-400" />
          </div>

          <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-violet-100 transition-colors pr-16">
            {guide.title}
          </h3>
          <p className="text-sm text-white/50 line-clamp-2 mb-4">
            {guide.description}
          </p>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs text-white/40">
              <Clock className="w-3.5 h-3.5" />
              {guide.readingTime}
            </span>
            <span className="flex items-center gap-1 text-sm font-medium text-violet-400 group-hover:text-violet-300 transition-colors">
              Read
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

function CategoryCard({
  category,
  guides,
  index
}: {
  category: typeof CATEGORIES[0]
  guides: GuideDoc[]
  index: number
}) {
  const Icon = category.icon
  const categoryGuides = guides.filter(g => category.slugs.includes(g.slug))

  if (categoryGuides.length === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      {/* Category Header */}
      <div className="flex items-center gap-4 mb-5">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${category.gradient} shadow-lg ${category.glow}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">{category.title}</h2>
          <p className="text-sm text-white/40">{category.description}</p>
        </div>
      </div>

      {/* Guides Grid */}
      <div className="space-y-2">
        {categoryGuides.map((guide, i) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="group/item flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.04] hover:border-white/10 transition-all"
          >
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-white group-hover/item:text-violet-300 transition-colors truncate">
                {guide.title}
              </h3>
              <p className="text-xs text-white/40 truncate mt-0.5">
                {guide.description}
              </p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <span className="text-xs text-white/30 hidden sm:block">
                {guide.readingTime}
              </span>
              <ChevronRight className="w-4 h-4 text-white/20 group-hover/item:text-violet-400 group-hover/item:translate-x-0.5 transition-all" />
            </div>
          </Link>
        ))}
      </div>
    </motion.div>
  )
}

function StatsSection() {
  const stats = [
    { value: '15+', label: 'In-depth guides', icon: BookOpen },
    { value: '50K+', label: 'Words of content', icon: PenTool },
    { value: '100%', label: 'Battle-tested', icon: Zap },
  ]

  return (
    <div className="grid grid-cols-3 gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 + i * 0.1 }}
          className="text-center"
        >
          <stat.icon className="w-5 h-5 text-white/20 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white mb-0.5">{stat.value}</div>
          <div className="text-xs text-white/40">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  )
}

export default function GuidesV3Client({ guides }: GuidesV3ClientProps) {
  const featuredGuides = FEATURED_SLUGS
    .map(slug => guides.find(g => g.slug === slug))
    .filter(Boolean) as GuideDoc[]

  return (
    <main className="relative min-h-screen text-white">
      <MeshBackground />

      <div className="relative z-10">
        {/* Hero */}
        <section className="pt-32 pb-16">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 mb-6">
                <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                <span className="text-xs font-medium text-violet-300">Creator Knowledge Base</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
                Guides that
                <span className="block bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  actually work
                </span>
              </h1>

              <p className="text-lg text-white/50 leading-relaxed">
                Outcome-focused systems for elite creators. Not tutorials—battle-tested
                workflows that ship results.
              </p>
            </motion.div>

            {/* Featured Guides */}
            <div className="mt-12 grid md:grid-cols-3 gap-4">
              {featuredGuides.map((guide, i) => (
                <HeroCard key={guide.slug} guide={guide} rank={i} />
              ))}
            </div>

            {/* Stats */}
            <div className="mt-8 max-w-lg">
              <StatsSection />
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12">
              {CATEGORIES.map((category, i) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  guides={guides}
                  index={i}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 border-t border-white/5">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4">
                Ready to level up?
              </h2>
              <p className="text-white/50 mb-8">
                Get premium tools, templates, and systems to accelerate your creator journey.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-medium hover:from-violet-500 hover:to-purple-500 transition-all shadow-lg shadow-violet-500/25"
                >
                  <Zap className="w-4 h-4" />
                  View Products
                </Link>
                <Link
                  href="/resources"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-white/70 hover:text-white hover:border-white/20 font-medium transition-colors"
                >
                  Free Resources
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  )
}
