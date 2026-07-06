'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  ArrowRight,
  BookOpen,
  Brain,
  Heart,
  Layers,
  Lightbulb,
  Mountain,
  Play,
  Repeat,
  Sparkles,
  Target,
  Terminal,
  Users,
} from 'lucide-react'
import { questChapters } from '@/data/daily-dares'
import { questDayNumber, QUEST_LENGTH } from '@/lib/daily-dare'
import { bookReviews } from '@/data/book-reviews'
import { useDareStreak } from '@/lib/hooks/use-dare-streak'
import ShareChallenge from '@/components/dare/ShareChallenge'
import JsonLd, { FAQPageJsonLd } from '@/components/seo/JsonLd'

const chapterIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  target: Target,
  sparkles: Sparkles,
  lightbulb: Lightbulb,
  repeat: Repeat,
  mountain: Mountain,
  users: Users,
}

const dailyParts = [
  {
    icon: Brain,
    title: 'Stretch',
    description: 'One idea that stretches your mind with AI — a video, a path, a concept worth the effort.',
  },
  {
    icon: Terminal,
    title: 'Prompt',
    description: 'One prompt from the library to actually run today. Using AI beats reading about it.',
  },
  {
    icon: BookOpen,
    title: 'Mind',
    description: 'One principle of how the mind works — Hill, Frankl, Clear, Aurelius — as mechanism, not mysticism.',
  },
  {
    icon: Heart,
    title: 'World',
    description: 'One small good thing for the world. Trash picked up, kindness sent, an hour given.',
  },
]

const questFaqs = [
  {
    question: 'What is the Beautiful Mind Quest?',
    answer:
      'A 30-day arc of daily dares at frankx.ai/dare. Each day has four parts: learn something that stretches your mind with AI, run one prompt, train one principle of how the mind works (drawn from Think and Grow Rich and the books around it), and do one small good thing for the world. Six chapters of five days, each built on one principle.',
  },
  {
    question: 'What if I miss a day?',
    answer:
      'Your streak resets, the quest does not. The 30 days run on a fixed worldwide calendar, so you simply pick up whichever day is live — completed days stay banked on your quest map. Streaks measure momentum, not worth.',
  },
  {
    question: 'Do I need an account?',
    answer:
      'No. Progress and streaks live in your browser (localStorage) — nothing is tracked on a server. The honest trade-off: switching devices or clearing browser data resets your map.',
  },
  {
    question: 'Is this based on Think and Grow Rich?',
    answer:
      'The chapter structure follows six of Hill\'s 1937 principles — desire, faith, imagination, auto-suggestion, persistence, and the mastermind — translated into mechanisms backed by modern sources: Clear on habits, Frankl on meaning, Dispenza on belief, Aurelius on obstacles. The full reviews live in the library.',
  },
  {
    question: 'Why do it with a friend?',
    answer:
      'Hill called it the mastermind: two minds aligned on a definite objective outperform either alone. Practically, a partner converts a private intention into a shared standard. The share button on each dare exists for exactly this.',
  },
]

