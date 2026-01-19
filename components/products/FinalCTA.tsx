"use client"

import Link from 'next/link'
import { Sparkles, Mail } from 'lucide-react'

import { trackEvent } from '@/lib/analytics'

// Global coming soon mode - set to true to hide all pricing
const COMING_SOON_MODE = true

interface FinalCTAProps {
  productId: string
  title: string
  description: string
  primaryLabel: string
  primaryHref: string
  primaryTracking?: string
}

function isExternal(href: string) {
  return href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')
}

export default function FinalCTA({ productId, title, description, primaryLabel, primaryHref, primaryTracking }: FinalCTAProps) {
  const handleClick = () => {
    trackEvent('product_cta_click', {
      productId,
      location: 'final',
      target: COMING_SOON_MODE ? 'waitlist' : 'primary',
      href: COMING_SOON_MODE ? '/newsletter' : primaryHref,
      label: COMING_SOON_MODE ? 'join-waitlist' : (primaryTracking ?? primaryLabel)
    })
  }

  return (
    <section className="bg-gradient-to-r from-cyan-950/30 via-[#02030b] to-blue-950/30 py-20">
      <div className="mx-auto max-w-3xl px-6 text-center text-white">
        {COMING_SOON_MODE && (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 text-amber-400 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Coming Soon
          </div>
        )}
        <h2 className="text-3xl font-bold sm:text-4xl">
          {COMING_SOON_MODE ? 'Be First to Know When This Launches' : title}
        </h2>
        <p className="mt-4 text-base text-white/70 sm:text-lg">
          {COMING_SOON_MODE
            ? 'Join the waitlist for early access, exclusive launch discounts, and behind-the-scenes updates.'
            : description
          }
        </p>
        {COMING_SOON_MODE ? (
          <Link
            href="/newsletter"
            onClick={handleClick}
            className="mt-10 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-white shadow-[0_16px_45px_rgba(56,189,248,0.4)] transition hover:-translate-y-1"
          >
            <Mail className="w-4 h-4" />
            Join Waitlist
          </Link>
        ) : isExternal(primaryHref) ? (
          <a
            href={primaryHref}
            onClick={handleClick}
            className="mt-10 inline-flex rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-white shadow-[0_16px_45px_rgba(56,189,248,0.4)] transition hover:-translate-y-1"
            target={primaryHref.startsWith('http') ? '_blank' : undefined}
            rel={primaryHref.startsWith('http') ? 'noreferrer' : undefined}
          >
            {primaryLabel}
          </a>
        ) : (
          <Link
            href={primaryHref}
            onClick={handleClick}
            className="mt-10 inline-flex rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-white shadow-[0_16px_45px_rgba(56,189,248,0.4)] transition hover:-translate-y-1"
          >
            {primaryLabel}
          </Link>
        )}
      </div>
    </section>
  )
}
