import { BarChart4, BookOpen, CheckCircle2, Music, Sparkles, Users, Workflow, type LucideIcon } from 'lucide-react'
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
    label: 'Creators in the lab',
    value: '12k+',
    detail: 'Artists, writers, and builders following the Creation Chronicles dispatch'
  },
  {
    label: 'Suno sessions shared',
    value: '500+',
    detail: 'Vibe OS templates tuned for launches, rituals, and deep focus blocks'
  },
  {
    label: 'Systems shipped',
    value: '300+',
    detail: 'Creator operating systems designed with the FrankX agent collective'
  }
]

export const heroHighlights: HeroHighlight[] = [
  {
    title: 'Creator Systems',
    description: 'Operating rituals, dashboards, and automations that keep every release on schedule.',
    icon: Workflow
  },
  {
    title: 'Sonic Rituals',
    description: 'Ready-to-play Suno sessions and music labs that charge every launch timeline.',
    icon: Music
  },
  {
    title: 'Storyworld Signals',
    description: 'Creation Chronicles essays and prompts to nurture your community and offers.',
    icon: BookOpen
  }
]

export const quickActions: QuickAction[] = [
  {
    title: 'Download Creative AI Toolkit',
    description: 'Grab the prompt systems and launch rituals creators use to ship daily.',
    href: '/products/creative-ai-toolkit',
    icon: Sparkles
  },
  {
    title: 'Book Creator Lab Session',
    description: 'Design your operating system with Frank and the agent collective.',
    href: '/products/agentic-creator-os',
    icon: Workflow
  },
  {
    title: 'Spin Up a Vibe Session',
    description: 'Drop a Suno-powered soundtrack tailored for your next release.',
    href: '/products/vibe-os',
    icon: Music
  },
  {
    title: 'Read Creation Chronicles',
    description: 'Catch the latest stories, playbooks, and weekly studio dispatch.',
    href: '/creation-chronicles',
    icon: BookOpen
  },
  {
    title: 'Join Inner Circle Waitlist',
    description: 'Reserve your spot in the Realm for live labs, private drops, and agent support.',
    href: 'https://frankx.ck.page/realm',
    icon: Users
  }
]

export const segmentProfiles: SegmentProfile[] = [
  {
    id: 'launch-artists',
    title: 'Launch Artists',
    description: 'Producers, vocalists, and performers building consistent release rituals.',
    transformation: 'Turn raw ideas into Suno sessions, release calendars, and monetised drops.',
    icon: Music,
    needs: [
      'Session prompts tuned to emotion and genre',
      'Release cadences with content + promo beats',
      'Rights, publishing, and monetisation checklists'
    ],
    keywords: ['suno launch prompts', 'release ritual plan', 'ai music workflow'],
    ctas: [
      { label: 'Explore Vibe OS', href: '/products/vibe-os' },
      { label: 'Join the Music Lab', href: '/music-lab' }
    ]
  },
  {
    id: 'creator-architects',
    title: 'Creator Architects',
    description: 'Builders crafting content systems, digital products, and studio automations.',
    transformation: 'Design a Creator Lab OS that runs ideation, batching, publishing, and review loops.',
    icon: Workflow,
    needs: [
      'Operating templates for weekly sprints',
      'Automations that keep content and offers shipping',
      'Dashboards that surface signals and next moves'
    ],
    keywords: ['creator lab os', 'creator operating system', 'automation ritual'],
    ctas: [
      { label: 'Book Creator Lab OS', href: '/products/agentic-creator-os' },
      { label: 'Download Creative AI Toolkit', href: '/products/creative-ai-toolkit' }
    ]
  },
  {
    id: 'story-guides',
    title: 'Story Guides',
    description: 'Writers, educators, and community hosts weaving story-driven ecosystems.',
    transformation: 'Build Creation Chronicle arcs, nurture emails, and narrative funnels that convert.',
    icon: BookOpen,
    needs: [
      'Editorial calendars paired with prompts',
      'Launch blueprints for courses, memberships, and cohorts',
      'Community rituals that keep people engaged'
    ],
    keywords: ['creation chronicles prompts', 'storyworld launch plan', 'community ritual roadmap'],
    ctas: [
      { label: 'Read Creation Chronicles', href: '/creation-chronicles' },
      { label: 'Explore Templates', href: '/resources/templates' }
    ]
  },
  {
    id: 'allies',
    title: 'Allies & Patrons',
    description: 'Friends, collaborators, and supporters who amplify the work.',
    transformation: 'Stay close to the studio, access private drops, and support the Inner Circle.',
    icon: Sparkles,
    needs: [
      'A clear path into the Realm waitlist',
      'Backstage stories to share with their audience',
      'Ways to commission custom experiences and systems'
    ],
    keywords: ['frankx realm waitlist', 'inner circle access', 'custom creator system'],
    ctas: [
      { label: 'Creation Chronicles', href: '/creation-chronicles' },
      { label: 'Join Inner Circle Waitlist', href: 'https://frankx.ck.page/realm' }
    ]
  }
];

