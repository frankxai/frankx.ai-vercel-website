'use client'

import { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Music,
  Sparkles,
  Palette,
  GraduationCap,
  Layers,
  Flame,
  Compass,
  BookOpen,
  Scroll,
  Map as MapIcon,
  FileText,
  Target,
  Users,
  Gamepad2,
  Play,
  Zap,
  Network,
  Terminal,
  Building,
  Workflow,
  Code2,
  Briefcase,
  TrendingUp,
  Star,
  Brain,
  Bot,
  Microscope,
  Download,
  Wand2,
  Home,
  ArrowRight,
  Mail,
  ExternalLink,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type PaletteItem = {
  label: string
  description: string
  href: string
  icon: LucideIcon
  group: 'Music' | 'GenCreators' | 'Learn' | 'Build' | 'Invest' | 'Explore' | 'Shortcuts'
  external?: boolean
}

const items: PaletteItem[] = [
  // Music
  { group: 'Music', label: 'Music Showcase', description: '12,000+ AI songs — full catalog', href: '/music', icon: Music },
  { group: 'Music', label: 'Vibe OS', description: 'Music creation operating system', href: '/products/vibe-os', icon: Sparkles },
  { group: 'Music', label: 'Music Lab', description: 'Experimental sound design', href: '/music-lab', icon: Palette },
  { group: 'Music', label: 'Music School', description: 'Learn AI music production', href: '/music/learn', icon: GraduationCap },
  { group: 'Music', label: 'Suno Profile', description: 'Live Suno catalog', href: 'https://suno.com/@frankx', icon: Layers, external: true },

  // GenCreators
  { group: 'GenCreators', label: 'GenCreator Hub', description: 'The creator operating system', href: '/gencreator', icon: Flame },
  { group: 'GenCreators', label: 'Principles', description: 'Foundational creator principles', href: '/gencreator/principles', icon: Compass },
  { group: 'GenCreators', label: 'Handbook', description: 'Full GenCreator handbook', href: '/gencreator/handbook', icon: BookOpen },
  { group: 'GenCreators', label: 'Blueprints', description: 'Ready-to-use creation blueprints', href: '/gencreator/blueprints', icon: MapIcon },
  { group: 'GenCreators', label: 'Prompt Library', description: 'Tested prompts for every stack', href: '/prompt-library', icon: Sparkles },
  { group: 'GenCreators', label: 'Creation Chronicles', description: 'Behind-the-scenes build logs', href: '/creation-chronicles', icon: Scroll },
  { group: 'GenCreators', label: 'Templates', description: 'Production-grade templates', href: '/templates', icon: FileText },

  // Learn
  { group: 'Learn', label: 'Learn Hub', description: 'Complete learning OS — all paths', href: '/learn', icon: GraduationCap },
  { group: 'Learn', label: 'Courses', description: 'Structured AI programs', href: '/courses', icon: GraduationCap },
  { group: 'Learn', label: 'Guides', description: 'Deep-dive practical guides', href: '/guides', icon: BookOpen },
  { group: 'Learn', label: 'Books', description: 'Full-length books and workbooks', href: '/books', icon: Target },
  { group: 'Learn', label: 'AI Assessment', description: 'Measure your AI readiness', href: '/ai-assessment', icon: Users },
  { group: 'Learn', label: 'Student Hub', description: 'Learner resources', href: '/students', icon: Gamepad2 },
  { group: 'Learn', label: 'Games Lab', description: 'Playable AI experiments', href: '/games', icon: Play },
  { group: 'Learn', label: 'Watch', description: 'Video library', href: '/watch', icon: Play },
  { group: 'Learn', label: 'AI Shorts', description: 'Daily AI short explainers', href: '/watch/shorts', icon: Zap },

  // Build
  { group: 'Build', label: 'Architecture Hub', description: 'Enterprise AI architecture reference', href: '/ai-architecture', icon: Network },
  { group: 'Build', label: 'Blueprints', description: 'System design blueprints', href: '/ai-architecture/blueprints', icon: Layers },
  { group: 'Build', label: 'Prototypes', description: 'Working reference prototypes', href: '/ai-architecture/prototypes', icon: Terminal },
  { group: 'Build', label: 'Templates', description: 'Architecture starter templates', href: '/ai-architecture/templates', icon: Building },
  { group: 'Build', label: 'AI World', description: 'Full AI systems map', href: '/ai-world', icon: Workflow },
  { group: 'Build', label: 'Developer Hub', description: 'Developer docs + SDKs', href: '/developers', icon: Code2 },
  { group: 'Build', label: 'AI Studio', description: 'Consulting and advisory', href: '/consulting', icon: Briefcase },

  // Invest (surfaced under Build in palette, labeled Invest group for filtering)
  { group: 'Invest', label: 'Intelligence Hub', description: 'Investor research and theses', href: '/investor', icon: TrendingUp },
  { group: 'Invest', label: 'Agent Packs', description: 'Productized agent bundles', href: '/investor/agents', icon: Bot },

  // Explore
  { group: 'Explore', label: 'Starlight IS', description: 'Sovereignty substrate — 9 layers, MIT, markdown-first', href: '/starlight-intelligence-system', icon: Brain },
  { group: 'Explore', label: 'SIS Starter Pack', description: 'Download the Claude Desktop starter (.zip)', href: 'https://github.com/frankxai/Starlight-Intelligence-System/releases/latest', icon: Brain, external: true },
  { group: 'Explore', label: 'Resource Hub', description: 'Curated resources', href: '/resources', icon: Sparkles },
  { group: 'Explore', label: 'Research Hub', description: 'Original research + briefs', href: '/research', icon: Microscope },
  { group: 'Explore', label: 'Intelligence Atlas', description: 'Global intelligence map', href: '/intelligence-atlas', icon: Star },
  { group: 'Explore', label: 'Downloads', description: 'Free tools + packs', href: '/downloads', icon: Download },
  { group: 'Explore', label: 'ArcaneaVault', description: 'Premium vault library', href: '/vault', icon: Layers },
  { group: 'Explore', label: 'Arcanea', description: 'Arcanea universe portal', href: '/magic', icon: Wand2 },
  { group: 'Explore', label: 'ACOS', description: 'Agentic Creator OS', href: '/acos', icon: Bot },
  { group: 'Explore', label: 'About', description: 'Frank and the mission', href: '/about', icon: Users },
  { group: 'Explore', label: 'Contact', description: 'Get in touch', href: '/contact', icon: Compass },

  // Shortcuts
  { group: 'Shortcuts', label: 'Home', description: 'FrankX homepage', href: '/', icon: Home },
  { group: 'Shortcuts', label: 'Blog', description: 'Latest articles', href: '/blog', icon: BookOpen },
  { group: 'Shortcuts', label: 'Start Here', description: 'New visitor? Start here', href: '/start', icon: ArrowRight },
  { group: 'Shortcuts', label: 'Full Search', description: 'Open full search experience', href: '/search', icon: Search },
  { group: 'Shortcuts', label: 'Contact', description: 'Reach out directly', href: '/contact', icon: Mail },
]

const curated: PaletteItem[] = [
  items.find((i) => i.href === '/start')!,
  items.find((i) => i.href === '/blog')!,
  items.find((i) => i.href === '/prompt-library')!,
  items.find((i) => i.href === '/ai-architecture')!,
  items.find((i) => i.href === '/music')!,
  items.find((i) => i.href === '/research')!,
  items.find((i) => i.href === '/acos')!,
  items.find((i) => i.href === '/search')!,
].filter(Boolean) as PaletteItem[]

const MAX_RESULTS = 12

export default function CommandPalette() {
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const close = useCallback(() => {
    setOpen(false)
    setQuery('')
    setSelected(0)
  }, [])

  // WHY: custom event lets any component (e.g. nav search icon) open the palette without a shared context
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((prev) => !prev)
      } else if (e.key === 'Escape') {
        setOpen(false)
      }
    }
    const onOpen = () => setOpen(true)
    window.addEventListener('keydown', onKey)
    window.addEventListener('frankx:open-command-palette', onOpen)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('frankx:open-command-palette', onOpen)
    }
  }, [])

  useEffect(() => {
    close()
  }, [pathname, close])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      requestAnimationFrame(() => inputRef.current?.focus())
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return curated
    return items
      .filter((item) => {
        const hay = `${item.label} ${item.description} ${item.group}`.toLowerCase()
        return hay.includes(q)
      })
      .slice(0, MAX_RESULTS)
  }, [query])

  useEffect(() => {
    setSelected(0)
  }, [query, open])

  const activate = useCallback(
    (item: PaletteItem) => {
      if (item.external) {
        window.open(item.href, '_blank', 'noopener,noreferrer')
      } else {
        router.push(item.href)
      }
      close()
    },
    [router, close]
  )

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelected((s) => Math.min(s + 1, Math.max(results.length - 1, 0)))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelected((s) => Math.max(s - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const item = results[selected]
      if (item) activate(item)
    }
  }

  useEffect(() => {
    if (!listRef.current) return
    const el = listRef.current.querySelector<HTMLElement>(`[data-index="${selected}"]`)
    el?.scrollIntoView({ block: 'nearest' })
  }, [selected])

  const grouped = useMemo(() => {
    const map = new Map<string, { item: PaletteItem; index: number }[]>()
    results.forEach((item, index) => {
      const bucket = map.get(item.group) ?? []
      bucket.push({ item, index })
      map.set(item.group, bucket)
    })
    return Array.from(map.entries())
  }, [results])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="palette"
          className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
        >
          <motion.div
            className="max-w-[640px] mx-auto mt-[15vh] rounded-2xl border border-white/10 bg-[#0a0a12]/95 shadow-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -4 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
              <Search className="h-4 w-4 text-slate-400 shrink-0" aria-hidden />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Search FrankX — pages, guides, tools..."
                className="flex-1 bg-transparent outline-none text-sm text-white placeholder:text-slate-500"
                spellCheck={false}
                autoComplete="off"
              />
              <kbd className="hidden sm:inline-flex items-center rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] font-medium text-slate-400">
                ESC
              </kbd>
            </div>

            <div
              ref={listRef}
              className="max-h-[60vh] overflow-y-auto py-2"
              role="listbox"
              aria-label="Results"
            >
              {results.length === 0 ? (
                <div className="px-4 py-10 text-center text-sm text-slate-500">
                  No results for &ldquo;{query}&rdquo;
                </div>
              ) : (
                grouped.map(([group, entries]) => (
                  <div key={group} className="px-2 pb-2">
                    <div className="px-3 pt-2 pb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                      {group}
                    </div>
                    {entries.map(({ item, index }) => {
                      const Icon = item.icon
                      const isSelected = index === selected
                      return (
                        <button
                          key={`${item.href}-${index}`}
                          data-index={index}
                          type="button"
                          role="option"
                          aria-selected={isSelected}
                          onMouseEnter={() => setSelected(index)}
                          onClick={() => activate(item)}
                          className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                            isSelected ? 'bg-white/10' : 'hover:bg-white/5'
                          }`}
                        >
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-white/10 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10">
                            <Icon className="h-4 w-4 text-emerald-300" aria-hidden />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 text-sm text-white truncate">
                              <span className="truncate">{item.label}</span>
                              {item.external && (
                                <ExternalLink className="h-3 w-3 text-slate-500 shrink-0" aria-hidden />
                              )}
                            </div>
                            <div className="text-[12px] text-slate-400 truncate">
                              {item.description}
                            </div>
                          </div>
                          {isSelected && (
                            <ArrowRight className="h-3.5 w-3.5 text-slate-400 shrink-0" aria-hidden />
                          )}
                        </button>
                      )
                    })}
                  </div>
                ))
              )}
            </div>

            <div className="flex items-center justify-between gap-3 px-4 py-2.5 border-t border-white/10 text-[11px] text-slate-500">
              <div className="flex items-center gap-3">
                <span>&uarr;&darr; navigate</span>
                <span>&crarr; open</span>
                <span>esc close</span>
              </div>
              <div className="flex items-center gap-1 text-slate-500">
                <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px]">
                  &#8984;
                </kbd>
                <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px]">
                  K
                </kbd>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export { CommandPalette }
