import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { Partner } from '@/content/partnerships/types'

type PartnershipHeroProps = {
  partner: Partner
  secondaryCta?: { label: string; href: string }
}

const STATUS_LABEL: Record<Partner['status'], string> = {
  active: 'Published FrankX proposal',
  'strategic-alignment': 'Independent alignment',
  'in-conversation': 'Conversation noted by FrankX',
  placeholder: 'Independent opportunity note',
}

const PUBLICATION_LABEL: Record<Partner['publicationBasis'], string> = {
  'public-evidence': 'Public evidence',
  'independent-proposal': 'Independent proposal',
  'confirmed-conversation': 'Confirmed conversation',
  'formal-partnership': 'Formal partnership',
}

const CONSENT_LABEL: Record<Partner['consentStatus'], string> = {
  'not-required-public-analysis': 'Public analysis',
  'not-requested': 'Consent not requested',
  confirmed: 'Consent confirmed',
}

const PRIVACY_LABEL: Record<Partner['privacyClassification'], string> = {
  'public-only': 'Public sources only',
  'sanitized-private-context': 'Private context sanitized',
}

export function PartnershipHero({
  partner,
  secondaryCta,
}: PartnershipHeroProps) {
  const hasPublishedProposal = partner.status === 'active'

  return (
    <section
      aria-labelledby="partner-hero-title"
      className="relative overflow-hidden pt-28 pb-20 lg:pt-36 lg:pb-28"
    >
      {/* Ambient tech-spectrum glow — purposeful, not decorative */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-emerald-500/[0.05] via-transparent to-transparent"
      />
      <div
        aria-hidden
        className="absolute top-24 left-1/2 -translate-x-1/2 h-[400px] w-[800px] rounded-full bg-emerald-500/[0.04] blur-3xl"
      />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
        {/* Eyebrow + brand pairing */}
        <div className="flex items-center gap-3 mb-8">
          <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium">
            Partnerships
          </p>
          <span aria-hidden className="text-white/20">
            /
          </span>
          <p className="text-[11px] tracking-[0.25em] uppercase text-white/40 font-medium">
            {partner.shortName}
          </p>
          <span
            className="ml-auto inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
          >
            {STATUS_LABEL[partner.status]}
          </span>
        </div>

        {/* Authorship pairing — explicitly a FrankX proposal, not an endorsement */}
        <div className="flex items-center gap-4 mb-10">
          <span className="text-lg font-semibold tracking-tight text-white">
            FrankX proposal
          </span>
          <span className="text-white/30 text-lg" aria-hidden>
            /
          </span>
          {partner.partnerLogoUrl ? (
            // Partner logos vary in aspect ratio (SVG from press kits).
            // next/image fill mode requires a fixed container; for this
            // hero pairing the simpler <img> with a fixed height is the
            // cleaner equal-weight pairing with the FrankX wordmark.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={partner.partnerLogoUrl}
              alt={`${partner.name} logo`}
              className="h-6 w-auto opacity-90"
              loading="eager"
            />
          ) : (
            <span className="text-lg font-semibold tracking-tight text-white/85">
              {partner.name}
            </span>
          )}
        </div>

        {/* Title (role) — secondary line, sets context */}
        <p className="text-sm md:text-base text-emerald-300/80 font-medium mb-4">
          {partner.title}
        </p>

        {/* Tagline — the hero statement */}
        <h1
          id="partner-hero-title"
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.05] mb-5 max-w-3xl"
          style={{ fontFamily: 'var(--font-poppins, Poppins), Inter, sans-serif' }}
        >
          {partner.tagline}
        </h1>

        {/* Sub-tagline */}
        <p className="text-lg text-zinc-400 leading-relaxed mb-10 max-w-2xl">
          {partner.subTagline}
        </p>
        <p className="mb-8 max-w-2xl border-l border-cyan-300/30 pl-4 text-xs leading-6 text-white/52">
          This page is authored by FrankX. It documents demonstrated use, prior work, or a
          proposed direction; it does not by itself show endorsement or a formal relationship
          with {partner.shortName}.
        </p>
        <dl
          aria-label="Publication and relationship basis"
          className="mb-10 grid max-w-2xl gap-2 text-xs text-white/62 sm:grid-cols-3"
        >
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.025] px-3 py-2.5">
            <dt className="mb-1 text-[10px] uppercase tracking-[0.16em] text-emerald-300/70">
              Publication
            </dt>
            <dd>{PUBLICATION_LABEL[partner.publicationBasis]}</dd>
          </div>
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.025] px-3 py-2.5">
            <dt className="mb-1 text-[10px] uppercase tracking-[0.16em] text-emerald-300/70">
              Consent
            </dt>
            <dd>{CONSENT_LABEL[partner.consentStatus]}</dd>
          </div>
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.025] px-3 py-2.5">
            <dt className="mb-1 text-[10px] uppercase tracking-[0.16em] text-emerald-300/70">
              Evidence
            </dt>
            <dd>{PRIVACY_LABEL[partner.privacyClassification]}</dd>
          </div>
        </dl>

        {/* CTAs — primary emerald, secondary ghost; never two equal weights */}
        {hasPublishedProposal ? (
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href={partner.cta.href}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400/60 focus:ring-offset-2 focus:ring-offset-[#0a0a0b]"
            >
              {partner.cta.label}
              <ArrowUpRight className="w-4 h-4" aria-hidden />
            </Link>
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/10 hover:border-white/20 font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-white/40"
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
        ) : (
          <p className="text-sm text-zinc-500 max-w-2xl">
            {partner.status === 'strategic-alignment'
              ? `This is FrankX’s independent record of platform use and possible alignment. No formal ${partner.shortName} relationship is claimed.`
              : partner.status === 'in-conversation'
                ? `FrankX records an open conversation with ${partner.shortName}; no formal partnership is claimed.`
                : `This is an independent opportunity note. No conversation or partnership with ${partner.shortName} is claimed.`}
          </p>
        )}
      </div>
    </section>
  )
}
