'use client'

import type { Catalog } from '@/lib/observatory/types'
import { palette, withAlpha } from '@/lib/observatory/theme'

const ALLOW = '#8C9A5B'
const DENY = '#C2624F'

export function IamMatrix({ catalog }: { catalog: Catalog }) {
  const profiles = Object.entries(catalog.iam || {})
  // Universe of tools across all profiles
  const tools = [
    ...new Set(
      profiles.flatMap(([, p]) => [...(p?.allowedTools || []), ...(p?.deniedTools || [])]),
    ),
  ].sort()

  const state = (allowed?: string[], denied?: string[], tool?: string) => {
    if (denied?.includes(tool!)) return 'deny'
    if (allowed?.includes(tool!)) return 'allow'
    return 'none'
  }

  return (
    <div className="h-full overflow-auto p-6" style={{ background: palette.ink }}>
      <div className="mx-auto max-w-5xl">
        <h3 className="mb-1 text-lg font-semibold" style={{ color: palette.light }}>
          Agent IAM — capability matrix
        </h3>
        <p className="mb-5 text-sm" style={{ color: palette.midGray }}>
          {profiles.length} role profiles scope which tools each agent class may use and where it may
          write. Content writers can&apos;t run Bash; security auditors are read-only.
        </p>

        <div className="overflow-hidden rounded-2xl border" style={{ borderColor: palette.line }}>
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th
                  className="sticky left-0 z-10 px-4 py-3 text-left font-medium"
                  style={{ background: palette.panel, color: palette.midGray }}
                >
                  Tool
                </th>
                {profiles.map(([name]) => (
                  <th
                    key={name}
                    className="px-3 py-3 text-center text-xs font-medium"
                    style={{ background: palette.panel, color: palette.light, minWidth: 96 }}
                  >
                    {name.replace('-', ' ')}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tools.map((tool, i) => (
                <tr key={tool} style={{ background: i % 2 ? palette.inkSoft : 'transparent' }}>
                  <td
                    className="sticky left-0 z-10 px-4 py-2 font-mono text-xs"
                    style={{ background: i % 2 ? palette.inkSoft : palette.ink, color: palette.light }}
                  >
                    {tool}
                  </td>
                  {profiles.map(([name, p]) => {
                    const s = state(p.allowedTools, p.deniedTools, tool)
                    const color = s === 'allow' ? ALLOW : s === 'deny' ? DENY : palette.faint
                    return (
                      <td key={name} className="px-3 py-2 text-center">
                        <span
                          className="inline-flex h-5 w-5 items-center justify-center rounded-md text-[11px]"
                          style={{
                            background: s === 'none' ? 'transparent' : withAlpha(color, 0.18),
                            color,
                            border: s === 'none' ? `1px solid ${palette.line}` : `1px solid ${withAlpha(color, 0.5)}`,
                          }}
                          title={`${name}: ${s}`}
                        >
                          {s === 'allow' ? '✓' : s === 'deny' ? '✕' : '·'}
                        </span>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Profile cards */}
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {profiles.map(([name, p]) => (
            <div
              key={name}
              className="rounded-xl border p-4"
              style={{ borderColor: palette.line, background: palette.panel }}
            >
              <div className="text-sm font-semibold capitalize" style={{ color: palette.orangeBright }}>
                {name.replace('-', ' ')}
              </div>
              <p className="mt-1 text-xs" style={{ color: palette.midGray }}>
                {p.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-2 text-[11px]" style={{ color: palette.faint }}>
                <span>max edits: {p.maxFileEdits ?? '—'}</span>
                <span>· create: {p.canCreateFiles ? 'yes' : 'no'}</span>
                <span>· delete: {p.canDeleteFiles ? 'yes' : 'no'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
