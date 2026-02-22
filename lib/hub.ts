import { type LucideIcon } from 'lucide-react'
import {
  BarChart4,
  BookOpen,
  Bot,
  Brain,
  Building2,
  CalendarCheck,
  CheckCircle2,
  FolderOpen,
  Megaphone,
  Music,
  Newspaper,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  Workflow
} from 'lucide-react'

import { sanitizeDeepInPlace } from './text'

export type HeroStat = {
  label: string
  value: string
  detail: string
}

export type HeroHighlight = {
  title: string
  description: string
  icon: LucideIcon
}

export type QuickAction = {
  title: string
  description: string
  href: string
  icon: LucideIcon
}

export type SegmentProfile = {
  id: string
  title: string
  description: string
  transformation: string
  icon: LucideIcon
  needs: string[]
  keywords: string[]
  ctas: Array<{ label: string; href: string }>
}

export type UpdateEntry = {
  title: string
  summary: string
  type: 'Article' | 'Resource' | 'Program'
  date: string
  href: string
}

export type ResourceCollection = {
  id: string
  title: string
  description: string
  focus: string
  items: Array<{ label: string; href: string; type: string; affiliateId?: string; }>
}

export type ProjectMilestone = {
  title: string
  status: 'shipping' | 'in-progress' | 'incubating'
  description: string
  focus: string
  eta?: string
  cta?: { label: string; href: string }
}

export type KeywordCluster = {
  cluster: string
  primaryKeyword: string
  intent: string
  supportingKeywords: string[]
  link: string
}

export type AgentProtocol = {
  title: string
  description: string
  focus: string
  icon: LucideIcon
  link: { href: string; label: string }
  bullets: string[]
}

export type HomeSpotlight = {
  eyebrow: string
  title: string
  description: string
  href: string
  cta: string
}

export const heroStats: HeroStat[] = [
  {
    label: 'AI Songs Created',
    value: '12K+',
    detail: 'Original tracks produced with Suno AI — ambient, electronic, cinematic'
  },
  {
    label: 'Articles & Guides',
    value: '70+',
    detail: 'Technical deep dives on AI architecture, Claude Code, and music production'
  },
  {
    label: 'AI Agents & Skills',
    value: '110+',
    detail: '75+ skills and 38 agents in the open-source Agentic Creator OS'
  }
]

export const heroHighlights: HeroHighlight[] = [
  {
    title: 'My Music System',
    description:
      'How I create original songs with Suno AI. The prompts, the process, the publishing workflow—all documented.',
    icon: Music
  },
  {
    title: 'Learning Paths',
    description:
      'Resources I\'ve curated from Oracle, Google, MIT. Organized into paths that actually make sense.',
    icon: Users
  },
  {
    title: 'Built in Public',
    description:
      'This entire site is the system. Watch it evolve, take what works, adapt it to your own life.',
    icon: Brain
  }
]

export const quickActions: QuickAction[] = [
  {
    title: 'Music with AI',
    description: 'My complete Suno workflow. Prompts, generation, publishing.',
    href: '/music-lab',
    icon: Music
  },
  {
    title: 'Learning Paths',
    description: 'Curated courses from Google, Oracle, MIT. Organized by domain.',
    href: '/students',
    icon: Users
  },
  {
    title: 'Prompt Collection',
    description: 'Prompts I actually use. Copy them, adapt them.',
    href: '/prompt-library',
    icon: Sparkles
  },
  {
    title: 'How I Build This',
    description: 'The process behind this site. Every decision documented.',
    href: '/creation-chronicles',
    icon: BookOpen
  },
  {
    title: 'What\'s Next',
    description: 'Current focus and upcoming work. Built in public.',
    href: '/roadmap',
    icon: CalendarCheck
  },
  {
    title: 'Resources',
    description: 'Tools, courses, and creators I recommend.',
    href: '/resources',
    icon: FolderOpen
  }
]

