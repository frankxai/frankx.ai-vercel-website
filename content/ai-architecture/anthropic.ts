import type { ArchitectureDeepDive } from './types'
import { MEET_AND_GROW_URL } from '@/lib/cta-links'

/**
 * Anthropic / Claude — model + harness deep-dive.
 *
 * This is the working-stack view of the FrankX × Anthropic relationship.
 * The partnership conversation lives at /partnerships/anthropic.
 *
 * Every claim here is verifiable from public artifacts (ACOS, SIS, Library
 * OS, AI Architect Academy curriculum). No invented numbers, no guessed
 * pricing — enterprise prices defer to Anthropic sales.
 */
export const anthropic: ArchitectureDeepDive = {
  partnerSlug: 'anthropic',
  partnerName: 'Anthropic',
  partnerShortName: 'Claude',

  hero: {
    eyebrow: 'AI Architecture · Anthropic',
    title: 'Build with Claude. Ship in Claude Code.',
    deck: "How Frank's practice runs end-to-end on Anthropic Claude — daily delivery on Claude Code, ACOS + SIS + Library OS as open reference implementations, AI Architect Academy as the curriculum.",
    primaryCta: {
      label: 'View the partnership conversation',
      href: '/partnerships/anthropic',
    },
    secondaryCta: {
      label: 'Book Meet & Grow',
      href: MEET_AND_GROW_URL,
    },
  },

  workingStack: {
    intro:
      "Every project on frankx.ai ships inside Claude Code. The tools below are the working substrate — what Frank touches daily, not a vendor list. ACOS, SIS, the Library OS, and the AI Architect Academy curriculum are Claude-native by construction.",
    tools: [
      {
        category: 'Build harness',
        items: [
          {
            name: 'Claude Code',
            href: 'https://docs.anthropic.com/en/docs/claude-code',
          },
          {
            name: 'Claude Agent SDK',
            href: 'https://docs.anthropic.com/en/docs/claude-code/sdk',
          },
          {
            name: 'Anthropic Console',
            href: 'https://console.anthropic.com/',
          },
        ],
      },
      {
        category: 'Models in delivery',
        items: [
          {
            name: 'Claude Opus 4.7',
            href: 'https://www.anthropic.com/news/claude-4',
          },
          {
            name: 'Claude Sonnet 4.7',
            href: 'https://www.anthropic.com/news/claude-4',
          },
          {
            name: 'Claude Haiku 4',
            href: 'https://www.anthropic.com/news/claude-4',
          },
        ],
      },
      {
        category: 'Open-source reference implementations',
        items: [
          {
            name: 'ACOS — Agentic Creator OS',
            href: 'https://github.com/frankxai/agentic-creator-os',
          },
          {
            name: 'SIS — Starlight Intelligence System',
            href: 'https://github.com/frankxai/Starlight-Intelligence-System',
          },
          {
            name: 'Library OS',
            href: 'https://github.com/frankxai/library-os',
          },
          {
            name: 'Prompt Engine + Prompt Library',
            href: 'https://github.com/frankxai/prompt-engine',
          },
        ],
      },
      {
        category: 'Protocols',
        items: [
          {
            name: 'Model Context Protocol',
            href: 'https://modelcontextprotocol.io',
          },
          {
            name: 'MCP servers registry',
            href: 'https://github.com/modelcontextprotocol/servers',
          },
          {
            name: 'SIS MCP (31 tools)',
            href: 'https://github.com/frankxai/Starlight-Intelligence-System',
          },
        ],
      },
    ],
  },

  tiers: [
    {
      name: 'Free',
      price: '€0',
      features: [
        'Claude.ai web access — Sonnet tier, daily limits',
        'Long-context reading + drafting for individuals',
        'No API key, no setup — useful as a first touch with the model',
      ],
      bestFor:
        'Individuals evaluating Claude for writing, research, and light coding. The on-ramp before Claude Code.',
      linkLabel: 'Start on claude.ai',
      linkHref: 'https://claude.ai',
    },
    {
      name: 'Pro / API',
      price: 'From €18/mo (Pro) · API per-token',
      features: [
        'Claude.ai Pro — higher Sonnet limits, Opus access, larger context',
        'API access via Anthropic Console — usage-based, no minimums',
        'Claude Code on top of API — the daily build harness',
        'Agent SDK for building production agents',
      ],
      bestFor:
        'Solo architects, indie devs, and small teams running Claude Code as their primary harness. The tier this practice operates on.',
      linkLabel: 'See Anthropic pricing',
      linkHref: 'https://www.anthropic.com/pricing',
    },
    {
      name: 'Enterprise',
      price: 'Contact sales',
      features: [
        'Claude for Work / Enterprise — SSO, audit logs, data controls',
        'Volume discounts, dedicated capacity, custom rate limits',
        'AWS Bedrock + Google Vertex routing for cloud-aligned procurement',
        'Compliance posture: SOC 2 Type II, HIPAA-ready, ISO 27001',
      ],
      bestFor:
        'Enterprises running Claude as the operational model for CoE practice — agent-native workflows, governance, multi-team deployment.',
      linkLabel: 'Talk to Anthropic',
      linkHref: 'https://www.anthropic.com/contact-sales',
    },
  ],

  useCases: [
    {
      title: 'EMEA AI CoE delivery',
      industry: 'Enterprise consulting · EMEA',
      outcome:
        'Frank ships Oracle EMEA AI CoE engagements with Claude Code as the daily harness. Agentic workflows, 6-pillar CoE framework, partner co-architecture (Oracle × NVIDIA partner event 2025).',
      stack: ['Claude Code', 'Opus 4.7', 'OCI ADB', 'MCP', 'ACOS'],
      evidenceUrl: '/ai-coe',
    },
    {
      title: 'Open-source agent harness — ACOS',
      industry: 'Developer tools · open source',
      outcome:
        '99-agent catalog across 11 pillars, public on GitHub, runnable in any Claude Code workspace. Reference implementation for creators and architects standing up their own personal CoE.',
      stack: ['Claude Code', 'Sonnet 4.7', 'ACOS skills', 'MCP servers'],
      evidenceUrl: 'https://github.com/frankxai/agentic-creator-os',
    },
    {
      title: 'AI Architect Academy curriculum',
      industry: 'Education · workshop track',
      outcome:
        'Multi-cloud curriculum with Claude Code at the centre. Workshop forcing functions across DOAG, Madrid, NLDigital — solution architects coached into agent-native workflows in days, not quarters.',
      stack: ['Claude Code', 'Claude Agent SDK', 'Vercel AI SDK', 'Google ADK'],
      evidenceUrl: '/ai-architect-academy',
    },
  ],

  referenceArchitectures: [
    {
      name: 'Claude Code + MCP + OCI Autonomous DB',
      oneLine:
        'Enterprise CoE pattern — coding agent in the loop, MCP servers exposing internal tools, OCI Autonomous Database as the data substrate.',
      components: [
        'Claude Code (build harness)',
        'Opus 4.7 (reasoning)',
        'MCP servers (tool surface)',
        'OCI Autonomous Database (data plane)',
        'OCI Object Storage (artifacts)',
      ],
      detailHref: '/ai-architecture/blueprints',
    },
    {
      name: 'ACOS — open creator operating system',
      oneLine:
        'Personal AI CoE reference implementation. 99 agents, 11 pillars, runs natively in Claude Code on any developer machine.',
      components: [
        'Claude Code',
        'ACOS skill pack',
        'Sonnet 4.7 (routing)',
        'Opus 4.7 (deep reasoning)',
        'MCP servers (tools + memory)',
      ],
      detailHref: 'https://github.com/frankxai/agentic-creator-os',
    },
    {
      name: 'SIS — 31-tool MCP server',
      oneLine:
        'Memory + governance substrate. One MCP server, 31 tools, exposes the Memory Palace and Starlight protocols to any Claude-native workspace.',
      components: [
        'SIS MCP server',
        'Memory Palace (markdown-first)',
        'SIP v1.1.0 protocol',
        'Starlight Board (governance)',
      ],
      detailHref: '/starlight-intelligence-system',
    },
    {
      name: 'Library OS — book intelligence pattern',
      oneLine:
        'Repeatable hub-per-book pattern with three slash commands and a book-distiller subagent. Markdown-first, MIT-licensed, bootable Next.js.',
      components: [
        'Claude Code',
        'Sonnet 4.7 (extraction)',
        'book-distiller subagent',
        'Markdown content store',
        'Next.js 16 app router',
      ],
      detailHref: '/library/approach',
    },
    {
      name: 'AI Architect Academy stack',
      oneLine:
        'Three-lane portfolio for solution architects — Vercel AI SDK (web), Claude Agent SDK (reasoning), Google ADK (enterprise).',
      components: [
        'Claude Agent SDK',
        'Vercel AI SDK',
        'Google ADK',
        'Claude Code (curriculum harness)',
      ],
      detailHref: '/ai-architect-academy',
    },
  ],

  academyModules: [
    {
      title: 'Claude Code Fundamentals',
      href: '/ai-architect-academy/claude-code-fundamentals',
      level: 'foundations',
    },
    {
      title: 'MCP Server Authoring',
      href: '/ai-architect-academy/mcp-server-authoring',
      level: 'intermediate',
    },
    {
      title: 'Claude Agent SDK in Production',
      href: '/ai-architect-academy/claude-agent-sdk',
      level: 'intermediate',
    },
    {
      title: 'Building a Personal AI CoE with ACOS',
      href: '/ai-architect-academy/personal-ai-coe',
      level: 'advanced',
    },
    {
      title: 'Multi-Cloud Routing — Claude + Bedrock + Vertex',
      href: '/ai-architect-academy/multi-cloud-routing',
      level: 'advanced',
    },
  ],

  cta: {
    headline: 'Architect with Claude. Ship from Claude Code.',
    body: "If you're standing up a Claude-native CoE practice or evaluating Claude Code as the harness for your team, the conversation is open. Working partnership is the goal — proposal page at /partnerships/anthropic when both sides are ready.",
    primary: {
      label: 'Book Meet & Grow',
      href: MEET_AND_GROW_URL,
    },
    secondary: {
      label: 'View the partnership conversation',
      href: '/partnerships/anthropic',
    },
  },

  seo: {
    title:
      'AI Architecture with Claude — Anthropic Reference Implementation | FrankX',
    description:
      "How FrankX ships with Anthropic Claude: Claude Code as the daily build harness, ACOS and SIS as open reference implementations, and the AI Architect Academy curriculum. Free, Pro, and Enterprise tiers compared.",
  },
}
