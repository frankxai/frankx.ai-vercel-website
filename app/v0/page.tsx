import { TemplateStudioRoute } from '@/components/templates/TemplateStudioRoute'
import { createMetadata } from '@/lib/seo'
import { v0TemplateEntries } from '@/data/v0-template-library'

const entries = v0TemplateEntries.filter((entry) => entry.channels.includes('v0'))

export const metadata = createMetadata({
  title: 'FrankX /v0 - v0 Template Foundry',
  description:
    'Scoped v0 template families for premium AI landing pages, creator systems, worldbuilding codices, command dashboards, and motion-ready web surfaces.',
  path: '/v0',
  keywords: ['v0 templates', 'v0 app templates', 'AI landing page templates', 'premium v0 prompts'],
})

export default function V0TemplateFoundryPage() {
  return (
    <TemplateStudioRoute
      eyebrow="scoped v0 template foundry"
      title="FrankX /v0"
      mutedTitle="frontend drafts with proof, taste, and handoff gates."
      description="Use v0 only where it compounds: premium frontend composition, section systems, responsive states, and visual variants. Codex keeps the product, repo, and release path honest."
      entries={entries}
      heroImage="/images/social/frankx-loop-20260702/frankx-command-room-social-square-v1.png"
      primaryHref="/v"
      primaryLabel="Open full studio"
      secondaryHref="/contact"
      secondaryLabel="Request a v0 build"
      libraryLabel="v0 build lanes"
      libraryTitle="Template families worth spending v0 tokens on"
    />
  )
}
