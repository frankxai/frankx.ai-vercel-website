import { MetadataRoute } from 'next'

import { siteConfig } from '@/lib/seo'

export default function robots(): MetadataRoute.Robots {
  const commonDisallows = [
    '/api/',
    '/admin/',
    '/auth/',
    '/dashboard/',
    '/(preview)/',
    '/prototype/',
    '/onboarding/',
    '/command-center/',
  ]
  const publicReads = [
    '/api/mcp',
    '/api/v1',
    '/api/quote/',
    '/api/dare/',
    '/api/md',
    '/api/404/match',
    '/api/vcard',
    '/.well-known/',
    '/openapi.json',
  ]

  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', ...publicReads],
        disallow: commonDisallows,
      },
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'ClaudeBot',
          'Claude-Web',
          'PerplexityBot',
          'Google-Extended',
          'Applebot-Extended',
          'Amazonbot',
          'cohere-ai',
          'Meta-ExternalAgent',
        ],
        allow: ['/', ...publicReads],
        disallow: commonDisallows,
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  }
}
