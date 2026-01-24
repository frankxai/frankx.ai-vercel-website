import Link from 'next/link'
import Script from 'next/script'
import { Suspense } from 'react'

import products from '@/data/products.json'
import songs from '@/data/songs.json'
import { createMetadata } from '@/lib/seo'
import type { ProductRecord } from '@/types/products'
import SongGrid, { SongRecord } from '@/components/music/SongGrid'

// Premium Vibe OS Components
import VibeOSHero from './components/VibeOSHero'
import VibeOSFeatures from './components/VibeOSFeatures'
import VibeOSSocialProof from './components/VibeOSSocialProof'
import VibeOSModules from './components/VibeOSModules'
import VibeOSBonuses from './components/VibeOSBonuses'
import VibeOSFAQ from './components/VibeOSFAQ'
import VibeOSFinalCTA from './components/VibeOSFinalCTA'

const product = products.find((entry) => entry.id === 'vibe-os') as ProductRecord
const songRecords = songs as SongRecord[]

if (!product) {
  throw new Error('Vibe OS product record missing')
}

export const metadata = createMetadata({
  title: `${product.name} - AI Music Production System | FrankX.ai`,
  description: product.promise,
  path: `/products/${product.slug}`,
  keywords: [
    'vibe os',
    'suno prompts',
    'ai music creation',
    'music production workflow',
    'suno ai mastery',
    'emotion mapping music',
    'genre prompts',
    'ai music system',
    'frankx music'
  ]
})

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: product.name,
  description: product.promise,
  image: 'https://frankx.ai/images/products/vibe-os-hero.jpg',
  brand: {
    '@type': 'Brand',
    name: 'FrankX.ai'
  },
  offers: {
    '@type': 'Offer',
    price: String(product.offer.primaryPrice),
    priceCurrency: product.offer.currency,
    availability: 'https://schema.org/PreOrder'
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '47'
  }
}

export default function VibeOSPage() {
  const productId = product.analyticsId ?? product.id

  return (
    <main className="relative min-h-screen overflow-hidden bg-void">
      {/* Ambient Background Effects */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(6,182,212,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(139,92,246,0.08),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_60%,rgba(16,185,129,0.06),transparent_35%)]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <VibeOSHero productId={productId} product={product} />

        <VibeOSFeatures transformation={product.transformation} />

        <VibeOSSocialProof stats={product.socialProof.stats} />

        <VibeOSModules
          productId={productId}
          modules={product.modules}
          offer={product.offer}
        />

        {product.bonuses && product.bonuses.length > 0 && (
          <VibeOSBonuses bonuses={product.bonuses} />
        )}

        {/* Studio Sessions Section */}
        <section className="relative py-24">
          <div className="absolute inset-0 bg-gradient-to-b from-void via-space/50 to-void" />
          <div className="relative mx-auto max-w-6xl px-6">
            <div className="mb-12 text-center">
              <span className="glow-badge glow-badge-cyan mb-4 inline-flex">
                Live Sessions
              </span>
              <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
                Hear What&apos;s Possible
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-white/60">
                These tracks were created using Vibe OS rituals. Each one went from concept to finished production in a single session.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              <div className="space-y-6">
                <Suspense fallback={<div className="h-64 animate-pulse rounded-2xl bg-white/5" />}>
                  <SongGrid songs={songRecords} limit={3} />
                </Suspense>
              </div>

              <div className="spotlight-card flex flex-col justify-center p-8 lg:p-10">
                <div className="glow-badge glow-badge-amber mb-4 w-fit">
                  Inner Circle
                </div>
                <h3 className="font-display text-2xl font-bold text-white">
                  Upgrade to the Realm
                </h3>
                <p className="mt-4 text-white/70">
                  Inner Circle members receive every new session, stems, and live ritual labs.
                  Join the waitlist to access the private vault and monthly music sprints.
                </p>
                <Link
                  href="/realm"
                  className="group mt-8 inline-flex w-fit items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500/20 to-amber-600/10 px-6 py-3 text-sm font-semibold text-amber-200 ring-1 ring-amber-500/30 transition-all hover:-translate-y-0.5 hover:ring-amber-400/50"
                >
                  Tour the Realm
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <VibeOSFAQ faq={product.faq} />

        <VibeOSFinalCTA productId={productId} offer={product.offer} />
      </div>

      <Script id="product-structured-data" type="application/ld+json">
        {JSON.stringify(structuredData)}
      </Script>
    </main>
  )
}
