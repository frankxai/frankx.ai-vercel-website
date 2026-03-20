'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useRef, useState, useCallback, useEffect } from 'react'
import { ArrowRight, Play, Pause, ChevronRight } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'
import { EmailSignup } from '@/components/email-signup'
import type { HomepageData } from '@/lib/homepage-data'

// ─── Color map for product dots ──────────────────────────────────────────────
const COLOR_DOT: Record<string, string> = {
  emerald: '#10B981',
  violet: '#8B5CF6',
  cyan: '#06B6D4',
  blue: '#3B82F6',
  orange: '#F97316',
  magenta: '#EC4899',
}

// ─── Section label ────────────────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="text-[10px] tracking-[0.25em] uppercase text-white/25 pb-2 mb-0"
      style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', fontVariantNumeric: 'tabular-nums' }}
    >
      {children}
    </div>
  )
}

// ─── Table row ────────────────────────────────────────────────────────────────
function TableRow({
  children,
  href,
  onClick,
}: {
  children: React.ReactNode
  href?: string
  onClick?: () => void
}) {
  const inner = (
    <div
      className="grid items-baseline py-[9px] px-0 transition-colors"
      style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
    >
      {children}
    </div>
  )

  if (href) {
    return (
      <Link
        href={href}
        className="block group hover:bg-white/[0.025] -mx-3 px-3 transition-colors"
      >
        {inner}
      </Link>
    )
  }
  if (onClick) {
    return (
      <button
        onClick={onClick}
        className="block w-full text-left group hover:bg-white/[0.025] -mx-3 px-3 transition-colors"
      >
        {inner}
      </button>
    )
  }
  return <div className="-mx-3 px-3">{inner}</div>
}

