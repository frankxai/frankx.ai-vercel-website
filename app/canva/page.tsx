import JsonLd from '@/components/seo/JsonLd'
import { CanvaFounderHub } from '@/components/canva/CanvaFounderHub'
import { CANVA_LAST_VERIFIED } from '@/data/canva-founder-content'
import { createMetadata, siteConfig } from '@/lib/seo'

const CANONICAL = `${siteConfig.url}/canva`

export const metadata = createMetadata({
  title: 'Canva for Founders: The Agentic Content Operating System',
  description:
    'A founder-grade Canva system connecting verified research, the official Canva MCP server, human review, owned media, distribution, and measurable learning.',
  path: '/canva',
  keywords: [
    'Canva for founders',
    'Canva MCP',
    'Canva AI workflow',
    'agentic content system',
    'Canva content strategy',
    'founder content operating system',
    'Canva Brand Kit workflow',
  ],
  type: 'article',
  image: '/images/canva/canva-founder-operating-graph-og.png',
  updatedTime: CANVA_LAST_VERIFIED,
  authors: ['Frank Riemer'],
})

export default function CanvaPage() {
  return (
    <>
      <JsonLd
        type="WebPage"
        id="canva-founder-page"
        data={{
          '@id': `${CANONICAL}#page`,
          name: 'Canva for Founders: The Agentic Content Operating System',
          description:
            'A governed founder content system connecting Canva MCP, source-led research, human review, distribution, and measurement.',
          url: CANONICAL,
          dateModified: CANVA_LAST_VERIFIED,
          isPartOf: { '@id': `${siteConfig.url}/#website` },
          about: [
            { '@type': 'SoftwareApplication', name: 'Canva', url: 'https://www.canva.com/' },
            { '@type': 'Thing', name: 'Model Context Protocol' },
            { '@type': 'Thing', name: 'Agentic content operations' },
          ],
          author: { '@id': `${siteConfig.url}/#frank-riemer` },
          reviewedBy: { '@id': `${siteConfig.url}/#frank-riemer` },
          primaryImageOfPage: {
            '@type': 'ImageObject',
            url: `${siteConfig.url}/images/canva/canva-founder-operating-graph-og.png`,
            width: 1200,
            height: 630,
          },
        }}
      />
      <JsonLd
        type="BreadcrumbList"
        id="canva-founder-breadcrumbs"
        data={{
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'FrankX', item: siteConfig.url },
            { '@type': 'ListItem', position: 2, name: 'Canva for Founders', item: CANONICAL },
          ],
        }}
      />
      <CanvaFounderHub />
    </>
  )
}