export const segmentProfiles: SegmentProfile[] = [
  {
    id: 'creators',
    title: 'Creators',
    description:
      'Build AI systems that amplify your creative voice—not replace it.',
    transformation:
      'Ship music, content, and products faster while staying true to your unique style.',
    icon: Music,
    needs: [
      'Suno workflows and prompts for AI music creation',
      'Content systems that maintain your authentic voice',
      'Launch frameworks that scale without burning out'
    ],
    keywords: ['ai music workflow', 'creator ai tools', 'ai content creation'],
    ctas: [
      { label: 'Explore Vibe OS', href: '/products/vibe-os' },
      { label: 'Browse Free Prompts', href: '/prompt-library' }
    ]
  },
  {
    id: 'students',
    title: 'Students & Learners',
    description:
      'Build your personal AI learning system across any domain you want to master.',
    transformation:
      'Learn faster with AI assistants customized to your goals, schedule, and learning style.',
    icon: Users,
    needs: [
      'AI study systems for any subject or skill',
      'Career planning with personalized AI guidance',
      'Life domain frameworks (health, finances, relationships)'
    ],
    keywords: ['ai learning system', 'student ai tools', 'personal ai assistant'],
    ctas: [
      { label: 'Enter Student Hub', href: '/students' },
      { label: 'Start Learning', href: '/courses' }
    ]
  },
  {
    id: 'enterprise',
    title: 'Teams & Executives',
    description:
      'Deploy AI systems that align with your organization\'s values and goals.',
    transformation:
      'Teams ship faster with AI workflows that match your culture and quality standards.',
    icon: Building2,
    needs: [
      'AI governance frameworks that match your values',
      'Team workflows for collaborative AI usage',
      'Measurement systems to track real impact'
    ],
    keywords: ['enterprise ai strategy', 'team ai workflows', 'ai governance'],
    ctas: [
      { label: 'See Enterprise Solutions', href: '/enterprise' },
      { label: 'Book Strategy Session', href: 'mailto:hello@frankx.ai?subject=Strategy%20Session' }
    ]
  },
  {
    id: 'builders',
    title: 'Builders & Developers',
    description:
      'Design AI agent systems that are practical, maintainable, and human-centered.',
    transformation:
      'Move from experimenting with tools to shipping real AI-powered products.',
    icon: Bot,
    needs: [
      'Agent architecture patterns and reference designs',
      'Testing frameworks for AI systems',
      'Integration guides for common platforms'
    ],
    keywords: ['ai agent architecture', 'ai development', 'agent design patterns'],
    ctas: [
      { label: 'View Architecture Guides', href: '/guides' },
      { label: 'Explore Templates', href: '/templates' }
    ]
  }
]

export const heroSegments = [
  {
    id: 'creators',
    label: 'Creators',
    description: 'AI music, content systems, and launch frameworks that match your style.',
    href: '/products/vibe-os'
  },
  {
    id: 'students',
    label: 'Students',
    description: 'Personal AI learning systems for any domain you want to master.',
    href: '/students'
  },
  {
    id: 'teams',
    label: 'Teams & Executives',
    description: 'AI workflows aligned with your organization\'s values and goals.',
    href: '/enterprise'
  }
]

export const updateEntries: UpdateEntry[] = [
  {
    title: 'Building Your Personal AI System',
    summary:
      'A practical guide to creating AI workflows that align with your unique goals, values, and working style.',
    type: 'Article',
    date: '2025-01-24',
    href: '/blog/building-personal-ai-system'
  },
  {
    title: 'AI Music Creation with Suno',
    summary:
      'Complete workflow for creating original music with AI—from prompts to production to publishing.',
    type: 'Article',
    date: '2025-01-23',
    href: '/blog/ai-music-creation-suno'
  },
  {
    title: 'The Student AI Toolkit',
    summary:
      'How to build AI study systems, career planning assistants, and life domain frameworks.',
    type: 'Article',
    date: '2025-01-22',
    href: '/blog/student-ai-toolkit'
  },
  {
    title: 'Creator Launch Framework',
    summary:
      'Ship products and content faster with AI-assisted planning, writing, and distribution.',
    type: 'Article',
    date: '2025-01-21',
    href: '/blog/creator-launch-framework'
  },
  {
    title: 'Values-Aligned AI Development',
    summary:
      'How to build AI systems that reflect your principles—not generic defaults.',
    type: 'Article',
    date: '2025-01-20',
    href: '/blog/values-aligned-ai'
  },
  {
    title: 'How We Build This Hub',
    summary:
      'Behind the scenes: human-AI collaboration, agent teams, and open development.',
    type: 'Article',
    date: '2025-01-19',
    href: '/creation-chronicles'
  }
]

