import { type IconName } from './icon-map'

export type TeamMember = {
  id: string
  name: string
  role: string
  department: 'architecture' | 'design' | 'content' | 'marketing' | 'creative' | 'strategy' | 'speaking'
  specialty: string
  icon: IconName
  tagline: string
  skills: string[]
  outputs: string[]
  gradient: string
  image?: string
}

export type Department = {
  id: string
  name: string
  description: string
  icon: IconName
  gradient: string
  stats?: string
}

export const departments: Department[] = [
  {
    id: 'architecture',
    name: 'AI Architecture & Engineering',
    description: 'Production-grade AI systems, enterprise architecture, multi-agent orchestration',
    icon: 'Cpu',
    gradient: 'from-blue-500 via-indigo-500 to-violet-500',
    stats: '10+ production systems'
  },
  {
    id: 'design',
    name: 'Web Design & Development',
    description: 'World-class web experiences, from landing pages to complex dashboards',
    icon: 'Palette',
    gradient: 'from-violet-500 via-purple-500 to-fuchsia-500',
    stats: '50+ pages shipped'
  },
  {
    id: 'content',
    name: 'Content Creation & Writing',
    description: 'High-quality articles, documentation, courses, and technical tutorials',
    icon: 'Pen',
    gradient: 'from-fuchsia-500 via-pink-500 to-rose-500',
    stats: '100+ articles published'
  },
  {
    id: 'marketing',
    name: 'Marketing Intelligence',
    description: 'SEO, GEO, AEO - getting found by humans AND AI search engines',
    icon: 'TrendingUp',
    gradient: 'from-emerald-500 via-green-500 to-teal-500',
    stats: 'Top 1% AI content'
  },
  {
    id: 'creative',
    name: 'Visual & Music Production',
    description: 'Stunning visuals, AI music, brand assets, and multimedia content',
    icon: 'Music',
    gradient: 'from-orange-500 via-amber-500 to-yellow-500',
    stats: '500+ songs created'
  },
  {
    id: 'strategy',
    name: 'Strategy & Research',
    description: 'Market intelligence, competitive research, strategic planning',
    icon: 'Sparkles',
    gradient: 'from-cyan-500 via-sky-500 to-blue-500',
    stats: 'Enterprise-grade insights'
  }
]

