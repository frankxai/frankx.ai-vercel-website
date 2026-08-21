// Data model for /v0 — the FrankX v0 Blueprint surface.
// Three grades of content:
//   1. curatedTemplates  — best-of-v0 from the public gallery (attribution + outbound links).
//   2. frankxBlueprints  — surfaces on THIS site that FrankX shipped with v0 (dogfooding proof).
//   3. originals         — sophisticated FrankX-native templates generated via the v0 API.
// Curated ratings are REAL signals only; unknown → 'unranked'. Never fabricate metrics.

export type Spectrum = 'tech' | 'soul'

export interface CuratedTemplate {
  id: string
  name: string
  author?: string
  url: string // outbound to v0.app — attribution + link-out, never reproduced source
  category: string
  stack: string[]
  note: string
  rating: string // e.g. 'Featured' or 'unranked' — real signals only
  spectrum: Spectrum
}

export interface FrankXBlueprint {
  id: string
  name: string
  href: string // internal, live route on frankx.ai
  surface: string
  note: string
  spectrum: Spectrum
}

export interface V0Original {
  id: string
  name: string
  chatId?: string
  demoUrl?: string
  domain: string
  note: string
  status: 'generated' | 'planned'
  spectrum: Spectrum
}

// ---------------------------------------------------------------------------
// FrankX Blueprints — real, live surfaces on frankx.ai accelerated with v0.
// Every href resolves to a shipped route. This is the dogfooding proof.
// ---------------------------------------------------------------------------
export const frankxBlueprints: FrankXBlueprint[] = [
  {
    id: 'acos',
    name: 'ACOS Product Surface',
    href: '/acos',
    surface: 'Product landing',
    note: 'Personal AI Center of Excellence — architected in v0, refined to the FrankX design system.',
    spectrum: 'tech',
  },
  {
    id: 'ai-academy',
    name: 'AI Architect Academy',
    href: '/ai-architect-academy',
    surface: 'Program hub',
    note: 'Curriculum hub — v0 draft, hardened with real content architecture and motion taste.',
    spectrum: 'tech',
  },
  {
    id: 'design-system',
    name: 'Design System Surface',
    href: '/design-system',
    surface: 'System reference',
    note: 'The two-spectrum palette rendered as a living surface — v0 scaffold, brand-locked.',
    spectrum: 'tech',
  },
  {
    id: 'labs',
    name: 'Labs',
    href: '/labs',
    surface: 'Experiments index',
    note: 'Where new surfaces get prototyped — the v0-to-production pipeline in the open.',
    spectrum: 'tech',
  },
  {
    id: 'music-lab',
    name: 'Music Lab',
    href: '/music-lab',
    surface: 'Creative studio',
    note: 'Soul-spectrum surface for the 12,000-song catalog — v0 speed, warm-gold restraint.',
    spectrum: 'soul',
  },
  {
    id: 'inner-circle',
    name: 'Inner Circle',
    href: '/inner-circle',
    surface: 'Membership',
    note: 'High-touch membership surface — generated fast, tuned for trust and quiet luxury.',
    spectrum: 'soul',
  },
  {
    id: 'soulbook',
    name: 'Soulbook',
    href: '/soulbook',
    surface: 'Assessment',
    note: 'Soul-frequency assessment surface — v0 structure, contemplative editorial finish.',
    spectrum: 'soul',
  },
  {
    id: 'coaching',
    name: 'Coaching',
    href: '/coaching',
    surface: 'Service',
    note: 'Done-with-you service surface — v0 draft to a conversion-tuned page.',
    spectrum: 'soul',
  },
]

