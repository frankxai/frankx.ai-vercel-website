import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/auth/',
          '/dashboard/',
          '/(preview)/',
          '/prototype/',
          '/onboarding/',
        ],
      },
    ],
    sitemap: 'https://frankx.ai/sitemap.xml',
  }
}