export default function QuestPage() {
  const [todayDay, setTodayDay] = useState<number | null>(null)
  const streakState = useDareStreak()

  useEffect(() => {
    setTodayDay(questDayNumber())
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      <JsonLd
        data={{
          '@type': 'WebPage',
          name: 'The Beautiful Mind Quest',
          description:
            'A 30-day arc of daily dares: AI learning, one prompt a day, the mechanics of belief, attention, and imagination — and one good thing for the world each day.',
          url: 'https://frankx.ai/quest',
          isPartOf: { '@type': 'WebSite', name: 'FrankX.AI', url: 'https://frankx.ai' },
        }}
      />
      <FAQPageJsonLd faqs={questFaqs} />

      {/* Hero */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-transparent" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-[11px] tracking-[0.25em] uppercase text-white/60 mb-6">
              The Beautiful Mind Quest
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {QUEST_LENGTH} days. 6 principles.{' '}
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                One dare a day.
              </span>
            </h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto mb-10">
              Stretch your mind with AI, run one prompt, train one principle of how the mind
              works, and do one good thing for the world. Built to be done with a friend.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/dare"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-colors"
              >
                Take today&rsquo;s dare
                <ArrowRight className="w-4 h-4" />
              </Link>
              {todayDay !== null && (
                <ShareChallenge day={todayDay} dareTitle="join the quest" streak={streakState.streak} />
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {dailyParts.map((part, i) => (
            <motion.div
              key={part.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
            >
              <div className="inline-flex p-2.5 rounded-xl bg-amber-500/10 text-amber-400 mb-4">
                <part.icon className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white mb-1">
                {i + 1}. {part.title}
              </h3>
              <p className="text-sm text-white/50">{part.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Progress strip */}
      {streakState.mounted && streakState.totalDaysCompleted > 0 && (
        <section className="max-w-5xl mx-auto px-6 pb-16">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 flex flex-wrap items-center gap-6">
            <p className="text-white/70 text-sm">
              <span className="text-white font-semibold">{streakState.totalDaysCompleted}</span>/
              {QUEST_LENGTH} days completed
              {streakState.bestStreak > 1 && (
                <span className="text-white/40"> · best streak {streakState.bestStreak}</span>
              )}
            </p>
            <div className="flex-1 min-w-40 h-1 rounded-full bg-white/5 overflow-hidden">
              <div
                className="h-full bg-amber-500/70 rounded-full"
                style={{ width: `${(streakState.totalDaysCompleted / QUEST_LENGTH) * 100}%` }}
              />
            </div>
          </div>
        </section>
      )}

      {/* Chapter map */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-bold text-white mb-2">The map</h2>
        <p className="text-white/50 mb-8">
          Six chapters of five days, each built on one principle from{' '}
          <Link href="/library/think-and-grow-rich" className="text-amber-400/90 hover:text-amber-300 transition-colors">
            Think and Grow Rich
          </Link>{' '}
          — translated into mechanisms, not mysticism.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {questChapters.map((chapter, i) => {
            const Icon = chapterIconMap[chapter.icon] ?? Target
            const book = bookReviews.find((b) => b.slug === chapter.bookSlug)
            const isCurrent =
              todayDay !== null && todayDay >= chapter.days[0] && todayDay <= chapter.days[1]
            const chapterDays = Array.from(
              { length: chapter.days[1] - chapter.days[0] + 1 },
              (_, d) => chapter.days[0] + d
            )

            return (
              <motion.div
                key={chapter.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
                className={`rounded-2xl border p-6 md:p-8 bg-white/[0.02] ${
                  isCurrent ? 'border-amber-500/30' : 'border-white/10'
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
                    <Icon className="w-6 h-6" />
                  </div>
                  {isCurrent && (
                    <span className="text-[10px] tracking-[0.2em] uppercase px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400">
                      Today
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-white mb-1">{chapter.title}</h3>
                <p className="text-xs text-white/40 mb-3">after {chapter.principle}</p>
                <p className="text-sm text-white/50 mb-5">{chapter.summary}</p>

                <div className="flex items-center gap-2 mb-5" aria-label={`Days ${chapter.days[0]} to ${chapter.days[1]}`}>
                  {chapterDays.map((d) => {
                    const done = streakState.mounted && streakState.isDayCompleted(d)
                    const isToday = todayDay === d
                    return (
                      <span
                        key={d}
                        title={`Day ${d}`}
                        className={`w-2.5 h-2.5 rounded-full ${
                          done
                            ? 'bg-amber-400'
                            : isToday
                              ? 'bg-white/40 ring-2 ring-amber-500/40'
                              : 'bg-white/10'
                        }`}
                      />
                    )
                  })}
                  <span className="text-xs text-white/30 ml-1">
                    days {chapter.days[0]}–{chapter.days[1]}
                  </span>
                </div>

                {book && (
                  <Link
                    href={`/library/${book.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors"
                  >
                    Source book: {book.title} <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Go deeper */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-bold text-white mb-8">Go deeper</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { href: '/learn', icon: Brain, title: 'Learn', description: 'Curated AI learning paths' },
            { href: '/watch', icon: Play, title: 'Watch', description: 'The full video vault' },
            { href: '/library', icon: BookOpen, title: 'Library', description: 'The source books, reviewed' },
            { href: '/prompt-library', icon: Layers, title: 'Prompts', description: '200+ curated prompts' },
          ].map((hub) => (
            <Link
              key={hub.href}
              href={hub.href}
              className="group relative block rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:bg-white/[0.04] hover:border-white/20 transition-all"
            >
              <div className="inline-flex p-2.5 rounded-xl bg-white/5 text-amber-400 mb-4">
                <hub.icon className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white mb-1">{hub.title}</h3>
              <p className="text-sm text-white/50">{hub.description}</p>
              <ArrowRight className="absolute bottom-6 right-6 w-4 h-4 text-white/20 group-hover:text-white/60 group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 pb-24">
        <h2 className="text-2xl font-bold text-white mb-8">Questions</h2>
        <div className="space-y-4">
          {questFaqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6"
            >
              <summary className="cursor-pointer font-semibold text-white list-none flex items-center justify-between gap-4">
                {faq.question}
                <ArrowRight className="w-4 h-4 text-white/30 group-open:rotate-90 transition-transform shrink-0" />
              </summary>
              <p className="text-white/60 mt-3">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  )
}
