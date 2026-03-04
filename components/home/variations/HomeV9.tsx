'use client'

import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useRef, useState, useCallback, useEffect } from 'react'
import { Play, Pause, Volume2, VolumeX, SkipForward, Radio } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'
import { EmailSignup } from '@/components/email-signup'
import type { HomepageData } from '@/lib/homepage-data'

// ─── Waveform visualization ───────────────────────────────────────────────────
function WaveformViz({ playing, count = 40 }: { playing: boolean; count?: number }) {
  const shouldReduce = useReducedMotion()

  // Pre-compute a waveform shape so static mode looks like real audio
  const staticHeights = [
    18, 22, 30, 45, 60, 55, 70, 80, 65, 90,
    75, 88, 95, 82, 70, 60, 78, 92, 85, 76,
    68, 80, 70, 60, 50, 65, 78, 55, 42, 35,
    50, 62, 70, 55, 45, 38, 30, 22, 18, 14,
  ]

  return (
    <div className="flex items-end justify-center gap-[2px] h-16 w-full" aria-hidden>
      {Array.from({ length: count }).map((_, i) => {
        const staticH = staticHeights[i % staticHeights.length]
        return (
          <motion.div
            key={i}
            className="flex-1 max-w-[5px] rounded-t-[1px]"
            style={{
              background: playing
                ? `rgba(16, 185, 129, ${0.4 + (i % 3) * 0.2})`
                : `rgba(16, 185, 129, 0.2)`,
              minWidth: '2px',
            }}
            animate={
              playing && !shouldReduce
                ? {
                    height: [
                      `${staticH}%`,
                      `${Math.min(100, staticH + 30 + Math.random() * 20)}%`,
                      `${Math.max(10, staticH - 20)}%`,
                      `${Math.min(100, staticH + 10)}%`,
                      `${staticH}%`,
                    ],
                  }
                : { height: `${staticH}%` }
            }
            transition={
              playing
                ? {
                    duration: 0.4 + (i % 7) * 0.12,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.02,
                  }
                : { duration: 0.4, ease: 'easeOut' }
            }
          />
        )
      })}
    </div>
  )
}

// ─── Equalizer bars ───────────────────────────────────────────────────────────
function EqBars({ active, bars = 5, color = '#10B981' }: { active: boolean; bars?: number; color?: string }) {
  const shouldReduce = useReducedMotion()
  const speeds = [0.4, 0.55, 0.35, 0.6, 0.45]
  return (
    <div className="flex items-end gap-[2px] h-4" aria-hidden>
      {Array.from({ length: bars }).map((_, i) => (
        <motion.div
          key={i}
          style={{ background: color, width: '3px', borderRadius: '1px 1px 0 0' }}
          animate={
            active && !shouldReduce
              ? { height: ['30%', '90%', '50%', '100%', '40%'] }
              : { height: '20%' }
          }
          transition={
            active
              ? { duration: speeds[i % speeds.length], repeat: Infinity, delay: i * 0.08 }
              : { duration: 0.3 }
          }
        />
      ))}
    </div>
  )
}

