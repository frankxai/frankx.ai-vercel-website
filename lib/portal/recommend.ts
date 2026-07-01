/**
 * Resolves Partner Portal `Recommendation` entries against the real content
 * registries (research domains, book reviews, blog posts, products,
 * downloads) instead of duplicating their data.
 *
 * Link-check philosophy matches scripts/check-internal-links.mjs: a pure
 * static pass that returns errors rather than throwing, so a route can
 * choose to fail loud in dev or filter+warn in production — the same
 * `--warn` escape hatch as `pnpm links:check:static`.
 */

import type { Recommendation } from '@/content/portal/types'
import { getDomainBySlug } from '@/lib/research/domains'
import { getReviewBySlug } from '@/data/book-reviews'
import { getBlogPost } from '@/lib/blog'
import { getProductBySlug } from '@/data/products'
import { downloadsList } from '@/data/downloads'

export type ResolvedRecommendation = Recommendation & {
  title: string
  href: string
  image?: string
}

/**
 * Ally-specific download kits that have a real page under app/downloads/<id>/
 * but aren't in `downloadsList` (the site-wide /downloads grid registry).
 * Titles copied verbatim from each page's own metadata.
 */
const ALLY_KIT_FALLBACK: Record<string, { title: string; href: string }> = {
  'ahmad-founder-creator-kit': {
    title: 'Ahmad Founder Creator Kit',
    href: '/downloads/ahmad-founder-creator-kit',
  },
  'ana-ai-business-kit': {
    title: 'Ana AI Business Kit',
    href: '/downloads/ana-ai-business-kit',
  },
  'jojo-hospitality-intelligence-kit': {
    title: 'Jojo Hospitality Intelligence Kit',
    href: '/downloads/jojo-hospitality-intelligence-kit',
  },
}

function resolveOne(rec: Recommendation): ResolvedRecommendation | undefined {
  switch (rec.kind) {
    case 'research': {
      const domain = getDomainBySlug(rec.slug)
      if (!domain) return undefined
      return { ...rec, title: domain.title, href: `/research/${rec.slug}` }
    }
    case 'library': {
      const review = getReviewBySlug(rec.slug)
      if (!review) return undefined
      return { ...rec, title: review.title, href: `/library/${rec.slug}`, image: review.coverImage }
    }
    case 'blog': {
      const post = getBlogPost(rec.slug)
      if (!post) return undefined
      return { ...rec, title: post.title, href: `/blog/${rec.slug}`, image: post.image }
    }
    case 'product': {
      const product = getProductBySlug(rec.slug)
      if (!product) return undefined
      return { ...rec, title: product.title, href: `/products/${rec.slug}` }
    }
    case 'download': {
      const item = downloadsList.find((d) => d.id === rec.slug)
      if (item) {
        return { ...rec, title: item.title, href: item.href ?? item.previewUrl ?? `/downloads/${rec.slug}`, image: item.image }
      }
      const fallback = ALLY_KIT_FALLBACK[rec.slug]
      if (!fallback) return undefined
      return { ...rec, title: fallback.title, href: fallback.href }
    }
  }
}

/**
 * Returns one error string per unresolved slug, e.g.
 * `Unknown research slug: "x" in recommendation`. Empty array = all clean.
 */
export function validateRecommendations(recs: Recommendation[]): string[] {
  const errors: string[] = []
  for (const rec of recs) {
    if (!resolveOne(rec)) {
      errors.push(`Unknown ${rec.kind} slug: "${rec.slug}" in recommendation`)
    }
  }
  return errors
}

/**
 * Resolves every recommendation. Throws if any slug is unresolvable — call
 * `validateRecommendations` first if you need to filter+warn instead of
 * failing the build (e.g. in production).
 */
export function resolveRecommendations(recs: Recommendation[]): ResolvedRecommendation[] {
  return recs.map((rec) => {
    const resolved = resolveOne(rec)
    if (!resolved) {
      throw new Error(`Unknown ${rec.kind} slug: "${rec.slug}" in recommendation`)
    }
    return resolved
  })
}

export function groupRecommendationsByKind(
  resolved: ResolvedRecommendation[]
): Partial<Record<Recommendation['kind'], ResolvedRecommendation[]>> {
  const groups: Partial<Record<Recommendation['kind'], ResolvedRecommendation[]>> = {}
  for (const rec of resolved) {
    const bucket = groups[rec.kind]
    if (bucket) {
      bucket.push(rec)
    } else {
      groups[rec.kind] = [rec]
    }
  }
  return groups
}

const KIND_LABELS: Record<Recommendation['kind'], string> = {
  research: 'Research',
  library: 'Library',
  blog: 'Field notes',
  product: 'Products',
  download: 'Downloads',
}

const KIND_ORDER: Recommendation['kind'][] = ['download', 'research', 'blog', 'library', 'product']

export type RecommendationDeckGroup = {
  kind: Recommendation['kind']
  label: string
  items: { title: string; href: string; why: string; image?: string }[]
}

/**
 * Adapts `groupRecommendationsByKind`'s Record shape into the labeled-array
 * shape `components/portal/RecommendationDeck.tsx` renders.
 */
export function toRecommendationGroups(recs: Recommendation[]): RecommendationDeckGroup[] {
  const resolved = resolveRecommendations(recs)
  const grouped = groupRecommendationsByKind(resolved)
  return KIND_ORDER.filter((kind) => grouped[kind]?.length).map((kind) => ({
    kind,
    label: KIND_LABELS[kind],
    items: (grouped[kind] ?? []).map((r) => ({
      title: r.title,
      href: r.href,
      why: r.why,
      image: r.image,
    })),
  }))
}
