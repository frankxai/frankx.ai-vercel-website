'use client'

import { MessageSquareMore, ExternalLink } from 'lucide-react'

interface CoachGPTCardProps {
  seedPrompt?: string
  label?: string
  compact?: boolean
}

export function CoachGPTCard({
  seedPrompt,
  label = 'Think with the Ikigai Coach',
  compact = false,
}: CoachGPTCardProps) {
  function handleClick() {
    if (seedPrompt) {
      try {
        navigator.clipboard.writeText(seedPrompt)
      } catch {
        /* clipboard can fail on insecure origins; the redirect still works */
      }
    }
  }

  if (compact) {
    return (
      <a
        href="/go/ikigai-coach"
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-violet-300 bg-violet-500/[0.08] border border-violet-500/20 hover:bg-violet-500/[0.15] transition-colors"
      >
        <MessageSquareMore className="w-3.5 h-3.5" />
        {label}
        <ExternalLink className="w-3 h-3 opacity-60" />
      </a>
    )
  }

  return (
    <a
      href="/go/ikigai-coach"
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="group block rounded-xl border border-violet-500/20 bg-violet-500/[0.04] hover:bg-violet-500/[0.08] hover:border-violet-500/30 transition-colors p-4"
    >
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-lg bg-violet-500/15 flex items-center justify-center flex-shrink-0">
          <MessageSquareMore className="w-4.5 h-4.5 text-violet-300" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white flex items-center gap-1.5">
            {label}
            <ExternalLink className="w-3 h-3 text-zinc-500 group-hover:text-violet-300 transition-colors" />
          </p>
          <p className="text-xs text-zinc-400 mt-0.5">
            {seedPrompt
              ? 'Opens the free Coach GPT. Suggested prompt copied to your clipboard.'
              : 'Opens the free Coach GPT in a new tab — walks you through this step Socratically.'}
          </p>
        </div>
      </div>
    </a>
  )
}
