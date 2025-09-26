import type { Affiliate } from '@/types/affiliates'

export type PromptDifficulty = 'Beginner' | 'Intermediate' | 'Advanced'

export type PromptCategory =
  | 'task-specific'
  | 'ai-optimization'
  | 'business-applications'
  | 'creative-workflows'
  | 'technical-development'
  | 'educational-content'
  | 'music-audio'
  | 'visual-design'
  | 'data-analysis'
  | 'communication'
  | 'productivity'
  | 'interactive-experiences'

export type AITool =
  | 'claude'
  | 'chatgpt'
  | 'midjourney'
  | 'suno'
  | 'dalle'
  | 'stable-diffusion'
  | 'notion'
  | 'zapier'
  | 'make'
  | 'general'

export interface Prompt {
  id: string
  title: string
  description: string
  content: string
  category: PromptCategory
  tags: string[]
  aiTool: AITool
  difficulty: PromptDifficulty
  useCase: string
  rating: number
  usageCount: number
  createdAt: string
  updatedAt: string
  affiliateId?: Affiliate['id']
}

export interface CategoryInfo {
  id: PromptCategory
  name: string
  emoji: string
  description: string
  color: string
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'task-specific',
    name: 'Task-Specific',
    emoji: '🛠️',
    description: 'Operational playbooks for focused outcomes and checklists.',
    color: '#8B5CF6',
  },
  {
    id: 'ai-optimization',
    name: 'AI Optimization',
    emoji: '🤖',
    description: 'Tuning models, guardrails, and multi-agent workflows.',
    color: '#06B6D4',
  },
  {
    id: 'business-applications',
    name: 'Business Applications',
    emoji: '📈',
    description: 'Strategy, finance, and go-to-market acceleration prompts.',
    color: '#10B981',
  },
  {
    id: 'creative-workflows',
    name: 'Creative Workflows',
    emoji: '🎨',
    description: 'Narrative, script, and concept systems for creative teams.',
    color: '#F59E0B',
  },
  {
    id: 'technical-development',
    name: 'Technical Dev',
    emoji: '💻',
    description: 'Engineering blueprints, code reviews, and QA automations.',
    color: '#EF4444',
  },
  {
    id: 'educational-content',
    name: 'Educational Content',
    emoji: '📚',
    description: 'Curriculum design, cohort facilitation, and learning loops.',
    color: '#6366F1',
  },
  {
    id: 'music-audio',
    name: 'Music & Audio',
    emoji: '🎵',
    description: 'Suno, DAW, and sonic identity workflows for producers.',
    color: '#EC4899',
  },
  {
    id: 'visual-design',
    name: 'Visual Design',
    emoji: '🖼️',
    description: 'Midjourney/DALL·E art direction and brand-safe palettes.',
    color: '#F97316',
  },
  {
    id: 'data-analysis',
    name: 'Data Analysis',
    emoji: '📊',
    description: 'Dashboards, research synthesis, and model interpretation.',
    color: '#3B82F6',
  },
  {
    id: 'communication',
    name: 'Communication',
    emoji: '💬',
    description: 'Storytelling, stakeholder management, and investor updates.',
    color: '#8B5CF6',
  },
  {
    id: 'productivity',
    name: 'Productivity',
    emoji: '⚡',
    description: 'Systems for personal leverage, daily planning, and rituals.',
    color: '#6B7280',
  },
  {
    id: 'interactive-experiences',
    name: 'Interactive Experiences',
    emoji: '🎮',
    description: 'Immersive, game, and experiential design prompt packs.',
    color: '#10B981',
  },
]

