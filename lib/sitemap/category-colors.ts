// Maps registry categories → brand-DNA accent colors per data/brand-visual-dna.json

const ACCENT = {
  emerald: '#10B981', // ACOS, GenCreator, primary CTA, success
  violet: '#7C3AED', // SIS, Starlight Intelligence, premium
  cyan: '#06B6D4', // Technology, AI Architecture, links
  amber: '#F59E0B', // Arcanea, creative worlds, gold tier
  orange: '#F97316', // Music Lab, energy, warmth
  blue: '#3B82F6', // Enterprise AI, Oracle-adjacent, trust
  fuchsia: '#D946EF', // Design Lab, visual experiments
  rose: '#F43F5E',
  teal: '#14B8A6',
  slate: '#64748B',
} as const

/**
 * Maps category strings to brand accent colors. Falls back to slate.
 * Keep this list in sync with directory categories in data/visual-registry.json
 * and section mappings in data/brand-visual-dna.json.
 */
export const CATEGORY_COLORS: Record<string, string> = {
  // ACOS family — emerald
  acos: ACCENT.emerald,
  agents: ACCENT.emerald,
  'agent-team': ACCENT.emerald,
  gencreator: ACCENT.emerald,
  ecosystem: ACCENT.emerald,

  // SIS / Starlight — violet
  'starlight-intelligence-system': ACCENT.violet,
  starlight: ACCENT.violet,
  'golden-age': ACCENT.violet,
  consciousness: ACCENT.violet,
  soulbook: ACCENT.violet,

  // AI / Tech — cyan
  'ai-architecture': ACCENT.cyan,
  'ai-art': ACCENT.cyan,
  'ai-world': ACCENT.cyan,
  architectures: ACCENT.cyan,
  blog: ACCENT.cyan,
  diagrams: ACCENT.cyan,
  research: ACCENT.cyan,
  infographics: ACCENT.cyan,

  // Arcanea / Creative — amber
  arcanea: ACCENT.amber,
  mascot: ACCENT.amber,
  'fire-horse': ACCENT.amber,
  alea: ACCENT.amber,
  hoffnung: ACCENT.amber,

  // Music — orange
  music: ACCENT.orange,
  suno: ACCENT.orange,
  'music-lab': ACCENT.orange,

  // Enterprise / Oracle — blue
  oracle: ACCENT.blue,
  'oracle-events': ACCENT.blue,
  enterprise: ACCENT.blue,
  'coe-hub': ACCENT.blue,

  // Design / Visual — fuchsia
  'design-lab': ACCENT.fuchsia,
  brand: ACCENT.fuchsia,
  brands: ACCENT.fuchsia,
  gallery: ACCENT.fuchsia,
  logos: ACCENT.fuchsia,
  models: ACCENT.fuchsia,

  // People / community — teal
  team: ACCENT.teal,
  newsletter: ACCENT.teal,
  workshops: ACCENT.teal,
  community: ACCENT.teal,

  // Books — rose
  books: ACCENT.rose,
  library: ACCENT.rose,
  courses: ACCENT.rose,

  // Funnel / build — emerald (CTA family)
  build: ACCENT.emerald,
  'founders-circle': ACCENT.emerald,
  'start-here': ACCENT.emerald,

  // Misc / fallbacks
  general: ACCENT.slate,
  valentines: ACCENT.fuchsia,
  'See-through-the-noise': ACCENT.violet,
  'priority-2026-04-25': ACCENT.cyan,
  presets: ACCENT.cyan,
  sis: ACCENT.violet,
}

export function colorForCategory(category: string): string {
  return CATEGORY_COLORS[category] || ACCENT.slate
}

export function categoryLabel(category: string): string {
  return category
    .split(/[-_]/g)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}
