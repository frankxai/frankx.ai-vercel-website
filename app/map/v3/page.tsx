'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Github,
  ExternalLink,
  Layers,
  Zap,
  Globe,
  Wrench,
  Package,
  FlaskConical,
  Star,
  Activity,
  GitBranch,
  Terminal,
  ArrowLeft,
  Play,
  Pause,
  Volume2
} from 'lucide-react'
import { GlowCard } from '@/components/ui/glow-card'
import PremiumButton from '@/components/ui/PremiumButton'
import manifestData from '@/data/repos-manifest.json'

// ─── Types ────────────────────────────────────────────────────────────────
type RepoCluster = 'arcanea' | 'acos' | 'websites' | 'creator-tools' | 'products' | 'research'

interface Repo {
  name: string
  cluster: RepoCluster
  description: string
  status: string
  url: string
}

interface Epoch {
  id: number
  title: string
  subtitle: string
  date: string
  description: string
  image: string
  color: 'purple' | 'emerald' | 'amber'
  cluster: RepoCluster
  repos: string[]
  tags: string[]
}

const EPOCHS: Epoch[] = [
  {
    id: 1,
    title: 'Mythology & Genesis',
    subtitle: 'L1 Intelligence & Lore',
    date: 'Q1 - Q2 2025',
    description: 'The foundation of the creative cosmos. Structuring the mythology, faction files, and core lore databases. This period focused on establishing canon schemas that seed the multi-book writing assemblies.',
    image: '/images/map/arcanea_genesis.png',
    color: 'purple',
    cluster: 'arcanea',
    repos: ['arcanea-core', 'arcanea-studio', 'research-scan'],
    tags: ['Fictional Lore', 'Canon Schema', 'Starlight Vaults']
  },
  {
    id: 2,
    title: 'Agentic Creator OS',
    subtitle: 'L3 Production & Substrates',
    date: 'Q3 - Q4 2025',
    description: 'Transitioning from static canon files to active code orchestration. Building the autonomous agent harnesses, task queues, and CLI hooks. Introducing the ACOS substrate that automates multi-file edits, research scans, and system audits.',
    image: '/images/map/acos_architecture.png',
    color: 'emerald',
    cluster: 'acos',
    repos: ['agentic-creator-os', 'agentic-ops-hub', 'descript-operator', 'suno-ai-mastery'],
    tags: ['Autonomous Swarms', 'n8n Workflows', 'Task Queues']
  },
  {
    id: 3,
    title: 'The Sovereign Estate',
    subtitle: 'L5 Distribution & Revenue',
    date: '2026 - Present',
    description: 'Expanding the ecosystem to public-facing surfaces. Designing and deploying the frontend Next.js application, integrating secure Stripe gateways, cataloging the 12,000+ AI song catalog, and running developer coaching intakes.',
    image: '/images/map/sovereign_estate.png',
    color: 'amber',
    cluster: 'websites',
    repos: ['FrankX', 'frankx.ai-vercel-website', 'product-engine', 'creator-dashboard'],
    tags: ['Next.js App Router', 'Vercel Edge', 'Stripe Billing', 'Music player']
  }
]

