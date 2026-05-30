import type { Partner } from './types'
import { crossLink } from '@/lib/cross-links'
import { MEET_AND_GROW_URL } from '@/lib/cta-links'

/**
 * Kyndryl — global systems integrator / managed-services partner.
 *
 * Content is sanitized. Named individuals and any private engagement timing
 * live in `.frankx/private/partnerships/kyndryl-brief.md` (gitignored). Never
 * put named contacts or pricing brackets in this file. All Kyndryl facts here
 * are public and citable.
 */
export const kyndryl: Partner = {
  slug: 'kyndryl',
  name: 'Kyndryl',
  shortName: 'Kyndryl',
  tier: 'services',
  status: 'active',

  title: 'Agentic AI Architecture & Enablement Partner',
  tagline:
    'A coding-agent-native agentic AI practice that compresses how Kyndryl Consult designs, demonstrates, and ships enterprise AI.',
  subTagline:
    "Kyndryl (NYSE: KD) is the 2021 spin-off of IBM's managed infrastructure business — roughly $16B in revenue, 80,000+ practitioners, and a fast-growing Consult arm building agentic AI on Kyndryl Bridge, the Agentic AI Framework, and Kyndryl Vital.",

  contextWindow: `Kyndryl runs mission-critical infrastructure for many of the world's largest enterprises across six global practices — Cloud; Core Enterprise & zCloud; Applications, Data & AI; Digital Workplace; Network & Edge; and Security & Resiliency. The growth engine is Kyndryl Consult, and the public AI story now centres on Kyndryl Bridge, the Agentic AI Framework, and Kyndryl Vital — agentic AI productised and sold into modernization and AI-readiness engagements.

The gap I see: agentic platforms move faster than the architects who have to design with them. Kyndryl has the platform and the customer base; what compounds slower is a repeatable, coding-agent-native methodology that lets consultants design reference architectures, stand up PoCs, and demonstrate agentic patterns in days instead of weeks.

That is the layer I bring — an AI Architect Academy curriculum, a working coding-agent toolkit (Claude Code, Codex, Gemini skill packs), a public body of agentic systems (ACOS, a 31-tool MCP server), and an enterprise-AI audience that turns the methodology into reach.`,

  workingReality: [
    {
      label: 'Oracle EMEA AI CoE practice',
      detail:
        'Strategic architect role at the Oracle EMEA AI Center of Excellence — building CoE blueprints used by Oracle solution architects across the region. The methodology travels.',
    },
    {
      label: 'Open coding-agent toolkit',
      detail:
        'Four public repositories — agentic-creator-os (ACOS), starlight-intelligence-system (SIS), the AI Architect Academy curriculum, and an OCI-specific Claude Code skill pack — that together carry the practice.',
      evidence: {
        label: 'github.com/frankxai',
        href: 'https://github.com/frankxai',
      },
    },
    {
      label: 'AI Architect Academy curriculum',
      detail:
        'A multi-cloud enterprise-AI curriculum already productized as workshops and skill packs — the substrate for consultant enablement at scale.',
      evidence: {
        label: 'ai-architect-academy',
        href: 'https://github.com/frankxai/ai-architect-academy',
      },
    },
    {
      label: 'Audience funnel',
      detail:
        'Around 7,000 followers across Oracle, NVIDIA, Anthropic, and founder networks. Posts about AI CoE and agentic patterns regularly land 100+ engagements among that audience.',
    },
    {
      label: 'Enterprise modernization pedigree',
      detail:
        "Production OCI Generative AI and Oracle Database 23ai agent-integration patterns from the CoE work — directly relevant to Kyndryl's mainframe-to-cloud and AI-readiness engagements.",
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
  ],

  proposalIntro:
    'What follows is a proposal — a specific shape this partnership could take if both sides see it. Not a deck. The operating modes below stack; partnerships rarely pick just one.',

  asymmetricValue: [
    {
      title: 'Agentic architecture advisory',
      body: 'Reference architectures, agentic design reviews, and pattern libraries for Kyndryl Bridge, the Agentic AI Framework, and Vital — the design layer between the platform and the customer engagement.',
      metric: 'Advisory',
    },
    {
      title: 'Consultant enablement at scale',
      body: 'The AI Architect Academy curriculum plus a Workshop-in-a-Box kit Kyndryl facilitators can run — agentic-AI design and coding-agent workflows for a large practitioner base.',
      metric: 'Curriculum',
    },
    {
      title: 'Content engine + audience funnel',
      body: "Co-branded thought leadership that powers Kyndryl Consult's AI-readiness narrative, distributed through an enterprise-AI audience already engaged on agentic patterns.",
      metric: '7,000+ followers',
    },
    {
      title: 'Live agentic body of work',
      body: 'Open architecture (ACOS) and a 31-tool MCP server (SIS) including MCP-to-Oracle-Autonomous-Database connectivity. Public, reviewable, running.',
      metric: '85+ repos / 31 tools',
    },
    {
      title: 'Oracle / OCI modernization bridge',
      body: "Oracle EMEA AI CoE pedigree maps directly onto Kyndryl's OCI alliance and mainframe-to-cloud modernization — agentic AI on a stack Kyndryl already delivers.",
      metric: 'OCI pedigree',
    },
  ],

  programs: [
    {
      number: 1,
      name: 'Agentic Architecture Foundation',
      cadence: '3-month, fixed-scope',
      whatItIs:
        'Stand up a coding-agent-native agentic AI architecture practice inside Kyndryl Consult.',
      whatItProduces: [
        'Agentic AI architecture playbook for the Consult practice',
        'Claude Code / Codex / Gemini toolkit deployed with custom skills and agents',
        'Two reference architectures published on agentic patterns (Bridge / Vital aligned)',
        'Cohort of 6 to 10 consultants coached through the methodology',
      ],
      pricingPosture: 'Fixed-price program, milestone-paid.',
    },
    {
      number: 2,
      name: 'Consultant Enablement / Workshop-in-a-Box',
      cadence: 'License + delivery',
      whatItIs:
        "White-label-ready enablement kit derived from the AI Architect Academy curriculum, for Kyndryl's practitioner base.",
      whatItProduces: [
        'Workshop materials Kyndryl facilitators run between Frank-led sessions',
        'Facilitator brief, slides, exercises, certification rubric',
        'Agentic-AI-for-architects track tailored to Kyndryl practices',
      ],
      pricingPosture: 'License fee plus per-delivery support.',
    },
    {
      number: 3,
      name: 'Thought-Leadership Retainer',
      cadence: 'Monthly, 12-month',
      whatItIs:
        'Ongoing co-branded content, architect office hours, and methodology continuity for the Consult AI-readiness story.',
      whatItProduces: [
        'Co-branded articles and reference pieces each quarter',
        'One architecture demo per month',
        'Architect office hours and an async coaching channel',
        'Distribution through the FrankX enterprise-AI audience',
      ],
      pricingPosture: 'Fixed monthly bundle. Output-based, not hours-based.',
    },
    {
      number: 4,
      name: 'Event-Led Visibility',
      cadence: 'Per event',
      whatItIs:
        'Keynotes, workshops, and partner-facing sessions at Kyndryl and ecosystem events (Microsoft, Google Cloud, AWS, Oracle, NVIDIA themed).',
      whatItProduces: [
        'Day-of delivery',
        'Supporting content (blog + LinkedIn + short)',
        'Post-event enablement asset',
      ],
      pricingPosture: 'Day rate plus travel.',
    },
    {
      number: 5,
      name: 'Research Co-Sponsorship',
      cadence: 'Annual track, quarterly publications',
      whatItIs:
        'Co-sponsored research stream — agentic AI on enterprise cloud, MCP for cloud orchestration, multi-cloud agent harnesses.',
      whatItProduces: [
        'One deep research piece per quarter, co-branded',
        'Kyndryl first publication rights',
      ],
      pricingPosture: 'Annual sponsorship.',
    },
  ],

  compoundingModel: [
    {
      month: 0,
      title: 'Foundations',
      body: 'Agentic architecture playbook defined. Coding-agent toolkit deployed. First consultant cohort onboarded.',
    },
    {
      month: 3,
      title: 'First publications',
      body: 'Two reference architectures published. First enablement workshop delivered. Co-branded content live through the audience funnel.',
    },
    {
      month: 6,
      title: 'Cohort certified',
      body: 'Consultant cohort certified. Workshop-in-a-Box running with Kyndryl facilitators. First joint event delivered.',
    },
    {
      month: 12,
      title: 'Practice mature',
      body: 'Agentic AI architecture practice operating across Kyndryl Consult. Renewal conversation at expanded scope.',
    },
  ],

  crossLinks: [
    crossLink(
      'ai-coe',
      'Where the Foundation program builds from — the AI CoE blueprint in public.',
      'The methodology, in public'
    ),
    crossLink(
      'ai-architecture',
      'Reference architectures and agentic patterns, with multi-cloud deploy paths.',
      'Reference architectures'
    ),
    crossLink(
      'ai-architect-academy',
      'The curriculum the consultant cohort runs through. Substrate for Workshop-in-a-Box.',
      'The methodology, productized'
    ),
    crossLink(
      'research',
      'Active pillars open for co-sponsorship: agentic AI on enterprise cloud, MCP for cloud orchestration.',
      'Active research pillars open for co-sponsorship'
    ),
    crossLink(
      'workshops',
      'Calendar surface where Kyndryl-led workshops appear once delivered.',
      'Past and upcoming partner workshops'
    ),
  ],

  whatThisIsNot: [
    "Production implementation or managed-services delivery — that is Kyndryl's bench, not mine",
    "A replacement for Kyndryl's architect and consultant teams. The work is alongside, not instead.",
    'Hours-for-money trainer engagement',
    'Employee-flavored or exclusive relationship',
    'Deep security, network, or resiliency specialist work',
  ],

  cta: {
    label: 'Book Meet & Grow with Frank',
    href: MEET_AND_GROW_URL,
  },

  accent: 'tech',

  seo: {
    title: 'FrankX × Kyndryl — Agentic AI Architecture Partnership',
    description:
      'A coding-agent-native agentic AI practice for Kyndryl Consult — architecture advisory, consultant enablement, and AI-readiness thought leadership.',
  },
}
