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
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
    >
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
    else { audioRef.current.play(); trackEvent('homepage_track_play', { variation: 'v4', title: track.title }) }
    setPlaying(!playing)
  }, [playing, track.title])
  useEffect(() => {
    const a = audioRef.current; if (!a) return
    const end = () => setPlaying(false)
    a.addEventListener('ended', end); return () => a.removeEventListener('ended', end)
  }, [])

  return (
    <div className="flex items-center gap-4 py-4 border-t border-stone-300/30">
      <audio ref={audioRef} src={track.audioUrl} preload="none" />
      <button onClick={toggle} className="w-10 h-10 rounded-full bg-stone-900 flex items-center justify-center" aria-label={playing ? 'Pause' : 'Play'}>
        {playing ? <Pause className="w-4 h-4 text-stone-100" /> : <Play className="w-4 h-4 text-stone-100 ml-0.5" />}
      </button>
      <div>
        <p className="text-sm font-medium text-stone-900">{track.title}</p>
        <p className="text-xs text-stone-500">{track.genre.join(', ')} · {track.duration}</p>
      </div>
    </div>
  )
}

export default function HomeV4({ latestPosts, faqs, featuredTrack, books, products, designLabImages, credentials }: HomepageData) {
  useEffect(() => { trackEvent('homepage_view', { variation: 'v4-magazine' }) }, [])

  return (
    <main className="relative min-h-screen bg-[#faf8f5] text-stone-900 selection:bg-emerald-200/50 overflow-x-hidden">
      {/* Masthead */}
      <header className="border-b border-stone-300/50 py-6">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <h1 className="font-serif text-3xl md:text-4xl font-bold tracking-tight">FrankX</h1>
          <div className="hidden sm:flex items-center gap-6 text-xs text-stone-500 uppercase tracking-widest">
            <Link href="/blog" className="hover:text-stone-900 transition-colors">Articles</Link>
            <Link href="/music" className="hover:text-stone-900 transition-colors">Music</Link>
            <Link href="/books" className="hover:text-stone-900 transition-colors">Books</Link>
            <Link href="/about" className="hover:text-stone-900 transition-colors">About</Link>
          </div>
        </div>
      </header>

      {/* Hero — Editorial spread */}
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <p className="text-xs tracking-[0.3em] uppercase text-emerald-700/60 font-medium mb-4">Issue 01 — March 2026</p>
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight mb-6">
              <span className="italic">Building</span> intelligence<br />that compounds.
            </h2>
            <p className="text-lg text-stone-600 leading-relaxed max-w-md mb-6">
              AI Architect at Oracle. 12,000+ songs with Suno. 75+ open-source skills shipped. Everything documented.
            </p>
            <blockquote className="border-l-2 border-emerald-600/40 pl-4 italic text-stone-400 text-base">
              &ldquo;I create to understand. I share to teach.&rdquo;
            </blockquote>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden">
              <Image src="/images/arcanea/eldrian-conclave-20260301.png" alt="The Eldrian Conclave" fill className="object-cover" sizes="50vw" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Authority byline */}
      <div className="border-y border-stone-300/50 py-4">
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {credentials.map((c, i) => (
            <span key={c} className="flex items-center gap-6">
              {i > 0 && <span className="hidden sm:block w-[3px] h-[3px] rounded-full bg-stone-400" />}
              <span className="text-xs text-stone-500 font-medium tracking-wide uppercase">{c}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Table of Contents — Products */}
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <Reveal>
          <p className="text-xs tracking-[0.3em] uppercase text-stone-400 font-medium mb-2">Table of Contents</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight mb-10">What&rsquo;s Inside</h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <Link href={p.href} className="group block border-t border-stone-300/50 pt-4">
                <span className="text-xs text-stone-400 font-mono">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="font-serif text-xl font-bold mt-1 group-hover:text-emerald-700 transition-colors">{p.title}</h3>
                <p className="text-sm text-stone-500 mt-2 leading-relaxed">{p.description}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Featured article — Pull quote style */}
      {latestPosts[0] && (
        <section className="bg-stone-900 text-stone-100 py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-5 gap-10 items-center">
              <div className="lg:col-span-3">
                <Reveal>
                  {latestPosts[0].image && (
                    <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-6">
                      <Image src={latestPosts[0].image} alt={latestPosts[0].title} fill className="object-cover" sizes="60vw" />
                    </div>
                  )}
                </Reveal>
              </div>
              <div className="lg:col-span-2">
                <Reveal delay={0.1}>
                  <p className="text-xs text-emerald-400/70 uppercase tracking-widest mb-3">{latestPosts[0].category}</p>
                  <h3 className="font-serif text-2xl md:text-3xl font-bold leading-tight mb-4">
                    <Link href={`/blog/${latestPosts[0].slug}`} className="hover:text-emerald-400 transition-colors">{latestPosts[0].title}</Link>
                  </h3>
                  <p className="text-stone-400 leading-relaxed mb-4">{latestPosts[0].description}</p>
                  <p className="text-xs text-stone-500">{latestPosts[0].readingTime}</p>
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* More articles — 3-col grid */}
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <Reveal>
          <div className="flex items-end justify-between mb-10">
            <h2 className="font-serif text-3xl font-bold">Latest Articles</h2>
            <Link href="/blog" className="text-xs text-stone-500 hover:text-stone-900 uppercase tracking-widest flex items-center gap-1">All articles <ArrowRight className="w-3 h-3" /></Link>
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestPosts.slice(1, 4).map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.1}>
              <Link href={`/blog/${post.slug}`} className="group block">
                {post.image && (
                  <div className="relative aspect-[16/10] rounded-lg overflow-hidden mb-4">
                    <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="33vw" />
                  </div>
                )}
                <p className="text-xs text-stone-400 uppercase tracking-widest mb-1">{post.category}</p>
                <h3 className="font-serif text-lg font-bold group-hover:text-emerald-700 transition-colors">{post.title}</h3>
                <p className="text-sm text-stone-500 mt-2 line-clamp-2">{post.description}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Music section */}
      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-stone-300/50">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <Reveal>
            <p className="text-xs tracking-[0.3em] uppercase text-stone-400 font-medium mb-2">The Studio</p>
            <h2 className="font-serif text-3xl font-bold mb-4">12,000+ tracks and counting</h2>
            <p className="text-stone-500 leading-relaxed mb-6">Genre mastery from orchestral to hip hop. Prompt engineering that creates radio-ready tracks.</p>
            <MiniPlayer track={featuredTrack} />
          </Reveal>
          <Reveal delay={0.2}>
            <div className="grid grid-cols-2 gap-4">
              {designLabImages.slice(0, 4).map((img) => (
                <div key={img.src} className="relative aspect-square rounded-lg overflow-hidden">
                  <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="200px" />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Books */}
      {books.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-16 border-t border-stone-300/50">
          <Reveal>
            <h2 className="font-serif text-3xl font-bold mb-8">The Library</h2>
          </Reveal>
          <div className="flex gap-6 overflow-x-auto pb-4">
            {books.map((book, i) => (
              <Reveal key={book.slug} delay={i * 0.06}>
                <Link href={`/books/${book.slug}`} className="group flex-shrink-0 w-[130px]">
                  <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-md mb-3">
                    <Image src={book.coverImage} alt={book.title} fill className="object-cover group-hover:scale-105 transition-transform" sizes="130px" />
                  </div>
                  <p className="text-sm font-medium group-hover:text-emerald-700 transition-colors line-clamp-1">{book.title}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="bg-stone-900 text-stone-100 py-16 md:py-24">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <Reveal>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Subscribe to the dispatch</h2>
            <p className="text-stone-400 mb-8">AI architecture and creative systems. Weekly, no spam.</p>
            <div className="max-w-sm mx-auto">
              <EmailSignup listType="newsletter" placeholder="your@email.com" buttonText="Subscribe" compact />
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="max-w-3xl mx-auto px-6 py-16">
          <Reveal>
            <h2 className="font-serif text-3xl font-bold text-center mb-10">Frequently Asked</h2>
          </Reveal>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <details className="group border-b border-stone-300/50 pb-4">
                  <summary className="cursor-pointer text-base font-medium list-none flex justify-between items-center">
                    {faq.question}
                    <span className="text-stone-400 group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="mt-3 text-sm text-stone-500 leading-relaxed">{faq.answer}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-stone-300/50 px-6 py-6">
        <div className="max-w-6xl mx-auto flex justify-between text-xs text-stone-400">
          <span>frankx.ai // v4.magazine</span>
          <Link href="/home" className="hover:text-stone-900 transition-colors">all variations</Link>
        </div>
      </footer>
    </main>
  )
}
