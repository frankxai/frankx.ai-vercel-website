'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Github,
  ExternalLink,
  Search,
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
  Copy,
  Check,
  ChevronRight,
  ArrowLeft,
  X,
  FileCode,
  Calendar,
  AlertCircle
} from 'lucide-react'
import { GlowCard } from '@/components/ui/glow-card'
import PremiumButton from '@/components/ui/PremiumButton'
import manifestData from '@/data/repos-manifest.json'

// ─── Types ────────────────────────────────────────────────────────────────
type RepoCluster = 'arcanea' | 'acos' | 'websites' | 'creator-tools' | 'products' | 'research'
type RepoStatus = 'shipping' | 'building' | 'stable' | 'exploring' | 'archived'
type RepoPriority = 'critical' | 'high' | 'medium' | 'low'

interface Repo {
  name: string
  org: string
  cluster: RepoCluster
  description: string
  status: RepoStatus
  priority: RepoPriority
  milestone?: string
  url: string
  deployed?: string
  tags: string[]
  updatedAt: string
  private: boolean
  stars?: number
  language?: string | null
  actionItem?: string
  notes?: string
}

// ─── Static mappings ──────────────────────────────────────────────────────
const CLUSTER_DETAILS: Record<RepoCluster, { name: string; accent: string; bg: string; border: string; glow: string; text: string; icon: React.ReactNode; layer: string }> = {
  arcanea: {
    name: 'Arcanea Creative Universe',
    accent: 'text-purple-400',
    bg: 'bg-purple-400/10',
    border: 'border-purple-400/20',
    glow: 'from-purple-600/10 to-transparent',
    text: 'text-purple-300',
    icon: <Layers className="w-5 h-5 text-purple-400" />,
    layer: 'L1 Intelligence & Lore'
  },
  acos: {
    name: 'Agentic Creator OS',
    accent: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
    border: 'border-emerald-400/20',
    glow: 'from-emerald-600/10 to-transparent',
    text: 'text-emerald-300',
    icon: <Zap className="w-5 h-5 text-emerald-400" />,
    layer: 'L3 Production & Substrates'
  },
  websites: {
    name: 'Websites & Portals',
    accent: 'text-cyan-400',
    bg: 'bg-cyan-400/10',
    border: 'border-cyan-400/20',
    glow: 'from-cyan-600/10 to-transparent',
    text: 'text-cyan-300',
    icon: <Globe className="w-5 h-5 text-cyan-400" />,
    layer: 'L5 Distribution & Frontends'
  },
  'creator-tools': {
    name: 'Creator Workflow Tools',
    accent: 'text-amber-400',
    bg: 'bg-amber-400/10',
    border: 'border-amber-400/20',
    glow: 'from-amber-600/10 to-transparent',
    text: 'text-amber-300',
    icon: <Wrench className="w-5 h-5 text-amber-400" />,
    layer: 'L3 Production & Automations'
  },
  products: {
    name: 'Commercial Products',
    accent: 'text-rose-400',
    bg: 'bg-rose-400/10',
    border: 'border-rose-400/20',
    glow: 'from-rose-600/10 to-transparent',
    text: 'text-rose-300',
    icon: <Package className="w-5 h-5 text-rose-400" />,
    layer: 'L5 Distribution & Revenue'
  },
  research: {
    name: 'AI Research Hubs',
    accent: 'text-sky-400',
    bg: 'bg-sky-400/10',
    border: 'border-sky-400/20',
    glow: 'from-sky-600/10 to-transparent',
    text: 'text-sky-300',
    icon: <FlaskConical className="w-5 h-5 text-sky-400" />,
    layer: 'L1 Intelligence & Studies'
  }
}

