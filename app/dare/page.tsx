'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  ArrowRight,
  BookOpen,
  Brain,
  Check,
  Copy,
  Flame,
  Heart,
  Map,
  Play,
  Terminal,
} from 'lucide-react'
import { getTodaysDare, resolvePrompt, QUEST_LENGTH } from '@/lib/daily-dare'
import { bookReviews } from '@/data/book-reviews'
import { useDareStreak } from '@/lib/hooks/use-dare-streak'
import ShareChallenge from '@/components/dare/ShareChallenge'
import JsonLd from '@/components/seo/JsonLd'

const EFFORT_LABELS: Record<string, string> = {
  'two-minutes': '2 minutes',
  'ten-minutes': '10 minutes',
  'an-hour': 'about an hour',
}

function PartCheck({
  done,
  onToggle,
  label,
}: {
  done: boolean
  onToggle: () => void
  label: string
}) {
  return (
    <button
      onClick={onToggle}
      aria-pressed={done}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
        done
          ? 'border-amber-500/40 bg-amber-500/10 text-amber-300'
          : 'border-white/15 text-white/60 hover:border-white/30 hover:text-white/80'
      }`}
    >
      <span
        className={`flex items-center justify-center w-4 h-4 rounded-full border ${
          done ? 'border-amber-400 bg-amber-400' : 'border-white/30'
        }`}
      >
        {done && <Check className="w-3 h-3 text-black" />}
      </span>
      {done ? 'Done' : label}
    </button>
  )
}

export default function DarePage() {
  // Computed on mount so the statically prerendered HTML never bakes in the
  // build date — content enters under the same motion as everything else.
  const [today, setToday] = useState<ReturnType<typeof getTodaysDare> | null>(null)
  const streakState = useDareStreak()
  const [promptCopied, setPromptCopied] = useState(false)

  useEffect(() => {
    setToday(getTodaysDare())
  }, [])

  const prompt = today ? resolvePrompt(today.dare) : undefined
  const book = today?.dare.mindConcept.bookSlug
    ? bookReviews.find((b) => b.slug === today.dare.mindConcept.bookSlug)
    : undefined
  const quote =
    book && today?.dare.mindConcept.quoteIndex !== undefined
      ? book.quotes?.[today.dare.mindConcept.quoteIndex]
      : undefined

  const copyPrompt = async () => {
    if (!prompt || typeof navigator === 'undefined' || !navigator.clipboard) return
    try {
      await navigator.clipboard.writeText(prompt.content)
      setPromptCopied(true)
      setTimeout(() => setPromptCopied(false), 2000)
    } catch {
      // clipboard unavailable
    }
  }

  const daysInChapterDone = today
    ? Array.from(
        { length: today.chapter.days[1] - today.chapter.days[0] + 1 },
        (_, i) => today.chapter.days[0] + i
      ).filter((d) => streakState.isDayCompleted(d)).length
    : 0

  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      <JsonLd
        data={{
          '@type': 'WebPage',
          name: 'Daily Dare — The Beautiful Mind Quest',
          description:
            'A 4-part daily challenge: stretch your mind with AI, run a prompt, train one principle of how the mind works, and do one good thing for the world.',
          url: 'https://frankx.ai/dare',
          isPartOf: { '@type': 'WebSite', name: 'FrankX.AI', url: 'https://frankx.ai' },
        }}
      />

      {/* Hero */}
      <section className="relative pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-transparent" />
        <div className="relative max-w-3xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-between gap-4 mb-6">
              <p className="text-[11px] tracking-[0.25em] uppercase text-white/60">
                {today
                  ? `Day ${today.day} of ${QUEST_LENGTH} · ${today.chapter.title}`
                  : 'The Daily Dare'}
              </p>
              {streakState.mounted && streakState.streak > 0 && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
                  <Flame className="w-3.5 h-3.5" />
                  {streakState.streak} day streak
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {today ? today.dare.title : 'One dare a day.'}
            </h1>
            <p className="text-white/50">
              {today
                ? `${today.date} · ${today.chapter.principle}`
                : 'Four parts: stretch, prompt, mind, world.'}
            </p>
          </motion.div>
        </div>
      </section>

      {today && (
        <section className="max-w-3xl mx-auto px-6 pb-16 space-y-6">
          {/* I. Stretch */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8"
          >
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
                  <Brain className="w-5 h-5" />
                </div>
                <p className="text-[11px] tracking-[0.25em] uppercase text-white/60">
                  I · Stretch your mind
                </p>
              </div>
              <PartCheck
                done={streakState.partsDone[0]}
                onToggle={() => streakState.togglePart(0)}
                label="Mark done"
              />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">{today.dare.mindStretch.title}</h2>
            <p className="text-white/60 mb-5">{today.dare.mindStretch.body}</p>

            {today.dare.mindStretch.videoId && (
              <DareVideo
                videoId={today.dare.mindStretch.videoId}
                title={today.dare.mindStretch.videoTitle ?? today.dare.mindStretch.title}
                channel={today.dare.mindStretch.videoChannel}
              />
            )}

            <div className="flex flex-wrap items-center gap-4 mt-5 text-sm">
              {today.dare.mindStretch.learningPathSlug && (
                <Link
                  href={`/learn/${today.dare.mindStretch.learningPathSlug}`}
                  className="inline-flex items-center gap-1.5 text-white/50 hover:text-white transition-colors"
                >
                  Go deeper on this path <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
              <Link
                href="/watch"
                className="inline-flex items-center gap-1.5 text-white/50 hover:text-white transition-colors"
              >
                More in the watch vault <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>

          {/* II. Run the prompt */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8"
          >
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
                  <Terminal className="w-5 h-5" />
                </div>
                <p className="text-[11px] tracking-[0.25em] uppercase text-white/60">
                  II · Run the prompt
                </p>
              </div>
              <PartCheck
                done={streakState.partsDone[1]}
                onToggle={() => streakState.togglePart(1)}
                label="Mark done"
              />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">
              {prompt ? prompt.title : 'Prompt of the day'}
            </h2>
            <p className="text-white/60 mb-5">{today.dare.prompt.framing}</p>

            {prompt && (
              <div className="relative rounded-xl border border-white/10 bg-black/40 p-5">
                <button
                  onClick={copyPrompt}
                  className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/15 text-xs text-white/60 hover:text-white hover:border-white/30 transition-colors"
                >
                  {promptCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {promptCopied ? 'Copied' : 'Copy'}
                </button>
                <pre className="whitespace-pre-wrap font-mono text-sm text-white/70 max-h-72 overflow-y-auto pr-20">
                  {prompt.content}
                </pre>
              </div>
            )}

            <Link
              href="/prompt-library"
              className="inline-flex items-center gap-1.5 mt-5 text-sm text-white/50 hover:text-white transition-colors"
            >
              200+ more in the prompt library <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>

          {/* III. The mind */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8"
          >
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
                  <BookOpen className="w-5 h-5" />
                </div>
                <p className="text-[11px] tracking-[0.25em] uppercase text-white/60">
                  III · Train the mind
                </p>
              </div>
              <PartCheck
                done={streakState.partsDone[2]}
                onToggle={() => streakState.togglePart(2)}
                label="Mark done"
              />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">{today.dare.mindConcept.title}</h2>
            <p className="text-white/60">{today.dare.mindConcept.body}</p>

            {quote && (
              <blockquote className="mt-5 border-l-2 border-amber-500/40 pl-4">
                <p className="text-white/80 italic">&ldquo;{quote.text}&rdquo;</p>
                <footer className="mt-2 text-xs text-white/40">
                  {book?.author}
                  {quote.chapter ? ` · ${quote.chapter}` : ''}
                </footer>
              </blockquote>
            )}

            {book && (
              <Link
                href={`/library/${book.slug}`}
                className="inline-flex items-center gap-1.5 mt-5 text-sm text-white/50 hover:text-white transition-colors"
              >
                Full review: {book.title} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </motion.div>

          {/* IV. For the world */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl border border-amber-500/[0.16] bg-amber-500/[0.03] p-6 md:p-8"
          >
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
                  <Heart className="w-5 h-5" />
                </div>
                <p className="text-[11px] tracking-[0.25em] uppercase text-white/60">
                  IV · For the world
                </p>
              </div>
              <PartCheck
                done={streakState.partsDone[3]}
                onToggle={() => streakState.togglePart(3)}
                label="Mark done"
              />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">{today.dare.goodDeed.title}</h2>
            <p className="text-white/60 mb-4">{today.dare.goodDeed.body}</p>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/50">
              {EFFORT_LABELS[today.dare.goodDeed.effort]}
            </span>
          </motion.div>

          {/* Completion */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="text-center pt-4"
          >
            {streakState.dayComplete ? (
              <p className="text-white/70">
                Day {today.day} complete.
                {streakState.streak > 1 ? ` ${streakState.streak} days and counting.` : ''} See you
                tomorrow.
              </p>
            ) : (
              <p className="text-white/40 text-sm">
                Mark all four parts done to bank today and keep the streak.
              </p>
            )}

            <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
              <ShareChallenge
                day={today.day}
                dareTitle={today.dare.title}
                streak={streakState.streak}
              />
            </div>
            <p className="text-white/40 text-sm mt-4 max-w-md mx-auto">
              This works better with two minds. Send today&rsquo;s dare to the friend who&rsquo;ll
              actually do it.
            </p>
          </motion.div>

          {/* The quest */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Link
              href="/quest"
              className="group relative block rounded-2xl border border-white/10 bg-gradient-to-br from-amber-500/10 to-amber-500/[0.02] p-6 md:p-8 hover:border-white/20 transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 rounded-xl bg-white/5 text-amber-400">
                  <Map className="w-5 h-5" />
                </div>
                <p className="text-[11px] tracking-[0.25em] uppercase text-white/60">
                  The Beautiful Mind Quest
                </p>
              </div>
              <h2 className="text-xl font-bold text-white mb-2">
                {today.chapter.title} — {streakState.mounted ? daysInChapterDone : 0}/5 days done
              </h2>
              <p className="text-white/50 text-sm">
                {QUEST_LENGTH} days, 6 principles of the mind. See the whole map, your progress, and
                where this is going.
              </p>
              <ArrowRight className="absolute bottom-6 right-6 w-5 h-5 text-white/20 group-hover:text-white/60 group-hover:translate-x-1 transition-all" />
            </Link>
          </motion.div>
        </section>
      )}
    </div>
  )
}

function DareVideo({
  videoId,
  title,
  channel,
}: {
  videoId: string
  title: string
  channel?: string
}) {
  const [isPlaying, setIsPlaying] = useState(false)
  // maxres doesn't exist for every video; fall back to hqdefault (always present)
  // on error so the thumbnail never renders broken.
  const [thumb, setThumb] = useState(
    `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
  )
  const watchUrl = `https://www.youtube.com/watch?v=${videoId}`

  return (
    <div className="rounded-xl overflow-hidden border border-white/10">
      <div className="relative aspect-video bg-black/50">
        {isPlaying ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={title}
          />
        ) : (
          <>
            <Image
              src={thumb}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 672px"
              className="object-cover"
              unoptimized
              onError={() =>
                setThumb(`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`)
              }
            />
            <button
              onClick={() => setIsPlaying(true)}
              className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/30 transition-colors"
              aria-label={`Play ${title}`}
            >
              <div className="p-4 rounded-full bg-amber-500/80 hover:bg-amber-500 transition-colors">
                <Play className="w-7 h-7 text-white fill-white" />
              </div>
            </button>
            {channel && (
              <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-black/70 text-white text-xs">
                {channel}
              </div>
            )}
          </>
        )}
      </div>
      {/* Always-present escape hatch: some videos disable embedding, and this
          guarantees the dare's video is reachable even when the iframe can't load. */}
      <a
        href={watchUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between gap-2 px-3 py-2 bg-black/40 text-xs text-white/40 hover:text-white/70 transition-colors"
      >
        <span className="truncate">{title}</span>
        <span className="inline-flex items-center gap-1 shrink-0">
          Watch on YouTube <ArrowRight className="w-3 h-3" />
        </span>
      </a>
    </div>
  )
}
