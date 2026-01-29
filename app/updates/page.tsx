'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Rocket,
  Bug,
  Sparkles,
  FileText,
  ArrowLeft,
  Calendar,
  GitCommit,
  ExternalLink,
} from 'lucide-react'

import GlassmorphicCard from '@/components/ui/GlassmorphicCard'

// Update entries - Add new entries at the top
const updates = [
  {
    date: '2026-01-19',
    version: '2.5.0',
    title: 'Workshops & Research Hub Launch',
    type: 'feature',
    items: [
      'Added Workshops hub with 5 AI workshops',
      'Launched Research Intelligence Hub',
      'Added AI Architect Academy pages',
      'Fixed navigation links and broken CTAs',
      'Added Tailwind safelist for dynamic colors',
    ],
  },
  {
    date: '2026-01-17',
    version: '2.4.0',
    title: 'Multi-Cloud Comparison & Prototypes',
    type: 'feature',
    items: [
      'Added AI Architecture multi-cloud comparison page',
      'Launched Prototypes gallery',
      'New blog articles on AI coding agents',
      'Premium scroll effects on homepage',
    ],
  },
  {
    date: '2026-01-14',
    version: '2.3.0',
    title: 'Email System & PDF Delivery',
    type: 'feature',
    items: [
      'Comprehensive email template system with Resend + ConvertKit',
      'Elevated PDF delivery flow with glassmorphic design',
      'Golden Age book reading experience',
      'Inner Circle page redesign',
      'Deployment verification system with smoke tests',
    ],
  },
  {
    date: '2026-01-13',
    version: '2.2.0',
    title: 'Links Page & Navigation',
    type: 'feature',
    items: [
      'Added FrankX Links page with SEO',
      'Internal email signup system',
      'Progress Tracker redesign',
      'Mega navigation improvements',
    ],
  },
  {
    date: '2026-01-12',
    version: '2.1.0',
    title: 'Soulbook & Design System',
    type: 'feature',
    items: [
      'Soulbook assessment and pillars pages',
      'Unified FrankX design system',
      'Premium button components',
      'Brand color palette implementation',
    ],
  },
]

const typeIcons = {
  feature: Sparkles,
  fix: Bug,
  docs: FileText,
  release: Rocket,
}

const typeColors = {
  feature: 'text-emerald-400 bg-emerald-400/10',
  fix: 'text-amber-400 bg-amber-400/10',
  docs: 'text-cyan-400 bg-cyan-400/10',
  release: 'text-purple-400 bg-purple-400/10',
}

export default function UpdatesPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-emerald-900/20 via-slate-950 to-cyan-900/20">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-16 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 self-start text-sm text-slate-400 transition-colors hover:text-slate-200"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="mb-4 inline-block rounded-full border border-white/15 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
              Changelog
            </span>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
              FrankX.AI Updates
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
              Track the evolution of FrankX.AI. New features, improvements, and fixes shipped to production.
            </p>
          </motion.div>
        </div>
      </header>

      {/* Updates Timeline */}
      <main className="mx-auto max-w-4xl px-6 py-16">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 hidden h-full w-px bg-gradient-to-b from-emerald-500/50 via-cyan-500/30 to-transparent md:block" />

          <div className="space-y-8">
            {updates.map((update, index) => {
              const Icon = typeIcons[update.type as keyof typeof typeIcons] || Sparkles
              const colorClass = typeColors[update.type as keyof typeof typeColors] || typeColors.feature

              return (
                <motion.div
                  key={update.version}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-0 md:pl-20"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-6 top-6 hidden h-4 w-4 rounded-full border-2 border-emerald-500 bg-slate-950 md:block" />

                  <GlassmorphicCard variant="luxury" border="glow" className="p-6">
                    <div className="mb-4 flex flex-wrap items-center gap-3">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${colorClass}`}>
                        <Icon className="h-3.5 w-3.5" />
                        {update.type.charAt(0).toUpperCase() + update.type.slice(1)}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
                        <Calendar className="h-3.5 w-3.5" />
                        {update.date}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
                        <GitCommit className="h-3.5 w-3.5" />
                        v{update.version}
                      </span>
                    </div>

                    <h2 className="mb-3 text-xl font-bold text-slate-100">{update.title}</h2>

                    <ul className="space-y-2">
                      {update.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-400" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </GlassmorphicCard>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <GlassmorphicCard variant="luxury" border="glow" className="p-8">
            <h3 className="mb-2 text-xl font-bold text-slate-100">Stay Updated</h3>
            <p className="mb-4 text-slate-300">
              Join the Creation Chronicles for weekly updates on new features and content.
            </p>
            <Link
              href="https://frankx.ck.page/creation-chronicles"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-3 font-semibold text-white transition-all hover:shadow-lg hover:shadow-emerald-500/25"
            >
              Join Creation Chronicles
              <ExternalLink className="h-4 w-4" />
            </Link>
          </GlassmorphicCard>
        </motion.div>
      </main>
    </div>
  )
}
