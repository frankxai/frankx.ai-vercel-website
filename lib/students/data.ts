import type { StudentTool, LearningJourney, EcosystemNode } from './types'

// ── Student Tools Registry ──────────────────────────────────────────────────

export const studentTools: StudentTool[] = [
  {
    slug: 'ai-briefing',
    title: 'State of AI 2026',
    description: 'Visual briefing on frontier models, coding agents, MCP, skills demand, and where to start.',
    icon: 'TrendingUp',
    color: 'emerald',
    category: 'briefing',
    duration: '15 min read',
    badge: 'Start Here',
    outcomes: ['Understand the AI landscape', 'Know the top coding agents', 'See salary data for AI roles'],
    nextSteps: ['assess', 'prompts', 'roles'],
  },
  {
    slug: 'assess',
    title: 'AI Skills Assessment',
    description: 'Measure your AI proficiency across 6 dimensions. Get personalized course and tool recommendations.',
    icon: 'Target',
    color: 'violet',
    category: 'assessment',
    duration: '5 min',
    badge: 'New',
    outcomes: ['Know your AI skill level', 'Get personalized recommendations', 'Identify skill gaps'],
    nextSteps: ['ai-briefing', 'prompts', 'coe-builder'],
  },
  {
    slug: 'workshop',
    title: 'AI Workshop',
    description: '90-minute guided workshop using the 3Cs Framework, Ikigai, and role navigator.',
    icon: 'Presentation',
    color: 'cyan',
    category: 'workshop',
    duration: '90 min',
    outcomes: ['Complete an AI self-assessment', 'Find your AI career direction', 'Build a 30/60/90 plan'],
    nextSteps: ['ikigai', 'roles', 'coe-builder'],
  },
  {
    slug: 'ikigai',
    title: 'AI Ikigai Finder',
    description: 'Interactive tool to find where your passion, skills, market demand, and AI capabilities intersect.',
    icon: 'Compass',
    color: 'amber',
    category: 'builder',
    duration: '20 min',
    outcomes: ['Identify your AI sweet spot', 'Generate career direction prompts', 'Export your results'],
    nextSteps: ['roles', 'prompts', 'coe-builder'],
  },
  {
    slug: 'roles',
    title: 'AI Role Navigator',
    description: '7 AI-native career paths with salary ranges, required skills, target companies, and entry strategies.',
    icon: 'Users',
    color: 'cyan',
    category: 'reference',
    duration: '10 min',
    outcomes: ['Explore 7 AI career paths', 'See salary ranges and companies', 'Get wedge ideas to start'],
    nextSteps: ['ikigai', 'prompts', 'assess'],
  },
  {
    slug: 'prompts',
    title: 'Student Prompt Library',
    description: '28 battle-tested prompts across 6 domains — ready to copy and use with any AI model.',
    icon: 'Sparkles',
    color: 'violet',
    category: 'reference',
    duration: 'Reference',
    outcomes: ['Access proven AI prompts', 'Learn prompt patterns', 'Apply to your own projects'],
    nextSteps: ['coe-builder', 'roles', 'ai-briefing'],
  },
  {
    slug: 'coe-builder',
    title: 'Center of Excellence Builder',
    description: 'Design your personal AI system with custom agents, domains, and starter prompts. Export as JSON.',
    icon: 'Layers',
    color: 'emerald',
    category: 'builder',
    duration: '30 min',
    outcomes: ['Design a custom AI agent team', 'Choose from 6 domain templates', 'Export your system as portfolio'],
    nextSteps: ['prompts', 'ai-briefing', 'roles'],
  },
]

export function getToolBySlug(slug: string): StudentTool | undefined {
  return studentTools.find((t) => t.slug === slug)
}

export function getRelatedTools(slug: string, limit = 3): StudentTool[] {
  const tool = getToolBySlug(slug)
  if (!tool) return []
  return tool.nextSteps
    .map((s) => getToolBySlug(s))
    .filter((t): t is StudentTool => t !== undefined)
    .slice(0, limit)
}

// ── Learning Journeys ───────────────────────────────────────────────────────

