'use client'

import { motion, useScroll, useTransform, useReducedMotion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useRef, useState, useCallback, useEffect } from 'react'
import { ArrowRight, Play, Pause, ChevronDown, Volume2 } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'
import { EmailSignup } from '@/components/email-signup'
import type { HomepageData } from '@/lib/homepage-data'

// ── Utilities ──────────────────────────────────────────────────────────────────

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
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function RuneBorder({
  children,
  className = '',
  glow = false,
}: {
  children: React.ReactNode
  className?: string
  glow?: boolean
}) {
  return (
    <div
      className={`relative rounded-2xl border border-amber-500/20 bg-amber-950/10 overflow-hidden ${className}`}
      style={glow ? { boxShadow: '0 0 40px rgba(245,158,11,0.06)' } : undefined}
    >
      {/* Top edge */}
      <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
      {/* Bottom edge */}
      <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
      {/* Corner marks */}
      <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-amber-500/30" />
      <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-amber-500/30" />
      <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-amber-500/30" />
      <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-amber-500/30" />
      {children}
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] tracking-[0.45em] uppercase text-amber-500/50 mb-3 font-mono">
      ⟡ {children} ⟡
    </p>
  )
}

// ── Animated counter ──────────────────────────────────────────────────────────

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const duration = 1600
          const start = performance.now()
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * target))
            if (progress < 1) requestAnimationFrame(step)
            else setCount(target)
          }
          requestAnimationFrame(step)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target])

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

// ── Music player ──────────────────────────────────────────────────────────────

function SonicPlayer({ track }: { track: HomepageData['featuredTrack'] }) {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  const toggle = useCallback(() => {
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
      trackEvent('homepage_track_play', { variation: 'v7-arcanean', title: track.title })
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
    <RuneBorder glow className="p-6">
      <audio ref={audioRef} src={track.audioUrl} preload="none" />
      <div className="flex items-center gap-5 mb-5">
        <button
          onClick={toggle}
          className="relative w-14 h-14 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center group hover:bg-amber-500/25 transition-all"
          aria-label={playing ? 'Pause track' : 'Play track'}
        >
          <AnimatePresence mode="wait">
            {playing ? (
              <motion.span key="pause" initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.7, opacity: 0 }} transition={{ duration: 0.15 }}>
                <Pause className="w-5 h-5 text-amber-400" />
              </motion.span>
            ) : (
              <motion.span key="play" initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.7, opacity: 0 }} transition={{ duration: 0.15 }}>
                <Play className="w-5 h-5 text-amber-400 ml-0.5" />
              </motion.span>
            )}
          </AnimatePresence>
          {playing && (
            <span className="absolute inset-0 rounded-full border border-amber-500/30 animate-ping" style={{ animationDuration: '2s' }} />
          )}
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-amber-100 mb-0.5">{track.title}</p>
          <div className="flex items-center gap-2">
            <Volume2 className="w-3 h-3 text-amber-500/40" />
            <p className="text-xs text-amber-400/50 font-mono">{track.genre.join(' · ')}</p>
          </div>
        </div>
        <p className="text-xs text-amber-400/30 font-mono flex-shrink-0">{track.duration}</p>
      </div>
      {/* Progress bar */}
      <div className="h-0.5 bg-amber-950/60 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-amber-600 to-amber-400 rounded-full transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-xs text-amber-400/30 mt-3 font-mono text-center tracking-wider">
        12,000 FORGE-ORBS CATALOGUED
      </p>
    </RuneBorder>
  )
}

// ── Eldrian card ──────────────────────────────────────────────────────────────

