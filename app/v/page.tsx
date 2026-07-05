import { TemplateStudioRoute } from '@/components/templates/TemplateStudioRoute'
import { createMetadata } from '@/lib/seo'
import { v0TemplateEntries } from '@/data/v0-template-library'

export const metadata = createMetadata({
  title: 'FrankX /v - Template Studio',
  description:
    'The FrankX template studio: v0, Vercel, GenCreator, AnimeLegends, AI architecture, motion, and Codex-ready template systems.',
  path: '/v',
  keywords: [
    'v0 templates',
    'AI website templates',
    'FrankX templates',
    'premium frontend templates',
    'agentic workflow templates',
    'Next.js templates',
  ],
})

export default function VTemplateStudioPage() {
  return (
    <TemplateStudioRoute
      eyebrow="v0 + Codex + Vercel template studio"
      title="FrankX /v"
      mutedTitle="premium templates that can become real products."
      description="A curated library for v0-built page systems, Vercel deploy starters, GenCreator creator systems, AnimeLegends world templates, AI architecture packs, 3D scene briefs, and Codex-ready handoffs."
      entries={v0TemplateEntries}
      heroImage="/images/social/frankx-loop-20260702/frankx-loop-contact-sheet-20260702.png"
      primaryHref="/v0"
      primaryLabel="Browse v0 templates"
      secondaryHref="/vercel"
      secondaryLabel="Browse Vercel templates"
      libraryLabel="Template library"
      libraryTitle="Families to build, refine, package, and ship"
      trackLinks={[
        {
          label: 'GenCreator',
          href: '/v/gencreator',
          description: 'Creator OS, media kit, cohort, launch, and marketplace template families.',
        },
        {
          label: 'AnimeLegends',
          href: '/v/animelegends',
          description: 'World portal, character bible, episode, lore, fan, and pitch template families.',
        },
        {
          label: 'AI architecture',
          href: '/v/ai-architecture',
          description: 'RAG, evals, AI CoE, model routing, and multi-agent command templates.',
        },
        {
          label: 'Motion and 3D',
          href: '/v/motion',
          description: 'Command room scenes, scroll stories, social motion, and fallback-first 3D lanes.',
        },
      ]}
    />
  )
}
