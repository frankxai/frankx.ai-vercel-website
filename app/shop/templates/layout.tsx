import type { Metadata } from 'next'
import templates from '@/data/templates.json'

// ── Build schema data at render time ──────────────────────────────────────────
// Note: All schema data is static/build-time from our own templates.json.
// No user input is used in the JSON-LD output, so XSS risk is zero.

const templateItems = templates.map((t, i) => ({
  '@type': 'ListItem' as const,
  position: i + 1,
  item: {
    '@type': 'Product',
    name: t.name,
    description: t.description,
    url: `https://frankx.ai/shop/templates#${t.slug}`,
    offers: {
      '@type': 'Offer',
      price: t.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      seller: { '@type': 'Person', name: 'FrankX' },
    },
    ...(t.category && { category: t.category }),
  },
}))

const faqItems = [
  {
    q: 'What do I get when I purchase?',
    a: 'Full source code in a private GitHub repo, deploy configs for Railway/Vercel, a video walkthrough, and access to our Discord support channel.',
  },
  {
    q: 'Can I use templates for client projects?',
    a: 'Yes. All templates include a commercial license. Use them for client projects, SaaS products, or internal tools.',
  },
  {
    q: 'Do I need my own API keys?',
    a: 'Yes. Templates require your own API keys for AI providers (Anthropic, OpenAI, Google, or OCI). You control your costs.',
  },
  {
    q: 'Are updates included?',
    a: 'Yes. All future updates to the template are included free. You get lifetime access to the GitHub repo.',
  },
  {
    q: 'What platforms can I deploy to?',
    a: 'Templates include configs for Railway (backend), Vercel (frontend), and n8n (workflows). One-click deploy buttons included.',
  },
  {
    q: 'Is there a refund policy?',
    a: 'Due to the digital nature of the product (immediate source code access), we cannot offer refunds. Review the features carefully before purchasing.',
  },
]

const jsonLdGraph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ItemList',
      name: 'FrankX AI Templates',
      description:
        'Production-ready AI templates, Claude Code skill packs, n8n workflows, and starter kits.',
      numberOfItems: templates.length,
      itemListElement: templateItems,
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqItems.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: { '@type': 'Answer', text: faq.a },
      })),
    },
    {
      '@type': 'WebPage',
      name: 'FrankX Templates Marketplace',
      url: 'https://frankx.ai/shop/templates',
      description:
        '15 production-ready AI templates from $27 with one-click deploy to Railway, Vercel, and n8n.',
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
  title: 'Templates — Claude Code Skills, n8n Workflows & Starter Kits | FrankX',
  description:
    '15 production-ready templates from $27. Claude Code skill packs, n8n workflow automations, Next.js starters, MCP configs, and AI architecture blueprints with one-click deploy.',
  keywords: [
    'Claude Code skill packs',
    'n8n workflow templates',
    'Next.js starter templates',
    'AI architecture templates',
    'MCP configuration packs',
    'deploy to Railway',
    'deploy to Vercel',
    'AI developer tools',
  ],
  openGraph: {
    title: 'Templates — AI Architecture Templates & Skill Packs | FrankX',
    description:
      '15 production-ready templates. Claude Code skills, n8n workflows, Next.js starters, and blueprints with one-click deploy.',
    url: 'https://frankx.ai/shop/templates',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FrankX Templates — Deploy-Ready AI Architecture',
    description:
      '15 production-ready templates from $27. Skill packs, workflows, starters, and blueprints.',
  },
  alternates: {
    canonical: 'https://frankx.ai/shop/templates',
  },
}

// ── Layout ────────────────────────────────────────────────────────────────────

export default function TemplatesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        // Safe: all data is static from our own templates.json, no user input
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
      />
      {children}
    </>
  )
}
