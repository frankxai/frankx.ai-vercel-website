import { TemplateStudioRoute } from '@/components/templates/TemplateStudioRoute'
import { createMetadata } from '@/lib/seo'
import { v0TemplateEntries } from '@/data/v0-template-library'

const entries = v0TemplateEntries.filter((entry) => entry.channels.includes('ai-architecture'))

export const metadata = createMetadata({
  title: 'FrankX /v/ai-architecture - AI Architecture Template Track',
  description:
    'AI architecture template track for RAG blueprints, multi-agent command centers, AI CoE governance, eval labs, model routing, and technical template packs.',
  path: '/v/ai-architecture',
  keywords: ['AI architecture templates', 'RAG blueprint', 'agent evals', 'AI CoE template'],
})

export default function AiArchitectureTemplateTrackPage() {
  return (
    <TemplateStudioRoute
      eyebrow="AI architecture package lane"
      title="AI architecture templates"
      mutedTitle="with diagrams, evals, governance, and deployable proof."
      description="A technical template lane for teams that need practical AI systems: RAG blueprints, model routing, multi-agent command centers, AI CoE governance, creator revenue systems, and eval labs."
      entries={entries}
      heroImage="/images/social/frankx-loop-20260702/ai-architecture-blueprint-square-v1.png"
      primaryHref="/v/ai-architecture-rag-blueprint"
      primaryLabel="Open RAG blueprint package"
      secondaryHref="/vercel"
      secondaryLabel="Vercel deploy lane"
      libraryLabel="AI architecture pack families"
      libraryTitle="Architecture templates that must be source-backed before they are polished"
    />
  )
}
