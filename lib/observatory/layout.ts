/**
 * Agent Observatory — deterministic graph layout (no physics deps).
 *
 * Turns a Catalog into positioned React Flow nodes/edges for a given view.
 * Pure + framework-agnostic so the showcase and the live monitor share it.
 */

import type { Node as RFNode, Edge as RFEdge } from '@xyflow/react'
import { MarkerType } from '@xyflow/react'
import type { Catalog, CatalogNode, NodeKind, ObservatoryView } from './types'
import { kindColor, kindLabel, withAlpha } from './theme'

const CELL_W = 188
const CELL_H = 56
const COL_GAP = 16
const ROW_GAP = 14
const BAND_GAP = 96
const MAX_COLS = 9

const KIND_ORDER: NodeKind[] = ['agent', 'skill', 'command', 'workflow', 'iam-profile']

export interface LayoutResult {
  rfNodes: RFNode[]
  rfEdges: RFEdge[]
  bands: { key: string; label: string; color: string; count: number; y: number }[]
}

/** Group nodes into ordered "bands" depending on the active view. */
function bandKey(node: CatalogNode, view: ObservatoryView): string {
  if (view === 'groups') return `${node.kind}::${node.group}`
  return node.kind
}

function bandLabel(key: string, view: ObservatoryView): string {
  if (view === 'groups') {
    const [kind, group] = key.split('::')
    return `${kindLabel[kind as NodeKind]} · ${group}`
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

  let nodes = catalog.nodes.filter((n) => visibleKinds.has(n.kind))
  if (view === 'workflows') nodes = catalog.nodes.filter((n) => n.kind === 'workflow')

  const matches = (n: CatalogNode) =>
    !q ||
    n.name.toLowerCase().includes(q) ||
    n.description.toLowerCase().includes(q) ||
    n.group.toLowerCase().includes(q) ||
    (n.keywords || []).some((k) => k.toLowerCase().includes(q))

  // Group into bands
  const bandMap = new Map<string, CatalogNode[]>()
  for (const n of nodes) {
    const key = bandKey(n, view)
    if (!bandMap.has(key)) bandMap.set(key, [])
    bandMap.get(key)!.push(n)
  }

  // Order bands: by kind order, then by size desc within groups view
  const orderedKeys = [...bandMap.keys()].sort((a, b) => {
    const ka = (view === 'groups' ? a.split('::')[0] : a) as NodeKind
    const kb = (view === 'groups' ? b.split('::')[0] : b) as NodeKind
    const oa = KIND_ORDER.indexOf(ka)
    const ob = KIND_ORDER.indexOf(kb)
    if (oa !== ob) return oa - ob
    return (bandMap.get(b)!.length - bandMap.get(a)!.length)
  })

  const rfNodes: RFNode[] = []
  const bands: LayoutResult['bands'] = []
  let y = 0

  for (const key of orderedKeys) {
    const group = bandMap.get(key)!
    const kind = (view === 'groups' ? key.split('::')[0] : key) as NodeKind
    const color = kindColor[kind]
    const cols = Math.min(MAX_COLS, Math.max(1, group.length))
    const rows = Math.ceil(group.length / cols)
    const bandWidth = cols * (CELL_W + COL_GAP)
    const xOffset = -bandWidth / 2

    bands.push({ key, label: bandLabel(key, view), color, count: group.length, y })

    group.forEach((n, i) => {
      const col = i % cols
      const row = Math.floor(i / cols)
      const dim = q !== '' && !matches(n)
      rfNodes.push({
        id: n.id,
        type: 'observatory',
        position: {
          x: xOffset + col * (CELL_W + COL_GAP),
          y: y + row * (CELL_H + ROW_GAP),
        },
        data: { node: n, dim, active: false },
      })
    })

    y += rows * (CELL_H + ROW_GAP) + BAND_GAP
  }

  // Edges — only those whose endpoints are both present
  const present = new Set(rfNodes.map((n) => n.id))
  const rfEdges: RFEdge[] = catalog.edges
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
        type: 'smoothstep',
        animated: view === 'workflows',
        style: { stroke: withAlpha(stroke, 0.35), strokeWidth: 1.2 },
        markerEnd: { type: MarkerType.ArrowClosed, color: withAlpha(stroke, 0.45), width: 14, height: 14 },
      }
    })

  return { rfNodes, rfEdges, bands }
}
