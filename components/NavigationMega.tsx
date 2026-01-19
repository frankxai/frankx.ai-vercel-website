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
  Layers,
  ArrowRight,
  ExternalLink,
  Wand2,
  Star,
  Heart,
  Network,
  Microscope,
  Building,
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
      title: 'AI Architect Academy',
      description: 'Master enterprise AI patterns, Claude Code skills, and production architectures.',
      href: '/ai-architect-academy',
      badge: 'New',
    },
    items: [
      { name: 'AI Architect Academy', href: '/ai-architect-academy', icon: Building, description: '80+ skills, 20+ patterns' },
      { name: 'Developer Hub', href: '/developers', icon: Code2, description: 'Ship 10x faster with AI' },
      { name: 'Architecture Prototypes', href: '/prototypes', icon: Layers, description: 'Production blueprints' },
      { name: 'Claude Code Mastery', href: '/prompt-library/agent-development', icon: Terminal, description: 'Prompts & patterns' },
      { name: 'AI Patterns', href: '/ai-architect', icon: Workflow, description: 'Enterprise design patterns' },
      { name: 'Coding Prompts', href: '/prompt-library/coding', icon: Bot, description: 'Automation workflows' },
    ],
  },
  resources: {
    label: 'Resources',
    featured: {
      title: 'Resource Hub',
      description: 'Products, Arcanea, and learning paths to build your creative future.',
      href: '/resources',
      badge: 'Explore',
    },
    items: [
      { name: 'Resource Hub', href: '/resources', icon: Sparkles, description: 'All systems, guides, and tools' },
      { name: 'The Golden Age of Creators', href: '/golden-age', icon: BookOpen, description: 'Book on creative transformation' },
      { name: "The Creator's Soulbook", href: '/soulbook', icon: BookOpen, description: 'Your life transformation system' },
      { name: 'Free Playbooks', href: '/free-playbook', icon: FileText, description: 'Start with quick wins' },
      { name: 'Prompt Library', href: '/prompt-library', icon: BookOpen, description: 'Curated prompt stacks' },
      { name: 'Research Hub', href: '/research', icon: Microscope, description: 'Daily intelligence operations' },
      { name: 'Intelligence Atlas', href: '/intelligence-atlas', icon: Star, description: 'Flagship research' },
      { name: 'AI Architect', href: '/ai-architect', icon: Network, description: 'Solution design & patterns' },
      { name: 'Vibe OS', href: '/products/vibe-os', icon: Music, description: 'AI music system' },
      { name: 'Agentic Creator OS', href: '/products/agentic-creator-os', icon: Bot, description: 'Agent workflows' },
      { name: 'Arcanea', href: '/magic', icon: Wand2, description: 'Worldbuilding academy' },
      { name: 'The Luminors', href: 'https://arcanea.app', icon: Heart, description: 'AI companions', external: true },
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
    <div className="grid w-[600px] gap-4 p-4 md:grid-cols-[200px_1fr]">
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
                  className="group flex items-start gap-3 rounded-lg p-2.5 transition-colors hover:bg-white/5"
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
    <NavigationMenu.Trigger className="group flex items-center gap-1 rounded-md px-2.5 py-1.5 text-[13px] font-semibold text-slate-300 outline-none transition-all hover:bg-white/5 hover:text-white focus-visible:ring-2 focus-visible:ring-emerald-400/50 data-[state=open]:bg-white/5 data-[state=open]:text-white">
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
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  // Close mobile menu on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOpen(false)
  }, [pathname])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Intelligent scroll behavior: hide on scroll down, show on scroll up
  useEffect(() => {
    let lastScrollY = window.scrollY
    let ticking = false

    const updateScrollState = () => {
      const scrollY = window.scrollY

      // Detect if we've scrolled past threshold
      setIsScrolled(scrollY > 20)

      // Show/hide logic: only hide if menus are closed and scrolled past threshold
      if (!menuOpen && !isOpen && scrollY > 80) {
        if (scrollY > lastScrollY) {
          // Scrolling DOWN - hide header
          setIsVisible(false)
        } else if (scrollY < lastScrollY) {
          // Scrolling UP - show header
          setIsVisible(true)
        }
      } else {
        // At top or menu open - always show
        setIsVisible(true)
      }

      lastScrollY = scrollY
      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollState)
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [menuOpen, isOpen])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <header
      className={cn(
        'fixed top-0 z-50 w-full border-b transition-all duration-300 ease-in-out',
        // Visibility and transform
        isVisible ? 'translate-y-0' : '-translate-y-full',
        // Background and border intensity based on scroll
        isScrolled
          ? 'border-white/10 bg-[#030712]/95 backdrop-blur-xl shadow-lg shadow-black/10'
          : 'border-white/5 bg-[#030712]/90 backdrop-blur-xl'
      )}
    >
      <nav className="mx-auto flex h-14 sm:h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo />

        {/* Desktop Navigation */}
        <NavigationMenu.Root
          className="relative hidden lg:block"
          onValueChange={(value) => setMenuOpen(!!value)}
        >
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

            {/* Resources */}
            <NavigationMenu.Item>
              <NavTrigger>Resources</NavTrigger>
              <NavigationMenu.Content className="absolute left-0 top-0 data-[motion=from-end]:animate-enterFromRight data-[motion=from-start]:animate-enterFromLeft data-[motion=to-end]:animate-exitToRight data-[motion=to-start]:animate-exitToLeft">
                <MegaMenuContent section="resources" />
              </NavigationMenu.Content>
            </NavigationMenu.Item>

            {/* Simple links */}
            <NavigationMenu.Item>
              <Link
                href="/blog"
                className={cn(
                  'rounded-md px-2.5 py-1.5 text-[13px] font-semibold transition-all',
                  isActive('/blog')
                    ? 'text-white bg-white/5'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                )}
              >
                Blog
              </Link>
            </NavigationMenu.Item>

            <NavigationMenu.Item>
              <Link
                href="/about"
                className={cn(
                  'rounded-md px-2.5 py-1.5 text-[13px] font-semibold transition-all',
                  isActive('/about')
                    ? 'text-white bg-white/5'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
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
            className="rounded-2xl bg-gradient-to-r from-emerald-600 to-cyan-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:from-emerald-500 hover:to-cyan-500 hover:shadow-lg hover:shadow-emerald-500/20"
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
            className="border-t border-white/5 bg-[#030712]/98 backdrop-blur-xl lg:hidden overflow-y-auto max-h-[calc(100vh-3.5rem)] sm:max-h-[calc(100vh-4rem)]"
          >
            <div className="mx-auto max-w-6xl space-y-1 px-4 sm:px-6 py-3 sm:py-4">
              {/* Mobile dropdowns */}
              {(Object.keys(navigation) as Array<keyof typeof navigation>).map((section) => (
                <MobileSection key={section} section={section} onClose={() => setIsOpen(false)} />
              ))}

              {/* Simple links */}
              <Link
                href="/blog"
                onClick={() => setIsOpen(false)}
                className="block rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
              >
                Blog
              </Link>
              <Link
                href="/about"
                onClick={() => setIsOpen(false)}
                className="block rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
              >
                About
              </Link>

              {/* Mobile CTA */}
              <div className="pt-3 sm:pt-4 pb-2">
                <Link
                  href="/free-playbook"
                  onClick={() => setIsOpen(false)}
                  className="block w-full rounded-2xl bg-gradient-to-r from-emerald-600 to-cyan-600 py-2.5 sm:py-3 text-center text-sm font-semibold text-white"
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
        className="flex w-full items-center justify-between rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
      >
        {data.label}
        <ChevronDown className={cn('h-4 w-4 transition-transform duration-200', expanded && 'rotate-180')} />
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.15 }}
            className="overflow-hidden"
          >
            <div className="space-y-0.5 pb-2 pl-2 sm:pl-4">
              {data.items.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center gap-2.5 sm:gap-3 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm text-slate-400 transition-colors hover:bg-white/5 hover:text-white active:bg-white/10"
                  >
                    <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span className="truncate">{item.name}</span>
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
