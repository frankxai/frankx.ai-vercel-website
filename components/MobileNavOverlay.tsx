'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  X,
  Search,
  ChevronRight,
  ChevronLeft,
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
  Wand2,
  Star,
  Brain,
  Network,
  Microscope,
  Building,
  TrendingUp,
  Download,
  Compass,
  Gamepad2,
  Scroll,
  Map,
  Flame,
  Briefcase,
  Play,
  Zap,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react'

export interface MobileNavOverlayProps {
  isOpen: boolean
  onClose: () => void
}

type NavItem = {
  name: string
  href: string
  icon: LucideIcon
  description: string
  external?: boolean
}

type NavSection = {
  key: SectionKey
  label: string
  icon: LucideIcon
  tagline: string
  featured: { title: string; description: string; href: string; badge: string; external?: boolean }
  items: NavItem[]
}

type SectionKey = 'music' | 'gencreators' | 'learn' | 'build' | 'explore'

const sections: NavSection[] = [
  {
    key: 'music',
    label: 'Music',
    icon: Music,
    tagline: 'Original releases, Vibe OS, music learning',
    featured: {
      title: 'AI Music Portfolio',
      description: 'Original releases and the systems behind the music.',
      href: '/music',
      badge: 'Studio',
    },
    items: [
      { name: 'Music Showcase', href: '/music', icon: Music, description: 'Listen to the evolving catalog' },
      { name: 'Vibe OS', href: '/products/vibe-os', icon: Sparkles, description: 'AI music creation method' },
      { name: 'Music Lab', href: '/music-lab', icon: Palette, description: 'Interactive music tools' },
      { name: 'Music School', href: '/music/learn', icon: GraduationCap, description: 'Theory to production' },
      { name: 'Suno Profile', href: 'https://suno.com/@frankx', icon: Layers, description: 'Full catalog on Suno', external: true },
    ],
  },
  {
    key: 'gencreators',
    label: 'GenCreators',
    icon: Flame,
    tagline: 'Product + framework for generative creators',
    featured: {
      title: 'GenCreator.AI',
      description: 'Live product domain — primary conversion for creators who ship.',
      href: 'https://gencreator.ai',
      badge: 'Product',
      external: true,
    },
    items: [
      {
        name: 'GenCreator.AI',
        href: 'https://gencreator.ai',
        icon: Flame,
        description: 'Live product · primary conversion',
        external: true,
      },
      { name: 'GenCreator Hub', href: '/gencreator', icon: Flame, description: 'On-site framework (principles → blueprints)' },
      { name: 'Principles', href: '/gencreator/principles', icon: Compass, description: '12 GenCreator principles' },
      { name: 'Handbook', href: '/gencreator/handbook', icon: BookOpen, description: 'Practical playbook' },
      { name: 'Blueprints', href: '/gencreator/blueprints', icon: Map, description: 'Ship-ready systems' },
      { name: 'Prompt Library', href: '/prompt-library', icon: Sparkles, description: 'Battle-tested prompts' },
      { name: 'Creation Chronicles', href: '/creation-chronicles', icon: Scroll, description: 'Build logs + stories' },
      { name: 'Templates', href: '/templates', icon: FileText, description: 'Ready-to-ship templates' },
    ],
  },
  {
    key: 'learn',
    label: 'Learn',
    icon: GraduationCap,
    tagline: 'Courses, guides, assessment, watch',
    featured: {
      title: 'Learn Hub',
      description: 'Your learning OS — courses, guides, books, assessment, games, watch.',
      href: '/learn',
      badge: 'Hub',
    },
    items: [
      { name: 'Courses', href: '/courses', icon: GraduationCap, description: 'Structured learning paths' },
      { name: 'Guides', href: '/guides', icon: BookOpen, description: 'Deep how-tos' },
      { name: 'Books', href: '/books', icon: BookOpen, description: 'Long-form reading' },
      { name: 'AI Assessment', href: '/ai-assessment', icon: Target, description: 'Benchmark your AI skills' },
      { name: 'Student Hub', href: '/students', icon: Users, description: 'For students + educators' },
      { name: 'Games Lab', href: '/games', icon: Gamepad2, description: 'Playful learning experiments' },
      { name: 'Watch', href: '/watch', icon: Play, description: 'Video library' },
      { name: 'AI Shorts', href: '/watch/shorts', icon: Zap, description: 'Fast takes + insights' },
    ],
  },
  {
    key: 'build',
    label: 'Build',
    icon: Network,
    tagline: 'Architecture, blueprints, prototypes, agents',
    featured: {
      title: 'AI Architecture Hub',
      description: 'Enterprise-grade systems, personal scale.',
      href: '/ai-architecture',
      badge: 'CoE Playbook',
    },
    items: [
      { name: 'Architecture Hub', href: '/ai-architecture', icon: Network, description: 'System design patterns' },
      { name: 'Blueprints', href: '/ai-architecture/blueprints', icon: Layers, description: 'Reference architectures' },
      { name: 'Prototypes', href: '/ai-architecture/prototypes', icon: Terminal, description: 'Working proofs' },
      { name: 'Templates', href: '/ai-architecture/templates', icon: Building, description: 'Drop-in scaffolds' },
      { name: 'AI World', href: '/ai-world', icon: Workflow, description: 'The wider AI landscape' },
      { name: 'Developer Hub', href: '/developers', icon: Code2, description: 'For builders + engineers' },
      { name: 'AI Studio', href: '/consulting', icon: Briefcase, description: 'Work with Frank' },
      { name: 'Intelligence Hub', href: '/investor', icon: TrendingUp, description: 'Market + investor signal' },
      { name: 'Agent Packs', href: '/investor/agents', icon: Bot, description: 'Shipping agent packs' },
    ],
  },
  {
    key: 'explore',
    label: 'Explore',
    icon: Sparkles,
    tagline: 'Research, resources, ACOS, about',
    featured: {
      title: 'Resource Hub',
      description: 'Research, atlas, vault, and more.',
      href: '/resources',
      badge: 'Library',
    },
    items: [
      { name: 'Starlight IS', href: '/starlight-intelligence-system', icon: Brain, description: 'Sovereignty substrate (SIS)' },
      { name: 'ACOS', href: '/acos', icon: Bot, description: 'Agentic Creator OS' },
      { name: 'Resource Hub', href: '/resources', icon: Sparkles, description: 'Curated resources' },
      { name: 'Research Hub', href: '/research', icon: Microscope, description: 'Signals + analysis' },
      { name: 'Intelligence Atlas', href: '/intelligence-atlas', icon: Star, description: 'Mapped intelligence' },
      { name: 'Downloads', href: '/downloads', icon: Download, description: 'Free artifacts' },
      { name: 'ArcaneaVault', href: '/vault', icon: Layers, description: 'Deep research vault' },
      { name: 'Arcanea', href: '/magic', icon: Wand2, description: 'Ultraworld mythology' },
      { name: 'About', href: '/about', icon: Users, description: 'About Frank' },
      { name: 'Contact', href: '/contact', icon: Compass, description: 'Get in touch' },
    ],
  },
]

const overlayVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' } },
  exit: { opacity: 0, y: 8, transition: { duration: 0.15, ease: 'easeIn' } },
}

const tileBase =
  'group flex w-full items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-3 py-3 text-left transition hover:bg-white/5 active:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50 min-h-[44px]'

export function MobileNavOverlay({ isOpen, onClose }: MobileNavOverlayProps) {
  const pathname = usePathname()
  const [activeSection, setActiveSection] = useState<SectionKey | null>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()

  // Lock body scroll while open
  useEffect(() => {
    if (!isOpen) return
    const prev = document.body.style.overflow
    const previousFocus = document.activeElement as HTMLElement | null
    document.body.style.overflow = 'hidden'
    const focusFrame = window.requestAnimationFrame(() => {
      dialogRef.current?.querySelector<HTMLElement>('[data-mobile-nav-autofocus]')?.focus()
    })
    return () => {
      window.cancelAnimationFrame(focusFrame)
      document.body.style.overflow = prev
      previousFocus?.focus()
    }
  }, [isOpen])

  // Close on route change
  useEffect(() => {
    if (isOpen) onClose()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  // Reset to home view whenever overlay opens/closes
  useEffect(() => {
    if (!isOpen) setActiveSection(null)
  }, [isOpen])

  // Escape closes and Tab remains contained inside the modal navigation.
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (activeSection) setActiveSection(null)
        else onClose()
      }

      if (e.key === 'Tab') {
        const focusable = Array.from(
          dialogRef.current?.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ) ?? [],
        ).filter((element) => {
          const view = element.closest<HTMLElement>('[data-mobile-nav-view]')?.dataset.mobileNavView
          if (!view) return true
          return view === (activeSection ? 'section' : 'home')
        })

        if (focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, activeSection, onClose])

  const openCommandPalette = useCallback(() => {
    onClose()
    // Defer so close animation + focus handoff behaves
    requestAnimationFrame(() => {
      window.dispatchEvent(new Event('frankx:open-command-palette'))
    })
  }, [onClose])

  const current = sections.find((s) => s.key === activeSection) ?? null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="mobile-nav-overlay"
          ref={dialogRef}
          id="mobile-site-navigation"
          initial={shouldReduceMotion ? false : 'hidden'}
          animate="visible"
          exit={shouldReduceMotion ? undefined : 'exit'}
          variants={overlayVariants}
          className="fixed inset-0 z-[90] flex flex-col bg-[#030712] text-white lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-navigation-title"
        >
          <h2 id="mobile-navigation-title" className="sr-only">Site navigation</h2>
          {/* Top bar */}
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/5 px-4">
            <Link
              href="/"
              onClick={onClose}
              className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-[17px] font-semibold tracking-tight text-transparent"
            >
              FrankX.AI
            </Link>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              data-mobile-nav-autofocus
              className="flex h-11 w-11 items-center justify-center rounded-lg text-slate-200 transition hover:bg-white/5 active:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Search field */}
          <div className="shrink-0 px-4 pt-4">
            <button
              type="button"
              onClick={openCommandPalette}
              className="flex w-full items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-left text-[14px] text-slate-400 transition hover:bg-white/[0.07] active:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50 min-h-[44px]"
            >
              <Search className="h-4 w-4 text-slate-500" />
              <span className="flex-1 truncate">Search everything…</span>
              <kbd className="hidden rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] text-slate-400 sm:inline">
                Ctrl+K
              </kbd>
            </button>
          </div>

          {/* Sliding views container */}
          <div className="relative flex-1 overflow-hidden">
            <motion.div
              className="flex h-full w-[200%]"
              animate={{ x: activeSection ? '-50%' : '0%' }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            >
              {/* Home view */}
              <div data-mobile-nav-view="home" className="h-full w-1/2 overflow-y-auto overscroll-contain">
                <HomeView
                  onSelectSection={(key) => setActiveSection(key)}
                  onClose={onClose}
                />
              </div>

              {/* Section view */}
              <div data-mobile-nav-view="section" className="h-full w-1/2 overflow-y-auto overscroll-contain">
                {current && (
                  <SectionView
                    section={current}
                    onBack={() => setActiveSection(null)}
                    onClose={onClose}
                  />
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function HomeView({
  onSelectSection,
  onClose,
}: {
  onSelectSection: (key: SectionKey) => void
  onClose: () => void
}) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div
      className="flex min-h-full flex-col px-4 pt-6"
      style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 24px)' }}
    >
      <h2 className="mb-3 text-[12px] font-semibold text-slate-400">
        Choose a direction
      </h2>

      <div className="flex flex-col gap-2">
        {sections.map((section, i) => {
          const Icon = section.icon
          return (
            <motion.button
              key={section.key}
              type="button"
              onClick={() => onSelectSection(section.key)}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.03 * i, duration: 0.2 } }}
              className={tileBase}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 text-slate-200">
                <Icon className="h-4 w-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-semibold text-white">{section.label}</span>
                <span className="mt-0.5 block truncate text-[12px] leading-tight text-slate-400">
                  {section.tagline}
                </span>
              </span>
              <ChevronRight className="h-4 w-4 shrink-0 text-slate-500 transition group-hover:text-slate-300" />
            </motion.button>
          )
        })}
      </div>

      <div className="my-5 h-px w-full bg-white/5" />

      <h2 className="mb-3 text-[12px] font-semibold text-slate-400">
        Go directly
      </h2>

      <Link href="/blog" onClick={onClose} className={tileBase}>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 text-slate-200">
          <BookOpen className="h-4 w-4" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[15px] font-semibold text-white">Blog</span>
          <span className="mt-0.5 block truncate text-[12px] leading-tight text-slate-400">
            Essays, fieldnotes, and signal
          </span>
        </span>
        <ChevronRight className="h-4 w-4 shrink-0 text-slate-500" />
      </Link>

      <div className="flex-1" />

      <div className="pt-6">
        <a
          href="https://gencreator.ai"
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClose}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 px-5 py-3.5 text-[15px] font-semibold text-slate-900 shadow-lg shadow-emerald-500/20 transition hover:brightness-110 active:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 min-h-[44px]"
        >
          GenCreator.AI
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  )
}

