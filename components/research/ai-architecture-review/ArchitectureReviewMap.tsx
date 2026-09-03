'use client'

import Image from 'next/image'
import { useCallback, useMemo, useState } from 'react'
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

import { trackEvent } from '@/lib/analytics'
import { cn } from '@/lib/utils'

import styles from './ArchitectureReviewMap.module.css'

type LayerTone = 'emerald' | 'cyan' | 'amber' | 'zinc'

type ArchitectureLayerData = Record<string, unknown> & {
  index: string
  label: string
  eyebrow: string
  description: string
  control: string
  logo: string
  tone: LayerTone
}

const toneClasses: Record<
  LayerTone,
  { border: string; badge: string; selected: string }
> = {
  emerald: {
    border: 'border-emerald-300/25',
    badge: 'text-emerald-200 bg-emerald-300/10',
    selected: 'ring-emerald-300/50',
  },
  cyan: {
    border: 'border-cyan-300/25',
    badge: 'text-cyan-200 bg-cyan-300/10',
    selected: 'ring-cyan-300/50',
  },
  amber: {
    border: 'border-amber-300/25',
    badge: 'text-amber-200 bg-amber-300/10',
    selected: 'ring-amber-300/50',
  },
  zinc: {
    border: 'border-white/15',
    badge: 'text-zinc-200 bg-white/[0.06]',
    selected: 'ring-white/30',
  },
}

function ArchitectureNode({
  data,
  selected,
}: NodeProps<Node<ArchitectureLayerData>>) {
  const tone = toneClasses[data.tone]

  return (
    <div
      className={cn(
        'w-[174px] rounded-xl border bg-[#09100d]/95 px-3 py-3 shadow-[0_18px_50px_rgba(0,0,0,0.24)]',
        tone.border,
        selected && ['ring-2', tone.selected],
      )}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="!h-2.5 !w-2.5 !border-[#688275] !bg-[#0b1510]"
      />
      <div className="flex items-start gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-black/25">
          <Image src={data.logo} alt="" width={18} height={18} />
        </span>
        <span className="min-w-0">
          <span
            className={cn(
              'mb-1 inline-flex rounded px-1.5 py-0.5 font-mono text-[8px] tracking-[0.14em]',
              tone.badge,
            )}
          >
            {data.eyebrow}
          </span>
          <span className="block text-[13px] font-semibold leading-tight text-zinc-100">
            {data.label}
          </span>
        </span>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        className="!h-2.5 !w-2.5 !border-[#688275] !bg-[#0b1510]"
      />
    </div>
  )
}

const nodeTypes = { architecture: ArchitectureNode }

