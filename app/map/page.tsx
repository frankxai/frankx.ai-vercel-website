import { createMetadata } from '@/lib/seo'
import Link from 'next/link'
import {
  Github, ExternalLink, ArrowRight, Zap, Package,
  Globe, Wrench, FlaskConical, Star, Activity,
  GitBranch, ChevronRight, Terminal, Layers
} from 'lucide-react'
import {
  getClusters,
  getReposByCluster,
  getTopPriority,
  getManifest,
  CLUSTER_COLORS,
  STATUS_COLORS,
  type Repo,
  type RepoCluster,
} from '@/lib/repos'

export const metadata = createMetadata({
  title: 'Universe Map | FrankX',
  description: 'The complete map of the FrankX ecosystem — 50+ repos across 6 clusters. From Arcanea to ACOS to Products.',
  path: '/map',
})

// ─── Cluster icons ────────────────────────────────────────────────────────

const CLUSTER_ICONS: Record<RepoCluster, React.ReactNode> = {
  arcanea:         <Layers className="w-4 h-4" />,
  acos:            <Zap className="w-4 h-4" />,
  websites:        <Globe className="w-4 h-4" />,
  'creator-tools': <Wrench className="w-4 h-4" />,
  products:        <Package className="w-4 h-4" />,
  research:        <FlaskConical className="w-4 h-4" />,
}

// ─── Repo Card ────────────────────────────────────────────────────────────

