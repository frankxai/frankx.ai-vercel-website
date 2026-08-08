'use client'

import { useMemo, useState } from 'react'
import graphData from '@/content/v0/knowledge-graph.json'

// --- Types (subset of knowledge-graph.json we render) ---------------------
type RawNode = {
  id: string
  name: string
  author?: string
  url: string
  category: string
  stack: string[]
  designSignals: string
  ratingSignal: string
  domainFit: string[]
}
type RawEdge = { from: string; to: string; type: string }
const graph = graphData as unknown as { nodes: RawNode[]; edges: RawEdge[] }

// --- Derivations -----------------------------------------------------------
function parseForks(signal: string): number {
  const m = signal.match(/([\d.]+)(K)?\s*(?:duplicates|forks)/i)
  if (!m) return 0
  let n = parseFloat(m[1])
  if (m[2]) n *= 1000
  return Math.round(n)
}
function isSoul(domainFit: string[]): boolean {
  const first = domainFit?.[0]
  return first === 'creator-os' || first === 'music'
}
const BUCKET: Record<string, string> = {
  'AI apps': 'AI',
  'AI agents': 'AI',
  SaaS: 'Landing',
  Dashboards: 'Dashboards',
  'Dashboards (marketing ops)': 'Dashboards',
  'Landing pages': 'Landing',
  'E-commerce': 'Commerce',
  Portfolio: 'Portfolio',
  Animations: 'Creative',
  'Creative/interactive': 'Creative',
  'Apps & Games (creative/interactive)': 'Creative',
  'Login & Sign Up': 'Auth',
}
const CLUSTERS: Record<string, { x: number; y: number; label: string }> = {
  AI: { x: 250, y: 210, label: 'AI apps & agents' },
  Dashboards: { x: 600, y: 168, label: 'Dashboards' },
  Landing: { x: 884, y: 250, label: 'Landing & SaaS' },
  Commerce: { x: 762, y: 520, label: 'E-commerce' },
  Portfolio: { x: 380, y: 542, label: 'Portfolio' },
  Creative: { x: 150, y: 420, label: 'Creative & games' },
  Auth: { x: 520, y: 398, label: 'Auth' },
}
const W = 1080
const H = 690

const EDGE_COLOR: Record<string, string> = {
  upgradeOf: 'rgba(52,211,153,0.55)', // emerald — the upgrade relationship (the moat)
  sharesPattern: 'rgba(255,255,255,0.14)',
  sameStack: 'rgba(255,255,255,0.10)',
  inspiredBy: 'rgba(251,191,36,0.35)', // amber
}

type Placed = RawNode & { x: number; y: number; r: number; soul: boolean; forks: number }

