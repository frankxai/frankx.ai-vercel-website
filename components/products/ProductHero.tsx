"use client"

import Link from 'next/link'
import { Shield } from 'lucide-react'

import { trackEvent } from '@/lib/analytics'
import type { ProductOffer } from '@/types/products'

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
    <section className="relative overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-slate-950 to-purple-900/30" />
      <div className="relative mx-auto max-w-5xl px-6 pb-16 pt-24 text-center text-slate-100">
        {badge ? (
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-primary-500/40 bg-primary-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-primary-200">
            <Shield className="h-4 w-4" />
            {badge}
          </div>
        ) : null}
        <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
          <span className="bg-gradient-to-r from-white via-primary-100 to-white/80 bg-clip-text text-transparent">
            {title}
          </span>
        </h1>
        <p className="mt-6 text-lg text-white/70 sm:text-xl">{subtitle}</p>
        <p className="mt-6 text-base font-medium uppercase tracking-[0.3em] text-primary-200">
          {promise}
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          {(() => {
            const content = (
              <span className="rounded-xl bg-gradient-to-r from-primary-500 to-purple-600 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white shadow-[0_16px_45px_rgba(99,102,241,0.45)] transition hover:-translate-y-1">
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
        </div>
      </div>
    </section>
  )
}
