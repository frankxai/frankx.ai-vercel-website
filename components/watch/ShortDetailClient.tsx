'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Copy, Check, Share2, Twitter, Linkedin, Zap } from 'lucide-react'

interface ShortDetailClientProps {
  shortId: string
  shortTitle: string
  shortAuthor: string
}

/**
 * Client-side polish for the per-Short detail page:
 *  - Top scroll-progress bar
 *  - Share widget (copy, X, LinkedIn)
 *  - Keyboard hint for J/K navigation between Shorts
 */
export function ShortDetailClient({
  shortId,
  shortTitle,
  shortAuthor,
}: ShortDetailClientProps) {
  const [copied, setCopied] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 26,
    mass: 0.4,
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  const url = `https://frankx.ai/watch/shorts/${shortId}`
  const shareText = `${shortTitle} — ${shortAuthor}. Curated Short on FrankX with AI Architect commentary.`

  const copy = () => {
    navigator.clipboard?.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 1400)
  }

  if (!mounted) return null

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX: smoothProgress }}
        className="fixed top-0 inset-x-0 z-40 h-[3px] bg-gradient-to-r from-rose-500 via-fuchsia-500 to-emerald-500 origin-left"
        aria-hidden
      />

      {/* Floating share rail (desktop) */}
      <aside
        className="hidden lg:flex flex-col gap-2.5 fixed left-4 top-1/2 -translate-y-1/2 z-30"
        aria-label="Share this Short"
      >
        <div className="text-[10px] uppercase tracking-widest text-white/40 font-bold text-center mb-1 rotate-90 origin-center mt-8 mr-2 whitespace-nowrap">
          Share
        </div>
        <button
          onClick={copy}
          className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all hover:scale-110"
          aria-label="Copy link"
          title={copied ? 'Copied!' : 'Copy link'}
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
        </button>
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}&via=frankxeth`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all hover:scale-110"
          aria-label="Share on X (Twitter)"
        >
          <Twitter className="w-4 h-4" />
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all hover:scale-110"
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="w-4 h-4" />
        </a>
      </aside>

      {/* Mobile inline share row */}
      <div className="lg:hidden flex items-center gap-2 px-6 py-4 border-t border-white/5 bg-black/20 backdrop-blur-sm">
        <span className="text-xs uppercase tracking-wider text-white/40 font-bold mr-auto inline-flex items-center gap-1.5">
          <Share2 className="w-3.5 h-3.5" /> Share
        </span>
        <button
          onClick={copy}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white/80"
        >
          {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
          {copied ? 'Copied' : 'Copy link'}
        </button>
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}&via=frankxeth`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/10 text-white/80"
          aria-label="X"
        >
          <Twitter className="w-3.5 h-3.5" />
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/10 text-white/80"
          aria-label="LinkedIn"
        >
          <Linkedin className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Floating "Open Immersive Player" CTA — mobile + desktop */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-5 right-5 z-30"
      >
        <Link
          href="/watch/shorts"
          className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-rose-500 to-fuchsia-500 text-white text-xs font-bold shadow-2xl shadow-rose-500/25 hover:shadow-rose-500/40 transition-all hover:scale-105"
        >
          <Zap className="w-3.5 h-3.5" />
          <span>Browse all Shorts</span>
        </Link>
      </motion.div>
    </>
  )
}