export const heroSegments = [
  {
    id: 'artists',
    label: 'Launch Artists',
    description: 'Spin up Suno sessions, plan your releases, and keep the music flowing.',
    href: '/products/vibe-os'
  },
  {
    id: 'architects',
    label: 'Creator Architects',
    description: 'Design operating systems, automations, and dashboards for your studio.',
    href: '/products/agentic-creator-os'
  },
  {
    id: 'story-guides',
    label: 'Story Guides',
    description: 'Build Creation Chronicle arcs, nurture sequences, and community rituals.',
    href: '/creation-chronicles'
  },
  {
    id: 'inner-circle',
    label: 'Allies & Patrons',
    description: 'Step into the Realm for live labs, private drops, and agent desk support.',
    href: '/realm'
  }
]

export const updateEntries: UpdateEntry[] = [
  {
    title: 'The Creative OS Playbook',
    summary: 'A step-by-step guide to building your own Creator Operating System with FrankX rituals.',
    type: 'Article',
    date: '2025-09-27',
    href: '/blog/the-creative-os'
  },
  {
    title: 'Agentic SEO Publishing Masterplan',
    summary: 'How the Creation Chronicles team ships a daily intelligence loop without burning out.',
    type: 'Article',
    date: '2025-09-26',
    href: '/blog/agentic-seo-publishing-masterplan'
  },
  {
    title: '500 Songs Later',
    summary: 'What three years of Suno collaborations taught us about consciousness and creative practice.',
    type: 'Article',
    date: '2025-09-26',
    href: '/blog/05-music-as-consciousness-technology'
  },
  {
    title: 'Agentic Creator OS Field Notes',
    summary: 'Case studies from creators installing dashboards, automations, and launch rituals.',
    type: 'Article',
    date: '2025-09-26',
    href: '/blog/07-agentic-creator-os'
  },
  {
    title: 'Intelligence Atlas Vol. I',
    summary: 'The 10,000-word flagship report on adoption signals, agent readiness, and creator economics.',
    type: 'Article',
    date: '2025-01-21',
    href: '/blog/frankx-intelligence-atlas-volume-1'
  }
]

