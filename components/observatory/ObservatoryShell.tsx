'use client'

import { useMemo, useState } from 'react'
import type { Catalog, CatalogNode, NodeKind, ObservatoryView } from '@/lib/observatory/types'
import { kindColor, kindLabel, tierColor, tierLabel, palette, withAlpha } from '@/lib/observatory/theme'
import { AgentGraph } from './AgentGraph'
import { IamMatrix } from './IamMatrix'
import { useLiveActivity, type LiveStatus } from '@/lib/observatory/useLiveActivity'

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

  const tierCounts = useMemo(() => {
    const c: Record<string, number> = { haiku: 0, sonnet: 0, opus: 0 }
    for (const n of catalog.nodes) if (n.kind === 'agent' && n.tier) c[n.tier]++
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
    <div className="flex h-[100dvh] flex-col" style={{ background: palette.kraft, color: palette.cream }}>
      <style>{`@keyframes observatory-ping{0%{opacity:.9;transform:scale(1)}100%{opacity:0;transform:scale(1.5)}}`}</style>

      {/* Header */}
      <header className="border-b px-6 py-4" style={{ borderColor: palette.line }}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold tracking-tight" style={{ color: palette.cream }}>
              Agent Observatory
            </h1>
            <p className="mt-0.5 text-sm" style={{ color: palette.creamDim }}>
              The Agentic Creator OS fleet —{' '}
              <span style={{ color: palette.clayBright }}>{catalog.counts.agent} agents</span>,{' '}
              {catalog.counts.skill} skills, {catalog.counts.command} commands,{' '}
              {catalog.counts.workflow} workflows.
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs" style={{ color: palette.creamFaint }}>
            {(['opus', 'sonnet', 'haiku'] as const).map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: tierColor[t] }} />
                {t} {tierCounts[t]}
              </span>
            ))}
          </div>
        </div>

        {/* View tabs */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {VIEWS.map((v) => (
            <button
              key={v.id}
              onClick={() => setView(v.id)}
              title={v.hint}
              className="rounded-lg px-3 py-1.5 text-sm font-medium transition-colors"
              style={{
                background: view === v.id ? withAlpha(palette.clay, 0.2) : 'transparent',
                color: view === v.id ? palette.clayBright : palette.creamDim,
                border: `1px solid ${view === v.id ? withAlpha(palette.clay, 0.5) : palette.line}`,
              }}
            >
              {v.label}
            </button>
          ))}

          <div className="ml-auto flex items-center gap-3">
            <LiveToggle live={live} status={liveStatus} onToggle={() => setLive((v) => !v)} />
            {view !== 'iam' && (
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search agents, skills…"
                className="w-56 rounded-lg px-3 py-1.5 text-sm outline-none"
                style={{ background: palette.kraftPanel, border: `1px solid ${palette.line}`, color: palette.cream }}
              />
            )}
          </div>
        </div>

        {/* Kind filter chips */}
        {view !== 'iam' && view !== 'workflows' && (
          <div className="mt-3 flex flex-wrap gap-2">
            {ALL_KINDS.map((k) => {
              const on = visibleKinds.has(k)
              return (
                <button
                  key={k}
                  onClick={() => toggleKind(k)}
                  className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs transition-opacity"
                  style={{
                    background: withAlpha(kindColor[k], on ? 0.16 : 0.04),
                    color: on ? palette.cream : palette.creamFaint,
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
      <div className="relative flex-1 overflow-hidden">
        {view === 'iam' ? (
          <IamMatrix catalog={catalog} />
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

        {/* Detail drawer */}
        {selected && (
          <aside
            className="absolute right-0 top-0 h-full w-[340px] overflow-auto border-l p-5"
            style={{ background: palette.kraftSoft, borderColor: palette.lineStrong }}
          >
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
                <span className="text-xs uppercase tracking-wider" style={{ color: palette.creamFaint }}>
                  {kindLabel[selected.kind]}
                </span>
              </div>
              <button onClick={() => setSelected(null)} style={{ color: palette.creamDim }} aria-label="Close">
                ✕
              </button>
            </div>

            <h2 className="mt-2 text-lg font-semibold" style={{ color: palette.cream }}>
              {selected.name}
            </h2>

            <div className="mt-2 flex flex-wrap gap-2 text-[11px]">
              <span className="rounded-md px-2 py-0.5" style={{ background: palette.kraftPanel, color: palette.creamDim }}>
                {selected.group}
              </span>
              {selected.tier && (
                <span
                  className="rounded-md px-2 py-0.5"
                  style={{ background: withAlpha(tierColor[selected.tier], 0.18), color: palette.cream }}
                >
                  {tierLabel[selected.tier]}
                </span>
              )}
              {selected.priority && (
                <span className="rounded-md px-2 py-0.5" style={{ background: palette.kraftPanel, color: palette.creamDim }}>
                  {selected.priority} priority
                </span>
              )}
            </div>

            {selected.description && (
              <p className="mt-3 text-sm leading-relaxed" style={{ color: palette.creamDim }}>
                {selected.description}
              </p>
            )}

            {selected.tools && selected.tools.length > 0 && (
              <Section title="Tools" palette={palette}>
                <ChipList items={selected.tools} color={kindColor.agent} />
              </Section>
            )}
            {selected.mcpServers && selected.mcpServers.length > 0 && (
              <Section title="MCP servers" palette={palette}>
                <ChipList items={selected.mcpServers} color={kindColor.workflow} />
              </Section>
            )}
            {selected.keywords && selected.keywords.length > 0 && (
              <Section title="Activation keywords" palette={palette}>
                <ChipList items={selected.keywords} color={kindColor.skill} />
              </Section>
            )}
            {selected.allowedTools && selected.allowedTools.length > 0 && (
              <Section title="Allowed tools" palette={palette}>
                <ChipList items={selected.allowedTools} color="#8C9A5B" />
              </Section>
            )}
            {selected.deniedTools && selected.deniedTools.length > 0 && (
              <Section title="Denied tools" palette={palette}>
                <ChipList items={selected.deniedTools} color="#C2624F" />
              </Section>
            )}
            {selected.file && (
              <p className="mt-4 font-mono text-[11px]" style={{ color: palette.creamFaint }}>
                {selected.file}
              </p>
            )}
          </aside>
        )}
      </div>
    </div>
  )
}

function LiveToggle({
  live,
  status,
  onToggle,
}: {
  live: boolean
  status: LiveStatus
  onToggle: () => void
}) {
  const dot =
    status === 'live' ? '#8C9A5B' : status === 'connecting' ? '#C7A35A' : palette.creamFaint
  const label =
    !live ? 'Go Live' : status === 'live' ? 'Live' : status === 'connecting' ? 'Connecting…' : 'Offline'
  return (
    <button
      onClick={onToggle}
      title="Connect to a local Agent Observatory server (localhost:4317) to light up agents as they run in Claude Code."
      className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors"
      style={{
        background: live ? withAlpha(palette.clay, 0.18) : 'transparent',
        color: live ? palette.clayBright : palette.creamDim,
        border: `1px solid ${live ? withAlpha(palette.clay, 0.5) : palette.line}`,
      }}
    >
      <span
        className="h-2 w-2 rounded-full"
        style={{
          background: live ? dot : palette.creamFaint,
          boxShadow: status === 'live' ? `0 0 8px ${dot}` : 'none',
          animation: status === 'connecting' ? 'observatory-ping 1.2s ease-out infinite' : 'none',
        }}
      />
      {label}
    </button>
  )
}

function Section({
  title,
  children,
  palette: p,
}: {
  title: string
  children: React.ReactNode
  palette: typeof palette
}) {
  return (
    <div className="mt-4">
      <div className="mb-1.5 text-xs font-medium uppercase tracking-wider" style={{ color: p.creamFaint }}>
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
          style={{ background: withAlpha(color, 0.14), color: palette.cream, border: `1px solid ${withAlpha(color, 0.3)}` }}
        >
          {t}
        </span>
      ))}
    </div>
  )
}
