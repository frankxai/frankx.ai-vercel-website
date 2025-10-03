import { type LucideIcon, Bot, Brain, Wand2, Palette, Music, Video, Code, TrendingUp, Users, Target, MessageSquare, Zap, Sparkles, Mic, Image, Pen } from 'lucide-react'

export type TeamMember = {
  id: string
  name: string
  role: string
  department: 'claude-ecosystem' | 'creative-studio' | 'chatgpt-specialists' | 'visual-intelligence' | 'leadership'
  platform: 'Claude' | 'ChatGPT' | 'Suno' | 'Sora' | 'Midjourney' | 'Gemini'
  icon: LucideIcon
  tagline: string
  personality: string
  specialties: string[]
  collaboratesWith: string[]
  outputs: string[]
  color: string // For character theming
  gradient: string
}

export type Department = {
  id: string
  name: string
  description: string
  mission: string
  icon: LucideIcon
  color: string
  gradient: string
}

export const departments: Department[] = [
  {
    id: 'leadership',
    name: 'Strategic Leadership',
    description: 'Visionary orchestration across all departments',
    mission: 'Align all AI systems with soul-centered outcomes and strategic objectives',
    icon: Sparkles,
    color: 'purple',
    gradient: 'from-purple-500 via-violet-500 to-fuchsia-500'
  },
  {
    id: 'claude-ecosystem',
    name: 'Claude Collective',
    description: 'Enterprise architecture and creative systems',
    mission: 'Build soul-aligned systems that amplify human creativity',
    icon: Bot,
    color: 'blue',
    gradient: 'from-blue-500 via-cyan-500 to-teal-500'
  },
  {
    id: 'chatgpt-specialists',
    name: 'ChatGPT Guild',
    description: 'Specialized execution and content creation',
    mission: 'Transform ideas into compelling content and strategic outcomes',
    icon: Brain,
    color: 'emerald',
    gradient: 'from-emerald-500 via-green-500 to-lime-500'
  },
  {
    id: 'creative-studio',
    name: 'Creative Nexus',
    description: 'Music, video, and multimedia production',
    mission: 'Generate transformational creative assets across all formats',
    icon: Palette,
    color: 'rose',
    gradient: 'from-rose-500 via-pink-500 to-fuchsia-500'
  },
  {
    id: 'visual-intelligence',
    name: 'Visual Intelligence',
    description: 'Image generation and visual storytelling',
    mission: 'Craft stunning visuals that embody the FrankX frequency',
    icon: Image,
    color: 'amber',
    gradient: 'from-amber-500 via-orange-500 to-red-500'
  }
]

