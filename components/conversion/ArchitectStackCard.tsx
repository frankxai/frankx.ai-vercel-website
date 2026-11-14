import Link from 'next/link'
import { ArrowUpRight, BookOpen } from 'lucide-react'
import type { RecommendedStackTool } from '@/lib/mcp/stack-recommendations'
import { LiquidGlassSurface } from '@/components/visuals/LiquidGlassSurface'

export function ArchitectStackCard({ tool }: { tool: RecommendedStackTool }) {
  return (
    <LiquidGlassSurface accent={tool.sponsored ? 'amber' : 'cyan'} className="h-full p-5">
      <div className="flex h-full flex-col justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-mono uppercase tracking-[0.16em] text-zinc-400">{tool.role}</span>
            <span
              className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${
                tool.sponsored
                  ? 'border-amber-400/35 bg-amber-500/10 text-amber-200'
                  : 'border-white/15 bg-white/[0.05] text-zinc-300'
              }`}
            >
              {tool.sponsored ? 'Partner link (/go)' : 'Editorial link'}
            </span>
          </div>

          <h3 className="mt-2.5 text-lg font-semibold text-white">{tool.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-300">{tool.summary}</p>
        </div>

        <div className="space-y-3 border-t border-white/[0.08] pt-3.5">
          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href={tool.url}
              target="_blank"
              rel={tool.rel}
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl border border-emerald-400/35 bg-emerald-500/15 px-3.5 py-2 text-xs font-semibold text-emerald-200 transition-colors hover:bg-emerald-500/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
            >
              <span>Open {tool.name}</span>
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>

            {tool.guideUrl ? (
              <Link
                href={tool.guideUrl.replace('https://frankx.ai', '')}
                className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl border border-white/15 bg-white/[0.04] px-3.5 py-2 text-xs font-medium text-zinc-200 transition-colors hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b]"
              >
                <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Implementation guide</span>
              </Link>
            ) : null}
          </div>

          <p className="text-[12px] leading-relaxed text-zinc-400">{tool.disclosure}</p>
        </div>
      </div>
    </LiquidGlassSurface>
  )
}
