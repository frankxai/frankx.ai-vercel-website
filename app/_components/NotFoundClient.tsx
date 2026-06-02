'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Home, Search, BookOpen, Sparkles, Compass, Workflow, Library, Video, Briefcase, Atom, Brain, Mail } from 'lucide-react'
import FrankOmega from '@/components/FrankOmega'
import type { ScoredRoute } from '@/lib/fuzzy-route-match'

interface Props {
  pathname: string
  matches: ScoredRoute[]
  topConfidence: number
}

const typeIcon: Record<string, typeof Home> = {
  core: Home,
  blog: BookOpen,
  workshop: Sparkles,
  product: Briefcase,
  guide: Compass,
  library: Library,
  os: Workflow,
  research: Atom,
  newsletter: BookOpen,
  partnership: Briefcase,
  tool: Brain,
  community: Sparkles,
  section: Compass,
  video: Video,
  static: Home,
  legacy: Home,
}

const typeColor: Record<string, string> = {
  workshop: 'bg-fuchsia-500/15 text-fuchsia-300 group-hover:bg-fuchsia-500/25',
  blog: 'bg-violet-500/15 text-violet-300 group-hover:bg-violet-500/25',
  product: 'bg-amber-500/15 text-amber-300 group-hover:bg-amber-500/25',
  library: 'bg-emerald-500/15 text-emerald-300 group-hover:bg-emerald-500/25',
  os: 'bg-cyan-500/15 text-cyan-300 group-hover:bg-cyan-500/25',
  research: 'bg-teal-500/15 text-teal-300 group-hover:bg-teal-500/25',
  tool: 'bg-rose-500/15 text-rose-300 group-hover:bg-rose-500/25',
  community: 'bg-amber-500/15 text-amber-300 group-hover:bg-amber-500/25',
  video: 'bg-cyan-500/15 text-cyan-300 group-hover:bg-cyan-500/25',
  guide: 'bg-violet-500/15 text-violet-300 group-hover:bg-violet-500/25',
  newsletter: 'bg-amber-500/15 text-amber-300 group-hover:bg-amber-500/25',
  partnership: 'bg-emerald-500/15 text-emerald-300 group-hover:bg-emerald-500/25',
}
const fallbackColor = 'bg-white/[0.08] text-white/70 group-hover:bg-white/[0.12]'

// Friendly fallback when fuzzy match returns nothing
const FALLBACK_MATCHES: ScoredRoute[] = [
  { href: '/', title: 'Home', tags: [], type: 'core', score: 1, matchedOn: 'navigation home' },
  { href: '/blog', title: 'Blog', tags: [], type: 'blog', score: 1, matchedOn: 'latest writing' },
  { href: '/library', title: 'Library', tags: [], type: 'library', score: 1, matchedOn: 'book intelligence' },
  { href: '/workshops', title: 'Workshops', tags: [], type: 'workshop', score: 1, matchedOn: 'live sessions' },
]

