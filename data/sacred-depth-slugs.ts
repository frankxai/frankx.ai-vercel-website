/**
 * Slugs that have a sourced depth record in data/sacred-depth.json.
 * This list is the only depth signal client routes may import.
 * The JSON corpus stays on server pages.
 */
export const SACRED_DEPTH_REVISED = "2026-10-02";

export const SACRED_DEPTH_SLUGS = [
  'analects',
  'avesta',
  'bhagavad-gita',
  'bible',
  'dhammapada',
  'guru-granth-sahib',
  'heart-sutra',
  'kitab-i-aqdas',
  'quran',
  'tanakh',
  'tao-te-ching',
  'tattvartha-sutra',
  'upanishads',
  'vijnana-bhairava-tantra',
  'yoga-sutras',
  'zhuangzi',
] as const;

const sacredDepthSlugSet = new Set<string>(SACRED_DEPTH_SLUGS);

export function hasSacredDepth(slug: string): boolean {
  return sacredDepthSlugSet.has(slug);
}
