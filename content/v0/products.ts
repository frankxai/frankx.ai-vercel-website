import type { Spectrum } from './blueprints'

// The paid-product line built on the v0 pipeline. Specs + v1 generations live in
// v0-template-os/products/. No public pricing until Frank signs the proposal —
// cards route to /contact until then.

export interface V0Product {
  id: string
  name: string
  tagline: string
  category: string
  spectrum: Spectrum
  essence: string
  pillars: string[]
}

export const v0Products: V0Product[] = [
  {
    id: 'provenance',
    name: 'Provenance',
    tagline: 'The gallery where the art is warm and the receipts are precise.',
    category: 'Generative gallery',
    spectrum: 'soul',
    essence:
      'A creator-owned gallery for AI image and music work. Every piece carries its full lineage — model, seed, prompt hash, cost — set like museum wall labels. Your work, your domain, your provenance.',
    pillars: ['AI SDK image generation', 'Suno-ready music room', 'Model attribution layer'],
  },
  {
    id: 'still-life',
    name: 'Still Life',
    tagline: 'Stop renting your product photos.',
    category: 'AI-native commerce',
    spectrum: 'tech',
    essence:
      'A commerce starter where the photo studio is a tab on the product record. Condition the image model on three real reference shots, generate infinite consistent scenes, promote the best to 4K heroes — then sell.',
    pillars: ['Reference-conditioned generation', 'Contact-sheet admin studio', 'Stripe checkout wired'],
  },
  {
    id: 'familiar',
    name: 'Familiar',
    tagline: 'A library that is quietly, warmly alive.',
    category: 'Content platform',
    spectrum: 'soul',
    essence:
      'A wiki-and-blog platform where every collection has a resident mascot — a character with a voice that answers from your pages with citations, and visibly grows as your library does.',
    pillars: ['Personality-first RAG', 'Interlinked wiki + blog', 'Mascots that level up'],
  },
]
