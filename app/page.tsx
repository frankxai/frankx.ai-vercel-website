import { cookies } from 'next/headers'
import { createMetadata } from '@/lib/seo'
import JsonLd from '@/components/seo/JsonLd'
import { homepageTest, type HomepageVariant } from '@/lib/ab-testing'
import HomePageElite from '@/components/home/HomePageElite'
import HomePagePremium from '@/components/home/HomePagePremium'

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
  description: 'AI Architect at Oracle building enterprise AI systems. Creator of 12K+ AI-generated songs with Suno. Building practical tools and workflows for the Golden Age of Intelligence.',
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
    'Oracle Cloud Infrastructure',
    'Agentic Workflows',
    'Prompt Engineering',
    'Multi-Agent Systems',
    'RAG Architecture',
    'AI Workflow Automation',
  ],
}

const organizationSchema = {
  name: 'FrankX.AI',
  url: 'https://frankx.ai',
  logo: 'https://frankx.ai/images/brand/logo-full.png',
  sameAs: [
    'https://linkedin.com/in/frank-x-riemer/',
    'https://github.com/frankxai',
    'https://suno.com/@frankx',
    'https://x.com/frankxeth',
  ],
  description:
    'Enterprise AI architecture, music production with Suno, and creator tools. Practical systems and workflows for builders in the Golden Age of Intelligence.',
}

// Variant component map
const variantComponents: Record<HomepageVariant, React.ComponentType> = {
  elite: HomePageElite,
  premium: HomePagePremium,
  control: HomePageElite,
}

export default async function Page() {
  // Read variant from cookie (set by middleware)
  const cookieStore = await cookies()
  const variantCookie = cookieStore.get(homepageTest.cookieName)
  const variant: HomepageVariant = (variantCookie?.value as HomepageVariant) || 'elite'

  // Get the component for this variant
  const HomepageComponent = variantComponents[variant] || HomePageElite

  return (
    <>
      <HomepageComponent />
      <JsonLd type="WebSite" data={websiteSchema} />
      <JsonLd type="Person" data={personSchema} />
      <JsonLd type="Organization" data={organizationSchema} />
    </>
  )
}