// ─── Stat pill ────────────────────────────────────────────────────────────────
function Stat({ label, value }: { label: string; value: string }) {
  return (
    <span
      className="inline-flex items-baseline gap-1.5 py-0.5"
      style={{ fontVariantNumeric: 'tabular-nums' }}
    >
      <span className="text-base font-bold text-white leading-none">{value}</span>
      <span className="text-[11px] text-white/30 uppercase tracking-wider">{label}</span>
    </span>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function HomeV10({
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
  const [navOpen, setNavOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    trackEvent('homepage_view', { variation: 'v10-brutalist' })
  }, [])

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
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
      trackEvent('homepage_track_play', { variation: 'v10-brutalist', title: featuredTrack.title })
    }
    setPlaying((p) => !p)
  }, [playing, featuredTrack.title])

  const techProducts = products.filter((p) =>
    ['Agentic Creator OS', 'AI Architecture Hub', 'Prompt Library'].includes(p.title)
  )
  const creativeProducts = products.filter((p) =>
    ['Music Lab', 'Design Lab', 'Creator Kit'].includes(p.title)
  )

  const techPosts = latestPosts
    .filter((p) => ['ai', 'engineering', 'architecture', 'tools'].some((kw) => (p.category ?? '').toLowerCase().includes(kw)))
    .slice(0, 3)

  const creativePosts = latestPosts
    .filter((p) => !['ai', 'engineering', 'architecture', 'tools'].some((kw) => (p.category ?? '').toLowerCase().includes(kw)))
    .slice(0, 3)

  const allPosts = latestPosts.slice(0, 6)

  return (
    <main
      className="min-h-screen bg-black text-white"
      style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' }}
    >
      <audio ref={audioRef} src={featuredTrack.audioUrl} preload="none" />

      {/* ── FIXED HEADER ──────────────────────────────────────────────────── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-3 transition-colors"
        style={{
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.12)' : '1px solid transparent',
          background: scrolled ? 'rgba(0,0,0,0.97)' : 'transparent',
        }}
      >
        <Link
          href="/"
          className="text-[13px] font-bold tracking-[0.12em] uppercase text-white hover:text-[#10B981] transition-colors"
        >
          FRANKX
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {[
            ['Blog', '/blog'],
            ['Music', '/music-lab'],
            ['Books', '/books'],
            ['Tools', '/acos'],
            ['About', '/about'],
          ].map(([label, href]) => (
            <Link
              key={label}
              href={href}
              className="text-[11px] uppercase tracking-wider text-white/40 hover:text-[#10B981] transition-colors"
            >
              {label}
            </Link>
          ))}
          <Link
            href="/newsletter"
            className="text-[11px] uppercase tracking-wider px-3 py-1 text-black bg-white hover:bg-[#10B981] transition-colors font-bold"
            style={{ letterSpacing: '0.1em' }}
          >
            Subscribe
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white/50 hover:text-white transition-colors"
          onClick={() => setNavOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span className="text-xs tracking-widest">{navOpen ? '[CLOSE]' : '[MENU]'}</span>
        </button>
      </header>

      {/* Mobile menu */}
      {navOpen && (
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-[44px] left-0 right-0 z-40 bg-black border-b border-white/10 px-5 py-6 flex flex-col gap-4"
        >
          {[
            ['Blog', '/blog'],
            ['Music', '/music-lab'],
            ['Books', '/books'],
            ['Tools', '/acos'],
            ['About', '/about'],
          ].map(([label, href]) => (
            <Link
              key={label}
              href={href}
              onClick={() => setNavOpen(false)}
              className="text-sm uppercase tracking-wider text-white/50 hover:text-[#10B981] transition-colors"
            >
              {label}
            </Link>
          ))}
        </motion.div>
      )}

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section
        className="pt-32 pb-16 px-5"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
      >
        <div className="max-w-5xl mx-auto">
          {/* Pre-label */}
          <div
            className="text-[10px] tracking-[0.3em] uppercase text-[#10B981]/60 mb-6"
          >
            frankx.ai — AI Architect &amp; Creator
          </div>

          {/* H1 */}
          <h1
            className="font-bold leading-[0.92] mb-8 text-[clamp(3rem,10vw,7rem)]"
            style={{ letterSpacing: '-0.02em' }}
          >
            Enterprise AI.
            <br />
            <span style={{ color: '#10B981' }}>12,000 tracks.</span>
            <br />
            One builder.
          </h1>

          {/* Dense descriptor */}
          <p
            className="text-sm text-white/45 max-w-2xl leading-relaxed mb-10"
          >
            Frank Riemer — AI Architect at Oracle. Author of the Agentic Creator OS with 75+ open-source
            skills and 38 specialized agents. Composer of 12,000+ AI-generated songs across every genre. Six published
            books. The entire workflow is documented, versioned, and shipped.
          </p>

          {/* 4-stat bar */}
          <div
            className="flex flex-wrap gap-x-8 gap-y-3 pt-6"
            style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
          >
            <Stat value="12,000+" label="AI Songs" />
            <Stat value="75+" label="Open-Source Skills" />
            <Stat value="38" label="Agents" />
            <Stat value="6" label="Books" />
          </div>
        </div>
      </section>

      {/* ── CREDENTIALS BAR ───────────────────────────────────────────────── */}
      <div
        className="px-5 py-3 flex flex-wrap gap-x-6 gap-y-1"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        {credentials.map((c) => (
          <span key={c} className="text-[10px] text-white/20 tracking-wide uppercase">
            {c}
          </span>
        ))}
      </div>

      <div className="max-w-5xl mx-auto px-5">

        {/* ── PRODUCTS ────────────────────────────────────────────────────── */}
        <section className="py-10">
          <div className="grid md:grid-cols-2 gap-x-12">
            {/* Left: Technical */}
            <div>
              <SectionLabel>Technical Systems</SectionLabel>
              <div className="mt-0">
                {techProducts.map((p) => (
                  <TableRow key={p.title} href={p.href}>
                    <div className="grid grid-cols-[14px_1fr_auto] items-baseline gap-3">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-[3px] flex-shrink-0"
                        style={{ background: COLOR_DOT[p.color] ?? '#10B981', marginTop: '6px' }}
                      />
                      <div>
                        <span className="text-sm font-semibold text-white group-hover:text-[#10B981] transition-colors">
                          {p.title}
                        </span>
                        <span className="block text-[11px] text-white/30 mt-0.5 leading-snug">
                          {p.description}
                        </span>
                      </div>
                      <ChevronRight className="w-3 h-3 text-white/15 group-hover:text-[#10B981] transition-colors flex-shrink-0" />
                    </div>
                  </TableRow>
                ))}
              </div>
            </div>

            {/* Right: Creative */}
            <div className="mt-10 md:mt-0">
              <SectionLabel>Creative Tools</SectionLabel>
              <div className="mt-0">
                {creativeProducts.map((p) => (
                  <TableRow key={p.title} href={p.href}>
                    <div className="grid grid-cols-[14px_1fr_auto] items-baseline gap-3">
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: COLOR_DOT[p.color] ?? '#10B981', marginTop: '6px' }}
                      />
                      <div>
                        <span className="text-sm font-semibold text-white group-hover:text-[#10B981] transition-colors">
                          {p.title}
                        </span>
                        <span className="block text-[11px] text-white/30 mt-0.5 leading-snug">
                          {p.description}
                        </span>
                      </div>
                      <ChevronRight className="w-3 h-3 text-white/15 group-hover:text-[#10B981] transition-colors flex-shrink-0" />
                    </div>
                  </TableRow>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── FEATURED TRACK ──────────────────────────────────────────────── */}
        <section
          className="py-6"
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
        >
          <SectionLabel>Now Playing — Featured Track</SectionLabel>
          <div className="mt-3">
            <TableRow onClick={toggle}>
              <div className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-4">
                <span
                  className="text-[11px] font-mono font-bold uppercase tracking-widest px-2 py-0.5"
                  style={{
                    color: playing ? '#10B981' : 'rgba(255,255,255,0.3)',
                    border: `1px solid ${playing ? '#10B981' : 'rgba(255,255,255,0.1)'}`,
                  }}
                >
                  {playing ? 'PAUSE' : 'PLAY'}
                </span>
                <span className="text-sm font-medium text-white">{featuredTrack.title}</span>
                <span className="text-[11px] text-white/25 font-mono" style={{ fontVariantNumeric: 'tabular-nums' }}>
                  {featuredTrack.duration}
                </span>
                <span className="text-[10px] text-white/20 uppercase tracking-wider hidden sm:block">
                  {featuredTrack.genre.join(' / ')}
                </span>
              </div>
            </TableRow>

            {/* Progress indicator when playing */}
            {playing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-3 mt-2 px-0"
              >
                {Array.from({ length: 24 }).map((_, i) => (
                  <motion.span
                    key={i}
                    className="block w-px bg-[#10B981]"
                    animate={{ height: ['4px', '16px', '4px'] }}
                    transition={{
                      duration: 0.5 + (i % 5) * 0.15,
                      repeat: Infinity,
                      delay: i * 0.04,
                    }}
                    style={{ minHeight: '4px' }}
                  />
                ))}
                <span className="text-[10px] text-[#10B981]/50 ml-1 tracking-widest">LIVE</span>
              </motion.div>
            )}
          </div>
        </section>

        {/* ── BLOG POSTS TABLE ────────────────────────────────────────────── */}
        <section
          className="py-10"
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
        >
          <div className="flex items-baseline justify-between mb-0">
            <SectionLabel>Latest Articles</SectionLabel>
            <Link
              href="/blog"
              className="text-[10px] text-[#10B981] hover:underline tracking-wider flex items-center gap-1"
              style={{ marginBottom: '8px' }}
            >
              ALL <ArrowRight className="w-2.5 h-2.5" />
            </Link>
          </div>

          {/* Column headers */}
          <div
            className="grid gap-4 py-2 text-[9px] tracking-[0.2em] uppercase text-white/15"
            style={{
              gridTemplateColumns: '80px 1fr 80px 56px',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <span>Date</span>
            <span>Title</span>
            <span>Category</span>
            <span className="text-right">Read</span>
          </div>

          {allPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block hover:bg-white/[0.025] -mx-3 px-3 transition-colors"
            >
              <div
                className="grid gap-4 py-[9px] items-baseline"
                style={{
                  gridTemplateColumns: '80px 1fr 80px 56px',
                  borderBottom: '1px solid rgba(255,255,255,0.04)',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                <span className="text-[11px] text-white/25 font-mono">{post.date}</span>
                <span className="text-[13px] text-white group-hover:text-[#10B981] transition-colors line-clamp-1">
                  {post.title}
                </span>
                <span className="text-[10px] text-white/25 uppercase tracking-wider truncate">
                  {post.category}
                </span>
                <span className="text-[11px] text-white/20 text-right font-mono">{post.readingTime}</span>
              </div>
            </Link>
          ))}
        </section>

        {/* ── DESIGN LAB: 4-image grid, full bleed, no radius ────────────── */}
        <section
          className="py-10"
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
        >
          <SectionLabel>Design Lab — Visual Experiments</SectionLabel>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px mt-3" style={{ background: 'rgba(255,255,255,0.06)' }}>
            {(designLabImages.length > 0 ? designLabImages : [
              { src: '/images/golden-age/golden-age-hero-council-v1.png', alt: 'Council' },
              { src: '/images/golden-age/starlight-intelligence-v2.png', alt: 'SIS' },
              { src: '/images/golden-age/automation-empire-v1.png', alt: 'Automation Empire' },
              { src: '/images/arcanea/eldrian-conclave-20260301.png', alt: 'Eldrian Conclave' },
            ]).slice(0, 4).map((img, i) => (
              <Link key={img.src} href="/design-lab" className="group block relative aspect-square bg-black overflow-hidden">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="25vw"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
                <span className="absolute bottom-2 left-2 text-[9px] text-white/30 uppercase tracking-widest font-mono">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-2 text-right">
            <Link href="/design-lab" className="text-[10px] text-[#10B981] hover:underline tracking-wider">
              View Design Lab →
            </Link>
          </div>
        </section>

        {/* ── BOOKS ───────────────────────────────────────────────────────── */}
        {books.length > 0 && (
          <section
            className="py-10"
            style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
          >
            <SectionLabel>Published Books</SectionLabel>
            <div className="mt-3 space-y-0">
              {books.map((book, i) => (
                <TableRow key={book.slug} href={`/books/${book.slug}`}>
                  <div className="grid grid-cols-[auto_1fr_auto] items-baseline gap-4">
                    <span className="text-[10px] font-mono text-white/15" style={{ fontVariantNumeric: 'tabular-nums' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <span className="text-sm font-semibold text-white group-hover:text-[#10B981] transition-colors">
                        {book.title}
                      </span>
                      {book.subtitle && (
                        <span className="text-[11px] text-white/30 ml-2">{book.subtitle}</span>
                      )}
                    </div>
                    <ChevronRight className="w-3 h-3 text-white/15 group-hover:text-[#10B981] transition-colors" />
                  </div>
                </TableRow>
              ))}
            </div>
          </section>
        )}

        {/* ── LEARNING ────────────────────────────────────────────────────── */}
        <section
          className="py-10"
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
        >
          <SectionLabel>Learning Resources</SectionLabel>
          <div className="mt-3 grid grid-cols-2 gap-px" style={{ background: 'rgba(255,255,255,0.06)' }}>
            {learningCards.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="group block bg-black p-4 hover:bg-white/[0.025] transition-colors"
              >
                {/* Image strip */}
                <div className="relative w-full h-24 mb-3 overflow-hidden" style={{ background: '#111' }}>
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-60 group-hover:opacity-80"
                    sizes="50vw"
                  />
                </div>
                <p className="text-[12px] font-bold text-white group-hover:text-[#10B981] transition-colors uppercase tracking-wide">
                  {card.title}
                </p>
                <p className="text-[11px] text-white/30 mt-0.5 leading-snug">{card.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* ── FAQ ─────────────────────────────────────────────────────────── */}
        {faqs.length > 0 && (
          <section
            className="py-10"
            style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
          >
            <SectionLabel>Frequently Asked Questions</SectionLabel>
            <div className="mt-3 space-y-6">
              {faqs.map((faq, i) => (
                <div key={i}>
                  <p className="text-[13px] font-semibold text-white mb-1.5">{faq.question}</p>
                  <p className="text-[12px] text-white/35 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── NEWSLETTER ──────────────────────────────────────────────────── */}
        <section
          className="py-10"
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
        >
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <SectionLabel>Weekly Dispatch</SectionLabel>
              <p className="text-[13px] text-white/40 mt-4 leading-relaxed max-w-sm">
                AI architecture, music production, creator workflows. No padding, no fluff.
                Every issue is worth reading.
              </p>
            </div>
            <div className="md:pt-7">
              <EmailSignup
                listType="newsletter"
                placeholder="your@email.com"
                buttonText="[SUBSCRIBE]"
                compact
              />
            </div>
          </div>
        </section>

      </div>

      {/* ── FOOTER ──────────────────────────────────────────────────────────── */}
      <footer
        className="px-5 py-5 flex items-center justify-between"
        style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
      >
        <div className="flex items-center gap-6">
          <span className="text-[10px] font-mono text-white/20 tracking-wider">frankx.ai // v10.brutalist</span>
          <span className="text-[9px] text-white/10 hidden sm:block">
            &copy; {new Date().getFullYear()} Frank Riemer
          </span>
        </div>
        <Link
          href="/home"
          className="text-[10px] text-[#10B981]/60 hover:text-[#10B981] transition-colors tracking-wider uppercase"
        >
          All Variations →
        </Link>
      </footer>
    </main>
  )
}
