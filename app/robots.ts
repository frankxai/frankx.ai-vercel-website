import { MetadataRoute } from 'next'

import { siteConfig } from '@/lib/seo'

export default function robots(): MetadataRoute.Robots {
  const privatePaths = [
    '/api/',
    '/admin/',
    '/auth/',
    '/dashboard/',
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

  // Answer-engine retrieval crawlers — distribution in 2026 is shifting from
  // clicks to citations, so visitor-triggered bots that power Claude /
  // Perplexity / ChatGPT / Bing search are explicitly welcomed (same
  // disallows as everyone). ClaudeBot itself is excluded here — it is a
  // training/broad-ingestion crawler and is blocked below alongside GPTBot,
  // CCBot, etc.
  const answerEngineBots = [
    'Claude-User',
    'Claude-SearchBot',
    'PerplexityBot',
    'OAI-SearchBot',
    'Bingbot',
  ]

  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: privatePaths },
      ...answerEngineBots.map((userAgent) => ({ userAgent, allow: '/', disallow: privatePaths })),
      {
        userAgent: [
          // Training and broad content-ingestion crawlers remain blocked.
          // Visitor-triggered answer engines (ChatGPT-User, Claude-User,
          // PerplexityBot) follow the public rule above so Library pages can
          // be retrieved and cited without opting the site into model training.
          'GPTBot',
          'CCBot',
          'ClaudeBot',
          'Google-Extended',
          'FacebookBot',
          'Meta-ExternalAgent',
        ],
        disallow: '/',
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  }
}
