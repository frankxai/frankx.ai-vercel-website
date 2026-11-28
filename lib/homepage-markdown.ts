import { homepageFaqs, homepageIntroduction } from '../data/homepage-editorial.ts'

const SITE = 'https://www.frankx.ai'

const products = [
  {
    title: 'Sovereign Business Kits',
    description:
      'Modular starter-kit templates (Micro-SaaS, Marketplace, Creator Hub). Launch list open.',
    href: '/waitlist',
  },
  {
    title: 'Mental Models & Peak OS',
    description:
      'The 8 Sovereign Mental Models, cognitive operating systems, and high-performance protocols for operating in Godmode.',
    href: '/mental-models',
  },
  {
    title: 'Agentic Creator OS',
    description:
      'An open creator operating system for agent skills, commands, and repeatable workflows running on your own keys.',
    href: '/acos',
  },
  {
    title: 'AI Architecture Hub',
    description:
      'Patterns for agent workflows, orchestration, governance, and production-minded system design. Built from Oracle to production.',
    href: '/ai-architecture',
  },
  {
    title: 'Music Lab',
    description: 'Playable browser instruments (violin, piano, drums, and pads) with guided notes and tabs.',
    href: '/music-lab',
  },
  {
    title: 'Sovereign Creator Blueprint',
    description:
      'The complete 4-layer architecture connecting local-first agents, digital assets, and independent revenue streams.',
    href: '/gencreator/blueprints',
  },
]

function link(label: string, href: string): string {
  return `- [${label}](${SITE}${href})`
}

const markdownHeaders = {
  'Content-Type': 'text/markdown; charset=utf-8',
  Vary: 'Accept',
  'Cache-Control': 'private, no-store',
  'X-Content-Type-Options': 'nosniff',
}

export function homepageMarkdownResponse(method: string): Response {
  return new Response(method === 'HEAD' ? null : homepageMarkdown(), {
    status: 200,
    headers: markdownHeaders,
  })
}

export function homepageMarkdown(): string {
  const productBlocks = products
    .map((product) => `### ${product.title}\n\n${product.description}\n\n${link(product.title, product.href)}`)
    .join('\n\n')
  const faqBlocks = homepageFaqs.map((faq) => `### ${faq.question}\n\n${faq.answer}`).join('\n\n')
  const pages = [
    link('Music', '/music'),
    link('Guides', '/guides'),
    link('Developers', '/developers'),
    link('Books', '/books'),
    link('Library', '/library'),
    link('Blog', '/blog'),
    link('Agent index', '/llms.txt'),
    link('Sitemap', '/sitemap.xml'),
    link('Public API catalog', '/api/v1'),
    link('OpenAPI', '/openapi.json'),
    link('API catalog (RFC 9727)', '/.well-known/api-catalog'),
    link('AI catalog (SEP-2127)', '/.well-known/ai-catalog.json'),
    link('MCP endpoint', '/api/mcp'),
    link('MCP server card', '/api/mcp/server-card'),
    link("Today's quote", '/api/quote/today'),
  ].join('\n')

  return `# FrankX

${homepageIntroduction.description}

${homepageIntroduction.headline}

${homepageIntroduction.invitation}

${homepageIntroduction.studioNote}

## Ways to go further

Start with the open work. Choose a paid tool only when its scope fits the capability you are ready to build next.

${productBlocks}

## Questions

${faqBlocks}

## Find a page

${pages}
`
}
