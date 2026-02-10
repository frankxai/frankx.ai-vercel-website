'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowRight,
  Sparkles,
  Music,
  BookOpen,
  Building2,
  Cpu,
  CheckCircle2,
  Calendar,
} from 'lucide-react'

/**
 * Products Page V3: Timeline Layout
 *
 * Storytelling-focused timeline showing product evolution
 * with launch dates and development status
 */

const products = [
  {
    id: 'vibe-os',
    icon: Music,
    name: 'Vibe OS',
    tagline: 'Suno Music Mastery',
    description: 'The system behind 500+ AI-generated songs. Genre-specific prompts, emotion-to-sound mapping, and production enhancement guides.',
    href: '/products/vibe-os',
    color: 'pink',
    status: 'launching',
    launchDate: 'Q1 2026',
    highlights: [
      '50+ genre-specific prompts',
      'Emotion mapping system',
      'Production checklists',
    ],
  },
  {
    id: 'creative-ai-toolkit',
    icon: Sparkles,
    name: 'Creative AI Toolkit',
    tagline: 'Prompt library + workflow rituals',
    description: 'A comprehensive digital kit with prompts, templates, and rollout rituals for consistent creative output.',
    href: '/products/creative-ai-toolkit',
    color: 'violet',
    status: 'development',
    launchDate: 'Q2 2026',
    highlights: [
      '100+ validated prompts',
      '12 workflow automations',
      'Implementation roadmaps',
    ],
  },
  {
    id: 'agentic-creator-os',
    icon: Building2,
    name: 'Agentic Creator OS',
    tagline: 'Developer AI Mastery',
    description: 'Agentic playbooks, prompt stacks, and governance checklists for developers building with AI.',
    href: '/products/agentic-creator-os',
    color: 'emerald',
    status: 'development',
    launchDate: 'Q2 2026',
    highlights: [
      'Claude Code mastery',
      'Agentic workflow patterns',
      'Production-grade agents',
    ],
  },
  {
    id: 'creation-chronicles',
    icon: BookOpen,
    name: 'Creation Chronicles',
    tagline: 'Strategic Storytelling OS',
    description: 'Story frameworks, editorial calendars, and prompt stacks to build authority through content.',
    href: '/products/creation-chronicles',
    color: 'cyan',
    status: 'planned',
    launchDate: 'Q3 2026',
    highlights: [
      'Story architecture',
      'Content creation workflows',
      'Distribution templates',
    ],
  },
  {
    id: 'generative-creator-os',
    icon: Cpu,
    name: 'Generative Creator OS',
    tagline: 'Multi-modal AI Studio',
    description: 'Multi-modal templates, prompts, and guardrails for a reliable creative studio system.',
    href: '/products/generative-creator-os',
    color: 'amber',
    status: 'planned',
    launchDate: 'Q4 2026',
    highlights: [
      'Multi-modal pipelines',
      'Brand intelligence',
      'Team enablement',
    ],
  },
]

const colorMap = {
  pink: 'bg-pink-500',
  violet: 'bg-violet-500',
  emerald: 'bg-emerald-500',
  cyan: 'bg-cyan-500',
  amber: 'bg-amber-500',
}

const statusMap = {
  launching: { label: 'Launching Soon', color: 'bg-emerald-500/20 text-emerald-400' },
  development: { label: 'In Development', color: 'bg-amber-500/20 text-amber-400' },
  planned: { label: 'Planned', color: 'bg-white/10 text-white/60' },
}

export default function ProductsPageTimeline() {
  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white">
      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              The Product Roadmap
            </h1>
            <p className="text-xl text-white/50 max-w-2xl mx-auto">
              A complete ecosystem of operating systems for creators.
              Here's what's coming and when.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-white/10" />

            {products.map((product, index) => {
              const Icon = product.icon
              const isEven = index % 2 === 0
              const status = statusMap[product.status as keyof typeof statusMap]
              const dotColor = colorMap[product.color as keyof typeof colorMap]

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex items-center mb-12 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10">
                    <div className={`w-4 h-4 rounded-full ${dotColor}`} />
                  </div>

                  {/* Content */}
                  <div className={`ml-20 md:ml-0 md:w-[calc(50%-40px)] ${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
                    <Link href={product.href} className="group block">
                      <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className={`w-12 h-12 rounded-xl ${dotColor}/20 flex items-center justify-center`}>
                            <Icon className={`w-6 h-6 text-${product.color}-400`} />
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${status.color}`}>
                            {status.label}
                          </span>
                        </div>

                        {/* Title */}
                        <p className="text-xs uppercase tracking-widest text-white/40 mb-1">
                          {product.tagline}
                        </p>
                        <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-white/80 transition-colors">
                          {product.name}
                        </h2>

                        {/* Launch date */}
                        <div className="flex items-center gap-2 text-white/40 text-sm mb-4">
                          <Calendar className="w-4 h-4" />
                          <span>{product.launchDate}</span>
                        </div>

                        {/* Description */}
                        <p className="text-white/50 mb-6">
                          {product.description}
                        </p>

                        {/* Highlights */}
                        <ul className="space-y-2 mb-6">
                          {product.highlights.map((highlight) => (
                            <li key={highlight} className="flex items-center gap-2 text-sm text-white/60">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                              {highlight}
                            </li>
                          ))}
                        </ul>

                        {/* CTA */}
                        <div className="flex items-center gap-2 text-white/50 group-hover:text-white transition-colors">
                          <span className="text-sm font-medium">Learn More</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Stay updated on launches
            </h2>
            <p className="text-white/50 mb-8">
              Join the waitlist for early access, exclusive discounts, and development updates.
            </p>
            <Link
              href="/newsletter"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-all"
            >
              <Sparkles className="w-5 h-5" />
              Join the Waitlist
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