export default function MapV3Page() {
  const [isPlaying, setIsPlaying] = useState(false)
  const repos = (manifestData.repos as Repo[]) || []

  // Toggle mock player
  const handlePlayToggle = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-[#A9A9AA] font-sans antialiased selection:bg-amber-500/20 selection:text-white">
      {/* Ambient background glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-950/20 rounded-full blur-[160px]" />
        <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-amber-950/15 rounded-full blur-[160px]" />
      </div>

      {/* Main Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Navigation Breadcrumb */}
        <div className="mb-12">
          <Link
            href="/map"
            className="inline-flex items-center gap-2 text-xs font-mono text-white/45 hover:text-white/80 transition-colors uppercase tracking-widest"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Map Hub</span>
          </Link>
        </div>

        {/* ─── Page Hero ─────────────────────────────────────────────────── */}
        <div className="text-center max-w-2xl mx-auto mb-24">
          <span className="p-1 px-2.5 rounded bg-amber-500/10 border border-amber-500/20 text-[10px] text-amber-500 uppercase font-mono tracking-widest mb-4 inline-block">
            Approach v3: Cinematic Timeline
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white font-sans tracking-tight mb-4 leading-tight">
            Creator Chronicles
          </h1>
          <p className="text-sm sm:text-base text-white/50 leading-relaxed">
            The chronological evolution of an AI architect. Follow the line of development connecting mythology, agentic operating layers, and sovereign commercial products.
          </p>
        </div>

        {/* ─── Timeline Sections ─────────────────────────────────────────── */}
        <div className="relative border-l border-white/5 pl-6 sm:pl-10 ml-4 sm:ml-8 space-y-24">
          {EPOCHS.map((epoch, index) => {
            const isPurple = epoch.color === 'purple'
            const isEmerald = epoch.color === 'emerald'
            const activeColorClass = isPurple ? 'text-purple-400 border-purple-500/20 bg-purple-500/5' : isEmerald ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5' : 'text-amber-400 border-amber-500/20 bg-amber-500/5'
            const activeDotColor = isPurple ? 'bg-purple-500 ring-purple-500/20' : isEmerald ? 'bg-emerald-500 ring-emerald-500/20' : 'bg-amber-500 ring-amber-500/20'

            return (
              <div key={epoch.id} className="relative">
                {/* Timeline node dot */}
                <span className={`absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full border border-[#0a0a0b] ${activeDotColor} ring-4 transition-all duration-300`} />

                {/* Content Block */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Story details */}
                  <div className="lg:col-span-6 space-y-4">
                    <span className="text-xs font-mono text-white/40">{epoch.date}</span>
                    <div>
                      <span className={`text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full border ${activeColorClass} mb-2 inline-block`}>
                        {epoch.subtitle}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                        {epoch.title}
                      </h2>
                    </div>

                    <p className="text-xs sm:text-sm text-white/50 leading-relaxed">
                      {epoch.description}
                    </p>

                    {/* Cap tags */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {epoch.tags.map(t => (
                        <span key={t} className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/5 text-white/50 border border-white/5">
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Deployed Repositories */}
                    <div className="pt-4 space-y-2">
                      <h4 className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Featured Repositories</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {epoch.repos.map(rName => {
                          const rDetails = repos.find(r => r.name === rName)
                          if (!rDetails) return null
                          return (
                            <a
                              key={rName}
                              href={rDetails.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-3 rounded-xl bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all flex items-center justify-between"
                            >
                              <div className="min-w-0">
                                <div className="text-xs font-semibold font-mono text-white/90 truncate">{rName}</div>
                                <div className="text-[9px] text-white/40 uppercase tracking-widest mt-0.5">{rDetails.status}</div>
                              </div>
                              <Github className="w-3.5 h-3.5 text-white/30 shrink-0 ml-2" />
                            </a>
                          )
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: High quality visual preview */}
                  <div className="lg:col-span-6">
                    <div className="relative group rounded-2xl overflow-hidden border border-white/8 bg-white/[0.02] aspect-video">
                      <Image
                        src={epoch.image}
                        alt={epoch.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-102"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      {/* Frosted overlay */}
                      <div className="absolute inset-x-0 bottom-0 bg-black/60 backdrop-blur-md border-t border-white/5 p-4 flex justify-between items-center">
                        <div className="min-w-0">
                          <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest block">System Asset</span>
                          <span className="text-xs text-white font-mono truncate block">{epoch.image.split('/').pop()}</span>
                        </div>
                        <a
                          href={epoch.image}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-white/5 border border-white/5 text-white/60 hover:text-white transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* ─── Audio Waveform Component Section (Sound-paired Visual) ────── */}
        <div className="mt-28 border-t border-white/5 pt-16">
          <div className="max-w-2xl mx-auto">
            <GlowCard color="amber" className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                {/* Visual Audio Waveform */}
                <div className="flex items-end gap-1 h-12 w-full sm:w-auto shrink-0 order-2 sm:order-1 justify-center">
                  {[4, 8, 12, 16, 24, 20, 14, 8, 12, 16, 20, 24, 28, 20, 16, 12, 8, 4, 8, 12, 16, 20, 24, 18, 12, 8, 4].map((h, i) => (
                    <motion.div
                      key={i}
                      className="w-1 bg-amber-400/60 rounded-full"
                      animate={isPlaying ? { height: [4, h, 4] } : { height: 6 }}
                      transition={isPlaying ? {
                        duration: 1.2,
                        repeat: Infinity,
                        delay: i * 0.05,
                        ease: 'easeInOut'
                      } : {}}
                      style={{ height: 6 }}
                    />
                  ))}
                </div>

                {/* Track details & player control */}
                <div className="flex items-center gap-4 order-1 sm:order-2 w-full sm:w-auto justify-between">
                  <div className="text-left">
                    <div className="flex items-center gap-1.5 text-amber-400 mb-1">
                      <Volume2 className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-mono uppercase tracking-widest font-semibold">Sound of ACOS</span>
                    </div>
                    <h3 className="text-sm font-bold text-white font-mono leading-none">Chronicles (Synthwave Edit)</h3>
                    <p className="text-[10px] text-white/40 mt-1 font-mono">Catalog Track #84 · Suno AI v4.5</p>
                  </div>

                  <button
                    onClick={handlePlayToggle}
                    className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:bg-amber-400 hover:scale-105 active:scale-95 transition-all shadow-lg shrink-0"
                  >
                    {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                  </button>
                </div>
              </div>
            </GlowCard>
          </div>
        </div>
      </div>
    </div>
  )
}
