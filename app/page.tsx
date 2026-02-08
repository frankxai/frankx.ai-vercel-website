import HomePageElite from '@/components/home/HomePageElite'
import { createMetadata } from '@/lib/seo'
import JsonLd from '@/components/seo/JsonLd'
import { FAQPageJsonLd } from '@/components/seo/JsonLd'
import { getAllBlogPosts } from '@/lib/blog'

export const metadata = createMetadata({
  title: 'FrankX.AI | AI Architect & Music Creator — Build What Matters',
  description:
    'AI Architect at Oracle. Creator of 12K+ songs with Suno. Building intelligent systems, music, and creator tools in the Golden Age of Intelligence. Free tutorials, prompts, and open-source tools.',
  keywords: [
    'ai architect',
    'ai music creation',
    'suno ai',
    'oracle ai',
    'ai workflow automation',
    'creator tools',
    'agentic workflows',
    'enterprise ai',
    'claude code',
    'multi-agent systems',
    'ai coding agents',
    'prompt engineering',
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
  logo: 'https://frankx.ai/images/brand/logo-full.png',
  sameAs: [
    'https://linkedin.com/in/frank-x-riemer/',
    'https://github.com/frankxai',
    'https://suno.com/@frankx',
  ],
  description:
    'AI systems and creator tools. Building practical workflows for the Golden Age of Intelligence.',
}

const homepageFAQs = [
  {
    question: 'What is FrankX.AI?',
    answer:
      'FrankX.AI is the personal hub of Frank Riemer — an AI Architect at Oracle and creator of 12,000+ AI-generated songs with Suno. The site features technical tutorials, AI architecture guides, music production workflows, and open-source creator tools.',
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
    question: 'What is the Agentic Creator OS (ACOS)?',
    answer:
      'ACOS is an open-source operating system for Claude Code with 630+ skills, 40+ specialized agents, and 130+ commands. It turns Claude Code into a full creative production environment. Free on GitHub, with premium Creator Kit ($47) and Pro System ($197) tiers.',
  },
  {
    question: 'Does FrankX offer courses or coaching?',
    answer:
      'FrankX offers free guides and tutorials on the blog, with premium coaching programs in development. Join the waitlist at frankx.ai/coaching for early access to AI architecture and creator workflow training.',
  },
]

export default function Page() {
  const latestPosts = getAllBlogPosts()
    .slice(0, 3)
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      description: p.description,
      category: p.category,
      readingTime: p.readingTime,
      date: p.date,
    }))

  return (
    <>
      <HomePageElite latestPosts={latestPosts} faqs={homepageFAQs} />
      <JsonLd type="WebSite" data={websiteSchema} />
      <JsonLd type="Person" data={personSchema} />
      <JsonLd type="Organization" data={organizationSchema} />
      <FAQPageJsonLd faqs={homepageFAQs} id="homepage-faq" />
    </>
  )
}
