'use client'

import { motion, useScroll, useTransform, useReducedMotion, useInView } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useRef, useState, useCallback, useEffect, useId } from 'react'
import { ArrowRight, Play, Pause, ChevronDown } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'
import { EmailSignup } from '@/components/email-signup'
import type { HomepageData } from '@/lib/homepage-data'

// ─────────────────────────────────────────────────────────────
// Full-viewport scene with parallax background
// ─────────────────────────────────────────────────────────────

function Scene({
  children,
  imageSrc,
  imageAlt,
  overlay = 'from-black/80 via-black/40 to-black/80',
  minHeight = 'min-h-screen',
}: {
  children: React.ReactNode
  imageSrc?: string
  imageAlt?: string
  overlay?: string
  minHeight?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section ref={ref} className={`relative ${minHeight} flex items-center overflow-hidden`}>
      {imageSrc && (
        <motion.div className="absolute inset-0" style={reduce ? undefined : { y }}>
          <Image
            src={imageSrc}
            alt={imageAlt || ''}
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className={`absolute inset-0 bg-gradient-to-b ${overlay}`} />
        </motion.div>
      )}
      {!imageSrc && <div className="absolute inset-0 bg-black" />}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-20">{children}</div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// Reveal on scroll
// ─────────────────────────────────────────────────────────────

function Reveal({
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
      className={className}
      initial={reduce ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────
// Word-by-word hero title animation
// ─────────────────────────────────────────────────────────────

function WordReveal({
  text,
  className = '',
  delay = 0,
  highlight,
}: {
  text: string
  className?: string
  delay?: number
  highlight?: string
}) {
  const reduce = useReducedMotion()
  const words = text.split(' ')

  if (reduce) {
    return (
      <span className={className}>
        {words.map((word, i) => (
          <span key={i} className={word === highlight ? 'text-emerald-400' : ''}>
            {word}{i < words.length - 1 ? ' ' : ''}
          </span>
        ))}
      </span>
    )
  }

  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className={`inline-block ${word === highlight ? 'text-emerald-400' : ''}`}
          initial={{ opacity: 0, y: 30, rotateX: -15 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.65,
            delay: delay + i * 0.12,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ perspective: 400 }}
        >
          {word}{i < words.length - 1 ? '\u00a0' : ''}
        </motion.span>
      ))}
    </span>
  )
}

// ─────────────────────────────────────────────────────────────
// Animated stat counter
// ─────────────────────────────────────────────────────────────

function AnimatedStat({ target, suffix = '', label }: { target: number; suffix?: string; label: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!inView) return
    if (reduce) { setCount(target); return }
    let start: number
    const duration = 1800
    const step = (ts: number) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
      else setCount(target)
    }
    requestAnimationFrame(step)
  }, [inView, target, reduce])

  return (
    <div ref={ref} className="text-center">
      <p className="text-3xl md:text-4xl font-bold text-white tabular-nums">
        {count.toLocaleString()}<span className="text-emerald-400">{suffix}</span>
      </p>
      <p className="text-xs text-white/40 mt-1">{label}</p>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// Full-featured track player
// ─────────────────────────────────────────────────────────────

function TrackPlayer({ track }: { track: HomepageData['featuredTrack'] }) {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)
  const reduce = useReducedMotion()

  const toggle = useCallback(() => {
    const a = audioRef.current
    if (!a) return
    if (playing) {
      a.pause()
    } else {
      a.play()
      trackEvent('homepage_track_play', { variation: 'v1-cinematic', title: track.title })
    }
    setPlaying(!playing)
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
    <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 max-w-md">
      <audio ref={audioRef} src={track.audioUrl} preload="none" />
      <button
        onClick={toggle}
        className="flex-shrink-0 w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/20 flex items-center justify-center hover:bg-emerald-500/30 transition-colors"
        aria-label={playing ? 'Pause' : 'Play'}
      >
        {playing
          ? <Pause className="w-5 h-5 text-emerald-400" />
          : <Play className="w-5 h-5 text-emerald-400 ml-0.5" />
        }
      </button>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-white truncate">{track.title}</p>
        <p className="text-xs text-white/40">{track.genre.join(', ')} · {track.duration}</p>
        <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-emerald-400 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      {playing && !reduce && (
        <div className="flex items-end gap-0.5 h-5 flex-shrink-0">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1 bg-emerald-400/60 rounded-full"
              animate={{ height: ['30%', '100%', '40%'] }}
              transition={{ duration: 0.5 + i * 0.1, repeat: Infinity }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// FAQ accordion
// ─────────────────────────────────────────────────────────────

function FAQItem({ question, answer, defaultOpen = false }: { question: string; answer: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  const id = useId()
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl overflow-hidden">
      <button
        aria-expanded={open}
        aria-controls={`faq-${id}`}
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left group"
      >
        <span className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors pr-4">
          {question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-white/30 flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <motion.div
        id={`faq-${id}`}
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <div className="px-5 pb-5 text-sm text-white/50 leading-relaxed">{answer}</div>
      </motion.div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// Product color left-border accent
// ─────────────────────────────────────────────────────────────

const productBorderColors: Record<string, string> = {
  emerald: 'border-l-emerald-500',
  violet: 'border-l-violet-500',
  cyan: 'border-l-cyan-500',
  blue: 'border-l-blue-500',
  orange: 'border-l-orange-500',
  magenta: 'border-l-pink-500',
}

const productTextColors: Record<string, string> = {
  emerald: 'group-hover:text-emerald-400',
  violet: 'group-hover:text-violet-400',
  cyan: 'group-hover:text-cyan-400',
  blue: 'group-hover:text-blue-400',
  orange: 'group-hover:text-orange-400',
  magenta: 'group-hover:text-pink-400',
}

// ─────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────

export default function HomeV1({
  latestPosts,
  faqs,
  featuredTrack,
  books,
  products,
  designLabImages,
  credentials,
  learningCards,
}: HomepageData) {
  useEffect(() => {
    trackEvent('homepage_view', { variation: 'v1-cinematic' })
  }, [])

  const eldrians = [
    { src: '/images/arcanea/eldrian-aethelin-20260228.png', alt: 'Aethelin' },
    { src: '/images/arcanea/eldrian-korghast-20260228.png', alt: 'Korghast' },
    { src: '/images/arcanea/eldrian-solrex-20260301.png', alt: 'Solrex' },
    { src: '/images/arcanea/eldrian-velmara-20260301.png', alt: 'Velmara' },
    { src: '/images/arcanea/eldrian-zyranthis-20260301.png', alt: 'Zyranthis' },
  ]

  return (
    <main className="relative text-white bg-black overflow-x-hidden">

      {/* ── 1. HERO — Full bleed cinematic ─────────────── */}
      <Scene
        imageSrc="/images/arcanea/eldrian-conclave-20260301.png"
        imageAlt="The Eldrian Conclave"
        overlay="from-black via-black/30 to-black"
      >
        <div className="min-h-[85vh] flex flex-col justify-center">
          <motion.p
            className="text-xs tracking-[0.35em] uppercase text-emerald-400/60 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            AI Architect & Creator
          </motion.p>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-8">
            <WordReveal text="Building" delay={0.4} /><br />
            <WordReveal text="intelligence" delay={0.55} /><br />
            <WordReveal text="that compounds." delay={0.7} highlight="compounds." />
          </h1>

          <Reveal delay={1.0}>
            <p className="text-lg md:text-xl text-white/50 max-w-xl mb-10">
              AI Architect at Oracle. 12,000+ AI songs. 75+ open-source skills. Everything documented — nothing held back.
            </p>
          </Reveal>

          <Reveal delay={1.2}>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/start"
                className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black px-8 h-14 text-base font-semibold transition-all"
                onClick={() => trackEvent('homepage_cta_click', { button: 'start', variation: 'v1' })}
              >
                Explore the Work <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-2xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] text-white px-8 h-14 text-base font-medium transition-all"
              >
                Read the Blog
              </Link>
            </div>
          </Reveal>
        </div>
      </Scene>

      {/* ── 2. AUTHORITY BAR — animated credentials ─────── */}
      <div className="py-14 border-t border-white/[0.05] bg-black">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
            <AnimatedStat target={12000} suffix="+" label="AI Songs" />
            <AnimatedStat target={75} suffix="+" label="Open Source Skills" />
            <AnimatedStat target={38} label="Active Agents" />
            <AnimatedStat target={6} label="Books Published" />
          </div>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            {credentials.map((c) => (
              <span key={c} className="text-sm text-white/25 font-medium">{c}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── 3. AI ARCHITECTURE SCENE ─────────────────────── */}
      <Scene
        imageSrc="/images/golden-age/golden-age-hero-council-v2.png"
        imageAlt="Enterprise AI Architecture"
        overlay="from-black/90 via-black/60 to-black/90"
        minHeight="min-h-[80vh]"
      >
        <Reveal>
          <p className="text-xs tracking-[0.3em] uppercase text-blue-400/60 mb-4">AI Architecture</p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.0] mb-6">
            Enterprise AI.<br />
            Built at <span className="text-blue-400">Oracle.</span>
          </h2>
          <p className="text-white/50 max-w-lg mb-8 text-lg leading-relaxed">
            Multi-agent orchestration. LLM routing. MCP servers. Agentic pipelines. Production-grade systems — not toy demos.
          </p>
        </Reveal>
        <div className="grid sm:grid-cols-2 gap-3 max-w-lg mb-10">
          {[
            'Multi-agent orchestration',
            'LLM routing & evaluation',
            'MCP server deployment',
            'Agentic pipeline design',
          ].map((cap, i) => (
            <Reveal key={cap} delay={0.1 + i * 0.07}>
              <div className="flex items-center gap-3 rounded-xl bg-white/[0.04] border border-white/[0.08] px-4 py-3">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                <span className="text-sm text-white/70">{cap}</span>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.4}>
          <Link
            href="/ai-architecture"
            className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
          >
            Explore AI Architecture <ArrowRight className="w-4 h-4" />
          </Link>
        </Reveal>
      </Scene>

      {/* ── 4. PRODUCTS — cinematic cards with accents ───── */}
      <Scene minHeight="min-h-[80vh]">
        <Reveal>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Built for builders.</h2>
          <p className="text-base text-white/40 mb-12 max-w-lg">Tools, frameworks, and creative systems. Shipped for real use.</p>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((p, i) => {
            const borderColor = productBorderColors[p.color] || 'border-l-emerald-500'
            const textColor = productTextColors[p.color] || 'group-hover:text-emerald-400'
            return (
              <Reveal key={p.title} delay={i * 0.07}>
                <Link
                  href={p.href}
                  className={`group block rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6 h-full hover:border-white/20 hover:bg-white/[0.06] transition-all border-l-2 ${borderColor}`}
                >
                  <h3 className={`text-lg font-semibold text-white mb-2 transition-colors ${textColor}`}>
                    {p.title}
                  </h3>
                  <p className="text-sm text-white/50 mb-4 leading-relaxed">{p.description}</p>
                  <span className="inline-flex items-center gap-1 text-xs text-white/30 group-hover:text-white/50 transition-colors">
                    Explore <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </Scene>

      {/* ── 5. MUSIC — full scene ─────────────────────────── */}
      <Scene
        imageSrc="/images/golden-age/starlight-intelligence-v2.png"
        imageAlt="Music production"
        overlay="from-black/95 via-black/75 to-black/95"
        minHeight="min-h-[80vh]"
      >
        <Reveal>
          <p className="text-xs tracking-[0.3em] uppercase text-orange-400/60 mb-4">Music Lab</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            12,000+ tracks.<br />One studio.
          </h2>
          <p className="text-white/50 max-w-lg mb-8 leading-relaxed">
            Genre mastery from orchestral to hip hop. Prompt engineering that creates radio-ready tracks. The catalog never stops growing.
          </p>
          <TrackPlayer track={featuredTrack} />
          <Link
            href="/music"
            className="inline-flex items-center gap-2 text-sm text-orange-400 hover:text-orange-300 mt-6 transition-colors"
          >
            Enter Music Lab <ArrowRight className="w-4 h-4" />
          </Link>
        </Reveal>
      </Scene>

      {/* ── 6. ARCANEA SHOWCASE ───────────────────────────── */}
      <Scene
        imageSrc="/images/arcanea/eldrian-conclave-20260301.png"
        imageAlt="The Eldrian Conclave"
        overlay="from-black/95 via-black/70 to-black"
        minHeight="min-h-[90vh]"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <p className="text-xs tracking-[0.3em] uppercase text-amber-400/60 mb-4">Arcanea</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-[1.0]">
              A mythological<br />
              world. <span className="text-amber-400">Built with AI.</span>
            </h2>
            <p className="text-white/50 max-w-lg mb-6 leading-relaxed">
              Five Eldrian guardians. Five godbeasts. A full civilization system generated through collaboration between human imagination and generative AI. This is what world-building at scale looks like.
            </p>
            <Link
              href="/arcanea"
              className="inline-flex items-center gap-2 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500/20 px-6 py-3 text-sm font-medium transition-all"
            >
              Enter Arcanea <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
          <Reveal delay={0.2}>
            {/* 5 Eldrian portraits */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {eldrians.map((e, i) => (
                <motion.div
                  key={e.alt}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.08, duration: 0.6 }}
                  className="flex-shrink-0"
                >
                  <div className="relative w-24 h-32 rounded-xl overflow-hidden border border-amber-500/20">
                    <Image
                      src={e.src}
                      alt={e.alt}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <p className="absolute bottom-2 left-0 right-0 text-center text-[10px] text-amber-200/80 font-medium">
                      {e.alt}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
            <p className="text-xs text-white/25 mt-3 italic">The Five Eldrian Guardians</p>
          </Reveal>
        </div>
      </Scene>

      {/* ── 7. DESIGN LAB — horizontal scroll gallery ────── */}
      <section className="py-24 border-t border-white/[0.05] bg-black overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 mb-10">
          <Reveal>
            <h2 className="text-4xl font-bold tracking-tight mb-2">Design Lab</h2>
            <p className="text-white/40">Nature-tech fusion. Digital gardens where code meets organic form.</p>
          </Reveal>
        </div>
        <div className="flex gap-4 overflow-x-auto px-6 pb-4 snap-x snap-mandatory">
          {designLabImages.map((img, i) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="flex-shrink-0 w-[280px] md:w-[380px] aspect-square rounded-2xl overflow-hidden snap-start relative group"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="380px"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
              <p className="absolute bottom-4 left-4 text-sm font-medium text-white/70 group-hover:text-white transition-colors">
                {img.alt}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── 8. BOOKS — horizontal filmstrip ──────────────── */}
      {books.length > 0 && (
        <section className="py-24 border-t border-white/[0.05] bg-black">
          <div className="max-w-6xl mx-auto px-6">
            <Reveal>
              <div className="flex items-end justify-between mb-10">
                <div>
                  <h2 className="text-4xl font-bold tracking-tight mb-2">Books & Writing</h2>
                  <p className="text-white/40">Poetry, discipline, creativity, and hope.</p>
                </div>
                <Link href="/books" className="text-sm text-white/30 hover:text-white flex items-center gap-2 transition-colors">
                  All books <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </Reveal>
            <div className="flex gap-6 overflow-x-auto pb-4 snap-x">
              {books.map((book, i) => (
                <Reveal key={book.slug} delay={i * 0.06}>
                  <Link href={`/books/${book.slug}`} className="group flex-shrink-0 w-[140px] snap-start">
                    <div className="relative aspect-[2/3] rounded-xl overflow-hidden mb-3 shadow-lg hover:shadow-2xl transition-shadow">
                      <Image
                        src={book.coverImage}
                        alt={book.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-400"
                        sizes="140px"
                      />
                    </div>
                    <p className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
                      {book.title}
                    </p>
                    <p className="text-xs text-white/30 mt-0.5 line-clamp-1">{book.subtitle}</p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 9. LEARNING HUB ──────────────────────────────── */}
      {learningCards && learningCards.length > 0 && (
        <section className="py-24 border-t border-white/[0.05] bg-black">
          <div className="max-w-6xl mx-auto px-6">
            <Reveal>
              <div className="flex items-end justify-between mb-12">
                <div>
                  <p className="text-xs tracking-[0.3em] uppercase text-violet-400/60 mb-2">Learning Hub</p>
                  <h2 className="text-4xl font-bold tracking-tight">Start learning.</h2>
                </div>
              </div>
            </Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {learningCards.map((card, i) => (
                <Reveal key={card.href} delay={i * 0.07}>
                  <Link
                    href={card.href}
                    className="group block rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl overflow-hidden hover:border-white/20 hover:bg-white/[0.06] transition-all"
                  >
                    <div className="relative h-36 overflow-hidden">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        className="object-cover group-hover:scale-[1.05] transition-transform duration-500"
                        sizes="25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-semibold text-white group-hover:text-violet-400 transition-colors leading-snug mb-1">
                        {card.title}
                      </h3>
                      <p className="text-xs text-white/40 leading-relaxed line-clamp-2">{card.description}</p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 10. LATEST ARTICLES ───────────────────────────── */}
      <Scene minHeight="min-h-[60vh]">
        <Reveal>
          <div className="flex items-end justify-between mb-12">
            <h2 className="text-4xl font-bold tracking-tight">Latest articles</h2>
            <Link href="/blog" className="text-sm text-white/40 hover:text-white flex items-center gap-2 transition-colors">
              All articles <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {latestPosts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.07}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl overflow-hidden hover:border-white/20 transition-all"
              >
                {post.image && (
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/[0.06] text-white/50 uppercase tracking-wider">
                      {post.category}
                    </span>
                    <span className="text-xs text-white/25">{post.readingTime}</span>
                  </div>
                  <h3 className="text-base font-semibold text-white group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs text-white/35 mt-2 line-clamp-2 leading-relaxed">{post.description}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Scene>

      {/* ── 11. COACHING CTA ──────────────────────────────── */}
      <section className="py-28 border-t border-white/[0.05] bg-black">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Reveal>
            <p className="text-xs tracking-[0.3em] uppercase text-emerald-400/60 mb-4">Work Together</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Work with Frank.
            </h2>
            <p className="text-white/40 mb-4 text-lg leading-relaxed">
              Limited coaching engagements for AI architects, technical founders, and creative builders who are serious about shipping.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-xs text-white/30 mb-10">
              <span className="px-3 py-1.5 rounded-full border border-white/10">Oracle AI Architect</span>
              <span className="px-3 py-1.5 rounded-full border border-white/10">12,000+ tracks shipped</span>
              <span className="px-3 py-1.5 rounded-full border border-white/10">75+ open-source skills</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/coaching"
                className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black px-8 py-4 font-semibold transition-all"
                onClick={() => trackEvent('homepage_cta_click', { button: 'coaching', variation: 'v1' })}
              >
                Submit Application <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/newsletter"
                className="inline-flex items-center gap-2 rounded-2xl bg-white/[0.05] hover:bg-white/[0.08] border border-white/10 text-white px-8 py-4 font-medium transition-all"
              >
                Get the Newsletter
              </Link>
            </div>
            <p className="text-xs text-white/20 mt-5">Limited slots · Rolling intake · Application-based</p>
          </Reveal>
        </div>
      </section>

      {/* ── 12. NEWSLETTER ────────────────────────────────── */}
      <section className="py-24 border-t border-white/[0.05] bg-black">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Stay in the loop.</h2>
            <p className="text-white/40 mb-8">AI architecture and creative systems. Weekly dispatch. No spam.</p>
            <div className="max-w-sm mx-auto">
              <EmailSignup listType="newsletter" placeholder="your@email.com" buttonText="Subscribe" compact />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 13. FAQ ────────────────────────────────────────── */}
      {faqs.length > 0 && (
        <section className="py-24 border-t border-white/[0.05] bg-black">
          <div className="max-w-3xl mx-auto px-6">
            <Reveal>
              <h2 className="text-3xl font-bold text-center mb-12">Frequently asked</h2>
            </Reveal>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <Reveal key={i} delay={i * 0.04}>
                  <FAQItem
                    question={faq.question}
                    answer={faq.answer}
                    defaultOpen={i === 0}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 14. FINAL CTA ────────────────────────────────── */}
      <section className="py-32 border-t border-white/[0.05] bg-black text-center relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(16,185,129,0.08),transparent)] pointer-events-none"
        />
        <Reveal>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">Start building.</h2>
          <p className="text-white/40 mb-10 text-lg">Pick your path — architecture, music, or products.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/start"
              className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black px-10 py-4 font-bold text-base transition-all"
            >
              Start Here <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/acos"
              className="inline-flex items-center gap-2 rounded-2xl bg-white/[0.05] hover:bg-white/[0.08] border border-white/10 text-white px-8 py-4 font-medium transition-all"
            >
              Explore the OS
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────── */}
      <footer className="border-t border-white/[0.05] px-6 py-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/20">
          <span>frankx.ai &nbsp;·&nbsp; v1.cinematic &nbsp;·&nbsp; © {new Date().getFullYear()} Frank Riemer</span>
          <Link href="/home" className="hover:text-white/50 transition-colors flex items-center gap-1">
            all variations <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </footer>
    </main>
  )
}
