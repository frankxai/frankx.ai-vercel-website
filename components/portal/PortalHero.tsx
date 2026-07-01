import Link from 'next/link'
import { ArrowRight, Handshake, Sparkles } from 'lucide-react'
import type { PortalAccent, PortalPartner, PortalRelationship, PortalStatus } from '@/content/portal/types'

type PortalHeroProps = {
  partner: PortalPartner
}

const RELATIONSHIP_LABEL: Record<PortalRelationship, string> = {
  friend: 'Friend',
  ally: 'Ally',
  partner: 'Partner',
  enterprise: 'Enterprise',
}

const STATUS_LABEL: Record<PortalStatus, string> = {
  active: 'Active',
  building: 'Building',
  draft: 'Draft',
}

// Tech spectrum (emerald) is default; soul/bridge lean amber, matching how
// /allies treats Ana/Ahmad. See design.md §3 + lib/design-system.ts.
const ACCENT_STYLES: Record<
  PortalAccent,
  { badge: string; glowA: string; glowB: string; cta: string }
> = {
  tech: {
    badge: 'border-emerald-300/25 bg-emerald-300/10 text-emerald-100',
    glowA: 'rgba(16,185,129,0.22)',
    glowB: 'rgba(6,182,212,0.13)',
    cta: 'bg-white text-black hover:bg-emerald-100',
  },
  soul: {
    badge: 'border-amber-200/30 bg-amber-200/10 text-amber-50',
    glowA: 'rgba(245,158,11,0.20)',
    glowB: 'rgba(232,169,81,0.13)',
    cta: 'bg-white text-black hover:bg-amber-100',
  },
  bridge: {
    badge: 'border-amber-200/25 bg-amber-200/10 text-amber-50',
    glowA: 'rgba(16,185,129,0.18)',
    glowB: 'rgba(245,158,11,0.16)',
    cta: 'bg-white text-black hover:bg-emerald-100',
  },
}

/**
 * Partner Portal hero — parameterized version of the /allies hero (gradient
 * wash, pill badge, black headline). One badge shows the relationship type,
 * a second shows build status, so the visitor knows both "who" and "where."
 */
export function PortalHero({ partner }: PortalHeroProps) {
  const accent = ACCENT_STYLES[partner.accent]

  return (
    <section className="relative overflow-hidden px-5 pb-16 pt-28 md:px-10 md:pb-24 md:pt-32">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background: `radial-gradient(circle at 20% 10%, ${accent.glowA}, transparent 34%), radial-gradient(circle at 82% 18%, ${accent.glowB}, transparent 32%), linear-gradient(135deg, #070808 0%, #0b1116 48%, #10100b 100%)`,
        }}
      />

      <div className="mx-auto max-w-5xl">
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <span
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-2xl ${accent.badge}`}
          >
            <Handshake className="h-4 w-4" />
            {RELATIONSHIP_LABEL[partner.relationship]}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.045] px-4 py-2 text-xs font-semibold text-white/70 backdrop-blur-xl">
            <Sparkles className="h-3.5 w-3.5" />
            {STATUS_LABEL[partner.status]}
          </span>
        </div>

        <p className="text-sm font-semibold text-white/50">
          {partner.name}
          {partner.org ? <span className="text-white/30"> · {partner.org}</span> : null}
        </p>

        <h1 className="mt-4 max-w-4xl text-balance text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
          {partner.title}
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72 md:text-xl">
          {partner.tagline}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={partner.cta.href}
            className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold shadow-[0_18px_60px_rgba(255,255,255,0.16)] transition ${accent.cta}`}
          >
            {partner.cta.label}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
