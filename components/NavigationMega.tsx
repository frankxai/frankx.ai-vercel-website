'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
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
  Network,
  Microscope,
  Building,
  TrendingUp,
  Download,
  Compass,
  Gamepad2,
  Brain,
  Scroll,
  Map,
  Flame,
  Briefcase,
  Play,
  Zap,
  Search,
} from 'lucide-react'

import { cn } from '@/lib/utils'
import MobileNavOverlay from '@/components/MobileNavOverlay'

// Navigation: 5 megas + Blog. Invest merged into Build (AI Architecture covers enterprise + investor tooling).
const navigation = {
  music: {
    label: 'Music',
    href: '/music',
    featured: {
      title: 'AI Music Portfolio',
      description: '12,000+ songs created with Suno AI. Explore the catalog.',
      href: '/music',
      badge: '12K+ Tracks',
    },
    items: [
      { name: 'Music Showcase', href: '/music', icon: Music, description: '12K+ AI-generated tracks' },
      { name: 'Vibe OS', href: '/products/vibe-os', icon: Sparkles, description: 'AI music creation method' },
      { name: 'Music Lab', href: '/music-lab', icon: Palette, description: 'Interactive music tools' },
      { name: 'Music School', href: '/music-school', icon: GraduationCap, description: 'Full curriculum: theory to production' },
      { name: 'Suno Profile', href: 'https://suno.com/@frankx', icon: Layers, description: 'Full catalog on Suno', external: true },
    ],
  },
  gencreators: {
    label: 'GenCreators',
    href: '/gencreator',
    featured: {
      title: 'The GenCreator Framework',
      description: 'Principles. Handbook. Blueprints. The operating system for generative creators.',
      href: '/gencreator',
      badge: 'Framework',
    },
    items: [
      { name: 'GenCreator Hub', href: '/gencreator', icon: Flame, description: 'The complete creator OS' },
      { name: 'Principles', href: '/gencreator/principles', icon: Compass, description: '12 GenCreator principles' },
      { name: 'Handbook', href: '/gencreator/handbook', icon: BookOpen, description: '8 chapters: identity to legacy' },
      { name: 'Blueprints', href: '/gencreator/blueprints', icon: Map, description: '12 actionable frameworks' },
      { name: 'Prompt Library', href: '/prompt-library', icon: Sparkles, description: '200+ curated prompts' },
      { name: 'Creation Chronicles', href: '/creation-chronicles', icon: Scroll, description: 'Behind the build' },
      { name: 'Templates', href: '/templates', icon: FileText, description: 'Ready-to-use workflows' },
    ],
  },
  learn: {
    label: 'Learn',
    href: '/learn',
    featured: {
      title: 'Learn Hub',
      description: 'Your learning OS — courses, guides, books, assessment, games, watch. Find your level.',
      href: '/learn',
      badge: 'Hub',
    },
    items: [
      { name: 'Courses', href: '/courses', icon: GraduationCap, description: 'Structured learning paths' },
      { name: 'Guides', href: '/guides', icon: BookOpen, description: 'In-depth tutorials' },
      { name: "Frank's Books", href: '/books', icon: BookOpen, description: '23 books, 411K+ words' },
      { name: 'Library', href: '/library', icon: Layers, description: 'Book deep-dives · open-source Library OS' },
      { name: 'AI Assessment', href: '/ai-assessment', icon: Target, description: 'Find your level' },
      { name: 'Student Hub', href: '/students', icon: Users, description: 'Your learning dashboard' },
      { name: 'Games Lab', href: '/games', icon: Gamepad2, description: 'Learn through play' },
      { name: 'Watch', href: '/watch', icon: Play, description: 'Curated video library' },
      { name: 'AI Shorts', href: '/watch/shorts', icon: Zap, description: 'NEW · 60-second high-signal insights' },
    ],
  },
  build: {
    label: 'Build',
    href: '/ai-architecture',
    featured: {
      title: 'AI Architecture Hub',
      description: 'Blueprints, prototypes, templates, and investor intelligence. From idea to deployment.',
      href: '/ai-architecture',
      badge: 'Hub',
    },
    items: [
      { name: 'Architecture Hub', href: '/ai-architecture', icon: Network, description: 'Central hub for AI builders' },
      { name: 'Blueprints', href: '/ai-architecture/blueprints', icon: Layers, description: 'Diagrams & guides (FREE)' },
      { name: 'Prototypes', href: '/ai-architecture/prototypes', icon: Terminal, description: 'Try with your API keys' },
      { name: 'Templates', href: '/ai-architecture/templates', icon: Building, description: 'Starter kits ($29-199)' },
      { name: 'AI World', href: '/ai-world', icon: Workflow, description: 'Live architecture demos' },
      { name: 'Developer Hub', href: '/developers', icon: Code2, description: 'Tools & workflows' },
      { name: 'AI Studio', href: '/consulting', icon: Briefcase, description: 'Architecture consulting' },
      { name: 'Intelligence Hub', href: '/investor', icon: TrendingUp, description: 'AI-powered investing' },
      { name: 'Agent Packs', href: '/investor/agents', icon: Bot, description: 'Automated analysis agents' },
    ],
    groups: [
      {
        label: 'Architecture',
        items: ['Architecture Hub', 'Blueprints', 'Prototypes', 'Templates'],
      },
      {
        label: 'Deep Dives',
        items: ['AI World', 'Developer Hub', 'AI Studio'],
      },
      {
        label: 'Invest',
        items: ['Intelligence Hub', 'Agent Packs'],
      },
    ],
  },
  explore: {
    label: 'Explore',
    href: '/resources',
    featured: {
      title: 'The FrankX Ecosystem',
      description: 'Research, products, world-building, and the story behind it all.',
      href: '/resources',
      badge: 'Ecosystem',
    },
    items: [
      { name: 'Resource Hub', href: '/resources', icon: Sparkles, description: 'All systems & tools' },
      { name: 'Research Hub', href: '/research', icon: Microscope, description: 'Intelligence operations' },
      { name: 'Intelligence Atlas', href: '/intelligence-atlas', icon: Star, description: 'Flagship research' },
      { name: 'Downloads', href: '/downloads', icon: Download, description: 'PDFs & free resources' },
      { name: 'Starlight IS', href: '/starlight-intelligence-system', icon: Brain, description: 'Sovereignty substrate (SIS)' },
      { name: 'ArcaneaVault', href: '/vault', icon: Layers, description: 'Visual asset library' },
      { name: 'Arcanea', href: '/magic', icon: Wand2, description: 'World-building academy' },
      { name: 'ACOS', href: '/acos', icon: Bot, description: 'Agentic Creator OS' },
      { name: 'Design System', href: '/design', icon: Palette, description: 'Tokens, taste, source · open' },
      { name: 'About', href: '/about', icon: Users, description: 'Story & mission' },
      { name: 'Bio', href: '/bio', icon: Users, description: 'Press kit & speaker topics' },
      { name: 'Media Kit', href: '/media-kit', icon: FileText, description: 'Story angles, proof & contact' },
      { name: 'Licensing', href: '/licensing', icon: Briefcase, description: 'Music, templates & partner rights' },
      { name: 'Contact', href: '/contact', icon: Compass, description: 'Get in touch' },
    ],
    groups: [
      {
        label: 'Research & Knowledge',
        items: ['Research Hub', 'Intelligence Atlas', 'Downloads'],
      },
      {
        label: 'Products & Systems',
        items: ['Starlight IS', 'ACOS', 'Design System', 'Resource Hub', 'ArcaneaVault', 'Arcanea'],
      },
      {
        label: 'Connect',
        items: ['About', 'Bio', 'Media Kit', 'Licensing', 'Contact'],
      },
    ],
  },
}

