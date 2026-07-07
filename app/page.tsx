import HomePageElite from '@/components/home/HomePageElite'
import { createMetadata } from '@/lib/seo'
import { socialLinks } from '@/lib/social-links'
import JsonLd from '@/components/seo/JsonLd'
import { FAQPageJsonLd } from '@/components/seo/JsonLd'
import { getAllBlogPosts } from '@/lib/blog'
import { bookReviews } from '@/data/book-reviews'

export const metadata = createMetadata({
  title: 'FrankX — AI Architect & Creator',
  description:
    'Former AI architect at Oracle. Creator of 12,000+ songs with Suno. Practical AI systems, technical tutorials, and music production workflows for creators who ship.',
  keywords: [
    'ai architect',
    'ai music creation',
    'suno ai',
    'ai architecture',
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
  jobTitle: 'AI Architect',
  url: 'https://frankx.ai/about',
  sameAs: [
    socialLinks.linkedin,
    socialLinks.github,
    socialLinks.suno,
    socialLinks.twitter,
  ],
  knowsAbout: [
    'AI Architecture',
    'AI Music Creation',
    'Suno AI',
    'Enterprise AI Strategy',
    'Cloud Infrastructure',
    'Agentic Workflows',
  ],
}

const organizationSchema = {
  name: 'FrankX.AI',
  url: 'https://frankx.ai',
  logo: 'https://frankx.ai/images/brand/logo-full.png',
  sameAs: [
    socialLinks.linkedin,
    socialLinks.github,
    socialLinks.suno,
  ],
  description:
    'AI systems and creator tools. Building practical workflows for the Golden Age of Intelligence.',
}

const homepageFAQs = [
  {
    question: 'What is FrankX.AI?',
    answer:
      'FrankX.AI is the independent personal hub of Frank Riemer, a former AI architect at Oracle and creator of 12,000+ AI-generated songs with Suno. The site features technical tutorials, AI architecture guides, music production workflows, and open-source creator tools. Independent project. Not affiliated with, endorsed by, or sponsored by Oracle.',
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
      'ACOS is an open-source operating system for Claude Code with 75+ skills, 38 specialized agents, and 35+ commands. It turns Claude Code into a full creative production environment. Free on GitHub, with premium Creator Kit ($47) and Pro System ($197) tiers.',
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

  const libraryBooks = bookReviews
    .filter((r) => (r.quotes?.length ?? 0) > 0 && (r.chapters?.length ?? 0) > 0)
    .sort((a, b) => (b.quotes?.length ?? 0) - (a.quotes?.length ?? 0))
    .slice(0, 5)
    .map((r) => ({
      slug: r.slug,
      title: r.title,
      author: r.author,
      coverImage: r.coverImage,
      quoteCount: r.quotes?.length ?? 0,
      chapterCount: r.chapters?.length ?? 0,
    }))

  return (
    <>
      <HomePageElite latestPosts={latestPosts} faqs={homepageFAQs} libraryBooks={libraryBooks} />
      <JsonLd type="WebSite" data={websiteSchema} />
      <JsonLd type="Person" data={personSchema} />
      <JsonLd type="Organization" data={organizationSchema} />
      <FAQPageJsonLd faqs={homepageFAQs} id="homepage-faq" />
    </>
  )
}
