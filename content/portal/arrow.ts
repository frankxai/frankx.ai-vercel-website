import type { PortalPartner } from './types'

/**
 * Arrow Electronics ECS — lightweight enterprise reference card.
 *
 * The full partnership proposal lives at content/partnerships/arrow.ts and
 * renders on /partnerships/arrow. This portal entry is a thin summary card
 * that links out rather than duplicating that content.
 */
export const arrow: PortalPartner = {
  slug: 'arrow',
  name: 'Arrow Electronics ECS',
  relationship: 'enterprise',
  status: 'building',
  accent: 'tech',
  // Proposal, not a live signed engagement — see PARTNER_PORTAL_ECONOMICS.md.
  // Matches the noindex treatment already applied to ahmad/jojo at the same status.
  noindex: true,
  lastUpdated: '2026-05-16',

  title: 'AI Architect — EMEA distribution alignment proposal',
  tagline: 'A coding-agent-native AI CoE practice for EMEA distribution.',

  provides: [],
  projectPlan: [],
  yearPlan: [],
  recommendations: [],

  compounding: [],

  sharedUpside: [
    'A coding-agent AI CoE methodology that compresses Arrow solution architects\' reference-architecture and PoC build cycle.',
    'A public, reviewable toolkit (ACOS, SIS, AI Architect Academy) partner teams can inspect before any conversation becomes formal.',
  ],

  team: [],

  crossLinks: [],

  partnershipsHref: '/partnerships/arrow',

  cta: {
    label: 'See the full proposal',
    href: '/partnerships/arrow',
  },

  seo: {
    title: 'FrankX × Arrow Electronics ECS | Partner Portal',
    description:
      'A coding-agent-native AI CoE practice for EMEA distribution — see the full proposal.',
  },
}
