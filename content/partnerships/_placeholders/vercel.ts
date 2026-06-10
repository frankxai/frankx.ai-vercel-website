import type { Partner } from '../types'
import { crossLink } from '@/lib/cross-links'
import { MEET_AND_GROW_URL } from '@/lib/cta-links'

/**
 * Vercel — strategic-alignment tier.
 *
 * Every frankx.ai project ships on Vercel today. This page is the
 * peer-architect proposal for a deeper alignment around the Vercel AI SDK,
 * Fluid Compute, and AI Gateway as the production agent stack. The Vercel
 * Partner Program application is in flight. Nothing here claims a formal
 * partnership exists yet.
 */
export const vercel: Partner = {
  slug: 'vercel',
  name: 'Vercel',
  shortName: 'Vercel',
  tier: 'tooling',
  status: 'strategic-alignment',
  lastUpdated: '2026-05-16',

  title: 'AI Architect — Next-on-Vercel AI CoE practice',
  tagline:
    'The deployment substrate the entire AI CoE practice runs on.',
  subTagline:
    'Every shipped FrankX surface already runs on Vercel infrastructure. The Build First AI Agent workshop centres Vercel AI SDK. The conversation is making the alignment formal.',

  contextWindow: `Vercel is the deployment substrate the entire FrankX AI Architect practice runs on. frankx.ai, the production site frankx.ai-vercel-website, Watch OS, Workshop OS, Library OS, Studio, ACO, Partnerships — every public surface ships on Vercel. The AI Architect Academy uses Next.js 16 with Turbopack, Cache Components, Fluid Compute, and the new vercel.ts config as its standard reference deploy.

The alignment I see is around the production agent stack — AI SDK at the centre, Fluid Compute carrying the long-running calls, AI Gateway in front of the model layer. The Build First AI Agent workshop already teaches the Vercel AI SDK as the central path. The ai-architecture and ai-coe pages on frankx.ai are Next-on-Vercel reference architectures.

Vercel Partner Program — application is in flight. This page is the conversation about the shape of a strategic-alignment relationship.`,

  workingReality: [
    {
      label: 'Every project ships on Vercel',
      detail:
        'frankx.ai, the production site frankx.ai-vercel-website, Watch OS, Workshop OS, Library OS, Studio, ACO, Partnerships — 8+ public production deploys on Vercel under the frankxai org.',
      evidence: {
        label: 'frankx.ai',
        href: 'https://frankx.ai',
      },
    },
    {
      label: 'Vercel AI SDK in workshop curriculum',
      detail:
        'The Build First AI Agent workshop teaches Vercel AI SDK as the central path. Curriculum branch is explicitly Vercel-anchored — workshop attendees ship their first production agent on the AI SDK + Next.js stack.',
      evidence: {
        label: '/workshops/build-first-ai-agent',
        href: '/workshops/build-first-ai-agent',
      },
    },
    {
      label: 'Vercel Partner Program — in flight',
      detail:
        'Application submitted. This page is the conversation about the shape of the alignment once the program pathway completes.',
    },
    {
      label: 'Next.js 16 + Cache Components + Fluid Compute in delivery',
      detail:
        'Production stack on every frankx.ai surface — Next.js 16, Turbopack, Cache Components, Fluid Compute, the new vercel.ts config. Reference deploys, not slideware.',
    },
    {
      label: 'AI Gateway adoption',
      detail:
        'AI Gateway aware across the workshop curriculum and the ai-architecture reference pages. The production agent stack is AI SDK + Fluid Compute + AI Gateway, taught and shipped together.',
    },
  ],

  proofPoints: [
    {
      label: 'frankx.ai — Next-on-Vercel reference deploy',
      href: 'https://frankx.ai',
    },
    {
      label: 'Build First AI Agent — Vercel AI SDK workshop branch',
      href: '/workshops/build-first-ai-agent',
    },
    {
      label: 'ACOS — agentic creator OS, ships on Vercel',
      href: 'https://github.com/frankxai/agentic-creator-os',
    },
    {
      label: 'SIS — Starlight Intelligence System, Next-on-Vercel substrate',
      href: 'https://github.com/frankxai/starlight-intelligence-system',
    },
    {
      label: 'ai-architecture — Next-on-Vercel reference architectures',
      href: '/ai-architecture',
    },
    {
      label: 'ai-coe — the AI CoE blueprint in public, deployed on Vercel',
      href: '/ai-coe',
    },
  ],

  proposalIntro:
    'What follows is the shape a strategic-alignment relationship could take. The Partner Program application is in flight; the operating modes below are how the alignment compounds once the pathway clears.',

  asymmetricValue: [
    {
      title: 'Next-on-Vercel AI CoE reference implementation',
      body: 'The ai-architecture and ai-coe surfaces are working Next-on-Vercel reference architectures for enterprise AI CoE patterns. Public, reviewable, deployed.',
      metric: 'Reference deploys',
    },
    {
      title: 'Workshop curriculum biased Vercel AI SDK first',
      body: 'Build First AI Agent teaches Vercel AI SDK as the central path. Workshop attendees ship their first production agent on the AI SDK + Next.js stack.',
      metric: 'AI SDK-first',
    },
    {
      title: 'Open-source body of work that ships on Vercel',
      body: 'ACOS, SIS, library-os, ai-architect-academy — every public repo deploys to Vercel as its reference target. The toolkit and the deploy are inseparable.',
      metric: '8+ prod deploys',
    },
    {
      title: 'EMEA audience funnel',
      body: 'Audience across Oracle, NVIDIA, Anthropic, and founder networks in EMEA. AI Architect content lands among architects evaluating their production agent stack.',
      metric: 'EMEA reach',
    },
    {
      title: 'AI CoE-tier reference architectures with Deploy-on-Vercel CTAs',
      body: 'The /ai-architecture surface is built to carry Deploy-on-Vercel CTAs alongside other deployment targets. The funnel from architecture demo to Vercel deploy is one click.',
      metric: 'CTA-ready',
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
      name: 'Vercel Partner Program — Pursuit Completion',
      cadence: 'One-time pathway, then renewal cadence',
      whatItIs:
        'Complete the Vercel Partner Program application pathway. Move from strategic-alignment to formal partner tier.',
      whatItProduces: [
        'Partner Program enrolment',
        'Page status updates from strategic-alignment to active',
        'Formal partner-tier surfaces wherever Vercel-program-shaped CTAs apply',
      ],
      pricingPosture: 'Program-defined.',
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
      title: 'Partner Program submitted, workshop branch live',
      body: 'Partner Program application in flight. Build First AI Agent workshop Vercel AI SDK branch live. Working reality on the page already verifiable.',
    },
    {
      month: 3,
      title: 'Deploy CTAs in ai-architecture, first co-published deep-dive',
      body: 'Deploy-via-Vercel CTAs live on /ai-architecture reference architectures. First co-published Next-on-Vercel agent-patterns deep-dive on /research with companion starter repo.',
    },
    {
      month: 6,
      title: 'Academy distributing Vercel-native curriculum',
      body: 'AI Architect Academy curriculum cycle running with Vercel as the standard reference deploy across modules. Workshop cohorts shipping on AI SDK + Fluid Compute by default.',
    },
    {
      month: 12,
      title: 'Reference customer for Next-on-Vercel AI CoE in EMEA',
      body: 'FrankX operating as the EMEA reference customer for Next-on-Vercel AI CoE patterns. Partner Program tier active. Research stream and academy curriculum compounding.',
    },
  ],

  crossLinks: [
    crossLink(
      'ai-architecture',
      'Where the Deploy-via-Vercel CTAs land on every Next-on-Vercel reference architecture.',
      'Reference architectures with Deploy CTAs'
    ),
    crossLink(
      'ai-architect-academy',
      'The curriculum that ships Vercel-native by default — AI SDK, Fluid Compute, AI Gateway as the standard reference deploy.',
      'Vercel-native curriculum'
    ),
    crossLink(
      'workshops',
      'Build First AI Agent — Vercel AI SDK branch is the headline path through the curriculum.',
      'Vercel AI SDK-anchored workshop'
    ),
    crossLink(
      'research',
      'Next-on-Vercel agent-pattern stream open for joint editorial — AI SDK production patterns, Fluid Compute, AI Gateway routing.',
      'Joint research stream'
    ),
    crossLink(
      'blog',
      'Long-form writing on Next-on-Vercel AI CoE patterns, AI SDK, and the production agent stack.',
      'Long-form on the stack'
    ),
  ],

  whatThisIsNot: [
    'A Vercel-employee-flavored relationship — this is operator-to-platform, peer-architect',
    'Exclusive — FrankX also ships on Cloudflare Pages where the workload calls for it',
    'On-call deployment support or Vercel-side ops cover',
    'A deck-building consulting role',
    'A freebie content-machine — co-marketing is mutual, not extractive',
  ],

  cta: {
    label: 'Book Meet & Grow with Frank',
    href: MEET_AND_GROW_URL,
  },

  programStatus: 'Vercel Partner Program — application in flight',

  alreadyShared: [
    'Every shipped frankx.ai surface runs on Vercel infrastructure — Watch OS, Workshop OS, Library OS, Studio, ACO, Partnerships.',
    'The Build First AI Agent workshop centres Vercel AI SDK as the recommended path for the central cohort track.',
    '8+ public production deploys under the frankxai/* org, every one a working Next-on-Vercel reference.',
    'Active feedback loop on AI Gateway, Fluid Compute, Cache Components, and the new vercel.ts config from daily delivery.',
    'Workshop curriculum biased Vercel AI SDK first — not OpenAI Assistants, not LangChain — across every cohort.',
    'Reference-architecture demos with Deploy-via-Vercel CTAs ready to publish on /ai-architecture.',
  ],

  formalizationAsk:
    "What's left to formalize. Eight production deploys ship on your platform already. The workshop curriculum already biases your AI SDK. The conversation is closing the Partner Program loop, attendee credits for the workshop EMEA cohort, and DevRel touchpoint with the Lee Robinson / Guillermo Rauch network.",

  accent: 'tech',
  partnerLogoUrl: '/images/partnerships/logos/vercel.svg',
  // ogImagePath: '/images/partnerships/vercel-og.png', // TODO: generate, falls back to site default

  seo: {
    title: 'FrankX × Vercel — Next-on-Vercel AI CoE Practice | FrankX',
    description:
      'Next-on-Vercel AI CoE practice — AI SDK, Fluid Compute, AI Gateway as the production agent stack. Strategic-alignment proposal from EMEA AI Architect.',
  },
}
