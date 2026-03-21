import {
  Music,
  Code2,
  BookOpen,
  Sparkles,
  Zap,
  GraduationCap,
  Terminal,
  Podcast,
  Mail,
  Github,
  Dumbbell,
  Brain,
  Palette,
  Layers,
  ArrowUpRight,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

// ── Types ───────────────────────────────────────────────────────────────────

export type Audience = 'students' | 'creators' | 'devs'

export interface LinktreeLink {
  title: string
  subtitle: string
  href: string
  icon: LucideIcon
  image?: string
  gradient: string
  badge?: string
  external?: boolean
  audiences: Audience[]
}

export interface LinktreeSection {
  id: string
  label: string
  color: string
  links: LinktreeLink[]
}

// ── Audience metadata ───────────────────────────────────────────────────────

export const audienceMeta: Record<
  Audience,
  { title: string; subtitle: string; emoji: string; gradient: string }
> = {
  students: {
    title: 'Students & Learners',
    subtitle: 'Free resources, tutorials, and starter kits to accelerate your AI journey.',
    emoji: '',
    gradient: 'from-emerald-500 to-teal-500',
  },
  creators: {
    title: 'Creators & Artists',
    subtitle: 'Music production, content systems, and creative AI tools that ship.',
    emoji: '',
    gradient: 'from-violet-500 to-purple-500',
  },
  devs: {
    title: 'Developers & Architects',
    subtitle: 'Open-source agents, enterprise patterns, and agentic system design.',
    emoji: '',
    gradient: 'from-cyan-500 to-blue-500',
  },
}

// ── Featured hero link (changes per audience) ────────────────────────────────

export const heroLinks: Record<Audience | 'default', LinktreeLink> = {
  default: {
    title: 'Agentic Creator OS',
    subtitle: '75+ skills. 38 agents. One entry point. Open source.',
    href: '/acos',
    icon: Terminal,
    image: '/images/acos/acos-architecture.png',
    gradient: 'from-purple-600 via-violet-600 to-indigo-600',
    badge: 'Open Source',
    audiences: ['creators', 'devs', 'students'],
  },
  students: {
    title: 'Free AI Toolkit',
    subtitle: 'Prompts, workflows, and templates to start building with AI today.',
    href: '/products/creative-ai-toolkit',
    icon: GraduationCap,
    image: '/images/acos/acos-smart-router.png',
    gradient: 'from-emerald-600 via-teal-600 to-cyan-600',
    badge: 'Free',
    audiences: ['students'],
  },
  creators: {
    title: 'Music Lab',
    subtitle: '65+ AI tracks. Suno prompts. Production techniques that work.',
    href: '/music-lab',
    icon: Music,
    image: '/images/acos/creation-pipeline.png',
    gradient: 'from-violet-600 via-fuchsia-600 to-pink-600',
    badge: '65+ Tracks',
    audiences: ['creators'],
  },
  devs: {
    title: 'Agentic Creator OS',
    subtitle: 'Clone it. Type /acos. 75+ skills auto-activate. MIT licensed.',
    href: 'https://github.com/frankxai/agentic-creator-os',
    icon: Github,
    image: '/images/acos/acos-architecture.png',
    gradient: 'from-cyan-600 via-blue-600 to-indigo-600',
    badge: 'MIT License',
    external: true,
    audiences: ['devs'],
  },
}

// ── All links ───────────────────────────────────────────────────────────────

export const sections: LinktreeSection[] = [
  {
    id: 'products',
    label: 'Products & Tools',
    color: 'purple',
    links: [
      {
        title: 'Agentic Creator OS',
        subtitle: '75+ skills, 38 agents, 35+ commands for Claude Code',
        href: '/acos',
        icon: Terminal,
        image: '/images/acos/acos-architecture.png',
        gradient: 'from-purple-500/20 to-violet-500/20',
        badge: 'Open Source',
        audiences: ['creators', 'devs', 'students'],
      },
      {
        title: 'Music Lab',
        subtitle: '65+ AI-generated tracks across pop, electronic, orchestral',
        href: '/music-lab',
        icon: Music,
        image: '/images/acos/creation-pipeline.png',
        gradient: 'from-fuchsia-500/20 to-pink-500/20',
        badge: '65+ Tracks',
        audiences: ['creators', 'students'],
      },
      {
        title: 'Prompt Library',
        subtitle: '50+ proven templates for Suno, Claude, and creative AI',
        href: '/prompt-library',
        icon: Zap,
        gradient: 'from-amber-500/20 to-orange-500/20',
        audiences: ['creators', 'students', 'devs'],
      },
      {
        title: 'GenCreator Framework',
        subtitle: 'The complete creator business system — strategy to execution',
        href: '/gencreator',
        icon: Layers,
        image: '/images/acos/frankx-superintelligent-system.png',
        gradient: 'from-emerald-500/20 to-teal-500/20',
        audiences: ['creators'],
      },
    ],
  },
  {
    id: 'learn',
    label: 'Learn & Explore',
    color: 'cyan',
    links: [
      {
        title: 'State of AI 2026',
        subtitle: 'Visual briefing: models, agents, MCP, skills demand',
        href: '/students/ai-briefing',
        icon: Zap,
        image: '/images/acos/acos-smart-router.png',
        gradient: 'from-emerald-500/20 to-cyan-500/20',
        badge: 'New',
        audiences: ['students', 'devs'],
      },
      {
        title: 'Blog',
        subtitle: 'Technical deep-dives, AI architecture, creator workflows',
        href: '/blog',
        icon: BookOpen,
        gradient: 'from-cyan-500/20 to-blue-500/20',
        audiences: ['students', 'creators', 'devs'],
      },
      {
        title: 'AI Toolkit (Free)',
        subtitle: 'Starter prompts, workflows, and launch templates',
        href: '/products/creative-ai-toolkit',
        icon: Sparkles,
        gradient: 'from-emerald-500/20 to-green-500/20',
        badge: 'Free',
        audiences: ['students', 'creators'],
      },
      {
        title: 'AI Architect Portfolio',
        subtitle: 'Enterprise AI systems, agentic orchestration, Oracle Cloud',
        href: '/ai-architect',
        icon: Brain,
        gradient: 'from-indigo-500/20 to-blue-500/20',
        audiences: ['devs'],
      },
      {
        title: 'Research Hub',
        subtitle: '17+ research domains with validated sources and key findings',
        href: '/research',
        icon: Brain,
        gradient: 'from-teal-500/20 to-emerald-500/20',
        audiences: ['devs', 'students'],
      },
      {
        title: 'Creator Story',
        subtitle: 'How one person built an AI-powered creative empire',
        href: '/frankx',
        icon: Palette,
        gradient: 'from-rose-500/20 to-pink-500/20',
        audiences: ['students', 'creators'],
      },
    ],
  },
  {
    id: 'community',
    label: 'Connect',
    color: 'emerald',
    links: [
      {
        title: 'Newsletter',
        subtitle: 'Weekly AI insights, creator tools, behind the scenes',
        href: '/newsletter',
        icon: Mail,
        gradient: 'from-violet-500/20 to-purple-500/20',
        audiences: ['students', 'creators', 'devs'],
      },
      {
        title: 'GitHub',
        subtitle: 'Open-source projects, ACOS, tools and agents',
        href: 'https://github.com/frankxai',
        icon: Github,
        gradient: 'from-slate-500/20 to-zinc-500/20',
        external: true,
        audiences: ['devs', 'students'],
      },
      {
        title: 'Suno Profile',
        subtitle: '65+ published AI tracks — listen, remix, collaborate',
        href: 'https://suno.com/@frankx',
        icon: Music,
        gradient: 'from-orange-500/20 to-amber-500/20',
        external: true,
        audiences: ['creators'],
      },
      {
        title: 'YouTube',
        subtitle: 'AI architecture, music production, creator tools',
        href: 'https://youtube.com/@frankxai',
        icon: Podcast,
        gradient: 'from-red-500/20 to-rose-500/20',
        external: true,
        audiences: ['students', 'creators', 'devs'],
      },
    ],
  },
  {
    id: 'books',
    label: 'Books',
    color: 'amber',
    links: [
      {
        title: 'Love & Poetry',
        subtitle: 'Verses across time and tongue — Rumi, Goethe, multilingual',
        href: '/books/love-and-poetry',
        icon: BookOpen,
        gradient: 'from-rose-500/20 to-pink-500/20',
        audiences: ['students', 'creators'],
      },
      {
        title: 'Spartan Mindset',
        subtitle: 'The discipline of one more — Iron will, warrior philosophy',
        href: '/books/spartan-mindset',
        icon: BookOpen,
        gradient: 'from-amber-500/20 to-orange-500/20',
        audiences: ['students', 'creators'],
      },
      {
        title: 'The Golden Age of Creators',
        subtitle: 'How humans and machines create together',
        href: '/books/golden-age',
        icon: BookOpen,
        gradient: 'from-emerald-500/20 to-teal-500/20',
        audiences: ['creators', 'devs'],
      },
      {
        title: 'Hope — A Light in the Dark',
        subtitle: 'Poetry and prose for those carrying love and memory',
        href: '/books/hope',
        icon: BookOpen,
        gradient: 'from-cyan-500/20 to-blue-500/20',
        audiences: ['students', 'creators'],
      },
      {
        title: 'The Art of Self-Development',
        subtitle: 'Seven pillars of a complete life',
        href: '/books/self-development',
        icon: BookOpen,
        gradient: 'from-violet-500/20 to-purple-500/20',
        audiences: ['students', 'creators'],
      },
    ],
  },
  {
    id: 'fitness',
    label: 'Health & Performance',
    color: 'amber',
    links: [
      {
        title: 'Training Log',
        subtitle: 'Functional fitness, calisthenics, performance tracking',
        href: '/fitness',
        icon: Dumbbell,
        gradient: 'from-amber-500/20 to-yellow-500/20',
        audiences: ['students', 'creators'],
      },
    ],
  },
]

// ── Helpers ──────────────────────────────────────────────────────────────────

export function getLinksForAudience(audience?: Audience): LinktreeSection[] {
  if (!audience) return sections

  return sections
    .map((section) => ({
      ...section,
      links: section.links.filter((link) => link.audiences.includes(audience)),
    }))
    .filter((section) => section.links.length > 0)
}
