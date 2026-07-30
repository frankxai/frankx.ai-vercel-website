import type { Partner } from '../types'
import { crossLink } from '@/lib/cross-links'
import { MEET_AND_GROW_URL } from '@/lib/cta-links'

/**
 * Vercel — strategic-alignment tier.
 *
 * This is FrankX's independently authored record of public platform use and
 * a possible deeper alignment. It is based on public-only evidence. Vercel
 * has not reviewed or approved the proposal, and no application, endorsement,
 * conversation, or formal partnership is claimed.
 */
export const vercel: Partner = {
  slug: 'vercel',
  name: 'Vercel',
  shortName: 'Vercel',
  tier: 'tooling',
  status: 'strategic-alignment',
  publicationBasis: 'independent-proposal',
  consentStatus: 'not-requested',
  privacyClassification: 'public-only',
  lastUpdated: '2026-07-30',

  title: 'AI Architect — Next-on-Vercel AI CoE practice',
  tagline:
    'I run frankx.ai on Vercel. Here is the collaboration I would test next.',
  subTagline:
    'FrankX uses Vercel for this production site and studies the AI SDK and platform as part of a broader agentic architecture practice. This is an independent proposal, not a Vercel-endorsed page.',

  contextWindow: `frankx.ai is a Next.js production site deployed through Vercel. Its public repository and live deployment provide inspectable evidence for that narrow claim. Other FrankX projects and learning materials explore related Next.js and agent-development patterns, but this page does not claim that every project is deployed on Vercel.

The possible alignment I see is around practical agent interfaces, deployment, model routing, and education. The Build First AI Agent material includes a Vercel AI SDK path, while the architecture and AI CoE pages document FrankX's own production patterns.

Everything beyond demonstrated platform use is an independently authored proposal. No Vercel application, reciprocal conversation, endorsement, or formal relationship is asserted.`,

  workingReality: [
    {
      label: 'frankx.ai deploys through Vercel',
      detail:
        'The production site and this public repository provide the evidence for the deployment claim made on this page. No broader project count is claimed.',
      evidence: {
        label: 'frankx.ai',
        href: 'https://www.frankx.ai',
      },
    },
    {
      label: 'Vercel AI SDK in workshop curriculum',
      detail:
        'The public Build First AI Agent material includes Vercel AI SDK and Next.js as an implementation path. It is FrankX-authored curriculum, not co-branded or Vercel-approved material.',
      evidence: {
        label: '/workshops/build-first-ai-agent',
        href: '/workshops/build-first-ai-agent',
      },
    },
    {
      label: 'Relationship status',
      detail:
        'Independent proposal only. FrankX does not claim a submitted application, reciprocal conversation, endorsement, or formal Vercel relationship.',
    },
    {
      label: 'Next.js production practice',
      detail:
        'frankx.ai is an inspectable Next.js production codebase. Platform-specific patterns are adopted only where they are visible in the repository or live deployment.',
    },
    {
      label: 'Architecture research',
      detail:
        'AI Gateway, model routing, and long-running agent workloads are research and proposal topics. This page does not present them as jointly implemented or endorsed.',
    },
  ],

  proofPoints: [
    {
      label: 'frankx.ai — Next-on-Vercel reference deploy',
      href: 'https://www.frankx.ai',
    },
    {
      label: 'Build First AI Agent — Vercel AI SDK workshop branch',
      href: '/workshops/build-first-ai-agent',
    },
    {
      label: 'ACOS — open agentic creator OS',
      href: 'https://github.com/frankxai/agentic-creator-os',
    },
    {
      label: 'SIS — open multi-agent system',
      href: 'https://github.com/frankxai/starlight-intelligence-system',
    },
    {
      label: 'ai-architecture — FrankX reference architectures',
      href: '/ai-architecture',
    },
    {
      label: 'ai-coe — the FrankX AI CoE blueprint',
      href: '/ai-architect/ai-coe-hub',
    },
  ],

  proposalIntro:
    'What follows is an independent proposal for consideration. Vercel has not reviewed or approved it, and no program application or reciprocal conversation is claimed.',

  asymmetricValue: [
    {
      title: 'Next-on-Vercel AI CoE reference implementation',
      body: 'frankx.ai and its public architecture material can serve as a reviewable starting point for discussing Next.js-based AI CoE patterns.',
      metric: 'Public work',
    },
    {
      title: 'Workshop curriculum biased Vercel AI SDK first',
      body: 'Build First AI Agent includes a Vercel AI SDK and Next.js path that could be developed further if both sides found it useful.',
      metric: 'Proposed path',
    },
    {
      title: 'Open-source body of agentic work',
      body: 'ACOS, SIS, Library OS, and AI Architect Academy make the surrounding FrankX methodology inspectable without implying a shared deployment relationship.',
      metric: 'Open source',
    },
    {
      title: 'EMEA audience funnel',
      body: 'FrankX writes for architects, builders, and partners evaluating production agent systems in Europe and beyond.',
      metric: 'Architect audience',
    },
    {
      title: 'AI CoE-tier reference architectures with Deploy-on-Vercel CTAs',
      body: 'The /ai-architecture surface could add clearly attributed deployment paths where a working template and mutual agreement justify them.',
      metric: 'Proposal',
    },
  ],

  programs: [
    {
      number: 1,
      name: 'Build First AI Agent — Co-Marketing',
      cadence: 'Per cohort, 4 to 6 per year',
      whatItIs:
        'Co-marketing the Build First AI Agent workshop with the Vercel AI SDK branch as the headline path.',
      whatItProduces: [
        'Co-branded workshop landing page',
        'Vercel AI SDK starter repo as the canonical workshop kit',
        'Joint social cuts per cohort',
        'Attendee credits or template surface where it makes sense',
      ],
      pricingPosture: 'Co-marketing arrangement, no cash flow either direction.',
    },
    {
      number: 2,
      name: 'ai-architecture with Deploy-via-Vercel CTAs',
      cadence: 'Continuous, reviewed quarterly',
      whatItIs:
        'Reference architectures on /ai-architecture instrumented with Deploy-via-Vercel CTAs alongside other deployment surfaces. Tracked attribution.',
      whatItProduces: [
        'Deploy-via-Vercel CTA on each Next-on-Vercel reference architecture',
        'Quarterly attribution report on tracked deploys',
        'One new reference architecture per quarter',
      ],
      pricingPosture:
        'Attribution-tracked, partner-program-shaped. No cash flow until the program pathway clears.',
    },
    {
      number: 3,
      name: 'AI Architect Academy — Vercel-Native Distribution',
      cadence: 'Annual curriculum cycle',
      whatItIs:
        'AI Architect Academy distributed as a Vercel-native curriculum — Next.js 16, AI SDK, Fluid Compute, AI Gateway as the standard reference deploy across every module.',
      whatItProduces: [
        'Curriculum with Vercel as the primary reference deploy',
        'Module starter repos on the Vercel template surface where appropriate',
        'Annual curriculum refresh tracking AI SDK and platform updates',
      ],
      pricingPosture: 'Open curriculum, no cash flow.',
    },
    {
      number: 4,
      name: 'Ecosystem Pathway Review',
      cadence: 'One-time fit review',
      whatItIs:
        'If there is mutual interest, identify the appropriate public ecosystem or partner pathway without presuming eligibility or acceptance.',
      whatItProduces: [
        'A confirmed fit or no-fit decision',
        'A written scope for any next step',
        'A public status update only after both sides can verify it',
      ],
      pricingPosture: 'Any program terms remain Vercel-defined.',
    },
    {
      number: 5,
      name: 'Reference Architecture Publication on /research',
      cadence: 'Quarterly, joint editorial',
      whatItIs:
        'A published research stream on /research covering Next-on-Vercel agent patterns — AI SDK production patterns, Fluid Compute for agents, AI Gateway routing, agent observability.',
      whatItProduces: [
        'One co-published deep-dive per quarter',
        'First publication rights on the stream',
        'Companion starter repo per piece, Vercel-deploy-ready',
      ],
      pricingPosture: 'Editorial collaboration, no cash flow.',
    },
  ],

  compoundingModel: [
    {
      month: 0,
      title: 'Public evidence and proposal separated',
      body: 'frankx.ai deployment evidence, FrankX-authored curriculum, and the independent proposal are labeled as distinct things.',
    },
    {
      month: 3,
      title: 'Possible template and research pilot',
      body: 'If mutually approved, test one working deployment template and one clearly attributed technical deep-dive.',
    },
    {
      month: 6,
      title: 'Possible curriculum integration',
      body: 'If the pilot proves useful, add a maintained Vercel path to relevant Academy and workshop modules.',
    },
    {
      month: 12,
      title: 'Evidence-based continuation decision',
      body: 'Review real template use, learning outcomes, and editorial value before deciding whether any formal relationship makes sense.',
    },
  ],

  crossLinks: [
    crossLink(
      'ai-architecture',
      'The public architecture surface where a verified deployment template could be documented.',
      'FrankX reference architectures'
    ),
    crossLink(
      'ai-architect-academy',
      'The curriculum surface where a maintained Vercel implementation path could live.',
      'AI Architect curriculum'
    ),
    crossLink(
      'workshops',
      'Build First AI Agent includes a Vercel AI SDK and Next.js implementation path.',
      'Agent-building workshop'
    ),
    crossLink(
      'research',
      'Independent research on production agent patterns, including deployment and model routing.',
      'Independent research'
    ),
    crossLink(
      'blog',
      'Long-form writing on Next-on-Vercel AI CoE patterns, AI SDK, and the production agent stack.',
      'Long-form on the stack'
    ),
  ],

  whatThisIsNot: [
    'A claim that Vercel authored, reviewed, or endorsed this page',
    'Evidence of a submitted application or reciprocal conversation',
    'A formal partner, customer-reference, or employee relationship',
    'An exclusive technology commitment',
    'A promise of co-marketing, credits, or platform access',
  ],

  cta: {
    label: 'Book Meet & Grow with Frank',
    href: MEET_AND_GROW_URL,
  },

  programStatus: 'Independent proposal — no formal Vercel relationship claimed',

  alreadyShared: [
    'frankx.ai is deployed through Vercel.',
    'The public FrankX codebase uses Next.js.',
    'Build First AI Agent includes a FrankX-authored Vercel AI SDK path.',
    'FrankX publishes independent research on deployment, model routing, and agent interfaces.',
  ],

  formalizationAsk:
    'If this independent proposal is relevant, the next step is a scoped fit conversation. Until that happens, the page remains public-only analysis with no consent, endorsement, or formal relationship claimed.',

  accent: 'tech',
  partnerLogoUrl: '/images/partnerships/logos/vercel.svg',
  // ogImagePath: '/images/partnerships/vercel-og.png', // TODO: generate, falls back to site default

  seo: {
    title: 'FrankX on Vercel — Independent AI CoE Alignment',
    description:
      'How frankx.ai uses Vercel, plus a clearly labeled independent proposal for deeper alignment. No application, conversation, endorsement, or formal relationship is implied.',
  },
}
