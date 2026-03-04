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
    <motion.div initial={reduce ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay }}>
      {children}
    </motion.div>
  )
}

function MiniPlayer({ track }: { track: HomepageData['featuredTrack'] }) {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const toggle = useCallback(() => {
    if (!audioRef.current) return
    if (playing) audioRef.current.pause()
    else { audioRef.current.play(); trackEvent('homepage_track_play', { variation: 'v8', title: track.title }) }
    setPlaying(!playing)
  }, [playing, track.title])
  useEffect(() => {
    const a = audioRef.current; if (!a) return
    const end = () => setPlaying(false)
    a.addEventListener('ended', end); return () => a.removeEventListener('ended', end)
  }, [])

  return (
    <div className="flex items-center gap-3">
      <audio ref={audioRef} src={track.audioUrl} preload="none" />
      <button onClick={toggle} className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center" aria-label={playing ? 'Pause' : 'Play'}>
        {playing ? <Pause className="w-4 h-4 text-emerald-400" /> : <Play className="w-4 h-4 text-emerald-400 ml-0.5" />}
      </button>
      <div>
        <p className="text-sm font-medium text-white">{track.title}</p>
        <p className="text-xs text-white/40">{track.genre.join(', ')}</p>
      </div>
    </div>
  )
}

export default function HomeV8({ latestPosts, faqs, featuredTrack, books, products, designLabImages, credentials }: HomepageData) {
  useEffect(() => { trackEvent('homepage_view', { variation: 'v8-split' }) }, [])

  const techProducts = products.filter(p => ['Agentic Creator OS', 'AI Architecture Hub', 'Prompt Library'].includes(p.title))
  const creativeProducts = products.filter(p => ['Music Lab', 'Design Lab', 'Creator Kit'].includes(p.title))
  const techPosts = latestPosts.filter(p => ['ai-architecture', 'engineering', 'tools'].includes(p.category.toLowerCase())).slice(0, 3)
  const creativePosts = latestPosts.filter(p => !['ai-architecture', 'engineering', 'tools'].includes(p.category.toLowerCase())).slice(0, 3)
  const fallbackTech = techPosts.length > 0 ? techPosts : latestPosts.slice(0, 3)
  const fallbackCreative = creativePosts.length > 0 ? creativePosts : latestPosts.slice(3, 6)

  return (
    <main className="relative min-h-screen bg-[#0a0a0b] text-white overflow-x-hidden">
      {/* Hero — Full width */}
      <section className="min-h-[60vh] flex items-center px-6 py-24">
        <div className="max-w-6xl mx-auto w-full text-center">
          <Reveal>
            <p className="text-xs tracking-[0.3em] uppercase text-white/30 mb-4">Two Sides. One Creator.</p>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              <span className="text-blue-400">Architect</span> <span className="text-white/20">×</span> <span className="text-emerald-400">Creator</span>
            </h1>
            <p className="text-lg text-white/40 max-w-lg mx-auto">
              Enterprise AI systems by day. 12,000+ songs by night. The full stack of intelligence.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Authority bar */}
      <div className="border-y border-white/5 py-4">
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {credentials.map((c) => (
            <span key={c} className="text-xs text-white/30">{c}</span>
          ))}
        </div>
      </div>

      {/* Split content — Main area */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-px bg-white/5">
          {/* LEFT: The Architect (blue) */}
          <div className="bg-[#0a0a0b] p-6 md:p-10">
            <Reveal>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <h2 className="text-2xl font-bold text-blue-400">The Architect</h2>
              </div>
            </Reveal>

            {/* Tech products */}
            <div className="space-y-3 mb-8">
              {techProducts.map((p, i) => (
                <Reveal key={p.title} delay={i * 0.06}>
                  <Link href={p.href} className="group block rounded-xl border border-blue-500/10 bg-blue-950/10 p-4 hover:border-blue-500/30 transition-all">
                    <h3 className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">{p.title}</h3>
                    <p className="text-xs text-white/40 mt-1">{p.description}</p>
                  </Link>
                </Reveal>
              ))}
            </div>

            {/* Tech image */}
            <Reveal>
              <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-8">
                <Image src="/images/blog/production-agentic-ai-systems-hero.png" alt="AI Architecture" fill className="object-cover" sizes="50vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b]/60 to-transparent" />
              </div>
            </Reveal>

            {/* Tech posts */}
            <div className="space-y-2">
              {fallbackTech.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex items-center gap-3 py-2 hover:text-blue-400 transition-colors">
                  <span className="text-xs text-blue-500/40">→</span>
                  <span className="text-sm line-clamp-1">{post.title}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* RIGHT: The Creator (emerald) */}
          <div className="bg-[#0a0a0b] p-6 md:p-10">
            <Reveal>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <h2 className="text-2xl font-bold text-emerald-400">The Creator</h2>
              </div>
            </Reveal>

            {/* Creative products */}
            <div className="space-y-3 mb-8">
              {creativeProducts.map((p, i) => (
                <Reveal key={p.title} delay={i * 0.06}>
                  <Link href={p.href} className="group block rounded-xl border border-emerald-500/10 bg-emerald-950/10 p-4 hover:border-emerald-500/30 transition-all">
                    <h3 className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors">{p.title}</h3>
                    <p className="text-xs text-white/40 mt-1">{p.description}</p>
                  </Link>
                </Reveal>
              ))}
            </div>

            {/* Featured track */}
            <Reveal>
              <div className="mb-8">
                <p className="text-xs text-emerald-400/40 uppercase tracking-wider mb-3">Now Playing</p>
                <MiniPlayer track={featuredTrack} />
              </div>
            </Reveal>

            {/* Design lab images */}
            <Reveal>
              <div className="grid grid-cols-3 gap-2 mb-8">
                {designLabImages.slice(0, 3).map((img) => (
                  <div key={img.src} className="relative aspect-square rounded-lg overflow-hidden">
                    <Image src={img.src} alt={img.alt} fill className="object-cover hover:scale-110 transition-transform duration-500" sizes="150px" />
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Creative posts */}
            <div className="space-y-2">
              {fallbackCreative.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex items-center gap-3 py-2 hover:text-emerald-400 transition-colors">
                  <span className="text-xs text-emerald-500/40">→</span>
                  <span className="text-sm line-clamp-1">{post.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Full-width sections: Books, Newsletter, FAQ */}
      {books.length > 0 && (
        <section className="py-16 px-6 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <Reveal><h2 className="text-2xl font-bold mb-8">Library</h2></Reveal>
            <div className="flex gap-4 overflow-x-auto pb-4">
              {books.map((book, i) => (
                <Reveal key={book.slug} delay={i * 0.06}>
                  <Link href={`/books/${book.slug}`} className="group flex-shrink-0 w-[120px]">
                    <div className="relative aspect-[2/3] rounded-lg overflow-hidden mb-2">
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
            <h2 className="text-3xl font-bold mb-4">Both sides. One newsletter.</h2>
            <p className="text-white/40 mb-8">Architecture + creation. Weekly dispatch.</p>
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
          <span>frankx.ai // v8.split</span>
          <Link href="/home" className="hover:text-white/50 transition-colors">all variations</Link>
        </div>
      </footer>
    </main>
  )
}
