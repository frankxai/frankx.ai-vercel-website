import Link from 'next/link'
import { CheckCircle2, ArrowRight, Download, Mail } from 'lucide-react'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Purchase Successful | FrankX',
  description: 'Thank you for your purchase. Your resources are ready.',
  path: '/checkout/success',
})

export default function CheckoutSuccess() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-6">
      <div className="mx-auto max-w-lg text-center">
        <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10">
          <CheckCircle2 className="h-10 w-10 text-emerald-400" />
        </div>

        <h1 className="mb-4 text-4xl font-bold text-white">Purchase Successful</h1>

        <p className="mb-8 text-lg leading-relaxed text-slate-400">
          Thank you for your purchase. Check your email for download links and
          getting started instructions.
        </p>

        <div className="mb-8 space-y-3">
          <div className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 text-left">
            <Mail className="h-5 w-5 shrink-0 text-cyan-400" />
            <p className="text-sm text-slate-300">
              A confirmation email with your resources has been sent.
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 text-left">
            <Download className="h-5 w-5 shrink-0 text-violet-400" />
            <p className="text-sm text-slate-300">
              You can also access your downloads from the link in your email.
            </p>
          </div>
        </div>

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
