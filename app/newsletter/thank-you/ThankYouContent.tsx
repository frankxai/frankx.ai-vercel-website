'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import Confetti from 'react-confetti'

const STREAM_RECOMMENDATIONS: Record<
  string,
  {
    streamName: string
    character: { src: string; name: string }
    resources: Array<{
      href: string
      label: string
      desc: string
      gradient: string
      border: string
    }>
  }
> = {
  'creation-chronicles': {
    streamName: 'Creation Chronicles',
    character: { src: '/images/team/arion-mamoru.png', name: 'Arion & Mamoru' },
    resources: [
      { href: '/vibe', label: 'Vibe OS', desc: 'State management for creators', gradient: 'from-purple-500/10 to-purple-600/10', border: 'border-purple-500/30' },
      { href: '/blog', label: 'Read the Blog', desc: 'Deep dives into AI creation', gradient: 'from-cyan-500/10 to-cyan-600/10', border: 'border-cyan-500/30' },
      { href: '/shop', label: 'Shop Templates', desc: 'Premium AI blueprints', gradient: 'from-emerald-500/10 to-emerald-600/10', border: 'border-emerald-500/30' },
    ],
  },
  'ai-architect': {
    streamName: 'AI Architect Dispatch',
    character: { src: '/images/team/codex-falcon.png', name: 'Codex & Talon' },
    resources: [
      { href: '/acos', label: 'ACOS v10.1', desc: '75+ skills, 38 agents', gradient: 'from-indigo-500/10 to-indigo-600/10', border: 'border-indigo-500/30' },
      { href: '/ai-architecture', label: 'AI Architecture', desc: 'Blueprints & patterns', gradient: 'from-cyan-500/10 to-cyan-600/10', border: 'border-cyan-500/30' },
      { href: '/shop/templates', label: 'Templates', desc: 'Deploy-ready AI systems', gradient: 'from-emerald-500/10 to-emerald-600/10', border: 'border-emerald-500/30' },
    ],
  },
  'music-lab': {
    streamName: 'FrankX Music Letters',
    character: { src: '/images/team/echo-leopard.png', name: 'Echo & Kira' },
    resources: [
      { href: '/music', label: 'Music Hub', desc: '12,000+ AI-crafted songs', gradient: 'from-pink-500/10 to-pink-600/10', border: 'border-pink-500/30' },
      { href: '/music-lab', label: 'Music Lab', desc: 'Interactive production tools', gradient: 'from-rose-500/10 to-rose-600/10', border: 'border-rose-500/30' },
      { href: '/products/suno-prompt-library', label: 'Suno Prompts', desc: 'Prompt engineering for music', gradient: 'from-cyan-500/10 to-cyan-600/10', border: 'border-cyan-500/30' },
    ],
  },
  arcanea: {
    streamName: 'Arcanea Transmissions',
    character: { src: '/images/team/nero-umbra.png', name: 'Nero & Umbra' },
    resources: [
      { href: '/soulbook', label: 'Soulbook', desc: 'The 7 Pillars framework', gradient: 'from-purple-500/10 to-purple-600/10', border: 'border-purple-500/30' },
      { href: '/golden-age', label: 'Golden Age', desc: 'The vision for humanity', gradient: 'from-amber-500/10 to-amber-600/10', border: 'border-amber-500/30' },
      { href: '/inner-circle', label: 'Inner Circle', desc: 'Exclusive access', gradient: 'from-violet-500/10 to-violet-600/10', border: 'border-violet-500/30' },
    ],
  },
  investor: {
    streamName: 'Investor Intelligence Brief',
    character: { src: '/images/team/draconia-tiger.png', name: 'Draconia & Draconis' },
    resources: [
      { href: '/investor', label: 'Investor Hub', desc: 'AI-powered investment tools', gradient: 'from-amber-500/10 to-amber-600/10', border: 'border-amber-500/30' },
      { href: '/tools/roi-calculator', label: 'ROI Calculator', desc: 'Measure AI impact', gradient: 'from-emerald-500/10 to-emerald-600/10', border: 'border-emerald-500/30' },
      { href: '/blog', label: 'Research', desc: 'Deep analysis & insights', gradient: 'from-cyan-500/10 to-cyan-600/10', border: 'border-cyan-500/30' },
    ],
  },
  'inner-circle': {
    streamName: 'Inner Circle',
    character: { src: '/images/team/shinkami.png', name: 'Shinkami' },
    resources: [
      { href: '/inner-circle', label: 'Inner Circle', desc: 'Full access details', gradient: 'from-violet-500/10 to-violet-600/10', border: 'border-violet-500/30' },
      { href: '/vision', label: 'The Vision', desc: 'Where we\'re heading', gradient: 'from-cyan-500/10 to-cyan-600/10', border: 'border-cyan-500/30' },
      { href: '/products', label: 'All Products', desc: 'The complete ecosystem', gradient: 'from-emerald-500/10 to-emerald-600/10', border: 'border-emerald-500/30' },
    ],
  },
}

