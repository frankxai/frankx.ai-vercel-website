import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, CheckCircle2, CircleDashed } from 'lucide-react'
import type { Metadata } from 'next'
import { createMetadata } from '@/lib/seo'
import { products, getProductBySlug } from '@/data/products'

export async function generateStaticParams() {
  return products
    .filter((product) => product.tier !== 'free' && product.tier !== 'founders')
    .map((product) => ({ slug: product.slug }))
}

type Params = Promise<{ slug: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) {
    return createMetadata({
      title: 'Product not found',
      description: '',
      path: `/build/${slug}`,
    })
  }

  if (product.slug === 'six-primitives-toolkit') {
    return createMetadata({
      title: 'Six Primitives Toolkit — Release status',
      description:
        'Production patterns for builders with a working agent. Planned price: €197. Checkout is not open while contents, delivery, and refund terms are being verified.',
      path: `/build/${product.slug}`,
    })
  }

  const isCheckoutOpen = Boolean(product.pricing.lemonSqueezyVariantId)
  return createMetadata({
    title: `${product.title} — ${isCheckoutOpen ? `€${product.pricing.eur}` : 'Checkout closed'}`,
    description: isCheckoutOpen
      ? product.subtitle
      : 'Checkout is not open. No payment is collected on this page while the offer and delivery path are reviewed.',
    path: `/build/${product.slug}`,
    noindex: !isCheckoutOpen,
  })
}

function ToolkitReleaseStatus() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0a0a0b] text-white">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[620px] bg-[radial-gradient(circle_at_18%_8%,rgba(34,211,238,0.11),transparent_34%),radial-gradient(circle_at_82%_16%,rgba(16,185,129,0.09),transparent_28%)]"
        aria-hidden="true"
      />

      <section className="relative mx-auto max-w-4xl px-5 pb-14 pt-32 sm:px-8 sm:pb-20 sm:pt-40">
        <Link
          href="/build"
          className="inline-flex min-h-10 items-center gap-2 text-sm text-white/75 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Build release board
        </Link>
        <p className="mt-12 font-mono text-[11px] uppercase tracking-[0.22em] text-cyan-200">
          Release status · Planned price €197
        </p>
        <h1 className="mt-6 text-5xl font-bold leading-[1] tracking-[-0.045em] sm:text-6xl">
          Six Primitives Toolkit
        </h1>
        <p className="mt-7 max-w-2xl text-lg leading-8 text-white/75">
          For builders with a working agent and production gaps in evaluation, observability,
          cost, or deployment.
        </p>
      </section>

      <section className="relative border-y border-white/10 bg-white/[0.02] py-16">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <div className="rounded-[1.75rem] border border-cyan-300/25 bg-cyan-300/[0.055] p-6 sm:p-8">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-200">
              <CircleDashed className="h-4 w-4" aria-hidden="true" />
              Pre-checkout verification
            </div>
            <h2 className="mt-8 text-3xl font-semibold tracking-[-0.03em]">
              Checkout is not open.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/75">
              I am verifying the files, access path, and refund terms before taking payment. No
              payment is collected on this page.
            </p>
            <p className="mt-5 text-sm font-medium text-white">
              Planned price: €197, one-time. The final offer will list only contents that are ready
              to deliver.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              'Verify the final files against the contents list.',
              'Test the access and delivery path anonymously.',
              'Publish the final refund terms before checkout.',
            ].map((item) => (
              <div
                key={item}
                className="flex gap-3 rounded-2xl border border-white/15 bg-white/[0.035] p-5"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-200" aria-hidden="true" />
                <p className="text-sm leading-6 text-white/75">{item}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 border-t border-white/10 pt-8">
            <Link
              href="/start-here"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-[#07120d] transition-colors hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-4 focus-visible:ring-offset-[#0a0a0b]"
            >
              Get the free Six Primitives Primer
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <p className="mt-4 max-w-2xl text-xs leading-5 text-white/70">
              Toolkit checkout is not open. This link goes to the free Primer; no payment is
              collected.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}

function ClosedProductStatus({ title }: { title: string }) {
  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white">
      <section className="mx-auto max-w-3xl px-5 pb-24 pt-32 sm:px-8 sm:pt-40">
        <Link
          href="/build"
          className="inline-flex min-h-10 items-center gap-2 text-sm text-white/75 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Build release board
        </Link>
        <p className="mt-12 font-mono text-[11px] uppercase tracking-[0.22em] text-cyan-200">
          Checkout closed
        </p>
        <h1 className="mt-6 text-5xl font-bold leading-[1] tracking-[-0.045em]">{title}</h1>
        <p className="mt-7 max-w-2xl text-lg leading-8 text-white/75">
          This offer is not open while its contents, delivery path, and terms are reviewed. No
          payment is collected on this page.
        </p>
        <Link
          href="/build"
          className="mt-10 inline-flex min-h-12 items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/35 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
        >
          View current release status
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </section>
    </main>
  )
}

export default async function BuildProductPage({ params }: { params: Params }) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()

  if (product.slug === 'six-primitives-toolkit') {
    return <ToolkitReleaseStatus />
  }

  if (!product.pricing.lemonSqueezyVariantId) {
    return <ClosedProductStatus title={product.title} />
  }

  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white">
      <section className="mx-auto max-w-3xl px-5 pb-24 pt-32 sm:px-8 sm:pt-40">
        <Link
          href="/build"
          className="inline-flex min-h-10 items-center gap-2 text-sm text-white/75 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Build release board
        </Link>
        <h1 className="mt-12 text-5xl font-bold leading-[1] tracking-[-0.045em]">{product.title}</h1>
        <p className="mt-7 max-w-2xl text-lg leading-8 text-white/75">{product.subtitle}</p>
        <a
          href={`https://frankx.lemonsqueezy.com/buy/${product.pricing.lemonSqueezyVariantId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex min-h-12 items-center gap-2 rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-[#071218] transition-colors hover:bg-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-4 focus-visible:ring-offset-[#0a0a0b]"
        >
          Continue to checkout
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </section>
    </main>
  )
}
