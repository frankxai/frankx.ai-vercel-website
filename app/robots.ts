import { MetadataRoute } from 'next'

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

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
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
        allow: '/',
        disallow: commonDisallows,
      },
    ],
    sitemap: 'https://www.frankx.ai/sitemap.xml',
  }
}
