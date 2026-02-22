"use client"

import Link from 'next/link'
import { Shield, Sparkles, Mail } from 'lucide-react'

import { trackEvent } from '@/lib/analytics'
import type { ProductOffer } from '@/types/products'

// Global coming soon mode - set to true to hide all pricing
const COMING_SOON_MODE = true

interface ProductHeroProps {
  productId: string
  badge?: string
  title: string
  subtitle: string
  promise: string
  offer: ProductOffer
}

function isExternal(href: string) {
  return href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('https://') || href.startsWith('tel:')
}

export default function ProductHero({ productId, badge, title, subtitle, promise, offer }: ProductHeroProps) {
  const handleClick = (target: 'primary' | 'secondary') => {
    trackEvent('product_cta_click', {
      productId,
      location: 'hero',
      target,
      href: target === 'primary' ? offer.ctaPrimaryHref : offer.ctaSecondaryHref,
      label: target === 'primary' ? offer.ctaPrimaryTracking ?? offer.ctaPrimary : offer.ctaSecondaryTracking ?? offer.ctaSecondary
    })
  }

  return (
    <section className="relative overflow-hidden bg-[#0a0a0b]">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/30 via-[#02030b] to-blue-950/35" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(45,212,191,0.12),transparent_55%)]" />
      <div className="relative mx-auto max-w-5xl px-6 pb-16 pt-24 text-center text-slate-100">
        {COMING_SOON_MODE ? (
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-amber-100">
            <Sparkles className="h-4 w-4" />
            Coming Soon
          </div>
        ) : badge ? (
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-cyan-100">
            <Shield className="h-4 w-4" />
            {badge}
          </div>
        ) : null}
        <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
          <span className="bg-gradient-to-r from-white via-cyan-100 to-blue-100 bg-clip-text text-transparent">
            {title}
          </span>
        </h1>
        <p className="mt-6 text-lg text-white/70 sm:text-xl">{subtitle}</p>
        <p className="mt-6 text-base font-medium uppercase tracking-[0.3em] text-cyan-200">
          {promise}
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          {COMING_SOON_MODE ? (
            <Link
              href="/newsletter"
              onClick={() => handleClick('primary')}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white shadow-[0_16px_50px_rgba(45,212,191,0.35)] transition hover:-translate-y-1"
            >
              <Mail className="h-4 w-4" />
              Join Waitlist
            </Link>
          ) : (
            <>
              {(() => {
                const content = (
                  <span className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white shadow-[0_16px_50px_rgba(45,212,191,0.35)] transition hover:-translate-y-1">
                    {offer.ctaPrimary}
                  </span>
                )

                return isExternal(offer.ctaPrimaryHref) ? (
                  <a
                    href={offer.ctaPrimaryHref}
                    onClick={() => handleClick('primary')}
                    className="inline-flex"
                    target={offer.ctaPrimaryHref.startsWith('http') ? '_blank' : undefined}
                    rel={offer.ctaPrimaryHref.startsWith('http') ? 'noreferrer' : undefined}
                  >
                    {content}
                  </a>
                ) : (
                  <Link href={offer.ctaPrimaryHref} onClick={() => handleClick('primary')} className="inline-flex">
                    {content}
                  </Link>
                )
              })()}
              {offer.ctaSecondary && offer.ctaSecondaryHref ? (
                (() => {
                  const secondaryClasses =
                    'inline-flex items-center text-xs uppercase tracking-[0.3em] text-white/40 transition hover:text-white/70'
                  const content = <span>{offer.ctaSecondary}</span>

                  return isExternal(offer.ctaSecondaryHref) ? (
                    <a
                      href={offer.ctaSecondaryHref}
                      onClick={() => handleClick('secondary')}
                      className={secondaryClasses}
                      target={offer.ctaSecondaryHref.startsWith('http') ? '_blank' : undefined}
                      rel={offer.ctaSecondaryHref.startsWith('http') ? 'noreferrer' : undefined}
                    >
                      {content}
                    </a>
                  ) : (
                    <Link href={offer.ctaSecondaryHref} onClick={() => handleClick('secondary')} className={secondaryClasses}>
                      {content}
                    </Link>
                  )
                })()
              ) : null}
            </>
          )}
        </div>
      </div>
    </section>
  )
}
