'use client'

import { useCallback, useMemo } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType,
  type Node,
  type Edge,
  type Connection,
  type NodeProps,
  Handle,
  Position,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { cn } from '@/lib/utils'
import { Database, Server, Shield, Cpu, Cloud, Layers, Network, Zap } from 'lucide-react'

// Node type definitions for architecture components
type ArchitectureNodeType =
  | 'client'
  | 'gateway'
  | 'service'
  | 'database'
  | 'cache'
  | 'queue'
  | 'ai'
  | 'external'

interface ArchitectureNodeData extends Record<string, unknown> {
  label: string
  type: ArchitectureNodeType
  description?: string
  technology?: string
}

// Custom node component with glassmorphic styling
function ArchitectureNode({ data, selected }: NodeProps<Node<ArchitectureNodeData>>) {
  const iconMap: Record<ArchitectureNodeType, typeof Server> = {
    client: Cloud,
    gateway: Shield,
    service: Server,
    database: Database,
    cache: Zap,
    queue: Layers,
    ai: Cpu,
    external: Network,
  }

  const colorMap: Record<ArchitectureNodeType, { bg: string; border: string; icon: string }> = {
    client: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', icon: 'text-blue-400' },
    gateway: { bg: 'bg-violet-500/10', border: 'border-violet-500/30', icon: 'text-violet-400' },
    service: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', icon: 'text-cyan-400' },
    database: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', icon: 'text-emerald-400' },
    cache: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', icon: 'text-amber-400' },
    queue: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', icon: 'text-orange-400' },
    ai: { bg: 'bg-rose-500/10', border: 'border-rose-500/30', icon: 'text-rose-400' },
    external: { bg: 'bg-slate-500/10', border: 'border-slate-500/30', icon: 'text-slate-400' },
  }

  const Icon = iconMap[data.type] || Server
  const colors = colorMap[data.type] || colorMap.service

  return (
    <div
      className={cn(
        'px-4 py-3 rounded-xl border backdrop-blur-sm transition-all min-w-[140px]',
        colors.bg,
        colors.border,
        selected && 'ring-2 ring-white/50 scale-105'
      )}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-white/20 !border-white/40 !w-3 !h-3"
      />
      <Handle
        type="target"
        position={Position.Left}
        className="!bg-white/20 !border-white/40 !w-3 !h-3"
      />

      <div className="flex items-center gap-3">
        <div className={cn('p-2 rounded-lg bg-black/20', colors.icon)}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <div className="font-medium text-white text-sm">{data.label}</div>
          {data.technology && (
            <div className="text-[10px] text-white/50">{data.technology}</div>
          )}
        </div>
      </div>

      {data.description && (
        <div className="mt-2 text-[10px] text-white/40 border-t border-white/10 pt-2">
          {data.description}
        </div>
      )}

      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-white/20 !border-white/40 !w-3 !h-3"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="!bg-white/20 !border-white/40 !w-3 !h-3"
      />
    </div>
  )
}

const nodeTypes = {
  architecture: ArchitectureNode,
}

