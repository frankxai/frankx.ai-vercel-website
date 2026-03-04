'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useRef, useState, useCallback, useEffect } from 'react'
import { ArrowRight, Play, Pause } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'
import { EmailSignup } from '@/components/email-signup'
import type { HomepageData } from '@/lib/homepage-data'

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const reduce = useReducedMotion()
  return (
    <motion.div initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay }}>
      {children}
    </motion.div>
  )
}

function RuneBorder({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative rounded-2xl border border-amber-500/20 bg-amber-950/10 overflow-hidden ${className}`}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
      {children}
    </div>
  )
}

function MiniPlayer({ track }: { track: HomepageData['featuredTrack'] }) {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const toggle = useCallback(() => {
    if (!audioRef.current) return
    if (playing) audioRef.current.pause()
    else { audioRef.current.play(); trackEvent('homepage_track_play', { variation: 'v7', title: track.title }) }
    setPlaying(!playing)
  }, [playing, track.title])
  useEffect(() => {
    const a = audioRef.current; if (!a) return
    const end = () => setPlaying(false)
    a.addEventListener('ended', end); return () => a.removeEventListener('ended', end)
  }, [])

  return (
    <div className="flex items-center gap-4 p-4 rounded-xl border border-amber-500/20 bg-amber-950/10">
      <audio ref={audioRef} src={track.audioUrl} preload="none" />
      <button onClick={toggle} className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center" aria-label={playing ? 'Pause' : 'Play'}>
        {playing ? <Pause className="w-5 h-5 text-amber-400" /> : <Play className="w-5 h-5 text-amber-400 ml-0.5" />}
      </button>
      <div>
        <p className="text-sm font-medium text-amber-100">{track.title}</p>
        <p className="text-xs text-amber-400/50">{track.genre.join(', ')}</p>
      </div>
    </div>
  )
}

export default function HomeV7({ latestPosts, faqs, featuredTrack, books, products, designLabImages }: HomepageData) {
  useEffect(() => { trackEvent('homepage_view', { variation: 'v7-arcanean' }) }, [])

  const gates = products.map((p, i) => ({
    ...p,
    gate: ['I', 'II', 'III', 'IV', 'V', 'VI'][i] || String(i + 1),
  }))

  return (
    <main className="relative min-h-screen bg-[#0d0a05] text-amber-100 overflow-x-hidden">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.04) 0%, transparent 70%)', filter: 'blur(128px)' }} />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.03) 0%, transparent 70%)', filter: 'blur(128px)' }} />
      </div>

      {/* Hero — Arcanea cinematic banner */}
      <section className="relative min-h-[80vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/arcanea/eldrian-conclave-20260301.png" alt="The Eldrian Conclave" fill className="object-cover" sizes="100vw" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0a05] via-[#0d0a05]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d0a05]/70 to-transparent" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 pb-16 w-full">
          <Reveal>
            <p className="text-xs tracking-[0.4em] uppercase text-amber-400/60 mb-3">⟡ The Arcanean Archive ⟡</p>
            <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight leading-[0.95] mb-4">
              Where creation<br />meets <span className="text-amber-400">myth.</span>
            </h1>
            <p className="text-lg text-amber-200/40 max-w-lg mb-8">
              Five Eldrian guardians. Ten gates of mastery. A living world-state where AI meets mythology.
            </p>
            <div className="flex gap-4">
              <Link href="/arcanea" className="inline-flex items-center gap-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 text-amber-200 px-6 py-3 text-sm font-medium transition-colors">
                Enter Arcanea <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/start" className="inline-flex items-center gap-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-amber-100/70 px-6 py-3 text-sm font-medium transition-colors">
                Explore the Work
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Gates of Mastery — Products */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <p className="text-xs tracking-[0.3em] uppercase text-amber-400/40 mb-2">⟡ Gates of Mastery ⟡</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-10">The Six Gates</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {gates.map((g, i) => (
              <Reveal key={g.title} delay={i * 0.08}>
                <RuneBorder>
                  <Link href={g.href} className="group block p-6">
                    <p className="text-xs text-amber-500/50 font-mono mb-2">Gate {g.gate}</p>
                    <h3 className="text-lg font-semibold text-amber-100 group-hover:text-amber-400 transition-colors mb-2">{g.title}</h3>
                    <p className="text-sm text-amber-200/40">{g.description}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-xs text-amber-400/40 group-hover:text-amber-400 transition-colors">
                      Enter <ArrowRight className="w-3 h-3" />
                    </span>
                  </Link>
                </RuneBorder>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Eldrian guardian divider */}
      <div className="py-8">
        <div className="flex justify-center gap-8 overflow-x-auto px-6">
          {[
            { src: '/images/arcanea/eldrian-aethelin-20260228.png', name: 'Aethelin' },
            { src: '/images/arcanea/eldrian-solrex-20260301.png', name: 'Solrex' },
            { src: '/images/arcanea/eldrian-velmara-20260301.png', name: 'Velmara' },
            { src: '/images/arcanea/eldrian-korghast-20260228.png', name: 'Korghast' },
            { src: '/images/arcanea/eldrian-zyranthis-20260301.png', name: 'Zyranthis' },
          ].map((e, i) => (
            <Reveal key={e.name} delay={i * 0.1}>
              <div className="flex-shrink-0 text-center">
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-amber-500/30 mx-auto">
                  <Image src={e.src} alt={e.name} fill className="object-cover" sizes="80px" />
                </div>
                <p className="text-xs text-amber-400/50 mt-2">{e.name}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* The Sonic Forge — Music */}
      <section className="py-24 px-6 border-t border-amber-500/10">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <p className="text-xs tracking-[0.3em] uppercase text-amber-400/40 mb-2">⟡ The Sonic Forge ⟡</p>
            <h2 className="font-serif text-3xl font-bold mb-6">12,000 songs and counting</h2>
            <MiniPlayer track={featuredTrack} />
          </Reveal>
        </div>
      </section>

      {/* The Codex — Blog posts */}
      <section className="py-24 px-6 border-t border-amber-500/10">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <p className="text-xs tracking-[0.3em] uppercase text-amber-400/40 mb-2">⟡ The Codex ⟡</p>
            <h2 className="font-serif text-3xl font-bold mb-8">Recent Inscriptions</h2>
          </Reveal>
          <div className="space-y-3">
            {latestPosts.slice(0, 4).map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.06}>
                <Link href={`/blog/${post.slug}`} className="group flex items-center gap-4 rounded-xl border border-amber-500/10 bg-amber-950/10 p-4 hover:border-amber-500/30 transition-all">
                  {post.image && (
                    <div className="relative w-16 h-12 rounded-lg overflow-hidden flex-shrink-0">
                      <Image src={post.image} alt={post.title} fill className="object-cover" sizes="64px" />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-amber-100 group-hover:text-amber-400 transition-colors line-clamp-1">{post.title}</p>
                    <p className="text-xs text-amber-200/30">{post.category} · {post.readingTime}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* The Library — Books */}
      {books.length > 0 && (
        <section className="py-24 px-6 border-t border-amber-500/10">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <p className="text-xs tracking-[0.3em] uppercase text-amber-400/40 mb-2">⟡ The Library ⟡</p>
              <h2 className="font-serif text-3xl font-bold mb-8">Sacred Texts</h2>
            </Reveal>
            <div className="flex gap-4 overflow-x-auto pb-4">
              {books.map((book, i) => (
                <Reveal key={book.slug} delay={i * 0.06}>
                  <Link href={`/books/${book.slug}`} className="group flex-shrink-0 w-[130px]">
                    <div className="relative aspect-[2/3] rounded-xl overflow-hidden border border-amber-500/20 mb-2">
                      <Image src={book.coverImage} alt={book.title} fill className="object-cover group-hover:scale-105 transition-transform" sizes="130px" />
                    </div>
                    <p className="text-xs font-medium text-amber-100 group-hover:text-amber-400 transition-colors line-clamp-1">{book.title}</p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter — Oracle inscription */}
      <section className="py-24 px-6 border-t border-amber-500/10">
        <div className="max-w-2xl mx-auto text-center">
          <Reveal>
            <p className="text-xs tracking-[0.3em] uppercase text-amber-400/40 mb-3">⟡ The Signal ⟡</p>
            <h2 className="font-serif text-3xl font-bold mb-4">Receive the dispatch</h2>
            <p className="text-amber-200/40 mb-8">Weekly transmissions from the intersection of code and myth.</p>
            <div className="max-w-sm mx-auto">
              <EmailSignup listType="newsletter" placeholder="your@email.com" buttonText="Subscribe" compact />
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="py-16 px-6 border-t border-amber-500/10">
          <div className="max-w-3xl mx-auto">
            <Reveal><h2 className="font-serif text-2xl font-bold text-center mb-8">Questions</h2></Reveal>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <details className="group">
                    <RuneBorder className="p-0">
                      <summary className="cursor-pointer p-4 text-sm font-medium text-amber-100 list-none flex justify-between">
                        {faq.question}
                        <span className="text-amber-400/40 group-open:rotate-45 transition-transform">+</span>
                      </summary>
                      <div className="px-4 pb-4 text-sm text-amber-200/40">{faq.answer}</div>
                    </RuneBorder>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <footer className="border-t border-amber-500/10 px-6 py-6">
        <div className="max-w-6xl mx-auto flex justify-between text-xs text-amber-400/20">
          <span>frankx.ai // v7.arcanean</span>
          <Link href="/home" className="hover:text-amber-400/50 transition-colors">all variations</Link>
        </div>
      </footer>
    </main>
  )
}
