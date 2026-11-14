'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Check, Copy, Terminal, ArrowUpRight } from 'lucide-react'
import { HomeLiquidSurface } from '@/components/home/HomeLiquidSurface'

const MCP_ENDPOINT_URL = 'https://frankx.ai/api/mcp'
const MCP_INSTALL_COMMAND = `claude mcp add --transport http frankx ${MCP_ENDPOINT_URL}`

/**
 * Compact dual-surface bar exposing the live FrankX MCP endpoint and developer entry routes.
 */
export function HomeAgentCommandBar() {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(MCP_INSTALL_COMMAND)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section aria-label="Agent and MCP Integration" className="mx-auto max-w-6xl px-4 sm:px-6 pb-8">
      <HomeLiquidSurface tone="cyan" className="p-5 sm:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-cyan-300">
              <Terminal className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Agent Ready · Live MCP Endpoint</span>
            </div>
            <h2 className="text-base sm:text-lg font-medium tracking-tight text-white">
              Connect Claude Code, Cursor, or Vercel AI agents to the FrankX skill and architecture catalog.
            </h2>
            <p className="text-sm text-white/65">
              Endpoint:{' '}
              <code className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-xs text-emerald-300">
                {MCP_ENDPOINT_URL}
              </code>
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-black/40 px-3 py-2 font-mono text-xs text-white/85">
              <span className="truncate max-w-[260px] sm:max-w-[320px]">{MCP_INSTALL_COMMAND}</span>
              <button
                type="button"
                onClick={handleCopy}
                aria-label="Copy Claude Code MCP install command"
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.05] text-white/80 hover:border-cyan-400/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70 transition-[border-color,color,background-color]"
              >
                {copied ? (
                  <Check className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
                ) : (
                  <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                )}
              </button>
            </div>

            <nav aria-label="Agent resources" className="flex flex-wrap items-center gap-2 text-xs font-medium">
              <Link
                href="/developers"
                className="inline-flex items-center gap-1 rounded-xl border border-white/15 bg-white/[0.05] px-3 py-2 text-white hover:border-emerald-400/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70 transition-[border-color,background-color]"
              >
                <span>Developers</span>
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
              <Link
                href="/skills"
                className="inline-flex items-center rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-white/80 hover:border-white/25 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 transition-[border-color,color]"
              >
                Skills
              </Link>
              <Link
                href="/ai-architecture"
                className="inline-flex items-center rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-white/80 hover:border-white/25 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 transition-[border-color,color]"
              >
                Architectures
              </Link>
              <Link
                href="/llms.txt"
                className="inline-flex items-center rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 font-mono text-white/75 hover:border-white/25 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 transition-[border-color,color]"
              >
                llms.txt
              </Link>
            </nav>
          </div>
        </div>
      </HomeLiquidSurface>
    </section>
  )
}