export const resourceCollections: ResourceCollection[] = [
  {
    id: 'start',
    title: 'Start Here (Free)',
    description: 'Quick-start resources to begin building your personal AI system today.',
    focus: 'Perfect for creators and students just getting started.',
    items: [
      { label: 'AI Readiness Assessment', href: '/assessment', type: 'Assessment' },
      { label: 'Prompt Library', href: '/prompt-library', type: 'Prompts' },
      { label: 'Getting Started Guide', href: '/start', type: 'Guide' }
    ]
  },
  {
    id: 'deepen',
    title: 'Go Deeper',
    description: 'Comprehensive guides and templates for building real AI systems.',
    focus: 'For creators and students ready to build serious workflows.',
    items: [
      { label: 'Vibe OS (AI Music)', href: '/products/vibe-os', type: 'Product' },
      { label: 'Student Hub', href: '/students', type: 'Platform' },
      { label: 'Template Library', href: '/templates', type: 'Templates' },
      { label: 'Guides Collection', href: '/guides', type: 'Guides' },
      { label: 'Roadmap', href: '/roadmap', type: 'Live roadmap' }
    ]
  },
  {
    id: 'premium',
    title: 'Work Together',
    description: 'Direct collaboration for teams and creators building at scale.',
    focus: 'For those who want personalized guidance and strategy.',
    items: [
      { label: 'Strategy Session', href: 'mailto:hello@frankx.ai?subject=Strategy%20Session', type: 'Advisory' },
      { label: 'Team Training', href: 'mailto:hello@frankx.ai?subject=Team%20Training', type: 'Training' },
      { label: 'Music Lab', href: '/music-lab', type: 'Experience' }
    ]
  }
]

export const projectMilestones: ProjectMilestone[] = [
  {
    title: 'Vibe OS 2.0',
    status: 'shipping',
    description:
      'Next-generation AI music creation system with advanced Suno workflows and publishing tools.',
    focus: 'Complete workflow from idea to published track.',
    eta: 'Rolling releases',
    cta: { label: 'Try Vibe OS', href: '/products/vibe-os' }
  },
  {
    title: 'Student Hub Expansion',
    status: 'in-progress',
    description:
      'Personal AI learning systems for career planning, skill development, and life domains.',
    focus: 'Interactive workshops and domain-specific AI assistants.',
    eta: 'Q1 2025',
    cta: { label: 'Explore Student Hub', href: '/students' }
  },
  {
    title: 'Creator Launch System',
    status: 'incubating',
    description:
      'End-to-end framework for shipping products with AI-assisted planning and execution.',
    focus: 'From idea to launch with collaborative AI agents.',
    eta: 'Q2 2025',
    cta: { label: 'Learn More', href: '/products' }
  }
]

export const keywordClusters: KeywordCluster[] = [
  {
    cluster: 'AI Music Creation',
    primaryKeyword: 'ai music workflow suno',
    intent: 'Creators wanting to make original music with AI.',
    supportingKeywords: ['suno prompts', 'ai music production', 'ai song creation'],
    link: '/products/vibe-os'
  },
  {
    cluster: 'Student AI Systems',
    primaryKeyword: 'ai learning system',
    intent: 'Students building personalized AI study and career tools.',
    supportingKeywords: ['ai study assistant', 'personal ai tutor', 'ai career planning'],
    link: '/students'
  },
  {
    cluster: 'Creator Workflows',
    primaryKeyword: 'creator ai tools',
    intent: 'Creators looking for AI systems that match their style.',
    supportingKeywords: ['ai content creation', 'creator productivity', 'ai launch framework'],
    link: '/prompt-library'
  },
  {
    cluster: 'Values-Aligned AI',
    primaryKeyword: 'build personal ai system',
    intent: 'People who want AI that reflects their values and goals.',
    supportingKeywords: ['custom ai assistant', 'ai aligned with values', 'personal ai workflow'],
    link: '/guides'
  }
]

