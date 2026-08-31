/**
 * Outbound short-link registry.
 *
 * Any external URL we promote (custom GPTs, tools, partner pages) goes through
 * /go/[slug] so we can:
 *   1. Track clicks (PostHog event + JSONL log fallback)
 *   2. Change the destination in one place if the external URL breaks
 *   3. Keep our domain visible in every share
 *
 * Add an entry here, then link to `/go/<slug>` anywhere on the site.
 */

export interface OutboundLink {
  slug: string
  destination: string
  label: string
  category: 'coach-gpt' | 'tool' | 'partner' | 'social' | 'other'
  description?: string
}

export const outboundLinks: OutboundLink[] = [
  {
    slug: 'canva',
    destination: 'https://www.canva.com/',
    label: 'Canva',
    category: 'tool',
    description:
      'Official Canva product page. Independent editorial link; not compensated as of 2026-08-30.',
  },
  {
    slug: 'canva-mcp',
    destination: 'https://www.canva.dev/docs/mcp/',
    label: 'Official Canva MCP Documentation',
    category: 'tool',
    description: 'Official remote MCP server documentation and current capability overview.',
  },
  {
    slug: 'canva-mcp-tools',
    destination: 'https://www.canva.dev/docs/mcp/tools/',
    label: 'Official Canva MCP Tools Documentation',
    category: 'tool',
    description: 'Official tool inventory, including Brand Kit and library capabilities.',
  },
  {
    slug: 'canva-brand',
    destination: 'https://www.canva.dev/docs/connect/guidelines/brand/',
    label: 'Official Canva Brand Guidelines',
    category: 'other',
    description: 'Approved logo usage, clear space, naming, and non-endorsement rules.',
  },
  {
    slug: 'canva-canvassador',
    destination: 'https://www.canva.com/help/canva-affiliate-marketing-program/',
    label: 'Official Canva Canvassador Status',
    category: 'other',
    description: 'Official current affiliate pathway and application status.',
  },
  {
    slug: 'canva-youtube',
    destination: 'https://www.youtube.com/@canva',
    label: 'Official Canva YouTube Channel',
    category: 'social',
    description: 'First-party Canva product demonstrations and launch videos.',
  },
  {
    slug: 'ikigai-coach',
    destination:
      'https://chatgpt.com/g/g-69301df74bd8819184c26dfc0b50d65a-ikigai-branding-coach',
    label: 'Ikigai & Branding Coach GPT',
    category: 'coach-gpt',
    description:
      'Free custom GPT that walks you through Ikigai mapping and brand translation via Socratic questioning.',
  },
  {
    slug: 'book-workshop',
    destination: 'https://cal.com/frankx/workshop',
    label: 'Book Live Workshop',
    category: 'partner',
    description: 'Book a live AI architecture & creator engineering session with FrankX.',
  },
  {
    slug: 'ikigai-notion-template',
    destination: 'https://frankx.gumroad.com/l/ikigai-notion',
    label: 'Ikigai Notion Template',
    category: 'tool',
    description: 'Interactive Notion workspace for Ikigai mapping and operating systems.',
  },
  {
    slug: 'ikigai-sheet-template',
    destination: 'https://docs.google.com/spreadsheets/d/1ikigai-template',
    label: 'Ikigai Spreadsheet Template',
    category: 'tool',
    description: 'Calculated spreadsheet template for dimension scoring and priorities.',
  },
  {
    slug: 'claude-cowork',
    destination: 'https://claude.ai',
    label: 'Claude Co-Work Hub',
    category: 'tool',
    description: 'Claude AI workspace for intentional creation and execution.',
  },
  {
    slug: 'ikigai-prompt-scaffold',
    destination: 'https://github.com/frankxai/prompt-library/tree/main/ikigai',
    label: 'Ikigai Prompt Scaffold',
    category: 'tool',
    description: 'System prompt scaffolds and Socratic frameworks for Ikigai exploration.',
  },
]

export function getOutboundLink(slug: string): OutboundLink | undefined {
  return outboundLinks.find((l) => l.slug === slug)
}
