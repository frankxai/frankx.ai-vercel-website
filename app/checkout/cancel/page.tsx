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
    <div className="flex min-h-[80vh] items-center justify-center px-6">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="mb-4 text-3xl font-bold text-white">Checkout Cancelled</h1>

        <p className="mb-8 text-lg leading-relaxed text-slate-400">
          No worries — no charges were made. Your cart is still waiting if you
          change your mind.
        </p>

        <div className="mb-8 rounded-xl border border-white/[0.08] bg-white/[0.03] p-4">
          <div className="flex items-center gap-3 text-left">
            <MessageSquare className="h-5 w-5 shrink-0 text-cyan-400" />
            <p className="text-sm text-slate-300">
              Have questions? Reach out at{' '}
              <a href="mailto:frank@frankx.ai" className="text-cyan-400 hover:underline">
                frank@frankx.ai
              </a>
            </p>
          </div>
        </div>

        <Link
          href="/products"
          className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-6 py-3 font-medium text-white transition-colors hover:bg-white/15"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </Link>
      </div>
    </div>
  )
}
