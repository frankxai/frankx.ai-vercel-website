'use client'

import { useMemo } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  MarkerType,
  type Node,
  type Edge,
  type NodeProps,
  Handle,
  Position,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { cn } from '@/lib/utils'
import { Database, Server, Shield, Cpu, Cloud, Layers, Network, Zap, Box, Workflow } from 'lucide-react'

// Component type from blueprint data
interface BlueprintComponent {
  id: string
  name: string
  type: string
  description: string
  cloudService?: string
}

interface BlueprintFlow {
  id: string
  from: string
  to: string
  label?: string
  dataType?: string
}

// Node type for ReactFlow
type ArchitectureNodeType =
  | 'compute'
  | 'database'
  | 'ai-service'
  | 'gateway'
  | 'storage'
  | 'queue'
  | 'cache'
  | 'external'

interface ArchitectureNodeData extends Record<string, unknown> {
  label: string
  type: ArchitectureNodeType
  description?: string
  technology?: string
}

// Map component types to node types
function getNodeType(componentType: string): ArchitectureNodeType {
  const typeMap: Record<string, ArchitectureNodeType> = {
    'compute': 'compute',
    'database': 'database',
    'ai-service': 'ai-service',
    'gateway': 'gateway',
    'storage': 'storage',
    'queue': 'queue',
    'cache': 'cache',
    'external': 'external',
    // Fallbacks
    'service': 'compute',
    'llm': 'ai-service',
    'ai': 'ai-service',
    'vector': 'database',
  }
  return typeMap[componentType.toLowerCase()] || 'compute'
}

// Custom node component with glassmorphic styling
function ArchitectureNode({ data, selected }: NodeProps<Node<ArchitectureNodeData>>) {
  const iconMap: Record<ArchitectureNodeType, typeof Server> = {
    compute: Server,
    database: Database,
    'ai-service': Cpu,
    gateway: Shield,
    storage: Layers,
    queue: Workflow,
    cache: Zap,
    external: Cloud,
  }

  const colorMap: Record<ArchitectureNodeType, { bg: string; border: string; icon: string }> = {
    compute: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', icon: 'text-cyan-400' },
    database: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', icon: 'text-emerald-400' },
    'ai-service': { bg: 'bg-rose-500/10', border: 'border-rose-500/30', icon: 'text-rose-400' },
    gateway: { bg: 'bg-violet-500/10', border: 'border-violet-500/30', icon: 'text-violet-400' },
    storage: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', icon: 'text-blue-400' },
    queue: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', icon: 'text-orange-400' },
    cache: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', icon: 'text-amber-400' },
    external: { bg: 'bg-slate-500/10', border: 'border-slate-500/30', icon: 'text-slate-400' },
  }

  const Icon = iconMap[data.type] || Server
  const colors = colorMap[data.type] || colorMap.compute

  return (
    <div
      className={cn(
        'px-4 py-3 rounded-xl border backdrop-blur-sm transition-all min-w-[160px] max-w-[200px]',
        colors.bg,
        colors.border,
        selected && 'ring-2 ring-white/50 scale-105'
      )}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-white/30 !border-white/50 !w-3 !h-3"
      />
      <Handle
        type="target"
        position={Position.Left}
        className="!bg-white/30 !border-white/50 !w-3 !h-3"
      />

      <div className="flex items-start gap-3">
        <div className={cn('p-2 rounded-lg bg-black/30 shrink-0', colors.icon)}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <div className="font-semibold text-white text-sm leading-tight">{data.label}</div>
          {data.technology && (
            <div className="text-[10px] text-white/60 mt-0.5 truncate">{data.technology}</div>
          )}
        </div>
      </div>

      {data.description && (
        <div className="mt-2 text-[10px] text-white/50 border-t border-white/10 pt-2 line-clamp-2">
          {data.description}
        </div>
      )}

      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-white/30 !border-white/50 !w-3 !h-3"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="!bg-white/30 !border-white/50 !w-3 !h-3"
      />
    </div>
  )
}

const nodeTypes = {
  architecture: ArchitectureNode,
}

