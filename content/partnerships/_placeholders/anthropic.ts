import type { Partner } from '../types'
import { crossLink } from '@/lib/cross-links'
import { MEET_AND_GROW_URL } from '@/lib/cta-links'

/**
 * Anthropic — strategic alignment.
 *
 * This page is a peer-architect proposal, not a claim of formal partnership.
 * Working reality (top of page) is verifiable today. Proposal (bottom of page)
 * is clearly labeled.
 *
 * This is based on public evidence and Frank's own tool use. No application,
 * reciprocal conversation, endorsement, or formal relationship is claimed.
 *
 * Named contacts at Anthropic never appear in this file. They live in
 * `.frankx/private/partnerships/anthropic-brief.md` (gitignored) if at all.
 */
export const anthropic: Partner = {
  slug: 'anthropic',
  name: 'Anthropic',
  shortName: 'Anthropic',
  tier: 'model-provider',
  status: 'strategic-alignment',
  publicationBasis: 'independent-proposal',
  consentStatus: 'not-requested',
  privacyClassification: 'public-only',
  lastUpdated: '2026-07-30',

  title: 'Independent Claude and agent-workflow opportunity brief',
  tagline:
    'How Claude fits FrankX’s multi-model workflow—and what one small collaboration could test.',
  subTagline:
    'Frank uses Claude Code across public projects and learning material. This page is an independent proposal for possible future alignment, not an Anthropic-authored or endorsed page.',

  contextWindow: `Claude Code is one of the build harnesses Frank uses in a multi-model practice. Public repositories, learning material, and FrankX pages make parts of that working method inspectable without implying Anthropic involvement.

The pattern I see: enterprises and architects are moving toward agent-native workflows faster than the methodology to support that move has matured. Reference implementations, opinionated harnesses, and curriculum that meet architects where they work can help close that gap.

That is the layer FrankX brings: enterprise AI architecture experience, public agentic repositories, the AI Architect Academy, and workshop material. Any deeper Anthropic alignment described here is a FrankX-authored proposal that Anthropic has not reviewed or approved.`,

  workingReality: [
    {
      label: 'Claude Code in Frank’s build practice',
      detail:
        'Frank identifies Claude Code as one tool in his own multi-model workflow. The linked repositories are offered for inspection; this is not evidence of Anthropic participation.',
      evidence: {
        label: 'github.com/frankxai',
        href: 'https://github.com/frankxai',
      },
    },
    {
      label: 'Public repositories relevant to the workflow',
      detail:
        'ACOS, SIS, the AI Architect Academy, and an OCI Claude Code skill pack are public artifacts relevant to this brief. Their individual repositories—not this page—are the evidence for what each contains.',
      evidence: {
        label: 'ACOS — github.com/frankxai/agentic-creator-os',
        href: 'https://github.com/frankxai/agentic-creator-os',
      },
    },
    {
      label: 'Former enterprise AI architecture practice',
      detail:
        'Frank translates non-confidential enterprise AI architecture experience into public, multi-model learning and build systems.',
    },
    {
      label: 'Claude path in public workshop material',
      detail:
        'Build First AI Agent presents multiple implementation paths, including Claude. The material is independently authored and is not co-branded.',
      evidence: {
        label: '/workshops/build-first-ai-agent',
        href: '/workshops/build-first-ai-agent',
      },
    },
    {
      label: 'Public distribution surface',
      detail:
        'FrankX publishes Claude Code patterns, agent-native workflows, AI CoE methodology, and open-source reference implementations through the public site, newsletter, GitHub, and LinkedIn.',
    },
  ],

  proofPoints: [
    {
      label: 'ACOS — public agentic creator OS',
      href: 'https://github.com/frankxai/agentic-creator-os',
    },
    {
      label: 'SIS — public Starlight Intelligence System repository',
      href: 'https://github.com/frankxai/starlight-intelligence-system',
    },
    {
      label: 'AI Architect Academy — public multi-cloud curriculum',
      href: 'https://github.com/frankxai/ai-architect-academy',
    },
    {
      label: 'OCI Claude Code skill pack — public Oracle/OCI learning resource',
      href: 'https://github.com/oci-ai-architects/claude-code-oci-ai-architect-skills',
    },
    {
      label: 'Build First AI Agent workshop — Claude branch on frankx.ai',
      href: '/workshops/build-first-ai-agent',
    },
  ],

  proposalIntro:
    'What follows is a proposal for a strategic-alignment relationship — specific shapes this could take if both sides see it. The five operating modes below stack; alignment work rarely picks just one.',

  asymmetricValue: [
    {
      title: 'Inspectable public body of work',
      body: 'The public ACOS, SIS, AI Architect Academy, and OCI skill-pack repositories let a prospective collaborator review relevant artifacts before discussing distribution or attribution.',
      metric: 'Public artifacts',
    },
    {
      title: 'Academy curriculum with Claude Code at the centre',
      body: 'AI Architect Academy is multi-cloud by design and includes Claude-related material. Any Anthropic attribution or curriculum review would require separate approval.',
      metric: 'Multi-cloud curriculum',
    },
    {
      title: 'Public distribution surface',
      body: 'FrankX already publishes Claude Code patterns across the public site, GitHub, newsletter, and LinkedIn. The value is a focused, builder-native audience rather than paid amplification.',
      metric: 'Public builder channels',
    },
    {
      title: 'Published workshop path',
      body: 'Build First AI Agent includes a Claude path that can be reviewed publicly. A cohort, co-marketing plan, or attribution slot is not assumed.',
      metric: 'Public workshop material',
    },
    {
      title: 'MCP work shipped publicly',
      body: 'The SIS repository contains public MCP work that can be inspected directly. This page does not turn repository contents into a usage or adoption claim.',
      metric: 'Public MCP repository',
    },
  ],

  programs: [
    {
      number: 1,
      name: 'Build First AI Agent — Claude branch co-marketing',
      cadence: 'Per cohort, EMEA-anchored',
      whatItIs:
        'Co-marketing the Claude branch of the Build First AI Agent workshop. Anthropic attribution on cohort materials, joint announcement on cohort kickoff, post-cohort case-study.',
      whatItProduces: [
        'Co-branded cohort announcement on LinkedIn and the FrankX newsletter',
        'Claude branch curriculum reviewed against current Claude Code best practice',
        'Cohort completion case-study published on /workshops/build-first-ai-agent',
        'Attribution slot on workshop materials for the cohort window',
      ],
      pricingPosture:
        'No cash exchange in the first cohort. Attribution and reciprocal amplification only.',
    },
    {
      number: 2,
      name: 'Content collaboration on agent patterns',
      cadence: 'Quarterly publication, 12-month track',
      whatItIs:
        'Co-authored or attribution-aligned publications on /blog (Field Notes) and /research — Claude-Code-native agent patterns, MCP for cloud orchestration, multi-cloud agent harnesses with Claude at the core.',
      whatItProduces: [
        'One co-published or attribution-aligned deep-dive per quarter',
        'Field Notes companion posts driving the deep-dive to the EMEA audience',
        'First publication rights for Anthropic on co-authored pieces',
      ],
      pricingPosture: 'Editorial alignment, no cash exchange.',
    },
    {
      number: 3,
      name: 'ACOS as a public Claude-Code-native reference implementation',
      cadence: 'Continuous, reviewed quarterly',
      whatItIs:
        'Position ACOS as a public reference implementation for Claude-Code-native creator and architect workflows. Anthropic discoverability surfaces (docs, partner pages, ecosystem lists) reference ACOS where it fits.',
      whatItProduces: [
        'ACOS README, /os, and /studio surfaces aligned with current Claude Code conventions',
        'Quarterly review of ACOS against Claude Code release cycle',
        'Public reference architecture for Claude-Code-native CoE workflows',
      ],
      pricingPosture: 'Open-source, MIT. No cash exchange.',
    },
    {
      number: 4,
      name: 'Applicable ecosystem pathway review',
      cadence: 'One-time fit review',
      whatItIs:
        'If there is mutual interest, identify an appropriate Anthropic ecosystem pathway without presuming eligibility, timing, or acceptance.',
      whatItProduces: [
        'A confirmed fit or no-fit decision',
        'A written scope for any next step',
        'A public status update only after both sides can verify it',
      ],
      pricingPosture:
        'Per program terms once accepted. Qualitative posture only at this stage.',
    },
    {
      number: 5,
      name: 'AI Architect Academy distribution',
      cadence: 'Curriculum module per quarter',
      whatItIs:
        'AI Architect Academy as an on-ramp surface — Claude Code curriculum modules published on the Academy GitHub, with attribution lanes for Anthropic where the content centres on Claude-native patterns.',
      whatItProduces: [
        'One Claude Code curriculum module per quarter on the Academy repository',
        'Module-level attribution where the content centres on Claude-native patterns',
        'Architect cohort coaching delivered against the modules',
      ],
      pricingPosture:
        'Open-source curriculum. No cash exchange on the substrate.',
    },
  ],

  compoundingModel: [
    {
      month: 0,
      title: 'Independent proposal published',
      body: 'Public tool use, FrankX-authored curriculum, and the proposed future collaboration are kept visibly separate.',
    },
    {
      month: 3,
      title: 'Possible research and workshop pilot',
      body: 'If mutually approved, test one attributed research piece or workshop module with a defined review boundary.',
    },
    {
      month: 6,
      title: 'Possible curriculum integration',
      body: 'Continue only if the pilot produces useful learning outcomes and both sides approve the attribution.',
    },
    {
      month: 12,
      title: 'Evidence-based continuation decision',
      body: 'Review real usage, learning outcomes, and editorial value before deciding whether any formal relationship makes sense.',
    },
  ],

  crossLinks: [
    crossLink(
      'ai-architect-academy',
      'Where the Claude Code curriculum modules live. The Academy is the on-ramp content surface for the strategic alignment.',
      'The methodology, productized'
    ),
    crossLink(
      'research',
      'Where co-published deep-dives on Claude-native agent patterns, MCP, and multi-cloud agent harnesses land.',
      'Co-publication surface'
    ),
    crossLink(
      'workshops',
      'The Build First AI Agent workshop Claude branch — co-marketing slot for cohort announcements.',
      'Workshop Claude branch in market'
    ),
    crossLink(
      'blog',
      'Field Notes — the cadence companion to /research. Where the EMEA audience is amplified into deep-dive traffic.',
      'Field Notes amplification'
    ),
    crossLink(
      'ai-coe',
      'The AI CoE blueprint in public — the methodology the Claude-native practice sits on top of.',
      'The methodology, in public'
    ),
  ],

  whatThisIsNot: [
    'Not a claim that Anthropic authored, reviewed, or endorsed this page.',
    'Not a model-reseller pitch — there is no API margin or reseller mechanic in scope.',
    'Not exclusive — Frank uses a multi-model practice and chooses tools by workflow.',
    'Not a deck-building consulting role — every deliverable is a public artifact (repo, curriculum module, workshop cohort, deep-dive).',
    'Not on-call API support or production implementation services.',
  ],

  cta: {
    label: 'Open the strategic conversation',
    href: MEET_AND_GROW_URL,
  },

  programStatus: 'Independent proposal — no formal Anthropic relationship claimed',

  alreadyShared: [
    'Frank identifies Claude Code as one tool in his multi-model build workflow.',
    'ACOS, SIS, AI Architect Academy, and the OCI Claude Code skill pack are linked here as public artifacts for inspection.',
    'Build First AI Agent includes a publicly inspectable Claude path.',
    'FrankX publishes independent Claude-related notes; no private feedback channel, cohort outcome, or Anthropic involvement is claimed.',
  ],

  formalizationAsk:
    'If this independent proposal is relevant, the next step is a scoped fit conversation. Until that happens, no application, endorsement, shared roadmap, or formal relationship is claimed.',

  accent: 'tech',
  partnerLogoUrl: '/images/partnerships/logos/anthropic.svg',
  // ogImagePath: '/images/partnerships/anthropic-og.png', // TODO: generate, falls back to site default

  seo: {
    title: 'FrankX on Anthropic — Independent Claude-Native AI CoE Brief',
    description:
      'How FrankX uses Claude and Claude Code, plus an independently authored proposal for deeper alignment. No Anthropic partnership or endorsement is implied.',
  },
}
