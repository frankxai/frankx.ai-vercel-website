import type { Partner } from '../types'
import { crossLink } from '@/lib/cross-links'
import { MEET_AND_GROW_URL } from '@/lib/cta-links'

/**
 * NVIDIA — silicon-tier strategic alignment.
 *
 * Working reality is limited to public, non-confidential AI architecture
 * practice, GPU-aware reference patterns, and open-source agentic systems.
 *
 * Proposal tier is a peer-architect shape — not a claim of formal NVIDIA
 * partnership and not a claim of NVIDIA Inception membership. Inception is
 * the nominee pathway, stated as such.
 *
 * Named NVIDIA contacts and the Munich EBC briefing trail live in
 * `.frankx/private/partnerships/nvidia-brief.md` (gitignored). Never put
 * named individuals in this file.
 */
export const nvidia: Partner = {
  slug: 'nvidia',
  name: 'NVIDIA',
  shortName: 'NVIDIA',
  tier: 'silicon',
  status: 'strategic-alignment',
  lastUpdated: '2026-05-16',

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
      title: 'Oracle x NVIDIA 2025 co-architect history',
      body: 'Already co-architected joint EMEA go-to-market with NVIDIA inside the Oracle partnership. The collaboration muscle is built, the shape is known, and the second event is a lower-friction conversation than the first.',
      metric: 'On the record',
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
      title: 'Open-source body of work running on accelerated infrastructure',
      body: 'ACOS, SIS, and the AI Architect Academy curriculum are public, reviewable, and designed to run on accelerated infrastructure. The body of work is itself a reference deployment.',
      metric: '85+ repos',
    },
  ],

  programs: [
    {
      number: 1,
      name: 'NVIDIA Inception — Nominee Pathway Pursuit',
      cadence: 'Application in flight, milestone-tracked',
      whatItIs:
        'Active pursuit of the NVIDIA Inception nominee pathway as the operating-tier alignment vehicle. This is not a membership claim — it is the pathway, named honestly.',
      whatItProduces: [
        'Inception application package — company profile, technical narrative, accelerated-infrastructure usage',
        'Nominator conversation tracked through Munich EBC bridge',
        'Public status update once nominee status confirmed',
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
      title: 'Foundations',
      body: 'NVIDIA Inception nominee pathway application in flight. First joint EMEA event scoped on the calendar. Munich EBC briefing on the books.',
    },
    {
      month: 3,
      title: 'NIM reference architecture published',
      body: 'First NIM-pattern reference architecture published on /ai-architecture with Deploy-to-OCI-with-GPU CTAs. Munich EBC briefing delivered. Inception nominee status tracked publicly.',
    },
    {
      month: 6,
      title: 'Second event + content stream live',
      body: 'Second joint EMEA event delivered. Oracle x NVIDIA accelerator pack content stream live on /research with first two quarterly publications shipped. GPU-aware Academy module in pilot.',
    },
    {
      month: 12,
      title: 'Referenceable EMEA practice',
      body: 'NVIDIA-aligned EMEA AI CoE practice operating as a referenceable independent voice. Inception status earned or its successor stage in motion. Renewal conversation scoped at expanded EMEA reach.',
    },
  ],

  crossLinks: [
    crossLink(
      'ai-coe',
      'The AI CoE blueprint where the GPU-to-agent methodology lives in public — the substrate every NVIDIA-aligned conversation builds on.',
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
    'Not a Munich-resident relationship — operating from Amsterdam, travelling for EBC and EMEA events',
  ],

  cta: {
    label: 'Open the conversation',
    href: MEET_AND_GROW_URL,
  },

  programStatus: 'NVIDIA Inception — nominee pathway',

  alreadyShared: [
    'GPU-aware AI architecture material is being developed as public, non-confidential reference content.',
    'NIM and accelerated-infrastructure patterns are treated as public learning references for agent workloads.',
    'The briefing package should stand on public artifacts, not private relationship claims.',
    'GPU-to-agent CoE methodology productized inside the AI Architect Academy curriculum.',
    'Accelerated-infrastructure content can publish through /research once source material is verified.',
    'Public builder channels across the site, newsletter, GitHub, and LinkedIn are the distribution surface.',
  ],

  formalizationAsk:
    "What's left to formalize. The CoE methodology is productized and public. The conversation is Inception pathway clarity, possible briefing surfaces, event slots, and verified accelerator-infrastructure content sponsorship.",

  accent: 'tech',
  partnerLogoUrl: '/images/partnerships/logos/nvidia.svg',
  // Uses the site-level Open Graph fallback until a reviewed partnership asset exists.

  seo: {
    title: 'FrankX × NVIDIA — GPU-Aware AI CoE Practice | FrankX',
    description:
      'Co-architect of the Oracle × NVIDIA 2025 partner event. Munich EBC bridge, NIM hands-on practice, GPU-to-agent CoE methodology for the EMEA accelerator channel.',
  },
}
