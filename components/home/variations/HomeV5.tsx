'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useRef, useState, useCallback, useEffect } from 'react'
import { ArrowRight, Play, Pause, X } from 'lucide-react'
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

function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <button className="absolute top-6 right-6 text-white/60 hover:text-white" onClick={onClose} aria-label="Close">
        <X className="w-6 h-6" />
      </button>
      <div className="relative w-full max-w-4xl aspect-square">
        <Image src={src} alt={alt} fill className="object-contain" sizes="90vw" />
      </div>
    </motion.div>
  )
}

function MiniPlayer({ track }: { track: HomepageData['featuredTrack'] }) {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const toggle = useCallback(() => {
    if (!audioRef.current) return
    if (playing) audioRef.current.pause()
    else { audioRef.current.play(); trackEvent('homepage_track_play', { variation: 'v5', title: track.title }) }
    setPlaying(!playing)
  }, [playing, track.title])
  useEffect(() => {
    const a = audioRef.current; if (!a) return
    const end = () => setPlaying(false)
    a.addEventListener('ended', end); return () => a.removeEventListener('ended', end)
  }, [])

  return (
    <div className="flex items-center gap-4">
      <audio ref={audioRef} src={track.audioUrl} preload="none" />
      <button onClick={toggle} className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center border border-white/20" aria-label={playing ? 'Pause' : 'Play'}>
        {playing ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white ml-0.5" />}
      </button>
      <div>
        <p className="text-sm font-medium text-white">{track.title}</p>
        <p className="text-xs text-white/50">{track.genre.join(', ')}</p>
      </div>
    </div>
  )
}

export default function HomeV5({ latestPosts, faqs, featuredTrack, books, products, designLabImages }: HomepageData) {
  const [lightboxImg, setLightboxImg] = useState<{ src: string; alt: string } | null>(null)
  useEffect(() => { trackEvent('homepage_view', { variation: 'v5-gallery' }) }, [])

  const allImages = [
    ...designLabImages,
    ...(latestPosts.filter(p => p.image).slice(0, 3).map(p => ({ src: p.image!, alt: p.title }))),
  ]

  return (
    <main className="relative min-h-screen bg-[#0a0a0b] text-white overflow-x-hidden">
      {lightboxImg && <Lightbox src={lightboxImg.src} alt={lightboxImg.alt} onClose={() => setLightboxImg(null)} />}

      {/* Hero — Massive masonry header */}
      <section className="pt-20 pb-12 px-4">
        <div className="max-w-7xl mx-auto mb-8">
          <Reveal>
            <p className="text-xs tracking-[0.3em] uppercase text-white/30 mb-3">Visual Portfolio</p>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">FrankX<span className="text-emerald-400">.</span></h1>
            <p className="text-lg text-white/40 max-w-lg">AI Architect. Music Creator. Everything visual.</p>
          </Reveal>
        </div>

        {/* Masonry grid */}
        <div className="max-w-7xl mx-auto columns-2 md:columns-3 gap-3 space-y-3">
          {allImages.map((img, i) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="break-inside-avoid cursor-pointer group"
              onClick={() => setLightboxImg(img)}
            >
              <div className="relative overflow-hidden rounded-xl">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={600}
                  height={600}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-end">
                  <p className="p-4 text-sm text-white/0 group-hover:text-white/90 transition-colors font-medium">{img.alt}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured track — overlay */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto relative rounded-3xl overflow-hidden">
          <div className="relative aspect-[21/9]">
            <Image src="/images/blog/suno-prompt-engineering-complete-guide-hero.png" alt="Music" fill className="object-cover" sizes="100vw" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          </div>
          <div className="absolute inset-0 flex items-center p-8 md:p-16">
            <Reveal>
              <p className="text-xs tracking-[0.3em] uppercase text-emerald-400/60 mb-3">Now Playing</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">12,000+ tracks</h2>
              <MiniPlayer track={featuredTrack} />
              <Link href="/music" className="mt-6 inline-flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300 transition-colors">
                Enter Music Lab <ArrowRight className="w-4 h-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Books — cinematic filmstrip */}
      {books.length > 0 && (
        <section className="py-16 px-4 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <Reveal>
              <h2 className="text-3xl font-bold mb-8">Library</h2>
            </Reveal>
            <div className="flex gap-6 overflow-x-auto pb-4">
              {books.map((book, i) => (
                <Reveal key={book.slug} delay={i * 0.06}>
                  <Link href={`/books/${book.slug}`} className="group flex-shrink-0 w-[160px]">
                    <div className="relative aspect-[2/3] rounded-xl overflow-hidden shadow-2xl shadow-black/50 mb-3">
                      <Image src={book.coverImage} alt={book.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="160px" />
                    </div>
                    <p className="text-sm font-medium text-white group-hover:text-emerald-400 transition-colors line-clamp-1">{book.title}</p>
                    <p className="text-xs text-white/40 line-clamp-1">{book.subtitle}</p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Products — minimal list */}
      <section className="py-16 px-4 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="text-3xl font-bold mb-8">Explore</h2>
          </Reveal>
          <div className="space-y-3">
            {products.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <Link href={p.href} className="group flex items-center justify-between py-4 border-b border-white/5 hover:border-white/20 transition-colors">
                  <div>
                    <h3 className="text-lg font-semibold group-hover:text-emerald-400 transition-colors">{p.title}</h3>
                    <p className="text-sm text-white/40">{p.description}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-white/20 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 px-4 border-t border-white/5">
        <div className="max-w-2xl mx-auto text-center">
          <Reveal>
            <h2 className="text-3xl font-bold mb-4">Stay visual.</h2>
            <p className="text-white/40 mb-8">Weekly dispatch. Architecture, music, design.</p>
            <div className="max-w-sm mx-auto">
              <EmailSignup listType="newsletter" placeholder="your@email.com" buttonText="Subscribe" compact />
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="py-16 px-4 border-t border-white/5">
          <div className="max-w-3xl mx-auto">
            <Reveal><h2 className="text-3xl font-bold text-center mb-10">FAQ</h2></Reveal>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <details className="group rounded-2xl border border-white/[0.08] bg-white/[0.03]">
                    <summary className="cursor-pointer p-5 text-sm font-medium text-white list-none flex justify-between">
                      {faq.question}
                      <span className="text-white/40 group-open:rotate-45 transition-transform">+</span>
                    </summary>
                    <div className="px-5 pb-5 text-sm text-white/50">{faq.answer}</div>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <footer className="border-t border-white/5 px-6 py-6">
        <div className="max-w-7xl mx-auto flex justify-between text-xs text-white/20">
          <span>frankx.ai // v5.gallery</span>
          <Link href="/home" className="hover:text-white/50 transition-colors">all variations</Link>
        </div>
      </footer>
    </main>
  )
}
