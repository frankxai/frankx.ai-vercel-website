'use client'

import React, { useState, use } from 'react'
import Link from 'next/link'
import leadMagnetsData from '@/data/lead-magnets.json'

interface LeadMagnet {
  id: string
  title: string
  subtitle: string
  description: string
  icp: string
  type: string
  format: string[]
  slug: string
  coverImage: string
  badgeText: string
  pdfUrl: string
  notionUrl: string
  features: string[]
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
  const variantConfig = leadMagnet.splitTest?.variants[variantKey] || {
    headline: leadMagnet.title,
    ctaText: 'Get Instant Access & Download',
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
          icp: leadMagnet.icp,
          variantId: variantKey,
          source: 'lead_magnet_page',
        }),
      })

      if (res.ok) {
        setUnlocked(true)
      }
    } catch (err) {
      console.error('Lead submission failed:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0D14] text-white selection:bg-amber-500/30 selection:text-amber-200">
      {/* Glow Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-amber-500/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link href="/downloads" className="text-xs text-amber-400 hover:underline inline-flex items-center gap-1">
            ← Back to Digital Vault
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Asset Info */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
              <span>✦</span> {leadMagnet.badgeText}
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
              <div className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">What's Included:</div>
              {leadMagnet.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-neutral-200">
                  <span className="text-amber-400 font-bold">✓</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* Target ICP Tag */}
            <div className="pt-2 text-xs text-neutral-500">
              Target Profile: <span className="text-amber-400/90 font-medium">{leadMagnet.icp}</span>
            </div>
          </div>

          {/* Right Column: Lead Form or Unlocked Card */}
          <div className="lg:col-span-5">
            {!unlocked ? (
              <div className="bg-neutral-900/80 backdrop-blur-xl border border-white/15 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl" />

                <div className="text-center mb-6">
                  <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">Instant Digital Access</div>
                  <h3 className="text-xl font-bold text-white">Unlock Free Download</h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-400 mb-1.5">Primary Email Address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold hover:brightness-110 transition-all shadow-lg shadow-amber-500/20 text-sm disabled:opacity-50"
                  >
                    {isSubmitting ? 'Unlocking Access...' : variantConfig.ctaText}
                  </button>
                </form>

                <div className="mt-4 text-center text-xs text-neutral-500">
                  Instant PDF & Notion access provided immediately.
                </div>
              </div>
            ) : (
              <div className="bg-neutral-900/90 backdrop-blur-xl border border-emerald-500/40 rounded-2xl p-8 shadow-2xl text-center space-y-6">
                <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-400 text-2xl">
                  ✓
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Access Unlocked!</h3>
                  <p className="text-xs text-neutral-400 mt-1">Resource dispatched to {email}</p>
                </div>

                <div className="space-y-3">
                  <a
                    href={leadMagnet.pdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="block w-full py-3 px-4 rounded-xl bg-amber-500 text-black font-bold text-sm hover:bg-amber-400 transition-colors"
                  >
                    Download PDF Package
                  </a>
                  <a
                    href={leadMagnet.notionUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="block w-full py-3 px-4 rounded-xl bg-white/10 border border-white/20 text-white font-semibold text-sm hover:bg-white/15 transition-colors"
                  >
                    Open Notion Workspace
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
