import { TemplateStudioRoute } from '@/components/templates/TemplateStudioRoute'
import { createMetadata } from '@/lib/seo'
import { v0TemplateEntries } from '@/data/v0-template-library'

const entries = v0TemplateEntries.filter((entry) => entry.channels.includes('animelegends'))

export const metadata = createMetadata({
  title: 'FrankX /v/animelegends - AnimeLegends Template Track',
  description:
    'AnimeLegends original-world template track for world portals, character bibles, episode pages, lore timelines, fan hubs, collectible cards, and studio pitch pages.',
  path: '/v/animelegends',
  keywords: ['AnimeLegends templates', 'worldbuilding templates', 'character bible template', 'anime world portal'],
})

export default function AnimeLegendsTemplateTrackPage() {
  return (
    <TemplateStudioRoute
      eyebrow="AnimeLegends original-world lane"
      title="AnimeLegends templates"
      mutedTitle="for canon-safe worlds, characters, fans, and pitch surfaces."
      description="A rights-safe template lane for original IP: world portals, character bibles, episode launches, fan communities, collectible card galleries, lore timelines, and studio pitch pages."
      entries={entries}
      heroImage="/images/blog/editorial/headers/magnifica-humanitas-benevolent-future-arcanea-hero.webp"
      primaryHref="/v/animelegends-world-portal"
      primaryLabel="Open world portal package"
      secondaryHref="/v"
      secondaryLabel="Back to full studio"
      libraryLabel="AnimeLegends pack families"
      libraryTitle="World templates that protect canon, rights, and visual consistency"
    />
  )
}
