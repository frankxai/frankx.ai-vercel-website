import { TemplateStudioRoute } from '@/components/templates/TemplateStudioRoute'
import { createMetadata } from '@/lib/seo'
import { v0TemplateEntries } from '@/data/v0-template-library'

const entries = v0TemplateEntries.filter((entry) => entry.channels.includes('vercel'))

export const metadata = createMetadata({
  title: 'FrankX /vercel - Vercel Template Library',
  description:
    'Vercel-ready AI business templates, SaaS starters, agent apps, lead magnets, marketplaces, docs, and deployable architecture packs.',
  path: '/vercel',
  keywords: ['Vercel templates', 'Next.js SaaS templates', 'AI app templates', 'Vercel AI SDK templates'],
})

export default function VercelTemplateLibraryPage() {
  return (
    <TemplateStudioRoute
      eyebrow="Vercel deployable template library"
      title="FrankX /vercel"
      mutedTitle="AI business templates with preview, docs, and release discipline."
      description="A focused library for Vercel-ready SaaS, AI apps, content agents, lead magnets, directories, changelog docs, and architecture packs that can move from prompt to preview to PR."
      entries={entries}
      heroImage="/images/social/frankx-loop-20260702/ai-stack-comparison-matrix-square-v1.png"
      primaryHref="/v0"
      primaryLabel="Browse v0 templates"
      secondaryHref="/templates"
      secondaryLabel="Browse commerce templates"
      libraryLabel="Vercel lanes"
      libraryTitle="Deployable template families with real release gates"
    />
  )
}
