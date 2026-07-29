import JsonLd from '@/components/seo/JsonLd'
import OpenAIMasteryHub from '@/components/learn/openai/OpenAIMasteryHub'
import { openAIModes, openAIResources } from '@/data/openai-mastery'

export default function OpenAIMasteryPage() {
  const collectionSchema = {
    name: 'OpenAI Mastery: Chat, ChatGPT Work, and Codex',
    description:
      'An independent FrankX decision guide and verified learning collection for choosing and learning Chat, ChatGPT Work, and Codex.',
    url: 'https://frankx.ai/learn/openai',
    dateModified: '2026-07-29',
    isPartOf: {
      '@type': 'CollectionPage',
      name: 'FrankX Learn',
      url: 'https://frankx.ai/learn',
    },
    hasPart: openAIModes.map((mode) => ({
      '@type': 'LearningResource',
      name: mode.label,
      description: mode.promise,
      url: `https://frankx.ai${mode.href}`,
      provider: {
        '@type': 'Organization',
        name: 'FrankX',
        url: 'https://frankx.ai',
      },
    })),
  }

  const resourceListSchema = {
    name: 'Verified OpenAI learning resources',
    numberOfItems: openAIResources.length,
    itemListElement: openAIResources.map((resource, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'LearningResource',
        name: resource.title,
        description: resource.summary,
        url: resource.url,
        provider: {
          '@type': 'Organization',
          name: resource.provider,
        },
      },
    })),
  }

  const breadcrumbSchema = {
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
        name: 'Learn',
        item: 'https://frankx.ai/learn',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'OpenAI Mastery',
        item: 'https://frankx.ai/learn/openai',
      },
    ],
  }

  return (
    <>
      <JsonLd
        id="openai-mastery-collection"
        type="CollectionPage"
        data={collectionSchema}
      />
      <JsonLd
        id="openai-mastery-resources"
        type="ItemList"
        data={resourceListSchema}
      />
      <JsonLd
        id="openai-mastery-breadcrumbs"
        type="BreadcrumbList"
        data={breadcrumbSchema}
      />
      <OpenAIMasteryHub />
    </>
  )
}

