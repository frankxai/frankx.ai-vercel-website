'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu,
  X,
  ChevronDown,
  Music,
  Sparkles,
  Palette,
  FileText,
  BookOpen,
  Users,
  GraduationCap,
  Target,
  Code2,
  Terminal,
  Workflow,
  Bot,
  Package,
  Zap,
  Layers,
  ArrowRight,
  ExternalLink,
} from 'lucide-react'

import { cn } from '@/lib/utils'

// Navigation structure
const navigation = {
  music: {
    label: 'Music',
    featured: {
      title: 'AI Music Portfolio',
      description: '10,000+ songs created with Suno AI. Explore the catalog.',
      href: '/music',
      badge: '500+ Public',
    },
    items: [
      { name: 'Music Showcase', href: '/music', icon: Music, description: '10K+ AI-generated tracks' },
      { name: 'Vibe OS System', href: '/products/vibe-os', icon: Sparkles, description: 'AI music creation method' },
      { name: 'Music Lab', href: '/music-lab', icon: Palette, description: 'Learn to create AI music' },
      { name: 'Suno Profile', href: 'https://suno.com/@frankx', icon: Layers, description: 'Full catalog on Suno', external: true },
    ],
  },
  creators: {
    label: 'Creators',
    featured: {
      title: 'Creator Toolkit',
      description: 'AI-powered tools for content creators and artists.',
      href: '/products/creative-ai-toolkit',
      badge: 'Popular',
    },
    items: [
      { name: 'Prompt Library', href: '/prompt-library', icon: Sparkles, description: '200+ curated prompts' },
      { name: 'Templates', href: '/templates', icon: FileText, description: 'Ready-to-use workflows' },
      { name: 'Creation Chronicles', href: '/creation-chronicles', icon: BookOpen, description: 'Behind the scenes' },
    ],
  },
  students: {
    label: 'Students',
    featured: {
      title: 'Student Hub',
      description: 'AI-powered learning paths for creative professionals.',
      href: '/students',
      badge: 'Free Resources',
    },
    items: [
      { name: 'All Guides', href: '/guides', icon: BookOpen, description: 'In-depth tutorials' },
      { name: 'Courses', href: '/courses', icon: GraduationCap, description: 'Structured learning' },
      { name: 'Student Hub', href: '/students', icon: Users, description: 'Your learning dashboard' },
      { name: 'AI Assessment', href: '/ai-assessment', icon: Target, description: 'Find your path' },
    ],
  },
  developers: {
    label: 'Developers',
    featured: {
      title: 'Agentic Creator OS',
      description: 'Master Claude Code, MCP servers, and autonomous agents.',
      href: '/products/agentic-creator-os',
      badge: 'New',
    },
    items: [
      { name: 'Developer Hub', href: '/developers', icon: Code2, description: 'Ship 10x faster with AI' },
      { name: 'Claude Code Mastery', href: '/prompt-library/agent-development', icon: Terminal, description: 'Prompts & patterns' },
      { name: 'Agentic Patterns', href: '/prompt-library/ai-architecture', icon: Workflow, description: 'MCP & multi-agent' },
      { name: 'Coding Prompts', href: '/prompt-library/coding', icon: Bot, description: 'Automation workflows' },
    ],
  },
  products: {
    label: 'Products',
    featured: {
      title: 'All Products',
      description: 'AI systems for creators, students, and developers.',
      href: '/products',
      badge: 'View All',
    },
    items: [
      { name: 'Vibe OS', href: '/products/vibe-os', icon: Music, description: 'AI music creation' },
      { name: 'Creative AI Toolkit', href: '/products/creative-ai-toolkit', icon: Sparkles, description: 'Content workflows' },
      { name: 'Generative Creator OS', href: '/products/generative-creator-os', icon: Layers, description: 'Full creator system' },
      { name: 'Agentic Creator OS', href: '/products/agentic-creator-os', icon: Bot, description: 'For developers' },
    ],
  },
}

// Logo component - clean gradient wordmark
function Logo() {
  return (
    <Link
      href="/"
      className="rounded-lg px-2 py-1.5 transition-all duration-300 hover:bg-white/5"
      aria-label="FrankX.AI - Home"
    >
      <span className="font-display text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
        FrankX.AI
      </span>
    </Link>
  )
}

