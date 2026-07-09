'use client'

import type { DimensionScore } from '@/lib/scorecard/engine'

interface DimensionRadarProps {
  scores: DimensionScore[]
  size?: number
  color?: string
}

// Self-contained SVG radar — no chart dependency. Adapted from
// components/llm-hub/BenchmarkRadar.tsx's single-subject geometry, restyled
// for the operator scorecard's sharper, tech-primary (emerald/cyan) palette
// per DESIGN_TASTE's "FrankX business surfaces feel direct, commercial, sharp"
// brand-behavior rule, distinct from the soul-frequency quiz's aurora treatment.
export function DimensionRadar({ scores, size = 340, color = '#10b981' }: DimensionRadarProps) {
  const cx = size / 2
  const cy = size / 2
  const r = size * 0.34
  const n = scores.length
  const angle = (i: number) => (Math.PI * 2 * i) / n - Math.PI / 2

  const axisPoint = (i: number, mag: number) => ({
    x: cx + Math.cos(angle(i)) * r * mag,
    y: cy + Math.sin(angle(i)) * r * mag,
  })

  const labelPoint = (i: number) => ({
    x: cx + Math.cos(angle(i)) * (r + 34),
    y: cy + Math.sin(angle(i)) * (r + 34),
  })

  const gridLevels = [0.25, 0.5, 0.75, 1]

  const polygonPoints = scores
    .map((s, i) => {
      const p = axisPoint(i, Math.max(0, Math.min(1, s.pct / 100)))
      return `${p.x.toFixed(1)},${p.y.toFixed(1)}`
    })
    .join(' ')

  return (
    <svg
      width="100%"
      height="auto"
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label={`Dimension breakdown: ${scores.map((s) => `${s.label} ${s.pct}%`).join(', ')}`}
      className="mx-auto max-w-[420px]"
    >
      {gridLevels.map((lvl) => (
        <polygon
          key={lvl}
          points={scores
            .map((_, i) => {
              const p = axisPoint(i, lvl)
              return `${p.x.toFixed(1)},${p.y.toFixed(1)}`
            })
            .join(' ')}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={1}
        />
      ))}

      {scores.map((s, i) => {
        const p = axisPoint(i, 1)
        const lp = labelPoint(i)
        return (
          <g key={s.dimension}>
            <line x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="rgba(255,255,255,0.1)" strokeWidth={1} />
            <text
              x={lp.x}
              y={lp.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={10.5}
              fill="rgba(255,255,255,0.65)"
              className="font-mono uppercase tracking-wider"
            >
              {s.label}
            </text>
            <text
              x={lp.x}
              y={lp.y + 13}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={11}
              fill={color}
              className="font-mono font-semibold"
            >
              {s.pct}%
            </text>
          </g>
        )
      })}

      <polygon points={polygonPoints} fill={`${color}26`} stroke={color} strokeWidth={2} />
      {scores.map((s, i) => {
        const p = axisPoint(i, Math.max(0, Math.min(1, s.pct / 100)))
        return <circle key={s.dimension} cx={p.x} cy={p.y} r={3.5} fill={color} />
      })}
    </svg>
  )
}
