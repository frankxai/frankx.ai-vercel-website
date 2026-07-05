import { TemplateStudioRoute } from '@/components/templates/TemplateStudioRoute'
import { createMetadata } from '@/lib/seo'
import { v0TemplateEntries } from '@/data/v0-template-library'

const entries = v0TemplateEntries.filter((entry) => entry.channels.includes('gencreator'))

export const metadata = createMetadata({
  title: 'FrankX /v/gencreator - GenCreator Template Track',
  description:
    'GenCreator creator-system templates for Creator OS landing pages, cohort hubs, media kits, launch calendars, faceless creator stacks, and future marketplace packs.',
  path: '/v/gencreator',
  keywords: ['GenCreator templates', 'creator system templates', 'creator media kit', 'creator OS'],
})

export default function GenCreatorTemplateTrackPage() {
  return (
    <TemplateStudioRoute
      eyebrow="GenCreator creator-system lane"
      title="GenCreator templates"
      mutedTitle="for creators who need systems, proof, and launch rhythm."
      description="A focused track for creator operating systems: landing pages, cohort hubs, media kits, faceless production stacks, launch calendars, and marketplace-ready packs once the first owned products are proven."
      entries={entries}
      heroImage="/images/_originals/gencreator/gencreator-framework-hero.png"
      primaryHref="/v/gencreator-creator-os-landing"
      primaryLabel="Open first package"
      secondaryHref="/v"
      secondaryLabel="Back to full studio"
      libraryLabel="GenCreator pack families"
      libraryTitle="Creator templates that must be useful before they are beautiful"
    />
  )
}
