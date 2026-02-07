import Link from 'next/link'
import { ArrowRight, Beaker } from 'lucide-react'
import { getRelatedDomainsForBlog } from '@/lib/research/blog-domain-map'
import { getDomainBySlug } from '@/lib/research/domains'

interface RelatedResearchProps {
  blogSlug: string
}

export default function RelatedResearch({ blogSlug }: RelatedResearchProps) {
  const domainSlugs = getRelatedDomainsForBlog(blogSlug)
  if (domainSlugs.length === 0) return null

  const domains = domainSlugs
    .map(slug => getDomainBySlug(slug))
    .filter(Boolean)

  if (domains.length === 0) return null

  return (
    <div className="mt-12 border-t border-white/10 pt-8">
      <div className="flex items-center gap-2 mb-4">
        <Beaker className="h-4 w-4 text-emerald-400" />
        <h3 className="text-sm font-semibold uppercase tracking-[0.35em] text-white/60">
          Related Research
        </h3>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {domains.map(domain => (
          <Link
            key={domain!.slug}
            href={`/research/${domain!.slug}`}
            className="group flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 hover:border-emerald-500/20 hover:bg-white/[0.04] transition-all"
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                {domain!.title}
              </p>
              <p className="text-xs text-white/40 mt-1 line-clamp-2">
                {domain!.subtitle}
              </p>
            </div>
            <ArrowRight className="h-4 w-4 text-white/20 group-hover:text-emerald-400 transition-colors flex-shrink-0 mt-0.5" />
          </Link>
        ))}
      </div>
    </div>
  )
}
