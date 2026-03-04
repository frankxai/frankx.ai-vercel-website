'use client'

import { motion, useReducedMotion, useInView } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useRef, useState, useCallback, useEffect } from 'react'
import {
  ArrowRight, Play, Pause, Music, Code, BookOpen,
  Palette, Cpu, Sparkles, Zap, Globe, ExternalLink,
} from 'lucide-react'
import { trackEvent } from '@/lib/analytics'
import { EmailSignup } from '@/components/email-signup'
import type { HomepageData } from '@/lib/homepage-data'

// ─────────────────────────────────────────────────────────────
// Counter hook with intersection observer
// ─────────────────────────────────────────────────────────────

function useCounter(target: number, duration = 1800) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!inView) return
    if (reduce) { setCount(target); return }
    let startTime: number
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
      else setCount(target)
    }
    requestAnimationFrame(step)
  }, [inView, target, duration, reduce])

  return { count, ref }
}

// ─────────────────────────────────────────────────────────────
// Bento cell component
// ─────────────────────────────────────────────────────────────

type GlowColor = 'emerald' | 'violet' | 'cyan' | 'amber' | 'orange' | 'magenta' | 'none'

const glowStyles: Record<GlowColor, string> = {
  emerald: 'hover:shadow-emerald-500/10 hover:border-emerald-500/30',
  violet: 'hover:shadow-violet-500/10 hover:border-violet-500/30',
  cyan: 'hover:shadow-cyan-500/10 hover:border-cyan-500/30',
  amber: 'hover:shadow-amber-500/10 hover:border-amber-500/30',
  orange: 'hover:shadow-orange-500/10 hover:border-orange-500/30',
  magenta: 'hover:shadow-pink-500/10 hover:border-pink-500/30',
  none: 'hover:border-white/20',
}

const dotColors: Record<string, string> = {
  emerald: 'bg-emerald-400',
  violet: 'bg-violet-400',
  cyan: 'bg-cyan-400',
  blue: 'bg-blue-400',
  orange: 'bg-orange-400',
  magenta: 'bg-pink-400',
}

function Cell({
  children,
  href,
  className = '',
  glow = 'none',
  delay = 0,
  colSpan = '',
  rowSpan = '',
  as: Tag = 'div',
}: {
  children: React.ReactNode
  href?: string
  className?: string
  glow?: GlowColor
  delay?: number
  colSpan?: string
  rowSpan?: string
  as?: 'div' | 'section'
}) {
  const reduce = useReducedMotion()
  const inner = (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 16, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`
        h-full rounded-2xl border border-white/[0.07]
        bg-white/[0.025] backdrop-blur-xl
        shadow-lg ${glowStyles[glow]}
        hover:bg-white/[0.05]
        transition-all duration-300
        overflow-hidden
        ${className}
      `}
    >
      {children}
    </motion.div>
  )

  const spanClasses = `${colSpan} ${rowSpan}`

  if (href) {
    return (
      <Link href={href} className={`group block ${spanClasses}`}>
        {inner}
      </Link>
    )
  }
  return <Tag className={spanClasses}>{inner}</Tag>
}

// ─────────────────────────────────────────────────────────────
// Animated stat with counter
// ─────────────────────────────────────────────────────────────

