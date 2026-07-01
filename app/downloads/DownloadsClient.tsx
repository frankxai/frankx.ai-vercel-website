'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Download, ExternalLink, BookOpen, Terminal, Cpu } from 'lucide-react'
import GlassmorphicCard from '@/components/ui/GlassmorphicCard'

type Category = 'all' | 'systems' | 'books' | 'dev'

export type DownloadItem = {
  id: string
  title: string
  subtitle: string
  description: string
  features: string[]
  variant: 'default' | 'emerald' | 'purple' | 'sunset' | 'ocean' | 'minimal'
  category: Category
  icon: 'cpu' | 'book' | 'terminal'
  image: string
  previewUrl?: string
  href?: string
  external?: boolean
  cta?: string
}

/**
 * Exported so lib/portal/recommend.ts can resolve + link-check download
 * recommendations against the real registry instead of duplicating data.
 */
export const downloadsList: DownloadItem[] = [
  {
    id: 'agentic-creator-os',
    title: 'Agentic Creator OS',
    subtitle: 'Universal AI Agent Operating System',
    description: 'One install. 90+ skills, 65+ commands, and 38 agents packaged for Claude Code, Codex, and Antigravity. Auto-activating context rules.',
    category: 'systems',
    previewUrl: '/downloads/preview/agentic-creator-os',
    features: ['90+ Skills', '65+ Commands', '38 Agents', 'Multi-Platform'],
    variant: 'purple',
    icon: 'cpu',
    image: '/images/downloads/agentic-creator-os.png',
  },
  {
    id: 'soulbook-guide',
    title: "The Creator's Soulbook",
    subtitle: 'Complete Life Architecture Framework',
    description: 'Map all 7 life pillars with structured reflection exercises. Includes the Life Symphony, Golden Path, and 7 Pillars frameworks.',
    category: 'books',
    previewUrl: '/downloads/preview/soulbook',
    features: ['7 Life Pillars', '3 Lenses', '25+ AI Prompts', 'Obsidian Templates'],
    variant: 'purple',
    icon: 'book',
    image: '/images/downloads/soulbook-guide.png',
  },
  {
    id: 'vibe-os-guide',
    title: 'Vibe OS Music Guide',
    subtitle: 'AI Music Creation System',
    description: 'From emotional vision to finished track in one studio session. 50+ genre-specific Suno prompts and the emotion mapping system.',
    category: 'systems',
    previewUrl: '/downloads/preview/vibe-os',
    features: ['50+ Suno Prompts', 'Emotion Mapping', 'Genre Templates', 'Release Playbooks'],
    variant: 'emerald',
    icon: 'cpu',
    image: '/images/downloads/vibe-os-guide.png',
  },
  {
    id: 'blue-life-commons',
    title: 'Blue Life Commons',
    subtitle: 'Ocean Intelligence System — Founding Commons',
    description: 'An open-source ocean-intelligence commons: 31 sourced species pages, 8 region briefings, welfare assessments, and a sanctuary model.',
    category: 'systems',
    href: 'https://github.com/frankxai/blue-life-commons/releases/tag/v0.1.0',
    external: true,
    cta: 'Download v0.1.0',
    features: ['31 Species Pages', '8 Region Briefings', '10 Audience Guides', 'Agent Skills'],
    variant: 'ocean',
    icon: 'book',
    image: '/images/downloads/blue-life-commons.png',
  },
  {
    id: 'health-intelligence-system',
    title: 'Health Intelligence System',
    subtitle: 'Cancer Prep & Decision Support',
    description: 'A SIP-aligned excellence pack for cancer screening prep, abnormal-result briefs, treatment discussion packets, and second opinions.',
    category: 'systems',
    previewUrl: '/downloads/health-intelligence-system',
    features: ['Cancer Module', 'Safety Gate', 'Clinician Briefs', 'GitHub Release'],
    variant: 'emerald',
    icon: 'cpu',
    image: '/images/downloads/health-intelligence-system.png',
  },
  {
    id: 'epicways-intelligence',
    title: 'EpicWays Intelligence Kit',
    subtitle: 'TheEpicWays Client Service System',
    description: 'A practical starter system for TheEpicWays: client signal, offer design, workshop flow, impact tracking, and agent briefs.',
    category: 'systems',
    previewUrl: '/downloads/epicways-intelligence',
    features: ['Signal Brief', 'Workshop Loop', 'Follow-Up Pack', 'Agent Briefs'],
    variant: 'emerald',
    icon: 'cpu',
    image: '/images/downloads/epicways-intelligence.png',
  },
  {
    id: 'starlight-sip-starter',
    title: 'Starlight SIP Starter',
    subtitle: 'Open Intelligence System Module',
    description: 'Download the open-core SIP starter from Starlight: portable files, public vault seeds, release manifest, and checksums.',
    category: 'dev',
    href: 'https://starlightintelligence.org/download',
    external: true,
    cta: 'Download SIP Core',
    features: ['SIP Core Files', 'Public Vault Seeds', 'SHA256 Checksums', 'Upgrade Path'],
    variant: 'ocean',
    icon: 'terminal',
    image: '/images/downloads/starlight-sip-starter.png',
  },
  {
    id: 'starlight-plugin-starter',
    title: 'Starlight Plugin Starter',
    subtitle: 'Codex Plugin Prerelease',
    description: 'Install four public-safe Codex plugins for enterprise AI, health intelligence safety, prompt evaluation, and Vibe OS.',
    category: 'dev',
    href: 'https://starlightintelligence.org/download#codex-plugin-starter',
    external: true,
    cta: 'Download Plugins',
    features: ['4 Codex Plugins', 'GitHub Prerelease', 'SHA256 Checksum', 'Install Guide'],
    variant: 'ocean',
    icon: 'terminal',
    image: '/images/downloads/starlight-plugin-starter.png',
  },
  {
    id: 'multi-llm-arena',
    title: 'Multi-LLM Arena Harness',
    subtitle: 'Advanced Benchmark & Testing Hub',
    description: 'A Next.js evaluation harness featuring interactive visual simulations, leaderboards, and scoring algorithms.',
    category: 'dev',
    href: 'https://github.com/frankxai/multi-llm-arena',
    external: true,
    cta: 'View on GitHub',
    features: ['Three.js Visuals', 'GSAP Animation', 'Multi-LLM Leaderboard', 'Benchmarking'],
    variant: 'purple',
    icon: 'terminal',
    image: '/images/downloads/multi-llm-arena.png',
  },
  {
    id: 'golden-age-of-creators',
    title: 'The Golden Age of Creators',
    subtitle: 'Futuristic AI Co-Creation Tome',
    description: 'The complete manuscript exploring the shift from consumer to creator, human-AI synthesis pipelines, and sovereign wealth.',
    category: 'books',
    href: '/pdfs/golden-age-of-creators-manuscript.pdf',
    external: true,
    cta: 'Download PDF',
    features: ['Full Manuscript', 'AI Creator Era', 'System Co-Creation', 'Strategic Blueprint'],
    variant: 'sunset',
    icon: 'book',
    image: '/images/downloads/golden-age-of-creators.png',
  },
  {
    id: 'creators-life-architecture',
    title: "Creator's Life Architecture",
    subtitle: 'Obsidian Personal Development System',
    description: 'Detailed setup guide and Obsidian configurations to track, audit, and optimize your weekly output and life energy balance.',
    category: 'books',
    href: '/pdfs/creators-life-architecture-guide.pdf',
    external: true,
    cta: 'Download Manual',
    features: ['Pillar Mapping', 'Daily Execution', 'Reflection Prompts', 'Obsidian Config'],
    variant: 'purple',
    icon: 'book',
    image: '/images/downloads/creators-life-architecture.png',
  },
  {
    id: 'golden-age-trilogy',
    title: 'Golden Age Trilogy Blueprint',
    subtitle: 'The Three-Book Synthesis Spec',
    description: 'Strategic outline mapping the upcoming trilogy: The Golden Age, The Great Awakener, and the Sovereign Creator systems.',
    category: 'books',
    href: '/pdfs/golden-age-trilogy-overview.pdf',
    external: true,
    cta: 'Download Blueprint',
    features: ['Trilogy Mapping', 'Future Chronology', 'Evolution Model', 'System Design'],
    variant: 'sunset',
    icon: 'book',
    image: '/images/downloads/golden-age-trilogy.png',
  },
  {
    id: 'the-goldmanack',
    title: 'The Goldmanack Handbook',
    subtitle: 'Yearly Creator Self-Direction Log',
    description: 'An executive handbook focusing on personal engineering, seasonal audits, cognitive shields, and creator circles.',
    category: 'books',
    href: '/pdfs/the-goldmanack-creator-handbook.pdf',
    external: true,
    cta: 'Download eBook',
    features: ['Yearly Handbook', 'Self-Direction', 'Energy Audits', 'Agent Alignment'],
    variant: 'sunset',
    icon: 'book',
    image: '/images/downloads/the-goldmanack.png',
  },
  {
    id: 'the-great-awakening',
    title: 'The Great Awakening',
    subtitle: 'Consciousness & Technology Paradigm',
    description: 'A deep philosophical manuscript discussing the impact of superintelligence on human spiritual resonance and technical sovereignty.',
    category: 'books',
    href: '/pdfs/the-great-awakening-manuscript.pdf',
    external: true,
    cta: 'Download Manuscript',
    features: ['Consciousness', 'Technology Paradigm', 'Deep Transition', 'Philosophy Set'],
    variant: 'sunset',
    icon: 'book',
    image: '/images/downloads/the-great-awakening.png',
  },
  {
    id: 'arcanea-chronicles',
    title: 'Arcanea Chronicles & Lore',
    subtitle: 'Gamified AI Education Syllabus',
    description: 'The lore book detailing the Grand Academy of Arcanea, holographic teaching entities, and structural learning maps.',
    category: 'books',
    href: '/pdfs/arcanea-chronicles-lore.pdf',
    external: true,
    cta: 'Download Guide',
    features: ['Academy Schematic', 'Lore Bible', 'Worldbuilding', 'Visual Assets'],
    variant: 'purple',
    icon: 'book',
    image: '/images/downloads/arcanea-chronicles.png',
  },
  {
    id: 'arcanea-creator-principles',
    title: 'Arcanea Creator Principles',
    subtitle: 'Code and Design Quality Protocols',
    description: 'Enforces strictly zero-slop guidelines, markdown styling rules, claims verification checklist, and design-council constraints.',
    category: 'dev',
    href: 'https://github.com/frankxai/agentic-creator-os/blob/main/docs/design/taste.md',
    external: true,
    cta: 'Download Principles',
    features: ['ACOS Code Spec', 'Design Guidelines', 'Adversarial Review', 'Integration Rules'],
    variant: 'minimal',
    icon: 'terminal',
    image: '/images/downloads/arcanea-creator-principles.png',
  },
  {
    id: 'fire-horse-poems',
    title: 'Fire Horse Poems & Verses',
    subtitle: 'Personal Creative Poetry Codex',
    description: 'An intimate collection of creative writing, lyrics, and poetic expressions exploring life, coding, and the stars.',
    category: 'books',
    href: '/pdfs/fire-horse-poems-verses.pdf',
    external: true,
    cta: 'Download Verses',
    features: ['Poetry Collection', 'Personal Verses', 'Bioluminescent Art', 'Creative Writing'],
    variant: 'sunset',
    icon: 'book',
    image: '/images/downloads/fire-horse-poems.png',
  },
  {
    id: 'acos-skills-pack',
    title: 'ACOS Skills Pack',
    subtitle: '90+ Autonomous Agent Skill Modules',
    description: 'Download the compiled agent skills folder: Framer, OCI, LangGraph, OADK, Spartan, Suno prompt architect, and more.',
    category: 'dev',
    href: '/downloads/acos-skills-pack.zip',
    external: true,
    cta: 'Download ZIP',
    features: ['90+ Claude Skills', 'Dynamic Registry', 'ACOS Primitives', 'JSON Schema'],
    variant: 'purple',
    icon: 'terminal',
    image: '/images/downloads/acos-skills-pack.png',
  },
  {
    id: 'acos-commands-pack',
    title: 'ACOS Commands Pack',
    subtitle: '65+ CLI Command Integrations',
    description: 'The shell command substrate wiring ACOS into PowerShell, bash, and custom MCP connectors. Includes automation hooks.',
    category: 'dev',
    href: '/downloads/acos-commands-pack.zip',
    external: true,
    cta: 'Download ZIP',
    features: ['65+ CLI Commands', 'Automation Scripts', 'Terminal Wiring', 'WSL2 Support'],
    variant: 'purple',
    icon: 'terminal',
    image: '/images/downloads/acos-commands-pack.png',
  },
  {
    id: 'acos-hooks-pack',
    title: 'ACOS Hooks Pack',
    subtitle: 'Automated Lifecycle Quality Gates',
    description: 'Pre-commit, post-execution, and session-restore hook scripts checking for slop, broken internal links, and credentials.',
    category: 'dev',
    href: '/downloads/acos-hooks-pack.zip',
    external: true,
    cta: 'Download ZIP',
    features: ['Agent Lifecycle', 'Commit Guards', 'Quality Gates', 'Diagnostics Script'],
    variant: 'purple',
    icon: 'terminal',
    image: '/images/downloads/acos-hooks-pack.png',
  },
]

