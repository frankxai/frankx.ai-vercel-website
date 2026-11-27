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

const faqs = [
  {
    question: 'What is FrankX?',
    answer:
      "FrankX is Frank Riemer's independent Amsterdam studio for music, books, imagined worlds and practical experiments with AI. It is a personal project and is not affiliated with, endorsed by, or sponsored by Oracle.",
  },
  {
    question: 'Where should I begin?',
    answer:
      'Play Star Show Us to hear the music. Open the Mini Me storyboard to see how a character travels from one frame to the next. The architecture guides are a good place to begin a technical project.',
  },
  {
    question: 'How does music fit into FrankX?',
    answer:
      "Frank writes songs and makes records with friends. The music catalog is open to listeners. The production guides are for anyone who wants to try making a track of their own.",
  },
  {
    question: 'Can I use the systems and tools?',
    answer:
      'Yes. FrankX includes public guides and open systems you can inspect first, plus paid packs and guided paths for people who want a more complete or supported route. Each offer should state its scope before asking for a purchase.',
  },
  {
    question: 'Is FrankX an agency or coaching business?',
    answer:
      'FrankX is a founder studio rather than a conventional client agency. Some bounded architecture work, programs, or private access may open when the fit is mutual, but the public work and usefulness come first.',
  },
  {
    question: 'How are new music and studio updates chosen?',
    answer:
      'A weekly process can prepare candidates, but nothing is featured automatically from a catalog or social feed. Music, copy, links, and rights state are reviewed before a homepage update or public send.',
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
  const faqBlocks = faqs.map((faq) => `### ${faq.question}\n\n${faq.answer}`).join('\n\n')
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

Frank Riemer's Amsterdam studio for music, books, illustrated worlds and field guides for people making things with AI.

Build a world you can hear.

Songs, stories and experiments from Amsterdam.

Frank makes music with friends, writes books and imagines worlds like Arcanea. Listen to Star Show Us or explore his work in architecture. He previously worked at Oracle. FrankX is a personal project and is not affiliated with Oracle.

## Ways to go further

Start with the open work. Choose a paid tool only when its scope fits the capability you are ready to build next.

${productBlocks}

## Questions

${faqBlocks}

## Find a page

${pages}
`
}
