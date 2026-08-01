import type { Metadata } from 'next'
import ExpertAuthorityExperience from '@/components/expert-authority/ExpertAuthorityExperience'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Expert Authority Intelligence System | FrankX',
  description:
    'Diagnose the five engines that turn expertise into authority, products, traffic, conversion, and a compounding AI operating system.',
  alternates: { canonical: 'https://frankx.ai/mvu/expert-authority' },
  openGraph: {
    title: 'Expert Authority Intelligence System',
    description:
      'Expert Intelligence. Audience Intelligence. Authority. Products. Funnels. One operating system.',
    url: 'https://frankx.ai/mvu/expert-authority',
    siteName: 'FrankX',
    type: 'website',
    images: [{ url: 'https://frankx.ai/mvu/expert-authority/opengraph-image', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Expert Authority Intelligence System',
    description: 'Turn what you know into an authority business that learns.',
    images: ['https://frankx.ai/mvu/expert-authority/opengraph-image'],
  },
}

export default function ExpertAuthorityPage() {
  return <ExpertAuthorityExperience />
}
