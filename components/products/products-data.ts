// Static product list metadata for SEO/JSON-LD (no client-only dependencies)
// Mirrors the products[] array inside ProductsShell.tsx — keep in sync.

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
    tagline: 'Suno Music Mastery',
    href: '/products/vibe-os',
    status: 'active',
  },
  {
    id: 'creators-soulbook',
    name: "The Creator's Soulbook",
    tagline: 'Life Architecture OS',
    href: '/soulbook',
    status: 'active',
  },
  {
    id: 'suno-prompts-bundle',
    name: '5 Suno Prompt Bundles',
    tagline: 'Genre-Specific Music Generation',
    href: '/products/suno-prompt-library',
    status: 'active',
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
    a: "Vibe OS and The Creator's Soulbook are designed for beginners. Creative AI Toolkit and Generative Creator OS are for intermediate users who want to go deeper.",
  },
  {
    q: 'Which products are available now?',
    a: 'Vibe OS, The Creator\'s Soulbook, and the Suno Prompt Bundles are available now. Other products are in Early Access—join the list to get priority launch access and exclusive pricing.',
  },
  {
    q: 'What do I get by joining Early Access?',
    a: 'Early Access members get priority launch notification, exclusive early-bird pricing, behind-the-scenes development updates, and direct input on product refinement.',
  },
]