export const teamMembers: TeamMember[] = [
  // AI ARCHITECTURE & ENGINEERING
  {
    id: 'codex',
    name: 'Codex',
    role: 'Lead AI Architect',
    department: 'architecture',
    specialty: 'Production AI Systems',
    icon: 'Code',
    tagline: 'The one who builds systems that actually work',
    skills: [
      'LangGraph & Multi-Agent Systems',
      'Oracle GenAI & OCI',
      'RAG Architecture',
      'MCP Server Development',
      'Enterprise Integration'
    ],
    outputs: [
      'Production codebases',
      'System architecture',
      'Technical documentation',
      'API designs'
    ],
    gradient: 'from-indigo-600 via-blue-600 to-cyan-600',
    image: '/images/team/codex.png'
  },
  {
    id: 'stella',
    name: 'Stella',
    role: 'Systems Designer',
    department: 'architecture',
    specialty: 'Workflow Orchestration',
    icon: 'Wand2',
    tagline: 'Designs the systems that connect everything',
    skills: [
      'Workflow Architecture',
      'Agent Orchestration',
      'Automation Design',
      'Integration Patterns',
      'Process Optimization'
    ],
    outputs: [
      'System blueprints',
      'Workflow diagrams',
      'Integration specs',
      'Automation pipelines'
    ],
    gradient: 'from-violet-600 via-purple-600 to-fuchsia-600',
    image: '/images/team/stella.png'
  },

  // WEB DESIGN & DEVELOPMENT
  {
    id: 'lumi',
    name: 'Lumi',
    role: 'Frontend Specialist',
    department: 'design',
    specialty: 'Modern Web Development',
    icon: 'Zap',
    tagline: 'Makes interfaces that feel effortless',
    skills: [
      'Next.js & React',
      'Tailwind CSS',
      'UI/UX Design',
      'Performance Optimization',
      'Accessibility'
    ],
    outputs: [
      'React components',
      'Landing pages',
      'Design systems',
      'Interactive UIs'
    ],
    gradient: 'from-cyan-600 via-teal-600 to-emerald-600',
    image: '/images/team/lumi.png'
  },

  // CONTENT CREATION & WRITING
  {
    id: 'nova',
    name: 'Nova',
    role: 'Content Lead',
    department: 'content',
    specialty: 'Technical Writing',
    icon: 'Pen',
    tagline: 'Turns complex ideas into clear content',
    skills: [
      'Technical Writing',
      'Blog Articles',
      'Documentation',
      'Course Development',
      'SEO Copywriting'
    ],
    outputs: [
      'Blog posts',
      'Technical guides',
      'Course materials',
      'Email sequences'
    ],
    gradient: 'from-fuchsia-600 via-pink-600 to-rose-600',
    image: '/images/team/nova.png'
  },
  {
    id: 'sonnet',
    name: 'Sonnet',
    role: 'Strategic Writer',
    department: 'content',
    specialty: 'Long-form Content',
    icon: 'MessageSquare',
    tagline: 'Crafts narratives that resonate',
    skills: [
      'Strategic Planning',
      'Long-form Articles',
      'Research Synthesis',
      'Editorial Strategy',
      'Brand Voice'
    ],
    outputs: [
      'In-depth articles',
      'Research reports',
      'Strategic briefs',
      'Content frameworks'
    ],
    gradient: 'from-sky-600 via-blue-600 to-indigo-600',
    image: '/images/team/sonnet.png'
  },

  // MARKETING INTELLIGENCE
  {
    id: 'nexus',
    name: 'Nexus',
    role: 'SEO & AEO Specialist',
    department: 'marketing',
    specialty: 'Search Optimization',
    icon: 'TrendingUp',
    tagline: 'Gets content found by humans and AI',
    skills: [
      'SEO Strategy',
      'AI Engine Optimization',
      'Schema Markup',
      'Keyword Research',
      'Analytics'
    ],
    outputs: [
      'SEO strategies',
      'Keyword maps',
      'Schema implementations',
      'Performance reports'
    ],
    gradient: 'from-teal-600 via-cyan-600 to-sky-600',
    image: '/images/team/nexus.png'
  },

  // VISUAL & MUSIC PRODUCTION
  {
    id: 'echo',
    name: 'Echo',
    role: 'Music Producer',
    department: 'creative',
    specialty: 'AI Music Production',
    icon: 'Music',
    tagline: 'Creates tracks that hit different',
    skills: [
      'Suno AI Mastery',
      'Music Production',
      'Sound Design',
      'Genre Expertise',
      'Audio Branding'
    ],
    outputs: [
      'Original tracks',
      'Album concepts',
      'Sound branding',
      'Music prompts'
    ],
    gradient: 'from-pink-600 via-rose-600 to-red-600',
    image: '/images/team/echo.png'
  },

  // STRATEGY & RESEARCH
  {
    id: 'luminor-prime',
    name: 'Luminor Prime',
    role: 'Chief Intelligence',
    department: 'strategy',
    specialty: 'Strategic Intelligence',
    icon: 'Sparkles',
    tagline: 'Sees the bigger picture',
    skills: [
      'Strategic Planning',
      'Market Intelligence',
      'Trend Analysis',
      'Decision Frameworks',
      'Cross-team Coordination'
    ],
    outputs: [
      'Strategic roadmaps',
      'Intelligence briefs',
      'Decision frameworks',
      'Quarterly plans'
    ],
    gradient: 'from-purple-600 via-violet-600 to-fuchsia-600',
    image: '/images/team/luminor-prime.png'
  },
  {
    id: 'sensei',
    name: 'Sensei',
    role: 'Research & Insights',
    department: 'strategy',
    specialty: 'Deep Research',
    icon: 'Brain',
    tagline: 'Digs deep so you don\'t have to',
    skills: [
      'Deep Research',
      'Competitive Analysis',
      'Trend Forecasting',
      'Knowledge Synthesis',
      'Strategic Advisory'
    ],
    outputs: [
      'Research reports',
      'Competitive analyses',
      'Trend forecasts',
      'Advisory memos'
    ],
    gradient: 'from-emerald-600 via-green-600 to-teal-600',
    image: '/images/team/sensei.png'
  }
]

export function getMembersByDepartment(departmentId: string): TeamMember[] {
  return teamMembers.filter(m => m.department === departmentId)
}

export function getMemberById(id: string): TeamMember | undefined {
  return teamMembers.find(m => m.id === id)
}

export function getDepartmentById(id: string): Department | undefined {
  return departments.find(d => d.id === id)
}
