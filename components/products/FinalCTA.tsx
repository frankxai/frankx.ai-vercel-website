"use client"

import Link from 'next/link'

import { trackEvent } from '@/lib/analytics'

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
      target: 'primary',
      href: primaryHref,
      label: primaryTracking ?? primaryLabel
    })
  }

  return (
    <section className="bg-gradient-to-r from-cyan-950/30 via-[#02030b] to-blue-950/30 py-20">
      <div className="mx-auto max-w-3xl px-6 text-center text-white">
        <h2 className="text-3xl font-bold sm:text-4xl">{title}</h2>
        <p className="mt-4 text-base text-white/70 sm:text-lg">{description}</p>
        {isExternal(primaryHref) ? (
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
