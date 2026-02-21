'use client'

import { useState } from 'react'
import { Coffee, Zap, Music, Moon, Clock, ArrowRight, Check } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const rituals = [
  {
    id: 'morning-prime',
    title: 'Morning Prime',
    time: '6:00 — 7:30 AM',
    icon: Coffee,
    gradient: 'from-amber-500/20 to-orange-500/20',
    accent: '#F59E0B',
    description: 'Set the creative direction before the world starts pulling. Review overnight ideas, pick the one thread worth pulling, and write the first 200 words.',
    protocol: [
      'Review overnight notes and ideas — pick one thread',
      'Write 200 words on the day\'s primary creative output',
      'Set 3 shipping targets (what leaves the dock today)',
      'Queue music for the first deep work block',
    ],
    output: 'A clear creative direction and 3 concrete shipping targets for the day.',
  },
  {
    id: 'deep-build',
    title: 'Deep Build',
    time: '9:00 AM — 12:30 PM',
    icon: Zap,
    gradient: 'from-[#43BFE3]/20 to-blue-500/20',
    accent: '#43BFE3',
    description: '3.5 hours of uninterrupted building. No Slack, no email, no meetings. This is where the ACOS gets developed, articles get written, and products get shipped.',
    protocol: [
      'Phone on DND, all notifications off',
      'Single task — no context switching',
      'Claude Code as pair programmer for technical work',
      'Ship or commit before the block ends — no "almost done"',
    ],
    output: 'One meaningful artifact shipped: a deployed feature, published article, or completed product.',
  },
  {
    id: 'studio-session',
    title: 'Studio Session',
    time: '9:00 PM — 12:00 AM',
    icon: Music,
    gradient: 'from-[#AB47C7]/20 to-violet-500/20',
    accent: '#AB47C7',
    description: 'The night studio. This is where 12,000+ songs came from — late-night sessions with Suno, experimenting across genres, pushing what AI music can do.',
    protocol: [
      'Pick a genre or mood to explore',
      'Generate 10-20 track variations with Suno',
      'Curate the best 2-3 for refinement',
      'Log what worked and what didn\'t in the production journal',
    ],
    output: '2-3 refined tracks added to the library. Production notes logged for pattern recognition.',
  },
  {
    id: 'evening-review',
    title: 'Evening Review',
    time: '11:30 PM — 12:00 AM',
    icon: Moon,
    gradient: 'from-indigo-500/20 to-slate-500/20',
    accent: '#6366F1',
    description: 'Clear the day\'s residue. Review what shipped, capture ideas that surfaced during the session, and set tomorrow\'s intention.',
    protocol: [
      'Check off the 3 shipping targets from morning',
      'Capture any new ideas or threads worth pursuing',
      'Commit and push all work — nothing stays local overnight',
      'Set tomorrow\'s primary creative direction',
    ],
    output: 'Clean slate for tomorrow. All work committed. Next day\'s direction set.',
  },
]

export default function RitualsPage() {
  const [activeRitual, setActiveRitual] = useState<string | null>(null)
  const activeData = rituals.find((r) => r.id === activeRitual)

  return (
    <main className="min-h-screen bg-[#0F172A] text-white">
      {/* Hero */}
      <section className="pt-32 pb-16 px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-white/60 mb-8">
          <Clock className="w-4 h-4" />
          Daily production system
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
          Systems, not motivation.
        </h1>
        <p className="text-white/60 text-xl max-w-2xl mx-auto">
          12,000+ songs, 80+ articles, and a full platform didn&apos;t come from hustle culture.
          They came from four daily protocols, repeated until the work compounds.
        </p>
      </section>

      {/* Ritual Cards */}
      <section className="max-w-6xl mx-auto px-6 pb-12 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {rituals.map((ritual) => {
          const Icon = ritual.icon
          return (
            <motion.button
              key={ritual.id}
              whileHover={{ y: -4 }}
              className={`relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${ritual.gradient} p-6 cursor-pointer group text-left w-full transition-colors ${
                activeRitual === ritual.id ? 'border-white/30' : ''
              }`}
              onClick={() => setActiveRitual(activeRitual === ritual.id ? null : ritual.id)}
            >
              <div className="absolute inset-0 bg-[#0F172A]/80 group-hover:bg-[#0F172A]/60 transition-colors" />
              <div className="relative z-10">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${ritual.accent}15` }}
                >
                  <Icon className="w-5 h-5" style={{ color: ritual.accent }} />
                </div>
                <h3 className="text-lg font-bold mb-1">{ritual.title}</h3>
                <p className="text-sm text-white/40 font-mono">{ritual.time}</p>
              </div>
            </motion.button>
          )
        })}
      </section>

      {/* Expanded Ritual Detail */}
      <AnimatePresence mode="wait">
        {activeData && (
          <motion.section
            key={activeData.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="max-w-4xl mx-auto px-6 pb-12 overflow-hidden"
          >
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
              <p className="text-white/70 text-lg leading-relaxed mb-6">
                {activeData.description}
              </p>

              <h4 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-4">
                Protocol
              </h4>
              <ul className="space-y-3 mb-6">
                {activeData.protocol.map((step) => (
                  <li key={step} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#10B981] flex-shrink-0 mt-1" />
                    <span className="text-white/70">{step}</span>
                  </li>
                ))}
              </ul>

              <div className="rounded-xl bg-white/[0.03] border border-white/10 p-4">
                <span className="text-xs font-semibold text-[#43BFE3] uppercase tracking-wider">
                  Expected output
                </span>
                <p className="text-white/60 mt-1">{activeData.output}</p>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Philosophy */}
      <section className="max-w-3xl mx-auto px-6 py-16 text-center">
        <blockquote className="text-2xl md:text-3xl font-semibold text-white/80 leading-relaxed">
          &ldquo;The goal isn&apos;t to work more hours. It&apos;s to make every hour produce something real.&rdquo;
        </blockquote>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl font-bold mb-4">See what these systems produce</h2>
          <p className="text-white/60 mb-8 max-w-lg mx-auto">
            The rituals are inputs. The blog, music, and products are outputs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/achievements"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#AB47C7] to-[#43BFE3] text-white font-semibold hover:opacity-90 transition-opacity"
            >
              View Achievements
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/music"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 text-white/80 font-semibold hover:bg-white/5 transition-colors"
            >
              Explore Music
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
