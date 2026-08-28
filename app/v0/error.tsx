'use client'

import { RotateCcw } from 'lucide-react'

export default function V0Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="grid min-h-screen place-items-center bg-[#0a0a0b] px-5 py-24 text-white">
      <div className="max-w-xl text-center">
        <p className="font-mono text-[11px] tracking-[0.12em] text-emerald-300/70">
          Foundry interrupted
        </p>
        <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          The release surface did not finish loading.
        </h1>
        <p className="mt-5 text-base leading-7 text-white/48">
          Try once more. If the failure repeats, the deployment logs—not another interface change—are
          the next source of truth.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Try again
        </button>
      </div>
    </main>
  )
}
