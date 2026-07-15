'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowRight,
  Clock,
  BookOpen,
  Play,
  GraduationCap,
} from 'lucide-react'
import {
  learningPaths,
  featuredCreators,
  type LearningPath,
  type LearningPathCategory,
} from '@/data/learning-paths'
import { iconMap, colorMap } from '@/lib/learn/portal-display'

// Genuinely not-yet-built portals. AWS Bedrock, Azure AI Foundry, Oracle OCI
// GenAI, and ChatGPT already shipped — they must not appear here as "coming".
const upcomingPortals: string[] = [
  'Suno AI Music',
  'Midjourney',
  'NotebookLM Deep Work',
]

const categoryLabels: Record<LearningPathCategory, { title: string; blurb: string }> = {
  'model-maker': {
    title: 'Frontier model makers',
    blurb: "The labs that ship the models themselves — Anthropic, Google, OpenAI.",
  },
  cloud: {
    title: 'Cloud AI surfaces',
    blurb: 'Managed model gateways on AWS, Azure, and Oracle Cloud — where production runs.',
  },
  consumer: {
    title: 'Consumer & creative tools',
    blurb: 'Specialist products for music, video, image, and research workflows.',
  },
}

const CATEGORY_ORDER: LearningPathCategory[] = ['model-maker', 'cloud', 'consumer']

function PathCard({ path }: { path: LearningPath }) {
  const Icon = iconMap[path.icon] || BookOpen
  const colors = colorMap[path.color]

  return (
    <Link
      href={`/learn/${path.slug}`}
      className={`group relative block p-6 rounded-2xl border bg-gradient-to-br ${colors} hover:border-white/20 transition-all hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl bg-white/5`}>
          <Icon className="w-6 h-6" />
        </div>
        <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/10 text-white/60 capitalize">
          {path.difficulty}
        </span>
      </div>

      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-white/90">
        {path.title}
      </h3>
      <p className="text-sm text-white/50 mb-4 line-clamp-2">
        {path.description}
      </p>

      <div className="flex items-center gap-4 text-xs text-white/40">
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          {path.estimatedHours} hours
        </div>
        <div className="flex items-center gap-1.5">
          <Play className="w-3.5 h-3.5" />
          {path.videos.length} videos
        </div>
      </div>

      <ArrowRight className="absolute bottom-6 right-6 w-5 h-5 text-white/20 group-hover:text-white/60 group-hover:translate-x-1 transition-all" />
    </Link>
  )
}


export default function LearnShell() {
  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      {/* Hero */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-cyan-500/10" />

        <div className="relative max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
              <GraduationCap className="w-4 h-4" />
              Curated Learning Paths
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-white mb-6">
              Learn AI the{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Right Way
              </span>
            </h1>

            <p className="text-[17px] leading-relaxed text-white/80 max-w-2xl mx-auto">
              Curated learning portals for the AI ecosystems that matter. Each one bundles
              official launches, the sharpest expert walkthroughs, and the structure to move
              from first prompt to production.
            </p>
            <p className="mt-5 text-sm text-white/50">
              Pick a portal · watch the free path · ship the first project. No account, no cost.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Learning Paths Grid — grouped by category (required field on every portal). */}
      <section className="max-w-6xl mx-auto px-6 pb-12">
        <div className="space-y-12">
          {CATEGORY_ORDER.map((cat) => {
            const inCat = learningPaths.filter((p) => p.category === cat)
            // Skip an empty category entirely UNLESS it's consumer — the only
            // one with a known roadmap roster (upcomingPortals are all consumer).
            // This stops the in-build chips showing under the wrong header if a
            // model-maker/cloud category ever empties.
            if (inCat.length === 0 && cat !== 'consumer') return null
            const meta = categoryLabels[cat]
            return (
              <div key={cat}>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-white mb-1">{meta.title}</h2>
                  <p className="text-sm text-white/50">{meta.blurb}</p>
                </div>
                {inCat.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {inCat.map((path, i) => (
                      <motion.div
                        key={path.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: Math.min(i, 4) * 0.05 }}
                      >
                        <PathCard path={path} />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  // Visible in-build state — a roadmap signal, not a dead gap.
                  <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-6">
                    <p className="text-sm text-white/50 mb-3">
                      In build — {upcomingPortals.length} portals, same depth and curation.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {upcomingPortals.map((portal) => (
                        <span
                          key={portal}
                          className="text-xs font-medium px-3 py-1.5 rounded-full bg-white/5 text-white/60 border border-white/5"
                        >
                          {portal}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* Featured Creators */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Featured Creators</h2>
          <p className="text-white/50">Learn from the best in the AI education space</p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {featuredCreators.map((creator) => (
            <a
              key={creator.name}
              href={creator.channel}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.04] hover:border-white/20 transition-all text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
            >
              <h3 className="font-semibold text-white mb-1">{creator.name}</h3>
              <p className="text-xs text-white/50 mb-2">{creator.specialty}</p>
              <p className="text-xs text-emerald-400">{creator.subscribers} subscribers</p>
            </a>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-white mb-4">
            Want Structured Guidance?
          </h2>
          <p className="text-[17px] leading-relaxed text-white/80 mb-8 max-w-xl mx-auto">
            Free resources are great for exploration.
            For a structured path with hands-on projects, check out our guides.
          </p>
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
          >
            Explore Guides
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
