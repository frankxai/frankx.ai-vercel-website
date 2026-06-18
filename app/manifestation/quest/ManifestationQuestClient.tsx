'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowRight, Check, Music, Sparkles, NotebookPen, RotateCcw } from 'lucide-react'
import { FaqList } from '@/components/manifestation/shared'
import { questDays, MANIFESTATION_QUEST_LENGTH } from '@/data/manifestation'

const STORAGE_KEY = 'frankx-manifestation-quest'

export const questFaqs = [
  {
    question: 'What is the Reality Architect Quest?',
    answer:
      'A guided 10-day loop that takes you from setting a vision and feeling it as real (Manifestation Master) to turning it into something shipped (Reality Architect). Each day is one practice: name it, feel it, render it with AI, set your state with music, build, ship, and learn.',
  },
  {
    question: 'Do I need an account?',
    answer:
      'No. Your progress lives in your browser (localStorage) — nothing is sent to a server. The honest trade-off: switching devices or clearing browser data resets your map.',
  },
  {
    question: 'Do I have to do one day per day?',
    answer:
      'No. The order matters more than the pace — each day builds on the last. Go a day at a time, or block a weekend. Mark a day done when you have actually run the practice, not just read it.',
  },
  {
    question: 'Do I need Vibe OS or paid tools?',
    answer:
      'No. The state-setting step works with any music you make or choose. Vibe OS makes it deliberate — tempo, mode, and lyric tuned to a goal-state — but the loop runs without it.',
  },
]

export default function ManifestationQuestClient() {
  const [completed, setCompleted] = useState<number[]>([])
  const [mounted, setMounted] = useState(false)
  const [openDay, setOpenDay] = useState<number | null>(1)

  useEffect(() => {
    setMounted(true)
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed)) {
          setCompleted(parsed.filter((d): d is number => typeof d === 'number'))
        }
      }
    } catch {
      /* ignore */
    }
  }, [])

  function persist(next: number[]) {
    setCompleted(next)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      /* storage full / unavailable */
    }
  }

  function toggleDay(day: number) {
    persist(completed.includes(day) ? completed.filter((d) => d !== day) : [...completed, day])
  }

  function reset() {
    persist([])
    setOpenDay(1)
  }

  const doneCount = completed.length
  const pct = Math.round((doneCount / MANIFESTATION_QUEST_LENGTH) * 100)

  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      {/* Hero */}
      <section className="relative pt-28 pb-14 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/15 via-transparent to-transparent" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <Link
            href="/manifestation"
            className="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-white/70 transition-colors mb-6"
          >
            <ArrowRight className="w-3.5 h-3.5 rotate-180" /> Manifestation hub
          </Link>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-[11px] tracking-[0.25em] uppercase text-violet-300/70 mb-5">
              The Reality Architect Quest
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-5">
              10 days. One vision.{' '}
              <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                Shipped.
              </span>
            </h1>
            <p className="text-lg text-white/60 max-w-xl mx-auto">
              Each day is one practice. Name the vision, feel it, render it with AI, set your state
              with music, build, ship, and compound. No account — your map lives in your browser.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Progress */}
      <section className="max-w-3xl mx-auto px-6 pb-10">
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 flex flex-wrap items-center gap-5">
          <p className="text-white/70 text-sm">
            <span className="text-white font-semibold">{mounted ? doneCount : 0}</span>/
            {MANIFESTATION_QUEST_LENGTH} days complete
          </p>
          <div className="flex-1 min-w-40 h-1.5 rounded-full bg-white/5 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full transition-all duration-500"
              style={{ width: `${mounted ? pct : 0}%` }}
            />
          </div>
          {mounted && doneCount > 0 && (
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          )}
        </div>
        {mounted && doneCount === MANIFESTATION_QUEST_LENGTH && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 rounded-2xl border border-violet-500/30 bg-violet-500/[0.06] p-6 text-center"
          >
            <Sparkles className="w-6 h-6 text-violet-300 mx-auto mb-3" />
            <p className="text-white font-semibold mb-1">You ran the full loop.</p>
            <p className="text-white/60 text-sm">
              You are a Reality Architect now — keep the standing daily practice, and run the next loop
              sharper. The{' '}
              <Link href="/manifestation" className="text-violet-300 hover:text-violet-200">
                hub
              </Link>{' '}
              has the experiments to keep going.
            </p>
          </motion.div>
        )}
      </section>

      {/* Days */}
      <section className="max-w-3xl mx-auto px-6 pb-16">
        <div className="space-y-3">
          {questDays.map((d) => {
            const isDone = mounted && completed.includes(d.day)
            const isOpen = openDay === d.day
            return (
              <div
                key={d.day}
                className={`rounded-2xl border transition-colors ${
                  isDone ? 'border-violet-500/30 bg-violet-500/[0.04]' : 'border-white/10 bg-white/[0.02]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenDay(isOpen ? null : d.day)}
                  className="w-full flex items-center gap-4 p-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold ${
                      isDone
                        ? 'bg-violet-500 text-white'
                        : 'bg-white/5 text-white/50 border border-white/10'
                    }`}
                  >
                    {isDone ? <Check className="w-4 h-4" /> : d.day}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block text-[10px] tracking-[0.18em] uppercase text-violet-300/60">
                      Day {d.day} · {d.focus}
                    </span>
                    <span className="block font-bold text-white">{d.title}</span>
                  </span>
                  <ArrowRight
                    className={`w-4 h-4 text-white/30 transition-transform ${isOpen ? 'rotate-90' : ''}`}
                  />
                </button>

                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="px-5 pb-5"
                  >
                    <div className="space-y-4 border-t border-white/5 pt-4">
                      <div>
                        <p className="text-[10px] tracking-[0.15em] uppercase text-white/40 mb-1">Practice</p>
                        <p className="text-white/70">{d.practice}</p>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-3">
                        <div className="rounded-xl bg-white/[0.02] border border-white/5 p-4">
                          <p className="text-[10px] tracking-[0.15em] uppercase text-violet-300/60 mb-1.5 flex items-center gap-1.5">
                            <Music className="w-3.5 h-3.5" /> Set your state
                          </p>
                          <p className="text-sm text-white/60">{d.vibeState}</p>
                        </div>
                        <div className="rounded-xl bg-white/[0.02] border border-white/5 p-4">
                          <p className="text-[10px] tracking-[0.15em] uppercase text-violet-300/60 mb-1.5 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5" /> AI step
                          </p>
                          <p className="text-sm text-white/60">{d.aiStep}</p>
                        </div>
                      </div>
                      <div className="rounded-xl bg-emerald-500/[0.03] border border-emerald-500/15 p-4">
                        <p className="text-[10px] tracking-[0.15em] uppercase text-emerald-300/70 mb-1.5 flex items-center gap-1.5">
                          <NotebookPen className="w-3.5 h-3.5" /> Evidence log tonight
                        </p>
                        <p className="text-sm text-white/65">{d.evidencePrompt}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleDay(d.day)}
                        className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
                          isDone
                            ? 'bg-white/5 text-white/60 border border-white/10 hover:bg-white/10'
                            : 'bg-white text-black hover:bg-white/90'
                        }`}
                      >
                        {isDone ? (
                          <>Completed — undo</>
                        ) : (
                          <>
                            <Check className="w-4 h-4" /> Mark day {d.day} done
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 pb-24">
        <h2 className="text-2xl font-bold text-white mb-8">Questions</h2>
        <FaqList faqs={questFaqs} />
      </section>
    </div>
  )
}
