'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import {
  BookOpen,
  CheckCircle2,
  Cpu,
  Download,
  ExternalLink,
  Search,
  ShieldCheck,
  Terminal,
  Users,
} from 'lucide-react'

import { GlowCard, type GlowColor } from '@/components/ui/glow-card'

type Category = 'all' | 'friend-kits' | 'systems' | 'books' | 'dev'

type DownloadItem = {
  id: string
  title: string
  subtitle: string
  description: string
  features: string[]
  category: Exclude<Category, 'all'>
  icon: 'cpu' | 'book' | 'terminal' | 'people'
  image: string
  glow: GlowColor
  status: string
  previewUrl?: string
  href?: string
  friendHref?: string
  allyHref?: string
  external?: boolean
  cta?: string
}

const downloadsList: DownloadItem[] = [
  {
    id: 'ana-ai-business-kit',
    title: 'Ana AI Business Kit',
    subtitle: 'People, psychology, offers, and travel-friendly business',
    description:
      'A practical starter kit for Ana: offer map, clarity session, reflection circle, workshop playbook, content library, aftercare, and eight agent briefs.',
    category: 'friend-kits',
    previewUrl: '/downloads/ana-ai-business-kit',
    friendHref: '/friends/ana',
    allyHref: '/allies/ana-cancino',
    cta: 'Open kit page',
    features: ['v0.1.0 ZIP', '8 Agents', 'Offer Map', 'Noindex Draft'],
    glow: 'amber',
    status: 'Live ZIP + checksum',
    icon: 'people',
    image: '/images/downloads/ana-ai-business-kit.png',
  },
  {
    id: 'epicways-intelligence',
    title: 'EpicWays Intelligence Kit',
    subtitle: 'TheEpicWays client service system',
    description:
      'A starter operating system for Estefania and TheEpicWays: client signal, offer design, workshop flow, room memory, impact tracking, and agent briefs.',
    category: 'friend-kits',
    previewUrl: '/downloads/epicways-intelligence',
    friendHref: '/friends/estefania',
    allyHref: '/allies/epic-ways',
    cta: 'Open kit page',
    features: ['v0.1.0 ZIP', 'Workshop Loop', 'Follow-Up', 'Agent Briefs'],
    glow: 'emerald',
    status: 'Live ZIP + checksum',
    icon: 'people',
    image: '/images/downloads/epicways-intelligence.png',
  },
  {
    id: 'jojo-hospitality-intelligence-kit',
    title: 'Jojo Hospitality Intelligence Kit',
    subtitle: 'Harzfenster and Hotel Gortler service workflows',
    description:
      'A public-safe hospitality kit for bookings, guest memory, service briefings, hotel handoffs, review learning, and team enablement.',
    category: 'friend-kits',
    previewUrl: '/downloads/jojo-hospitality-intelligence-kit',
    friendHref: '/friends/jojo',
    allyHref: '/allies/harzfenster',
    cta: 'Open kit page',
    features: ['v0.1.0 ZIP', '8 Agents', 'Service Loop', 'Privacy Boundaries'],
    glow: 'teal',
    status: 'Live ZIP + checksum',
    icon: 'people',
    image: '/images/downloads/jojo-hospitality-intelligence-kit.svg',
  },
  {
    id: 'ahmad-founder-creator-kit',
    title: 'Ahmad Founder Creator Kit',
    subtitle: 'Trinity AI, OpenClaw, ACOS, and creator execution',
    description:
      'A founder kit for Ahmad: startup operating map, Trinity AI offer ladder, local AI lab guidance, swarm roles, media loops, academy, and proof rhythm.',
    category: 'friend-kits',
    previewUrl: '/downloads/ahmad-founder-creator-kit',
    friendHref: '/friends/ahmad',
    allyHref: '/allies/trinity-ai',
    cta: 'Open kit page',
    features: ['v0.1.0 ZIP', '12 Agents', '1 Skill', 'Local Lab'],
    glow: 'amber',
    status: 'Live ZIP + checksum',
    icon: 'people',
    image: '/images/downloads/ahmad-founder-creator-kit.svg',
  },
  {
    id: 'agentic-creator-os',
    title: 'Agentic Creator OS',
    subtitle: 'Optional power tooling for Codex, Claude, and local agents',
    description:
      'The ACOS preview explains how to install the broader agent harness. For friend kits, start with the specific kit first, then add ACOS only when the workflow proves useful.',
    category: 'systems',
    previewUrl: '/downloads/preview/agentic-creator-os',
    cta: 'Open ACOS packs',
    features: ['Complete ZIP', 'Skills Pack', 'Agent Pack', 'Hooks Pack'],
    glow: 'violet',
    status: 'Live package page',
    icon: 'cpu',
    image: '/images/downloads/agentic-creator-os.png',
  },
  {
    id: 'health-intelligence-system',
    title: 'Health Intelligence System',
    subtitle: 'Cancer prep and decision-support workflow',
    description:
      'A safety-first intelligence pack for screening prep, abnormal-result briefs, treatment discussion packets, and second opinions.',
    category: 'systems',
    previewUrl: '/downloads/health-intelligence-system',
    features: ['Cancer Module', 'Safety Gate', 'Clinician Briefs', 'GitHub Release'],
    glow: 'emerald',
    status: 'Live page',
    icon: 'cpu',
    image: '/images/downloads/health-intelligence-system.png',
  },
  {
    id: 'blue-life-commons',
    title: 'Blue Life Commons',
    subtitle: 'Ocean intelligence founding commons',
    description:
      'An open-source ocean-intelligence commons with sourced species pages, region briefings, welfare assessments, and a sanctuary model.',
    category: 'systems',
    href: 'https://github.com/frankxai/blue-life-commons/releases/tag/v0.1.0',
    external: true,
    cta: 'Open release',
    features: ['31 Species Pages', '8 Region Briefings', 'Audience Guides', 'Agent Skills'],
    glow: 'cyan',
    status: 'GitHub release',
    icon: 'book',
    image: '/images/downloads/blue-life-commons.png',
  },
  {
    id: 'soulbook-guide',
    title: "The Creator's Soulbook",
    subtitle: 'Life architecture framework',
    description:
      'A live preview page backed by an HTML template. It is kept in the catalog as a working resource, not as a fake PDF download.',
    category: 'books',
    previewUrl: '/downloads/preview/soulbook',
    cta: 'Open preview',
    features: ['7 Pillars', 'HTML Preview', 'Email Capture', 'Reflection Prompts'],
    glow: 'violet',
    status: 'Working preview',
    icon: 'book',
    image: '/images/downloads/soulbook-guide.png',
  },
  {
    id: 'vibe-os-guide',
    title: 'Vibe OS Music Guide',
    subtitle: 'AI music creation system',
    description:
      'A working guide preview for turning creative direction into music sessions, prompts, release playbooks, and repeatable studio flow.',
    category: 'books',
    previewUrl: '/downloads/preview/vibe-os',
    cta: 'Open preview',
    features: ['Music System', 'HTML Preview', 'Prompt Flow', 'Release Playbooks'],
    glow: 'rose',
    status: 'Working preview',
    icon: 'book',
    image: '/images/downloads/vibe-os-guide.png',
  },
  {
    id: 'golden-age-online',
    title: 'Golden Age Online Book',
    subtitle: 'Live reading experience',
    description:
      'The Golden Age material is currently available as a live site section. It stays here as a working reading route until a real downloadable file is shipped.',
    category: 'books',
    previewUrl: '/golden-age',
    cta: 'Read online',
    features: ['Live Route', 'Chapter Reader', 'No Dead PDF', 'Book Surface'],
    glow: 'amber',
    status: 'Live reading route',
    icon: 'book',
    image: '/images/downloads/golden-age-of-creators.png',
  },
  {
    id: 'starlight-sip-starter',
    title: 'Starlight SIP Starter',
    subtitle: 'Open intelligence system module',
    description:
      'Download the open-core SIP starter from Starlight: portable files, public vault seeds, release manifest, and checksums.',
    category: 'dev',
    href: 'https://starlightintelligence.org/download',
    external: true,
    cta: 'Open Starlight download',
    features: ['SIP Core Files', 'Public Vault Seeds', 'SHA256 Checksums', 'Upgrade Path'],
    glow: 'cyan',
    status: 'External download',
    icon: 'terminal',
    image: '/images/downloads/starlight-sip-starter.png',
  },
  {
    id: 'starlight-plugin-starter',
    title: 'Starlight Plugin Starter',
    subtitle: 'Codex plugin prerelease',
    description:
      'Install public-safe Codex plugins for enterprise AI, health intelligence safety, prompt evaluation, and Vibe OS.',
    category: 'dev',
    href: 'https://starlightintelligence.org/download#codex-plugin-starter',
    external: true,
    cta: 'Open plugin download',
    features: ['4 Codex Plugins', 'GitHub Prerelease', 'SHA256 Checksum', 'Install Guide'],
    glow: 'cyan',
    status: 'External download',
    icon: 'terminal',
    image: '/images/downloads/starlight-plugin-starter.png',
  },
  {
    id: 'multi-llm-arena',
    title: 'Multi-LLM Arena Harness',
    subtitle: 'Benchmark and testing hub',
    description:
      'A Next.js evaluation harness with interactive visual simulations, leaderboards, and scoring algorithms.',
    category: 'dev',
    href: 'https://github.com/frankxai/multi-llm-arena',
    external: true,
    cta: 'View on GitHub',
    features: ['Three.js Visuals', 'GSAP Animation', 'Leaderboards', 'Benchmarking'],
    glow: 'violet',
    status: 'GitHub repo',
    icon: 'terminal',
    image: '/images/downloads/multi-llm-arena.png',
  },
  {
    id: 'acos-complete-bundle',
    title: 'ACOS Complete Bundle',
    subtitle: 'Full local agent operating bundle',
    description:
      'The full ACOS package archive served directly from FrankX. This replaces the stale command-pack link that did not have a matching archive.',
    category: 'dev',
    href: '/downloads/acos-complete.zip',
    cta: 'Download ZIP',
    features: ['23.2 MB', 'Full Bundle', 'Local Tools', 'Direct ZIP'],
    glow: 'violet',
    status: 'Direct ZIP',
    icon: 'terminal',
    image: '/images/downloads/agentic-creator-os.png',
  },
  {
    id: 'acos-skills-pack',
    title: 'ACOS Skills Pack',
    subtitle: 'Autonomous agent skill modules',
    description:
      'Download the compiled agent skills folder with domain modules for creative, technical, and business workflows.',
    category: 'dev',
    href: '/downloads/acos-skills-pack.zip',
    cta: 'Download ZIP',
    features: ['23.7 MB', 'Skills Library', 'ACOS Primitives', 'Direct ZIP'],
    glow: 'violet',
    status: 'Direct ZIP',
    icon: 'terminal',
    image: '/images/downloads/acos-skills-pack.png',
  },
  {
    id: 'acos-agents-pack',
    title: 'ACOS Agents Pack',
    subtitle: 'Specialized agent profiles',
    description:
      'Download the standalone agent-profile archive for local experiments, agent roles, and multi-agent orchestration.',
    category: 'dev',
    href: '/downloads/acos-agents-pack.zip',
    cta: 'Download ZIP',
    features: ['1.5 MB', 'Agent Profiles', 'Role Prompts', 'Direct ZIP'],
    glow: 'indigo',
    status: 'Direct ZIP',
    icon: 'terminal',
    image: '/images/downloads/agentic-creator-os.png',
  },
  {
    id: 'acos-hooks-pack',
    title: 'ACOS Hooks Pack',
    subtitle: 'Lifecycle quality gates',
    description:
      'Pre-commit, post-execution, and session-restore hook scripts for local agent lifecycle checks and safety gates.',
    category: 'dev',
    href: '/downloads/acos-hooks-pack.zip',
    cta: 'Download ZIP',
    features: ['82 KB', 'Commit Guards', 'Quality Gates', 'Direct ZIP'],
    glow: 'purple',
    status: 'Direct ZIP',
    icon: 'terminal',
    image: '/images/downloads/acos-hooks-pack.png',
  },
]