export const learningJourneys: LearningJourney[] = [
  {
    id: 'ai-foundations',
    title: 'AI Foundations',
    description: 'Understand the landscape, find your direction, and start building prompts.',
    targetAudience: 'Complete beginners',
    estimatedTime: '2-3 hours',
    color: 'emerald',
    steps: [
      { toolSlug: 'ai-briefing', label: 'Understand the AI landscape' },
      { toolSlug: 'assess', label: 'Measure your starting point' },
      { toolSlug: 'prompts', label: 'Learn prompt patterns' },
    ],
  },
  {
    id: 'career-pivot',
    title: 'AI Career Pivot',
    description: 'Find your AI sweet spot and build a plan to transition into an AI role.',
    targetAudience: 'Career changers',
    estimatedTime: '3-4 hours',
    color: 'violet',
    steps: [
      { toolSlug: 'ikigai', label: 'Find your AI purpose' },
      { toolSlug: 'roles', label: 'Explore AI career paths' },
      { toolSlug: 'assess', label: 'Identify skill gaps' },
      { toolSlug: 'coe-builder', label: 'Design your AI system' },
    ],
  },
  {
    id: 'creator-launch',
    title: 'Creator Launch',
    description: 'Build your creative AI toolkit and start shipping.',
    targetAudience: 'Creators and builders',
    estimatedTime: '4-5 hours',
    color: 'cyan',
    steps: [
      { toolSlug: 'ai-briefing', label: 'See what tools exist' },
      { toolSlug: 'prompts', label: 'Master prompt engineering' },
      { toolSlug: 'coe-builder', label: 'Design your agent team' },
      { toolSlug: 'workshop', label: 'Complete the full workshop' },
    ],
  },
]

// ── Ecosystem Nodes (ALL FrankX tools) ──────────────────────────────────────

export const ecosystemNodes: EcosystemNode[] = [
  // Ring 1: Student Tools
  { name: 'AI Briefing', href: '/students/ai-briefing', description: 'State of AI 2026 visual presentation', icon: 'TrendingUp', color: 'emerald', ring: 'tools', badge: 'Start Here' },
  { name: 'Skills Assessment', href: '/students/assess', description: 'Measure your AI proficiency', icon: 'Target', color: 'violet', ring: 'tools', badge: 'New' },
  { name: 'Ikigai Finder', href: '/students/ikigai', description: 'Find your AI career purpose', icon: 'Compass', color: 'amber', ring: 'tools' },
  { name: 'Role Navigator', href: '/students/roles', description: '7 AI career paths with salaries', icon: 'Users', color: 'cyan', ring: 'tools' },
  { name: 'Prompt Library', href: '/students/prompts', description: '28 ready-to-use AI prompts', icon: 'Sparkles', color: 'violet', ring: 'tools' },
  { name: 'CoE Builder', href: '/students/coe-builder', description: 'Design your AI agent system', icon: 'Layers', color: 'emerald', ring: 'tools' },
  { name: 'Workshop', href: '/students/workshop', description: '90-minute guided AI workshop', icon: 'Presentation', color: 'cyan', ring: 'tools' },

  // Ring 2: Platform
  { name: 'ACOS', href: '/acos', description: '75+ skills, 38 agents for Claude Code', icon: 'Terminal', color: 'violet', ring: 'platform', badge: 'Open Source' },
  { name: 'Music Lab', href: '/music-lab', description: '12K+ AI songs with Suno', icon: 'Music', color: 'cyan', ring: 'platform' },
  { name: 'GenCreator', href: '/gencreator', description: 'Creator business framework', icon: 'Rocket', color: 'amber', ring: 'platform' },
  { name: 'Prompt Library', href: '/prompt-library', description: 'Full prompt collection', icon: 'Zap', color: 'emerald', ring: 'platform' },
  { name: 'Products', href: '/products', description: 'Digital tools and templates', icon: 'Package', color: 'rose', ring: 'platform' },

  // Ring 3: Content
  { name: 'Blog', href: '/blog', description: '90+ technical articles', icon: 'BookOpen', color: 'cyan', ring: 'content' },
  { name: 'Research Hub', href: '/research', description: '17+ research domains', icon: 'Brain', color: 'emerald', ring: 'content' },
  { name: 'Books', href: '/books', description: '6 books on AI and creativity', icon: 'Library', color: 'amber', ring: 'content' },
  { name: 'Watch', href: '/watch', description: 'Video vault and tutorials', icon: 'Play', color: 'violet', ring: 'content' },
  { name: 'Courses', href: '/courses', description: 'Structured learning paths', icon: 'GraduationCap', color: 'cyan', ring: 'content' },

  // Ring 4: Growth
  { name: 'Coaching', href: '/coaching', description: '1-on-1 with an AI architect', icon: 'Flame', color: 'amber', ring: 'growth' },
  { name: 'Newsletter', href: '/newsletter', description: 'Weekly AI insights', icon: 'Mail', color: 'violet', ring: 'growth' },
  { name: 'Community', href: '/community', description: 'Join builders shipping AI', icon: 'Users', color: 'emerald', ring: 'growth' },
  { name: 'AI Architecture', href: '/ai-architecture', description: 'Enterprise patterns', icon: 'Network', color: 'cyan', ring: 'growth' },
]

export function getNodesByRing(ring: EcosystemNode['ring']): EcosystemNode[] {
  return ecosystemNodes.filter((n) => n.ring === ring)
}
