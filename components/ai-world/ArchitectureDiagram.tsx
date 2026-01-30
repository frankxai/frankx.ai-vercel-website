'use client'

import { useCallback } from 'react'
import {
  ReactFlow,
  Node,
  Edge,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  ConnectionLineType,
  MarkerType,
  Position,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

/**
 * Oracle AI World - Interactive Architecture Diagram
 *
 * Configurable 4-tier architecture diagram with @xyflow/react
 * Supports different use cases: Insurance, RAG, CX Intelligence
 */

export type ArchitectureConfig = {
  title: string
  description: string
  tiers: {
    name: string
    color: string
    items: string[]
  }[]
}

const architectureConfigs: Record<string, ArchitectureConfig> = {
  insurance: {
    title: 'Insurance Claims Automation',
    description: 'Multimodal processing of claims with AI-powered fraud detection and damage assessment',
    tiers: [
      { name: 'DATA INGESTION', color: '#F57C00', items: ['Claim Photos', 'Accident Reports', 'Customer Voice', 'OCI Streaming'] },
      { name: 'INTELLIGENCE PLATFORM', color: '#C74634', items: ['AI Database 26ai', 'Vector Search', 'Object Storage', 'True Cache'] },
      { name: 'AI ORCHESTRATION', color: '#7B1FA2', items: ['Vision Agent', 'Document Agent', 'Voice Agent', 'Agent Hub'] },
      { name: 'CHANNEL DISTRIBUTION', color: '#1976D2', items: ['Claim Report', 'Damage Score', 'Fraud Indicator', 'Cost Estimate'] },
    ],
  },
  rag: {
    title: 'Agentic RAG Report Generator',
    description: 'Multi-document research with automated citation and synthesis',
    tiers: [
      { name: 'DOCUMENT SOURCES', color: '#F57C00', items: ['Enterprise PDFs', 'Knowledge Base', 'Spreadsheets', 'Research Papers'] },
      { name: 'VECTOR DATABASE', color: '#C74634', items: ['AI Database 26ai', 'HNSW Indexing', 'Cohere Embed 4', 'True Cache'] },
      { name: 'AGENT ORCHESTRATION', color: '#7B1FA2', items: ['Research Agent', 'Synthesis Agent', 'Writing Agent', 'Command A 256K'] },
      { name: 'REPORT OUTPUT', color: '#1976D2', items: ['Executive Summary', 'Detailed Analysis', 'Citations', 'Confidence Scores'] },
    ],
  },
  cx: {
    title: 'CX Conversation Intelligence',
    description: 'Real-time sentiment analysis and customer intent classification',
    tiers: [
      { name: 'CONVERSATION CAPTURE', color: '#F57C00', items: ['Call Center Audio', 'Chat Transcripts', 'Email Threads', 'Social Media'] },
      { name: 'PROCESSING LAYER', color: '#C74634', items: ['OCI Speech', 'AI Database 26ai', 'Object Storage', 'Vector Embeddings'] },
      { name: 'AI ANALYSIS', color: '#7B1FA2', items: ['Sentiment Agent', 'Intent Agent', 'Summary Agent', 'Llama 4 Maverick'] },
      { name: 'ACTIONABLE INSIGHTS', color: '#1976D2', items: ['Sentiment Dashboard', 'Intent Report', 'Agent Metrics', 'Escalation Alerts'] },
    ],
  },
}

function buildNodesAndEdges(config: ArchitectureConfig) {
  const nodes: Node[] = []
  const edges: Edge[] = []

  const tierWidth = 200
  const tierGap = 220
  const itemHeight = 45
  const itemGap = 55

  config.tiers.forEach((tier, tierIndex) => {
    const x = tierIndex * tierGap

    // Tier label
    nodes.push({
      id: `tier-${tierIndex}`,
      position: { x: x + 20, y: -40 },
      data: { label: tier.name },
      style: {
        background: 'transparent',
        border: 'none',
        fontSize: '10px',
        fontWeight: 700,
        color: tier.color,
        letterSpacing: '0.1em',
        width: tierWidth - 40,
        textAlign: 'center' as const,
      },
      draggable: false,
      selectable: false,
    })

    // Tier items
    tier.items.forEach((item, itemIndex) => {
      const nodeId = `${tierIndex}-${itemIndex}`
      const y = itemIndex * itemGap

      nodes.push({
        id: nodeId,
        position: { x, y },
        data: { label: item },
        style: {
          background: tier.color,
          color: 'white',
          borderRadius: '10px',
          fontSize: '11px',
          fontWeight: 600,
          padding: '8px 12px',
          border: `2px solid ${tier.color}dd`,
          width: tierWidth - 40,
          textAlign: 'center' as const,
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
      })

      // Connect to next tier
      if (tierIndex < config.tiers.length - 1) {
        const targetTier = config.tiers[tierIndex + 1]
        const targetIndex = Math.min(itemIndex, targetTier.items.length - 1)

        edges.push({
          id: `e-${nodeId}-${tierIndex + 1}-${targetIndex}`,
          source: nodeId,
          target: `${tierIndex + 1}-${targetIndex}`,
          style: { stroke: tier.color, strokeWidth: 2 },
          markerEnd: { type: MarkerType.ArrowClosed, color: tier.color },
          animated: tierIndex === 0 || tierIndex === config.tiers.length - 2,
        })
      }
    })
  })

  return { nodes, edges }
}

type ArchitectureDiagramProps = {
  configKey: 'insurance' | 'rag' | 'cx'
  className?: string
}

export function ArchitectureDiagram({ configKey, className = '' }: ArchitectureDiagramProps) {
  const config = architectureConfigs[configKey]
  const { nodes: initialNodes, edges: initialEdges } = buildNodesAndEdges(config)

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  return (
    <div className={`w-full h-[400px] rounded-2xl overflow-hidden border border-white/10 bg-slate-900/50 ${className}`}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        connectionLineType={ConnectionLineType.SmoothStep}
        fitView
        fitViewOptions={{ padding: 0.3 }}
        minZoom={0.5}
        maxZoom={1.5}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#334155" gap={20} size={1} />
      </ReactFlow>
    </div>
  )
}

export { architectureConfigs }
