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

function ObservatoryNodeComponent({ data, selected }: NodeProps) {
  const { node, dim, active } = data as ObservatoryNodeData
  const accent = node.kind === 'agent' && node.tier ? tierColor[node.tier] : kindColor[node.kind]

  return (
    <div
      className="group relative flex items-center gap-2 rounded-xl px-3 py-2 transition-all duration-200"
      style={{
        width: 178,
        background: active ? withAlpha(accent, 0.22) : palette.kraftPanel,
        border: `1px solid ${selected ? accent : active ? withAlpha(accent, 0.7) : palette.line}`,
        boxShadow: active
          ? `0 0 0 2px ${withAlpha(accent, 0.5)}, 0 0 22px ${withAlpha(accent, 0.55)}`
          : selected
          ? `0 0 0 1px ${withAlpha(accent, 0.6)}, 0 6px 20px rgba(0,0,0,0.4)`
          : '0 1px 2px rgba(0,0,0,0.3)',
        opacity: dim ? 0.28 : 1,
      }}
    >
      <Handle type="target" position={Position.Top} style={{ opacity: 0, width: 1, height: 1 }} />
      <span
        className="shrink-0 rounded-full"
        style={{
          width: 9,
          height: 9,
          background: accent,
          boxShadow: active ? `0 0 8px ${accent}` : 'none',
        }}
      />
      <span
        className="truncate text-[12px] font-medium leading-tight"
        style={{ color: palette.cream }}
        title={node.name}
      >
        {node.name}
      </span>
      {active && (
        <span
          className="absolute inset-0 rounded-xl"
          style={{ border: `1px solid ${accent}`, animation: 'observatory-ping 1.4s ease-out infinite' }}
        />
      )}
      <Handle type="source" position={Position.Bottom} style={{ opacity: 0, width: 1, height: 1 }} />
    </div>
  )
}

export const ObservatoryNode = memo(ObservatoryNodeComponent)
