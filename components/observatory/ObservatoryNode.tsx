'use client'

import { memo } from 'react'
import { Handle, Position, type NodeProps } from '@xyflow/react'
import type { CatalogNode } from '@/lib/observatory/types'
import { kindColor, tierColor, palette, withAlpha } from '@/lib/observatory/theme'

export interface ObservatoryNodeData {
  node: CatalogNode
  dim?: boolean
  active?: boolean // live-monitor pulse
  [key: string]: unknown
}

const KIND_GLYPH: Record<string, string> = {
  agent: '◆',
  skill: '✦',
  command: '⌘',
  workflow: '⛓',
  'iam-profile': '⛨',
}

function ObservatoryNodeComponent({ data, selected }: NodeProps) {
  const { node, dim, active } = data as ObservatoryNodeData
  const accent = node.kind === 'agent' && node.tier ? tierColor[node.tier] : kindColor[node.kind]

  return (
    <div
      className="group relative flex items-center gap-2 rounded-xl px-2.5 py-2 transition-all duration-200 hover:-translate-y-px"
      style={{
        width: 168,
        background: active ? withAlpha(accent, 0.2) : selected ? palette.panelHi : palette.panel,
        border: `1px solid ${selected ? accent : active ? withAlpha(accent, 0.7) : palette.line}`,
        boxShadow: active
          ? `0 0 0 1.5px ${withAlpha(accent, 0.55)}, 0 0 22px ${withAlpha(accent, 0.5)}`
          : selected
          ? `0 0 0 1px ${withAlpha(accent, 0.6)}, 0 8px 24px rgba(0,0,0,0.45)`
          : '0 1px 2px rgba(0,0,0,0.35)',
        opacity: dim ? 0.22 : 1,
      }}
    >
      <Handle type="target" position={Position.Top} style={{ opacity: 0, width: 1, height: 1, border: 0 }} />
      <span
        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-[10px]"
        style={{ background: withAlpha(accent, active ? 0.4 : 0.16), color: accent, boxShadow: active ? `0 0 8px ${accent}` : 'none' }}
        aria-hidden
      >
        {KIND_GLYPH[node.kind] ?? '◆'}
      </span>
      <span
        className="truncate text-[12px] font-medium leading-tight"
        style={{ color: palette.light }}
        title={node.name}
      >
        {node.name}
      </span>
      {node.status === 'gap' && (
        <span
          className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full"
          style={{ background: palette.faint }}
          title="gap — not yet shipped"
        />
      )}
      {active && (
        <span
          className="pointer-events-none absolute inset-0 rounded-xl motion-reduce:hidden"
          style={{ border: `1px solid ${accent}`, animation: 'observatory-ping 1.5s ease-out infinite' }}
        />
      )}
      <Handle type="source" position={Position.Bottom} style={{ opacity: 0, width: 1, height: 1, border: 0 }} />
    </div>
  )
}

export const ObservatoryNode = memo(ObservatoryNodeComponent)