// ---------------------------------------------------------------------------
// Best of v0 — curated from the public v0 gallery. Seeds now; the knowledge
// graph (v0-template-os/knowledge-graph/templates.json) expands this with
// verified deep links + real signals. Outbound + attributed only.
// ---------------------------------------------------------------------------
// Curated top picks from the 39-node knowledge graph (content/v0/knowledge-graph.json).
// Ordered by real v0.app duplicate ("fork") counts, spread across categories.
// Ratings are the actual gallery signals — never fabricated.
export const curatedTemplates: CuratedTemplate[] = [
  {
    id: 'financial-dashboard-kokonut',
    name: 'Financial Dashboard',
    author: 'kokonut',
    url: 'https://v0.app/templates/DuidKNEmCKf',
    category: 'Dashboards',
    stack: ['Next.js', 'React', 'Tailwind', 'shadcn/ui'],
    note: 'The most-forked dashboard in the survey — dense data-table + chart combo with high information trust.',
    rating: '28.1K forks',
    spectrum: 'tech',
  },
  {
    id: 'pointer-ai-landing',
    name: 'Pointer AI Landing',
    author: 'yadwinder',
    url: 'https://v0.app/templates/XQxxv76lK5w',
    category: 'Landing',
    stack: ['Next.js', 'React', 'Tailwind', 'shadcn/ui'],
    note: 'High-conversion AI-product hero — single clear CTA over a social-proof strip.',
    rating: '20.2K forks',
    spectrum: 'tech',
  },
  {
    id: 'cyberpunk-dashboard',
    name: 'Cyberpunk Dashboard',
    author: 'emmartinzok',
    url: 'https://v0.app/templates/v9Hg1dBb5o3',
    category: 'Dashboards',
    stack: ['Next.js', 'React', 'Tailwind', 'shadcn/ui'],
    note: 'Neon dark theme that leads with identity — best for brand-forward ops consoles (needs a contrast pass).',
    rating: '14.9K forks',
    spectrum: 'soul',
  },
  {
    id: 'brillance-saas-landing',
    name: 'Brillance SaaS Landing',
    author: 'yadwinder',
    url: 'https://v0.app/templates/zdiN8dHwaaT',
    category: 'Landing',
    stack: ['Next.js', 'React', 'Tailwind', 'shadcn/ui'],
    note: 'Highest like count in the survey — polished SaaS hero with an animated feature showcase.',
    rating: '2K likes',
    spectrum: 'tech',
  },
  {
    id: 'openai-ai-sdk-chatbot',
    name: 'OpenAI + AI SDK Chatbot',
    author: 'shadcn',
    url: 'https://v0.app/templates/XFP4VKnRE3t',
    category: 'AI apps',
    stack: ['Next.js', 'React', 'Tailwind', 'shadcn/ui', 'Vercel AI SDK'],
    note: 'Reference chat implementation by shadcn — message bubbles built straight from the primitives.',
    rating: '10.2K forks',
    spectrum: 'tech',
  },
  {
    id: 'image-generation-playground',
    name: 'Image Generation Playground',
    author: 'estebansuarez',
    url: 'https://v0.app/templates/hkRpZoLOrJC',
    category: 'AI apps',
    stack: ['Next.js', 'React', 'Tailwind', 'shadcn/ui', 'AI Gateway'],
    note: 'Split-panel prompt-to-image playground — swap in Nano Banana Pro / gpt-image-2 via the gateway.',
    rating: '6.3K forks',
    spectrum: 'soul',
  },
  {
    id: '3d-model-generator-rodin',
    name: '3D Model Generator (Hyper3D Rodin)',
    author: 'ctate',
    url: 'https://v0.app/templates/bTIhXEOJa8w',
    category: 'Apps & Games',
    stack: ['Next.js', 'React', 'Tailwind', 'shadcn/ui', 'Hyper3D Rodin'],
    note: 'Text/image-to-3D with a model viewer — a strong showcase of an AI + 3D pipeline.',
    rating: '5.5K forks',
    spectrum: 'tech',
  },
  {
    id: 'shadcn-dashboard',
    name: 'Shadcn Dashboard',
    author: 'estebansuarez',
    url: 'https://v0.app/templates/Pf7lw1nypu5',
    category: 'Dashboards',
    stack: ['Next.js', 'React', 'Tailwind', 'shadcn/ui'],
    note: 'The canonical shadcn admin layout most other dashboards in the survey riff on.',
    rating: '4.1K forks',
    spectrum: 'tech',
  },
  {
    id: 'newsletter-template-joyco',
    name: 'Newsletter Template',
    author: 'joyco',
    url: 'https://v0.app/templates/xU39T0XywpR',
    category: 'Landing',
    stack: ['Next.js', 'React', 'Tailwind', 'shadcn/ui'],
    note: 'Studio-grade minimalist signup with joyco’s signature restrained typography.',
    rating: '738 likes',
    spectrum: 'soul',
  },
  {
    id: 'shopify-ecommerce-joyco',
    name: 'Shopify Ecommerce',
    author: 'joyco',
    url: 'https://v0.app/templates/XmzC9oi7g4m',
    category: 'E-commerce',
    stack: ['Next.js', 'React', 'Tailwind', 'shadcn/ui'],
    note: 'Editorial PDP + cart flow with a restrained product-photography grid.',
    rating: '2.8K forks',
    spectrum: 'soul',
  },
  {
    id: 'portfolio-template-joyco',
    name: 'Portfolio Template',
    author: 'joyco',
    url: 'https://v0.app/templates/mA8N4h1POSv',
    category: 'Portfolio',
    stack: ['Next.js', 'React', 'Tailwind', 'shadcn/ui'],
    note: 'Studio-reference portfolio — restrained grid, strong typographic hierarchy.',
    rating: '1.8K forks',
    spectrum: 'soul',
  },
  {
    id: 'brutalist-void-portfolio',
    name: 'Brutalist Void Portfolio',
    author: 'rajoninternet',
    url: 'https://v0.app/templates/0brPGNpjNkt',
    category: 'Portfolio',
    stack: ['Next.js', 'React', 'Tailwind', 'shadcn/ui'],
    note: 'High-contrast brutalist type on a raw grid — differentiated identity (run an a11y pass).',
    rating: '434 likes',
    spectrum: 'soul',
  },
]

