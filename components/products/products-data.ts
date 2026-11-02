// Static product list metadata for SEO/JSON-LD (no client-only dependencies)
// Mirrors the products[] array inside ProductsShell.tsx - keep in sync.

export type ProductListItem = {
  id: string
  name: string
  tagline: string
  href: string
  status: 'active' | 'early-access'
}

export const productsListItemData: ProductListItem[] = [
  {
    id: 'vibe-os',
    name: 'Vibe OS',
    tagline: 'AI music session guide',
    href: '/products/vibe-os',
    status: 'active',
  },
  {
    id: 'creators-soulbook',
    name: "The Creator's Soulbook",
    tagline: 'Life architecture OS',
    href: '/soulbook',
    status: 'early-access',
  },
  {
    id: 'suno-prompts-bundle',
    name: '5 Suno Prompt Bundles',
    tagline: 'Genre-specific prompt templates',
    href: '/products/suno-prompt-library',
    status: 'early-access',
  },
  {
    id: 'creative-ai-toolkit',
    name: 'Creative AI Toolkit',
    tagline: 'Prompt library and workflow rituals',
    href: '/newsletter?ref=creative-ai-toolkit-early-access',
    status: 'early-access',
  },
  {
    id: 'creation-chronicles',
    name: 'Creation Chronicles',
    tagline: 'Strategic storytelling OS',
    href: '/newsletter?ref=creation-chronicles-early-access',
    status: 'early-access',
  },
  {
    id: 'generative-creator-os',
    name: 'Generative Creator OS',
    tagline: 'Multi-modal AI studio',
    href: '/newsletter?ref=generative-creator-os-early-access',
    status: 'early-access',
  },
  {
    id: 'agentic-creator-os',
    name: 'Agentic Creator OS',
    tagline: 'Agentic developer workflows',
    href: '/newsletter?ref=agentic-creator-os-early-access',
    status: 'early-access',
  },
]

export const productsFaq = [
  {
    q: 'How are these different from generic AI courses?',
    a: 'Each kit packages concrete Markdown specs, prompt files, checklists, and workflow templates drawn from active studio and engineering projects.',
  },
  {
    q: 'Do I need technical experience?',
    a: "Vibe OS and The Creator's Soulbook require zero coding setup. Creative AI Toolkit and Generative Creator OS suit intermediate builders working across multiple tools.",
  },
  {
    q: 'Which products are available now?',
    a: "Vibe OS has a public guide you can inspect now. The Creator's Soulbook, Suno Prompt Bundles, and other listed products remain previews or early-access routes until delivery is verified.",
  },
  {
    q: 'What happens when I join Early Access?',
    a: 'Early Access subscribers receive launch availability notes, preview changelogs, and scope updates when each kit opens.',
  },
]
