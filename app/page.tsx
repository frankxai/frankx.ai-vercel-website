import { createMetadata } from '@/lib/seo'
import JsonLd from '@/components/seo/JsonLd'
import { HeroSection } from '@/components/home/HeroSection'
import { WhatIBuildSection } from '@/components/home/WhatIBuildSection'
import { FeaturedProductsSection } from '@/components/home/FeaturedProductsSection'
import { LatestContentSection } from '@/components/home/LatestContentSection'
import { CTASection } from '@/components/home/CTASection'
import TrustedByBlock from '@/components/social-proof/TrustedByBlock'
import { getLatestPosts } from '@/lib/blog'

export const metadata = createMetadata({
  title: 'FrankX.AI | AI Systems & Creator Tools',
  description:
    'Build AI-powered creator systems that actually ship. Practical AI tools, music production systems, and digital products for creators. Oracle AI Architect, 12K+ songs created with Suno.',
  keywords: [
    'ai systems',
    'ai tools for creators',
    'ai music creation',
    'suno ai',
    'ai workflow automation',
    'creator tools',
    'ai architecture',
    'oracle ai',
  ],
  path: '/',
})

const websiteSchema = {
  name: 'FrankX.AI',
  url: 'https://frankx.ai',
  description:
    'AI systems architect and music creator. Building practical tools and workflows for creators who ship.',
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
    'Creator Tools',
    'Agentic Workflows',
  ],
}

const organizationSchema = {
  name: 'FrankX.AI',
  url: 'https://frankx.ai',
  logo: 'https://frankx.ai/assets/logo.png',
  sameAs: [
    'https://linkedin.com/in/frank-x-riemer/',
    'https://github.com/frankxai',
    'https://suno.com/@frankx',
  ],
  description:
    'AI systems and creator tools. Practical workflows for creators who ship.',
}

export default async function Page() {
  // Get latest blog posts for content section
  const latestPosts = await getLatestPosts(3)

  // Transform posts to match LatestContentSection props
  const articles = latestPosts.map(post => ({
    slug: post.slug,
    title: post.title,
    summary: post.summary,
    publishedAt: post.publishedAt,
    image: post.image,
    readingTime: post.readingTime,
    category: post.category,
  }))

  return (
    <>
      <main className="relative min-h-screen text-white overflow-x-hidden bg-gray-950">
        <HeroSection />
        <TrustedByBlock />
        <WhatIBuildSection />
        <FeaturedProductsSection />
        <LatestContentSection articles={articles} />
        <CTASection />
      </main>

      <JsonLd type="WebSite" data={websiteSchema} />
      <JsonLd type="Person" data={personSchema} />
      <JsonLd type="Organization" data={organizationSchema} />
    </>
  )
}
