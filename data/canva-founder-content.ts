export type CanvaContentStatus = 'live' | 'next' | 'planned'

export interface CanvaContentEntry {
  title: string
  intent: 'decide' | 'implement' | 'compare' | 'govern' | 'measure'
  primaryQuery: string
  format: string
  status: CanvaContentStatus
  href?: string
}

export const CANVA_LAST_VERIFIED = '2026-08-30'

export const canvaArchitectureSteps = [
  {
    kind: 'signal',
    label: 'Source-led signal',
    eyebrow: '01 · research',
    description: 'Audience need, evidence, rights, and the decision the artifact must move.',
    href: '/research/methodology',
    external: false,
  },
  {
    kind: 'brief',
    label: 'Approved brief',
    eyebrow: '02 · contract',
    description: 'One argument, named audience, approved claims, source ledger, and channel variants.',
    href: '/blog/ultimate-canva-ai-workflow-2026',
    external: false,
  },
  {
    kind: 'agent',
    label: 'Agent orchestrator',
    eyebrow: '03 · control plane',
    description: 'Plans bounded tool calls, records provenance, and stops at approval boundaries.',
    href: '/ai-architecture',
    external: false,
  },
  {
    kind: 'canva',
    label: 'Official Canva MCP',
    eyebrow: '04 · tool plane',
    description: 'Discover, generate, edit, organize, review, and export through Canva tools.',
    href: '/go/canva-mcp',
    external: true,
  },
  {
    kind: 'library',
    label: 'Brand Kit + library',
    eyebrow: '04b · brand memory',
    description: 'Templates, assets, folders, and identity rules remain scoped to the right brand.',
    href: '/go/canva-mcp-tools',
    external: true,
  },
  {
    kind: 'review',
    label: 'Human release gate',
    eyebrow: '05 · judgment',
    description: 'Claims, rights, brand integrity, accessibility, and channel fit are accepted here.',
    href: '/guides/canva-mcp-for-founders',
    external: false,
  },
  {
    kind: 'site',
    label: 'FrankX knowledge hub',
    eyebrow: '06 · owned media',
    description: 'Canonical guide, answer-ready facts, structured data, and accountable conversion path.',
    href: '/canva',
    external: false,
  },
  {
    kind: 'channel',
    label: 'Channel variants',
    eyebrow: '06b · distribution',
    description: 'Video, social, search, newsletter, partner, and sales-enablement derivatives.',
    href: '/content-studio',
    external: false,
  },
  {
    kind: 'measure',
    label: 'Learning loop',
    eyebrow: '07 · evidence',
    description: 'Qualified clicks, acceptance, assisted conversion, reuse, and reader questions.',
    href: '#scorecard',
    external: false,
  },
] as const

export const officialCanvaSources = [
  {
    title: 'Canva MCP documentation',
    href: 'https://www.canva.dev/docs/mcp/',
    role: 'Remote MCP endpoint, setup model, and capability overview',
  },
  {
    title: 'Canva MCP tools and rate limits',
    href: 'https://www.canva.dev/docs/mcp/tools/',
    role: 'Current tool inventory, plan availability, and request limits',
  },
  {
    title: 'Canva Connect brand guidelines',
    href: 'https://www.canva.dev/docs/connect/guidelines/brand/',
    role: 'Approved logo assets, clear space, naming, and non-endorsement rules',
  },
  {
    title: 'Canvassador and affiliate status',
    href: 'https://www.canva.com/help/canva-affiliate-marketing-program/',
    role: 'Official affiliate pathway and current application status',
  },
  {
    title: 'Embedding Canva designs',
    href: 'https://www.canva.com/help/embed-designs/',
    role: 'Public and private embed behavior and update semantics',
  },
  {
    title: 'Bulk Create from Canva Sheets',
    href: 'https://www.canva.com/help/bulk-create-from-sheets/',
    role: 'Data-to-template workflow and generation controls',
  },
] as const

export const canvaMcpCapabilities = [
  {
    capability: 'Discover',
    mechanism: 'Search designs, pages, folders, and library assets',
    founderJob: 'Find the approved source instead of rebuilding from memory.',
  },
  {
    capability: 'Generate',
    mechanism: 'Create editable design candidates from a structured brief',
    founderJob: 'Turn an approved argument into a design starting point.',
  },
  {
    capability: 'Edit',
    mechanism: 'Apply bounded operations to an existing design',
    founderJob: 'Revise one controlled artifact without regenerating the campaign.',
  },
  {
    capability: 'Govern brand',
    mechanism: 'Read Brand Kits, templates, assets, and folders',
    founderJob: 'Keep multi-brand production attached to the correct identity system.',
  },
  {
    capability: 'Review',
    mechanism: 'Read designs, pages, thumbnails, content, and comments',
    founderJob: 'Place human judgment before public distribution.',
  },
  {
    capability: 'Deliver',
    mechanism: 'Export, resize, organize, and hand work to publishing systems',
    founderJob: 'Move accepted work into the channel-specific delivery layer.',
  },
] as const

