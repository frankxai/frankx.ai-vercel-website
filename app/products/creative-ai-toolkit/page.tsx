import Image from 'next/image'
import Script from 'next/script'
import products from '@/data/products.json'
import { comingSoonProductStructuredData, createMetadata } from '@/lib/seo'
import ProductHero from '@/components/products/ProductHero'
import OfferStack from '@/components/products/OfferStack'
import FinalCTA from '@/components/products/FinalCTA'
import type { ProductRecord } from '@/types/products'

const product = products.find((entry) => entry.id === 'creative-ai-toolkit') as ProductRecord

if (!product) {
  throw new Error('Creative AI Toolkit product record missing')
}

const title = 'Creative AI Toolkit waitlist | FrankX'
const description =
  'Review the planned Creative AI Toolkit modules for prompts and workflow recipes. Join the FrankX waitlist for release updates.'

export const metadata = {
  ...createMetadata({
    title,
    description,
    path: `/products/${product.slug}`,
    keywords: ['creative ai toolkit', 'ai prompts', 'workflow recipes', 'frankx ai products'],
  }),
  title: { absolute: title },
}

const structuredData = comingSoonProductStructuredData(product.name, description)

export default function CreativeAIToolkitPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-slate-100">
      <div className="relative mb-8 aspect-[21/9] overflow-hidden rounded-2xl">
        <Image src="/images/blog/agentic-creator-os-hero.png" alt="" fill className="object-cover" />
      </div>

      <ProductHero
        productId={product.analyticsId ?? product.id}
        badge={product.badge}
        title={product.name}
        subtitle={product.subheadline}
      />

      <OfferStack
        productId={product.analyticsId ?? product.id}
        modules={product.modules}
        modulesTitle="Planned modules"
      />

      <section className="bg-[#0a0a0b] py-16">
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
        title="Get release updates"
        description="Join the waitlist for Creative AI Toolkit release updates."
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

