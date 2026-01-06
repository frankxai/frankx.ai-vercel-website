import HomePageElite from '@/components/home/HomePageElite'
import { createMetadata } from '@/lib/seo'
import JsonLd from '@/components/seo/JsonLd'

export const metadata = createMetadata({
  title: 'FrankX.AI | Conscious AI & Agent Teams',
  description:
    'The definitive authority for conscious AI integration, agent team methodologies, and premium AI transformation resources. Bridge the gap between AI potential and human achievement.',
  keywords: [
    'conscious ai',
    'ai agent teams',
    'ai business transformation',
    'ai workflow automation',
    'ai music creation',
    'suno ai',
    'enterprise ai strategy',
  ],
  path: '/',
})

const websiteSchema = {
  name: 'FrankX.AI',
  url: 'https://frankx.ai',
  description:
    'FrankX equips creators, families, and executives with conscious AI strategy, Suno-powered creativity, and enterprise-ready systems.',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://frankx.ai/search?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
}

const personSchema = {
  name: 'Frank',
  jobTitle: 'AI Systems Architect',
  url: 'https://frankx.ai/about',
  sameAs: ['https://twitter.com/frankxai'],
  knowsAbout: [
    'Conscious AI',
    'AI Agent Teams',
    'Suno Music Creation',
    'Enterprise AI Strategy',
    'Machine Learning',
  ],
}

const organizationSchema = {
  name: 'FrankX.AI',
  url: 'https://frankx.ai',
  logo: 'https://frankx.ai/assets/logo.png',
  sameAs: ['https://twitter.com/frankxai'],
  description:
    'A creative intelligence collective bridging the gap between AI potential and human achievement.',
}

export default function Page() {
  return (
    <>
      <HomePageElite />
      <JsonLd type="WebSite" data={websiteSchema} />
      <JsonLd type="Person" data={personSchema} />
      <JsonLd type="Organization" data={organizationSchema} />
    </>
  )
}
