import type { Partner } from '../types'
import { crossLink } from '@/lib/cross-links'
import { MEET_AND_GROW_URL } from '@/lib/cta-links'

/**
 * NVIDIA — silicon-tier strategic alignment.
 *
 * Working reality is limited to public, non-confidential AI architecture
 * practice, GPU-aware reference patterns, and open-source agentic systems.
 *
 * The proposal is independently authored from public-only evidence. No
 * Inception application, reciprocal conversation, event, endorsement, or
 * formal NVIDIA relationship is claimed.
 */
export const nvidia: Partner = {
  slug: 'nvidia',
  name: 'NVIDIA',
  shortName: 'NVIDIA',
  tier: 'silicon',
  status: 'strategic-alignment',
  publicationBasis: 'independent-proposal',
  consentStatus: 'not-requested',
  privacyClassification: 'public-only',
  lastUpdated: '2026-07-30',

  title: 'AI Architect — GPU-aware AI CoE practice',
  tagline:
    'Silicon-aware AI CoE methodology for the EMEA accelerator wave.',
  subTagline:
    'Public, independent alignment proposal for GPU-aware agent workloads, creator infrastructure, and enterprise AI education.',

  contextWindow: `GPU and accelerator infrastructure is the silicon layer of modern AI architecture. NIM, NeMo, and the NVIDIA AI Enterprise stack are useful public reference points for builders who need to connect model infrastructure, agent workloads, and deployment discipline.

The public proof is the open body of work: AI architecture writing, agentic creator systems, and reference implementations that translate cloud and model infrastructure into working creator/operator patterns.

The strategic alignment is about GPU-aware agent systems and independent education for builders who want to understand where accelerated infrastructure changes the operating model.`,

  workingReality: [
    {
      label: 'GPU-aware AI architecture practice',
      detail:
        'Public architecture work focused on how accelerated compute, model serving, and agent workloads fit into practical AI systems.',
      evidence: {
        label: 'AI Architecture hub',
        href: '/ai-architecture',
      },
    },
    {
      label: 'NIM and agent workload learning track',
      detail:
        'NIM and related NVIDIA tooling are treated as public infrastructure references for understanding the bridge from GPU services to agentic applications.',
    },
    {
      label: 'AI CoE methodology — GPU infrastructure to agent workloads',
      detail:
        'The CoE methodology bridges accelerated compute and agent workloads cleanly. GPU-aware reference architectures, NIM-pattern deployment shapes, agent harnesses that respect the silicon. The bridge is the practice.',
    },
    {
      label: 'Independent education and reference implementation',
      detail:
        'FrankX turns public architecture knowledge into explainers, workshops, and open-source patterns that builders can inspect and adapt.',
    },
  ],

  proofPoints: [
    {
      label: 'AI Architecture hub',
      href: '/ai-architecture',
    },
    {
      label: 'ACOS — open agentic creator OS',
      href: 'https://github.com/frankxai/agentic-creator-os',
    },
    {
      label: 'SIS — Starlight Intelligence System (substrate + 31-tool MCP)',
      href: 'https://github.com/frankxai/starlight-intelligence-system',
    },
    {
      label: 'AI Architect Academy — multi-cloud curriculum',
      href: 'https://github.com/frankxai/ai-architect-academy',
    },
    {
      label: 'AI Architecture — GPU-aware reference architectures',
      href: '/ai-architecture',
    },
    {
      label: 'Workshops calendar — EMEA delivery cadence',
      href: '/workshops',
    },
  ],

  proposalIntro:
    'What follows is a proposal — a specific peer-architect shape this strategic alignment could take if NVIDIA sees it. Not a deck, not a vendor pitch. The five collaboration shapes below stack; alignments rarely pick just one.',

  asymmetricValue: [
    {
      title: 'Enterprise accelerator architecture experience',
      body: 'Frank brings prior enterprise architecture experience and discusses only public, non-confidential accelerator patterns here. No NVIDIA relationship is inferred from that experience.',
      metric: 'Public-only',
    },
    {
      title: 'Briefing-ready architecture material',
      body: 'GPU-aware reference architecture material can be packaged for a serious briefing without relying on private relationship claims.',
      metric: 'Briefing-ready',
    },
    {
      title: 'GPU-to-agent CoE methodology',
      body: 'The AI CoE practice bridges accelerated compute and agent workloads as one discipline. NIM-pattern reference architectures, GPU-aware agent harnesses, and the curriculum that teaches the bridge.',
      metric: 'Practice',
    },
    {
      title: 'Public builder distribution',
      body: 'FrankX publishes AI CoE patterns, GPU-aware architecture notes, and agent workflows through the public site, GitHub, newsletter, and LinkedIn.',
      metric: 'Public channels',
    },
    {
      title: 'Open-source body of agentic work',
      body: 'ACOS, SIS, and the AI Architect Academy curriculum are public and reviewable. They are not presented as NVIDIA deployments or endorsements.',
      metric: 'Open source',
    },
  ],

  programs: [
    {
      number: 1,
      name: 'Applicable ecosystem pathway review',
      cadence: 'One-time fit review',
      whatItIs:
        'If there is mutual interest, identify an appropriate NVIDIA ecosystem pathway without presuming eligibility, nomination, timing, or acceptance.',
      whatItProduces: [
        'A confirmed fit or no-fit decision',
        'A written scope for any next step',
        'A public status update only after both sides can verify it',
      ],
      pricingPosture: 'Pathway, not pricing. Status reported transparently.',
    },
    {
      number: 2,
      name: 'Joint EMEA Events',
      cadence: 'Two to four per year',
      whatItIs:
        'Co-delivered keynotes, workshops, and partner-facing sessions at DOAG, CloudFest, Oracle CloudWorld Tour, and NVIDIA partner-summit moments across EMEA.',
      whatItProduces: [
        'Day-of delivery — keynote, workshop, or partner session',
        'Supporting content stream (blog + LinkedIn + short video)',
        'Post-event partner enablement asset reusable by NVIDIA channel partners',
      ],
      pricingPosture: 'Per-event scope. Day rate plus travel. Co-marketing where appropriate.',
    },
    {
      number: 3,
      name: 'Oracle x NVIDIA AI Accelerator Pack — Content Stream',
      cadence: 'Quarterly publications on /research',
      whatItIs:
        'A standing content stream on the FrankX Research Hub focused on the Oracle x NVIDIA AI accelerator pack and adjacent NIM-pattern deployments — the kind of partner-facing material EMEA resellers actually use.',
      whatItProduces: [
        'One deep research piece per quarter, NVIDIA-aware',
        'Reference architecture annotations specific to the accelerator pack',
        'Partner-enablement summary suitable for channel reuse',
      ],
      pricingPosture: 'Annual sponsorship posture, or per-publication scope.',
    },
    {
      number: 4,
      name: 'AI Architect Academy — GPU-Aware Curriculum Module',
      cadence: 'Curriculum addition, evergreen',
      whatItIs:
        'A dedicated GPU-aware module inside the AI Architect Academy curriculum — NIM patterns, accelerated agent workloads, multi-cloud GPU reference architectures — distributable through NVIDIA-adjacent channels.',
      whatItProduces: [
        'Module materials — slides, exercises, evaluation rubric',
        'Facilitator brief for partner delivery',
        'Distribution-ready package for NVIDIA partner ecosystem',
      ],
      pricingPosture: 'License plus per-delivery support, or co-developed under sponsorship.',
    },
    {
      number: 5,
      name: 'NIM-Pattern Reference Architectures — Deploy-to-OCI-with-GPU CTAs',
      cadence: 'Continuous, reviewed quarterly',
      whatItIs:
        'A library of NIM-pattern reference architectures on /ai-architecture with Deploy-to-OCI-with-GPU CTAs alongside other deployment surfaces. Tracked attribution to accelerated-infrastructure consumption.',
      whatItProduces: [
        'Reference architectures with NIM at the centre, OCI GPU deploy paths surfaced',
        'Quarterly attribution and engagement report',
        'Living library that compounds across partners',
      ],
      pricingPosture: 'Co-marketing posture, with revenue share or flat quarterly scope where appropriate.',
    },
  ],

  compoundingModel: [
    {
      month: 0,
      title: 'Independent proposal published',
      body: 'Public architecture work and possible future collaboration are labeled as distinct things.',
    },
    {
      month: 3,
      title: 'Possible reference architecture pilot',
      body: 'If mutually approved, test one sourced NIM-pattern architecture with a working implementation and explicit attribution.',
    },
    {
      month: 6,
      title: 'Possible education pilot',
      body: 'If the architecture proves useful, test a small education or research module before discussing a broader collaboration.',
    },
    {
      month: 12,
      title: 'Evidence-based continuation decision',
      body: 'Review real implementation use, learning outcomes, and editorial value before deciding whether any formal relationship makes sense.',
    },
  ],

  crossLinks: [
    crossLink(
      'ai-coe',
      'The public AI CoE blueprint where FrankX documents GPU-to-agent methodology.',
      'The methodology, in public'
    ),
    crossLink(
      'ai-architecture',
      'Where NIM-pattern reference architectures land with Deploy-to-OCI-with-GPU CTAs surfaced alongside other deployment paths.',
      'GPU-aware reference architectures'
    ),
    crossLink(
      'research',
      'Active research surface for the Oracle x NVIDIA AI accelerator pack content stream and adjacent NIM-pattern deep-dives.',
      'Research Hub — accelerator pack stream'
    ),
    crossLink(
      'workshops',
      'EMEA workshop calendar where joint NVIDIA-aligned sessions appear once scheduled.',
      'Workshops and joint events'
    ),
    crossLink(
      'ai-architect-academy',
      'Curriculum substrate for the GPU-aware module distributable through the NVIDIA partner ecosystem.',
      'Academy curriculum'
    ),
  ],

  whatThisIsNot: [
    'Not an NVIDIA-employee relationship or a claim of formal NVIDIA partnership',
    'Not a hardware reseller pitch or a GPU-resale play',
    'Not deep CUDA, kernel-engineering, or low-level GPU-systems specialist work',
    'Not exclusive of AMD, Intel, or other accelerators where the workload calls for it',
    'Not evidence of an Inception application, briefing, event, or reciprocal conversation',
  ],

  cta: {
    label: 'Open the conversation',
    href: MEET_AND_GROW_URL,
  },

  programStatus: 'Independent proposal — no formal NVIDIA relationship claimed',

  alreadyShared: [
    'GPU-aware AI architecture material is being developed as public, non-confidential reference content.',
    'NIM and accelerated-infrastructure patterns are treated as public learning references for agent workloads.',
    'The briefing package should stand on public artifacts, not private relationship claims.',
    'GPU-to-agent CoE methodology productized inside the AI Architect Academy curriculum.',
    'Accelerated-infrastructure content can publish through /research once source material is verified.',
    'Public builder channels across the site, newsletter, GitHub, and LinkedIn are the distribution surface.',
  ],

  formalizationAsk:
    'If this independent proposal is relevant, the next step is a scoped fit conversation. Until that happens, no application, briefing, event, endorsement, or formal relationship is claimed.',

  accent: 'tech',
  partnerLogoUrl: '/images/partnerships/logos/nvidia.svg',
  // ogImagePath: '/images/partnerships/nvidia-og.png', // TODO: generate, falls back to site default

  seo: {
    title: 'FrankX on NVIDIA — Independent GPU-Aware AI CoE Brief',
    description:
      'Frank Riemer’s independent GPU-aware AI CoE brief, based on prior enterprise work and public NVIDIA technology. No formal NVIDIA partnership or endorsement is claimed.',
  },
}
