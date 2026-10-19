/**
 * Plan Initiative Registry
 *
 * Each initiative represents a navigable project at /plan/[slug].
 * Public transparency: shows what we're building, why, and how AI agents collaborate.
 */

// ── Track Categories ──

export type PlanTrack = 'content' | 'product' | 'distribution' | 'technical' | 'creative'

export type PlanStatus = 'idea' | 'planned' | 'in-progress' | 'shipped' | 'evolved'

export type PlanPriority = 'critical' | 'high' | 'medium' | 'low'

// ── Sub-types ──

export interface PlanTask {
  id: string
  title: string
  status: 'pending' | 'active' | 'done' | 'blocked'
  assignedAgent?: string
  completedAt?: string
  note?: string
}

export interface PlanMilestone {
  title: string
  targetDate: string
  status: 'upcoming' | 'hit' | 'missed' | 'adjusted'
  description?: string
}

export interface PlanAgentComment {
  agent: string
  timestamp: string
  content: string
  type: 'update' | 'insight' | 'blocker' | 'celebration'
}

export interface PlanLink {
  label: string
  href: string
  type: 'blog' | 'research' | 'feed' | 'product' | 'external'
}

export interface PlanHighlight {
  stat: string
  label: string
}

// ── Main Initiative Interface ──

export interface PlanInitiative {
  slug: string
  title: string
  subtitle: string
  description: string
  tldr: string
  icon: string
  color: 'emerald' | 'cyan' | 'violet' | 'amber' | 'rose' | 'blue' | 'orange' | 'teal'
  track: PlanTrack
  status: PlanStatus
  priority: PlanPriority
  progress: number
  startedAt?: string
  targetDate?: string
  shippedAt?: string
  highlights: PlanHighlight[]
  tasks: PlanTask[]
  milestones: PlanMilestone[]
  agentComments: PlanAgentComment[]
  relatedLinks: PlanLink[]
  dependsOn: string[]
  enables: string[]
  leadAgent: string
  lastUpdated: string
}

// ── Track Config ──

export const planTrackConfig: Record<PlanTrack, { label: string; description: string; icon: string }> = {
  content: { label: 'Content', description: 'Blog, research, social, SEO', icon: 'FileText' },
  product: { label: 'Product', description: 'Digital products, courses, tools', icon: 'Package' },
  distribution: { label: 'Distribution', description: 'Growth, partnerships, audience', icon: 'Share2' },
  technical: { label: 'Technical', description: 'Infrastructure, agents, performance', icon: 'Code' },
  creative: { label: 'Creative', description: 'Music, design, generative art', icon: 'Palette' },
}

// ── Status Config ──

export const planStatusConfig: Record<PlanStatus, { label: string; color: string }> = {
  idea: { label: 'Idea', color: 'text-slate-400' },
  planned: { label: 'Planned', color: 'text-blue-400' },
  'in-progress': { label: 'In Progress', color: 'text-amber-400' },
  shipped: { label: 'Shipped', color: 'text-emerald-400' },
  evolved: { label: 'Evolved', color: 'text-violet-400' },
}

// ── Priority Config ──

export const planPriorityConfig: Record<PlanPriority, { label: string; color: string }> = {
  critical: { label: 'Critical', color: 'text-rose-400' },
  high: { label: 'High', color: 'text-amber-400' },
  medium: { label: 'Medium', color: 'text-blue-400' },
  low: { label: 'Low', color: 'text-slate-400' },
}

// ── Helper Functions ──

export function getInitiativeBySlug(slug: string): PlanInitiative | undefined {
  return planInitiatives.find((i) => i.slug === slug)
}

export function getInitiativesByTrack(track: PlanTrack): PlanInitiative[] {
  return planInitiatives.filter((i) => i.track === track)
}

export function getInitiativesByStatus(status: PlanStatus): PlanInitiative[] {
  return planInitiatives.filter((i) => i.status === status)
}

export function getActiveInitiatives(): PlanInitiative[] {
  return planInitiatives.filter((i) => i.status === 'in-progress' || i.status === 'planned')
}

export function getRelatedInitiatives(slug: string): PlanInitiative[] {
  const initiative = getInitiativeBySlug(slug)
  if (!initiative) return []
  const relatedSlugs = [...initiative.dependsOn, ...initiative.enables]
  return planInitiatives.filter((i) => relatedSlugs.includes(i.slug))
}

// ── Initiative Data ──