const categories: Array<{ id: Category; label: string }> = [
  { id: 'all', label: 'All live assets' },
  { id: 'friend-kits', label: 'Friend kits' },
  { id: 'systems', label: 'Systems' },
  { id: 'books', label: 'Books' },
  { id: 'dev', label: 'Developer packs' },
]

const statusCards = [
  {
    label: 'Friend kits',
    value: '4',
    copy: 'Ana, Estefania, Jojo, and Ahmad each have a real page, ZIP, checksum, and bridge into Friends and Allies.',
    icon: Users,
    color: 'amber' as GlowColor,
  },
  {
    label: 'Download integrity',
    value: 'Clean',
    copy: 'The catalog now prioritizes working routes, live ZIPs, checksum files, and external releases instead of missing PDF links.',
    icon: ShieldCheck,
    color: 'emerald' as GlowColor,
  },
  {
    label: 'How to use it',
    value: 'Start small',
    copy: 'Use the specific person kit first. ACOS, Codex, and Claude workflows are optional power tools after the service loop is clear.',
    icon: CheckCircle2,
    color: 'cyan' as GlowColor,
  },
]

function categoryLabel(category: DownloadItem['category']) {
  if (category === 'friend-kits') return 'Friend Kit'
  if (category === 'systems') return 'System'
  if (category === 'books') return 'Book / Guide'
  return 'Developer Pack'
}

