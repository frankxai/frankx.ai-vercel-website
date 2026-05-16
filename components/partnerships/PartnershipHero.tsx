import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { Partner } from '@/content/partnerships/types'
import { MotionHero, MotionHeroItem } from './MotionLayer'

type PartnershipHeroProps = {
  partner: Partner
  secondaryCta?: { label: string; href: string }
}

const STATUS_LABEL: Record<Partner['status'], string> = {
  active: 'Active strategic conversation',
  'strategic-alignment': 'Strategic alignment',
  'in-conversation': 'In conversation',
  placeholder: 'Conversation open',
}

export function PartnershipHero({
  partner,
  secondaryCta,
}: PartnershipHeroProps) {
  const isProposalTier =
    partner.status === 'active' || partner.status === 'strategic-alignment'

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
        <MotionHero>
          {/* 1 · Eyebrow + brand pairing */}
          <MotionHeroItem delay={0}>
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
              <span className="ml-auto inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                {STATUS_LABEL[partner.status]}
              </span>
            </div>
          </MotionHeroItem>

          {/* 2 · Brand pairing — FrankX × Partner, equal weight */}
          <MotionHeroItem delay={0.1}>
            <div className="flex items-center gap-4 mb-10">
              <span className="text-lg font-semibold tracking-tight text-white">
                FrankX
              </span>
              <span className="text-white/30 text-lg" aria-hidden>
                ×
              </span>
              {partner.partnerLogoUrl ? (
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
          </MotionHeroItem>

          {/* 3 · Title (role) — secondary line, sets context */}
          <MotionHeroItem delay={0.2}>
            <p className="text-sm md:text-base text-emerald-300/80 font-medium mb-4">
              {partner.title}
            </p>
          </MotionHeroItem>

          {/* 4 · Tagline — the hero statement */}
          <MotionHeroItem delay={0.2}>
            <h1
              id="partner-hero-title"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.05] mb-6 max-w-3xl"
              style={{
                fontFamily: 'var(--font-poppins, Poppins), Inter, sans-serif',
                letterSpacing: '-0.025em',
              }}
            >
              {partner.tagline}
            </h1>
          </MotionHeroItem>

          {/* 5 · Sub-tagline (deck) */}
          <MotionHeroItem delay={0.3}>
            <p className="text-lg text-zinc-300 leading-[1.7] mb-10 max-w-2xl">
              {partner.subTagline}
            </p>
          </MotionHeroItem>

          {/* 6 · CTAs — primary emerald, secondary ghost */}
          <MotionHeroItem delay={0.4}>
            {isProposalTier ? (
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href={partner.cta.href}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400/60 focus:ring-offset-2 focus:ring-offset-[#0a0a0b]"
                  style={{
                    boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)',
                  }}
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
                A deeper conversation is open with {partner.shortName}. The
                proposal page comes online when both sides are ready to publish.
              </p>
            )}
          </MotionHeroItem>
        </MotionHero>
      </div>
    </section>
  )
}