export default function NotFoundClient({ pathname, matches, topConfidence }: Props) {
  const hasMatches = matches.length > 0
  const display = hasMatches ? matches : FALLBACK_MATCHES
  const showPathHint = pathname && pathname !== '/' && pathname.length < 80
  const logged = useRef(false)

  // Fire-and-forget telemetry to /api/404/log. Guarded with useRef so React
  // strict-mode double-render doesn't double-count. Failures are silent —
  // the user UX never depends on the log endpoint being available.
  useEffect(() => {
    if (logged.current) return
    if (!pathname || pathname === '/') return
    logged.current = true
    const controller = new AbortController()
    fetch('/api/404/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      keepalive: true, // tolerate the user navigating away before fetch resolves
      signal: controller.signal,
      body: JSON.stringify({
        path: pathname,
        referrer: document.referrer || undefined,
        userAgent: navigator.userAgent,
        topConfidence,
        topMatch: matches[0]?.href,
      }),
    }).catch(() => {
      /* silent — telemetry is best-effort */
    })
    return () => controller.abort()
  }, [pathname, topConfidence, matches])

  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center px-4 py-20">
      <div className="max-w-2xl mx-auto text-center">
        {/* 404 number — giant watermark */}
        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-[8rem] sm:text-[10rem] font-bold leading-none tracking-tight text-white/[0.04] select-none mb-2"
        >
          404
        </motion.p>

        {/* FRANK-Omega character */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="-mt-24 mb-8 relative z-10"
        >
          <FrankOmega
            variant="chibi-avatar"
            size="lg"
            animate
            float
            glow
            speech={
              hasMatches
                ? 'This path doesn\'t lead anywhere on frankx.ai. Maybe you wanted one of these.'
                : 'This path doesn\'t lead anywhere on frankx.ai. Start from one of these.'
            }
          />
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-white/90 mb-3 tracking-tight">
            Page not found
          </h1>
          {showPathHint && (
            <p className="text-xs font-mono text-white/40 mb-3">
              No route at <span className="text-white/70">{pathname}</span>
            </p>
          )}
          <p className="text-sm text-white/30 mb-10 max-w-md mx-auto leading-relaxed">
            {hasMatches
              ? `Top ${display.length} closest matches from frankx.ai — click the one you wanted.`
              : 'Start from one of these.'}
          </p>
        </motion.div>

        {/* Suggestions grid */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-10 text-left"
        >
          {display.map((match) => {
            const Icon = typeIcon[match.type] ?? Home
            const colorClass = typeColor[match.type] ?? fallbackColor
            return (
              <Link
                key={match.href}
                href={match.href}
                className="group flex items-start gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-3.5 hover:border-white/[0.12] hover:bg-white/[0.05] transition-all"
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors flex-shrink-0 ${colorClass}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="text-left min-w-0 flex-1">
                  <p className="text-sm font-medium text-white/85 group-hover:text-white transition-colors truncate">
                    {match.title || match.href}
                  </p>
                  <p className="text-[11px] text-white/30 truncate">
                    {match.href}
                  </p>
                  {hasMatches && match.matchedOn && (
                    <p className="text-[10px] text-white/20 mt-1 italic truncate">
                      {match.matchedOn}
                    </p>
                  )}
                </div>
              </Link>
            )
          })}
        </motion.div>

        {/* Confidence indicator (subtle, only when fuzzy matches exist) */}
        {hasMatches && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-[10px] font-mono text-white/15 mb-6"
          >
            match confidence: {(topConfidence * 100).toFixed(0)}%
          </motion.p>
        )}

        {/* Search CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-6 items-center justify-center"
        >
          <Link
            href="/search"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/80 transition-colors"
          >
            <Search className="w-3.5 h-3.5" /> Search the site
          </Link>
          <Link
            href="/start"
            className="inline-flex items-center gap-2 text-sm text-white/30 hover:text-white/70 transition-colors font-mono border-b border-white/[0.08] hover:border-white/20 pb-0.5"
          >
            Or start from the beginning <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>

        {/* Broken link? Email Frank directly */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75, duration: 0.5 }}
          className="mt-10"
        >
          <Link
            href={`mailto:frank@frankx.ai?subject=${encodeURIComponent('Broken link on frankx.ai')}&body=${encodeURIComponent(`Hi Frank,\n\nI hit a 404 at: ${pathname}\n\nI was trying to reach:\n`)}`}
            className="inline-flex items-center gap-2 text-xs text-white/30 hover:text-white/60 transition-colors"
          >
            <Mail className="w-3 h-3" /> If this was a broken link, email Frank directly
          </Link>
        </motion.div>

        {/* Footer mark */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-12 text-[10px] font-mono text-white/10"
        >
          frankx.ai // FRANK-&#937;
        </motion.p>
      </div>
    </div>
  )
}
