import { siteConfig, defaultTwitterImages, defaultOpenGraphImages } from '@/lib/seo'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shop — Templates, Tools & Digital Products',
  description:
    'Production-ready AI templates, Claude Code skill packs, n8n workflows, Next.js starters, and digital products. Built by an AI architect who ships.',
  keywords: [
    'AI templates',
    'Claude Code skills',
    'n8n workflows',
    'Next.js starter kits',
    'AI architecture blueprints',
    'MCP configurations',
    'digital products',
    'FrankX shop',
  ],
  openGraph: {
    images: defaultOpenGraphImages,
    title: 'Shop — Templates, Tools & Digital Products | FrankX',
    description:
      'Production-ready AI templates, skill packs, workflows, and digital products. Built by an AI architect.',
    url: `${siteConfig.url}/shop`,
    type: 'website',
  },
  twitter: {
    images: defaultTwitterImages,
    card: 'summary_large_image',
    title: 'FrankX Shop — AI Templates & Digital Products',
    description:
      'Production-ready AI templates, skill packs, workflows, and digital products.',
  },
  alternates: {
    canonical: './',
  },
}

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
