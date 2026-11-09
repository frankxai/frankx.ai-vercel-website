/**
 * AI agent playbooks — the curated reading and build order across the
 * existing FrankX agent, skills, architecture, and infrastructure surfaces.
 *
 * Every href here must resolve to a live, indexable route. This file adds no
 * new claims: each description paraphrases the destination page's own
 * metadata so /playbooks stays honest when those pages change.
 */

export type PlaybookFormat =
  | 'Field guide'
  | 'Workshop'
  | 'Library'
  | 'Tool'
  | 'Hub'
  | 'Open source'
  | 'Comparison'
  | 'Blueprint'
  | 'Engagement'

export interface PlaybookItem {
  title: string
  href: string
  description: string
  format: PlaybookFormat
  external?: boolean
}

export interface PlaybookTrack {
  id: string
  step: string
  title: string
  question: string
  summary: string
  items: PlaybookItem[]
}

export const playbookTracks: PlaybookTrack[] = [
  {
    id: 'set-up',
    step: '01',
    title: 'Set up the machine and the stack',
    question: 'What should I run my agents on, and with which tools?',
    summary:
      'Pick the hardware, the model, and the tools before you write a single prompt. Most agent failures start as stack decisions nobody made on purpose.',
    items: [
      {
        title: 'AI Computer Field Guide',
        href: '/ai-computer',
        description:
          'RTX 5090 workstations, cloud GPU rental, AI mini PCs, DGX Spark, and private AI factory setups for founders and creators.',
        format: 'Field guide',
      },
      {
        title: 'LLM Hub',
        href: '/llm-hub',
        description: 'Compare model providers, pricing, and sources, then evaluate them against your own workload.',
        format: 'Comparison',
      },
      {
        title: 'Agent Hub',
        href: '/agent-hub',
        description:
          'Claude Code, Codex, Cursor, Antigravity, LangGraph, CrewAI, and the Agent SDKs: what each is for and what to watch.',
        format: 'Comparison',
      },
      {
        title: 'The FrankX Stack',
        href: '/stack',
        description: 'The templates, agents, infrastructure, databases, and dev tools I actually use and recommend.',
        format: 'Library',
      },
    ],
  },
  {
    id: 'build',
    step: '02',
    title: 'Build your first agents and skills',
    question: 'How do I go from a chat window to an agent that does real work?',
    summary:
      'One working agent beats ten demos. Start with a guided build, then package what works as reusable SKILL.md modules.',
    items: [
      {
        title: 'Build Your First AI Agent',
        href: '/workshops/build-first-ai-agent',
        description: 'A 90-minute central path with the Vercel AI SDK, plus six branches for where you go next.',
        format: 'Workshop',
      },
      {
        title: 'Claude Code & Agent Skills Hub',
        href: '/skills',
        description:
          'Install, build, and evaluate skills in the open SKILL.md format, and compare skills, plugins, subagents, and MCP servers.',
        format: 'Hub',
      },
      {
        title: 'Skill Builder',
        href: '/skills/builder',
        description: 'Fill the fields, copy the generated SKILL.md, and drop it into a Claude, Codex, Gemini, or custom agent repo.',
        format: 'Tool',
      },
      {
        title: 'Prompt Library',
        href: '/prompt-library',
        description: 'An open prompt corpus, ranked, attributed, and tagged by lab, category, and model lane.',
        format: 'Library',
      },
      {
        title: 'Implementation guides',
        href: '/guides',
        description: 'Step-by-step guides distilled from real agent-assisted builds, with the decisions kept visible.',
        format: 'Field guide',
      },
    ],
  },
  {
    id: 'operate',
    step: '03',
    title: 'Run agents as a crew',
    question: 'How do I operate many agents without losing control of quality?',
    summary:
      'Operating agents is a management problem: roles, bounded scopes, quality gates, and memory that compounds instead of drifting.',
    items: [
      {
        title: 'ACOS',
        href: '/acos',
        description: 'The open-source creator operating system for Claude Code: auto-activating skills, specialised agents, and commands.',
        format: 'Open source',
      },
      {
        title: 'Agent catalog',
        href: '/agents',
        description: 'Explore the ACOS catalog and set up the public source installer.',
        format: 'Library',
      },
      {
        title: 'Agentic Creator',
        href: '/agentic-creator',
        description: 'Nine roles for people who run AI as a crew, from creator and producer to orchestrator and curator.',
        format: 'Field guide',
      },
      {
        title: 'Agentic Life OS',
        href: '/agentic-life-os',
        description: 'Decide the highest-leverage move, execute with bounded agents, keep the evidence, and turn results into assets.',
        format: 'Field guide',
      },
      {
        title: 'Agentic Builder Lab',
        href: '/agentic-builder-lab',
        description: 'Build-in-public field notes on the agentic dev stack: Claude Code, Codex, Gemini, Antigravity, and Firebase.',
        format: 'Hub',
      },
    ],
  },
  {
    id: 'architect',
    step: '04',
    title: 'Architect for production',
    question: 'What does this look like when a team, a budget, and real users depend on it?',
    summary:
      'Retrieval, multi-agent orchestration, LLM gateways, MCP tool servers, and the operating model that keeps them governed.',
    items: [
      {
        title: 'AI Architecture',
        href: '/ai-architecture',
        description: 'Retrieval apps, bounded agent teams, persistent cloud workers, and automation, with source-backed diagrams.',
        format: 'Hub',
      },
      {
        title: 'Architecture blueprints',
        href: '/ai-architecture/blueprints',
        description: 'Interactive reference designs for multi-agent orchestration, enterprise RAG, LLM gateways, and MCP servers.',
        format: 'Blueprint',
      },
      {
        title: 'Multi-cloud AI comparison',
        href: '/ai-architecture/multi-cloud-comparison',
        description: 'AWS Bedrock, Azure AI Foundry, Google Vertex AI, and OCI GenAI side by side.',
        format: 'Comparison',
      },
      {
        title: 'AI Operations research',
        href: '/ai-ops',
        description: 'LLM infrastructure, memory systems, and multi-agent orchestration for production operations.',
        format: 'Hub',
      },
      {
        title: 'AI Center of Excellence',
        href: '/ai-coe',
        description: 'Strategy, governance, talent, technology, data, and ethics in one operating model.',
        format: 'Field guide',
      },
    ],
  },
  {
    id: 'go-deeper',
    step: '05',
    title: 'Go deeper with Frank',
    question: 'When is it worth bringing in a second architect?',
    summary:
      'The playbooks are free. When the decision is consequential or the system has to be installed into a real business, work with me directly.',
    items: [
      {
        title: 'Workshops',
        href: '/workshops',
        description: 'Delivered workshops and studio curricula on AI agents, MCP, accountable memory, and coordinated work.',
        format: 'Workshop',
      },
      {
        title: 'AI Architecture Studio',
        href: '/work-with-me',
        description: 'Architecture, coaching, and builds for teams that need the system to ship.',
        format: 'Engagement',
      },
      {
        title: 'Foundry',
        href: '/foundry',
        description: 'Complete AI operating systems installed into businesses: website, agent harness, quality gates, and memory.',
        format: 'Engagement',
      },
      {
        title: "Founder's Circle",
        href: '/founders-circle',
        description: 'A quarterly strategic AI retainer for founders whose problem is judgment under uncertainty.',
        format: 'Engagement',
      },
    ],
  },
]

