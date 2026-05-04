'use client'

import { useMemo, useState, useEffect, Suspense, lazy } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { Search, Layers, Network, Box, Sun, List as ListIcon, Map as MapIcon } from 'lucide-react'
import Link from 'next/link'
import type { SitemapGraph, SitemapView } from '@/lib/sitemap/types'
import ListView from './views/ListView'

const GraphView = lazy(() => import('./views/GraphView.client'))
const SunburstView = lazy(() => import('./views/SunburstView.client'))

const VIEWS: Array<{ id: SitemapView; label: string; icon: React.ReactNode }> = [
  { id: 'list', label: 'List', icon: <ListIcon className="w-3.5 h-3.5" /> },
  { id: 'graph', label: 'Graph', icon: <Layers className="w-3.5 h-3.5" /> },
  { id: 'network', label: 'Network', icon: <Network className="w-3.5 h-3.5" /> },
  { id: '3d', label: '3D Swarm', icon: <Box className="w-3.5 h-3.5" /> },
  { id: 'sunburst', label: 'Sunburst', icon: <Sun className="w-3.5 h-3.5" /> },
]

const KNOWN_VIEWS: SitemapView[] = ['list', 'graph', 'network', '3d', 'sunburst']

export default function SitemapHub({ graph }: { graph: SitemapGraph }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const initialView = (searchParams?.get('view') as SitemapView | null) || 'graph'
  const view: SitemapView = KNOWN_VIEWS.includes(initialView) ? initialView : 'graph'

  const [search, setSearch] = useState('')
  const [activeCategories, setActiveCategories] = useState<Set<string>>(new Set())

  function setView(next: SitemapView) {
    const params = new URLSearchParams(searchParams?.toString() ?? '')
    params.set('view', next)
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  function toggleCategory(cat: string) {
    setActiveCategories((prev) => {
      const next = new Set(prev)
      if (next.has(cat)) next.delete(cat)
      else next.add(cat)
      return next
    })
  }

  // Filter graph based on active categories + search
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    const catFilter = activeCategories.size === 0 ? null : activeCategories

    const nodes = graph.nodes.filter((n) => {
      if (catFilter && !catFilter.has(n.category)) return false
      if (!q) return true
      return (
        n.label.toLowerCase().includes(q) ||
        (n.route?.toLowerCase().includes(q) ?? false) ||
        (n.imagePath?.toLowerCase().includes(q) ?? false)
      )
    })
    const nodeIds = new Set(nodes.map((n) => n.id))
    const links = graph.links.filter((l) => nodeIds.has(l.source) && nodeIds.has(l.target))
    return { nodes, links }
  }, [graph, search, activeCategories])

  return (
    <div className="min-h-screen">
      {/* Ambient aurora — matches /map vibe */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-600/[0.05] rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-violet-500/[0.04] rounded-full blur-3xl" />
      </div>

      <div className="relative">
        {/* ── Header ───────────────────────────────────────────────────── */}
        <header className="border-b border-white/5 bg-[#0a0a0b]/80 backdrop-blur sticky top-0 z-20">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/50 mb-2">
                  <MapIcon className="w-3 h-3 text-cyan-400" />
                  <span>The Network · {graph.stats.totalRoutes} routes · {graph.stats.totalImages} images</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Sitemap{' '}
                  <span className="text-white/40 font-normal">— every page, every image, connected</span>
                </h1>
              </div>

              {/* Cross-link to /map (repo universe) */}
              <div className="flex items-center gap-3">
                <Link
                  href="/map"
                  className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-white/80 transition-colors"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Repo Universe →</span>
                </Link>
              </div>
            </div>

            {/* View switcher + search */}
            <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-center">
              <div className="flex flex-wrap gap-1 p-1 rounded-lg bg-white/[0.03] border border-white/5 w-fit">
                {VIEWS.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setView(v.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-all ${
                      view === v.id
                        ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/20'
                        : 'text-white/50 hover:text-white/80 hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    {v.icon}
                    <span>{v.label}</span>
                  </button>
                ))}
              </div>

              <div className="flex-1 relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" />
                <input
                  type="text"
                  placeholder="Search routes or images…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-cyan-500/40 transition-colors"
                />
              </div>
            </div>

            {/* Category chips */}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {graph.categories.slice(0, 16).map((c) => {
                const active = activeCategories.has(c.key)
                return (
                  <button
                    key={c.key}
                    onClick={() => toggleCategory(c.key)}
                    className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium border transition-all ${
                      active
                        ? 'border-white/30 bg-white/10 text-white'
                        : 'border-white/10 bg-white/[0.02] text-white/50 hover:border-white/20 hover:bg-white/[0.05] hover:text-white/80'
                    }`}
                    style={active ? { borderColor: c.color, color: c.color } : undefined}
                    aria-pressed={active}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: c.color }}
                      aria-hidden
                    />
                    <span>{c.label}</span>
                    <span className="text-white/30">{c.routeCount + c.imageCount}</span>
                  </button>
                )
              })}
              {activeCategories.size > 0 && (
                <button
                  onClick={() => setActiveCategories(new Set())}
                  className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium border border-white/10 bg-white/[0.02] text-white/40 hover:text-white/70"
                >
                  Clear ({activeCategories.size})
                </button>
              )}
            </div>
          </div>
        </header>

        {/* ── View body ─────────────────────────────────────────────────── */}
        <main className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6">
          {view === 'list' && <ListView graph={filtered} categories={graph.categories} />}
          {view === 'graph' && (
            <Suspense fallback={<GraphLoadingState />}>
              <GraphView graph={filtered} stats={graph.stats} />
            </Suspense>
          )}
          {view === 'network' && (
            <Suspense fallback={<GraphLoadingState />}>
              <GraphView graph={filtered} stats={graph.stats} layout="network" />
            </Suspense>
          )}
          {view === '3d' && <ComingSoonView label="3D Swarm" detail="Three.js galaxy view — Phase 2." />}
          {view === 'sunburst' && (
            <Suspense fallback={<GraphLoadingState />}>
              <SunburstView graph={filtered} />
            </Suspense>
          )}
        </main>
      </div>
    </div>
  )
}

function GraphLoadingState() {
  return (
    <div className="flex items-center justify-center min-h-[60vh] text-white/40 text-sm">
      <div className="text-center">
        <div className="inline-block w-8 h-8 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mb-3" />
        <p>Rendering network…</p>
      </div>
    </div>
  )
}

function ComingSoonView({ label, detail }: { label: string; detail: string }) {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/50 mb-4">
          <Box className="w-3 h-3" />
          <span>Coming in Phase 2</span>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">{label}</h2>
        <p className="text-white/50 text-sm">{detail}</p>
      </div>
    </div>
  )
}
