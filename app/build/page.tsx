import { ArrowRight, CheckCircle2, CircleDashed } from 'lucide-react'
import { TrackedLink } from '@/components/analytics/TrackedLink'
import { getProductBySlug } from '@/data/products'
import { SIX_PRIMITIVES_RELEASE_GATES } from '@/lib/release-gates'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Build — Current release status',
  description:
    'Use the public Six Primitives learning path or inspect the planned Toolkit release. No paid Six Primitives offer is currently available.',
  path: '/build',
})

export default function BuildHubPage() {
  const publicPath = getProductBySlug('six-primitives-primer')
  const toolkit = getProductBySlug('six-primitives-toolkit')

  if (!publicPath || !toolkit) {
    throw new Error('The Six Primitives release registry is incomplete.')
  }

  const toolkitIsUnavailable = toolkit.releaseStatus === 'unavailable'
  const toolkitPrice = toolkit.pricing.plannedEur ?? toolkit.pricing.eur

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
          The public learning path is ready to inspect. The planned Toolkit stays unavailable until
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
              {publicPath.title}
            </h2>
            <p className="mt-4 max-w-lg text-base leading-7 text-white/75">
              {publicPath.subtitle}. Read the argument and follow the inline build guide before
              choosing a larger stack.
            </p>
            <TrackedLink
              href={publicPath.canonicalPath}
              eventName="creator_funnel_step"
              eventProperties={{ surface: 'build_release_board', step: 'open_public_path' }}
              className="mt-auto inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-[#07120d] transition-colors hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-4 focus-visible:ring-offset-[#0a0a0b]"
            >
              Open the public path
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </TrackedLink>
          </article>

          <article className="flex min-h-[360px] flex-col rounded-[1.75rem] border border-white/15 bg-[#0d0f10] p-6 sm:p-8">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-200">
              <CircleDashed className="h-4 w-4" aria-hidden="true" />
              {toolkitIsUnavailable ? 'Release review' : 'Available'}
              {toolkitPrice !== undefined
                ? ` · ${toolkitIsUnavailable ? 'Planned price' : 'Price'} €${toolkitPrice}`
                : ''}
            </div>
            <h2 className="mt-8 text-3xl font-semibold tracking-[-0.03em]">{toolkit.title}</h2>
            <p className="mt-4 max-w-lg text-base leading-7 text-white/75">
              {toolkit.subtitle}
            </p>
            <p className="mt-4 text-sm font-medium text-white">
              {toolkitIsUnavailable ? 'Checkout is not open.' : 'The release is available.'}
            </p>
            <TrackedLink
              href={toolkit.canonicalPath}
              eventName="creator_funnel_step"
              eventProperties={{ surface: 'build_release_board', step: 'inspect_toolkit_status' }}
              className="mt-auto inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/35 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              Inspect release status
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </TrackedLink>
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
            {SIX_PRIMITIVES_RELEASE_GATES.map((check) => (
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
