import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import { getQualitiesForHref } from '@/lib/qualities'

export default function RelatedQualities({ href }: { href: string }) {
  const related = getQualitiesForHref(href)
  if (related.length === 0) return null

  return (
    <aside className="mt-12 rounded-2xl border border-emerald-300/15 bg-emerald-300/[0.035] p-6" aria-labelledby="related-qualities-title">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-300/70">Part of the constitution</p>
      <h2 id="related-qualities-title" className="mt-3 font-display text-xl font-semibold text-white">
        {related.length === 1 ? `This work expresses ${related[0].name}.` : 'This work connects multiple qualities.'}
      </h2>
      <div className="mt-5 space-y-4">
        {related.map((quality) => {
          const evidence = quality.evidence.find((item) => item.href === href)
          return (
            <div key={quality.slug} className="border-t border-white/10 pt-4 first:border-t-0 first:pt-0">
              <Link
                href={`/qualities/${quality.slug}`}
                className="group inline-flex items-center gap-2 font-display text-base font-semibold text-white transition-colors hover:text-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/70"
              >
                {quality.name} · {quality.shortRole}
                <ArrowUpRight className="h-3.5 w-3.5 text-emerald-300/70 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              {evidence ? <p className="mt-1 text-sm leading-6 text-white/52">{evidence.note}</p> : null}
            </div>
          )
        })}
      </div>
    </aside>
  )
}
