import Script from 'next/script'

import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import HomePage from '@/components/home/HomePage'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'FrankX Intelligence Hub | Conscious AI Voice & Resource Platform',
  description:
    'Explore the FrankX Intelligence Hub for conscious AI strategy, Suno-powered creativity, family education, and enterprise-ready systems.',
  keywords: [
    'conscious ai',
    'ai strategy',
    'ai for creators',
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
    'FrankX is the global AI voice guiding creators, families, and executives with conscious intelligence systems, music innovation, and community rituals.',
  founder: {
    '@type': 'Person',
    name: 'Frank',
    jobTitle: 'Conscious AI Architect',
  },
  sameAs: [
    'https://linkedin.com/in/frank',
    'https://twitter.com/frankxai',
    'https://www.youtube.com/@frankxai',
  ],
  knowsAbout: [
    'conscious ai strategy',
    'ai governance rituals',
    'ai music workflows',
    'family ai education',
    'ai agent orchestration',
  ],
  hasPart: [
    {
      '@type': 'CreativeWork',
      name: 'Soul Frequency Assessment',
      url: 'https://frankx.ai/soul-frequency-assessment',
    },
    {
      '@type': 'CreativeWork',
      name: "Founder’s AI Playbook",
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
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navigation />
      <HomePage />
      <Footer />
      <Script id="frankx-organization" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(structuredData)}
      </Script>
    </div>
  )
}
