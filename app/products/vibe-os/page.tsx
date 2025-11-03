import Link from 'next/link'
import Script from 'next/script'

import products from '@/data/products.json'
import FinalCTA from '@/components/products/FinalCTA'
import OfferStack from '@/components/products/OfferStack'
import ProductHero from '@/components/products/ProductHero'
import ProofRail from '@/components/products/ProofRail'
import TransformationList from '@/components/products/TransformationList'
import SongGrid, { SongRecord } from '@/components/music/SongGrid'
import songs from '@/data/songs.json'
import { createMetadata } from '@/lib/seo'
import type { ProductRecord } from '@/types/products'

const product = products.find((entry) => entry.id === 'vibe-os') as ProductRecord
const songRecords = songs as SongRecord[]

if (!product) {
  throw new Error('Vibe OS product record missing')
}

export const metadata = createMetadata({
  title: `${product.name} | FrankX.ai`,
  description: product.promise,
  path: `/products/${product.slug}`,
  keywords: [
    'vibe os',
    'suno prompts',
    'ai music creation',
    'music workflows',
    'frankx music'
  ]
})

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: product.name,
  description: product.promise,
  brand: {
    '@type': 'Brand',
    name: 'FrankX.ai'
  },
  offers: {
    '@type': 'Offer',
    price: String(product.offer.primaryPrice),
    priceCurrency: product.offer.currency,
    availability: 'https://schema.org/InStock'
  }
}

export default function VibeOSPage() {
  const productId = product.analyticsId ?? product.id

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <ProductHero
        productId={productId}
        badge={product.badge}
        title={product.headline}
        subtitle={product.subheadline}
        promise={product.promise}
        offer={product.offer}
      />

      <TransformationList items={product.transformation} title="What Changes With Vibe OS" />

      <ProofRail stats={product.socialProof.stats} quotes={product.socialProof.quotes} />

      <OfferStack
        productId={productId}
        offer={product.offer}
        modules={product.modules}
        bonuses={product.bonuses}
        pricingTiers={product.pricingTiers}
      />

      {product.caseStudies && product.caseStudies.length > 0 && (
        <section className="bg-slate-900/40 py-16">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-center text-3xl font-semibold text-white">Real Creators, Real Results</h2>
            <p className="mt-4 text-center text-sm text-white/70">
              These music creators used Vibe OS to transform their sound and build sustainable music practices.
            </p>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {product.caseStudies.map((study) => (
                <div key={study.title} className="flex h-full flex-col rounded-3xl border border-white/10 bg-slate-950/80 p-6">
                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-200">{study.metric ?? 'Case Study'}</span>
                  <h3 className="mt-3 text-lg font-semibold text-white">{study.title}</h3>
                  <p className="mt-3 text-sm text-white/70 leading-relaxed">{study.description}</p>
                  {study.quote && (
                    <blockquote className="mt-4 text-sm text-white/60">&ldquo;{study.quote}&rdquo;</blockquote>
                  )}
                  {(study.author || study.role) && (
                    <p className="mt-2 text-xs uppercase tracking-[0.2em] text-white/40">
                      {[study.author, study.role].filter(Boolean).join(' - ')}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-slate-950 py-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 lg:flex-row">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl font-semibold text-white">Latest Sessions in the Studio</h2>
            <p className="text-sm text-white/70">
              Drop these Suno-powered sessions straight into your rituals. Each template is tuned for a different launch
              moment—cinematic trailers, Afrobeats reels, and deep focus night work.
            </p>
            <SongGrid songs={songRecords} limit={3} />
          </div>
          <div className="flex-1 rounded-3xl border border-white/10 bg-white/5 p-8 text-sm text-white/70">
            <h3 className="text-xl font-semibold text-white">Upgrade to the Realm</h3>
            <p className="mt-4">
              Inner Circle members receive every new session, stems, and live ritual labs. Join the waitlist to access the
              private vault and monthly music sprints.
            </p>
            <Link
              href="/realm"
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-primary-500 to-purple-600 px-5 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:-translate-y-1"
            >
              Tour the Realm
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-center text-3xl font-semibold text-white">Frequently Asked Questions</h2>
          <div className="mt-10 space-y-6">
            {product.faq.map((item) => (
              <details key={item.question} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 text-left">
                <summary className="cursor-pointer text-lg font-semibold text-white">
                  {item.question}
                </summary>
                <p className="mt-3 text-sm text-white/70">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA
        productId={productId}
        title="Drop Into the FrankX Studio"
        description="Install the Vibe OS rituals and let your next Suno session become the soundtrack of the Golden Age."
        primaryLabel={product.offer.ctaPrimary}
        primaryHref={product.offer.ctaPrimaryHref}
        primaryTracking={product.offer.ctaPrimaryTracking}
      />

      <Script id="product-structured-data" type="application/ld+json">
        {JSON.stringify(structuredData)}
      </Script>
    </div>
  )
}
