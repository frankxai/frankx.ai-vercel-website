'use client'

import { Play, ExternalLink, Sparkles } from 'lucide-react'

interface LiveArtifactProps {
  /** Loom or YouTube URL. When empty, shows the placeholder state. */
  embedUrl?: string
  /** Static poster image while waiting for click-to-play. */
  posterSrc?: string
}

export function LiveArtifact({ embedUrl, posterSrc }: LiveArtifactProps) {
  const hasVideo = Boolean(embedUrl)

  // Don't render the section when there's no video — empty placeholder on a
  // public page reads as unfinished work. Section is gated upstream too via
  // LIVE_ARTIFACT_URL constant in app/workshops/ikigai-branding/page.tsx.
  if (!hasVideo) return null

  return (
    <div id="live-artifact" className="space-y-6">
      <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] overflow-hidden">
        <div className="p-6 sm:p-8 pb-4">
          <p className="text-xs font-medium uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            The artifact
          </p>
          <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
            Watch the post get written
          </h3>
          <p className="text-sm text-zinc-400 mt-2 max-w-2xl">
            Theory is cheap. Here is 90 seconds of me co-writing a LinkedIn post with Claude Cowork —
            using one of the five hook formats, anchored to a real pillar, preserving voice.
          </p>
        </div>

        {/* Video slot */}
        <div className="relative aspect-video bg-[#050507] border-y border-white/[0.04] overflow-hidden">
          {hasVideo ? (
            <iframe
              src={embedUrl}
              title="Claude Cowork demo — writing a LinkedIn post"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/[0.04] via-amber-500/[0.03] to-transparent" />
              {posterSrc && (
                <img
                  src={posterSrc}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover opacity-30"
                />
              )}
              <div className="relative w-16 h-16 rounded-full bg-white/[0.06] border border-white/[0.10] flex items-center justify-center mb-4">
                <Play className="w-7 h-7 text-zinc-500 ml-0.5" fill="currentColor" />
              </div>
              <p className="relative text-sm font-medium text-zinc-400 mb-1">
                Live demo lands here
              </p>
              <p className="relative text-xs text-zinc-600 max-w-xs">
                Frank is recording a 90-second Loom of co-writing a post with Claude Cowork.
                Subscribe below to be notified when it lands.
              </p>
            </div>
          )}
        </div>

        <div className="p-6 sm:p-8 pt-5">
          <div className="grid sm:grid-cols-3 gap-3 text-xs">
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
              <p className="font-medium text-violet-300 mb-1">What you will see</p>
              <p className="text-zinc-500">A blank doc become a publishable LinkedIn post in 90 seconds.</p>
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
              <p className="font-medium text-amber-300 mb-1">What you will hear</p>
              <p className="text-zinc-500">Why each prompt — and which Claude responses I rejected and why.</p>
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
              <p className="font-medium text-emerald-300 mb-1">What you will keep</p>
              <p className="text-zinc-500">The exact prompt scaffold, downloadable below.</p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <a
              href="/go/claude-cowork"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-violet-300 hover:text-violet-200 transition-colors"
            >
              Try Claude Cowork
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <span className="text-zinc-700">·</span>
            <a
              href="/go/ikigai-prompt-scaffold"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              Download the prompt scaffold
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
