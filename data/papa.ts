/**
 * /papa/ hub content — single source of truth.
 *
 * Slimmed 2026-05-05 — removed inheritance manifesto / 10 principles / 6 stages /
 * discipline codes / backbone / responsibility / work-money-dignity / for-the-fatherless /
 * inheritance chain / Russian heritage prose. Those came from a midnight ChatGPT brief,
 * not from family stories. Will return when family contributes real material.
 *
 * What remains: just the biographical record for Witali, used by JSON-LD on every page.
 *
 * Source spec: docs/superpowers/specs/2026-05-05-papa-hub-design.md
 */

/** Witali Riemer — biographical record (mirrors .frankx/family/witali-riemer.md) */
export const witali = {
  fullName: 'Witali Riemer',
  born: '1969-09-08',
  bornLocation: 'Pavlovka, Kazakhstan',
  died: '2018-07-09',
  diedLocation: 'Seesen, Germany',
  ageAtDeath: 48,
  parents: ['Alexander Riemer', 'Paulina Riemer (geb. Schneider)'],
  spouse: 'Dora Riemer (geb. Gorte)',
  children: ['Frank Riemer'],
  heritage: 'Wolgadeutsche / Russlanddeutsche',
  languages: ['Deutsch', 'Russisch'],
} as const
