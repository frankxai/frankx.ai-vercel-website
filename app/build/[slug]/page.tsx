import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react'
import type { Metadata } from 'next'
import { createMetadata } from '@/lib/seo'
import { products, getProductBySlug, getUpsellTier } from '@/data/products'
import { ValueStack } from '@/components/funnel/ValueStack'
import { OutcomeList } from '@/components/funnel/OutcomeList'
import { NotForBlock } from '@/components/funnel/NotForBlock'
import { RefundGuarantee } from '@/components/funnel/RefundGuarantee'
import { BuyButton } from '@/components/funnel/BuyButton'

export async function generateStaticParams() {
  return products
    .filter((p) => p.tier !== 'free' && p.tier !== 'founders')
    .map((p) => ({ slug: p.slug }))
}

type Params = Promise<{ slug: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return createMetadata({ title: 'Product not found', description: '', path: `/build/${slug}` })
  return createMetadata({
    title: `${product.title} — €${product.pricing.eur}`,
    description: product.subtitle,
    path: `/build/${product.slug}`,
  })
}

export default async function BuildProductPage({ params }: { params: Params }) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()

  const upsell = getUpsellTier(product.slug)

  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      {/* Hero */}
      <section className="relative pt-28 pb-12">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/[0.03] to-transparent" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/build"
            className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-300 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All build tiers
          </Link>

          <p className="text-xs font-medium text-cyan-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            {product.tier === 'pack' && 'Trip-wire · €7 · The yes-decision tier'}
            {product.tier === 'toolkit' && 'Most chosen · €197 · The workhorse tier'}
            {product.tier === 'mastery' && 'For senior practitioners · €497'}
            {product.tier === 'architect' && 'For lead architects + CTOs · €997'}
          </p>

          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-4 leading-[1.05]">
            {product.title}
          </h1>
          <p className="text-lg text-zinc-300 leading-relaxed mb-2">{product.subtitle}</p>
          <p className="text-sm text-amber-400/90 italic mb-8">{product.hook}</p>

          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8 mb-8">
            <p className="text-base text-zinc-200 leading-relaxed">{product.positioning}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
            <BuyButton
              ctaText={product.ctaText}
              price={product.pricing.eur}
              cadence={product.pricing.cadence}
              lemonSqueezyVariantId={product.pricing.lemonSqueezyVariantId}
            />
            {product.secondaryCtaText && (
              <Link
                href={product.tier === 'pack' ? '/start-here' : '/build'}
                className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
              >
                {product.secondaryCtaText} →
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="pb-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8">
            <OutcomeList outcomes={product.outcomes} />
          </div>
        </div>
      </section>

      {/* Value stack */}
      <section className="pb-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold text-white mb-5 tracking-tight">Everything you receive</h2>
          <ValueStack includes={product.includes} bonuses={product.bonuses} />
        </div>
      </section>

      {/* Not for you if... */}
      {product.notFor.length > 0 && (
        <section className="pb-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <NotForBlock items={product.notFor} />
          </div>
        </section>
      )}

      {/* Guarantee */}
      <section className="pb-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <RefundGuarantee days={product.refundDays} guarantee={product.guarantee} />
        </div>
      </section>

      {/* Decoupling note */}
      <section className="pb-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
            <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">
              How it works without Frank in the loop
            </p>
            <p className="text-sm text-zinc-300 leading-relaxed">
              {product.decoupledFromFrank
                ? `Delivery is ${product.delivery}. Frank's time per quarter on this tier: ${product.frankTimePerBuyerPerQuarter}. Most of the value is in artifacts and community, not Frank's live involvement — that's why this tier is honest at this price.`
                : `This tier is intentionally NOT decoupled from Frank — his time is the value. Frank's time per buyer per quarter: ${product.frankTimePerBuyerPerQuarter}.`}
            </p>
          </div>
        </div>
      </section>

      {/* Upsell */}
      {upsell && (
        <section className="pb-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8 flex flex-col sm:flex-row items-start gap-5">
              <div className="flex-1">
                <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">
                  Considering more depth?
                </p>
                <h2 className="text-xl font-semibold text-white mb-2 tracking-tight">{upsell.title}</h2>
                <p className="text-sm text-zinc-400 leading-relaxed">{upsell.subtitle}</p>
              </div>
              <Link
                href={upsell.tier === 'founders' ? '/founders-circle' : `/build/${upsell.slug}`}
                className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-medium bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-zinc-200 whitespace-nowrap transition-colors flex-shrink-0"
              >
                See {upsell.title.replace('Six Primitives ', '')} — €{upsell.pricing.eur.toLocaleString('en-IE')}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/[0.03] p-6 sm:p-8 text-center">
            <h3 className="text-lg font-semibold text-white mb-3">Ready when you are</h3>
            <BuyButton
              ctaText={product.ctaText}
              price={product.pricing.eur}
              cadence={product.pricing.cadence}
              lemonSqueezyVariantId={product.pricing.lemonSqueezyVariantId}
            />
          </div>
        </div>
      </section>
    </div>
  )
}
