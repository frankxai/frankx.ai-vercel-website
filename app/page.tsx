import Script from 'next/script'

import V3HomePage from '@/components/home/V3HomePage'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'FrankX.ai | Intelligence Systems for AI Architects, Music Makers, and Generative Creators',
  description:
    'Oracle-grade AI systems, Suno music workflows, and consciousness-first creator operating systems. Built by Oracle AI Architect for conscious creators.',
  keywords: [
    'ai architect',
    'oracle ai',
    'suno workflows',
    'music creation ai',
    'generative creator',
    'creator operating system',
    'conscious ai systems',
    'ai music production',
  ],
  path: '/',
})

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'FrankX.ai',
  url: 'https://frankx.ai',
  description:
    'Intelligence systems for AI architects, music makers, and generative creators. Oracle-grade conscious AI systems and Suno music workflows.',
  founder: {
    '@type': 'Person',
    name: 'Frank',
    jobTitle: 'Oracle AI Architect & Creator Systems Designer',
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
      description: 'AI music creation system with 500+ Suno workflows for conscious music producers',
      url: 'https://frankx.ai/products/vibe-os',
    },
    {
      '@type': 'Offer',
      name: 'Creative AI Toolkit',
      description: 'Templates and workflows for generative content creators',
      url: 'https://frankx.ai/products/creative-ai-toolkit',
    },
    {
      '@type': 'Offer',
      name: 'Agentic Creator OS',
      description: 'Custom AI systems for Oracle architects and enterprise creators',
      url: 'https://frankx.ai/products/agentic-creator-os',
    },
  ],
}

export default function Page() {
  return (
    <>
      <V3HomePage />
      <Script id="frankx-organization" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(structuredData)}
      </Script>
    </>
  )
}