const ELDRIANS = [
  {
    name: 'Aethelin',
    godbeast: 'The Loom',
    domain: 'Knowledge',
    element: '∞ liquid starlight',
    color: 'from-blue-500/20 to-cyan-500/10',
    border: 'border-blue-400/20',
    glyph: '∞',
    src: '/images/arcanea/eldrian-aethelin-20260228.png',
    tagColor: 'text-blue-300/60',
  },
  {
    name: 'Solrex',
    godbeast: 'The Mirror',
    domain: 'Vision',
    element: '☀ stellar fire',
    color: 'from-amber-500/20 to-yellow-500/10',
    border: 'border-amber-400/20',
    glyph: '☀',
    src: '/images/arcanea/eldrian-solrex-20260301.png',
    tagColor: 'text-amber-300/60',
  },
  {
    name: 'Velmara',
    godbeast: 'The Silence',
    domain: 'Stillness',
    element: '◈ quantum glass',
    color: 'from-teal-500/20 to-emerald-500/10',
    border: 'border-teal-400/20',
    glyph: '◈',
    src: '/images/arcanea/eldrian-velmara-20260301.png',
    tagColor: 'text-teal-300/60',
  },
  {
    name: 'Korghast',
    godbeast: 'The Becoming',
    domain: 'Transformation',
    element: '⬡ obsidian-starlight',
    color: 'from-purple-500/20 to-violet-500/10',
    border: 'border-purple-400/20',
    glyph: '⬡',
    src: '/images/arcanea/eldrian-korghast-20260228.png',
    tagColor: 'text-purple-300/60',
  },
  {
    name: 'Zyranthis',
    godbeast: 'The Shatter',
    domain: 'Disruption',
    element: '◉ anti-matter void',
    color: 'from-rose-500/20 to-red-500/10',
    border: 'border-rose-400/20',
    glyph: '◉',
    src: '/images/arcanea/eldrian-zyranthis-20260301.png',
    tagColor: 'text-rose-300/60',
  },
]

