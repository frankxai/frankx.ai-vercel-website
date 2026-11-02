"use client"

import Image from 'next/image'
import Link from 'next/link'
import { Sparkles, Mail } from 'lucide-react'

import { trackEvent } from '@/lib/analytics'
import { getPreviewManifest } from '@/lib/products/preview-manifests'
import ProductFileInspector from '@/components/products/ProductFileInspector'
import type { ProductBonus, ProductModule, ProductOffer, ProductPricingTier } from '@/types/products'

// Global coming soon mode - set to true to hide all pricing
const COMING_SOON_MODE = true

interface OfferStackProps {
  productId: string
  offer?: ProductOffer
  modules: ProductModule[]
  bonuses?: ProductBonus[]
  pricingTiers?: ProductPricingTier[]
}

function isExternal(href: string) {
  return href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')
}

export default function OfferStack({ productId, offer, modules, bonuses, pricingTiers }: OfferStackProps) {
  const waitlistHref = `/waitlist?intent=${productId}`
  const handleClick = (target: 'primary' | 'secondary' | string, href: string, label?: string) => {
    trackEvent('product_cta_click', {
      productId,
      location: 'offer',
      target,
      href,
      label: label ?? href
    })
  }

  const secondaryHref = offer?.ctaSecondaryHref
  const secondaryLabel = offer?.ctaSecondary
  const secondaryTracking = offer?.ctaSecondaryTracking
  const manifest = getPreviewManifest(productId)

  return (
    <section className="bg-[#0a0a0b] py-20">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 lg:flex-row">
        <div className="flex-1 space-y-6">
          <h2 className="text-3xl font-semibold text-white">What you receive</h2>
          <div className="grid gap-4">
            {modules.map((module) => (
              <div
                key={module.title}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-white/85 shadow-[0_10px_30px_rgba(8,15,33,0.4)]"
              >
                <div className="text-lg font-semibold text-white">{module.title}</div>
                <p className="mt-2 text-sm text-white/70">{module.description}</p>
              </div>
            ))}
          </div>
          {bonuses && bonuses.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-cyan-200">Included extras</h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {bonuses.map((bonus) => (
                  <div key={bonus.title} className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-5 text-white">
                    {!COMING_SOON_MODE && bonus.value ? (
                      <div className="font-mono text-xs tracking-[0.08em] text-cyan-200">{bonus.value}</div>
                    ) : null}
                    <div className="mt-2 text-lg font-semibold">{bonus.title}</div>
                    <p className="mt-2 text-sm text-white/70">{bonus.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="flex w-full flex-1 flex-col justify-center">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center text-white shadow-[0_20px_60px_rgba(8,15,33,0.55)]">
            {manifest ? (
              <div className="mb-6 overflow-hidden rounded-2xl border border-white/10 bg-[#07090e]">
                <Image
                  src={manifest.plateSvg}
                  alt={`${manifest.name} technical schematic plate`}
                  width={640}
                  height={360}
                  unoptimized
                  className="aspect-video h-auto w-full object-cover"
                />
              </div>
            ) : null}
            {COMING_SOON_MODE ? (
              <>
                {/* Coming Soon Mode */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 text-amber-400 text-sm font-medium mb-4">
                  <Sparkles className="w-4 h-4" />
                  Coming soon
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Join the launch list</h3>
                <p className="text-sm text-white/60 mb-6">
                  Inspect the package manifest below and request a release note when this kit opens.
                </p>
                <Link
                  href={waitlistHref}
                  onClick={() => handleClick('waitlist', waitlistHref, 'product-waitlist')}
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-3.5 text-sm font-semibold text-black shadow-[0_12px_36px_rgba(16,185,129,0.25)] transition hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
                >
                  <Mail className="w-4 h-4" />
                  Join launch list
                </Link>
                <div className="mt-6 rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4 text-left text-xs text-white/70">
                  <div className="font-mono text-xs font-semibold tracking-[0.06em] text-amber-200">
                    Launch list notice
                  </div>
                  <p className="mt-2 leading-relaxed">One email when the verified package and download path go live.</p>
                </div>
              </>
            ) : offer ? (
              <>
                {/* Normal Pricing Mode */}
                <div className="font-mono text-xs tracking-[0.08em] text-white/50">One-time purchase</div>
                <div className="mt-4 flex items-center justify-center gap-3">
                  {offer.originalPrice ? (
                    <span className="text-2xl text-white/40 line-through">
                      ${offer.originalPrice}
                    </span>
                  ) : null}
                  <span className="text-5xl font-bold text-cyan-200">
                    {offer.primaryPriceDisplay ?? `$${offer.primaryPrice}`}
                  </span>
                </div>
                {offer.note ? <p className="mt-4 text-sm text-white/60">{offer.note}</p> : null}
                {(() => {
                  const content = (
                    <span className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-3.5 text-sm font-semibold text-black shadow-[0_12px_36px_rgba(16,185,129,0.25)] transition hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                      {offer.ctaPrimary}
                    </span>
                  )

                  if (isExternal(offer.ctaPrimaryHref)) {
                    return (
                      <a
                        href={offer.ctaPrimaryHref}
                        onClick={() => handleClick('primary', offer.ctaPrimaryHref, offer.ctaPrimaryTracking)}
                        className="mt-6 inline-flex w-full rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
                        target={offer.ctaPrimaryHref.startsWith('http') ? '_blank' : undefined}
                        rel={offer.ctaPrimaryHref.startsWith('http') ? 'noreferrer' : undefined}
                      >
                        {content}
                      </a>
                    )
                  }

                  return (
                    <Link
                      href={offer.ctaPrimaryHref}
                      onClick={() => handleClick('primary', offer.ctaPrimaryHref, offer.ctaPrimaryTracking)}
                      className="mt-6 inline-flex w-full rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
                    >
                      {content}
                    </Link>
                  )
                })()}
                {secondaryLabel && secondaryHref ? (
                  <p className="mt-4 text-xs text-white/50">
                    {isExternal(secondaryHref) ? (
                      <a
                        href={secondaryHref}
                        onClick={() => handleClick('secondary', secondaryHref, secondaryTracking)}
                        className="rounded underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                        target={secondaryHref.startsWith('http') ? '_blank' : undefined}
                        rel={secondaryHref.startsWith('http') ? 'noreferrer' : undefined}
                      >
                        {secondaryLabel}
                      </a>
                    ) : (
                      <Link
                        href={secondaryHref}
                        onClick={() => handleClick('secondary', secondaryHref, secondaryTracking)}
                        className="rounded underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                      >
                        {secondaryLabel}
                      </Link>
                    )}
                  </p>
                ) : null}
                {offer.guarantee ? (
                  <div className="mt-6 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-4 text-left text-xs text-white/70">
                    <div className="font-mono text-xs font-semibold tracking-[0.06em] text-cyan-200">
                      {offer.guarantee.label}
                    </div>
                    <p className="mt-2 leading-relaxed">{offer.guarantee.description}</p>
                  </div>
                ) : null}
              </>
            ) : null}
          </div>
        </div>
      </div>

      {manifest ? (
        <div className="mx-auto max-w-6xl px-6">
          <ProductFileInspector manifest={manifest} />
        </div>
      ) : null}

      {pricingTiers && pricingTiers.length > 0 && !COMING_SOON_MODE ? (
        <div className="mx-auto mt-12 max-w-6xl px-6">
          <h3 className="text-center text-2xl font-semibold text-white">Choose your edition</h3>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {pricingTiers.map((tier) => {
              const cardClasses = tier.featured
                ? 'border-cyan-400/50 bg-cyan-500/10 shadow-[0_22px_60px_rgba(56,189,248,0.25)]'
                : 'border-white/10 bg-white/[0.03]'

              const body = (
                <div className={`flex h-full flex-col rounded-3xl ${cardClasses} p-6 text-white`}> 
                  <div className="font-mono text-xs tracking-[0.08em] text-white/60">{tier.name}</div>
                  <div className="mt-3 text-3xl font-bold">{tier.price}</div>
                  <p className="mt-4 text-sm text-white/70">{tier.description}</p>
                  <ul className="mt-6 flex-1 space-y-2 text-sm text-white/70">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-400" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    {isExternal(tier.ctaHref) ? (
                      <a
                        href={tier.ctaHref}
                        onClick={() => handleClick(`tier-${tier.name}`, tier.ctaHref, tier.ctaLabel)}
                        className="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-4 py-3 text-sm font-semibold text-black transition hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
                        target={tier.ctaHref.startsWith('http') ? '_blank' : undefined}
                        rel={tier.ctaHref.startsWith('http') ? 'noreferrer' : undefined}
                      >
                        {tier.ctaLabel}
                      </a>
                    ) : (
                      <Link
                        href={tier.ctaHref}
                        onClick={() => handleClick(`tier-${tier.name}`, tier.ctaHref, tier.ctaLabel)}
                        className="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-4 py-3 text-sm font-semibold text-black transition hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
                      >
                        {tier.ctaLabel}
                      </Link>
                    )}
                  </div>
                </div>
              )

              return <article key={tier.name}>{body}</article>
            })}
          </div>
        </div>
      ) : null}
    </section>
  )
}