const DEFAULT_RECS = {
  streamName: 'FrankX Newsletter',
  character: { src: '/images/mascot/mascot-v25-crystal-familiar.png', name: 'Axi' },
  resources: [
    { href: '/blog', label: 'Read the Blog', desc: 'AI creation deep dives', gradient: 'from-cyan-500/10 to-cyan-600/10', border: 'border-cyan-500/30' },
    { href: '/shop', label: 'Shop Templates', desc: 'Premium AI blueprints', gradient: 'from-emerald-500/10 to-emerald-600/10', border: 'border-emerald-500/30' },
    { href: '/products', label: 'All Products', desc: 'The complete ecosystem', gradient: 'from-purple-500/10 to-purple-600/10', border: 'border-purple-500/30' },
  ],
}

export default function ThankYouContent() {
  const searchParams = useSearchParams()
  const stream = searchParams.get('stream')
  const [showConfetti, setShowConfetti] = useState(true)
  const [dimensions] = useState(() => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 800,
    height: typeof window !== 'undefined' ? window.innerHeight : 600,
  }))

  const recs = (stream && STREAM_RECOMMENDATIONS[stream]) || DEFAULT_RECS

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black flex items-center justify-center px-4 py-12">
      {showConfetti && (
        <Confetti
          width={dimensions.width}
          height={dimensions.height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.3}
          colors={['#06b6d4', '#22d3ee', '#9333ea', '#a855f7', '#ec4899']}
        />
      )}

      <div className="max-w-2xl w-full">
        <div className="relative bg-gradient-to-br from-gray-900 to-gray-950 border border-cyan-500/20 rounded-3xl p-8 md:p-12 shadow-2xl shadow-cyan-500/20 text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-600/10 rounded-3xl blur-3xl -z-10" />

          {/* Character mascot */}
          <div className="relative mx-auto mb-6 w-24 h-24">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 to-purple-600/30 rounded-2xl blur-xl" />
            <Image
              src={recs.character.src}
              alt={recs.character.name}
              width={96}
              height={96}
              className="relative rounded-2xl object-cover ring-2 ring-white/10"
              priority
            />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Welcome In
          </h1>
          <p className="text-lg text-gray-300 mb-2">
            You&apos;re subscribed to <span className="text-cyan-400 font-semibold">{recs.streamName}</span>
          </p>
          <p className="text-sm text-gray-500 mb-8">
            Your first issue is on its way — check your inbox.
          </p>

          {/* What's Next */}
          <div className="bg-gray-800/50 border border-white/5 rounded-2xl p-6 mb-8 text-left">
            <h2 className="text-base font-semibold text-white mb-3">
              While you wait, explore these:
            </h2>
            <div className="grid gap-3 sm:grid-cols-3">
              {recs.resources.map((r) => (
                <Link
                  key={r.href}
                  href={r.href}
                  className={`group bg-gradient-to-br ${r.gradient} hover:brightness-150 border ${r.border} rounded-xl p-4 transition-all hover:scale-[1.03]`}
                >
                  <div className="text-sm font-medium text-white mb-1 group-hover:text-cyan-300 transition-colors">
                    {r.label}
                  </div>
                  <div className="text-xs text-gray-400 group-hover:text-gray-300">
                    {r.desc}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Primary CTA */}
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-semibold transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:scale-[1.02]"
          >
            <span>Explore the Ecosystem</span>
            <ArrowRight className="w-5 h-5" />
          </Link>

          {/* Social */}
          <div className="mt-8 pt-6 border-t border-gray-800">
            <p className="text-sm text-gray-500 mb-3">Follow the journey:</p>
            <div className="flex items-center justify-center gap-4">
              <a href="https://x.com/frankxeth" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-cyan-400 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </a>
              <a href="https://www.linkedin.com/in/frank-x-riemer/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-cyan-400 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              </a>
              <a href="https://youtube.com/@frankxai" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-cyan-400 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link href="/" className="text-gray-500 hover:text-white transition-colors text-sm">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
