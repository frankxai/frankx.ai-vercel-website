'use client'

import { useCallback, useMemo, useState, useEffect, useRef } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Panel,
  useNodesState,
  useEdgesState,
  MarkerType,
  type Node,
  type Edge,
  type NodeProps,
  Handle,
  Position,
  BackgroundVariant,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { cn } from '@/lib/utils'
import {
  Database,
  Server,
  Shield,
  Cpu,
  Cloud,
  Layers,
  Zap,
  Box,
  Workflow,
  Play,
  Pause,
  RotateCcw,
  Maximize2,
  Info,
  X,
  DollarSign,
  ExternalLink,
} from 'lucide-react'

// ═══════════════════════════════════════════════════════════════════════════════
// TYPE DEFINITIONS
// ═══════════════════════════════════════════════════════════════════════════════

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
  isHighlighted?: boolean
  isInFlowPath?: boolean
  componentId?: string
}

// ═══════════════════════════════════════════════════════════════════════════════
// CONSTANTS & MAPPINGS
// ═══════════════════════════════════════════════════════════════════════════════

const NODE_TYPE_MAP: Record<string, ArchitectureNodeType> = {
  'compute': 'compute',
  'database': 'database',
  'ai-service': 'ai-service',
  'gateway': 'gateway',
  'storage': 'storage',
  'queue': 'queue',
  'cache': 'cache',
  'external': 'external',
  'service': 'compute',
  'llm': 'ai-service',
  'ai': 'ai-service',
  'vector': 'database',
}

const ICON_MAP: Record<ArchitectureNodeType, typeof Server> = {
  compute: Server,
  database: Database,
  'ai-service': Cpu,
  gateway: Shield,
  storage: Layers,
  queue: Workflow,
  cache: Zap,
  external: Cloud,
}

const COLOR_MAP: Record<ArchitectureNodeType, {
  bg: string
  border: string
  icon: string
  glow: string
  solid: string
}> = {
  compute: {
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/30',
    icon: 'text-cyan-400',
    glow: 'shadow-cyan-500/20',
    solid: '#06b6d4',
  },
  database: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    icon: 'text-emerald-400',
    glow: 'shadow-emerald-500/20',
    solid: '#10b981',
  },
  'ai-service': {
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/30',
    icon: 'text-rose-400',
    glow: 'shadow-rose-500/20',
    solid: '#f43f5e',
  },
  gateway: {
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/30',
    icon: 'text-violet-400',
    glow: 'shadow-violet-500/20',
    solid: '#8b5cf6',
  },
  storage: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    icon: 'text-blue-400',
    glow: 'shadow-blue-500/20',
    solid: '#3b82f6',
  },
  queue: {
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/30',
    icon: 'text-orange-400',
    glow: 'shadow-orange-500/20',
    solid: '#f97316',
  },
  cache: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    icon: 'text-amber-400',
    glow: 'shadow-amber-500/20',
    solid: '#f59e0b',
  },
  external: {
    bg: 'bg-slate-500/10',
    border: 'border-slate-500/30',
    icon: 'text-slate-400',
    glow: 'shadow-slate-500/20',
    solid: '#64748b',
  },
}

// ═══════════════════════════════════════════════════════════════════════════════
// CUSTOM NODE COMPONENT - WORLD-CLASS DESIGN
// ═══════════════════════════════════════════════════════════════════════════════

