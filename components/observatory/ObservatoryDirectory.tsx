'use client'

import { useMemo } from 'react'
import type { Catalog, CatalogNode, NodeKind } from '@/lib/observatory/types'
import { kindColor, kindLabel, tierColor, palette, withAlpha } from '@/lib/observatory/theme'

const KIND_GLYPH: Record<string, string> = {
  agent: '◆',
  skill: '✦',
  command: '⌘',
  workflow: '⛓',
  'iam-profile': '⛨',
}

/**
 * Touch/mobile fallback for the graph — a searchable, grouped card directory.
 * Graphs are unusable on small screens, so below the md breakpoint we render
 * this instead (same data, same filters, same detail-sheet wiring).
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
  const total = [...groups.values()].reduce((s, g) => s + g.length, 0)

  if (total === 0) {
    return (
      <div className="flex h-full items-center justify-center px-8 text-center" style={{ background: palette.ink }}>
        <p className="text-sm" style={{ color: palette.faint }}>
          Nothing matches “{query}”. Try a different search or re-enable a filter.
        </p>
      </div>
    )
  }

  return (
    <div
      className="h-full overflow-auto overscroll-contain px-4 pb-[max(2rem,env(safe-area-inset-bottom))] pt-1"
      style={{ background: palette.ink }}
    >
      {order
        .filter((k) => groups.has(k))
        .map((kind) => (
          <section key={kind} className="mb-5">
            <h3
              className="sticky top-0 z-10 -mx-4 mb-2 flex items-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm"
              style={{
                color: palette.midGray,
                background: withAlpha(palette.ink, 0.92),
                borderBottom: `1px solid ${palette.line}`,
              }}
            >
              <span className="h-2 w-2 rounded-full" style={{ background: kindColor[kind] }} />
              {kindLabel[kind]}
              <span
                className="ml-1 rounded-full px-1.5 py-0.5 text-[10px] tabular-nums"
                style={{ background: withAlpha(kindColor[kind], 0.15), color: palette.light }}
              >
                {groups.get(kind)!.length}
              </span>
            </h3>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {groups.get(kind)!.map((n) => {
                const accent = n.kind === 'agent' && n.tier ? tierColor[n.tier] : kindColor[n.kind]
                return (
                  <button
                    key={n.id}
                    onClick={() => onSelect(n)}
                    className="flex min-h-[64px] flex-col gap-1 rounded-xl border p-3 text-left transition-transform active:scale-[0.99]"
                    style={{
                      background: palette.panel,
                      borderColor: palette.line,
                      borderLeft: `3px solid ${withAlpha(accent, 0.7)}`,
                    }}
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-[10px]"
                        style={{ background: withAlpha(accent, 0.16), color: accent }}
                        aria-hidden
                      >
                        {KIND_GLYPH[n.kind] ?? '◆'}
                      </span>
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
                      <span className="line-clamp-2 text-xs leading-snug" style={{ color: palette.faint }}>
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
