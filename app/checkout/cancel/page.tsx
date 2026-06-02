import Link from 'next/link'
import { ArrowLeft, MessageSquare } from 'lucide-react'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Checkout Cancelled | FrankX',
  description: 'Your checkout was cancelled. No charges were made.',
  path: '/checkout/cancel',
})

export default function CheckoutCancel() {
  return (
    <main className="flex min-h-[80vh] items-center justify-center px-6">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-white">Checkout cancelled</h1>

        <p className="mb-8 text-lg leading-relaxed text-slate-400">
          No charges were made. Your selection is still here whenever you&apos;re
          ready to come back to it.
        </p>

        <div className="mb-8 rounded-2xl border border-white/[0.08] bg-white/[0.04] p-4 backdrop-blur-sm">
          <div className="flex items-center gap-3 text-left">
            <MessageSquare aria-hidden className="h-5 w-5 shrink-0 text-cyan-400" />
            <p className="text-sm text-slate-300">
              Questions? Reach Frank directly at{' '}
              <a
                href="mailto:frank@frankx.ai"
                className="text-cyan-400 underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b] rounded"
              >
                frank@frankx.ai
              </a>
            </p>
          </div>
        </div>

        <Link
          href="/products"
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-6 py-3 font-medium text-white transition-all hover:bg-white/[0.1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
        >
          <ArrowLeft aria-hidden className="h-4 w-4" />
          Back to products
        </Link>
      </div>
    </main>
  )
}
