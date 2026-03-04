'use client'

import { motion, useScroll, useTransform, useReducedMotion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useRef, useState, useCallback, useEffect } from 'react'
import { ArrowRight, Play, Pause, BookOpen, Music, Code2, Globe, Volume2 } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'
import { EmailSignup } from '@/components/email-signup'
import type { HomepageData } from '@/lib/homepage-data'

// ── Reading progress bar ───────────────────────────────────────────────────────

function ReadingProgress() {
  const [progress, setProgress] = useState(0)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return
    const update = () => {
      const scrolled = window.scrollY
      const total = document.documentElement.scrollHeight - window.innerHeight
      setProgress(total > 0 ? (scrolled / total) * 100 : 0)
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [reduce])

  if (reduce) return null
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-transparent">
      <div
        className="h-full bg-emerald-400 transition-none"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}

// ── Chapter number backdrop ───────────────────────────────────────────────────

function ChapterNumber({ n }: { n: string }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="select-none pointer-events-none font-bold text-[100px] sm:text-[140px] md:text-[180px] leading-none text-white/[0.04] absolute -left-4 sm:-left-8 -top-8"
      aria-hidden
    >
      {n}
    </motion.div>
  )
}

// ── Pull quote ─────────────────────────────────────────────────────────────────

function PullQuote({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion()
  return (
    <motion.blockquote
      initial={reduce ? false : { opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7 }}
      className="border-l-4 border-emerald-500/40 pl-6 my-10 italic text-xl md:text-2xl text-emerald-400 leading-snug"
    >
      {children}
    </motion.blockquote>
  )
}

// ── Prose reveal ──────────────────────────────────────────────────────────────

function Prose({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ── Image breakout ────────────────────────────────────────────────────────────

function ImageBreakout({
  src,
  alt,
  caption,
  aspect = 'aspect-[16/7]',
}: {
  src: string
  alt: string
  caption?: string
  aspect?: string
}) {
  return (
    <Prose className="-mx-4 sm:-mx-10 md:-mx-20 lg:-mx-32 my-12">
      <div className={`relative ${aspect} rounded-2xl overflow-hidden`}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 90vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b]/40 to-transparent" />
      </div>
      {caption && (
        <p className="text-xs text-white/25 mt-3 text-center italic font-mono">{caption}</p>
      )}
    </Prose>
  )
}

// ── Music player ──────────────────────────────────────────────────────────────

function NarrativePlayer({ track }: { track: HomepageData['featuredTrack'] }) {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  const toggle = useCallback(() => {
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
      trackEvent('homepage_track_play', { variation: 'v6-narrative', title: track.title })
    }
    setPlaying((p) => !p)
  }, [playing, track.title])

  useEffect(() => {
    const a = audioRef.current
    if (!a) return
    const onEnd = () => setPlaying(false)
    const onTime = () => {
      if (a.duration) setProgress((a.currentTime / a.duration) * 100)
    }
    a.addEventListener('ended', onEnd)
    a.addEventListener('timeupdate', onTime)
    return () => {
      a.removeEventListener('ended', onEnd)
      a.removeEventListener('timeupdate', onTime)
    }
  }, [])

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
      <audio ref={audioRef} src={track.audioUrl} preload="none" />
      <div className="p-6">
        <div className="flex items-center gap-5 mb-5">
          <button
            onClick={toggle}
            className="relative w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center hover:bg-emerald-500/25 transition-all group"
            aria-label={playing ? 'Pause track' : 'Play track'}
          >
            <AnimatePresence mode="wait">
              {playing ? (
                <motion.span key="p" initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.7, opacity: 0 }}>
                  <Pause className="w-5 h-5 text-emerald-400" />
                </motion.span>
              ) : (
                <motion.span key="pl" initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.7, opacity: 0 }}>
                  <Play className="w-5 h-5 text-emerald-400 ml-0.5" />
                </motion.span>
              )}
            </AnimatePresence>
            {playing && (
              <span className="absolute inset-0 rounded-full border border-emerald-500/20 animate-ping" style={{ animationDuration: '2.5s' }} />
            )}
          </button>
          <div className="flex-1">
            <p className="text-base font-semibold text-white mb-1">{track.title}</p>
            <div className="flex items-center gap-2">
              <Volume2 className="w-3 h-3 text-white/25" />
              <p className="text-xs text-white/35">{track.genre.join(' · ')}</p>
            </div>
          </div>
          <p className="text-xs font-mono text-white/25">{track.duration}</p>
        </div>
        <div className="h-0.5 bg-white/[0.06] rounded-full">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}

