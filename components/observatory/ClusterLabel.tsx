'use client'

import { memo } from 'react'
import type { NodeProps } from '@xyflow/react'
import { palette, withAlpha } from '@/lib/observatory/theme'

export interface ClusterLabelData {
  label: string
  color: string
  count: number
  [key: string]: unknown
}

function ClusterLabelComponent({ data }: NodeProps) {
  const { label, color, count } = data as ClusterLabelData
  return (
    <div
      className="pointer-events-none flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-1"
      style={{
        background: withAlpha(color, 0.12),
        border: `1px solid ${withAlpha(color, 0.4)}`,
        width: 180,
        justifyContent: 'center',
      }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />
      <span
        className="text-[12px] font-semibold capitalize tracking-wide"
        style={{ color: palette.light, fontFamily: 'var(--font-poppins, inherit)' }}
      >
        {label}
      </span>
      <span className="text-[11px] tabular-nums" style={{ color: palette.faint }}>
        {count}
      </span>
    </div>
  )
}

export const ClusterLabel = memo(ClusterLabelComponent)
