/**
 * Tradition vocabulary — controlled list for entry frontmatter `traditions[]`
 * and canon `tradition` fields. Adding a new tradition requires updating
 * `TraditionSlug` in lib/rails/types.ts to keep types and labels in sync.
 *
 * Portable: extracts to RIS as the default tradition vocabulary, replaceable.
 */

import type { TraditionSlug } from '@/lib/rails/types';

export const traditionLabels: Record<TraditionSlug, string> = {
  'christian-mysticism': 'Christian Mysticism',
  'advaita-vedanta': 'Advaita Vedanta',
  sufism: 'Sufism',
  kabbalah: 'Kabbalah',
  'mahayana-buddhism': 'Mahayana Buddhism',
  zen: 'Zen',
  dzogchen: 'Dzogchen',
  'neville-goddard': 'Neville Goddard / Imaginal',
  'modern-physics': 'Modern Physics',
  'consciousness-science': 'Consciousness Science',
  'analytic-idealism': 'Analytic Idealism',
  'process-philosophy': 'Process Philosophy',
  'comparative-religion': 'Comparative Religion',
  'desert-fathers': 'Desert Fathers',
  hesychasm: 'Hesychasm',
  'apophatic-theology': 'Apophatic Theology',
  'volga-german-faith': 'Volga-German Faith Heritage',
};

/**
 * Display order on the canon index — groups Eastern Christian mystics first,
 * then Western Christian, then Vedantic, Sufi, Kabbalistic, Buddhist, modern
 * idealist, then physics/science. Tradition order is editorial.
 */
export const traditionDisplayOrder: TraditionSlug[] = [
  'christian-mysticism',
  'desert-fathers',
  'hesychasm',
  'apophatic-theology',
  'advaita-vedanta',
  'sufism',
  'kabbalah',
  'mahayana-buddhism',
  'zen',
  'dzogchen',
  'neville-goddard',
  'comparative-religion',
  'process-philosophy',
  'analytic-idealism',
  'consciousness-science',
  'modern-physics',
  'volga-german-faith',
];