function IconForItem({ icon }: { icon: DownloadItem['icon'] }) {
  if (icon === 'book') return <BookOpen className="h-5 w-5" />
  if (icon === 'terminal') return <Terminal className="h-5 w-5" />
  if (icon === 'people') return <Users className="h-5 w-5" />
  return <Cpu className="h-5 w-5" />
}

export default function DownloadsClient() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<Category>('all')

  const filteredDownloads = useMemo(() => {
    const query = search.trim().toLowerCase()

    return downloadsList.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.subtitle.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.features.some((feature) => feature.toLowerCase().includes(query)) ||
        item.status.toLowerCase().includes(query)

      return matchesCategory && matchesSearch
    })
  }, [search, selectedCategory])

  const categoryCounts = useMemo(() => {
    const counts: Record<Category, number> = {
      all: downloadsList.length,
      'friend-kits': 0,
      systems: 0,
      books: 0,
      dev: 0,
    }

    downloadsList.forEach((item) => {
      counts[item.category] += 1
    })

    return counts
  }, [])

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 grid gap-4 md:grid-cols-3">
        {statusCards.map((card) => {
          const Icon = card.icon

          return (
            <GlowCard key={card.label} color={card.color} className="h-full p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/45">
                    {card.label}
                  </p>
                  <p className="mt-2 text-2xl font-black tracking-tight text-white">{card.value}</p>
                </div>
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/[0.06] text-white/82">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-white/64">{card.copy}</p>
            </GlowCard>
          )
        })}
      </div>

      <div className="mb-12 flex flex-col gap-5 rounded-[2rem] border border-white/10 bg-white/[0.035] p-3 shadow-[0_24px_90px_rgba(0,0,0,0.28)] backdrop-blur-2xl md:flex-row md:items-center md:justify-between md:p-4">
        <label className="relative w-full md:max-w-md">
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-white/42">
            <Search className="h-5 w-5" />
          </span>
          <span className="sr-only">Search downloads</span>
          <input
            type="text"
            placeholder="Search kits, systems, guides..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="block w-full rounded-[1.35rem] border border-white/10 bg-black/30 py-3.5 pl-11 pr-4 text-sm text-white placeholder-white/38 outline-none transition focus:border-emerald-300/50 focus:ring-2 focus:ring-emerald-400/20"
          />
        </label>

        <div className="flex flex-wrap justify-center gap-2 rounded-[1.5rem] border border-white/8 bg-black/20 p-1.5">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`rounded-[1.15rem] px-3.5 py-2 text-xs font-bold uppercase tracking-[0.14em] transition ${
                selectedCategory === category.id
                  ? 'bg-white text-slate-950 shadow-[0_12px_36px_rgba(255,255,255,0.14)]'
                  : 'text-white/58 hover:bg-white/[0.07] hover:text-white'
              }`}
            >
              {category.label} ({categoryCounts[category.id]})
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {filteredDownloads.length > 0 ? (
          <motion.div layout className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {filteredDownloads.map((item) => {
              const targetHref = item.previewUrl ?? item.href ?? '#'
              const directDownload = item.href?.startsWith('/downloads/')
              const external = Boolean(item.external)

              return (
                <motion.div key={item.id} layout>
                  <GlowCard color={item.glow} className="flex h-full flex-col overflow-hidden p-0">
                    <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-white/8 bg-slate-950">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={item.category === 'friend-kits'}
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_48%,rgba(0,0,0,0.60))]" />
                      <span className="absolute right-4 top-4 z-10 rounded-full border border-white/12 bg-black/55 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/88 backdrop-blur-xl">
                        {categoryLabel(item.category)}
                      </span>
                      <span className="absolute bottom-4 left-4 z-10 rounded-full border border-white/12 bg-white/[0.08] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/78 backdrop-blur-xl">
                        {item.status}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-6 sm:p-7">
                      <div className="mb-4 flex items-start gap-3">
                        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/[0.06] text-emerald-200">
                          <IconForItem icon={item.icon} />
                        </span>
                        <div>
                          <h2 className="text-xl font-black leading-snug tracking-tight text-white">
                            {item.title}
                          </h2>
                          <p className="mt-1 text-xs leading-5 text-white/52">{item.subtitle}</p>
                        </div>
                      </div>

                      <p className="mb-6 flex-1 text-sm leading-6 text-white/68">{item.description}</p>

                      <div className="mb-7 flex flex-wrap gap-1.5">
                        {item.features.map((feature) => (
                          <span
                            key={feature}
                            className="rounded-full border border-white/8 bg-white/[0.045] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.13em] text-white/70"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>

                      {(item.friendHref || item.allyHref) && (
                        <div className="mb-4 flex flex-wrap gap-2">
                          {item.friendHref && (
                            <Link
                              href={item.friendHref}
                              className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-xs font-bold text-white/68 transition hover:border-white/28 hover:text-white"
                            >
                              Friend page
                            </Link>
                          )}
                          {item.allyHref && (
                            <Link
                              href={item.allyHref}
                              className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-xs font-bold text-white/68 transition hover:border-white/28 hover:text-white"
                            >
                              Ally page
                            </Link>
                          )}
                        </div>
                      )}

                      <div className="mt-auto">
                        {directDownload ? (
                          <a
                            href={targetHref}
                            download
                            className="inline-flex w-full items-center justify-center gap-2 rounded-[1.2rem] bg-white px-5 py-3.5 text-sm font-black text-slate-950 shadow-[0_16px_48px_rgba(255,255,255,0.10)] transition hover:bg-emerald-100"
                          >
                            {item.cta ?? 'Download ZIP'}
                            <Download className="h-4 w-4" />
                          </a>
                        ) : external ? (
                          <a
                            href={targetHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex w-full items-center justify-center gap-2 rounded-[1.2rem] bg-white px-5 py-3.5 text-sm font-black text-slate-950 shadow-[0_16px_48px_rgba(255,255,255,0.10)] transition hover:bg-emerald-100"
                          >
                            {item.cta ?? 'Open resource'}
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        ) : (
                          <Link
                            href={targetHref}
                            className="inline-flex w-full items-center justify-center gap-2 rounded-[1.2rem] bg-white px-5 py-3.5 text-sm font-black text-slate-950 shadow-[0_16px_48px_rgba(255,255,255,0.10)] transition hover:bg-emerald-100"
                          >
                            {item.cta ?? 'Open resource'}
                            <Download className="h-4 w-4" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </GlowCard>
                </motion.div>
              )
            })}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-[2rem] border border-white/8 bg-white/[0.035] px-6 py-20 text-center backdrop-blur-xl"
          >
            <Cpu className="mx-auto mb-4 h-12 w-12 text-white/20" />
            <h3 className="mb-1 text-lg font-bold text-white">No live assets found</h3>
            <p className="mx-auto max-w-xs text-sm leading-6 text-white/42">
              Try another search or clear the selected category.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
