import type { Metadata } from 'next'
import OpenSourceClient from './OpenSourceClient'

export const metadata: Metadata = {
  title: 'Open Source — FrankX Tools for the AI Community',
  description:
    'MIT-licensed tools built for the community: Vital Intelligence MCP (health-aware AI), Sovereign Vault (sovereign knowledge), Starlight Router (multi-model AI).',
  openGraph: {
    title: 'Open Source — FrankX Tools for the AI Community',
    description:
      'Three production-ready tools. MIT licensed. Zero ops. Free forever.',
    url: 'https://frankx.ai/open-source',
    siteName: 'FrankX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Open Source — FrankX Tools for the AI Community',
    description:
      'Three production-ready tools. MIT licensed. Zero ops. Free forever.',
  },
}

export default function OpenSourcePage() {
  return <OpenSourceClient />
}
