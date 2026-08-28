import Link from 'next/link'
import { ArrowLeft, Archive } from 'lucide-react'

import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Vault Preview — Archived Concept',
  description:
    'An archived FrankX concept page. The former Inner Circle vault is not an available product.',
  path: '/inner-circle/vault-preview',
  noindex: true,
})

export default function VaultPreviewPage() {
  return (
    <main tabIndex={-1} className="min-h-screen bg-[#0a0a0b] px-5 pb-20 pt-32 text-white sm:px-8">
      <section className="mx-auto max-w-2xl rounded-[2rem] border border-white/10 bg-white/[0.025] p-7 sm:p-10">
        <Archive className="h-6 w-6 text-amber-200" aria-hidden="true" />
        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-amber-200/75">
          Archived concept · not for sale
        </p>
        <h1 className="mt-5 text-4xl font-bold tracking-[-0.04em]">
          The former vault preview is retired.
        </h1>
        <p className="mt-6 text-base leading-7 text-white/64">
          This URL is preserved so old links resolve, but the dates, membership,
          deliverables, and pricing previously described here are not current
          offers.
        </p>
        <Link
          href="/inner-circle"
          className="mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-amber-100 underline decoration-amber-200/30 underline-offset-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          See the current Inner Circle status
        </Link>
      </section>
    </main>
  )
}
