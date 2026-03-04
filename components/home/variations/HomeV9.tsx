'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useRef, useState, useCallback, useEffect } from 'react'
import { ArrowRight, Play, Pause, Volume2 } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'
import { EmailSignup } from '@/components/email-signup'
import type { HomepageData } from '@/lib/homepage-data'

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const reduce = useReducedMotion()
  return (
    <motion.div initial={reduce ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay }}>
      {children}
    </motion.div>
  )
}

// ── Waveform bars ──
function WaveformBars({ active, count = 32 }: { active: boolean; count?: number }) {
  return (
    <div className="flex items-end gap-px h-16">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="flex-1 bg-emerald-500/40 rounded-t-sm min-w-[2px]"
          animate={active ? { height: ['20%', '80%', '40%', '100%', '30%'] } : { height: '20%' }}
          transition={active ? { duration: 0.6 + Math.random() * 0.4, repeat: Infinity, delay: i * 0.03 } : { duration: 0.3 }}
        />
      ))}
    </div>
  )
}

// ── Hero player ──
function HeroPlayer({ track }: { track: HomepageData['featuredTrack'] }) {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const toggle = useCallback(() => {
    if (!audioRef.current) return
    if (playing) audioRef.current.pause()
    else { audioRef.current.play(); trackEvent('homepage_track_play', { variation: 'v9', title: track.title }) }
    setPlaying(!playing)
  }, [playing, track.title])
  useEffect(() => {
    const a = audioRef.current; if (!a) return
    const end = () => setPlaying(false)
    a.addEventListener('ended', end); return () => a.removeEventListener('ended', end)
  }, [])

  return (
    <div>
      <audio ref={audioRef} src={track.audioUrl} preload="none" />

      {/* Large play button */}
      <div className="flex flex-col items-center mb-8">
        <button
          onClick={toggle}
          className="w-24 h-24 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 backdrop-blur-xl border border-emerald-500/30 flex items-center justify-center transition-all mb-4"
          aria-label={playing ? 'Pause' : 'Play'}
        >
          {playing ? <Pause className="w-10 h-10 text-emerald-400" /> : <Play className="w-10 h-10 text-emerald-400 ml-1" />}
        </button>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">{track.title}</h2>
        <p className="text-sm text-white/40">{track.genre.join(', ')} · {track.duration}</p>
      </div>

      {/* Waveform */}
      <div className="max-w-2xl mx-auto">
        <WaveformBars active={playing} />
      </div>

      {/* Now playing bar */}
      {playing && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 flex items-center justify-center gap-3 text-sm text-emerald-400/60"
        >
          <Volume2 className="w-4 h-4" />
          <span>Now playing</span>
          <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-2 h-2 rounded-full bg-emerald-400" />
        </motion.div>
      )}
    </div>
  )
}

