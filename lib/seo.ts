import type { Metadata } from 'next'

import { SOCIAL_META } from './social-links'

const siteUrl = 'https://frankx.ai'

export const siteConfig = {
  name: 'FrankX Intelligence Hub',
  shortName: 'FrankX',
  description:
    'AI Architect and Music Creator. Building intelligent systems, tools, and workflows for creators who ship.',
  url: siteUrl,
  twitter: SOCIAL_META.handle,
  // Static fallback. /api/og dynamic route has empty-body issues in Next 16
  // + next/og — using a real file ensures social shares always have an image.
  ogImage: '/hero-homepage.png',
  keywords: [
    'ai architect',
    'ai music creation',
    'suno ai',
    'ai architecture',
    'agentic workflows',
    'creator tools',
    'enterprise ai',
    'multi-agent systems',
  ],
}

type CreateMetadataOptions = {
  title: string
  description: string
  path?: string
  keywords?: string[]
  image?: string
  type?: 'website' | 'article'
  publishedTime?: string
  updatedTime?: string
  authors?: string[]
  /**
   * When true, emits robots: { index: false, follow: false }
   * — used for draft pages, unlisted proposals, internal-only surfaces.
   */
  noindex?: boolean
}

export function createMetadata({
  title,
  description,
  path = '/',
  keywords = siteConfig.keywords,
  image = siteConfig.ogImage,
  type = 'website',
  publishedTime,
  updatedTime,
  authors,
  noindex = false,
}: CreateMetadataOptions): Metadata {
  const url = new URL(path, siteConfig.url).toString()

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    ...(noindex
      ? {
          robots: {
            index: false,
            follow: false,
            googleBot: { index: false, follow: false },
          },
        }
      : {}),
    openGraph: {
      title,
      description,
      type,
      url,
      siteName: siteConfig.shortName,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(publishedTime ? { publishedTime } : {}),
      ...(updatedTime ? { modifiedTime: updatedTime } : {}),
      ...(authors ? { authors } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: siteConfig.twitter,
    },
  }
}

export const robotsConfig: Metadata['robots'] = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-video-preview': -1,
    'max-snippet': -1,
  },
}
