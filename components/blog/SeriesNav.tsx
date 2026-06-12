import Link from 'next/link'
import { ArrowLeft, ArrowRight, Layers } from 'lucide-react'
import type { BlogPost, BlogSeries } from '@/lib/blog'

/**
 * SeriesNav — renders the "Part N of M" rail under a series article's hero.
 * Server component: resolves siblings at build time, links published parts,
 * and shows planned-but-unpublished parts as muted placeholders so readers
 * see the full arc without dead links.
 */
export default function SeriesNav({
  series,
  currentSlug,
  publishedParts,
}: {
  series: BlogSeries
  currentSlug: string
  publishedParts: BlogPost[]
}) {
  const byPart = new Map<number, BlogPost>()
  publishedParts.forEach((p) => {
    if (p.series) byPart.set(p.series.part, p)
  })
  const prev = byPart.get(series.part - 1)
  const next = byPart.get(series.part + 1)

  return (
    <nav
      aria-label={`${series.title} — series navigation`}
      className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-6"
    >
      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
        <Layers className="h-3.5 w-3.5" />
        <span>
          Part {series.part} of {series.total} · A series
        </span>
      </div>
      <p className="mt-2 text-base font-semibold text-white">{series.title}</p>

      {/* The arc — every planned part, current highlighted, future parts muted */}
      <ol className="mt-4 space-y-1.5">
        {Array.from({ length: series.total }, (_, i) => i + 1).map((part) => {
          const post = byPart.get(part)
          const isCurrent = part === series.part
          const label = post?.title ?? `Part ${part} — coming soon`
          const row = (
            <span className="flex items-baseline gap-3">
              <span
                className={`shrink-0 tabular-nums text-xs ${
                  isCurrent ? 'text-emerald-400' : 'text-white/30'
                }`}
              >
                {String(part).padStart(2, '0')}
              </span>
              <span
                className={
                  isCurrent
                    ? 'text-sm font-medium text-white'
                    : post
                    ? 'text-sm text-white/60 hover:text-white transition-colors'
                    : 'text-sm text-white/30'
                }
              >
                {label}
              </span>
            </span>
          )
          return (
            <li key={part} aria-current={isCurrent ? 'page' : undefined}>
              {post && !isCurrent ? (
                <Link href={`/blog/${post.slug}`}>{row}</Link>
              ) : (
                row
              )}
            </li>
          )
        })}
      </ol>

      {/* Prev / next */}
      {(prev || next) && (
        <div className="mt-5 flex items-center justify-between gap-4 border-t border-white/[0.06] pt-4">
          {prev ? (
            <Link
              href={`/blog/${prev.slug}`}
              className="group inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
              <span className="line-clamp-1">Previous</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/blog/${next.slug}`}
              className="group inline-flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <span className="line-clamp-1">Next part</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          ) : (
            <span />
          )}
        </div>
      )}
    </nav>
  )
}