export const PROMPTS: Prompt[] = [
  {
    id: 'strategic-intake-briefing',
    title: 'Executive Intelligence Intake Briefing',
    description: 'Claude distills leadership signals, friction points, and recommended actions into a board-ready brief in five minutes.',
    content: `You are Claude, acting as an executive strategic partner for FrankX.ai.

Goal: Prepare a leadership intake brief for the following raw notes and metrics.

Context to ingest:
- Audience: [executive stakeholder]
- Primary signals surfaced this week: [signals]
- Metrics snapshot: [metric highlights]
- Open risks / blockers: [risks]
- Required decision date: [deadline]

Output format:
1. Situation summary (3 bullets max)
2. Opportunity analysis (2 short paragraphs)
3. Action plan (3 clear directives with owners)
4. Flagged risks & mitigation
5. Recommended follow-up touchpoint (channel + timeline)

Tone: executive, confident, intelligence-era narrative.
Cite data when available. Keep it under 350 words.`,
    category: 'business-applications',
    tags: ['executive brief', 'strategy', 'ops'],
    aiTool: 'claude',
    difficulty: 'Intermediate',
    useCase: 'Strategy leaders preparing weekly executive updates with precise actions.',
    rating: 4.9,
    usageCount: 3821,
    createdAt: '2025-05-12T10:00:00.000Z',
    updatedAt: '2025-08-28T12:00:00.000Z',
    affiliateId: 'claude',
  },
  {
    id: 'seo-sprint-orchestrator',
    title: 'Agentic SEO Sprint Orchestrator',
    description: 'ChatGPT maps a 7-day publishing sprint tied to FrankX flagship narratives with distribution and measurement hooks.',
    content: `You are ChatGPT acting as an SEO sprint producer inside the FrankX Intelligence Atlas.

Inputs:
- Flagship narrative focus: [narrative]
- Target keywords & intent clusters: [keywords]
- Audience persona: [persona]
- Available assets: [existing assets]

Deliverables:
1. 7-day publishing plan with daily objective, asset type, primary keyword, CTA mapping.
2. Distribution plan (owned, earned, paid) with channel copy prompts.
3. Measurement checklist: KPIs, instrumentation notes, review cadence.
4. Risks & guardrails (compliance, accuracy, tone).

Return results in a table, followed by bullet highlights.`,
    category: 'ai-optimization',
    tags: ['seo', 'content operations', 'automation'],
    aiTool: 'chatgpt',
    difficulty: 'Advanced',
    useCase: 'Growth pods needing fast, accountable SEO sprints tied to flagship content.',
    rating: 4.8,
    usageCount: 2914,
    createdAt: '2025-04-02T09:30:00.000Z',
    updatedAt: '2025-08-10T15:00:00.000Z',
    affiliateId: 'chatgpt',
  },
  {
    id: 'creator-ritual-calendar',
    title: 'Creator Ritual Calendar (90 Days)',
    description: 'Design a ritualized production calendar that keeps artists shipping without burnout.',
    content: `You are Claude composing a 90-day ritual calendar for a hybrid artist-technologist.

Parameters:
- Creative focus: [discipline]
- Release cadence: [cadence]
- Energy constraints: [constraints]
- Community obligations: [community]

Produce:
1. Weekly rhythm (focus theme, anchor ritual, accountability loop).
2. Daily micro-practices (AM/PM prompts, embodiment cues).
3. Automation assist (agents/tools + how they reduce cognitive load).
4. Renewal moments (rest, inspiration, collective sync).

Deliver as markdown tables with bullet callouts.`,
    category: 'creative-workflows',
    tags: ['rituals', 'planning', 'creative systems'],
    aiTool: 'claude',
    difficulty: 'Beginner',
    useCase: 'Creators balancing releases, community, and wellbeing inside the Vibe OS.',
    rating: 4.7,
    usageCount: 1987,
    createdAt: '2025-03-18T12:00:00.000Z',
    updatedAt: '2025-08-05T09:00:00.000Z',
    affiliateId: 'claude',
  },
  {
    id: 'midjourney-brand-atlas',
    title: 'Midjourney Brand Atlas Brief',
    description: 'Generate a cohesive Midjourney brand system with hero, detail, and motion frames.',
    content: `You are Midjourney v6 art director for FrankX brand refresh.

Guidelines:
- Brand pillars: oracle intelligence, aurora motion, soulful tech.
- Color lanes: midnight navy, aurora cyan, pulse amber.
- Visual motifs: particles, glassmorphism, neuro-grid.

Create prompt sets:
1. Hero scene (landing hero)
2. Detail macro (UI close-up)
3. Motion concept (ambient video stills)

For each, provide:
- Prompt short form
- Stylization parameters (--ar, --stylize, --quality)
- Negative prompt hints

Output as a numbered list with code blocks for easy copy.`,
    category: 'visual-design',
    tags: ['brand', 'midjourney', 'design system'],
    aiTool: 'midjourney',
    difficulty: 'Intermediate',
    useCase: 'Design leads refreshing web/app visuals while keeping the FrankX signature.',
    rating: 4.9,
    usageCount: 2450,
    createdAt: '2025-06-01T11:00:00.000Z',
    updatedAt: '2025-08-20T14:30:00.000Z',
    affiliateId: 'midjourney',
  },
  {
    id: 'suno-anthem-seed',
    title: 'Suno Anthem Seed Pack',
    description: 'Rapidly craft a Suno anthem brief with narrative arc, instrumentation, and vocal vibe.',
    content: `You are Suno composing the FrankX weekly anthem.

Inputs:
- Emotion target: [emotion]
- BPM range: [range]
- Genre fusion: [genres]
- Narrative beat: [story]

Output:
1. Lyric sheet (verse, chorus, bridge) with intelligence-era imagery.
2. Arrangement notes (instrument layers, transitions, drops).
3. Vocal treatment (timbre, effects, call-and-response prompts).
4. Mixing checklist for engineers.

Return results with section headers and bullets.`,
    category: 'music-audio',
    tags: ['suno', 'songwriting', 'rituals'],
    aiTool: 'suno',
    difficulty: 'Intermediate',
    useCase: 'Music ritual teams crafting branded weekly drops in alignment with campaign themes.',
    rating: 4.8,
    usageCount: 1732,
    createdAt: '2025-02-10T16:00:00.000Z',
    updatedAt: '2025-08-11T10:00:00.000Z',
    affiliateId: 'suno',
  },
  {
    id: 'governance-readiness-audit',
    title: 'AI Governance Readiness Audit',
    description: 'Assess governance posture, surface risks, and prescribe the next maturity step.',
    content: `You are Claude, an enterprise governance auditor for FrankX.ai clients.

Inputs:
- Sector & team size: [details]
- Current AI deployments: [systems]
- Policies in place: [policies]
- Pain points: [issues]

Deliver:
1. Governance maturity score (1-5) with rationale.
2. Risk register table (risk, likelihood, impact, mitigation owner).
3. Immediate next steps (3 actions, 7-day horizon).
4. Long-term roadmap (30/90-day initiatives).

Write in confident, advisory tone with bullet clarity.`,
    category: 'business-applications',
    tags: ['governance', 'risk', 'compliance'],
    aiTool: 'claude',
    difficulty: 'Advanced',
    useCase: 'Consultants guiding enterprise partners through governance adoption.',
    rating: 4.9,
    usageCount: 1544,
    createdAt: '2025-01-29T10:30:00.000Z',
    updatedAt: '2025-09-12T08:00:00.000Z',
    affiliateId: 'claude',
  },
  {
    id: 'data-storytelling-canvas',
    title: 'Data Storytelling Canvas',
    description: 'Transform raw telemetry into narrative arcs with visuals and executive hooks.',
    content: `You are ChatGPT translating FrankX telemetry ([dataset summary]) into a presentation storyboard.

Deliver:
1. Core insight statement (<=40 words).
2. Slide outline (6 slides max) with title, key visual, narrative beat.
3. CTA ladder (immediate, 30-day, 90-day actions).
4. Suggested data visual types with Midjourney prompts for cover art.

Tone: authoritative, action-focused.`,
    category: 'data-analysis',
    tags: ['storytelling', 'dashboards', 'analytics'],
    aiTool: 'chatgpt',
    difficulty: 'Intermediate',
    useCase: 'Analysts converting intelligence atlas metrics into leadership briefings.',
    rating: 4.7,
    usageCount: 1890,
    createdAt: '2025-07-04T09:00:00.000Z',
    updatedAt: '2025-08-25T11:00:00.000Z',
    affiliateId: 'chatgpt',
  },
  {
    id: 'agent-architecture-blueprint',
    title: 'Multi-Agent Architecture Blueprint',
    description: 'Map an orchestrated agent system with triggers, guardrails, and observability.',
    content: `You are Claude designing a multi-agent system for [workflow].

Steps:
1. Identify agents (role, core skill, fail-safes).
2. Define orchestration timeline (trigger, dependency, success metric).
3. Observability stack (logs, dashboards, intervention playbook).
4. Risk mitigation (bias, hallucination, escalation path).

Provide markdown tables and bullet callouts.`,
    category: 'technical-development',
    tags: ['agents', 'architecture', 'automation'],
    aiTool: 'claude',
    difficulty: 'Advanced',
    useCase: 'Solutions architects blueprinting internal intelligence automations.',
    rating: 4.8,
    usageCount: 2114,
    createdAt: '2025-06-15T13:00:00.000Z',
    updatedAt: '2025-09-01T09:45:00.000Z',
    affiliateId: 'claude',
  },
  {
    id: 'notion-control-center',
    title: 'Notion Control Center Generator',
    description: 'Design a Notion HQ with dashboards, linked databases, and automation triggers.',
    content: `You are an operations architect configuring a Notion workspace for FrankX.

Inputs:
- Core teams: [teams]
- Ritual cadence: [cadence]
- Key databases: [dbs]

Output:
1. Workspace map (top-level pages, permissions wrap).
2. Database schema recommendations.
3. Automation hooks (Notion + Zapier/Make scenarios).
4. Rollout checklist with training modules.

Return as structured markdown.`,
    category: 'productivity',
    tags: ['systems', 'workspace', 'automation'],
    aiTool: 'notion',
    difficulty: 'Intermediate',
    useCase: 'Operators setting up a unified HQ for intelligence rituals.',
    rating: 4.6,
    usageCount: 1320,
    createdAt: '2025-05-01T10:00:00.000Z',
    updatedAt: '2025-08-30T12:15:00.000Z',
    affiliateId: 'notion',
  },
  {
    id: 'zapier-orchestration-brief',
    title: 'Zapier Intelligence Orchestration Brief',
    description: 'Document a reliable Zapier scenario connecting Atlas drops to CRM follow-ups.',
    content: `You are Zapier designing an automation that syncs new Atlas drops to the CRM.

Components:
- Trigger app/event
- Filters & branching rules
- Data enrichment steps
- Error handling + alerting

Produce a playbook with:
1. Scenario diagram
2. Step-by-step build instructions
3. Testing script
4. Maintenance schedule

Return as markdown with numbered steps.`,
    category: 'productivity',
    tags: ['automation', 'crm', 'operations'],
    aiTool: 'zapier',
    difficulty: 'Intermediate',
    useCase: 'Ops teams automating marketing-to-revenue handoffs.',
    rating: 4.5,
    usageCount: 1189,
    createdAt: '2025-04-18T11:00:00.000Z',
    updatedAt: '2025-08-18T09:30:00.000Z',
    affiliateId: 'zapier',
  },
  {
    id: 'learning-cohort-outline',
    title: 'Learning Cohort Outline',
    description: 'Draft a four-week cohort experience with reflection prompts and assessment checkpoints.',
    content: `You are Claude building a learning cohort for the Intelligence Atlas Volume I.

Inputs:
- Cohort persona: [persona]
- Desired transformation: [outcome]
- Weekly time commitment: [hours]

Deliver:
1. Weekly themes + learning objectives
2. Live session agenda & assets
3. Async assignments & reflection prompts
4. Assessment framework & success metrics

Return as markdown tables.`,
    category: 'educational-content',
    tags: ['curriculum', 'cohort', 'education'],
    aiTool: 'claude',
    difficulty: 'Beginner',
    useCase: 'Educators launching guided cohorts leveraging Atlas research.',
    rating: 4.7,
    usageCount: 1422,
    createdAt: '2025-02-25T12:00:00.000Z',
    updatedAt: '2025-08-17T10:30:00.000Z',
    affiliateId: 'claude',
  },
  {
    id: 'interactive-onboarding-scenario',
    title: 'Interactive Onboarding Scenario',
    description: 'Build a branching onboarding experience that teaches new members the FrankX operating system.',
    content: `You are Claude designing an interactive onboarding walkthrough.

Inputs:
- Audience: [role]
- Key narrative pillars: [pillars]
- Critical tools to learn: [tools]

Produce:
1. Branching storyline map (steps, decisions, success criteria).
2. Dialogue + prompts for each node.
3. Embedded media suggestions (audio, visuals, demos).
4. Success metrics and feedback loop.

Return as markdown with diagrams described in text.`,
    category: 'interactive-experiences',
    tags: ['onboarding', 'experience design', 'training'],
    aiTool: 'claude',
    difficulty: 'Intermediate',
    useCase: 'Community teams making onboarding memorable and measurable.',
    rating: 4.6,
    usageCount: 980,
    createdAt: '2025-05-22T12:30:00.000Z',
    updatedAt: '2025-08-27T13:15:00.000Z',
    affiliateId: 'claude',
  },
  {
    id: 'investor-narrative-brief',
    title: 'Investor Narrative Brief',
    description: 'Craft an investor-ready story anchored in traction, market insight, and the intelligence roadmap.',
    content: `You are ChatGPT acting as investor narrative strategist.

Inputs:
- Current traction metrics: [metrics]
- Market thesis: [thesis]
- Upcoming catalysts: [catalysts]

Deliverable:
1. One-sentence positioning.
2. Three-slide narrative arc with bullet headlines.
3. FAQ prep (5 questions + answers).
4. Follow-up materials checklist.

Keep it punchy, authoritative, and rooted in data.`,
    category: 'communication',
    tags: ['fundraising', 'storytelling', 'pitch'],
    aiTool: 'chatgpt',
    difficulty: 'Intermediate',
    useCase: 'Founders preparing investor conversations with consistent messaging.',
    rating: 4.8,
    usageCount: 1650,
    createdAt: '2025-03-08T09:15:00.000Z',
    updatedAt: '2025-08-14T16:45:00.000Z',
    affiliateId: 'chatgpt',
  },
  {
    id: 'customer-voice-compass',
    title: 'Customer Voice Compass',
    description: 'Synthesize interviews into a voice-of-customer compass for copywriters and product teams.',
    content: `You are Claude analyzing customer interviews for FrankX.

Inputs:
- Interview transcripts: [transcripts]
- Segment focus: [segment]

Return:
1. Emotional drivers matrix.
2. Blockers & objections list with quote snippets.
3. Copy hooks (headline, subhead, CTA) per segment.
4. Follow-up research recommendations.

Use bullet lists with bold keywords.`,
    category: 'communication',
    tags: ['voc', 'copywriting', 'research'],
    aiTool: 'claude',
    difficulty: 'Beginner',
    useCase: 'Copy and product teams aligning messaging with fresh customer insight.',
    rating: 4.6,
    usageCount: 1483,
    createdAt: '2025-04-12T11:00:00.000Z',
    updatedAt: '2025-08-06T10:20:00.000Z',
    affiliateId: 'claude',
  },
  {
    id: 'stable-diffusion-lighting-lab',
    title: 'Stable Diffusion Lighting Lab',
    description: 'Experiment with cinematic lighting setups tailored to FrankX glassmorphic scenes.',
    content: `You are Stable Diffusion with ControlNet enabled.

Inputs:
- Scene description: [scene]
- Mood palette: [mood]

Provide:
1. Prompt formula (with lighting keywords, camera, lens info).
2. Three lighting variations (scopes + negative prompts).
3. Post-processing checklist (color grading, grain, glow).

Return results with numbered lists and code blocks.`,
    category: 'visual-design',
    tags: ['stable diffusion', 'lighting', 'visuals'],
    aiTool: 'stable-diffusion',
    difficulty: 'Advanced',
    useCase: 'Designers refining stills for decks, landing pages, and motion references.',
    rating: 4.5,
    usageCount: 1120,
    createdAt: '2025-07-21T14:00:00.000Z',
    updatedAt: '2025-08-29T10:30:00.000Z',
    affiliateId: 'stable-diffusion',
  },
  {
    id: 'agent-support-runbook',
    title: 'Agent Support Runbook',
    description: 'Document the human-in-the-loop protocol for monitoring and intervening in agent workflows.',
    content: `You are Claude, documenting the agent support runbook.

Inputs:
- Agent network overview: [agents]
- Critical workflows: [workflows]

Deliver:
1. Alert taxonomy (severity, triggers, response window).
2. Intervention playbook (step-by-step).
3. Escalation path (roles, contact cadence).
4. Post-mortem template.

Return as bullet lists and tables.`,
    category: 'ai-optimization',
    tags: ['support', 'operations', 'reliability'],
    aiTool: 'claude',
    difficulty: 'Intermediate',
    useCase: 'Ops teams providing human oversight for automated pipelines.',
    rating: 4.7,
    usageCount: 1325,
    createdAt: '2025-06-26T10:20:00.000Z',
    updatedAt: '2025-08-16T09:50:00.000Z',
    affiliateId: 'claude',
  },
  {
    id: 'make-router-blueprint',
    title: 'Make Router Blueprint',
    description: 'Design a Make (Integromat) router scenario that directs leads to the right nurture pod.',
    content: `You are Make.com architecting a router scenario.

Inputs:
- Lead sources: [sources]
- Segmentation logic: [logic]
- Downstream tools: [tools]

Deliver:
1. Router branches with conditions.
2. Module configuration notes.
3. Error handling path.
4. Monitoring dashboard outline.

Return as markdown with numbered steps and tables.`,
    category: 'productivity',
    tags: ['make.com', 'automation', 'routing'],
    aiTool: 'make',
    difficulty: 'Advanced',
    useCase: 'Automation engineers orchestrating complex nurture paths without code.',
    rating: 4.6,
    usageCount: 940,
    createdAt: '2025-05-30T12:45:00.000Z',
    updatedAt: '2025-08-19T11:30:00.000Z',
    affiliateId: 'make',
  },
  {
    id: 'daily-ops-standup',
    title: 'Daily Intelligence Ops Standup Prompt',
    description: 'Keep the FrankX daily intelligence ritual on track with clear signal scans and decisions.',
    content: `You are Claude facilitating the FrankX Daily Intelligence Operations ritual.

Participants provide:
- Yesterday's shipped assets
- Top signal or anomaly spotted
- Blockers or support requests

Facilitation steps:
1. Summarize macro signal (2 sentences).
2. Highlight wins & telemetry (bullet list).
3. Assign priority actions (owner, due date, metric).
4. Capture learnings in the ritual log.

Return as a meeting script with timestamps.`,
    category: 'task-specific',
    tags: ['operations', 'ritual', 'standup'],
    aiTool: 'claude',
    difficulty: 'Beginner',
    useCase: 'Daily facilitator keeping the intelligence hub aligned and accountable.',
    rating: 4.8,
    usageCount: 2219,
    createdAt: '2025-01-05T08:30:00.000Z',
    updatedAt: '2025-08-22T08:30:00.000Z',
    affiliateId: 'claude',
  },
]

