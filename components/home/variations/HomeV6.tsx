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
    <motion.div initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, delay }}>
      {children}
    </motion.div>
  )
}

// ── Timeline node ──

function TimelineNode({ active = false }: { active?: boolean }) {
  return (
    <div className="flex flex-col items-center flex-shrink-0">
      <div className={`w-4 h-4 rounded-full border-2 ${active ? 'bg-emerald-500 border-emerald-400' : 'bg-transparent border-white/20'}`} />
      <div className="w-px flex-1 bg-white/10 min-h-[40px]" />
    </div>
  )
}

// ── Chapter wrapper ──

function Chapter({
  number,
  title,
  active,
  children,
}: {
  number: string
  title: string
  active?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="flex gap-6 md:gap-10 min-h-[300px]">
      <TimelineNode active={active} />
      <div className="pb-16 flex-1">
        <Reveal>
          <p className="text-xs tracking-[0.3em] uppercase text-emerald-400/50 mb-2">Chapter {number}</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">{title}</h2>
        </Reveal>
        {children}
      </div>
    </div>
  )
}

function MiniPlayer({ track }: { track: HomepageData['featuredTrack'] }) {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const toggle = useCallback(() => {
    if (!audioRef.current) return
    if (playing) audioRef.current.pause()
    else { audioRef.current.play(); trackEvent('homepage_track_play', { variation: 'v6', title: track.title }) }
    setPlaying(!playing)
  }, [playing, track.title])
  useEffect(() => {
    const a = audioRef.current; if (!a) return
    const end = () => setPlaying(false)
    a.addEventListener('ended', end); return () => a.removeEventListener('ended', end)
  }, [])

  return (
    <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
      <audio ref={audioRef} src={track.audioUrl} preload="none" />
      <button onClick={toggle} className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center" aria-label={playing ? 'Pause' : 'Play'}>
        {playing ? <Pause className="w-5 h-5 text-emerald-400" /> : <Play className="w-5 h-5 text-emerald-400 ml-0.5" />}
      </button>
      <div>
        <p className="text-sm font-medium text-white">{track.title}</p>
        <p className="text-xs text-white/40">{track.genre.join(', ')}</p>
      </div>
    </div>
  )
}

