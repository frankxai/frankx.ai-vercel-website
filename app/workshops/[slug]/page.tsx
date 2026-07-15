import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllWorkshopSlugs, getWorkshopBySlug, type Workshop } from '@/data/workshops'
import { siteConfig } from '@/lib/seo'
import { socialLinks } from '@/lib/social-links'
import WorkshopClient from './WorkshopClient'

const SITE_URL = siteConfig.url

type Params = { slug: string }

// Pre-render every workshop at build time so metadata + schema are static.
export function generateStaticParams(): Params[] {
  return getAllWorkshopSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<Params> },
): Promise<Metadata> {
  const { slug } = await params
  const workshop = getWorkshopBySlug(slug)
  if (!workshop) {
    return {
      title: 'Workshop not found · FrankX',
      robots: { index: false },
    }
  }

  const url = `${SITE_URL}/workshops/${workshop.slug}`
  const title = `${workshop.title} · FrankX Workshops`
  const description = workshop.subtitle || workshop.overview.slice(0, 160)

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.shortName,
      type: 'article',
      images: [
        {
          url: `${SITE_URL}/api/og?title=${encodeURIComponent(workshop.title)}&subtitle=${encodeURIComponent(workshop.subtitle)}`,
          width: 1200,
          height: 630,
          alt: workshop.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: siteConfig.twitter,
    },
    keywords: [
      'workshop',
      workshop.audience,
      workshop.difficulty,
      'AI Architect',
      'Frank Riemer',
      ...(workshop.title.split(' ').filter((w) => w.length > 3)),
    ],
  }
}

function totalMinutes(workshop: Workshop): number {
  return workshop.modules.reduce((sum, m) => {
    const match = m.duration.match(/(\d+)/)
    return sum + (match ? parseInt(match[1], 10) : 0)
  }, 0)
}

function CourseJsonLd({ workshop }: { workshop: Workshop }) {
  const minutes = totalMinutes(workshop)
  const courseLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: workshop.title,
    description: workshop.overview,
    url: `${SITE_URL}/workshops/${workshop.slug}`,
    provider: {
      '@type': 'Person',
      name: 'Frank Riemer',
      url: SITE_URL,
      jobTitle: 'AI Architect',
      sameAs: [socialLinks.linkedin, socialLinks.github],
    },
    educationalLevel: workshop.difficulty,
    timeRequired: `PT${minutes}M`,
    numberOfCredits: workshop.moduleCount,
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'mixed',
      courseWorkload: workshop.duration,
      instructor: {
        '@type': 'Person',
        name: 'Frank Riemer',
        url: SITE_URL,
      },
    },
    teaches: workshop.objectives,
    coursePrerequisites: workshop.prerequisites,
    audience: {
      '@type': 'Audience',
      audienceType: workshop.audience,
    },
    inLanguage: 'en',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(courseLd) }}
    />
  )
}

function EventJsonLd({ workshop }: { workshop: Workshop }) {
  // Generic Event schema — for workshops without a specific scheduled date,
  // we describe the format rather than a concrete instance.
  const eventLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationEvent',
    name: workshop.title,
    description: workshop.subtitle,
    url: `${SITE_URL}/workshops/${workshop.slug}`,
    eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: {
      '@type': 'VirtualLocation',
      url: `${SITE_URL}/workshops/${workshop.slug}`,
    },
    organizer: {
      '@type': 'Person',
      name: 'Frank Riemer',
      url: SITE_URL,
    },
    performer: {
      '@type': 'Person',
      name: 'Frank Riemer',
    },
    audience: {
      '@type': 'EducationalAudience',
      audienceType: workshop.audience,
    },
    teaches: workshop.objectives,
    inLanguage: 'en',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(eventLd) }}
    />
  )
}

function BreadcrumbJsonLd({ workshop }: { workshop: Workshop }) {
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Workshops', item: `${SITE_URL}/workshops` },
      { '@type': 'ListItem', position: 3, name: workshop.title, item: `${SITE_URL}/workshops/${workshop.slug}` },
    ],
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
    />
  )
}

export default async function WorkshopDetailPage(
  { params }: { params: Promise<Params> },
) {
  const { slug } = await params
  const workshop = getWorkshopBySlug(slug)

  if (!workshop) {
    notFound()
  }

  return (
    <>
      <CourseJsonLd workshop={workshop} />
      <EventJsonLd workshop={workshop} />
      <BreadcrumbJsonLd workshop={workshop} />
      <WorkshopClient workshop={workshop} />
    </>
  )
}
