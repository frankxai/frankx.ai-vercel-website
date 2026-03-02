'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import {
  Image,
  Mic,
  PenTool,
  Rocket,
  Code,
  Clock,
  ArrowRight,
  Sparkles,
  Target,
  Palette,
  Music,
  Building2,
  Zap
} from 'lucide-react'
import { GlowCard } from '@/components/ui/glow-card'

// ============================================================================
// TYPES
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

interface GuidesPageClientProps {
  guides: GuideDoc[]
}

// ============================================================================
// GUIDE CATEGORIES - OUTCOME FOCUSED
// ============================================================================

const GUIDE_CATEGORIES = [
  {
    id: 'visual',
    title: 'Visual Creation',
    subtitle: 'From concept to stunning imagery',
    description: 'Master AI image generation, product photography, and brand design systems.',
    icon: Image,
    color: 'from-purple-500/20 to-pink-500/20',
    iconColor: 'text-purple-400',
    slugs: ['midjourney-guide', 'image-generation-mastery', 'product-photography-ai', 'brand-identity-design']
  },
  {
    id: 'content',
    title: 'Content Systems',
    subtitle: 'Build your content empire',
    description: 'Create scalable writing systems, documentation, and content workflows.',
    icon: PenTool,
    color: 'from-emerald-500/20 to-teal-500/20',
    iconColor: 'text-emerald-400',
    slugs: ['ai-writing-system', 'claude-anthropic-guide', 'openai-chatgpt-guide', 'perplexity-ai-guide', 'top-50-ai-prompts']
  },
  {
    id: 'audio',
    title: 'Audio & Music',
    subtitle: 'Professional sound design',
    description: 'Produce AI music, voice content, and audio branding that stands out.',
    icon: Music,
    color: 'from-orange-500/20 to-amber-500/20',
    iconColor: 'text-orange-400',
    slugs: ['suno-prompt-playbook', 'elevenlabs-voice-guide', 'ai-music-production']
  },
  {
    id: 'founder',
    title: "Founder's Playbook",
    subtitle: 'Y Combinator-level strategy',
    description: 'Build your AI-first startup with enterprise patterns and proven frameworks.',
    icon: Rocket,
    color: 'from-blue-500/20 to-cyan-500/20',
    iconColor: 'text-blue-400',
    slugs: ['modern-guide', 'skills-library-playbook', 'agent-collective-operating-system', 'founder-ai-stack-2026']
  },
  {
    id: 'development',
    title: 'AI Development',
    subtitle: 'Code smarter, ship faster',
    description: 'AI-assisted development, multi-agent systems, and automation.',
    icon: Code,
    color: 'from-rose-500/20 to-red-500/20',
    iconColor: 'text-rose-400',
    slugs: ['claude-code-getting-started', 'multi-agent-orchestration', 'ai-automation-patterns']
  }
]

// ============================================================================
// AURORA BACKGROUND
// ============================================================================