// Auto-layout algorithm for positioning nodes
function calculateNodePositions(components: BlueprintComponent[], flows: BlueprintFlow[]) {
  // Build adjacency map
  const incoming: Record<string, string[]> = {}
  const outgoing: Record<string, string[]> = {}

  components.forEach(c => {
    incoming[c.id] = []
    outgoing[c.id] = []
  })

  flows.forEach(f => {
    if (outgoing[f.from]) outgoing[f.from].push(f.to)
    if (incoming[f.to]) incoming[f.to].push(f.from)
  })

  // Find roots (nodes with no incoming edges)
  const roots = components.filter(c => incoming[c.id]?.length === 0)

  // BFS to assign levels
  const levels: Record<string, number> = {}
  const queue = roots.map(r => r.id)
  queue.forEach(id => { levels[id] = 0 })

  while (queue.length > 0) {
    const current = queue.shift()!
    const currentLevel = levels[current] || 0

    outgoing[current]?.forEach(target => {
      if (levels[target] === undefined || levels[target] < currentLevel + 1) {
        levels[target] = currentLevel + 1
        if (!queue.includes(target)) queue.push(target)
      }
    })
  }

  // Group by level
  const levelGroups: Record<number, string[]> = {}
  Object.entries(levels).forEach(([id, level]) => {
    if (!levelGroups[level]) levelGroups[level] = []
    levelGroups[level].push(id)
  })

  // Assign positions
  const positions: Record<string, { x: number; y: number }> = {}
  const xGap = 250
  const yGap = 150

  Object.entries(levelGroups).forEach(([levelStr, ids]) => {
    const level = parseInt(levelStr)
    const startY = -((ids.length - 1) * yGap) / 2

    ids.forEach((id, index) => {
      positions[id] = {
        x: level * xGap + 50,
        y: startY + index * yGap + 200,
      }
    })
  })

  // Handle unpositioned nodes
  components.forEach((c, i) => {
    if (!positions[c.id]) {
      positions[c.id] = { x: 50, y: i * yGap + 50 }
    }
  })

  return positions
}

interface BlueprintDiagramProps {
  components: BlueprintComponent[]
  flows: BlueprintFlow[]
  title?: string
  className?: string
}

export function BlueprintDiagram({ components, flows, title, className }: BlueprintDiagramProps) {
  const { nodes, edges } = useMemo(() => {
    if (!components || components.length === 0) {
      return { nodes: [], edges: [] }
    }

    const positions = calculateNodePositions(components, flows || [])

    const nodes: Node<ArchitectureNodeData>[] = components.map((component) => ({
      id: component.id,
      type: 'architecture',
      position: positions[component.id] || { x: 0, y: 0 },
      data: {
        label: component.name,
        type: getNodeType(component.type),
        description: component.description,
        technology: component.cloudService,
      },
    }))

    const edges: Edge[] = (flows || []).map((flow) => ({
      id: flow.id,
      source: flow.from,
      target: flow.to,
      label: flow.label,
      animated: true,
      markerEnd: { type: MarkerType.ArrowClosed, color: '#64748b' },
      style: { stroke: '#64748b', strokeWidth: 2 },
      labelStyle: { fill: '#94a3b8', fontSize: 11, fontWeight: 500 },
      labelBgStyle: { fill: '#0f172a', fillOpacity: 0.9 },
      labelBgPadding: [6, 4] as [number, number],
      labelBgBorderRadius: 4,
    }))

    return { nodes, edges }
  }, [components, flows])

  if (nodes.length === 0) {
    return (
      <div className={cn('rounded-2xl border border-white/10 bg-slate-900/80 p-8 text-center', className)}>
        <Box className="mx-auto h-12 w-12 text-slate-500 mb-4" />
        <p className="text-slate-400">No architecture diagram available</p>
      </div>
    )
  }

  return (
    <div className={cn('rounded-2xl border border-white/10 bg-slate-900/80 overflow-hidden', className)}>
      {title && (
        <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
          <h4 className="font-medium text-white">{title}</h4>
          <span className="text-xs text-slate-500">Drag nodes to explore • Scroll to zoom</span>
        </div>
      )}
      <div className="h-[500px]">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.3 }}
          attributionPosition="bottom-left"
          proOptions={{ hideAttribution: true }}
          className="bg-transparent"
          minZoom={0.3}
          maxZoom={1.5}
        >
          <Background color="#1e293b" gap={20} size={1} />
          <Controls className="!bg-slate-800/90 !border-white/10 !rounded-lg [&>button]:!bg-slate-700 [&>button]:!border-white/10 [&>button]:!text-white [&>button:hover]:!bg-slate-600" />
          <MiniMap
            className="!bg-slate-800/90 !border-white/10 !rounded-lg"
            nodeColor={(node) => {
              const colors: Record<string, string> = {
                'ai-service': '#f43f5e',
                database: '#10b981',
                compute: '#06b6d4',
                gateway: '#8b5cf6',
                cache: '#f59e0b',
                storage: '#3b82f6',
                external: '#64748b',
                queue: '#f97316',
              }
              return colors[(node.data as ArchitectureNodeData)?.type] || '#64748b'
            }}
          />
        </ReactFlow>
      </div>

      {/* Legend */}
      <div className="px-4 py-3 border-t border-white/10 flex flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-cyan-500" />
          <span className="text-xs text-slate-400">Compute</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-emerald-500" />
          <span className="text-xs text-slate-400">Database</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-rose-500" />
          <span className="text-xs text-slate-400">AI Service</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-violet-500" />
          <span className="text-xs text-slate-400">Gateway</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-amber-500" />
          <span className="text-xs text-slate-400">Cache</span>
        </div>
      </div>
    </div>
  )
}

export default BlueprintDiagram