export const resourceCollections: ResourceCollection[] = [
  {
    id: 'starter',
    title: 'Creator Starter Kit',
    description: 'First steps for syncing with the FrankX studio and rituals.',
    focus: 'Perfect for new creators and allies joining the ecosystem.',
    items: [
      { label: 'Creative AI Toolkit', href: '/products/creative-ai-toolkit', type: 'Product' },
      { label: 'Creation Chronicles', href: '/creation-chronicles', type: 'Newsletter' },
      { label: 'Soul Frequency Quiz', href: '/soul-frequency-quiz', type: 'Quiz' }
    ]
  },
  {
    id: 'systems',
    title: 'Systems & Strategy',
    description: 'Operating guides, dashboards, and workflows to scale your studio.',
    focus: 'Ideal for Creator Architects designing products and automation.',
    items: [
      { label: 'Creator Lab OS', href: '/products/agentic-creator-os', type: 'Program' },
      { label: 'Agentic SEO Publishing Masterplan', href: '/blog/agentic-seo-publishing-masterplan', type: 'Article' },
      { label: 'Intelligence Atlas', href: '/intelligence-atlas', type: 'Report' },
      { label: 'Template Library', href: '/resources/templates', type: 'Templates' }
    ]
  },
  {
    id: 'sonic',
    title: 'Sonic Rituals',
    description: 'Music labs and session packs to energize every release.',
    focus: 'Great for Launch Artists and performer collectives.',
    items: [
      { label: 'Vibe OS Sessions', href: '/products/vibe-os', type: 'Product' },
      { label: 'Music Lab', href: '/music-lab', type: 'Experience' },
      { label: 'Latest Suno Drops', href: '/resources', type: 'Gallery' }
    ]
  }
]

export const projectMilestones: ProjectMilestone[] = [
  {
    title: 'Creator Lab OS Cohort 04',
    status: 'shipping',
    description: 'Live build cohort focused on launch cadences, automation wiring, and analytics dashboards.',
    focus: 'Weekly labs, peer reviews, and agent desk support for 20 creators.',
    eta: 'Applications close Oct 15',
    cta: { label: 'Apply for the Lab', href: '/products/agentic-creator-os' }
  },
  {
    title: 'Vibe OS Session Vault',
    status: 'in-progress',
    description: 'Expanding the Suno session library with cinematic, ambient, and kinetic packs.',
    focus: 'Each pack includes stems, prompt notes, and integration tips for reels & livestreams.',
    eta: 'Next drop lands October 5',
    cta: { label: 'Preview the Sessions', href: '/products/vibe-os' }
  },
  {
    title: 'Creation Chronicles Companion App',
    status: 'incubating',
    description: 'A lightweight hub for daily prompts, ritual tracking, and drop notifications.',
    focus: 'Prototype testing with Inner Circle members before public beta.',
    eta: 'Private beta Winter 2025',
    cta: { label: 'Join Inner Circle Waitlist', href: '/realm' }
  }
]

export const keywordClusters: KeywordCluster[] = [
  {
    cluster: 'Creator Operating System',
    primaryKeyword: 'creator operating system',
    intent: 'Creators searching for rituals, automations, and dashboards to run their studio.',
    supportingKeywords: ['creator lab os', 'content automation workflow', 'creator dashboard template'],
    link: '/blog/the-creative-os'
  },
  {
    cluster: 'AI Music Rituals',
    primaryKeyword: 'suno music prompts',
    intent: 'Artists wanting ready-to-use Suno prompts and release workflows.',
    supportingKeywords: ['vibe os session', 'suno release plan', 'ai music ritual'],
    link: '/products/vibe-os'
  },
  {
    cluster: 'Creation Chronicles Stories',
    primaryKeyword: 'creation chronicles newsletter',
    intent: 'Writers and community builders looking for narrative frameworks and prompts.',
    supportingKeywords: ['ai storytelling prompts', 'creator newsletter strategy', 'storyworld launch plan'],
    link: '/creation-chronicles'
  }
]

export const homeSpotlights: HomeSpotlight[] = [
  {
    eyebrow: 'Guide',
    title: 'The Creative OS Playbook',
    description: 'Build a creator operating system that pairs AI workflows with soulful rituals.',
    href: '/blog/the-creative-os',
    cta: 'Read the playbook'
  },
  {
    eyebrow: 'Sessions',
    title: 'Vibe OS Session Vault',
    description: 'Download the latest Suno session packs with stems, prompts, and launch notes.',
    href: '/products/vibe-os',
    cta: 'Preview the vault'
  },
  {
    eyebrow: 'Dispatch',
    title: 'Creation Chronicles',
    description: 'Weekly stories, prompts, and strategy notes straight from the FrankX studio.',
    href: '/creation-chronicles',
    cta: 'Subscribe free'
  },
  {
    eyebrow: 'Program',
    title: 'Creator Lab OS Cohort',
    description: 'Work with FrankX agents to map your rituals, automations, and growth dashboard.',
    href: '/products/agentic-creator-os',
    cta: 'Apply for the lab'
  }
]