function StatCounter({
  target,
  label,
  suffix = '',
  prefix = '',
}: {
  target: number
  label: string
  suffix?: string
  prefix?: string
}) {
  const { count, ref } = useCounter(target, 2000)
  return (
    <div ref={ref}>
      <p className="text-3xl lg:text-4xl font-bold text-white tabular-nums tracking-tight">
        {prefix}{count.toLocaleString()}<span className="text-emerald-400">{suffix}</span>
      </p>
      <p className="text-xs text-white/40 mt-1 font-medium">{label}</p>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// EQ bars animation
// ─────────────────────────────────────────────────────────────

function EQBars({ active }: { active: boolean }) {
  const reduce = useReducedMotion()
  if (reduce) return null
  return (
    <div className="flex items-end gap-0.5 h-5">
      {[0.4, 1, 0.6, 0.8, 0.5, 0.9, 0.7].map((h, i) => (
        <motion.div
          key={i}
          className="w-1 rounded-full bg-emerald-400/70"
          animate={active ? { height: [`${h * 50}%`, '100%', `${h * 40}%`] } : { height: '30%' }}
          transition={{ duration: 0.5 + i * 0.07, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// Music player cell
// ─────────────────────────────────────────────────────────────

function PlayerCell({ track }: { track: HomepageData['featuredTrack'] }) {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const toggle = useCallback(() => {
    const a = audioRef.current
    if (!a) return
    if (playing) {
      a.pause()
    } else {
      a.play()
      trackEvent('homepage_track_play', { variation: 'v2-bento', title: track.title })
    }
    setPlaying(!playing)
  }, [playing, track.title])

  useEffect(() => {
    const a = audioRef.current
    if (!a) return
    const end = () => setPlaying(false)
    a.addEventListener('ended', end)
    return () => a.removeEventListener('ended', end)
  }, [])

  return (
    <div className="p-5 h-full flex flex-col">
      <audio ref={audioRef} src={track.audioUrl} preload="none" />
      <div className="flex items-center justify-between mb-4">
        <p className="text-[10px] text-white/30 uppercase tracking-widest font-medium">Now Playing</p>
        <EQBars active={playing} />
      </div>
      <div className="flex items-center gap-3 flex-1">
        <button
          onClick={toggle}
          className="w-11 h-11 rounded-xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center hover:bg-emerald-500/25 transition-colors flex-shrink-0"
          aria-label={playing ? 'Pause' : 'Play'}
        >
          {playing
            ? <Pause className="w-4 h-4 text-emerald-400" />
            : <Play className="w-4 h-4 text-emerald-400 ml-0.5" />
          }
        </button>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-white truncate">{track.title}</p>
          <p className="text-xs text-white/40 truncate">{track.genre.slice(0, 2).join(', ')}</p>
        </div>
      </div>
      <Link
        href="/music"
        className="mt-3 text-[10px] text-white/25 hover:text-emerald-400 transition-colors flex items-center gap-1"
      >
        <Music className="w-3 h-3" />
        12,000+ tracks →
      </Link>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// Product color system
// ─────────────────────────────────────────────────────────────

const productIconMap: Record<string, React.ReactNode> = {
  'Agentic Creator OS': <Code className="w-5 h-5" />,
  'Prompt Library': <Sparkles className="w-5 h-5" />,
  'Music Lab': <Music className="w-5 h-5" />,
  'Design Lab': <Palette className="w-5 h-5" />,
  'AI Architecture Hub': <Cpu className="w-5 h-5" />,
  'Creator Kit': <BookOpen className="w-5 h-5" />,
}

const productColorMap: Record<string, { glow: GlowColor; icon: string; dot: string }> = {
  emerald: { glow: 'emerald', icon: 'text-emerald-400', dot: 'bg-emerald-400' },
  violet: { glow: 'violet', icon: 'text-violet-400', dot: 'bg-violet-400' },
  cyan: { glow: 'cyan', icon: 'text-cyan-400', dot: 'bg-cyan-400' },
  blue: { glow: 'cyan', icon: 'text-blue-400', dot: 'bg-blue-400' },
  orange: { glow: 'orange', icon: 'text-orange-400', dot: 'bg-orange-400' },
  magenta: { glow: 'magenta', icon: 'text-pink-400', dot: 'bg-pink-400' },
}

// ─────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────

export default function HomeV2({
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
    trackEvent('homepage_view', { variation: 'v2-bento' })
  }, [])

  return (
    <main className="relative min-h-screen bg-[#0a0a0b] text-white overflow-x-hidden">

      {/* Subtle grid texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 opacity-[0.015]"
        style={{
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-24">

        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <p className="text-[10px] uppercase tracking-[0.3em] text-emerald-400/50 mb-2">Command Center</p>
          <h1 className="text-5xl font-bold tracking-tight">
            FrankX<span className="text-emerald-400">.</span>
          </h1>
          <p className="text-white/30 mt-2 text-sm max-w-md">
            AI Architect at Oracle · 12,000+ AI songs · 75+ open-source skills
          </p>
        </motion.div>

        {/* ── BENTO GRID ───────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 auto-rows-auto">

          {/* ROW 1: Hero + Now Playing */}

          {/* Hero cell — span 2 */}
          <Cell
            colSpan="sm:col-span-2"
            glow="emerald"
            delay={0}
            className="relative min-h-[220px] p-8"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent rounded-2xl pointer-events-none" />
            <div className="relative z-10">
              <p className="text-xs text-emerald-400/60 uppercase tracking-widest mb-4">AI Architect & Creator</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-[1.1] mb-4">
                Building intelligence<br />
                that <span className="text-emerald-400">compounds.</span>
              </h2>
              <p className="text-white/40 text-sm mb-6 max-w-sm">
                Enterprise AI systems. 12,000+ AI songs. Open-source creative OS. Everything documented.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/start"
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black px-5 py-2.5 text-sm font-semibold transition-colors"
                >
                  Start Here <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] text-white px-5 py-2.5 text-sm font-medium transition-colors"
                >
                  Read the Blog
                </Link>
              </div>
            </div>
          </Cell>

          {/* Now Playing cell */}
          <Cell glow="emerald" delay={0.05}>
            <PlayerCell track={featuredTrack} />
          </Cell>

          {/* ROW 2: Stats full width */}
          <Cell colSpan="sm:col-span-2 lg:col-span-3" delay={0.1} className="p-6 sm:p-8">
            <p className="text-[10px] text-white/25 uppercase tracking-widest mb-6">Live Stats</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              <StatCounter target={12000} label="AI Songs" suffix="+" />
              <StatCounter target={75} label="Open Source Skills" suffix="+" />
              <StatCounter target={38} label="Active Agents" />
              <StatCounter target={books.length} label="Books Published" />
            </div>
          </Cell>

          {/* ROW 3: Products (6 cells) */}
          {products.map((p, i) => {
            const colorKey = p.color as string
            const colorConf = productColorMap[colorKey] || productColorMap.emerald
            return (
              <Cell
                key={p.title}
                href={p.href}
                glow={colorConf.glow}
                delay={0.12 + i * 0.05}
                className="p-5"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`${colorConf.icon} opacity-70 group-hover:opacity-100 transition-opacity`}>
                    {productIconMap[p.title] || <Zap className="w-5 h-5" />}
                  </div>
                  <div className={`w-2 h-2 rounded-full ${colorConf.dot} opacity-40 group-hover:opacity-100 transition-opacity`} />
                </div>
                <h3 className="text-sm font-semibold text-white mb-1.5 group-hover:text-white transition-colors leading-snug">
                  {p.title}
                </h3>
                <p className="text-xs text-white/35 leading-relaxed flex-1">{p.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-[10px] text-white/20 group-hover:text-white/50 transition-colors">
                  Explore <ArrowRight className="w-3 h-3" />
                </span>
              </Cell>
            )
          })}

          {/* ROW 4: Featured post (span 2) + Books */}
          {latestPosts[0] && (
            <Cell
              href={`/blog/${latestPosts[0].slug}`}
              colSpan="sm:col-span-2"
              glow="none"
              delay={0.2}
              className="p-0"
            >
              {latestPosts[0].image && (
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={latestPosts[0].image}
                    alt={latestPosts[0].title}
                    fill
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-[#0a0a0b]/40 to-transparent" />
                  <span className="absolute top-3 left-3 text-[10px] font-medium px-2 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white/60 uppercase tracking-wider">
                    {latestPosts[0].category}
                  </span>
                </div>
              )}
              <div className="p-5">
                <h3 className="text-base font-semibold text-white group-hover:text-emerald-400 transition-colors line-clamp-2 mb-2">
                  {latestPosts[0].title}
                </h3>
                <p className="text-xs text-white/35 line-clamp-2">{latestPosts[0].description}</p>
                <p className="text-[10px] text-white/25 mt-3">{latestPosts[0].readingTime}</p>
              </div>
            </Cell>
          )}

          {/* Books cell */}
          <Cell glow="amber" delay={0.22} className="p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] text-white/30 uppercase tracking-widest">Library</p>
              <BookOpen className="w-3.5 h-3.5 text-amber-400/50" />
            </div>
            <div className="flex gap-2 mb-4 overflow-x-auto">
              {books.slice(0, 4).map((book) => (
                <Link key={book.slug} href={`/books/${book.slug}`} className="flex-shrink-0 w-[58px]">
                  <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                    <Image src={book.coverImage} alt={book.title} fill className="object-cover" sizes="58px" />
                  </div>
                </Link>
              ))}
            </div>
            <p className="text-sm font-medium text-white">{books.length} Books</p>
            <Link href="/books" className="text-[10px] text-white/25 hover:text-amber-400 transition-colors mt-1 block">
              Browse library →
            </Link>
          </Cell>

          {/* ROW 5: Design Lab (wide) + extra article */}
          <Cell colSpan="sm:col-span-2" glow="magenta" delay={0.25} className="p-0">
            <div className="grid grid-cols-3 h-48">
              {designLabImages.slice(0, 3).map((img, i) => (
                <div key={img.src} className="relative overflow-hidden group/img">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover group-hover/img:scale-110 transition-transform duration-600"
                    sizes="200px"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover/img:bg-transparent transition-colors" />
                </div>
              ))}
            </div>
            <div className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-white">Design Lab</p>
                <p className="text-xs text-white/35">Nature-tech visual experiments</p>
              </div>
              <Link
                href="/design-lab"
                className="text-[10px] text-pink-400/60 hover:text-pink-400 transition-colors flex items-center gap-1"
              >
                View all <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </Cell>

          {/* Extra article card */}
          {latestPosts[1] && (
            <Cell href={`/blog/${latestPosts[1].slug}`} glow="none" delay={0.28} className="p-0">
              {latestPosts[1].image && (
                <div className="relative h-32 overflow-hidden">
                  <Image
                    src={latestPosts[1].image}
                    alt={latestPosts[1].title}
                    fill
                    className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
                    sizes="33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-transparent" />
                </div>
              )}
              <div className="p-4">
                <p className="text-[10px] text-white/25 uppercase tracking-wider mb-1">{latestPosts[1].category}</p>
                <p className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors line-clamp-2">
                  {latestPosts[1].title}
                </p>
              </div>
            </Cell>
          )}

          {/* ROW 6: 3 article cards */}
          <Cell colSpan="sm:col-span-2 lg:col-span-3" delay={0.3} className="p-6">
            <div className="flex items-center justify-between mb-5">
              <p className="text-[10px] text-white/25 uppercase tracking-widest">Latest Articles</p>
              <Link href="/blog" className="text-[10px] text-white/25 hover:text-emerald-400 transition-colors uppercase tracking-widest flex items-center gap-1">
                View all <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {latestPosts.slice(2, 5).map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group/post flex items-start gap-3 rounded-xl bg-white/[0.03] p-3 hover:bg-white/[0.06] transition-colors border border-white/[0.04] hover:border-white/[0.1]"
                >
                  {post.image && (
                    <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                      <Image src={post.image} alt={post.title} fill className="object-cover" sizes="56px" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white group-hover/post:text-emerald-400 transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </p>
                    <p className="text-[10px] text-white/25 mt-1">{post.category} · {post.readingTime}</p>
                  </div>
                </Link>
              ))}
            </div>
          </Cell>

          {/* ROW 7: Learning cards (2) + Newsletter */}
          {learningCards && learningCards.slice(0, 2).map((card, i) => (
            <Cell key={card.href} href={card.href} glow="cyan" delay={0.33 + i * 0.04} className="p-0">
              <div className="relative h-28 overflow-hidden">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
                  sizes="33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] to-transparent" />
              </div>
              <div className="p-4">
                <h3 className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors leading-snug">
                  {card.title}
                </h3>
                <p className="text-xs text-white/35 mt-1 line-clamp-2">{card.description}</p>
              </div>
            </Cell>
          ))}

          {/* Newsletter cell */}
          <Cell glow="violet" delay={0.38} className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <Globe className="w-4 h-4 text-violet-400/60" />
              <p className="text-[10px] text-white/30 uppercase tracking-widest">Weekly Dispatch</p>
            </div>
            <p className="text-sm font-semibold text-white mb-1">Creation Chronicles</p>
            <p className="text-xs text-white/35 mb-4 leading-relaxed">
              AI architecture and creative systems. No spam. Unsubscribe any time.
            </p>
            <EmailSignup
              listType="newsletter"
              placeholder="your@email.com"
              buttonText="Subscribe"
              compact
            />
          </Cell>

          {/* ROW 8: Credentials strip */}
          <Cell colSpan="sm:col-span-2 lg:col-span-3" delay={0.42} className="p-5">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {credentials.map((c) => (
                <span key={c} className="text-xs text-white/25 font-medium tracking-wide">{c}</span>
              ))}
            </div>
          </Cell>

          {/* ROW 9: FAQ */}
          {faqs.length > 0 && (
            <Cell colSpan="sm:col-span-2 lg:col-span-3" delay={0.45} className="p-6 sm:p-8">
              <p className="text-[10px] text-white/25 uppercase tracking-widest mb-6">Frequently Asked</p>
              <div className="grid sm:grid-cols-2 gap-5">
                {faqs.slice(0, 6).map((faq, i) => (
                  <div key={i} className="rounded-xl bg-white/[0.02] p-4 border border-white/[0.05]">
                    <p className="text-sm font-semibold text-white/80 mb-2 leading-snug">{faq.question}</p>
                    <p className="text-xs text-white/35 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </Cell>
          )}

          {/* ROW 10: Final CTA */}
          <Cell
            colSpan="sm:col-span-2 lg:col-span-3"
            glow="emerald"
            delay={0.48}
            className="relative p-10 text-center min-h-[200px] flex flex-col items-center justify-center"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/8 via-transparent to-violet-500/5 pointer-events-none rounded-2xl" />
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Ready to build?</h2>
            <p className="text-white/40 text-sm mb-6 max-w-sm">
              Pick your path — AI architecture, creative systems, or music production.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/start"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black px-6 py-3 font-semibold text-sm transition-colors"
              >
                Start Here <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/coaching"
                className="inline-flex items-center gap-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] text-white px-6 py-3 font-medium text-sm transition-colors"
              >
                Work with Frank
              </Link>
            </div>
          </Cell>

        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/[0.05] px-6 py-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/20">
          <span>frankx.ai &nbsp;·&nbsp; v2.bento &nbsp;·&nbsp; © {new Date().getFullYear()} Frank Riemer</span>
          <Link href="/home" className="hover:text-white/50 transition-colors flex items-center gap-1">
            all variations <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </footer>
    </main>
  )
}
