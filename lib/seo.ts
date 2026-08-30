import type { Metadata } from 'next'

import { socialHandles } from './social-links'

// Vercel serves `www` as the primary production host and redirects the apex.
// Canonicals and structured data should point directly at the primary host.
const siteUrl = 'https://www.frankx.ai'

export const siteConfig = {
  name: 'FrankX — Public Agentic Workspace',
  shortName: 'FrankX',
  description:
    'Frank Riemer’s public agentic workspace for source-led research, book intelligence, AI architecture, partnership systems, guides, products, and field notes.',
  url: siteUrl,
  twitter: socialHandles.twitter,
  // Static fallback. /api/og dynamic route has empty-body issues in Next 16
  // + next/og — using a real file ensures social shares always have an image.
  ogImage: '/images/brand/frankx-public-workspace-og-1200x630.png',
  keywords: [
    'ai architect',
    'public agentic workspace',
    'human-led multi-agent systems',
    'book intelligence',
    'ai music creation',
    'suno ai',
    'ai architecture',
    'agentic workflows',
    'creator tools',
    'enterprise ai',
    'multi-agent systems',
  ],
}


/** Trailing brand already applied by root `title.template` (`%s | FrankX`). */
const BRAND_TITLE_SUFFIX =
  /(?:\s*[|·—–]\s*|\s+-\s+)(?:FrankX(?:\.AI|\.ai)?)\s*$/i

export function stripBrandTitleSuffix(title: string): string {
  let next = title.trim()
  for (let i = 0; i < 2; i += 1) {
    const stripped = next.replace(BRAND_TITLE_SUFFIX, '').trim()
    if (stripped === next || stripped.length === 0) break
    next = stripped
  }
  return next
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
   * Override the auto-computed canonical URL (defaults to siteConfig.url + path).
   * Use when a post lives at a non-standard URL or syndicates from elsewhere.
   */
  canonical?: string
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
  canonical,
  noindex = false,
}: CreateMetadataOptions): Metadata {
  const url = new URL(path, siteConfig.url).toString()
  const canonicalUrl = canonical ?? url
  const pageTitle = stripBrandTitleSuffix(title)
  const socialTitle = `${pageTitle} | ${siteConfig.shortName}`

  return {
    title: pageTitle,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
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
      title: socialTitle,
      description,
      type,
      url: canonicalUrl,
      siteName: siteConfig.shortName,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
      ...(publishedTime ? { publishedTime } : {}),
      ...(updatedTime ? { modifiedTime: updatedTime } : {}),
      ...(authors ? { authors } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
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
