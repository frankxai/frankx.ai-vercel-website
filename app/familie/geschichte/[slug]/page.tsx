import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getGeschichteThema, getAllGeschichteSlugs } from '@/lib/familie/geschichte-themen'
import { GeschichteThemaPage } from './GeschichteThemaPage'

export async function generateStaticParams() {
  return getAllGeschichteSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const thema = getGeschichteThema(slug)
  if (!thema) return {}

  const isPublic = thema.öffentlich

  return {
    title: isPublic
      ? `${thema.titel} — Geschichte der Russlanddeutschen | FrankX.AI`
      : `${thema.titel} — Geschichte | Familie Riemer-Gorte`,
    description: thema.kurzfassung,
    robots: isPublic
      ? { index: true, follow: true }
      : { index: false, follow: false },
    ...(isPublic && {
      openGraph: {
        title: thema.titel,
        description: thema.kurzfassung,
        type: 'article',
        locale: 'de_DE',
      },
      alternates: {
        canonical: `/familie/geschichte/${thema.slug}`,
      },
    }),
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const thema = getGeschichteThema(slug)
  if (!thema) notFound()

  // JSON-LD structured data for public pages
  const jsonLd = thema.öffentlich
    ? {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: thema.titel,
        description: thema.kurzfassung,
        inLanguage: 'de',
        author: {
          '@type': 'Person',
          name: 'Frank Riemer',
          url: 'https://frankx.ai/about',
        },
        publisher: {
          '@type': 'Organization',
          name: 'FrankX.AI',
          url: 'https://frankx.ai',
        },
        ...(thema.faq.length > 0 && {
          mainEntity: thema.faq.map((f) => ({
            '@type': 'Question',
            name: f.frage,
            acceptedAnswer: {
              '@type': 'Answer',
              text: f.antwort,
            },
          })),
        }),
      }
    : null

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <GeschichteThemaPage thema={thema} />
    </>
  )
}