const STATUS_LABELS: Record<RepoStatus, { label: string; badge: string; dot: string }> = {
  shipping: { label: 'Shipping', badge: 'bg-emerald-400/10 text-emerald-300 border-emerald-400/20', dot: 'bg-emerald-400' },
  building: { label: 'Building', badge: 'bg-amber-400/10 text-amber-300 border-amber-400/20', dot: 'bg-amber-400' },
  stable: { label: 'Stable', badge: 'bg-sky-400/10 text-sky-300 border-sky-400/20', dot: 'bg-sky-400' },
  exploring: { label: 'Exploring', badge: 'bg-purple-400/10 text-purple-300 border-purple-400/20', dot: 'bg-purple-400' },
  archived: { label: 'Archived', badge: 'bg-white/5 text-white/45 border-white/10', dot: 'bg-white/30' }
}

const PRIORITY_LABELS: Record<RepoPriority, { label: string; badge: string }> = {
  critical: { label: 'Critical Priority', badge: 'bg-red-500/10 text-red-300 border-red-500/20' },
  high: { label: 'High Priority', badge: 'bg-amber-500/10 text-amber-300 border-amber-500/20' },
  medium: { label: 'Medium Priority', badge: 'bg-blue-500/10 text-blue-300 border-blue-500/20' },
  low: { label: 'Low Priority', badge: 'bg-white/5 text-white/40 border-white/10' }
}

