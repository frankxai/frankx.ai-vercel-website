import type { Metadata } from 'next'
import { learningPaths } from '@/data/learning-paths'
import { createMetadata } from '@/lib/seo'

// Server layout that gives each /learn/[slug] portal its OWN metadata.
//
// The page itself is a client component (`'use client'`) for the interactive
// video players + motion, so it can't export generateMetadata. Without this
// layout every portal inherited app/learn/layout.tsx verbatim — identical
// <title>, description, AND a canonical pointing at /learn — which told Google
// to consolidate all 8 portal pages into the listing and drop the details.
// This restores unique title / description / canonical / OG per portal.

export function generateStaticParams() {
  return learningPaths.map((p) => ({ slug: p.slug }))
}

/** Parse the "Updated July 6, 2026 · …" heroEyebrow into an ISO date for the recency signal. */
function latestUpdate(heroEyebrow?: string): string | undefined {
  if (!heroEyebrow) return undefined
  const m = heroEyebrow.match(/([A-Z][a-z]+ \d{1,2}, \d{4})/)
  if (!m) return undefined
  const d = new Date(m[1])
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString()
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const path = learningPaths.find((p) => p.slug === slug)

  if (!path) {
    return createMetadata({
      title: 'Learning Portal | FrankX',
      description: 'Curated, free learning portals for the AI platforms that matter.',
      path: `/learn/${slug}`,
    })
  }

  // Portal-specific OG image from the first curated video's YouTube thumbnail.
  const ogImage = path.videos[0]
    ? `https://img.youtube.com/vi/${path.videos[0].youtubeId}/maxresdefault.jpg`
    : undefined

  return createMetadata({
    title: `${path.title} — Free Learning Portal | FrankX`,
    description: path.description,
    path: `/learn/${path.slug}`,
    keywords: [
      path.title.toLowerCase(),
      `learn ${path.title.toLowerCase()}`,
      'ai learning path',
      'free ai course',
      ...path.videos.slice(0, 3).flatMap((v) => v.tags),
    ],
    ...(ogImage ? { image: ogImage } : {}),
    updatedTime: latestUpdate(path.heroEyebrow),
  })
}

export default function LearnSlugLayout({ children }: { children: React.ReactNode }) {
  return children
}
