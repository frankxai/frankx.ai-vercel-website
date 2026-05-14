'use client'

import { useState } from 'react'
import { Copy, Check, ExternalLink, Sparkles, MessageSquare } from 'lucide-react'
import type { WorkshopPrompt } from '@/lib/workshop-prompts'

interface PromptCardProps {
  prompt: WorkshopPrompt
}

/**
 * Copy-paste prompt card. The workshop's primary delivery surface —
 * each card is one prompt the attendee pastes into ChatGPT / Claude / etc.
 *
 * Pattern: title + subtitle + scrollable prompt body (mono font) +
 * Copy button + Open-in-AI deep-links + output-handling instructions.
 */
export function PromptCard({ prompt }: PromptCardProps) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(prompt.body)
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  // ChatGPT supports prefilled prompt via ?q= query param
  const chatgptUrl = `https://chatgpt.com/?q=${encodeURIComponent(prompt.body)}`
  // Claude doesn't support prefill — link to claude.ai
  const claudeUrl = 'https://claude.ai/new'

  return (
    <div className="rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-500/[0.04] via-white/[0.02] to-amber-500/[0.03] overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 border-b border-white/[0.04]">
        <div className="flex items-start justify-between gap-4 mb-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-violet-300" />
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-violet-300">
              Prompt · Module {prompt.module}
            </p>
          </div>
          <div className="flex items-center gap-1 flex-wrap justify-end">
            {prompt.bestIn.slice(0, 3).map((ai) => (
              <span
                key={ai}
                className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded border border-white/[0.10] bg-white/[0.04] text-zinc-400"
              >
                {ai}
              </span>
            ))}
          </div>
        </div>
        <h3 className="text-lg sm:text-xl font-semibold text-white tracking-tight mb-1.5">
          {prompt.title}
        </h3>
        <p className="text-sm text-zinc-400 leading-relaxed">{prompt.subtitle}</p>
      </div>

      {/* Prompt body */}
      <div className="relative">
        <div className="max-h-72 overflow-y-auto p-5 bg-[#0a0a0b]/40">
          <pre className="text-xs sm:text-[13px] text-zinc-300 leading-relaxed font-mono whitespace-pre-wrap break-words">
            {prompt.body}
          </pre>
        </div>
        {/* fade-out indicator if scrollable */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#0a0a0b]/80 to-transparent pointer-events-none" />
      </div>

      {/* Action bar */}
      <div className="px-5 py-4 border-t border-white/[0.04] bg-white/[0.01] flex flex-wrap items-center gap-2">
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-400 hover:to-violet-500 transition-colors shadow-lg shadow-violet-500/20"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" /> Copied
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" /> Copy prompt
            </>
          )}
        </button>
        <a
          href={chatgptUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium text-zinc-200 bg-emerald-500/[0.08] border border-emerald-500/20 hover:bg-emerald-500/[0.14] hover:text-white transition-colors"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          Open in ChatGPT
          <ExternalLink className="w-3 h-3 opacity-60" />
        </a>
        <a
          href={claudeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium text-zinc-200 bg-amber-500/[0.08] border border-amber-500/20 hover:bg-amber-500/[0.14] hover:text-white transition-colors"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          Open in Claude
          <ExternalLink className="w-3 h-3 opacity-60" />
        </a>
      </div>

      {/* Output handling */}
      <div className="px-5 py-4 bg-white/[0.015] border-t border-white/[0.04]">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-amber-300 mb-1">
          What to do with the output
        </p>
        <p className="text-sm text-zinc-300 leading-relaxed">{prompt.outputHandling}</p>
      </div>
    </div>
  )
}
