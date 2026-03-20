'use client'

import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useRef, useState, useCallback, useEffect } from 'react'
import { ArrowRight, Play, Pause } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'
import { EmailSignup } from '@/components/email-signup'
import type { HomepageData } from '@/lib/homepage-data'

// ─────────────────────────────────────────────────────────────
// Matrix Rain — subtle background
// ─────────────────────────────────────────────────────────────

function MatrixRain() {
  const reduce = useReducedMotion()
  if (reduce) return null

  const columns = Array.from({ length: 24 }, (_, i) => i)
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden opacity-[0.05] select-none z-0"
    >
      {columns.map((i) => (
        <motion.div
          key={i}
          className="absolute top-0 font-mono text-[11px] text-emerald-400 leading-4"
          style={{ left: `${(i / 24) * 100}%` }}
          initial={{ y: '-100%' }}
          animate={{ y: '110%' }}
          transition={{
            duration: 9 + (i % 7),
            repeat: Infinity,
            delay: (i % 5) * 1.3,
            ease: 'linear',
          }}
        >
          {Array.from({ length: 40 }, (_, j) => (
            <div key={j} style={{ opacity: 1 - j * 0.025 }}>
              {String.fromCharCode(0x30a0 + Math.floor(Math.random() * 96))}
            </div>
          ))}
        </motion.div>
      ))}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// Terminal window chrome
// ─────────────────────────────────────────────────────────────

function Terminal({
  title,
  children,
  className = '',
}: {
  title: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`overflow-hidden rounded-lg border border-white/[0.08] bg-[#0d0d0d] shadow-2xl shadow-black/60 ${className}`}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.06] bg-white/[0.03]">
        <div className="w-3 h-3 rounded-full bg-red-500/70" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <div className="w-3 h-3 rounded-full bg-green-500/70" />
        <span className="ml-auto text-center w-full font-mono text-[11px] text-white/30 -ml-14 pointer-events-none">
          {title}
        </span>
      </div>
      <div className="p-5 font-mono text-sm leading-relaxed">{children}</div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// Boot sequence
// ─────────────────────────────────────────────────────────────

const BOOT_LINES = [
  { text: '[    0.001] Linux frankx-studio 6.6.87 SMP x86_64', color: 'text-white/40', delay: 0 },
  { text: '[    0.183] Initializing AI runtime environment...', color: 'text-white/40', delay: 200 },
  { text: '[  OK  ] Started FrankX System Services', color: 'text-emerald-400', delay: 600 },
  { text: '[  OK  ] Loaded 75 creative skills', color: 'text-emerald-400', delay: 900 },
  { text: '[  OK  ] Connected to Music Forge (12,000 tracks)', color: 'text-emerald-400', delay: 1200 },
  { text: '[  OK  ] Initialized 38 autonomous agents', color: 'text-emerald-400', delay: 1500 },
  { text: '[  OK  ] Loaded Agentic Creator OS v9.3', color: 'text-emerald-400', delay: 1800 },
  { text: '[  OK  ] Oracle AI architecture modules active', color: 'text-emerald-400', delay: 2100 },
  { text: '[  OK  ] All systems operational', color: 'text-emerald-400', delay: 2400 },
  { text: '', color: '', delay: 2600 },
  { text: 'frankx@studio:~$ ', color: 'text-emerald-300', delay: 2800 },
]

function BootSequence({ onDone }: { onDone: () => void }) {
  const [visibleCount, setVisibleCount] = useState(0)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) {
      setVisibleCount(BOOT_LINES.length)
      onDone()
      return
    }
    const timers: ReturnType<typeof setTimeout>[] = []
    BOOT_LINES.forEach((line, i) => {
      timers.push(setTimeout(() => {
        setVisibleCount(i + 1)
        if (i === BOOT_LINES.length - 1) {
          setTimeout(onDone, 500)
        }
      }, line.delay))
    })
    return () => timers.forEach(clearTimeout)
  }, [reduce, onDone])

  return (
    <Terminal title="frankx-studio — boot" className="w-full max-w-2xl mx-auto">
      {BOOT_LINES.slice(0, visibleCount).map((line, i) => (
        <div key={i} className={`${line.color} text-xs leading-5`}>
          {line.text}
          {i === visibleCount - 1 && i === BOOT_LINES.length - 1 && (
            <motion.span
              className="inline-block w-2 h-[13px] bg-emerald-400 ml-0.5 align-middle"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.6, repeat: Infinity }}
            />
          )}
        </div>
      ))}
    </Terminal>
  )
}

