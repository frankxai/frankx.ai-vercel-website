// Tier -> CTA routing for the AI CoE Readiness Assessment report screen.
//
// Per the spec (starlight/factory/ai-coe.product-experience.v1.md §3, §5): this is a single
// sales-cycle funnel, not a barbell split like the Operator Scorecard. Every tier's primary CTA
// is the same paid entry point — the executive briefing that scopes the Architect Sprint — at
// /workshops/personal-ai-coe (a real, live intake surface with a booking form; never a fake
// booking system). Only the framing and the secondary link vary by tier, for peer positioning.

import type { TierId } from './engine'

export interface TierCta {
  eyebrow: string
  headline: string
  body: string
  ctaLabel: string
  ctaHref: string
  secondaryLabel: string
  secondaryHref: string
}

export const CTA_BY_TIER: Record<TierId, TierCta> = {
  'ad-hoc': {
    eyebrow: 'Where most programs start',
    headline: 'Skip the year of committee meetings.',
    body: 'An Ad Hoc program does not need more strategy decks — it needs one accountable owner and one production use case. An executive briefing scopes the fastest path to a governed pilot, in your environment.',
    ctaLabel: 'Book the executive briefing',
    ctaHref: '/workshops/personal-ai-coe',
    secondaryLabel: 'Read the six-pillar operating model',
    secondaryHref: '/ai-coe',
  },
  piloting: {
    eyebrow: 'Next rung',
    headline: 'The gap is graduation, not another pilot.',
    body: 'Pilots that never reach production are common — and also the top reason CoEs lose funding. The Architect Sprint takes one real use case from pilot to governed production, fast.',
    ctaLabel: 'Book the executive briefing',
    ctaHref: '/workshops/personal-ai-coe',
    secondaryLabel: 'Read the six-pillar operating model',
    secondaryHref: '/ai-coe',
  },
  scaling: {
    eyebrow: 'Your next lane',
    headline: 'Production is real. Governance has not caught up.',
    body: 'You already have proof this works. The highest-leverage move now is closing the named gap before it becomes an incident — a build-with-you Sprint scoped to your actual architecture, not a generic framework.',
    ctaLabel: 'Apply for an Architect Sprint',
    ctaHref: '/workshops/personal-ai-coe',
    secondaryLabel: 'Review production architecture patterns',
    secondaryHref: '/ai-architecture',
  },
  industrializing: {
    eyebrow: 'Ahead of most enterprise programs',
    headline: 'Compound what already runs.',
    body: 'Most enterprise AI programs never reach where you are. The remaining gap is usually the one dimension no one has touched — closing it with a build partner is faster than another internal initiative.',
    ctaLabel: 'Apply for an Architect Sprint',
    ctaHref: '/workshops/personal-ai-coe',
    secondaryLabel: 'Review production architecture patterns',
    secondaryHref: '/ai-architecture',
  },
  'autonomous-ready': {
    eyebrow: 'You are ahead of the market',
    headline: 'Most CoEs never get here. Get the proof published.',
    body: 'The Sprint at this stage is not about catching up — it is about closing the last named gap with a partner who has actually operated agents in production, and turning the result into a reference case.',
    ctaLabel: 'Apply for an Architect Sprint',
    ctaHref: '/workshops/personal-ai-coe',
    secondaryLabel: 'Review production architecture patterns',
    secondaryHref: '/ai-architecture',
  },
}