function RepoCard({ repo }: { repo: Repo }) {
  const status = STATUS_COLORS[repo.status]
  const cluster = CLUSTER_COLORS[repo.cluster]

  return (
    <div className={`group relative rounded-xl border bg-white/[0.02] p-4 transition-all hover:bg-white/[0.04] hover:border-white/10 ${cluster.border}`}>
      {/* Priority indicator */}
      {(repo.priority === 'critical' || repo.priority === 'high') && (
        <div className={`absolute top-0 left-0 w-1 h-full rounded-l-xl ${repo.priority === 'critical' ? 'bg-red-400/60' : 'bg-amber-400/40'}`} />
      )}

      <div className="pl-1">
        {/* Header row */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className={`inline-flex items-center gap-1 shrink-0 text-[10px] font-medium px-1.5 py-0.5 rounded-full border ${status.badge}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
              {status.label}
            </span>
            {repo.private && (
              <span className="text-[10px] text-white/30 font-mono">private</span>
            )}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {repo.deployed && (
              <a
                href={repo.deployed}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/30 hover:text-white/70 transition-colors"
                aria-label={`${repo.name} live site`}
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <a
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/30 hover:text-white/70 transition-colors"
              aria-label={`${repo.name} on GitHub`}
            >
              <Github className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Repo name */}
        <h3 className="font-semibold text-sm text-white/90 mb-1 font-mono leading-tight">
          {repo.name}
        </h3>

        {/* Description */}
        {repo.description && (
          <p className="text-xs text-white/50 leading-relaxed line-clamp-2 mb-2">
            {repo.description}
          </p>
        )}

        {/* Milestone pill */}
        {repo.milestone && (
          <div className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full border ${cluster.badge}`}>
            <GitBranch className="w-2.5 h-2.5" />
            {repo.milestone}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Cluster section ──────────────────────────────────────────────────────

function ClusterSection({ clusterId }: { clusterId: RepoCluster }) {
  const clusters = getClusters()
  const config = clusters.find(c => c.id === clusterId)
  if (!config) return null

  const repos = getReposByCluster(clusterId)
  const colors = CLUSTER_COLORS[clusterId]
  const icon = CLUSTER_ICONS[clusterId]

  const active = repos.filter(r => r.status === 'shipping' || r.status === 'building').length

  return (
    <section>
      {/* Cluster header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-lg ${colors.bg} ${colors.accent}`}>
            {icon}
          </div>
          <div>
            <h2 className={`font-bold text-sm ${colors.accent}`}>{config.name}</h2>
            <p className="text-xs text-white/40">{config.tagline}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs text-white/40">
          {active > 0 && (
            <span className="flex items-center gap-1">
              <Activity className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-400">{active} active</span>
            </span>
          )}
          <span>{repos.length} repos</span>
        </div>
      </div>

      {/* Repo grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {repos.map(repo => (
          <RepoCard key={repo.name} repo={repo} />
        ))}
      </div>
    </section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────

export default function MapPage() {
  const manifest = getManifest()
  const topPriority = getTopPriority(3)
  const clusters = getClusters()

  const activeCount = manifest.repos.filter(
    r => r.status === 'shipping' || r.status === 'building'
  ).length
  const shippingCount = manifest.repos.filter(r => r.status === 'shipping').length

  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      {/* Ambient aurora */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-600/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-cyan-500/4 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">

        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <div className="mb-12">
          {/* Label */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/50 mb-6">
            <Terminal className="w-3.5 h-3.5 text-purple-400" />
            <span>frankxai · GitHub Universe</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
            The{' '}
            <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              FrankX Universe
            </span>
          </h1>

          <p className="text-lg text-white/50 max-w-2xl mb-8">
            {manifest.totalRepos} repos across {clusters.length} clusters.
            From Arcanea to ACOS to Products — everything being built.
          </p>

          {/* Stats bar */}
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                <Github className="w-4 h-4 text-white/50" />
              </div>
              <div>
                <div className="text-xl font-bold text-white">{manifest.totalRepos}</div>
                <div className="text-xs text-white/40">Total repos</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center">
                <Activity className="w-4 h-4 text-amber-400" />
              </div>
              <div>
                <div className="text-xl font-bold text-white">{activeCount}</div>
                <div className="text-xs text-white/40">Active now</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center">
                <Zap className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <div className="text-xl font-bold text-white">{shippingCount}</div>
                <div className="text-xs text-white/40">Shipping</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-purple-400/10 border border-purple-400/20 flex items-center justify-center">
                <Layers className="w-4 h-4 text-purple-400" />
              </div>
              <div>
                <div className="text-xl font-bold text-white">{clusters.length}</div>
                <div className="text-xs text-white/40">Clusters</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Current Focus ─────────────────────────────────────────────── */}
        {topPriority.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-4 h-4 text-amber-400" />
              <h2 className="text-sm font-semibold text-white/70 uppercase tracking-wider">Current Focus</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {topPriority.map(repo => {
                const cluster = CLUSTER_COLORS[repo.cluster]
                const status = STATUS_COLORS[repo.status]
                return (
                  <a
                    key={repo.name}
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex flex-col gap-2 p-4 rounded-xl border bg-white/[0.03] hover:bg-white/[0.05] transition-all ${cluster.border}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-400/10 text-red-300 border border-red-400/20`}>
                        {repo.priority}
                      </span>
                      <span className={`inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full border ${status.badge}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                        {status.label}
                      </span>
                    </div>
                    <div>
                      <div className="font-mono text-sm font-semibold text-white/90 group-hover:text-white transition-colors">
                        {repo.name}
                      </div>
                      {repo.milestone && (
                        <div className={`text-xs mt-0.5 ${cluster.accent}`}>{repo.milestone}</div>
                      )}
                    </div>
                    {repo.description && (
                      <p className="text-xs text-white/40 line-clamp-2 leading-relaxed">
                        {repo.description}
                      </p>
                    )}
                    <div className="flex items-center gap-1 text-xs text-white/30 group-hover:text-white/50 transition-colors mt-auto">
                      <Github className="w-3 h-3" />
                      <span>frankxai/{repo.name}</span>
                      <ChevronRight className="w-3 h-3 ml-auto" />
                    </div>
                  </a>
                )
              })}
            </div>
          </section>
        )}

        {/* ── Cluster Grid ──────────────────────────────────────────────── */}
        <div className="space-y-12">
          {(['arcanea', 'acos', 'websites', 'creator-tools', 'products', 'research'] as RepoCluster[]).map(clusterId => (
            <ClusterSection key={clusterId} clusterId={clusterId} />
          ))}
        </div>

        {/* ── ACOS CTA ──────────────────────────────────────────────────── */}
        <section className="mt-16 p-6 rounded-2xl border border-emerald-400/20 bg-emerald-400/5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-semibold text-emerald-400">Install ACOS</span>
              </div>
              <p className="text-white/60 text-sm">The operating system that powers this entire ecosystem.</p>
            </div>
            <code className="px-4 py-2.5 rounded-lg bg-black/40 border border-white/10 text-xs text-emerald-300 font-mono whitespace-nowrap shrink-0">
              git clone github.com/frankxai/agentic-creator-os
            </code>
          </div>
        </section>

        {/* ── Nav links ─────────────────────────────────────────────────── */}
        <div className="mt-10 pt-8 border-t border-white/5 flex flex-wrap gap-6">
          {[
            { href: '/sprint', label: 'Current Sprint', icon: <Activity className="w-3.5 h-3.5" /> },
            { href: '/roadmap', label: 'Roadmap', icon: <GitBranch className="w-3.5 h-3.5" /> },
            { href: '/changelog', label: 'Changelog', icon: <Star className="w-3.5 h-3.5" /> },
            { href: 'https://github.com/frankxai', label: 'GitHub', icon: <Github className="w-3.5 h-3.5" />, external: true },
          ].map(({ href, label, icon, external }) => (
            external ? (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-white/40 hover:text-white/70 transition-colors"
              >
                {icon}
                <span>{label}</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            ) : (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-1.5 text-sm text-white/40 hover:text-white/70 transition-colors"
              >
                {icon}
                <span>{label}</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            )
          ))}
        </div>

        {/* Last updated */}
        <p className="mt-6 text-xs text-white/20 font-mono">
          Last synced: {manifest.lastUpdated} · Auto-updates every Monday via GitHub Actions
        </p>
      </div>
    </div>
  )
}
