import Script from 'next/script'
import products from '@/data/products.json'
import { createMetadata } from '@/lib/seo'
import ProductHero from '@/components/products/ProductHero'
import TransformationList from '@/components/products/TransformationList'
import ProofRail from '@/components/products/ProofRail'
import OfferStack from '@/components/products/OfferStack'
import FinalCTA from '@/components/products/FinalCTA'
import CaseStudyGrid from '@/components/products/CaseStudyGrid'
import type { ProductRecord } from '@/types/products'

const product = products.find((entry) => entry.id === 'creative-ai-toolkit') as ProductRecord

if (!product) {
  throw new Error('Creative AI Toolkit product record missing')
}

export const metadata = createMetadata({
  title: `${product.name} | FrankX.ai`,
  description: product.promise,
  path: `/products/${product.slug}`,
  keywords: [
    'creative ai toolkit',
    'ai prompts',
    'workflow automation',
    'frankx ai products',
    'agentic systems'
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
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '1247'
  }
}

export default function CreativeAIToolkitPage() {
  return (
    <div className="min-h-screen bg-[#02030b] text-slate-100">
      <ProductHero
        productId={product.analyticsId ?? product.id}
        badge={product.badge}
        title={product.headline}
        subtitle={product.subheadline}
        promise={product.promise}
        offer={product.offer}
      />

      <TransformationList items={product.transformation} title="Immediate Transformation" />

      <ProofRail stats={product.socialProof.stats} quotes={product.socialProof.quotes} />

      <OfferStack
        productId={product.analyticsId ?? product.id}
        offer={product.offer}
        modules={product.modules}
        bonuses={product.bonuses}
        pricingTiers={product.pricingTiers}
      />

      <CaseStudyGrid
        productId={product.analyticsId ?? product.id}
        caseStudies={product.caseStudies ?? []}
      />

      <section className="bg-[#02030b] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-center text-3xl font-semibold text-white">Questions, Answered</h2>
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
        productId={product.analyticsId ?? product.id}
        title="Join the Intelligence Revolution"
        description="Install the operating system that thousands of creators and teams trust to orchestrate AI with soul and precision."
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

