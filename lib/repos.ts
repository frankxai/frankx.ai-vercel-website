import manifestData from '@/data/repos-manifest.json'

// ─── Types ────────────────────────────────────────────────────────────────

export type RepoStatus = 'shipping' | 'building' | 'stable' | 'exploring' | 'archived'

export type RepoPriority = 'critical' | 'high' | 'medium' | 'low'

export type RepoCluster = 'arcanea' | 'acos' | 'websites' | 'creator-tools' | 'products' | 'research'

export interface Repo {
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

export interface ClusterConfig {
  id: RepoCluster
  name: string
  color: 'purple' | 'emerald' | 'cyan' | 'amber' | 'rose' | 'sky'
  count: number
  tagline: string
  description: string
}

export interface ReposManifest {
  version: string
  lastUpdated: string
  totalRepos: number
  clusters: ClusterConfig[]
  repos: Repo[]
}

// ─── Cluster color tokens ─────────────────────────────────────────────────

export const CLUSTER_COLORS: Record<RepoCluster, {
  accent: string
  bg: string
  border: string
  badge: string
  dot: string
}> = {
  arcanea: {
    accent: 'text-purple-400',
    bg: 'bg-purple-400/10',
    border: 'border-purple-400/20',
    badge: 'bg-purple-400/15 text-purple-300 border-purple-400/30',
    dot: 'bg-purple-400',
  },
  acos: {
    accent: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
    border: 'border-emerald-400/20',
    badge: 'bg-emerald-400/15 text-emerald-300 border-emerald-400/30',
    dot: 'bg-emerald-400',
  },
  websites: {
    accent: 'text-cyan-400',
    bg: 'bg-cyan-400/10',
    border: 'border-cyan-400/20',
    badge: 'bg-cyan-400/15 text-cyan-300 border-cyan-400/30',
    dot: 'bg-cyan-400',
  },
  'creator-tools': {
    accent: 'text-amber-400',
    bg: 'bg-amber-400/10',
    border: 'border-amber-400/20',
    badge: 'bg-amber-400/15 text-amber-300 border-amber-400/30',
    dot: 'bg-amber-400',
  },
  products: {
    accent: 'text-rose-400',
    bg: 'bg-rose-400/10',
    border: 'border-rose-400/20',
    badge: 'bg-rose-400/15 text-rose-300 border-rose-400/30',
    dot: 'bg-rose-400',
  },
  research: {
    accent: 'text-sky-400',
    bg: 'bg-sky-400/10',
    border: 'border-sky-400/20',
    badge: 'bg-sky-400/15 text-sky-300 border-sky-400/30',
    dot: 'bg-sky-400',
  },
}

// ─── Status color tokens ──────────────────────────────────────────────────

export const STATUS_COLORS: Record<RepoStatus, { badge: string; dot: string; label: string }> = {
  shipping: { badge: 'bg-emerald-400/15 text-emerald-300 border-emerald-400/30', dot: 'bg-emerald-400', label: 'Shipping' },
  building: { badge: 'bg-amber-400/15 text-amber-300 border-amber-400/30', dot: 'bg-amber-400', label: 'Building' },
  stable:   { badge: 'bg-sky-400/15 text-sky-300 border-sky-400/30', dot: 'bg-sky-400', label: 'Stable' },
  exploring: { badge: 'bg-purple-400/15 text-purple-300 border-purple-400/30', dot: 'bg-purple-400', label: 'Exploring' },
  archived: { badge: 'bg-white/5 text-white/30 border-white/10', dot: 'bg-white/20', label: 'Archived' },
}

// ─── Priority order ───────────────────────────────────────────────────────

const PRIORITY_ORDER: Record<RepoPriority, number> = {
  critical: 0,
  high: 1,
  medium: 2,
  low: 3,
}

// ─── Data access ─────────────────────────────────────────────────────────

const manifest = manifestData as unknown as ReposManifest

export function getManifest(): ReposManifest {
  // Return manifest with computed totalRepos (always accurate, not stale JSON value)
  return {
    ...manifest,
    totalRepos: manifest.repos.length,
  }
}

export function getClusters(): ClusterConfig[] {
  // Recompute counts dynamically so stale JSON values don't surface
  return manifest.clusters.map(c => ({
    ...c,
    count: (manifest.repos as Repo[]).filter(r => r.cluster === c.id).length,
  }))
}

export function getCluster(id: RepoCluster): ClusterConfig | undefined {
  return manifest.clusters.find(c => c.id === id)
}

export function getAllRepos(): Repo[] {
  return manifest.repos as Repo[]
}

export function getReposByCluster(cluster: RepoCluster): Repo[] {
  return (manifest.repos as Repo[]).filter(r => r.cluster === cluster)
}

export function getActiveRepos(): Repo[] {
  return (manifest.repos as Repo[]).filter(
    r => r.status === 'shipping' || r.status === 'building'
  )
}

export function getTopPriority(n = 3): Repo[] {
  return (manifest.repos as Repo[])
    .filter(r => r.priority === 'critical' || r.priority === 'high')
    .filter(r => r.status !== 'archived')
    .sort((a, b) => {
      const pa = PRIORITY_ORDER[a.priority]
      const pb = PRIORITY_ORDER[b.priority]
      if (pa !== pb) return pa - pb
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    })
    .slice(0, n)
}

export function getClusterStats(): Record<RepoCluster, { total: number; active: number; critical: number }> {
  const stats = {} as Record<RepoCluster, { total: number; active: number; critical: number }>
  for (const cluster of manifest.clusters) {
    const repos = getReposByCluster(cluster.id as RepoCluster)
    stats[cluster.id as RepoCluster] = {
      total: repos.length,
      active: repos.filter(r => r.status === 'shipping' || r.status === 'building').length,
      critical: repos.filter(r => r.priority === 'critical').length,
    }
  }
  return stats
}

export function getRepoByName(name: string): Repo | undefined {
  return (manifest.repos as Repo[]).find(r => r.name === name)
}

export function searchRepos(query: string): Repo[] {
  const q = query.toLowerCase()
  return (manifest.repos as Repo[]).filter(
    r =>
      r.name.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      r.tags.some(t => t.toLowerCase().includes(q)) ||
      (r.milestone?.toLowerCase().includes(q) ?? false)
  )
}

export function getPublicRepos(): Repo[] {
  return (manifest.repos as Repo[]).filter(r => !r.private)
}
