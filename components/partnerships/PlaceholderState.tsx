import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { Partner } from '@/content/partnerships/types'
import { MEET_AND_GROW_URL } from '@/lib/cta-links'

type PlaceholderStateProps = {
  partner: Partner
}

/**
 * Rendered in place of Tier 2 (proposal) when partner.status is
 * 'placeholder' or 'in-conversation'. Honest signal: conversation exists,
 * page comes online when both sides are ready.
 *
 * No promises. No fake "coming soon" countdown. Just a calm placeholder.
 */
export function PlaceholderState({ partner }: PlaceholderStateProps) {
  return (
    <section
      aria-labelledby="placeholder-state-heading"
      className="border-t border-white/5 py-24 lg:py-32"
    >
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="rounded-3xl bg-white/[0.02] border border-white/[0.08] p-8 sm:p-12">
          <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-4">
            Conversation open
          </p>
          <h2
            id="placeholder-state-heading"
            className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-4 leading-snug"
          >
            A deeper conversation with {partner.shortName} is in motion.
          </h2>
          <p className="text-base text-zinc-400 mb-3 leading-relaxed">
            The proposal page comes online when both sides are ready to
            publish. Until then, the working partnerships hub explains how I
            collaborate at this depth.
          </p>
          <p className="text-base text-zinc-400 mb-8 leading-relaxed">
            If you&apos;re reading this and the conversation is yours to open
            on the {partner.shortName} side, the calendar link is below.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href={MEET_AND_GROW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400/60 focus:ring-offset-2 focus:ring-offset-[#0a0a0b]"
            >
              Book Meet &amp; Grow
              <ArrowUpRight className="w-4 h-4" aria-hidden />
            </Link>
            <Link
              href="/partnerships"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/10 hover:border-white/20 font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-white/40"
            >
              Back to the hub
            </Link>
          </div>
        </div>

        {partner.lastUpdated ? (
          <p className="mt-12 text-center text-xs text-white/30">
            Last updated{' '}
            <time dateTime={partner.lastUpdated}>
              {new Date(partner.lastUpdated + 'T00:00:00Z').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })}
            </time>
          </p>
        ) : null}
      </div>
    </section>
  )
}
