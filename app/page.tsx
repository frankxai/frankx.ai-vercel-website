import HomePageElite from '@/components/home/HomePageElite'
import { createMetadata } from '@/lib/seo'
import { socialLinks } from '@/lib/social-links'
import JsonLd from '@/components/seo/JsonLd'
import { FAQPageJsonLd } from '@/components/seo/JsonLd'
import { getAllBlogPosts } from '@/lib/blog'
import { bookReviews } from '@/data/book-reviews'

export const metadata = createMetadata({
  title: 'GenCreator by FrankX — Build Your AI Creator OS',
  description:
    'GenCreator helps creators build personal AI operating systems that turn ideas into shipped work, audience, products, and revenue.',
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
    'GenCreator by FrankX helps creators build personal AI operating systems that turn ideas into shipped work, audience, products, and revenue.',
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
    'GenCreator systems, AI creator tools, and implementation labs for creators who ship.',
}

const homepageFAQs = [
  {
    question: 'What is FrankX.AI?',
    answer:
      'FrankX.AI is the home of GenCreator by FrankX: a creator operating system for turning ideas into shipped work, audience, products, and revenue. It is built from Frank Riemer\'s work as an AI Architect and creator.',
  },
  {
    question: 'What is GenCreator?',
    answer:
      'GenCreator is the public launch identity for FrankX. It combines creator strategy, AI workflows, music/content systems, templates, and agentic builder patterns into one personal AI operating system.',
  },
  {
    question: 'What should I start with?',
    answer:
      'Start at /start and choose Create, Build, or Sell. The flagship path is Build Your AI Creator OS, with free material first and paid cohort access only when delivery is verified.',
  },
  {
    question: 'Where does Agentic Creator OS fit?',
    answer:
      'Agentic Creator OS is the advanced builder track inside GenCreator. It is for creators ready to build their own agent systems with Claude Code, MCP, n8n, Vercel, and production workflows.',
  },
  {
    question: 'What is the flagship paid offer?',
    answer:
      'The flagship offer is Build Your AI Creator OS: an implementation lab for building a personal AI operating system and shipping one public asset. Until checkout and delivery are verified, the public CTA is waitlist/application rather than direct purchase.',
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
