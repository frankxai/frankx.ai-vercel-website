export type PlannedCourse = {
  slug: string
  title: string
  shortDescription: string
  summary: string
  launchWindow: string
  commitment: string
  format: string
  audience: string[]
  outcomes: string[]
  outline: Array<{
    title: string
    description: string
  }>
}

export const plannedCourses: PlannedCourse[] = [
  {
    slug: 'conscious-ai-foundations',
    title: 'Conscious AI Foundations',
    shortDescription: 'Human-centered AI principles, ethics, and implementation strategy.',
    summary:
      'A practical foundation for creators and teams who want to adopt AI without losing judgment, values, or human context.',
    launchWindow: 'Target launch: Q2 2026',
    commitment: '4 weeks · ~2-3 focused hours per week',
    format: 'Self-paced lessons + implementation playbooks (planned)',
    audience: [
      'Creators and operators who are new to structured AI systems',
      'Leads who need a safe, values-aligned AI adoption path',
      'Teams that want shared language before deeper technical builds',
    ],
    outcomes: [
      'Build a clear AI principles charter for your work or organization',
      'Evaluate AI opportunities with ethical and practical decision filters',
      'Create a phased implementation roadmap with measurable checkpoints',
    ],
    outline: [
      {
        title: 'Principles Before Tools',
        description: 'Define values, constraints, and success criteria before selecting tools or models.',
      },
      {
        title: 'Risk, Safety, and Governance Basics',
        description: 'Set up practical guardrails for quality, privacy, and accountability.',
      },
      {
        title: 'Workflow Integration',
        description: 'Embed AI into existing processes without breaking trust or velocity.',
      },
      {
        title: '90-Day Execution Plan',
        description: 'Turn strategy into a practical implementation sequence you can actually ship.',
      },
    ],
  },
  {
    slug: 'agent-architecture-systems',
    title: 'Agent Architecture Systems',
    shortDescription: 'Design and deploy reliable multi-agent and MCP-powered workflows.',
    summary:
      'Technical training focused on production-ready agent patterns, orchestration decisions, and failure-safe execution.',
    launchWindow: 'Target launch: Q3 2026',
    commitment: '6 weeks · ~3-4 focused hours per week',
    format: 'Hands-on labs + architecture reviews (planned)',
    audience: [
      'Developers building real agentic workflows',
      'Technical founders shipping AI products',
      'Teams moving from demos to production systems',
    ],
    outcomes: [
      'Design robust agent flows with clear boundaries and recovery paths',
      'Implement MCP tool patterns with validation and observability',
      'Ship one production-oriented workflow with measurable reliability',
    ],
    outline: [
      {
        title: 'System Boundaries and Agent Roles',
        description: 'Map responsibilities, constraints, and handoffs between agents and tools.',
      },
      {
        title: 'Tooling, Contracts, and Guardrails',
        description: 'Design tool interfaces that reduce ambiguity and improve execution quality.',
      },
      {
        title: 'Resilience and Monitoring',
        description: 'Handle retries, partial failures, logging, and cost visibility.',
      },
      {
        title: 'Production Deployment Playbook',
        description: 'Move from prototype to stable release with clear operational checks.',
      },
    ],
  },
  {
    slug: 'creator-business-systems',
    title: 'Creator Business Systems',
    shortDescription: 'Build sustainable creator offers, funnels, and execution systems with AI.',
    summary:
      'A strategic program for turning creative output into consistent offers, launch cycles, and long-term revenue systems.',
    launchWindow: 'Target launch: Q4 2026',
    commitment: '5 weeks · ~2-3 focused hours per week',
    format: 'Templates + live implementation sprints (planned)',
    audience: [
      'Creators who want to productize knowledge and workflows',
      'Solo operators building offers around AI-enabled services',
      'Teams designing sustainable creator-focused products',
    ],
    outcomes: [
      'Define one clear flagship offer aligned with your positioning',
      'Build a simple funnel from audience to qualified interest',
      'Run a repeatable launch cadence without burning out',
    ],
    outline: [
      {
        title: 'Offer Design and Positioning',
        description: 'Clarify what you sell, who it serves, and why it matters now.',
      },
      {
        title: 'Audience and Demand Signals',
        description: 'Capture and interpret waitlist and content signals before full launch.',
      },
      {
        title: 'Launch Operating Rhythm',
        description: 'Set weekly execution loops for content, outreach, and iteration.',
      },
      {
        title: 'Systemization and Scale',
        description: 'Document repeatable workflows that sustain growth over time.',
      },
    ],
  },
]

// Featured course — the flagship
export const featuredCourse: PlannedCourse = {
  slug: 'build-your-ai-creator-os',
  title: 'Build Your AI Creator OS',
  shortDescription: 'The complete blueprint for building an AI-powered creator business — from Claude Code to n8n automation to revenue.',
  summary:
    'Learn how to replicate the exact system behind frankx.ai: 500+ AI skills, 47 automated workflows, multi-agent swarms, content pipelines, and revenue automation. Built by an AI Architect who ships this daily.',
  launchWindow: 'Early Access: Q2 2026',
  commitment: '8 weeks — 3-4 focused hours per week',
  format: 'Self-paced modules with live implementation sessions',
  audience: [
    'Creators who want to build AI-powered businesses',
    'Developers learning agentic AI and automation',
    'Professionals building their personal AI Center of Excellence',
    'Anyone who wants to ship faster with Claude Code + n8n',
  ],
  outcomes: [
    'Set up Claude Code with custom skills, agents, and brand voice',
    'Build n8n automation workflows for content, email, and revenue',
    'Create a multi-agent AI swarm for strategy and content',
    'Launch a revenue-ready website with Stripe, workshops, and assessments',
    'Deploy your own intelligence system that runs while you sleep',
  ],
  outline: [
    {
      title: 'Module 1: Your AI Foundation',
      description: 'Set up Claude Code, install skills, configure CLAUDE.md, understand the ACOS framework.',
    },
    {
      title: 'Module 2: The Skill System',
      description: 'Build custom skills, create slash commands, set up auto-activation with skill-rules.json.',
    },
    {
      title: 'Module 3: MCP and Tool Connectivity',
      description: 'Connect Claude Code to external tools via MCP — Slack, Vercel, Resend, GitHub, n8n.',
    },
    {
      title: 'Module 4: n8n Automation Empire',
      description: 'Build your first 10 workflows: daily briefs, content pipeline, email sequences, social posting.',
    },
    {
      title: 'Module 5: Multi-Agent Swarms',
      description: 'Create AI agent swarms in n8n — content strategist, SEO analyst, product advisor working in parallel.',
    },
    {
      title: 'Module 6: Content at Scale',
      description: 'Blog-to-social pipeline, newsletter automation, workshop templates, assessment tools.',
    },
    {
      title: 'Module 7: Revenue Systems',
      description: 'Stripe checkout, product delivery, email welcome sequences, coaching application flow.',
    },
    {
      title: 'Module 8: Ship Your Intelligence System',
      description: 'Deploy everything: website on Vercel, n8n on Railway, community on Discord, products on Whop.',
    },
  ],
}

export function getPlannedCourse(slug: string): PlannedCourse | undefined {
  const all = [...plannedCourses, featuredCourse]
  return all.find((course) => course.slug === slug)
}
