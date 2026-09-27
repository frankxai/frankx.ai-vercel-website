// Static product list metadata for SEO/JSON-LD (no client-only dependencies)
// Mirrors the products[] array inside ProductsShell.tsx — keep in sync.

export type ProductListItem = {
  id: string
  name: string
  tagline: string
  href: string
  status: 'concept' | 'early-access'
}

export const productsListItemData: ProductListItem[] = [
  {
    id: 'vibe-os',
    name: 'Vibe OS creative-state workspace',
    tagline: 'Concept notes',
    href: '/products/vibe-os',
    status: 'concept',
  },
  {
    id: 'creators-soulbook',
    name: "The Creator's Soulbook",
    tagline: 'Life Architecture OS',
    href: '/soulbook',
    status: 'early-access',
  },
  {
    id: 'suno-prompts-bundle',
    name: '5 Suno Prompt Bundles',
    tagline: 'Genre-Specific Music Generation',
    href: '/products/suno-prompt-library',
    status: 'early-access',
  },
  {
    id: 'creative-ai-toolkit',
    name: 'Creative AI Toolkit',
    tagline: 'Prompt library + workflow rituals',
    href: '/newsletter?ref=creative-ai-toolkit-early-access',
    status: 'early-access',
  },
  {
    id: 'creation-chronicles',
    name: 'Creation Chronicles',
    tagline: 'Strategic Storytelling OS',
    href: '/newsletter?ref=creation-chronicles-early-access',
    status: 'early-access',
  },
  {
    id: 'generative-creator-os',
    name: 'Generative Creator OS',
    tagline: 'Multi-modal AI Studio',
    href: '/newsletter?ref=generative-creator-os-early-access',
    status: 'early-access',
  },
  {
    id: 'agentic-creator-os',
    name: 'Agentic Creator OS',
    tagline: 'Developer AI Mastery',
    href: '/newsletter?ref=agentic-creator-os-early-access',
    status: 'early-access',
  },
]

export const productsFaq = [
  {
    q: 'What is on this page?',
    a: 'Each card states its current status. Concept and early-access entries describe scope; linked pages show what can be inspected now.',
  },
  {
    q: 'Do I need technical experience?',
    a: 'Open a product page to review its current scope and any stated requirements.',
  },
  {
    q: 'Which products are available now?',
    a: "The Vibe OS workspace is a concept. The other cards are early product outlines; some cards also link to related pages you can inspect now.",
  },
  {
    q: 'What do I get by joining Early Access?',
    a: 'The form records your email address and the product you selected.',
  },
]