type NavKey = keyof typeof navigation

function Logo() {
  return (
    <Link
      href="/"
      className="rounded-lg px-2 py-1.5 transition-all duration-300 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712]"
      aria-label="FrankX.AI - Home"
    >
      <span className="font-display text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
        FrankX.AI
      </span>
    </Link>
  )
}

function MenuLink({ item }: { item: (typeof navigation)[NavKey]['items'][0] }) {
  const Icon = item.icon
  const isExternal = 'external' in item && item.external
  const LinkComponent = isExternal ? 'a' : Link
  const linkProps = isExternal
    ? { href: item.href, target: '_blank', rel: 'noopener noreferrer' }
    : { href: item.href }

  return (
    <li>
      <NavigationMenu.Link asChild>
        <LinkComponent
          {...linkProps}
          className="group flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70"
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white/5 text-slate-400 transition-colors group-hover:bg-white/10 group-hover:text-white">
            <Icon className="h-3.5 w-3.5" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="flex items-center gap-1.5 text-[13px] font-medium text-white">
              {item.name}
              {isExternal && <ExternalLink className="h-3 w-3 text-slate-500" />}
            </span>
            <p className="text-[11px] leading-tight text-slate-500">{item.description}</p>
          </div>
        </LinkComponent>
      </NavigationMenu.Link>
    </li>
  )
}

