/**
 * Cross-tag decision matrix from the original handoff §1.
 *
 * Every entry has ONE canonical hub (where its center of gravity lives) and
 * 1-3 cross-tagged hubs (where it should appear in the index). This matrix is
 * the editorial guide for which hub gets canonical ownership.
 */

import type { CrossTagRule } from '@/lib/rails/types';

export const crossTagRules: CrossTagRule[] = [
  {
    centerOfGravity: 'The nature of the divine, named traditions on God, theological argument',
    canonicalHub: 'god',
    example: "Eckhart's Eye Through Which",
  },
  {
    centerOfGravity: 'The structure of what exists, ontology, physics-meets-philosophy',
    canonicalHub: 'reality',
    example: "On Bohm's Implicate Order",
  },
  {
    centerOfGravity: 'Mind, awareness, perception, neuroscience, non-dual recognition',
    canonicalHub: 'consciousness',
    example: 'Penrose-Hameroff Orch OR',
  },
  {
    centerOfGravity: 'Practice, lived walk, doubt, surrender, prayer, meditation as discipline',
    canonicalHub: 'faith',
    example: 'On the Jesus Prayer and Hesychast Breathwork',
  },
];
