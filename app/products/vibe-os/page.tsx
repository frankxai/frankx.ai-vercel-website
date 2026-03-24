import Script from 'next/script'

import products from '@/data/products.json'
import { createMetadata } from '@/lib/seo'
import type { ProductRecord } from '@/types/products'

// Premium Vibe OS Components
import VibeOSHero from './components/VibeOSHero'
import VibeOSFeatures from './components/VibeOSFeatures'
import VibeOSSocialProof from './components/VibeOSSocialProof'
import VibeOSHowItWorks from './components/VibeOSHowItWorks'
import VibeOSAgents from './components/VibeOSAgents'
import VibeOSPromptPreview from './components/VibeOSPromptPreview'
import VibeOSModules from './components/VibeOSModules'
import VibeOSPricing from './components/VibeOSPricing'
import VibeOSBonuses from './components/VibeOSBonuses'
import VibeOSFAQ from './components/VibeOSFAQ'
import VibeOSFinalCTA from './components/VibeOSFinalCTA'

const product = products.find((entry) => entry.id === 'vibe-os') as ProductRecord

if (!product) {
  throw new Error('Vibe OS product record missing')
}

export const metadata = createMetadata({
  title: `${product.name} — AI Music Production System | FrankX.ai`,
  description: product.promise,
  path: `/products/${product.slug}`,
  keywords: [
    'vibe os',
    'ai music production',
    'suno ai prompts',
    'ai music creation',
    'suno prompt engineering',
    'music producer ai',
    'multi-llm music',
    'ai song production',
    'flow state music',
    'binaural beats ai',
    'music production system',
    'ai agents music'
  ]
})

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: product.name,
  description: product.promise,
  image: 'https://frankx.ai/hero-vibe-os.webp',
  applicationCategory: 'MultimediaApplication',
  operatingSystem: 'Web',
  brand: {
    '@type': 'Brand',
    name: 'FrankX.ai'
  },
  offers: [
    {
      '@type': 'Offer',
      name: 'Free Tier',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock'
    },
    {
      '@type': 'Offer',
      name: 'Vibe Club',
      price: '19',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock'
    },
    {
      '@type': 'Offer',
      name: 'Pro',
      price: '97',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock'
    }
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '47'
  },
  featureList: [
    '50+ Engineered Suno Prompts',
    '15-Point Quality Validation Rubric',
    'Multi-LLM Intelligence (9 Models)',
    '4 Specialist AI Agents',
    'Album Art Creation Workflows',
    'Distribution & Monetization Strategy'
  ]
}

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: product.faq.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer
    }
  }))
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

        <VibeOSSocialProof stats={product.socialProof.stats} />

        <VibeOSHowItWorks />

        <VibeOSAgents />

        <VibeOSPromptPreview />

        <VibeOSFeatures transformation={product.transformation} />

        <VibeOSModules
          productId={productId}
          modules={product.modules}
          offer={product.offer}
        />

        <VibeOSPricing />

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
                Who Uses Vibe OS
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-white/60">
                Real creators producing professional AI music across every genre and use case.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="spotlight-card p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <h3 className="mb-2 font-semibold text-white">Podcasters & Content Creators</h3>
                <p className="text-sm leading-relaxed text-white/60">
                  Generate custom intro/outro music, background tracks for videos, and sonic branding — all matching your content&apos;s energy and audience.
                </p>
              </div>

              <div className="spotlight-card p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                </div>
                <h3 className="mb-2 font-semibold text-white">AI Music Producers</h3>
                <p className="text-sm leading-relaxed text-white/60">
                  Skip the guesswork with engineered prompts. Produce Suno tracks that sound intentional, emotionally targeted, and commercially viable from session one.
                </p>
              </div>

              <div className="spotlight-card p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="mb-2 font-semibold text-white">Entrepreneurs & Productivity Seekers</h3>
                <p className="text-sm leading-relaxed text-white/60">
                  Create personalized focus music, flow state soundtracks, and recovery audio calibrated to your brain&apos;s optimal frequencies using the Frequency Alchemist.
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
      <Script id="faq-structured-data" type="application/ld+json">
        {JSON.stringify(faqStructuredData)}
      </Script>
    </main>
  )
}
