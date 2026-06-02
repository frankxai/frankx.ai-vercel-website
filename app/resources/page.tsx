import ResourcesShell from '@/components/resources/ResourcesShell'

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': 'https://frankx.ai/resources#page',
      url: 'https://frankx.ai/resources',
      name: 'Resources — Templates, Guides & Tools',
      description:
        'Free and premium resources for AI architects and creators. Templates, playbooks, assessments, and technical guides.',
    },
    {
      '@type': 'ItemList',
      '@id': 'https://frankx.ai/resources#items',
      name: 'FrankX Resource Hub',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Free Playbooks', url: 'https://frankx.ai/free-playbook' },
        { '@type': 'ListItem', position: 2, name: 'AI Assessment', url: 'https://frankx.ai/ai-assessment' },
        { '@type': 'ListItem', position: 3, name: 'Prompt Library', url: 'https://frankx.ai/prompt-library' },
        { '@type': 'ListItem', position: 4, name: 'Templates', url: 'https://frankx.ai/templates' },
        { '@type': 'ListItem', position: 5, name: 'Vibe OS', url: 'https://frankx.ai/products/vibe-os' },
        { '@type': 'ListItem', position: 6, name: 'Creative AI Toolkit', url: 'https://frankx.ai/products/creative-ai-toolkit' },
        { '@type': 'ListItem', position: 7, name: 'Generative Creator OS', url: 'https://frankx.ai/products/generative-creator-os' },
        { '@type': 'ListItem', position: 8, name: 'Agentic Creator OS', url: 'https://frankx.ai/products/agentic-creator-os' },
        { '@type': 'ListItem', position: 9, name: 'Intelligence Atlas', url: 'https://frankx.ai/intelligence-atlas' },
        { '@type': 'ListItem', position: 10, name: 'Agentic AI Center', url: 'https://frankx.ai/agentic-ai-center' },
        { '@type': 'ListItem', position: 11, name: 'Guides', url: 'https://frankx.ai/guides' },
        { '@type': 'ListItem', position: 12, name: 'Blog', url: 'https://frankx.ai/blog' },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://frankx.ai' },
        { '@type': 'ListItem', position: 2, name: 'Resources', item: 'https://frankx.ai/resources' },
      ],
    },
  ],
}

export default function ResourcesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ResourcesShell />
    </>
  )
}
