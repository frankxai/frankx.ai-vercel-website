export type WorkflowStatus = 'active' | 'inactive'

export interface WorkflowRegistryItem {
  name: string
  id: string
  category: string
  trigger: 'Webhook' | 'Cron' | 'Manual'
  schedule?: string
  description: string
  status: WorkflowStatus
}

export const workflowRegistry: WorkflowRegistryItem[] = [
  // Core Infrastructure
  {
    name: 'Mega Orchestrator',
    id: 'YYDAv4mZtRdDTtBq',
    category: 'Core Infrastructure',
    trigger: 'Webhook',
    description:
      '14-node hub routing 8 intents — content, newsletter, video, crypto, and more.',
    status: 'active',
  },
  {
    name: 'Intelligence Hub',
    id: 'mGdAQ2zt52DJG58N',
    category: 'Core Infrastructure',
    trigger: 'Webhook',
    description: 'Central intelligence aggregator pulling from multiple data sources.',
    status: 'active',
  },
  {
    name: 'ACOS Skills Agent',
    id: 'eAZBpTF02JL1TN9G',
    category: 'Core Infrastructure',
    trigger: 'Webhook',
    description: 'Skill execution engine for the Agentic Creator OS.',
    status: 'active',
  },

  // Daily Intelligence
  {
    name: 'Morning Brief',
    id: 'Mo48CtRHOuwB09Rr',
    category: 'Daily Intelligence',
    trigger: 'Cron',
    schedule: '06:00 UTC',
    description: 'Daily crypto, AI news, and market analysis delivered to Slack.',
    status: 'active',
  },
  {
    name: 'AI Strategic Daily Brief',
    id: 'JbIxQmQJCbVOpqCr',
    category: 'Daily Intelligence',
    trigger: 'Cron',
    schedule: '07:00 UTC',
    description: 'AI industry trends, competitor moves, and strategic recommendations.',
    status: 'active',
  },
  {
    name: 'Dev Briefing',
    id: '1fkzT8C5Y6MkY5Sb',
    category: 'Daily Intelligence',
    trigger: 'Cron',
    schedule: '08:00 UTC',
    description: 'GitHub activity digest — PRs, commits, and repo events.',
    status: 'active',
  },

  // Content & Marketing
  {
    name: 'Content Atomizer',
    id: 'X5qZYPNayRMspuYX',
    category: 'Content & Marketing',
    trigger: 'Webhook',
    description: 'Blog → AI atomize → X thread + LinkedIn + newsletter snippet.',
    status: 'active',
  },
  {
    name: 'AI Newsletter Engine',
    id: 'newsletter-engine',
    category: 'Content & Marketing',
    trigger: 'Webhook',
    description: 'Newsletter compilation, formatting, and Resend delivery.',
    status: 'active',
  },
  {
    name: 'RSS Monitor',
    id: '7PoNOTCaCQubcAK0',
    category: 'Content & Marketing',
    trigger: 'Cron',
    schedule: 'Every 6h',
    description: 'Monitor AI/tech RSS feeds for content opportunities.',
    status: 'active',
  },

  // Analytics
  {
    name: 'Music Catalog Sync',
    id: 'AEalmmG7xGSmq6Wh',
    category: 'Analytics',
    trigger: 'Cron',
    schedule: '08:00 UTC',
    description: 'Daily Suno catalog sync — new tracks, metadata enrichment.',
    status: 'active',
  },

  // DevOps
  {
    name: 'Arcanea Video Pipeline',
    id: '1oEGJktWo9357uQc',
    category: 'DevOps',
    trigger: 'Webhook',
    description: 'Video ingest → analyze → plan → assemble → export pipeline.',
    status: 'inactive',
  },
  {
    name: 'Arcanean X Story Engine',
    id: 'syLlGYHRRJSu2oqs',
    category: 'Content & Marketing',
    trigger: 'Cron',
    description: 'Lore generation → 4-tweet threads → Slack approval → X post.',
    status: 'inactive',
  },
]

export const workflowCategories = Array.from(
  new Set(workflowRegistry.map((item) => item.category))
)

export const workflowSummary = {
  total: workflowRegistry.length,
  active: workflowRegistry.filter((item) => item.status === 'active').length,
  inactive: workflowRegistry.filter((item) => item.status === 'inactive').length,
  triggerTypes: Array.from(new Set(workflowRegistry.map((item) => item.trigger))).length,
  orchestratorRoutes: 8,
}
