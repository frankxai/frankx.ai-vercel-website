import HomePageElite from '@/components/home/HomePageElite'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { getPublishedBooks } from '@/app/books/lib/books-registry'
import JsonLd, { FAQPageJsonLd } from '@/components/seo/JsonLd'
import { bookReviews } from '@/data/book-reviews'
import { homepageFeaturedRelease } from '@/data/homepage-featured-release'
import { getAllBlogPosts } from '@/lib/blog'
import { createMetadata, siteConfig } from '@/lib/seo'
import { socialLinks } from '@/lib/social-links'

export const metadata = createMetadata({
  title: 'FrankX — Build What Matters',
  description:
    'Frank Riemer\'s public workshop for AI architecture, creator systems, research, music, books, personal development, and practical tools.',
  keywords: [
    'Frank Riemer',
    'FrankX',
    'living studio',
    'AI creator systems',
    'AI music creation',
    'Suno music',
    'agentic workflows',
    'personal AI operating system',
    'AI architecture',
    'creator tools',
    'Claude Code',
    'multi-agent systems',
    'field notes',
    'digital products',
  ],
  path: '/',
})

const siteUrl = siteConfig.url

const hasRenderablePublicAsset = (assetPath: string | undefined) => {
  if (!assetPath) return false
  if (/^https?:\/\//.test(assetPath)) return true
  if (!assetPath.startsWith('/')) return false
  return existsSync(path.join(process.cwd(), 'public', assetPath.slice(1)))
}

const websiteSchema = {
  '@id': `${siteUrl}/#website`,
  name: 'FrankX',
  alternateName: ['FrankX.AI', 'Frank Riemer'],
  url: siteUrl,
  description:
    'FrankX is Frank Riemer\'s public workshop and knowledge constellation for AI architecture, creator systems, research, music, books, and human development.',
  publisher: {
    '@id': `${siteUrl}/#organization`,
  },
  about: {
    '@id': `${siteUrl}/#frank-riemer`,
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: `${siteUrl}/search?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
}
const personSchema = {
  '@id': `${siteUrl}/#frank-riemer`,
  name: 'Frank Riemer',
  jobTitle: 'AI Architect and Creator',
  url: `${siteUrl}/frank-riemer`,
  image: `${siteUrl}/images/portraits/frank-presenting-oracle-2025.jpg`,
  mainEntityOfPage: {
    '@id': `${siteUrl}/frank-riemer`,
  },
  alumniOf: {
    '@type': 'Organization',
    name: 'Oracle',
  },
  brand: {
    '@id': `${siteUrl}/#organization`,
  },
  sameAs: [socialLinks.linkedin, socialLinks.github, socialLinks.suno, socialLinks.twitter],
  knowsAbout: [
    'AI Architecture',
    'Personal AI Operating Systems',
    'AI Creator Systems',
    'AI Music Creation',
    'Agentic Workflows',
    'Multi-Agent Systems',
    'Creator Education',
    'Creative Technology',
  ],
}

const organizationSchema = {
  '@id': `${siteUrl}/#organization`,
  name: 'FrankX',
  alternateName: 'FrankX.AI',
  url: siteUrl,
  logo: `${siteUrl}/images/brand/logo-full.png`,
  founder: {
    '@id': `${siteUrl}/#frank-riemer`,
  },
  sameAs: [socialLinks.linkedin, socialLinks.github, socialLinks.suno],
  description:
    'FrankX publishes inspectable AI systems, research, guides, music, books, creative experiments, and practical field notes from Frank Riemer.',
}

const homepageFAQs = [
  {
    question: 'What is FrankX?',
    answer:
      'FrankX is Frank Riemer\'s independent public workshop, knowledge constellation, and living body of work. It connects AI architecture, creator systems, research, music, books, personal development, experiments, and field notes. It is not affiliated with, endorsed by, or sponsored by Oracle.',
  },
  {
    question: 'Where should I begin?',
    answer:
      'Begin with the situation you are in now. Choose Music to listen and follow the studio practice, GenCreators to build and publish with AI, Learn for a trustworthy path, Build for architecture and systems, Explore for research and the wider ecosystem, or Blog for current field notes.',
  },
  {
    question: 'How does music fit into FrankX?',
    answer:
      'Music is one of the studio\'s living practices and a form of creative AI experimentation. Listening is optional; the architecture, systems, products, books, and wider ecosystem are equally direct ways into the work.',
  },
  {
    question: 'Can I use the systems and tools?',
    answer:
      'Yes. FrankX includes public guides, downloads, frameworks, and systems you can inspect before committing to anything. When a resource has a price, application, waitlist, or license requirement, the page should state the current status and scope clearly.',
  },
  {
    question: 'Is FrankX an agency or coaching business?',
    answer:
      'FrankX is a founder-led public workshop rather than a conventional agency or coaching funnel. Direct architecture work, partnerships, speaking, licensing, and collaborations are considered when the problem and fit are specific; the public body of work remains central.',
  },
  {
    question: 'How can I tell whether a guide or resource is current?',
    answer:
      'Priority guides and research pages show when they were reviewed and link to their sources. Older experiments and archive material should be labeled as such rather than presented as current guidance.',
  },
]

export default function Page() {
  const latestPosts = getAllBlogPosts()
    .slice(0, 6)
    .map((post) => ({
      slug: post.slug,
      title: post.title,
      description: post.description,
      category: post.category,
      readingTime: post.readingTime,
      date: post.date,
    }))

  const books = getPublishedBooks()
    .filter(
      (book): book is typeof book & { coverImage: string } =>
        Boolean(book.coverImage) && hasRenderablePublicAsset(book.coverImage),
    )
    .slice(0, 6)
    .map((book) => ({
      slug: book.slug,
      title: book.title,
      subtitle: book.subtitle,
      coverImage: book.coverImage,
    }))

  const libraryBooks = bookReviews
    .filter(
      (review) =>
        (review.quotes?.length ?? 0) > 0 &&
        (review.chapters?.length ?? 0) > 0 &&
        hasRenderablePublicAsset(review.coverImage),
    )
    .sort((a, b) => (b.quotes?.length ?? 0) - (a.quotes?.length ?? 0))
    .slice(0, 5)
    .map((review) => ({
      slug: review.slug,
      title: review.title,
      author: review.author,
      coverImage: review.coverImage,
      quoteCount: review.quotes?.length ?? 0,
      chapterCount: review.chapters?.length ?? 0,
    }))

  return (
    <>
      <HomePageElite
        latestPosts={latestPosts}
        faqs={homepageFAQs}
        books={books}
        libraryBooks={libraryBooks}
        featuredTrack={homepageFeaturedRelease}
      />
      <JsonLd type="WebSite" data={websiteSchema} />
      <JsonLd type="Person" data={personSchema} />
      <JsonLd type="Organization" data={organizationSchema} />
      <FAQPageJsonLd faqs={homepageFAQs} id="homepage-faq" />
    </>
  )
}
