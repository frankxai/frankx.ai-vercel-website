'use client'

import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useRef, useState, useCallback, useEffect } from 'react'
import { ArrowRight, Play, Pause } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'
import { EmailSignup } from '@/components/email-signup'
import type { HomepageData } from '@/lib/homepage-data'

// ── Full-viewport scene with parallax ──

function Scene({
  children,
  imageSrc,
  imageAlt,
  overlay = 'from-black/80 via-black/40 to-black/80',
}: {
  children: React.ReactNode
  imageSrc?: string
  imageAlt?: string
  overlay?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
      {imageSrc && (
        <motion.div className="absolute inset-0" style={reduce ? undefined : { y }}>
          <Image src={imageSrc} alt={imageAlt || ''} fill className="object-cover" sizes="100vw" />
          <div className={`absolute inset-0 bg-gradient-to-b ${overlay}`} />
        </motion.div>
      )}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-20">{children}</div>
    </section>
  )
}

// ── Reveal on scroll ──

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

// ── Inline track player ──

function TrackPlayer({ track }: { track: HomepageData['featuredTrack'] }) {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const toggle = useCallback(() => {
    if (!audioRef.current) return
    if (playing) audioRef.current.pause()
    else {
      audioRef.current.play()
      trackEvent('homepage_track_play', { variation: 'v1', title: track.title })
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
    <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4">
      <audio ref={audioRef} src={track.audioUrl} preload="none" />
      <button
        onClick={toggle}
        className="flex-shrink-0 w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center"
        aria-label={playing ? 'Pause' : 'Play'}
      >
        {playing ? <Pause className="w-5 h-5 text-emerald-400" /> : <Play className="w-5 h-5 text-emerald-400 ml-0.5" />}
      </button>
      <div>
        <p className="text-sm font-medium text-white">{track.title}</p>
        <p className="text-xs text-white/40">{track.genre.join(', ')} · {track.duration}</p>
      </div>
    </div>
  )
}

// ── Main ──

export default function HomeV1({
  latestPosts,
  faqs,
  featuredTrack,
  books,
  products,
  designLabImages,
  credentials,
}: HomepageData) {
  useEffect(() => { trackEvent('homepage_view', { variation: 'v1-cinematic' }) }, [])

  return (
    <main className="relative text-white bg-black overflow-x-hidden">
      {/* 1. Hero — full-bleed Arcanea conclave */}
      <Scene
        imageSrc="/images/arcanea/eldrian-conclave-20260301.png"
        imageAlt="The Eldrian Conclave"
        overlay="from-black via-black/30 to-black"
      >
        <div className="min-h-[80vh] flex flex-col justify-center">
          <Reveal>
            <p className="text-xs tracking-[0.3em] uppercase text-emerald-400/60 mb-6">AI Architect & Creator</p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-8">
              Building<br />
              intelligence<br />
              that <span className="text-emerald-400">compounds.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/50 max-w-xl mb-10">
              AI Architect at Oracle. 12,000+ songs. 75+ open-source skills. Everything documented.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/start"
                className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white px-8 h-14 text-base font-medium transition-all"
              >
                Explore the Work <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 h-14 text-base font-medium transition-all"
              >
                Read the Blog
              </Link>
            </div>
          </Reveal>
        </div>
      </Scene>

      {/* 2. Authority bar */}
      <div className="py-16 border-t border-white/5 bg-black">
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap justify-center gap-x-8 gap-y-3">
          {credentials.map((c) => (
            <span key={c} className="text-sm text-white/30 font-medium">{c}</span>
          ))}
        </div>
      </div>

      {/* 3. Products — cinematic cards */}
      <Scene>
        <Reveal>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Built for builders</h2>
          <p className="text-base text-white/40 mb-12 max-w-lg">Tools, frameworks, and creative systems.</p>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <Link
                href={p.href}
                className="group block rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6 h-full hover:border-white/20 hover:bg-white/[0.06] transition-all"
              >
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors">{p.title}</h3>
                <p className="text-sm text-white/50">{p.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs text-white/30 group-hover:text-white/50">
                  Explore <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Scene>

      {/* 4. Featured track */}
      <Scene
        imageSrc="/images/blog/suno-prompt-engineering-complete-guide-hero.png"
        imageAlt="Music production"
        overlay="from-black/90 via-black/70 to-black/90"
      >
        <Reveal>
          <p className="text-xs tracking-[0.3em] uppercase text-orange-400/60 mb-4">Music Lab</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">12,000+ tracks. One studio.</h2>
          <p className="text-white/50 max-w-lg mb-8">Genre mastery from orchestral to hip hop. Prompt engineering that creates radio-ready tracks.</p>
          <TrackPlayer track={featuredTrack} />
          <Link href="/music" className="inline-flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300 mt-6 transition-colors">
            Enter Music Lab <ArrowRight className="w-4 h-4" />
          </Link>
        </Reveal>
      </Scene>

      {/* 5. Design lab — horizontal scroll gallery */}
      <section className="py-24 border-t border-white/5 bg-black overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 mb-10">
          <Reveal>
            <h2 className="text-4xl font-bold tracking-tight mb-2">Design Lab</h2>
            <p className="text-white/40">Nature-tech fusion. Digital gardens where code meets organic form.</p>
          </Reveal>
        </div>
        <div className="flex gap-4 overflow-x-auto px-6 pb-4 snap-x snap-mandatory">
          {designLabImages.map((img, i) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex-shrink-0 w-[300px] md:w-[400px] aspect-square rounded-2xl overflow-hidden snap-start relative group"
            >
              <Image src={img.src} alt={img.alt} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="400px" />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
              <p className="absolute bottom-4 left-4 text-sm font-medium text-white/80">{img.alt}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. Books — horizontal filmstrip */}
      {books.length > 0 && (
        <section className="py-24 border-t border-white/5 bg-black">
          <div className="max-w-6xl mx-auto px-6">
            <Reveal>
              <h2 className="text-4xl font-bold tracking-tight mb-2">Books & Writing</h2>
              <p className="text-white/40 mb-10">Poetry, discipline, creativity, and hope.</p>
            </Reveal>
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
              {books.map((book, i) => (
                <Reveal key={book.slug} delay={i * 0.06}>
                  <Link href={`/books/${book.slug}`} className="group flex-shrink-0 w-[140px] snap-start">
                    <div className="relative aspect-[2/3] rounded-xl overflow-hidden mb-3 shadow-lg">
                      <Image src={book.coverImage} alt={book.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="140px" />
                    </div>
                    <p className="text-sm font-medium text-white group-hover:text-emerald-400 transition-colors line-clamp-1">{book.title}</p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. Latest articles */}
      <Scene>
        <Reveal>
          <div className="flex items-end justify-between mb-12">
            <h2 className="text-4xl font-bold tracking-tight">Latest</h2>
            <Link href="/blog" className="text-sm text-white/50 hover:text-white flex items-center gap-2">All articles <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestPosts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.08}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl overflow-hidden hover:border-white/20 transition-all"
              >
                {post.image && (
                  <div className="relative h-40 overflow-hidden">
                    <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="33vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/5 text-white/50 uppercase tracking-wider">{post.category}</span>
                    <span className="text-xs text-white/30">{post.readingTime}</span>
                  </div>
                  <h3 className="text-base font-semibold text-white group-hover:text-emerald-400 transition-colors line-clamp-2">{post.title}</h3>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Scene>

      {/* 8. Newsletter */}
      <section className="py-24 border-t border-white/5 bg-black">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Stay in the loop.</h2>
            <p className="text-white/40 mb-8">AI architecture and creative systems. Weekly dispatch, no spam.</p>
            <div className="max-w-sm mx-auto">
              <EmailSignup listType="newsletter" placeholder="your@email.com" buttonText="Subscribe" compact />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 9. FAQ */}
      {faqs.length > 0 && (
        <section className="py-24 border-t border-white/5 bg-black">
          <div className="max-w-3xl mx-auto px-6">
            <Reveal>
              <h2 className="text-3xl font-bold text-center mb-12">Frequently asked</h2>
            </Reveal>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <details className="group rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl">
                    <summary className="cursor-pointer p-5 text-sm font-semibold text-white list-none flex justify-between items-center">
                      {faq.question}
                      <span className="text-white/40 group-open:rotate-45 transition-transform text-lg">+</span>
                    </summary>
                    <div className="px-5 pb-5 text-sm text-white/50 leading-relaxed">{faq.answer}</div>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 10. Final CTA */}
      <section className="py-32 border-t border-white/5 bg-black text-center">
        <Reveal>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">Start building.</h2>
          <p className="text-white/40 mb-10">Pick your path — architecture, music, or products.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/start" className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 font-semibold transition-all">
              Start Here <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/newsletter" className="inline-flex items-center gap-2 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 font-medium transition-all">
              Get the Newsletter
            </Link>
          </div>
        </Reveal>
      </section>

      {/* Footer tag */}
      <footer className="border-t border-white/5 px-6 py-6">
        <div className="max-w-6xl mx-auto flex justify-between text-xs text-white/20">
          <span>frankx.ai // v1.cinematic</span>
          <Link href="/home" className="hover:text-white/50 transition-colors">all variations</Link>
        </div>
      </footer>
    </main>
  )
}
