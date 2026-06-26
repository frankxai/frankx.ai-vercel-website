import HomePageElite from '@/components/home/HomePageElite'
import { createMetadata } from '@/lib/seo'
import { socialLinks } from '@/lib/social-links'
import JsonLd from '@/components/seo/JsonLd'
import { FAQPageJsonLd } from '@/components/seo/JsonLd'
import { getAllBlogPosts } from '@/lib/blog'
import { bookReviews } from '@/data/book-reviews'

export const metadata = createMetadata({
  title: 'Frank Riemer | FrankX AI Creator Systems',
  description:
    'Frank Riemer builds FrankX: AI creator systems, music experiments, and evidence-led performance notes for creators who want to ship with clarity.',
  keywords: [
    'Frank Riemer',
    'FrankX',
    'ai architect',
    'personal AI operating system',
    'AI creator systems',
    'peak mental performance',
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
  '@id': 'https://frankx.ai/#website',
  name: 'FrankX',
  alternateName: ['FrankX.AI', 'Frank Riemer'],
  url: 'https://frankx.ai',
  description:
    'FrankX is Frank Riemer\'s home for AI creator systems, agentic workflows, music experiments, and evidence-led performance notes.',
  publisher: {
    '@id': 'https://frankx.ai/#organization',
  },
  about: {
    '@id': 'https://frankx.ai/#frank-riemer',
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://frankx.ai/search?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
}

const personSchema = {
  '@id': 'https://frankx.ai/#frank-riemer',
  name: 'Frank Riemer',
  jobTitle: 'AI Architect and Creator',
  url: 'https://frankx.ai/frank-riemer',
  image: 'https://frankx.ai/images/portraits/frank-presenting-oracle-2025.jpg',
  mainEntityOfPage: {
    '@id': 'https://frankx.ai/frank-riemer',
  },
  worksFor: {
    '@type': 'Organization',
    name: 'Oracle',
  },
  brand: {
    '@id': 'https://frankx.ai/#organization',
  },
  sameAs: [
    socialLinks.linkedin,
    socialLinks.github,
    socialLinks.suno,
    socialLinks.twitter,
  ],
  knowsAbout: [
    'AI Architecture',
    'Personal AI Operating Systems',
    'AI Creator Systems',
    'AI Music Creation',
    'Suno AI',
    'Peak Mental Performance',
    'Enterprise AI Strategy',
    'Cloud Infrastructure',
    'Agentic Workflows',
  ],
}

const organizationSchema = {
  '@id': 'https://frankx.ai/#organization',
  name: 'FrankX',
  alternateName: 'FrankX.AI',
  url: 'https://frankx.ai',
  logo: 'https://frankx.ai/images/brand/logo-full.png',
  founder: {
    '@id': 'https://frankx.ai/#frank-riemer',
  },
  sameAs: [
    socialLinks.linkedin,
    socialLinks.github,
    socialLinks.suno,
  ],
  description:
    'FrankX publishes AI creator systems, agentic workflow labs, music experiments, and practical performance notes from Frank Riemer.',
}

const homepageFAQs = [
  {
    question: 'What is FrankX.AI?',
    answer:
      'FrankX.AI is the public home of Frank Riemer: AI architect, creator, and builder of systems that turn ideas into shipped work, music, products, and better daily practice.',
  },
  {
    question: 'What is GenCreator?',
    answer:
      'GenCreator is the creator operating framework inside FrankX. It combines strategy, AI workflows, content systems, templates, and agentic builder patterns into one practical system.',
  },
  {
    question: 'What should I start with?',
    answer:
      'Start with the Signal Loop newsletter for the weekly field note, then choose a path at /start: create, build, or sell. If you want the human story first, read /frank-riemer.',
  },
  {
    question: 'Where does peak performance fit?',
    answer:
      'FrankX treats performance as an evidence-led creator system: attention, energy, recovery, and emotional steadiness. It is not medical advice or miracle biohacking.',
  },
  {
    question: 'Where does Agentic Creator OS fit?',
    answer:
      'Agentic Creator OS is the advanced builder track inside GenCreator. It is for creators ready to build their own agent systems with Claude Code, MCP, n8n, Vercel, and production workflows.',
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