const initialNodes: Node<ArchitectureLayerData>[] = [
  {
    id: 'events',
    type: 'architecture',
    position: { x: 0, y: 224 },
    data: {
      index: '00',
      label: 'App and repo events',
      eyebrow: 'TRIGGERS',
      description:
        'GitHub reviews, Slack or Gmail events, schedules, and direct operator requests.',
      control:
        'Accept a typed event envelope; discard unneeded payload fields before planning.',
      logo: '/images/logos/github.svg',
      tone: 'zinc',
    },
  },
  {
    id: 'connectors',
    type: 'architecture',
    position: { x: 214, y: 72 },
    data: {
      index: '01',
      label: 'Connector policy gate',
      eyebrow: 'MCP + CONNECT',
      description:
        'Capability discovery, identity, short-lived credentials, and action approvals.',
      control:
        'Discovery never implies authorization. Mint task-scoped credentials at runtime.',
      logo: '/images/logos/vercel.svg',
      tone: 'cyan',
    },
  },
  {
    id: 'graph',
    type: 'architecture',
    position: { x: 214, y: 374 },
    data: {
      index: '02',
      label: 'Owned graph state',
      eyebrow: 'GRAPH CONTRACT',
      description:
        'Canonical work, ownership, policy, status, evidence, and relationships in PostgreSQL.',
      control:
        'No harness owns business truth; every transition is typed and attributable.',
      logo: '/images/logos/supabase.svg',
      tone: 'emerald',
    },
  },
  {
    id: 'harness',
    type: 'architecture',
    position: { x: 440, y: 224 },
    selected: true,
    data: {
      index: '03',
      label: 'Harness router',
      eyebrow: 'BOUNDED AGENTS',
      description:
        'Codex, Claude Code, Cursor, Grok Build, and other runtimes behind adapters.',
      control:
        'Send a bounded work package; require a typed result, trace, and changed-file manifest.',
      logo: '/images/logos/openai.svg',
      tone: 'emerald',
    },
  },
  {
    id: 'models',
    type: 'architecture',
    position: { x: 664, y: 36 },
    data: {
      index: '04',
      label: 'Model role router',
      eyebrow: 'POLICY + EVALS',
      description:
        'A workload route chosen from task fit, policy, cost, residency, and evaluation history.',
      control:
        'Never use one global winner. Preserve explicit fallbacks and pin production policy.',
      logo: '/images/logos/anthropic-mark.svg',
      tone: 'cyan',
    },
  },
  {
    id: 'durability',
    type: 'architecture',
    position: { x: 664, y: 224 },
    data: {
      index: '05',
      label: 'Durable execution',
      eyebrow: 'WORKFLOW',
      description:
        'Retries, timers, resumability, human waits, webhooks, and idempotent side effects.',
      control:
        'Choose one durability owner per workflow; do not split canonical state across engines.',
      logo: '/images/logos/temporal.svg',
      tone: 'amber',
    },
  },
  {
    id: 'evidence',
    type: 'architecture',
    position: { x: 664, y: 412 },
    data: {
      index: '06',
      label: 'Evidence ledger',
      eyebrow: 'TRACE + RECEIPT',
      description:
        'Inputs, sources, tool calls, diffs, tests, reviewer decisions, deploys, and rollback.',
      control:
        'A public claim or release state is valid only when its receipt can be retrieved.',
      logo: '/images/logos/github.svg',
      tone: 'emerald',
    },
  },
  {
    id: 'release',
    type: 'architecture',
    position: { x: 890, y: 224 },
    data: {
      index: '07',
      label: 'Git + Vercel release',
      eyebrow: 'PREVIEW FIRST',
      description:
        'A reviewable branch and draft pull request become the deployment input.',
      control:
        'Git integration only; production promotion remains a separate human approval.',
      logo: '/images/logos/vercel.svg',
      tone: 'zinc',
    },
  },
]

const initialEdges: Edge[] = [
  { id: 'events-connectors', source: 'events', target: 'connectors' },
  { id: 'events-graph', source: 'events', target: 'graph' },
  { id: 'connectors-harness', source: 'connectors', target: 'harness' },
  { id: 'graph-harness', source: 'graph', target: 'harness' },
  { id: 'harness-models', source: 'harness', target: 'models' },
  { id: 'harness-durability', source: 'harness', target: 'durability' },
  { id: 'models-durability', source: 'models', target: 'durability' },
  { id: 'durability-evidence', source: 'durability', target: 'evidence' },
  {
    id: 'evidence-release',
    source: 'evidence',
    target: 'release',
    animated: true,
    className: 'evidence-edge',
    markerEnd: { type: MarkerType.ArrowClosed, color: '#72e6b7' },
  },
]

