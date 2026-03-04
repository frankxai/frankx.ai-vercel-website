'use client'

import { motion, useScroll, useTransform, useReducedMotion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useRef, useState, useCallback, useEffect } from 'react'
import { ArrowRight, Play, Pause, X, ChevronLeft, ChevronRight, Volume2 } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'
import { EmailSignup } from '@/components/email-signup'
import type { HomepageData } from '@/lib/homepage-data'

// ── Lightbox ──────────────────────────────────────────────────────────────────

interface LightboxState {
  images: { src: string; alt: string; caption?: string }[]
  index: number
}

function Lightbox({
  state,
  onClose,
  onNext,
  onPrev,
}: {
  state: LightboxState
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}) {
  const { images, index } = state
  const img = images[index]

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNext()
      if (e.key === 'ArrowLeft') onPrev()
    }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose, onNext, onPrev])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Controls */}
      <button
        className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
        onClick={onClose}
        aria-label="Close lightbox"
      >
        <X className="w-5 h-5" />
      </button>

      {images.length > 1 && (
        <>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
            onClick={(e) => { e.stopPropagation(); onPrev() }}
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            className="absolute right-16 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
            onClick={(e) => { e.stopPropagation(); onNext() }}
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Image */}
      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-5xl max-h-[85vh] px-4 sm:px-16"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <Image
            src={img.src}
            alt={img.alt}
            width={1200}
            height={800}
            className="w-full h-auto object-contain max-h-[80vh] rounded-sm"
            sizes="90vw"
          />
        </div>
        {img.caption && (
          <p className="text-xs text-white/30 text-center mt-3 font-mono lowercase">{img.caption}</p>
        )}
        {images.length > 1 && (
          <p className="text-xs text-white/15 text-center mt-2 font-mono">
            {index + 1} / {images.length}
          </p>
        )}
      </motion.div>
    </motion.div>
  )
}

// ── Image with hover overlay ──────────────────────────────────────────────────

