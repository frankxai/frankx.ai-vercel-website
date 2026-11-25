import Link from 'next/link'
import { ArrowLeft, ReceiptText } from 'lucide-react'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Checkout receipt | FrankX',
  description: 'Where to check your payment and get help with a digital order.',
  path: '/checkout/success',
  noindex: true,
})

export default function CheckoutSuccess() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-6">
      <div className="mx-auto max-w-lg text-center">
        <ReceiptText aria-hidden="true" className="mx-auto mb-6 h-10 w-10 text-cyan-400" />
        <h1 className="mb-4 text-4xl font-bold text-white">Check your receipt</h1>
        <p className="mb-4 text-lg leading-relaxed text-slate-300">
          Your payment provider can confirm whether a payment went through.
          Check your email for its receipt before trying again.
        </p>
        <p className="mb-8 text-base leading-relaxed text-slate-300">
          Missing a receipt or download? Email{' '}
          <a href="mailto:frank@frankx.ai" className="text-cyan-300 underline underline-offset-4">
            frank@frankx.ai
          </a>
          {' '}with your order reference if you have one.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 px-6 py-3 font-medium text-white hover:bg-white/15"
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          Back to products
        </Link>
      </div>
    </div>
  )
}
