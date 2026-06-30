import { MetadataRoute } from 'next'

import { siteConfig } from '@/lib/seo'

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    '/api/',
    '/admin/',
    '/auth/',
    '/dashboard/',
    '/(preview)/',
    '/prototype/',
    '/onboarding/',
    '/command-center/',
  ]
  // Answer-engine retrieval crawlers — distribution in 2026 is shifting from
  // clicks to citations, so the bots that power Claude / Perplexity / ChatGPT /
  // Bing search are explicitly welcomed (with the same disallows as everyone).
  const answerEngineBots = [
    'ClaudeBot',
    'Claude-User',
    'Claude-SearchBot',
    'PerplexityBot',
    'OAI-SearchBot',
    'Bingbot',
  ]
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow },
      ...answerEngineBots.map((userAgent) => ({ userAgent, allow: '/', disallow })),
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  }
}
