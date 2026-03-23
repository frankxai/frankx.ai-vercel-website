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

export function getPlannedCourse(slug: string): PlannedCourse | undefined {
  return plannedCourses.find((course) => course.slug === slug)
}