export default function V0KnowledgeGraph() {
  const [active, setActive] = useState<string | null>(null)

  const { nodes, edges, maxForks } = useMemo(() => {
    const maxForks = Math.max(...graph.nodes.map((n) => parseForks(n.ratingSignal)), 1)
    const logMax = Math.log10(maxForks + 1)

    // group by cluster
    const groups: Record<string, RawNode[]> = {}
    for (const n of graph.nodes) {
      const b = BUCKET[n.category] ?? 'Creative'
      ;(groups[b] ??= []).push(n)
    }
    // sort each cluster by forks desc so big nodes sit near the center
    const placed: Placed[] = []
    for (const [bucket, list] of Object.entries(groups)) {
      const c = CLUSTERS[bucket] ?? CLUSTERS.Auth
      const sorted = [...list].sort((a, b) => parseForks(b.ratingSignal) - parseForks(a.ratingSignal))
      sorted.forEach((n, i) => {
        // phyllotaxis (sunflower) placement — organic, non-overlapping
        const angle = i * 2.399963 // golden angle
        const dist = 15 * Math.sqrt(i)
        const forks = parseForks(n.ratingSignal)
        const r = 6 + 18 * (Math.log10(forks + 1) / logMax)
        placed.push({
          ...n,
          x: c.x + dist * Math.cos(angle),
          y: c.y + dist * Math.sin(angle),
          r,
          forks,
          soul: isSoul(n.domainFit),
        })
      })
    }
    const byId = new Map(placed.map((p) => [p.id, p]))
    const edges = graph.edges
      .map((e) => ({ ...e, a: byId.get(e.from), b: byId.get(e.to) }))
      .filter((e) => e.a && e.b) as (RawEdge & { a: Placed; b: Placed })[]
    return { nodes: placed, edges, maxForks }
  }, [])

  const neighbors = useMemo(() => {
    const set = new Set<string>()
    if (active) {
      for (const e of edges) {
        if (e.from === active) set.add(e.to)
        if (e.to === active) set.add(e.from)
      }
    }
    return set
  }, [active, edges])

  const activeNode = active ? nodes.find((n) => n.id === active) ?? null : null
  const dimmed = (id: string) => active !== null && id !== active && !neighbors.has(id)

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-6">
      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-label={`Knowledge graph of ${nodes.length} v0 templates connected by ${edges.length} shared patterns, stacks, and upgrade relationships.`}
          className="h-auto w-full min-w-[720px]"
          onMouseLeave={() => setActive(null)}
        >
          {/* edges */}
          <g>
            {edges.map((e, i) => {
              const touches = active === e.from || active === e.to
              const faded = active !== null && !touches
              const mx = (e.a.x + e.b.x) / 2
              const my = (e.a.y + e.b.y) / 2 - 24
              return (
                <path
                  key={i}
                  d={`M ${e.a.x} ${e.a.y} Q ${mx} ${my} ${e.b.x} ${e.b.y}`}
                  fill="none"
                  stroke={touches ? 'rgba(52,211,153,0.7)' : EDGE_COLOR[e.type] ?? 'rgba(255,255,255,0.1)'}
                  strokeWidth={touches ? 1.6 : 1}
                  className="transition-opacity duration-200 motion-reduce:transition-none"
                  style={{ opacity: faded ? 0.06 : 1 }}
                />
              )
            })}
          </g>
          {/* cluster labels */}
          <g>
            {Object.values(CLUSTERS).map((c) => (
              <text
                key={c.label}
                x={c.x}
                y={c.y - 66}
                textAnchor="middle"
                className="fill-white/30"
                style={{ fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600 }}
              >
                {c.label}
              </text>
            ))}
          </g>
          {/* nodes */}
          <g>
            {nodes.map((n) => {
              const fill = n.soul ? '#fbbf24' : '#34d399'
              return (
                <a
                  key={n.id}
                  href={n.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${n.name} by ${n.author ?? 'unknown'} — ${n.forks ? n.forks.toLocaleString() + ' forks' : 'unranked'}. Open on v0.`}
                  onMouseEnter={() => setActive(n.id)}
                  onFocus={() => setActive(n.id)}
                  className="cursor-pointer focus:outline-none"
                >
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={n.r}
                    fill={fill}
                    stroke={active === n.id ? '#fff' : 'rgba(0,0,0,0.35)'}
                    strokeWidth={active === n.id ? 2 : 1}
                    className="transition-opacity duration-200 motion-reduce:transition-none"
                    style={{ opacity: dimmed(n.id) ? 0.18 : active === n.id || neighbors.has(n.id) ? 1 : 0.82 }}
                  />
                </a>
              )
            })}
          </g>
        </svg>
      </div>

      {/* legend + detail readout */}
      <div className="mt-4 grid gap-4 border-t border-white/5 pt-4 sm:grid-cols-[1fr_auto] sm:items-center">
        <div aria-live="polite" className="min-h-[3rem]">
          {activeNode ? (
            <div>
              <div className="flex flex-wrap items-baseline gap-x-2">
                <span className="text-sm font-semibold text-white">{activeNode.name}</span>
                <span className="text-xs text-white/40">by {activeNode.author ?? 'unknown'}</span>
                <span className={`text-xs font-medium ${activeNode.soul ? 'text-amber-300' : 'text-emerald-300'}`}>
                  · {activeNode.forks ? `${activeNode.forks.toLocaleString()} forks` : 'unranked'}
                </span>
              </div>
              <p className="mt-1 text-xs leading-relaxed text-white/50">{activeNode.designSignals}</p>
              <p className="mt-1 text-[11px] text-white/35">{activeNode.stack.join(' · ')}</p>
            </div>
          ) : (
            <p className="text-xs text-white/40">
              Hover a node to inspect a template. Node size = real v0 fork count · color = spectrum fit ·
              green links = <span className="text-emerald-300">upgrade paths</span>. Click to open on v0.
            </p>
          )}
        </div>
        <div className="flex items-center gap-4 text-[11px] text-white/45">
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: '#34d399' }} /> Tech
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: '#fbbf24' }} /> Soul
          </span>
        </div>
      </div>
    </div>
  )
}
