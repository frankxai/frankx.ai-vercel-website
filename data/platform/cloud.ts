import type { CloudPage, FlowStep, PlatformArea } from './types'

export const cloudAudienceCards: PlatformArea[] = [
  {
    title: 'Cloud Account Teams',
    excerpt: 'Turn account signals into qualified AI workload conversations and demo narratives.',
    tags: ['signals', 'discovery', 'field'],
    href: '/cloud/ai-coe',
  },
  {
    title: 'Solution Engineers',
    excerpt: 'Move from whiteboard interest to working prototypes with architecture and evaluation paths.',
    tags: ['demos', 'architecture', 'prototypes'],
    href: '/cloud/prototype-sprints',
  },
  {
    title: 'AI CoE Teams',
    excerpt: 'Build a demand-to-workload operating system instead of a slide-heavy governance forum.',
    tags: ['coe', 'governance', 'backlog'],
    href: '/cloud/ai-coe',
  },
  {
    title: 'Cloud Partners and MSPs',
    excerpt: 'Package repeatable MCP, RAG, agent, and workflow patterns into sellable field assets.',
    tags: ['partners', 'assets', 'enablement'],
    href: '/cloud/mcp-to-cloud',
  },
  {
    title: 'AI-Native Founders',
    excerpt: 'Design the workload, cost model, tool boundaries, and production path before the demo hardens.',
    tags: ['founders', 'product', 'workload'],
    href: '/cloud/gpu-model-architecture',
  },
]

export const coeConsumptionFlow: FlowStep[] = [
  { title: 'Account or Industry Signal', description: 'Find the business pressure that justifies AI work.' },
  { title: 'Use Case Selection', description: 'Rank use cases by value, feasibility, data access, and sponsor clarity.' },
  { title: 'Prototype Sprint', description: 'Build a narrow working workflow that proves the path.' },
  { title: 'MCP, Tool, and Data Integration', description: 'Connect agents to the real systems they need to use.' },
  { title: 'Cloud Architecture', description: 'Choose runtime, storage, model, inference, and observability patterns.' },
  { title: 'Security and Governance', description: 'Scope permissions, audit logs, approvals, and secrets from day one.' },
  { title: 'Executive Demo Narrative', description: 'Explain the workload, tradeoffs, value path, and production ask.' },
  { title: 'Consumption Path', description: 'Map the prototype to real cloud services and operating ownership.' },
  { title: 'Repeatable Field Asset', description: 'Package the pattern so the next account starts faster.' },
]

export const cloudPillars: PlatformArea[] = [
  {
    title: 'AI CoE Operating Systems',
    excerpt: 'An AI CoE should be a workload factory: intake, prioritization, prototype, evaluation, production path, and field reuse.',
    tags: ['intake', 'governance', 'workload-factory'],
    href: '/cloud/ai-coe',
  },
  {
    title: 'MCP-to-Cloud Architecture',
    excerpt: 'MCP servers become the bridge between agents, cloud services, APIs, documents, databases, and enterprise workflows.',
    tags: ['mcp', 'agents', 'integration'],
    href: '/cloud/mcp-to-cloud',
  },
  {
    title: 'Prototype-to-Production Sprints',
    excerpt: 'Fast demos only matter when they can become real workloads with security, cost, evaluation, and deployment paths.',
    tags: ['sprints', 'production', 'demo'],
    href: '/cloud/prototype-sprints',
  },
  {
    title: 'GPU, Model, and Workload Architecture',
    excerpt: 'Models, inference, RAG, fine-tuning, agents, memory, evaluation, cost, and deployment should be designed together.',
    tags: ['gpu', 'models', 'inference'],
    href: '/cloud/gpu-model-architecture',
  },
  {
    title: 'Field Enablement',
    excerpt: 'Cloud teams need reusable demo narratives, discovery questions, architecture patterns, and consumption paths.',
    tags: ['enablement', 'discovery', 'assets'],
    href: '/cloud/prototype-sprints',
  },
]

