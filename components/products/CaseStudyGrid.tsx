"use client"

import { trackEvent } from '@/lib/analytics'
import type { ProductCaseStudy } from '@/types/products'

interface CaseStudyGridProps {
  productId: string
  caseStudies: ProductCaseStudy[]
  title?: string
  description?: string
}

export default function CaseStudyGrid({ productId, caseStudies, title = 'Field Notes From the Collective', description = 'These makers pressed the toolkit into production and reported back on the shifts they experienced.' }: CaseStudyGridProps) {
  if (!caseStudies.length) {
    return null
  }

  return (
    <section className="bg-[#02030b] py-16">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-center text-3xl font-semibold text-white">{title}</h2>
        {description ? (
          <p className="mt-4 text-center text-sm text-white/70">{description}</p>
        ) : null}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {caseStudies.map((study) => {
            const handleClick = () => {
              trackEvent('product_case_study_click', {
                productId,
                title: study.title,
              })
            }

            return (
              <div key={study.title} className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200">
                  {study.metric ?? 'Case Study'}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-white">{study.title}</h3>
                <p className="mt-3 text-sm text-white/70 leading-relaxed">{study.description}</p>
                {study.quote ? (
                  <blockquote className="mt-4 text-sm text-white/60">&ldquo;{study.quote}&rdquo;</blockquote>
                ) : null}
                {study.author || study.role ? (
                  <p className="mt-2 text-xs uppercase tracking-[0.2em] text-white/40">
                    {[study.author, study.role].filter(Boolean).join(' - ')}
                  </p>
                ) : null}
                {study.ctaHref && study.ctaLabel ? (
                  <a
                    href={study.ctaHref}
                    onClick={handleClick}
                    className="mt-6 inline-flex items-center justify-center rounded-xl border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:border-white/40"
                  >
                    {study.ctaLabel}
                  </a>
                ) : null}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