// Mega menu content component
function MegaMenuContent({ section }: { section: keyof typeof navigation }) {
  const data = navigation[section]

  return (
    <div className="grid w-[600px] gap-4 p-5 md:grid-cols-[200px_1fr]">
      {/* Featured card */}
      <Link
        href={data.featured.href}
        className="group relative flex flex-col justify-end overflow-hidden rounded-xl bg-gradient-to-b from-slate-800/50 to-slate-900/80 p-5 transition-all hover:from-slate-800/70 hover:to-slate-900"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-violet-500/10 opacity-0 transition-opacity group-hover:opacity-100" />
        <span className="mb-2 inline-block w-fit rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/70">
          {data.featured.badge}
        </span>
        <h4 className="text-base font-semibold text-white">{data.featured.title}</h4>
        <p className="mt-1 text-xs leading-relaxed text-slate-400">
          {data.featured.description}
        </p>
        <ArrowRight className="mt-3 h-4 w-4 text-white/50 transition-transform group-hover:translate-x-1 group-hover:text-white" />
      </Link>

      {/* Links grid */}
      <ul className="grid grid-cols-1 gap-1">
        {data.items.map((item) => {
          const Icon = item.icon
          const isExternal = 'external' in item && item.external
          const LinkComponent = isExternal ? 'a' : Link
          const linkProps = isExternal
            ? { href: item.href, target: '_blank', rel: 'noopener noreferrer' }
            : { href: item.href }

          return (
            <li key={item.name}>
              <NavigationMenu.Link asChild>
                <LinkComponent
                  {...linkProps}
                  className="group flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-white/5"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-slate-400 transition-colors group-hover:bg-white/10 group-hover:text-white">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <span className="flex items-center gap-1.5 text-sm font-medium text-white">
                      {item.name}
                      {isExternal && <ExternalLink className="h-3 w-3 text-slate-500" />}
                    </span>
                    <p className="text-xs text-slate-500">{item.description}</p>
                  </div>
                </LinkComponent>
              </NavigationMenu.Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

// Trigger button component
function NavTrigger({ children }: { children: React.ReactNode }) {
  return (
    <NavigationMenu.Trigger className="group flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-slate-400 outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-emerald-400/50 data-[state=open]:text-white">
      {children}
      <ChevronDown
        className="h-3.5 w-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180"
        aria-hidden
      />
    </NavigationMenu.Trigger>
  )
}

export default function NavigationMega() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-[#030712]/90 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Logo />

        {/* Desktop Navigation */}
        <NavigationMenu.Root className="relative hidden lg:block">
          <NavigationMenu.List className="flex items-center gap-1">
            {/* Music - Lead with the portfolio */}
            <NavigationMenu.Item>
              <NavTrigger>Music</NavTrigger>
              <NavigationMenu.Content className="absolute left-0 top-0 data-[motion=from-end]:animate-enterFromRight data-[motion=from-start]:animate-enterFromLeft data-[motion=to-end]:animate-exitToRight data-[motion=to-start]:animate-exitToLeft">
                <MegaMenuContent section="music" />
              </NavigationMenu.Content>
            </NavigationMenu.Item>

            {/* Creators */}
            <NavigationMenu.Item>
              <NavTrigger>Creators</NavTrigger>
              <NavigationMenu.Content className="absolute left-0 top-0 data-[motion=from-end]:animate-enterFromRight data-[motion=from-start]:animate-enterFromLeft data-[motion=to-end]:animate-exitToRight data-[motion=to-start]:animate-exitToLeft">
                <MegaMenuContent section="creators" />
              </NavigationMenu.Content>
            </NavigationMenu.Item>

            {/* Students */}
            <NavigationMenu.Item>
              <NavTrigger>Students</NavTrigger>
              <NavigationMenu.Content className="absolute left-0 top-0 data-[motion=from-end]:animate-enterFromRight data-[motion=from-start]:animate-enterFromLeft data-[motion=to-end]:animate-exitToRight data-[motion=to-start]:animate-exitToLeft">
                <MegaMenuContent section="students" />
              </NavigationMenu.Content>
            </NavigationMenu.Item>

            {/* Developers */}
            <NavigationMenu.Item>
              <NavTrigger>Developers</NavTrigger>
              <NavigationMenu.Content className="absolute left-0 top-0 data-[motion=from-end]:animate-enterFromRight data-[motion=from-start]:animate-enterFromLeft data-[motion=to-end]:animate-exitToRight data-[motion=to-start]:animate-exitToLeft">
                <MegaMenuContent section="developers" />
              </NavigationMenu.Content>
            </NavigationMenu.Item>

            {/* Products */}
            <NavigationMenu.Item>
              <NavTrigger>Products</NavTrigger>
              <NavigationMenu.Content className="absolute left-0 top-0 data-[motion=from-end]:animate-enterFromRight data-[motion=from-start]:animate-enterFromLeft data-[motion=to-end]:animate-exitToRight data-[motion=to-start]:animate-exitToLeft">
                <MegaMenuContent section="products" />
              </NavigationMenu.Content>
            </NavigationMenu.Item>

            {/* Simple links */}
            <NavigationMenu.Item>
              <Link
                href="/blog"
                className={cn(
                  'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive('/blog') ? 'text-white' : 'text-slate-400 hover:text-white'
                )}
              >
                Blog
              </Link>
            </NavigationMenu.Item>

            <NavigationMenu.Item>
              <Link
                href="/about"
                className={cn(
                  'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive('/about') ? 'text-white' : 'text-slate-400 hover:text-white'
                )}
              >
                About
              </Link>
            </NavigationMenu.Item>

            <NavigationMenu.Indicator className="top-full z-10 flex h-2 items-end justify-center overflow-hidden transition-[width,transform_250ms_ease] data-[state=hidden]:animate-fadeOut data-[state=visible]:animate-fadeIn">
              <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-slate-800 shadow-lg" />
            </NavigationMenu.Indicator>
          </NavigationMenu.List>

          <div className="perspective-[2000px] absolute left-0 top-full flex w-full justify-center">
            <NavigationMenu.Viewport className="relative mt-2 h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-xl border border-white/10 bg-[#0a0a12]/95 shadow-2xl shadow-black/50 backdrop-blur-xl transition-[width,height] duration-300 data-[state=closed]:animate-scaleOut data-[state=open]:animate-scaleIn sm:w-[var(--radix-navigation-menu-viewport-width)]" />
          </div>
        </NavigationMenu.Root>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/free-playbook"
            className="rounded-lg bg-gradient-to-r from-emerald-600 to-cyan-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:from-emerald-500 hover:to-cyan-500 hover:shadow-lg hover:shadow-emerald-500/20"
          >
            Free Playbooks
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-white/5 hover:text-white lg:hidden"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-white/5 bg-[#030712]/98 backdrop-blur-xl lg:hidden"
          >
            <div className="mx-auto max-w-6xl space-y-1 px-6 py-4">
              {/* Mobile dropdowns */}
              {(Object.keys(navigation) as Array<keyof typeof navigation>).map((section) => (
                <MobileSection key={section} section={section} onClose={() => setIsOpen(false)} />
              ))}

              {/* Simple links */}
              <Link
                href="/blog"
                onClick={() => setIsOpen(false)}
                className="block rounded-lg px-4 py-3 text-base font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
              >
                Blog
              </Link>
              <Link
                href="/about"
                onClick={() => setIsOpen(false)}
                className="block rounded-lg px-4 py-3 text-base font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
              >
                About
              </Link>

              {/* Mobile CTA */}
              <div className="pt-4">
                <Link
                  href="/free-playbook"
                  onClick={() => setIsOpen(false)}
                  className="block w-full rounded-lg bg-gradient-to-r from-emerald-600 to-cyan-600 py-3 text-center text-sm font-semibold text-white"
                >
                  Get Free Playbooks
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

// Mobile section accordion
function MobileSection({ section, onClose }: { section: keyof typeof navigation; onClose: () => void }) {
  const [expanded, setExpanded] = useState(false)
  const data = navigation[section]

  return (
    <div>
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-base font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
      >
        {data.label}
        <ChevronDown className={cn('h-4 w-4 transition-transform', expanded && 'rotate-180')} />
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="space-y-1 pb-2 pl-4">
              {data.items.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    <Icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