export const cloudPages: CloudPage[] = [
  {
    slug: 'ai-coe',
    title: 'AI CoE Operating System',
    eyebrow: 'Cloud AI CoE',
    coreLine: 'Your AI CoE should convert demand into evaluated use cases, prototypes, production paths, reusable field assets, and measurable cloud consumption.',
    description: 'A practical operating system for AI teams that need to move from governance theater to a repeatable workload factory.',
    sections: [
      {
        title: 'The Problem',
        body: 'Many AI CoEs become committee loops: intake forms, policy discussions, vendor scans, and slide updates. The business still waits for working systems.',
        points: ['Unranked demand', 'Thin prototype discipline', 'No production ownership', 'Weak reuse across accounts'],
      },
      {
        title: 'The Shift',
        body: 'The AI CoE becomes a workload factory. It qualifies demand, chooses use cases, builds prototypes, tests risk, and packages patterns the field can reuse.',
        points: ['Use case library', 'Architecture patterns', 'Prototype sprints', 'Evaluation and security review'],
      },
      {
        title: 'Core System',
        body: 'A durable CoE needs operating cadence, artifact templates, decision rights, and clear handoff points into cloud platform teams.',
        points: ['Intake', 'Prioritization', 'Security review', 'Executive demos', 'Production roadmap', 'Consumption tracking'],
      },
      {
        title: 'Deliverables',
        body: 'The first build should leave behind tools that compound after the initial sprint.',
        points: ['Dashboard system', 'Use case backlog', 'Prototype templates', 'Architecture canvases', 'Field enablement assets', 'KPI dashboard'],
      },
    ],
    architecture: coeConsumptionFlow,
    ctaLabel: 'Build an AI CoE Consumption Engine',
    ctaHref: '/contact',
    metadataDescription: 'A practical AI CoE operating system for turning demand into use cases, prototypes, production paths, field assets, and cloud workload consumption.',
  },
  {
    slug: 'mcp-to-cloud',
    title: 'MCP-to-Cloud Architecture',
    eyebrow: 'Agent Infrastructure',
    coreLine: 'MCP is becoming a practical interface layer between AI agents and the systems they need to use.',
    description: 'A cloud architecture lens for MCP servers, agent clients, API boundaries, identity, data access, logs, and human approval gates.',
    sections: [
      {
        title: 'What MCP Changes',
        body: 'MCP makes tool access explicit. Instead of burying integrations inside one app, teams can expose narrow capabilities that agents call through governed interfaces.',
        points: ['Tool contracts', 'Scoped access', 'Reusable integrations', 'Cleaner agent boundaries'],
      },
      {
        title: 'Why Cloud Teams Should Care',
        body: 'MCP turns cloud services into action surfaces for AI systems. That means integration design, permissions, observability, cost control, and workload ownership matter early.',
        points: ['Cloud APIs', 'Object storage', 'Databases', 'Vector memory', 'Identity', 'Observability'],
      },
      {
        title: 'Example Use Cases',
        body: 'The pattern is strongest where agents need documents, business data, and approval-aware tools.',
        points: ['Sales research assistant', 'Document intelligence workflow', 'Cloud cost analyst', 'Internal knowledge agent', 'Prototype factory', 'Product research agent'],
      },
      {
        title: 'Security Notes',
        body: 'A serious MCP plan names what the agent can see, what it can do, what gets logged, and where a person must approve the action.',
        points: ['Permissions', 'Auditability', 'Secrets management', 'Scoped tool access', 'Logging', 'Human approval gates'],
      },
    ],
    architecture: [
      { title: 'Agent UI', description: 'The operator surface where prompts, approvals, and results are visible.' },
      { title: 'Model Layer', description: 'The routing layer for frontier, small, local, or specialized models.' },
      { title: 'MCP Clients', description: 'The agent-side bridge that discovers and calls available tools.' },
      { title: 'MCP Servers', description: 'Narrow integration surfaces for APIs, files, SaaS, and cloud services.' },
      { title: 'Cloud Services', description: 'Databases, object storage, vector memory, queues, functions, logs, and identity.' },
      { title: 'Governance', description: 'Approvals, policy, audit trails, secret boundaries, and cost controls.' },
    ],
    ctaLabel: 'Design an MCP-to-cloud prototype',
    ctaHref: '/contact',
    metadataDescription: 'MCP-to-cloud architecture for connecting AI agents to APIs, databases, documents, cloud services, observability, and governance.',
  },
  {
    slug: 'prototype-sprints',
    title: 'AI Prototype-to-Production Sprints',
    eyebrow: '10 Business Day Sprint',
    coreLine: 'In 10 business days, turn one high-value process into a working AI prototype with architecture, demo narrative, and production roadmap.',
    description: 'A sprint format for teams that need a real prototype, not a disconnected demo that cannot survive contact with production.',
    sections: [
      {
        title: 'Why Demos Fail',
        body: 'Most AI demos fail because the prototype is not connected to the real workflow, data constraints, approval path, or deployment model.',
        points: ['No owner', 'No evals', 'No security path', 'No cost model', 'No executive narrative'],
      },
      {
        title: 'What a Real Prototype Needs',
        body: 'A working prototype should make tradeoffs visible. The demo must explain what is proven, what remains unknown, and what production would require.',
        points: ['Workflow map', 'Tool design', 'Agent architecture', 'MCP plan', 'Cloud deployment path'],
      },
      {
        title: 'Sprint Deliverables',
        body: 'The sprint produces a focused set of artifacts that help the team decide whether to invest, iterate, or stop.',
        points: ['Use case decision', 'Cost model', 'Risk register', 'Executive demo script', '90-day roadmap'],
      },
      {
        title: 'Example Sprint Themes',
        body: 'Good sprint candidates are narrow, high-value, data-accessible, and easy to explain to a decision maker.',
        points: ['Sales intelligence', 'Document operations', 'Support triage', 'Cloud cost analysis', 'Research workflow', 'Field demo factory'],
      },
    ],
    architecture: [
      { title: 'Day 1-2', description: 'Decision, workflow map, success criteria, and data/tool access plan.' },
      { title: 'Day 3-5', description: 'Prototype build, agent/tool integration, prompt and workflow iteration.' },
      { title: 'Day 6-7', description: 'Evaluation, risk review, cost model, and security notes.' },
      { title: 'Day 8-9', description: 'Demo narrative, architecture diagram, and production roadmap.' },
      { title: 'Day 10', description: 'Executive walkthrough and decision package.' },
    ],
    ctaLabel: 'Request a prototype sprint',
    ctaHref: '/contact',
    metadataDescription: 'AI prototype-to-production sprint offer for turning one process into a working prototype, architecture, demo narrative, and production roadmap in 10 business days.',
  },
  {
    slug: 'gpu-model-architecture',
    title: 'GPU, Model and Workload Architecture',
    eyebrow: 'AI Workload Design',
    coreLine: 'AI architecture is no longer just model choice. It is workload design.',
    description: 'A practical architecture lens for matching RAG, agents, multimodal workflows, batch processing, fine-tuning, and inference to the right runtime path.',
    sections: [
      {
        title: 'Workload Categories',
        body: 'The right architecture starts with workload shape. Each category has different latency, context, data, and reliability constraints.',
        points: ['RAG', 'Agents', 'Multimodal', 'Batch processing', 'Synthetic data', 'Fine-tuning', 'Inference APIs', 'Evaluation'],
      },
      {
        title: 'Architecture Variables',
        body: 'Model choice is one variable. A production plan also needs context strategy, observability, routing, cost control, and deployment model.',
        points: ['Latency', 'Throughput', 'Context length', 'Data sensitivity', 'Cost', 'Model routing', 'Observability', 'Compliance'],
      },
      {
        title: 'Output',
        body: 'The goal is a decision package a builder can act on, not a generic list of model names.',
        points: ['Model selection matrix', 'GPU sizing logic', 'Inference strategy', 'Evaluation harness', 'Production path'],
      },
      {
        title: 'Decision Discipline',
        body: 'Good AI architecture keeps options open until the workload proves what it needs. Measure first, then harden.',
        points: ['Benchmark with real prompts', 'Track failure modes', 'Separate prototype from production', 'Name the operational owner'],
      },
    ],
    architecture: [
      { title: 'Use Case', description: 'Business task, user, workflow, and quality bar.' },
      { title: 'Data Boundary', description: 'Sensitivity, sources, retention, and permissions.' },
      { title: 'Model Strategy', description: 'Routing, context, inference, fine-tuning, and fallback.' },
      { title: 'Runtime Path', description: 'Serverless, containers, GPU, queues, batch, or managed APIs.' },
      { title: 'Evaluation', description: 'Golden cases, failure taxonomies, latency, cost, and regression checks.' },
      { title: 'Operations', description: 'Ownership, logs, alerting, approvals, and rollout plan.' },
    ],
    ctaLabel: 'Map your AI workload',
    ctaHref: '/contact',
    metadataDescription: 'GPU, model, and AI workload architecture for matching RAG, agents, inference, fine-tuning, evaluation, cost, security, and deployment.',
  },
]

export function getCloudPage(slug: string) {
  return cloudPages.find((page) => page.slug === slug)
}
