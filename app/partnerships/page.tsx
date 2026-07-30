import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { createMetadata, siteConfig } from '@/lib/seo'
import {
  listActivePartners,
  listStrategicAlignment,
  listOpenOpportunities,
} from '@/content/partnerships'
import { MEET_AND_GROW_URL } from '@/lib/cta-links'
import { SovereignNodeBand } from '@/components/partnerships/SovereignNodeBand'
import {
  MotionSection,
  MotionItem,
  MotionHero,
  MotionHeroItem,
} from '@/components/partnerships/MotionLayer'
import type { Partner } from '@/content/partnerships/types'

export const metadata = createMetadata({
  title: 'Partnerships and Applied Work',
  description:
    'See how Frank Riemer approaches bounded AI architecture, research, workshops, and partnership systems—and how each relationship is represented.',
  path: '/partnerships',
})

const SITE_URL = siteConfig.url

const TIER_LABEL: Record<Partner['tier'], string> = {
  distribution: 'Distribution',
  cloud: 'Cloud',
  'model-provider': 'Model + infra',
  silicon: 'Silicon',
  tooling: 'Tooling',
  services: 'Services',
}

export default function PartnershipsHubPage() {
  const active = listActivePartners()
  const strategicAlignment = listStrategicAlignment()
  const opportunities = listOpenOpportunities()
  const all = [...active, ...strategicAlignment, ...opportunities]

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Partnerships',
        item: `${SITE_URL}/partnerships`,
      },
    ],
  }

  const collectionLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'FrankX partnership proposals and platform briefs',
    description:
      'Independently authored FrankX proposals, documented platform use, and exploratory alignment briefs with endorsement status kept explicit.',
    url: `${SITE_URL}/partnerships`,
    hasPart: all.map((p: Partner) => ({
      '@type': 'WebPage',
      name: p.name,
      url: `${SITE_URL}/partnerships/${p.slug}`,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }}
      />

      <main className="bg-[#0a0a0b] text-white">
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-20">
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-emerald-500/[0.06] via-transparent to-transparent"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(6,182,212,0.06),_transparent_60%)]"
        />
        <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
          <MotionHero>
            <MotionHeroItem delay={0}>
              <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-4">
                Partnerships
              </p>
            </MotionHeroItem>
            <MotionHeroItem delay={0.1}>
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.05] mb-6 max-w-3xl"
                style={{
                  fontFamily: 'var(--font-poppins, Poppins), Inter, sans-serif',
                  letterSpacing: '-0.025em',
                }}
              >
                How I collaborate with partners.
              </h1>
            </MotionHeroItem>
            <MotionHeroItem delay={0.2}>
              <p className="text-lg text-zinc-300 leading-[1.7] max-w-2xl">
                I build bounded research, architecture, workshop, and product
                systems around real partner questions. Specialist agents handle
                much of the research and production work; I own the relationship,
                the judgment, and the result.
              </p>
            </MotionHeroItem>
          </MotionHero>
        </div>
      </section>

      {/* Operator profile band */}
      <SovereignNodeBand />

      {/* Independently authored proposals currently in progress */}
      {active.length > 0 && (
        <MotionSection
          aria-labelledby="active-heading"
          className="border-t border-white/5 py-24 lg:py-32"
        >
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <MotionItem className="mb-12 max-w-2xl">
              <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-4">
                Active FrankX proposal
              </p>
              <h2
                id="active-heading"
                className="text-2xl sm:text-3xl font-semibold text-white mb-3"
                style={{ letterSpacing: '-0.02em' }}
              >
                A public proposal, clearly labeled.
              </h2>
              <p className="text-base text-zinc-300 leading-[1.7]">
                FrankX records this work as active. That describes the state of
                the proposal—not a partner endorsement or a formal relationship.
                The detail page separates evidence from the proposed next step.
              </p>
            </MotionItem>
            <div className="flex flex-col gap-5">
              {active.map((p) => (
                <MotionItem key={p.slug}>
                  <FeaturedPartnerCard partner={p} />
                </MotionItem>
              ))}
            </div>
          </div>
        </MotionSection>
      )}

      {/* Independent platform alignment — use and proposals, not endorsement */}
      {strategicAlignment.length > 0 && (
        <MotionSection
          aria-labelledby="strategic-heading"
          className="border-t border-white/5 py-24 lg:py-32"
        >
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <MotionItem className="mb-12 max-w-2xl">
              <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-4">
                Independent platform alignment
              </p>
              <h2
                id="strategic-heading"
                className="text-2xl sm:text-3xl font-semibold text-white mb-3"
                style={{ letterSpacing: '-0.02em' }}
              >
                Independent briefs about these platforms.
              </h2>
              <p className="text-base text-zinc-300 leading-[1.7]">
                These pages document public artifacts and, where a linked artifact supports
                it, my own use or prior work. Each possible next step is independently
                authored—not evidence of a partnership, conversation, or endorsement.
              </p>
            </MotionItem>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
              {strategicAlignment.map((p) => (
                <MotionItem key={p.slug}>
                  <StrategicAlignmentCard partner={p} />
                </MotionItem>
              ))}
            </div>
          </div>
        </MotionSection>
      )}

      {/* Independent opportunities and explicitly disclosed conversations */}
      {opportunities.length > 0 && (
        <MotionSection
          aria-labelledby="conversations-heading"
          className="border-t border-white/5 py-24 lg:py-32"
        >
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <MotionItem className="mb-12 max-w-2xl">
              <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-4">
                Open notes
              </p>
              <h2
                id="conversations-heading"
                className="text-2xl sm:text-3xl font-semibold text-white mb-3"
                style={{ letterSpacing: '-0.02em' }}
              >
                Opportunities, with relationship status stated.
              </h2>
              <p className="text-base text-zinc-300 leading-[1.7]">
                Independent opportunity notes stay distinct from conversations and formal
                relationships. Each card and detail page states which one it is.
              </p>
            </MotionItem>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
              {opportunities.map((p) => (
                <MotionItem key={p.slug}>
                  <CompactPartnerCard partner={p} />
                </MotionItem>
              ))}
            </div>
          </div>
        </MotionSection>
      )}

      {/* Current toolkit — declared use and public learning surfaces */}
      <MotionSection
        aria-labelledby="operating-with-heading"
        className="border-t border-white/5 py-24 lg:py-32"
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <MotionItem className="mb-12 max-w-2xl">
            <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium mb-4">
              Current toolkit
            </p>
            <h2
              id="operating-with-heading"
              className="text-2xl sm:text-3xl font-semibold text-white mb-3"
              style={{ letterSpacing: '-0.02em' }}
            >
              The tools and platforms visible in the work.
            </h2>
            <p className="text-base text-zinc-300 leading-[1.7]">
              This is a map of declared use, public artifacts, and relevant prior
              experience—not a claim that every tool powers every project or that
              every company listed here has worked with FrankX.
            </p>
          </MotionItem>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
            <MotionItem className="rounded-2xl bg-white/[0.025] border border-white/[0.08] p-6 transition-colors duration-300 hover:border-emerald-500/20">
              <p className="text-[11px] tracking-[0.2em] uppercase text-emerald-400/60 font-medium mb-3">
                Public build practice
              </p>
              <p className="text-sm text-zinc-300 leading-relaxed mb-3">
                Tools Frank identifies in his own build workflow.
              </p>
              <ul className="space-y-2 text-sm text-zinc-400 leading-relaxed">
                <li>Claude Code and Cursor &mdash; coding workflows</li>
                <li>GitHub &mdash; public repositories and review surface</li>
                <li>Vercel &mdash; current frankx.ai deployment</li>
                <li>Tool choice varies by task and is not exclusive</li>
              </ul>
            </MotionItem>

            <MotionItem className="rounded-2xl bg-white/[0.025] border border-white/[0.08] p-6 transition-colors duration-300 hover:border-emerald-500/20">
              <p className="text-[11px] tracking-[0.2em] uppercase text-emerald-400/60 font-medium mb-3">
                Public model-learning surface
              </p>
              <p className="text-sm text-zinc-300 leading-relaxed mb-3">
                Models covered in public workshops, guides, or research.
              </p>
              <ul className="space-y-2 text-sm text-zinc-400 leading-relaxed">
                <li>Claude, Gemini, and Codex &mdash; public learning paths</li>
                <li>ADK, A2A, and MCP &mdash; architecture topics</li>
                <li>Model comparisons are labeled as research or experiments</li>
                <li>Inclusion does not imply production use or endorsement</li>
              </ul>
            </MotionItem>

            <MotionItem className="rounded-2xl bg-white/[0.025] border border-white/[0.08] p-6 transition-colors duration-300 hover:border-emerald-500/20">
              <p className="text-[11px] tracking-[0.2em] uppercase text-emerald-400/60 font-medium mb-3">
                Cloud context
              </p>
              <p className="text-sm text-zinc-300 leading-relaxed mb-3">
                Current public deployment and disclosed prior experience.
              </p>
              <ul className="space-y-2 text-sm text-zinc-400 leading-relaxed">
                <li>Vercel &mdash; inspectable frankx.ai deployment</li>
                <li>Oracle Cloud &mdash; non-confidential prior experience</li>
                <li>Multi-cloud patterns &mdash; public curriculum topic</li>
                <li>No current OCI, GCP, or AWS workload count is claimed</li>
              </ul>
            </MotionItem>

            <MotionItem className="rounded-2xl bg-white/[0.025] border border-white/[0.08] p-6 transition-colors duration-300 hover:border-emerald-500/20">
              <p className="text-[11px] tracking-[0.2em] uppercase text-emerald-400/60 font-medium mb-3">
                Accelerated-computing research
              </p>
              <p className="text-sm text-zinc-300 leading-relaxed mb-3">
                Public reference material, kept separate from delivery claims.
              </p>
              <ul className="space-y-2 text-sm text-zinc-400 leading-relaxed">
                <li>NVIDIA NIM and accelerator patterns appear as research topics</li>
                <li>GPU-aware architecture is translated into public learning material</li>
                <li>No NVIDIA relationship, hands-on delivery, or event work is claimed</li>
              </ul>
            </MotionItem>
          </div>
        </div>
      </MotionSection>

      {/* Cross-reference to /partners (affiliate transparency) */}
      <section className="border-t border-white/5 py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-sm text-zinc-500 mb-3">
            Tools recommended in workshops, with affiliate transparency policy?
          </p>
          <Link
            href="/partners"
            className="inline-flex items-center gap-1.5 text-sm text-emerald-300 hover:text-emerald-200 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-400/60 rounded"
          >
            Tools and affiliate policy
            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden />
          </Link>
        </div>
      </section>

      {/* Closing CTA */}
      <MotionSection className="border-t border-white/5 py-24 lg:py-32">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <MotionItem
            className="relative rounded-3xl border border-emerald-500/25 p-10 sm:p-14 text-center overflow-hidden"
            style={{
              background:
                'radial-gradient(ellipse at top right, rgba(6,182,212,0.04) 0%, transparent 55%), radial-gradient(ellipse at center, rgba(16,185,129,0.07) 0%, rgba(255,255,255,0.02) 40%, transparent 70%)',
            }}
          >
            <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/70 font-medium mb-4">
              Conversation
            </p>
            <h2
              className="text-2xl sm:text-3xl font-semibold text-white mb-3 leading-snug"
              style={{ letterSpacing: '-0.02em' }}
            >
              Open a partnership conversation.
            </h2>
            <p className="text-sm text-zinc-300 mb-8 max-w-md mx-auto leading-[1.7]">
              In 30 minutes, we walk through where your team is going,
              what is bottlenecked, and which of the operating modes (if any)
              fits this quarter. No deck. No follow-up sequence unless we both
              want one.
            </p>
            <Link
              href={MEET_AND_GROW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400/60 focus:ring-offset-2 focus:ring-offset-[#0a0a0b]"
              style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)' }}
            >
              Book Meet &amp; Grow
              <ArrowUpRight className="w-4 h-4" aria-hidden />
            </Link>
          </MotionItem>
        </div>
      </MotionSection>
      </main>
    </>
  )
}

