import { ExternalLink } from 'lucide-react'
import type { AgenticPlatformEntry } from '@/lib/llm-hub/registry'

interface AgenticPlatformPillProps {
  platform: AgenticPlatformEntry
  accent?: string
}

export function AgenticPlatformPill({ platform, accent = '#a855f7' }: AgenticPlatformPillProps) {
  return (
    <a
      href={platform.url || '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-colors hover:border-white/25"
    >
      <span
        className="mt-1 h-2 w-2 shrink-0 rounded-full"
        style={{ backgroundColor: accent }}
        aria-hidden
      />
      <div className="flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-semibold text-white">{platform.name}</p>
          <ExternalLink className="h-3.5 w-3.5 text-white/20 transition-colors group-hover:text-white/60" />
        </div>
        <p className="mt-0.5 text-[11px] uppercase tracking-wider text-white/30">
          {platform.type}
          {platform.released ? ` · ${platform.released}` : null}
        </p>
        {platform.one_liner ? (
          <p className="mt-2 text-xs leading-relaxed text-white/50">{platform.one_liner}</p>
        ) : null}
      </div>
    </a>
  )
}
