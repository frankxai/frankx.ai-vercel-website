import { createMetadata } from '@/lib/seo'
import Link from 'next/link'
import {
  Github, ExternalLink, AlertTriangle, Activity,
  GitBranch, Zap, Package, Globe, Wrench, FlaskConical,
  Layers, Star, Clock, Filter, Terminal, ChevronRight,
  ArrowUpRight, Lock, Eye
} from 'lucide-react'
import {
  getClusters,
  getAllRepos,
  getReposByCluster,
  getTopPriority,
  getManifest,
  getClusterStats,
  CLUSTER_COLORS,
  STATUS_COLORS,
  type Repo,
  type RepoCluster,
  type RepoPriority,
} from '@/lib/repos'

export const metadata = createMetadata({
  title: 'Repo Map Admin | FrankX',
  description: 'Private priority dashboard — all repos, action items, and status.',
  path: '/admin/map',
})

const PRIORITY_COLORS: Record<RepoPriority, string> = {
  critical: 'bg-red-400/15 text-red-300 border-red-400/30',
  high:     'bg-amber-400/15 text-amber-300 border-amber-400/30',
  medium:   'bg-cyan-400/15 text-cyan-300 border-cyan-400/30',
  low:      'bg-white/5 text-white/30 border-white/10',
}

const CLUSTER_ICONS: Record<RepoCluster, React.ReactNode> = {
  arcanea:         <Layers className="w-4 h-4" />,
  acos:            <Zap className="w-4 h-4" />,
  websites:        <Globe className="w-4 h-4" />,
  'creator-tools': <Wrench className="w-4 h-4" />,
  products:        <Package className="w-4 h-4" />,
  research:        <FlaskConical className="w-4 h-4" />,
}

// ─── Admin Repo Row ───────────────────────────────────────────────────────

