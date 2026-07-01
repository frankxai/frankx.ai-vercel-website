import type { PortalPartner } from './types'

/**
 * Anthropic — lightweight enterprise reference card.
 *
 * The full strategic-alignment proposal lives at
 * content/partnerships/_placeholders/anthropic.ts and renders on
 * /partnerships/anthropic. This portal entry is a thin summary card that
 * links out rather than duplicating that content.
 *
 * Status: pursuing Anthropic Claude for Work Partner Program. No formal
 * agreement, revenue share, or co-marketing arrangement is in place today —
 * carried through from the source partnership page.
 */
export const anthropic: PortalPartner = {
  slug: 'anthropic',
  name: 'Anthropic',
  relationship: 'enterprise',
  status: 'building',
  accent: 'tech',
  lastUpdated: '2026-05-16',

  title: 'AI Architect — Claude-native AI CoE practice',
  tagline: 'The harness this practice ships in. The conversation is about scaling that pattern.',

  provides: [],
  projectPlan: [],
  yearPlan: [],
  recommendations: [],

  compounding: [],

  sharedUpside: [
    'Claude Code is the daily build harness underneath frankx.ai, ACOS, SIS, Library OS, and the AI Architect Academy today.',
    'Four public Claude-Code-native repositories give Anthropic a reviewable reference implementation, not a pitch deck.',
  ],

  team: [],

  crossLinks: [],

  partnershipsHref: '/partnerships/anthropic',

  cta: {
    label: 'See the full proposal',
    href: '/partnerships/anthropic',
  },

  seo: {
    title: 'FrankX × Anthropic | Partner Portal',
    description:
      'A Claude-native AI CoE practice already running in public — see the full strategic-alignment proposal.',
  },
}
