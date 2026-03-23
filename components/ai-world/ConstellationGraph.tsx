'use client'

import { useCallback, useMemo } from 'react'
import {
  ReactFlow,
  Node,
  Edge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  MarkerType,
  BackgroundVariant,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

/**
 * Constellation Graph - Interactive AI Architecture Visualization
 *
 * Uses @xyflow/react to create an explorable neural network of AI concepts.
 * Each node represents a concept, colored by its domain (Gate alignment).
 * Edges show relationships and data flow between concepts.
 */

// Custom node colors by domain
const domainColors = {
  orchestration: { bg: '#FF4500', border: '#FFD700', text: '#FFF' },
  knowledge: { bg: '#4169E1', border: '#00CED1', text: '#FFF' },
  production: { bg: '#32CD32', border: '#98FB98', text: '#FFF' },
  meta: { bg: '#9370DB', border: '#FFD700', text: '#FFF' },
  core: { bg: '#8B5CF6', border: '#A78BFA', text: '#FFF' },
}

// Initial nodes representing AI concepts
const initialNodes: Node[] = [
  // Core concepts (center)
  {
    id: 'llm',
    type: 'default',
    position: { x: 400, y: 300 },
    data: { label: 'Large Language Model' },
    style: {
      background: domainColors.core.bg,
      border: `2px solid ${domainColors.core.border}`,
      color: domainColors.core.text,
      borderRadius: '12px',
      padding: '10px 20px',
      fontSize: '12px',
      fontWeight: 600,
    },
  },

  // Orchestration domain (top-left, fire colors)
  {
    id: 'agent-orchestrator',
    position: { x: 100, y: 100 },
    data: { label: 'Agent Orchestrator' },
    style: {
      background: domainColors.orchestration.bg,
      border: `2px solid ${domainColors.orchestration.border}`,
      color: domainColors.orchestration.text,
      borderRadius: '12px',
      padding: '8px 16px',
      fontSize: '11px',
      fontWeight: 600,
    },
  },
  {
    id: 'task-decomposition',
    position: { x: 50, y: 200 },
    data: { label: 'Task Decomposition' },
    style: {
      background: `${domainColors.orchestration.bg}CC`,
      border: `2px solid ${domainColors.orchestration.border}`,
      color: domainColors.orchestration.text,
      borderRadius: '12px',
      padding: '8px 16px',
      fontSize: '11px',
    },
  },
  {
    id: 'tool-use',
    position: { x: 200, y: 50 },
    data: { label: 'Tool Use' },
    style: {
      background: `${domainColors.orchestration.bg}CC`,
      border: `2px solid ${domainColors.orchestration.border}`,
      color: domainColors.orchestration.text,
      borderRadius: '12px',
      padding: '8px 16px',
      fontSize: '11px',
    },
  },
  {
    id: 'multi-agent',
    position: { x: 20, y: 320 },
    data: { label: 'Multi-Agent Coordination' },
    style: {
      background: `${domainColors.orchestration.bg}AA`,
      border: `2px solid ${domainColors.orchestration.border}`,
      color: domainColors.orchestration.text,
      borderRadius: '12px',
      padding: '8px 16px',
      fontSize: '11px',
    },
  },

  // Knowledge domain (top-right, flow/water colors)
  {
    id: 'rag-pipeline',
    position: { x: 650, y: 100 },
    data: { label: 'RAG Pipeline' },
    style: {
      background: domainColors.knowledge.bg,
      border: `2px solid ${domainColors.knowledge.border}`,
      color: domainColors.knowledge.text,
      borderRadius: '12px',
      padding: '8px 16px',
      fontSize: '11px',
      fontWeight: 600,
    },
  },
  {
    id: 'vector-store',
    position: { x: 750, y: 200 },
    data: { label: 'Vector Store' },
    style: {
      background: `${domainColors.knowledge.bg}CC`,
      border: `2px solid ${domainColors.knowledge.border}`,
      color: domainColors.knowledge.text,
      borderRadius: '12px',
      padding: '8px 16px',
      fontSize: '11px',
    },
  },
  {
    id: 'embeddings',
    position: { x: 600, y: 50 },
    data: { label: 'Embeddings' },
    style: {
      background: `${domainColors.knowledge.bg}CC`,
      border: `2px solid ${domainColors.knowledge.border}`,
      color: domainColors.knowledge.text,
      borderRadius: '12px',
      padding: '8px 16px',
      fontSize: '11px',
    },
  },
  {
    id: 'semantic-search',
    position: { x: 780, y: 320 },
    data: { label: 'Semantic Search' },
    style: {
      background: `${domainColors.knowledge.bg}AA`,
      border: `2px solid ${domainColors.knowledge.border}`,
      color: domainColors.knowledge.text,
      borderRadius: '12px',
      padding: '8px 16px',
      fontSize: '11px',
    },
  },

  // Production domain (bottom-left, growth colors)
  {
    id: 'observability',
    position: { x: 100, y: 500 },
    data: { label: 'Observability' },
    style: {
      background: domainColors.production.bg,
      border: `2px solid ${domainColors.production.border}`,
      color: domainColors.production.text,
      borderRadius: '12px',
      padding: '8px 16px',
      fontSize: '11px',
      fontWeight: 600,
    },
  },
  {
    id: 'deployment',
    position: { x: 50, y: 420 },
    data: { label: 'Deployment' },
    style: {
      background: `${domainColors.production.bg}CC`,
      border: `2px solid ${domainColors.production.border}`,
      color: domainColors.production.text,
      borderRadius: '12px',
      padding: '8px 16px',
      fontSize: '11px',
    },
  },
  {
    id: 'guardrails',
    position: { x: 200, y: 550 },
    data: { label: 'Guardrails' },
    style: {
      background: `${domainColors.production.bg}AA`,
      border: `2px solid ${domainColors.production.border}`,
      color: domainColors.production.text,
      borderRadius: '12px',
      padding: '8px 16px',
      fontSize: '11px',
    },
  },

  // Meta domain (bottom-right, source colors)
  {
    id: 'mcp',
    position: { x: 650, y: 500 },
    data: { label: 'Model Context Protocol' },
    style: {
      background: domainColors.meta.bg,
      border: `2px solid ${domainColors.meta.border}`,
      color: domainColors.meta.text,
      borderRadius: '12px',
      padding: '8px 16px',
      fontSize: '11px',
      fontWeight: 600,
    },
  },
  {
    id: 'self-improvement',
    position: { x: 750, y: 420 },
    data: { label: 'Self-Improvement' },
    style: {
      background: `${domainColors.meta.bg}CC`,
      border: `2px solid ${domainColors.meta.border}`,
      color: domainColors.meta.text,
      borderRadius: '12px',
      padding: '8px 16px',
      fontSize: '11px',
    },
  },
  {
    id: 'emergent-behavior',
    position: { x: 600, y: 550 },
    data: { label: 'Emergent Behavior' },
    style: {
      background: `${domainColors.meta.bg}AA`,
      border: `2px solid ${domainColors.meta.border}`,
      color: domainColors.meta.text,
      borderRadius: '12px',
      padding: '8px 16px',
      fontSize: '11px',
    },
  },

  // Prompting (connects to LLM)
  {
    id: 'prompting',
    position: { x: 400, y: 150 },
    data: { label: 'Prompt Engineering' },
    style: {
      background: domainColors.core.bg,
      border: `2px solid ${domainColors.core.border}`,
      color: domainColors.core.text,
      borderRadius: '12px',
      padding: '8px 16px',
      fontSize: '11px',
    },
  },
  {
    id: 'context-window',
    position: { x: 400, y: 450 },
    data: { label: 'Context Window' },
    style: {
      background: domainColors.core.bg,
      border: `2px solid ${domainColors.core.border}`,
      color: domainColors.core.text,
      borderRadius: '12px',
      padding: '8px 16px',
      fontSize: '11px',
    },
  },
]

// Edges connecting concepts
const initialEdges: Edge[] = [
  // LLM connections
  { id: 'e-llm-prompting', source: 'prompting', target: 'llm', animated: true, style: { stroke: '#8B5CF6' } },
  { id: 'e-llm-context', source: 'llm', target: 'context-window', animated: true, style: { stroke: '#8B5CF6' } },

  // Orchestration connections
  { id: 'e-orch-llm', source: 'agent-orchestrator', target: 'llm', animated: true, style: { stroke: '#FF4500' } },
  { id: 'e-orch-task', source: 'agent-orchestrator', target: 'task-decomposition', style: { stroke: '#FF4500' } },
  { id: 'e-orch-tool', source: 'agent-orchestrator', target: 'tool-use', style: { stroke: '#FF4500' } },
  { id: 'e-orch-multi', source: 'agent-orchestrator', target: 'multi-agent', style: { stroke: '#FF4500' } },
  { id: 'e-task-multi', source: 'task-decomposition', target: 'multi-agent', style: { stroke: '#FF4500', strokeDasharray: '5,5' } },

  // Knowledge connections
  { id: 'e-rag-llm', source: 'rag-pipeline', target: 'llm', animated: true, style: { stroke: '#4169E1' } },
  { id: 'e-rag-vector', source: 'rag-pipeline', target: 'vector-store', style: { stroke: '#4169E1' } },
  { id: 'e-rag-embed', source: 'embeddings', target: 'rag-pipeline', style: { stroke: '#4169E1' } },
  { id: 'e-vector-search', source: 'vector-store', target: 'semantic-search', style: { stroke: '#4169E1' } },
  { id: 'e-embed-vector', source: 'embeddings', target: 'vector-store', style: { stroke: '#4169E1', strokeDasharray: '5,5' } },

  // Production connections
  { id: 'e-obs-llm', source: 'observability', target: 'llm', animated: true, style: { stroke: '#32CD32' } },
  { id: 'e-deploy-obs', source: 'deployment', target: 'observability', style: { stroke: '#32CD32' } },
  { id: 'e-guard-obs', source: 'guardrails', target: 'observability', style: { stroke: '#32CD32' } },
  { id: 'e-guard-llm', source: 'guardrails', target: 'llm', style: { stroke: '#32CD32', strokeDasharray: '5,5' } },

  // Meta connections
  { id: 'e-mcp-llm', source: 'mcp', target: 'llm', animated: true, style: { stroke: '#9370DB' } },
  { id: 'e-mcp-improve', source: 'mcp', target: 'self-improvement', style: { stroke: '#9370DB' } },
  { id: 'e-mcp-emergent', source: 'mcp', target: 'emergent-behavior', style: { stroke: '#9370DB' } },
  { id: 'e-improve-emergent', source: 'self-improvement', target: 'emergent-behavior', style: { stroke: '#9370DB', strokeDasharray: '5,5' } },

  // Cross-domain connections
  { id: 'e-tool-rag', source: 'tool-use', target: 'rag-pipeline', style: { stroke: '#888', strokeDasharray: '3,3' } },
  { id: 'e-multi-mcp', source: 'multi-agent', target: 'mcp', style: { stroke: '#888', strokeDasharray: '3,3' } },
  { id: 'e-guard-orch', source: 'guardrails', target: 'agent-orchestrator', style: { stroke: '#888', strokeDasharray: '3,3' } },
  { id: 'e-context-rag', source: 'context-window', target: 'rag-pipeline', style: { stroke: '#888', strokeDasharray: '3,3' } },
]

export function ConstellationGraph() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  )

  return (
    <div className="w-full h-[600px] rounded-3xl overflow-hidden border border-white/10 bg-slate-900/80 backdrop-blur-xl">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        attributionPosition="bottom-left"
        proOptions={{ hideAttribution: true }}
        style={{ background: 'transparent' }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color="rgba(255,255,255,0.1)"
        />
        <Controls
          style={{
            background: 'rgba(0,0,0,0.5)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px',
          }}
        />
        <MiniMap
          style={{
            background: 'rgba(0,0,0,0.5)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px',
          }}
          nodeColor={(node) => {
            const id = node.id
            if (id.includes('agent') || id.includes('task') || id.includes('tool') || id.includes('multi')) return domainColors.orchestration.bg
            if (id.includes('rag') || id.includes('vector') || id.includes('embed') || id.includes('search')) return domainColors.knowledge.bg
            if (id.includes('obs') || id.includes('deploy') || id.includes('guard')) return domainColors.production.bg
            if (id.includes('mcp') || id.includes('improve') || id.includes('emergent')) return domainColors.meta.bg
            return domainColors.core.bg
          }}
        />
      </ReactFlow>
    </div>
  )
}