export const homeSpotlights: HomeSpotlight[] = [
  {
    eyebrow: 'Music',
    title: 'How I Make Songs with AI',
    description:
      'My complete Suno workflow. 12,000+ songs created, every step documented.',
    href: '/music-lab',
    cta: 'See the Process'
  },
  {
    eyebrow: 'Learning',
    title: 'Curated Learning Paths',
    description:
      'The best free resources from Oracle, Google, MIT. Organized so you don\'t have to search.',
    href: '/students',
    cta: 'Browse Paths'
  },
  {
    eyebrow: 'Prompts',
    title: 'My Prompt Collection',
    description:
      'Prompts I actually use daily. For music, writing, coding, and life.',
    href: '/prompt-library',
    cta: 'View Collection'
  },
  {
    eyebrow: 'Process',
    title: 'Building in Public',
    description:
      'This site is the system. Watch me build it, learn from the process.',
    href: '/creation-chronicles',
    cta: 'Follow Along'
  }
]

export const agentProtocols: AgentProtocol[] = [
  {
    title: 'Vibe OS',
    description: 'AI-powered music creation with Suno. From prompts to published tracks.',
    focus: 'For creators who want to make original music with AI.',
    icon: Music,
    link: { href: '/products/vibe-os', label: 'Start Creating' },
    bullets: [
      'Complete Suno workflow: prompts, generation, editing',
      'Publishing guides for streaming platforms',
      'Licensing clarity for AI-created music'
    ]
  },
  {
    title: 'Student Learning System',
    description: 'Build AI assistants customized to your learning goals and style.',
    focus: 'Personal AI tutors, career planning, and life domain mastery.',
    icon: Users,
    link: { href: '/students', label: 'Enter Student Hub' },
    bullets: [
      'Domain-specific AI assistants you can customize',
      'Career planning and skill development frameworks',
      'Study systems that adapt to how you learn'
    ]
  },
  {
    title: 'Prompt Library',
    description: 'Ready-to-use prompts for creators, students, and builders.',
    focus: 'Copy, adapt, and build on proven templates.',
    icon: Sparkles,
    link: { href: '/prompt-library', label: 'Browse Prompts' },
    bullets: [
      '200+ prompts across multiple categories',
      'Each prompt designed to be customized',
      'New prompts added regularly from the community'
    ]
  },
  {
    title: 'Creation Chronicles',
    description: 'Behind-the-scenes of how we build this hub with AI collaboration.',
    focus: 'Open development, agent teams, and transparent methodology.',
    icon: BookOpen,
    link: { href: '/creation-chronicles', label: 'Read the Chronicles' },
    bullets: [
      'Real examples of human-AI collaboration',
      'Agent architectures you can learn from',
      'Honest reflection on what works and what doesn\'t'
    ]
  }
]

// Testimonials removed — anonymous "From the Community" quotes feel fabricated.
// Re-add when real, attributed testimonials are collected.
export const testimonials: Array<{ quote: string; name: string; role: string }> = []

export const testimonialIcon = CheckCircle2

export const heroSubtext = [
  'The system I use to create music, learn new skills, and build my life with AI.',
  'Everything documented. Take what works for you.'
]

export const heroCta = {
  primary: { label: 'Explore', href: '/start' },
  secondary: { label: 'Listen to My Music', href: '/music-lab' },
  tertiary: { label: 'See How I Build This', href: '/creation-chronicles' }
}

export const heroSupportLink = {
  label: 'About Frank',
  href: '/about'
}

const hubTextCollections = [
  heroStats,
  heroHighlights,
  quickActions,
  segmentProfiles,
  updateEntries,
  resourceCollections,
  projectMilestones,
  keywordClusters,
  homeSpotlights,
  agentProtocols,
  testimonials,
  heroSubtext,
  heroCta,
  heroSegments,
  heroSupportLink
] as const;

hubTextCollections.forEach((entry) => {
  sanitizeDeepInPlace(entry);
});
