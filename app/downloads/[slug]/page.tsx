'use client'

import React, { useState, use } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import leadMagnetsData from '@/data/lead-magnets.json'

interface LeadMagnet {
  id: string
  title: string
  subtitle: string
  description: string
  icp: string
  category?: string
  type?: string
  format: string[]
  slug: string
  coverImage: string
  badgeText: string
  pdfUrl: string
  notionUrl: string
  features: string[]
  stats?: {
    downloadsCount?: number
    rating?: number
    pageCount?: number
  }
  splitTest?: {
    experimentId: string
    variants: Record<string, { headline: string; ctaText: string; offerType: string }>
  }
}

export default function LeadMagnetDownloadPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params)
  const slug = resolvedParams.slug

  const leadMagnet = (leadMagnetsData as LeadMagnet[]).find((lm) => lm.slug === slug)

  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [unlocked, setUnlocked] = useState(false)

  if (!leadMagnet) {
    return (
      <div className="min-h-screen bg-[#0A0D14] text-white flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-3xl font-bold mb-4">Digital Asset Not Found</h1>
        <p className="text-neutral-400 mb-6">The requested lead magnet slug does not exist in our catalog.</p>
        <Link href="/downloads" className="px-5 py-2.5 bg-amber-500 text-black font-semibold rounded-lg hover:bg-amber-400">
          View All Digital Downloads
        </Link>
      </div>
    )
  }

  // Variant A vs B default handling
  const variantKey = 'A'
  const variantConfig = leadMagnet.splitTest?.variants?.[variantKey] || {
    headline: leadMagnet.title,
    ctaText: 'Instant Executive Access',
    offerType: 'standard',
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) return

    setIsSubmitting(true)
    try {
      const res = await fetch('/api/v1/lead-ingest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          leadMagnetId: leadMagnet.id,
          leadMagnetTitle: leadMagnet.title,
          icp: leadMagnet.icp,
          variantId: variantKey,
          source: 'lead_magnet_landing_page',
        }),
      })

      if (res.ok) {
        setUnlocked(true)
      } else {
        setUnlocked(true) // Graceful fallback
      }
    } catch (err) {
      console.error('Lead submission failed:', err)
      setUnlocked(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#070A0F] text-white selection:bg-amber-500/30 selection:text-amber-200">
      {/* Glow Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-amber-500/10 rounded-full blur-[180px]" />
        <div className="absolute bottom-1/3 left-1/4 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[160px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-10 flex items-center justify-between">
          <Link href="/downloads" className="text-xs font-mono text-amber-400 hover:underline inline-flex items-center gap-1.5">
            <span>←</span> Back to Digital Vault
          </Link>
          <Link href="/products/value-ladder" className="text-xs font-mono text-neutral-400 hover:text-white transition-colors">
            Explore 2026 Value Ladder (€0 - €10k) →
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Asset Info & Cover Art */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold">
                <span>✦</span> {leadMagnet.badgeText}
              </span>
              <span className="text-xs text-neutral-400 font-mono">
                {leadMagnet.category}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {variantConfig.headline}
            </h1>

            <p className="text-base sm:text-lg text-neutral-300">
              {leadMagnet.subtitle}
            </p>

            <p className="text-sm text-neutral-400 leading-relaxed">
              {leadMagnet.description}
            </p>

            {/* Feature List */}
            <div className="space-y-3 pt-4 border-t border-white/10">
<<<<<<< HEAD
              <div className="text-xs text-neutral-400 font-semibold font-mono">Included in this 2026 Edition:</div>
=======
              <div className="text-xs uppercase tracking-wider text-neutral-400 font-semibold font-mono">What's Included in this Edition:</div>
>>>>>>> origin/main
              {leadMagnet.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-neutral-200">
                  <span className="text-amber-400 font-bold shrink-0">✓</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* Target ICP Tag */}
            <div className="pt-2 text-xs text-neutral-500 font-mono">
              Target Audience: <span className="text-amber-400/90 font-medium">{leadMagnet.icp}</span>
            </div>
          </div>

          {/* Right Column: High-Res 3D Cover & Form */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* Visual Cover Preview */}
            <div className="relative w-64 h-84 sm:w-72 sm:h-96 rounded-2xl overflow-hidden border border-white/15 shadow-2xl shadow-black/80 mb-6 group">
              <Image
                src={leadMagnet.coverImage}
                alt={leadMagnet.title}
                fill
                priority
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 250px, 350px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Lead Form or Unlocked Card */}
            <div className="w-full">
              {!unlocked ? (
                <div className="bg-neutral-900/80 backdrop-blur-xl border border-white/15 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                  <div className="text-center mb-6">
<<<<<<< HEAD
                    <div className="text-xs font-semibold text-amber-400 mb-1 font-mono">
=======
                    <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1 font-mono">
>>>>>>> origin/main
                      Zero-Friction Access
                    </div>
                    <h3 className="text-xl font-bold text-white">Unlock Free Executive Asset</h3>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-neutral-400 mb-1.5 font-mono">
                        Primary Executive Email
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="architect@company.com"
<<<<<<< HEAD
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 text-sm font-mono"
=======
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50 focus-visible:border-amber-500 text-sm font-mono"
>>>>>>> origin/main
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
<<<<<<< HEAD
                      className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400 text-black font-bold hover:brightness-110 transition-all shadow-lg shadow-amber-500/20 text-sm font-sans disabled:opacity-50"
=======
                      className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400 text-black font-bold hover:brightness-110 transition-transform hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-amber-500/20 text-xs uppercase tracking-wider font-mono disabled:opacity-50"
>>>>>>> origin/main
                    >
                      {isSubmitting ? 'Unlocking...' : variantConfig.ctaText}
                    </button>
                  </form>

                  <div className="mt-4 text-center text-[11px] text-neutral-500">
                    Instant on-screen PDF & Notion access · No waiting required
                  </div>
                </div>
              ) : (
                <div className="bg-neutral-900/90 backdrop-blur-xl border border-emerald-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl text-center space-y-5 animate-in fade-in duration-300">
                  <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-400 text-xl font-bold">
                    ✓
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Access Unlocked!</h3>
                    <p className="text-xs text-neutral-400 mt-1">Dispatched to {email}</p>
                  </div>

                  <div className="space-y-2.5">
                    <a
                      href={leadMagnet.pdfUrl}
                      download
                      className="block w-full py-3 px-4 rounded-xl bg-amber-500 text-black font-bold text-xs uppercase tracking-wider font-mono hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20"
                    >
                      ⬇ Download Executive PDF (Print-Ready)
                    </a>
                    {leadMagnet.notionUrl && (
                      <a
                        href={leadMagnet.notionUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="block w-full py-3 px-4 rounded-xl bg-white/10 border border-white/20 text-white font-semibold text-xs font-mono hover:bg-white/15 transition-colors"
                      >
                        Duplicate Notion Workspace ↗
                      </a>
                    )}
                  </div>

                  {/* Upsell Bridge to Value Ladder */}
                  <div className="pt-4 border-t border-white/10 text-left">
                    <div className="text-[11px] font-mono text-amber-400 font-bold mb-1">
                      WANT FULL AUTONOMOUS SWARM CODEBASES?
                    </div>
                    <p className="text-xs text-neutral-400 mb-2">
                      Explore the FrankX Sovereign Value Ladder (€97 - €10k) for complete agent fleets, memory patterns, and 1-on-1 advisory.
                    </p>
                    <Link
                      href="/products/value-ladder"
                      className="text-xs font-mono text-white underline hover:text-amber-300 transition-colors inline-block"
                    >
                      View Sovereign Value Ladder →
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
