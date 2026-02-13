import type { Metadata } from 'next'
import { planInitiatives } from '@/lib/plan/initiatives'

const initiativeCount = planInitiatives.length
const activeCount = planInitiatives.filter(i => i.status === 'in-progress').length
const totalTasks = planInitiatives.reduce((sum, i) => sum + i.tasks.length, 0)

export const metadata: Metadata = {
  title: 'The Plan | FrankX.AI',
  description: `${initiativeCount} initiatives across content, product, distribution, technical, and creative tracks. See what we're building, why, and how AI agents collaborate with human direction — in real-time.`,
  keywords: [
    'build in public',
    'AI roadmap',
    'agentic creator',
    'AI-human collaboration',
    'product roadmap',
    'FrankX plan',
    'transparent AI development',
    'creator roadmap',
  ],
  openGraph: {
    title: 'The Plan | FrankX.AI',
    description: `${initiativeCount} initiatives. ${activeCount} active. Full transparency on what we're building and how AI agents help execute.`,
    type: 'website',
    url: 'https://frankx.ai/plan',
    images: [
      {
        url: '/images/brand/og-template.png',
        width: 1200,
        height: 630,
        alt: 'FrankX — The Plan',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Plan | FrankX.AI',
    description: `${initiativeCount} initiatives. ${totalTasks} tasks. Building in public with AI agents.`,
    images: ['/images/brand/og-template.png'],
  },
  alternates: {
    canonical: 'https://frankx.ai/plan',
  },
}

// JSON-LD structured data - content from our own static registries, safe for inline rendering
const websiteLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'The Plan',
  description: `Public roadmap with ${initiativeCount} initiatives across 5 tracks. AI-human collaboration in real-time.`,
  url: 'https://frankx.ai/plan',
  author: {
    '@type': 'Person',
    name: 'Frank van den Bergh',
    url: 'https://frankx.ai',
    jobTitle: 'AI Architect',
  },
  publisher: {
    '@type': 'Organization',
    name: 'FrankX',
    url: 'https://frankx.ai',
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
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
        name: 'The Plan',
        item: 'https://frankx.ai/plan',
      },
    ],
  },
})

export default function PlanLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: websiteLd }}
      />
      {children}
    </>
  )
}
