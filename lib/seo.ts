import type { Metadata } from 'next'

const siteUrl = 'https://frankx.ai'

export const siteConfig = {
  name: 'FrankX — AI Architect & Creator',
  shortName: 'FrankX',
  description:
    'AI Architect at Oracle. Creator of 12K+ songs with Suno. Building enterprise AI systems, music production workflows, and creator tools in the Golden Age of Intelligence.',
  url: siteUrl,
  twitter: '@frankxai',
  ogImage: '/api/og?title=FrankX%20—%20AI%20Architect%20%26%20Creator',
  keywords: [
    'ai architect',
    'ai music creation',
    'suno ai',
    'oracle ai',
    'enterprise ai systems',
    'ai workflow automation',
    'creator tools',
    'agentic workflows',
    'ai prompt engineering',
    'generative ai',
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
