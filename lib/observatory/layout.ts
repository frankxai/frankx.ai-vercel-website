/**
 * Agent Observatory — deterministic constellation layout (no physics deps).
 *
 * Each group of nodes is laid out as a radial cluster (concentric rings, even
 * arc spacing so wide pills never overlap), and the clusters are packed into a
 * row (Galaxy) or a wrapped shelf grid (Pillars). A label node sits above each
 * cluster. Pure + framework-agnostic so the showcase and live monitor share it.
 */

import type { Node as RFNode, Edge as RFEdge } from '@xyflow/react'
import { MarkerType } from '@xyflow/react'
import type { Catalog, CatalogNode, NodeKind, ObservatoryView } from './types'
import { kindColor, kindLabel, withAlpha } from './theme'

const CELL_W = 168
const CELL_H = 46
const ARC = 190 // min arc length per node on a ring
const RING_GAP = 62
const R0 = 70
const CLUSTER_GAP = 140
const MAX_ROW_W = 2800

const KIND_ORDER: NodeKind[] = ['agent', 'skill', 'command', 'workflow', 'iam-profile']

export interface LayoutResult {
  rfNodes: RFNode[]
  rfEdges: RFEdge[]
}

/** Concentric-ring positions for n nodes around (0,0); returns positions + cluster radius. */
function ringPositions(n: number): { pts: { x: number; y: number }[]; radius: number } {
  const pts: { x: number; y: number }[] = []
  if (n === 1) return { pts: [{ x: 0, y: 0 }], radius: CELL_H }
  let placed = 0
  let ring = 0
  while (placed < n) {
    const r = R0 + ring * RING_GAP
    const cap = Math.max(ring === 0 ? 3 : 4, Math.floor((2 * Math.PI * r) / ARC))
    const count = Math.min(cap, n - placed)
    const phase = ring * 0.55 // rotate each ring for an organic, non-gridded feel
    for (let k = 0; k < count; k++) {
      const a = (2 * Math.PI * k) / count + phase
      pts.push({ x: Math.cos(a) * r, y: Math.sin(a) * r })
    }
    placed += count
    ring++
  }
  return { pts, radius: R0 + (ring - 1) * RING_GAP + CELL_H }
}

function bandKey(node: CatalogNode, view: ObservatoryView): string {
  if (view === 'groups') return `${node.kind}::${node.group}`
  return node.kind
}
function bandLabel(key: string, view: ObservatoryView): string {
  if (view === 'groups') {
    const [kind, group] = key.split('::')
    return `${group}`
  }
  return kindLabel[key as NodeKind] ?? key
}

