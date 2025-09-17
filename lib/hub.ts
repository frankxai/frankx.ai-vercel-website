import { type LucideIcon } from 'lucide-react'
import {
  BarChart4,
  BookOpen,
  Bot,
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
  items: Array<{ label: string; href: string; type: string }>
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

export const heroStats: HeroStat[] = [
  {
    label: 'Enterprise Systems Shipped',
    value: '200+',
    detail: 'Oracle-grade AI roadmaps deployed with conscious safeguards'
  },
  {
    label: 'Suno Collaborations',
    value: '500',
    detail: 'Music-led rituals co-created with AI and communities'
  },
  {
    label: 'Weekly Briefings',
    value: '52+',
    detail: 'Annual cadence of strategic intelligence drops and audits'
  }
]

export const heroHighlights: HeroHighlight[] = [
  {
    title: 'Signal Over Noise',
    description:
      'Curated AI news, regulatory shifts, and capability drops filtered for strategic relevance.',
    icon: Megaphone
  },
  {
    title: 'Resource Vault',
    description:
      'Guides, templates, playlists, and scripts to launch conscious intelligence experiences.',
    icon: BookOpen
  },
  {
    title: 'Agent-Ready Blueprints',
    description:
      'Process maps and prompts that help your AI agents reason with the same values you hold.',
    icon: Workflow
  }
]

export const quickActions: QuickAction[] = [
  {
    title: 'Search the Hub',
    description: 'Semantic search across essays, guides, and templates.',
    href: '/search',
    icon: Search
  },
  {
    title: 'Latest Briefings',
    description: 'Read the intelligence updates that anchor every engagement.',
    href: '/blog',
    icon: Newspaper
  },
  {
    title: 'Resource Library',
    description: 'Download assessments, playbooks, and creative stacks.',
    href: '/resources',
    icon: FolderOpen
  },
  {
    title: 'Book Progress',
    description: 'Track the Soul Frequency manuscript and new releases.',
    href: '/#projects',
    icon: CalendarCheck
  }
]

export const segmentProfiles: SegmentProfile[] = [
  {
    id: 'inner-circle',
    title: 'Friends & Family',
    description:
      'Help the people closest to you understand AI with warmth, calm, and clear language.',
    transformation:
      'Everyone at the dinner table knows how to ask better questions, evaluate tools, and stay safe.',
    icon: Users,
    needs: [
      'Plain-language explainers and conversation prompts',
      'Safety rituals for households and classrooms',
      'Short practice sessions that build confidence together'
    ],
    keywords: ['family ai guide', 'teach kids ai safely', 'ai conversations with parents'],
    ctas: [
      { label: 'Family AI Guide', href: '/family-guide' },
      { label: 'Soul Frequency Quiz', href: '/soul-frequency-quiz' }
    ]
  },
  {
    id: 'creators',
    title: 'Creators & Influencers',
    description:
      'Turn AI collaborators into vibrant co-producers who amplify your aesthetic, not erase it.',
    transformation:
      'Your studio ships music, video, and rituals that sound like you while scaling to global audiences.',
    icon: Music,
    needs: [
      'Daily prompts and sound design workflows in Suno',
      'Narrative frameworks for launches and community events',
      'Licensing clarity for mixed human-AI projects'
    ],
    keywords: ['ai music workflow', 'creator ai prompts', 'influencer ai strategy'],
    ctas: [
      { label: 'Enter the Music Lab', href: '/music-lab' },
      { label: "Read: AI Doesn't Have To Be Soulless", href: '/blog/ai-doesnt-have-to-be-soulless' }
    ]
  },
  {
    id: 'enterprise',
    title: 'High Value Clients & Executives',
    description:
      'Architect governance, measurement, and monetization for intelligent products and services.',
    transformation:
      'Teams align on a conscious AI operating system with dashboards, rituals, and revenue loops.',
    icon: Building2,
    needs: [
      'Executive-ready briefings with strategic options',
      'Risk, compliance, and data stewardship playbooks',
      'Pilot-to-scale roadmaps that protect culture and margins'
    ],
    keywords: ['enterprise ai strategy', 'oracle ai architect', 'ai governance playbook'],
    ctas: [
      { label: "Founder’s AI Playbook", href: '/founder-playbook' },
      { label: 'Book a Strategy Intensive', href: 'mailto:hello@frankx.ai?subject=Conscious%20AI%20Strategy' }
    ]
  },
  {
    id: 'architects',
    title: 'AI Architects & Builders',
    description:
      'Design agent ecosystems that are auditable, resilient, and tuned to human outcomes.',
    transformation:
      'You shift from experimenting with tools to orchestrating a living intelligence stack.',
    icon: Bot,
    needs: [
      'Reference architectures with data, workflow, and orchestration layers',
      'Testing checklists for ethical guardrails and performance',
      'Benchmark dashboards to communicate value to stakeholders'
    ],
    keywords: ['ai agent architecture', 'human centered automation', 'ai orchestration checklist'],
    ctas: [
      { label: 'Intelligence Revolution Playbook', href: '/blog/intelligence-revolution-2025' },
      { label: 'Explore Guides', href: '/guides' }
    ]
  },
  {
    id: 'community',
    title: 'Community & Collaborators',
    description:
      'Bring cohorts, friends, and online circles into shared experiments that transform together.',
    transformation:
      'Communities receive updates, rituals, and shared language for conscious AI growth.',
    icon: Sparkles,
    needs: [
      'Live activation templates and event scripts',
      'Shared resource boards for continuing education',
      'Feedback loops that celebrate progress and surface needs'
    ],
    keywords: ['community ai ritual', 'ai workshop template', 'collective intelligence experiences'],
    ctas: [
      { label: 'Start Here Experience', href: '/start' },
      { label: 'Template Library', href: '/templates' }
    ]
  }
]

export const updateEntries: UpdateEntry[] = [
  {
    title: 'The Intelligence Revolution Playbook',
    summary:
      'A systems-first guide to orchestrating conscious AI across products, teams, and experiences.',
    type: 'Article',
    date: '2025-09-16',
    href: '/blog/intelligence-revolution-2025'
  },
  {
    title: 'Soul Frequency Framework',
    summary:
      'Map the creative signature AI should amplify across your brand, family, and leadership.',
    type: 'Article',
    date: '2024-08-20',
    href: '/blog/soul-frequency-framework'
  },
  {
    title: 'AI Basics for Families Guide',
    summary:
      'A practical field manual for conversations, boundaries, and first projects at home.',
    type: 'Resource',
    date: '2024-05-01',
    href: '/family-guide'
  }
]

export const resourceCollections: ResourceCollection[] = [
  {
    id: 'start',
    title: 'Start Free & Grounded',
    description: 'Orientation experiences that give immediate language, safety, and clarity.',
    focus: 'Perfect for welcoming friends, family, and new collaborators into the hub.',
    items: [
      { label: 'Soul Frequency Assessment', href: '/soul-frequency-assessment', type: 'Assessment' },
      { label: 'Soul Frequency Quiz', href: '/soul-frequency-quiz', type: 'Quiz' },
      { label: 'AI Basics for Families', href: '/family-guide', type: 'Guide' }
    ]
  },
  {
    id: 'deepen',
    title: 'Deepen Your Practice',
    description: 'Hands-on guides, playbooks, and templates for shipping conscious AI systems.',
    focus: 'Best for creators, architects, and executives building multi-offer ecosystems.',
    items: [
      { label: "Founder’s AI Playbook", href: '/founder-playbook', type: 'Playbook' },
      { label: 'Template Library', href: '/templates', type: 'Templates' },
      { label: 'Guides Collection', href: '/guides', type: 'Guides' }
    ]
  },
  {
    id: 'premium',
    title: 'Premium Engagements',
    description: 'High-touch collaborations for teams that need bespoke AI architecture and leadership.',
    focus: 'Ideal for enterprise leaders, studios, and creators scaling conscious ecosystems.',
    items: [
      { label: 'Strategy Intensive', href: 'mailto:hello@frankx.ai?subject=Strategy%20Intensive', type: 'Advisory' },
      { label: 'Intelligence Retainer', href: 'mailto:hello@frankx.ai?subject=Intelligence%20Retainer', type: 'Retainer' },
      { label: 'Immersive Experiences', href: '/music-lab', type: 'Experiences' }
    ]
  }
]

export const projectMilestones: ProjectMilestone[] = [
  {
    title: 'Soul Frequency Book Manuscript',
    status: 'in-progress',
    description:
      'Documenting the methodology, rituals, and case studies for living with conscious intelligence.',
    focus: 'Chapters released to the community for feedback and refinement.',
    eta: 'Beta chapters publishing Q4 2024',
    cta: { label: 'Preview the Framework', href: '/blog/soul-frequency-framework' }
  },
  {
    title: 'Creator Operating System',
    status: 'shipping',
    description:
      'Templates, automations, and scorecards that let studios manage AI-assisted launches.',
    focus: 'Includes content calendars, monetization arcs, and Suno session rituals.',
    eta: 'Rolling releases every month',
    cta: { label: 'Access the Template Library', href: '/templates' }
  },
  {
    title: 'Family Intelligence Navigator',
    status: 'incubating',
    description:
      'Micro-learning tracks for families adopting AI with confidence and shared boundaries.',
    focus: 'Piloting with close community groups before public launch.',
    eta: 'Pilot cohort forming for 2025',
    cta: { label: 'Join the Start Here Experience', href: '/start' }
  }
]

export const keywordClusters: KeywordCluster[] = [
  {
    cluster: 'Conscious AI Strategy',
    primaryKeyword: 'conscious ai strategy',
    intent: 'Leaders seeking a holistic operating system for AI.',
    supportingKeywords: ['ai operating system', 'enterprise ai architecture', 'ai governance rituals'],
    link: '/blog/intelligence-revolution-2025'
  },
  {
    cluster: 'Family AI Education',
    primaryKeyword: 'ai guide for families',
    intent: 'Parents and mentors looking for safe, clear instruction.',
    supportingKeywords: ['ai conversations with kids', 'family ai safety checklist', 'teach ai at home'],
    link: '/family-guide'
  },
  {
    cluster: 'Creator Workflows',
    primaryKeyword: 'ai music workflow',
    intent: 'Creators wanting to fuse AI with authentic artistry.',
    supportingKeywords: ['suno prompts', 'ai content ritual', 'creative intelligence system'],
    link: '/music-lab'
  },
  {
    cluster: 'AI Architect Toolkit',
    primaryKeyword: 'ai agent architecture',
    intent: 'Builders searching for design patterns and governance checklists.',
    supportingKeywords: ['human centered automation', 'agent governance', 'orchestration blueprint'],
    link: '/guides'
  }
]

export const agentProtocols: AgentProtocol[] = [
  {
    title: 'Search & Retrieval Mesh',
    description: 'Ground AI agents in verified knowledge before they respond or act.',
    focus: 'Feeds semantic search, embeddings, and retrieval chains for assistants and copilots.',
    icon: Search,
    link: { href: '/search', label: 'Launch Search' },
    bullets: [
      'Unified index of essays, guides, and templates',
      'Pre-built intents and tags for delegation',
      'Daily refreshed highlights for briefing agents'
    ]
  },
  {
    title: 'Safety & Alignment Framework',
    description: 'Protect communities with clear boundaries, escalation paths, and review rituals.',
    focus: 'Perfect for friends, family, and enterprise compliance teams.',
    icon: ShieldCheck,
    link: { href: '/family-guide', label: 'Review Safety Guide' },
    bullets: [
      'Conversation scripts and consent checkpoints',
      'Values-aligned guardrails for prompts and outputs',
      'Incident response templates for AI misuse'
    ]
  },
  {
    title: 'Creation Engine',
    description: 'Design sonic, narrative, and visual experiences that feel alive.',
    focus: 'Combines Suno workflows with marketing arcs and monetization plans.',
    icon: Music,
    link: { href: '/music-lab', label: 'Visit Music Lab' },
    bullets: [
      'Session prompts tuned to archetypes and emotions',
      'Launch timelines with nurture sequences',
      'Licensing and rights checklist for AI collaborations'
    ]
  },
  {
    title: 'Executive Intelligence Dashboard',
    description: 'Translate experiments into executive decisions and measurable value.',
    focus: 'Bring clarity to high-value clients and leadership teams.',
    icon: BarChart4,
    link: { href: '/founder-playbook', label: "Open Founder’s Playbook" },
    bullets: [
      'KPI scorecards for human + AI outcomes',
      'Governance cadences that satisfy security reviews',
      'Roadmaps from pilot to scale with decision gates'
    ]
  }
]

export const testimonials = [
  {
    quote:
      'Frank helped us turn a scattered set of offers into a coherent intelligence system. We shipped a new funnel, an AI concierge, and grew revenue without burning out the team.',
    name: 'Zoe Carter',
    role: 'Founder · Conscious Leadership Lab'
  },
  {
    quote:
      'Our Oracle team finally has language and rituals for building AI that honors people. The Soul Frequency work has become part of onboarding.',
    name: 'David Lin',
    role: 'Senior Director · Fortune 100 Enterprise'
  },
  {
    quote:
      'The Music Lab unlocked a new creative lane. We now release immersive drops every month with clarity on rights, monetization, and community engagement.',
    name: 'Amina Reyes',
    role: 'Artist & Community Architect'
  }
]

export const testimonialIcon = CheckCircle2

export const heroSubtext = [
  'FrankX is the global AI voice guiding conscious creators, families, and executives.',
  'Every insight is rooted in enterprise delivery, community rituals, and artistry.'
]

export const heroCta = {
  primary: { label: 'Start the Soul Frequency Assessment', href: '/soul-frequency-assessment' },
  secondary: { label: 'Browse All Updates', href: '/#updates' }
}

export const heroSupportLink = {
  label: 'View Conscious AI Principles',
  href: '/guides'
}
