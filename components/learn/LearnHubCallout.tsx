import Link from 'next/link'
import { ArrowRight, GraduationCap } from 'lucide-react'
import { learningPaths } from '@/data/learning-paths'

/**
 * Inline MDX callout pointing at a single /learn portal. Use sparingly inside
 * blog and guide MDX where a specific portal is the natural next step. Renders
 * nothing if the slug doesn't resolve, so a typo can't break the page.
 *
 * Usage in MDX:
 *   <LearnHubCallout slug="gemini-mastery" anchor="ecosystem" />
 *
 * Replaces the ad-hoc blockquote pattern (`> [portal](/learn/...)`).
 */
export interface LearnHubCalloutProps {
  /** Slug of a portal in data/learning-paths.ts (e.g. 'claude-mastery'). */
  slug: string
  /** Optional anchor to deep-link into a portal section (e.g. 'ecosystem', 'faq'). */
  anchor?: string
  /** Optional override for the link label. Defaults to the portal title. */
  label?: string
  /** Optional override for the surrounding sentence. Defaults to "Dive deeper in …". */
  blurb?: string
}

export default function LearnHubCallout({ slug, anchor, label, blurb }: LearnHubCalloutProps) {
  const portal = learningPaths.find((p) => p.slug === slug)
  if (!portal) return null

  const href = anchor ? `/learn/${portal.slug}#${anchor}` : `/learn/${portal.slug}`
  const linkLabel = label ?? portal.title
  const intro = blurb ?? `Dive deeper in the ${portal.title} portal.`

  return (
    <aside
      className="not-prose my-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5 flex items-start gap-4"
      role="complementary"
      aria-label={`Related learning portal: ${portal.title}`}
    >
      <span className="mt-0.5 flex-shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-xl bg-white/5 text-white/70">
        <GraduationCap className="w-5 h-5" aria-hidden="true" />
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-white/70 leading-relaxed">
          {intro}{' '}
          <Link
            href={href}
            className="font-medium text-white underline decoration-white/30 hover:decoration-white/80 transition-colors"
          >
            {linkLabel}
          </Link>
          <ArrowRight className="inline-block ml-1 -mt-0.5 w-3.5 h-3.5 text-white/50" aria-hidden="true" />
        </p>
      </div>
    </aside>
  )
}
