import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getEnrichedVisionaries, getVisionaryBySlug, getRelatedVisionaries, visionaryCategories } from '@/lib/research/visionaries'
import VisionaryProfile from './VisionaryProfile'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getEnrichedVisionaries().map((v) => ({ slug: v.slug! }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const person = getVisionaryBySlug(slug)
  if (!person) return {}

  const category = visionaryCategories.find(c => c.id === person.category)
  const title = `${person.name} — ${person.role} | Visionaries Hub | FrankX`
  const description = `${person.why} ${person.builds}. Curated profile with best talks, books, courses, and what to study first.`

  return {
    title,
    description,
    keywords: [
      person.name,
      person.role,
      category?.label ?? '',
      'visionaries',
      'who to study',
      'AI leaders',
    ],
    openGraph: {
      title,
      description,
      type: 'profile',
      url: `https://frankx.ai/visionaries/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${person.name} | Visionaries Hub`,
      description: person.why,
    },
    alternates: {
      canonical: `https://frankx.ai/visionaries/${slug}`,
    },
  }
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const person = getVisionaryBySlug(slug)

  if (!person) {
    notFound()
  }

  const related = getRelatedVisionaries(person)
  const category = visionaryCategories.find(c => c.id === person.category)

  // JSON-LD — all data sourced from our own static visionary registry
  const personLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: person.name,
      jobTitle: person.role,
      url: person.url,
      ...(person.socials && { sameAs: [person.socials.twitter, person.socials.linkedin, person.socials.youtube, person.socials.github].filter(Boolean) }),
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://frankx.ai' },
        { '@type': 'ListItem', position: 2, name: 'Visionaries', item: 'https://frankx.ai/visionaries' },
        { '@type': 'ListItem', position: 3, name: person.name, item: `https://frankx.ai/visionaries/${slug}` },
      ],
    },
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: personLd }}
      />
      <VisionaryProfile person={person} category={category!} related={related} />
    </>
  )
}
