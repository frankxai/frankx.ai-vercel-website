'use client'

import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useRef, useState, useCallback, useEffect, useId } from 'react'
import { ArrowRight, Play, Pause, Volume2, BookOpen, ChevronDown } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'
import { EmailSignup } from '@/components/email-signup'
import type { HomepageData } from '@/lib/homepage-data'

// ─────────────────────────────────────────────────────────────
// Primitives
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
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function Rule({ className = '' }: { className?: string }) {
  return <hr className={`border-stone-300/40 ${className}`} />
}

// ─────────────────────────────────────────────────────────────
// Music player — editorial style
// ─────────────────────────────────────────────────────────────

function MiniPlayer({ track }: { track: HomepageData['featuredTrack'] }) {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  const toggle = useCallback(() => {
    const a = audioRef.current
    if (!a) return
    if (playing) {
      a.pause()
    } else {
      a.play()
      trackEvent('homepage_track_play', { variation: 'v4-magazine', title: track.title })
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
    <div className="border-t border-stone-300/40 pt-5">
      <audio ref={audioRef} src={track.audioUrl} preload="none" />
      <div className="flex items-center gap-4 mb-3">
        <button
          onClick={toggle}
          className="w-10 h-10 rounded-full bg-stone-900 text-stone-100 flex items-center justify-center flex-shrink-0 hover:bg-emerald-700 transition-colors"
          aria-label={playing ? 'Pause track' : 'Play track'}
        >
          {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-stone-900 truncate">{track.title}</p>
          <p className="text-xs text-stone-400 font-italic">{track.genre.join(', ')} · {track.duration}</p>
        </div>
        <Volume2 className="w-4 h-4 text-stone-300 flex-shrink-0" />
      </div>
      <div className="h-px bg-stone-200 relative rounded-full overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-emerald-700"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// FAQ accordion — magazine Q&A style
// ─────────────────────────────────────────────────────────────

function FAQItem({ question, answer, defaultOpen = false }: { question: string; answer: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  const id = useId()
  return (
    <div className="border-b border-stone-300/40 py-5">
      <button
        aria-expanded={open}
        aria-controls={`faq-${id}`}
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 text-left group"
      >
        <span className="font-serif text-base font-semibold text-stone-900 leading-snug group-hover:text-emerald-700 transition-colors">
          {question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-stone-400 flex-shrink-0 mt-0.5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`faq-${id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="text-sm text-stone-500 leading-relaxed pt-3 pr-8">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────

export default function HomeV4({
  latestPosts,
  faqs,
  featuredTrack,
  books,
  products,
  learningCards,
  designLabImages,
  credentials,
}: HomepageData) {
  useEffect(() => {
    trackEvent('homepage_view', { variation: 'v4-magazine' })
  }, [])

  const productColors: Record<string, string> = {
    emerald: 'text-emerald-700',
    violet: 'text-violet-700',
    cyan: 'text-cyan-700',
    blue: 'text-blue-700',
    orange: 'text-orange-700',
    magenta: 'text-pink-700',
  }

  return (
    <main className="relative min-h-screen bg-[#FAF8F5] text-stone-900 selection:bg-emerald-200/60 overflow-x-hidden">

      {/* ── 1. MASTHEAD ──────────────────────────────────────── */}
      <header className="border-b border-stone-300/50">
        <div className="max-w-6xl mx-auto px-6">
          {/* Top bar */}
          <div className="flex items-center justify-between py-3 border-b border-stone-200/60 text-[10px] uppercase tracking-[0.2em] text-stone-400">
            <span>Est. 2024</span>
            <span>AI Architecture & Creation</span>
            <Link href="/newsletter" className="hover:text-stone-700 transition-colors">Subscribe</Link>
          </div>
          {/* Logo row */}
          <div className="flex items-center justify-between py-5">
            <div className="flex items-center gap-6 text-[10px] uppercase tracking-[0.2em] text-stone-400">
              <Link href="/blog" className="hover:text-stone-900 transition-colors">Articles</Link>
              <Link href="/music" className="hover:text-stone-900 transition-colors">Music</Link>
              <Link href="/acos" className="hover:text-stone-900 transition-colors">Tools</Link>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight absolute left-1/2 -translate-x-1/2">
              FrankX
            </h1>
            <div className="flex items-center gap-6 text-[10px] uppercase tracking-[0.2em] text-stone-400">
              <Link href="/books" className="hover:text-stone-900 transition-colors">Books</Link>
              <Link href="/coaching" className="hover:text-stone-900 transition-colors">Coaching</Link>
              <Link href="/about" className="hover:text-stone-900 transition-colors">About</Link>
            </div>
          </div>
          {/* Issue metadata */}
          <div className="text-center pb-4 text-[10px] uppercase tracking-[0.25em] text-stone-400">
            Vol. 1 &nbsp;·&nbsp; No. 3 &nbsp;·&nbsp; March 2026 &nbsp;·&nbsp; Digital Edition
          </div>
        </div>
      </header>

      {/* ── 2. COVER STORY — Editorial spread ─────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-12 md:py-16">
        <div className="grid lg:grid-cols-5 gap-10 items-start">
          {/* Left — image 60% */}
          <Reveal className="lg:col-span-3">
            <div className="relative aspect-[4/5] rounded-none overflow-hidden">
              <Image
                src="/images/arcanea/eldrian-conclave-20260301.png"
                alt="The Eldrian Conclave, digital art, 2026"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
              />
            </div>
            <p className="text-xs italic text-stone-400 mt-2">
              The Eldrian Conclave, digital art — FrankX, 2026
            </p>
          </Reveal>
          {/* Right — editorial content */}
          <Reveal delay={0.15} className="lg:col-span-2 pt-2">
            <p className="text-[10px] uppercase tracking-[0.25em] text-emerald-700/70 mb-5">Cover Story</p>
            <h2 className="font-serif text-4xl md:text-5xl leading-[1.04] tracking-tight mb-6">
              <span className="italic">Building</span> intelligence<br />
              that compounds.
            </h2>
            <p className="text-xs uppercase tracking-[0.15em] text-stone-400 mb-4">
              By Frank Riemer &nbsp;·&nbsp; March 2026
            </p>
            <p className="text-base text-stone-600 leading-relaxed mb-6">
              AI Architect at Oracle. Creator of 12,000+ AI songs. Author of 6 books. 75+ open-source skills shipped into the wild. Everything I build, I document. Everything I learn, I share.
            </p>
            <blockquote className="text-xl italic text-stone-700 border-l-2 border-emerald-600/50 pl-4 mb-8 leading-relaxed">
              &ldquo;Excellent work doesn&rsquo;t announce itself. It just is.&rdquo;
            </blockquote>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/start"
                className="inline-flex items-center gap-2 bg-stone-900 text-stone-100 px-5 py-3 text-sm font-medium hover:bg-emerald-800 transition-colors"
              >
                Explore the Work <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 border border-stone-300 text-stone-700 px-5 py-3 text-sm font-medium hover:border-stone-700 hover:text-stone-900 transition-colors"
              >
                Read Articles
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Rule className="max-w-6xl mx-auto px-6" />

      {/* ── 3. AUTHORITY STRIP ────────────────────────────── */}
      <div className="py-5 bg-stone-100/60">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
            {credentials.map((c, i) => (
              <span key={c} className="flex items-center gap-8">
                {i > 0 && <span className="hidden sm:block w-[3px] h-[3px] rounded-full bg-stone-400" />}
                <span className="text-[11px] text-stone-500 font-medium tracking-wide uppercase">{c}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <Rule />

      {/* ── 4. TABLE OF CONTENTS — Products ──────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-14 md:py-20">
        <Reveal>
          <div className="flex items-baseline justify-between mb-2">
            <p className="text-[10px] uppercase tracking-[0.25em] text-stone-400">In This Issue</p>
            <p className="text-[10px] uppercase tracking-[0.15em] text-stone-300">Page</p>
          </div>
          <Rule className="mb-8" />
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-0">
          {products.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.07}>
              <Link
                href={p.href}
                className="group block border-t border-stone-200/70 pt-4 pb-6 pr-4 hover:bg-stone-50/80 transition-colors -mx-1 px-1"
              >
                <div className="flex items-baseline justify-between mb-1">
                  <span className="font-mono text-[10px] text-stone-300">Pg. {String(i + 1).padStart(2, '0')}</span>
                  <ArrowRight className={`w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity ${productColors[p.color] || 'text-emerald-700'}`} />
                </div>
                <h3 className={`font-serif text-xl font-bold mb-1 group-hover:${productColors[p.color] || 'text-emerald-700'} transition-colors`}>
                  {p.title}
                </h3>
                <p className="text-sm text-stone-500 leading-snug">{p.description}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── 5. FEATURED STORY — inverted dark section ─────── */}
      {latestPosts[0] && (
        <section className="bg-stone-900 text-stone-100 py-14 md:py-20">
          <div className="max-w-6xl mx-auto px-6">
            <Reveal>
              <p className="text-[10px] uppercase tracking-[0.25em] text-stone-400 mb-8">Feature</p>
            </Reveal>
            <div className="grid lg:grid-cols-5 gap-10 items-center">
              <div className="lg:col-span-3">
                <Reveal>
                  {latestPosts[0].image && (
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={latestPosts[0].image}
                        alt={latestPosts[0].title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 60vw"
                      />
                    </div>
                  )}
                  <p className="text-xs italic text-stone-600 mt-2">{latestPosts[0].category}</p>
                </Reveal>
              </div>
              <Reveal delay={0.15} className="lg:col-span-2">
                <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-400/70 mb-4">
                  {latestPosts[0].category}
                </p>
                <h3 className="font-serif text-2xl md:text-3xl font-bold leading-tight mb-4">
                  <Link href={`/blog/${latestPosts[0].slug}`} className="hover:text-emerald-400 transition-colors">
                    {latestPosts[0].title}
                  </Link>
                </h3>
                <p className="text-stone-400 leading-relaxed text-sm mb-6">{latestPosts[0].description}</p>
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span>By Frank Riemer</span>
                  <span>{latestPosts[0].readingTime}</span>
                </div>
                <Rule className="border-stone-700/60 mt-4 mb-4" />
                <Link
                  href={`/blog/${latestPosts[0].slug}`}
                  className="inline-flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  Read the full article <ArrowRight className="w-4 h-4" />
                </Link>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* ── 6. MORE FROM THIS ISSUE — 3-col articles ──────── */}
      <section className="max-w-6xl mx-auto px-6 py-14 md:py-20">
        <Reveal>
          <div className="flex items-end justify-between mb-2">
            <p className="text-[10px] uppercase tracking-[0.25em] text-stone-400">More Articles</p>
            <Link href="/blog" className="text-xs text-stone-500 hover:text-stone-900 uppercase tracking-[0.1em] flex items-center gap-1 transition-colors">
              All articles <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <Rule className="mb-10" />
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestPosts.slice(1, 4).map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.09}>
              <Link href={`/blog/${post.slug}`} className="group block">
                {post.image && (
                  <div className="relative aspect-[16/10] overflow-hidden mb-4">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
                      sizes="33vw"
                    />
                    <p className="absolute bottom-2 left-2 text-[10px] italic text-white/60">{post.category}</p>
                  </div>
                )}
                <p className="text-[10px] uppercase tracking-[0.15em] text-stone-400 mb-1">{post.category}</p>
                <h3 className="font-serif text-lg font-bold leading-snug group-hover:text-emerald-700 transition-colors mb-2">
                  {post.title}
                </h3>
                <p className="text-sm text-stone-500 line-clamp-2 leading-relaxed mb-3">{post.description}</p>
                <p className="text-[10px] text-stone-400 uppercase tracking-[0.1em]">
                  Frank Riemer &nbsp;·&nbsp; {post.readingTime}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Pull quote */}
        <Reveal delay={0.3}>
          <div className="mt-16 max-w-2xl mx-auto text-center">
            <p className="text-2xl italic text-stone-700 border-y border-stone-300/50 py-8 leading-relaxed">
              &ldquo;I don&rsquo;t chase virality. I chase depth. The compound interest of skill is the only currency that matters.&rdquo;
            </p>
            <p className="text-xs text-stone-400 mt-3 uppercase tracking-[0.15em]">Frank Riemer</p>
          </div>
        </Reveal>
      </section>

      <Rule />

      {/* ── 7. THE STUDIO — Music + Design Lab ────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-14 md:py-20">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.25em] text-stone-400 mb-2">The Studio</p>
          <Rule className="mb-10" />
        </Reveal>
        <div className="grid lg:grid-cols-2 gap-14 items-start">
          {/* Music */}
          <Reveal>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-2">12,000 tracks<br />and counting.</h2>
            <p className="text-sm text-stone-500 leading-relaxed mb-2">
              Genre mastery from orchestral to hip hop. Every track is prompt-engineered for radio-ready production. The studio never sleeps.
            </p>
            <p className="text-xs italic text-stone-400 mb-6">
              &mdash; Explore the full catalog at{' '}
              <Link href="/music" className="text-emerald-700 hover:underline">frankx.ai/music</Link>
            </p>
            <MiniPlayer track={featuredTrack} />
            <Link
              href="/music"
              className="mt-4 inline-flex items-center gap-2 text-sm text-emerald-700 hover:text-emerald-600 transition-colors"
            >
              Enter Music Lab <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
          {/* Design Lab */}
          <Reveal delay={0.15}>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">Design Lab</h2>
            <div className="grid grid-cols-2 gap-2">
              {designLabImages.slice(0, 4).map((img) => (
                <div key={img.src} className="relative aspect-square overflow-hidden group">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="200px"
                  />
                  <p className="absolute bottom-2 left-2 text-[10px] italic text-white/60 opacity-0 group-hover:opacity-100 transition-opacity">
                    {img.alt}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-xs italic text-stone-400 mt-2">
              Nature-tech fusion experiments &nbsp;·&nbsp;{' '}
              <Link href="/design-lab" className="text-emerald-700 hover:underline">View all</Link>
            </p>
          </Reveal>
        </div>
      </section>

      <Rule />

      {/* ── 8. THE LIBRARY — Books horizontal filmstrip ───── */}
      {books.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-14 md:py-20">
          <Reveal>
            <div className="flex items-end justify-between mb-2">
              <p className="text-[10px] uppercase tracking-[0.25em] text-stone-400">The Library</p>
              <Link href="/books" className="text-xs text-stone-400 hover:text-stone-900 uppercase tracking-[0.1em] flex items-center gap-1 transition-colors">
                All books <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <Rule className="mb-10" />
          </Reveal>
          <div className="flex gap-8 overflow-x-auto pb-4 -mx-2 px-2">
            {books.map((book, i) => (
              <Reveal key={book.slug} delay={i * 0.06}>
                <Link href={`/books/${book.slug}`} className="group flex-shrink-0 w-[120px]">
                  <div className="relative aspect-[2/3] overflow-hidden shadow-md mb-3 group-hover:shadow-xl transition-shadow">
                    <Image
                      src={book.coverImage}
                      alt={book.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-400"
                      sizes="120px"
                    />
                  </div>
                  <p className="font-serif text-sm font-semibold leading-snug group-hover:text-emerald-700 transition-colors line-clamp-2">
                    {book.title}
                  </p>
                  <p className="text-xs text-stone-400 mt-0.5 line-clamp-1">{book.subtitle}</p>
                  <span className="text-[10px] text-stone-400 group-hover:text-emerald-700 transition-colors">↗ Read</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <Rule />

      {/* ── 9. IN BRIEF — Learning cards ─────────────────── */}
      {learningCards && learningCards.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-14 md:py-20">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.25em] text-stone-400 mb-2">In Brief</p>
            <Rule className="mb-10" />
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-6">
            {learningCards.slice(0, 4).map((card, i) => (
              <Reveal key={card.href} delay={i * 0.07}>
                <Link href={card.href} className="group block border border-stone-200/60 hover:border-stone-400/60 transition-colors">
                  {card.image && (
                    <div className="relative h-44 overflow-hidden">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                        sizes="50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="font-serif text-lg font-bold mb-2 group-hover:text-emerald-700 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-sm text-stone-500 leading-snug">{card.description}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* ── 10. CORRESPONDENCE — Newsletter ───────────────── */}
      <section className="bg-stone-900 text-stone-100 py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.25em] text-stone-500 mb-4">Letters to the Editor</p>
            <Rule className="border-stone-700/60 mb-10" />
          </Reveal>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <h2 className="font-serif text-4xl md:text-5xl font-bold leading-tight mb-4">
                Subscribe to<br />the dispatch.
              </h2>
              <p className="text-stone-400 leading-relaxed mb-2">
                AI architecture. Creative systems. The occasional burst of insight from the studio. Weekly, no spam, unsubscribe any time.
              </p>
              <p className="text-xs italic text-stone-600">
                &ldquo;Creation Chronicles — the newsletter that compounds.&rdquo;
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="border border-stone-700/50 p-8">
                <p className="text-xs uppercase tracking-[0.2em] text-stone-500 mb-6">Join the Dispatch</p>
                <EmailSignup
                  listType="newsletter"
                  placeholder="your@email.com"
                  buttonText="Subscribe"
                />
                <p className="text-xs text-stone-600 mt-4">No spam. Unsubscribe any time. Published weekly.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 11. FAQ — Magazine Q&A column ─────────────────── */}
      {faqs.length > 0 && (
        <section className="max-w-3xl mx-auto px-6 py-14 md:py-20">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.25em] text-stone-400 mb-2 text-center">Q & A</p>
            <h2 className="font-serif text-3xl font-bold text-center mb-2">Frequently Asked</h2>
            <p className="text-sm text-stone-400 text-center mb-2">Common questions, honest answers.</p>
            <Rule className="mb-0" />
          </Reveal>
          <div>
            {faqs.map((faq, i) => (
              <FAQItem
                key={i}
                question={faq.question}
                answer={faq.answer}
                defaultOpen={i === 0}
              />
            ))}
          </div>
        </section>
      )}

      {/* ── FOOTER ────────────────────────────────────────── */}
      <footer className="border-t border-stone-300/50 py-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-xs text-stone-400">
              <span className="font-serif font-bold text-stone-700">FrankX</span>
              <span>·</span>
              <span>Vol. 1, No. 3</span>
              <span>·</span>
              <span>March 2026</span>
            </div>
            <div className="flex items-center gap-6 text-xs text-stone-400">
              <Link href="/home" className="hover:text-stone-900 transition-colors uppercase tracking-[0.1em]">All variations</Link>
              <Link href="/blog" className="hover:text-stone-900 transition-colors">Blog</Link>
              <Link href="/about" className="hover:text-stone-900 transition-colors">About</Link>
            </div>
          </div>
          <Rule className="my-5" />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-stone-400">
            <span>frankx.ai &nbsp;·&nbsp; v4.magazine &nbsp;·&nbsp; All rights reserved {new Date().getFullYear()}</span>
            <span className="flex items-center gap-1">
              <BookOpen className="w-3 h-3" />
              <Link href="/home" className="hover:text-stone-700 transition-colors">all variations →</Link>
            </span>
          </div>
        </div>
      </footer>
    </main>
  )
}
