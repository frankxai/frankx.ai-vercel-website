import { TemplateStudioRoute } from '@/components/templates/TemplateStudioRoute'
import { createMetadata } from '@/lib/seo'
import { v0TemplateEntries } from '@/data/v0-template-library'

const entries = v0TemplateEntries.filter((entry) => entry.channels.includes('motion'))

export const metadata = createMetadata({
  title: 'FrankX /v/motion - Motion And 3D Template Track',
  description:
    'Motion and 3D template track for command room scenes, scroll sales stories, social motion packs, episode pages, and premium visual benchmarks.',
  path: '/v/motion',
  keywords: ['motion templates', '3D web templates', 'scroll animation templates', 'premium web motion'],
})

export default function MotionTemplateTrackPage() {
  return (
    <TemplateStudioRoute
      eyebrow="Motion and 3D asset lane"
      title="Motion templates"
      mutedTitle="where the still frame earns the animation."
      description="A controlled track for premium motion and 3D: command room scenes, scroll sales stories, AnimeLegends episode pages, social/OG packs, and visual benchmarks that require fallback, reduced motion, and performance budgets."
      entries={entries}
      heroImage="/images/social/frankx-loop-20260702/frankx-command-room-social-square-v1.png"
      primaryHref="/v/motion-command-room-3d-scene"
      primaryLabel="Open 3D scene package"
      secondaryHref="/v"
      secondaryLabel="Back to full studio"
      libraryLabel="Motion and 3D pack families"
      libraryTitle="Motion lanes that need a named job before code or v0"
    />
  )
}
