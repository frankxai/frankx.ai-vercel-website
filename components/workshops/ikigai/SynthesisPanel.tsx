'use client'

import { useMemo, useState } from 'react'
import { Download, Copy, Check, FileJson, FileText } from 'lucide-react'
import type { IkigaiState } from './types'

interface SynthesisPanelProps {
  value: IkigaiState
  onStatementChange: (statement: string) => void
}

function buildDraftStatement(v: IkigaiState): string {
  const pieces = [v.love, v.good, v.pays, v.needs].filter(Boolean)
  if (pieces.length < 2) return ''
  const who = v.needs.trim() || '[your audience]'
  const how = v.good.trim() || '[your skill]'
  const domain = v.pays.trim() || '[your domain]'
  const drive = v.love.trim() || '[what you love]'
  return `I help ${who.split(/[.\n]/)[0].trim()} by ${how.split(/[.\n]/)[0].trim()}, working in ${domain.split(/[.\n]/)[0].trim()}, driven by ${drive.split(/[.\n]/)[0].trim()}.`
}

function buildMarkdown(v: IkigaiState): string {
  const date = new Date().toISOString().split('T')[0]
  return `# My Ikigai — ${date}

## What I love
${v.love || '_(empty)_'}

## What I'm good at
${v.good || '_(empty)_'}

## What the world needs
${v.needs || '_(empty)_'}

## What pays
${v.pays || '_(empty)_'}

## My Ikigai Statement
${v.statement || '_(empty)_'}

---
Generated at frankx.ai/workshops/ikigai-branding
`
}

export function SynthesisPanel({
  value,
  onStatementChange,
}: SynthesisPanelProps) {
  const [copied, setCopied] = useState(false)
  const draft = useMemo(() => buildDraftStatement(value), [value])

  function downloadJson() {
    const data = JSON.stringify(value, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ikigai-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  function downloadMarkdown() {
    const data = buildMarkdown(value)
    const blob = new Blob([data], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ikigai-${new Date().toISOString().split('T')[0]}.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  function handleCopyStatement() {
    if (!value.statement) return
    navigator.clipboard.writeText(value.statement)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function useDraft() {
    if (draft) onStatementChange(draft)
  }

  return (
    <div id="synthesis" className="rounded-3xl border border-amber-500/20 bg-gradient-to-br from-amber-500/[0.04] to-violet-500/[0.04] p-6 sm:p-8 space-y-5">
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-amber-400 mb-2">
          Synthesis
        </p>
        <h3 className="text-2xl font-semibold text-white tracking-tight">
          Your Ikigai Statement
        </h3>
        <p className="text-sm text-zinc-400 mt-1">
          Two to three lines. Fits on a business card. If a competitor could say the same sentence, sharpen it.
        </p>
      </div>

      {/* Draft suggestion */}
      {draft && draft !== value.statement && (
        <div className="rounded-xl border border-violet-500/20 bg-violet-500/[0.04] p-4">
          <p className="text-xs font-medium text-violet-300 uppercase tracking-wider mb-2">
            Draft from your inputs
          </p>
          <p className="text-sm text-zinc-300 leading-relaxed mb-3">{draft}</p>
          <button
            onClick={useDraft}
            className="text-xs font-medium text-violet-300 hover:text-violet-200 underline underline-offset-2"
          >
            Use this as a starting point →
          </button>
        </div>
      )}

      <textarea
        value={value.statement}
        onChange={(e) => onStatementChange(e.target.value)}
        placeholder="I help [who] achieve [outcome] by [how], using [skills] in [domain]."
        className="w-full h-32 px-4 py-3 bg-[#0a0a0b] border border-white/[0.08] rounded-xl text-base text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/40 focus:ring-2 focus:ring-amber-500/20 resize-none leading-relaxed"
      />

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={handleCopyStatement}
          disabled={!value.statement}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-zinc-300 bg-white/[0.06] border border-white/[0.08] hover:bg-white/[0.10] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" /> Copied
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" /> Copy statement
            </>
          )}
        </button>
        <button
          onClick={downloadMarkdown}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-zinc-300 bg-white/[0.06] border border-white/[0.08] hover:bg-white/[0.10] transition-colors"
        >
          <FileText className="w-4 h-4" /> Export as Markdown
        </button>
        <button
          onClick={downloadJson}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-zinc-300 bg-white/[0.06] border border-white/[0.08] hover:bg-white/[0.10] transition-colors"
        >
          <FileJson className="w-4 h-4" /> Export as JSON
        </button>
      </div>

      <p className="text-xs text-zinc-500 flex items-center gap-1.5">
        <Download className="w-3 h-3" /> Your answers save to your browser only. Export to keep them permanently.
      </p>
    </div>
  )
}
