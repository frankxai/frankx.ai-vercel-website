/**
 * Shared family tree data for all visualization variants.
 * Source of truth: .frankx/family/*.md (YAML frontmatter)
 * This is a compiled version for client-side rendering.
 */

export interface FamilyNode {
  id: string
  name: string
  bornName?: string
  role: string
  generation: number // 0 = grandparents, 1 = parents, 2 = current
  side: 'gorte' | 'riemer' | 'bridge' | 'current' | 'partner'
  location?: string
  details?: string[]
}

export interface FamilyEdge {
  source: string
  target: string
  type: 'spouse' | 'parent-child' | 'partner'
}

export const familyNodes: FamilyNode[] = [
  // Generation 0: Grandparents - Gorte
  {
    id: 'david-gorte',
    name: 'David Gorte',
    role: 'Opa',
    generation: 0,
    side: 'gorte',
    details: ['Maternal grandfather'],
  },
  {
    id: 'dorothea-gorte',
    name: 'Dorothea Gorte',
    bornName: 'geb. Prager',
    role: 'Oma',
    generation: 0,
    side: 'gorte',
    details: ['Maternal grandmother'],
  },
  // Generation 0: Grandparents - Riemer
  {
    id: 'alexander-riemer',
    name: 'Alexander Riemer',
    role: 'Opa',
    generation: 0,
    side: 'riemer',
    details: ['Paternal grandfather'],
  },
  {
    id: 'paulina-riemer',
    name: 'Paulina Riemer',
    role: 'Oma',
    generation: 0,
    side: 'riemer',
    details: ['Paternal grandmother'],
  },
  // Generation 1: Parents
  {
    id: 'dora-riemer',
    name: 'Dora Riemer',
    bornName: 'geb. Gorte',
    role: 'Mama',
    generation: 1,
    side: 'bridge',
    details: ['Daughter of David & Dorothea'],
  },
  {
    id: 'witali-riemer',
    name: 'Witali Riemer',
    role: 'Papa',
    generation: 1,
    side: 'bridge',
    details: ['Son of Alexander & Paulina'],
  },
  // Generation 2: Current
  {
    id: 'frank-riemer',
    name: 'Frank Riemer',
    role: "That's me",
    generation: 2,
    side: 'current',
    location: 'Amsterdam',
    details: ['AI Architect', 'Music Creator'],
  },
  {
    id: 'tien',
    name: 'Tien',
    role: 'Partner',
    generation: 2,
    side: 'partner',
    location: 'Amsterdam',
  },
]

export const familyEdges: FamilyEdge[] = [
  // Marriages
  { source: 'david-gorte', target: 'dorothea-gorte', type: 'spouse' },
  { source: 'alexander-riemer', target: 'paulina-riemer', type: 'spouse' },
  { source: 'dora-riemer', target: 'witali-riemer', type: 'spouse' },
  { source: 'frank-riemer', target: 'tien', type: 'partner' },
  // Parent-child
  { source: 'david-gorte', target: 'dora-riemer', type: 'parent-child' },
  { source: 'dorothea-gorte', target: 'dora-riemer', type: 'parent-child' },
  { source: 'alexander-riemer', target: 'witali-riemer', type: 'parent-child' },
  { source: 'paulina-riemer', target: 'witali-riemer', type: 'parent-child' },
  { source: 'dora-riemer', target: 'frank-riemer', type: 'parent-child' },
  { source: 'witali-riemer', target: 'frank-riemer', type: 'parent-child' },
]

export const sideColors = {
  gorte: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400', hex: '#f59e0b' },
  riemer: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400', hex: '#06b6d4' },
  bridge: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400', hex: '#10b981' },
  current: { bg: 'bg-violet-500/10', border: 'border-violet-500/40', text: 'text-violet-400', hex: '#8b5cf6' },
  partner: { bg: 'bg-rose-500/10', border: 'border-rose-500/30', text: 'text-rose-400', hex: '#f43f5e' },
} as const
