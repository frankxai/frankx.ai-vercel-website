import Script from 'next/script'

import V4HomePage from '@/components/home/V4HomePage'
import { createMetadata } from '@/lib/seo'
import { getFeaturedPosts } from '@/lib/blog'

export const metadata = createMetadata({
  title: 'FrankX.ai | My Journey Mastering Generative AI',
  description:
    'Follow my transformation through generative AI. Oracle AI Architect sharing everything I learn: Suno music workflows, agentic experiments, creative automation. 500+ songs created, countless techniques discovered—all shared free.',
  keywords: [
    'generative ai',
    'suno music',
    'ai music production',
    'agentic ai',
    'creative ai',
    'ai workflows',
    'music creation ai',
    'ai experiments',
    'oracle ai architect',
  ],
  path: '/',
})

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Frank',
  url: 'https://frankx.ai',
  jobTitle: 'Oracle AI Architect & Creative AI Explorer',
  description:
    'Personal hub for generative AI transformation. Sharing real experiments with Suno music production, agentic systems, and creative automation. 500+ AI-generated songs and counting.',
  sameAs: [
    'https://linkedin.com/in/frank',
    'https://twitter.com/frankxai',
    'https://www.youtube.com/@frankxai',
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
