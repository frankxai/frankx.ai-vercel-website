'use client'

import { useMemo, useState } from 'react'
import type { Catalog, CatalogNode, NodeKind, ObservatoryView } from '@/lib/observatory/types'
import { kindColor, kindLabel, tierColor, tierLabel, palette, withAlpha } from '@/lib/observatory/theme'
import { AgentGraph } from './AgentGraph'
import { IamMatrix } from './IamMatrix'
import { ObservatoryDirectory } from './ObservatoryDirectory'
import { useLiveActivity, type LiveStatus } from '@/lib/observatory/useLiveActivity'
import { useMediaQuery } from '@/lib/observatory/useMediaQuery'

const ALL_KINDS: NodeKind[] = ['agent', 'skill', 'command', 'workflow', 'iam-profile']

const VIEWS: { id: ObservatoryView; label: string; hint: string }[] = [
  { id: 'galaxy', label: 'Galaxy', hint: 'Everything, grouped by kind' },
  { id: 'groups', label: 'Pillars', hint: 'Agents by domain, skills by category' },
  { id: 'workflows', label: 'Workflows', hint: 'Composition DAG' },
  { id: 'iam', label: 'IAM Matrix', hint: 'Capability scoping' },
]

export function ObservatoryShell({ catalog }: { catalog: Catalog }) {
  const [view, setView] = useState<ObservatoryView>('galaxy')
  const [visibleKinds, setVisibleKinds] = useState<Set<NodeKind>>(new Set(ALL_KINDS))
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<CatalogNode | null>(null)
  const [live, setLive] = useState(false)
  const { activeIds, status: liveStatus } = useLiveActivity(live)
  const isMobile = useMediaQuery('(max-width: 768px)')

  const tierCounts = useMemo(() => {
    const c: Record<string, number> = { haiku: 0, sonnet: 0, opus: 0 }
    for (const n of catalog?.nodes || []) {
      if (n.kind === 'agent' && n.tier && n.tier in c) c[n.tier]++
    }
    return c
  }, [catalog])

  const toggleKind = (k: NodeKind) => {
    setVisibleKinds((prev) => {
      const next = new Set(prev)
      next.has(k) ? next.delete(k) : next.add(k)
      return next.size === 0 ? new Set(ALL_KINDS) : next
    })
  }

  return (
    // pt offsets the site's fixed nav (h-14 mobile / h-16 desktop)
    <div
      className="flex h-[100dvh] flex-col pt-14 sm:pt-16"
      style={{ background: palette.ink, color: palette.light }}
    >
      <style>{`
        @keyframes observatory-ping{0%{opacity:.9;transform:scale(1)}100%{opacity:0;transform:scale(1.5)}}
        @keyframes observatory-sheet{from{transform:translateY(24px);opacity:0}to{transform:translateY(0);opacity:1}}
        .obs-scroll-x{display:flex;overflow-x:auto;scrollbar-width:none;-webkit-overflow-scrolling:touch}
        .obs-scroll-x::-webkit-scrollbar{display:none}
      `}</style>

      {/* Header */}
      <header className="border-b px-4 pb-3 pt-3 sm:px-6 sm:pt-4" style={{ borderColor: palette.line }}>
        {/* Row 1 — identity */}
        <div className="flex items-baseline justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-lg font-semibold tracking-tight sm:text-xl" style={{ color: palette.light }}>
              Agent Observatory
            </h1>
            <p className="mt-0.5 truncate text-xs sm:text-sm" style={{ color: palette.midGray }}>
              <span style={{ color: palette.orangeBright }}>{catalog.counts?.agent ?? 0} agents</span>
              {' · '}
              {catalog.counts?.skill ?? 0} skills · {catalog.counts?.command ?? 0} commands ·{' '}
              {catalog.counts?.workflow ?? 0} workflows
            </p>
          </div>
          <div className="hidden shrink-0 items-center gap-3 text-xs md:flex" style={{ color: palette.faint }}>
            {(['opus', 'sonnet', 'haiku'] as const).map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: tierColor[t] }} />
                {t} {tierCounts[t]}
              </span>
            ))}
          </div>
        </div>

        {/* Row 2 — view tabs (scrollable on mobile) + live + search (desktop) */}
        <div className="mt-3 flex items-center gap-2">
          <div className="obs-scroll-x -mx-1 min-w-0 flex-1 gap-2 px-1 sm:flex-none">
            {VIEWS.map((v) => (
              <button
                key={v.id}
                onClick={() => setView(v.id)}
                title={v.hint}
                className="shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors"
                style={{
                  background: view === v.id ? withAlpha(palette.orange, 0.2) : 'transparent',
                  color: view === v.id ? palette.orangeBright : palette.midGray,
                  border: `1px solid ${view === v.id ? withAlpha(palette.orange, 0.5) : palette.line}`,
                }}
              >
                {v.label}
              </button>
            ))}
          </div>
          <div className="ml-auto flex shrink-0 items-center gap-2">
            <LiveToggle live={live} status={liveStatus} compact={isMobile} onToggle={() => setLive((v) => !v)} />
            {view !== 'iam' && (
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search agents, skills…"
                className="hidden w-56 rounded-lg px-3 py-1.5 text-sm outline-none sm:block"
                style={{ background: palette.panel, border: `1px solid ${palette.line}`, color: palette.light }}
              />
            )}
          </div>
        </div>

        {/* Row 3 (mobile only) — full-width search */}
        {view !== 'iam' && (
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search agents, skills…"
            className="mt-2 block w-full rounded-lg px-3 py-2 text-sm outline-none sm:hidden"
            style={{ background: palette.panel, border: `1px solid ${palette.line}`, color: palette.light }}
          />
        )}

        {/* Row 4 — kind filter chips (scrollable on mobile) */}
        {view !== 'iam' && view !== 'workflows' && (
          <div className="obs-scroll-x -mx-1 mt-2.5 gap-2 px-1 sm:mt-3 sm:flex-wrap">
            {ALL_KINDS.map((k) => {
              const on = visibleKinds.has(k)
              return (
                <button
                  key={k}
                  onClick={() => toggleKind(k)}
                  className="flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs transition-opacity"
                  style={{
                    background: withAlpha(kindColor[k], on ? 0.16 : 0.04),
                    color: on ? palette.light : palette.faint,
                    border: `1px solid ${withAlpha(kindColor[k], on ? 0.5 : 0.15)}`,
                    opacity: on ? 1 : 0.6,
                  }}
                >
                  <span className="h-2 w-2 rounded-full" style={{ background: kindColor[k] }} />
                  {kindLabel[k]} · {catalog.counts[k] ?? 0}
                </button>
              )
            })}
          </div>
        )}
      </header>

      {/* Main */}
      <div className="relative min-h-0 flex-1 overflow-hidden">
        {view === 'iam' ? (
          <IamMatrix catalog={catalog} />
        ) : isMobile ? (
          <ObservatoryDirectory
            catalog={catalog}
            visibleKinds={visibleKinds}
            query={query}
            onSelect={setSelected}
          />
        ) : (
          <AgentGraph
            catalog={catalog}
            view={view}
            visibleKinds={visibleKinds}
            query={query}
            activeIds={live ? activeIds : undefined}
            onSelect={setSelected}
            selectedId={selected?.id}
          />
        )}

        {/* Detail — side drawer on desktop, bottom sheet on mobile */}
        {selected && !isMobile && (
          <aside
            className="absolute right-0 top-0 h-full w-[360px] overflow-auto border-l p-5"
            style={{ background: palette.inkSoft, borderColor: palette.lineStrong }}
          >
            <DetailContent selected={selected} onClose={() => setSelected(null)} />
          </aside>
        )}
      </div>

      {selected && isMobile && (
        <>
          <button
            aria-label="Close details"
            className="fixed inset-0 z-40"
            style={{ background: 'rgba(20,20,19,0.55)', backdropFilter: 'blur(2px)' }}
            onClick={() => setSelected(null)}
          />
          <aside
            className="fixed inset-x-0 bottom-0 z-50 max-h-[72dvh] overflow-auto rounded-t-2xl border-t px-5 pb-8 pt-2"
            style={{
              background: palette.inkSoft,
              borderColor: palette.lineStrong,
              animation: 'observatory-sheet .22s ease-out',
              boxShadow: '0 -12px 40px rgba(0,0,0,0.5)',
            }}
          >
            <div className="mx-auto mb-3 h-1 w-10 rounded-full" style={{ background: palette.lineStrong }} />
            <DetailContent selected={selected} onClose={() => setSelected(null)} />
          </aside>
        </>
      )}
    </div>
  )
}

