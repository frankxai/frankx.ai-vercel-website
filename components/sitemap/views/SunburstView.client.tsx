'use client'

import { ResponsiveSunburst } from '@nivo/sunburst'
import { useMemo } from 'react'
import type { SitemapGraph, SitemapNode } from '@/lib/sitemap/types'

interface SunburstNode {
  id: string
  color?: string
  value?: number
  children?: SunburstNode[]
}

interface SunburstViewProps {
  graph: SitemapGraph
}

const DARKEN_COLOR = '#0a0a0b'

export default function SunburstView({ graph }: SunburstViewProps) {
  const data = useMemo<SunburstNode>(() => {
    const routesByCategory = new Map<string, SitemapNode[]>()
    for (const n of graph.nodes) {
      if (n.kind !== 'route') continue
      if (!routesByCategory.has(n.category)) routesByCategory.set(n.category, [])
      routesByCategory.get(n.category)!.push(n)
    }

    return {
      id: 'FrankX',
      children: graph.categories
        .map((c) => {
          const routes = routesByCategory.get(c.key) || []
          if (routes.length === 0) return null
          return {
            id: c.label,
            color: c.color,
            children: routes.map((r) => ({
              id: r.label.length > 28 ? `${r.label.slice(0, 26)}…` : r.label,
              color: c.color,
              value: 1 + (r.imageCount || 0) * 0.5,
            })),
          }
        })
        .filter((x): x is NonNullable<typeof x> => x !== null),
    }
  }, [graph])

  if (!data.children || data.children.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-white/40 text-sm">
        No routes match the current filters.
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.02] to-transparent p-4 sm:p-6">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between mb-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-cyan-400/60 mb-1">Hierarchy</p>
          <h2 className="text-lg sm:text-xl font-semibold text-white">
            {data.children.length} categories
            <span className="text-white/40 font-normal"> · {graph.stats.totalRoutes} routes</span>
          </h2>
        </div>
        <p className="text-xs text-white/40">
          Inner ring = category · outer ring = route · arc weight = image attachment
        </p>
      </div>

      <div className="relative w-full" style={{ height: 'min(720px, 80vh)' }}>
        <ResponsiveSunburst
          data={data as never}
          margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
          id="id"
          value="value"
          cornerRadius={2}
          borderColor={{ from: 'color', modifiers: [['darker', 0.4]] }}
          borderWidth={1}
          colors={(node) => (node.data as { color?: string }).color || '#64748B'}
          inheritColorFromParent
          childColor={{ from: 'color', modifiers: [['brighter', 0.25]] }}
          enableArcLabels
          arcLabel={(d) => String(d.id)}
          arcLabelsSkipAngle={12}
          arcLabelsTextColor={DARKEN_COLOR}
          theme={{
            text: {
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: 11,
              fill: DARKEN_COLOR,
            },
            tooltip: {
              container: {
                background: '#0a0a0b',
                color: '#fff',
                fontSize: 12,
                borderRadius: 8,
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
                padding: '6px 10px',
              },
            },
          }}
          tooltip={(node) => (
            <strong>
              {String(node.id)} <span style={{ opacity: 0.6 }}>· {Math.round(node.value)}</span>
            </strong>
          )}
          motionConfig="gentle"
          animate
        />
      </div>

      <p className="mt-3 text-xs text-white/40 text-center">
        Click a slice to focus that category. Click the center to zoom out.
      </p>
    </div>
  )
}
