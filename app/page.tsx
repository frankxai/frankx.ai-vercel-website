import FounderHome from '@/components/home/FounderHome'
import JsonLd, { FAQPageJsonLd } from '@/components/seo/JsonLd'
import { getAllBlogPosts } from '@/lib/blog'
import { createMetadata, siteConfig } from '@/lib/seo'
import { socialLinks } from '@/lib/social-links'

export const metadata = createMetadata({
  title: 'FrankX — Founder Operating Systems for the AI Age',
  description:
    'Map the constraint across State, Signal, Systems, Scale, and Stewardship. FrankX helps founders build useful AI systems without losing the human judgment that makes the company worth owning.',
  keywords: [
    'founder operating system',
    'Founder Stack',
    'AI for founders',
    'founder systems',
    'founder assessment',
    'AI architecture',
    'agentic workflows',
    'founder judgment',
    'solopreneur systems',
    'coach business systems',
    'human layer',
    'Frank Riemer',
    'FrankX',
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
    'Founder operating systems, AI architecture, field notes, and Human Layer practices from Frank Riemer.',
  publisher: { '@id': `${siteUrl}/#organization` },
  about: { '@id': `${siteUrl}/#frank-riemer` },
  potentialAction: {
    '@type': 'SearchAction',
    target: `${siteUrl}/search?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
}

const personSchema = {
  '@id': `${siteUrl}/#frank-riemer`,
  name: 'Frank Riemer',
  jobTitle: 'AI Architect and Founder',
  url: `${siteUrl}/frank-riemer`,
  image: `${siteUrl}/images/portraits/frank-presenting-oracle-2025.jpg`,
  mainEntityOfPage: { '@id': `${siteUrl}/frank-riemer` },
  alumniOf: { '@type': 'Organization', name: 'Oracle' },
  brand: { '@id': `${siteUrl}/#organization` },
  sameAs: [
    socialLinks.linkedin,
    socialLinks.github,
    socialLinks.suno,
    socialLinks.twitter,
  ],
  knowsAbout: [
    'Founder Operating Systems',
    'AI Architecture',
    'AI Creator Systems',
    'Agentic Workflows',
    'Multi-Agent Systems',
    'Founder Judgment',
    'Human-Centered AI',
  ],
}

const organizationSchema = {
  '@id': `${siteUrl}/#organization`,
  name: 'FrankX',
  alternateName: 'FrankX.AI',
  url: siteUrl,
  logo: `${siteUrl}/images/brand/logo-full.png`,
  founder: { '@id': `${siteUrl}/#frank-riemer` },
  sameAs: [socialLinks.linkedin, socialLinks.github, socialLinks.suno],
  description:
    'FrankX helps founders diagnose constraints, install useful AI systems, and improve judgment under uncertainty.',
}

const homepageFAQs = [
  {
    question: 'Who is FrankX for?',
    answer:
      'FrankX speaks to one avatar: the founder. Entrepreneur, solopreneur, coach, and creator-led operator are founder contexts when you carry the risk and make the consequential decisions.',
  },
  {
    question: 'Where should I begin?',
    answer:
      'Begin with the private Founder Stack Map. Ten questions identify the current constraint across State, Signal, Systems, Scale, and Stewardship, then route you to the most useful next move.',
  },
  {
    question: 'What is the Foundry?',
    answer:
      'The Foundry is a bounded implementation engagement for installing a founder operating system around a real company workflow: site, agent harness, business memory, and quality controls.',
  },
  {
    question: 'What does the Human Layer include?',
    answer:
      'The Human Layer covers attention, physiology, meaning, and reflective practice. Claims are labeled through four lenses—Established, Emerging, Experiential, and Symbolic—so meditation, breathwork, sound, neurotechnology, manifestation, dream practice, and plant-medicine research are not presented with false certainty.',
  },
  {
    question: 'Is FrankX affiliated with Oracle?',
    answer:
      'No. FrankX is Frank Riemer’s independent project and is not affiliated with, endorsed by, or sponsored by Oracle.',
  },
]

export default function Page() {
  const latestPosts = getAllBlogPosts()
    .slice(0, 3)
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
      <FounderHome latestPosts={latestPosts} faqs={homepageFAQs} />
      <JsonLd type="WebSite" data={websiteSchema} />
      <JsonLd type="Person" data={personSchema} />
      <JsonLd type="Organization" data={organizationSchema} />
      <FAQPageJsonLd faqs={homepageFAQs} id="homepage-faq" />
    </>
  )
}