function DetailContent({ selected, onClose }: { selected: CatalogNode; onClose: () => void }) {
  return (
    <>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span
            className="h-3 w-3 rounded-full"
            style={{
              background:
                selected.kind === 'agent' && selected.tier
                  ? tierColor[selected.tier]
                  : kindColor[selected.kind],
            }}
          />
          <span className="text-xs uppercase tracking-wider" style={{ color: palette.faint }}>
            {kindLabel[selected.kind]}
          </span>
        </div>
        <button
          onClick={onClose}
          className="-m-2 p-2"
          style={{ color: palette.midGray }}
          aria-label="Close"
        >
          ✕
        </button>
      </div>

      <h2 className="mt-2 text-lg font-semibold" style={{ color: palette.light }}>
        {selected.name}
      </h2>

      <div className="mt-2 flex flex-wrap gap-2 text-[11px]">
        <span className="rounded-md px-2 py-0.5" style={{ background: palette.panel, color: palette.midGray }}>
          {selected.group}
        </span>
        {selected.tier && (
          <span
            className="rounded-md px-2 py-0.5"
            style={{ background: withAlpha(tierColor[selected.tier], 0.18), color: palette.light }}
          >
            {tierLabel[selected.tier]}
          </span>
        )}
        {selected.priority && (
          <span className="rounded-md px-2 py-0.5" style={{ background: palette.panel, color: palette.midGray }}>
            {selected.priority} priority
          </span>
        )}
      </div>

      {selected.description && (
        <p className="mt-3 text-sm leading-relaxed" style={{ color: palette.midGray }}>
          {selected.description}
        </p>
      )}

      {selected.tools && selected.tools.length > 0 && (
        <Section title="Tools">
          <ChipList items={selected.tools} color={kindColor.agent} />
        </Section>
      )}
      {selected.mcpServers && selected.mcpServers.length > 0 && (
        <Section title="MCP servers">
          <ChipList items={selected.mcpServers} color={kindColor.workflow} />
        </Section>
      )}
      {selected.keywords && selected.keywords.length > 0 && (
        <Section title="Activation keywords">
          <ChipList items={selected.keywords} color={kindColor.skill} />
        </Section>
      )}
      {selected.allowedTools && selected.allowedTools.length > 0 && (
        <Section title="Allowed tools">
          <ChipList items={selected.allowedTools} color="#788c5d" />
        </Section>
      )}
      {selected.deniedTools && selected.deniedTools.length > 0 && (
        <Section title="Denied tools">
          <ChipList items={selected.deniedTools} color="#C2624F" />
        </Section>
      )}
      {selected.file && (
        <p className="mt-4 break-all font-mono text-[11px]" style={{ color: palette.faint }}>
          {selected.file}
        </p>
      )}
    </>
  )
}

