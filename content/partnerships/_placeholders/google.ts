import type { Partner } from '../types'
import { crossLink } from '@/lib/cross-links'
import { MEET_AND_GROW_URL } from '@/lib/cta-links'

/**
 * Google Cloud — strategic-alignment tier. Gemini in daily multimodal
 * delivery; ADK + A2A protocol carry the enterprise lane of the Build
 * First AI Agent workshop and the Starlight Agent Lab three-lane portfolio.
 *
 * Google Cloud Partner Advantage is the pursued shape — attendee credits
 * for the workshop cohort, multi-cloud agent harness research, and an
 * ADK reference architecture surface on /ai-architecture.
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
  lastUpdated: '2026-06-10',

  title: 'AI Architect — Gemini + ADK enterprise AI CoE practice',
  tagline:
    'Gemini and the Agent Development Kit, taught in the workshop and used in real delivery.',
  subTagline:
    'Gemini already in daily multimodal delivery. Google ADK + A2A protocol already in the workshop enterprise lane. The conversation is Cloud Partner Advantage entry + workshop credits.',

  contextWindow: `Gemini is part of my daily multimodal delivery — text (Gemini 3 Pro for long-context grounding), image (Nano Banana 2 / Imagen via Higgsfield MCP), and video (Veo) all sit inside the working set alongside Claude and the OpenAI stack. Antigravity is the multi-model agentic dev surface where Gemini 3 Pro and Claude Sonnet refactor side-by-side — multi-model parallel comparison as daily practice, not benchmark theater. The Google Agent Development Kit and the A2A protocol are not a slide — they are the enterprise lane of the Build First AI Agent workshop and the explicit enterprise lane of the Starlight Agent Lab three-lane portfolio (Vercel AI SDK / Claude Agent SDK / Google ADK).

The strategic alignment here is about a Google-native AI CoE practice with workshop and curriculum distribution. Pursuing Google Cloud Partner Advantage status. The currency that matters more than commission is attendee credits for the workshop cohort and reference-architecture surfaces with Deploy-to-GCP CTAs. EMEA AI Architect audience already funnels into the topic.`,

  workingReality: [
    {
      label: 'Gemini in daily multimodal delivery',
      detail:
        'Gemini 3 Pro, Nano Banana 2, Veo, and Imagen sit inside the working set used for daily multimodal output — research, image (via Higgsfield MCP), video, and long-context code. Not a benchmark exercise. The daily-use stack.',
    },
    {
      label: 'Antigravity for multi-model agentic dev',
      detail:
        'Antigravity is where I run multi-model parallel refactors — Gemini 3 Pro and Claude Sonnet side-by-side on the same task, pick the best, merge or compose. Multi-model comparison as daily practice. Native browser pane and Vercel deploy integration round it out.',
    },
    {
      label: 'ADK + A2A in the Build First AI Agent workshop',
      detail:
        'The Google branch — Agent Development Kit and the Agent-to-Agent protocol — is one of the enterprise tracks taught in the workshop. Cohort gets hands-on ADK and Agent Cards, not framework theater.',
      evidence: {
        label: '/workshops/build-first-ai-agent',
        href: '/workshops/build-first-ai-agent',
      },
    },
    {
      label: 'Public A2A protocol guide',
      detail:
        'Agent Card / A2A protocol specification documented end-to-end on /guides/agent-card-a2a-spec — written from hands-on use, with the wire-level detail an enterprise architect needs.',
      evidence: {
        label: '/guides/agent-card-a2a-spec',
        href: '/guides/agent-card-a2a-spec',
      },
    },
    {
      label: 'Starlight Agent Lab enterprise lane = ADK',
      detail:
        'The three-lane portfolio explicitly positions Google ADK as the enterprise lane alongside Vercel AI SDK (web) and Claude Agent SDK (reasoning). Multi-cloud by design, ADK by enterprise default.',
    },
    {
      label: 'Google Cloud Partner Advantage — pursuit underway',
      detail:
        'Pursuing Google Cloud Partner Advantage status. The attendee-credit channel for the workshop cohort is the higher-value mechanic — credits convert to durable Gemini and Vertex usage across the EMEA architect funnel.',
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
      title: 'Gemini + Antigravity + ADK + A2A native operator',
      body: 'Gemini 3 Pro in daily multimodal delivery, Antigravity as the daily multi-model agentic dev surface, ADK + A2A in the workshop enterprise lane, and a public A2A protocol guide on /guides. Not a tourist — an operator with the full Google AI stack in hand.',
      metric: 'Native operator',
    },
    {
      title: 'Workshop enterprise lane biased Google ADK',
      body: 'The Build First AI Agent workshop teaches three enterprise frameworks. ADK is the one I personally architect with in CoE delivery, which makes it the lane the cohort gets pulled toward.',
      metric: 'Enterprise lane',
    },
    {
      title: 'Public A2A protocol documentation',
      body: 'Wire-level Agent Card / A2A specification published on /guides/agent-card-a2a-spec. The kind of reference enterprise architects send to their teams when they need to ship.',
      metric: 'Public reference',
    },
    {
      title: 'EMEA AI Architect audience funnel',
      body: 'Around 7,000 followers across Oracle, NVIDIA, Anthropic, and founder networks. EMEA-weighted, architect-weighted. The Google Cloud Partner Advantage credit channel meets a real audience.',
      metric: '7,000+ followers',
    },
    {
      title: 'Open-source body of work running multi-cloud incl. GCP',
      body: 'ACOS, SIS, the AI Architect Academy, and the OCI Claude Code skill pack — all public, all designed cloud-agnostic with GCP as a first-class deploy target. The work is reviewable, not pitched.',
      metric: '85+ public repos',
    },
  ],

  programs: [
    {
      number: 1,
      name: 'Google Cloud Partner Advantage pursuit',
      cadence: 'M0 submission, ongoing program work',
      whatItIs:
        'Active pursuit of Google Cloud Partner Advantage status with workshop-and-curriculum positioning rather than reseller positioning.',
      whatItProduces: [
        'Partner Advantage submission package aligned to the workshop and CoE practice',
        'Sponsored partner profile with Gemini + ADK specialization',
        'Quarterly partner-program review aligned to attendee-credit utilization',
      ],
      pricingPosture:
        'Program-track, not transactional. Attendee credits as the higher-value currency over commission.',
    },
    {
      number: 2,
      name: 'Workshop Attendee Credit Program',
      cadence: 'Cohort-aligned, quarterly',
      whatItIs:
        'Google Cloud credits distributed to Build First AI Agent workshop attendees taking the Google enterprise lane, so ADK and A2A learning continues into real Gemini and Vertex usage post-workshop.',
      whatItProduces: [
        'Credit pack per workshop cohort, sized to the Google-lane track',
        'Post-workshop credit-utilization dashboard',
        'Quarterly attribution report — credits to active Gemini / Vertex projects',
      ],
      pricingPosture:
        'Credit-pack pilot, no markup taken. Attribution-tracked.',
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
      title: 'Partner Advantage submission + credit pilot designed',
      body: 'Google Cloud Partner Advantage submission filed. Workshop attendee-credit pilot designed and aligned to the next two cohorts. A2A protocol guide indexed on /guides as the public spine.',
    },
    {
      month: 3,
      title: 'Attendee credits live + A2A deep-dive published',
      body: 'First workshop cohort receives Google Cloud credits. First A2A protocol deep-dive published on /guides. Multi-cloud agent harness research piece live on /research. Credit-utilization attribution tracking running.',
    },
    {
      month: 6,
      title: 'ADK reference architecture + joint webinar',
      body: 'First Google ADK reference architecture published on /ai-architecture with Deploy-to-GCP CTA. Joint webinar — ADK + A2A enterprise patterns — delivered into the EMEA architect funnel. Second cohort of workshop attendees credited.',
    },
    {
      month: 12,
      title: 'Referenceable Gemini-native AI CoE practice in EMEA',
      body: 'Gemini + ADK AI CoE practice referenceable in the EMEA partner network. Two ADK reference architectures shipped, A2A content stream operating, four cohorts of workshop attendees on Google Cloud credits, agent-frameworks reference page refreshed. Renewal conversation at expanded scope.',
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
      'In-person + QR landing surface. Live event ribbon shows Google AI Live Madrid 2026-05-28 → 30 and South Summit Madrid 2026-06-02 → 06 — the calendar the partnership conversation overlaps.',
      'Connect — Google AI Live Madrid presence'
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

  programStatus: 'Google Cloud Partner Advantage — pursuit underway',

  alreadyShared: [
    'Gemini 3 Pro in daily multimodal delivery — Veo, Nano Banana 2, and Imagen evaluations sit inside the working set.',
    'Antigravity in daily use — multi-model parallel agentic dev (Gemini 3 Pro and Claude Sonnet side-by-side) as a working pattern, not a one-off experiment.',
    'Google ADK + A2A protocol in the Build First AI Agent workshop enterprise lane, taught hands-on.',
    'Public /guides/agent-card-a2a-spec documentation written from operator-grade use of the protocol.',
    'Starlight Agent Lab three-lane portfolio explicitly positions ADK as the enterprise lane alongside Vercel AI SDK and Claude Agent SDK.',
    'Multi-cloud AI CoE methodology with Google as a first-class enterprise lane across reference architectures.',
    '7,000+ EMEA AI architect audience overlapping the GCP developer community across Oracle, NVIDIA, Anthropic, and founder networks.',
  ],

  formalizationAsk:
    "What's left to formalize. Gemini is daily delivery. Antigravity is the daily multi-model agentic dev surface. ADK is the enterprise lane in the workshop. A2A protocol is publicly documented. The conversation is closing Cloud Partner Advantage, workshop attendee credits for Build First AI Agent (Google branch), DevRel touchpoint with the ADK and Antigravity teams, and a joint slot at Google Cloud Next EMEA.",

  accent: 'tech',
  partnerLogoUrl: '/images/partnerships/logos/google.svg',
  // ogImagePath: '/images/partnerships/google-og.png', // TODO: generate, falls back to site default

  seo: {
    title: 'FrankX × Google Cloud — Gemini + ADK AI CoE Practice | FrankX',
    description:
      'Gemini in daily multimodal delivery, ADK and A2A protocol in the workshop and CoE practice. Pursuing Google Cloud Partner Advantage across EMEA.',
  },
}