// Real, verified graph totals for on-page copy. Sourced from knowledge-graph.json.
export const graphStats = {
  templates: 39,
  connections: 40,
  categories: 10,
  builtSurfaces: frankxBlueprints.length,
}

// ---------------------------------------------------------------------------
// FrankX Originals — flagship templates generated from brand-locked v0 prompts,
// one per pillar. Demo URLs from the v0 API are tokenized/ephemeral, so the
// cards route to /contact ("commission a build") rather than shipping links
// that expire. Raw generations + chat ids live in v0-template-os/originals.
// ---------------------------------------------------------------------------
export const originals: V0Original[] = [
  {
    id: 'ai-coe-intake-console',
    domain: 'AI-CoE',
    name: 'AI-CoE Intake & Triage Console',
    note: 'Public intake page (Server Action form) plus an internal triage dashboard — request queue, status badges, matched-pattern recommendations.',
    status: 'generated',
    spectrum: 'tech',
  },
  {
    id: 'personal-brand-hub',
    domain: 'AI Architect',
    name: 'AI Architect Authority Hub',
    note: 'Direct positioning hero, an asymmetric Frameworks & Case Studies index, and a live-systems status panel — proof over claimed social proof.',
    status: 'generated',
    spectrum: 'tech',
  },
  {
    id: 'creator-os-dashboard',
    domain: 'Creator OS',
    name: 'Creator OS Command Dashboard',
    note: 'A working content-ops console — a four-column pipeline whose palette warms from tech to soul as items move toward Published.',
    status: 'generated',
    spectrum: 'soul',
  },
  {
    id: 'music-catalog',
    domain: 'Music',
    name: 'Music Catalog & Discovery',
    note: 'An 800+ track browsing surface with a featured-release lead, mood-tag filtering, and a persistent now-playing bar as page chrome.',
    status: 'generated',
    spectrum: 'soul',
  },
]

export const intelligencePillars = [
  {
    id: 'knowledge-graph',
    title: 'Template Knowledge Graph',
    note: 'Every notable v0 template mapped by stack, pattern, and domain fit — a navigable graph, not a list.',
    spectrum: 'tech' as Spectrum,
  },
  {
    id: 'architecture',
    title: 'Architecture Teardowns',
    note: 'Component tree, data flow, state, motion, and performance posture — deconstructed per archetype.',
    spectrum: 'tech' as Spectrum,
  },
  {
    id: 'upgrade-playbooks',
    title: 'Upgrade Playbooks',
    note: 'How we take a v0 template and upgrade it to a FrankX domain surface with the latest Next.js patterns.',
    spectrum: 'soul' as Spectrum,
  },
]