function LiveToggle({
  live,
  status,
  compact,
  onToggle,
}: {
  live: boolean
  status: LiveStatus
  compact?: boolean
  onToggle: () => void
}) {
  const dot = status === 'live' ? palette.green : status === 'connecting' ? palette.gold : palette.faint
  const label = !live ? 'Go Live' : status === 'live' ? 'Live' : status === 'connecting' ? 'Connecting…' : 'Offline'
  return (
    <button
      onClick={onToggle}
      title="Connect to a local Agent Observatory server (localhost:4317) to light up agents as they run in Claude Code."
      className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors"
      style={{
        background: live ? withAlpha(palette.orange, 0.18) : 'transparent',
        color: live ? palette.orangeBright : palette.midGray,
        border: `1px solid ${live ? withAlpha(palette.orange, 0.5) : palette.line}`,
      }}
    >
      <span
        className="h-2 w-2 rounded-full"
        style={{
          background: live ? dot : palette.faint,
          boxShadow: status === 'live' ? `0 0 8px ${dot}` : 'none',
          animation: status === 'connecting' ? 'observatory-ping 1.2s ease-out infinite' : 'none',
        }}
      />
      {compact ? (live ? label : 'Live') : label}
    </button>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-4">
      <div className="mb-1.5 text-xs font-medium uppercase tracking-wider" style={{ color: palette.faint }}>
        {title}
      </div>
      {children}
    </div>
  )
}

function ChipList({ items, color }: { items: string[]; color: string }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((t) => (
        <span
          key={t}
          className="rounded-md px-2 py-0.5 text-[11px]"
          style={{ background: withAlpha(color, 0.14), color: palette.light, border: `1px solid ${withAlpha(color, 0.3)}` }}
        >
          {t}
        </span>
      ))}
    </div>
  )
}
