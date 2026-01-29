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
  ConnectionLineType,
  MarkerType,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

/**
 * Oracle AI World - Ecosystem Graph
 *
 * Interactive node graph showing the Oracle AI ecosystem:
 * - Data Sources -> Processing -> AI Services -> Outputs
 *
 * Uses @xyflow/react for interactive diagram visualization
 * Colors: Oracle Red (#C74634), Purple (#7B1FA2), Blue (#1976D2), Orange (#F57C00)
 */

const nodeDefaults = {
  style: {
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: 600,
    padding: '10px 15px',
  },
}

const initialNodes: Node[] = [
  // Data Sources (Orange)
  {
    id: 'documents',
    position: { x: 0, y: 0 },
    data: { label: 'Documents & PDFs' },
    style: { ...nodeDefaults.style, background: '#F57C00', color: 'white', border: '2px solid #E65100' },
    type: 'input',
  },
  {
    id: 'images',
    position: { x: 0, y: 80 },
    data: { label: 'Images & Video' },
    style: { ...nodeDefaults.style, background: '#F57C00', color: 'white', border: '2px solid #E65100' },
    type: 'input',
  },
  {
    id: 'audio',
    position: { x: 0, y: 160 },
    data: { label: 'Audio & Voice' },
    style: { ...nodeDefaults.style, background: '#F57C00', color: 'white', border: '2px solid #E65100' },
    type: 'input',
  },
  {
    id: 'structured',
    position: { x: 0, y: 240 },
    data: { label: 'Structured Data' },
    style: { ...nodeDefaults.style, background: '#F57C00', color: 'white', border: '2px solid #E65100' },
    type: 'input',
  },

  // Processing Layer (Oracle Red)
  {
    id: 'streaming',
    position: { x: 200, y: 60 },
    data: { label: 'OCI Streaming' },
    style: { ...nodeDefaults.style, background: '#C74634', color: 'white', border: '2px solid #A13626' },
  },
  {
    id: 'storage',
    position: { x: 200, y: 180 },
    data: { label: 'Object Storage' },
    style: { ...nodeDefaults.style, background: '#C74634', color: 'white', border: '2px solid #A13626' },
  },

  // Intelligence Platform (Oracle Red)
  {
    id: 'database',
    position: { x: 400, y: 40 },
    data: { label: 'AI Database 26ai' },
    style: { ...nodeDefaults.style, background: '#C74634', color: 'white', border: '2px solid #A13626', width: 140 },
  },
  {
    id: 'vectors',
    position: { x: 400, y: 120 },
    data: { label: 'Vector Search' },
    style: { ...nodeDefaults.style, background: '#C74634', color: 'white', border: '2px solid #A13626' },
  },
  {
    id: 'cache',
    position: { x: 400, y: 200 },
    data: { label: 'True Cache' },
    style: { ...nodeDefaults.style, background: '#C74634', color: 'white', border: '2px solid #A13626' },
  },

  // AI Services (Purple)
  {
    id: 'agenthub',
    position: { x: 600, y: 60 },
    data: { label: 'OCI Agent Hub' },
    style: { ...nodeDefaults.style, background: '#7B1FA2', color: 'white', border: '2px solid #6A1B8A', width: 130 },
  },
  {
    id: 'genai',
    position: { x: 600, y: 140 },
    data: { label: 'Generative AI' },
    style: { ...nodeDefaults.style, background: '#7B1FA2', color: 'white', border: '2px solid #6A1B8A' },
  },
  {
    id: 'speech',
    position: { x: 600, y: 220 },
    data: { label: 'OCI Speech' },
    style: { ...nodeDefaults.style, background: '#7B1FA2', color: 'white', border: '2px solid #6A1B8A' },
  },

  // Models (Purple)
  {
    id: 'cohere',
    position: { x: 750, y: 100 },
    data: { label: 'Command A' },
    style: { ...nodeDefaults.style, background: '#9C27B0', color: 'white', border: '2px solid #7B1FA2' },
  },
  {
    id: 'llama',
    position: { x: 750, y: 180 },
    data: { label: 'Llama 4' },
    style: { ...nodeDefaults.style, background: '#9C27B0', color: 'white', border: '2px solid #7B1FA2' },
  },

  // Outputs (Blue)
  {
    id: 'reports',
    position: { x: 900, y: 0 },
    data: { label: 'Reports & Analytics' },
    style: { ...nodeDefaults.style, background: '#1976D2', color: 'white', border: '2px solid #1565C0' },
    type: 'output',
  },
  {
    id: 'insights',
    position: { x: 900, y: 80 },
    data: { label: 'Business Insights' },
    style: { ...nodeDefaults.style, background: '#1976D2', color: 'white', border: '2px solid #1565C0' },
    type: 'output',
  },
  {
    id: 'automation',
    position: { x: 900, y: 160 },
    data: { label: 'Workflow Actions' },
    style: { ...nodeDefaults.style, background: '#1976D2', color: 'white', border: '2px solid #1565C0' },
    type: 'output',
  },
  {
    id: 'assistant',
    position: { x: 900, y: 240 },
    data: { label: 'Digital Assistant' },
    style: { ...nodeDefaults.style, background: '#1976D2', color: 'white', border: '2px solid #1565C0' },
    type: 'output',
  },
]