function ArchitectureNode({ data, selected }: NodeProps<Node<ArchitectureNodeData>>) {
  const Icon = ICON_MAP[data.type] || Server
  const colors = COLOR_MAP[data.type] || COLOR_MAP.compute
  const isHighlighted = data.isHighlighted || data.isInFlowPath

  return (
    <div
      className={cn(
        'group relative px-4 py-3 rounded-xl border-2 backdrop-blur-md transition-all duration-300 min-w-[180px] max-w-[220px]',
        'hover:scale-[1.02] hover:shadow-xl cursor-grab active:cursor-grabbing',
        colors.bg,
        colors.border,
        selected && 'ring-2 ring-white/60 scale-105',
        isHighlighted && `ring-2 ring-white/80 scale-105 shadow-lg ${colors.glow}`,
        data.isInFlowPath && 'animate-pulse'
      )}
    >
      {/* Connection Handles */}
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-white/40 !border-white/60 !w-3 !h-3 !-top-1.5 transition-all hover:!scale-125 hover:!bg-white/80"
      />
      <Handle
        type="target"
        position={Position.Left}
        className="!bg-white/40 !border-white/60 !w-3 !h-3 !-left-1.5 transition-all hover:!scale-125 hover:!bg-white/80"
      />

      {/* Glow Effect on Hover */}
      <div className={cn(
        'absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl',
        colors.bg
      )} />

      {/* Node Content */}
      <div className="flex items-start gap-3">
        <div className={cn(
          'p-2.5 rounded-lg bg-black/40 shrink-0 transition-transform group-hover:scale-110',
          colors.icon
        )}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-semibold text-white text-sm leading-tight">{data.label}</div>
          {data.technology && (
            <div className="text-[10px] text-white/70 mt-1 flex items-center gap-1">
              <span className="truncate">{data.technology}</span>
            </div>
          )}
        </div>
      </div>

      {/* Description (shown on hover or when selected) */}
      {data.description && (
        <div className={cn(
          'mt-3 text-[11px] text-white/60 border-t border-white/10 pt-2 leading-relaxed',
          'line-clamp-2 group-hover:line-clamp-none transition-all'
        )}>
          {data.description}
        </div>
      )}

      {/* Type Badge */}
      <div className={cn(
        'absolute -top-2 -right-2 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider',
        'bg-black/60 backdrop-blur-sm border',
        colors.border,
        colors.icon
      )}>
        {data.type.replace('-', ' ')}
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-white/40 !border-white/60 !w-3 !h-3 !-bottom-1.5 transition-all hover:!scale-125 hover:!bg-white/80"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="!bg-white/40 !border-white/60 !w-3 !h-3 !-right-1.5 transition-all hover:!scale-125 hover:!bg-white/80"
      />
    </div>
  )
}

const nodeTypes = { architecture: ArchitectureNode }

// ═══════════════════════════════════════════════════════════════════════════════
// AUTO-LAYOUT ALGORITHM - DAGRE-STYLE
// ═══════════════════════════════════════════════════════════════════════════════

function calculateNodePositions(components: BlueprintComponent[], flows: BlueprintFlow[]) {
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

  // Handle unpositioned nodes (no connections)
  components.forEach((c) => {
    if (levels[c.id] === undefined) {
      const maxLevel = Math.max(0, ...Object.values(levels))
      levels[c.id] = maxLevel + 1
      if (!levelGroups[levels[c.id]]) levelGroups[levels[c.id]] = []
      levelGroups[levels[c.id]].push(c.id)
    }
  })

  // Assign positions with better spacing
  const positions: Record<string, { x: number; y: number }> = {}
  const xGap = 280
  const yGap = 160
  const centerY = 250

  Object.entries(levelGroups).forEach(([levelStr, ids]) => {
    const level = parseInt(levelStr)
    const totalHeight = (ids.length - 1) * yGap
    const startY = centerY - totalHeight / 2

    ids.forEach((id, index) => {
      positions[id] = {
        x: level * xGap + 80,
        y: startY + index * yGap,
      }
    })
  })

  return positions
}

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENT INSPECTOR PANEL
// ═══════════════════════════════════════════════════════════════════════════════

interface InspectorPanelProps {
  component: BlueprintComponent | null
  onClose: () => void
}

