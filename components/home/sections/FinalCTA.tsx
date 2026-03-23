'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

import { gradientPresets } from '@/lib/design/gradients'

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-24 px-6 text-white">
      <div className={clsx('absolute inset-0 opacity-90', gradientPresets.heroBase)} />
      <div className={clsx('absolute inset-0 opacity-60 blur-3xl', gradientPresets.heroAurora)} />
      <div className={clsx('absolute inset-0 opacity-45', gradientPresets.heroPulse)} />
      <div className="relative mx-auto max-w-4xl space-y-6 text-center">
        <h2 className="text-heading-2 font-semibold text-balance md:text-heading-1">Ready to build your AI system?</h2>
        <p className="text-lg leading-relaxed text-neutral-200">
          Start with free resources, explore at your own pace, and build AI workflows that actually fit how you work. No fluff—just practical tools you can use today.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/start"
            className={clsx(
              'inline-flex items-center justify-center rounded-xl px-8 py-4 text-sm font-semibold text-white shadow-[0_20px_40px_rgba(12,27,68,0.35)] transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/70',
              gradientPresets.buttonAurora
            )}
          >
            Start Free
            <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
          </Link>
          <Link
            href="mailto:hello@frankx.ai?subject=Strategy%20Session"
            className="inline-flex items-center justify-center rounded-xl border border-white/30 px-8 py-4 text-sm font-semibold text-white/85 transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/30"
          >
            Work with Frank
            <ArrowUpRight className="ml-2 h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
