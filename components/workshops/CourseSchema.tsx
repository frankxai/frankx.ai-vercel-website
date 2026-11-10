import { siteConfig } from '@/lib/seo'
import type { Workshop } from '@/data/workshops'

export interface CourseSchemaProps {
  workshop: Workshop
  /** Override the URL if not at /workshops/{slug}. Defaults to canonical path. */
  url?: string
}

/**
 * Renders Schema.org Course JSON-LD for any Workshop record.
 * Computes total minutes from module durations. Emits a single <script> tag.
 */
export function CourseSchema({ workshop, url }: CourseSchemaProps) {
  const totalMinutes = workshop.modules.reduce((sum, m) => {
    const match = m.duration.match(/(\d+)/)
    return sum + (match ? parseInt(match[1], 10) : 0)
  }, 0)

  const ld = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: workshop.title,
    description: workshop.overview,
    url: url ?? `${siteConfig.url}/workshops/${workshop.slug}`,
    provider: {
      '@type': 'Person',
      name: 'Frank Riemer',
      url: siteConfig.url,
      jobTitle: 'AI Architect',
    },
    educationalLevel: workshop.difficulty,
    timeRequired: `PT${totalMinutes}M`,
    numberOfCredits: workshop.moduleCount,
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'blended',
      courseWorkload: workshop.duration,
    },
  })

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld }} />
}
