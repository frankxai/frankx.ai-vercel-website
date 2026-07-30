import type { Partner } from '../types'
import { crossLink } from '@/lib/cross-links'
import { MEET_AND_GROW_URL } from '@/lib/cta-links'

/**
 * Google Cloud — independently authored opportunity brief. Public artifacts
 * are linked where available; tool use is not presented as a reciprocal
 * relationship.
 *
 * This is a public-only record of FrankX tool use and an independently
 * authored proposal. No application, reciprocal conversation, endorsement,
 * credits, or formal relationship is claimed.
 *
 * Content is sanitized. No named Google contacts, no pricing figures,
 * no co-marketing claims beyond "pursuing" language.
 */
export const google: Partner = {
  slug: 'google',
  name: 'Google Cloud',
  shortName: 'Google',
  tier: 'cloud',
  status: 'strategic-alignment',
  publicationBasis: 'independent-proposal',
  consentStatus: 'not-requested',
  privacyClassification: 'public-only',
  lastUpdated: '2026-07-30',

  title: 'Independent Gemini, ADK, and A2A opportunity brief',
  tagline:
    'Public learning surfaces today, with a bounded proposal for what a collaboration could test.',
  subTagline:
    'Frank uses Gemini and studies ADK and A2A in public learning material. This is an independent proposal, not a Google-authored or endorsed page.',

  contextWindow: `FrankX publishes independent learning pages and guides about Gemini, Google ADK, and the A2A protocol. The linked artifacts make that editorial and educational interest inspectable; they do not by themselves prove daily tool use, customer delivery, Google review, or partner status.

The possible alignment described here is a FrankX-authored proposal for education and reference architectures. Google has not reviewed or approved it, and FrankX does not claim an application, reciprocal conversation, credits, or a formal relationship.`,

  workingReality: [
    {
      label: 'Public Gemini learning surface',
      detail:
        'FrankX publishes an independently curated Gemini and Google AI learning portal. It is evidence of published coverage, not a Google collaboration or usage-volume claim.',
      evidence: {
        label: '/learn/gemini-mastery',
        href: '/learn/gemini-mastery',
      },
    },
    {
      label: 'Public agent-framework research',
      detail:
        'The research hub includes an independently authored comparison of agent frameworks. It offers context for a possible ADK learning lane without claiming production delivery.',
      evidence: {
        label: '/research/agent-frameworks',
        href: '/research/agent-frameworks',
      },
    },
    {
      label: 'Google path in workshop material',
      detail:
        'Build First AI Agent includes Google ADK and A2A as one possible implementation path. The public page is the evidence; no cohort outcome or hands-on delivery is claimed here.',
      evidence: {
        label: '/workshops/build-first-ai-agent',
        href: '/workshops/build-first-ai-agent',
      },
    },
    {
      label: 'Public A2A protocol guide',
      detail:
        'FrankX independently documents the Agent Card and A2A protocol on a public guide page.',
      evidence: {
        label: '/guides/agent-card-a2a-spec',
        href: '/guides/agent-card-a2a-spec',
      },
    },
    {
      label: 'Relationship status',
      detail:
        'Independent proposal only. No Google Cloud program application, attendee credits, reciprocal conversation, endorsement, or formal relationship is claimed.',
    },
  ],

  proofPoints: [
    {
      label: 'Gemini & Google AI Mastery — curated learning portal',
      href: '/learn/gemini-mastery',
    },
    {
      label: 'Agent Card / A2A protocol — public spec',
      href: '/guides/agent-card-a2a-spec',
    },
    {
      label: 'Build First AI Agent — workshop (Google branch)',
      href: '/workshops/build-first-ai-agent',
    },
    {
      label: 'AI Architect Academy — multi-cloud curriculum',
      href: 'https://github.com/frankxai/ai-architect-academy',
    },
    {
      label: 'ACOS — open agentic creator OS',
      href: 'https://github.com/frankxai/agentic-creator-os',
    },
    {
      label: 'Agent frameworks research brief',
      href: '/research/agent-frameworks',
    },
  ],

  proposalIntro:
    'What follows is a proposal — a specific shape this partnership could take if both sides see it. Five collaboration modes, designed to compound rather than substitute.',

  asymmetricValue: [
    {
      title: 'Inspectable Google AI learning surface',
      body: 'The Gemini portal, A2A guide, workshop page, and agent-framework research give a prospective collaborator specific public artifacts to review.',
      metric: 'Public learning artifacts',
    },
    {
      title: 'Workshop path ready for review',
      body: 'The public workshop material includes a Google path. Any stronger curriculum role, cohort, credits, or attribution would be a separate pilot decision.',
      metric: 'Proposed learning lane',
    },
    {
      title: 'Public A2A protocol documentation',
      body: 'The independently authored Agent Card and A2A guide is public and available for technical review.',
      metric: 'Public reference',
    },
    {
      title: 'Public builder distribution',
      body: 'FrankX publishes Gemini, ADK, A2A, and multi-cloud architecture material through the public site, GitHub, newsletter, and LinkedIn.',
      metric: 'Public channels',
    },
    {
      title: 'Public multi-model repositories',
      body: 'ACOS, SIS, and AI Architect Academy are public implementation and curriculum surfaces. This page does not claim that they are deployed on GCP.',
      metric: 'Public repositories',
    },
  ],

  programs: [
    {
      number: 1,
      name: 'Google Cloud ecosystem fit review',
      cadence: 'One-time, if mutually invited',
      whatItIs:
        'A proposed review of whether any Google Cloud ecosystem pathway fits the public workshop and curriculum work. No application or eligibility is assumed.',
      whatItProduces: [
        'A documented fit or no-fit decision',
        'A bounded scope for any next step',
        'A public status update only after both sides can verify it',
      ],
      pricingPosture:
        'Subject to the relevant program terms only if an application is invited and accepted.',
    },
    {
      number: 2,
      name: 'Workshop Attendee Credit Program',
      cadence: 'Cohort-aligned, quarterly',
      whatItIs:
        'If a workshop pilot is mutually approved, consider limited credits for participants who choose the Google path.',
      whatItProduces: [
        'A proposed, capped credit pack for one pilot',
        'A consent-aware measure of whether credits were useful',
        'A continue-or-close decision after the pilot',
      ],
      pricingPosture:
        'Conditional request; no current credit allocation or commercial agreement.',
    },
    {
      number: 3,
      name: 'A2A Protocol Content Stream',
      cadence: 'Continuous, quarterly deep-dive',
      whatItIs:
        'Expansion of /guides/agent-card-a2a-spec into a full content stream — protocol guide deep-dives, interop with Anthropic MCP and OpenAI tool use, and one quarterly /research piece on multi-cloud agent harnesses.',
      whatItProduces: [
        'Quarterly A2A protocol deep-dive on /guides',
        'One /research piece per quarter on multi-cloud agent harness patterns',
        'Co-branded LinkedIn distribution into the EMEA architect funnel',
      ],
      pricingPosture: 'Co-sponsored research track. Annual sponsorship shape.',
    },
    {
      number: 4,
      name: 'ADK Reference Architecture on /ai-architecture',
      cadence: 'Two reference architectures shipped per year',
      whatItIs:
        'Public reference architectures on /ai-architecture using Google ADK, A2A, Gemini, and Vertex — each with a Deploy-to-GCP CTA alongside the existing deploy surfaces.',
      whatItProduces: [
        'Two ADK-native reference architectures per year, public and reviewable',
        'Deploy-to-GCP CTA on each, with click-through attribution',
        'Quarterly review of consumption traceable from the architecture surface',
      ],
      pricingPosture:
        'Output-based — flat fee per published architecture plus attribution share on tracked Vertex consumption.',
    },
    {
      number: 5,
      name: 'Agent Framework Comparison Content',
      cadence: 'One canonical piece, refreshed semi-annually',
      whatItIs:
        'Continuous refresh of the agent-frameworks comparison content — multi-cloud, opinionated, ADK as the enterprise lane. The piece architects link to when they need a defensible framework choice.',
      whatItProduces: [
        'Canonical /research/agent-frameworks page maintained as the comparison reference',
        'Semi-annual refresh with new ADK / A2A capabilities',
        'EMEA architect-funnel distribution per refresh',
      ],
      pricingPosture: 'Annual content sponsorship.',
    },
  ],

  compoundingModel: [
    {
      month: 0,
      title: 'Independent proposal and public work separated',
      body: 'FrankX tool use, public A2A material, and possible future collaboration are labeled as distinct things.',
    },
    {
      month: 3,
      title: 'Possible learning pilot',
      body: 'If mutually approved, test one ADK or A2A learning module with explicit attribution and measurable outcomes.',
    },
    {
      month: 6,
      title: 'Possible reference architecture',
      body: 'If the pilot proves useful, publish one reviewed ADK reference architecture and decide separately whether a joint session adds value.',
    },
    {
      month: 12,
      title: 'Evidence-based continuation decision',
      body: 'Review real usage, learning outcomes, and editorial value before deciding whether any formal relationship makes sense.',
    },
  ],

  crossLinks: [
    crossLink(
      'learn-gemini',
      'Curated portal — 8 videos, 8-tool ecosystem grid (Gemini 3 Pro, Antigravity 2.0, Nano Banana, Veo, Imagen, NotebookLM, AI Studio), Google I/O 2026 timeline, 10-Q FAQ. The public-facing front door to the Gemini stack on frankx.ai.',
      'Gemini & Google AI Mastery portal'
    ),
    crossLink(
      'connect',
      'The public contact surface for discussing the independently authored proposal.',
      'Connect with Frank'
    ),
    crossLink(
      'ai-architect-academy',
      'Curriculum where the Google branch (ADK + A2A) is taught. The substrate for the workshop attendee-credit channel.',
      'Where Gemini + ADK is taught'
    ),
    crossLink(
      'workshops',
      'Calendar surface for Build First AI Agent cohorts. The Google enterprise lane is where attendee credits land.',
      'Build First AI Agent — Google lane'
    ),
    crossLink(
      'ai-architecture',
      'Where ADK + Gemini + Vertex reference architectures publish with Deploy-to-GCP CTAs.',
      'ADK reference architectures + Deploy-to-GCP CTAs'
    ),
    crossLink(
      'research',
      'Active pillar — multi-cloud agent harnesses. Open for co-sponsored Google research stream.',
      'Multi-cloud agent harness research pillar'
    ),
    crossLink(
      'blog',
      'Where A2A protocol deep-dives and Gemini multimodal pattern essays distribute into the EMEA architect funnel.',
      'A2A and Gemini distribution surface'
    ),
  ],

  whatThisIsNot: [
    'Not a Google-employee relationship',
    'Not a Google-Cloud-only practice — the work is explicitly multi-cloud, with GCP as a first-class lane alongside OCI, AWS, and Azure',
    'Not deep BigQuery or Vertex specialist consulting work',
    'Not exclusive of OpenAI, Anthropic, or Oracle — the multi-cloud stance is the point',
    'Not a deck-building consulting role — the deliverables are workshops, reference architectures, and published guides',
  ],

  cta: {
    label: 'Open the conversation',
    href: MEET_AND_GROW_URL,
  },

  programStatus: 'Independent proposal — no formal Google Cloud relationship claimed',

  alreadyShared: [
    'FrankX publishes an independently curated Gemini and Google AI learning portal.',
    'Build First AI Agent includes Google ADK and A2A as one possible path.',
    'The Agent Card and A2A protocol guide is public and independently authored.',
    'The research hub includes a public agent-framework comparison.',
    'No daily-use volume, customer delivery, application, credits, endorsement, or Google involvement is claimed.',
  ],

  formalizationAsk:
    'If this independent proposal is relevant, the next step is a scoped fit conversation. Until that happens, no application, credits, endorsement, shared roadmap, or formal relationship is claimed.',

  accent: 'tech',
  partnerLogoUrl: '/images/partnerships/logos/google.svg',
  // ogImagePath: '/images/partnerships/google-og.png', // TODO: generate, falls back to site default

  seo: {
    title: 'FrankX on Google Cloud — Independent Gemini + ADK Brief',
    description:
      'How FrankX uses Gemini, ADK, and A2A, plus an independently authored alignment proposal. No Google Cloud partnership or endorsement is implied.',
  },
}
