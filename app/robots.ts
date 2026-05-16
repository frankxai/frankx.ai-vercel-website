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
          '/command-center/',
          '/partnerships/proposal/',
          '/work/proposal/',
        ],
      },
    ],
    sitemap: 'https://frankx.ai/sitemap.xml',
  }
}
