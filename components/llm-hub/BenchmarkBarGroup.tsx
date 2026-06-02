'use client'

interface ModelScores {
  name: string
  color: string
  scores: Record<string, number>
}

interface BenchmarkBarGroupProps {
  axes: { key: string; label: string; max?: number }[]
  models: ModelScores[]
}

export function BenchmarkBarGroup({ axes, models }: BenchmarkBarGroupProps) {
  return (
    <div className="space-y-5">
      {axes.map((axis) => {
        const max = axis.max ?? 100
        return (
          <div key={axis.key}>
            <div className="mb-1.5 flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wider text-white/70">
                {axis.label}
              </p>
              <p className="text-[10px] text-white/30">Higher is better · max {max}</p>
            </div>
            <div className="space-y-1.5">
              {models.map((m) => {
                const v = m.scores[axis.key]
                const pct = v === undefined ? 0 : Math.max(0, Math.min(100, (v / max) * 100))
                return (
                  <div key={`${axis.key}-${m.name}`} className="flex items-center gap-2">
                    <span className="w-32 shrink-0 truncate text-[11px] text-white/60">
                      {m.name}
                    </span>
                    <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-white/[0.05]">
                      <div
                        className="absolute inset-y-0 left-0 rounded-full transition-all"
                        style={{ width: `${pct}%`, backgroundColor: m.color }}
                      />
                    </div>
                    <span className="w-10 shrink-0 text-right font-mono text-[11px] text-white/60">
                      {v === undefined ? '—' : v}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
