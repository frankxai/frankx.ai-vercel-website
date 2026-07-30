import FrankXProductionHome from '@/components/home/FrankXProductionHome'
import JsonLd, { FAQPageJsonLd } from '@/components/seo/JsonLd'
import { getAllBlogPosts } from '@/lib/blog'
import { createMetadata, siteConfig } from '@/lib/seo'
import { socialLinks } from '@/lib/social-links'

export const metadata = createMetadata({
  title: 'Public Agentic Workspace',
  description:
    'Frank Riemer\'s public agentic workspace for source-led research, book intelligence, AI architecture, partnership systems, guides, products, and field notes.',
  keywords: [
    'Frank Riemer',
    'FrankX',
    'public agentic workspace',
    'multi-agent systems',
    'agent research workflows',
    'book intelligence',
    'partnership systems',
    'agentic workflows',
    'personal AI operating system',
    'AI architecture',
    'creator tools',
    'Claude Code',
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
    'FrankX is Frank Riemer\'s public agentic workspace for research, book intelligence, AI architecture, partnership systems, guides, products, and field notes.',
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
  jobTitle: 'AI Architect',
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
    'FrankX publishes source-led research, inspectable AI architectures, book intelligence, partnership systems, guides, products, music, and field notes under Frank Riemer\'s review.',
}

const homepageFAQs = [
  {
    question: 'What is FrankX?',
    answer:
      'FrankX is Frank Riemer\'s public agentic workspace. Frank sets the questions, context, standards, and final judgment; specialist agents research, compare, challenge, structure, and build. The reviewed results become public research, book intelligence, AI architectures, partnership systems, guides, products, music, and field notes. It is independent and is not affiliated with, endorsed by, or sponsored by Oracle.',
  },
  {
    question: 'Where should I begin?',
    answer:
      'Begin with the current work: open the research hub, Library, AI Architecture, partnership systems, guides, or journal. The Start page narrows those routes around the question you are carrying.',
  },
  {
    question: 'How do AI agents contribute to the site?',
    answer:
      'Specialist agents gather and compare sources, challenge claims, structure drafts, test implementations, and build first versions. Frank chooses the direction, edits the synthesis, and remains responsible for what is published. A generated draft is not a FrankX position.',
  },
  {
    question: 'How does music fit into FrankX?',
    answer:
      'Music is one of Frank\'s creative AI practices and a source of repeatable lessons about taste, iteration, state, and release craft. It has its own route and no longer competes with the workspace explanation in the first viewport.',
  },
  {
    question: 'Can I use the systems and tools?',
    answer:
      'Yes. FrankX includes public guides and open systems you can inspect first, plus paid packs and guided paths for people who want a more complete or supported route. Each offer should state its scope before asking for a purchase.',
  },
  {
    question: 'Is FrankX an agency or coaching business?',
    answer:
      'No. FrankX is Frank\'s public workspace and body of work. Bounded architecture or partnership work may begin around a real problem, but the site is not presented as an autonomous AI agency or a generic coaching funnel.',
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

  return (
    <>
      <FrankXProductionHome latestPosts={latestPosts} />
      <JsonLd type="WebSite" data={websiteSchema} />
      <JsonLd type="Person" data={personSchema} />
      <JsonLd type="Organization" data={organizationSchema} />
      <FAQPageJsonLd faqs={homepageFAQs} id="homepage-faq" />
    </>
  )
}
