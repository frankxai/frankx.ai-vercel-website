'use client'

import { useState } from 'react'
import { Copy, Check, ExternalLink, Sparkles, ArrowRight } from 'lucide-react'
import type { WorkshopPrompt } from '@/lib/workshop-prompts'

interface PromptCardProps {
  prompt: WorkshopPrompt
}

interface AITarget {
  name: string
  glyph: string
  accent: 'emerald' | 'amber' | 'sky' | 'stone' | 'cyan'
  href: (prompt: string) => string
  note?: string
}

/**
 * Open-target row — Frank's favorite AI assistant goes here.
 * Only ChatGPT supports ?q= prefill; others open a new chat where
 * the user pastes the (already-copied) prompt.
 */
const AI_TARGETS: AITarget[] = [
  {
    name: 'ChatGPT',
    glyph: 'G',
    accent: 'emerald',
    href: (p) => `https://chatgpt.com/?q=${encodeURIComponent(p)}`,
  },
  {
    name: 'Claude',
    glyph: 'C',
    accent: 'amber',
    href: () => 'https://claude.ai/new',
    note: 'paste',
  },
  {
    name: 'Gemini',
    glyph: 'G',
    accent: 'sky',
    href: () => 'https://gemini.google.com/app',
    note: 'paste',
  },
]

const ACCENT_MAP = {
  emerald: 'border-emerald-500/30 bg-emerald-500/[0.08] text-emerald-300 hover:bg-emerald-500/[0.14] hover:border-emerald-500/50',
  amber: 'border-amber-500/30 bg-amber-500/[0.08] text-amber-300 hover:bg-amber-500/[0.14] hover:border-amber-500/50',
  sky: 'border-sky-500/30 bg-sky-500/[0.08] text-sky-300 hover:bg-sky-500/[0.14] hover:border-sky-500/50',
  stone: 'border-stone-500/30 bg-stone-500/[0.08] text-stone-300 hover:bg-stone-500/[0.14] hover:border-stone-500/50',
  cyan: 'border-cyan-500/30 bg-cyan-500/[0.08] text-cyan-300 hover:bg-cyan-500/[0.14] hover:border-cyan-500/50',
} as const

/**
 * Copy-paste prompt card. The workshop's primary delivery surface —
 * each card is one prompt the attendee pastes into their favorite
 * AI assistant (ChatGPT, Claude, Gemini).
 *
 * Mobile-first layout: buttons wrap, prompt body scrolls, copy button
 * is always reachable.
 */
export function PromptCard({ prompt }: PromptCardProps) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(prompt.body)
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  return (
    <div className="rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-500/[0.04] via-white/[0.02] to-amber-500/[0.03] overflow-hidden">
      {/* Header */}
      <div className="px-5 sm:px-6 pt-5 sm:pt-6 pb-4 border-b border-white/[0.04]">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-violet-300 flex-shrink-0" />
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-violet-300">
            Prompt · Module {prompt.module}
          </p>
        </div>
        <h3 className="text-lg sm:text-xl font-semibold text-white tracking-tight mb-1.5 leading-tight">
          {prompt.title}
        </h3>
        <p className="text-sm text-zinc-400 leading-relaxed">{prompt.subtitle}</p>
      </div>

      {/* Prompt body — scrollable, mono, readable on mobile */}
      <div className="relative">
        <div className="max-h-64 sm:max-h-72 overflow-y-auto p-4 sm:p-5 bg-[#0a0a0b]/40">
          <pre className="text-[11px] sm:text-[13px] text-zinc-300 leading-relaxed font-mono whitespace-pre-wrap break-words">
            {prompt.body}
          </pre>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-[#0a0a0b]/80 to-transparent pointer-events-none" />
      </div>

      {/* Action bar — Copy primary, AI targets secondary */}
      <div className="px-4 sm:px-5 py-4 border-t border-white/[0.04] bg-white/[0.01] space-y-3">
        {/* Copy button — full-width on mobile, prominent */}
        <button
          onClick={handleCopy}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-400 hover:to-violet-500 transition-colors shadow-lg shadow-violet-500/20"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" /> Copied — now paste into your AI
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" /> Copy prompt
            </>
          )}
        </button>

        {/* AI target row — open your favorite assistant */}
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500 mb-2 flex items-center gap-1.5">
            <ArrowRight className="w-3 h-3" />
            Then open it in
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {AI_TARGETS.map((t) => (
              <a
                key={t.name}
                href={t.href(prompt.body)}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium border ${ACCENT_MAP[t.accent]} transition-colors`}
                title={t.note ? `Opens new chat — paste the copied prompt` : `Opens with prompt pre-filled`}
              >
                <span className={`flex items-center justify-center w-6 h-6 rounded border ${ACCENT_MAP[t.accent]} font-bold text-[11px]`}>
                  {t.glyph}
                </span>
                <span>{t.name}</span>
                {t.note && <span className="text-[10px] opacity-60">· {t.note}</span>}
                <ExternalLink className="w-3 h-3 opacity-60 ml-0.5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Output handling — what to do next */}
      <div className="px-4 sm:px-5 py-4 bg-white/[0.015] border-t border-white/[0.04]">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-amber-300 mb-1">
          What to do with the output
        </p>
        <p className="text-sm text-zinc-300 leading-relaxed">{prompt.outputHandling}</p>
      </div>
    </div>
  )
}
