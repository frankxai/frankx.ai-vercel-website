import { learningPaths } from '@/data/learning-paths'
import JsonLd from '@/components/seo/JsonLd'
import LearnShell from '@/components/learn/LearnShell'

// The listing UI lives in components/learn/LearnShell.tsx (category-grouped).
// This page owns the structured data and renders the shell — the flat inline
// grid that used to live here was superseded by LearnShell and is gone.
export default function LearnPage() {
  const learningPathSchema = {
    name: 'FrankX AI Learning Portals',
    description:
      'Curated, free learning portals for the AI platforms that matter — Claude, Gemini, ChatGPT, Codex, and Antigravity, plus the enterprise clouds (AWS Bedrock, Azure AI Foundry, Oracle OCI GenAI). Each bundles the best videos, official docs, and expert channels.',
    numberOfItems: learningPaths.length,
    itemListElement: learningPaths.map((path, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Course',
        name: path.title,
        description: path.description,
        url: `https://frankx.ai/learn/${path.slug}`,
        provider: { '@type': 'Organization', name: 'FrankX.AI', url: 'https://frankx.ai' },
        educationalLevel:
          path.difficulty === 'beginner' ? 'Beginner' : path.difficulty === 'intermediate' ? 'Intermediate' : 'Advanced',
        learningResourceType: 'Course',
        timeRequired: `PT${path.estimatedHours}H`,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      },
    })),
  }

  const breadcrumbSchema = {
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://frankx.ai' },
      { '@type': 'ListItem', position: 2, name: 'Learn', item: 'https://frankx.ai/learn' },
    ],
  }

  return (
    <>
      <JsonLd type="ItemList" data={learningPathSchema} />
      <JsonLd type="BreadcrumbList" data={breadcrumbSchema} />
      <LearnShell />
    </>
  )
}
