import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'

import { getProductBySlug } from '@/lib/products'
import { getPreviewManifest } from '@/lib/products/preview-manifests'
import { createMetadata, siteConfig } from '@/lib/seo'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import ProductFileInspector from '@/components/products/ProductFileInspector'
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

const LIVE_FREE_CTA_SLUGS = new Set([
  'love-and-poetry',
  'spartan-mindset',
  'self-development',
  'imagination',
  'manifestation',
  'reality-architect-os',
  'golden-age',
])

function normalize(product: ProductRecord) {
  const legacy = product as ProductRecord & LegacyFields
  return {
    name: product.name ?? legacy.title ?? product.slug,
    headline: product.headline ?? legacy.description ?? '',
    summary: product.summary || product.promise || legacy.description || '',
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
    type: 'website',
    image: `/api/og?title=${encodeURIComponent(name)}&subtitle=${encodeURIComponent(product.category ?? 'Product')}`,
  })
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const { name, headline, summary, legacyPrice, legacyCta } = normalize(product)
  const manifest = getPreviewManifest(product.id) ?? getPreviewManifest(product.slug)
  const activeOffer = product.offer

  // Free products whose registry CTA target was checked live (returns 200) link to it.
  // Everything else is not deliverable yet and goes to the waitlist.
  const registryFreeCta =
    activeOffer &&
    activeOffer.primaryPrice === 0 &&
    LIVE_FREE_CTA_SLUGS.has(product.slug) &&
    activeOffer.ctaPrimary &&
    activeOffer.ctaPrimaryHref
      ? { label: activeOffer.ctaPrimary, href: activeOffer.ctaPrimaryHref }
      : null

  // golden-age has no offer block; its registry CTA is the legacy cta to /books/golden-age, read online.
  const liveFreeCta =
    registryFreeCta ??
    (LIVE_FREE_CTA_SLUGS.has(product.slug) && legacyPrice === 0 && legacyCta?.href
      ? { label: 'Read online', href: legacyCta.href }
      : null)

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

        <div className="mt-6 grid gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Left Column: Product Specification */}
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-2.5">
              {product.category ? (
                <span className="inline-flex items-center rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300">
                  {product.category}
                </span>
              ) : null}
              {product.badge ? (
                <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-xs text-slate-300">
                  {product.badge}
                </span>
              ) : null}
            </div>

            <h1 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {name}
            </h1>

            <p className="mt-5 text-xl leading-relaxed text-slate-200">
              {headline}
            </p>

            {product.subheadline && product.subheadline !== headline ? (
              <p className="mt-4 text-base leading-relaxed text-slate-400">
                {product.subheadline}
              </p>
            ) : null}

            {product.promise && product.promise !== product.subheadline ? (
              <div className="mt-8 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
                <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-cyan-300">
                  Operational scope
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  {product.promise}
                </p>
              </div>
            ) : null}

            {Array.isArray(product.transformation) && product.transformation.length > 0 ? (
              <div className="mt-8">
                <h2 className="text-lg font-semibold text-white">Key outcomes</h2>
                <ul className="mt-4 space-y-3">
                  {product.transformation.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-slate-300">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {Array.isArray(product.modules) && product.modules.length > 0 ? (
              <div className="mt-10 space-y-5">
                <h2 className="text-2xl font-semibold text-white">Included modules</h2>
                <ul className="space-y-4">
                  {product.modules.map((module, idx) => (
                    <li
                      key={module.title}
                      className="flex gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5"
                    >
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-cyan-500/30 bg-cyan-500/10 font-mono text-xs font-semibold text-cyan-300">
                        {String(idx + 1).padStart(2, '0')}
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{module.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-slate-400">
                          {module.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          {/* Right Column: Schematic Plate & Delivery Gate */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 lg:h-fit">
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm sm:p-8">
              {manifest ? (
                <div className="mb-6 overflow-hidden rounded-2xl border border-white/10 bg-[#07090e]">
                  <Image
                    src={manifest.plateSvg}
                    alt={`${name} technical schematic plate`}
                    width={640}
                    height={360}
                    unoptimized
                    className="aspect-video h-auto w-full object-cover"
                  />
                </div>
              ) : null}

              {liveFreeCta ? (
                <>
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-emerald-300">
                    Direct public edition
                  </p>
                  <h2 className="mt-2 text-xl font-semibold text-white">Open without an email gate</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    Read or download this edition directly, or inspect the included chapters and files below first.
                  </p>
                  <Link
                    href={liveFreeCta.href}
                    className="mt-6 flex min-h-12 w-full items-center justify-center rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-[#0a0a0b] transition-colors hover:bg-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    {liveFreeCta.label}
                  </Link>
                </>
              ) : (
                <>
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-amber-200">
                    Coming soon
                  </p>
                  <h2 className="mt-2 text-xl font-semibold text-white">Join the waitlist</h2>
                  <p className="mt-2 text-sm leading-6 text-white/70">
                    Inspect the file tree below now, and join the waitlist to get a note when delivery opens.
                  </p>
                  <Link
                    href={`/waitlist?intent=${product.slug}`}
                    className="mt-6 flex min-h-12 w-full items-center justify-center rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-[#0a0a0b] transition-colors hover:bg-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    Join the waitlist
                  </Link>
                </>
              )}

              {manifest ? (
                <a
                  href="#inspect-files"
                  className="mt-3 flex min-h-11 w-full items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-5 py-2.5 font-mono text-xs font-medium text-slate-300 transition-colors hover:border-cyan-400/40 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
                >
                  Inspect {manifest.files.length} package files ↓
                </a>
              ) : null}

              {product.socialProof?.stats && product.socialProof.stats.length > 0 ? (
                <div className="mt-6 grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
                  {product.socialProof.stats.slice(0, 4).map((stat, idx) => (
                    <div key={idx} className="text-center">
                      <div className="font-mono text-lg font-bold tabular-nums text-cyan-200">
                        {stat.number}
                      </div>
                      <div className="mt-0.5 text-[11px] text-slate-400">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {/* Interactive Two-Pane File Tree Inspector */}
        {manifest ? <ProductFileInspector manifest={manifest} /> : null}

        {/* Product FAQ */}
        {Array.isArray(product.faq) && product.faq.length > 0 ? (
          <section aria-labelledby="product-faq-heading" className="mt-16 border-t border-white/[0.08] pt-14">
            <h2 id="product-faq-heading" className="text-2xl font-semibold text-white">
              Questions and scope notes
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {product.faq.map((item) => (
                <div
                  key={item.question}
                  className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
                >
                  <h3 className="text-base font-semibold text-white">{item.question}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </div>
  )
}