const categories = [
  { id: 'all', label: 'All Resources' },
  { id: 'systems', label: 'Systems & Software' },
  { id: 'books', label: 'Books & Lore' },
  { id: 'dev', label: 'Developer Packs' },
]

export default function DownloadsClient() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<Category>('all')

  const filteredDownloads = useMemo(() => {
    return downloadsList.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase()) ||
        item.features.some((f) => f.toLowerCase().includes(search.toLowerCase()))

      return matchesCategory && matchesSearch
    })
  }, [search, selectedCategory])

  const categoryCounts = useMemo(() => {
    const counts = { all: downloadsList.length, systems: 0, books: 0, dev: 0 }
    downloadsList.forEach((item) => {
      counts[item.category]++
    })
    return counts
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Search and Tabs Control Panel */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-12">
        {/* Search */}
        <div className="relative w-full md:max-w-md">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white/40">
            <Search className="h-5 w-5" />
          </span>
          <input
            type="text"
            placeholder="Search guides, books, templates..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="block w-full pl-10 pr-4 py-3 bg-slate-900/60 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 backdrop-blur-md transition-all text-sm"
          />
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 justify-center bg-slate-950/40 p-1.5 border border-white/5 rounded-2xl backdrop-blur-md">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as Category)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                selectedCategory === cat.id
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat.label} ({categoryCounts[cat.id as Category]})
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <AnimatePresence mode="popLayout">
        {filteredDownloads.length > 0 ? (
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredDownloads.map((item) => (
              <GlassmorphicCard
                key={item.id}
                hover
                border="subtle"
                gradient={item.variant === 'purple' ? 'purple' : 'aurora'}
                className="flex flex-col h-full rounded-3xl border border-white/10 overflow-hidden bg-slate-950/40"
              >
                {/* 16:9 Premium Image Header */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900 border-b border-white/5 group">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={item.id === 'agentic-creator-os' || item.id === 'soulbook-guide'}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Category Pill Overlay */}
                  <span className="absolute top-4 right-4 z-10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-slate-950/80 text-white/90 border border-white/10 rounded-full backdrop-blur-md">
                    {item.category === 'systems'
                      ? 'Systems & Software'
                      : item.category === 'books'
                      ? 'Books & Manuals'
                      : 'Developer Pack'}
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="p-2.5 rounded-xl bg-white/5 text-emerald-400 border border-white/5">
                      {item.icon === 'cpu' && <Cpu className="h-5 w-5" />}
                      {item.icon === 'book' && <BookOpen className="h-5 w-5" />}
                      {item.icon === 'terminal' && <Terminal className="h-5 w-5" />}
                    </span>
                    <div>
                      <h2 className="text-xl font-bold text-white tracking-tight leading-snug">
                        {item.title}
                      </h2>
                      <p className="text-xs text-white/50">{item.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-sm text-white/70 mb-6 leading-relaxed flex-grow">
                    {item.description}
                  </p>

                  {/* Features / Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-8">
                    {item.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-2.5 py-1 text-[10px] font-medium text-white/80 bg-white/5 border border-white/5 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="mt-auto">
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-slate-100 text-slate-950 font-semibold rounded-xl transition-all duration-300 shadow-md shadow-white/5"
                      >
                        {item.cta ?? 'Download Now'}
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    ) : (
                      <Link
                        href={item.previewUrl ?? '#'}
                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-semibold rounded-xl transition-all duration-300 shadow-md shadow-emerald-500/10"
                      >
                        {item.cta ?? 'Preview & Download'}
                        <Download className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                </div>
              </GlassmorphicCard>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-slate-950/20 border border-white/5 rounded-3xl backdrop-blur-md"
          >
            <Cpu className="h-12 w-12 text-white/20 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-1">No resources found</h3>
            <p className="text-white/40 max-w-xs mx-auto text-sm">
              Try adjusting your filters or search keywords to locate your file.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
