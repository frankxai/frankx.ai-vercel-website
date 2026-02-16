import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '2026 Vision — Year of the Fire Horse | FrankX.ai',
  description:
    'My personal blueprint for the Year of the Fire Horse — four brands, quarterly goals, nine principles, revenue architecture, and daily non-negotiables.',
  alternates: {
    canonical: 'https://frankx.ai/year-of-the-fire-horse/vision',
  },
  openGraph: {
    title: '2026 Vision — Year of the Fire Horse',
    description:
      'Personal blueprint for the Fire Horse year. Goals, principles, and the deeper why.',
    type: 'article',
    url: 'https://frankx.ai/year-of-the-fire-horse/vision',
  },
}

export default function VisionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
