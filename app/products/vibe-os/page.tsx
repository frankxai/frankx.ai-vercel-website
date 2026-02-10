import Script from 'next/script'

import products from '@/data/products.json'
import { createMetadata } from '@/lib/seo'
import type { ProductRecord } from '@/types/products'

// Premium Vibe OS Components
import VibeOSHero from './components/VibeOSHero'
import VibeOSFeatures from './components/VibeOSFeatures'
import VibeOSSocialProof from './components/VibeOSSocialProof'
import VibeOSModules from './components/VibeOSModules'
import VibeOSBonuses from './components/VibeOSBonuses'
import VibeOSFAQ from './components/VibeOSFAQ'
import VibeOSFinalCTA from './components/VibeOSFinalCTA'

const product = products.find((entry) => entry.id === 'vibe-os') as ProductRecord

if (!product) {
  throw new Error('Vibe OS product record missing')
}

export const metadata = createMetadata({
  title: `${product.name} - Free Creative State Management | FrankX.ai`,
  description: product.promise,
  path: `/products/${product.slug}`,
  keywords: [
    'vibe os',
    'creative state management',
    'energy tracking',
    'creative workflow',
    'productivity for creators',
    'focus management',
    'creative energy',
    'workflow optimization',
    'free productivity tool'
  ]
})

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: product.name,
  description: product.promise,
  image: 'https://frankx.ai/images/products/vibe-os-hero.jpg',
  applicationCategory: 'ProductivityApplication',
  operatingSystem: 'Web',
  brand: {
    '@type': 'Brand',
    name: 'FrankX.ai'
  },
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: product.offer.currency,
    availability: 'https://schema.org/InStock'
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '23'
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

        {/* Use Cases Section */}
        <section className="relative py-24">
          <div className="absolute inset-0 bg-gradient-to-b from-void via-space/50 to-void" />
          <div className="relative mx-auto max-w-6xl px-6">
            <div className="mb-12 text-center">
              <span className="glow-badge glow-badge-cyan mb-4 inline-flex">
                Built for Creators
              </span>
              <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
                How Creators Use Vibe OS
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-white/60">
                Real workflows from creators who manage their energy and ship consistently.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="spotlight-card p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </div>
                <h3 className="mb-2 font-semibold text-white">Writers</h3>
                <p className="text-sm leading-relaxed text-white/60">
                  Track peak writing hours, manage context switching between projects, and build sustainable daily writing habits.
                </p>
              </div>

              <div className="spotlight-card p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                </div>
                <h3 className="mb-2 font-semibold text-white">Musicians</h3>
                <p className="text-sm leading-relaxed text-white/60">
                  Schedule production sessions during high-energy windows and creative work during flow states.
                </p>
              </div>

              <div className="spotlight-card p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
                <h3 className="mb-2 font-semibold text-white">Designers</h3>
                <p className="text-sm leading-relaxed text-white/60">
                  Optimize creative sessions, manage client work energy, and prevent burnout with structured tracking.
                </p>
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
