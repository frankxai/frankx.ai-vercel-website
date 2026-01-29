import HomePageElite from '@/components/home/HomePageElite'
import { createMetadata } from '@/lib/seo'
import JsonLd from '@/components/seo/JsonLd'

export const metadata = createMetadata({
  title: 'FrankX.AI | AI Architect & Music Creator',
  description:
    'AI Architect at Oracle. Creator of 12K+ songs with Suno. Building intelligent systems, music, and creator tools in the Golden Age of Intelligence.',
  keywords: [
    'ai architect',
    'ai music creation',
    'suno ai',
    'oracle ai',
    'ai workflow automation',
    'creator tools',
    'agentic workflows',
    'enterprise ai',
  ],
  path: '/',
})

const websiteSchema = {
  name: 'FrankX.AI',
  url: 'https://frankx.ai',
  description:
    'AI Architect and Music Creator. Building intelligent systems, tools, and workflows for creators who ship.',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://frankx.ai/search?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
}

const personSchema = {
  name: 'Frank Riemer',
  jobTitle: 'AI Systems Architect',
  url: 'https://frankx.ai/about',
  sameAs: [
    'https://linkedin.com/in/frank-x-riemer/',
    'https://github.com/frankxai',
    'https://suno.com/@frankx',
    'https://x.com/frankxeth',
  ],
  knowsAbout: [
    'AI Systems Architecture',
    'AI Music Creation',
    'Suno AI',
    'Enterprise AI Strategy',
    'Oracle Cloud',
    'Agentic Workflows',
  ],
}

const organizationSchema = {
  name: 'FrankX.AI',
  url: 'https://frankx.ai',
  logo: 'https://frankx.ai/assets/logo.png',
  sameAs: [
    'https://linkedin.com/in/frank-x-riemer/',
    'https://github.com/frankxai',
    'https://suno.com/@frankx',
  ],
  description:
    'AI systems and creator tools. Building practical workflows for the Golden Age of Intelligence.',
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
