import Script from 'next/script'

import HomePage from '@/components/home/HomePage'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'FrankX.ai | Ship 3x Faster with AI (Without Losing Your Soul)',
  description:
    "I'm Frank, a musician who found a way to ship daily with AI while staying human. Get my exact systems: 500+ Suno sessions, creative workflows, and the toolkit that changed everything.",
  keywords: [
    'ai for creators',
    'suno music ai',
    'ship faster',
    'creative workflows',
    'ai music production',
    'creator operating system',
    'generative ai tools',
    'ai without overwhelm',
  ],
  path: '/',
})

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Frank',
  url: 'https://frankx.ai',
  description:
    'Musician-technologist helping creators ship faster with AI. Oracle AI Architect by day, music producer by night. 500+ Suno sessions and counting.',
  jobTitle: 'Creator & Oracle AI Architect',
  sameAs: [
    'https://linkedin.com/in/frank',
    'https://twitter.com/frankxai',
    'https://www.youtube.com/@frankxai',
  ],
  offers: [
    {
      '@type': 'Offer',
      name: 'Vibe OS',
      description: 'My complete Suno music system - 500+ tested workflows',
      url: 'https://frankx.ai/products/vibe-os',
    },
    {
      '@type': 'Offer',
      name: 'Creative AI Toolkit',
      description: 'Ship content weekly with my proven templates',
      url: 'https://frankx.ai/products/creative-ai-toolkit',
    },
    {
      '@type': 'Offer',
      name: 'Custom Creator OS',
      description: 'Your personalized AI system (for serious creators)',
      url: 'https://frankx.ai/products/agentic-creator-os',
    },
  ],
}

export default function Page() {
  return (
    <>
      <HomePage />
      <Script id="frankx-organization" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(structuredData)}
      </Script>
    </>
  )
}