'use client'

import { useCallback, useMemo, useState } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
  type Node,
  type Edge,
  type NodeProps,
  Handle,
  Position,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import Link from 'next/link'
import Image from 'next/image'
import { ExternalLink, X, Hash } from 'lucide-react'
import type { SitemapGraph, SitemapNode } from '@/lib/sitemap/types'

interface GraphViewProps {
  graph: { nodes: SitemapGraph['nodes']; links: SitemapGraph['links'] }
  stats: SitemapGraph['stats']
  layout?: 'graph' | 'network'
}

type RouteNodeData = {
  label: string
  route: string
  color: string
  category: string
  imageCount: number
  status: string
}

type ImageNodeData = {
  label: string
  imagePath: string
  color: string
  usageCount: number
  size: number
}

// ─── Custom node renderers ──────────────────────────────────────────────
function RouteNode({ data, selected }: NodeProps<Node<RouteNodeData>>) {
  return (
    <div
      className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-lg border backdrop-blur transition-all ${
        selected ? 'ring-2 ring-white/40' : ''
      }`}
      style={{
        backgroundColor: 'rgba(10, 10, 11, 0.85)',
        borderColor: data.color,
        boxShadow: `0 0 0 1px ${data.color}40, 0 4px 24px ${data.color}20`,
      }}
    >
      <Handle type="target" position={Position.Top} className="opacity-0" />
      <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: data.color }} />
      <code className="text-[11px] font-mono text-white/90 max-w-[200px] truncate">
        {data.label}
      </code>
      {data.imageCount > 0 && (
        <span className="text-[9px] text-white/40 shrink-0">{data.imageCount}</span>
      )}
      <Handle type="source" position={Position.Bottom} className="opacity-0" />
    </div>
  )
}

function ImageNode({ data, selected }: NodeProps<Node<ImageNodeData>>) {
  const dim = Math.max(28, Math.min(72, data.size * 2))
  return (
    <div
      className={`group relative rounded-md overflow-hidden border transition-all ${
        selected ? 'ring-2 ring-white/40 scale-110' : ''
      }`}
      style={{
        width: dim,
        height: dim,
        borderColor: data.color + '60',
        boxShadow: `0 0 12px ${data.color}30`,
      }}
    >
      <Handle type="target" position={Position.Top} className="opacity-0" />
      <Image
        src={data.imagePath}
        alt={data.label}
        fill
        sizes={`${dim}px`}
        className="object-cover"
        unoptimized
        loading="lazy"
      />
      {data.usageCount > 1 && (
        <span className="absolute top-0.5 right-0.5 inline-flex items-center text-[8px] px-1 rounded bg-black/70 text-white/90 backdrop-blur-sm">
          <Hash className="w-2 h-2" />
          {data.usageCount}
        </span>
      )}
      <Handle type="source" position={Position.Bottom} className="opacity-0" />
    </div>
  )
}

const NODE_TYPES = { route: RouteNode, image: ImageNode }

// ─── Conversion helpers ─────────────────────────────────────────────────
function toReactFlow(
  nodes: SitemapNode[],
  links: SitemapGraph['links'],
  layout: 'graph' | 'network',
): { rfNodes: Node[]; rfEdges: Edge[] } {
  // For 'network' view, scale positions outward to spread the swarm
  const spread = layout === 'network' ? 1.4 : 1.0

  const rfNodes: Node[] = nodes.map((n) => {
    if (n.kind === 'image') {
      return {
        id: n.id,
        type: 'image',
        position: { x: n.position.x * spread, y: n.position.y * spread },
        data: {
          label: n.label,
          imagePath: n.imagePath || '',
          color: n.color,
          usageCount: n.usageCount || 0,
          size: n.size,
        } satisfies ImageNodeData,
        draggable: true,
      }
    }
    return {
      id: n.id,
      type: 'route',
      position: { x: n.position.x * spread, y: n.position.y * spread },
      data: {
        label: n.label,
        route: n.route || '/',
        color: n.color,
        category: n.category,
        imageCount: n.imageCount || 0,
        status: n.status || 'ok',
      } satisfies RouteNodeData,
      draggable: true,
    }
  })

  const rfEdges: Edge[] = links.map((l) => ({
    id: l.id,
    source: l.source,
    target: l.target,
    type: 'default',
    animated: false,
    style: {
      stroke: l.kind === 'shares-image' ? '#ffffff15' : '#ffffff10',
      strokeWidth: l.kind === 'shares-image' ? 1.5 : 0.7,
    },
  }))

  return { rfNodes, rfEdges }
}

// ─── Detail panel ───────────────────────────────────────────────────────
function DetailPanel({
  node,
  onClose,
}: {
  node: SitemapNode | null
  onClose: () => void
}) {
  if (!node) return null
  return (
    <aside className="absolute top-4 right-4 z-10 w-80 max-w-[90vw] rounded-xl border border-white/10 bg-[#0a0a0b]/95 backdrop-blur-xl shadow-2xl overflow-hidden">
      <header className="flex items-center justify-between p-3 border-b border-white/5">
        <span
          className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border"
          style={{ borderColor: node.color + '40', color: node.color }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: node.color }}
          />
          {node.kind}
        </span>
        <button
          onClick={onClose}
          className="text-white/40 hover:text-white transition-colors"
          aria-label="Close detail"
        >
          <X className="w-4 h-4" />
        </button>
      </header>

      {node.kind === 'image' && node.imagePath && (
        <div className="relative aspect-[16/9] bg-black/50">
          <Image
            src={node.imagePath}
            alt={node.label}
            fill
            sizes="320px"
            className="object-contain"
            unoptimized
          />
        </div>
      )}

      <div className="p-3 space-y-2 text-sm">
        <p className="font-mono text-white text-xs break-all">{node.label}</p>
        <p className="text-white/50 text-xs">
          Category: <span className="text-white/80">{node.category}</span>
        </p>
        {node.kind === 'route' && node.imageCount !== undefined && (
          <p className="text-white/50 text-xs">
            Images on this page: <span className="text-white/80">{node.imageCount}</span>
          </p>
        )}
        {node.kind === 'image' && node.sizeKB !== undefined && (
          <p className="text-white/50 text-xs">
            Size: <span className="text-white/80">{node.sizeKB} KB</span>
          </p>
        )}
        {node.kind === 'image' && node.usageCount !== undefined && node.usageCount > 0 && (
          <p className="text-white/50 text-xs">
            Used on: <span className="text-white/80">{node.usageCount} page(s)</span>
          </p>
        )}
        {node.kind === 'image' && node.mood && node.mood !== 'unknown' && (
          <p className="text-white/50 text-xs">
            Mood: <span className="text-white/80">{node.mood}</span>
          </p>
        )}
      </div>

      {node.kind === 'route' && node.route && (
        <Link
          href={node.route}
          className="flex items-center justify-center gap-1.5 px-3 py-2.5 border-t border-white/5 bg-white/[0.02] hover:bg-white/5 text-white text-xs font-medium transition-colors"
        >
          <span>Open page</span>
          <ExternalLink className="w-3 h-3" />
        </Link>
      )}
      {node.kind === 'image' && node.imagePath && (
        <a
          href={node.imagePath}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 px-3 py-2.5 border-t border-white/5 bg-white/[0.02] hover:bg-white/5 text-white text-xs font-medium transition-colors"
        >
          <span>Open image</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      )}
    </aside>
  )
}

// ─── Main view ──────────────────────────────────────────────────────────
function GraphViewInner({ graph, stats, layout = 'graph' }: GraphViewProps) {
  const [selected, setSelected] = useState<SitemapNode | null>(null)

  const { rfNodes, rfEdges } = useMemo(
    () => toReactFlow(graph.nodes, graph.links, layout),
    [graph.nodes, graph.links, layout],
  )

  // Index nodes by id for O(1) lookup on click
  const nodesById = useMemo(() => {
    const m = new Map<string, SitemapNode>()
    for (const n of graph.nodes) m.set(n.id, n)
    return m
  }, [graph.nodes])

  const onNodeClick = useCallback(
    (_e: React.MouseEvent, rfNode: Node) => {
      const n = nodesById.get(rfNode.id)
      if (n) setSelected(n)
    },
    [nodesById],
  )

  return (
    <div className="relative h-[calc(100vh-220px)] min-h-[520px] rounded-xl border border-white/5 overflow-hidden bg-[#050507]">
      <ReactFlow
        nodes={rfNodes}
        edges={rfEdges}
        nodeTypes={NODE_TYPES}
        onNodeClick={onNodeClick}
        fitView
        fitViewOptions={{ padding: 0.15, maxZoom: 1.0 }}
        minZoom={0.05}
        maxZoom={2.5}
        proOptions={{ hideAttribution: true }}
        // perf: only render in viewport for 731+ nodes
        onlyRenderVisibleElements
        nodesConnectable={false}
        nodesFocusable
        edgesFocusable={false}
      >
        <Background color="#ffffff08" gap={32} size={1} />
        <Controls className="!bg-[#0a0a0b]/80 !border-white/10 [&_button]:!bg-transparent [&_button]:!border-white/10 [&_button]:!text-white/70 hover:[&_button]:!text-white" />
        <MiniMap
          className="!bg-[#0a0a0b]/95 !border-white/10"
          maskColor="rgba(10,10,11,0.85)"
          nodeColor={(n) => (n.data as RouteNodeData | ImageNodeData).color}
          pannable
          zoomable
        />
      </ReactFlow>

      {/* Stats overlay */}
      <div className="absolute top-4 left-4 z-10 px-3 py-2 rounded-lg border border-white/10 bg-[#0a0a0b]/80 backdrop-blur text-xs text-white/60">
        <span className="font-mono">
          {graph.nodes.filter((n) => n.kind === 'route').length} routes ·{' '}
          {graph.nodes.filter((n) => n.kind === 'image').length} images ·{' '}
          {graph.links.length} connections
        </span>
      </div>

      <DetailPanel node={selected} onClose={() => setSelected(null)} />
    </div>
  )
}

export default function GraphView(props: GraphViewProps) {
  return (
    <ReactFlowProvider>
      <GraphViewInner {...props} />
    </ReactFlowProvider>
  )
}
