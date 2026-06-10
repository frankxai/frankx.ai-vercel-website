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
 * Status: pursuing Anthropic Claude for Work Partner Program. No formal
 * agreement, revenue share, or co-marketing arrangement is in place today.
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
  lastUpdated: '2026-05-16',

  title: 'AI Architect — Claude-native AI CoE practice',
  tagline:
    'The harness this practice ships in. The conversation is about scaling that pattern.',
  subTagline:
    "Frank's practice and Anthropic Claude already ship every day together. Claude Code is the build harness underneath frankx.ai, ACOS, SIS, Library OS, the AI Architect Academy, and the OCI Claude Code skill pack. The conversation is making the alignment formal through Claude for Work.",

  contextWindow: `Claude Code is not a tool I evaluated and adopted. It is the harness every shipped artifact on frankx.ai is built in — the operating layer underneath an open coding-agent practice that already runs in public.

The pattern I see: enterprises and architects are moving toward agent-native workflows faster than the methodology to support that move has matured. Reference implementations, opinionated harnesses, and a curriculum that meets architects where they work are scarce. Claude Code is the strongest harness on the market for that shift, and a Claude-native AI CoE methodology — open, multi-cloud, with public reference implementations — is what closes the gap.

That is the layer I bring. Oracle EMEA AI CoE pedigree, four public Claude-Code-native repositories, the AI Architect Academy curriculum with Claude Code at the centre, the workshop Claude branch I already teach, and a 7,000-person EMEA audience across Oracle, NVIDIA, Anthropic, and founder networks.`,

  workingReality: [
    {
      label: 'Claude Code as daily build infrastructure',
      detail:
        'Every project on frankx.ai ships in Claude Code — the marketing site, ACOS, SIS, Library OS, the Workshop OS, the partnership system itself. The harness is the working tool, not a logo.',
      evidence: {
        label: 'github.com/frankxai',
        href: 'https://github.com/frankxai',
      },
    },
    {
      label: 'Claude-Code-native open-source body of work',
      detail:
        'Four public repositories carry the practice — ACOS (agentic creator OS), SIS (Starlight Intelligence System with a 31-tool MCP server), the AI Architect Academy curriculum, and the OCI Claude Code skill pack.',
      evidence: {
        label: 'ACOS — github.com/frankxai/agentic-creator-os',
        href: 'https://github.com/frankxai/agentic-creator-os',
      },
    },
    {
      label: 'Oracle EMEA AI CoE practice',
      detail:
        'AI Architect at the Oracle EMEA AI Center of Excellence. CoE blueprints used by Oracle solution architects across the region — the same six-pillar architecture (Strategy, Governance, Talent, Technology, Data, Ethics) translated into Claude-Code-native workflows.',
    },
    {
      label: 'Workshop Claude branch already taught',
      detail:
        'I teach the Claude branch of the Build First AI Agent workshop — a multi-path format with Vercel AI SDK at the centre and Claude Code, Codex, Gemini, and ADK as branches. The Claude branch lands strongest in EMEA cohorts.',
    },
    {
      label: 'EMEA audience funnel',
      detail:
        'Around 7,000 followers across Oracle, NVIDIA, Anthropic, and founder networks. Posts on Claude Code patterns, agent-native workflows, and AI CoE methodology regularly clear 100+ engagements among that audience.',
    },
  ],

  proofPoints: [
    {
      label: 'ACOS — agentic creator OS, Claude-Code-native',
      href: 'https://github.com/frankxai/agentic-creator-os',
    },
    {
      label: 'SIS — Starlight Intelligence System with 31-tool MCP server',
      href: 'https://github.com/frankxai/starlight-intelligence-system',
    },
    {
      label: 'AI Architect Academy — multi-cloud curriculum, Claude Code at the centre',
      href: 'https://github.com/frankxai/ai-architect-academy',
    },
    {
      label: 'OCI Claude Code skill pack — published with the Oracle AI Architect org',
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
      title: 'Claude-Code-native open body of work',
      body: 'Four public repositories — ACOS, SIS, AI Architect Academy, OCI skill pack — already running, already reviewable, already used by architects in the region. The reference implementations exist; the question is distribution.',
      metric: '4 public repos',
    },
    {
      title: 'Academy curriculum with Claude Code at the centre',
      body: 'AI Architect Academy is multi-cloud by design and Claude-Code-native by default. The curriculum is the on-ramp content that turns architect interest into working agent-native practice.',
      metric: 'Multi-cloud curriculum',
    },
    {
      title: 'Built-in EMEA audience funnel',
      body: 'Around 7,000 followers across Oracle, NVIDIA, Anthropic, and founder networks in EMEA. Posts on Claude Code patterns clear 100+ engagements among that audience without paid amplification.',
      metric: '7,000+ EMEA followers',
    },
    {
      title: 'Workshop Claude branch already in market',
      body: 'The Claude branch of Build First AI Agent ships today. Co-marketing or attribution slots in cleanly. No new format to design, no new audience to acquire — the workshop is running.',
      metric: 'Live workshop branch',
    },
    {
      title: 'MCP work shipped publicly',
      body: 'SIS includes a 31-tool MCP server with Oracle Autonomous Database connectivity — a public reference for what MCP looks like inside an opinionated coding-agent stack. The work is open for review.',
      metric: '31-tool MCP server',
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
      name: 'Claude for Work Partner Program — onboarding pathway',
      cadence: 'Application + 90-day onboarding',
      whatItIs:
        'Pursue the Anthropic Claude for Work Partner Program. Application in flight, 90-day onboarding pathway, then steady-state inside whatever partner mechanics the program supports.',
      whatItProduces: [
        'Partner Program application submitted',
        'Partner tier and onboarding milestones defined',
        'First partner-tier engagement (workshop attribution, content surface, or referenceable case-study)',
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
      title: 'Application + content commitment',
      body: 'Anthropic Claude for Work Partner Program application submitted. First co-marketing slot for the Build First AI Agent Claude branch agreed. Content cadence on Claude-native agent patterns defined.',
    },
    {
      month: 3,
      title: 'First co-published deep-dive and workshop attribution',
      body: 'First co-authored or attribution-aligned deep-dive published on /research. First workshop cohort completed with attribution. ACOS surfaces aligned with current Claude Code conventions.',
    },
    {
      month: 6,
      title: 'Curriculum module live, Academy distributing',
      body: 'First Claude Code curriculum module published on the Academy repository. Architect cohort coaching delivered against the module. Partner tier in steady state, attribution lanes running.',
    },
    {
      month: 12,
      title: 'Referenceable case-study for Claude-native AI CoE',
      body: 'A public reference implementation of a Claude-native AI CoE practice — ACOS, SIS, the Academy curriculum, the workshop branch, and the audience funnel running together. Renewal conversation at expanded scope.',
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
    'Not an Anthropic-employee-flavored relationship — Frank is an AI Architect at Oracle EMEA, operator-side.',
    'Not a model-reseller pitch — there is no API margin or reseller mechanic in scope.',
    'Not exclusive — Frank also ships in Codex, Gemini, and ADK where the workflow fits. The honest position is Claude-Code-native by default, not Claude-Code-only.',
    'Not a deck-building consulting role — every deliverable is a public artifact (repo, curriculum module, workshop cohort, deep-dive).',
    'Not on-call API support or production implementation services.',
  ],

  cta: {
    label: 'Open the strategic conversation',
    href: MEET_AND_GROW_URL,
  },

  programStatus: 'Anthropic Claude for Work — application pathway',

  alreadyShared: [
    'Claude Code is the harness for every shipped FrankX project — frankx.ai, ACOS, SIS, Library OS, the workshop curriculum.',
    'ACOS, SIS, and Library OS are three Claude-Code-native open-source systems, all public on github.com/frankxai.',
    'The Build First AI Agent workshop teaches Claude as a primary agent path to the EMEA enterprise architect audience.',
    '7,000+ EMEA AI architect followers across Oracle, NVIDIA, Anthropic, and founder networks already watching Claude-native CoE patterns.',
    'A2A protocol guide and the agent-framework comparison content publish Claude as the reasoning-lane benchmark.',
    'Active feedback loop on Claude Code skills and the MCP roadmap from daily delivery use.',
  ],

  formalizationAsk:
    "What's left to formalize. The work is in motion. The audience is engaged. The reference-implementation is public. What remains is the formal program lane — Claude for Work Partner Program entry, attendee credits for the workshop Claude branch, and co-marketing visibility on the surfaces already pointing at you. That is the conversation.",

  accent: 'tech',
  partnerLogoUrl: '/images/partnerships/logos/anthropic.svg',
  // ogImagePath: '/images/partnerships/anthropic-og.png', // TODO: generate, falls back to site default

  seo: {
    title: 'FrankX × Anthropic — Claude-Native AI CoE Practice | FrankX',
    description:
      'A Claude-native AI CoE practice for EMEA — ACOS, SIS, AI Architect Academy, and the workshop Claude branch already running in public. Pursuing Claude for Work.',
  },
}