// ─────────────────────────────────────────────────────────────
// Typing effect hook
// ─────────────────────────────────────────────────────────────

function useTyping(text: string, speed = 35, startDelay = 0) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) { setDisplayed(text); setDone(true); return }
    let i = 0
    const start = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1))
        i++
        if (i >= text.length) { clearInterval(interval); setDone(true) }
      }, speed)
      return () => clearInterval(interval)
    }, startDelay)
    return () => clearTimeout(start)
  }, [text, speed, startDelay, reduce])

  return { displayed, done }
}

// ─────────────────────────────────────────────────────────────
// Cursor blink
// ─────────────────────────────────────────────────────────────

function Cursor({ show = true }: { show?: boolean }) {
  if (!show) return null
  return (
    <motion.span
      className="inline-block w-2 h-[14px] bg-emerald-400 ml-0.5 align-middle"
      animate={{ opacity: [1, 0] }}
      transition={{ duration: 0.6, repeat: Infinity }}
    />
  )
}

// ─────────────────────────────────────────────────────────────
// Music player — terminal ASCII style
// ─────────────────────────────────────────────────────────────

function TerminalPlayer({ track }: { track: HomepageData['featuredTrack'] }) {
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
      trackEvent('homepage_track_play', { variation: 'v3-terminal', title: track.title })
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

  const filled = Math.round(progress * 0.3)
  const empty = 30 - filled
  const bar = '█'.repeat(filled) + '░'.repeat(empty)

  return (
    <div className="space-y-2">
      <audio ref={audioRef} src={track.audioUrl} preload="none" />
      <div className="text-emerald-300">
        <span className="text-white/40">♪ </span>
        {track.title}
        <span className="text-white/40"> — {track.genre[0]} — {track.duration}</span>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={toggle}
          className="text-emerald-400 hover:text-emerald-300 transition-colors font-mono text-sm"
          aria-label={playing ? 'Pause' : 'Play'}
        >
          [{playing ? 'PAUSE' : 'PLAY '}]
        </button>
        <span className="text-cyan-400/80 font-mono text-sm">[{bar}]</span>
        <span className="text-white/30 font-mono text-xs">{Math.round(progress)}%</span>
      </div>
      <Link
        href="/music"
        className="inline-block text-xs text-white/30 hover:text-emerald-400 transition-colors font-mono"
      >
        → browse 12,000+ tracks at /music
      </Link>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// Section reveal wrapper
// ─────────────────────────────────────────────────────────────

function Appear({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────

export default function HomeV3({
  latestPosts,
  faqs,
  featuredTrack,
  books,
  products,
  learningCards,
  credentials,
}: HomepageData) {
  const [booted, setBooted] = useState(false)
  const [skipBoot, setSkipBoot] = useState(false)
  const handleDone = useCallback(() => setBooted(true), [])

  useEffect(() => {
    trackEvent('homepage_view', { variation: 'v3-terminal' })
  }, [])

  // Hero typed command
  const cmd1 = useTyping('frank.status()', 40, booted ? 400 : 9999)
  const cmd2 = useTyping('frank.identity()', 40, cmd1.done ? 3200 : 9999)

  const showOutput1 = cmd1.done
  const showOutput2 = cmd2.done

  // npm ls version strings
  const packageVersions: Record<string, string> = {
    'Agentic Creator OS': 'v9.3.0',
    'Prompt Library': 'v2.1.0',
    'Creator Kit': 'v1.2.0',
    'AI Architecture Hub': 'v3.0.0',
    'Music Lab': 'v3.0.0',
    'Design Lab': 'v1.0.0',
  }

  const packageDescriptions: Record<string, string> = {
    'Agentic Creator OS': '75+ skills, 38 agents, full OS',
    'Prompt Library': 'Battle-tested, production prompts',
    'Creator Kit': 'Premium templates & frameworks',
    'AI Architecture Hub': 'Enterprise patterns & playbooks',
    'Music Lab': '12,000+ AI tracks, Suno mastery',
    'Design Lab': 'Generative art experiments',
  }

  const hubData = [
    { name: 'blog/', desc: 'Technical tutorials & guides', href: '/blog', perms: 'drwxr-xr-x', size: '48K' },
    { name: 'music/', desc: '12,000+ AI tracks', href: '/music', perms: 'drwxr-xr-x', size: '99G' },
    { name: 'books/', desc: `${books.length} published works`, href: '/books', perms: 'drwxr-xr-x', size: '2.1M' },
    { name: 'coaching/', desc: 'Private sessions — waitlist', href: '/coaching', perms: 'drwx------', size: '4.0K' },
    { name: 'arcanea/', desc: 'Mythological world system', href: '/arcanea', perms: 'drwxr-xr-x', size: '1.2G' },
    { name: 'tools/', desc: 'ACOS, skills, open source', href: '/acos', perms: 'drwxr-xr-x', size: '124M' },
  ]

  return (
    <main className="relative min-h-screen bg-[#000000] text-emerald-400 selection:bg-emerald-500/30 overflow-x-hidden">
      <MatrixRain />

      {/* ── BOOT SEQUENCE ─────────────────────────────────── */}
      <AnimatePresence>
        {!booted && !skipBoot && (
          <motion.section
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-50 bg-black flex items-center justify-center px-6"
          >
            <div className="w-full max-w-2xl">
              <BootSequence onDone={handleDone} />
            </div>
            <button
              onClick={() => { setSkipBoot(true); setBooted(true) }}
              className="fixed bottom-6 right-6 font-mono text-xs text-white/20 hover:text-white/50 transition-colors border border-white/10 px-3 py-1.5"
            >
              skip intro →
            </button>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ── MAIN CONTENT — revealed after boot ────────────── */}
      <AnimatePresence>
        {booted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            {/* ── 1. HERO TERMINAL ───────────────────────── */}
            <section className="min-h-screen flex flex-col items-center justify-center px-6 py-24">
              <div className="w-full max-w-3xl">
                <Terminal title="frankx@studio ~ — bash">
                  {/* Command 1: frank.status() */}
                  <div className="mb-4">
                    <span className="text-emerald-300/60">{'> '}</span>
                    <span className="text-emerald-300">{cmd1.displayed}</span>
                    {!cmd1.done && <Cursor />}
                  </div>

                  {/* Output 1 */}
                  {showOutput1 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4 }}
                      className="mb-6 space-y-0.5"
                    >
                      <p className="text-emerald-500/80">{'{'}</p>
                      <p className="pl-4">name:<span className="text-cyan-400"> &quot;Frank Riemer&quot;</span>,</p>
                      <p className="pl-4">role:<span className="text-cyan-400"> &quot;AI Architect @ Oracle&quot;</span>,</p>
                      <p className="pl-4">tracks:<span className="text-yellow-400"> 12_000</span>,</p>
                      <p className="pl-4">skills:<span className="text-yellow-400"> 75</span>,</p>
                      <p className="pl-4">agents:<span className="text-yellow-400"> 38</span>,</p>
                      <p className="pl-4">books:<span className="text-yellow-400"> {books.length}</span>,</p>
                      <p className="pl-4">status:<span className="text-green-400"> &quot;shipping&quot;</span>,</p>
                      <p className="pl-4">url:<span className="text-cyan-400"> &quot;frankx.ai&quot;</span></p>
                      <p className="text-emerald-500/80">{'}'}</p>
                    </motion.div>
                  )}

                  {/* Command 2: frank.identity() */}
                  {cmd1.done && (
                    <div className="mb-4">
                      <span className="text-emerald-300/60">{'> '}</span>
                      <span className="text-emerald-300">{cmd2.displayed}</span>
                      {!cmd2.done && <Cursor />}
                    </div>
                  )}

                  {/* Output 2 */}
                  {showOutput2 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4 }}
                      className="mb-4 space-y-0.5"
                    >
                      <p className="text-emerald-500/80">{'{'}</p>
                      <p className="pl-4">mission:<span className="text-cyan-400"> &quot;Build intelligence that compounds&quot;</span>,</p>
                      <p className="pl-4">philosophy:<span className="text-cyan-400"> &quot;Excellence without announcement&quot;</span>,</p>
                      <p className="pl-4">credentials:<span className="text-cyan-400"> [</span></p>
                      {credentials.slice(0, 3).map((c) => (
                        <p key={c} className="pl-8 text-white/60">&quot;{c}&quot;,</p>
                      ))}
                      <p className="pl-4"><span className="text-cyan-400">]</span>,</p>
                      <p className="pl-4">cta:<span className="text-green-400"> &quot;/start&quot;</span></p>
                      <p className="text-emerald-500/80">{'}'}</p>
                    </motion.div>
                  )}

                  {showOutput2 && (
                    <div className="mt-2">
                      <span className="text-emerald-300/60">{'> '}</span>
                      <Cursor />
                    </div>
                  )}
                </Terminal>

                {showOutput2 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col sm:flex-row items-center gap-4 mt-8 font-mono"
                  >
                    <Link
                      href="/start"
                      className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black px-6 py-3 text-sm font-medium transition-colors"
                    >
                      $ ./start.sh <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                      href="/blog"
                      className="inline-flex items-center gap-2 border border-emerald-500/30 text-emerald-400 hover:border-emerald-400 px-6 py-3 text-sm transition-colors"
                    >
                      $ cat ./articles.md
                    </Link>
                  </motion.div>
                )}
              </div>
            </section>

            {/* ── 2. NPM PACKAGES — Products ─────────────── */}
            <section className="relative px-6 py-20">
              <div className="max-w-4xl mx-auto">
                <Appear>
                  <p className="font-mono text-xs text-white/30 mb-2">$ npm ls @frankx --depth=0</p>
                  <div className="font-mono text-xs text-white/30 mb-6">frankx.ai@1.0.0</div>
                </Appear>
                <div className="space-y-2">
                  {products.map((p, i) => {
                    const pkgName = p.title.toLowerCase().replace(/\s+/g, '-')
                    const version = packageVersions[p.title] || 'v1.0.0'
                    const desc = packageDescriptions[p.title] || p.description
                    return (
                      <Appear key={p.title} delay={i * 0.08}>
                        <Link
                          href={p.href}
                          className="group flex items-start gap-3 rounded border border-white/[0.05] bg-white/[0.02] px-4 py-3 font-mono hover:border-emerald-500/30 hover:bg-emerald-950/20 transition-all"
                        >
                          <span className="text-white/20 flex-shrink-0">
                            {i === products.length - 1 ? '└──' : '├──'}
                          </span>
                          <div className="flex-1 min-w-0">
                            <span className="text-emerald-300 group-hover:text-white transition-colors">
                              @frankx/{pkgName}
                            </span>
                            <span className="text-yellow-400/70 ml-2">{version}</span>
                            <span className="text-white/20 ml-2 text-xs"># {desc}</span>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-white/20 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all flex-shrink-0 mt-0.5" />
                        </Link>
                      </Appear>
                    )
                  })}
                </div>
              </div>
            </section>

            {/* ── 3. FILE SYSTEM — Hubs ──────────────────── */}
            <section className="relative px-6 py-20">
              <div className="max-w-4xl mx-auto">
                <Appear>
                  <Terminal title="frankx@studio ~/frankx — bash">
                    <p className="text-white/30 mb-4 text-xs">$ ls -la ./frankx/</p>
                    <p className="text-white/20 text-xs mb-3">total 128</p>
                    {hubData.map((hub, i) => (
                      <Link
                        key={hub.name}
                        href={hub.href}
                        className="group flex items-center gap-4 text-xs py-1 hover:bg-white/[0.03] -mx-2 px-2 transition-colors"
                      >
                        <span className="text-white/20 w-24 flex-shrink-0">{hub.perms}</span>
                        <span className="text-white/20 w-6 flex-shrink-0 text-right">1</span>
                        <span className="text-white/30 w-8 flex-shrink-0">frank</span>
                        <span className="text-white/20 w-8 flex-shrink-0 text-right">{hub.size}</span>
                        <span className="text-emerald-300 group-hover:text-white transition-colors w-24 flex-shrink-0">
                          {hub.name}
                        </span>
                        <span className="text-white/30 group-hover:text-white/50 transition-colors">{hub.desc}</span>
                        <ArrowRight className="w-3 h-3 text-white/10 group-hover:text-emerald-400 ml-auto flex-shrink-0 transition-colors" />
                      </Link>
                    ))}
                  </Terminal>
                </Appear>
              </div>
            </section>

            {/* ── 4. GIT LOG — Blog posts ─────────────────── */}
            <section className="relative px-6 py-20">
              <div className="max-w-4xl mx-auto">
                <Appear>
                  <p className="font-mono text-xs text-white/30 mb-6">$ git log --oneline --all --graph</p>
                </Appear>
                <div className="space-y-1">
                  {latestPosts.slice(0, 6).map((post, i) => {
                    const hash = post.slug.slice(0, 7).replace(/-/g, '').padEnd(7, '0')
                    return (
                      <Appear key={post.slug} delay={i * 0.06}>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="group flex items-baseline gap-3 rounded border border-transparent hover:border-white/[0.06] hover:bg-white/[0.02] px-3 py-2 font-mono text-xs transition-all -mx-3"
                        >
                          <span className="text-white/20 flex-shrink-0">* </span>
                          <span className="text-yellow-500/70 flex-shrink-0 w-16">{hash}</span>
                          <span className="text-white/20 flex-shrink-0">[{post.category}]</span>
                          <span className="text-white/60 group-hover:text-white transition-colors flex-1 truncate">
                            {post.title}
                          </span>
                          <span className="text-white/20 flex-shrink-0 hidden sm:block">{post.readingTime}</span>
                          <span className="text-white/20 flex-shrink-0">{post.date}</span>
                        </Link>
                      </Appear>
                    )
                  })}
                </div>
                <Appear delay={0.4}>
                  <Link
                    href="/blog"
                    className="mt-6 inline-block font-mono text-xs text-white/30 hover:text-emerald-400 transition-colors"
                  >
                    → git log --all | head -n 99 # see all articles
                  </Link>
                </Appear>
              </div>
            </section>

            {/* ── 5. MUSIC PLAYER — ASCII terminal ─────────── */}
            <section className="relative px-6 py-20">
              <div className="max-w-4xl mx-auto">
                <Appear>
                  <Terminal title="frankx@studio ~/music — mpg123">
                    <p className="text-white/30 text-xs mb-6">$ mpg123 --quiet ./music/featured.mp3</p>
                    <TerminalPlayer track={featuredTrack} />
                  </Terminal>
                </Appear>
              </div>
            </section>

            {/* ── 6. BOOKS — reading list ──────────────────── */}
            {books.length > 0 && (
              <section className="relative px-6 py-20">
                <div className="max-w-4xl mx-auto">
                  <Appear>
                    <Terminal title="frankx@studio ~/library — cat reading-list.txt">
                      <p className="text-white/30 text-xs mb-4">$ cat ./library/index.txt</p>
                      <div className="space-y-3">
                        {books.map((book, i) => (
                          <Link
                            key={book.slug}
                            href={`/books/${book.slug}`}
                            className="group flex items-start gap-3 hover:bg-white/[0.03] -mx-2 px-2 py-1 transition-colors"
                          >
                            <span className="text-white/20 w-5 flex-shrink-0 font-mono text-xs">{i + 1}.</span>
                            <div>
                              <span className="font-mono text-xs text-emerald-300 group-hover:text-white transition-colors block">
                                {book.title}
                              </span>
                              <span className="font-mono text-xs text-white/30">{book.subtitle}</span>
                            </div>
                            <span className="ml-auto font-mono text-xs text-white/20 group-hover:text-emerald-400 transition-colors flex-shrink-0">
                              [read →]
                            </span>
                          </Link>
                        ))}
                      </div>
                    </Terminal>
                  </Appear>
                </div>
              </section>
            )}

            {/* ── 7. LEARNING — CLI help options ───────────── */}
            {learningCards && learningCards.length > 0 && (
              <section className="relative px-6 py-20">
                <div className="max-w-4xl mx-auto">
                  <Appear>
                    <Terminal title="frankx@studio — man frankx">
                      <p className="text-white/30 text-xs mb-2">$ frankx --help</p>
                      <p className="text-white/40 text-xs mb-1">USAGE</p>
                      <p className="text-white/30 text-xs mb-4 pl-4">frankx [COMMAND] [OPTIONS]</p>
                      <p className="text-white/40 text-xs mb-1">COMMANDS</p>
                      <div className="space-y-2">
                        {learningCards.map((card) => (
                          <Link
                            key={card.href}
                            href={card.href}
                            className="group flex items-start gap-4 pl-4 py-0.5 hover:bg-white/[0.02] -mx-5 px-5 transition-colors"
                          >
                            <span className="font-mono text-xs text-emerald-300 w-32 flex-shrink-0 group-hover:text-white transition-colors">
                              {card.title.toLowerCase().replace(/\s+/g, '-').slice(0, 20)}
                            </span>
                            <span className="font-mono text-xs text-white/30 group-hover:text-white/50 transition-colors flex-1">
                              {card.description}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </Terminal>
                  </Appear>
                </div>
              </section>
            )}

            {/* ── 8. FAQ — man page format ──────────────────── */}
            {faqs.length > 0 && (
              <section className="relative px-6 py-20">
                <div className="max-w-4xl mx-auto">
                  <Appear>
                    <Terminal title="frankx@studio — man frankx(8)">
                      <p className="text-white/40 text-xs mb-4 uppercase">FAQ / FREQUENTLY ASKED</p>
                      <div className="space-y-5">
                        {faqs.map((faq, i) => (
                          <div key={i}>
                            <p className="text-xs text-emerald-300 mb-1">Q: {faq.question}</p>
                            <p className="text-xs text-white/40 leading-relaxed pl-4">A: {faq.answer}</p>
                          </div>
                        ))}
                      </div>
                    </Terminal>
                  </Appear>
                </div>
              </section>
            )}

            {/* ── 9. SUBSCRIBE — curl command ───────────────── */}
            <section className="relative px-6 py-20">
              <div className="max-w-2xl mx-auto">
                <Appear>
                  <Terminal title="subscribe.sh — frankx newsletter">
                    <p className="text-white/30 text-xs mb-2">
                      # Subscribe to Creation Chronicles — weekly AI + creation dispatch
                    </p>
                    <p className="text-white/30 text-xs mb-6">
                      $ curl -X POST frankx.ai/api/subscribe \
                    </p>
                    <div className="border-t border-white/[0.06] pt-6">
                      <EmailSignup
                        listType="newsletter"
                        placeholder="your@email.dev"
                        buttonText="Subscribe"
                      />
                      <p className="text-xs text-white/20 mt-3 font-mono">
                        # 200 OK — unsubscribe any time
                      </p>
                    </div>
                  </Terminal>
                </Appear>
              </div>
            </section>

            {/* ── FOOTER ────────────────────────────────────── */}
            <footer className="border-t border-white/[0.06] px-6 py-8">
              <div className="max-w-4xl mx-auto">
                <div className="font-mono text-xs text-white/20 space-y-1">
                  <p>frankx@studio:~$ uname -a</p>
                  <p className="text-white/10">
                    FrankX 1.0.0 #1 SMP PREEMPT_DYNAMIC x86_64 — frankx.ai // v3.terminal
                  </p>
                </div>
                <div className="flex items-center justify-between mt-4 font-mono text-xs text-white/20">
                  <span>© {new Date().getFullYear()} Frank Riemer</span>
                  <Link href="/home" className="hover:text-emerald-400 transition-colors">
                    $ ls ./variations/ →
                  </Link>
                </div>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
