import type { Partner } from '../types'
import { MEET_AND_GROW_URL } from '@/lib/cta-links'

/**
 * Anthropic — model + infrastructure partner. Placeholder until proposal
 * page is published. Claude Code is Frank's daily build infrastructure.
 */
export const anthropic: Partner = {
  slug: 'anthropic',
  name: 'Anthropic',
  shortName: 'Anthropic',
  tier: 'model-provider',
  status: 'placeholder',

  title: 'AI Architect — Claude-native CoE practice partner',
  tagline:
    'The model and the harness this whole practice runs in.',
  subTagline:
    "Claude Code is Frank's daily build infrastructure. The conversation is about how a Claude-native AI CoE practice scales into enterprise distribution.",

  contextWindow: `Claude Code is the harness every part of frankx.ai and the open-source ecosystem around it ships in. ACOS, SIS, the AI Architect Academy curriculum, and the OCI Claude Code skill pack are all written to live inside the Claude Code workflow — that's not a marketing position, it's the working tool.

The conversation I'm interested in is partnership-shaped: how a Claude-native AI CoE methodology, with an open coding-agent toolkit and a public Academy curriculum, becomes the on-ramp for enterprises moving into agent-native workflows.`,

  workingReality: [
    {
      label: 'Claude Code as daily build infrastructure',
      detail:
        'Every project Frank ships runs in Claude Code. ACOS, SIS, the Library OS, the Workshop OS, and the partnership system itself are all Claude-Code-native.',
    },
    {
      label: 'Open Claude Code skill packs',
      detail:
        'Public repositories — ACOS, SIS, oci-ai-architect-skills — that other architects can clone, run, and learn from.',
    },
    {
      label: 'AI Architect Academy curriculum',
      detail:
        'A multi-cloud curriculum with Claude Code at the centre, used today to coach solution architects into agent-native workflows.',
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
  partnerLogoUrl: '/images/partnerships/logos/anthropic.svg',

  seo: {
    title: 'FrankX × Anthropic — Claude-Native AI CoE Practice | FrankX',
    description:
      "Claude Code is FrankX's daily build infrastructure. A conversation about Claude-native AI CoE methodology and the enterprise on-ramp it builds.",
  },
}