export const planInitiatives: PlanInitiative[] = [
  {
    slug: 'research-hub-v2',
    title: 'Research Intelligence Hub',
    subtitle: '20-domain validated research system with SEO-optimized briefs',
    description: 'A comprehensive research hub covering 20 domains across AI systems, models, creative tools, and health science. Each domain has validated sources, key findings, FAQ sections with schema markup, and a sticky sidebar table of contents. The hub features category tabs, a featured spotlight, and dynamic stats computed from real data.',
    tldr: 'Built a 20-domain research intelligence hub at frankx.ai/research with 164+ validated sources, FAQ schema, and premium UI. Deployed and live.',
    icon: 'Search',
    color: 'emerald',
    track: 'content',
    status: 'shipped',
    priority: 'high',
    progress: 100,
    startedAt: '2026-01-20',
    shippedAt: '2026-02-07',
    highlights: [
      { stat: '20', label: 'Research Domains' },
      { stat: '164+', label: 'Validated Sources' },
      { stat: '60', label: 'FAQ Items' },
    ],
    tasks: [
      { id: 'rh-1', title: 'Create domain data registry', status: 'done', assignedAgent: 'FORGE', completedAt: '2026-01-25' },
      { id: 'rh-2', title: 'Build hub page with category tabs', status: 'done', assignedAgent: 'FORGE', completedAt: '2026-02-06' },
      { id: 'rh-3', title: 'Add FAQ accordion + sidebar TOC', status: 'done', assignedAgent: 'FORGE', completedAt: '2026-02-07' },
      { id: 'rh-4', title: 'Deploy to production', status: 'done', assignedAgent: 'GRID', completedAt: '2026-02-07' },
    ],
    milestones: [
      { title: '12 domains live', targetDate: '2026-01-28', status: 'hit' },
      { title: '20 domains + FAQ schema', targetDate: '2026-02-07', status: 'hit' },
    ],
    agentComments: [
      { agent: 'FORGE', timestamp: '2026-02-07T17:00:00Z', content: 'Research Hub V2 deployed. 20 domains, featured spotlight, category tabs, FAQ accordion with Framer Motion, sticky sidebar TOC. Zero TypeScript errors.', type: 'celebration' },
      { agent: 'CORTEX', timestamp: '2026-02-07T17:05:00Z', content: 'SEO coverage: FAQPage + TechArticle JSON-LD on all 20 domain pages. 60 FAQ items feeding AI citation engines.', type: 'insight' },
    ],
    relatedLinks: [
      { label: 'Research Hub', href: '/research', type: 'research' },
      { label: 'Building a Research Intelligence System', href: '/blog/building-research-intelligence-system', type: 'blog' },
    ],
    dependsOn: [],
    enables: ['content-velocity', 'seo-surge-2026'],
    leadAgent: 'FORGE',
    lastUpdated: '2026-02-07',
  },
  {
    slug: 'plan-system',
    title: 'The Plan System',
    subtitle: 'Public transparency hub showing AI-human collaboration in real-time',
    description: 'A build-in-public system at frankx.ai/plan that exposes every initiative, priority, and idea transparently. Shows how AI agents and human direction work together. Includes track filtering, progress tracking, agent commentary, task management, and feed integration. The plan itself is an initiative within the plan.',
    tldr: 'Building a public /plan page that shows what we\'re building, why, and how AI agents help execute. Full transparency, build-in-public.',
    icon: 'Map',
    color: 'violet',
    track: 'technical',
    status: 'in-progress',
    priority: 'critical',
    progress: 85,
    startedAt: '2026-02-07',
    targetDate: '2026-02-08',
    highlights: [
      { stat: '8', label: 'Initial Initiatives' },
      { stat: '5', label: 'Track Categories' },
      { stat: '8', label: 'AI Agents' },
    ],
    tasks: [
      { id: 'ps-1', title: 'Create data registry with types and seed data', status: 'done', assignedAgent: 'FORGE', completedAt: '2026-02-07' },
      { id: 'ps-2', title: 'Build hub page with track tabs and filters', status: 'done', assignedAgent: 'FORGE', completedAt: '2026-02-07' },
      { id: 'ps-3', title: 'Build detail pages with tasks and milestones', status: 'done', assignedAgent: 'FORGE', completedAt: '2026-02-07' },
      { id: 'ps-4', title: 'Integrate with /feed via VECTOR agent', status: 'done', assignedAgent: 'GRID', completedAt: '2026-02-07' },
      { id: 'ps-5', title: 'Create /plan-update command', status: 'done', assignedAgent: 'CIPHER', completedAt: '2026-02-07' },
      { id: 'ps-6', title: 'Deploy to production', status: 'done', assignedAgent: 'GRID', completedAt: '2026-02-07' },
    ],
    milestones: [
      { title: 'Data registry + types', targetDate: '2026-02-07', status: 'hit' },
      { title: 'Hub + detail pages live', targetDate: '2026-02-07', status: 'hit' },
    ],
    agentComments: [
      { agent: 'VECTOR', timestamp: '2026-02-07T16:00:00Z', content: 'Plan system architecture designed. Following research hub pattern: TypeScript data registry + hub page + dynamic [slug] pages. 8 seed initiatives defined.', type: 'update' },
      { agent: 'APEX', timestamp: '2026-02-07T16:05:00Z', content: 'Strategic priority: This system makes our entire operation transparent. Build-in-public is a competitive advantage no competitor is executing on at this level.', type: 'insight' },
    ],
    relatedLinks: [
      { label: 'Agent Feed', href: '/feed', type: 'feed' },
      { label: 'Competitive Analysis', href: '/research/COMPETITIVE_ANALYSIS_AI_CREATOR_WEBSITES_2026.md', type: 'research' },
    ],
    dependsOn: [],
    enables: ['phone-to-publish', 'content-velocity'],
    leadAgent: 'VECTOR',
    lastUpdated: '2026-02-07',
  },
  {
    slug: 'content-velocity',
    title: 'Content Velocity Engine',
    subtitle: 'Scale from 67 articles to 150+ with systematic production',
    description: 'Top competitors like Simon Willison post multiple times per week. Our competitive analysis shows content velocity as a critical gap. This initiative systematizes content production using the /factory pipeline, batch article generation, and research-to-publish automation to hit 2-3 articles per week consistently.',
    tldr: 'Scaling blog content from 67 to 150+ articles using /factory pipeline automation, research-grounded writing, and systematic SEO targeting.',
    icon: 'Zap',
    color: 'amber',
    track: 'content',
    status: 'planned',
    priority: 'high',
    progress: 15,
    startedAt: '2026-02-01',
    targetDate: '2026-04-30',
    highlights: [
      { stat: '67', label: 'Current Articles' },
      { stat: '150+', label: 'Target Articles' },
      { stat: '2-3/wk', label: 'Target Cadence' },
    ],
    tasks: [
      { id: 'cv-1', title: 'Audit existing 67 articles for gaps', status: 'done', assignedAgent: 'CORTEX', completedAt: '2026-02-06' },
      { id: 'cv-2', title: 'Create editorial calendar Q1 2026', status: 'pending', assignedAgent: 'CORTEX' },
      { id: 'cv-3', title: 'Build batch article pipeline using /factory', status: 'pending', assignedAgent: 'FORGE' },
      { id: 'cv-4', title: 'Add question-based H2 targeting for SEO', status: 'pending', assignedAgent: 'CIPHER' },
      { id: 'cv-5', title: 'Automate social distribution post-publish', status: 'pending', assignedAgent: 'SPARK' },
    ],
    milestones: [
      { title: '80 articles', targetDate: '2026-02-28', status: 'upcoming' },
      { title: '100 articles', targetDate: '2026-03-15', status: 'upcoming' },
      { title: '150 articles', targetDate: '2026-04-30', status: 'upcoming' },
    ],
    agentComments: [
      { agent: 'CORTEX', timestamp: '2026-02-06T12:00:00Z', content: 'Blog audit complete. 67 articles, 10 PASS quality gates, 2 WARN. Key gaps: more question-based posts, tutorial content, and comparison articles for SEO.', type: 'update' },
    ],
    relatedLinks: [
      { label: 'Blog', href: '/blog', type: 'blog' },
      { label: 'SEO Strategy', href: '/research/seo-surge-2026', type: 'research' },
    ],
    dependsOn: ['research-hub-v2'],
    enables: ['seo-surge-2026'],
    leadAgent: 'CORTEX',
    lastUpdated: '2026-02-06',
  },
  {
    slug: 'phone-to-publish',
    title: 'Phone-to-Publish Pipeline',
    subtitle: 'Record voice notes and video on phone, AI processes and publishes',
    description: 'Frank records speech notes and video on his phone. The system transcribes, generates drafts, creates images, runs quality gates, and publishes — all through the existing Content Studio queue. Extends the mobile PWA with voice recording, and Claude Code processes the queue on desktop.',
    tldr: 'Phone voice/video notes → Content Studio queue → AI transcription + draft generation → quality gates → auto-publish. Mobile-first content creation.',
    icon: 'Smartphone',
    color: 'cyan',
    track: 'distribution',
    status: 'planned',
    priority: 'high',
    progress: 10,
    targetDate: '2026-03-15',
    highlights: [
      { stat: '70%', label: 'Pipeline Built' },
      { stat: '30%', label: 'Voice Gap' },
      { stat: '30s', label: 'Queue Polling' },
    ],
    tasks: [
      { id: 'pp-1', title: 'Design queue task types for voice/plan', status: 'done', assignedAgent: 'VECTOR' },
      { id: 'pp-2', title: 'Build /admin/plan-studio mobile page', status: 'pending', assignedAgent: 'FORGE' },
      { id: 'pp-3', title: 'Integrate Whisper API for transcription', status: 'pending', assignedAgent: 'CIPHER' },
      { id: 'pp-4', title: 'Build voice recorder with MediaRecorder API', status: 'pending', assignedAgent: 'FORGE' },
      { id: 'pp-5', title: 'Set up Vercel Blob for audio storage', status: 'pending', assignedAgent: 'GRID' },
      { id: 'pp-6', title: 'Extend content-studio watch for plan tasks', status: 'pending', assignedAgent: 'CIPHER' },
    ],
    milestones: [
      { title: 'Text input from phone working', targetDate: '2026-02-15', status: 'upcoming' },
      { title: 'Voice recording + transcription', targetDate: '2026-03-01', status: 'upcoming' },
      { title: 'Full pipeline end-to-end', targetDate: '2026-03-15', status: 'upcoming' },
    ],
    agentComments: [
      { agent: 'VECTOR', timestamp: '2026-02-07T16:30:00Z', content: 'Pipeline architecture designed. Content Studio queue already handles mobile → desktop flow. Adding voice_note, plan_update, initiative_comment, quick_idea task types.', type: 'update' },
    ],
    relatedLinks: [
      { label: 'Content Studio', href: '/admin/content-studio', type: 'product' },
    ],
    dependsOn: ['plan-system'],
    enables: ['content-velocity'],
    leadAgent: 'FORGE',
    lastUpdated: '2026-02-07',
  },
  {
    slug: 'seo-surge-2026',
    title: 'SEO Domination 2026',
    subtitle: 'Own "agentic creator" and 50+ AI keywords in search',
    description: 'Systematic SEO strategy targeting high-intent keywords across agentic AI, music production, and creator tools. Includes schema markup on all pages, FAQ sections for AI citation engines, question-based H2s, internal linking strategy, and content clustering around pillar topics.',
    tldr: 'Targeting 50+ keywords with schema markup, FAQ schema, content clusters, and AI-citable summaries. Goal: own "agentic creator" category in search.',
    icon: 'TrendingUp',
    color: 'rose',
    track: 'distribution',
    status: 'in-progress',
    priority: 'high',
    progress: 45,
    startedAt: '2026-01-15',
    targetDate: '2026-06-30',
    highlights: [
      { stat: '173', label: 'Routes Indexed' },
      { stat: '60+', label: 'FAQ Items' },
      { stat: '50+', label: 'Target Keywords' },
    ],
    tasks: [
      { id: 'seo-1', title: 'Add schema markup to all pages', status: 'done', assignedAgent: 'CIPHER', completedAt: '2026-02-05' },
      { id: 'seo-2', title: 'FAQ sections on research domains', status: 'done', assignedAgent: 'FORGE', completedAt: '2026-02-07' },
      { id: 'seo-3', title: 'Keyword gap analysis vs competitors', status: 'active', assignedAgent: 'CORTEX' },
      { id: 'seo-4', title: 'Internal linking audit (3+ per page)', status: 'pending', assignedAgent: 'CORTEX' },
      { id: 'seo-5', title: 'Content cluster strategy for pillar topics', status: 'pending', assignedAgent: 'CORTEX' },
    ],
    milestones: [
      { title: 'Schema on all routes', targetDate: '2026-02-10', status: 'hit' },
      { title: 'Top 10 for 5 keywords', targetDate: '2026-04-01', status: 'upcoming' },
      { title: 'Top 10 for 20 keywords', targetDate: '2026-06-30', status: 'upcoming' },
    ],
    agentComments: [
      { agent: 'CORTEX', timestamp: '2026-02-06T14:00:00Z', content: 'Schema markup deployed across research hub (TechArticle + FAQPage). 173 routes now indexed. Next: keyword gap analysis against swyx, Willison, Tina Huang sites.', type: 'update' },
    ],
    relatedLinks: [
      { label: 'SEO Strategy Doc', href: '/research/RESEARCH_HUB_SEO_AEO_STRATEGY', type: 'research' },
      { label: 'Research Hub', href: '/research', type: 'research' },
    ],
    dependsOn: ['research-hub-v2'],
    enables: ['content-velocity'],
    leadAgent: 'CORTEX',
    lastUpdated: '2026-02-06',
  },
  {
    slug: 'youtube-launch',
    title: 'YouTube Channel Launch',
    subtitle: 'Video-first distribution: live builds, tutorials, music production',
    description: 'Competitive analysis showed video as the biggest distribution gap. Tina Huang built 1M+ subscribers driving all funnels. Plan: launch YouTube with live coding sessions, AI music production walkthroughs, and "build with me" series showing the AI-human collaboration process.',
    tldr: 'Launch YouTube channel with live builds, tutorials, and music production content. Video is the #1 distribution gap vs competitors.',
    icon: 'Play',
    color: 'orange',
    track: 'distribution',
    status: 'idea',
    priority: 'medium',
    progress: 0,
    highlights: [
      { stat: '0', label: 'Current Videos' },
      { stat: '1M+', label: 'Competitor Benchmark' },
      { stat: '#1', label: 'Distribution Gap' },
    ],
    tasks: [
      { id: 'yt-1', title: 'Define channel positioning and content pillars', status: 'pending', assignedAgent: 'APEX' },
      { id: 'yt-2', title: 'Record first 3 videos (live build, tutorial, music)', status: 'pending' },
      { id: 'yt-3', title: 'Design thumbnail templates', status: 'pending', assignedAgent: 'SPARK' },
      { id: 'yt-4', title: 'Set up YouTube channel with branding', status: 'pending' },
    ],
    milestones: [
      { title: 'Channel live with 3 videos', targetDate: '2026-03-15', status: 'upcoming' },
      { title: '1K subscribers', targetDate: '2026-06-01', status: 'upcoming' },
    ],
    agentComments: [
      { agent: 'APEX', timestamp: '2026-02-07T16:10:00Z', content: 'Strategic gap: video is the biggest differentiator we\'re not using. Tina Huang\'s entire funnel (courses, community, revenue) flows from YouTube. Phone-to-publish pipeline enables this.', type: 'insight' },
    ],
    relatedLinks: [],
    dependsOn: ['phone-to-publish'],
    enables: [],
    leadAgent: 'APEX',
    lastUpdated: '2026-02-07',
  },
  {
    slug: 'music-lab-v2',
    title: 'Music Lab V2',
    subtitle: 'Enhanced AI music production with Suno workflow improvements',
    description: 'Upgrade the Music Lab with better Suno prompt engineering workflows, genre-specific templates, batch generation, and a listening room for 500+ AI songs. Integrate with the creative track of the broader ecosystem.',
    tldr: 'Enhance Music Lab with better Suno workflows, genre templates, and a listening room for 500+ AI songs.',
    icon: 'Music',
    color: 'teal',
    track: 'creative',
    status: 'idea',
    priority: 'medium',
    progress: 0,
    highlights: [
      { stat: '500+', label: 'AI Songs Created' },
      { stat: '50+', label: 'Genre Templates' },
      { stat: 'V2', label: 'Version Target' },
    ],
    tasks: [
      { id: 'ml-1', title: 'Audit current Music Lab UX and pain points', status: 'pending', assignedAgent: 'SPARK' },
      { id: 'ml-2', title: 'Design genre-specific prompt templates', status: 'pending', assignedAgent: 'SPARK' },
      { id: 'ml-3', title: 'Build listening room component', status: 'pending', assignedAgent: 'FORGE' },
      { id: 'ml-4', title: 'Integrate Suno prompt architect workflow', status: 'pending', assignedAgent: 'CIPHER' },
    ],
    milestones: [
      { title: 'UX audit complete', targetDate: '2026-03-01', status: 'upcoming' },
      { title: 'V2 live with listening room', targetDate: '2026-04-15', status: 'upcoming' },
    ],
    agentComments: [
      { agent: 'SPARK', timestamp: '2026-02-07T16:15:00Z', content: '500+ songs is a massive asset no competitor has. A public listening room with genre filtering and Suno prompt breakdowns would be a unique differentiator.', type: 'insight' },
    ],
    relatedLinks: [
      { label: 'Music Lab', href: '/music-lab', type: 'product' },
      { label: 'Suno Production Workflow', href: '/blog/suno-music-production-workflow', type: 'blog' },
    ],
    dependsOn: [],
    enables: ['youtube-launch'],
    leadAgent: 'SPARK',
    lastUpdated: '2026-02-07',
  },
  {
    slug: 'enterprise-consulting',
    title: 'Enterprise AI Consulting Hub',
    subtitle: 'Oracle Cloud AI architecture consulting funnel with case studies',
    description: 'Competitive analysis revealed case studies with metrics as a critical gap. Enterprise buyers need proof. This initiative builds a consulting hub with Oracle Cloud AI case studies, ROI calculators, and a clear path from content to consultation. Positions Frank as the go-to AI architect for enterprise.',
    tldr: 'Build enterprise consulting funnel with Oracle Cloud case studies, ROI metrics, and a content-to-consultation path.',
    icon: 'Building2',
    color: 'blue',
    track: 'product',
    status: 'idea',
    priority: 'medium',
    progress: 0,
    highlights: [
      { stat: '0', label: 'Case Studies' },
      { stat: '3-5', label: 'Target Case Studies' },
      { stat: '$4.8K+', label: 'Consulting Tier' },
    ],
    tasks: [
      { id: 'ec-1', title: 'Draft 3 anonymized enterprise case studies', status: 'pending', assignedAgent: 'CORTEX' },
      { id: 'ec-2', title: 'Build consulting landing page', status: 'pending', assignedAgent: 'FORGE' },
      { id: 'ec-3', title: 'Create ROI calculator for AI adoption', status: 'pending', assignedAgent: 'CIPHER' },
      { id: 'ec-4', title: 'Design content-to-consultation funnel', status: 'pending', assignedAgent: 'APEX' },
    ],
    milestones: [
      { title: '3 case studies published', targetDate: '2026-04-01', status: 'upcoming' },
      { title: 'Consulting page live with booking', targetDate: '2026-04-15', status: 'upcoming' },
    ],
    agentComments: [
      { agent: 'APEX', timestamp: '2026-02-07T16:20:00Z', content: 'Enterprise consulting is the highest-value tier ($4.8K+) in the value ladder. Case studies with ROI metrics are the missing piece. Cursor shows "90% of Salesforce devs use this" — we need equivalent proof points.', type: 'insight' },
    ],
    relatedLinks: [
      { label: 'AI Architect Hub', href: '/ai-architect', type: 'product' },
      { label: 'Oracle GenAI Content', href: '/blog/production-llm-agents-oci-part-1-architecture', type: 'blog' },
    ],
    dependsOn: ['content-velocity'],
    enables: [],
    leadAgent: 'APEX',
    lastUpdated: '2026-02-07',
  },
  {
    slug: 'design-lab',
    title: 'Design Lab',
    subtitle: 'AI coding agents compete at design challenges — the best outputs become products',
    description: 'A public showcase where different AI coding agents and skills are tested against the same design briefs. Each experiment pits tools like Claude Code + ui-ux-pro-max, v0.dev, and Cursor head-to-head. Outputs are rated on design, code quality, accessibility, performance, and creativity. Winning designs get productized and offered for sale. Now expanded with a Strategy Arena featuring 3 competing visual identity approaches.',
    tldr: 'AI agents compete at design challenges. Strategy Arena with 3 competing visual identity approaches. Winners become the actual site design. Live at frankx.ai/design-lab.',
    icon: 'Sparkles',
    color: 'teal',
    track: 'creative',
    status: 'shipped',
    priority: 'high',
    progress: 100,
    startedAt: '2026-02-07',
    shippedAt: '2026-02-07',
    targetDate: '2026-02-10',
    highlights: [
      { stat: '3', label: 'Seed Experiments' },
      { stat: '3', label: 'Competing Approaches' },
      { stat: '5', label: 'Rating Dimensions' },
    ],
    tasks: [
      { id: 'dl-1', title: 'Create experiment data registry with types', status: 'done', assignedAgent: 'FORGE', completedAt: '2026-02-07' },
      { id: 'dl-2', title: 'Build hub page with experiment grid', status: 'done', assignedAgent: 'FORGE', completedAt: '2026-02-07' },
      { id: 'dl-3', title: 'Build detail pages with agent comparison', status: 'done', assignedAgent: 'FORGE', completedAt: '2026-02-07' },
      { id: 'dl-4', title: 'Add to plan initiative registry', status: 'done', assignedAgent: 'VECTOR', completedAt: '2026-02-07' },
      { id: 'dl-5', title: 'Deploy to production', status: 'done', assignedAgent: 'GRID', completedAt: '2026-02-07' },
    ],
    milestones: [
      { title: 'Data registry + 3 seed experiments', targetDate: '2026-02-08', status: 'hit' },
      { title: 'Hub + detail pages deployed', targetDate: '2026-02-10', status: 'hit' },
    ],
    agentComments: [
      { agent: 'APEX', timestamp: '2026-02-07T20:00:00Z', content: 'Design Lab is a unique content angle. No competitor is publicly benchmarking AI coding tools at design tasks. This positions Frank as the authority on AI-assisted design quality.', type: 'insight' },
      { agent: 'FORGE', timestamp: '2026-02-07T20:05:00Z', content: 'Starting with 3 experiments: hero section, dashboard, and pricing page. Each tests different design skills. Using the research hub pattern for the data registry.', type: 'update' },
    ],
    relatedLinks: [
      { label: 'Design System', href: '/design-system', type: 'product' },
      { label: 'Live Build Labs', href: '/labs', type: 'product' },
    ],
    dependsOn: ['plan-system'],
    enables: ['content-velocity', 'design-lab-strategy'],
    leadAgent: 'FORGE',
    lastUpdated: '2026-02-07',
  },
  {
    slug: 'design-lab-strategy',
    title: 'Design Lab Strategy Arena',
    subtitle: 'Three competing design systems battle for the frankx.ai visual identity',
    description: 'A billion-dollar design lab approach: three "design god teams" each propose a complete visual identity for frankx.ai — hero treatment, card system, typography, color strategy, motion philosophy, and site-wide extension plan. The Strategy Arena at /design-lab/strategy presents all three live with interactive previews. The winning approach gets implemented across the homepage and every key page.',
    tldr: 'Three competing design approaches (Cosmic Forge, Glass Cathedral, Neon Grid) built as live components at /design-lab/strategy. Winner gets implemented site-wide.',
    icon: 'Palette',
    color: 'violet',
    track: 'creative',
    status: 'in-progress',
    priority: 'critical',
    progress: 60,
    startedAt: '2026-03-01',
    targetDate: '2026-03-10',
    highlights: [
      { stat: '3', label: 'Competing Approaches' },
      { stat: '5', label: 'New Components' },
      { stat: '669', label: 'Arena Page Lines' },
    ],
    tasks: [
      { id: 'dls-1', title: 'Research competitor visual identities (Linear, Stripe, Vercel, Raycast)', status: 'done', assignedAgent: 'FORGE', completedAt: '2026-03-01' },
      { id: 'dls-2', title: 'Define three competing approaches with full specs', status: 'done', assignedAgent: 'APEX', completedAt: '2026-03-01' },
      { id: 'dls-3', title: 'Build CosmicForgeHero with GLSL WebGL shaders', status: 'done', assignedAgent: 'FORGE', completedAt: '2026-03-01' },
      { id: 'dls-4', title: 'Build GlassCathedralHero with 4-tier glass hierarchy', status: 'done', assignedAgent: 'FORGE', completedAt: '2026-03-01' },
      { id: 'dls-5', title: 'Build NeonGridHero with canvas dot grid + cursor physics', status: 'done', assignedAgent: 'FORGE', completedAt: '2026-03-01' },
      { id: 'dls-6', title: 'Build Strategy Arena page with live previews and comparison', status: 'done', assignedAgent: 'FORGE', completedAt: '2026-03-01' },
      { id: 'dls-7', title: 'User review and approach selection', status: 'active', assignedAgent: 'APEX' },
      { id: 'dls-8', title: 'Implement winning approach on homepage', status: 'pending', assignedAgent: 'FORGE' },
      { id: 'dls-9', title: 'Extend winning approach to /coaching, /music-lab, /products, /acos', status: 'pending', assignedAgent: 'FORGE' },
    ],
    milestones: [
      { title: 'Three approaches built with live previews', targetDate: '2026-03-02', status: 'hit' },
      { title: 'Winner selected', targetDate: '2026-03-05', status: 'upcoming' },
      { title: 'Site-wide implementation', targetDate: '2026-03-10', status: 'upcoming' },
    ],
    agentComments: [
      { agent: 'APEX', timestamp: '2026-03-01T22:00:00Z', content: 'Strategic context: Linear owns specular glass, Stripe owns mesh gradients, Vercel owns Geist minimalism, Raycast owns product glow. FrankX needs to pick its visual move and execute it comprehensively.', type: 'insight' },
      { agent: 'FORGE', timestamp: '2026-03-02T00:30:00Z', content: 'All three hero components built. CosmicForgeHero uses real GLSL fragment shaders on GPU — smoother than the canvas fallback. Arena page at 669 lines with live previews, card demos, typography specimens, and comparison matrix.', type: 'celebration' },
    ],
    relatedLinks: [
      { label: 'Strategy Arena', href: '/design-lab/strategy', type: 'product' },
      { label: 'Design Lab', href: '/design-lab', type: 'product' },
    ],
    dependsOn: ['design-lab'],
    enables: [],
    leadAgent: 'FORGE',
    lastUpdated: '2026-03-02',
  },
  {
    slug: 'book-pdf-pipeline',
    title: 'Book PDF Pipeline',
    subtitle: 'MDX to styled PDF with email-gated delivery via Vercel Blob',
    description: 'End-to-end pipeline for converting book MDX content to professionally styled PDFs, uploading to Vercel Blob storage, and delivering through an email-gated download component. BookDownloadGate captures reader email via Resend API before releasing the download link — building the email list with every book download.',
    tldr: 'Books compiled from MDX to PDF, uploaded to Vercel Blob, delivered via email-gate. Every download builds the email list.',
    icon: 'FileText',
    color: 'emerald',
    track: 'product',
    status: 'shipped',
    priority: 'high',
    progress: 100,
    startedAt: '2026-02-28',
    shippedAt: '2026-03-01',
    highlights: [
      { stat: '10', label: 'PDFs Uploaded' },
      { stat: '35MB', label: 'Blob Storage' },
      { stat: '6', label: 'Books Available' },
    ],
    tasks: [
      { id: 'bpp-1', title: 'Build PDF generation script from MDX content', status: 'done', assignedAgent: 'FORGE', completedAt: '2026-03-01' },
      { id: 'bpp-2', title: 'Upload PDFs to Vercel Blob storage', status: 'done', assignedAgent: 'GRID', completedAt: '2026-03-01' },
      { id: 'bpp-3', title: 'Build BookDownloadGate email capture component', status: 'done', assignedAgent: 'FORGE', completedAt: '2026-03-01' },
      { id: 'bpp-4', title: 'Wire Resend API for email collection', status: 'done', assignedAgent: 'CIPHER', completedAt: '2026-03-01' },
      { id: 'bpp-5', title: 'Deploy to production', status: 'done', assignedAgent: 'GRID', completedAt: '2026-03-01' },
    ],
    milestones: [
      { title: 'PDF generation working', targetDate: '2026-03-01', status: 'hit' },
      { title: 'Email-gated delivery live', targetDate: '2026-03-01', status: 'hit' },
    ],
    agentComments: [
      { agent: 'FORGE', timestamp: '2026-03-01T16:00:00Z', content: 'Book PDF pipeline complete. 10 PDFs generated and uploaded to Vercel Blob (35.1MB). BookDownloadGate component captures email before releasing download — every book download grows the list.', type: 'celebration' },
    ],
    relatedLinks: [
      { label: 'Books', href: '/books', type: 'product' },
    ],
    dependsOn: [],
    enables: ['content-velocity'],
    leadAgent: 'FORGE',
    lastUpdated: '2026-03-01',
  },
  {
    slug: 'music-player-system',
    title: 'Custom Music Player',
    subtitle: 'Replace Suno iframes with self-hosted global audio player and catalog',
    description: 'Replace 7 heavy Suno iframe embeds (2MB each) with a custom global audio player. Scrape Suno catalog (500+ tracks), download MP3s, upload to Vercel Blob, and serve through a glassmorphic player with waveform visualization. TrackCard components match GlowCard design system.',
    tldr: 'Custom music player replacing 2MB iframes. Self-hosted audio via Vercel Blob, glassmorphic UI, global persistent player.',
    icon: 'Music',
    color: 'teal',
    track: 'creative',
    status: 'planned',
    priority: 'high',
    progress: 15,
    startedAt: '2026-03-02',
    targetDate: '2026-03-20',
    highlights: [
      { stat: '500+', label: 'Tracks to Index' },
      { stat: '34', label: 'Currently Indexed' },
      { stat: '14MB', label: 'Iframe Savings' },
    ],
    tasks: [
      { id: 'mp-1', title: 'Extend Track interface with audio fields', status: 'pending', assignedAgent: 'FORGE' },
      { id: 'mp-2', title: 'Build Suno catalog scraper script', status: 'pending', assignedAgent: 'CIPHER' },
      { id: 'mp-3', title: 'Create MusicPlayerProvider context + reducer', status: 'pending', assignedAgent: 'FORGE' },
      { id: 'mp-4', title: 'Build GlobalAudioPlayer glassmorphic component', status: 'pending', assignedAgent: 'FORGE' },
      { id: 'mp-5', title: 'Build TrackCard with GlowCard styling', status: 'pending', assignedAgent: 'FORGE' },
      { id: 'mp-6', title: 'Replace iframe embeds on /music page', status: 'pending', assignedAgent: 'FORGE' },
    ],
    milestones: [
      { title: 'Architecture plan approved', targetDate: '2026-03-02', status: 'hit', description: 'Full 8-phase plan designed with 11 file-by-file steps' },
      { title: 'Global player MVP', targetDate: '2026-03-10', status: 'upcoming' },
      { title: 'Full catalog migrated', targetDate: '2026-03-20', status: 'upcoming' },
    ],
    agentComments: [
      { agent: 'APEX', timestamp: '2026-03-02T00:00:00Z', content: 'Architecture decision: React Context over Zustand (ships fast for single feature), Web Audio API over Howler.js (proven in DJ Pads), Vercel Blob over R2 (zero new infra). Playwright scraper for catalog.', type: 'update' },
    ],
    relatedLinks: [
      { label: 'Music Lab', href: '/music-lab', type: 'product' },
      { label: 'Music Page', href: '/music', type: 'product' },
    ],
    dependsOn: ['music-lab-v2'],
    enables: [],
    leadAgent: 'FORGE',
    lastUpdated: '2026-03-02',
  },
]
