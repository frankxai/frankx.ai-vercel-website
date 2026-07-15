// Tier -> CTA routing for the Operator Scorecard report screen.
//
// Per the spec's barbell doctrine (frankx.product-experience.v1.md §5): low tiers route to
// the self-liquidating middle (ACOS Creator Kit, $47, already live at /acos); high tiers route
// to the high-ticket lane (Architect Sprint / Personal AI CoE, /workshops/personal-ai-coe).
// No new checkout surface is introduced here — both routes exist in this repo today.

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
  'solo-operator': {
    eyebrow: 'Start here',
    headline: 'Install the system instead of assembling it yourself.',
    body: 'The ACOS Creator Kit is the same operator stack graded in this scorecard — 84 agents, the skill lanes, the memory config — packaged so you run it in 20 minutes instead of building it from scratch.',
    ctaLabel: 'Get the ACOS Creator Kit — $47',
    ctaHref: '/acos',
    secondaryLabel: 'See what an Agentic Leader stack actually looks like',
    secondaryHref: '/agent-team',
  },
  'hybrid-delegator': {
    eyebrow: 'Next rung',
    headline: 'You have pieces. The Kit turns them into a system.',
    body: 'You are already delegating some things — the ACOS Creator Kit closes the rest: persistent memory, a real agent roster, and the skills that make delegation the default instead of the exception.',
    ctaLabel: 'Get the ACOS Creator Kit — $47',
    ctaHref: '/acos',
    secondaryLabel: 'See what an Agentic Leader stack actually looks like',
    secondaryHref: '/agent-team',
  },
  'agentic-leader': {
    eyebrow: 'Your next lane',
    headline: 'The gap left is usually distribution or revenue, not tooling.',
    body: 'You already run a real roster. The highest-leverage move from here is a build-with-you sprint that closes your named ceiling in weeks, not another course you assemble solo.',
    ctaLabel: 'Apply for an Architect Sprint',
    ctaHref: '/workshops/personal-ai-coe',
    secondaryLabel: 'Review the full ACOS system your stack is missing pieces of',
    secondaryHref: '/acos',
  },
  'ambient-operator': {
    eyebrow: 'You are ahead',
    headline: 'Compound what already runs — and get it published.',
    body: 'Most of the estate is still catching up to where you are. The Architect Sprint is for closing the last named ceiling with a build partner, fast, instead of doing it alone.',
    ctaLabel: 'Apply for an Architect Sprint',
    ctaHref: '/workshops/personal-ai-coe',
    secondaryLabel: 'Review the full ACOS system',
    secondaryHref: '/acos',
  },
}
