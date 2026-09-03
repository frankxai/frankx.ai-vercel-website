import { ArchitectureReviewPage } from '@/components/research/ai-architecture-review/ArchitectureReviewPage'
import JsonLd from '@/components/seo/JsonLd'
import {
  REVIEW_WINDOW,
  getSources,
  reviewStats,
  sourceLedger,
  weeklyChanges,
} from '@/lib/research/ai-architecture-weekly'
import { createMetadata } from '@/lib/seo'

const CANONICAL = 'https://www.frankx.ai/research/ai-architecture-review'
const TITLE = 'AI Architecture Review: Agents, Models, MCP & Graph OS'
const DESCRIPTION =
  'A source-led review of the AI agent, model, MCP, connector, and orchestration changes from 24–31 August 2026, with a graph-owned operating architecture and repository receipts.'

export const metadata = createMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: '/research/ai-architecture-review',
  image: '/research/ai-architecture-review/opengraph-image',
  type: 'article',
  publishedTime: REVIEW_WINDOW.checkedAt,
  updatedTime: REVIEW_WINDOW.checkedAt,
  authors: ['Frank Riemer'],
  keywords: [
    'AI architecture review',
    'AI agents',
    'model routing',
    'MCP connectors',
    'agent orchestration',
    'Graph OS',
    'Codex',
    'Claude',
    'Gemini',
    'Grok',
  ],
})

const articleData = {
  headline: TITLE,
  description: DESCRIPTION,
  datePublished: REVIEW_WINDOW.checkedAt,
  dateModified: REVIEW_WINDOW.checkedAt,
  mainEntityOfPage: CANONICAL,
  url: CANONICAL,
  image: `${CANONICAL}/opengraph-image`,
  author: {
    '@type': 'Person',
    name: 'Frank Riemer',
    url: 'https://www.frankx.ai',
  },
  publisher: {
    '@type': 'Organization',
    name: 'FrankX',
    url: 'https://www.frankx.ai',
  },
  about: [
    'AI agent architecture',
    'Large language model routing',
    'Model Context Protocol',
    'Durable workflows',
    'Evidence-led software releases',
  ],
  citation: sourceLedger.map((source) => source.url),
}

const changeListData = {
  name: `AI architecture changes, ${REVIEW_WINDOW.label}`,
  numberOfItems: reviewStats.verifiedChanges,
  itemListElement: weeklyChanges.map((change, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: `${change.organization}: ${change.title}`,
    url: getSources([...change.sourceIds])[0]?.url,
  })),
}

export default function WeeklyAIArchitectureReviewPage() {
  return (
    <>
      <JsonLd
        type="Article"
        id="weekly-ai-architecture-article"
        data={articleData}
      />
      <JsonLd
        type="BreadcrumbList"
        id="weekly-ai-architecture-breadcrumbs"
        data={{
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'FrankX',
              item: 'https://www.frankx.ai',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Research',
              item: 'https://www.frankx.ai/research',
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: 'AI Architecture Review',
              item: CANONICAL,
            },
          ],
        }}
      />
      <JsonLd
        type="ItemList"
        id="weekly-ai-architecture-changes"
        data={changeListData}
      />
      <ArchitectureReviewPage />
    </>
  )
}
