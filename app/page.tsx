import Script from 'next/script'

import OptimizedHomePage from '@/components/home/OptimizedHomePage'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'FrankX Intelligence Hub | Creative AI Voice & Resource Platform',
  description:
    'Explore the FrankX Intelligence Hub for creative AI strategy, Suno-powered experiences, family education, and enterprise-ready systems.',
  keywords: [
    'creative ai',
    'creative ai strategy',
    'creative workflows',
    'ai for families',
    'ai architecture',
    'soul frequency',
    'suno workflows',
  ],
  path: '/',
})

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'FrankX',
  url: 'https://frankx.ai',
  description:
    'FrankX is the global AI voice guiding creators, families, and executives with creative intelligence systems, music innovation, and community rituals.',
  founder: {
    '@type': 'Person',
    name: 'Frank',
    jobTitle: 'Creative AI Architect',
  },
  sameAs: [
    'https://linkedin.com/in/frank',
    'https://twitter.com/frankxai',
    'https://www.youtube.com/@frankxai',
  ],
  knowsAbout: [
    'creative ai systems',
    'creative ai governance',
    'creative music workflows',
    'family creative ai education',
    'agentic creation workflows',
  ],
  hasPart: [
    {
      '@type': 'CreativeWork',
      name: 'Soul Frequency Assessment',
      url: 'https://frankx.ai/soul-frequency-assessment',
    },
    {
      '@type': 'CreativeWork',
      name: "Founder's AI Playbook",
      url: 'https://frankx.ai/founder-playbook',
    },
    {
      '@type': 'CreativeWork',
      name: 'AI Basics for Families',
      url: 'https://frankx.ai/family-guide',
    },
    {
      '@type': 'CreativeWork',
      name: 'Music Lab',
      url: 'https://frankx.ai/music-lab',
    },
  ],
}

export default function Page() {
  return (
    <>
      <OptimizedHomePage />
      <Script id="frankx-organization" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(structuredData)}
      </Script>
    </>
  )
}
