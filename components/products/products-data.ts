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
    q: 'How are these different from other AI courses?',
    a: "These aren't courses—they're operating systems. You get the exact frameworks, prompts, and workflows I use daily in my own creative practice and enterprise work. No fluff, just what works.",
  },
  {
    q: 'Do I need technical experience?',
    a: "The Vibe OS creative-state workspace is an unreleased concept. The Creator's Soulbook is designed for beginners; Creative AI Toolkit and Generative Creator OS are for intermediate users who want to go deeper.",
  },
  {
    q: 'Which products are available now?',
    a: "The Vibe OS creative-state workspace is an unreleased concept. The Creator's Soulbook, Suno Prompt Bundles, and other listed products remain previews or early-access routes until delivery is verified.",
  },
  {
    q: 'What do I get by joining Early Access?',
    a: 'The form records your email address and the product you selected.',
  },
]