const initialEdges: Edge[] = [
  // Sources to Processing
  { id: 'e1', source: 'documents', target: 'streaming', animated: true, style: { stroke: '#F57C00' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#F57C00' } },
  { id: 'e2', source: 'images', target: 'streaming', animated: true, style: { stroke: '#F57C00' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#F57C00' } },
  { id: 'e3', source: 'audio', target: 'storage', animated: true, style: { stroke: '#F57C00' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#F57C00' } },
  { id: 'e4', source: 'structured', target: 'storage', animated: true, style: { stroke: '#F57C00' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#F57C00' } },

  // Processing to Database
  { id: 'e5', source: 'streaming', target: 'database', style: { stroke: '#C74634' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#C74634' } },
  { id: 'e6', source: 'storage', target: 'database', style: { stroke: '#C74634' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#C74634' } },
  { id: 'e7', source: 'database', target: 'vectors', style: { stroke: '#C74634' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#C74634' } },
  { id: 'e8', source: 'vectors', target: 'cache', style: { stroke: '#C74634' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#C74634' } },

  // Database to AI Services
  { id: 'e9', source: 'database', target: 'agenthub', style: { stroke: '#7B1FA2' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#7B1FA2' } },
  { id: 'e10', source: 'vectors', target: 'genai', style: { stroke: '#7B1FA2' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#7B1FA2' } },
  { id: 'e11', source: 'cache', target: 'speech', style: { stroke: '#7B1FA2' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#7B1FA2' } },

  // AI Services to Models
  { id: 'e12', source: 'agenthub', target: 'cohere', style: { stroke: '#9C27B0' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#9C27B0' } },
  { id: 'e13', source: 'genai', target: 'cohere', style: { stroke: '#9C27B0' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#9C27B0' } },
  { id: 'e14', source: 'genai', target: 'llama', style: { stroke: '#9C27B0' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#9C27B0' } },
  { id: 'e15', source: 'speech', target: 'llama', style: { stroke: '#9C27B0' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#9C27B0' } },

  // Models to Outputs
  { id: 'e16', source: 'cohere', target: 'reports', animated: true, style: { stroke: '#1976D2' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#1976D2' } },
  { id: 'e17', source: 'cohere', target: 'insights', animated: true, style: { stroke: '#1976D2' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#1976D2' } },
  { id: 'e18', source: 'llama', target: 'automation', animated: true, style: { stroke: '#1976D2' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#1976D2' } },
  { id: 'e19', source: 'llama', target: 'assistant', animated: true, style: { stroke: '#1976D2' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#1976D2' } },
]

export function EcosystemGraph() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  return (
    <div className="w-full h-[500px] rounded-2xl overflow-hidden border border-white/10 bg-slate-900/50">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        connectionLineType={ConnectionLineType.SmoothStep}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.5}
        maxZoom={1.5}
        attributionPosition="bottom-left"
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#334155" gap={20} size={1} />
        <Controls
          showInteractive={false}
          style={{
            background: 'rgba(15, 23, 42, 0.8)',
            borderRadius: '8px',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        />
        <MiniMap
          nodeColor={(n) => {
            const bg = n.style?.background as string
            return bg || '#C74634'
          }}
          maskColor="rgba(15, 23, 42, 0.8)"
          style={{
            background: 'rgba(15, 23, 42, 0.9)',
            borderRadius: '8px',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        />
      </ReactFlow>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 flex flex-wrap gap-3 p-3 rounded-xl bg-slate-900/90 backdrop-blur-xl border border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#F57C00]" />
          <span className="text-xs text-slate-300">Data Sources</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#C74634]" />
          <span className="text-xs text-slate-300">OCI Services</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#7B1FA2]" />
          <span className="text-xs text-slate-300">AI Services</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#1976D2]" />
          <span className="text-xs text-slate-300">Outputs</span>
        </div>
      </div>
    </div>
  )
}
