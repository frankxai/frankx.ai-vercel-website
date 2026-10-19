import Script from 'next/script'

import products from '@/data/products.json'
import FinalCTA from '@/components/products/FinalCTA'
import OfferStack from '@/components/products/OfferStack'
import ProductHero from '@/components/products/ProductHero'
import ProofRail from '@/components/products/ProofRail'
import TransformationList from '@/components/products/TransformationList'
import { waitlistBonuses } from '@/lib/products/waitlist-public'
import { comingSoonProductStructuredData, createMetadata } from '@/lib/seo'
import type { ProductRecord } from '@/types/products'

const product = products.find((entry) => entry.id === 'creation-chronicles') as ProductRecord

if (!product) {
  throw new Error('Creation Chronicles product record missing')
}

export const metadata = createMetadata({
  title: `${product.name} | FrankX.ai`,
  description: product.promise,
  path: `/products/${product.slug}`,
  keywords: [
    'creation chronicles',
    'storytelling system',
    'content strategy',
    'brand narrative',
    'ai storytelling'
  ]
})

const structuredData = comingSoonProductStructuredData(product.name, product.promise)

export default function CreationChroniclesPage() {
  const productId = product.analyticsId ?? product.id

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-slate-100">
      <ProductHero
        productId={productId}
        badge={product.badge}
        title={product.headline}
        subtitle={product.subheadline}
        promise={product.promise}
      />

      <TransformationList items={product.transformation} title="Immediate Narrative Upgrades" />

      <ProofRail stats={product.socialProof.stats} quotes={product.socialProof.quotes} />

      <OfferStack
        productId={productId}
        modules={product.modules}
        bonuses={waitlistBonuses(product.bonuses)}
      />

      <section className="bg-[#0a0a0b] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-center text-3xl font-semibold text-white">Questions from Story Leaders</h2>
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
        title="Author the Next Chapter"
        description="Give your audience a narrative they never want to leave and the systems to keep it flowing."
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
