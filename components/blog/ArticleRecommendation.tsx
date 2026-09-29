import AffiliateLink from '@/components/affiliates/AffiliateLink'
import { getAffiliateDestination } from '@/lib/affiliates/link-builder'

export function ArticleRecommendation({ affiliateId, article, title, children }: {
  affiliateId: string
  article: string
  title: string
  children: ReactNode
}) {
  const destination = getAffiliateDestination(affiliateId)
  if (!destination) return null
  return (
    <aside aria-label={title} className="my-10 border-y border-white/15 py-6">
      <p className="mb-2 text-base font-semibold text-white">{title}</p>
      <div className="text-sm leading-relaxed text-white/80">{children}</div>
      {destination.sponsored && <p className="mt-3 text-sm text-white/70">Affiliate link: I may earn a commission when you purchase through this link.</p>}
      <AffiliateLink affiliateId={affiliateId} trackingId={article} data-context="article-recommendation"
        className="mt-4 inline-block rounded-full border border-emerald-400/40 px-5 py-3 text-sm font-medium text-emerald-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">
        Explore {title}
      </AffiliateLink>
    </aside>
  )
}
import type { ReactNode } from 'react'
