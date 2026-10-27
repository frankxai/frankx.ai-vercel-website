import { siteConfig, defaultOpenGraphImages } from '@/lib/seo'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '2026 Vision — Year of the Fire Horse',
  description:
    'My personal blueprint for the Year of the Fire Horse — four brands, quarterly goals, nine principles, revenue architecture, and daily non-negotiables.',
  alternates: {
    canonical: './',
  },
  openGraph: {
    images: defaultOpenGraphImages,
    title: '2026 Vision — Year of the Fire Horse',
    description:
      'Personal blueprint for the Fire Horse year. Goals, principles, and the deeper why.',
    type: 'article',
    url: `${siteConfig.url}/year-of-the-fire-horse/vision`,
  },
}

export default function VisionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
