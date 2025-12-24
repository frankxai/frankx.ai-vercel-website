import Script from 'next/script'

import HomePageElite from '@/components/home/HomePageElite'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'FrankX | Oracle AI Architect & Creator',
  description:
    'Senior AI Architect at Oracle\'s Center of Excellence. Creator of 500+ AI songs. Enterprise AI systems, creative workflows, and everything I learn—shared openly.',
  keywords: [
    'ai music creation',
    'suno workflow',
    'ai learning resources',
    'oracle ai certification',
    'google ai course',
    'build with ai',
    'personal ai system',
  ],
  path: '/',
})

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'FrankX',
  url: 'https://frankx.ai',
  description:
    'The system I use to create music, learn skills, and build with AI. Resources curated from Oracle, Google, MIT. Built in public.',
  author: {
    '@type': 'Person',
    name: 'Frank',
    jobTitle: 'AI Systems Builder',
    knowsAbout: ['AI Music Creation', 'Oracle AI', 'Suno', 'Machine Learning'],
  },
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Music Lab',
        url: 'https://frankx.ai/music-lab',
        description: 'How I create music with Suno AI',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Learning Paths',
        url: 'https://frankx.ai/students',
        description: 'Curated courses from Oracle, Google, MIT',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Prompt Collection',
        url: 'https://frankx.ai/prompt-library',
        description: 'Prompts I actually use daily',
      },
    ],
  },
}

export default function Page() {
  return (
    <>
      <HomePageElite />
      <Script id="frankx-schema" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(structuredData)}
      </Script>
    </>
  )
}
