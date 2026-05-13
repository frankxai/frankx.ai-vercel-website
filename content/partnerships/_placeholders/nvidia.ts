import type { Partner } from '../types'
import { MEET_AND_GROW_URL } from '@/lib/cta-links'

/**
 * NVIDIA — silicon partner. Placeholder until the proposal page is published.
 *
 * Working reality on the public surface is verifiable today (Munich EBC,
 * NIM exposure, Oracle x NVIDIA partner event 2025 co-architecture). The
 * deeper proposal lands when both sides are ready.
 */
export const nvidia: Partner = {
  slug: 'nvidia',
  name: 'NVIDIA',
  shortName: 'NVIDIA',
  tier: 'silicon',
  status: 'placeholder',

  title: 'AI Architect — silicon-aware methodology partner',
  tagline:
    'Where the coding-agent AI CoE meets accelerated compute.',
  subTagline:
    'A conversation in motion around joint visibility on EMEA-channel AI accelerator work.',

  contextWindow: `NVIDIA sits at the centre of the EMEA-channel AI infrastructure narrative. NIM, NeMo, and the AI Enterprise stack are quietly becoming default ingredients in every multi-cloud reference architecture an AI Architect ships. The conversation I'm interested in is methodology-shaped — how coding-agent-native CoE practices map cleanly onto NVIDIA-anchored reference architectures.

The bridge is already warm: Munich EBC contacts, NIM hands-on from the Oracle CoE work, and co-architecture of the Oracle x NVIDIA partner event 2025.`,

  workingReality: [
    {
      label: 'Munich EBC bridge',
      detail:
        'Munich Executive Briefing Center contacts active from the Oracle EMEA AI CoE work. The relationship is real, not aspirational.',
    },
    {
      label: 'NIM and NVIDIA AI Enterprise hands-on',
      detail:
        'Hands-on exposure to NIM microservices and the NVIDIA AI Enterprise stack inside Oracle EMEA CoE reference architectures.',
    },
    {
      label: 'Oracle x NVIDIA partner event 2025',
      detail:
        'Co-architect of the Oracle x NVIDIA partner event — the shape of joint go-to-market we already practiced together.',
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
  partnerLogoUrl: '/images/partnerships/logos/nvidia.svg',

  seo: {
    title: 'FrankX × NVIDIA — Silicon-Aware AI CoE Partnership | FrankX',
    description:
      'A methodology-shaped conversation with NVIDIA — coding-agent AI CoE practice meets NVIDIA-anchored reference architectures across EMEA.',
  },
}