// ─── Main hero player ─────────────────────────────────────────────────────────
function HeroPlayer({
  track,
  playing,
  onToggle,
}: {
  track: HomepageData['featuredTrack']
  playing: boolean
  onToggle: () => void
}) {
  const shouldReduce = useReducedMotion()

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Central play button */}
      <div className="flex flex-col items-center mb-10">
        <motion.button
          onClick={onToggle}
          className="relative w-28 h-28 rounded-full flex items-center justify-center mb-6 group"
          style={{
            background: 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, rgba(16,185,129,0.05) 100%)',
            border: '1px solid rgba(16,185,129,0.3)',
            boxShadow: playing ? '0 0 60px rgba(16,185,129,0.2)' : 'none',
          }}
          whileHover={shouldReduce ? {} : { scale: 1.05 }}
          whileTap={shouldReduce ? {} : { scale: 0.97 }}
          aria-label={playing ? 'Pause track' : 'Play track'}
        >
          {/* Rotating ring when playing */}
          {playing && !shouldReduce && (
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ border: '1px solid rgba(16,185,129,0.2)' }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            />
          )}
          {/* Pulse ring */}
          {playing && !shouldReduce && (
            <motion.div
              className="absolute inset-[-12px] rounded-full"
              style={{ border: '1px solid rgba(16,185,129,0.12)' }}
              animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
          <AnimatePresence mode="wait">
            {playing ? (
              <motion.span
                key="pause"
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.7, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Pause className="w-10 h-10 text-emerald-400" />
              </motion.span>
            ) : (
              <motion.span
                key="play"
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.7, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Play className="w-10 h-10 text-emerald-400 ml-1" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Track info */}
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-1">
          {track.title}
        </h2>
        <p className="text-sm text-white/35">
          {track.genre.join(' · ')} &nbsp;·&nbsp; {track.duration}
        </p>

        {/* Live badge */}
        <AnimatePresence>
          {playing && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="flex items-center gap-2 mt-3"
            >
              <motion.span
                className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              />
              <span className="text-[10px] text-emerald-400/60 tracking-[0.3em] uppercase">
                Now Playing
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Waveform */}
      <WaveformViz playing={playing} />

      {/* Controls row */}
      <div className="flex items-center justify-between mt-6 px-2">
        <Link
          href="/music-lab"
          className="text-[11px] text-white/25 hover:text-white/60 transition-colors uppercase tracking-wider"
        >
          Music Lab →
        </Link>
        <div className="flex items-center gap-3">
          <EqBars active={playing} />
          <span className="text-[11px] text-white/25 font-mono">{track.duration}</span>
        </div>
        <span className="text-[11px] text-white/20 hidden sm:block">
          {track.plays.toLocaleString()} plays
        </span>
      </div>
    </div>
  )
}

// ─── Genre card ("frequency channel") ────────────────────────────────────────
function GenreChannel({
  genre,
  index,
  playing,
}: {
  genre: string
  index: number
  playing: boolean
}) {
  const colors = [
    { bar: '#10B981', bg: 'rgba(16,185,129,0.07)', border: 'rgba(16,185,129,0.15)' },
    { bar: '#8B5CF6', bg: 'rgba(139,92,246,0.07)', border: 'rgba(139,92,246,0.15)' },
    { bar: '#06B6D4', bg: 'rgba(6,182,212,0.07)', border: 'rgba(6,182,212,0.15)' },
    { bar: '#F97316', bg: 'rgba(249,115,22,0.07)', border: 'rgba(249,115,22,0.15)' },
    { bar: '#EC4899', bg: 'rgba(236,72,153,0.07)', border: 'rgba(236,72,153,0.15)' },
    { bar: '#3B82F6', bg: 'rgba(59,130,246,0.07)', border: 'rgba(59,130,246,0.15)' },
  ]
  const color = colors[index % colors.length]
  return (
    <div
      className="p-3 flex flex-col gap-2"
      style={{ background: color.bg, border: `1px solid ${color.border}` }}
    >
      <div className="flex items-end justify-between">
        <EqBars active={playing} bars={4} color={color.bar} />
        <span className="text-[9px] text-white/25 tracking-widest uppercase font-mono">
          CH {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <p className="text-[11px] font-semibold text-white/70 truncate">{genre}</p>
    </div>
  )
}

// ─── Station card (product as radio preset) ───────────────────────────────────
function StationCard({
  product,
  index,
  playing,
}: {
  product: HomepageData['products'][0]
  index: number
  playing: boolean
}) {
  const colorMap: Record<string, { accent: string; dim: string }> = {
    emerald: { accent: '#10B981', dim: 'rgba(16,185,129,0.1)' },
    violet: { accent: '#8B5CF6', dim: 'rgba(139,92,246,0.1)' },
    cyan: { accent: '#06B6D4', dim: 'rgba(6,182,212,0.1)' },
    blue: { accent: '#3B82F6', dim: 'rgba(59,130,246,0.1)' },
    orange: { accent: '#F97316', dim: 'rgba(249,115,22,0.1)' },
    magenta: { accent: '#EC4899', dim: 'rgba(236,72,153,0.1)' },
  }
  const c = colorMap[product.color] ?? colorMap.emerald
  const freqs = ['88.5', '91.1', '94.7', '97.3', '101.5', '104.9']

  return (
    <Link href={product.href} className="group block">
      <div
        className="p-5 transition-all"
        style={{
          border: `1px solid rgba(255,255,255,0.07)`,
          background: 'rgba(255,255,255,0.02)',
        }}
      >
        {/* Top row */}
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: c.dim, border: `1px solid ${c.accent}30` }}
          >
            <Radio className="w-3 h-3" style={{ color: c.accent }} />
          </div>
          <span
            className="text-[10px] font-mono"
            style={{ color: `${c.accent}50` }}
          >
            {freqs[index % freqs.length]} FM
          </span>
        </div>

        {/* Station name */}
        <h3
          className="text-[13px] font-bold mb-1 transition-colors"
          style={{ color: 'rgba(255,255,255,0.85)' }}
        >
          {product.title}
        </h3>
        <p className="text-[11px] text-white/35 leading-snug mb-4">{product.description}</p>

        {/* Eq + tune in */}
        <div className="flex items-center justify-between">
          <EqBars active={playing && index === 0} bars={4} color={c.accent} />
          <span
            className="text-[10px] uppercase tracking-wider group-hover:opacity-100 opacity-0 transition-opacity"
            style={{ color: c.accent }}
          >
            Tune In →
          </span>
        </div>
      </div>
    </Link>
  )
}

