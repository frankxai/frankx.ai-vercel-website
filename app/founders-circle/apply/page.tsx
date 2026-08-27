import Link from 'next/link'
import { ArrowLeft, ShieldCheck } from 'lucide-react'

import { FoundersCircleApplicationForm } from '@/components/founders-circle/FoundersCircleApplicationForm'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Apply — Founder’s Circle',
  description:
    'Apply for the FrankX Founder’s Circle. Share the consequential decision, what you have already tried, and the working session that would create value.',
  path: '/founders-circle/apply',
})

export default function ApplyPage() {
  return (
    <main tabIndex={-1} className="min-h-screen bg-[#0a0a0b] text-white">
      <section className="border-b border-white/[0.07] pb-12 pt-28">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <Link
            href="/founders-circle"
            className="inline-flex min-h-11 items-center gap-2 text-sm text-white/60 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to Founder’s Circle
          </Link>
          <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.22em] text-rose-300/75">
            Fit and conflict review
          </p>
          <h1 className="mt-5 text-4xl font-bold tracking-[-0.04em] sm:text-5xl">
            Founder’s Circle application
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/65">
            Give Frank enough context to understand the decision, the work
            already done, and whether the Circle is the right container.
            Concise, specific answers are more useful than polished ones.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto grid max-w-5xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.64fr_1.36fr] lg:gap-14">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
              <ShieldCheck
                className="h-5 w-5 text-rose-200"
                aria-hidden="true"
              />
              <h2 className="mt-4 text-lg font-semibold">Before you submit</h2>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-white/60">
                <li>Frank reviews applications personally.</li>
                <li>A conflict check happens before any work begins.</li>
                <li>No payment is collected on this page.</li>
                <li>Do not submit sensitive or confidential material.</li>
              </ul>
              <p className="mt-5 border-t border-white/[0.08] pt-5 text-xs leading-5 text-white/48">
                FrankX is independent and is not affiliated with, endorsed by,
                or sponsored by Oracle.
              </p>
            </div>
          </aside>

          <div className="rounded-[2rem] border border-rose-300/15 bg-rose-300/[0.025] p-6 sm:p-8">
            <FoundersCircleApplicationForm />
          </div>
        </div>
      </section>
    </main>
  )
}
