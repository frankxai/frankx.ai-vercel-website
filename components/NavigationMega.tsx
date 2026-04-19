'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
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
  TrendingUp,
  Wrench,
  Download,
  Compass,
  Gamepad2,
  Puzzle,
  Brain,
  Play,
  Zap,
} from 'lucide-react'

import { cn } from '@/lib/utils'

// ── 4-Pillar Navigation ──
// Steve Jobs rule: say no to a thousand things.
// 9 dropdowns → 4 pillars + 2 direct links.

const pillars = {
  gencreator: {
    label: 'GenCreator',
    featured: {
      title: 'The GenCreator Framework',
      description: 'Principles, handbook, blueprints, and soul — the complete creator OS.',
      href: '/gencreator',
      badge: 'Framework',
    },
    groups: [
      {
        label: 'Framework',
        items: [
          { name: 'GenCreator Hub', href: '/gencreator', icon: Sparkles, description: 'The complete framework' },
          { name: '12 Principles', href: '/gencreator/principles', icon: Compass, description: 'Foundation philosophy' },
          { name: "Creator's Handbook", href: '/gencreator/handbook', icon: BookOpen, description: '8 chapters, full playbook' },
          { name: "Creator's Blueprints", href: '/gencreator/blueprints', icon: Layers, description: '12 actionable frameworks' },
          { name: 'GenCreator Soul', href: '/gencreator/soul', icon: Heart, description: 'Build your soul.md' },
          { name: 'The Manifesto', href: '/gencreator/manifesto', icon: FileText, description: 'Read the declaration' },
        ],
      },
      {
        label: 'Create',
        items: [
          { name: 'Prompt Library', href: '/prompt-library', icon: Sparkles, description: '200+ curated prompts' },
          { name: 'Templates', href: '/templates', icon: FileText, description: 'Ready-to-use workflows' },
          { name: 'Creation Chronicles', href: '/creation-chronicles', icon: BookOpen, description: 'Behind the scenes' },
          { name: 'Full Presence', href: '/presence', icon: Brain, description: 'Arrive before you create' },
        ],
      },
    ],
  },
  learn: {
    label: 'Learn',
    featured: {
      title: 'Learn AI — Your Way',
      description: 'Courses, workshops, assessments, and a curated video vault.',
      href: '/students',
      badge: 'Free Resources',
    },
    groups: [
      {
        label: 'Start Here',
        items: [
          { name: 'Student Hub', href: '/students', icon: Users, description: 'Your learning dashboard' },
          { name: 'AI Assessment', href: '/assess', icon: Target, description: 'Test your AI readiness' },
          { name: 'AI Briefing', href: '/students/ai-briefing', icon: Zap, description: 'AI in 2026 session' },
          { name: 'Free Playbooks', href: '/free-playbook', icon: FileText, description: 'Start with quick wins' },
        ],
      },
      {
        label: 'Go Deeper',
        items: [
          { name: 'Courses', href: '/courses', icon: BookOpen, description: 'Structured learning paths' },
          { name: 'AI Workshops', href: '/workshops', icon: GraduationCap, description: 'Pre-built workshop templates' },
          { name: 'Video Vault', href: '/watch', icon: Play, description: '130+ curated AI videos' },
          { name: 'Research Hub', href: '/research', icon: Microscope, description: 'Daily intelligence' },
        ],
      },
      {
        label: 'Read',
        items: [
          { name: 'The Golden Age of Creators', href: '/golden-age', icon: Star, description: 'Book on creative transformation' },
          { name: "The Creator's Soulbook", href: '/soulbook', icon: Heart, description: 'Your life transformation system' },
          { name: 'Intelligence Atlas', href: '/intelligence-atlas', icon: Compass, description: 'Flagship research' },
          { name: 'Downloads', href: '/downloads', icon: Download, description: 'PDFs & free resources' },
        ],
      },
    ],
  },
  build: {
    label: 'Build',
    featured: {
      title: 'AI Architecture Hub',
      description: 'Blueprints, BYOK prototypes, and production templates for builders.',
      href: '/ai-architecture',
      badge: 'New Hub',
    },
    groups: [
      {
        label: 'Architecture',
        items: [
          { name: 'Architecture Hub', href: '/ai-architecture', icon: Network, description: 'Central hub for AI architecture' },
          { name: 'AI Architect', href: '/ai-architect', icon: Building, description: 'Solution design & patterns' },
          { name: 'Blueprints', href: '/ai-architecture/blueprints', icon: Layers, description: 'Diagrams & guides (FREE)' },
          { name: 'AI World Showcase', href: '/ai-world', icon: Workflow, description: 'Oracle AI demo architectures' },
        ],
      },
      {
        label: 'Ship',
        items: [
          { name: 'Prototypes (BYOK)', href: '/ai-architecture/prototypes', icon: Terminal, description: 'Try with your API keys' },
          { name: 'Templates', href: '/ai-architecture/templates', icon: Code2, description: 'Starter kits ($29-199)' },
          { name: 'Developer Hub', href: '/developers', icon: Bot, description: 'Build faster with AI workflows' },
          { name: 'Tools', href: '/ai-architecture/tools', icon: Wrench, description: 'Curated resources' },
        ],
      },
    ],
  },
  explore: {
    label: 'Explore',
    featured: {
      title: 'AI Music Portfolio',
      description: '12,000+ songs created with Suno AI. Explore the catalog.',
      href: '/music',
      badge: '500+ Public',
    },
    groups: [
      {
        label: 'Music',
        items: [
          { name: 'Music Showcase', href: '/music', icon: Music, description: '500+ AI-generated tracks' },
          { name: 'Create with AI', href: '/music/create', icon: Sparkles, description: 'Suno mastery & prompts' },
          { name: 'Music Academy', href: '/music/learn', icon: Palette, description: 'Piano, violin, theory & more' },
        ],
      },
      {
        label: 'Play & Discover',
        items: [
          { name: 'Games Lab', href: '/games', icon: Gamepad2, description: 'Browser games built with AI' },
          { name: 'Arcanea World', href: '/arcanea', icon: Wand2, description: 'Creative civilization system' },
          { name: 'Vibe OS', href: '/vibe', icon: Sparkles, description: 'AI agent ecosystem' },
          { name: 'ArcaneaVault', href: '/vault', icon: Layers, description: 'Visual asset library' },
        ],
      },
      {
        label: 'Invest & Connect',
        items: [
          { name: 'Intelligence Hub', href: '/investor', icon: TrendingUp, description: 'AI-powered investing tools' },
          { name: 'About', href: '/about', icon: Users, description: 'Story, mission & team' },
          { name: 'Contact', href: '/contact', icon: Compass, description: 'Get in touch' },
          { name: 'The Luminors', href: 'https://arcanea.app', icon: Heart, description: 'AI companions', external: true },
        ],
      },
    ],
  },
}

