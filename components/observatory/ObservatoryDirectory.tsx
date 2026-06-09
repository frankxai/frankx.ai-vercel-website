'use client'

import { useMemo } from 'react'
import type { Catalog, CatalogNode, NodeKind } from '@/lib/observatory/types'
import { kindColor, kindLabel, tierColor, palette, withAlpha } from '@/lib/observatory/theme'

/**
 * Touch/mobile fallback for the graph — a searchable, grouped card directory.
 * Graphs are unusable on small screens, so below the md breakpoint we render
 * this instead (same data, same filters, same detail-drawer wiring).
 */
export function ObservatoryDirectory({
  catalog,
  visibleKinds,
  query,
  onSelect,
}: {
  catalog: Catalog
  visibleKinds: Set<NodeKind>
  query: string
  onSelect: (n: CatalogNode) => void
}) {
  const q = query.trim().toLowerCase()
  const groups = useMemo(() => {
    const out = new Map<NodeKind, CatalogNode[]>()
    for (const n of catalog.nodes || []) {
      if (!visibleKinds.has(n.kind)) continue
      if (
        q &&
        !(n.name ?? '').toLowerCase().includes(q) &&
        !(n.description ?? '').toLowerCase().includes(q) &&
        !(n.group ?? '').toLowerCase().includes(q)
      )
        continue
      if (!out.has(n.kind)) out.set(n.kind, [])
      out.get(n.kind)!.push(n)
    }
    return out
  }, [catalog, visibleKinds, q])

  const order: NodeKind[] = ['agent', 'skill', 'command', 'workflow', 'iam-profile']

  return (
    <div className="h-full overflow-auto px-4 py-5" style={{ background: palette.ink }}>
      {order
        .filter((k) => groups.has(k))
        .map((kind) => (
          <section key={kind} className="mb-6">
            <h3
              className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider"
              style={{ color: palette.midGray }}
            >
              <span className="h-2 w-2 rounded-full" style={{ background: kindColor[kind] }} />
              {kindLabel[kind]} · {groups.get(kind)!.length}
            </h3>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {groups.get(kind)!.map((n) => {
                const accent = n.kind === 'agent' && n.tier ? tierColor[n.tier] : kindColor[n.kind]
                return (
                  <button
                    key={n.id}
                    onClick={() => onSelect(n)}
                    className="flex flex-col gap-1 rounded-xl border p-3 text-left transition-colors active:scale-[0.99]"
                    style={{ background: palette.panel, borderColor: palette.line }}
                  >
                    <span className="flex items-center gap-2">
                      <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: accent }} />
                      <span className="truncate text-sm font-medium" style={{ color: palette.light }}>
                        {n.name}
                      </span>
                      {n.tier && (
                        <span
                          className="ml-auto shrink-0 rounded px-1.5 py-0.5 text-[10px]"
                          style={{ background: withAlpha(accent, 0.18), color: palette.light }}
                        >
                          {n.tier}
                        </span>
                      )}
                    </span>
                    {n.description && (
                      <span className="line-clamp-2 text-xs" style={{ color: palette.faint }}>
                        {n.description}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </section>
        ))}
    </div>
  )
}
