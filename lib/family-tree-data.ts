/**
 * Synthetic family-tree fixture used only by public design-lab visualizations.
 * Real family records must be resolved from an authenticated Family Intelligence OS tenant.
 */

export const dataClassification = 'synthetic-example' as const

export interface FamilyNode {
  id: string
  name: string
  bornName?: string
  role: string
  generation: number
  side: 'gorte' | 'riemer' | 'bridge' | 'current' | 'partner'
  location?: string
  details?: string[]
  born?: string
  died?: string
  bornLocation?: string
  diedLocation?: string
}

export interface FamilyEdge {
  source: string
  target: string
  type: 'spouse' | 'parent-child' | 'partner'
}

export const familyNodes: FamilyNode[] = [
  {
    id: 'example-maternal-grandparent-a',
    name: 'Beispielperson A',
    role: 'Großelternteil',
    generation: 0,
    side: 'gorte',
    details: ['Synthetische Design-Lab-Daten'],
  },
  {
    id: 'example-maternal-grandparent-b',
    name: 'Beispielperson B',
    role: 'Großelternteil',
    generation: 0,
    side: 'gorte',
    details: ['Synthetische Design-Lab-Daten'],
  },
  {
    id: 'example-paternal-grandparent-a',
    name: 'Beispielperson C',
    role: 'Großelternteil',
    generation: 0,
    side: 'riemer',
    details: ['Synthetische Design-Lab-Daten'],
  },
  {
    id: 'example-paternal-grandparent-b',
    name: 'Beispielperson D',
    role: 'Großelternteil',
    generation: 0,
    side: 'riemer',
    details: ['Synthetische Design-Lab-Daten'],
  },
  {
    id: 'example-parent-a',
    name: 'Beispielperson E',
    role: 'Elternteil',
    generation: 1,
    side: 'bridge',
    details: ['Synthetische Design-Lab-Daten'],
  },
  {
    id: 'example-parent-b',
    name: 'Beispielperson F',
    role: 'Elternteil',
    generation: 1,
    side: 'bridge',
    details: ['Synthetische Design-Lab-Daten'],
  },
  {
    id: 'example-focus-person',
    name: 'Beispielperson G',
    role: 'Fokusperson',
    generation: 2,
    side: 'current',
    details: ['Synthetische Design-Lab-Daten'],
  },
  {
    id: 'example-partner',
    name: 'Beispielperson H',
    role: 'Partnerperson',
    generation: 2,
    side: 'partner',
    details: ['Synthetische Design-Lab-Daten'],
  },
]

export const familyEdges: FamilyEdge[] = [
  { source: 'example-maternal-grandparent-a', target: 'example-maternal-grandparent-b', type: 'spouse' },
  { source: 'example-paternal-grandparent-a', target: 'example-paternal-grandparent-b', type: 'spouse' },
  { source: 'example-parent-a', target: 'example-parent-b', type: 'spouse' },
  { source: 'example-focus-person', target: 'example-partner', type: 'partner' },
  { source: 'example-maternal-grandparent-a', target: 'example-parent-a', type: 'parent-child' },
  { source: 'example-maternal-grandparent-b', target: 'example-parent-a', type: 'parent-child' },
  { source: 'example-paternal-grandparent-a', target: 'example-parent-b', type: 'parent-child' },
  { source: 'example-paternal-grandparent-b', target: 'example-parent-b', type: 'parent-child' },
  { source: 'example-parent-a', target: 'example-focus-person', type: 'parent-child' },
  { source: 'example-parent-b', target: 'example-focus-person', type: 'parent-child' },
]

export const sideColors = {
  gorte: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400', hex: '#f59e0b' },
  riemer: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400', hex: '#06b6d4' },
  bridge: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400', hex: '#10b981' },
  current: { bg: 'bg-violet-500/10', border: 'border-violet-500/40', text: 'text-violet-400', hex: '#8b5cf6' },
  partner: { bg: 'bg-rose-500/10', border: 'border-rose-500/30', text: 'text-rose-400', hex: '#f43f5e' },
} as const
