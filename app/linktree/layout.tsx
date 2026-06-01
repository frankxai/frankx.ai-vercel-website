import type { Metadata } from 'next'
import { createMetadata } from '@/lib/seo'
import { SCHEMA_SAME_AS } from '@/lib/social-links'
import Script from 'next/script'

export const metadata: Metadata = createMetadata({
  title: 'Frank X. Riemer | AI Architect & Creator - All Links',
  description:
    'Connect with Frank X. Riemer — Ex-Oracle AI Architect, creator of 12K+ AI songs, builder of the Agentic Creator OS. Products, resources, and community links.',
  path: '/linktree',
  keywords: [
    'frank x riemer',
    'frankx',
    'ai architect',
    'suno music',
    'ai music creator',
    'agentic creator os',
    'ai for creators',
  ],
  image: '/api/og?title=Frank X. Riemer&subtitle=AI Architect • Creator • Builder',
  type: 'website',
})

const schema = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': 'https://frankx.ai/linktree',
  mainEntity: {
    '@type': 'Person',
    '@id': 'https://frankx.ai/#person',
    name: 'Frank X. Riemer',
    alternateName: 'FrankX',
    description:
      'AI Architect and creator building systems that amplify human creativity. Creator of 12K+ AI songs, Agentic Creator OS, and enterprise AI systems.',
    url: 'https://frankx.ai',
    sameAs: SCHEMA_SAME_AS,
    jobTitle: 'AI Architect',
  },
}

export default function LinktreeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <Script id="linktree-schema" type="application/ld+json">
        {JSON.stringify(schema)}
      </Script>
    </>
  )
}
