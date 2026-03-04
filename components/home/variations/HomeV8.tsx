'use client'

import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useRef, useState, useCallback, useEffect } from 'react'
import { Play, Pause, ArrowRight, Code2, Music, ChevronRight } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'
import { EmailSignup } from '@/components/email-signup'
import type { HomepageData } from '@/lib/homepage-data'

// ── View mode type ────────────────────────────────────────────────────────────
type ViewMode = 'both' | 'architect' | 'creator'

// ── Side panel config ─────────────────────────────────────────────────────────
const ARCHITECT = {
  bg: '#060b1a',
  primary: '#3B82F6',
  primaryDim: 'rgba(59,130,246,0.12)',
  primaryBorder: 'rgba(59,130,246,0.18)',
  text: 'rgba(220,228,255,0.85)',
  textDim: 'rgba(180,200,255,0.35)',
  label: 'THE ARCHITECT',
  tagline: 'Enterprise AI systems. Blueprint precision.',
  icon: Code2,
}

const CREATOR = {
  bg: '#0f0800',
  primary: '#F59E0B',
  primaryDim: 'rgba(245,158,11,0.1)',
  primaryBorder: 'rgba(245,158,11,0.18)',
  text: 'rgba(255,245,220,0.85)',
  textDim: 'rgba(255,220,160,0.35)',
  label: 'THE CREATOR',
  tagline: '12,000 tracks. Art from data.',
  icon: Music,
}