function MobileArchitectureRail() {
  const orderedIds = [
    'events',
    'connectors',
    'graph',
    'harness',
    'models',
    'durability',
    'evidence',
    'release',
  ]
  const orderedLayers = orderedIds.flatMap((id) => {
    const node = initialNodes.find((candidate) => candidate.id === id)
    return node ? [node.data] : []
  })

  return (
    <div className="space-y-3 lg:hidden">
      {orderedLayers.map((layer, index) => (
        <div
          key={layer.label}
          className="relative rounded-2xl border border-white/10 bg-[#07100c] p-4"
        >
          {index < orderedLayers.length - 1 ? (
            <span
              className="absolute -bottom-4 left-8 h-4 w-px bg-emerald-300/30"
              aria-hidden="true"
            />
          ) : null}
          <div className="flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-black/25">
              <Image src={layer.logo} alt="" width={20} height={20} />
            </span>
            <div>
              <div className="mb-1 font-mono text-[9px] tracking-[0.16em] text-emerald-200">
                {String(index + 1).padStart(2, '0')} / {layer.eyebrow}
              </div>
              <h3 className="text-sm font-semibold text-zinc-100">
                {layer.label}
              </h3>
              <p className="mt-1.5 text-xs leading-5 text-zinc-400">
                {layer.description}
              </p>
              <p className="mt-2 border-l border-emerald-300/30 pl-3 text-[11px] leading-5 text-zinc-300">
                {layer.control}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function ArchitectureReviewMap() {
  const [selectedId, setSelectedId] = useState('harness')
  const nodes = useMemo(
    () =>
      initialNodes.map((node) => ({
        ...node,
        selected: node.id === selectedId,
      })),
    [selectedId],
  )
  const selectedNode = nodes.find((node) => node.id === selectedId) ?? nodes[0]

  const selectLayer = useCallback((nodeId: string, origin: 'map' | 'rail') => {
    setSelectedId(nodeId)
    trackEvent('ai_architecture_review_layer_selected', {
      layer: nodeId,
      origin,
      issue: '2026-08-31',
    })
  }, [])

  return (
    <div>
      <div className="hidden lg:block">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#050907]">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div>
              <p className="font-mono text-[9px] tracking-[0.16em] text-zinc-500">
                OPERATING ARCHITECTURE / XYFLOW
              </p>
              <p className="mt-1 text-xs text-zinc-300">
                Select a layer to inspect its control.
              </p>
            </div>
            <span className="rounded-full border border-emerald-300/20 bg-emerald-300/[0.06] px-2.5 py-1 font-mono text-[9px] text-emerald-200">
              OWNED STATE
            </span>
          </div>
          <div
            className={cn('h-[510px] w-full', styles.flow)}
            aria-label="Interactive Starlight Graph OS architecture"
          >
            <ReactFlow
              nodes={nodes}
              edges={initialEdges}
              nodeTypes={nodeTypes}
              onNodeClick={(_, node) => selectLayer(node.id, 'map')}
              nodesDraggable={false}
              nodesConnectable={false}
              edgesFocusable={false}
              fitView
              fitViewOptions={{ padding: 0.08, minZoom: 0.72, maxZoom: 1 }}
              minZoom={0.6}
              maxZoom={1.35}
            >
              <Background gap={24} size={1} />
              <Controls showInteractive={false} position="bottom-right" />
            </ReactFlow>
          </div>
          <div className="border-t border-white/10 bg-[#070c09] p-4">
            <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
              {nodes.map((node) => (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => selectLayer(node.id, 'rail')}
                  aria-pressed={node.id === selectedId}
                  className={cn(
                    'shrink-0 rounded-full border px-3 py-1.5 font-mono text-[9px] tracking-[0.08em] transition-colors',
                    node.id === selectedId
                      ? 'border-emerald-300/40 bg-emerald-300/10 text-emerald-100'
                      : 'border-white/10 bg-white/[0.02] text-zinc-500 hover:border-white/20 hover:text-zinc-300',
                  )}
                >
                  {node.data.label}
                </button>
              ))}
            </div>
            <div className="grid gap-3 md:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="font-mono text-[9px] tracking-[0.14em] text-emerald-200">
                  SELECTED / {selectedNode.data.eyebrow}
                </p>
                <p className="mt-1.5 text-sm font-semibold text-zinc-100">
                  {selectedNode.data.label}
                </p>
                <p className="mt-1 text-xs leading-5 text-zinc-400">
                  {selectedNode.data.description}
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/20 px-3 py-3">
                <p className="font-mono text-[9px] tracking-[0.14em] text-zinc-500">
                  NON-NEGOTIABLE CONTROL
                </p>
                <p className="mt-1.5 text-xs leading-5 text-zinc-200">
                  {selectedNode.data.control}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MobileArchitectureRail />
    </div>
  )
}
