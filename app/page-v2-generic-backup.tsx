import Script from 'next/script'

import V2HomePage from '@/components/home/V2HomePage'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'FrankX.ai | AI Tools for Creators Who Ship Faster',
  description:
    'Proven workflows, templates, and music tools used by 12,000+ creators to launch content, courses, and music releases weekly—without burnout.',
  keywords: [
    'ai tools for creators',
    'creator tools',
    'ai music creation',
    'suno workflows',
    'content creation tools',
    'creator operating system',
    'ai workflows',
    'creative ai',
  ],
  path: '/',
})

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'FrankX.ai',
  url: 'https://frankx.ai',
  description:
    'FrankX.ai empowers creators with AI tools, workflows, and templates to ship content, music, and products faster—without burnout.',
  founder: {
    '@type': 'Person',
    name: 'Frank',
    jobTitle: 'AI Systems Architect & Creator',
  },
  sameAs: [
    'https://linkedin.com/in/frank',
    'https://twitter.com/frankxai',
    'https://www.youtube.com/@frankxai',
  ],
  offers: [
    {
      '@type': 'Offer',
      name: 'Vibe OS',
      description: 'AI music creation system with Suno workflows',
      url: 'https://frankx.ai/products/vibe-os',
    },
    {
      '@type': 'Offer',
      name: 'Creative AI Toolkit',
      description: 'Templates and workflows for content creators',
      url: 'https://frankx.ai/products/creative-ai-toolkit',
    },
    {
      '@type': 'Offer',
      name: 'Agentic Creator OS',
      description: 'Custom creator systems and automation',
      url: 'https://frankx.ai/products/agentic-creator-os',
    },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '127',
    bestRating: '5',
    worstRating: '1',
  },
}

export default function Page() {
  return (
    <>
      <V2HomePage />
      <Script id="frankx-organization" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(structuredData)}
      </Script>
    </>
  )
}
