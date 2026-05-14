'use client'

import { useMemo, useState } from 'react'
import {
  Calendar,
  Sparkles,
  TrendingUp,
  Repeat,
  Layers,
  Download,
  ExternalLink,
  Copy,
  Check,
  FileSpreadsheet,
  FileText,
} from 'lucide-react'
import type { IkigaiState } from './types'

interface ContentOperatingPlanProps {
  value: IkigaiState
}

const HOOK_FORMATS = [
  {
    name: 'Contrarian Take',
    pattern: '"Everyone says X. I think the opposite — and here is why."',
    example: '"Everyone says you need a niche. I went broad for 3 years and tripled my income."',
  },
  {
    name: 'Story Open',
    pattern: '"Last [time], [vivid moment]. Here is what it taught me."',
    example: '"Last Tuesday, a client paid me to delete code. Here is what it taught me about value."',
  },
  {
    name: 'Counter-Wisdom',
    pattern: '"The advice is X. The advice is wrong for [audience]."',
    example: '"\'Build in public\' is wrong for senior consultants. Here is what works instead."',
  },
  {
    name: 'Numbered Breakdown',
    pattern: '"[N] things I learned [about Y] after [proof of work]."',
    example: '"6 things I learned about LinkedIn after my post hit 1.2M views."',
  },
  {
    name: 'Vulnerable Confession',
    pattern: '"I used to [bad pattern]. Here is what changed it."',
    example: '"I used to post every day and felt empty. Here is what changed it."',
  },
] as const

const POST_ARCHETYPES = [
  {
    name: 'Insight',
    weight: 3,
    purpose: 'Teach a lesson from your zone of expertise. Earns authority.',
    color: 'violet',
  },
  {
    name: 'Build-in-Public',
    weight: 2,
    purpose: 'Show an artifact, a metric, a screenshot. Earns trust.',
    color: 'amber',
  },
  {
    name: 'Connection',
    weight: 1,
    purpose: 'Amplify someone. Make an intro. Tag a thinker. Earns reach.',
    color: 'emerald',
  },
] as const

const CHANNEL_MATRIX = [
  {
    channel: 'LinkedIn',
    role: 'Authority + business gravity',
    cadence: '4–5 posts / week',
    format: 'Insight posts (60%) + Build-in-Public (30%) + Connection (10%)',
  },
  {
    channel: 'Threads / X',
    role: 'Raw thinking, fast feedback',
    cadence: 'Daily, 1–3 posts',
    format: 'Half-formed ideas you would not post on LinkedIn yet',
  },
  {
    channel: 'Newsletter',
    role: 'Consolidation, owned audience',
    cadence: 'Weekly, Sunday',
    format: 'This week\'s top post expanded + 3 links you actually read',
  },
  {
    channel: 'YouTube Shorts',
    role: 'Visualize the 3 pillars',
    cadence: '2–3 per week',
    format: '45–90s talking head, 1 idea each, captions on',
  },
] as const

function extractPillarHints(value: IkigaiState): string[] {
  // Heuristic: derive 3 pillar candidates from the wizard answers
  const sources = [value.good, value.needs, value.pays].map((s) =>
    s.split(/[.\n,]/)[0]?.trim() || ''
  )
  return sources.filter(Boolean).slice(0, 3)
}

function build30DayCalendar(pillars: string[]): Array<{ week: number; days: string[] }> {
  const archetypes = ['Insight', 'Insight', 'Build-in-Public', 'Insight', 'Build-in-Public', 'Connection', 'Rest']
  const safePillars = pillars.length === 3 ? pillars : ['Pillar 1', 'Pillar 2', 'Pillar 3']
  return [1, 2, 3, 4].map((week) => ({
    week,
    days: archetypes.map((archetype, i) => {
      if (archetype === 'Rest') return 'Rest / consolidate'
      const pillar = safePillars[(week + i) % 3]
      return `${archetype} · ${pillar}`
    }),
  }))
}