function EldriandCard({ eldrian, index }: { eldrian: (typeof ELDRIANS)[0]; index: number }) {
  const [hovered, setHovered] = useState(false)
  const reduce = useReducedMotion()

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative rounded-2xl border ${eldrian.border} bg-gradient-to-b ${eldrian.color} p-5 cursor-default overflow-hidden group`}
    >
      {/* Glyph watermark */}
      <div className="absolute -bottom-2 -right-2 text-[80px] font-bold opacity-5 select-none pointer-events-none leading-none">
        {eldrian.glyph}
      </div>

      {/* Portrait */}
      <div className="relative w-16 h-16 rounded-full overflow-hidden border border-amber-500/20 mb-4 mx-auto ring-2 ring-amber-500/10">
        <Image
          src={eldrian.src}
          alt={eldrian.name}
          fill
          className="object-cover"
          sizes="64px"
        />
      </div>

      {/* Info */}
      <div className="text-center">
        <p className={`text-[10px] font-mono tracking-widest uppercase ${eldrian.tagColor} mb-1`}>
          {eldrian.godbeast}
        </p>
        <h3 className="text-base font-bold text-amber-100 mb-1">{eldrian.name}</h3>
        <p className="text-xs text-amber-200/40">{eldrian.domain}</p>
      </div>

      {/* Reveal on hover */}
      <AnimatePresence>
        {hovered && !reduce && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="mt-3 pt-3 border-t border-amber-500/10 text-center"
          >
            <p className={`text-[10px] font-mono ${eldrian.tagColor}`}>{eldrian.element}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ── FAQ accordion ──────────────────────────────────────────────────────────────

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false)
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.5 }}
    >
      <RuneBorder>
        <button
          onClick={() => setOpen((v) => !v)}
          className="w-full cursor-pointer p-5 text-sm font-medium text-amber-100 flex justify-between items-center gap-4 text-left"
          aria-expanded={open}
        >
          <span className="flex items-center gap-3">
            <span className="text-amber-500/30 font-mono text-xs">{String(index + 1).padStart(2, '0')}</span>
            {question}
          </span>
          <span
            className="text-amber-400/40 flex-shrink-0 transition-transform duration-200"
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
              <p className="px-5 pb-5 text-sm text-amber-200/40 leading-relaxed">{answer}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </RuneBorder>
    </motion.div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function HomeV7({
  latestPosts,
  faqs,
  featuredTrack,
  books,
  products,
  learningCards,
  credentials,
}: HomepageData) {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const reduce = useReducedMotion()

  useEffect(() => {
    trackEvent('homepage_view', { variation: 'v7-arcanean' })
  }, [])

  const gates = products.map((p, i) => ({
    ...p,
    roman: ['I', 'II', 'III', 'IV', 'V', 'VI'][i] ?? String(i + 1),
  }))

  const WORLD_STATS = [
    { value: 12000, suffix: '', label: 'Sonic Forge-Orbs', sub: 'AI songs created' },
    { value: 75, suffix: '+', label: 'Discovered Skills', sub: 'Open-source' },
    { value: 5, suffix: '', label: 'Eldrian Guardians', sub: 'Watching over all gates' },
    { value: 6, suffix: '', label: 'Gates Revealed', sub: 'Of ten total' },
  ]

  return (
    <main className="relative min-h-screen bg-[#0d0a05] text-amber-100 overflow-x-hidden">
      {/* ── Fixed ambient glows ─────────────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute top-0 left-1/3 w-[700px] h-[700px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(245,158,11,0.05) 0%, transparent 65%)',
            filter: 'blur(120px)',
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(180,83,9,0.04) 0%, transparent 65%)',
            filter: 'blur(100px)',
          }}
        />
      </div>

      {/* ── SECTION 1: HERO — The Conclave ────────────────────────── */}
      <section ref={heroRef} className="relative min-h-[95vh] flex items-end overflow-hidden">
        <motion.div
          style={reduce ? undefined : { y: heroY }}
          className="absolute inset-0"
        >
          <Image
            src="/images/arcanea/eldrian-conclave-20260301.png"
            alt="The Eldrian Conclave — five guardians assembled"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </motion.div>

        {/* Multi-layer gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0a05] via-[#0d0a05]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0a05]/80 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(245,158,11,0.06)_0%,transparent_70%)]" />

        {/* Scroll indicator */}
        <motion.div
          style={reduce ? undefined : { opacity: heroOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <p className="text-[10px] tracking-[0.4em] uppercase text-amber-500/30 font-mono">Scroll to enter</p>
          <ChevronDown className="w-4 h-4 text-amber-500/30 animate-bounce" />
        </motion.div>

        {/* Hero text */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 pb-20 w-full">
          <Reveal>
            <p className="text-[11px] tracking-[0.5em] uppercase text-amber-400/60 mb-4 font-mono">
              ⟡ The Arcanean Archive ⟡
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-serif text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight leading-[0.9] mb-6">
              Where creation<br />
              meets{' '}
              <span
                className="text-amber-400"
                style={{ textShadow: '0 0 60px rgba(245,158,11,0.4)' }}
              >
                myth.
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg text-amber-200/50 max-w-xl mb-10 leading-relaxed">
              Five Eldrian guardians. Ten gates of mastery. A living world-state where enterprise AI meets
              creative mythology — built session by session.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/arcanea"
                className="inline-flex items-center gap-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 hover:border-amber-500/50 text-amber-200 px-7 py-3.5 text-sm font-medium transition-all duration-200"
                onClick={() => trackEvent('hero_cta_click', { cta: 'enter_arcanea', variation: 'v7' })}
              >
                Enter Arcanea <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/start"
                className="inline-flex items-center gap-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-amber-100/60 px-7 py-3.5 text-sm font-medium transition-all duration-200"
                onClick={() => trackEvent('hero_cta_click', { cta: 'explore_work', variation: 'v7' })}
              >
                Explore the Work
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SECTION 2: WORLD STATE ────────────────────────────────── */}
      <section className="relative z-10 py-20 px-6 border-t border-amber-500/10">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <SectionLabel>World State</SectionLabel>
            <h2 className="font-serif text-2xl text-amber-200/60 mb-12">
              The world grows with each session.
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {WORLD_STATS.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.1}>
                <RuneBorder className="p-6 text-center">
                  <p className="text-3xl md:text-4xl font-bold text-amber-400 font-mono mb-1">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-sm font-semibold text-amber-100 mb-1">{stat.label}</p>
                  <p className="text-[11px] text-amber-400/30 font-mono">{stat.sub}</p>
                </RuneBorder>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: THE FIVE ELDRIANS ─────────────────────────── */}
      <section className="relative z-10 py-24 px-6 border-t border-amber-500/10">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <SectionLabel>The Five Eldrians</SectionLabel>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-3">
              Guardians of the Archive
            </h2>
            <p className="text-amber-200/40 text-base max-w-2xl mb-12 leading-relaxed">
              Born from the Schism — a complementary cycle that divided and amplified the Godbeast godforce.
              Each Eldrian embodies a domain of mastery, presiding over their gate and the seekers who enter.
            </p>
          </Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {ELDRIANS.map((eldrian, i) => (
              <EldriandCard key={eldrian.name} eldrian={eldrian} index={i} />
            ))}
          </div>
          <Reveal delay={0.5}>
            <p className="text-xs text-amber-400/25 font-mono mt-8 text-center tracking-wider">
              THE SCHISM IS A CYCLE · NOT A CONFLICT · ALL FIVE PATHS CONVERGE
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── SECTION 4: THE SIX GATES (Products) ─────────────────── */}
      <section className="relative z-10 py-24 px-6 border-t border-amber-500/10">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <SectionLabel>Gates of Mastery</SectionLabel>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-3">The Six Gates</h2>
            <p className="text-amber-200/40 text-base mb-12 max-w-xl leading-relaxed">
              Six of ten gates are now open. Each gate is a domain of craft — enter at any point, advance through all.
            </p>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {gates.map((gate, i) => (
              <Reveal key={gate.title} delay={i * 0.08}>
                <Link href={gate.href} onClick={() => trackEvent('gate_click', { gate: gate.roman, product: gate.title, variation: 'v7' })}>
                  <RuneBorder className="group h-full hover:border-amber-500/40 transition-all duration-300">
                    <div className="p-6 h-full flex flex-col">
                      <div className="flex items-start justify-between mb-4">
                        <span className="text-2xl font-bold font-serif text-amber-500/20 group-hover:text-amber-500/40 transition-colors">
                          {gate.roman}
                        </span>
                        <span className="text-[10px] font-mono text-amber-500/20 tracking-widest pt-1">
                          GATE
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-amber-100 group-hover:text-amber-300 transition-colors mb-2">
                        {gate.title}
                      </h3>
                      <p className="text-sm text-amber-200/35 leading-relaxed flex-1">{gate.description}</p>
                      <div className="mt-5 flex items-center gap-1.5 text-xs text-amber-400/30 group-hover:text-amber-400/60 transition-colors">
                        Enter gate <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </RuneBorder>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 5: THE SONIC FORGE (Music) ──────────────────── */}
      <section className="relative z-10 py-24 px-6 border-t border-amber-500/10">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <SectionLabel>The Sonic Forge</SectionLabel>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-3">
              Where sound meets code
            </h2>
            <p className="text-amber-200/40 text-base mb-10 max-w-xl leading-relaxed">
              Every track is a Forge-Orb — an abandoned creator impulse transmuted through AI into something
              permanent. Twelve thousand impulses catalogued. Genres from orchestral to hip hop, neoclassical
              to electronic.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <SonicPlayer track={featuredTrack} />
          </Reveal>
          <Reveal delay={0.25}>
            <div className="mt-6 flex gap-4">
              <Link
                href="/music-lab"
                className="inline-flex items-center gap-2 text-sm text-amber-400/60 hover:text-amber-400 transition-colors"
              >
                Explore the Music Lab <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SECTION 6: THE CODEX (Blog) ──────────────────────────── */}
      <section className="relative z-10 py-24 px-6 border-t border-amber-500/10">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <SectionLabel>The Codex</SectionLabel>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-3">Recent Inscriptions</h2>
            <p className="text-amber-200/40 text-base mb-10 max-w-xl leading-relaxed">
              Technical depth. Creative insight. Enterprise patterns documented in plain language.
            </p>
          </Reveal>
          <div className="space-y-3">
            {latestPosts.slice(0, 5).map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.07}>
                <Link
                  href={`/blog/${post.slug}`}
                  onClick={() => trackEvent('codex_post_click', { slug: post.slug, variation: 'v7' })}
                  className="group flex items-center gap-4 rounded-xl border border-amber-500/10 bg-amber-950/10 p-4 hover:border-amber-500/25 hover:bg-amber-950/20 transition-all duration-200"
                >
                  {post.image && (
                    <div className="relative w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 border border-amber-500/10">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-amber-100 group-hover:text-amber-300 transition-colors line-clamp-1 mb-1">
                      {post.title}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-amber-500/30 uppercase tracking-wide">{post.category}</span>
                      <span className="text-amber-500/15">·</span>
                      <span className="text-[10px] font-mono text-amber-500/30">{post.readingTime}</span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-amber-500/20 group-hover:text-amber-400/60 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.4}>
            <div className="mt-6">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-amber-400/50 hover:text-amber-400 transition-colors"
              >
                All inscriptions <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SECTION 7: THE LIBRARY (Books) ───────────────────────── */}
      {books.length > 0 && (
        <section className="relative z-10 py-24 px-6 border-t border-amber-500/10">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <SectionLabel>The Library</SectionLabel>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-3">Sacred Texts</h2>
              <p className="text-amber-200/40 text-base mb-10 max-w-xl leading-relaxed">
                Six books written, published, and available. Architecture guides. Creative frameworks.
                Field manuals for the new age of AI creation.
              </p>
            </Reveal>
            <div className="flex gap-5 overflow-x-auto pb-4 -mx-2 px-2">
              {books.map((book, i) => (
                <Reveal key={book.slug} delay={i * 0.07}>
                  <Link
                    href={`/books/${book.slug}`}
                    onClick={() => trackEvent('library_book_click', { slug: book.slug, variation: 'v7' })}
                    className="group flex-shrink-0 w-[140px]"
                  >
                    <RuneBorder className="aspect-[2/3] mb-3 overflow-hidden">
                      <div className="relative w-full h-full">
                        <Image
                          src={book.coverImage}
                          alt={book.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="140px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0a05]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </RuneBorder>
                    <p className="text-xs font-semibold text-amber-100 group-hover:text-amber-300 transition-colors line-clamp-1">
                      {book.title}
                    </p>
                    <p className="text-[10px] text-amber-400/30 mt-0.5 line-clamp-1">{book.subtitle}</p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── SECTION 8: LEARNING PATHS ────────────────────────────── */}
      <section className="relative z-10 py-24 px-6 border-t border-amber-500/10">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <SectionLabel>Learning Paths</SectionLabel>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-3">Four Paths Through the Archive</h2>
            <p className="text-amber-200/40 text-base mb-10 max-w-xl leading-relaxed">
              Every seeker has a different entry point. Find yours.
            </p>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {learningCards.map((card, i) => (
              <Reveal key={card.title} delay={i * 0.09}>
                <Link
                  href={card.href}
                  onClick={() => trackEvent('learning_path_click', { path: card.title, variation: 'v7' })}
                  className="group block rounded-2xl overflow-hidden border border-amber-500/15 hover:border-amber-500/35 transition-all duration-300"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0a05]/80 via-[#0d0a05]/20 to-transparent" />
                    <div className="absolute inset-0 bg-amber-950/20" />
                  </div>
                  <div className="p-4 bg-amber-950/10">
                    <h3 className="text-sm font-bold text-amber-100 group-hover:text-amber-300 transition-colors mb-1">
                      {card.title}
                    </h3>
                    <p className="text-xs text-amber-200/35 leading-relaxed">{card.description}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 9: THE SIGNAL (Newsletter) ───────────────────── */}
      <section className="relative z-10 py-24 px-6 border-t border-amber-500/10">
        <div className="max-w-2xl mx-auto text-center">
          <Reveal>
            <SectionLabel>The Signal</SectionLabel>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Receive transmissions from the Forge
            </h2>
            <p className="text-amber-200/40 text-base mb-10 leading-relaxed max-w-md mx-auto">
              Weekly dispatches. AI architecture. Music production. World-state updates from inside the
              Arcanean Archive. No noise. Only signal.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <RuneBorder glow className="p-8 max-w-md mx-auto">
              <div className="mb-5">
                <p className="text-xs font-mono text-amber-500/30 tracking-widest">TRANSMISSION FREQUENCY: WEEKLY</p>
              </div>
              <EmailSignup
                listType="newsletter"
                placeholder="your@email.com"
                buttonText="Subscribe to the Signal"
                compact
              />
              <p className="text-xs text-amber-500/20 mt-4 font-mono">No spam. Unsubscribe at any gate.</p>
            </RuneBorder>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2 justify-center">
              {credentials.map((c) => (
                <span key={c} className="text-xs text-amber-400/25 font-mono tracking-wide">{c}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SECTION 10: FAQ ───────────────────────────────────────── */}
      {faqs.length > 0 && (
        <section className="relative z-10 py-20 px-6 border-t border-amber-500/10">
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <SectionLabel>The Oracle</SectionLabel>
              <h2 className="font-serif text-2xl md:text-3xl font-bold mb-10 text-center">
                Questions answered
              </h2>
            </Reveal>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <FAQItem key={i} question={faq.question} answer={faq.answer} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FOOTER ────────────────────────────────────────────────── */}
      <footer className="relative z-10 border-t border-amber-500/10 px-6 py-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-xs font-mono text-amber-400/20">frankx.ai // v7.arcanean</p>
            <p className="text-[10px] font-mono text-amber-500/12 mt-1 tracking-widest">
              ⟡ THE ARCHIVE IS ALWAYS OPEN ⟡
            </p>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/blog" className="text-xs text-amber-400/20 hover:text-amber-400/50 transition-colors font-mono">Codex</Link>
            <Link href="/music-lab" className="text-xs text-amber-400/20 hover:text-amber-400/50 transition-colors font-mono">Forge</Link>
            <Link href="/arcanea" className="text-xs text-amber-400/20 hover:text-amber-400/50 transition-colors font-mono">Archive</Link>
            <Link href="/home" className="text-xs text-amber-400/30 hover:text-amber-400/60 transition-colors font-mono border border-amber-500/10 px-3 py-1 rounded">
              all variations
            </Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