export const openSourcePlaybooks: PlaybookItem[] = [
  {
    title: 'Claude Skills Library',
    href: 'https://github.com/frankxai/claude-skills-library',
    description: 'Open repository of modular SKILL.md definitions and evaluation harnesses.',
    format: 'Open source',
    external: true,
  },
  {
    title: 'MCP Doctor',
    href: 'https://github.com/frankxai/mcp-doctor',
    description: 'Diagnostic CLI for Model Context Protocol server configurations.',
    format: 'Open source',
    external: true,
  },
]

export const playbookFaqs = [
  {
    question: 'What is an AI agent playbook?',
    answer:
      'An AI agent playbook is a tested sequence for choosing a stack, building an agent, packaging its behaviour as reusable skills, and operating it with quality gates. The FrankX playbooks link each step to a working guide, tool, or open-source repository.',
  },
  {
    question: 'Where should I start if I have never built an agent?',
    answer:
      'Start with the Build Your First AI Agent workshop, then turn whatever worked into a SKILL.md module with the Skill Builder. Hardware and model choices only matter once you know what the agent has to do.',
  },
  {
    question: 'Do I need a local AI computer to run agents?',
    answer:
      'No. Most agent work runs well against hosted models. A local workstation or mini PC becomes worth it for private data, heavy local inference, or predictable monthly cost; the AI Computer Field Guide compares the options.',
  },
  {
    question: 'Are the playbooks free?',
    answer:
      'Yes. The guides, hubs, skill tools, and open-source repositories are free. Workshops, the AI Architecture Studio, the Foundry, and the Founder\u2019s Circle are paid engagements for teams that want direct help.',
  },
]
