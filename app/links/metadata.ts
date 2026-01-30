import type { Metadata } from 'next'
import { createMetadata } from '@/lib/seo'
import { SCHEMA_SAME_AS, SOCIAL_META } from '@/lib/social-links'

/**
 * Metadata for FrankX Links Page
 * Optimized for social sharing and SEO
 */
export const metadata: Metadata = createMetadata({
  title: 'Frank X. Riemer | AI Architect & Music Creator - All Links',
  description:
    'Connect with Frank X. Riemer. AI Architect at Oracle. Creator of 12K+ songs with Suno. Get the Creative AI Toolkit, explore Vibe OS, join the Inner Circle, and access all resources.',
  path: '/links',
  keywords: [
    'frank x riemer',
    'frankx',
    'ai architect',
    'suno music',
    'ai music creator',
    'oracle ai',
    'vibe os',
    'creative ai toolkit',
    'ai for creators',
    'conscious ai',
  ],
  image: '/api/og?title=Frank X. Riemer&subtitle=AI Architect %26 Music Creator',
  type: 'website',
})

/**
 * JSON-LD structured data for the links page
 * Provides rich metadata for search engines
 */
export const linksPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': 'https://frankx.ai/links',
  mainEntity: {
    '@type': 'Person',
    '@id': 'https://frankx.ai/#person',
    name: 'Frank X. Riemer',
    alternateName: 'FrankX',
    description:
      'Musician-technologist building AI systems that amplify human creativity. Founder of FrankX.AI, creator of Vibe OS and Agentic Creator OS.',
    url: 'https://frankx.ai',
    image: {
      '@type': 'ImageObject',
      url: 'https://frankx.ai/images/profile/frank-x-riemer.jpg',
      width: 400,
      height: 400,
      caption: 'Frank X. Riemer - AI Architect and Music Creator',
    },
    sameAs: SCHEMA_SAME_AS,
    jobTitle: 'AI Architect',
    worksFor: {
      '@type': 'Organization',
      name: 'Oracle',
      url: 'https://www.oracle.com',
    },
    knowsAbout: [
      'Artificial Intelligence',
      'AI Music Generation',
      'Suno AI',
      'Enterprise AI Architecture',
      'Agentic AI Systems',
      'Creative AI Tools',
      'Consciousness Technology',
    ],
    hasOccupation: [
      {
        '@type': 'Occupation',
        name: 'AI Architect',
        occupationLocation: {
          '@type': 'Place',
          name: 'Oracle',
        },
      },
      {
        '@type': 'Occupation',
        name: 'Music Creator',
        description: 'AI-powered music creation with Suno',
      },
      {
        '@type': 'Occupation',
        name: 'Creator Educator',
        description: 'Teaching AI tools and workflows to creators',
      },
    ],
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://frankx.ai',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Links',
        item: 'https://frankx.ai/links',
      },
    ],
  },
}
