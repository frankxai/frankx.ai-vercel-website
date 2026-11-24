import Link from 'next/link'
import { ArrowRight, Mail } from 'lucide-react'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  noindex: true,
  title: 'Order help | FrankX',
  description: 'Find your receipt and get help with an order.',
  path: '/checkout/success',
})

export default function CheckoutSuccess() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-6">
      <div className="mx-auto max-w-lg text-center">
        <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10">
          <Mail className="h-10 w-10 text-emerald-400" />
        </div>

        <h1 className="mb-4 text-4xl font-bold text-white">Looking for your order?</h1>

        <p className="mb-8 text-lg leading-relaxed text-slate-400">
          If you completed payment, check the inbox you used at checkout for
          your receipt. For help finding your download, email{' '}
          <a href="mailto:frank@frankx.ai" className="text-cyan-400 hover:underline">
            frank@frankx.ai
          </a>{' '}
          with the product name and your receipt reference.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/resources"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 px-6 py-3 font-medium text-white transition-colors hover:bg-white/15"
          >
            Explore Resources
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] px-6 py-3 font-medium text-slate-400 transition-colors hover:text-white"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