export default function HomeV6({ latestPosts, faqs, featuredTrack, books, products, designLabImages, credentials }: HomepageData) {
  useEffect(() => { trackEvent('homepage_view', { variation: 'v6-narrative' }) }, [])

  return (
    <main className="relative min-h-screen bg-[#0a0a0b] text-white overflow-x-hidden">
      {/* Hero — Story intro */}
      <section className="min-h-[70vh] flex items-center px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <p className="text-xs tracking-[0.3em] uppercase text-emerald-400/50 mb-4">The Story So Far</p>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[0.95] mb-8">
              Every creator<br />has a <span className="text-emerald-400">path.</span>
            </h1>
            <p className="text-lg text-white/40 max-w-xl mb-4">
              This is a journey from enterprise architecture to 12,000 songs, from open-source tools to published books.
              Not a portfolio — a story.
            </p>
            <blockquote className="border-l-2 border-emerald-500/30 pl-4 italic text-white/25 text-base">
              &ldquo;I create to understand. I share to teach.&rdquo;
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* Authority bar */}
      <div className="border-y border-white/5 py-4 mb-16">
        <div className="max-w-4xl mx-auto px-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {credentials.map((c) => (
            <span key={c} className="text-xs text-white/30 font-medium">{c}</span>
          ))}
        </div>
      </div>

      {/* Timeline chapters */}
      <div className="max-w-4xl mx-auto px-6">
        {/* Chapter 1: The Architect */}
        <Chapter number="I" title="The Architect" active>
          <Reveal delay={0.1}>
            <p className="text-white/50 leading-relaxed mb-6">
              Enterprise AI systems at Oracle. Multi-agent orchestration, production patterns, and agentic workflows — documented in technical depth.
            </p>
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-6">
              <Image src="/images/blog/production-agentic-ai-systems-hero.png" alt="Production AI Systems" fill className="object-cover" sizes="800px" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b]/60 to-transparent" />
            </div>
            <Link href="/ai-architecture" className="inline-flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300 transition-colors">
              Explore AI Architecture <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </Chapter>

        {/* Chapter 2: The Creator */}
        <Chapter number="II" title="The Creator" active>
          <Reveal delay={0.1}>
            <p className="text-white/50 leading-relaxed mb-6">
              12,000+ AI songs produced with Suno. Genre mastery from orchestral to hip hop. The studio where prompt engineering meets sonic craft.
            </p>
            <MiniPlayer track={featuredTrack} />
            <Link href="/music" className="mt-4 inline-flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300 transition-colors">
              Enter Music Lab <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </Chapter>

        {/* Chapter 3: The Builder */}
        <Chapter number="III" title="The Builder" active>
          <Reveal delay={0.1}>
            <p className="text-white/50 leading-relaxed mb-6">
              Open-source tools, premium resources, and creative systems — built for builders who ship.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {products.slice(0, 4).map((p) => (
                <Link key={p.title} href={p.href} className="group rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 hover:border-white/20 transition-all">
                  <h3 className="text-sm font-semibold group-hover:text-emerald-400 transition-colors">{p.title}</h3>
                  <p className="text-xs text-white/40 mt-1">{p.description}</p>
                </Link>
              ))}
            </div>
          </Reveal>
        </Chapter>

        {/* Chapter 4: The Teacher */}
        <Chapter number="IV" title="The Teacher">
          <Reveal delay={0.1}>
            <p className="text-white/50 leading-relaxed mb-6">
              Blog articles, published books, and learning resources. Everything documented, everything shared.
            </p>
            <div className="space-y-3 mb-6">
              {latestPosts.slice(0, 3).map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex items-center gap-4 rounded-xl bg-white/[0.03] p-3 hover:bg-white/[0.06] transition-colors">
                  {post.image && (
                    <div className="relative w-16 h-12 rounded-lg overflow-hidden flex-shrink-0">
                      <Image src={post.image} alt={post.title} fill className="object-cover" sizes="64px" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-medium group-hover:text-emerald-400 transition-colors line-clamp-1">{post.title}</p>
                    <p className="text-xs text-white/30">{post.readingTime}</p>
                  </div>
                </Link>
              ))}
            </div>
            {books.length > 0 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {books.slice(0, 6).map((book) => (
                  <Link key={book.slug} href={`/books/${book.slug}`} className="flex-shrink-0 w-[80px] group">
                    <div className="relative aspect-[2/3] rounded-lg overflow-hidden">
                      <Image src={book.coverImage} alt={book.title} fill className="object-cover group-hover:scale-105 transition-transform" sizes="80px" />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </Reveal>
        </Chapter>

        {/* Chapter 5: The Future */}
        <Chapter number="V" title="The Future">
          <Reveal delay={0.1}>
            <p className="text-white/50 leading-relaxed mb-6">
              The story continues. Subscribe for the next chapter.
            </p>
            <div className="max-w-md">
              <EmailSignup listType="newsletter" placeholder="your@email.com" buttonText="Subscribe" compact />
            </div>
          </Reveal>
        </Chapter>
      </div>

      {/* Design Lab gallery */}
      <section className="py-16 px-4 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-2xl font-bold mb-8 px-2">Visual Experiments</h2>
          </Reveal>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {designLabImages.map((img, i) => (
              <motion.div key={img.src} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="relative aspect-square rounded-xl overflow-hidden">
                <Image src={img.src} alt={img.alt} fill className="object-cover hover:scale-110 transition-transform duration-500" sizes="150px" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="py-16 px-6 border-t border-white/5">
          <div className="max-w-3xl mx-auto">
            <Reveal><h2 className="text-2xl font-bold text-center mb-8">Frequently Asked</h2></Reveal>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <details className="group rounded-xl border border-white/[0.08] bg-white/[0.03]">
                    <summary className="cursor-pointer p-4 text-sm font-medium text-white list-none flex justify-between">
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
        <div className="max-w-4xl mx-auto flex justify-between text-xs text-white/20">
          <span>frankx.ai // v6.narrative</span>
          <Link href="/home" className="hover:text-white/50 transition-colors">all variations</Link>
        </div>
      </footer>
    </main>
  )
}