export default function HomeV9({ latestPosts, faqs, featuredTrack, books, products, designLabImages, credentials }: HomepageData) {
  useEffect(() => { trackEvent('homepage_view', { variation: 'v9-audio-visual' }) }, [])

  return (
    <main className="relative min-h-screen bg-[#050505] text-white overflow-x-hidden">
      {/* Ambient particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-emerald-400/20"
            style={{ left: `${15 + i * 15}%`, top: `${20 + i * 10}%` }}
            animate={{ y: [0, -30, 0], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.5 }}
          />
        ))}
      </div>

      {/* Hero — Music-first */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-4xl text-center">
          <Reveal>
            <p className="text-xs tracking-[0.3em] uppercase text-emerald-400/40 mb-6">Press play to begin</p>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
              FrankX<span className="text-emerald-400">.</span>
            </h1>
            <p className="text-lg text-white/30 max-w-lg mx-auto mb-12">
              AI Architect. Music Creator. Everything is sound.
            </p>
          </Reveal>
          <HeroPlayer track={featuredTrack} />
        </div>
      </section>

      {/* Authority */}
      <div className="border-y border-white/5 py-4">
        <div className="max-w-4xl mx-auto px-6 flex flex-wrap justify-center gap-x-6 gap-y-2">
          {credentials.map((c) => (
            <span key={c} className="text-xs text-white/20">{c}</span>
          ))}
        </div>
      </div>

      {/* Products with genre-colored accents */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-3xl font-bold mb-10 text-center">The Studio</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((p, i) => {
              const colors = ['emerald', 'violet', 'cyan', 'blue', 'orange', 'pink']
              const c = colors[i % colors.length]
              return (
                <Reveal key={p.title} delay={i * 0.08}>
                  <Link href={p.href} className="group block rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 hover:border-white/20 transition-all">
                    <div className={`w-8 h-1 rounded-full bg-${c}-500/50 mb-4`} />
                    <h3 className="text-base font-semibold group-hover:text-emerald-400 transition-colors mb-1">{p.title}</h3>
                    <p className="text-xs text-white/40">{p.description}</p>
                  </Link>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Design lab — ambient visuals */}
      <section className="py-16 px-4 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-2xl font-bold mb-8 px-2">Visual Frequencies</h2>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {designLabImages.map((img, i) => (
              <motion.div
                key={img.src}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="relative aspect-square rounded-2xl overflow-hidden group"
              >
                <Image src={img.src} alt={img.alt} fill className="object-cover group-hover:scale-110 transition-transform duration-700" sizes="33vw" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest articles */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="flex items-end justify-between mb-10">
              <h2 className="text-2xl font-bold">Latest</h2>
              <Link href="/blog" className="text-xs text-white/30 hover:text-white flex items-center gap-1">All <ArrowRight className="w-3 h-3" /></Link>
            </div>
          </Reveal>
          <div className="space-y-3">
            {latestPosts.slice(0, 4).map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.06}>
                <Link href={`/blog/${post.slug}`} className="group flex items-center gap-4 rounded-xl bg-white/[0.03] p-4 hover:bg-white/[0.06] transition-colors">
                  {post.image && (
                    <div className="relative w-16 h-12 rounded-lg overflow-hidden flex-shrink-0">
                      <Image src={post.image} alt={post.title} fill className="object-cover" sizes="64px" />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium group-hover:text-emerald-400 transition-colors line-clamp-1">{post.title}</p>
                    <p className="text-xs text-white/30">{post.category} · {post.readingTime}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Books */}
      {books.length > 0 && (
        <section className="py-16 px-6 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <Reveal><h2 className="text-2xl font-bold mb-8">Library</h2></Reveal>
            <div className="flex gap-4 overflow-x-auto pb-4">
              {books.map((book, i) => (
                <Reveal key={book.slug} delay={i * 0.05}>
                  <Link href={`/books/${book.slug}`} className="group flex-shrink-0 w-[120px]">
                    <div className="relative aspect-[2/3] rounded-xl overflow-hidden mb-2">
                      <Image src={book.coverImage} alt={book.title} fill className="object-cover group-hover:scale-105 transition-transform" sizes="120px" />
                    </div>
                    <p className="text-xs font-medium group-hover:text-emerald-400 transition-colors line-clamp-1">{book.title}</p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-2xl mx-auto text-center">
          <Reveal>
            <h2 className="text-3xl font-bold mb-4">Tune in weekly.</h2>
            <p className="text-white/40 mb-8">Architecture, music, and creation. One frequency.</p>
            <div className="max-w-sm mx-auto">
              <EmailSignup listType="newsletter" placeholder="your@email.com" buttonText="Subscribe" compact />
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="py-16 px-6 border-t border-white/5">
          <div className="max-w-3xl mx-auto">
            <Reveal><h2 className="text-2xl font-bold text-center mb-8">FAQ</h2></Reveal>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <details className="group rounded-xl border border-white/[0.08] bg-white/[0.03]">
                    <summary className="cursor-pointer p-4 text-sm font-medium list-none flex justify-between">
                      {faq.question}
                      <span className="text-white/40 group-open:rotate-45 transition-transform">+</span>
                    </summary>
                    <div className="px-4 pb-4 text-sm text-white/50">{faq.answer}</div>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <footer className="border-t border-white/5 px-6 py-6">
        <div className="max-w-6xl mx-auto flex justify-between text-xs text-white/20">
          <span>frankx.ai // v9.audio</span>
          <Link href="/home" className="hover:text-white/50 transition-colors">all variations</Link>
        </div>
      </footer>
    </main>
  )
}
