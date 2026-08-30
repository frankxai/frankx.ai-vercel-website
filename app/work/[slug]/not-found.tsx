import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'

export default function WorkEngagementNotFound() {
  return (
    <main className="relative isolate flex min-h-[75vh] items-center overflow-hidden bg-void px-6 py-24 text-white">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-emerald-500/[0.12] via-emerald-500/[0.04] to-transparent"
      />
      <div className="mx-auto w-full max-w-3xl">
        <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.25em] text-emerald-300/70">
          404 · Work
        </p>
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-white sm:text-6xl">
          No public engagement exists at this address.
        </h1>
        <p className="mt-6 max-w-xl text-base leading-7 text-zinc-400 sm:text-lg">
          The engagement may be private, retired, or never published. Browse the
          verified public work instead of following an unproven route.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/work"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-void"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Browse verified work
          </Link>
          <Link
            href="/partnerships"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/25 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            Explore partnerships
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </main>
  )
}
