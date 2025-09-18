import Script from 'next/script'

import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import HomePage from '@/components/home/HomePage'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'FrankX Intelligence Collective | Conscious AI Systems & Resource Hub',
  description:
    'Explore the FrankX agent collective hub for conscious AI strategy, Suno-powered creativity, multi-disciplinary resources, and enterprise-ready systems.',
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
  name: 'FrankX Agent Collective',
  url: 'https://frankx.ai',
  description:
    'FrankX is an agent collective orchestrating conscious intelligence systems, music innovation, and community rituals for creators, families, and leadership teams.',
  member: [
    {
      '@type': 'Organization',
      name: 'FrankX Strategy Pod',
    },
    {
      '@type': 'Organization',
      name: 'FrankX Design & Story Pod',
    },
    {
      '@type': 'Organization',
      name: 'FrankX Music Lab',
    },
  ],
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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-950 via-[#030712] to-[#00040a] text-slate-100">
      <Navigation />
      <HomePage />
      <Footer />
      <Script id="frankx-organization" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(structuredData)}
      </Script>
    </div>
  )
}
