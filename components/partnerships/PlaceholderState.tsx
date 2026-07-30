import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { Partner } from '@/content/partnerships/types'
import { MEET_AND_GROW_URL } from '@/lib/cta-links'

type PlaceholderStateProps = {
  partner: Partner
}

/**
 * Rendered in place of Tier 2 (proposal) when partner.status is
 * 'strategic-alignment', 'placeholder', or 'in-conversation'. The copy states
 * exactly what FrankX can evidence without implying reciprocal involvement.
 *
 * No promises. No fake "coming soon" countdown. Just a calm placeholder.
 */
export function PlaceholderState({ partner }: PlaceholderStateProps) {
  const state =
    partner.status === 'strategic-alignment'
      ? {
          eyebrow: 'Independent alignment brief',
          title: `A FrankX brief about ${partner.shortName}.`,
          body: `This page documents public artifacts and, where specifically evidenced, FrankX’s own use or prior experience. It is not a record of a formal ${partner.shortName} partnership, reciprocal conversation, or endorsement.`,
        }
      : partner.status === 'in-conversation'
        ? {
            eyebrow: 'Conversation noted by FrankX',
            title: `An exploratory conversation with ${partner.shortName}.`,
            body: `FrankX records this conversation as open. No formal partnership or endorsement is claimed, and no proposal is presented as jointly approved.`,
          }
        : {
            eyebrow: 'Independent opportunity note',
            title: `A possible direction involving ${partner.shortName}.`,
            body: `This is a FrankX-authored opportunity note. It does not claim that a conversation, partnership, or endorsement exists.`,
          }

  return (
    <section
      aria-labelledby="placeholder-state-heading"
      className="border-t border-white/5 py-24 lg:py-32"
    >
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="rounded-3xl bg-white/[0.02] border border-white/[0.08] p-8 sm:p-12">
          <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-4">
            {state.eyebrow}
          </p>
          <h2
            id="placeholder-state-heading"
            className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-4 leading-snug"
          >
            {state.title}
          </h2>
          <p className="text-base text-zinc-400 mb-3 leading-relaxed">
            {state.body}
          </p>
          <p className="text-base text-zinc-400 mb-8 leading-relaxed">
            If this direction is relevant to your work at {partner.shortName},
            the calendar link is below.
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
          <p className="mt-12 text-center text-xs text-white/60">
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
