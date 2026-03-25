import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Visual Intelligence System | FrankX Research',
  description:
    'Agentic visual asset management for AI-native creators. 6-layer architecture: scan 408 images, audit 268 pages, fix placeholders and orphans. Health score from 1/100 to 76/100.',
  path: '/tools/visual-intelligence',
  keywords: [
    'visual intelligence system',
    'image asset management',
    'visual audit automation',
    'AI image pipeline',
    'codebase image scanner',
    'brand visual consistency',
    'ACOS visual tools',
    'image optimization',
    'orphaned image detection',
    'visual health score',
  ],
  type: 'article',
})

const jsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  name: 'Visual Intelligence System',
  headline: 'Visual Intelligence System — Agentic Visual Asset Management',
  description:
    'A 6-layer system for scanning, auditing, and fixing visual assets across AI-native codebases. Case study: FrankX.ai health score improved from 1/100 to 76/100.',
  url: 'https://frankx.ai/tools/visual-intelligence',
  author: {
    '@type': 'Person',
    name: 'Frank Riemer',
    url: 'https://frankx.ai',
    jobTitle: 'AI Architect',
  },
  publisher: {
    '@type': 'Organization',
    name: 'FrankX',
    url: 'https://frankx.ai',
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://frankx.ai' },
      { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://frankx.ai/research' },
      { '@type': 'ListItem', position: 3, name: 'Visual Intelligence System', item: 'https://frankx.ai/tools/visual-intelligence' },
    ],
  },
})

export default function VisualIntelligenceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      {children}
    </>
  )
}
