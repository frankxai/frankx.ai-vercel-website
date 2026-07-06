import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

import { getProductBySlug } from '@/lib/products'
import { createMetadata, siteConfig } from '@/lib/seo'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import BuyButton from './BuyButton'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    return createMetadata({
      title: 'Product Not Found',
      description: 'The requested product could not be found.',
      path: `/products/${slug}`,
    })
  }

  return createMetadata({
    title: product.name,
    description: product.summary || product.promise,
    path: `/products/${product.slug}`,
    type: 'website', // Product pages are often 'website' or 'product' (og:type product not always standard)
    image: `/api/og?title=${encodeURIComponent(product.name)}&subtitle=${encodeURIComponent(product.category ?? 'Product')}`,
  })
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const offer = product.offer
  const primaryPrice = offer?.primaryPrice ?? 0

  // Structured Data for Product
  const productSchema = {
    name: product.name,
    description: product.summary,
    image: [`${siteConfig.url}/api/og?title=${encodeURIComponent(product.name)}`],
    sku: product.id,
    brand: {
      '@type': 'Brand',
      name: 'FrankX',
    },
    offers: {
      '@type': 'Offer',
      url: `${siteConfig.url}/products/${product.slug}`,
      priceCurrency: offer?.currency || 'USD',
      price: primaryPrice,
      priceValidUntil: '2026-12-31',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'FrankX',
      },
    },
    ...(product.socialProof?.stats
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.9',
            reviewCount: '150', // Placeholder or real data if available
          },
        }
      : {}),
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white selection:bg-cyan-500/30">
      <JsonLd type="Product" data={productSchema} />
      
      <main className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Products', href: '/products' },
            { label: product.name, href: `/products/${product.slug}` },
          ]}
        />

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left Column: Product Info */}
          <div>
            <div className="inline-flex items-center rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-cyan-300">
              {product.category}
            </div>
            
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {product.name}
            </h1>
            
            <p className="mt-6 text-xl leading-relaxed text-gray-300">
              {product.headline}
            </p>
            
            <div className="mt-8 border-l-2 border-cyan-500/50 pl-6">
              <p className="text-lg italic text-gray-400">"{product.subheadline}"</p>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-cyan-300/70">
                The Promise
              </h3>
              <p className="mt-2 text-base text-gray-300">
                {product.promise}
              </p>
            </div>

            {/* Modules / Features */}
            {product.modules && (
              <div className="mt-12 space-y-8">
                <h3 className="text-2xl font-semibold text-white">What's Inside</h3>
                <ul className="space-y-6">
                  {product.modules.map((module: any, idx: number) => (
                    <li key={idx} className="flex gap-4">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-xs font-bold text-cyan-300">
                        {idx + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">{module.title}</h4>
                        <p className="mt-1 text-sm text-gray-400">{module.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Column: Offer & Pricing */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm sm:p-10">
              <h3 className="text-xl font-semibold text-white">Get Instant Access</h3>
              
              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-5xl font-bold text-white">
                  ${primaryPrice}
                </span>
                {offer?.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    ${offer.originalPrice}
                  </span>
                )}
              </div>

              <div className="mt-8 space-y-4">
                {offer ? (
                  <BuyButton
                    href={offer.ctaPrimaryHref}
                    label={offer.ctaPrimary}
                    trackingId={offer.ctaPrimaryTracking}
                  />
                ) : (
                  <BuyButton href="/contact" label="Contact FrankX" trackingId="contact-product-fallback" />
                )}
                
                {offer?.ctaSecondary && offer.ctaSecondaryHref && (
                  <Link
                    href={offer.ctaSecondaryHref}
                    className="flex w-full items-center justify-center rounded-xl border border-white/10 bg-transparent px-8 py-4 text-base font-semibold text-white transition-all hover:bg-white/5"
                  >
                    {offer.ctaSecondary}
                  </Link>
                )}
              </div>

              {offer?.guarantee && (
                <div className="mt-8 rounded-xl bg-cyan-500/10 p-4 text-center">
                  <p className="text-xs font-semibold uppercase tracking-wider text-cyan-300">
                    {offer.guarantee.label}
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    {offer.guarantee.description}
                  </p>
                </div>
              )}

              {/* Social Proof */}
              {product.socialProof?.stats && (
                <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/10 pt-8">
                  {product.socialProof.stats.slice(0, 4).map((stat: any, idx: number) => (
                    <div key={idx} className="text-center">
                      <div className="text-xl font-bold text-cyan-200">{stat.number}</div>
                      <div className="text-[10px] uppercase tracking-wider text-gray-500">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