export const canvaContentRoadmap: CanvaContentEntry[] = [
  {
    title: 'Canva for Founders: the Agentic Content Operating System',
    intent: 'decide',
    primaryQuery: 'canva for founders',
    format: 'Pillar + interactive architecture',
    status: 'live',
    href: '/canva',
  },
  {
    title: 'The Canva AI Workflow I Would Run as a Solo Founder',
    intent: 'implement',
    primaryQuery: 'canva ai workflow 2026',
    format: 'Founder field guide',
    status: 'live',
    href: '/blog/ultimate-canva-ai-workflow-2026',
  },
  {
    title: 'Canva MCP for Founders: Setup, Permissions, and Agent Graph',
    intent: 'implement',
    primaryQuery: 'canva mcp for founders',
    format: 'Technical guide',
    status: 'live',
    href: '/guides/canva-mcp-for-founders',
  },
  {
    title: 'The Multi-Brand Canva Brand Kit Architecture',
    intent: 'govern',
    primaryQuery: 'canva brand kit multiple brands',
    format: 'Architecture + checklist',
    status: 'next',
  },
  {
    title: 'Canva Sheets and Bulk Create: 100 Assets Without Losing the Brand',
    intent: 'implement',
    primaryQuery: 'canva sheets bulk create',
    format: 'Data workflow + template',
    status: 'next',
  },
  {
    title: 'Canva AI 2.0 for Founders: Where It Fits and Where It Does Not',
    intent: 'decide',
    primaryQuery: 'canva ai 2.0 review',
    format: 'Source-led evaluation',
    status: 'next',
  },
  {
    title: 'Canva vs Figma for a Founder-Led Content Team',
    intent: 'compare',
    primaryQuery: 'canva vs figma for business',
    format: 'Decision matrix',
    status: 'planned',
  },
  {
    title: 'Canva vs Gamma for Founder Decks and Visual Systems',
    intent: 'compare',
    primaryQuery: 'canva vs gamma',
    format: 'Workflow comparison',
    status: 'planned',
  },
  {
    title: 'Canva Code and HTML Import: The Editable Artifact Workflow',
    intent: 'implement',
    primaryQuery: 'canva html import canva code',
    format: 'Build tutorial',
    status: 'planned',
  },
  {
    title: 'Canva MCP Security: Approval Gates, OAuth, and Brand Boundaries',
    intent: 'govern',
    primaryQuery: 'canva mcp security',
    format: 'Threat model',
    status: 'planned',
  },
  {
    title: 'The Canva Founder ROI Scorecard',
    intent: 'measure',
    primaryQuery: 'is canva worth it for business',
    format: 'Calculator + scorecard',
    status: 'planned',
  },
  {
    title: 'When Canva Is the Wrong Layer',
    intent: 'decide',
    primaryQuery: 'canva alternatives for professional design',
    format: 'Boundary guide',
    status: 'planned',
  },
]

export const canvaFounderFaqs = [
  {
    question: 'What is the right role for Canva in a founder AI stack?',
    answer:
      'Use Canva as the editable visual production and collaboration layer. Keep research, claims, source provenance, publishing logic, and performance data in their own systems. The agent should hand Canva an approved brief; Canva should not become the source of truth for the business.',
  },
  {
    question: 'Does Canva have an official MCP server?',
    answer:
      'Yes. Canva documents a remote MCP server at https://mcp.canva.com/mcp. Its tools cover design discovery, generation, editing, assets, Brand Kits, folders, exports, and comments. Available tools and limits vary, so clients should list tools at runtime instead of assuming a fixed inventory.',
  },
  {
    question: 'Should a founder let an AI agent publish Canva designs automatically?',
    answer:
      'No by default. Let agents prepare briefs, create candidates, apply bounded edits, and assemble channel variants. Keep claims, rights, brand integrity, and public distribution behind a human approval gate until the workflow has earned narrower automation.',
  },
  {
    question: 'Is FrankX a Canva affiliate or official Canva partner?',
    answer:
      'No. FrankX is an independent editorial and technical resource. Canva currently routes affiliate benefits through its Canvassador program, and its official help page says applications are closed. FrankX will disclose any future approved commercial relationship before using a compensated link.',
  },
  {
    question: 'Can Canva designs be embedded on frankx.ai?',
    answer:
      'Yes, when the design is intentionally published for embedding. Canva states that standard embeds are public and update when the source design changes. Private embeds require eligible enterprise or education administration, so sensitive working designs should not be exposed through public embeds.',
  },
  {
    question: 'What should the Canva content system measure?',
    answer:
      'Measure accepted asset cycle time, first-pass approval rate, reuse rate, landing-page engagement, assisted sign-ups, and qualified outbound clicks. Asset count alone rewards production volume without proving that the work reached or moved the right reader.',
  },
] as const