function FeaturedCard({ data }: { data: (typeof navigation)[NavKey] }) {
  return (
    <Link
      href={data.featured.href}
      className="group relative flex flex-col justify-end overflow-hidden rounded-xl bg-gradient-to-b from-slate-800/50 to-slate-900/80 p-5 transition-all hover:from-slate-800/70 hover:to-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70"
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
  )
}

function MegaMenuContent({ section }: { section: NavKey }) {
  const data = navigation[section]
  const itemCount = data.items.length
  const hasGroups = 'groups' in data && data.groups

  if (hasGroups) {
    const groups = (data as typeof data & { groups: { label: string; items: string[] }[] }).groups
    return (
      <div className="w-[760px] max-w-[calc(100vw-2rem)] p-4">
        <div className="grid grid-cols-[180px_1fr] gap-4">
          <FeaturedCard data={data} />
          <div className="grid grid-cols-3 gap-4">
            {groups.map((group) => {
              const groupItems = group.items
                .map((name) => data.items.find((i) => i.name === name))
                .filter(Boolean) as (typeof data.items)[0][]
              return (
                <div key={group.label}>
                  <h5 className="mb-2 px-2 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">
                    {group.label}
                  </h5>
                  <ul className="space-y-0.5">
                    {groupItems.map((item) => (
                      <MenuLink key={item.name} item={item} />
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  if (itemCount > 5) {
    const midpoint = Math.ceil(itemCount / 2)
    const col1 = data.items.slice(0, midpoint)
    const col2 = data.items.slice(midpoint)
    return (
      <div className="w-[660px] max-w-[calc(100vw-2rem)] p-4">
        <div className="grid grid-cols-[180px_1fr] gap-4">
          <FeaturedCard data={data} />
          <div className="grid grid-cols-2 gap-3">
            <ul className="space-y-0.5">
              {col1.map((item) => (
                <MenuLink key={item.name} item={item} />
              ))}
            </ul>
            <ul className="space-y-0.5">
              {col2.map((item) => (
                <MenuLink key={item.name} item={item} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-[540px] max-w-[calc(100vw-2rem)] p-4">
      <div className="grid grid-cols-[180px_1fr] gap-4">
        <FeaturedCard data={data} />
        <ul className="space-y-0.5">
          {data.items.map((item) => (
            <MenuLink key={item.name} item={item} />
          ))}
        </ul>
      </div>
    </div>
  )
}

// Click = navigate to hub page. Hover still opens menu (Radix pointer-enter is independent of click).
function NavTrigger({ children, href }: { children: React.ReactNode; href: string }) {
  const router = useRouter()
  return (
    <NavigationMenu.Trigger
      onClick={() => router.push(href)}
      className="group flex items-center gap-1 rounded-md px-2.5 py-1.5 text-[13px] font-semibold text-slate-300 outline-none transition-all hover:bg-white/5 hover:text-white focus-visible:ring-2 focus-visible:ring-emerald-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712] data-[state=open]:bg-white/5 data-[state=open]:text-white"
    >
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
  const [activeLeft, setActiveLeft] = useState<number | null>(null)
  const pathname = usePathname()
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

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

  // Trigger-anchored viewport positioning: measure the active trigger's center and slide viewport under it.
  const handleValueChange = useCallback((value: string) => {
    setMenuOpen(!!value)
    if (!value) return
    requestAnimationFrame(() => {
      const activeTrigger = rootRef.current?.querySelector<HTMLElement>('[data-state="open"]')
      if (activeTrigger) {
        const center = activeTrigger.offsetLeft + activeTrigger.offsetWidth / 2
        setActiveLeft(center)
      }
    })
  }, [])

  const openCommandPalette = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('frankx:open-command-palette'))
    }
  }, [])

  // Ctrl+K hotkey lives in CommandPalette (single source of truth). Having it here too caused a race:
  // NavigationMega dispatched the event → palette opened → palette's own keydown toggled it closed in the same tick.

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  const desktopSections: NavKey[] = ['music', 'gencreators', 'learn', 'build', 'explore']

  return (
    <>
      <header
        className={cn(
          'fixed top-0 z-50 w-full border-b transition-all duration-300 ease-in-out',
          isVisible ? 'translate-y-0' : '-translate-y-full',
          isScrolled
            ? 'border-white/10 bg-[#030712]/95 backdrop-blur-xl shadow-lg shadow-black/10'
            : 'border-white/5 bg-[#030712]/90 backdrop-blur-xl'
        )}
      >
        <nav className="mx-auto flex h-14 sm:h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Logo />

          <NavigationMenu.Root
            ref={rootRef}
            className="relative hidden lg:block"
            onValueChange={handleValueChange}
          >
            <NavigationMenu.List className="flex items-center gap-0.5">
              {desktopSections.map((section) => (
                <NavigationMenu.Item key={section}>
                  <NavTrigger href={navigation[section].href}>{navigation[section].label}</NavTrigger>
                  <NavigationMenu.Content className="absolute left-0 top-0 data-[motion=from-end]:animate-enterFromRight data-[motion=from-start]:animate-enterFromLeft data-[motion=to-end]:animate-exitToRight data-[motion=to-start]:animate-exitToLeft">
                    <MegaMenuContent section={section} />
                  </NavigationMenu.Content>
                </NavigationMenu.Item>
              ))}

              <NavigationMenu.Item>
                <Link
                  href="/blog"
                  className={cn(
                    'rounded-md px-2.5 py-1.5 text-[13px] font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712]',
                    isActive('/blog')
                      ? 'text-white bg-white/5'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  )}
                >
                  Blog
                </Link>
              </NavigationMenu.Item>

              <NavigationMenu.Indicator className="top-full z-10 flex h-2 items-end justify-center overflow-hidden transition-[width,transform_250ms_ease] data-[state=hidden]:animate-fadeOut data-[state=visible]:animate-fadeIn">
                <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-slate-800 shadow-lg" />
              </NavigationMenu.Indicator>
            </NavigationMenu.List>

            <div
              className="perspective-[2000px] absolute top-full flex -translate-x-1/2 justify-center transition-[left] duration-200 ease-out"
              style={{ left: activeLeft !== null ? `${activeLeft}px` : '50%' }}
            >
              <NavigationMenu.Viewport className="relative mt-2 h-[var(--radix-navigation-menu-viewport-height)] w-full max-w-[calc(100vw-2rem)] origin-[top_center] overflow-hidden rounded-xl border border-white/10 bg-[#0a0a12]/95 shadow-2xl shadow-black/50 backdrop-blur-xl transition-[width,height] duration-300 data-[state=closed]:animate-scaleOut data-[state=open]:animate-scaleIn sm:w-[var(--radix-navigation-menu-viewport-width)]" />
            </div>
          </NavigationMenu.Root>

          <div className="hidden items-center gap-2 lg:flex">
            <button
              type="button"
              onClick={openCommandPalette}
              className="flex h-8 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-2.5 text-slate-400 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70"
              aria-label="Open search"
              title="Search"
            >
              <Search className="h-3.5 w-3.5" />
              <span className="hidden xl:inline text-[11px] font-medium">Search</span>
            </button>
            <Link
              href="/start"
              className="rounded-full bg-gradient-to-r from-emerald-600 to-cyan-600 px-4 py-1.5 text-[13px] font-semibold text-white transition-all hover:from-emerald-500 hover:to-cyan-500 hover:shadow-lg hover:shadow-emerald-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712]"
            >
              Start Here
            </Link>
          </div>

          <div className="flex items-center gap-1 lg:hidden">
            <button
              type="button"
              onClick={openCommandPalette}
              className="flex h-11 w-11 items-center justify-center rounded-lg text-slate-300 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70"
              aria-label="Open search"
              title="Search"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-11 w-11 items-center justify-center rounded-lg text-slate-300 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-site-navigation"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </header>

      <MobileNavOverlay isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
