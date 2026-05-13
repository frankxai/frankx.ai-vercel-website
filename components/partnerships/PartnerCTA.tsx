import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { Partner } from '@/content/partnerships/types'

type PartnerCTAProps = {
  partner: Partner
  subLine?: string
}

/**
 * Closing CTA card. Quiet — the page has earned the click by now.
 * No urgency tactics, no countdown. The brand is honest pricing
 * and honest CTAs.
 */
export function PartnerCTA({
  partner,
  subLine = '30 minutes. Direct conversation. No deck.',
}: PartnerCTAProps) {
  return (
    <section
      aria-labelledby="partner-cta-heading"
      className="border-t border-white/5 py-24 lg:py-32"
    >
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-emerald-500/[0.08] via-white/[0.02] to-transparent border border-emerald-500/15 p-8 sm:p-12">
          <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/70 font-medium mb-4">
            Next step
          </p>
          <h2
            id="partner-cta-heading"
            className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-3 leading-snug"
          >
            If this maps to where {partner.shortName} is going,
            <br className="hidden sm:block" /> let&apos;s talk.
          </h2>
          <p className="text-sm text-zinc-400 mb-8 leading-relaxed">
            {subLine}
          </p>
          <Link
            href={partner.cta.href}
            target={
              partner.cta.href.startsWith('http') ? '_blank' : undefined
            }
            rel={
              partner.cta.href.startsWith('http')
                ? 'noopener noreferrer'
                : undefined
            }
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400/60 focus:ring-offset-2 focus:ring-offset-[#0a0a0b]"
          >
            {partner.cta.label}
            <ArrowUpRight className="w-4 h-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  )
}