// Preset architecture patterns
export const ARCHITECTURE_PRESETS = {
  ragPipeline: {
    nodes: [
      { id: 'user', position: { x: 50, y: 200 }, data: { label: 'User', type: 'client' as const, technology: 'Web/Mobile' } },
      { id: 'gateway', position: { x: 250, y: 200 }, data: { label: 'API Gateway', type: 'gateway' as const, technology: 'Kong/AWS ALB' } },
      { id: 'orchestrator', position: { x: 450, y: 100 }, data: { label: 'Orchestrator', type: 'service' as const, technology: 'LangGraph' } },
      { id: 'embedding', position: { x: 450, y: 300 }, data: { label: 'Embedding Service', type: 'ai' as const, technology: 'OpenAI/Cohere' } },
      { id: 'vectordb', position: { x: 650, y: 300 }, data: { label: 'Vector Database', type: 'database' as const, technology: 'Pinecone/pgvector' } },
      { id: 'llm', position: { x: 650, y: 100 }, data: { label: 'LLM', type: 'ai' as const, technology: 'Claude/GPT-4' } },
      { id: 'cache', position: { x: 450, y: 200 }, data: { label: 'Semantic Cache', type: 'cache' as const, technology: 'Redis' } },
    ],
    edges: [
      { id: 'e1', source: 'user', target: 'gateway', animated: true },
      { id: 'e2', source: 'gateway', target: 'orchestrator' },
      { id: 'e3', source: 'gateway', target: 'cache' },
      { id: 'e4', source: 'orchestrator', target: 'embedding' },
      { id: 'e5', source: 'embedding', target: 'vectordb' },
      { id: 'e6', source: 'orchestrator', target: 'llm' },
      { id: 'e7', source: 'vectordb', target: 'llm', label: 'context' },
    ],
  },
  multiAgent: {
    nodes: [
      { id: 'supervisor', position: { x: 350, y: 50 }, data: { label: 'Supervisor Agent', type: 'ai' as const, technology: 'Claude Opus' } },
      { id: 'coder', position: { x: 150, y: 200 }, data: { label: 'Coder Agent', type: 'ai' as const, technology: 'Claude Sonnet' } },
      { id: 'reviewer', position: { x: 350, y: 200 }, data: { label: 'Reviewer Agent', type: 'ai' as const, technology: 'Claude Sonnet' } },
      { id: 'tester', position: { x: 550, y: 200 }, data: { label: 'Tester Agent', type: 'ai' as const, technology: 'Claude Haiku' } },
      { id: 'memory', position: { x: 350, y: 350 }, data: { label: 'Shared Memory', type: 'cache' as const, technology: 'Redis/Postgres' } },
      { id: 'tools', position: { x: 150, y: 350 }, data: { label: 'Tool Registry', type: 'service' as const, technology: 'MCP Servers' } },
      { id: 'output', position: { x: 550, y: 350 }, data: { label: 'Output Handler', type: 'service' as const, technology: 'GitHub API' } },
    ],
    edges: [
      { id: 'e1', source: 'supervisor', target: 'coder', label: 'delegate' },
      { id: 'e2', source: 'supervisor', target: 'reviewer', label: 'delegate' },
      { id: 'e3', source: 'supervisor', target: 'tester', label: 'delegate' },
      { id: 'e4', source: 'coder', target: 'memory', animated: true },
      { id: 'e5', source: 'reviewer', target: 'memory', animated: true },
      { id: 'e6', source: 'tester', target: 'memory', animated: true },
      { id: 'e7', source: 'coder', target: 'tools' },
      { id: 'e8', source: 'tester', target: 'output' },
    ],
  },
  aiGateway: {
    nodes: [
      { id: 'apps', position: { x: 50, y: 200 }, data: { label: 'Applications', type: 'client' as const, technology: 'Multiple Apps' } },
      { id: 'gateway', position: { x: 250, y: 200 }, data: { label: 'AI Gateway', type: 'gateway' as const, technology: 'Kong/Custom' } },
      { id: 'ratelimit', position: { x: 400, y: 100 }, data: { label: 'Rate Limiter', type: 'service' as const, technology: 'Redis' } },
      { id: 'cache', position: { x: 400, y: 200 }, data: { label: 'Response Cache', type: 'cache' as const, technology: 'Redis' } },
      { id: 'router', position: { x: 400, y: 300 }, data: { label: 'Model Router', type: 'service' as const, technology: 'Custom Logic' } },
      { id: 'openai', position: { x: 600, y: 100 }, data: { label: 'OpenAI', type: 'external' as const, technology: 'GPT-4' } },
      { id: 'anthropic', position: { x: 600, y: 200 }, data: { label: 'Anthropic', type: 'external' as const, technology: 'Claude' } },
      { id: 'local', position: { x: 600, y: 300 }, data: { label: 'Local LLM', type: 'ai' as const, technology: 'Llama/Mistral' } },
    ],
    edges: [
      { id: 'e1', source: 'apps', target: 'gateway', animated: true },
      { id: 'e2', source: 'gateway', target: 'ratelimit' },
      { id: 'e3', source: 'gateway', target: 'cache' },
      { id: 'e4', source: 'gateway', target: 'router' },
      { id: 'e5', source: 'router', target: 'openai' },
      { id: 'e6', source: 'router', target: 'anthropic' },
      { id: 'e7', source: 'router', target: 'local' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // REAL PROJECT ARCHITECTURES
  // ═══════════════════════════════════════════════════════════════════════════

  frankxAI: {
    nodes: [
      // Content Creation Layer
      { id: 'creator', position: { x: 50, y: 150 }, data: { label: 'Creator (Frank)', type: 'client' as const, technology: 'Claude Code' } },
      { id: 'claudeCode', position: { x: 200, y: 50 }, data: { label: 'Claude Code', type: 'ai' as const, technology: 'Opus/Sonnet' } },
      { id: 'mcpServers', position: { x: 200, y: 250 }, data: { label: 'MCP Servers', type: 'service' as const, technology: '15+ Tools' } },

      // Content Pipeline
      { id: 'contentPipeline', position: { x: 400, y: 150 }, data: { label: 'Publishing Pipeline', type: 'service' as const, technology: 'MDX + Pipelines' } },
      { id: 'seoEngine', position: { x: 400, y: 50 }, data: { label: 'SEO Engine', type: 'ai' as const, technology: 'Schema + AEO' } },
      { id: 'voiceSynth', position: { x: 400, y: 250 }, data: { label: 'Voice Synthesis', type: 'ai' as const, technology: 'ElevenLabs' } },

      // Storage & Delivery
      { id: 'vercel', position: { x: 600, y: 50 }, data: { label: 'Vercel Edge', type: 'service' as const, technology: 'Next.js 16' } },
      { id: 'postgres', position: { x: 600, y: 150 }, data: { label: 'Neon Postgres', type: 'database' as const, technology: 'Serverless' } },
      { id: 'blob', position: { x: 600, y: 250 }, data: { label: 'Vercel Blob', type: 'database' as const, technology: 'Products' } },

      // Distribution
      { id: 'website', position: { x: 800, y: 100 }, data: { label: 'FrankX.AI', type: 'external' as const, technology: 'Website' } },
      { id: 'social', position: { x: 800, y: 200 }, data: { label: 'Social Distribution', type: 'external' as const, technology: 'LinkedIn/X' } },
    ],
    edges: [
      { id: 'f1', source: 'creator', target: 'claudeCode', animated: true, label: 'creates' },
      { id: 'f2', source: 'creator', target: 'mcpServers' },
      { id: 'f3', source: 'claudeCode', target: 'contentPipeline', label: 'generates' },
      { id: 'f4', source: 'mcpServers', target: 'contentPipeline' },
      { id: 'f5', source: 'contentPipeline', target: 'seoEngine' },
      { id: 'f6', source: 'contentPipeline', target: 'voiceSynth' },
      { id: 'f7', source: 'seoEngine', target: 'vercel' },
      { id: 'f8', source: 'contentPipeline', target: 'postgres' },
      { id: 'f9', source: 'contentPipeline', target: 'blob' },
      { id: 'f10', source: 'vercel', target: 'website', animated: true },
      { id: 'f11', source: 'voiceSynth', target: 'social' },
    ],
  },

  arcanea: {
    nodes: [
      // Player Layer
      { id: 'player', position: { x: 50, y: 200 }, data: { label: 'Player', type: 'client' as const, technology: 'Web/Mobile' } },

      // Game Core
      { id: 'gameEngine', position: { x: 250, y: 100 }, data: { label: 'Game Engine', type: 'service' as const, technology: 'Phaser/Unity' } },
      { id: 'realmManager', position: { x: 250, y: 200 }, data: { label: 'Realm Manager', type: 'service' as const, technology: 'State Machine' } },
      { id: 'aiNarrator', position: { x: 250, y: 300 }, data: { label: 'AI Narrator', type: 'ai' as const, technology: 'Claude Opus' } },

      // Game State
      { id: 'characterDB', position: { x: 450, y: 50 }, data: { label: 'Character DB', type: 'database' as const, technology: 'Postgres' } },
      { id: 'worldState', position: { x: 450, y: 150 }, data: { label: 'World State', type: 'cache' as const, technology: 'Redis' } },
      { id: 'questEngine', position: { x: 450, y: 250 }, data: { label: 'Quest Engine', type: 'service' as const, technology: 'Event System' } },
      { id: 'loreDB', position: { x: 450, y: 350 }, data: { label: 'Lore Database', type: 'database' as const, technology: 'Vector DB' } },

      // External Systems
      { id: 'musicGen', position: { x: 650, y: 100 }, data: { label: 'Music Generator', type: 'ai' as const, technology: 'Suno AI' } },
      { id: 'nftBridge', position: { x: 650, y: 200 }, data: { label: 'NFT Bridge', type: 'external' as const, technology: 'Web3' } },
      { id: 'analytics', position: { x: 650, y: 300 }, data: { label: 'Analytics', type: 'service' as const, technology: 'PostHog' } },
    ],
    edges: [
      { id: 'a1', source: 'player', target: 'gameEngine', animated: true },
      { id: 'a2', source: 'player', target: 'realmManager' },
      { id: 'a3', source: 'realmManager', target: 'aiNarrator', label: 'triggers' },
      { id: 'a4', source: 'gameEngine', target: 'characterDB' },
      { id: 'a5', source: 'realmManager', target: 'worldState' },
      { id: 'a6', source: 'aiNarrator', target: 'questEngine', label: 'generates' },
      { id: 'a7', source: 'aiNarrator', target: 'loreDB' },
      { id: 'a8', source: 'questEngine', target: 'musicGen' },
      { id: 'a9', source: 'characterDB', target: 'nftBridge' },
      { id: 'a10', source: 'gameEngine', target: 'analytics' },
    ],
  },

  creatorPlatform: {
    nodes: [
      // Creator Tools
      { id: 'creators', position: { x: 50, y: 200 }, data: { label: 'Creators', type: 'client' as const, technology: 'Dashboard' } },
      { id: 'authGateway', position: { x: 200, y: 200 }, data: { label: 'Auth Gateway', type: 'gateway' as const, technology: 'NextAuth' } },

      // AI Services Layer
      { id: 'contentAI', position: { x: 400, y: 50 }, data: { label: 'Content AI', type: 'ai' as const, technology: 'Claude + GPT' } },
      { id: 'imageAI', position: { x: 400, y: 150 }, data: { label: 'Image AI', type: 'ai' as const, technology: 'DALL-E/Midjourney' } },
      { id: 'musicAI', position: { x: 400, y: 250 }, data: { label: 'Music AI', type: 'ai' as const, technology: 'Suno/Udio' } },
      { id: 'voiceAI', position: { x: 400, y: 350 }, data: { label: 'Voice AI', type: 'ai' as const, technology: 'ElevenLabs' } },

      // Orchestration
      { id: 'orchestrator', position: { x: 600, y: 200 }, data: { label: 'Workflow Engine', type: 'service' as const, technology: 'LangGraph' } },

      // Distribution
      { id: 'cdn', position: { x: 800, y: 100 }, data: { label: 'Global CDN', type: 'service' as const, technology: 'Cloudflare' } },
      { id: 'payments', position: { x: 800, y: 200 }, data: { label: 'Payments', type: 'external' as const, technology: 'Stripe' } },
      { id: 'analytics', position: { x: 800, y: 300 }, data: { label: 'Analytics', type: 'database' as const, technology: 'PostHog' } },
    ],
    edges: [
      { id: 'c1', source: 'creators', target: 'authGateway', animated: true },
      { id: 'c2', source: 'authGateway', target: 'contentAI' },
      { id: 'c3', source: 'authGateway', target: 'imageAI' },
      { id: 'c4', source: 'authGateway', target: 'musicAI' },
      { id: 'c5', source: 'authGateway', target: 'voiceAI' },
      { id: 'c6', source: 'contentAI', target: 'orchestrator' },
      { id: 'c7', source: 'imageAI', target: 'orchestrator' },
      { id: 'c8', source: 'musicAI', target: 'orchestrator' },
      { id: 'c9', source: 'voiceAI', target: 'orchestrator' },
      { id: 'c10', source: 'orchestrator', target: 'cdn' },
      { id: 'c11', source: 'orchestrator', target: 'payments' },
      { id: 'c12', source: 'orchestrator', target: 'analytics' },
    ],
  },
}

interface ArchitectureDiagramProps {
  preset?: keyof typeof ARCHITECTURE_PRESETS
  nodes?: Node<ArchitectureNodeData>[]
  edges?: Edge[]
  title?: string
  className?: string
  interactive?: boolean
}

export function ArchitectureDiagram({
  preset,
  nodes: initialNodes,
  edges: initialEdges,
  title,
  className,
  interactive = true,
}: ArchitectureDiagramProps) {
  // Get nodes and edges from preset or props
  const presetData = preset ? ARCHITECTURE_PRESETS[preset] : null

  const defaultNodes = useMemo(() => {
    const source = initialNodes || presetData?.nodes || []
    return source.map((node) => ({
      ...node,
      type: 'architecture',
    }))
  }, [initialNodes, presetData])

  const defaultEdges = useMemo(() => {
    const source = initialEdges || presetData?.edges || []
    return source.map((edge) => ({
      ...edge,
      markerEnd: { type: MarkerType.ArrowClosed, color: '#64748b' },
      style: { stroke: '#64748b', strokeWidth: 2 },
      labelStyle: { fill: '#94a3b8', fontSize: 10 },
      labelBgStyle: { fill: '#0f172a', fillOpacity: 0.8 },
    }))
  }, [initialEdges, presetData])

  const [nodes, setNodes, onNodesChange] = useNodesState(defaultNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(defaultEdges)

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  )

  return (
    <div className={cn('rounded-2xl border border-white/10 bg-slate-900/80 overflow-hidden', className)}>
      {title && (
        <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
          <h4 className="font-medium text-white">{title}</h4>
          <span className="text-xs text-slate-500">Drag nodes to explore</span>
        </div>
      )}
      <div className="h-[500px]">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={interactive ? onNodesChange : undefined}
          onEdgesChange={interactive ? onEdgesChange : undefined}
          onConnect={interactive ? onConnect : undefined}
          nodeTypes={nodeTypes}
          fitView
          attributionPosition="bottom-left"
          proOptions={{ hideAttribution: true }}
          className="bg-transparent"
        >
          <Background color="#1e293b" gap={20} size={1} />
          {interactive && (
            <>
              <Controls className="!bg-slate-800/80 !border-white/10 !rounded-lg [&>button]:!bg-slate-700 [&>button]:!border-white/10 [&>button]:!text-white [&>button:hover]:!bg-slate-600" />
              <MiniMap
                className="!bg-slate-800/80 !border-white/10 !rounded-lg"
                nodeColor={(node) => {
                  const colors: Record<string, string> = {
                    ai: '#f43f5e',
                    database: '#10b981',
                    service: '#06b6d4',
                    gateway: '#8b5cf6',
                    cache: '#f59e0b',
                    client: '#3b82f6',
                    external: '#64748b',
                    queue: '#f97316',
                  }
                  return colors[(node.data as ArchitectureNodeData)?.type] || '#64748b'
                }}
              />
            </>
          )}
        </ReactFlow>
      </div>
    </div>
  )
}

export default ArchitectureDiagram
