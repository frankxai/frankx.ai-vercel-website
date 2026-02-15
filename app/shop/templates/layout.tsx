import type { Metadata } from 'next'

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

export default function TemplatesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
