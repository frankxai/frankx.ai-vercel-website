import { MetadataRoute } from 'next'

import { siteConfig } from '@/lib/seo'

export default function robots(): MetadataRoute.Robots {
  const privatePaths = [
    '/api/',
    '/admin/',
    '/auth/',
    '/dashboard/',
    '/familie',
    '/family/tree',
    '/(preview)/',
    '/prototype/',
    '/onboarding/',
    '/command-center/',
    '/checkout/',
    '/vault/',
    '/inner-circle/',
    '/realm/',
    '/partnerships/proposal/',
    '/downloads/*',
  ]

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: privatePaths,
      },
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'CCBot',
          'ClaudeBot',
          'Claude-User',
          'Google-Extended',
          'PerplexityBot',
          'FacebookBot',
          'Meta-ExternalAgent',
        ],
        disallow: '/',
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  }
}