function InspectorPanel({ component, onClose }: InspectorPanelProps) {
  if (!component) return null

  const nodeType = NODE_TYPE_MAP[component.type.toLowerCase()] || 'compute'
  const colors = COLOR_MAP[nodeType]
  const Icon = ICON_MAP[nodeType]

  return (
    <div className="absolute top-4 right-4 w-72 bg-slate-900/95 backdrop-blur-lg border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden animate-in slide-in-from-right-5 duration-300">
      {/* Header */}
      <div className={cn('px-4 py-3 border-b border-white/10', colors.bg)}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon className={cn('w-5 h-5', colors.icon)} />
            <span className="font-semibold text-white">{component.name}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Type Badge */}
        <div className="flex items-center gap-2">
          <span className={cn(
            'px-2 py-1 rounded text-xs font-medium uppercase',
            colors.bg, colors.icon
          )}>
            {component.type}
          </span>
        </div>

        {/* Description */}
        <div>
          <h4 className="text-xs font-medium text-slate-500 uppercase mb-1">Description</h4>
          <p className="text-sm text-slate-300 leading-relaxed">{component.description}</p>
        </div>

        {/* Cloud Service */}
        {component.cloudService && (
          <div>
            <h4 className="text-xs font-medium text-slate-500 uppercase mb-1">Cloud Service</h4>
            <div className="flex items-center gap-2 text-sm text-white">
              <Cloud className="w-4 h-4 text-slate-400" />
              {component.cloudService}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="pt-2 border-t border-white/10">
          <h4 className="text-xs font-medium text-slate-500 uppercase mb-2">Learn More</h4>
          <div className="flex gap-2">
            <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs text-slate-300 transition-colors">
              <ExternalLink className="w-3 h-3" />
              Docs
            </button>
            <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs text-slate-300 transition-colors">
              <DollarSign className="w-3 h-3" />
              Pricing
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

interface BlueprintDiagramProps {
  components: BlueprintComponent[]
  flows: BlueprintFlow[]
  title?: string
  className?: string
}

export function BlueprintDiagram({ components, flows, title, className }: BlueprintDiagramProps) {
  const [selectedComponent, setSelectedComponent] = useState<BlueprintComponent | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [flowStep, setFlowStep] = useState(-1)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const { initialNodes, initialEdges, flowPath } = useMemo(() => {
    if (!components || components.length === 0) {
      return { initialNodes: [], initialEdges: [], flowPath: [] }
    }

    const positions = calculateNodePositions(components, flows || [])

    const initialNodes: Node<ArchitectureNodeData>[] = components.map((component) => ({
      id: component.id,
      type: 'architecture',
      position: positions[component.id] || { x: 0, y: 0 },
      draggable: true,
      data: {
        label: component.name,
        type: NODE_TYPE_MAP[component.type.toLowerCase()] || 'compute',
        description: component.description,
        technology: component.cloudService,
        componentId: component.id,
        isInFlowPath: false,
      },
    }))

    const initialEdges: Edge[] = (flows || []).map((flow) => ({
      id: flow.id,
      source: flow.from,
      target: flow.to,
      label: flow.label,
      animated: true,
      type: 'smoothstep',
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#64748b',
        width: 20,
        height: 20,
      },
      style: {
        stroke: '#475569',
        strokeWidth: 2,
      },
      labelStyle: {
        fill: '#cbd5e1',
        fontSize: 11,
        fontWeight: 600,
      },
      labelBgStyle: {
        fill: '#0f172a',
        fillOpacity: 0.95,
      },
      labelBgPadding: [8, 6] as [number, number],
      labelBgBorderRadius: 6,
    }))

    // Build flow path for simulation
    const flowPath: string[] = []
    const visited = new Set<string>()
    if (flows?.length > 0) {
      let current = flows[0].from
      flowPath.push(current)
      visited.add(current)

      for (const flow of flows) {
        if (!visited.has(flow.to)) {
          flowPath.push(flow.to)
          visited.add(flow.to)
        }
      }
    }

    return { initialNodes, initialEdges, flowPath }
  }, [components, flows])

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  // Flow simulation effect
  useEffect(() => {
    if (isPlaying && flowPath.length > 0) {
      intervalRef.current = setInterval(() => {
        setFlowStep(prev => (prev + 1) % (flowPath.length + 1))
      }, 1200)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying, flowPath.length])

  // Update node highlighting based on flow step
  useEffect(() => {
    if (flowStep >= 0 && flowStep < flowPath.length) {
      const activeId = flowPath[flowStep]
      setNodes(nds => nds.map(n => ({
        ...n,
        data: {
          ...n.data,
          isInFlowPath: n.id === activeId
        }
      })))
    } else {
      setNodes(nds => nds.map(n => ({
        ...n,
        data: {
          ...n.data,
          isInFlowPath: false
        }
      })))
    }
  }, [flowStep, flowPath, setNodes])

  const handleNodeClick = useCallback((_: React.MouseEvent, node: Node<ArchitectureNodeData>) => {
    const comp = components.find(c => c.id === node.id)
    setSelectedComponent(comp || null)
  }, [components])

  const handlePaneClick = useCallback(() => {
    setSelectedComponent(null)
  }, [])

  const resetSimulation = useCallback(() => {
    setIsPlaying(false)
    setFlowStep(-1)
    setNodes(nds => nds.map(n => ({
      ...n,
      data: { ...n.data, isInFlowPath: false }
    })))
  }, [setNodes])

  if (initialNodes.length === 0) {
    return (
      <div className={cn('rounded-2xl border border-white/10 bg-slate-900/80 p-12 text-center', className)}>
        <Box className="mx-auto h-16 w-16 text-slate-600 mb-4" />
        <p className="text-slate-400 text-lg">No architecture diagram available</p>
      </div>
    )
  }

  return (
    <div className={cn(
      'rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-800/90 overflow-hidden shadow-2xl',
      isFullscreen && 'fixed inset-4 z-50 rounded-2xl',
      className
    )}>
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/10 bg-black/20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {title && <h4 className="font-semibold text-white">{title}</h4>}
          <span className="text-xs text-slate-500 hidden sm:inline">
            Drag nodes • Scroll to zoom • Click for details
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Flow Simulation */}
          <div className="flex items-center gap-1 mr-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={cn(
                'p-2 rounded-lg transition-all',
                isPlaying
                  ? 'bg-rose-500/20 text-rose-400'
                  : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
              )}
              title={isPlaying ? 'Pause flow simulation' : 'Play flow simulation'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button
              onClick={resetSimulation}
              className="p-2 rounded-lg bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white transition-all"
              title="Reset simulation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Fullscreen Toggle */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 rounded-lg bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white transition-all"
            title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? <X className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Diagram */}
      <div className={cn('h-[550px]', isFullscreen && 'h-[calc(100%-120px)]')}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={handleNodeClick}
          onPaneClick={handlePaneClick}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.2, maxZoom: 1.2 }}
          attributionPosition="bottom-left"
          proOptions={{ hideAttribution: true }}
          className="bg-transparent"
          minZoom={0.2}
          maxZoom={2}
          defaultEdgeOptions={{
            type: 'smoothstep',
            animated: true,
          }}
        >
          <Background
            color="#1e293b"
            gap={24}
            size={1.5}
            variant={BackgroundVariant.Dots}
          />
          <Controls
            className="!bg-slate-800/95 !border-white/10 !rounded-xl !shadow-xl [&>button]:!bg-slate-700/80 [&>button]:!border-white/10 [&>button]:!text-white [&>button:hover]:!bg-slate-600"
            showInteractive={false}
          />
          <MiniMap
            className="!bg-slate-800/95 !border-white/10 !rounded-xl !shadow-xl"
            nodeColor={(node) => {
              const nodeData = node.data as ArchitectureNodeData
              return COLOR_MAP[nodeData?.type]?.solid || '#64748b'
            }}
            maskColor="rgba(0, 0, 0, 0.8)"
            pannable
            zoomable
          />

          {/* Info Panel */}
          <Panel position="top-left" className="!m-4">
            <div className="bg-slate-800/90 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-2 flex items-center gap-2">
              <Info className="w-4 h-4 text-cyan-400" />
              <span className="text-xs text-slate-300">
                {nodes.length} components • {edges.length} connections
              </span>
            </div>
          </Panel>
        </ReactFlow>

        {/* Component Inspector */}
        <InspectorPanel
          component={selectedComponent}
          onClose={() => setSelectedComponent(null)}
        />
      </div>

      {/* Legend */}
      <div className="px-4 py-3 border-t border-white/10 bg-black/20">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {Object.entries(COLOR_MAP).map(([type, colors]) => (
            <div key={type} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: colors.solid }}
              />
              <span className="text-xs text-slate-400 capitalize">
                {type.replace('-', ' ')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BlueprintDiagram
