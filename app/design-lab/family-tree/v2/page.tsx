'use client'

import { useCallback, useMemo } from 'react'
import Link from 'next/link'
import { ArrowLeft, MapPin } from 'lucide-react'
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  type Node,
  type Edge,
  type NodeTypes,
  Position,
  Handle,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { familyNodes, sideColors } from '@/lib/family-tree-data'
import type { FamilyNode } from '@/lib/family-tree-data'

// Custom node component
function FamilyNodeComponent({ data }: { data: FamilyNode }) {
  const colors = sideColors[data.side]
  return (
    <div
      className="rounded-xl border px-4 py-3 backdrop-blur-md transition-shadow hover:shadow-lg"
      style={{
        borderColor: `${colors.hex}40`,
        background: `linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))`,
        minWidth: 160,
      }}
    >
      <Handle type="target" position={Position.Top} className="!bg-white/20 !border-0 !w-2 !h-2" />
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-white">{data.name}</p>
          {data.bornName && <p className="text-[10px] text-white/25">{data.bornName}</p>}
        </div>
        <span
          className="flex-shrink-0 rounded-full px-2 py-0.5 text-[9px] font-medium"
          style={{ color: colors.hex, background: `${colors.hex}15` }}
        >
          {data.role}
        </span>
      </div>
      {data.location && (
        <div className="mt-1.5 flex items-center gap-1 text-[10px] text-white/25">
          <MapPin className="h-2.5 w-2.5" />
          {data.location}
        </div>
      )}
      {data.details && data.details.length > 0 && (
        <p className="mt-1.5 text-[10px] text-white/30">{data.details[0]}</p>
      )}
      <Handle type="source" position={Position.Bottom} className="!bg-white/20 !border-0 !w-2 !h-2" />
    </div>
  )
}

const nodeTypes: NodeTypes = {
  family: FamilyNodeComponent,
}

// Layout positions
const nodePositions: Record<string, { x: number; y: number }> = {
  'david-gorte': { x: 0, y: 0 },
  'dorothea-gorte': { x: 250, y: 0 },
  'alexander-riemer': { x: 600, y: 0 },
  'paulina-riemer': { x: 850, y: 0 },
  'dora-riemer': { x: 125, y: 220 },
  'witali-riemer': { x: 725, y: 220 },
  'frank-riemer': { x: 350, y: 440 },
  'tien': { x: 600, y: 440 },
}

export default function FamilyTreeV2() {
  const nodes: Node[] = useMemo(
    () =>
      familyNodes.map((n) => ({
        id: n.id,
        type: 'family',
        position: nodePositions[n.id] || { x: 0, y: 0 },
        data: n,
      })),
    []
  )

  const edges: Edge[] = useMemo(
    () => [
      // Spouse edges (dashed)
      { id: 'e-dg-dog', source: 'david-gorte', target: 'dorothea-gorte', type: 'straight', style: { stroke: '#f43f5e40', strokeDasharray: '5 5' }, animated: false },
      { id: 'e-ar-pr', source: 'alexander-riemer', target: 'paulina-riemer', type: 'straight', style: { stroke: '#f43f5e40', strokeDasharray: '5 5' } },
      { id: 'e-dr-wr', source: 'dora-riemer', target: 'witali-riemer', type: 'straight', style: { stroke: '#f43f5e40', strokeDasharray: '5 5' } },
      { id: 'e-fr-t', source: 'frank-riemer', target: 'tien', type: 'straight', style: { stroke: '#f43f5e40', strokeDasharray: '5 5' } },
      // Parent-child edges
      { id: 'e-dg-dr', source: 'david-gorte', target: 'dora-riemer', style: { stroke: '#f59e0b30' }, animated: true },
      { id: 'e-dog-dr', source: 'dorothea-gorte', target: 'dora-riemer', style: { stroke: '#f59e0b30' }, animated: true },
      { id: 'e-ar-wr', source: 'alexander-riemer', target: 'witali-riemer', style: { stroke: '#06b6d430' }, animated: true },
      { id: 'e-pr-wr', source: 'paulina-riemer', target: 'witali-riemer', style: { stroke: '#06b6d430' }, animated: true },
      { id: 'e-dr-fr', source: 'dora-riemer', target: 'frank-riemer', style: { stroke: '#10b98130' }, animated: true },
      { id: 'e-wr-fr', source: 'witali-riemer', target: 'frank-riemer', style: { stroke: '#10b98130' }, animated: true },
    ],
    []
  )

  return (
    <main className="flex h-screen flex-col bg-[#030712]">
      {/* Header */}
      <div className="flex-shrink-0 border-b border-white/5 px-6 py-4">
        <div className="flex items-center gap-4">
          <Link
            href="/design-lab/family-tree"
            className="inline-flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-white/60"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back
          </Link>
          <div className="h-4 w-px bg-white/10" />
          <span className="rounded-lg bg-cyan-500/10 px-3 py-1 text-xs font-mono font-bold text-cyan-400">V2</span>
          <h1 className="text-lg font-bold text-white">Interactive Flow</h1>
          <span className="text-xs text-white/30">Drag nodes, scroll to zoom, click + drag to pan</span>
        </div>
      </div>

      {/* React Flow Canvas */}
      <div className="flex-1">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.3 }}
          minZoom={0.3}
          maxZoom={2}
          defaultEdgeOptions={{ type: 'smoothstep' }}
          proOptions={{ hideAttribution: true }}
        >
          <Background color="#ffffff08" gap={20} size={1} />
          <Controls
            className="!bg-white/5 !border-white/10 !rounded-lg [&>button]:!bg-white/5 [&>button]:!border-white/10 [&>button]:!text-white/40 [&>button:hover]:!bg-white/10"
          />
          <MiniMap
            className="!bg-[#0a0f1a] !border-white/10 !rounded-lg"
            nodeColor={(node) => {
              const data = node.data as FamilyNode
              return sideColors[data.side]?.hex || '#ffffff'
            }}
            maskColor="rgba(0,0,0,0.7)"
          />
        </ReactFlow>
      </div>
    </main>
  )
}
