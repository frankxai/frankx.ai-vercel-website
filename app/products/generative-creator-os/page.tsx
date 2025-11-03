import Script from 'next/script'

import products from '@/data/products.json'
import FinalCTA from '@/components/products/FinalCTA'
import OfferStack from '@/components/products/OfferStack'
import ProductHero from '@/components/products/ProductHero'
import ProofRail from '@/components/products/ProofRail'
import TransformationList from '@/components/products/TransformationList'
import { createMetadata } from '@/lib/seo'
import type { ProductRecord } from '@/types/products'

const product = products.find((entry) => entry.id === 'generative-creator-os') as ProductRecord

if (!product) {
  throw new Error('Generative Creator OS product record missing')
}

export const metadata = createMetadata({
  title: `${product.name} | FrankX.ai`,
  description: product.promise,
  path: `/products/${product.slug}`,
  keywords: [
    'generative creator os',
    'creative automation',
    'ai content platform',
    'creative workflow',
    'brand governance'
  ]
})

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: product.name,
  description: product.promise,
  provider: {
    '@type': 'Organization',
    name: 'FrankX.ai'
  }
}

export default function GenerativeCreatorOSPage() {
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

      <TransformationList items={product.transformation} title="Creative Operations Reimagined" />

      <ProofRail stats={product.socialProof.stats} quotes={product.socialProof.quotes} />

      <OfferStack
        productId={productId}
        offer={product.offer}
        modules={product.modules}
        pricingTiers={product.pricingTiers}
      />

      {product.caseStudies && product.caseStudies.length > 0 && (
        <section className="bg-slate-900/40 py-16">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-center text-3xl font-semibold text-white">Creators Who Built Unstoppable Studios</h2>
            <p className="mt-4 text-center text-sm text-white/70">
              These creators transformed their production process with AI-powered studios that multiply output.
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
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-center text-3xl font-semibold text-white">Frequently Asked by Creative Teams</h2>
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
        title="Build Your Generative Command Center"
        description="Bring the FrankX agent collective into your studio and scale creative momentum with governance built in."
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
