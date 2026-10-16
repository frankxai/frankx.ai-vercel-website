import type { Metadata } from 'next'
import templates from '@/data/templates.json'
import { templatesFaq } from './faq'

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
    ...(t.category && { category: t.category }),
  },
}))

const jsonLdGraph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ItemList',
      name: 'FrankX AI Templates',
      description:
        'Planned AI templates, Claude Code skill packs, n8n workflows, and starter kits. Launch list open; nothing is on sale yet.',
      numberOfItems: templates.length,
      itemListElement: templateItems,
    },
    {
      '@type': 'FAQPage',
      mainEntity: templatesFaq.map((faq) => ({
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
        `${templates.length} planned AI templates. Launch list open; nothing is on sale yet.`,
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
    `${templates.length} planned templates: Claude Code skill packs, n8n workflow automations, Next.js starters, MCP configs, and AI architecture blueprints. Launch list open; nothing is on sale yet.`,
  keywords: [
    'Claude Code skill packs',
    'n8n workflow templates',
    'Next.js starter templates',
    'AI architecture templates',
    'MCP configuration packs',
    'launch list',
    'planned template kits',
    'AI developer tools',
  ],
  openGraph: {
    title: 'Templates — AI Architecture Templates & Skill Packs | FrankX',
    description:
      `${templates.length} planned templates. Claude Code skills, n8n workflows, Next.js starters, and blueprints. Launch list open.`,
    url: 'https://frankx.ai/shop/templates',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FrankX Templates — Planned AI Architecture Kits',
    description:
      `${templates.length} planned templates. Skill packs, workflows, starters, and blueprints. Launch list open.`,
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