export const agentProtocols: AgentProtocol[] = [
  {
    title: 'Creator OS Ritual Mesh',
    description: 'Blueprint your weekly and monthly loops before you automate them.',
    focus: 'Map ideation, batching, publishing, and review cadences into one dashboard.',
    icon: Workflow,
    link: { href: '/products/agentic-creator-os', label: 'Start Creator Lab OS' },
    bullets: [
      'Ritual templates for planning, making, and shipping',
      'Automation triggers with guardrails and fallback paths',
      'Analytics hooks that surface the next high-leverage move'
    ]
  },
  {
    title: 'Vibe Session Engine',
    description: 'Turn emotions into Suno prompts, stems, and release-ready packs.',
    focus: 'Pair session design with publishing checklists and monetisation routes.',
    icon: Music,
    link: { href: '/products/vibe-os', label: 'Explore Vibe OS' },
    bullets: [
      'Prompt recipes tuned to genre, mood, and intent',
      'Launch timelines with content + promo beats',
      'Rights and distribution notes for each drop'
    ]
  },
  {
    title: 'Story Launch Arc',
    description: 'Design narratives, funnels, and community rituals around every offer.',
    focus: 'Translate Creation Chronicle insights into campaigns that feel human.',
    icon: BookOpen,
    link: { href: '/creation-chronicles', label: 'Read the Chronicles' },
    bullets: [
      'Story scaffolds for essays, videos, and live sessions',
      'Email + social sequences with clear CTAs',
      'Community prompts that turn readers into collaborators'
    ]
  },
  {
    title: 'Analytics Pulse',
    description: 'Keep eyes on the signals that prove your system is working.',
    focus: 'Tie creator_funnel_step events to dashboards for fast iteration.',
    icon: BarChart4,
    link: { href: '/products/agentic-creator-os', label: 'See measurement stack' },
    bullets: [
      'Pre-built dashboards for content, revenue, and community',
      'Tagging plan for creator_funnel_step, music_session_play, and realm_waitlist_joined',
      'Weekly review ritual to decide the next experiment'
    ]
  }
]

export const testimonials = [
  {
    quote: 'Creator Lab OS gave me a weekly release ritual and the analytics to prove what was resonating.',
    name: 'Zoe Carter',
    role: 'Artist & Creator Coach'
  },
  {
    quote: 'Vibe OS helped our duo produce a monthly drop without losing the soul of the performance.',
    name: 'David Lin',
    role: 'Producer, Frequency Club'
  },
  {
    quote: 'Creation Chronicles keeps my community fed with stories, prompts, and experiments the moment they launch.',
    name: 'Amina Reyes',
    role: 'Writer & Community Architect'
  }
]

export const testimonialIcon = CheckCircle2

export const heroSubtext = [
  'Build a creator operating system with rituals, automations, and music that keep your work flowing.',
  'FrankX.AI is the studio where AI co-produces with you?Creation Chronicles, Vibe OS, and Creator Lab in one orbit.'
]

export const heroCta = {
  primary: { label: 'Download Creative AI Toolkit', href: '/products/creative-ai-toolkit' },
  secondary: { label: 'Explore Creator Lab OS', href: '/products/agentic-creator-os' },
  tertiary: { label: 'Join Inner Circle Waitlist', href: 'https://frankx.ck.page/realm' }
};

export const heroSupportLink = {
  label: 'Meet the FrankX.AI Team',
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


















