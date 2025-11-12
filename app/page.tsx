import Script from 'next/script'

import V4HomePage from '@/components/home/V4HomePage'
import { createMetadata } from '@/lib/seo'
import { getFeaturedPosts } from '@/lib/blog'

export const metadata = createMetadata({
  title: 'FrankX.ai | Production AI Systems for Modern Creators',
  description:
    'Enterprise-grade AI systems, Suno music workflows, and creative automation tools. Built by an Oracle AI Architect with 300+ deployed systems and 500+ AI-generated tracks. All workflows and frameworks shared free.',
  keywords: [
    'ai architect',
    'oracle ai',
    'suno music production',
    'ai workflows',
    'generative ai',
    'music creation ai',
    'agentic systems',
    'ai automation',
    'production ai',
    'ai music production',
  ],
  path: '/',
})

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'FrankX.ai',
  url: 'https://frankx.ai',
  description:
    'Production-grade AI systems and creative workflows for modern makers. Enterprise AI architecture, Suno music production, and automation tools from an Oracle AI Architect.',
  founder: {
    '@type': 'Person',
    name: 'Frank',
    jobTitle: 'Oracle AI Architect & Music Producer',
  },
  sameAs: [
    'https://linkedin.com/in/frank',
    'https://twitter.com/frankxai',
    'https://www.youtube.com/@frankxai',
  ],
  offers: [
    {
      '@type': 'Offer',
      name: 'Vibe OS',
      description: 'AI music production system with 500+ Suno workflows and premium session packs',
      url: 'https://frankx.ai/products/vibe-os',
    },
    {
      '@type': 'Offer',
      name: 'Creative AI Toolkit',
      description: 'Production-ready templates and workflows for generative content creators',
      url: 'https://frankx.ai/products/creative-ai-toolkit',
    },
    {
      '@type': 'Offer',
      name: 'Agentic Creator OS',
      description: 'Custom AI systems and automation for creators and enterprise teams',
      url: 'https://frankx.ai/products/agentic-creator-os',
    },
  ],
}

export default function Page() {
  // Fetch featured posts server-side
  const featuredPosts = getFeaturedPosts()

  return (
    <>
      <V4HomePage featuredPosts={featuredPosts} />
      <Script id="frankx-organization" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(structuredData)}
      </Script>
    </>
  )
}
