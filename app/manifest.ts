import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/seo'

// The flagship had icons in public/ and viewportFit: 'cover' in the layout, but no manifest, so a
// phone could not install it (AGENTS.md §11.3 predicate 3). Colours are resolved hex, never CSS
// variables — browsers drop var() in a manifest. No service worker on purpose: a cached shell on a
// site with no offline story is an invalidation bug waiting to happen.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#030712',
    theme_color: '#030712',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  }
}
