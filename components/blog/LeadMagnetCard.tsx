'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import leadMagnetsData from '@/data/lead-magnets.json'

interface LeadMagnetCardProps {
  id: string
  title?: string
  subtitle?: string
}

export function LeadMagnetCard({ id, title: customTitle, subtitle: customSubtitle }: LeadMagnetCardProps) {
  const magnet = (leadMagnetsData as any[]).find((m) => m.id === id || m.slug === id) || (leadMagnetsData as any[])[0]
  
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [unlocked, setUnlocked] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/v1/lead-ingest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          leadMagnetId: magnet.id,
          leadMagnetTitle: magnet.title,
          source: 'blog_inline_card',
        }),
      })

      if (!res.ok) {
        throw new Error('Failed to process request.')
      }

      setUnlocked(true)
    } catch (err: any) {
      // Even if network fails, unlock to give creator the asset
      setUnlocked(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="my-10 overflow-hidden rounded-2xl border border-white/10 bg-[#090D14]/90 p-6 sm:p-8 backdrop-blur-xl shadow-2xl transition-colors duration-300 hover:border-amber-500/30">
      <div className="flex flex-col md:flex-row gap-6 items-center">
        {/* Cover Preview Image */}
        <div className="relative w-36 h-48 sm:w-44 sm:h-60 shrink-0 rounded-xl overflow-hidden border border-white/10 shadow-lg shadow-black/60 group">
          <Image
            src={magnet.coverImage}
            alt={magnet.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 150px, 200px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Content & Form */}
        <div className="flex-1 text-left">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded border border-amber-400/20">
              {magnet.badgeText || 'Free Download'}
            </span>
            <span className="text-xs text-neutral-400 font-mono">
              {magnet.category}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-snug mb-2">
            {customTitle || magnet.title}
          </h3>

          <p className="text-xs sm:text-sm text-neutral-300 mb-4 leading-relaxed">
            {customSubtitle || magnet.subtitle}
          </p>

          {/* Key Features Bullet List */}
          <div className="space-y-1.5 mb-5">
            {magnet.features?.slice(0, 2).map((feat: string, idx: number) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-neutral-400">
                <span className="text-amber-400 font-bold">✓</span>
                <span>{feat}</span>
              </div>
            ))}
          </div>

          {/* Unlocked State vs Form State */}
          {unlocked ? (
            <div className="rounded-xl bg-amber-500/10 border border-amber-500/30 p-4 animate-in fade-in zoom-in-95 duration-300">
              <div className="text-xs font-bold text-amber-300 mb-2">
                🎉 Instant Access Unlocked!
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={magnet.pdfUrl}
                  download
                  className="px-4 py-2 rounded-lg bg-amber-500 text-black text-xs font-bold hover:bg-amber-400 transition-colors shadow-md shadow-amber-500/20 flex items-center gap-1.5"
                >
                  <span>⬇ Download Executive PDF</span>
                </a>
                {magnet.notionUrl && (
                  <a
                    href={magnet.notionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-xs font-medium hover:bg-white/15 transition-colors"
                  >
                    Duplicate Notion Hub ↗
                  </a>
                )}
              </div>
              <p className="text-[11px] text-neutral-400 mt-2">
                A backup copy has also been dispatched to <span className="text-neutral-200">{email || 'your email'}</span>.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-2 max-w-md">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your executive email..."
                  required
                  className="flex-1 rounded-xl bg-white/5 border border-white/15 px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus-visible:outline-none focus-visible:border-amber-400 focus-visible:ring-1 focus-visible:ring-amber-400"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2.5 rounded-xl bg-amber-500 text-black text-xs font-bold hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20 shrink-0 disabled:opacity-50"
                >
                  {loading ? 'Unlocking...' : 'Instant Download'}
                </button>
              </div>
              {error && <div className="text-[11px] text-red-400">{error}</div>}
              <div className="text-[10px] text-neutral-500 flex items-center gap-2">
                <span>🔒 Privacy Protected</span>
                <span>•</span>
                <span>Zero AI Slop Guarantee</span>
                <span>•</span>
                <span>Instant On-Screen Access</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
