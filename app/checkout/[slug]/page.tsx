import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, ShieldCheck, Clock } from 'lucide-react'

import { getProductBySlug } from '@/lib/products'
import { isConfigured, buildDirectCheckoutUrl } from '@/lib/lemon-squeezy'
import { createMetadata } from '@/lib/seo'
import type { ProductRecord } from '@/types/products'

/**
 * Gate (b) of the triple gate: only slugs listed here can ever render a live
 * buy button. The value is the env var that must hold the Lemon Squeezy
 * variant ID for that product. Opening checkout for a product means adding a
 * row here AND setting that env var — nothing goes live by accident.
 */
const PRODUCT_VARIANT_ENV_KEYS: Record<string, string> = {
  'starter-kit': 'LEMON_SQUEEZY_VARIANT_STARTER_KIT',
  'command-center-template': 'LEMON_SQUEEZY_VARIANT_COMMAND_CENTER_TEMPLATE',
}

// Some registry entries (e.g. golden-age) predate the full ProductRecord
// shape and carry no offer. Treat offer as optional at runtime.
type Offer = ProductRecord['offer'] | undefined

/**
 * The triple gate. Returns a hosted-checkout URL only when every gate passes:
 * (a) the product is a real paid product in data/products.json,
 * (b) its slug is explicitly wired in PRODUCT_VARIANT_ENV_KEYS,
 * (c) the Lemon Squeezy store config and the per-product variant ID env
 *     var are both present.
 * Any failure returns null and the page falls back to the honest
 * checkout-not-open state. Fail closed.
 */
function getLiveCheckoutUrl(slug: string, offer: Offer): string | null {
  if (!offer || offer.primaryPrice <= 0) return null
  const envKey = PRODUCT_VARIANT_ENV_KEYS[slug]
  if (!envKey) return null
  const variantId = process.env[envKey]
  if (!variantId || !isConfigured()) return null
  return buildDirectCheckoutUrl(variantId)
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    return createMetadata({
      title: 'Product Not Found',
      description: 'The requested product could not be found.',
      path: `/checkout/${slug}`,
      noindex: true,
    })
  }

  return createMetadata({
    title: `Checkout — ${product.name} | FrankX`,
    description: product.summary ?? product.promise ?? `Checkout for ${product.name}.`,
    path: `/checkout/${product.slug}`,
    noindex: true,
  })
}

export default async function CheckoutPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const offer = product.offer as Offer
  const priceDisplay =
    offer?.primaryPriceDisplay || (offer && offer.primaryPrice === 0 ? 'Free' : undefined)
  const isPaid = Boolean(offer && offer.primaryPrice > 0)
  const checkoutUrl = getLiveCheckoutUrl(product.slug, offer)
  const productHref = `/products/${product.slug}`

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-[#0a0a0b] px-6">
      <div className="mx-auto w-full max-w-lg py-20">
        {product.category && (
          <div className="mb-6 inline-flex items-center rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-cyan-300">
            {product.category}
          </div>
        )}

        <h1 className="text-4xl font-bold tracking-tight text-white">{product.name}</h1>

        {priceDisplay && (
          <p className="mt-4 text-3xl font-bold text-white">{priceDisplay}</p>
        )}

        {checkoutUrl ? (
          <>
            <p className="mt-6 text-lg leading-relaxed text-slate-400">
              {product.headline}
            </p>

            <div className="mt-8 space-y-3">
              <a
                href={checkoutUrl}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 text-base font-semibold text-white transition-colors hover:from-cyan-400 hover:to-blue-500"
              >
                Buy now{priceDisplay ? ` — ${priceDisplay}` : ''}
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href={productHref}
                className="flex w-full items-center justify-center rounded-xl border border-white/[0.08] px-8 py-4 text-base font-medium text-slate-400 transition-colors hover:text-white"
              >
                View product details
              </Link>
            </div>

            <div className="mt-8 flex items-start gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] p-4">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
              <div>
                <p className="text-sm font-medium text-slate-300">
                  Secure checkout via Lemon Squeezy.
                </p>
                {offer?.guarantee && (
                  <p className="mt-1 text-sm text-slate-400">
                    {offer.guarantee.label} — {offer.guarantee.description}
                  </p>
                )}
              </div>
            </div>
          </>
        ) : isPaid ? (
          <>
            <div className="mt-8 flex items-start gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] p-4">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400" />
              <p className="text-sm leading-relaxed text-slate-300">
                Direct checkout for this product is not open yet. Join the launch
                list and you will get an email the day it opens.
              </p>
            </div>

            <div className="mt-8 space-y-3">
              <Link
                href={`/waitlist?intent=${product.slug}`}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-white/15"
              >
                Join the Launch List
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={productHref}
                className="flex w-full items-center justify-center rounded-xl border border-white/[0.08] px-8 py-4 text-base font-medium text-slate-400 transition-colors hover:text-white"
              >
                View product details
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="mt-8 flex items-start gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] p-4">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
              <p className="text-sm leading-relaxed text-slate-300">
                This one does not go through a checkout — it is available directly
                from the product page.
              </p>
            </div>

            <div className="mt-8 space-y-3">
              <Link
                href={productHref}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-white/15"
              >
                Go to product page
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/products"
                className="flex w-full items-center justify-center rounded-xl border border-white/[0.08] px-8 py-4 text-base font-medium text-slate-400 transition-colors hover:text-white"
              >
                Browse all products
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
