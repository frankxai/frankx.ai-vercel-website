import Link from 'next/link'
import { ArrowRight, CheckCircle2, CircleDashed } from 'lucide-react'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Build — Current release status',
  description:
    'Start with the free Six Primitives Primer or inspect the planned Toolkit release. Paid checkout remains closed until contents, delivery, and refund terms are verified.',
  path: '/build',
})

const releaseChecks = [
  'The final files match the published contents list.',
  'The access and delivery path works anonymously.',
  'The refund terms are published before payment is accepted.',
]

export default function BuildHubPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0a0a0b] text-white">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[620px] bg-[radial-gradient(circle_at_20%_4%,rgba(34,211,238,0.1),transparent_32%),radial-gradient(circle_at_82%_12%,rgba(16,185,129,0.1),transparent_28%)]"
        aria-hidden="true"
      />

      <section className="relative mx-auto max-w-5xl px-5 pb-14 pt-32 sm:px-8 sm:pb-20 sm:pt-40">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-cyan-200">
          Build · Release board
        </p>
        <h1 className="mt-6 max-w-3xl text-5xl font-bold leading-[1] tracking-[-0.045em] sm:text-6xl">
          Build from what is ready.
        </h1>
        <p className="mt-7 max-w-2xl text-lg leading-8 text-white/75">
          The Primer is the current starting point. The paid Toolkit stays in release review until
          its contents, access path, and terms can be verified end to end.
        </p>
      </section>

      <section className="relative border-y border-white/10 bg-white/[0.02] py-16 sm:py-20">
        <div className="mx-auto grid max-w-5xl gap-5 px-5 sm:px-8 lg:grid-cols-2">
          <article className="flex min-h-[360px] flex-col rounded-[1.75rem] border border-emerald-300/25 bg-emerald-300/[0.055] p-6 sm:p-8">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-200">
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              Available starting point
            </div>
            <h2 className="mt-8 text-3xl font-semibold tracking-[-0.03em]">
              Six Primitives Primer
            </h2>
            <p className="mt-4 max-w-lg text-base leading-7 text-white/75">
              Begin with the free Primer when you need a clear model for one agent loop before
              choosing a stack.
            </p>
            <Link
              href="/start-here"
              className="mt-auto inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-[#07120d] transition-colors hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-4 focus-visible:ring-offset-[#0a0a0b]"
            >
              Get the free Primer
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </article>

          <article className="flex min-h-[360px] flex-col rounded-[1.75rem] border border-white/15 bg-[#0d0f10] p-6 sm:p-8">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-200">
              <CircleDashed className="h-4 w-4" aria-hidden="true" />
              Release review · Planned price €197
            </div>
            <h2 className="mt-8 text-3xl font-semibold tracking-[-0.03em]">
              Six Primitives Toolkit
            </h2>
            <p className="mt-4 max-w-lg text-base leading-7 text-white/75">
              For builders with a working agent and production gaps in evaluation, observability,
              cost, or deployment.
            </p>
            <p className="mt-4 text-sm font-medium text-white">Checkout is not open.</p>
            <Link
              href="/build/six-primitives-toolkit"
              className="mt-auto inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/35 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              Inspect release status
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </article>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">
            Checkout gate
          </p>
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.03em]">
            Payment opens only after the offer can be delivered as written.
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {releaseChecks.map((check) => (
              <li
                key={check}
                className="rounded-2xl border border-white/15 bg-white/[0.035] p-5 text-sm leading-6 text-white/75"
              >
                {check}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}
