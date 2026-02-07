import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'FrankX — AI Architect & Creator',
    short_name: 'FrankX',
    description:
      'AI Architect at Oracle. Creator of 12K+ songs with Suno. Building enterprise AI systems, music production workflows, and creator tools.',
    start_url: '/',
    display: 'standalone',
    background_color: '#030712',
    theme_color: '#030712',
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}
