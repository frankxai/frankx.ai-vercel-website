import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { ProductWaitlist } from '@/components/waitlist/ProductWaitlist'
import { createMetadata } from '@/lib/seo'
import { WAITLIST_COPY } from '@/lib/waitlist/copy'
import { waitlistIds, waitlistProduct } from '@/lib/waitlist/products'

type Props = { params: Promise<{ productId: string }> }

export const dynamicParams = false
export const revalidate = 300

export function generateStaticParams() {
  return waitlistIds()
    .filter((id) => WAITLIST_COPY[id])
    .map((productId) => ({ productId }))
}

export async function generateMetadata({ params }: Props) {
  const { productId } = await params
  const copy = WAITLIST_COPY[productId]
  return createMetadata({
    title: copy ? `${copy.name} waitlist | FrankX` : 'Waitlist | FrankX',
    description: copy?.lede ?? 'Join the FrankX waitlist.',
    path: `/waitlist/${productId}`,
  })
}

export default async function ProductWaitlistPage({ params }: Props) {
  const { productId } = await params
  const copy = WAITLIST_COPY[productId]
  if (!copy || !waitlistProduct(productId)) notFound()

  return (
    <main className="min-h-[100svh] bg-[#0a0a0b] text-white">
      <div className="mx-auto max-w-2xl space-y-10 px-4 pb-20 pt-28 sm:px-6">
        <header className="space-y-4">
          <p className="text-sm font-medium text-emerald-400/80">
            Waitlist · not on sale
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{copy.name}</h1>
          <p className="text-lg leading-relaxed text-slate-300">{copy.lede}</p>
        </header>

        <section className="space-y-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-8">
          <p className="text-sm leading-relaxed text-slate-300">
            There is no price and no launch date yet. What people on this list tell us will
            inform both. Join only if you would use it.
          </p>

          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-white">What it is meant to include</h2>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-400">
              {copy.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <ProductWaitlist productId={productId} productName={copy.name} />
        </section>

        {copy.freeNow && (
          <section className="space-y-3">
            <p className="text-sm text-slate-400">{copy.freeNow.text}</p>
            <Link
              href={copy.freeNow.href}
              className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-emerald-400/50 hover:text-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              {copy.freeNow.label}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </section>
        )}
      </div>
    </main>
  )
}