type PillarKey = keyof typeof pillars
type NavItem = { name: string; href: string; icon: any; description: string; external?: boolean }

// ── Logo ──
function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition-all duration-300 hover:bg-white/5"
      aria-label="FrankX.AI - Home"
    >
      <Image
        src="/images/mascot/axi-v3-icon.png"
        alt="Axi"
        width={28}
        height={28}
        className="rounded-md"
        priority
      />
      <span className="font-display text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
        FrankX.AI
      </span>
    </Link>
  )
}

// ── Menu link ──
function MenuLink({ item }: { item: NavItem }) {
  const Icon = item.icon
  const isExternal = item.external
  const LinkComponent = isExternal ? 'a' : Link
  const linkProps = isExternal
    ? { href: item.href, target: '_blank', rel: 'noopener noreferrer' }
    : { href: item.href }

  return (
    <li>
      <NavigationMenu.Link asChild>
        <LinkComponent
          {...linkProps}
          className="group flex items-start gap-3 rounded-lg p-2.5 transition-colors hover:bg-white/[0.06]"
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] text-slate-400 ring-1 ring-white/[0.06] transition-all group-hover:bg-white/[0.08] group-hover:text-white group-hover:ring-white/[0.12]">
            <Icon className="h-3.5 w-3.5" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="flex items-center gap-1.5 text-[13px] font-medium text-slate-200 group-hover:text-white">
              {item.name}
              {isExternal && <ExternalLink className="h-3 w-3 text-slate-500" />}
            </span>
            <p className="mt-0.5 text-[11px] leading-tight text-slate-500 group-hover:text-slate-400">{item.description}</p>
          </div>
        </LinkComponent>
      </NavigationMenu.Link>
    </li>
  )
}

