'use client'

import Link from 'next/link'
import { useRef, useState, useCallback, useEffect } from 'react'
import { trackEvent } from '@/lib/analytics'
import { EmailSignup } from '@/components/email-signup'
import type { HomepageData } from '@/lib/homepage-data'

export default function HomeV10({ latestPosts, faqs, featuredTrack, books, products, credentials }: HomepageData) {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const toggle = useCallback(() => {
    if (!audioRef.current) return
    if (playing) audioRef.current.pause()
    else { audioRef.current.play(); trackEvent('homepage_track_play', { variation: 'v10', title: featuredTrack.title }) }
    setPlaying(!playing)
  }, [playing, featuredTrack.title])

  useEffect(() => {
    const a = audioRef.current; if (!a) return
    const end = () => setPlaying(false)
    a.addEventListener('ended', end); return () => a.removeEventListener('ended', end)
  }, [])

  useEffect(() => { trackEvent('homepage_view', { variation: 'v10-brutalist' }) }, [])

  return (
    <main className="min-h-screen bg-black text-white" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Header — Raw */}
      <header className="border-b border-white/20 px-6 py-4 flex items-center justify-between">
        <span className="text-lg font-bold tracking-tight">FRANKX</span>
        <nav className="hidden sm:flex gap-6 text-sm">
          <Link href="/blog" className="text-[#10B981] hover:underline">blog</Link>
          <Link href="/music" className="text-[#10B981] hover:underline">music</Link>
          <Link href="/books" className="text-[#10B981] hover:underline">books</Link>
          <Link href="/acos" className="text-[#10B981] hover:underline">tools</Link>
          <Link href="/about" className="text-[#10B981] hover:underline">about</Link>
        </nav>
      </header>

      {/* Hero — Maximum information, zero decoration */}
      <section className="px-6 py-12 border-b border-white/20">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-none mb-4">
          AI Architect & Creator
        </h1>
        <p className="text-base text-white/60 max-w-2xl mb-6">
          Frank Riemer. AI Systems Architect at Oracle. 12,000+ AI songs with Suno. 75+ open-source skills.
          6 published books. Everything documented, everything shipped.
        </p>
        <div className="flex flex-wrap gap-4 text-xs text-white/40 border-t border-white/10 pt-4">
          {credentials.map((c) => (
            <span key={c}>{c}</span>
          ))}
        </div>
      </section>

      {/* Products — Dense list */}
      <section className="px-6 py-8 border-b border-white/20">
        <h2 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Products & Tools</h2>
        <div className="space-y-0">
          {products.map((p) => (
            <Link
              key={p.title}
              href={p.href}
              className="flex items-baseline justify-between py-2 border-b border-white/5 hover:bg-white/5 -mx-2 px-2 transition-colors"
            >
              <span className="text-sm font-medium">{p.title}</span>
              <span className="text-xs text-white/30 ml-4 flex-shrink-0">{p.description}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured track — Minimal */}
      <section className="px-6 py-8 border-b border-white/20">
        <audio ref={audioRef} src={featuredTrack.audioUrl} preload="none" />
        <div className="flex items-center gap-4">
          <button
            onClick={toggle}
            className="text-sm text-[#10B981] hover:underline font-medium"
          >
            [{playing ? 'PAUSE' : 'PLAY'}]
          </button>
          <span className="text-sm">{featuredTrack.title}</span>
          <span className="text-xs text-white/30">{featuredTrack.genre.join(', ')} · {featuredTrack.duration}</span>
        </div>
      </section>

      {/* Blog posts — Dense table */}
      <section className="px-6 py-8 border-b border-white/20">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-white/40">Latest Articles</h2>
          <Link href="/blog" className="text-xs text-[#10B981] hover:underline">all →</Link>
        </div>
        <div className="space-y-0">
          {latestPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="flex items-baseline gap-4 py-2 border-b border-white/5 hover:bg-white/5 -mx-2 px-2 transition-colors"
            >
              <span className="text-xs text-white/30 flex-shrink-0 w-20">{post.date}</span>
              <span className="text-sm flex-1">{post.title}</span>
              <span className="text-xs text-white/20 flex-shrink-0">{post.readingTime}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Books — Compact list */}
      {books.length > 0 && (
        <section className="px-6 py-8 border-b border-white/20">
          <h2 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Books</h2>
          <div className="space-y-0">
            {books.map((book) => (
              <Link
                key={book.slug}
                href={`/books/${book.slug}`}
                className="flex items-baseline gap-4 py-2 border-b border-white/5 hover:bg-white/5 -mx-2 px-2 transition-colors"
              >
                <span className="text-sm font-medium">{book.title}</span>
                <span className="text-xs text-white/30">{book.subtitle}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* FAQ — No accordion, all visible */}
      {faqs.length > 0 && (
        <section className="px-6 py-8 border-b border-white/20">
          <h2 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">FAQ</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i}>
                <p className="text-sm font-medium mb-1">{faq.question}</p>
                <p className="text-xs text-white/40 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Newsletter — Bare */}
      <section className="px-6 py-8 border-b border-white/20">
        <h2 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Newsletter</h2>
        <p className="text-sm text-white/50 mb-4">Weekly dispatch. AI architecture, music, and creation. No spam.</p>
        <div className="max-w-md">
          <EmailSignup listType="newsletter" placeholder="email" buttonText="Subscribe" compact />
        </div>
      </section>

      {/* Footer — Minimal */}
      <footer className="px-6 py-6 flex items-center justify-between text-xs text-white/20">
        <span>frankx.ai // v10.brutalist</span>
        <Link href="/home" className="text-[#10B981] hover:underline">all variations</Link>
      </footer>
    </main>
  )
}
