import type { Metadata } from 'next'
import products from '@/data/investor-products.json'

// ── Build schema data at render time ──────────────────────────────────────────
// All data is static from investor-products.json, no user input — XSS risk is zero.

const productItems = products.map((p, i) => ({
  '@type': 'ListItem' as const,
  position: i + 1,
  item: {
    '@type': 'Product',
    name: p.title,
    description: p.description,
    url: `https://frankx.ai/investor#${p.slug}`,
    offers: {
      '@type': 'Offer',
      price: p.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      seller: { '@type': 'Person', name: 'FrankX' },
    },
    category: p.category,
  },
}))

const jsonLdGraph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ItemList',
      name: 'Investor Intelligence Products',
      description:
        'AI agents, n8n workflows, system architectures, and tools for investment research. Built for VCs, angels, and individual investors.',
      numberOfItems: products.length,
      itemListElement: productItems,
    },
    {
      '@type': 'WebPage',
      name: 'Investor Intelligence — AI-Powered Research Tools | FrankX',
      url: 'https://frankx.ai/investor',
      description:
        'AI-powered investment research tools. From deal sourcing agents to portfolio architectures — ship smarter investment workflows with Claude Code, n8n, and Coworker.',
      publisher: {
        '@type': 'Person',
        name: 'FrankX',
        url: 'https://frankx.ai',
      },
    },
  ],
}

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'Investor Intelligence | AI-Powered Research Tools & Workflows | FrankX',
  description:
    'AI agents, n8n workflows, and system architectures for smarter deal flow, due diligence, and portfolio management. Built for VCs, angels, and individual investors.',
  keywords: [
    'investor intelligence',
    'ai due diligence',
    'deal flow automation',
    'n8n investor workflows',
    'ai investment research',
    'portfolio management ai',
    'vc tools',
    'angel investor ai',
    'claude code investor',
    'investment thesis ai',
  ],
  openGraph: {
    title: 'Investor Intelligence — AI Research Tools & Workflows | FrankX',
    description:
      'AI agents, n8n workflows, and system architectures for smarter deal flow, due diligence, and portfolio management.',
    url: 'https://frankx.ai/investor',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Investor Intelligence — AI-Powered Research Tools | FrankX',
    description:
      '14 AI-powered products for investment research. Agents, workflows, architectures, and tools.',
  },
  alternates: {
    canonical: 'https://frankx.ai/investor',
  },
}

// ── Layout ────────────────────────────────────────────────────────────────────

// Safe: all schema data is static from our own investor-products.json, no user input
const schemaScript = JSON.stringify(jsonLdGraph)

export default function InvestorLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaScript }}
      />
      {children}
    </>
  )
}