export function ContentOperatingPlan({ value }: ContentOperatingPlanProps) {
  const [copied, setCopied] = useState<string | null>(null)
  const pillarHints = useMemo(() => extractPillarHints(value), [value])
  const calendar = useMemo(() => build30DayCalendar(pillarHints), [pillarHints])
  const hasInputs = pillarHints.length > 0

  function downloadCsv() {
    const header = 'Week,Day,Pillar,Archetype,Channel\n'
    const rows = calendar
      .flatMap((week) =>
        week.days.map((slot, i) => {
          const [archetype, pillar] = slot.split(' · ')
          const day = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]
          const channel = i % 2 === 0 ? 'LinkedIn' : 'Threads'
          return `${week.week},${day},"${pillar || 'Rest'}","${archetype || 'Rest'}",${channel}`
        }),
      )
      .join('\n')
    const blob = new Blob([header + rows], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `30-day-content-plan-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  function copyPattern(name: string, text: string) {
    navigator.clipboard.writeText(text)
    setCopied(name)
    setTimeout(() => setCopied(null), 1800)
  }

  return (
    <div id="content-plan" className="space-y-8">
      {/* LinkedIn Top Voice Playbook */}
      <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8">
        <div className="mb-6">
          <p className="text-xs font-medium uppercase tracking-wider text-violet-300 mb-2 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5" />
            LinkedIn Top Voice playbook
          </p>
          <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
            Five hook formats that earn attention without selling out
          </h3>
          <p className="text-sm text-zinc-400 mt-2">
            Pattern over creativity. Rotate these five so you never stare at a blank page.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          {HOOK_FORMATS.map((h) => (
            <div
              key={h.name}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-2"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-white">{h.name}</h4>
                <button
                  onClick={() => copyPattern(h.name, h.pattern)}
                  className="text-zinc-500 hover:text-violet-300 transition-colors"
                  aria-label={`Copy ${h.name} pattern`}
                >
                  {copied === h.name ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              <p className="text-xs text-zinc-400 italic leading-relaxed">{h.pattern}</p>
              <p className="text-xs text-zinc-500 leading-relaxed">{h.example}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Post archetypes — weekly rhythm */}
      <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8">
        <div className="mb-5">
          <p className="text-xs font-medium uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-1.5">
            <Repeat className="w-3.5 h-3.5" />
            Weekly rhythm
          </p>
          <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
            3 Insight · 2 Build-in-Public · 1 Connection · 1 Rest
          </h3>
          <p className="text-sm text-zinc-400 mt-2">
            Seven slots. Mix the archetypes. Rest day is non-negotiable — the algorithm rewards consistency, not exhaustion.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-3">
          {POST_ARCHETYPES.map((a) => (
            <div
              key={a.name}
              className={`rounded-2xl border bg-white/[0.02] p-4 space-y-2 ${
                a.color === 'violet'
                  ? 'border-violet-500/20'
                  : a.color === 'amber'
                    ? 'border-amber-500/20'
                    : 'border-emerald-500/20'
              }`}
            >
              <div className="flex items-baseline justify-between">
                <h4 className="text-sm font-semibold text-white">{a.name}</h4>
                <span className="text-xs text-zinc-500">×{a.weight}/wk</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">{a.purpose}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Multi-channel matrix */}
      <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8">
        <div className="mb-5">
          <p className="text-xs font-medium uppercase tracking-wider text-emerald-400 mb-2 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" />
            Channel matrix
          </p>
          <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
            One thesis, four channels, four roles
          </h3>
          <p className="text-sm text-zinc-400 mt-2">
            Stop reposting the same thing four times. Each channel has a different job.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/[0.06]">
          <table className="w-full text-sm">
            <thead className="bg-white/[0.03]">
              <tr className="text-left">
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-zinc-500">Channel</th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-zinc-500">Role</th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-zinc-500">Cadence</th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-zinc-500">Format</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {CHANNEL_MATRIX.map((row) => (
                <tr key={row.channel}>
                  <td className="px-4 py-3 font-medium text-white">{row.channel}</td>
                  <td className="px-4 py-3 text-zinc-400">{row.role}</td>
                  <td className="px-4 py-3 text-zinc-400">{row.cadence}</td>
                  <td className="px-4 py-3 text-zinc-500 text-xs">{row.format}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 30-day calendar */}
      <div className="rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-500/[0.04] to-amber-500/[0.04] p-6 sm:p-8">
        <div className="mb-5">
          <p className="text-xs font-medium uppercase tracking-wider text-violet-300 mb-2 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            Your 30-day calendar
          </p>
          <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
            Generated from your pillars
          </h3>
          {!hasInputs && (
            <p className="text-sm text-amber-300/80 mt-2">
              Complete the wizard first — your three pillars will populate this calendar automatically.
            </p>
          )}
          {hasInputs && (
            <p className="text-sm text-zinc-400 mt-2">
              Anchored to: {pillarHints.map((p, i) => (
                <span key={i}>
                  <span className="text-violet-300">{p}</span>
                  {i < pillarHints.length - 1 ? ' · ' : ''}
                </span>
              ))}
            </p>
          )}
        </div>

        <div className="space-y-3">
          {calendar.map((week) => (
            <div key={week.week} className="rounded-2xl border border-white/[0.06] bg-[#0a0a0b]/40 p-3">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider min-w-[3.5rem]">
                  Week {week.week}
                </span>
                <div className="flex-1 h-px bg-white/[0.04]" />
              </div>
              <div className="grid grid-cols-7 gap-1.5 text-[10px] sm:text-xs">
                {week.days.map((slot, i) => {
                  const [archetype] = slot.split(' · ')
                  const dayLabel = ['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]
                  const isRest = archetype === 'Rest'
                  return (
                    <div
                      key={i}
                      className={`rounded-lg border p-2 ${
                        isRest
                          ? 'border-white/[0.04] bg-white/[0.01] text-zinc-600'
                          : 'border-white/[0.06] bg-white/[0.02] text-zinc-300'
                      }`}
                    >
                      <div className="font-medium text-zinc-500 mb-0.5">{dayLabel}</div>
                      <div className="leading-tight">{slot}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Export buttons */}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <a
            href="/go/ikigai-notion-template"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-400 hover:to-violet-500 transition-colors shadow-lg shadow-violet-500/20"
          >
            <ExternalLink className="w-4 h-4" />
            Duplicate Notion template
          </a>
          <a
            href="/go/ikigai-sheet-template"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-medium text-zinc-200 bg-white/[0.06] border border-white/[0.10] hover:bg-white/[0.10] transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4" />
            Copy Google Sheet
          </a>
          <button
            onClick={downloadCsv}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-medium text-zinc-200 bg-white/[0.06] border border-white/[0.10] hover:bg-white/[0.10] transition-colors"
          >
            <Download className="w-4 h-4" />
            Download CSV
          </button>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-medium text-zinc-200 bg-white/[0.06] border border-white/[0.10] hover:bg-white/[0.10] transition-colors"
          >
            <FileText className="w-4 h-4" />
            Print to PDF
          </button>
        </div>

        <p className="text-xs text-zinc-500 mt-3 flex items-start gap-1.5">
          <Sparkles className="w-3 h-3 mt-0.5 flex-shrink-0 text-violet-300" />
          <span>
            Pro tip: Block 60 minutes on Sunday to batch the week’s posts. Schedule with Buffer or Typefully.
            Real attention compounds — fake batches do not.
          </span>
        </p>
      </div>
    </div>
  )
}