// ── FAQ accordion ──────────────────────────────────────────────────────────────

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-white/[0.06]">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full py-5 text-left flex items-start justify-between gap-4 text-sm font-medium text-white/80 hover:text-white transition-colors"
        aria-expanded={open}
      >
        <span>{question}</span>
        <span
          className="text-emerald-400/40 flex-shrink-0 mt-0.5 transition-transform duration-200"
          style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}
          aria-hidden
        >
          +
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-white/40 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Stat display ──────────────────────────────────────────────────────────────

function BigStat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-5xl md:text-6xl font-bold text-white tracking-tight leading-none mb-2">
        {value}
      </p>
      <p className="text-sm text-white/35 font-mono tracking-wide uppercase">{label}</p>
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function HomeV6({
  latestPosts,
  faqs,
  featuredTrack,
  books,
  products,
  learningCards,
  credentials,
}: HomepageData) {
  const containerRef = useRef<HTMLElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroImageY = useTransform(heroProgress, [0, 1], ['0%', '30%'])
  const reduce = useReducedMotion()

  useEffect(() => {
    trackEvent('homepage_view', { variation: 'v6-narrative' })
  }, [])

  return (
    <main ref={containerRef} className="relative min-h-screen bg-[#0a0a0b] text-white overflow-x-hidden">
      <ReadingProgress />

      {/* ── CHAPTER I — ORIGIN ──────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        <motion.div
          style={reduce ? undefined : { y: heroImageY }}
          className="absolute inset-0"
        >
          <Image
            src="/images/blog/suno-prompt-engineering-complete-guide-hero.png"
            alt="AI music production — the origin story"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0b]/20 via-[#0a0a0b]/60 to-[#0a0a0b]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0b]/80 to-transparent" />
        </motion.div>

        <div className="relative z-10 max-w-3xl mx-auto px-6 py-32">
          <Prose>
            <p className="text-xs tracking-[0.4em] uppercase text-emerald-400/50 mb-4 font-mono">
              Chapter I — Origin
            </p>
          </Prose>
          <Prose delay={0.1}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[0.95] mb-8">
              I didn&apos;t plan to become<br />
              an AI Architect.<br />
              <span className="text-white/40">I planned to make music.</span>
            </h1>
          </Prose>
          <Prose delay={0.2}>
            <p className="text-lg text-white/50 leading-[1.8] max-w-prose">
              In the summer of 2023, Suno changed everything. What started as a curiosity — could a machine
              learn to feel rhythm? — became an obsession. I started prompting tracks, then prompting them
              better, then building frameworks for prompting them at scale. One track became ten. Ten became
              a thousand. I was learning something more important than music: I was learning how to think
              with machines.
            </p>
          </Prose>
        </div>
      </section>

      {/* Credentials bar */}
      <div className="border-y border-white/[0.05] py-5">
        <div className="max-w-3xl mx-auto px-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
          {credentials.map((c, i) => (
            <motion.span
              key={c}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-xs text-white/25 font-mono tracking-wide"
            >
              {c}
            </motion.span>
          ))}
        </div>
      </div>

      {/* ── Content column ────────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-6">

        {/* Pull quote I */}
        <PullQuote>
          &ldquo;Every track I make teaches me something about what machines can and cannot feel.&rdquo;
        </PullQuote>

        <Prose>
          <p className="text-base text-white/50 leading-[1.9]">
            What I discovered wasn&apos;t just that AI could generate music. It was that AI revealed the
            structure underneath music — the frequencies, the emotional mathematics, the patterns that
            make something feel like a specific time of day or emotional state. I was reverse-engineering
            human sensation through prompt engineering. That&apos;s when I realized this wasn&apos;t a hobby.
            This was a new discipline.
          </p>
        </Prose>

        {/* ── CHAPTER II — THE WORK ────────────────────────────── */}
        <div className="relative mt-24 mb-16 pt-12">
          <ChapterNumber n="II" />
          <Prose>
            <p className="text-xs tracking-[0.4em] uppercase text-emerald-400/50 mb-3 font-mono">
              Chapter II — The Work
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight relative z-10">
              Then I started building the tools I couldn&apos;t find.
            </h2>
          </Prose>
        </div>

        <Prose delay={0.1}>
          <p className="text-base text-white/50 leading-[1.9] mb-8">
            At Oracle, I work on production AI systems — multi-agent orchestration, agentic workflows,
            enterprise-scale deployments. The technical depth required is significant: you&apos;re not just
            calling an API, you&apos;re designing systems that make thousands of decisions autonomously.
            I brought that engineering mindset into my creative work.
          </p>
          <p className="text-base text-white/50 leading-[1.9]">
            The Agentic Creator OS (ACOS) started as a personal tool — a way to configure Claude Code with
            the skills and agents I needed. It grew into something much larger: 75+ skills, 38 specialized
            agents, 35+ slash commands. An operating system for creative AI work. I released it open-source
            because the field moves faster when everyone can build on each other&apos;s work.
          </p>
        </Prose>

        <PullQuote>
          &ldquo;The best tools aren&apos;t impressive. They&apos;re invisible. They let you work.&rdquo;
        </PullQuote>

        {/* Products grid */}
        <Prose className="mb-16">
          <div className="grid sm:grid-cols-2 gap-3">
            {products.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <Link
                  href={p.href}
                  onClick={() => trackEvent('product_click', { product: p.title, variation: 'v6' })}
                  className="group block rounded-xl border border-white/[0.07] bg-white/[0.02] p-5 hover:border-white/[0.16] hover:bg-white/[0.05] transition-all duration-200"
                >
                  <h3 className="text-sm font-bold text-white/80 group-hover:text-emerald-400 transition-colors mb-1.5">
                    {p.title}
                  </h3>
                  <p className="text-xs text-white/35 leading-relaxed">{p.description}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs text-emerald-400/30 group-hover:text-emerald-400/70 transition-colors">
                    Explore <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </Prose>

        {/* ── CHAPTER III — THE ARCHIVE ────────────────────────── */}
        <div className="relative mt-24 mb-16 pt-12 border-t border-white/[0.04]">
          <ChapterNumber n="III" />
          <Prose>
            <p className="text-xs tracking-[0.4em] uppercase text-emerald-400/50 mb-3 font-mono">
              Chapter III — The Archive
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight relative z-10">
              Twelve thousand songs. Six books. Hundreds of tutorials.
            </h2>
          </Prose>
        </div>

        <Prose delay={0.1} className="mb-12">
          <p className="text-base text-white/50 leading-[1.9]">
            The volume is a feature, not a side effect. Every AI session is a data point. Every track
            is a hypothesis about what works and why. Every article is a proof-of-work — a demonstration
            that the idea survived contact with reality. The archive isn&apos;t impressive because it&apos;s
            large. It&apos;s useful because it&apos;s documented.
          </p>
        </Prose>

        {/* Stats breakout */}
        <Prose className="-mx-4 sm:-mx-10 md:-mx-20 lg:-mx-32 my-12">
          <div className="bg-white/[0.02] border-y border-white/[0.06] py-12 px-8 sm:px-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <BigStat value="12,000+" label="AI Songs" />
              <BigStat value="75+" label="Open Source Skills" />
              <BigStat value="6" label="Published Books" />
              <BigStat value="100+" label="Tutorials Written" />
            </div>
          </div>
        </Prose>

        {/* Latest posts */}
        <Prose className="mb-16">
          <h3 className="text-xs tracking-[0.35em] uppercase text-white/20 font-mono mb-6">Recent writing</h3>
          <div className="space-y-2">
            {latestPosts.slice(0, 4).map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  onClick={() => trackEvent('narrative_post_click', { slug: post.slug, variation: 'v6' })}
                  className="group flex items-start gap-4 py-4 border-b border-white/[0.05] hover:border-white/[0.12] transition-all"
                >
                  {post.image && (
                    <div className="relative w-20 h-14 rounded-lg overflow-hidden flex-shrink-0">
                      <Image src={post.image} alt={post.title} fill className="object-cover" sizes="80px" />
                    </div>
                  )}
                  <div className="min-w-0 flex-1 pt-0.5">
                    <p className="text-sm font-semibold text-white/70 group-hover:text-emerald-400 transition-colors line-clamp-2 mb-1 leading-snug">
                      {post.title}
                    </p>
                    <p className="text-xs text-white/25 font-mono">{post.category} · {post.readingTime}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="mt-4">
            <Link href="/blog" className="inline-flex items-center gap-1.5 text-xs text-emerald-400/50 hover:text-emerald-400 transition-colors font-mono">
              Read all articles <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </Prose>

        {/* ── CHAPTER IV — THE WORLD ───────────────────────────── */}
        <div className="relative mt-24 mb-16 pt-12 border-t border-white/[0.04]">
          <ChapterNumber n="IV" />
          <Prose>
            <p className="text-xs tracking-[0.4em] uppercase text-emerald-400/50 mb-3 font-mono">
              Chapter IV — The World
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight relative z-10">
              I built Arcanea because the world needed mythology.
            </h2>
          </Prose>
        </div>

        <Prose delay={0.1} className="mb-10">
          <p className="text-base text-white/50 leading-[1.9]">
            Not every system needs a lore. But some systems — the ones that are really about helping
            people unlock creative potential — need more than documentation. They need story. Arcanea
            is a creative mythology built on top of real technical infrastructure: five Eldrian guardians,
            ten gates of mastery, a living world-state that grows with each session. It&apos;s also a
            framework for thinking about AI creativity at civilizational scale.
          </p>
        </Prose>

        <ImageBreakout
          src="/images/arcanea/eldrian-conclave-20260301.png"
          alt="The Eldrian Conclave — five guardians assembled at the gates"
          caption="The Eldrian Conclave, March 2026. Five guardians. Five domains. One archive."
        />

        <Prose className="mb-16">
          <div className="flex gap-4">
            <Link
              href="/arcanea"
              onClick={() => trackEvent('arcanea_cta_click', { variation: 'v6' })}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm text-white/70 hover:text-emerald-400 hover:border-emerald-500/30 transition-all"
            >
              Enter Arcanea <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Prose>

        {/* ── CHAPTER V — THE MUSIC ────────────────────────────── */}
        <div className="relative mt-24 mb-16 pt-12 border-t border-white/[0.04]">
          <ChapterNumber n="V" />
          <Prose>
            <p className="text-xs tracking-[0.4em] uppercase text-emerald-400/50 mb-3 font-mono">
              Chapter V — The Music
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight relative z-10">
              Music is where I test my limits.
            </h2>
          </Prose>
        </div>

        <Prose delay={0.1} className="mb-8">
          <p className="text-base text-white/50 leading-[1.9]">
            Twelve thousand songs sounds like a number. It&apos;s actually a practice. Each session in
            the Sonic Forge is an experiment: what happens when you push the model into an unfamiliar genre?
            What frequency combinations evoke specific emotional states? How do you make AI-generated
            music that doesn&apos;t sound like AI? The answers aren&apos;t in the songs themselves.
            They&apos;re in the methodology.
          </p>
        </Prose>

        <Prose delay={0.15} className="mb-6">
          <NarrativePlayer track={featuredTrack} />
        </Prose>

        <Prose className="mb-8">
          <div className="grid grid-cols-3 gap-3">
            {['Pop & Vocal', 'Neoclassical', 'Electronic', 'Dance', 'Orchestral', 'Hip Hop'].map((genre) => (
              <div key={genre} className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-center">
                <p className="text-xs text-white/35 font-mono">{genre}</p>
              </div>
            ))}
          </div>
        </Prose>

        <Prose className="mb-16">
          <Link
            href="/music-lab"
            className="inline-flex items-center gap-2 text-sm text-emerald-400/50 hover:text-emerald-400 transition-colors font-mono"
          >
            <Music className="w-4 h-4" /> Enter Music Lab <ArrowRight className="w-4 h-4" />
          </Link>
        </Prose>

        {/* ── CHAPTER VI — THE LIBRARY ──────────────────────────── */}
        {books.length > 0 && (
          <>
            <div className="relative mt-24 mb-16 pt-12 border-t border-white/[0.04]">
              <ChapterNumber n="VI" />
              <Prose>
                <p className="text-xs tracking-[0.4em] uppercase text-emerald-400/50 mb-3 font-mono">
                  Chapter VI — The Library
                </p>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight relative z-10">
                  Everything worth knowing, I wrote down.
                </h2>
              </Prose>
            </div>

            <Prose delay={0.1} className="mb-10">
              <p className="text-base text-white/50 leading-[1.9]">
                Six books. Field guides, operating manuals, technical deep-dives. Written for creators
                who want to go beyond surface-level AI tools and understand the systems underneath.
                Free chapters available. Full texts for those who are serious.
              </p>
            </Prose>

            {/* Books horizontal scroll */}
            <Prose className="-mx-4 sm:-mx-10 mb-10 overflow-x-auto">
              <div className="flex gap-5 px-4 sm:px-10 pb-3">
                {books.map((book, i) => (
                  <motion.div
                    key={book.slug}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07, duration: 0.5 }}
                    className="flex-shrink-0 w-[120px]"
                  >
                    <Link
                      href={`/books/${book.slug}`}
                      onClick={() => trackEvent('narrative_book_click', { slug: book.slug, variation: 'v6' })}
                      className="group block"
                    >
                      <div className="relative aspect-[2/3] rounded-xl overflow-hidden mb-2 shadow-lg shadow-black/40">
                        <Image
                          src={book.coverImage}
                          alt={book.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-400"
                          sizes="120px"
                        />
                      </div>
                      <p className="text-xs font-semibold text-white/60 group-hover:text-emerald-400 transition-colors line-clamp-1">
                        {book.title}
                      </p>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </Prose>

            {/* Learning path cards */}
            <Prose className="mb-16">
              <h3 className="text-xs tracking-[0.35em] uppercase text-white/20 font-mono mb-5">Learning paths</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {learningCards.map((card, i) => (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.5 }}
                  >
                    <Link
                      href={card.href}
                      onClick={() => trackEvent('learning_card_click', { path: card.title, variation: 'v6' })}
                      className="group block rounded-xl overflow-hidden border border-white/[0.06] hover:border-white/[0.15] transition-all"
                    >
                      <div className="relative aspect-square">
                        <Image
                          src={card.image}
                          alt={card.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-400"
                          sizes="180px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        <p className="absolute bottom-2 left-2 right-2 text-xs font-semibold text-white/80 group-hover:text-emerald-300 transition-colors line-clamp-2">
                          {card.title}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </Prose>
          </>
        )}

        {/* ── CHAPTER VII — THE SIGNAL ──────────────────────────── */}
        <div className="relative mt-24 mb-16 pt-12 border-t border-white/[0.04]">
          <ChapterNumber n="VII" />
          <Prose>
            <p className="text-xs tracking-[0.4em] uppercase text-emerald-400/50 mb-3 font-mono">
              Chapter VII — The Signal
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight relative z-10">
              If you&apos;re still reading, you&apos;re the right kind of person.
            </h2>
          </Prose>
        </div>

        <Prose delay={0.1} className="mb-10">
          <p className="text-base text-white/50 leading-[1.9]">
            Most people skim. You&apos;re here for the depth. The weekly dispatch is where I share what
            I&apos;m actually working on — not curated highlights, but the real process. Architecture
            decisions. Prompt experiments. Music production notes. What worked, what failed, what surprised me.
          </p>
        </Prose>

        <PullQuote>
          &ldquo;The best knowledge transfer happens between practitioners — not from expert to beginner, but from someone actively working to someone paying close attention.&rdquo;
        </PullQuote>

        <Prose delay={0.1} className="mb-16">
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
                <Globe className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white/80 mb-1">The Creation Chronicles</p>
                <p className="text-xs text-white/30">Weekly · AI architecture · Music production · Creator workflows</p>
              </div>
            </div>
            <EmailSignup
              listType="creation-chronicles"
              placeholder="your@email.com"
              buttonText="Join the dispatch"
              compact
            />
            <p className="text-xs text-white/20 mt-4 font-mono">No spam. Unsubscribe any time. Read by builders.</p>
          </div>
        </Prose>

      </div>

      {/* ── FAQ ───────────────────────────────────────────────────── */}
      {faqs.length > 0 && (
        <div className="border-t border-white/[0.05] py-16">
          <div className="max-w-3xl mx-auto px-6">
            <Prose>
              <h2 className="text-xs tracking-[0.4em] uppercase text-white/20 font-mono mb-8 text-center">
                Frequently asked
              </h2>
            </Prose>
            {faqs.map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      )}

      {/* ── FOOTER ────────────────────────────────────────────────── */}
      <footer className="border-t border-white/[0.05] px-6 py-10">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-xs font-mono text-white/15">frankx.ai // v6.narrative</p>
            <p className="text-[10px] font-mono text-white/8 mt-1 tracking-wide">
              ai architect · music creator · builder
            </p>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/blog" className="text-xs text-white/15 hover:text-white/40 transition-colors font-mono">Writing</Link>
            <Link href="/music-lab" className="text-xs text-white/15 hover:text-white/40 transition-colors font-mono">Music</Link>
            <Link href="/acos" className="text-xs text-white/15 hover:text-white/40 transition-colors font-mono">Tools</Link>
            <Link href="/home" className="text-xs text-white/20 hover:text-emerald-400/60 transition-colors font-mono border border-white/[0.08] px-3 py-1 rounded">
              all variations
            </Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
