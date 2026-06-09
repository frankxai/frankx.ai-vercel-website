/**
 * Agent Observatory — theme tokens.
 *
 * Built on Anthropic's official brand palette (Dark #141413, Light #faf9f5,
 * Mid/Light gray, accents Orange #d97757 / Blue #6a9bcc / Green #788c5d) and
 * type system (Poppins headings, Lora body). FrankX-owned surface; no Anthropic
 * logos/wordmarks shipped, open-font equivalents used publicly.
 */

import type { NodeKind, Tier } from './types'

export const palette = {
  // Anthropic neutrals → warm-dark ground
  ink: '#141413', // Anthropic Dark — ground
  inkSoft: '#1d1c1a',
  panel: '#232220',
  panelHi: '#2b2926',
  line: 'rgba(250,249,245,0.09)',
  lineStrong: 'rgba(250,249,245,0.16)',
  light: '#faf9f5', // Anthropic Light — primary text
  midGray: '#b0aea5', // Anthropic Mid Gray — secondary text
  faint: '#7c7a72',
  lightGray: '#e8e6dc',
  // Accents (official)
  orange: '#d97757',
  orangeBright: '#e89478',
  orangeDeep: '#b65b3e',
  blue: '#6a9bcc',
  green: '#788c5d',
  // Derived muted tints for the two extra node kinds (kept earthy/on-brand)
  gold: '#c79a52',
  plum: '#a87c9f',
}

/** Color per node kind. */
export const kindColor: Record<NodeKind, string> = {
  agent: palette.orange,
  skill: palette.blue,
  command: palette.gold,
  workflow: palette.green,
  'iam-profile': palette.plum,
}

export const kindLabel: Record<NodeKind, string> = {
  agent: 'Agents',
  skill: 'Skills',
  command: 'Commands',
  workflow: 'Workflows',
  'iam-profile': 'IAM Profiles',
}

/** Color per model tier — escalating warmth (cheap→green, balanced→blue, orchestrator→orange). */
export const tierColor: Record<Tier, string> = {
  haiku: palette.green,
  sonnet: palette.blue,
  opus: palette.orange,
}

export const tierLabel: Record<Tier, string> = {
  haiku: 'Haiku · fast',
  sonnet: 'Sonnet · balanced',
  opus: 'Opus · orchestrator',
}

/** Hex → rgba helper for glows/tints. */
export function withAlpha(hex: string, alpha: number): string {
  const h = hex.replace('#', '')
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
