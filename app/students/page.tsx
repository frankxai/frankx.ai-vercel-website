import type { Metadata } from 'next'
import StudentsShell from '@/components/students/StudentsShell'

const STUDENTS_URL = 'https://frankx.ai/students'

export const metadata: Metadata = {
  title: 'For Students | Free, World-Class AI Courses | FrankX',
  description:
    'Curated free AI courses from Oracle, Google, MIT, Stanford, Anthropic, DeepLearning.AI, Hugging Face, and Microsoft. No paywalls, no fluff — just high-quality learning paths from foundations to agents and MCP.',
  keywords: [
    'AI courses for students',
    'free AI learning',
    'prompt engineering tutorial',
    'MCP course',
    'agentic AI course',
    'Oracle AI Foundations',
    'Google AI Essentials',
    'MIT deep learning',
    'Stanford machine learning',
    'Andrew Ng AI for Everyone',
  ],
  alternates: { canonical: STUDENTS_URL },
  openGraph: {
    title: 'For Students | FrankX',
    description:
      'World-class learning, zero cost. Curated AI courses from Oracle, Google, MIT, Stanford, and more.',
    type: 'website',
    url: STUDENTS_URL,
    siteName: 'FrankX',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'For Students | FrankX',
    description:
      'World-class learning, zero cost. Curated AI courses from Oracle, Google, MIT, Stanford, and more.',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${STUDENTS_URL}#page`,
      url: STUDENTS_URL,
      name: 'For Students — FrankX',
      description:
        'Curated free AI courses from top institutions. From foundations to prompt engineering, MCP, and agentic AI.',
      isPartOf: { '@id': 'https://frankx.ai/#website' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://frankx.ai' },
        { '@type': 'ListItem', position: 2, name: 'Students', item: STUDENTS_URL },
      ],
    },
  ],
}

export default function StudentsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <StudentsShell />
    </>
  )
}
