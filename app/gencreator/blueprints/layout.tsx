import type { Metadata } from 'next'
import { blueprints } from '@/lib/gencreator/gencreator-data'
import { createMetadata, siteConfig } from '@/lib/seo'
import { ldJson } from '@/lib/seo/jsonld'

const pageMetadata = createMetadata({
  title: "Creator's Blueprints — 12 Actionable Frameworks for Generative Creators",
  description:
    'Actionable blueprints for specific creative workflows. Content atomization, music production, product launches, SEO clusters, automation — copy, customize, execute.',
  path: '/gencreator/blueprints',
})

export const metadata: Metadata = {
  ...pageMetadata,
  openGraph: {
    ...pageMetadata.openGraph,
    title: "Creator's Blueprints",
    description: '12 actionable frameworks for generative creators. Copy, customize, execute.',
  },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: "GenCreator Blueprints",
  description: 'Actionable frameworks for specific creative workflows. Copy, customize, execute.',
  url: `${siteConfig.url}/gencreator/blueprints`,
  numberOfItems: blueprints.length,
  itemListElement: blueprints.map((bp, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: bp.title,
    description: bp.description,
  })),
}

export default function BlueprintsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <script id="blueprints-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(structuredData) }} />
    </>
  )
}