function SectionView({
  section,
  onBack,
  onClose,
}: {
  section: NavSection
  onBack: () => void
  onClose: () => void
}) {
  const FeaturedIcon = section.icon
  return (
    <div
      className="flex min-h-full flex-col px-4 pt-4"
      style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 24px)' }}
    >
      <button
        type="button"
        onClick={onBack}
        className="mb-4 inline-flex items-center gap-1.5 self-start rounded-lg px-2 py-2 text-[14px] font-medium text-slate-300 transition hover:bg-white/5 active:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50 min-h-[44px]"
      >
        <ChevronLeft className="h-4 w-4" />
        {section.label}
      </button>

      {/* Featured card */}
      {section.featured.external ? (
        <a
          href={section.featured.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClose}
          className="group mb-5 block overflow-hidden rounded-2xl border border-emerald-400/20 bg-gradient-to-br from-emerald-400/10 via-cyan-400/5 to-transparent p-4 transition hover:border-emerald-400/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50"
        >
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400/30 to-cyan-400/20 text-emerald-300">
              <FeaturedIcon className="h-4 w-4" />
            </span>
            <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-200">
              {section.featured.badge}
            </span>
          </div>
          <h3 className="text-[16px] font-semibold text-white">{section.featured.title}</h3>
          <p className="mt-1 text-[13px] leading-snug text-slate-300">
            {section.featured.description}
          </p>
          <span className="mt-3 inline-flex items-center gap-1 text-[13px] font-medium text-emerald-300">
            Open product <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
          </span>
        </a>
      ) : (
        <Link
          href={section.featured.href}
          onClick={onClose}
          className="group mb-5 block overflow-hidden rounded-2xl border border-emerald-400/20 bg-gradient-to-br from-emerald-400/10 via-cyan-400/5 to-transparent p-4 transition hover:border-emerald-400/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50"
        >
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400/30 to-cyan-400/20 text-emerald-300">
              <FeaturedIcon className="h-4 w-4" />
            </span>
            <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-200">
              {section.featured.badge}
            </span>
          </div>
          <h3 className="text-[16px] font-semibold text-white">{section.featured.title}</h3>
          <p className="mt-1 text-[13px] leading-snug text-slate-300">
            {section.featured.description}
          </p>
          <span className="mt-3 inline-flex items-center gap-1 text-[13px] font-medium text-emerald-300">
            Open hub <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
          </span>
        </Link>
      )}

      <h2 className="mb-3 text-[12px] font-semibold text-slate-400">
        All in {section.label}
      </h2>

      <div className="flex flex-col gap-2">
        {section.items.map((item) => {
          const Icon = item.icon
          const content = (
            <>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 text-slate-200">
                <Icon className="h-4 w-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-semibold text-white">{item.name}</span>
                <span className="mt-0.5 block truncate text-[12px] leading-tight text-slate-400">
                  {item.description}
                </span>
              </span>
              <ChevronRight className="h-4 w-4 shrink-0 text-slate-500" />
            </>
          )
          if (item.external) {
            return (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className={tileBase}
              >
                {content}
              </a>
            )
          }
          return (
            <Link key={item.href} href={item.href} onClick={onClose} className={tileBase}>
              {content}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default MobileNavOverlay
