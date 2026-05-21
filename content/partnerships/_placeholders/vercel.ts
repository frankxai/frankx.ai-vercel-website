import type { Partner } from '../types'
import { MEET_AND_GROW_URL } from '@/lib/cta-links'

/**
 * Vercel — platform partner. Placeholder until the deeper proposal page
 * is online; the existing affiliate-tier relationship is documented on
 * /partners.
 */
export const vercel: Partner = {
  slug: 'vercel',
  name: 'Vercel',
  shortName: 'Vercel',
  tier: 'tooling',
  status: 'placeholder',

  title: 'AI Architect — agent-native platform partner',
  tagline:
    'The platform every FrankX project ships on.',
  subTagline:
    'Affiliate-tier relationship visible on /partners. The conversation here is about the deeper partner-program shape and a co-marketing track.',

  contextWindow: `Vercel is the deploy target for frankx.ai, gencreator.ai, arcanea.ai, library-os, and the partnership pages themselves. Every Next.js workshop in the AI Architect Academy curriculum lands on Vercel. The platform is the place this practice runs.

The conversation here is the depth tier — a partner-program shape with co-marketing, attendee credits, and the AI SDK-anchored workshop track. The existing affiliate transparency lives at /partners.`,

  workingReality: [
    {
      label: 'Every site ships on Vercel',
      detail:
        'frankx.ai, gencreator.ai, arcanea.ai, library-os, and every workshop starter repo deploy to Vercel today.',
    },
    {
      label: 'Workshop track anchor',
      detail:
        'The Build Your First AI Agent workshop has Vercel AI SDK at the centre. The workshop ships to thousands of solution architects.',
    },
    {
      label: 'Existing affiliate-tier transparency',
      detail:
        "A documented partner relationship lives on /partners — this page is the conversation about the next tier.",
      evidence: {
        label: '/partners',
        href: '/partners',
      },
    },
  ],

  proofPoints: [],

  proposalIntro: '',
  asymmetricValue: [],
  programs: [],
  compoundingModel: [],
  crossLinks: [],
  whatThisIsNot: [],

  cta: {
    label: 'Open the conversation',
    href: MEET_AND_GROW_URL,
  },

  accent: 'tech',
  partnerLogoUrl: '/images/partnerships/logos/vercel.svg',

  seo: {
    title: 'FrankX × Vercel — Agent-Native Platform Partnership | FrankX',
    description:
      'Every FrankX project ships on Vercel. A conversation about the deeper partner-program tier with co-marketing and workshop credits.',
  },
}
