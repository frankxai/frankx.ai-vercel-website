import HomePageElite from '@/components/home/HomePageElite'
import { getPublishedBooks } from '@/app/books/lib/books-registry'
import JsonLd, { FAQPageJsonLd } from '@/components/seo/JsonLd'
import { bookReviews } from '@/data/book-reviews'
import { homepageFeaturedRelease } from '@/data/homepage-featured-release'
import { getAllBlogPosts } from '@/lib/blog'
import { createMetadata, siteConfig } from '@/lib/seo'
import { socialLinks } from '@/lib/social-links'

export const metadata = createMetadata({
  title: 'FrankX — Music, Systems & A Living Studio',
  description:
    'Enter Frank Riemer\'s living studio: music, agent systems, books, field notes, and practical tools shared for creators, builders, friends, and family.',
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

const websiteSchema = {
  '@id': `${siteUrl}/#website`,
  name: 'FrankX',
  alternateName: ['FrankX.AI', 'Frank Riemer'],
  url: siteUrl,
  description:
    'FrankX is Frank Riemer\'s living studio for music, agent systems, books, field notes, and practical tools.',
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
    'FrankX publishes music, inspectable creator systems, agent-workflow labs, books, and practical field notes from Frank Riemer.',
}

const homepageFAQs = [
  {
    question: 'What is FrankX?',
    answer:
      'FrankX is Frank Riemer\'s independent living studio: a public home for music, agent systems, books, experiments, and field notes. It is a personal project and is not affiliated with, endorsed by, or sponsored by Oracle.',
  },
  {
    question: 'Where should I begin?',
    answer:
      'Begin with what you need now. Listen for music, Learn for practical pathways, Build for open systems, Reflect for books and questions, Acquire for paid tools, or Explore for the wider FrankX ecosystem.',
  },
  {
    question: 'Why does the homepage begin with music?',
    answer:
      'Music is often the shortest path into attention and feeling. The player is always user initiated, and the systems, production notes, and wider archive remain available when you want to understand how the work was made.',
  },
  {
    question: 'Can I use the systems and tools?',
    answer:
      'Yes. FrankX includes public guides and open systems you can inspect first, plus paid packs and guided paths for people who want a more complete or supported route. Each offer should state its scope before asking for a purchase.',
  },
  {
    question: 'Is FrankX an agency or coaching business?',
    answer:
      'FrankX is a founder studio rather than a conventional client agency. Some bounded architecture work, programs, or private access may open when the fit is mutual, but the public work and usefulness come first.',
  },
  {
    question: 'How are new music and studio updates chosen?',
    answer:
      'A weekly process can prepare candidates, but nothing is featured automatically from a catalog or social feed. Music, copy, links, and rights state are reviewed before a homepage update or public send.',
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
      (book): book is typeof book & { coverImage: string } => Boolean(book.coverImage),
    )
    .slice(0, 6)
    .map((book) => ({
      slug: book.slug,
      title: book.title,
      subtitle: book.subtitle,
      coverImage: book.coverImage,
    }))

  const libraryBooks = bookReviews
    .filter((review) => (review.quotes?.length ?? 0) > 0 && (review.chapters?.length ?? 0) > 0)
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