export function getPromptsByCategory(category: PromptCategory): Prompt[] {
  return PROMPTS.filter((prompt) => prompt.category === category)
}

export function getPromptsByTool(tool: AITool): Prompt[] {
  return PROMPTS.filter((prompt) => prompt.aiTool === tool)
}

export function getPromptById(id: string): Prompt | undefined {
  return PROMPTS.find((prompt) => prompt.id === id)
}

export function searchPrompts(query: string): Prompt[] {
  if (!query.trim()) {
    return PROMPTS
  }

  const lower = query.toLowerCase()
  return PROMPTS.filter((prompt) =>
    prompt.title.toLowerCase().includes(lower) ||
    prompt.description.toLowerCase().includes(lower) ||
    prompt.tags.some((tag) => tag.toLowerCase().includes(lower)) ||
    prompt.content.toLowerCase().includes(lower)
  )
}

export function getFeaturedPrompts(): Prompt[] {
  return PROMPTS
    .filter((prompt) => prompt.rating >= 4.7 && prompt.usageCount >= 1500)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 12)
}

export function getPromptStats() {
  const totalPrompts = PROMPTS.length
  const totalCategories = new Set(PROMPTS.map((prompt) => prompt.category)).size
  const totalUsage = PROMPTS.reduce((sum, prompt) => sum + prompt.usageCount, 0)
  const averageRating =
    Math.round((PROMPTS.reduce((sum, prompt) => sum + prompt.rating, 0) / totalPrompts) * 10) /
    10
  const toolsUsed = Array.from(new Set(PROMPTS.map((prompt) => prompt.aiTool)))
  const difficultyDistribution: Record<PromptDifficulty, number> = {
    Beginner: PROMPTS.filter((prompt) => prompt.difficulty === 'Beginner').length,
    Intermediate: PROMPTS.filter((prompt) => prompt.difficulty === 'Intermediate').length,
    Advanced: PROMPTS.filter((prompt) => prompt.difficulty === 'Advanced').length,
  }

  return {
    totalPrompts,
    totalCategories,
    totalUsage,
    averageRating,
    toolsUsed,
    difficultyDistribution,
  }
}

export type PromptLibraryStats = ReturnType<typeof getPromptStats>

