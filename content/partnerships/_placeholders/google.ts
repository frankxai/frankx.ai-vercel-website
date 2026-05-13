import type { Partner } from '../types'
import { MEET_AND_GROW_URL } from '@/lib/cta-links'

/**
 * Google Cloud — cloud + model partner. Placeholder until proposal page
 * is online. Gemini and ADK are both in active workshop and CoE use.
 */
export const google: Partner = {
  slug: 'google',
  name: 'Google Cloud',
  shortName: 'Google',
  tier: 'cloud',
  status: 'placeholder',

  title: 'AI Architect — Gemini + ADK + multi-cloud partner',
  tagline:
    'Gemini and ADK across the workshop track and CoE work.',
  subTagline:
    'Google Cloud Partner Advantage is the natural shape — attendee credits for the workshop cohort, plus a multi-cloud agent track.',

  contextWindow: `Gemini, the Agent Development Kit, and the A2A protocol are part of the AI Architect Academy curriculum and the Build Your First AI Agent workshop. Google's ADK is one of the three agent frameworks taught in the workshop's enterprise track. Multi-cloud agent harnesses are an active research pillar.

The conversation here is the credit-and-curriculum shape — Google Cloud Partner Advantage status, workshop attendee credits as a more valuable currency than commission, and a co-research track on multi-cloud agent harnesses.`,

  workingReality: [
    {
      label: 'Gemini and ADK in delivery',
      detail:
        'Gemini and the Agent Development Kit are taught in the Google branch of the Build Your First AI Agent workshop and used in real CoE delivery.',
    },
    {
      label: 'A2A protocol guide',
      detail:
        'Published guide on Agent Card / A2A protocol design, written from hands-on use, not from press releases.',
    },
    {
      label: 'Multi-cloud agent harness research',
      detail:
        'An active /research pillar comparing agent harnesses across OCI, Google Cloud, and Anthropic Claude Code.',
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
  partnerLogoUrl: '/images/partnerships/logos/google.svg',

  seo: {
    title: 'FrankX × Google Cloud — Gemini + ADK Partnership | FrankX',
    description:
      'A conversation with Google Cloud about a Gemini + ADK partnership tier — workshop attendee credits, multi-cloud agent harness research, and co-curriculum.',
  },
}