// ── Mini audio player ─────────────────────────────────────────────────────────
function MiniPlayer({ track }: { track: HomepageData['featuredTrack'] }) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const shouldReduce = useReducedMotion()

  const toggle = useCallback(() => {
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
      trackEvent('homepage_track_play', { variation: 'v8-split', title: track.title })
    }
    setPlaying((p) => !p)
  }, [playing, track.title])

  useEffect(() => {
    const a = audioRef.current
    if (!a) return
    const end = () => setPlaying(false)
    a.addEventListener('ended', end)
    return () => a.removeEventListener('ended', end)
  }, [])

  return (
    <div>
      <audio ref={audioRef} src={track.audioUrl} preload="none" />
      <div className="flex items-center gap-3">
        <motion.button
          onClick={toggle}
          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
          style={{
            background: CREATOR.primaryDim,
            border: `1px solid ${CREATOR.primaryBorder}`,
          }}
          whileHover={shouldReduce ? {} : { scale: 1.08 }}
          whileTap={shouldReduce ? {} : { scale: 0.94 }}
          aria-label={playing ? 'Pause' : 'Play'}
        >
          {playing
            ? <Pause className="w-3.5 h-3.5" style={{ color: CREATOR.primary }} />
            : <Play className="w-3.5 h-3.5 ml-0.5" style={{ color: CREATOR.primary }} />
          }
        </motion.button>
        <div className="min-w-0">
          <p className="text-[13px] font-semibold text-white/80 leading-tight">{track.title}</p>
          <p className="text-[10px] mt-0.5" style={{ color: CREATOR.textDim }}>
            {track.genre.join(', ')} &middot; {track.duration}
          </p>
        </div>
        {/* Animated bars when playing */}
        {playing && !shouldReduce && (
          <div className="flex items-end gap-[2px] h-5 ml-auto flex-shrink-0">
            {[0.4, 0.65, 0.5, 0.75, 0.45].map((speed, i) => (
              <motion.div
                key={i}
                style={{ background: CREATOR.primary, width: '2px', borderRadius: '1px' }}
                animate={{ height: ['30%', '90%', '50%', '100%', '35%'] }}
                transition={{ duration: speed, repeat: Infinity, delay: i * 0.09 }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ── Reveal wrapper ────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const shouldReduce = useReducedMotion()
  return (
    <motion.div
      initial={shouldReduce ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

// ── Side label pill ───────────────────────────────────────────────────────────
function SidePill({ side }: { side: typeof ARCHITECT | typeof CREATOR }) {
  const Icon = side.icon
  return (
    <div
      className="inline-flex items-center gap-2 px-3 py-1.5 text-[10px] tracking-[0.2em] uppercase font-bold"
      style={{
        border: `1px solid ${side.primaryBorder}`,
        background: side.primaryDim,
        color: side.primary,
      }}
    >
      <Icon className="w-3 h-3" />
      {side.label}
    </div>
  )
}

// ── Product card (architect style) ────────────────────────────────────────────
function ArchitectCard({ product }: { product: HomepageData['products'][0] }) {
  return (
    <Link href={product.href} className="group block">
      <div
        className="p-4 transition-all"
        style={{
          border: `1px solid rgba(59,130,246,0.1)`,
          background: 'rgba(59,130,246,0.04)',
        }}
      >
        {/* Blueprint-style top accent */}
        <div
          className="w-full h-px mb-4"
          style={{ background: `linear-gradient(to right, ${ARCHITECT.primary}40, transparent)` }}
        />
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3
              className="text-[12px] font-bold uppercase tracking-wider mb-1.5 group-hover:text-blue-400 transition-colors"
              style={{ color: ARCHITECT.text, letterSpacing: '0.06em' }}
            >
              {product.title}
            </h3>
            <p className="text-[11px] leading-snug" style={{ color: ARCHITECT.textDim }}>
              {product.description}
            </p>
          </div>
          <ChevronRight
            className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 transition-colors"
            style={{ color: `${ARCHITECT.primary}40` }}
          />
        </div>
        {/* Bottom coordinate line */}
        <div className="flex items-center gap-2 mt-3">
          <div className="w-1.5 h-1.5 border" style={{ borderColor: `${ARCHITECT.primary}40` }} />
          <div
            className="flex-1 h-px"
            style={{ background: `${ARCHITECT.primary}20` }}
          />
        </div>
      </div>
    </Link>
  )
}

// ── Product card (creator style) ──────────────────────────────────────────────
function CreatorCard({ product }: { product: HomepageData['products'][0] }) {
  return (
    <Link href={product.href} className="group block">
      <div
        className="p-4 transition-all"
        style={{
          border: `1px solid rgba(245,158,11,0.1)`,
          background: 'rgba(245,158,11,0.04)',
        }}
      >
        <h3
          className="text-[13px] font-semibold mb-1 group-hover:text-amber-400 transition-colors"
          style={{ color: CREATOR.text }}
        >
          {product.title}
        </h3>
        <p className="text-[11px] leading-snug mb-3" style={{ color: CREATOR.textDim }}>
          {product.description}
        </p>
        <div className="flex items-center gap-2">
          <div
            className="h-px flex-1"
            style={{ background: `linear-gradient(to right, ${CREATOR.primary}30, transparent)` }}
          />
          <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: CREATOR.primary }} />
        </div>
      </div>
    </Link>
  )
}

// ── Post row (architect style — monospace, precise) ───────────────────────────
function ArchitectPost({ post }: { post: HomepageData['latestPosts'][0] }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <div
        className="py-3 px-0 transition-colors hover:bg-blue-500/[0.03]"
        style={{ borderBottom: '1px solid rgba(59,130,246,0.07)' }}
      >
        <div className="flex items-baseline gap-3">
          <span className="text-[9px] font-mono" style={{ color: `${ARCHITECT.primary}40`, minWidth: '20px' }}>
            {'>'}
          </span>
          <div className="min-w-0 flex-1">
            <p
              className="text-[12px] font-medium group-hover:text-blue-400 transition-colors line-clamp-1"
              style={{ color: ARCHITECT.text, fontFamily: "'JetBrains Mono', monospace, system-ui" }}
            >
              {post.title}
            </p>
            <p className="text-[10px] mt-0.5 font-mono" style={{ color: ARCHITECT.textDim }}>
              {post.date} &nbsp;//&nbsp; {post.readingTime}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}

// ── Post row (creator style — warm, editorial) ────────────────────────────────
function CreatorPost({ post }: { post: HomepageData['latestPosts'][0] }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <div
        className="py-3 px-0 flex items-center gap-3 transition-colors hover:bg-amber-500/[0.03]"
        style={{ borderBottom: '1px solid rgba(245,158,11,0.07)' }}
      >
        <span style={{ color: `${CREATOR.primary}50`, fontSize: '10px' }}>♪</span>
        <div className="min-w-0 flex-1">
          <p
            className="text-[12px] font-medium group-hover:text-amber-400 transition-colors line-clamp-1"
            style={{ color: CREATOR.text }}
          >
            {post.title}
          </p>
          <p className="text-[10px] mt-0.5" style={{ color: CREATOR.textDim }}>
            {post.category} &middot; {post.readingTime}
          </p>
        </div>
      </div>
    </Link>
  )
}

// ── FAQ item (side-aware) ─────────────────────────────────────────────────────
function SideFAQ({
  faq,
  side,
}: {
  faq: HomepageData['faqs'][0]
  side: 'architect' | 'creator'
}) {
  const config = side === 'architect' ? ARCHITECT : CREATOR
  return (
    <div style={{ borderBottom: `1px solid ${config.primaryBorder}` }} className="py-4">
      <p className="text-[12px] font-semibold mb-1.5" style={{ color: config.text }}>
        {faq.question}
      </p>
      <p className="text-[11px] leading-relaxed" style={{ color: config.textDim }}>
        {faq.answer}
      </p>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function HomeV8({
  latestPosts,
  faqs,
  featuredTrack,
  books,
  products,
  learningCards,
  designLabImages,
  credentials,
}: HomepageData) {
  const shouldReduce = useReducedMotion()
  const [mode, setMode] = useState<ViewMode>('both')

  useEffect(() => {
    trackEvent('homepage_view', { variation: 'v8-split' })
  }, [])

  const onModeChange = useCallback((m: ViewMode) => {
    setMode(m)
    trackEvent('homepage_mode_change', { variation: 'v8-split', mode: m })
  }, [])

  // Product split
  const techProducts = products.filter((p) =>
    ['Agentic Creator OS', 'AI Architecture Hub', 'Prompt Library'].includes(p.title)
  )
  const creativeProducts = products.filter((p) =>
    ['Music Lab', 'Design Lab', 'Creator Kit'].includes(p.title)
  )

  // Post split
  const techKeywords = ['ai', 'engineering', 'architecture', 'tools', 'code', 'agent']
  const architectPosts = latestPosts
    .filter((p) => techKeywords.some((kw) => p.category.toLowerCase().includes(kw)))
    .slice(0, 3)
  const creatorPosts = latestPosts
    .filter((p) => !techKeywords.some((kw) => p.category.toLowerCase().includes(kw)))
    .slice(0, 3)

  const fallbackArch = architectPosts.length > 0 ? architectPosts : latestPosts.slice(0, 3)
  const fallbackCreate = creatorPosts.length > 0 ? creatorPosts : latestPosts.slice(3, 6)

  // FAQ split
  const techFAQs = faqs.filter((_, i) => i % 2 === 0)
  const creativeFAQs = faqs.filter((_, i) => i % 2 !== 0)

  // Opacity per mode
  const archOpacity = mode === 'creator' ? 0.3 : 1
  const createOpacity = mode === 'architect' ? 0.3 : 1

  return (
    <main
      className="min-h-screen text-white overflow-x-hidden"
      style={{
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
        background: '#080c16',
      }}
    >
      {/* ── TOP NAV ────────────────────────────────────────────────────────── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
        style={{
          background: 'rgba(8,12,22,0.95)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <Link href="/" className="text-[13px] font-bold tracking-[0.12em] uppercase text-white/80 hover:text-white transition-colors">
          FRANKX
        </Link>

        {/* View mode toggle */}
        <div
          className="flex items-center gap-px"
          style={{ border: '1px solid rgba(255,255,255,0.08)' }}
        >
          {(['both', 'architect', 'creator'] as ViewMode[]).map((m) => (
            <button
              key={m}
              onClick={() => onModeChange(m)}
              className="px-3 py-1.5 text-[10px] uppercase tracking-wider font-semibold transition-all"
              style={{
                background: mode === m
                  ? m === 'architect'
                    ? ARCHITECT.primaryDim
                    : m === 'creator'
                      ? CREATOR.primaryDim
                      : 'rgba(255,255,255,0.07)'
                  : 'transparent',
                color: mode === m
                  ? m === 'architect'
                    ? ARCHITECT.primary
                    : m === 'creator'
                      ? CREATOR.primary
                      : 'white'
                  : 'rgba(255,255,255,0.3)',
              }}
            >
              {m}
            </button>
          ))}
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-5">
          {[['Blog', '/blog'], ['Music', '/music-lab'], ['Tools', '/acos']].map(([l, h]) => (
            <Link key={l} href={h} className="text-[11px] text-white/30 hover:text-white/70 transition-colors uppercase tracking-wider">
              {l}
            </Link>
          ))}
        </div>
      </nav>

      {/* ── SPLIT HERO ─────────────────────────────────────────────────────── */}
      <section className="pt-14 min-h-screen grid lg:grid-cols-2">

        {/* LEFT: THE ARCHITECT */}
        <motion.div
          animate={{ opacity: archOpacity }}
          transition={{ duration: 0.4 }}
          className="relative flex flex-col justify-center px-8 md:px-14 py-20"
          style={{ background: ARCHITECT.bg }}
        >
          {/* Blueprint grid overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(59,130,246,0.08) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59,130,246,0.08) 1px, transparent 1px)
              `,
              backgroundSize: '48px 48px',
            }}
            aria-hidden
          />

          <div className="relative z-10">
            <Reveal>
              <SidePill side={ARCHITECT} />
            </Reveal>

            <Reveal delay={0.08}>
              <h1
                className="font-bold tracking-tight leading-none mt-8 mb-6"
                style={{
                  fontSize: 'clamp(2.2rem, 5vw, 4rem)',
                  fontFamily: '"JetBrains Mono", monospace, system-ui',
                  color: ARCHITECT.text,
                  letterSpacing: '-0.02em',
                }}
              >
                Enterprise AI.
                <br />
                <span style={{ color: ARCHITECT.primary }}>Systems built</span>
                <br />
                to last.
              </h1>
            </Reveal>

            <Reveal delay={0.14}>
              <p
                className="text-[13px] leading-relaxed mb-8 max-w-sm"
                style={{ color: ARCHITECT.textDim, fontFamily: 'monospace, system-ui' }}
              >
                // AI Systems Architect at Oracle
                <br />
                // 75+ open-source skills, 38 agents
                <br />
                // Enterprise patterns, agentic orchestration
              </p>
            </Reveal>

            {/* Credentials as code comments */}
            <Reveal delay={0.18}>
              <div
                className="p-4 mb-8"
                style={{
                  background: 'rgba(59,130,246,0.06)',
                  border: `1px solid ${ARCHITECT.primaryBorder}`,
                  fontFamily: 'monospace',
                }}
              >
                <p className="text-[10px] mb-3" style={{ color: `${ARCHITECT.primary}60` }}>
                  {'/**'}
                </p>
                {['AI Architect at Oracle', '75+ Open Source Skills', 'Everything Documented'].map((c) => (
                  <p key={c} className="text-[11px] mb-1" style={{ color: `${ARCHITECT.primary}70` }}>
                    &nbsp;* {c}
                  </p>
                ))}
                <p className="text-[10px] mt-2" style={{ color: `${ARCHITECT.primary}60` }}>
                  {'*/'}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.22}>
              <Link
                href="/acos"
                className="inline-flex items-center gap-2 px-6 py-3 text-[12px] font-bold uppercase tracking-wider transition-all"
                style={{
                  background: ARCHITECT.primary,
                  color: '#000',
                }}
              >
                <Code2 className="w-3.5 h-3.5" />
                Explore Systems
              </Link>
            </Reveal>
          </div>
        </motion.div>

        {/* CENTER DIVIDER GLOW */}
        <div
          className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px z-10 pointer-events-none"
          style={{
            background: `linear-gradient(to bottom, transparent, ${ARCHITECT.primary}40 30%, ${CREATOR.primary}40 70%, transparent)`,
            boxShadow: `0 0 20px rgba(59,130,246,0.15), 0 0 20px rgba(245,158,11,0.15)`,
          }}
          aria-hidden
        />

        {/* RIGHT: THE CREATOR */}
        <motion.div
          animate={{ opacity: createOpacity }}
          transition={{ duration: 0.4 }}
          className="relative flex flex-col justify-center px-8 md:px-14 py-20"
          style={{ background: CREATOR.bg }}
        >
          {/* Warm grain texture */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              backgroundImage: `radial-gradient(ellipse at 80% 20%, rgba(245,158,11,0.08) 0%, transparent 60%)`,
            }}
            aria-hidden
          />

          <div className="relative z-10">
            <Reveal>
              <SidePill side={CREATOR} />
            </Reveal>

            <Reveal delay={0.08}>
              <h1
                className="font-bold tracking-tight leading-none mt-8 mb-6"
                style={{
                  fontSize: 'clamp(2.2rem, 5vw, 4rem)',
                  color: CREATOR.text,
                  letterSpacing: '-0.02em',
                }}
              >
                12,000 tracks.
                <br />
                <span style={{ color: CREATOR.primary }}>Art from</span>
                <br />
                algorithms.
              </h1>
            </Reveal>

            <Reveal delay={0.14}>
              <p
                className="text-[13px] leading-relaxed mb-8 max-w-sm"
                style={{ color: CREATOR.textDim }}
              >
                Music producer, generative artist, world-builder. Every genre explored.
                Every workflow documented. 6 books written.
              </p>
            </Reveal>

            {/* Featured track as a "now playing" card */}
            <Reveal delay={0.18}>
              <div
                className="p-4 mb-8"
                style={{
                  background: CREATOR.primaryDim,
                  border: `1px solid ${CREATOR.primaryBorder}`,
                }}
              >
                <p
                  className="text-[9px] tracking-[0.25em] uppercase mb-3"
                  style={{ color: `${CREATOR.primary}60` }}
                >
                  Now Playing
                </p>
                <MiniPlayer track={featuredTrack} />
              </div>
            </Reveal>

            <Reveal delay={0.22}>
              <Link
                href="/music-lab"
                className="inline-flex items-center gap-2 px-6 py-3 text-[12px] font-bold uppercase tracking-wider transition-all"
                style={{
                  background: CREATOR.primary,
                  color: '#000',
                }}
              >
                <Music className="w-3.5 h-3.5" />
                Enter the Studio
              </Link>
            </Reveal>
          </div>
        </motion.div>
      </section>

      {/* ── CREDENTIALS SPLIT BAR ──────────────────────────────────────────── */}
      <div className="grid lg:grid-cols-2">
        <motion.div
          animate={{ opacity: archOpacity }}
          transition={{ duration: 0.4 }}
          className="py-5 px-8 md:px-14 flex flex-wrap gap-x-6 gap-y-1"
          style={{
            background: ARCHITECT.bg,
            borderTop: `1px solid ${ARCHITECT.primaryBorder}`,
            borderBottom: `1px solid ${ARCHITECT.primaryBorder}`,
          }}
        >
          {['AI Architect at Oracle', '75+ Open Source Skills', '38 Specialized Agents'].map((c) => (
            <span key={c} className="text-[10px] uppercase tracking-wider font-mono" style={{ color: `${ARCHITECT.primary}50` }}>
              // {c}
            </span>
          ))}
        </motion.div>
        <motion.div
          animate={{ opacity: createOpacity }}
          transition={{ duration: 0.4 }}
          className="py-5 px-8 md:px-14 flex flex-wrap gap-x-6 gap-y-1"
          style={{
            background: CREATOR.bg,
            borderTop: `1px solid ${CREATOR.primaryBorder}`,
            borderBottom: `1px solid ${CREATOR.primaryBorder}`,
          }}
        >
          {['12,000+ AI Songs', '6 Published Books', 'Everything Documented'].map((c) => (
            <span key={c} className="text-[10px] uppercase tracking-wider" style={{ color: `${CREATOR.primary}50` }}>
              ♪ {c}
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── SPLIT PRODUCTS ─────────────────────────────────────────────────── */}
      <div className="grid lg:grid-cols-2">
        {/* Architect products */}
        <motion.div
          animate={{ opacity: archOpacity }}
          transition={{ duration: 0.4 }}
          className="py-12 px-8 md:px-14"
          style={{ background: ARCHITECT.bg }}
        >
          <Reveal>
            <div className="mb-6">
              <p className="text-[9px] tracking-[0.3em] uppercase mb-2" style={{ color: `${ARCHITECT.primary}50` }}>
                Sys.Tools[]
              </p>
              <h2 className="text-xl font-bold" style={{ color: ARCHITECT.text, fontFamily: 'monospace, system-ui' }}>
                Technical Systems
              </h2>
            </div>
          </Reveal>
          <div className="space-y-2">
            {techProducts.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.07}>
                <ArchitectCard product={p} />
              </Reveal>
            ))}
          </div>
        </motion.div>

        {/* Creator products */}
        <motion.div
          animate={{ opacity: createOpacity }}
          transition={{ duration: 0.4 }}
          className="py-12 px-8 md:px-14"
          style={{ background: CREATOR.bg }}
        >
          <Reveal>
            <div className="mb-6">
              <p className="text-[9px] tracking-[0.3em] uppercase mb-2" style={{ color: `${CREATOR.primary}50` }}>
                Studio Tools
              </p>
              <h2 className="text-xl font-bold" style={{ color: CREATOR.text }}>
                Creative Arsenal
              </h2>
            </div>
          </Reveal>
          <div className="space-y-2">
            {creativeProducts.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.07}>
                <CreatorCard product={p} />
              </Reveal>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── IMAGE SPLIT ─────────────────────────────────────────────────────── */}
      <div className="grid lg:grid-cols-2 gap-px" style={{ background: 'rgba(255,255,255,0.05)' }}>
        {/* Architect image */}
        <motion.div
          animate={{ opacity: archOpacity }}
          transition={{ duration: 0.4 }}
          className="relative aspect-[16/7] overflow-hidden"
          style={{ background: ARCHITECT.bg }}
        >
          <Image
            src="/images/golden-age/sis-architecture-v1.png"
            alt="AI Architecture — Starlight Intelligence System"
            fill
            className="object-cover"
            sizes="50vw"
          />
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(to right, ${ARCHITECT.bg}CC, transparent 40%, ${ARCHITECT.bg}AA)` }}
          />
          <div className="absolute bottom-6 left-8">
            <span
              className="text-[10px] font-mono uppercase tracking-widest px-2 py-1"
              style={{ border: `1px solid ${ARCHITECT.primaryBorder}`, color: ARCHITECT.primary, background: ARCHITECT.primaryDim }}
            >
              SIS Architecture
            </span>
          </div>
        </motion.div>

        {/* Creator image */}
        <motion.div
          animate={{ opacity: createOpacity }}
          transition={{ duration: 0.4 }}
          className="relative aspect-[16/7] overflow-hidden"
          style={{ background: CREATOR.bg }}
        >
          <Image
            src="/images/arcanea/eldrian-conclave-20260301.png"
            alt="The Eldrian Conclave — Creative World"
            fill
            className="object-cover"
            sizes="50vw"
          />
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(to left, ${CREATOR.bg}CC, transparent 40%, ${CREATOR.bg}AA)` }}
          />
          <div className="absolute bottom-6 right-8">
            <span
              className="text-[10px] uppercase tracking-widest px-2 py-1"
              style={{ border: `1px solid ${CREATOR.primaryBorder}`, color: CREATOR.primary, background: CREATOR.primaryDim }}
            >
              Arcanea World
            </span>
          </div>
        </motion.div>
      </div>

      {/* ── SPLIT BLOG POSTS ─────────────────────────────────────────────────── */}
      <div className="grid lg:grid-cols-2">
        {/* Architect posts */}
        <motion.div
          animate={{ opacity: archOpacity }}
          transition={{ duration: 0.4 }}
          className="py-12 px-8 md:px-14"
          style={{ background: ARCHITECT.bg }}
        >
          <Reveal>
            <div className="flex items-end justify-between mb-5">
              <div>
                <p className="text-[9px] font-mono tracking-[0.25em] uppercase mb-1" style={{ color: `${ARCHITECT.primary}50` }}>
                  // recent_posts
                </p>
                <h2 className="text-lg font-bold" style={{ color: ARCHITECT.text, fontFamily: 'monospace' }}>
                  Technical Reads
                </h2>
              </div>
              <Link
                href="/blog"
                className="text-[10px] flex items-center gap-1 hover:opacity-80 transition-opacity"
                style={{ color: ARCHITECT.primary, fontFamily: 'monospace' }}
              >
                ls -la <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </Reveal>
          <div>
            {fallbackArch.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.06}>
                <ArchitectPost post={post} />
              </Reveal>
            ))}
          </div>
        </motion.div>

        {/* Creator posts */}
        <motion.div
          animate={{ opacity: createOpacity }}
          transition={{ duration: 0.4 }}
          className="py-12 px-8 md:px-14"
          style={{ background: CREATOR.bg }}
        >
          <Reveal>
            <div className="flex items-end justify-between mb-5">
              <div>
                <p className="text-[9px] tracking-[0.25em] uppercase mb-1" style={{ color: `${CREATOR.primary}50` }}>
                  Latest from the studio
                </p>
                <h2 className="text-lg font-bold" style={{ color: CREATOR.text }}>
                  Creative Reads
                </h2>
              </div>
              <Link
                href="/blog"
                className="text-[10px] flex items-center gap-1 hover:opacity-80 transition-opacity"
                style={{ color: CREATOR.primary }}
              >
                All <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </Reveal>
          <div>
            {fallbackCreate.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.06}>
                <CreatorPost post={post} />
              </Reveal>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── MEETING POINT — Full width ──────────────────────────────────────── */}
      <section className="py-20 px-6 relative overflow-hidden" style={{ background: '#0a0e1a' }}>
        {/* Divider glow background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at center, rgba(59,130,246,0.06) 0%, rgba(245,158,11,0.04) 50%, transparent 70%)`,
          }}
          aria-hidden
        />

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <Reveal>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px flex-1 max-w-24" style={{ background: `linear-gradient(to right, transparent, ${ARCHITECT.primary}40)` }} />
              <span className="text-white/20 text-xs tracking-widest">×</span>
              <div className="h-px flex-1 max-w-24" style={{ background: `linear-gradient(to left, transparent, ${CREATOR.primary}40)` }} />
            </div>
          </Reveal>

          <Reveal delay={0.07}>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              <span style={{ color: ARCHITECT.primary }}>Both</span>
              <span className="text-white/30 mx-3">in one</span>
              <span style={{ color: CREATOR.primary }}>person.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="text-[14px] text-white/35 max-w-lg mx-auto mb-4">
              The systems architect and the music creator are the same person.
              One newsletter covers both — shipped weekly, no filler.
            </p>
          </Reveal>

          {/* Credential ribbon */}
          <Reveal delay={0.16}>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
              {credentials.map((c, i) => (
                <span
                  key={c}
                  className="text-[10px] uppercase tracking-wider px-3 py-1"
                  style={{
                    color: i % 2 === 0 ? ARCHITECT.primary : CREATOR.primary,
                    border: `1px solid ${i % 2 === 0 ? ARCHITECT.primaryBorder : CREATOR.primaryBorder}`,
                    background: i % 2 === 0 ? ARCHITECT.primaryDim : CREATOR.primaryDim,
                  }}
                >
                  {c}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── BOOKS — Full width ─────────────────────────────────────────────── */}
      {books.length > 0 && (
        <section
          className="py-16 px-8 md:px-14"
          style={{ background: '#080c16', borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <div className="max-w-5xl mx-auto">
            <Reveal>
              <div className="flex items-end justify-between mb-8">
                <div>
                  <p className="text-[9px] tracking-[0.3em] uppercase mb-1" style={{ color: 'rgba(255,255,255,0.2)' }}>
                    Published Works
                  </p>
                  <h2 className="text-2xl font-bold text-white">The Library</h2>
                </div>
                <Link href="/books" className="text-[11px] text-white/25 hover:text-white/60 transition-colors">
                  All Books →
                </Link>
              </div>
            </Reveal>

            <div className="flex gap-6 overflow-x-auto pb-4">
              {books.map((book, i) => (
                <Reveal key={book.slug} delay={i * 0.07}>
                  <Link href={`/books/${book.slug}`} className="group flex-shrink-0 w-[130px]">
                    <div
                      className="relative w-[130px] h-[180px] overflow-hidden mb-3"
                      style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                    >
                      <Image
                        src={book.coverImage}
                        alt={book.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="130px"
                      />
                      {/* Split color overlay by index */}
                      <div
                        className="absolute inset-0 opacity-20 group-hover:opacity-0 transition-opacity"
                        style={{
                          background: i % 2 === 0
                            ? `linear-gradient(135deg, ${ARCHITECT.primary}20, transparent)`
                            : `linear-gradient(135deg, ${CREATOR.primary}20, transparent)`,
                        }}
                      />
                    </div>
                    <p className="text-[12px] font-semibold text-white/75 group-hover:text-white transition-colors line-clamp-1">
                      {book.title}
                    </p>
                    <p className="text-[10px] text-white/30 mt-0.5 line-clamp-1">{book.subtitle}</p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── SPLIT FAQ ──────────────────────────────────────────────────────── */}
      {faqs.length > 0 && (
        <div className="grid lg:grid-cols-2" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          {/* Architect FAQ */}
          <motion.div
            animate={{ opacity: archOpacity }}
            transition={{ duration: 0.4 }}
            className="py-12 px-8 md:px-14"
            style={{ background: ARCHITECT.bg }}
          >
            <Reveal>
              <div className="mb-6">
                <p className="text-[9px] font-mono tracking-[0.25em] uppercase mb-1" style={{ color: `${ARCHITECT.primary}50` }}>
                  // FAQ.technical
                </p>
                <h2 className="text-lg font-bold" style={{ color: ARCHITECT.text, fontFamily: 'monospace' }}>
                  Technical Questions
                </h2>
              </div>
            </Reveal>
            <div>
              {techFAQs.map((faq, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <SideFAQ faq={faq} side="architect" />
                </Reveal>
              ))}
            </div>
          </motion.div>

          {/* Creator FAQ */}
          <motion.div
            animate={{ opacity: createOpacity }}
            transition={{ duration: 0.4 }}
            className="py-12 px-8 md:px-14"
            style={{ background: CREATOR.bg }}
          >
            <Reveal>
              <div className="mb-6">
                <p className="text-[9px] tracking-[0.25em] uppercase mb-1" style={{ color: `${CREATOR.primary}50` }}>
                  Creative Questions
                </p>
                <h2 className="text-lg font-bold" style={{ color: CREATOR.text }}>
                  Creator FAQ
                </h2>
              </div>
            </Reveal>
            <div>
              {creativeFAQs.map((faq, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <SideFAQ faq={faq} side="creator" />
                </Reveal>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* ── NEWSLETTER — Full width ─────────────────────────────────────────── */}
      <section
        className="py-24 px-6 relative overflow-hidden"
        style={{ background: '#06090f', borderTop: '1px solid rgba(255,255,255,0.05)' }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              linear-gradient(to right, ${ARCHITECT.bg}80 0%, transparent 40%),
              linear-gradient(to left, ${CREATOR.bg}80 0%, transparent 40%)
            `,
          }}
          aria-hidden
        />
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <Reveal>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full" style={{ background: ARCHITECT.primary }} />
              <span className="text-white/30 text-sm">+</span>
              <div className="w-3 h-3 rounded-full" style={{ background: CREATOR.primary }} />
            </div>
            <h2 className="text-3xl font-bold mb-3 text-white">
              Both sides. One dispatch.
            </h2>
            <p className="text-[13px] text-white/30 mb-10 max-w-sm mx-auto">
              The architect and the creator, delivered weekly. AI systems + music + creation — no noise.
            </p>
            <div className="max-w-sm mx-auto">
              <EmailSignup
                listType="newsletter"
                placeholder="your@email.com"
                buttonText="Subscribe"
                compact
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────────── */}
      <footer
        className="grid lg:grid-cols-2"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div
          className="py-5 px-8 md:px-14 flex items-center justify-between"
          style={{ background: ARCHITECT.bg, borderBottom: `2px solid ${ARCHITECT.primaryBorder}` }}
        >
          <span className="text-[10px] font-mono" style={{ color: `${ARCHITECT.primary}40` }}>
            frankx.ai // v8.architect
          </span>
          <span className="text-[10px] font-mono" style={{ color: `${ARCHITECT.primary}20` }}>
            AI_ARCHITECT=true
          </span>
        </div>
        <div
          className="py-5 px-8 md:px-14 flex items-center justify-between"
          style={{ background: CREATOR.bg, borderBottom: `2px solid ${CREATOR.primaryBorder}` }}
        >
          <span className="text-[10px]" style={{ color: `${CREATOR.primary}40` }}>
            frankx.ai // v8.creator
          </span>
          <Link
            href="/home"
            className="text-[10px] hover:opacity-80 transition-opacity"
            style={{ color: `${CREATOR.primary}60` }}
          >
            All Variations →
          </Link>
        </div>
      </footer>
    </main>
  )
}
