import type { Metadata } from 'next'

const siteUrl = 'https://frankx.ai'

export const siteConfig = {
  name: 'FrankX Intelligence Hub',
  shortName: 'FrankX',
  description:
    'FrankX equips creators, families, and executives with conscious AI strategy, Suno-powered creativity, and enterprise-ready systems.',
  url: siteUrl,
  twitter: '@frankxai',
  ogImage: '/api/og?title=FrankX%20Intelligence%20Hub',
  keywords: [
    'conscious ai',
    'ai strategy',
    'soul frequency',
    'ai music',
    'ai governance',
    'ai for families',
    'oracle ai architect',
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
}: CreateMetadataOptions): Metadata {
  const url = new URL(path, siteConfig.url).toString()

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
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
