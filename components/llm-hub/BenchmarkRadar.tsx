'use client'

interface ModelScores {
  name: string
  color: string
  scores: Record<string, number>
}

interface BenchmarkRadarProps {
  axes: { key: string; label: string; max?: number }[]
  models: ModelScores[]
  size?: number
}

export function BenchmarkRadar({ axes, models, size = 360 }: BenchmarkRadarProps) {
  const cx = size / 2
  const cy = size / 2
  const r = size * 0.38
  const n = axes.length
  const angle = (i: number) => (Math.PI * 2 * i) / n - Math.PI / 2

  const axisPoint = (i: number, mag: number) => ({
    x: cx + Math.cos(angle(i)) * r * mag,
    y: cy + Math.sin(angle(i)) * r * mag,
  })

  const labelPoint = (i: number) => ({
    x: cx + Math.cos(angle(i)) * (r + 22),
    y: cy + Math.sin(angle(i)) * (r + 22),
  })

  const gridLevels = [0.25, 0.5, 0.75, 1]

  const polygonFor = (m: ModelScores) =>
    axes
      .map((a, i) => {
        const v = m.scores[a.key] ?? 0
        const max = a.max ?? 100
        const mag = Math.max(0, Math.min(1, v / max))
        const p = axisPoint(i, mag)
        return `${p.x.toFixed(1)},${p.y.toFixed(1)}`
      })
      .join(' ')

  return (
    <div className="flex flex-col items-center gap-4">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label="Benchmark radar comparison">
        {/* grid rings */}
        {gridLevels.map((lvl) => (
          <polygon
            key={lvl}
            points={axes
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
        {/* axes */}
        {axes.map((a, i) => {
          const p = axisPoint(i, 1)
          const lp = labelPoint(i)
          return (
            <g key={a.key}>
              <line
                x1={cx}
                y1={cy}
                x2={p.x}
                y2={p.y}
                stroke="rgba(255,255,255,0.08)"
                strokeWidth={1}
              />
              <text
                x={lp.x}
                y={lp.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={10}
                fill="rgba(255,255,255,0.55)"
                className="font-mono uppercase tracking-wider"
              >
                {a.label}
              </text>
            </g>
          )
        })}
        {/* model polygons */}
        {models.map((m) => (
          <g key={m.name}>
            <polygon
              points={polygonFor(m)}
              fill={`${m.color}33`}
              stroke={m.color}
              strokeWidth={1.5}
            />
            {axes.map((a, i) => {
              const v = m.scores[a.key]
              if (v === undefined) return null
              const max = a.max ?? 100
              const mag = Math.max(0, Math.min(1, v / max))
              const p = axisPoint(i, mag)
              return (
                <circle
                  key={`${m.name}-${a.key}`}
                  cx={p.x}
                  cy={p.y}
                  r={3}
                  fill={m.color}
                />
              )
            })}
          </g>
        ))}
      </svg>
      <div className="flex flex-wrap justify-center gap-3">
        {models.map((m) => (
          <span key={m.name} className="inline-flex items-center gap-1.5 text-xs">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: m.color }}
              aria-hidden
            />
            <span className="text-white/70">{m.name}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
