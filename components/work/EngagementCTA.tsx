import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { Engagement } from '@/content/work/types'

type EngagementCTAProps = {
  engagement: Engagement
  /** Override the small sub-line under the heading. */
  subLine?: string
}

/**
 * Closing CTA on the engagement detail page. Quiet — no urgency tactics.
 * Mirrors the partnerships PartnerCTA pattern so the brand reads consistent
 * across /work and /partnerships.
 */
export function EngagementCTA({
  engagement,
  subLine = 'Peer-architect conversation. Substrate-first. No deck.',
}: EngagementCTAProps) {
  const isExternal = engagement.cta.href.startsWith('http')

  return (
    <section
      aria-labelledby="engagement-cta-heading"
      className="border-t border-white/5 py-24 lg:py-32"
    >
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-emerald-500/[0.08] via-white/[0.02] to-transparent border border-emerald-500/15 p-8 sm:p-12">
          <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/70 font-medium mb-4">
            Next step
          </p>
          <h2
            id="engagement-cta-heading"
            className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-3 leading-snug"
          >
            If a substrate-provider engagement maps to where your team is going,
            <br className="hidden sm:block" /> let&apos;s talk.
          </h2>
          <p className="text-sm text-zinc-400 mb-8 leading-relaxed">
            {subLine}
          </p>
          <Link
            href={engagement.cta.href}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400/60 focus:ring-offset-2 focus:ring-offset-[#0a0a0b]"
          >
            {engagement.cta.label}
            <ArrowUpRight className="w-4 h-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  )
}
