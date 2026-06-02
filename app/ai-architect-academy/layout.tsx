import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'AI Architect Academy | Enterprise AI Training | FrankX',
  description: 'Master AI architecture with structured training. From foundations to production-grade agentic systems, multi-agent patterns, and enterprise deployment.',
  path: '/ai-architect-academy',
})

const academyLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'EducationalOrganization',
      '@id': 'https://frankx.ai/ai-architect-academy#org',
      name: 'AI Architect Academy',
      url: 'https://frankx.ai/ai-architect-academy',
      description:
        'Open-source training for enterprise AI architecture — 80+ Claude Code skills, 20+ battle-tested patterns, and 13 structured learning paths.',
      parentOrganization: {
        '@type': 'Organization',
        name: 'FrankX',
        url: 'https://frankx.ai',
      },
      sameAs: ['https://github.com/frankxai/ai-architect-academy'],
      hasCourse: [
        {
          '@type': 'Course',
          name: 'AI Architecture Foundations',
          description: 'Beginner curriculum covering core enterprise AI architecture concepts.',
          provider: {
            '@type': 'EducationalOrganization',
            name: 'AI Architect Academy',
            sameAs: 'https://github.com/frankxai/ai-architect-academy',
          },
        },
        {
          '@type': 'Course',
          name: 'RAG Mastery',
          description: 'Intermediate path for production retrieval-augmented generation systems.',
          provider: {
            '@type': 'EducationalOrganization',
            name: 'AI Architect Academy',
            sameAs: 'https://github.com/frankxai/ai-architect-academy',
          },
        },
        {
          '@type': 'Course',
          name: 'Multi-Agent Systems',
          description: 'Advanced curriculum on orchestrating specialized agents for complex workflows.',
          provider: {
            '@type': 'EducationalOrganization',
            name: 'AI Architect Academy',
            sameAs: 'https://github.com/frankxai/ai-architect-academy',
          },
        },
        {
          '@type': 'Course',
          name: 'Claude Code Mastery',
          description: 'Intermediate path for building production agents with Claude Code skills and MCP servers.',
          provider: {
            '@type': 'EducationalOrganization',
            name: 'AI Architect Academy',
            sameAs: 'https://github.com/frankxai/ai-architect-academy',
          },
        },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://frankx.ai',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'AI Architect Academy',
          item: 'https://frankx.ai/ai-architect-academy',
        },
      ],
    },
  ],
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        // Static JSON-LD structured data — no user input, safe for inline rendering
        dangerouslySetInnerHTML={{ __html: academyLd }}
      />
      {children}
    </>
  )
}
