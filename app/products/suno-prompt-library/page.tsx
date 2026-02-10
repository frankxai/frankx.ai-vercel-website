import Script from 'next/script'

import products from '@/data/products.json'
import FinalCTA from '@/components/products/FinalCTA'
import OfferStack from '@/components/products/OfferStack'
import ProductHero from '@/components/products/ProductHero'
import ProofRail from '@/components/products/ProofRail'
import TransformationList from '@/components/products/TransformationList'
import { createMetadata } from '@/lib/seo'
import type { ProductRecord } from '@/types/products'

const product = products.find((entry) => entry.id === 'suno-prompt-library') as ProductRecord

if (!product) {
  throw new Error('Suno Prompt Library product record missing')
}

export const metadata = createMetadata({
  title: `${product.name} | FrankX.ai`,
  description: product.promise,
  path: `/products/${product.slug}`,
  keywords: [
    'suno prompts',
    'suno ai prompts',
    'ai music prompts',
    'suno prompt library',
    'music generation prompts',
    'suno templates'
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
    availability: 'https://schema.org/InStock',
    priceValidUntil: '2026-12-31',
  }
}

export default function SunoPromptLibraryPage() {
  const productId = product.analyticsId ?? product.id

  return (
    <div className="min-h-screen bg-void text-slate-100">
      <ProductHero
        productId={productId}
        badge={product.badge}
        title={product.headline}
        subtitle={product.subheadline}
        promise={product.promise}
        offer={product.offer}
      />

      <TransformationList items={product.transformation} title="What You Get With the Prompt Library" />

      <ProofRail stats={product.socialProof.stats} quotes={product.socialProof.quotes} />

      <OfferStack
        productId={productId}
        offer={product.offer}
        modules={product.modules}
        bonuses={product.bonuses}
      />

      {/* Genre Preview Section */}
      <section className="bg-void py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-3xl font-semibold text-white mb-10">
            Prompts for Every Sound
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { genre: 'Electronic', count: '25+', color: 'from-cyan-500 to-blue-600' },
              { genre: 'Hip-Hop & R&B', count: '20+', color: 'from-purple-500 to-pink-600' },
              { genre: 'Cinematic', count: '25+', color: 'from-amber-500 to-orange-600' },
              { genre: 'World & Fusion', count: '15+', color: 'from-emerald-500 to-teal-600' },
            ].map((item) => (
              <div
                key={item.genre}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center"
              >
                <div className={`inline-flex items-center justify-center rounded-xl bg-gradient-to-r ${item.color} px-4 py-2 text-sm font-bold text-white mb-3`}>
                  {item.count} Prompts
                </div>
                <h3 className="text-lg font-semibold text-white">{item.genre}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-void py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-center text-3xl font-semibold text-white">Frequently Asked Questions</h2>
          <div className="mt-10 space-y-6">
            {product.faq.map((item) => (
              <details key={item.question} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-left">
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
        title="Ready to Skip the Prompt Guessing Game?"
        description="Get 100+ battle-tested prompts and start making better music today."
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
