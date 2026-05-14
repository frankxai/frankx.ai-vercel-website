'use client'

import { ExternalLink, ArrowRight } from 'lucide-react'
import { CONNECTOR_PATHS } from '@/lib/workshop-prompts'

const COLOR_MAP = {
  emerald: {
    border: 'border-emerald-500/20',
    bg: 'bg-emerald-500/[0.04]',
    badge: 'text-emerald-300 bg-emerald-500/[0.08] border-emerald-500/20',
  },
  violet: {
    border: 'border-violet-500/20',
    bg: 'bg-violet-500/[0.04]',
    badge: 'text-violet-300 bg-violet-500/[0.08] border-violet-500/20',
  },
  amber: {
    border: 'border-amber-500/20',
    bg: 'bg-amber-500/[0.04]',
    badge: 'text-amber-300 bg-amber-500/[0.08] border-amber-500/20',
  },
} as const

/**
 * Three connector paths from prompt-output to a usable artifact:
 * ChatGPT native connectors, Claude MCP, or CSV fallback. Lives at the
 * end of Module 4 — after the user has generated their 30-day plan.
 */
export function AIConnectors() {
  return (
    <div className="rounded-3xl border border-white/[0.08] bg-white/[0.015] p-6 sm:p-8">
      <div className="mb-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-violet-300 mb-1.5">
          From prompt to artifact
        </p>
        <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
          Three ways to land your 30-day plan into something usable
        </h3>
        <p className="text-sm text-zinc-400 mt-2 max-w-2xl leading-relaxed">
          Two integration paths if you have a paid subscription, one CSV fallback that works
          for everyone. Pick the one that matches your tool.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-3">
        {CONNECTOR_PATHS.map((c) => {
          const colors = COLOR_MAP[c.color]
          return (
            <div
              key={c.label}
              className={`rounded-2xl border ${colors.border} ${colors.bg} p-5`}
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <h4 className="text-sm font-semibold text-white leading-snug">{c.label}</h4>
                <span
                  className={`text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded border whitespace-nowrap flex-shrink-0 ${colors.badge}`}
                >
                  {c.badge}
                </span>
              </div>
              <ol className="space-y-1.5 mb-3">
                {c.steps.map((step, i) => (
                  <li
                    key={i}
                    className="text-xs text-zinc-300 flex items-start gap-2 leading-relaxed"
                  >
                    <span className="text-zinc-500 tabular-nums font-mono mt-0.5">
                      {i + 1}.
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
              {c.url && (
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-medium text-zinc-400 hover:text-white transition-colors"
                >
                  Official setup docs
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          )
        })}
      </div>

      <div className="mt-5 pt-5 border-t border-white/[0.04] flex items-start gap-2 text-xs text-zinc-500">
        <ArrowRight className="w-3.5 h-3.5 text-emerald-300 mt-0.5 flex-shrink-0" />
        <p className="leading-relaxed">
          <span className="text-zinc-300">No subscription, no problem.</span> The CSV
          fallback works in every AI chat. Tell the AI to format as CSV, copy the rows,
          paste into Notion (it auto-detects tables), Google Sheets, Airtable, or any
          spreadsheet. The discipline is shipping the plan — not the tool you ship it in.
        </p>
      </div>
    </div>
  )
}
