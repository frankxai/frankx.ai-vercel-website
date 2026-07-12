import Link from 'next/link'
import { ArrowRight, BookOpen, Clock, Play } from 'lucide-react'
import { learningPaths, type LearningPath } from '@/data/learning-paths'
import { iconMap, colorMap } from '@/lib/learn/portal-display'

/**
 * Bottom-of-content "Continue in the Learn Hub" section. Designed for use at
 * the end of /guides, /research, and their [slug] pages. Pulls metadata from
 * `learningPaths` so call sites only need to name the portals.
 *
 * Renders nothing when:
 *   - relatedPortals is empty
 *   - no slugs in relatedPortals resolve to a real LearningPath
 *
 * Two variants:
 *   - 'default' — full eyebrow + heading + 3-up card grid
 *   - 'compact' — single-row card list with smaller heading, for use on pages
 *                 that already have a lot going on at the bottom
 */
export interface LearnHubSectionProps {
  /** Explicit slugs to render. Order is preserved; unknown slugs are silently dropped. */
  relatedPortals: string[]
  /** Optional eyebrow above the heading. Defaults to "Learn hub". */
  eyebrow?: string
  /** Optional heading override. Defaults to "Continue in the Learn Hub". */
  heading?: string
  /** Optional one-line description below the heading. */
  blurb?: string
  /** Visual density. Defaults to 'default'. */
  variant?: 'default' | 'compact'
}

function PortalCard({ portal }: { portal: LearningPath }) {
  const Icon = iconMap[portal.icon] ?? BookOpen
  const colors = colorMap[portal.color]

  return (
    <Link
      href={`/learn/${portal.slug}`}
      className={`group relative block p-5 rounded-2xl border bg-gradient-to-br ${colors} hover:border-white/20 transition-all hover:-translate-y-0.5`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="p-2.5 rounded-xl bg-white/5">
          <Icon className="w-5 h-5" />
        </div>
        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/10 text-white/60 uppercase tracking-wider">
          {portal.difficulty}
        </span>
      </div>
      <h3 className="text-base font-semibold text-white mb-1 group-hover:text-white/90 line-clamp-2">
        {portal.title}
      </h3>
      <p className="text-xs text-white/55 mb-3 line-clamp-2 leading-relaxed">{portal.description}</p>
      <div className="flex items-center gap-3 text-[11px] text-white/40">
        <span className="inline-flex items-center gap-1">
          <Clock className="w-3 h-3" aria-hidden="true" />
          {portal.estimatedHours} hours
        </span>
        <span className="inline-flex items-center gap-1">
          <Play className="w-3 h-3" aria-hidden="true" />
          {portal.videos.length} videos
        </span>
      </div>
      <ArrowRight className="absolute bottom-4 right-4 w-4 h-4 text-white/20 group-hover:text-white/70 group-hover:translate-x-1 transition-all" />
    </Link>
  )
}

export default function LearnHubSection({
  relatedPortals,
  eyebrow = 'Learn hub',
  heading = 'Continue in the Learn Hub',
  blurb,
  variant = 'default',
}: LearnHubSectionProps) {
  if (!relatedPortals || relatedPortals.length === 0) return null

  const resolved = relatedPortals
    .map((slug) => learningPaths.find((p) => p.slug === slug))
    .filter((p): p is LearningPath => Boolean(p))

  if (resolved.length === 0) return null

  const gridClass =
    variant === 'compact'
      ? 'grid sm:grid-cols-2 lg:grid-cols-3 gap-3'
      : 'grid sm:grid-cols-2 lg:grid-cols-3 gap-4'

  return (
    <section
      aria-labelledby="learn-hub-section-heading"
      className="not-prose mt-16 mb-8 max-w-6xl mx-auto px-6"
    >
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
          {eyebrow}
        </p>
        <h2
          id="learn-hub-section-heading"
          className={
            variant === 'compact'
              ? 'text-xl font-semibold text-white'
              : 'text-2xl md:text-3xl font-bold text-white'
          }
        >
          {heading}
        </h2>
        {blurb && <p className="mt-2 text-sm text-white/55 max-w-2xl">{blurb}</p>}
      </div>
      <div className={gridClass}>
        {resolved.map((portal) => (
          <PortalCard key={portal.id} portal={portal} />
        ))}
      </div>
      <div className="mt-6 text-sm">
        <Link
          href="/learn"
          className="inline-flex items-center gap-1 text-white/60 hover:text-white transition-colors"
        >
          Browse all portals
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}