export function computeLayout(
  catalog: Catalog,
  view: ObservatoryView,
  visibleKinds: Set<NodeKind>,
  query: string,
): LayoutResult {
  const q = query.trim().toLowerCase()

  let nodes = (catalog.nodes || []).filter((n) => visibleKinds.has(n.kind))
  if (view === 'workflows') nodes = (catalog.nodes || []).filter((n) => n.kind === 'workflow')

  const matches = (n: CatalogNode) =>
    !q ||
    (n.name ?? '').toLowerCase().includes(q) ||
    (n.description ?? '').toLowerCase().includes(q) ||
    (n.group ?? '').toLowerCase().includes(q) ||
    (n.keywords || []).some((k) => (k ?? '').toLowerCase().includes(q))

  // Group into clusters
  const clusterMap = new Map<string, CatalogNode[]>()
  for (const n of nodes) {
    const key = bandKey(n, view)
    if (!clusterMap.has(key)) clusterMap.set(key, [])
    clusterMap.get(key)!.push(n)
  }

  // Order: by kind, then size desc
  const orderedKeys = [...clusterMap.keys()].sort((a, b) => {
    const ka = (view === 'groups' ? a.split('::')[0] : a) as NodeKind
    const kb = (view === 'groups' ? b.split('::')[0] : b) as NodeKind
    const oa = KIND_ORDER.indexOf(ka)
    const ob = KIND_ORDER.indexOf(kb)
    if (oa !== ob) return oa - ob
    return clusterMap.get(b)!.length - clusterMap.get(a)!.length
  })

  // Precompute each cluster's radius
  const clusters = orderedKeys.map((key) => {
    const items = clusterMap.get(key)!
    const { pts, radius } = ringPositions(items.length)
    const kind = (view === 'groups' ? key.split('::')[0] : key) as NodeKind
    return { key, kind, items, pts, radius }
  })

  // Place clusters: Galaxy = single centered row; Pillars = wrapped shelf grid.
  const rfNodes: RFNode[] = []
  if (view === 'groups') {
    // shelf-pack clusters into rows
    const rows: { items: typeof clusters; width: number }[] = []
    let row: typeof clusters = []
    let rowW = 0
    for (const c of clusters) {
      const w = 2 * c.radius + CLUSTER_GAP
      if (rowW + w > MAX_ROW_W && row.length) {
        rows.push({ items: row, width: rowW })
        row = []
        rowW = 0
      }
      row.push(c)
      rowW += w
    }
    if (row.length) rows.push({ items: row, width: rowW })
    let y = 0
    for (const r of rows) {
      const maxR = Math.max(...r.items.map((c) => c.radius))
      let cx = -r.width / 2
      for (const c of r.items) {
        cx += c.radius + CLUSTER_GAP / 2
        placeCluster(rfNodes, c, cx, y + maxR, view, q, matches)
        cx += c.radius + CLUSTER_GAP / 2
      }
      y += maxR * 2 + CLUSTER_GAP + 40
    }
  } else {
    const totalW = clusters.reduce((s, c) => s + 2 * c.radius + CLUSTER_GAP, -CLUSTER_GAP)
    let cx = -totalW / 2
    for (const c of clusters) {
      cx += c.radius
      placeCluster(rfNodes, c, cx, 0, view, q, matches)
      cx += c.radius + CLUSTER_GAP
    }
  }

  // Edges between present nodes
  const present = new Set(rfNodes.filter((n) => n.type === 'observatory').map((n) => n.id))
  const rfEdges: RFEdge[] = (catalog.edges || [])
    .filter((e) => present.has(e.source) && present.has(e.target))
    .map((e, i) => {
      const stroke =
        e.rel === 'uses-skill'
          ? kindColor.skill
          : e.rel === 'composes'
          ? kindColor.workflow
          : kindColor.command
      return {
        id: `e${i}`,
        source: e.source,
        target: e.target,
        type: 'straight',
        animated: view === 'workflows',
        style: { stroke: withAlpha(stroke, 0.22), strokeWidth: 1 },
        markerEnd: { type: MarkerType.ArrowClosed, color: withAlpha(stroke, 0.3), width: 12, height: 12 },
      }
    })

  return { rfNodes, rfEdges }
}

function placeCluster(
  out: RFNode[],
  c: { key: string; kind: NodeKind; items: CatalogNode[]; pts: { x: number; y: number }[]; radius: number },
  cx: number,
  cy: number,
  view: ObservatoryView,
  q: string,
  matches: (n: CatalogNode) => boolean,
) {
  // Cluster label node (non-interactive)
  out.push({
    id: `label:${c.key}`,
    type: 'clusterLabel',
    position: { x: cx - 90, y: cy - c.radius - 46 },
    data: { label: bandLabel(c.key, view), color: kindColor[c.kind], count: c.items.length },
    draggable: false,
    selectable: false,
  })
  c.items.forEach((n, i) => {
    const p = c.pts[i]
    const dim = q !== '' && !matches(n)
    out.push({
      id: n.id,
      type: 'observatory',
      position: { x: cx + p.x - CELL_W / 2, y: cy + p.y - CELL_H / 2 },
      data: { node: n, dim, active: false },
    })
  })
}