/* -------------------------------------------------------------------------- */
/* Featured card — full-width treatment for the active strategic conversation */
/* -------------------------------------------------------------------------- */

function FeaturedPartnerCard({ partner }: { partner: Partner }) {
  return (
    <Link
      href={`/partnerships/${partner.slug}`}
      className="group relative block rounded-3xl border border-emerald-500/20 p-10 lg:p-14 transition-all duration-300 hover:border-emerald-400/45 hover:scale-[1.005] focus:outline-none focus:ring-2 focus:ring-emerald-400/60 overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse at top right, rgba(6,182,212,0.04) 0%, transparent 55%), radial-gradient(ellipse at center, rgba(16,185,129,0.06) 0%, rgba(255,255,255,0.025) 35%, transparent 70%)',
      }}
    >
      {/* Soft emerald glow that intensifies on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-20 rounded-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(16,185,129,0.06) 0%, transparent 60%)',
        }}
      />
      <div className="relative flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-5">
            <span
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
              style={{ animationDuration: '3s' }}
            >
              <span
                aria-hidden
                className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"
                style={{ animationDuration: '3s' }}
              />
              Active FrankX proposal
            </span>
            <span className="text-[11px] tracking-[0.2em] uppercase text-emerald-400/60 font-medium">
              {TIER_LABEL[partner.tier]}
            </span>
          </div>
          <h3
            className="text-2xl sm:text-3xl font-semibold text-white mb-4 leading-snug"
            style={{ letterSpacing: '-0.02em' }}
          >
            {partner.name}
          </h3>
          <p className="text-base text-zinc-300 leading-[1.7] mb-4 max-w-2xl">
            {partner.tagline}
          </p>
          <p className="text-sm text-zinc-500 leading-relaxed mb-6 max-w-2xl">
            Independently authored · evidence separated from proposal ·
            no endorsement implied
          </p>
          <span className="inline-flex items-center gap-1.5 text-sm text-emerald-300 group-hover:text-emerald-200 font-medium">
            Review the proposal and its evidence
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </span>
        </div>
      </div>
    </Link>
  )
}

/* -------------------------------------------------------------------------- */
/* Strategic alignment card — 2-col grid, richer than placeholder              */
/* -------------------------------------------------------------------------- */

function StrategicAlignmentCard({ partner }: { partner: Partner }) {
  return (
    <Link
      href={`/partnerships/${partner.slug}`}
      className="group relative block rounded-2xl bg-white/[0.025] border border-white/[0.08] p-6 lg:p-7 transition-all duration-300 hover:bg-white/[0.04] hover:border-emerald-500/40 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
    >
      {/* Emerald glow ring at -20px on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-5 rounded-3xl opacity-0 group-hover:opacity-50 transition-opacity duration-300"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(16,185,129,0.08) 0%, transparent 65%)',
        }}
      />
      <div className="relative">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] tracking-[0.2em] uppercase text-emerald-400/60 font-medium">
            {TIER_LABEL[partner.tier]}
          </span>
          <ArrowUpRight
            className="w-4 h-4 text-zinc-500 group-hover:text-emerald-300 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden
          />
        </div>
        <h3
          className="text-lg font-semibold text-white mb-2"
          style={{ letterSpacing: '-0.015em' }}
        >
          {partner.name}
        </h3>
        <p className="text-sm text-zinc-400 leading-relaxed mb-4">
          {partner.tagline}
        </p>
        {partner.programStatus ? (
          <p className="text-xs text-zinc-500 leading-relaxed mb-4 italic">
            {partner.programStatus}
          </p>
        ) : null}
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
          Independent alignment · no endorsement implied
        </span>
      </div>
    </Link>
  )
}

/* -------------------------------------------------------------------------- */
/* Compact card — remaining placeholders / in-conversation                     */
/* -------------------------------------------------------------------------- */

function CompactPartnerCard({ partner }: { partner: Partner }) {
  return (
    <Link
      href={`/partnerships/${partner.slug}`}
      className="group block rounded-2xl bg-white/[0.025] border border-white/[0.08] p-6 transition-all duration-300 hover:bg-white/[0.04] hover:border-emerald-500/25 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] tracking-[0.2em] uppercase text-emerald-400/60 font-medium">
          {TIER_LABEL[partner.tier]}
        </span>
        <ArrowUpRight
          className="w-4 h-4 text-zinc-500 group-hover:text-emerald-300 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden
        />
      </div>
      <h3
        className="text-lg font-semibold text-white mb-2"
        style={{ letterSpacing: '-0.015em' }}
      >
        {partner.name}
      </h3>
      <p className="text-sm text-zinc-400 leading-relaxed mb-4">
        {partner.tagline}
      </p>
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/[0.05] text-white/60 border border-white/10">
        {partner.status === 'in-conversation'
          ? 'Exploratory conversation · no formal relationship'
          : 'Independent opportunity note · no conversation claimed'}
      </span>
    </Link>
  )
}
