'use client'

import { useMemo, useState } from 'react'
import { Copy, Check, ExternalLink, Sparkles, ArrowRight } from 'lucide-react'
import { marked } from 'marked'
import DOMPurify from 'isomorphic-dompurify'
import type { WorkshopPrompt } from '@/lib/workshop-prompts'

marked.setOptions({ gfm: true, breaks: false })

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

  const renderedBody = useMemo(() => {
    const html = marked.parse(prompt.body, { async: false }) as string
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: ['p', 'strong', 'em', 'ul', 'ol', 'li', 'blockquote', 'pre', 'code', 'br', 'hr', 'h1', 'h2', 'h3', 'h4'],
      ALLOWED_ATTR: [],
    })
  }, [prompt.body])

  function handleCopy() {
    navigator.clipboard.writeText(prompt.body)
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  return (
    <div
      className="rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-500/[0.04] via-white/[0.02] to-amber-500/[0.03] overflow-hidden"
      data-workshop-prompt={prompt.id}
      data-workshop-module={prompt.module}
      data-workshop-prompt-title={prompt.title}
    >
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

      {/* Prompt body — rendered markdown on screen, raw markdown on copy.
          The data-workshop-prompt-body attribute exposes raw prompt text
          to browser agents (Comet, Operator, Computer Use). */}
      <div className="relative">
        <div className="max-h-72 sm:max-h-80 overflow-y-auto px-5 sm:px-6 py-5 bg-[#0a0a0b]/40">
          <div
            data-workshop-prompt-body={prompt.id}
            className="text-[13px] sm:text-[14px] text-zinc-300 leading-[1.7]
                       [&>p]:mb-3
                       [&>p:last-child]:mb-0
                       [&_strong]:text-white [&_strong]:font-semibold
                       [&_em]:text-zinc-200 [&_em]:italic
                       [&_ul]:my-3 [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_ul]:list-none
                       [&_ol]:my-3 [&_ol]:pl-5 [&_ol]:space-y-1.5 [&_ol]:list-decimal [&_ol]:marker:text-violet-300/60
                       [&_ul>li]:relative [&_ul>li]:pl-3 [&_ul>li]:before:content-['·'] [&_ul>li]:before:absolute [&_ul>li]:before:-left-1 [&_ul>li]:before:text-violet-300/60
                       [&_blockquote]:my-4 [&_blockquote]:pl-4 [&_blockquote]:border-l-2 [&_blockquote]:border-violet-400/40 [&_blockquote]:text-zinc-200 [&_blockquote]:italic [&_blockquote]:font-[var(--font-serif-editorial)]
                       [&_pre]:my-3 [&_pre]:p-3 [&_pre]:rounded-lg [&_pre]:bg-black/40 [&_pre]:border [&_pre]:border-white/[0.06] [&_pre]:overflow-x-auto
                       [&_pre>code]:text-[12px] [&_pre>code]:text-emerald-200 [&_pre>code]:font-mono
                       [&_code]:text-[12px] [&_code]:text-emerald-200 [&_code]:bg-white/[0.04] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded
                       [&_h1]:text-base [&_h1]:font-semibold [&_h1]:text-white [&_h1]:mt-4 [&_h1]:mb-2
                       [&_h2]:text-sm [&_h2]:font-semibold [&_h2]:text-white [&_h2]:mt-4 [&_h2]:mb-2
                       [&_h3]:text-sm [&_h3]:font-semibold [&_h3]:text-violet-200 [&_h3]:mt-3 [&_h3]:mb-1.5"
            dangerouslySetInnerHTML={{ __html: renderedBody }}
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#0a0a0b]/95 to-transparent pointer-events-none" />
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
                className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium border cursor-pointer ${ACCENT_MAP[t.accent]} transition-colors`}
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

          {/* When-to-use-which guidance */}
          <div className="mt-3 pt-3 border-t border-white/[0.04] grid grid-cols-1 sm:grid-cols-3 gap-x-3 gap-y-1.5 text-[11px] leading-snug">
            <p className="text-zinc-400">
              <span className="text-emerald-300 font-medium">ChatGPT</span> — opens with prompt prefilled. Best if you use Memory.
            </p>
            <p className="text-zinc-400">
              <span className="text-amber-300 font-medium">Claude</span> — paste after open. Best for long, careful reasoning.
            </p>
            <p className="text-zinc-400">
              <span className="text-sky-300 font-medium">Gemini</span> — paste after open. Best if you live in Google Workspace.
            </p>
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
