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
    title: 'Students & learners',
    subtitle: 'Tutorials, learning paths, and starter resources for building with AI.',
    emoji: '',
    gradient: 'from-emerald-500 to-teal-500',
  },
  creators: {
    title: 'Creators & artists',
    subtitle: 'Music, content systems, and creative AI tools to explore.',
    emoji: '',
    gradient: 'from-violet-500 to-purple-500',
  },
  devs: {
    title: 'Developers & architects',
    subtitle: 'Open-source agents, enterprise patterns, and agentic system design.',
    emoji: '',
    gradient: 'from-cyan-500 to-blue-500',
  },
}

// ── Featured hero link (changes per audience) ────────────────────────────────

export const heroLinks: Record<Audience | 'default', LinktreeLink> = {
  default: {
    title: 'Agentic Creator OS',
    subtitle: 'Open-source agent orchestration, skills, and installation notes.',
    href: '/acos',
    icon: Terminal,
    image: '/images/acos/acos-architecture.png',
    gradient: 'from-purple-600 via-violet-600 to-indigo-600',
    badge: 'Open source',
    audiences: ['creators', 'devs', 'students'],
  },
  students: {
    title: 'Creative AI Toolkit',
    subtitle: 'Browse prompts, workflow automations, playbooks, and implementation roadmaps.',
    href: '/products/creative-ai-toolkit',
    icon: GraduationCap,
    image: '/images/acos/acos-smart-router.png',
    gradient: 'from-emerald-600 via-teal-600 to-cyan-600',
    badge: 'Toolkit',
    audiences: ['students'],
  },
  creators: {
    title: 'Music Lab',
    subtitle: 'Play browser instruments and follow guided notes.',
    href: '/music-lab',
    icon: Music,
    image: '/images/acos/creation-pipeline.png',
    gradient: 'from-violet-600 via-fuchsia-600 to-pink-600',
    badge: 'Interactive tools',
    audiences: ['creators'],
  },
  devs: {
    title: 'Agentic Creator OS',
    subtitle: 'Browse the public repository and its installation notes.',
    href: 'https://github.com/frankxai/agentic-creator-os',
    icon: Github,
    image: '/images/acos/acos-architecture.png',
    gradient: 'from-cyan-600 via-blue-600 to-indigo-600',
    badge: 'GitHub',
    external: true,
    audiences: ['devs'],
  },
}

// ── All links ───────────────────────────────────────────────────────────────

export const sections: LinktreeSection[] = [
  {
    id: 'products',
    label: 'Products & tools',
    color: 'purple',
    links: [
      {
        title: 'Agentic Creator OS',
        subtitle: 'Agent orchestration, skills, and installation notes for Claude Code',
        href: '/acos',
        icon: Terminal,
        image: '/images/acos/acos-architecture.png',
        gradient: 'from-purple-500/20 to-violet-500/20',
        badge: 'Open source',
        audiences: ['creators', 'devs', 'students'],
      },
      {
        title: 'Music Lab',
        subtitle: 'Browser instruments, guided notes, and rhythm tools',
        href: '/music-lab',
        icon: Music,
        image: '/images/acos/creation-pipeline.png',
        gradient: 'from-fuchsia-500/20 to-pink-500/20',
        badge: 'Interactive tools',
        audiences: ['creators', 'students'],
      },
      {
        title: 'Prompt Library',
        subtitle: 'Search attributed patterns from the public prompt corpus',
        href: '/prompt-library',
        icon: Zap,
        gradient: 'from-amber-500/20 to-orange-500/20',
        audiences: ['creators', 'students', 'devs'],
      },
      {
        title: 'GenCreator Framework',
        subtitle: 'A creator business framework from strategy through execution',
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
    label: 'Learn & explore',
    color: 'cyan',
    links: [
      {
        title: 'Blog',
        subtitle: 'Technical articles on AI architecture and creator workflows',
        href: '/blog',
        icon: BookOpen,
        gradient: 'from-cyan-500/20 to-blue-500/20',
        audiences: ['students', 'creators', 'devs'],
      },
      {
        title: 'Creative AI Toolkit',
        subtitle: 'Starter prompts, workflows, and launch templates',
        href: '/products/creative-ai-toolkit',
        icon: Sparkles,
        gradient: 'from-emerald-500/20 to-green-500/20',
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
        title: 'Creator Story',
        subtitle: "Frank's background across AI architecture, music, and creative systems",
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
        subtitle: 'Field notes on AI architecture, creator tools, and studio work',
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
        subtitle: "Listen to Frank's public Suno catalog",
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
    id: 'fitness',
    label: 'Health & performance',
    color: 'amber',
    links: [
      {
        title: 'Training Log',
        subtitle: 'Functional fitness, calisthenics, performance tracking',
        href: '/peak-performance',
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
