/**
 * Shared family tree data for all visualization variants.
 * Source of truth: .frankx/family/*.md (YAML frontmatter)
 * This is a compiled version for client-side rendering.
 *
 * `familyNodes` / `familyEdges` = core 8 members (generation 0-2)
 *   → Used by design-lab visualizations with hardcoded positions
 *
 * `familyNodesExtended` / `familyEdgesExtended` = all generations
 *   → Used by /familie/ pages that handle dynamic layouts
 */

export interface FamilyNode {
  id: string
  name: string
  bornName?: string
  role: string
  generation: number // -1 = great-grandparents, 0 = grandparents, 1 = parents, 2 = current
  side: 'gorte' | 'riemer' | 'bridge' | 'current' | 'partner'
  location?: string
  details?: string[]
}

export interface FamilyEdge {
  source: string
  target: string
  type: 'spouse' | 'parent-child' | 'partner'
}

// ── Generation -1: Urgroßeltern (extended only) ─────────────────────────────

const urgroßeltern: FamilyNode[] = [
  // Riemer-Seite: Christians Vater von Alexander
  {
    id: 'christian-riemer',
    name: 'Christian Riemer',
    role: 'Urgroßvater',
    generation: -1,
    side: 'riemer',
    location: 'Karaganda, Kasachstan',
    details: ['Geb. 1914', 'Wolgadeutscher', 'Trudarmee-Überlebender', '🔍 Herkunft: evtl. Kolonie Reinwald'],
  },
  // Schneider-Seite: Paulinas Eltern
  {
    id: 'franz-schneider',
    name: 'Franz Schneider',
    role: 'Urgroßvater',
    generation: -1,
    side: 'riemer',
    details: ['Vater von Paulina', '🔍 Details werden erforscht'],
  },
  {
    id: 'amalia-schneider',
    name: 'Amalia Schneider',
    role: 'Urgroßmutter',
    generation: -1,
    side: 'riemer',
    details: ['Mutter von Paulina', '🔍 Details werden erforscht'],
  },
]

// ── Core family: Generation 0-2 (used by design-lab) ────────────────────────

const coreNodes: FamilyNode[] = [
  // Generation 0: Großeltern - Gorte
  {
    id: 'david-gorte',
    name: 'David Gorte',
    role: 'Opa',
    generation: 0,
    side: 'gorte',
    details: ['Großvater mütterlicherseits'],
  },
  {
    id: 'dorothea-gorte',
    name: 'Dorothea Gorte',
    bornName: 'geb. Prager',
    role: 'Oma',
    generation: 0,
    side: 'gorte',
    details: ['Großmutter mütterlicherseits'],
  },
  // Generation 0: Großeltern - Riemer
  {
    id: 'alexander-riemer',
    name: 'Alexander Riemer',
    role: 'Opa',
    generation: 0,
    side: 'riemer',
    details: ['Großvater väterlicherseits', 'Sohn von Christian Riemer'],
  },
  {
    id: 'paulina-riemer',
    name: 'Paulina Riemer',
    bornName: 'geb. Schneider',
    role: 'Oma',
    generation: 0,
    side: 'riemer',
    details: ['Großmutter väterlicherseits', 'Tochter von Franz & Amalia Schneider'],
  },
  // Generation 1: Eltern
  {
    id: 'dora-riemer',
    name: 'Dora Riemer',
    bornName: 'geb. Gorte',
    role: 'Mama',
    generation: 1,
    side: 'bridge',
    details: ['Tochter von David & Dorothea'],
  },
  {
    id: 'witali-riemer',
    name: 'Witali Riemer',
    role: 'Papa',
    generation: 1,
    side: 'bridge',
    details: ['Sohn von Alexander & Paulina'],
  },
  // Generation 2: Heute
  {
    id: 'frank-riemer',
    name: 'Frank Riemer',
    role: 'Das bin ich',
    generation: 2,
    side: 'current',
    location: 'Amsterdam',
    details: ['AI Architect', 'Musik-Produzent'],
  },
  {
    id: 'tien',
    name: 'Tien',
    role: 'Partnerin',
    generation: 2,
    side: 'partner',
    location: 'Amsterdam',
  },
]

const coreEdges: FamilyEdge[] = [
  // Ehen
  { source: 'david-gorte', target: 'dorothea-gorte', type: 'spouse' },
  { source: 'alexander-riemer', target: 'paulina-riemer', type: 'spouse' },
  { source: 'dora-riemer', target: 'witali-riemer', type: 'spouse' },
  { source: 'frank-riemer', target: 'tien', type: 'partner' },
  // Eltern-Kind
  { source: 'david-gorte', target: 'dora-riemer', type: 'parent-child' },
  { source: 'dorothea-gorte', target: 'dora-riemer', type: 'parent-child' },
  { source: 'alexander-riemer', target: 'witali-riemer', type: 'parent-child' },
  { source: 'paulina-riemer', target: 'witali-riemer', type: 'parent-child' },
  { source: 'dora-riemer', target: 'frank-riemer', type: 'parent-child' },
  { source: 'witali-riemer', target: 'frank-riemer', type: 'parent-child' },
]

// ── Default exports: core 8 members (backward compatible) ───────────────────

export const familyNodes = coreNodes
export const familyEdges = coreEdges

// ── Extended exports: all generations including Urgroßeltern ─────────────────

export const familyNodesExtended: FamilyNode[] = [...urgroßeltern, ...coreNodes]
export const familyEdgesExtended: FamilyEdge[] = [
  ...coreEdges,
  // Riemer-Seite: Christian → Alexander
  { source: 'christian-riemer', target: 'alexander-riemer', type: 'parent-child' },
  // Schneider-Seite: Franz & Amalia → Paulina
  { source: 'franz-schneider', target: 'paulina-riemer', type: 'parent-child' },
  { source: 'amalia-schneider', target: 'paulina-riemer', type: 'parent-child' },
  { source: 'franz-schneider', target: 'amalia-schneider', type: 'spouse' },
]

// ── Colors ──────────────────────────────────────────────────────────────────

export const sideColors = {
  gorte: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400', hex: '#f59e0b' },
  riemer: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400', hex: '#06b6d4' },
  bridge: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400', hex: '#10b981' },
  current: { bg: 'bg-violet-500/10', border: 'border-violet-500/40', text: 'text-violet-400', hex: '#8b5cf6' },
  partner: { bg: 'bg-rose-500/10', border: 'border-rose-500/30', text: 'text-rose-400', hex: '#f43f5e' },
} as const
