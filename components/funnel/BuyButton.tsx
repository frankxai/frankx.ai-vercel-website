'use client'

import { ArrowRight } from 'lucide-react'
import { trackCheckoutStart, trackCtaClick, priceBand } from '@/lib/track'

/**
 * BuyButton — primary CTA on a product detail page.
 *
 * If a Lemon Squeezy variant ID is set on the product, the button links to
 * the LS hosted checkout. Otherwise (pre-launch state), it shows a "notify me"
 * placeholder that captures email via the existing newsletter API.
 *
 * No countdown timers, no "limited spots" tricks. Just price + action.
 */
export function BuyButton({
  productSlug,
  ctaText,
  price,
  cadence,
  lemonSqueezyVariantId,
  fallbackHref = '/start-here',
}: {
  productSlug?: string
  ctaText: string
  price: number
  cadence: 'lifetime' | 'subscription' | 'application'
  lemonSqueezyVariantId?: string
  fallbackHref?: string
}) {
  const checkoutUrl = lemonSqueezyVariantId
    ? `https://frankx.lemonsqueezy.com/buy/${lemonSqueezyVariantId}?checkout[discount_code]=`
    : null

  const href = checkoutUrl ?? fallbackHref
  const isLive = !!checkoutUrl

  const handleClick = () => {
    if (isLive) trackCheckoutStart({ product: productSlug ?? ctaText, price_band: priceBand(price) })
    else trackCtaClick({ cta: ctaText, location: 'product-buy-button' })
  }

  return (
    <div className="space-y-2">
      <a
        href={href}
        onClick={handleClick}
        target={isLive ? '_blank' : undefined}
        rel={isLive ? 'noopener noreferrer' : undefined}
        className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 rounded-xl text-base font-semibold bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 transition-colors"
      >
        {ctaText}
        <ArrowRight className="w-4 h-4" />
      </a>
      {!isLive && (
        <p className="text-xs text-zinc-500">
          Lemon Squeezy product not yet live — clicking will redirect to /start-here for early access.
        </p>
      )}
      {price > 0 && cadence === 'lifetime' && (
        <p className="text-xs text-zinc-500">
          One-time payment. Lifetime access. {price >= 197 && '30-day no-questions refund.'}
        </p>
      )}
      {cadence === 'application' && (
        <p className="text-xs text-zinc-500">
          Application form. Replied to within 5 business days.
        </p>
      )}
    </div>
  )
}
