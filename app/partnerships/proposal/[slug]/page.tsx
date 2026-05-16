import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getProposal } from '@/content/partnerships/proposals'
import { getPartner } from '@/content/partnerships'
import { ProposalContext } from '@/components/partnerships/ProposalContext'
import { AlreadySharedSection } from '@/components/partnerships/AlreadySharedSection'
import { ProposalTimeline } from '@/components/partnerships/ProposalTimeline'
import { ProposalAsk } from '@/components/partnerships/ProposalAsk'

/**
 * Unlisted partner-proposal detail page.
 *
 * – NOT in generateStaticParams: we don't want Next 16 surfacing these slugs
 *   in the prerender manifest visibly. Rendered on-demand.
 * – noindex via the segment layout.
 * – No sitemap entry. No nav link. URL is shared directly by Frank.
 *
 * Render order:
 *   1. ProposalContext band (recipient role + sent date + status)
 *   2. Hero (title + intro)
 *   3. What's already shared (reciprocal stack already in motion)
 *   4. Proposal summary paragraph
 *   5. Quarter-by-quarter timeline
 *   6. Explicit asks
 *   7. CTA + postscript
 */
export const dynamic = 'force-dynamic'

export default async function ProposalPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const proposal = getProposal(slug)
  if (!proposal) notFound()

  const partner = getPartner(proposal.partnerSlug)

  return (
    <>
      <ProposalContext
        recipientRole={proposal.recipientRole}
        sentDate={proposal.sentDate}
        status={proposal.status}
      />

      {/* Hero */}
      <section className="border-b border-white/5 py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/70 font-medium mb-5">
            {partner ? `Proposal · ${partner.name}` : 'Proposal'}
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-[1.1] mb-6">
            {proposal.title}
          </h1>
          <p className="text-lg text-zinc-300 leading-relaxed">
            {proposal.intro}
          </p>
          {partner ? (
            <p className="mt-6 text-sm text-zinc-500">
              Public context page:{' '}
              <Link
                href={`/partnerships/${partner.slug}`}
                className="text-emerald-400/80 hover:text-emerald-300 underline decoration-emerald-500/30 underline-offset-4"
              >
                /partnerships/{partner.slug}
              </Link>
            </p>
          ) : null}
        </div>
      </section>

      {/* Already shared — pulled forward into the proposal */}
      {proposal.whatsAlreadyShared.length > 0 ? (
        <AlreadySharedSection items={proposal.whatsAlreadyShared} />
      ) : null}

      {/* Proposal summary */}
      <section
        aria-labelledby="proposal-summary-heading"
        className="border-t border-white/5 py-20 lg:py-24"
      >
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-4">
            The shape
          </p>
          <h2
            id="proposal-summary-heading"
            className="text-3xl sm:text-4xl font-semibold text-white tracking-tight mb-6"
          >
            What is being proposed.
          </h2>
          <p className="text-base text-zinc-300 leading-relaxed">
            {proposal.proposalSummary}
          </p>
        </div>
      </section>

      {/* Quarter-by-quarter timeline */}
      <ProposalTimeline quarters={proposal.timeline} />

      {/* Explicit asks */}
      <ProposalAsk asks={proposal.asks} />

      {/* CTA + postscript */}
      <section
        aria-labelledby="proposal-cta-heading"
        className="border-t border-white/5 py-24 lg:py-32"
      >
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2
            id="proposal-cta-heading"
            className="text-3xl sm:text-4xl font-semibold text-white tracking-tight mb-6"
          >
            Where this goes next.
          </h2>
          <p className="text-base text-zinc-400 leading-relaxed mb-10 max-w-2xl mx-auto">
            One conversation is enough to either move this forward or close it
            cleanly. Both outcomes are useful.
          </p>
          <Link
            href={proposal.cta.href}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-sm font-medium tracking-tight transition-colors"
            style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)' }}
          >
            {proposal.cta.label}
            <span aria-hidden>→</span>
          </Link>
          {proposal.postscript ? (
            <p className="mt-10 text-sm text-zinc-500 italic max-w-xl mx-auto leading-relaxed">
              {proposal.postscript}
            </p>
          ) : null}
        </div>
      </section>
    </>
  )
}
