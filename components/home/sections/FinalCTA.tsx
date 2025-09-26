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
        <h2 className="text-heading-2 font-semibold text-balance md:text-heading-1">Ready to architect your conscious intelligence era?</h2>
        <p className="text-lg leading-relaxed text-neutral-200">
          Bring your inner circle, leadership teams, and AI agents into a single operating rhythm. We choreograph the rituals, automations, and creative outputs that keep everyone aligned with calm precision.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/soul-frequency-assessment"
            className={clsx(
              'inline-flex items-center justify-center rounded-xl px-8 py-4 text-sm font-semibold text-white shadow-[0_20px_40px_rgba(12,27,68,0.35)] transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/70',
              gradientPresets.buttonAurora
            )}
          >
            Begin with the assessment
            <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
          </Link>
          <Link
            href="mailto:hello@frankx.ai?subject=Creative%20AI%20Collaboration"
            className="inline-flex items-center justify-center rounded-xl border border-white/30 px-8 py-4 text-sm font-semibold text-white/85 transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/30"
          >
            Request a strategy session
            <ArrowUpRight className="ml-2 h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