function AuroraBackground() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0" style={{ backgroundColor: '#0a0a0b' }} />
      <motion.div
        className="absolute -top-[40%] -left-[20%] w-[80%] h-[80%]"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.06) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
        animate={shouldReduceMotion ? undefined : { x: [0, 100, 0], y: [0, 50, 0], scale: [1, 1.1, 1] }}
        transition={shouldReduceMotion ? undefined : { duration: 30, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-[30%] -right-[10%] w-[60%] h-[60%]"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.05) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
        animate={shouldReduceMotion ? undefined : { x: [0, -80, 0], y: [0, -30, 0], scale: [1, 1.15, 1] }}
        transition={shouldReduceMotion ? undefined : { duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}

// ============================================================================
// GUIDE CARD
// ============================================================================

function GuideCard({ guide, index }: { guide: GuideDoc; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
    >
      <GlowCard href={`/guides/${guide.slug}`} color="emerald" className="p-5 h-full">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-base font-medium text-white group-hover:text-white transition-colors leading-tight pr-4">
            {guide.title}
          </h3>
          <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-white/60 group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-0.5" />
        </div>

        <p className="text-sm text-white/40 leading-relaxed mb-3 line-clamp-2 group-hover:text-white/50 transition-colors">
          {guide.description}
        </p>

        <div className="flex items-center gap-3 text-xs text-white/30">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {guide.readingTime}
          </span>
        </div>
      </GlowCard>
    </motion.div>
  )
}

// ============================================================================
// CATEGORY SECTION
// ============================================================================

function CategorySection({
  category,
  guides,
  index
}: {
  category: typeof GUIDE_CATEGORIES[0]
  guides: GuideDoc[]
  index: number
}) {
  const Icon = category.icon
  const categoryGuides = guides.filter(g => category.slugs.includes(g.slug))

  if (categoryGuides.length === 0) return null

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: index * 0.1 }}
      className="mb-16"
    >
      {/* Category Header */}
      <div className="flex items-start gap-4 mb-6">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${category.color}`}>
          <Icon className={`w-6 h-6 ${category.iconColor}`} />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white mb-1">
            {category.title}
          </h2>
          <p className="text-sm text-white/40">
            {category.subtitle}
          </p>
        </div>
      </div>

      {/* Guides Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categoryGuides.map((guide, i) => (
          <GuideCard key={guide.slug} guide={guide} index={i} />
        ))}
      </div>
    </motion.section>
  )
}

// ============================================================================
// FEATURED GUIDE
// ============================================================================

function FeaturedGuide({ guide }: { guide: GuideDoc }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <GlowCard href={`/guides/${guide.slug}`} color="emerald" className="p-8">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-2xl font-bold text-white group-hover:text-emerald-100 transition-colors flex-1 pr-4">
            {guide.title}
          </h3>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-medium shrink-0">
            <Sparkles className="w-3 h-3" />
            Featured
          </span>
        </div>
        <p className="text-white/50 leading-relaxed mb-4 max-w-2xl group-hover:text-white/60 transition-colors">
          {guide.description}
        </p>
        <div className="flex items-center gap-4 text-sm text-white/40">
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            {guide.readingTime}
          </span>
          <span className="flex items-center gap-1.5 text-emerald-400 group-hover:text-emerald-300 transition-colors">
            Read guide
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </GlowCard>
    </motion.div>
  )
}

// ============================================================================
// STATS BAR
// ============================================================================

function StatsBar() {
  const stats = [
    { icon: Target, label: 'Outcome-focused', value: 'Not tool-centric' },
    { icon: Zap, label: 'Battle-tested', value: 'Real workflows' },
    { icon: Building2, label: 'Enterprise-grade', value: 'Production ready' },
  ]

  return (
    <div className="grid grid-cols-3 gap-4 mb-12">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 + i * 0.1 }}
        >
          <GlowCard color="emerald" className="p-4 text-center">
            <stat.icon className="w-5 h-5 text-white/30 mx-auto mb-2" />
            <div className="text-xs text-white/60 font-medium">{stat.label}</div>
            <div className="text-xs text-white/30">{stat.value}</div>
          </GlowCard>
        </motion.div>
      ))}
    </div>
  )
}

// ============================================================================
// MAIN CLIENT COMPONENT
// ============================================================================

export default function GuidesPageClient({ guides }: GuidesPageClientProps) {
  // Find the featured guide (modern-guide or most recent)
  const featuredGuide = guides.find(g => g.slug === 'modern-guide') || guides[0]

  // Get guides that aren't in any category (for "More Guides" section)
  const categorizedSlugs = GUIDE_CATEGORIES.flatMap(c => c.slugs)
  const uncategorizedGuides = guides.filter(g =>
    !categorizedSlugs.includes(g.slug) && g.slug !== featuredGuide?.slug
  )

  return (
    <main className="relative min-h-screen text-white">
      <AuroraBackground />

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-12">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Breadcrumb */}
              <div className="mb-8">
                <span className="text-xs font-medium uppercase tracking-[0.3em] text-emerald-400/60">
                  Creator Guides
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
                What do you want
                <span className="block mt-2 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  to create?
                </span>
              </h1>

              {/* Subtext */}
              <p className="text-lg md:text-xl text-white/50 max-w-2xl leading-relaxed mb-8">
                Outcome-focused guides for elite creators and founders.
                Not tool tutorials—real systems that ship.
              </p>
            </motion.div>

            {/* Stats Bar */}
            <StatsBar />

            {/* Featured Guide */}
            {featuredGuide && <FeaturedGuide guide={featuredGuide} />}
          </div>
        </section>

        {/* Category Sections */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-6">
            {GUIDE_CATEGORIES.map((category, i) => (
              <CategorySection
                key={category.id}
                category={category}
                guides={guides}
                index={i}
              />
            ))}

            {/* Uncategorized Guides */}
            {uncategorizedGuides.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-white/5">
                    <Palette className="w-6 h-6 text-white/40" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white mb-1">
                      More Guides
                    </h2>
                    <p className="text-sm text-white/40">
                      Additional resources and tutorials
                    </p>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {uncategorizedGuides.map((guide, i) => (
                    <GuideCard key={guide.slug} guide={guide} index={i} />
                  ))}
                </div>
              </motion.section>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 border-t border-white/5">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to build?
              </h2>
              <p className="text-white/50 mb-8">
                Get the tools and templates to accelerate your creator journey.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-colors"
                >
                  View Products
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/resources"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 text-white/70 hover:text-white hover:border-white/20 font-medium transition-colors"
                >
                  Free Resources
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  )
}
