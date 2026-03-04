'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useRef, useState, useCallback, useEffect } from 'react'
import { ArrowRight, Play, Pause, Music, Code, BookOpen, Palette, Cpu, Sparkles } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'
import { EmailSignup } from '@/components/email-signup'
import type { HomepageData } from '@/lib/homepage-data'

function BentoCell({
  children,
  className = '',
  span = '1',
  href,
}: {
  children: React.ReactNode
  className?: string
  span?: '1' | '2' | 'row2' | 'full'
  href?: string
}) {
  const reduce = useReducedMotion()
  const spanClass =
    span === '2' ? 'sm:col-span-2' :
    span === 'row2' ? 'sm:row-span-2' :
    span === 'full' ? 'sm:col-span-2 lg:col-span-3' : ''

  const inner = (
    <motion.div
      initial={reduce ? false : { opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={`h-full rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl overflow-hidden hover:border-white/20 hover:bg-white/[0.06] transition-all ${className}`}
    >
      {children}
    </motion.div>
  )

  if (href) return <Link href={href} className={`group block ${spanClass}`}>{inner}</Link>
  return <div className={spanClass}>{inner}</div>
}

function Stat({ label, value, suffix = '' }: { label: string; value: string; suffix?: string }) {
  return (
    <div>
      <p className="text-3xl md:text-4xl font-bold text-white tabular-nums">{value}<span className="text-emerald-400">{suffix}</span></p>
      <p className="text-xs text-white/40 mt-1">{label}</p>
    </div>
  )
}

function MiniPlayer({ track }: { track: HomepageData['featuredTrack'] }) {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const toggle = useCallback(() => {
    if (!audioRef.current) return
    if (playing) audioRef.current.pause()
    else { audioRef.current.play(); trackEvent('homepage_track_play', { variation: 'v2', title: track.title }) }
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
    <div className="flex items-center gap-3 p-5">
      <audio ref={audioRef} src={track.audioUrl} preload="none" />
      <button onClick={toggle} className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center flex-shrink-0" aria-label={playing ? 'Pause' : 'Play'}>
        {playing ? <Pause className="w-4 h-4 text-emerald-400" /> : <Play className="w-4 h-4 text-emerald-400 ml-0.5" />}
      </button>
      <div className="min-w-0">
        <p className="text-sm font-medium text-white truncate">{track.title}</p>
        <p className="text-xs text-white/40">{track.genre.join(', ')}</p>
      </div>
      {playing && (
        <div className="flex items-end gap-0.5 h-4 ml-auto">
          {[0, 1, 2, 3].map((i) => (
            <motion.div key={i} className="w-1 bg-emerald-400/60 rounded-full" animate={{ height: ['30%', '100%', '50%'] }} transition={{ duration: 0.5 + i * 0.1, repeat: Infinity }} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function HomeV2({ latestPosts, faqs, featuredTrack, books, products, designLabImages, credentials, learningCards }: HomepageData) {
  useEffect(() => { trackEvent('homepage_view', { variation: 'v2-bento' }) }, [])

  const icons: Record<string, React.ReactNode> = {
    'Agentic Creator OS': <Code className="w-5 h-5" />,
    'Prompt Library': <Sparkles className="w-5 h-5" />,
    'Music Lab': <Music className="w-5 h-5" />,
    'Design Lab': <Palette className="w-5 h-5" />,
    'AI Architecture Hub': <Cpu className="w-5 h-5" />,
    'Creator Kit': <BookOpen className="w-5 h-5" />,
  }

  return (
    <main className="relative min-h-screen bg-[#0a0a0b] text-white overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p className="text-xs tracking-[0.3em] uppercase text-emerald-400/60 mb-3">Dashboard</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">FrankX<span className="text-emerald-400">.</span></h1>
          <p className="text-white/40 max-w-lg">AI Architect at Oracle. Creator of 12,000+ songs. Building the tools that builders need.</p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-24">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <BentoCell span="2" className="p-6 sm:p-8">
            <p className="text-xs text-white/30 uppercase tracking-wider mb-6">Live Stats</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              <Stat label="AI Songs" value="12,000" suffix="+" />
              <Stat label="Open Source Skills" value="75" suffix="+" />
              <Stat label="Active Agents" value="38" />
              <Stat label="Books Published" value={String(books.length)} />
            </div>
          </BentoCell>

          <BentoCell>
            <p className="text-xs text-white/30 uppercase tracking-wider px-5 pt-5">Now Playing</p>
            <MiniPlayer track={featuredTrack} />
            <Link href="/music" className="block px-5 pb-4 text-xs text-white/30 hover:text-emerald-400 transition-colors">All tracks →</Link>
          </BentoCell>

          {products.map((p) => (
            <BentoCell key={p.title} href={p.href}>
              <div className="p-5 h-full flex flex-col">
                <div className="text-emerald-400/60 mb-3">{icons[p.title] || <ArrowRight className="w-5 h-5" />}</div>
                <h3 className="text-base font-semibold text-white group-hover:text-emerald-400 transition-colors mb-1">{p.title}</h3>
                <p className="text-xs text-white/40 flex-1">{p.description}</p>
                <span className="mt-3 text-xs text-white/20 group-hover:text-white/40 flex items-center gap-1 transition-colors">Explore <ArrowRight className="w-3 h-3" /></span>
              </div>
            </BentoCell>
          ))}

          <BentoCell span="2" className="p-0">
            <div className="grid grid-cols-3 h-48">
              {designLabImages.slice(0, 3).map((img) => (
                <div key={img.src} className="relative overflow-hidden">
                  <Image src={img.src} alt={img.alt} fill className="object-cover hover:scale-105 transition-transform duration-500" sizes="200px" />
                </div>
              ))}
            </div>
            <div className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white">Design Lab</p>
                <p className="text-xs text-white/40">Nature-tech visual experiments</p>
              </div>
              <Link href="/design-lab" className="text-xs text-emerald-400">View all →</Link>
            </div>
          </BentoCell>

          <BentoCell className="p-4">
            <div className="flex gap-2 overflow-x-auto mb-3">
              {books.slice(0, 4).map((book) => (
                <Link key={book.slug} href={`/books/${book.slug}`} className="flex-shrink-0 w-[70px]">
                  <div className="relative aspect-[2/3] rounded-lg overflow-hidden">
                    <Image src={book.coverImage} alt={book.title} fill className="object-cover" sizes="70px" />
                  </div>
                </Link>
              ))}
            </div>
            <p className="text-sm font-medium text-white">Library</p>
            <p className="text-xs text-white/40">{books.length} books</p>
          </BentoCell>

          <BentoCell span="full" className="p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs text-white/30 uppercase tracking-wider">Latest Articles</p>
              <Link href="/blog" className="text-xs text-white/30 hover:text-emerald-400 transition-colors">View all →</Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {latestPosts.slice(0, 3).map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group/post flex items-start gap-3 rounded-xl bg-white/[0.03] p-3 hover:bg-white/[0.06] transition-colors">
                  {post.image && (
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <Image src={post.image} alt={post.title} fill className="object-cover" sizes="64px" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white group-hover/post:text-emerald-400 transition-colors line-clamp-2">{post.title}</p>
                    <p className="text-xs text-white/30 mt-1">{post.category} · {post.readingTime}</p>
                  </div>
                </Link>
              ))}
            </div>
          </BentoCell>

          {learningCards.slice(0, 2).map((card) => (
            <BentoCell key={card.href} href={card.href} className="p-0">
              <div className="relative h-28 overflow-hidden">
                <Image src={card.image} alt={card.title} fill className="object-cover" sizes="300px" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] to-transparent" />
              </div>
              <div className="p-4">
                <h3 className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors">{card.title}</h3>
                <p className="text-xs text-white/40 mt-1">{card.description}</p>
              </div>
            </BentoCell>
          ))}

          <BentoCell className="p-6">
            <p className="text-sm font-medium text-white mb-2">Weekly dispatch</p>
            <p className="text-xs text-white/40 mb-4">AI architecture and creative systems.</p>
            <EmailSignup listType="newsletter" placeholder="email" buttonText="Subscribe" compact />
          </BentoCell>
        </div>
      </div>

      <footer className="border-t border-white/5 px-6 py-6">
        <div className="max-w-7xl mx-auto flex justify-between text-xs text-white/20">
          <span>frankx.ai // v2.bento</span>
          <Link href="/home" className="hover:text-white/50 transition-colors">all variations</Link>
        </div>
      </footer>
    </main>
  )
}
