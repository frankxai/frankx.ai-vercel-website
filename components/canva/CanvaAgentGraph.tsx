'use client'

import Image from 'next/image'
import {
  Background,
  Controls,
  Handle,
  MarkerType,
  Position,
  ReactFlow,
  type Edge,
  type Node,
  type NodeProps,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import {
  BarChart3,
  BookOpenCheck,
  Bot,
  ExternalLink,
  FileCheck2,
  Globe2,
  Library,
  RadioTower,
  SearchCheck,
} from 'lucide-react'

import { trackEvent } from '@/lib/analytics'
import { canvaArchitectureSteps } from '@/data/canva-founder-content'

type NodeKind =
  | 'signal'
  | 'brief'
  | 'agent'
  | 'canva'
  | 'library'
  | 'review'
  | 'site'
  | 'channel'
  | 'measure'

interface CanvaNodeData extends Record<string, unknown> {
  label: string
  eyebrow: string
  description: string
  href: string
  kind: NodeKind
  external?: boolean
}

const iconMap = {
  signal: SearchCheck,
  brief: BookOpenCheck,
  agent: Bot,
  canva: Bot,
  library: Library,
  review: FileCheck2,
  site: Globe2,
  channel: RadioTower,
  measure: BarChart3,
} as const

const toneMap: Record<NodeKind, string> = {
  signal: 'border-cyan-300/25 bg-cyan-300/[0.07]',
  brief: 'border-emerald-300/25 bg-emerald-300/[0.07]',
  agent: 'border-emerald-300/35 bg-emerald-300/[0.09]',
  canva: 'border-violet-300/30 bg-violet-300/[0.08]',
  library: 'border-violet-300/20 bg-violet-300/[0.05]',
  review: 'border-amber-200/25 bg-amber-200/[0.06]',
  site: 'border-cyan-300/25 bg-cyan-300/[0.07]',
  channel: 'border-sky-300/20 bg-sky-300/[0.05]',
  measure: 'border-emerald-300/25 bg-emerald-300/[0.06]',
}

function SystemNode({ data }: NodeProps<Node<CanvaNodeData>>) {
  const Icon = iconMap[data.kind]

  return (
    <a
      href={data.href}
      target={data.external ? '_blank' : undefined}
      rel={data.external ? 'noreferrer' : undefined}
      className={`nodrag nowheel block w-[210px] rounded-2xl border p-4 shadow-[0_18px_70px_rgba(0,0,0,0.28)] backdrop-blur-md transition-colors hover:border-white/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 ${toneMap[data.kind]}`}
      onClick={() =>
        trackEvent('canva_architecture_node_opened', {
          node: data.kind,
          destination: data.href,
        })
      }
      aria-label={`${data.label}: ${data.description}`}
    >
      <Handle type="target" position={Position.Left} className="!h-2 !w-2 !border-0 !bg-white/30" />
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-h-10 items-center gap-3">
          {data.kind === 'canva' ? (
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white p-2">
              <Image
                src="/brand/canva/canva-icon.svg"
                width={24}
                height={24}
                alt="Canva"
              />
            </span>
          ) : (
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black/25 text-white/75">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
          )}
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/60">
              {data.eyebrow}
            </p>
            <p className="mt-1 text-sm font-semibold leading-5 text-white">
              {data.label}
            </p>
          </div>
        </div>
        <ExternalLink className="mt-1 h-3.5 w-3.5 shrink-0 text-white/35" aria-hidden="true" />
      </div>
      <p className="mt-3 text-[11px] leading-5 text-white/55">{data.description}</p>
      <Handle type="source" position={Position.Right} className="!h-2 !w-2 !border-0 !bg-white/30" />
    </a>
  )
}

const nodeTypes = { system: SystemNode }

const positions: Record<NodeKind, { x: number; y: number }> = {
  signal: { x: 0, y: 170 },
  brief: { x: 260, y: 170 },
  agent: { x: 520, y: 170 },
  canva: { x: 790, y: 60 },
  library: { x: 790, y: 300 },
  review: { x: 1060, y: 170 },
  site: { x: 1330, y: 60 },
  channel: { x: 1330, y: 300 },
  measure: { x: 790, y: 520 },
}

const nodes: Node<CanvaNodeData>[] = canvaArchitectureSteps.map((step) => ({
  id: step.kind,
  type: 'system',
  position: positions[step.kind],
  data: {
    ...step,
  },
}))

const edgeBase = {
  type: 'smoothstep',
  markerEnd: { type: MarkerType.ArrowClosed, color: 'rgba(167,243,208,0.52)' },
  style: { stroke: 'rgba(167,243,208,0.38)', strokeWidth: 1.4 },
}

const edges: Edge[] = [
  { id: 'signal-brief', source: 'signal', target: 'brief', ...edgeBase },
  { id: 'brief-agent', source: 'brief', target: 'agent', ...edgeBase },
  { id: 'agent-canva', source: 'agent', target: 'canva', ...edgeBase },
  { id: 'agent-library', source: 'agent', target: 'library', ...edgeBase },
  { id: 'library-canva', source: 'library', target: 'canva', ...edgeBase },
  { id: 'canva-review', source: 'canva', target: 'review', ...edgeBase },
  { id: 'review-site', source: 'review', target: 'site', ...edgeBase },
  { id: 'review-channel', source: 'review', target: 'channel', ...edgeBase },
  { id: 'site-measure', source: 'site', target: 'measure', ...edgeBase },
  { id: 'channel-measure', source: 'channel', target: 'measure', ...edgeBase },
  {
    id: 'measure-signal',
    source: 'measure',
    target: 'signal',
    ...edgeBase,
    animated: true,
    label: 'next verified brief',
    labelStyle: { fill: 'rgba(255,255,255,0.5)', fontSize: 10 },
  },
]

export function CanvaAgentGraph() {
  return (
    <div className="hidden h-[680px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#0d0f10] shadow-[0_40px_140px_rgba(0,0,0,0.45)] md:block">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.08 }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        panOnScroll={false}
        zoomOnScroll={false}
        preventScrolling={false}
        zoomOnDoubleClick={false}
        minZoom={0.4}
        maxZoom={1.3}
        aria-label="Interactive Canva founder content system architecture"
      >
        <Background color="rgba(255,255,255,0.08)" gap={26} size={1} />
        <Controls showInteractive={false} position="bottom-right" />
      </ReactFlow>
    </div>
  )
}
