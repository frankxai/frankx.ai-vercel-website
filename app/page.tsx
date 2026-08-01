import FrankXProductionHome from '@/components/home/FrankXProductionHome'
import JsonLd from '@/components/seo/JsonLd'
import { getAllBlogPosts } from '@/lib/blog'
import { createMetadata, siteConfig } from '@/lib/seo'
import { socialLinks } from '@/lib/social-links'

export const metadata = createMetadata({
  title: 'FrankX — Agentic Systems for Creator-Operators',
  description:
    'Frank Riemer maps the approvals, replies, research, reporting, and handoffs that still return to creator-operators, then installs one bounded agent workflow with explicit human control.',
  keywords: [
    'Frank Riemer',
    'FrankX',
    'agentic systems',
    'creator-operator',
    'human approval workflows',
    'AI architecture',
    'agent evaluation',
    'AI operating systems',
  ],
  path: '/',
})

const siteUrl = siteConfig.url
const canonicalDescription =
  'FrankX is Frank Riemer’s independent studio for bounded agent systems, production patterns, and field notes for creator-operators.'

const websiteSchema = {
  '@id': `${siteUrl}/#website`,
  name: 'FrankX',
  alternateName: ['FrankX.AI', 'Frank Riemer'],
  url: siteUrl,
  description: canonicalDescription,
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
    'Agentic Systems',
    'Human Approval Workflows',
    'Agent Evaluation',
    'Multi-Agent Systems',
    'Creator Operations',
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
  description: canonicalDescription,
}

export default function Page() {
  const latestPosts = getAllBlogPosts()
    .slice(0, 3)
    .map((post) => ({
      slug: post.slug,
      title: post.title,
      description: post.description,
      category: post.category,
      readingTime: post.readingTime,
    }))

  return (
    <>
      <FrankXProductionHome latestPosts={latestPosts} />
      <JsonLd type="WebSite" data={websiteSchema} />
      <JsonLd type="Person" data={personSchema} />
      <JsonLd type="Organization" data={organizationSchema} />
    </>
  )
}
