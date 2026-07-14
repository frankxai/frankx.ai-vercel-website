'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
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
  Sparkles,
  MapPin,
  GitPullRequest
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
  cluster: RepoCluster
  description: string
  status: RepoStatus
  priority: RepoPriority
  url: string
  deployed?: string
  tags: string[]
  updatedAt: string
}

// ─── Component ────────────────────────────────────────────────────────────
export default function MapHubPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [copiedRepo, setCopiedRepo] = useState<string | null>(null)

  const repos = useMemo(() => {
    return (manifestData.repos as Repo[]) || []
  }, [])

  // Filtered list for the Fast-Path Console
  const filteredRepos = useMemo(() => {
    if (!searchQuery) return repos.slice(0, 10) // Show first 10 by default
    return repos.filter(
      repo =>
        repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        repo.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        repo.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  }, [repos, searchQuery])

  // Stats
  const activeCount = repos.filter(r => r.status === 'shipping' || r.status === 'building').length
  const shippingCount = repos.filter(r => r.status === 'shipping').length
  const totalCount = repos.length

  const handleCopyClone = (repoName: string) => {
    const cmd = `git clone https://github.com/frankxai/${repoName}.git`
    navigator.clipboard.writeText(cmd)
    setCopiedRepo(repoName)
    setTimeout(() => setCopiedRepo(null), 2000)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-[#A9A9AA] font-sans antialiased selection:bg-emerald-500/25 selection:text-white">
      {/* Ambient background glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-600/5 rounded-full blur-[128px]" />
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-cyan-500/4 rounded-full blur-[128px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* ─── Hero Section ──────────────────────────────────────────────── */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/50 mb-6">
            <Terminal className="w-3.5 h-3.5 text-purple-400" />
            <span>frankxai · GitHub Universe Map</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
            The{' '}
            <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              FrankX Universe
            </span>
          </h1>

          <p className="text-base sm:text-lg text-white/50 max-w-2xl mb-8 leading-relaxed">
            Everything being built across the FrankX creator ecosystem. Select from three distinct, high-fidelity approaches to navigate and inspect the codebase.
          </p>

          {/* Stats Bar */}
          <div className="flex flex-wrap gap-6 pt-4 border-t border-white/5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                <Github className="w-4 h-4 text-white/50" />
              </div>
              <div>
                <div className="text-lg font-bold text-white font-mono">{totalCount}</div>
                <div className="text-[10px] text-white/40 uppercase tracking-wider">Total Repos</div>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center">
                <Activity className="w-4 h-4 text-amber-400" />
              </div>
              <div>
                <div className="text-lg font-bold text-white font-mono">{activeCount}</div>
                <div className="text-[10px] text-white/40 uppercase tracking-wider">Active Now</div>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center">
                <Zap className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <div className="text-lg font-bold text-white font-mono">{shippingCount}</div>
                <div className="text-[10px] text-white/40 uppercase tracking-wider">Shipping</div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Approach Selection Grid ───────────────────────────────────── */}
        <section className="mb-20">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <h2 className="text-xs font-semibold text-white/70 uppercase tracking-wider font-mono">Select Visualization Approach</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* V1 Bento Grid Card */}
            <GlowCard color="emerald" href="/map/v1" className="p-6 flex flex-col justify-between h-full group">
              <div>
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-semibold block mb-3">
                  Approach v1
                </span>
                <h3 className="text-lg font-bold text-white mb-2 font-mono group-hover:text-emerald-400 transition-colors">
                  Ecosystem Console
                </h3>
                <p className="text-xs text-white/50 leading-relaxed mb-6">
                  Interactive bento grid layout presenting repo clusters, live search, status filtering, and a sticky "GitHub Embed" details and clone panel.
                </p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-white/5 text-xs text-white/30 group-hover:text-white/60 transition-colors font-mono">
                <span>Launch Console</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </GlowCard>

            {/* V2 Node Graph Card */}
            <GlowCard color="cyan" href="/map/v2" className="p-6 flex flex-col justify-between h-full group">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-semibold block mb-3">
                  Approach v2
                </span>
                <h3 className="text-lg font-bold text-white mb-2 font-mono group-hover:text-cyan-400 transition-colors">
                  Strategic Node Graph
                </h3>
                <p className="text-xs text-white/50 leading-relaxed mb-6">
                  SVG mind-map / node graph visualizing active dependencies, data flows, and connections between codebases, tools, and platforms.
                </p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-white/5 text-xs text-white/30 group-hover:text-white/60 transition-colors font-mono">
                <span>Launch Node Graph</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </GlowCard>

            {/* V3 Timeline Card */}
            <GlowCard color="amber" href="/map/v3" className="p-6 flex flex-col justify-between h-full group">
              <div>
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-semibold block mb-3">
                  Approach v3
                </span>
                <h3 className="text-lg font-bold text-white mb-2 font-mono group-hover:text-amber-400 transition-colors">
                  Creator Chronicles
                </h3>
                <p className="text-xs text-white/50 leading-relaxed mb-6">
                  A widescreen cinematic scroll timeline showing development epochs from Arcanea lore to ACOS substrates to sovereign commercial products.
                </p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-white/5 text-xs text-white/30 group-hover:text-white/60 transition-colors font-mono">
                <span>Launch Timeline</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </GlowCard>
          </div>
        </section>

        {/* ─── Fast-Path Console ─────────────────────────────────────────── */}
        <section className="bg-white/[0.01] border border-white/5 rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">Fast-Path Console</h3>
              </div>
              <p className="text-xs text-white/45">Quickly query repositories and copy clone scripts without loading visualization maps.</p>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white/[0.02] border border-white/8 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-emerald-500/40 transition-colors text-xs"
              />
            </div>
          </div>

          <div className="border border-white/5 rounded-xl overflow-hidden bg-black/40">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-white/5 bg-white/[0.02] text-white/40">
                    <th className="px-4 py-3 font-semibold">Repository</th>
                    <th className="px-4 py-3 font-semibold">Cluster</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                    <th className="px-4 py-3 font-semibold text-right">Clone / Github</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.03]">
                  {filteredRepos.map((repo) => (
                    <tr key={repo.name} className="hover:bg-white/[0.01] transition-colors">
                      <td className="px-4 py-3">
                        <span className="font-semibold text-white">{repo.name}</span>
                        <p className="text-[10px] text-white/30 font-sans mt-0.5 line-clamp-1">{repo.description}</p>
                      </td>
                      <td className="px-4 py-3 text-white/40 uppercase tracking-widest text-[9px]">{repo.cluster}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded-full border border-white/10 bg-white/5 text-white/60">
                          {repo.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleCopyClone(repo.name)}
                            className="px-2 py-1 rounded bg-white/5 border border-white/5 text-white/60 hover:text-white transition-all flex items-center gap-1.5 text-[10px]"
                            title="Copy clone command"
                          >
                            {copiedRepo === repo.name ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span className="text-emerald-400">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                          <a
                            href={repo.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 rounded bg-white/5 border border-white/5 text-white/40 hover:text-white transition-all"
                          >
                            <Github className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {searchQuery && filteredRepos.length === 0 && (
            <div className="text-center py-8 text-white/35 text-xs font-mono">No matching repositories found.</div>
          )}
          {!searchQuery && repos.length > 10 && (
            <div className="text-right mt-3">
              <Link href="/map/v1" className="text-[10px] font-mono text-emerald-400 hover:text-emerald-300 underline">
                View all {repos.length} repositories in Ecosystem Console
              </Link>
            </div>
          )}
        </section>

        {/* ACOS Core CTA */}
        <section className="mt-16 p-6 rounded-2xl border border-emerald-400/20 bg-emerald-400/5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-semibold text-emerald-400">Install ACOS</span>
              </div>
              <p className="text-white/60 text-sm">The agentic operating system substrate powering this entire ecosystem.</p>
            </div>
            <code className="px-4 py-2.5 rounded-lg bg-black/40 border border-white/10 text-xs text-emerald-300 font-mono whitespace-nowrap shrink-0">
              git clone github.com/frankxai/agentic-creator-os
            </code>
          </div>
        </section>

        {/* Footer Navigation */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-wrap gap-6 text-xs text-white/40">
          <Link href="/sprint" className="hover:text-white transition-colors">Current Sprint</Link>
          <Link href="/roadmap" className="hover:text-white transition-colors">Roadmap</Link>
          <Link href="/changelog" className="hover:text-white transition-colors">Changelog</Link>
          <a href="https://github.com/frankxai" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
        </div>
      </div>
    </div>
  )
}