function AdminRepoRow({ repo }: { repo: Repo }) {
  const status = STATUS_COLORS[repo.status]
  const cluster = CLUSTER_COLORS[repo.cluster]
  const priority = PRIORITY_COLORS[repo.priority]

  // Days since last push
  const daysSince = Math.floor(
    (Date.now() - new Date(repo.updatedAt).getTime()) / (1000 * 60 * 60 * 24)
  )
  const isStale = daysSince > 60 && (repo.status === 'building' || repo.status === 'shipping')

  return (
    <div className={`relative p-4 rounded-xl border bg-white/[0.02] hover:bg-white/[0.04] transition-all ${cluster.border} ${repo.priority === 'critical' ? 'ring-1 ring-red-400/20' : ''}`}>
      {/* Priority left bar */}
      <div className={`absolute top-0 left-0 w-0.5 h-full rounded-l-xl ${
        repo.priority === 'critical' ? 'bg-red-400' :
        repo.priority === 'high' ? 'bg-amber-400' :
        repo.priority === 'medium' ? 'bg-cyan-400/50' : 'bg-white/10'
      }`} />

      <div className="pl-3">
        {/* Top row */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Priority */}
            <span className={`text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full border ${priority}`}>
              {repo.priority}
            </span>
            {/* Status */}
            <span className={`inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full border ${status.badge}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
              {status.label}
            </span>
            {/* Private */}
            {repo.private && (
              <span className="inline-flex items-center gap-1 text-[10px] text-white/30 px-1.5 py-0.5 rounded-full border border-white/10">
                <Lock className="w-2.5 h-2.5" />
                private
              </span>
            )}
            {/* Stale warning */}
            {isStale && (
              <span className="inline-flex items-center gap-1 text-[10px] text-orange-300 px-1.5 py-0.5 rounded-full border border-orange-400/30 bg-orange-400/10">
                <AlertTriangle className="w-2.5 h-2.5" />
                stale {daysSince}d
              </span>
            )}
          </div>

          {/* Links */}
          <div className="flex items-center gap-2 shrink-0">
            {repo.deployed && (
              <a href={repo.deployed} target="_blank" rel="noopener noreferrer"
                className="text-white/30 hover:text-emerald-400 transition-colors" title="Live site">
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <a href={repo.url} target="_blank" rel="noopener noreferrer"
              className="text-white/30 hover:text-white/70 transition-colors" title="GitHub">
              <Github className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Repo name + cluster */}
        <div className="flex items-center gap-2 mb-1">
          <span className={`p-0.5 rounded ${cluster.bg} ${cluster.accent}`}>
            {CLUSTER_ICONS[repo.cluster]}
          </span>
          <h3 className="font-mono font-semibold text-sm text-white/90">{repo.name}</h3>
          <span className="text-xs text-white/20 font-mono">·</span>
          <span className={`text-[10px] ${cluster.accent}`}>{repo.cluster}</span>
        </div>

        {/* Description */}
        {repo.description && (
          <p className="text-xs text-white/50 leading-relaxed mb-2 line-clamp-2">{repo.description}</p>
        )}

        {/* Milestone */}
        {repo.milestone && (
          <div className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full border mb-2 ${cluster.badge}`}>
            <GitBranch className="w-2.5 h-2.5" />
            {repo.milestone}
          </div>
        )}

        {/* Action item */}
        {repo.actionItem && (
          <div className="flex items-start gap-1.5 mt-2 p-2 rounded-lg bg-amber-400/5 border border-amber-400/10">
            <ChevronRight className="w-3 h-3 text-amber-400 mt-0.5 shrink-0" />
            <span className="text-xs text-amber-200/70">{repo.actionItem}</span>
          </div>
        )}

        {/* Notes */}
        {repo.notes && (
          <div className="flex items-start gap-1.5 mt-1.5 p-2 rounded-lg bg-white/3 border border-white/5">
            <Eye className="w-3 h-3 text-white/30 mt-0.5 shrink-0" />
            <span className="text-xs text-white/40 italic">{repo.notes}</span>
          </div>
        )}

        {/* Footer: date, stars, language */}
        <div className="flex items-center gap-3 mt-2 text-[10px] text-white/25">
          <span className="flex items-center gap-1">
            <Clock className="w-2.5 h-2.5" />
            {repo.updatedAt}
          </span>
          {(repo.stars ?? 0) > 0 && (
            <span className="flex items-center gap-1">
              <Star className="w-2.5 h-2.5" />
              {repo.stars}
            </span>
          )}
          {repo.language && (
            <span className="text-white/20">{repo.language}</span>
          )}
          {repo.deployed && (
            <a href={repo.deployed} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-400/60 hover:text-emerald-400 transition-colors">
              <ArrowUpRight className="w-2.5 h-2.5" />
              {repo.deployed.replace('https://', '')}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Cluster panel ────────────────────────────────────────────────────────

function ClusterPanel({ clusterId }: { clusterId: RepoCluster }) {
  const clusters = getClusters()
  const config = clusters.find(c => c.id === clusterId)
  if (!config) return null

  const repos = getReposByCluster(clusterId)
  const colors = CLUSTER_COLORS[clusterId]
  const icon = CLUSTER_ICONS[clusterId]

  // Sort: critical → high → medium → low, then by updatedAt desc
  const sorted = [...repos].sort((a, b) => {
    const pOrder = { critical: 0, high: 1, medium: 2, low: 3 }
    const pa = pOrder[a.priority] ?? 4
    const pb = pOrder[b.priority] ?? 4
    if (pa !== pb) return pa - pb
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  })

  const criticalCount = repos.filter(r => r.priority === 'critical').length
  const activeCount = repos.filter(r => r.status === 'shipping' || r.status === 'building').length

  return (
    <section className={`p-5 rounded-2xl border ${colors.border} bg-white/[0.015]`}>
      {/* Cluster header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className={`p-2 rounded-lg ${colors.bg} ${colors.accent}`}>{icon}</div>
          <div>
            <h2 className={`font-bold text-base ${colors.accent}`}>{config.name}</h2>
            <p className="text-xs text-white/40">{config.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs">
          {criticalCount > 0 && (
            <span className="flex items-center gap-1 text-red-400">
              <AlertTriangle className="w-3 h-3" />
              {criticalCount} critical
            </span>
          )}
          {activeCount > 0 && (
            <span className="flex items-center gap-1 text-emerald-400">
              <Activity className="w-3 h-3" />
              {activeCount} active
            </span>
          )}
          <span className="text-white/30">{repos.length} total</span>
        </div>
      </div>

      {/* Repos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {sorted.map(repo => (
          <AdminRepoRow key={repo.name} repo={repo} />
        ))}
      </div>
    </section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────

export default function AdminMapPage() {
  const manifest = getManifest()
  const topPriority = getTopPriority(5)
  const clusterStats = getClusterStats()
  const allRepos = getAllRepos()

  const criticalRepos = allRepos.filter(r => r.priority === 'critical')
  const activeCount = allRepos.filter(r => r.status === 'shipping' || r.status === 'building').length
  const shippingCount = allRepos.filter(r => r.status === 'shipping').length

  return (
    <div className="min-h-screen bg-[#080809]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">

        {/* ── Header ───────────────────────────────────────────────────── */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Terminal className="w-4 h-4 text-purple-400" />
            <span className="text-xs text-white/40 font-mono">admin · universe-map</span>
            <span className="text-white/20">·</span>
            <span className="text-xs text-white/30 font-mono">last sync: {manifest.lastUpdated}</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Universe Map</h1>
          <p className="text-white/40 mb-6">Priority dashboard — all {manifest.totalRepos} repos, action items, and status.</p>

          {/* Overview stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Total Repos', value: manifest.totalRepos, color: 'white/60', icon: <Github className="w-3.5 h-3.5" /> },
              { label: 'Active', value: activeCount, color: 'amber-400', icon: <Activity className="w-3.5 h-3.5 text-amber-400" /> },
              { label: 'Shipping', value: shippingCount, color: 'emerald-400', icon: <Zap className="w-3.5 h-3.5 text-emerald-400" /> },
              { label: 'Critical', value: criticalRepos.length, color: 'red-400', icon: <AlertTriangle className="w-3.5 h-3.5 text-red-400" /> },
            ].map(stat => (
              <div key={stat.label} className="p-3 rounded-xl border border-white/8 bg-white/[0.03] flex items-center gap-3">
                <div className="p-1.5 rounded-lg bg-white/5">{stat.icon}</div>
                <div>
                  <div className={`text-xl font-bold text-${stat.color}`}>{stat.value}</div>
                  <div className="text-[11px] text-white/30">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Critical items ────────────────────────────────────────────── */}
        {criticalRepos.length > 0 && (
          <section className="mb-10 p-5 rounded-2xl border border-red-400/20 bg-red-400/3">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <h2 className="text-sm font-semibold text-red-400 uppercase tracking-wider">Critical Priority</h2>
              <span className="text-xs text-white/30">({criticalRepos.length} repos)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {criticalRepos.map(repo => (
                <div key={repo.name} className="p-3 rounded-xl border border-red-400/20 bg-black/20">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full border ${STATUS_COLORS[repo.status].badge}`}>
                      {STATUS_COLORS[repo.status].label}
                    </span>
                    <a href={repo.url} target="_blank" rel="noopener noreferrer"
                      className="text-white/30 hover:text-white/70">
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  </div>
                  <div className="font-mono text-sm text-white/90 font-semibold mb-0.5">{repo.name}</div>
                  {repo.milestone && (
                    <div className="text-xs text-red-300/70 mb-1">{repo.milestone}</div>
                  )}
                  {repo.actionItem && (
                    <div className="text-xs text-white/50 leading-relaxed">{repo.actionItem}</div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Cluster stats bar ─────────────────────────────────────────── */}
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <Filter className="w-3.5 h-3.5 text-white/40" />
            <h2 className="text-xs font-semibold text-white/40 uppercase tracking-wider">Cluster Overview</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {getClusters().map(cluster => {
              const stats = clusterStats[cluster.id as RepoCluster]
              const colors = CLUSTER_COLORS[cluster.id as RepoCluster]
              return (
                <div key={cluster.id} className={`p-3 rounded-xl border ${colors.border} ${colors.bg}`}>
                  <div className={`flex items-center gap-1.5 mb-1 ${colors.accent}`}>
                    {CLUSTER_ICONS[cluster.id as RepoCluster]}
                    <span className="text-[10px] font-semibold truncate">{cluster.name}</span>
                  </div>
                  <div className="text-xl font-bold text-white">{stats.total}</div>
                  <div className="text-[10px] text-white/40">
                    {stats.active > 0 && <span className="text-emerald-400">{stats.active} active · </span>}
                    {stats.critical > 0 && <span className="text-red-400">{stats.critical} crit</span>}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* ── Full cluster panels ───────────────────────────────────────── */}
        <div className="space-y-8">
          {(['arcanea', 'acos', 'websites', 'creator-tools', 'products', 'research'] as RepoCluster[]).map(clusterId => (
            <ClusterPanel key={clusterId} clusterId={clusterId} />
          ))}
        </div>

        {/* ── Footer nav ────────────────────────────────────────────────── */}
        <div className="mt-10 pt-6 border-t border-white/5 flex flex-wrap gap-6 text-sm">
          <Link href="/map" className="flex items-center gap-1.5 text-white/40 hover:text-white/70 transition-colors">
            <Globe className="w-3.5 h-3.5" />
            Public Map
          </Link>
          <Link href="/sprint" className="flex items-center gap-1.5 text-white/40 hover:text-white/70 transition-colors">
            <Activity className="w-3.5 h-3.5" />
            Sprint
          </Link>
          <Link href="/admin" className="flex items-center gap-1.5 text-white/40 hover:text-white/70 transition-colors">
            <Terminal className="w-3.5 h-3.5" />
            Admin Hub
          </Link>
          <a href="https://github.com/frankxai" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-white/40 hover:text-white/70 transition-colors">
            <Github className="w-3.5 h-3.5" />
            GitHub Org
          </a>
        </div>
      </div>
    </div>
  )
}