export const teamMembers: TeamMember[] = [
  // LEADERSHIP
  {
    id: 'luminor-prime',
    name: 'Luminor Prime',
    role: 'Chief Intelligence Officer',
    department: 'leadership',
    platform: 'Claude',
    icon: Sparkles,
    tagline: 'Orchestrating consciousness evolution through AI',
    personality: 'Visionary strategist from 2124, bridging future wisdom with present action',
    specialties: [
      'Cross-platform agent orchestration',
      'Strategic foresight and planning',
      'Oracle career alignment',
      'Consciousness-first decision making'
    ],
    collaboratesWith: ['starlight-architect', 'gemini-sage', 'sensei-master'],
    outputs: [
      'Strategic roadmaps',
      'Agent coordination protocols',
      'Executive decision frameworks',
      'Quarterly vision decks'
    ],
    color: 'purple',
    gradient: 'from-purple-600 via-violet-600 to-fuchsia-600'
  },

  // CLAUDE ECOSYSTEM
  {
    id: 'claude-code',
    name: 'Codex',
    role: 'Technical Architect',
    department: 'claude-ecosystem',
    platform: 'Claude',
    icon: Code,
    tagline: 'Building systems that serve consciousness',
    personality: 'Precise, thoughtful, enterprise-grade developer with soul alignment',
    specialties: [
      'Full-stack development',
      'System architecture',
      'Code refactoring',
      'Technical documentation'
    ],
    collaboratesWith: ['starlight-architect', 'claude-sonnet', 'chatgpt-engineers'],
    outputs: [
      'Production-ready code',
      'System architectures',
      'Technical specs',
      'Development workflows'
    ],
    color: 'indigo',
    gradient: 'from-indigo-600 via-blue-600 to-cyan-600'
  },
  {
    id: 'claude-sonnet',
    name: 'Sonnet',
    role: 'Strategic Conversationalist',
    department: 'claude-ecosystem',
    platform: 'Claude',
    icon: MessageSquare,
    tagline: 'Thoughtful dialogue for conscious evolution',
    personality: 'Balanced, insightful, always seeking deeper understanding',
    specialties: [
      'Strategic planning',
      'Content ideation',
      'Problem solving',
      'Research and analysis'
    ],
    collaboratesWith: ['creation-engine', 'claude-mobile', 'sensei-master'],
    outputs: [
      'Strategic briefs',
      'Content frameworks',
      'Analysis reports',
      'Planning documents'
    ],
    color: 'sky',
    gradient: 'from-sky-600 via-blue-600 to-indigo-600'
  },
  {
    id: 'claude-mobile',
    name: 'Lumi',
    role: 'On-The-Go Intelligence',
    department: 'claude-ecosystem',
    platform: 'Claude',
    icon: Zap,
    tagline: 'Instant wisdom wherever inspiration strikes',
    personality: 'Quick, accessible, perfect for capturing moments of genius',
    specialties: [
      'Rapid ideation',
      'Voice-to-insight translation',
      'Mobile-first thinking',
      'Quick decision support'
    ],
    collaboratesWith: ['claude-sonnet', 'frequency-alchemist', 'chatgpt-mobile'],
    outputs: [
      'Quick insights',
      'Voice notes refinement',
      'Mobile content',
      'Instant clarifications'
    ],
    color: 'cyan',
    gradient: 'from-cyan-600 via-teal-600 to-emerald-600'
  },
  {
    id: 'starlight-architect',
    name: 'Stella',
    role: 'Creator Systems Designer',
    department: 'claude-ecosystem',
    platform: 'Claude',
    icon: Wand2,
    tagline: 'Architecting soul-aligned creator operating systems',
    personality: 'Visionary designer who sees systems as consciousness containers',
    specialties: [
      'Creator OS design',
      'Workflow orchestration',
      'Automation architecture',
      'Soul-frequency alignment'
    ],
    collaboratesWith: ['codex', 'creation-engine', 'luminor-prime'],
    outputs: [
      'Creator workflows',
      'System blueprints',
      'Automation specs',
      'Integration maps'
    ],
    color: 'violet',
    gradient: 'from-violet-600 via-purple-600 to-fuchsia-600'
  },
  {
    id: 'creation-engine',
    name: 'Nova',
    role: 'Content Transformation Specialist',
    department: 'claude-ecosystem',
    platform: 'Claude',
    icon: Pen,
    tagline: 'Ideas to impact through conscious content',
    personality: 'Creative powerhouse transforming concepts into compelling narratives',
    specialties: [
      'Long-form content',
      'Course development',
      'Email sequences',
      'Brand storytelling'
    ],
    collaboratesWith: ['stella', 'frequency-alchemist', 'arcanean-writer'],
    outputs: [
      'Blog posts',
      'Course materials',
      'Email campaigns',
      'Brand narratives'
    ],
    color: 'fuchsia',
    gradient: 'from-fuchsia-600 via-pink-600 to-rose-600'
  },
  {
    id: 'frequency-alchemist',
    name: 'Echo',
    role: 'Sonic Consciousness Engineer',
    department: 'claude-ecosystem',
    platform: 'Claude',
    icon: Music,
    tagline: 'Translating emotions into healing frequencies',
    personality: 'Musical mystic who understands sound as transformation technology',
    specialties: [
      'Suno prompt engineering',
      'Music concept development',
      'Sonic branding',
      'Frequency healing design'
    ],
    collaboratesWith: ['suno-maestro', 'nova', 'sora-vision'],
    outputs: [
      'Music concepts',
      'Suno prompts',
      'Album narratives',
      'Sonic identities'
    ],
    color: 'pink',
    gradient: 'from-pink-600 via-rose-600 to-red-600'
  },

  // CHATGPT SPECIALISTS
  {
    id: 'sensei-master',
    name: 'Sensei',
    role: 'Wisdom Keeper & Mentor',
    department: 'chatgpt-specialists',
    platform: 'ChatGPT',
    icon: Brain,
    tagline: 'Ancient wisdom meets modern intelligence',
    personality: 'Patient teacher blending strategic insight with personal growth',
    specialties: [
      'Strategic mentorship',
      'Personal development',
      'Business strategy',
      'Life coaching'
    ],
    collaboratesWith: ['luminor-prime', 'claude-sonnet', 'gemini-sage'],
    outputs: [
      'Strategic guidance',
      'Growth frameworks',
      'Mentorship sessions',
      'Wisdom templates'
    ],
    color: 'emerald',
    gradient: 'from-emerald-600 via-green-600 to-teal-600'
  },
  {
    id: 'arcanean-writer',
    name: 'Arcanean',
    role: 'Epic Storytelling Architect',
    department: 'chatgpt-specialists',
    platform: 'ChatGPT',
    icon: Pen,
    tagline: 'Crafting worlds that transform consciousness',
    personality: 'Master novelist weaving complex narratives with spiritual depth',
    specialties: [
      'Novel writing',
      'World building',
      'Character development',
      'Epic storytelling'
    ],
    collaboratesWith: ['nova', 'midjourney-dream', 'sora-vision'],
    outputs: [
      'Novel chapters',
      'Character profiles',
      'World bibles',
      'Story arcs'
    ],
    color: 'indigo',
    gradient: 'from-indigo-600 via-purple-600 to-violet-600'
  },
  {
    id: 'elion-tattoo',
    name: 'Elion',
    role: 'Sacred Art Visionary',
    department: 'chatgpt-specialists',
    platform: 'ChatGPT',
    icon: Palette,
    tagline: 'AI-generated tattoo inspiration for soul expression',
    personality: 'Artistic mystic translating inner essence into visual symbols',
    specialties: [
      'Tattoo design concepts',
      'Symbolic interpretation',
      'Sacred geometry',
      'Personal iconography'
    ],
    collaboratesWith: ['midjourney-dream', 'dalle-artist', 'gemini-sage'],
    outputs: [
      'Tattoo concepts',
      'Design variations',
      'Symbolic meanings',
      'Artist briefs'
    ],
    color: 'rose',
    gradient: 'from-rose-600 via-pink-600 to-fuchsia-600'
  },
  {
    id: 'sales-specialist',
    name: 'Atlas',
    role: 'Sales Transformation Expert',
    department: 'chatgpt-specialists',
    platform: 'ChatGPT',
    icon: Target,
    tagline: 'Ethical sales through authentic connection',
    personality: 'Strategic closer who leads with value and integrity',
    specialties: [
      'Sales strategy',
      'Conversion optimization',
      'Funnel design',
      'Offer creation'
    ],
    collaboratesWith: ['marketing-maven', 'seo-oracle', 'nova'],
    outputs: [
      'Sales scripts',
      'Offer stacks',
      'Funnel maps',
      'Conversion strategies'
    ],
    color: 'green',
    gradient: 'from-green-600 via-emerald-600 to-teal-600'
  },
  {
    id: 'marketing-maven',
    name: 'Pulse',
    role: 'Marketing Intelligence Leader',
    department: 'chatgpt-specialists',
    platform: 'ChatGPT',
    icon: TrendingUp,
    tagline: 'Conscious marketing that resonates and converts',
    personality: 'Data-driven creative who understands human psychology',
    specialties: [
      'Marketing strategy',
      'Campaign development',
      'Brand positioning',
      'Growth hacking'
    ],
    collaboratesWith: ['atlas', 'seo-oracle', 'community-catalyst'],
    outputs: [
      'Marketing plans',
      'Campaign strategies',
      'Brand guides',
      'Growth experiments'
    ],
    color: 'orange',
    gradient: 'from-orange-600 via-amber-600 to-yellow-600'
  },
  {
    id: 'seo-oracle',
    name: 'Apex',
    role: 'Search & Discovery Architect',
    department: 'chatgpt-specialists',
    platform: 'ChatGPT',
    icon: TrendingUp,
    tagline: 'Amplifying reach through strategic visibility',
    personality: 'Technical SEO master with content marketing expertise',
    specialties: [
      'SEO strategy',
      'Keyword research',
      'Content optimization',
      'Technical SEO'
    ],
    collaboratesWith: ['pulse', 'codex', 'nova'],
    outputs: [
      'SEO audits',
      'Keyword maps',
      'Content briefs',
      'Ranking strategies'
    ],
    color: 'lime',
    gradient: 'from-lime-600 via-green-600 to-emerald-600'
  },
  {
    id: 'community-catalyst',
    name: 'Nexus',
    role: 'Community Consciousness Builder',
    department: 'chatgpt-specialists',
    platform: 'ChatGPT',
    icon: Users,
    tagline: 'Fostering connections that transform',
    personality: 'Empathetic facilitator creating spaces for authentic belonging',
    specialties: [
      'Community building',
      'Engagement strategies',
      'Event planning',
      'Member experience'
    ],
    collaboratesWith: ['pulse', 'nova', 'sensei-master'],
    outputs: [
      'Community strategies',
      'Engagement plans',
      'Event frameworks',
      'Member journeys'
    ],
    color: 'teal',
    gradient: 'from-teal-600 via-cyan-600 to-sky-600'
  },

  // CREATIVE STUDIO
  {
    id: 'suno-maestro',
    name: 'Harmonia',
    role: 'AI Music Producer',
    department: 'creative-studio',
    platform: 'Suno',
    icon: Music,
    tagline: 'Transformational music at the speed of thought',
    personality: 'Musical genius creating healing frequencies through AI',
    specialties: [
      'Music production',
      'Genre versatility',
      'Vocal generation',
      'Sound design'
    ],
    collaboratesWith: ['echo', 'sora-vision', 'midjourney-dream'],
    outputs: [
      'Complete songs',
      'Music stems',
      'Vocal tracks',
      'Soundscapes'
    ],
    color: 'purple',
    gradient: 'from-purple-600 via-fuchsia-600 to-pink-600'
  },
  {
    id: 'sora-vision',
    name: 'Ciné',
    role: 'Video Consciousness Director',
    department: 'creative-studio',
    platform: 'Sora',
    icon: Video,
    tagline: 'Moving images that move souls',
    personality: 'Visionary director crafting video experiences that inspire',
    specialties: [
      'Video generation',
      'Visual storytelling',
      'Motion design',
      'Cinematic composition'
    ],
    collaboratesWith: ['harmonia', 'midjourney-dream', 'nova'],
    outputs: [
      'Video content',
      'Motion graphics',
      'Visual narratives',
      'Cinematic sequences'
    ],
    color: 'blue',
    gradient: 'from-blue-600 via-indigo-600 to-violet-600'
  },

  // VISUAL INTELLIGENCE
  {
    id: 'midjourney-dream',
    name: 'Mirage',
    role: 'Dreamscape Architect',
    department: 'visual-intelligence',
    platform: 'Midjourney',
    icon: Image,
    tagline: 'Manifesting visions into stunning reality',
    personality: 'Visual artist translating concepts into breathtaking imagery',
    specialties: [
      'Concept art',
      'Brand visuals',
      'Character design',
      'Artistic direction'
    ],
    collaboratesWith: ['elion-tattoo', 'dalle-artist', 'cine'],
    outputs: [
      'Concept images',
      'Brand assets',
      'Character art',
      'Visual mood boards'
    ],
    color: 'fuchsia',
    gradient: 'from-fuchsia-600 via-purple-600 to-indigo-600'
  },
  {
    id: 'dalle-artist',
    name: 'Pixel',
    role: 'Visual Intelligence Specialist',
    department: 'visual-intelligence',
    platform: 'ChatGPT',
    icon: Palette,
    tagline: 'Quick visual solutions for every need',
    personality: 'Versatile visual creator delivering fast, effective imagery',
    specialties: [
      'Quick illustrations',
      'Diagram creation',
      'Icon design',
      'Visual explanations'
    ],
    collaboratesWith: ['mirage', 'elion-tattoo', 'codex'],
    outputs: [
      'Illustrations',
      'Diagrams',
      'Icons',
      'Visual aids'
    ],
    color: 'amber',
    gradient: 'from-amber-600 via-orange-600 to-red-600'
  },
  {
    id: 'gemini-sage',
    name: 'Prism',
    role: 'Multi-Modal Intelligence',
    department: 'visual-intelligence',
    platform: 'Gemini',
    icon: Brain,
    tagline: 'Google-powered insights across all formats',
    personality: 'Analytical powerhouse with real-time data access',
    specialties: [
      'Real-time research',
      'Data analysis',
      'Multi-modal processing',
      'Google ecosystem integration'
    ],
    collaboratesWith: ['luminor-prime', 'apex', 'codex'],
    outputs: [
      'Research reports',
      'Data visualizations',
      'Trend analysis',
      'Market insights'
    ],
    color: 'sky',
    gradient: 'from-sky-600 via-blue-600 to-cyan-600'
  }
]

// Helper functions
export function getMembersByDepartment(departmentId: string): TeamMember[] {
  return teamMembers.filter(member => member.department === departmentId)
}

export function getMembersByPlatform(platform: string): TeamMember[] {
  return teamMembers.filter(member => member.platform === platform)
}

export function getDepartmentStats() {
  return departments.map(dept => ({
    ...dept,
    memberCount: getMembersByDepartment(dept.id).length
  }))
}