// ─── Setlist item ─────────────────────────────────────────────────────────────
function SetlistItem({
  post,
  index,
}: {
  post: HomepageData['latestPosts'][0]
  index: number
}) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <div
        className="grid items-center gap-4 py-3 px-4 transition-colors hover:bg-white/[0.03]"
        style={{
          gridTemplateColumns: '28px 1fr auto',
          borderBottom: '1px solid rgba(255,255,255,0.04)',
        }}
      >
        <span className="text-[11px] font-mono text-white/20" style={{ fontVariantNumeric: 'tabular-nums' }}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="min-w-0">
          <p className="text-[13px] font-medium text-white/85 group-hover:text-emerald-400 transition-colors line-clamp-1">
            {post.title}
          </p>
          <p className="text-[10px] text-white/25 mt-0.5 uppercase tracking-wide">
            {post.category} &nbsp;·&nbsp; {post.readingTime}
          </p>
        </div>
        <span className="text-[10px] text-white/20 font-mono">{post.date}</span>
      </div>
    </Link>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function HomeV9({
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
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)

  useEffect(() => {
    trackEvent('homepage_view', { variation: 'v9-audio-visual' })
  }, [])

  useEffect(() => {
    const a = audioRef.current
    if (!a) return
    const end = () => setPlaying(false)
    a.addEventListener('ended', end)
    return () => a.removeEventListener('ended', end)
  }, [])

  const toggle = useCallback(() => {
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
      trackEvent('homepage_track_play', { variation: 'v9-audio-visual', title: featuredTrack.title })
    }
    setPlaying((p) => !p)
  }, [playing, featuredTrack.title])

  const toggleMute = useCallback(() => {
    if (!audioRef.current) return
    audioRef.current.muted = !muted
    setMuted((m) => !m)
  }, [muted])

  // Unique genres from products for the frequency channel display
  const genres = ['Pop', 'Neoclassical', 'Electronic', 'Hip Hop', 'Dance', 'Orchestral', 'Ambient', 'House']

  // Arcanea images that always exist, as fallback for design lab
  const visualImages = designLabImages.length > 0
    ? designLabImages
    : [
        { src: '/images/golden-age/golden-age-hero-council-v2.png', alt: 'Golden Age Council' },
        { src: '/images/golden-age/starlight-intelligence-v2.png', alt: 'Starlight Intelligence' },
        { src: '/images/arcanea/eldrian-conclave-20260301.png', alt: 'Eldrian Conclave' },
        { src: '/images/arcanea/eldrian-aethelin-20260228.png', alt: 'Eldrian Aethelin' },
        { src: '/images/arcanea/eldrian-korghast-20260228.png', alt: 'Eldrian Korghast' },
        { src: '/images/golden-age/automation-empire-v1.png', alt: 'Automation Empire' },
      ]

  return (
    <main
      className="relative min-h-screen bg-[#050505] text-white overflow-x-hidden"
      style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' }}
    >
      <audio ref={audioRef} src={featuredTrack.audioUrl} preload="none" />

      {/* ── AMBIENT BACKGROUND ────────────────────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden>
        {/* Emerald radial glow, intensifies when playing */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(16,185,129,0.04) 0%, transparent 70%)',
          }}
          animate={playing && !shouldReduce ? { scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] } : { scale: 1, opacity: 0.6 }}
          transition={{ duration: 3, repeat: playing ? Infinity : 0 }}
        />
        {/* Floating particles */}
        {!shouldReduce && Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-px rounded-full"
            style={{
              left: `${10 + i * 12}%`,
              top: `${15 + (i % 3) * 25}%`,
              background: `rgba(16,185,129,${0.15 + (i % 3) * 0.1})`,
              width: i % 2 === 0 ? '2px' : '1px',
              height: i % 2 === 0 ? '2px' : '1px',
            }}
            animate={{ y: [0, -40, 0], opacity: [0.1, 0.5, 0.1] }}
            transition={{ duration: 5 + i * 0.8, repeat: Infinity, delay: i * 0.6 }}
          />
        ))}
      </div>

      {/* ── MINIMAL NAV ───────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
        style={{ background: 'linear-gradient(to bottom, rgba(5,5,5,0.9) 0%, transparent 100%)' }}
      >
        <Link href="/" className="text-[13px] font-bold tracking-[0.1em] uppercase text-white/80 hover:text-emerald-400 transition-colors">
          FRANKX
        </Link>
        <div className="flex items-center gap-5">
          {[['Blog', '/blog'], ['Music', '/music-lab'], ['Tools', '/acos']].map(([l, h]) => (
            <Link key={l} href={h} className="text-[11px] text-white/30 hover:text-white/70 transition-colors uppercase tracking-wider">
              {l}
            </Link>
          ))}
          {/* Mute toggle */}
          <button
            onClick={toggleMute}
            className="text-white/25 hover:text-white/60 transition-colors"
            aria-label={muted ? 'Unmute' : 'Mute'}
          >
            {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* ── HERO — FULL SCREEN MUSIC EXPERIENCE ───────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 pb-16">
        {/* Large background waveform decoration */}
        <div className="absolute inset-x-0 bottom-32 opacity-10 px-0 pointer-events-none" aria-hidden>
          <WaveformViz playing={playing} count={80} />
        </div>

        <div className="relative z-10 w-full max-w-4xl text-center">
          {/* Pre-headline */}
          <motion.p
            initial={shouldReduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[10px] tracking-[0.4em] uppercase text-emerald-400/40 mb-8"
          >
            FrankX.AI &nbsp;·&nbsp; Press Play to Begin
          </motion.p>

          {/* H1 */}
          <motion.h1
            initial={shouldReduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-bold tracking-tight leading-none mb-6 text-[clamp(2.5rem,8vw,5.5rem)]"
          >
            12,000 tracks.
            <br />
            <span style={{ color: '#10B981' }}>One studio.</span>
          </motion.h1>

          <motion.p
            initial={shouldReduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-[15px] text-white/35 max-w-md mx-auto mb-14"
          >
            AI Architect at Oracle. Music creator. Everything connected, everything playing.
          </motion.p>

          {/* The hero player */}
          <motion.div
            initial={shouldReduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <HeroPlayer track={featuredTrack} playing={playing} onToggle={toggle} />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
          animate={shouldReduce ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-px h-8 bg-gradient-to-b from-transparent to-white/15" />
          <span className="text-[9px] text-white/15 tracking-widest uppercase">Scroll</span>
        </motion.div>
      </section>

      {/* ── CREDENTIALS BAR ───────────────────────────────────────────────── */}
      <div
        className="border-y py-3 px-6"
        style={{ borderColor: 'rgba(255,255,255,0.04)' }}
      >
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-x-8 gap-y-1">
          {credentials.map((c) => (
            <span key={c} className="text-[10px] text-white/20 uppercase tracking-widest">{c}</span>
          ))}
        </div>
      </div>

      {/* ── NOW PLAYING — EXPANDED PLAYER ─────────────────────────────────── */}
      <section className="py-16 px-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={shouldReduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center sm:items-start gap-8"
          >
            {/* Album art representation */}
            <div
              className="w-32 h-32 flex-shrink-0 flex items-center justify-center relative overflow-hidden"
              style={{
                border: '1px solid rgba(16,185,129,0.2)',
                background: 'rgba(16,185,129,0.04)',
              }}
            >
              <Image
                src="/images/mascot/frank-omega-pixar-v1.png"
                alt="FrankX"
                fill
                className="object-cover opacity-60"
                sizes="128px"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent" />
              {/* Playing indicator overlay */}
              {playing && (
                <motion.div
                  className="absolute inset-0 flex items-end justify-center pb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <EqBars active bars={6} color="#10B981" />
                </motion.div>
              )}
            </div>

            {/* Track details */}
            <div className="flex-1 min-w-0 text-center sm:text-left">
              <p className="text-[10px] text-emerald-400/40 tracking-[0.3em] uppercase mb-2">
                {playing ? 'Now Playing' : 'Featured Track'}
              </p>
              <h2 className="text-2xl font-bold text-white mb-1">{featuredTrack.title}</h2>
              <p className="text-sm text-white/30 mb-6">
                {featuredTrack.genre.join(' / ')} &nbsp;·&nbsp; {featuredTrack.duration}
              </p>

              {/* Controls */}
              <div className="flex items-center gap-4 justify-center sm:justify-start">
                <button
                  onClick={toggle}
                  className="flex items-center gap-2 px-5 py-2.5 transition-all text-sm font-semibold"
                  style={{
                    background: playing ? 'rgba(16,185,129,0.1)' : 'rgba(16,185,129,0.9)',
                    border: '1px solid rgba(16,185,129,0.3)',
                    color: playing ? '#10B981' : '#000',
                  }}
                >
                  {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {playing ? 'Pause' : 'Play Track'}
                </button>

                <Link
                  href="/music-lab"
                  className="flex items-center gap-2 text-sm text-white/30 hover:text-white/70 transition-colors"
                >
                  <SkipForward className="w-4 h-4" />
                  More Tracks
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Full-width waveform under card */}
          <div className="mt-8">
            <WaveformViz playing={playing} count={60} />
          </div>
        </div>
      </section>

      {/* ── FREQUENCY CHANNELS (genre grid) ──────────────────────────────── */}
      <section className="py-16 px-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={shouldReduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 flex items-end justify-between"
          >
            <div>
              <p className="text-[10px] text-emerald-400/40 tracking-[0.3em] uppercase mb-1">Spectrum</p>
              <h2 className="text-2xl font-bold">Frequency Channels</h2>
            </div>
            <Link href="/music-lab" className="text-[11px] text-emerald-400/50 hover:text-emerald-400 transition-colors">
              Full Library →
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px" style={{ background: 'rgba(255,255,255,0.04)' }}>
            {genres.map((genre, i) => (
              <motion.div
                key={genre}
                initial={shouldReduce ? false : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <GenreChannel genre={genre} index={i} playing={playing} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATIONS — Products as radio presets ──────────────────────────── */}
      <section className="py-16 px-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={shouldReduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <p className="text-[10px] text-emerald-400/40 tracking-[0.3em] uppercase mb-1">Presets</p>
            <h2 className="text-2xl font-bold">Studio Stations</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: 'rgba(255,255,255,0.04)' }}>
            {products.map((p, i) => (
              <motion.div
                key={p.title}
                initial={shouldReduce ? false : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <StationCard product={p} index={i} playing={playing} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE SETLIST — Blog posts ───────────────────────────────────────── */}
      <section className="py-16 px-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={shouldReduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 flex items-end justify-between"
          >
            <div>
              <p className="text-[10px] text-emerald-400/40 tracking-[0.3em] uppercase mb-1">Program</p>
              <h2 className="text-2xl font-bold">The Setlist</h2>
            </div>
            <Link href="/blog" className="text-[11px] text-emerald-400/50 hover:text-emerald-400 transition-colors">
              Full Archive →
            </Link>
          </motion.div>

          {/* Column header */}
          <div
            className="grid gap-4 px-4 py-2 text-[9px] tracking-[0.2em] uppercase text-white/12 mb-0"
            style={{
              gridTemplateColumns: '28px 1fr auto',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <span>#</span>
            <span>Title</span>
            <span>Date</span>
          </div>

          {latestPosts.slice(0, 6).map((post, i) => (
            <motion.div
              key={post.slug}
              initial={shouldReduce ? false : { opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <SetlistItem post={post} index={i} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── VISUAL FREQUENCIES — Design lab ───────────────────────────────── */}
      <section className="py-16 px-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={shouldReduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <p className="text-[10px] text-emerald-400/40 tracking-[0.3em] uppercase mb-1">Visual</p>
            <h2 className="text-2xl font-bold">Visual Frequencies</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-px" style={{ background: 'rgba(255,255,255,0.04)' }}>
            {visualImages.slice(0, 6).map((img, i) => (
              <motion.div
                key={img.src}
                initial={shouldReduce ? false : { opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="relative aspect-square overflow-hidden group bg-black"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="33vw"
                />
                {/* Waveform overlay on hover */}
                <div className="absolute inset-x-0 bottom-0 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-2 pb-2">
                  <WaveformViz playing={playing} count={20} />
                </div>
                <div className="absolute inset-0 bg-emerald-950/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
          <div className="mt-3 text-right">
            <Link href="/design-lab" className="text-[11px] text-emerald-400/50 hover:text-emerald-400 transition-colors">
              Design Lab →
            </Link>
          </div>
        </div>
      </section>

      {/* ── THE B-SIDES — Books in album art style ────────────────────────── */}
      {books.length > 0 && (
        <section className="py-16 px-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={shouldReduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <p className="text-[10px] text-emerald-400/40 tracking-[0.3em] uppercase mb-1">Catalog</p>
              <h2 className="text-2xl font-bold">The B-Sides</h2>
            </motion.div>

            <div className="flex gap-5 overflow-x-auto pb-4">
              {books.map((book, i) => (
                <motion.div
                  key={book.slug}
                  initial={shouldReduce ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex-shrink-0"
                >
                  <Link href={`/books/${book.slug}`} className="group block w-[140px]">
                    {/* Square crop — album art style */}
                    <div
                      className="relative w-[140px] h-[140px] overflow-hidden mb-3"
                      style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                    >
                      <Image
                        src={book.coverImage}
                        alt={book.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="140px"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                      {/* EQ overlay */}
                      <div className="absolute bottom-2 left-2">
                        <EqBars active={playing} bars={4} color="rgba(16,185,129,0.7)" />
                      </div>
                    </div>
                    <p className="text-[12px] font-semibold text-white/80 group-hover:text-emerald-400 transition-colors line-clamp-1">
                      {book.title}
                    </p>
                    <p className="text-[10px] text-white/25 line-clamp-1 mt-0.5">{book.subtitle}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── BONUS TRACKS — Learning cards ────────────────────────────────── */}
      <section className="py-16 px-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={shouldReduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <p className="text-[10px] text-emerald-400/40 tracking-[0.3em] uppercase mb-1">Extras</p>
            <h2 className="text-2xl font-bold">Bonus Tracks</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-px" style={{ background: 'rgba(255,255,255,0.04)' }}>
            {learningCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={shouldReduce ? false : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link href={card.href} className="group block bg-[#050505] p-5 hover:bg-white/[0.02] transition-colors">
                  <div className="flex items-start gap-4">
                    {/* Thumbnail */}
                    <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        className="object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                        sizes="80px"
                      />
                    </div>
                    <div className="flex-1 min-w-0 pt-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-[12px] font-bold text-white/80 group-hover:text-emerald-400 transition-colors">
                          {card.title}
                        </p>
                        <span className="text-[9px] text-white/15 font-mono uppercase">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <p className="text-[11px] text-white/30 leading-snug">{card.description}</p>
                      <div className="mt-2">
                        <EqBars active={playing && i === 0} bars={4} color="rgba(16,185,129,0.5)" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SUBSCRIBE TO THE FREQUENCY ────────────────────────────────────── */}
      <section className="py-24 px-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={shouldReduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <EqBars active bars={5} color="#10B981" />
              <span className="text-[10px] text-emerald-400/40 tracking-[0.3em] uppercase mx-3">On Air</span>
              <EqBars active bars={5} color="#10B981" />
            </div>
            <h2 className="text-3xl font-bold mb-3">Subscribe to the Frequency</h2>
            <p className="text-[14px] text-white/35 mb-10 max-w-sm mx-auto">
              AI architecture, music production, creator workflows. One newsletter. Always worth reading.
            </p>
            <div className="max-w-sm mx-auto">
              <EmailSignup
                listType="newsletter"
                placeholder="your@email.com"
                buttonText="Tune In"
                compact
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────────────── */}
      {faqs.length > 0 && (
        <section className="py-16 px-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={shouldReduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8 text-center"
            >
              <p className="text-[10px] text-emerald-400/40 tracking-[0.3em] uppercase mb-1">Liner Notes</p>
              <h2 className="text-2xl font-bold">Frequently Asked</h2>
            </motion.div>

            <div className="space-y-0">
              {faqs.map((faq, i) => (
                <motion.details
                  key={i}
                  initial={shouldReduce ? false : { opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="group"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                >
                  <summary className="cursor-pointer py-4 px-0 text-[13px] font-medium text-white/70 hover:text-white transition-colors list-none flex justify-between items-center">
                    {faq.question}
                    <span className="text-white/25 group-open:rotate-45 transition-transform duration-200 ml-4 flex-shrink-0 text-lg leading-none">
                      +
                    </span>
                  </summary>
                  <div className="pb-4 text-[12px] text-white/40 leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FOOTER ──────────────────────────────────────────────────────────── */}
      <footer className="px-6 py-8">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <EqBars active={playing} bars={4} color="rgba(16,185,129,0.4)" />
              <span className="text-[10px] font-mono text-white/20">frankx.ai // v9.audio-visual</span>
            </div>
            <p className="text-[9px] text-white/10">&copy; {new Date().getFullYear()} Frank Riemer</p>
          </div>
          <Link
            href="/home"
            className="text-[10px] text-emerald-400/40 hover:text-emerald-400 transition-colors tracking-wider uppercase"
          >
            All Variations →
          </Link>
        </div>
      </footer>
    </main>
  )
}
