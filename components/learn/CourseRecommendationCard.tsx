import Link from 'next/link'
import { ArrowUpRight, BookOpen, Clock3 } from 'lucide-react'
import type { CourseRecommendation } from '@/data/learning-catalog'

type CourseRecommendationCardProps = {
  course: CourseRecommendation
  featured?: boolean
}

export default function CourseRecommendationCard({
  course,
  featured = false,
}: CourseRecommendationCardProps) {
  const destination = course.affiliateUrl ?? course.canonicalUrl
  const isAffiliate = Boolean(course.affiliateUrl)

  return (
    <article
      className={`flex h-full flex-col border border-white/[0.08] bg-[#111113] ${
        featured ? 'rounded-3xl p-7 sm:p-9' : 'rounded-2xl p-6'
      }`}
    >
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm text-[#b8b8bd]">
          <BookOpen className="h-4 w-4 text-emerald-300" aria-hidden="true" />
          <span>{course.provider}</span>
        </div>
        <span className="rounded-full border border-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-[#98989f]">
          {isAffiliate ? 'Affiliate link' : 'Independent pick'}
        </span>
      </div>

      <h3
        className={`font-display font-semibold leading-tight tracking-[-0.025em] text-white ${
          featured ? 'text-3xl sm:text-4xl' : 'text-2xl'
        }`}
      >
        {course.title}
      </h3>
      <p className="mt-3 text-sm font-medium leading-relaxed text-emerald-200">
        Best for: {course.bestFor}
      </p>
      <p className="mt-4 text-[15px] leading-7 text-[#b8b8bd]">{course.verdict}</p>

      {featured && (
        <div className="mt-6 border-l border-emerald-400/40 pl-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#98989f]">
            Why it made the list
          </p>
          <p className="mt-2 text-sm leading-6 text-[#b8b8bd]">{course.whyItMadeTheList}</p>
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/[0.06] pt-5 text-xs text-[#98989f]">
        <span>{course.level}</span>
        <span className="inline-flex items-center gap-1.5">
          <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
          {course.effort}
        </span>
        <span>{course.format}</span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {course.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-white/[0.05] px-3 py-1 text-xs text-[#b8b8bd]"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-auto flex flex-col gap-3 pt-7 sm:flex-row sm:items-center">
        <a
          href={destination}
          target="_blank"
          rel={isAffiliate ? 'sponsored noopener noreferrer' : 'noopener noreferrer'}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111113]"
          aria-label={`View ${course.title} on ${course.provider} (opens in a new tab)`}
        >
          View course
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
        {course.relatedArticle && (
          <Link
            href={course.relatedArticle.href}
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-white/30 hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111113]"
          >
            Read FrankX note
          </Link>
        )}
      </div>

      <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.12em] text-[#98989f]">
        Verified {course.lastVerified}
      </p>
    </article>
  )
}