// ─── Component ────────────────────────────────────────────────────────────
export default function MapV1Page() {
  const [search, setSearch] = useState('')
  const [selectedCluster, setSelectedCluster] = useState<RepoCluster | 'all'>('all')
  const [selectedStatus, setSelectedStatus] = useState<RepoStatus | 'all'>('all')
  const [copied, setCopied] = useState(false)

  // Grab the repos from the manifest JSON file directly
  const repos = useMemo(() => {
    return (manifestData.repos as Repo[]) || []
  }, [])

  // Set default active repo to the first high/critical priority repo
  const [activeRepoName, setActiveRepoName] = useState<string>(() => {
    const criticalRepo = repos.find(r => r.priority === 'critical' || r.priority === 'high')
    return criticalRepo ? criticalRepo.name : repos[0]?.name || ''
  })

  // Find the active repo details
  const activeRepo = useMemo(() => {
    return repos.find(r => r.name === activeRepoName) || repos[0]
  }, [repos, activeRepoName])

  // Filtered repos list
  const filteredRepos = useMemo(() => {
    return repos.filter(repo => {
      const matchesSearch =
        repo.name.toLowerCase().includes(search.toLowerCase()) ||
        repo.description.toLowerCase().includes(search.toLowerCase()) ||
        repo.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
      const matchesCluster = selectedCluster === 'all' || repo.cluster === selectedCluster
      const matchesStatus = selectedStatus === 'all' || repo.status === selectedStatus
      return matchesSearch && matchesCluster && matchesStatus
    })
  }, [repos, search, selectedCluster, selectedStatus])

  // Handle cloning copy
  const handleCopyClone = (repoName: string) => {
    const cmd = `git clone https://github.com/frankxai/${repoName}.git`
    navigator.clipboard.writeText(cmd)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Precomputed statistics
  const stats = useMemo(() => {
    const total = repos.length
    const shipping = repos.filter(r => r.status === 'shipping').length
    const building = repos.filter(r => r.status === 'building').length
    const critical = repos.filter(r => r.priority === 'critical').length
    return { total, shipping, building, critical }
  }, [repos])

  const activeClusterDetails = activeRepo ? CLUSTER_DETAILS[activeRepo.cluster] : null
  const activeStatusDetails = activeRepo ? STATUS_LABELS[activeRepo.status] : null
  const activePriorityDetails = activeRepo ? PRIORITY_LABELS[activeRepo.priority] : null

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-[#A9A9AA] font-sans antialiased selection:bg-emerald-500/25 selection:text-white">
      {/* Ambient background glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/5 rounded-full blur-[128px]" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-purple-600/3 rounded-full blur-[128px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/map"
            className="inline-flex items-center gap-2 text-xs font-mono text-white/45 hover:text-white/80 transition-colors uppercase tracking-widest"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Map Hub</span>
          </Link>
        </div>

        {/* ─── Header ────────────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 border-b border-white/5 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-400/5 border border-emerald-400/10 text-[10px] text-emerald-400 uppercase tracking-widest font-mono mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Approach v1: Interactive Bento</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white font-sans tracking-tight mb-2">
              Ecosystem Console
            </h1>
            <p className="text-sm text-white/50 max-w-2xl leading-relaxed">
              Explore 50+ repositories making up the FrankX ecosystem. Hover to inspect, filter by status, and instantly copy git deployment endpoints.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full md:w-auto">
            <div className="bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 min-w-[110px]">
              <div className="text-2xl font-bold text-white font-mono">{stats.total}</div>
              <div className="text-[10px] text-white/40 uppercase tracking-wider">Total Repos</div>
            </div>
            <div className="bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 min-w-[110px]">
              <div className="text-2xl font-bold text-emerald-400 font-mono">{stats.shipping}</div>
              <div className="text-[10px] text-white/40 uppercase tracking-wider">Shipping</div>
            </div>
            <div className="bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 min-w-[110px]">
              <div className="text-2xl font-bold text-amber-400 font-mono">{stats.building}</div>
              <div className="text-[10px] text-white/40 uppercase tracking-wider">Building</div>
            </div>
            <div className="bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 min-w-[110px]">
              <div className="text-2xl font-bold text-red-400/80 font-mono">{stats.critical}</div>
              <div className="text-[10px] text-white/40 uppercase tracking-wider">Critical</div>
            </div>
          </div>
        </div>

        {/* ─── Search & Filter Toolbar ───────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              placeholder="Search by name, description, tags..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/[0.02] border border-white/8 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-emerald-500/50 transition-colors text-sm"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={selectedCluster}
              onChange={(e) => setSelectedCluster(e.target.value as any)}
              className="px-4 py-3 bg-white/[0.02] border border-white/8 rounded-xl text-white/80 focus:outline-none focus:border-emerald-500/50 transition-colors text-xs font-mono"
            >
              <option value="all">All Clusters</option>
              <option value="arcanea">Arcanea</option>
              <option value="acos">ACOS</option>
              <option value="websites">Websites</option>
              <option value="creator-tools">Creator Tools</option>
              <option value="products">Products</option>
              <option value="research">Research</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as any)}
              className="px-4 py-3 bg-white/[0.02] border border-white/8 rounded-xl text-white/80 focus:outline-none focus:border-emerald-500/50 transition-colors text-xs font-mono"
            >
              <option value="all">All Statuses</option>
              <option value="shipping">Shipping</option>
              <option value="building">Building</option>
              <option value="stable">Stable</option>
              <option value="exploring">Exploring</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        {/* ─── Main Bento Layout ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Grid Area (Left) */}
          <div className="lg:col-span-8 space-y-8">
            {filteredRepos.length === 0 ? (
              <div className="text-center py-20 bg-white/[0.01] border border-white/5 rounded-2xl">
                <AlertCircle className="w-8 h-8 text-white/20 mx-auto mb-3" />
                <p className="text-white/40 text-sm">No repositories found matching current filters.</p>
                <button
                  onClick={() => { setSearch(''); setSelectedCluster('all'); setSelectedStatus('all') }}
                  className="mt-4 text-xs text-emerald-400 hover:text-emerald-300 font-mono underline"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AnimatePresence mode="popLayout">
                  {filteredRepos.map((repo) => {
                    const clDetails = CLUSTER_DETAILS[repo.cluster]
                    const stDetails = STATUS_LABELS[repo.status]
                    const isActive = repo.name === activeRepoName

                    return (
                      <motion.div
                        key={repo.name}
                        layout
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div
                          onMouseEnter={() => setActiveRepoName(repo.name)}
                          onClick={() => setActiveRepoName(repo.name)}
                          className={`relative p-5 rounded-2xl border transition-all duration-300 cursor-pointer h-full flex flex-col justify-between ${
                            isActive
                              ? 'bg-white/[0.04] border-white/20 [box-shadow:inset_0_1px_0_rgba(255,255,255,0.08)]'
                              : 'bg-white/[0.01] border-white/5 hover:border-white/10 hover:bg-white/[0.02]'
                          }`}
                        >
                          {/* Top row */}
                          <div className="flex justify-between items-start gap-2 mb-4">
                            <div className="flex items-center gap-2">
                              <span className={`p-1.5 rounded-lg bg-white/5 border border-white/5`}>
                                {clDetails?.icon}
                              </span>
                              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                                {repo.cluster}
                              </span>
                            </div>
                            <span className={`inline-flex items-center gap-1 text-[9px] px-2 py-0.5 rounded-full border font-mono ${stDetails?.badge}`}>
                              <span className={`w-1 h-1 rounded-full ${stDetails?.dot}`} />
                              {stDetails?.label}
                            </span>
                          </div>

                          {/* Info */}
                          <div className="mb-4">
                            <h3 className="text-sm font-semibold text-white font-mono mb-1.5 flex items-center gap-1.5">
                              {repo.name}
                              {repo.private && <span className="text-[9px] text-white/25 border border-white/5 px-1 py-0.2 rounded font-normal">private</span>}
                            </h3>
                            <p className="text-xs text-white/45 leading-relaxed line-clamp-2">
                              {repo.description}
                            </p>
                          </div>

                          {/* Footer */}
                          <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/[0.03]">
                            <span className="text-[9px] font-mono text-white/30">
                              Updated: {new Date(repo.updatedAt).toLocaleDateString()}
                            </span>
                            <div className="flex gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleCopyClone(repo.name)
                                }}
                                className="p-1 rounded bg-white/5 border border-white/5 text-white/40 hover:text-white/80 transition-colors"
                                title="Copy git clone"
                              >
                                <Copy className="w-3 h-3" />
                              </button>
                              <a
                                href={repo.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="p-1 rounded bg-white/5 border border-white/5 text-white/40 hover:text-white/80 transition-colors"
                              >
                                <Github className="w-3 h-3" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Sticky Detail Embed Panel (Right) */}
          <div className="lg:col-span-4 lg:sticky lg:top-10">
            {activeRepo ? (
              <GlowCard color={activeRepo.cluster === 'acos' ? 'emerald' : activeRepo.cluster === 'websites' ? 'cyan' : activeRepo.cluster === 'arcanea' ? 'violet' : activeRepo.cluster === 'products' ? 'rose' : activeRepo.cluster === 'creator-tools' ? 'amber' : 'blue'} className="p-6">
                <div className="relative">
                  {/* Decorative background aura based on cluster theme */}
                  <div className={`absolute -top-12 -right-12 w-24 h-24 bg-gradient-to-br ${activeClusterDetails?.glow} rounded-full blur-xl pointer-events-none`} />

                  {/* Header info */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`p-2 rounded-xl bg-white/5 border border-white/8`}>
                      {activeClusterDetails?.icon}
                    </div>
                    <div>
                      <h4 className="text-[10px] font-mono text-white/40 uppercase tracking-widest">{activeClusterDetails?.name}</h4>
                      <h2 className="text-lg font-bold text-white font-mono leading-tight">{activeRepo.name}</h2>
                    </div>
                  </div>

                  {/* Badges row */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className={`inline-flex items-center gap-1.5 text-[10px] px-2.5 py-1 rounded-full border font-mono ${activeStatusDetails?.badge}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${activeStatusDetails?.dot}`} />
                      {activeStatusDetails?.label}
                    </span>

                    {activePriorityDetails && (
                      <span className={`text-[10px] px-2.5 py-1 rounded-full border font-mono ${activePriorityDetails.badge}`}>
                        {activePriorityDetails.label}
                      </span>
                    )}

                    {activeRepo.milestone && (
                      <span className="text-[10px] px-2.5 py-1 rounded-full bg-white/5 border border-white/5 text-white/60 font-mono flex items-center gap-1">
                        <GitBranch className="w-3 h-3 text-purple-400" />
                        {activeRepo.milestone}
                      </span>
                    )}
                  </div>

                  {/* Detailed specs */}
                  <div className="space-y-4 mb-6">
                    <div>
                      <h5 className="text-[10px] font-mono text-white/30 uppercase tracking-wider mb-1">Architecture Layer</h5>
                      <div className="text-xs text-white/80 bg-white/[0.01] border border-white/[0.04] p-2.5 rounded-lg flex items-center justify-between">
                        <span>{activeClusterDetails?.layer}</span>
                        <Terminal className="w-3.5 h-3.5 text-white/20" />
                      </div>
                    </div>

                    <div>
                      <h5 className="text-[10px] font-mono text-white/30 uppercase tracking-wider mb-1">Description</h5>
                      <p className="text-xs text-white/60 leading-relaxed bg-white/[0.01] border border-white/[0.04] p-3 rounded-lg">
                        {activeRepo.description || 'No detailed description available.'}
                      </p>
                    </div>

                    {/* Copy Terminal Clone Command */}
                    <div>
                      <h5 className="text-[10px] font-mono text-white/30 uppercase tracking-wider mb-1">Clone Endpoint</h5>
                      <div className="flex items-center bg-black/40 border border-white/5 rounded-lg overflow-hidden p-1.5">
                        <code className="text-[10px] text-emerald-300 font-mono flex-1 overflow-x-auto whitespace-nowrap px-2">
                          git clone .../{activeRepo.name}
                        </code>
                        <button
                          onClick={() => handleCopyClone(activeRepo.name)}
                          className="px-2.5 py-1.5 rounded-md bg-white/5 border border-white/5 text-white/60 hover:text-white transition-colors"
                        >
                          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Tags list */}
                  {activeRepo.tags && activeRepo.tags.length > 0 && (
                    <div className="mb-6">
                      <h5 className="text-[10px] font-mono text-white/30 uppercase tracking-wider mb-2">Capabilities</h5>
                      <div className="flex flex-wrap gap-1">
                        {activeRepo.tags.map(tag => (
                          <span key={tag} className="text-[9px] font-mono bg-white/5 border border-white/5 px-2 py-0.5 rounded text-white/60">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Dependencies Mock Connections */}
                  <div className="mb-6 pt-4 border-t border-white/5">
                    <h5 className="text-[10px] font-mono text-white/30 uppercase tracking-wider mb-2">Dependency Links</h5>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-xs font-mono text-white/55">
                        <FileCode className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Requires: <Link href="/map/v1" onClick={() => setActiveRepoName('agentic-creator-os')} className="text-emerald-300 underline">agentic-creator-os</Link></span>
                      </div>
                      {activeRepo.cluster === 'arcanea' && activeRepo.name !== 'arcanea-core' && (
                        <div className="flex items-center gap-2 text-xs font-mono text-white/55">
                          <FileCode className="w-3.5 h-3.5 text-purple-400" />
                          <span>Requires: <Link href="/map/v1" onClick={() => setActiveRepoName('arcanea-core')} className="text-purple-300 underline">arcanea-core</Link></span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Launch actions */}
                  <div className="flex gap-3 pt-4 border-t border-white/5">
                    <PremiumButton
                      href={activeRepo.url}
                      variant="primary"
                      size="sm"
                      className="flex-1 text-xs"
                    >
                      <Github className="w-3.5 h-3.5 mr-1.5" />
                      View on GitHub
                    </PremiumButton>

                    {activeRepo.deployed && (
                      <PremiumButton
                        href={activeRepo.deployed}
                        variant="ghost"
                        size="sm"
                        className="flex-1 text-xs bg-white/5 hover:bg-white/10"
                      >
                        <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                        Live Demo
                      </PremiumButton>
                    )}
                  </div>
                </div>
              </GlowCard>
            ) : (
              <div className="p-6 bg-white/[0.01] border border-white/5 rounded-3xl text-center py-20">
                <p className="text-white/40 text-sm">Select or hover a repository to view rich console embeds.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
