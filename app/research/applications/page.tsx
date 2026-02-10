'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  Brain,
  Palette,
  Pill,
  Clock,
  CheckCircle2,
} from 'lucide-react'

// Application hubs
const applicationHubs = [
  {
    slug: 'mental-health',
    title: 'AI for Mental Health',
    description: 'What actually works for depression, anxiety, and ADHD - according to clinical evidence',
    icon: Heart,
    color: 'violet',
    keyStats: ['34% depression reduction', '91% prediction accuracy', 'Level 1 for ADHD'],
    status: 'live',
  },
  {
    slug: 'cognitive-enhancement',
    title: 'Cognitive Enhancement',
    description: 'Memory, focus, and learning optimization - separating science from marketing',
    icon: Brain,
    color: 'cyan',
    keyStats: ['Neurogenesis confirmed', 'Spaced repetition 200-400%', 'Sleep optimization'],
    status: 'coming',
  },
  {
    slug: 'creative-augmentation',
    title: 'Creative Augmentation',
    description: 'EEG-driven music, flow states, and AI-assisted creativity',
    icon: Palette,
    color: 'orange',
    keyStats: ['EEG music generation', 'Flow state triggers', 'Creative AI tools'],
    status: 'coming',
  },
  {
    slug: 'disease-treatment',
    title: 'BCIs for Treatment',
    description: 'Brain-computer interfaces for paralysis, vision restoration, and neurological conditions',
    icon: Pill,
    color: 'emerald',
    keyStats: ['65K electrode arrays', 'FDA trials completed', '12+ patients implanted'],
    status: 'coming',
  },
]

export default function ApplicationsIndexPage() {
  return (
    <main className="min-h-screen bg-[#030712]">
      {/* Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden>
        <div className="absolute inset-0 bg-[#030712]" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <div className="relative pt-32 pb-20">
        <div className="mx-auto max-w-5xl px-6">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link
              href="/research"
              className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Research Hub
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Application Hubs
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl">
              Outcome-focused research summaries. What does AI + neuroscience mean for
              specific use cases? Each hub synthesizes validated claims into actionable guidance.
            </p>
          </motion.div>

          {/* Application Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="grid md:grid-cols-2 gap-6"
          >
            {applicationHubs.map((hub, i) => {
              const Icon = hub.icon
              const colorMap = {
                violet: 'from-violet-500/20 to-pink-500/10 border-violet-500/30 text-violet-400',
                cyan: 'from-cyan-500/20 to-blue-500/10 border-cyan-500/30 text-cyan-400',
                orange: 'from-orange-500/20 to-amber-500/10 border-orange-500/30 text-orange-400',
                emerald: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400',
              }
              const colors = colorMap[hub.color as keyof typeof colorMap]
              const isLive = hub.status === 'live'

              return (
                <motion.div
                  key={hub.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                >
                  {isLive ? (
                    <Link
                      href={`/research/applications/${hub.slug}`}
                      className={`block rounded-2xl border bg-gradient-to-br to-transparent p-6 hover:scale-[1.02] transition-all ${colors.split(' ').slice(0, 3).join(' ')}`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 ${colors.split(' ').slice(-1)[0]}`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" />
                          Live
                        </span>
                      </div>
                      <h2 className="text-xl font-bold text-white mb-2">{hub.title}</h2>
                      <p className="text-sm text-slate-400 mb-4">{hub.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {hub.keyStats.map((stat, j) => (
                          <span key={j} className="text-[10px] px-2 py-1 rounded-full bg-white/5 text-slate-400">
                            {stat}
                          </span>
                        ))}
                      </div>
                      <span className={`inline-flex items-center gap-1 text-sm font-medium ${colors.split(' ').slice(-1)[0]}`}>
                        Explore Hub
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </Link>
                  ) : (
                    <div
                      className={`block rounded-2xl border bg-gradient-to-br to-transparent p-6 opacity-60 ${colors.split(' ').slice(0, 3).join(' ')}`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 ${colors.split(' ').slice(-1)[0]}`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-slate-400 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Coming Soon
                        </span>
                      </div>
                      <h2 className="text-xl font-bold text-white mb-2">{hub.title}</h2>
                      <p className="text-sm text-slate-400 mb-4">{hub.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {hub.keyStats.map((stat, j) => (
                          <span key={j} className="text-[10px] px-2 py-1 rounded-full bg-white/5 text-slate-400">
                            {stat}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )
            })}
          </motion.div>

          {/* Coming Soon Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 text-center"
          >
            <p className="text-sm text-slate-500">
              New application hubs are added as we complete research synthesis.
              Each hub requires validated claims from 10+ sources.
            </p>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