function GalleryImage({
  src,
  alt,
  caption,
  sizes = '(max-width: 768px) 100vw, 50vw',
  className = '',
  onClick,
}: {
  src: string
  alt: string
  caption?: string
  sizes?: string
  className?: string
  onClick?: () => void
}) {
  const [hovered, setHovered] = useState(false)
  const reduce = useReducedMotion()

  return (
    <div
      className={`relative overflow-hidden cursor-pointer group ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover transition-transform duration-700 ${hovered && !reduce ? 'scale-105' : 'scale-100'}`}
        sizes={sizes}
      />
      <AnimatePresence>
        {hovered && !reduce && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/40 flex items-end"
          >
            {caption && (
              <p className="p-4 text-sm text-white/90 font-mono lowercase tracking-wide">{caption}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Music player (gallery minimal) ───────────────────────────────────────────

function GalleryPlayer({ track }: { track: HomepageData['featuredTrack'] }) {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  const toggle = useCallback(() => {
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
      trackEvent('homepage_track_play', { variation: 'v5-gallery', title: track.title })
    }
    setPlaying((p) => !p)
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
    <div className="flex items-center gap-4">
      <audio ref={audioRef} src={track.audioUrl} preload="none" />
      <button
        onClick={toggle}
        className="w-12 h-12 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all flex-shrink-0"
        aria-label={playing ? 'Pause' : 'Play'}
      >
        <AnimatePresence mode="wait">
          {playing ? (
            <motion.span key="p" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.6, opacity: 0 }}>
              <Pause className="w-4 h-4 text-white" />
            </motion.span>
          ) : (
            <motion.span key="pl" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.6, opacity: 0 }}>
              <Play className="w-4 h-4 text-white ml-0.5" />
            </motion.span>
          )}
        </AnimatePresence>
      </button>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white/90 mb-2 truncate">{track.title}</p>
        <div className="h-0.5 bg-white/20 rounded-full">
          <div className="h-full bg-white rounded-full transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <Volume2 className="w-3 h-3 text-white/30" />
        <p className="text-xs text-white/40 font-mono">{track.duration}</p>
      </div>
    </div>
  )
}

// ── Reveal ────────────────────────────────────────────────────────────────────

function Reveal({
  children,
  delay = 0,
  className = '',
  direction = 'up',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
  direction?: 'up' | 'left' | 'none'
}) {
  const reduce = useReducedMotion()
  const initial =
    reduce ? false
    : direction === 'up' ? { opacity: 0, y: 24 }
    : direction === 'left' ? { opacity: 0, x: -24 }
    : { opacity: 0 }

  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ── Exhibit number ────────────────────────────────────────────────────────────

function ExhibitNumber({ n }: { n: string }) {
  return (
    <p className="text-[11px] font-mono tracking-[0.4em] uppercase text-white/15 mb-4">{n}</p>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function HomeV5({
  latestPosts,
  faqs,
  featuredTrack,
  books,
  products,
  learningCards,
  designLabImages,
  credentials,
}: HomepageData) {
  const [lightbox, setLightbox] = useState<LightboxState | null>(null)
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])
  const reduce = useReducedMotion()

  useEffect(() => {
    trackEvent('homepage_view', { variation: 'v5-gallery' })
  }, [])

  // Build lightbox image sets
  const designImages = designLabImages.map((img) => ({
    ...img,
    caption: img.alt.toLowerCase(),
  }))

  const postImages = latestPosts
    .filter((p) => p.image)
    .map((p) => ({ src: p.image!, alt: p.title, caption: p.category.toLowerCase() }))

  const openDesignLightbox = (index: number) => {
    setLightbox({ images: designImages, index })
    trackEvent('gallery_lightbox_open', { index, variation: 'v5' })
  }

  const openPostLightbox = (index: number) => {
    setLightbox({ images: postImages, index })
  }

  const closeLightbox = () => setLightbox(null)
  const nextImage = () =>
    setLightbox((s) => s ? { ...s, index: (s.index + 1) % s.images.length } : null)
  const prevImage = () =>
    setLightbox((s) => s ? { ...s, index: (s.index - 1 + s.images.length) % s.images.length } : null)

  // Product exhibit images (golden-age)
  const exhibitImages = [
    '/images/golden-age/starlight-intelligence-v2.png',
    '/images/golden-age/automation-empire-v1.png',
    '/images/golden-age/sis-architecture-v1.png',
    '/images/golden-age/golden-age-hero-council-v1.png',
    '/images/golden-age/golden-age-hero-council-v2.png',
    '/images/golden-age/golden-age-hero-test-01.png',
  ]

  return (
    <main className="relative min-h-screen bg-[#080808] text-white overflow-x-hidden">
      <AnimatePresence>
        {lightbox && (
          <Lightbox
            state={lightbox}
            onClose={closeLightbox}
            onNext={nextImage}
            onPrev={prevImage}
          />
        )}
      </AnimatePresence>

      {/* ── ENTRANCE — Minimal hero ───────────────────────────── */}
      <section className="pt-28 pb-20 px-6 md:px-12 border-b border-white/[0.04]">
        <div className="max-w-7xl mx-auto">
          <Reveal direction="none" delay={0}>
            <p className="text-[10px] tracking-[0.5em] uppercase text-white/20 mb-8 font-mono">
              a.i. architect &nbsp;·&nbsp; creator &nbsp;·&nbsp; 12k songs
            </p>
          </Reveal>
          <Reveal direction="none" delay={0.05}>
            <h1
              className="text-[clamp(3.5rem,12vw,10rem)] font-bold tracking-[-0.04em] leading-none mb-8 text-white"
              style={{ fontVariantNumeric: 'tabular-nums' }}
            >
              FRANKX
            </h1>
          </Reveal>
          <Reveal direction="none" delay={0.1}>
            <p className="text-lg md:text-xl text-white/30 max-w-xl leading-relaxed">
              Building intelligence through music, code, and myth.
            </p>
          </Reveal>
          <Reveal direction="none" delay={0.18}>
            <div className="mt-12 flex items-center gap-2">
              <div className="w-6 h-[1px] bg-white/15" />
              <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/15">scroll</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FEATURE IMAGE — Full-bleed conclave ──────────────── */}
      <section ref={heroRef} className="relative h-[80vh] overflow-hidden">
        <motion.div
          style={reduce ? undefined : { y: heroY, scale: heroScale }}
          className="absolute inset-0 origin-center"
        >
          <Image
            src="/images/arcanea/eldrian-conclave-20260301.png"
            alt="The Eldrian Conclave"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/10 via-transparent to-[#080808]/70" />
        <div className="absolute bottom-6 left-6 right-6">
          <p className="text-xs font-mono text-white/30 lowercase tracking-wide">
            The Eldrian Conclave, March 2026
          </p>
        </div>
      </section>

      {/* ── THE WORK — Products as gallery exhibits ───────────── */}
      <section className="py-24 px-6 md:px-12 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <ExhibitNumber n="Exhibit A" />
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">The Work</h2>
            <p className="text-sm text-white/30 mb-16 max-w-md leading-relaxed">
              Tools, systems, and archives built from first principles.
            </p>
          </Reveal>

          <div className="space-y-16">
            {products.map((product, i) => {
              const isEven = i % 2 === 0
              const exhibitImg = exhibitImages[i] ?? exhibitImages[0]
              return (
                <Reveal key={product.title} delay={0} className="group">
                  <div
                    className={`grid md:grid-cols-2 gap-6 md:gap-12 items-center ${
                      isEven ? '' : 'md:[&>*:first-child]:order-2'
                    }`}
                  >
                    {/* Image side */}
                    <Link
                      href={product.href}
                      className="block relative aspect-[4/3] overflow-hidden rounded-sm"
                      onClick={() => trackEvent('exhibit_click', { product: product.title, variation: 'v5' })}
                    >
                      <GalleryImage
                        src={exhibitImg}
                        alt={product.title}
                        caption={product.title.toLowerCase()}
                        sizes="(max-width: 768px) 100vw, 45vw"
                        className="absolute inset-0"
                      />
                    </Link>

                    {/* Text side */}
                    <div className={isEven ? '' : 'md:pr-8'}>
                      <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-white/15 mb-4">
                        {String(i + 1).padStart(2, '0')}
                      </p>
                      <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-4">
                        {product.title}
                      </h3>
                      <p className="text-sm text-white/35 leading-relaxed mb-8 max-w-sm">
                        {product.description}
                      </p>
                      <Link
                        href={product.href}
                        onClick={() => trackEvent('exhibit_enter', { product: product.title, variation: 'v5' })}
                        className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors border-b border-white/10 hover:border-white/30 pb-0.5"
                      >
                        Enter <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── VISUAL PORTFOLIO — Design Lab ────────────────────── */}
      {designLabImages.length > 0 && (
        <section className="py-24 px-6 md:px-12 border-t border-white/[0.04]">
          <div className="max-w-7xl mx-auto">
            <Reveal>
              <ExhibitNumber n="Exhibit B" />
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Visual Portfolio</h2>
              <p className="text-sm text-white/30 mb-12 max-w-md leading-relaxed">
                Generative art, design experiments, visual systems. Click to view full.
              </p>
            </Reveal>

            {/* Primary masonry grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {designLabImages.map((img, i) => {
                // Alternate tall / wide / square
                const isWide = i === 0 || i === 5
                const isTall = i === 2 || i === 4
                return (
                  <motion.div
                    key={img.src}
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: (i % 4) * 0.08, duration: 0.5 }}
                    className={`relative overflow-hidden rounded-sm cursor-pointer ${
                      isWide && i === 0 ? 'md:col-span-2 aspect-[2/1]' :
                      isTall ? 'aspect-[2/3]' :
                      'aspect-square'
                    }`}
                    onClick={() => openDesignLightbox(i)}
                  >
                    <GalleryImage
                      src={img.src}
                      alt={img.alt}
                      caption={img.alt.toLowerCase()}
                      sizes={`${isWide ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 50vw, 25vw'}`}
                      className="absolute inset-0"
                    />
                  </motion.div>
                )
              })}
            </div>

            {/* Secondary: blog hero images as secondary gallery row */}
            {postImages.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-2">
                {postImages.slice(0, 3).map((img, i) => (
                  <motion.div
                    key={img.src}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.5 }}
                    className="relative aspect-[3/2] overflow-hidden rounded-sm cursor-pointer"
                    onClick={() => openPostLightbox(i)}
                  >
                    <GalleryImage
                      src={img.src}
                      alt={img.alt}
                      caption={img.caption}
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="absolute inset-0"
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── THE ARCHIVE — Blog ────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <ExhibitNumber n="Exhibit C" />
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">The Archive</h2>
            <p className="text-sm text-white/30 mb-12 max-w-md leading-relaxed">
              Long-form writing on AI, music production, and creative systems.
            </p>
          </Reveal>

          {latestPosts.length > 0 && (
            <div className="space-y-2">
              {/* Featured post — large */}
              {latestPosts[0] && (
                <Reveal>
                  <Link
                    href={`/blog/${latestPosts[0].slug}`}
                    onClick={() => trackEvent('archive_featured_click', { slug: latestPosts[0].slug, variation: 'v5' })}
                    className="group grid md:grid-cols-[2fr,1fr] gap-0 rounded-sm overflow-hidden border border-white/[0.05] hover:border-white/[0.12] transition-all"
                  >
                    {latestPosts[0].image && (
                      <div className="relative aspect-[16/9] md:aspect-auto overflow-hidden">
                        <Image
                          src={latestPosts[0].image}
                          alt={latestPosts[0].title}
                          fill
                          className="object-cover group-hover:scale-103 transition-transform duration-700"
                          sizes="(max-width: 768px) 100vw, 60vw"
                        />
                      </div>
                    )}
                    <div className="bg-white/[0.02] p-8 flex flex-col justify-between min-h-[220px]">
                      <div>
                        <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-white/20 mb-3">
                          {latestPosts[0].category}
                        </p>
                        <h3 className="text-xl font-bold tracking-tight text-white/80 group-hover:text-white transition-colors leading-snug mb-3">
                          {latestPosts[0].title}
                        </h3>
                        <p className="text-sm text-white/30 leading-relaxed line-clamp-3">
                          {latestPosts[0].description}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-6">
                        <p className="text-xs text-white/20 font-mono">{latestPosts[0].readingTime}</p>
                        <span className="text-xs text-white/20 group-hover:text-white/60 transition-colors flex items-center gap-1">
                          Read <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              )}

              {/* Remaining posts — 2-column grid */}
              {latestPosts.length > 1 && (
                <div className="grid sm:grid-cols-2 gap-2">
                  {latestPosts.slice(1, 5).map((post, i) => (
                    <Reveal key={post.slug} delay={i * 0.07}>
                      <Link
                        href={`/blog/${post.slug}`}
                        onClick={() => trackEvent('archive_post_click', { slug: post.slug, variation: 'v5' })}
                        className="group block rounded-sm overflow-hidden border border-white/[0.05] hover:border-white/[0.12] transition-all"
                      >
                        {post.image && (
                          <div className="relative aspect-[16/9] overflow-hidden">
                            <Image
                              src={post.image}
                              alt={post.title}
                              fill
                              className="object-cover group-hover:scale-103 transition-transform duration-700"
                              sizes="(max-width: 640px) 100vw, 40vw"
                            />
                          </div>
                        )}
                        <div className="bg-white/[0.02] p-5">
                          <p className="text-[10px] font-mono tracking-[0.35em] uppercase text-white/15 mb-2">
                            {post.category}
                          </p>
                          <h3 className="text-sm font-bold tracking-tight text-white/70 group-hover:text-white transition-colors leading-snug line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-xs text-white/20 font-mono mt-3">{post.readingTime}</p>
                        </div>
                      </Link>
                    </Reveal>
                  ))}
                </div>
              )}
            </div>
          )}

          <Reveal delay={0.3}>
            <div className="mt-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-white/25 hover:text-white/60 transition-colors font-mono border-b border-white/[0.08] hover:border-white/20 pb-0.5"
              >
                View all writing <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SOUND — Music full-bleed ──────────────────────────── */}
      <section className="relative py-0 border-t border-white/[0.04]">
        <div className="relative h-[60vh] overflow-hidden">
          <Image
            src="/images/blog/suno-prompt-engineering-complete-guide-hero.png"
            alt="Music production workspace"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/50 to-[#080808]/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/70 to-transparent" />
        </div>
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16">
          <Reveal>
            <ExhibitNumber n="Exhibit D" />
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Sound</h2>
            <p className="text-sm text-white/40 mb-8 max-w-xs leading-relaxed">
              12,000+ AI tracks. Every genre. Every experiment catalogued.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="max-w-sm">
            <GalleryPlayer track={featuredTrack} />
          </Reveal>
          <Reveal delay={0.2}>
            <Link
              href="/music-lab"
              onClick={() => trackEvent('music_cta_click', { variation: 'v5' })}
              className="mt-6 inline-flex items-center gap-2 text-xs font-mono text-white/25 hover:text-white/60 transition-colors"
            >
              Enter Music Lab <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── THE LIBRARY — Books as gallery wall ──────────────── */}
      {books.length > 0 && (
        <section className="py-24 px-6 md:px-12 border-t border-white/[0.04]">
          <div className="max-w-7xl mx-auto">
            <Reveal>
              <ExhibitNumber n="Exhibit E" />
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">The Library</h2>
              <p className="text-sm text-white/30 mb-12 max-w-md leading-relaxed">
                Six books. Architecture guides, creative frameworks, field manuals.
              </p>
            </Reveal>
            <div className="flex gap-6 overflow-x-auto pb-6 -mx-4 px-4">
              {books.map((book, i) => (
                <Reveal key={book.slug} delay={i * 0.07}>
                  <Link
                    href={`/books/${book.slug}`}
                    onClick={() => trackEvent('library_book_click', { slug: book.slug, variation: 'v5' })}
                    className="group flex-shrink-0 w-[160px] sm:w-[180px]"
                  >
                    <div
                      className="relative aspect-[2/3] rounded-sm overflow-hidden mb-3"
                      style={{
                        boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 4px 16px rgba(0,0,0,0.4)',
                      }}
                    >
                      <Image
                        src={book.coverImage}
                        alt={book.title}
                        fill
                        className="object-cover group-hover:scale-103 transition-transform duration-500"
                        sizes="(max-width: 640px) 160px, 180px"
                      />
                      {/* Subtle ambient glow on hover */}
                      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300" />
                    </div>
                    <p className="text-sm font-medium text-white/60 group-hover:text-white transition-colors line-clamp-1">
                      {book.title}
                    </p>
                    <p className="text-xs text-white/20 mt-0.5 lowercase font-mono line-clamp-1">
                      {book.subtitle}
                    </p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── THE SCHOLARS — Learning cards ────────────────────── */}
      <section className="py-24 px-6 md:px-12 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <ExhibitNumber n="Exhibit F" />
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Learning</h2>
            <p className="text-sm text-white/30 mb-12 max-w-md leading-relaxed">
              Four paths. Find the one that fits where you are.
            </p>
          </Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {learningCards.map((card, i) => (
              <Reveal key={card.title} delay={i * 0.08}>
                <Link
                  href={card.href}
                  onClick={() => trackEvent('learning_card_click', { path: card.title, variation: 'v5' })}
                  className="group block relative aspect-[3/4] rounded-sm overflow-hidden"
                >
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  {/* Text */}
                  <div className="absolute inset-0 flex flex-col justify-end p-5">
                    <p className="text-base font-bold text-white/90 group-hover:text-white transition-colors leading-tight mb-1.5">
                      {card.title}
                    </p>
                    <p className="text-xs text-white/40 leading-relaxed line-clamp-2">
                      {card.description}
                    </p>
                    <span className="mt-3 text-xs text-white/20 group-hover:text-white/60 transition-colors flex items-center gap-1 font-mono">
                      Enter <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SIGNAL — Newsletter ultra-minimal ────────────────── */}
      <section className="py-24 px-6 md:px-12 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <ExhibitNumber n="Signal" />
          </Reveal>
          <div className="max-w-2xl">
            <Reveal delay={0.05}>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                Stay in the loop.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-sm text-white/30 mb-10 max-w-md leading-relaxed">
                Weekly dispatch. AI architecture. Music production. Creative systems.
                Written for practitioners — not spectators.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="max-w-md">
                <EmailSignup
                  listType="newsletter"
                  placeholder="your@email.com"
                  buttonText="Subscribe"
                  compact
                />
                <p className="text-xs text-white/15 mt-4 font-mono">No spam. Unsubscribe any time.</p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-12 flex flex-wrap gap-6">
                {credentials.map((c) => (
                  <span key={c} className="text-xs text-white/15 font-mono tracking-wide">{c}</span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────── */}
      {faqs.length > 0 && (
        <section className="py-20 px-6 md:px-12 border-t border-white/[0.04]">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-[1fr,2fr] gap-12">
              <Reveal direction="left">
                <h2 className="text-2xl font-bold tracking-tight sticky top-8">
                  Questions
                </h2>
              </Reveal>
              <div className="space-y-0">
                {faqs.map((faq, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, duration: 0.5 }}
                    className="border-b border-white/[0.05]"
                  >
                    <details className="group">
                      <summary className="cursor-pointer py-5 text-sm font-medium text-white/60 hover:text-white/90 transition-colors flex items-center justify-between list-none gap-4">
                        <span>{faq.question}</span>
                        <span
                          className="text-white/20 group-open:text-white/40 group-open:rotate-45 transition-all flex-shrink-0"
                          aria-hidden
                        >
                          +
                        </span>
                      </summary>
                      <div className="pb-5 text-sm text-white/35 leading-relaxed max-w-prose">
                        {faq.answer}
                      </div>
                    </details>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer className="border-t border-white/[0.04] px-6 md:px-12 py-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-xs font-mono text-white/15 mb-1">frankx.ai // v5.gallery</p>
            <div className="flex gap-4 mt-2">
              {['Blog', 'Music', 'Books', 'Tools', 'About'].map((link) => (
                <Link
                  key={link}
                  href={`/${link.toLowerCase()}`}
                  className="text-xs text-white/10 hover:text-white/35 transition-colors font-mono lowercase"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>
          <Link
            href="/home"
            className="text-xs font-mono text-white/15 hover:text-white/40 transition-colors border border-white/[0.06] px-4 py-2 rounded-sm hover:border-white/[0.15]"
          >
            all variations
          </Link>
        </div>
      </footer>
    </main>
  )
}