// ── Featured card ──
function FeaturedCard({ data }: { data: typeof pillars[PillarKey] }) {
  return (
    <Link
      href={data.featured.href}
      className="group relative flex h-full flex-col justify-end overflow-hidden rounded-xl bg-gradient-to-b from-slate-800/60 to-slate-900/90 p-5 ring-1 ring-white/[0.06] transition-all hover:ring-white/[0.12]"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/8 via-cyan-500/8 to-violet-500/8 opacity-0 transition-opacity group-hover:opacity-100" />
      <span className="mb-3 inline-block w-fit rounded-full bg-white/[0.08] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/60">
        {data.featured.badge}
      </span>
      <h4 className="text-[15px] font-semibold text-white">{data.featured.title}</h4>
      <p className="mt-1.5 text-xs leading-relaxed text-slate-400">
        {data.featured.description}
      </p>
      <ArrowRight className="mt-4 h-4 w-4 text-white/40 transition-transform group-hover:translate-x-1 group-hover:text-white" />
    </Link>
  )
}

// ── Mega menu content — always multi-column grouped ──
function MegaMenuContent({ section }: { section: PillarKey }) {
  const data = pillars[section]
  const groupCount = data.groups.length

  return (
    <div className="w-[720px] p-5">
      <div className={cn(
        'grid gap-5',
        groupCount === 2 ? 'grid-cols-[200px_1fr]' : 'grid-cols-[200px_1fr]'
      )}>
        <FeaturedCard data={data} />
        <div className={cn(
          'grid gap-4',
          groupCount >= 3 ? 'grid-cols-3' : 'grid-cols-2'
        )}>
          {data.groups.map((group) => (
            <div key={group.label}>
              <h5 className="mb-2.5 px-2.5 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">
                {group.label}
              </h5>
              <ul className="space-y-0.5">
                {group.items.map((item) => (
                  <MenuLink key={item.name} item={item} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Trigger ──
function NavTrigger({ children }: { children: React.ReactNode }) {
  return (
    <NavigationMenu.Trigger className="group flex items-center gap-1 rounded-lg px-3 py-2 text-[13px] font-semibold text-slate-300 outline-none transition-all hover:bg-white/[0.05] hover:text-white focus-visible:ring-2 focus-visible:ring-white/20 data-[state=open]:bg-white/[0.05] data-[state=open]:text-white">
      {children}
      <ChevronDown
        className="h-3 w-3 text-slate-500 transition-transform duration-200 group-data-[state=open]:rotate-180"
        aria-hidden
      />
    </NavigationMenu.Trigger>
  )
}

// ── Main Nav ──
export default function NavigationMega() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

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

  useEffect(() => {
    let lastScrollY = window.scrollY
    let ticking = false

    const updateScrollState = () => {
      const scrollY = window.scrollY
      setIsScrolled(scrollY > 20)

      if (!menuOpen && !isOpen && scrollY > 80) {
        if (scrollY > lastScrollY) {
          setIsVisible(false)
        } else if (scrollY < lastScrollY) {
          setIsVisible(true)
        }
      } else {
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
        isVisible ? 'translate-y-0' : '-translate-y-full',
        isScrolled
          ? 'border-white/[0.08] bg-[#0a0a0b]/95 backdrop-blur-2xl shadow-lg shadow-black/20'
          : 'border-white/[0.04] bg-[#0a0a0b]/80 backdrop-blur-2xl'
      )}
    >
      <nav className="mx-auto flex h-14 sm:h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo />

        {/* Desktop Navigation — 4 pillars + 2 direct links */}
        <NavigationMenu.Root
          className="relative hidden lg:block"
          onValueChange={(value) => setMenuOpen(!!value)}
        >
          <NavigationMenu.List className="flex items-center gap-0.5">
            {(Object.keys(pillars) as PillarKey[]).map((key) => (
              <NavigationMenu.Item key={key}>
                <NavTrigger>{pillars[key].label}</NavTrigger>
                <NavigationMenu.Content className="absolute left-0 top-0 data-[motion=from-end]:animate-enterFromRight data-[motion=from-start]:animate-enterFromLeft data-[motion=to-end]:animate-exitToRight data-[motion=to-start]:animate-exitToLeft">
                  <MegaMenuContent section={key} />
                </NavigationMenu.Content>
              </NavigationMenu.Item>
            ))}

            {/* Direct links — no dropdown needed */}
            <NavigationMenu.Item>
              <Link
                href="/music"
                className={cn(
                  'rounded-lg px-3 py-2 text-[13px] font-semibold transition-all',
                  isActive('/music')
                    ? 'text-white bg-white/[0.05]'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
                )}
              >
                Music
              </Link>
            </NavigationMenu.Item>

            <NavigationMenu.Item>
              <Link
                href="/blog"
                className={cn(
                  'rounded-lg px-3 py-2 text-[13px] font-semibold transition-all',
                  isActive('/blog')
                    ? 'text-white bg-white/[0.05]'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
                )}
              >
                Blog
              </Link>
            </NavigationMenu.Item>

            <NavigationMenu.Indicator className="top-full z-10 flex h-2 items-end justify-center overflow-hidden transition-[width,transform_250ms_ease] data-[state=hidden]:animate-fadeOut data-[state=visible]:animate-fadeIn">
              <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-[#0a0a0b] ring-1 ring-white/[0.08]" />
            </NavigationMenu.Indicator>
          </NavigationMenu.List>

          {/* Viewport — centered to prevent clipping */}
          <div className="perspective-[2000px] absolute top-full left-1/2 -translate-x-1/2 flex justify-center pt-1">
            <NavigationMenu.Viewport className="relative h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0a0a0b]/[0.97] shadow-2xl shadow-black/60 backdrop-blur-2xl backdrop-saturate-150 transition-[width,height] duration-300 data-[state=closed]:animate-scaleOut data-[state=open]:animate-scaleIn sm:w-[var(--radix-navigation-menu-viewport-width)]" />
          </div>
        </NavigationMenu.Root>

        {/* CTA */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/start"
            className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#0a0a0b] transition-all hover:bg-slate-100 hover:shadow-lg hover:shadow-white/10"
          >
            Start Here
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
            className="border-t border-white/[0.06] bg-[#0a0a0b]/98 backdrop-blur-xl lg:hidden overflow-y-auto max-h-[calc(100vh-3.5rem)] sm:max-h-[calc(100vh-4rem)]"
          >
            <div className="mx-auto max-w-6xl space-y-1 px-4 sm:px-6 py-3 sm:py-4">
              {(Object.keys(pillars) as PillarKey[]).map((key) => (
                <MobileSection key={key} section={key} onClose={() => setIsOpen(false)} />
              ))}

              {/* Direct links */}
              <Link
                href="/music"
                onClick={() => setIsOpen(false)}
                className="block rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
              >
                Music
              </Link>
              <Link
                href="/blog"
                onClick={() => setIsOpen(false)}
                className="block rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
              >
                Blog
              </Link>

              {/* Mobile CTA */}
              <div className="pt-3 sm:pt-4 pb-2">
                <Link
                  href="/start"
                  onClick={() => setIsOpen(false)}
                  className="block w-full rounded-full bg-white py-2.5 sm:py-3 text-center text-sm font-semibold text-[#0a0a0b]"
                >
                  Start Here
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

// ── Mobile accordion ──
function MobileSection({ section, onClose }: { section: PillarKey; onClose: () => void }) {
  const [expanded, setExpanded] = useState(false)
  const data = pillars[section]
  const allItems = data.groups.flatMap((g) => g.items)

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
              {allItems.map((item) => {
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
