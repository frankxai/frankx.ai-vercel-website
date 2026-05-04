/**
 * JSON-LD generators for /papa/ pages.
 *
 * Person (Witali) is the most important schema — durable, indexable, and
 * cited by search/AI engines. Article and Book scaffolds back the manifesto.
 */

import { witali } from '@/data/papa'

export function PersonWitaliJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: witali.fullName,
    birthDate: witali.born,
    birthPlace: { '@type': 'Place', name: witali.bornLocation },
    deathDate: witali.died,
    deathPlace: { '@type': 'Place', name: witali.diedLocation },
    parent: [
      { '@type': 'Person', name: 'Alexander Riemer' },
      {
        '@type': 'Person',
        name: 'Paulina Riemer',
        additionalName: 'Schneider',
      },
    ],
    spouse: {
      '@type': 'Person',
      name: 'Dora Riemer',
      additionalName: 'Gorte',
    },
    children: [{ '@type': 'Person', name: 'Frank Riemer' }],
    knowsLanguage: ['de', 'ru'],
    nationality: ['Russlanddeutsche', 'German'],
    subjectOf: { '@type': 'WebPage', url: 'https://frankx.ai/papa/' },
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function ArticleJsonLd({
  title,
  description,
  url,
  inLanguage,
  draft,
}: {
  title: string
  description: string
  url: string
  inLanguage: 'de' | 'en' | 'ru'
  draft?: boolean
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    inLanguage,
    author: { '@type': 'Person', name: 'Frank Riemer', url: 'https://frankx.ai' },
    about: { '@type': 'Person', name: witali.fullName },
    url,
    isAccessibleForFree: true,
    creativeWorkStatus: draft ? 'Draft' : 'Published',
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function BookScaffoldJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: 'What My Father Gave Me',
    alternateName: ['Was mir mein Vater gab', 'Что мне дал мой отец'],
    author: { '@type': 'Person', name: 'Frank Riemer', url: 'https://frankx.ai' },
    about: { '@type': 'Person', name: witali.fullName },
    bookFormat: 'https://schema.org/EBook',
    inLanguage: ['de', 'en', 'ru'],
    publisher: { '@type': 'Organization', name: 'FrankX' },
    creativeWorkStatus: 'Draft',
    isAccessibleForFree: true,
    url: 'https://frankx.ai/papa/erbe/',
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: item.url,
    })),
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
