import type { Metadata } from 'next'
import Script from 'next/script'

import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import HomePage from '@/components/home/HomePage'

export const metadata: Metadata = {
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
    'suno workflows'
  ],
  alternates: {
    canonical: 'https://frankx.ai/'
  },
  openGraph: {
    title: 'FrankX Intelligence Hub',
    description:
      'Latest AI briefings, resources, and programs for creators, families, and executives building conscious intelligence systems.',
    url: 'https://frankx.ai/',
    siteName: 'FrankX',
    locale: 'en_US',
    type: 'website'
  }
}

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
    jobTitle: 'Conscious AI Architect'
  },
  knowsAbout: [
    'conscious ai strategy',
    'ai governance rituals',
    'ai music workflows',
    'family ai education',
    'ai agent orchestration'
  ],
  hasPart: [
    {
      '@type': 'CreativeWork',
      name: 'Soul Frequency Assessment',
      url: 'https://frankx.ai/soul-frequency-assessment'
    },
    {
      '@type': 'CreativeWork',
      name: "Founder’s AI Playbook",
      url: 'https://frankx.ai/founder-playbook'
    },
    {
      '@type': 'CreativeWork',
      name: 'AI Basics for Families',
      url: 'https://frankx.ai/family-guide'
    },
    {
      '@type': 'CreativeWork',
      name: 'Music Lab',
      url: 'https://frankx.ai/music-lab'
    }
  ]
}

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-gray-900 dark:text-slate-50">
      <Navigation />
      <HomePage />
      <Footer />
      <Script id="frankx-organization" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(structuredData)}
      </Script>
    </div>
  )
}
