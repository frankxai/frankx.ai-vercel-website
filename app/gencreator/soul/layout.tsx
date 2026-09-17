import type { Metadata } from 'next'
import { createMetadata, siteConfig } from '@/lib/seo'
import { ldJson } from '@/lib/seo/jsonld'

const pageMetadata = createMetadata({
  title: 'GenCreator Soul — 7 Dimensions & Your soul.md Operating File',
  description:
    'The 7 dimensions of a complete GenCreator: Energy, Mind, Craft, Voice, Capital, Circle, Legacy. Build your personal soul.md — the operating file that defines who you are.',
  path: '/gencreator/soul',
})

export const metadata: Metadata = {
  ...pageMetadata,
  openGraph: {
    ...pageMetadata.openGraph,
    title: 'GenCreator Soul',
    description: 'Build your soul.md — 7 dimensions of a complete generative creator.',
  },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'GenCreator Soul — Build Your soul.md',
  description: 'The 7 dimensions of a complete GenCreator. Build your personal soul.md — the operating file that defines who you are as a creator.',
  url: `${siteConfig.url}/gencreator/soul`,
  author: { '@type': 'Person', '@id': `${siteConfig.url}/#frank-riemer`, name: 'Frank Riemer', url: siteConfig.url },
}

export default function SoulLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <script id="soul-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(structuredData) }} />
    </>
  )
}
