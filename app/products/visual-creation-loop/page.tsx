import Script from 'next/script'
import { notFound } from 'next/navigation'

import products from '@/data/products.json'
import { createMetadata } from '@/lib/seo'
import type { ProductRecord } from '@/types/products'

import ProductHero from '@/components/products/ProductHero'
import OfferStack from '@/components/products/OfferStack'

const product = products.find((entry) => entry.id === 'visual-creation-loop') as ProductRecord | undefined

export const metadata = createMetadata({
  title: product ? `${product.name} - ${product.headline} | FrankX.ai` : 'Visual Creation Loop | FrankX.ai',
  description: product?.promise ?? 'The Visual Creation Loop product is currently unavailable.',
  path: '/products/visual-creation-loop',
  keywords: [
    'visual creation loop',
    'agentic visual generation',
    'ai art generation',
    'image generation',
    'brand visuals'
  ]
})

export default function VisualCreationLoopPage() {
  if (!product) {
    notFound()
  }

  const productId = product.analyticsId ?? product.id
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.promise,
    image: 'https://frankx.ai/images/design-lab/variant-products-nature.png',
    brand: {
      '@type': 'Brand',
      name: 'FrankX.ai'
    },
    offers: {
      '@type': 'Offer',
      price: product.offer.primaryPrice.toString(),
      priceCurrency: product.offer.currency,
      availability: 'https://schema.org/InStock'
    }
  }

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
        <ProductHero 
          productId={productId}
          badge={product.badge}
          title={product.name}
          subtitle={product.headline}
          promise={product.promise}
          offer={product.offer}
        />

        <OfferStack 
          productId={productId}
          offer={product.offer}
          modules={product.modules}
          bonuses={product.bonuses}
          pricingTiers={product.pricingTiers}
        />
      </div>

      <Script id="product-structured-data" type="application/ld+json">
        {JSON.stringify(structuredData)}
      </Script>
    </main>
  )
}
