'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Expand, ExternalLink, Moon, Sparkles, Sun, X } from 'lucide-react'

export type SystemDiagramId =
  | 'ai-coe-six-pillars'
  | 'ai-gateway'
  | 'ai-ops-stack'
  | 'llmops-loop'
  | 'mcp-hub'
  | 'visual-estate'
  | 'opencode-ai-gateway-stack'
  | 'agentic-os-architecture'

export interface LivingWorldCompanion {
  src: string
  alt: string
  badge?: string
  note?: string
}

export interface SystemDiagramProps {
  diagramId: SystemDiagramId
  alt: string
  eyebrow?: string
  title?: string
  caption?: string
  companion?: LivingWorldCompanion
  defaultTheme?: 'dark' | 'light'
  className?: string
}

export function SystemDiagram({
  diagramId,
  alt,
  eyebrow,
  title,
  caption,
  companion,
  defaultTheme = 'dark',
  className = '',
}: SystemDiagramProps) {
  const [mode, setMode] = useState<'dark' | 'light' | 'studio'>(defaultTheme)
  const [expanded, setExpanded] = useState(false)

  const darkSrc = `/images/diagrams/system/${diagramId}.svg`
  const lightSrc = `/images/diagrams/system/${diagramId}.light.svg`
  const activeSvgSrc = mode === 'light' ? lightSrc : darkSrc

  useEffect(() => {
    if (!expanded) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setExpanded(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [expanded])

  return (
    <figure
      className={`rounded-2xl border border-white/10 bg-[#0d1015]/90 backdrop-blur-md overflow-hidden shadow-2xl ${className}`}
    >
      {/* Control header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] px-5 py-3.5 bg-white/[0.02]">
        <div className="min-w-0">
          {eyebrow && (
            <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-cyan-300/80">
              {eyebrow}
            </p>
          )}
          {title && (
            <h2 className="text-base sm:text-lg font-semibold text-white truncate">
              {title}
            </h2>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <div
            role="group"
            aria-label="Diagram view mode"
            className="inline-flex items-center rounded-full border border-white/10 bg-black/40 p-0.5 text-xs"
          >
            <button
              type="button"
              onClick={() => setMode('dark')}
              aria-pressed={mode === 'dark'}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                mode === 'dark'
                  ? 'bg-white/15 text-white'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Moon className="h-3.5 w-3.5" aria-hidden="true" />
              Dark SVG
            </button>
            <button
              type="button"
              onClick={() => setMode('light')}
              aria-pressed={mode === 'light'}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                mode === 'light'
                  ? 'bg-white text-zinc-950'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Sun className="h-3.5 w-3.5" aria-hidden="true" />
              Light SVG
            </button>
            {companion && (
              <button
                type="button"
                onClick={() => setMode('studio')}
                aria-pressed={mode === 'studio'}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 ${
                  mode === 'studio'
                    ? 'bg-violet-500/25 text-violet-200 border border-violet-400/30'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                Studio Split
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => setExpanded(true)}
            aria-label="Inspect full-screen diagram"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-zinc-300 hover:border-white/25 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            <Expand className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">Zoom</span>
          </button>

          <a
            href={activeSvgSrc}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open raw vector SVG in new tab"
            className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-zinc-300 hover:border-white/25 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            <span className="font-mono text-[11px]">SVG</span>
            <ExternalLink className="h-3 w-3" aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* Canvas */}
      {mode === 'studio' && companion ? (
        <div className="grid lg:grid-cols-[0.92fr_1.08fr] gap-0 border-b border-white/[0.06]">
          <div className="relative min-h-[260px] bg-[#07090e] border-b lg:border-b-0 lg:border-r border-white/[0.08]">
            <Image
              src={companion.src}
              alt={companion.alt}
              width={1280}
              height={720}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent p-4">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-400/30 bg-violet-500/20 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-violet-200">
                {companion.badge || 'Living-World Companion Scene'}
              </span>
              {companion.note && (
                <p className="mt-1.5 text-xs text-zinc-200 leading-relaxed">
                  {companion.note}
                </p>
              )}
            </div>
          </div>
          <div className="p-3 sm:p-4 bg-[#0a0a0b] flex items-center justify-center overflow-x-auto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={darkSrc}
              alt={alt}
              loading="eager"
              className="w-full h-auto rounded-xl"
            />
          </div>
        </div>
      ) : (
        <div
          className={`p-3 sm:p-5 overflow-x-auto transition-colors ${
            mode === 'light' ? 'bg-[#eef1f3]' : 'bg-[#0a0a0b]'
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={activeSvgSrc}
            alt={alt}
            loading="eager"
            className="w-full h-auto rounded-xl mx-auto block"
          />
        </div>
      )}

      {/* Caption & Provenance bar */}
      <figcaption className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 text-xs text-zinc-400 bg-white/[0.015]">
        <span>{caption || alt}</span>
        <span className="font-mono text-[11px] text-emerald-300/80 shrink-0">
          Deterministic SVG · WCAG AA ≥ 4.5:1
        </span>
      </figcaption>

      {/* Lightbox Modal */}
      {expanded && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={title || alt}
          onClick={() => setExpanded(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-8"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[92vh] max-w-7xl w-full overflow-auto rounded-2xl border border-white/15 bg-[#0a0a0b] p-4 sm:p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between gap-4 pb-4 mb-4 border-b border-white/10">
              <div>
                <p className="text-sm font-semibold text-white">{title || diagramId}</p>
                <p className="text-xs text-zinc-400">{alt}</p>
              </div>
              <button
                type="button"
                onClick={() => setExpanded(false)}
                aria-label="Close full-screen diagram"
                className="rounded-full border border-white/15 bg-white/5 p-2 text-zinc-300 hover:bg-white/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activeSvgSrc}
              alt={alt}
              className="w-full h-auto rounded-xl"
            />
          </div>
        </div>
      )}
    </figure>
  )
}

export default SystemDiagram
