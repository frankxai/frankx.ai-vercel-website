import { cookies } from 'next/headers'
import { createMetadata } from '@/lib/seo'
import JsonLd from '@/components/seo/JsonLd'
import { FAQPageJsonLd } from '@/components/seo/JsonLd'
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

const homepageFAQs = [
  {
    question: 'What is FrankX.AI?',
    answer:
      'FrankX.AI is the personal hub of Frank Riemer — an AI Architect at Oracle and creator of 12,000+ AI-generated songs with Suno. The site features technical tutorials, AI architecture guides, music production workflows, and creator tools.',
  },
  {
    question: 'What kind of content does FrankX publish?',
    answer:
      'FrankX publishes in-depth technical tutorials on AI coding agents (Claude Code, Cline, OpenCode), enterprise AI architecture patterns, Suno AI music production guides, prompt engineering frameworks, and multi-agent orchestration patterns.',
  },
  {
    question: 'How can I learn AI music production with Suno?',
    answer:
      'Start with the Suno Prompt Engineering Complete Guide on the blog, which covers the 5-Layer Prompt Architecture, genre-specific techniques, and frequency science. FrankX has produced 12,000+ tracks and shares production workflows and prompt templates.',
  },
  {
    question: 'What is the Agentic Creator OS?',
    answer:
      'The Agentic Creator OS is a framework for building AI-powered creative workflows. It combines multi-agent orchestration, prompt engineering, and automation tools to help creators ship content, music, and products faster using AI systems.',
  },
  {
    question: 'Does FrankX offer courses or coaching?',
    answer:
      'FrankX offers free guides and tutorials on the blog, with premium courses and coaching programs in development. Join the waitlist at frankx.ai/coaching for early access to AI architecture and creator workflow training.',
  },
]

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
      <FAQPageJsonLd faqs={homepageFAQs} id="homepage-faq" />
    </>
  )
}
