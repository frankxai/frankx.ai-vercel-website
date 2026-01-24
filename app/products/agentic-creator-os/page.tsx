import Script from 'next/script'
import Image from 'next/image'

import products from '@/data/products.json'
import FinalCTA from '@/components/products/FinalCTA'
import OfferStack from '@/components/products/OfferStack'
import ProductHero from '@/components/products/ProductHero'
import ProofRail from '@/components/products/ProofRail'
import TransformationList from '@/components/products/TransformationList'
import { createMetadata } from '@/lib/seo'
import type { ProductRecord } from '@/types/products'

const product = products.find((entry) => entry.id === 'agentic-creator-os') as ProductRecord

if (!product) {
  throw new Error('Agentic Creator OS product record missing')
}

export const metadata = createMetadata({
  title: `${product.name} | FrankX.ai`,
  description: product.promise,
  path: `/products/${product.slug}`,
  keywords: [
    'agentic creator os',
    'enterprise ai strategy',
    'ai governance',
    'ai implementation',
    'ai enablement'
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

export default function AgenticCreatorOSPage() {
  const productId = product.analyticsId ?? product.id

  return (
    <div className="min-h-screen bg-[#02030b] text-slate-100">
      <ProductHero
        productId={productId}
        badge={product.badge}
        title={product.headline}
        subtitle={product.subheadline}
        promise={product.promise}
        offer={product.offer}
      />

      {/* Architecture Overview */}
      <section className="bg-[#02030b] py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-4 text-center text-2xl font-semibold text-white sm:text-3xl">
            System Architecture
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-center text-slate-400">
            7-layer architecture with 70+ skills, 10 specialist agents, and enterprise-grade orchestration
          </p>
          <div className="overflow-hidden rounded-2xl border border-white/10">
            <Image
              src="/images/acos/acos-technical-architecture.png"
              alt="ACOS v5.0 Architecture - 7-layer system with MCP foundation, skills library, specialist agents, and creator hub interface"
              width={1376}
              height={768}
              className="w-full"
              priority
            />
          </div>
        </div>
      </section>

      <TransformationList items={product.transformation} title="Agent System Outcomes" />

      <ProofRail stats={product.socialProof.stats} quotes={product.socialProof.quotes} />

      <OfferStack
        productId={productId}
        offer={product.offer}
        modules={product.modules}
        pricingTiers={product.pricingTiers}
      />

      <section className="bg-[#02030b] py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-center text-3xl font-semibold text-white">Agentic FAQs</h2>
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
        title="Build Your Agentic Command Center"
        description="Install the playbooks, prompts, and QA rituals that make agent teams reliable."
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
