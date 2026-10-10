import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

import { getProductBySlug } from '@/lib/products'
import { createMetadata, siteConfig } from '@/lib/seo'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import type { ProductRecord } from '@/types/products'

// Some registry entries (e.g. golden-age) predate the full ProductRecord shape:
// they carry title/description/cta/price instead of name/headline/offer.
// The page must render (not 500) for both shapes.
type LegacyFields = {
  title?: string
  description?: string
  price?: number
  cta?: { label: string; href: string }
}

function normalize(product: ProductRecord) {
  const legacy = product as ProductRecord & LegacyFields
  return {
    name: product.name ?? legacy.title ?? product.slug,
    headline: product.headline ?? legacy.description ?? '',
    summary: product.summary || product.promise || legacy.description || '',
    offer: (product.offer ?? undefined) as ProductRecord['offer'] | undefined,
    legacyPrice: legacy.price,
    legacyCta: legacy.cta,
  }
}

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

  const { name, summary } = normalize(product)

  return createMetadata({
    title: name,
    description: summary,
    path: `/products/${product.slug}`,
    type: 'website', // Product pages are often 'website' or 'product' (og:type product not always standard)
    image: `/api/og?title=${encodeURIComponent(name)}&subtitle=${encodeURIComponent(product.category ?? 'Product')}`,
  })
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const { name, headline, summary } = normalize(product)

  const productSchema = {
    name,
    description: summary,
    image: [`${siteConfig.url}/api/og?title=${encodeURIComponent(name)}`],
    sku: product.id,
    brand: {
      '@type': 'Brand',
      name: 'FrankX',
    },
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white selection:bg-cyan-500/30">
      <JsonLd type="Product" data={productSchema} />
      
      <main className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Products', href: '/products' },
            { label: name, href: `/products/${product.slug}` },
          ]}
        />

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left Column: Product Info */}
          <div>
            <div className="inline-flex items-center rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-cyan-300">
              {product.category}
            </div>
            
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {name}
            </h1>

            <p className="mt-6 text-xl leading-relaxed text-gray-300">
              {headline}
            </p>

            {product.subheadline && (
              <div className="mt-8 border-l-2 border-cyan-500/50 pl-6">
                <p className="text-lg italic text-gray-400">"{product.subheadline}"</p>
              </div>
            )}

            {product.promise && (
              <div className="mt-10">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-cyan-300/70">
                  The Promise
                </h3>
                <p className="mt-2 text-base text-gray-300">
                  {product.promise}
                </p>
              </div>
            )}

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
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-200">Coming soon</p>
              <h3 className="mt-3 text-xl font-semibold text-white">Join the waitlist</h3>
              <p className="mt-3 text-sm leading-6 text-white/70">
                You will get a note when this product is ready to deliver.
              </p>
              <Link
                href="/newsletter"
                className="mt-8 flex min-h-14 w-full items-center justify-center rounded-xl bg-white px-8 py-4 text-base font-semibold text-[#0a0a0b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Join the waitlist
              </Link>

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
