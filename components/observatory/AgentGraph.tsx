'use client'

import { useEffect, useMemo } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  ConnectionLineType,
  type Node as RFNode,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import type { Catalog, CatalogNode, NodeKind, ObservatoryView } from '@/lib/observatory/types'
import { computeLayout } from '@/lib/observatory/layout'
import { kindColor, tierColor, palette } from '@/lib/observatory/theme'
import { ObservatoryNode } from './ObservatoryNode'

const nodeTypes = { observatory: ObservatoryNode }

interface AgentGraphProps {
  catalog: Catalog
  view: ObservatoryView
  visibleKinds: Set<NodeKind>
  query: string
  /** ids currently "live" (live-monitor surface) */
  activeIds?: Set<string>
  onSelect?: (node: CatalogNode | null) => void
  selectedId?: string | null
}

export function AgentGraph({
  catalog,
  view,
  visibleKinds,
  query,
  activeIds,
  onSelect,
  selectedId,
}: AgentGraphProps) {
  const layout = useMemo(
    () => computeLayout(catalog, view, visibleKinds, query),
    [catalog, view, visibleKinds, query],
  )

  const [nodes, setNodes, onNodesChange] = useNodesState(layout.rfNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(layout.rfEdges)

  // Re-layout when inputs change
  useEffect(() => {
    setNodes(layout.rfNodes)
    setEdges(layout.rfEdges)
  }, [layout, setNodes, setEdges])

  // Apply live-active flags without recomputing layout
  useEffect(() => {
    if (!activeIds) return
    setNodes((ns) =>
      ns.map((n) => ({
        ...n,
        data: { ...n.data, active: activeIds.has(n.id) },
      })),
    )
  }, [activeIds, setNodes])

  return (
    <div className="relative h-full w-full" style={{ background: palette.kraft }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={(_, n: RFNode) => onSelect?.((n.data as { node: CatalogNode }).node)}
        onPaneClick={() => onSelect?.(null)}
        connectionLineType={ConnectionLineType.SmoothStep}
        fitView
        fitViewOptions={{ padding: 0.15 }}
        minZoom={0.12}
        maxZoom={2}
        proOptions={{ hideAttribution: true }}
        nodesDraggable={false}
        nodesConnectable={false}
      >
        <Background color={palette.lineStrong} gap={28} size={1} />
        <Controls
          showInteractive={false}
          style={{
            background: 'rgba(38,36,28,0.9)',
            borderRadius: 10,
            border: `1px solid ${palette.line}`,
          }}
        />
        <MiniMap
          pannable
          zoomable
          nodeColor={(n) => {
            const node = (n.data as { node?: CatalogNode })?.node
            if (!node) return palette.clay
            return node.kind === 'agent' && node.tier ? tierColor[node.tier] : kindColor[node.kind]
          }}
          maskColor="rgba(24,23,18,0.82)"
          style={{ background: 'rgba(24,23,18,0.95)', borderRadius: 10, border: `1px solid ${palette.line}` }}
        />
      </ReactFlow>
    </div>
  )
}
