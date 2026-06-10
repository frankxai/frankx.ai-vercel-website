import type { Partner } from './types'
import { crossLink } from '@/lib/cross-links'
import { MEET_AND_GROW_URL } from '@/lib/cta-links'

/**
 * Arrow Electronics ECS Germany — first instance of the partnership system.
 *
 * Content is sanitized. Named individuals + Oracle transition timing live in
 * `.frankx/private/partnerships/arrow-brief.md` (gitignored). Never put
 * named contacts in this file.
 */
export const arrow: Partner = {
  slug: 'arrow',
  name: 'Arrow Electronics ECS',
  shortName: 'Arrow',
  tier: 'distribution',
  status: 'active',
  lastUpdated: '2026-05-16',

  title: 'AI Architect — EMEA AI CoE Partner',
  tagline:
    'A coding-agent-native AI CoE practice for EMEA distribution.',
  subTagline:
    'Arrow ECS is the 2025 Oracle Global Distributor of the Year and Oracle Global Cloud Partner. The Global AI Accelerator program launched September 2025.',

  contextWindow: `Arrow ECS won the 2025 Oracle Global Distributor Partner Award and Oracle Global Cloud Partner Award. The Global AI Accelerator program launched September 2025. The Oracle x NVIDIA AI accelerator pack wave is moving through the EMEA channel. Arrow's German leadership anchors the Oracle channel with three decades of relationships and an HPC, GPU, and AI infrastructure narrative already in market.

The gap I see: a coding-agent-native AI CoE methodology that lets Arrow's solution architects and partner resellers compress the reference-architecture and PoC build cycle from weeks to days using Claude Code, Codex, Gemini, and the agentic patterns now standard at frontier AI labs.

That is the layer I bring. Oracle EMEA AI CoE pedigree, AI Architect Academy curriculum, a working coding-agent toolkit (oci-ai-architect Claude Code skill pack), 7,000+ AI / cloud / founder audience, and the NVIDIA Munich EBC bridge.`,

  workingReality: [
    {
      label: 'Oracle EMEA AI CoE practice',
      detail:
        'Strategic architect role at the Oracle EMEA AI Center of Excellence — building CoE blueprints used by Oracle solution architects across the region. The methodology travels.',
    },
    {
      label: 'Open coding-agent toolkit',
      detail:
        'Four public repositories — agentic-creator-os (ACOS), starlight-intelligence-system (SIS), ai-architect-academy curriculum, and an OCI-specific Claude Code skill pack — that together carry the practice.',
      evidence: {
        label: 'github.com/frankxai',
        href: 'https://github.com/frankxai',
      },
    },
    {
      label: 'NVIDIA Munich EBC bridge',
      detail:
        'NIM hands-on exposure and Munich EBC contacts from co-architecting the Oracle x NVIDIA partner event 2025. Real signal, not a logo on a slide.',
    },
    {
      label: 'Audience funnel',
      detail:
        'Around 7,000 followers across Oracle, NVIDIA, Anthropic, and founder networks. Posts about AI CoE patterns regularly land 100+ engagements among that audience.',
    },
  ],

  proofPoints: [
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
      label: 'OCI Claude Code skill pack',
      href: 'https://github.com/oci-ai-architects/claude-code-oci-ai-architect-skills',
    },
    {
      label: 'Top LinkedIn posts (highest-engagement)',
      href: '#linkedin-todo',
      metric: 'Three URLs — Frank fills',
    },
    {
      label: 'Oracle x NVIDIA partner event 2025',
      href: '#nvidia-event-todo',
      metric: 'Reference URL — Frank fills',
    },
  ],

  proposalIntro:
    'What follows is a proposal — a specific shape this partnership could take if both sides see it. Not a deck. The six operating modes below stack; partnerships rarely pick just one.',

  asymmetricValue: [
    {
      title: 'Coding-Agent AI CoE practice',
      body: 'Proven inside Oracle EMEA, productized as the AI Architect Academy curriculum and the oci-ai-architect Claude Code skill pack. The methodology travels with the toolkit.',
      metric: 'Practice',
    },
    {
      title: 'Solution Architect coaching track record',
      body: 'Coached Oracle solution architects through agent-native workflows. Cohort testimonial base is available on request through the conversation.',
      metric: 'Coached cohort',
    },
    {
      title: 'Audience funnel',
      body: 'Followers across Oracle, NVIDIA, Anthropic, and founder networks. Posts about coding-agent AI CoE patterns regularly clear 100+ engagements.',
      metric: '7,000+ followers',
    },
    {
      title: 'NVIDIA bridge',
      body: 'NIM hands-on exposure, Munich EBC contacts, and Oracle x NVIDIA AI accelerator pack expertise from the CoE work. The bridge is warm.',
      metric: 'EBC access',
    },
    {
      title: 'Live agentic body of work',
      body: 'Open architecture (ACOS) and a 31-tool MCP server (SIS) including MCP-to-Oracle-Autonomous-Database connectivity. Public, reviewable, running.',
      metric: '85+ repos / 31 tools',
    },
  ],

  programs: [
    {
      number: 1,
      name: 'Coding-Agent AI CoE Foundation',
      cadence: '3-month, fixed-scope',
      whatItIs:
        "Design and stand up Arrow's internal AI CoE on coding-agent foundations.",
      whatItProduces: [
        'Arrow AI CoE architecture document',
        'Claude Code / Codex / Gemini toolkit deployed for Arrow stack with custom skills and agents',
        'Two reference architectures published',
        'Cohort of 6 to 10 solution architects coached through certification',
      ],
      pricingPosture: 'Fixed-price program, milestone-paid.',
    },
    {
      number: 2,
      name: 'Innovation Retainer',
      cadence: 'Monthly, 12-month',
      whatItIs:
        'Ongoing methodology coaching, partner-facing content, architect office hours, strategic continuity.',
      whatItProduces: [
        'One partner workshop per month',
        'Four co-branded LinkedIn posts per quarter',
        'One architecture demo per month with ArrowSphere CTA',
        'Two strategy calls per month with the program owner',
        "Async coaching channel for Arrow's lead solution architects",
      ],
      pricingPosture: 'Fixed monthly bundle. Output-based, not hours-based.',
    },
    {
      number: 3,
      name: 'Event-Led Visibility',
      cadence: 'Per event, capped at 2 per month',
      whatItIs:
        'Keynotes, workshops, and partner-facing sessions at DOAG, Arrow Forum, CloudFest, NVIDIA-themed events.',
      whatItProduces: [
        'Day-of delivery',
        'Supporting content (blog + LinkedIn + short)',
        'Post-event partner enablement asset',
      ],
      pricingPosture: 'Day rate plus travel.',
    },
    {
      number: 4,
      name: 'Audience Funnel Partnership',
      cadence: 'Continuous, reviewed quarterly',
      whatItIs:
        'Architecture demos on /ai-architecture with Deploy-via-ArrowSphere CTAs alongside other deployment surfaces. Tracked attribution to OCI / ArrowSphere consumption.',
      whatItProduces: [
        'New OCI consumption pipeline traceable to FrankX-published architectures',
        'Quarterly attribution report',
      ],
      pricingPosture:
        'Revenue share on tracked consumption, or quarterly flat fee.',
    },
    {
      number: 5,
      name: 'Workshop-in-a-Box',
      cadence: 'License + delivery',
      whatItIs:
        'White-label-ready partner workshop kit derived from AI Architect Academy curriculum.',
      whatItProduces: [
        'Workshop materials Arrow can run with its own facilitators between Frank-led sessions',
        'Facilitator brief, slides, exercises, evaluation rubric',
      ],
      pricingPosture: 'License fee plus per-delivery support.',
    },
    {
      number: 6,
      name: 'Research Hub Co-Sponsorship',
      cadence: 'Annual track, quarterly publications',
      whatItIs:
        'Co-sponsored research stream on /research — Coding-Agent AI on Oracle Cloud, Multi-Cloud Agent Harnesses, MCP for Cloud Orchestration.',
      whatItProduces: [
        'One deep research piece per quarter, co-branded',
        'Arrow first publication rights',
      ],
      pricingPosture: 'Annual sponsorship.',
    },
  ],

  compoundingModel: [
    {
      month: 0,
      title: 'Foundations',
      body: 'AI CoE architecture defined. Coding-agent toolkit deployed. First three solution architects coached through onboarding.',
    },
    {
      month: 3,
      title: 'First publications',
      body: 'Two reference architectures published with ArrowSphere CTAs. First partner workshop delivered. Audience funnel live with tracked attribution.',
    },
    {
      month: 6,
      title: 'Cohort certified',
      body: 'Solution architect cohort certified. Three partner workshops shipped. First traceable OCI consumption from the funnel. Joint NVIDIA-themed event.',
    },
    {
      month: 12,
      title: 'Practice mature',
      body: 'Arrow Germany operating as the coding-agent-native AI CoE practice in EMEA distribution. Renewal conversation at expanded EMEA scope.',
    },
  ],

  crossLinks: [
    crossLink(
      'ai-coe',
      "Where Arrow's Foundation program builds from — the AI CoE blueprint in public.",
      'The methodology, in public'
    ),
    crossLink(
      'ai-architecture',
      'Where the ArrowSphere Deploy CTA lives once the deploy mapping is agreed.',
      'Reference architectures with multi-cloud Deploy CTAs'
    ),
    crossLink(
      'ai-architect-academy',
      'Curriculum the solution architect cohort runs through. Substrate for Workshop-in-a-Box.',
      'The methodology, productized'
    ),
    crossLink(
      'research',
      'Three active pillars open for co-sponsorship: Coding-Agent AI on Oracle Cloud, Multi-Cloud Agent Harnesses, MCP for Cloud Orchestration.',
      'Active research pillars open for co-sponsorship'
    ),
    crossLink(
      'workshops',
      'Calendar surface where Arrow-led workshops appear once delivered.',
      'Past and upcoming partner workshops'
    ),
  ],

  whatThisIsNot: [
    'Production implementation services or on-call support',
    'Hours-for-money trainer engagement',
    'Employee-flavored or exclusive relationship',
    "Replacement for Arrow's existing solution architect bench. The work is alongside, not instead.",
    'Deep OCI security or networking specialist work',
  ],

  cta: {
    label: 'Book Meet & Grow with Frank',
    href: MEET_AND_GROW_URL,
  },

  accent: 'tech',
  partnerLogoUrl: '/images/partnerships/logos/arrow.svg',
  ogImagePath: '/images/partnerships/arrow-og.png',
  visualSummaryUrl: '/images/partnerships/arrow-compounding-loop.svg',
  visualSummaryAlt:
    'Twelve-month compounding loop showing the FrankX coding-agent AI CoE practice with Arrow ECS — Month 0 foundations, Month 3 first publications, Month 6 cohort certified, Month 12 practice mature.',

  seo: {
    title: 'FrankX × Arrow Electronics ECS — Coding-Agent AI CoE Partnership',
    description:
      "A coding-agent-native AI CoE practice for EMEA distribution. How I'd build with Arrow ECS — methodology, toolkit, audience funnel, NVIDIA bridge.",
  },
}
