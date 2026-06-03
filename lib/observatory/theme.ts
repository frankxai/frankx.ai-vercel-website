/**
 * Agent Observatory — Anthropic-inspired, FrankX-owned theme tokens.
 *
 * Warm-dark palette that bridges Anthropic's signature warmth (cream / clay /
 * kraft) with the site's dark nav + footer. No Anthropic logos/wordmarks; open
 * font equivalents used publicly (Styrene→Inter, Tiempos→Playfair/serif).
 */

import type { NodeKind, Tier } from './types'

export const palette = {
  kraft: '#181712', // near-black warm ground
  kraftSoft: '#211F18',
  kraftPanel: '#26241C',
  line: 'rgba(240,238,230,0.10)',
  lineStrong: 'rgba(240,238,230,0.18)',
  cream: '#F0EEE6', // primary text
  creamDim: '#B7B2A3', // secondary text
  creamFaint: '#7E7A6E',
  clay: '#CC785C', // Anthropic "book cloth" — primary accent
  clayBright: '#E1936F',
  clayDeep: '#A6573F',
}

/** Color per node kind. */
export const kindColor: Record<NodeKind, string> = {
  agent: '#CC785C', // clay
  skill: '#6A9FB5', // muted sky
  command: '#C7A35A', // warm gold
  workflow: '#8C9A5B', // sage
  'iam-profile': '#B07C9E', // muted plum
}

export const kindLabel: Record<NodeKind, string> = {
  agent: 'Agents',
  skill: 'Skills',
  command: 'Commands',
  workflow: 'Workflows',
  'iam-profile': 'IAM Profiles',
}

/** Color per model tier (agents). */
export const tierColor: Record<Tier, string> = {
  haiku: '#8C9A5B', // sage — fast/cheap
  sonnet: '#6A9FB5', // sky — balanced
  opus: '#CC785C', // clay — orchestrators
}

export const tierLabel: Record<Tier, string> = {
  haiku: 'Haiku · fast',
  sonnet: 'Sonnet · balanced',
  opus: 'Opus · orchestrator',
}

/** Hex → rgba helper for glows. */
export function withAlpha(hex: string, alpha: number): string {
  const h = hex.replace('#', '')
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
