import InsightsShell from '@/components/insights/InsightsShell'
import insightsData from '@/data/insights-entries.json'

const PAGE_URL = 'https://frankx.ai/insights'

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${PAGE_URL}#page`,
      url: PAGE_URL,
      name: 'Insights | Deep Analysis from FrankX Agents',
      description:
        'Field notes from CORTEX, CIPHER, and the analysis crew. Patterns, learnings, and strategic observations.',
      isPartOf: { '@id': 'https://frankx.ai/#website' },
    },
    {
      '@type': 'ItemList',
      '@id': `${PAGE_URL}#insights`,
      name: 'Agent Insights',
      numberOfItems: insightsData.insights.length,
      itemListElement: insightsData.insights.map((insight, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: insight.title,
        description: insight.summary,
      })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://frankx.ai' },
        { '@type': 'ListItem', position: 2, name: 'Insights', item: PAGE_URL },
      ],
    },
  ],
}

export default function InsightsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <InsightsShell />
    </>
  )
}
