/**
 * ACOS L99 Score — agentic catalog excellence rollup
 *
 * L99 means: every shipped agent in the catalog has all four gates lit.
 *   1. dispatchable — Task tool / Agent-tool can invoke
 *   2. tested       — has a runnable smoke eval
 *   3. composed     — referenced by its pillar's top-level orchestrator
 *   4. brand_gated  — output passes lib/voice/frankx-voice.ts (or pillar is non-emitting)
 *
 * Each gate is worth 0.25. A slot's score is the sum of lit gates.
 *   - status='gap'         → score 0 (nothing to gate)
 *   - status='in-progress' → score 0 (no agent to gate)
 *   - status='shipped'     → score 0.25–1.00 by gates
 *
 * Pillar L99 = mean slot score across its 9 specialists.
 * Total L99   = mean slot score across all 99 slots.
 *
 * Output is a number in [0, 1]; multiply by 100 to display "L<n>".
 */

import type { AgentSlot, AgentTier, Pillar } from '@/data/acos/agents'
import { enrichedSlot, PILLARS } from '@/data/acos/agents'

/** Score a single slot in [0, 1]. */
export function slotScore(slot: AgentSlot): number {
  if (slot.status !== 'shipped') return 0
  const g = slot.gates
  if (!g) return 0.25 // dispatchable inferred from status='shipped' but no audit yet
  let s = 0
  if (g.dispatchable) s += 0.25
  if (g.tested) s += 0.25
  if (g.composed) s += 0.25
  if (g.brand_gated) s += 0.25
  return s
}

export interface PillarL99 {
  id: string
  number: number
  title: string
  /** Mean score across the pillar's 9 specialists, 0–1 */
  score: number
  /** Mean as integer 0–99 — what the badge shows */
  level: number
  shipped: number
  inProgress: number
  gap: number
  tierMix: { haiku: number; sonnet: number; opus: number; unassigned: number }
}

export function pillarL99(pillar: Pillar): PillarL99 {
  let shipped = 0
  let inProgress = 0
  let gap = 0
  const tierMix = { haiku: 0, sonnet: 0, opus: 0, unassigned: 0 }
  let totalScore = 0

  for (const raw of pillar.specialists) {
    const slot = enrichedSlot(raw)
    if (slot.status === 'shipped') shipped++
    else if (slot.status === 'in-progress') inProgress++
    else gap++

    const t = slot.tier as AgentTier | undefined
    if (t === 'haiku' || t === 'sonnet' || t === 'opus') tierMix[t]++
    else tierMix.unassigned++

    totalScore += slotScore(slot)
  }

  const score = totalScore / pillar.specialists.length
  return {
    id: pillar.id,
    number: pillar.number,
    title: pillar.title,
    score,
    level: Math.floor(score * 100),
    shipped,
    inProgress,
    gap,
    tierMix,
  }
}

export interface CatalogL99 {
  /** Mean slot score across all 99 slots, 0–1 */
  score: number
  /** Integer 0–99 — the headline number */
  level: number
  total: number
  shipped: number
  inProgress: number
  gap: number
  pillars: PillarL99[]
  tierMix: { haiku: number; sonnet: number; opus: number; unassigned: number }
  /** Slots that are L99-eligible (status='shipped') but missing ≥1 gate */
  pendingGates: Array<{ ref: string; name: string; pillar: string; missing: string[] }>
}

export function catalogL99(): CatalogL99 {
  const pillars = PILLARS.map(pillarL99)
  const total = pillars.reduce((acc, p) => acc + p.shipped + p.inProgress + p.gap, 0)
  const shipped = pillars.reduce((acc, p) => acc + p.shipped, 0)
  const inProgress = pillars.reduce((acc, p) => acc + p.inProgress, 0)
  const gap = pillars.reduce((acc, p) => acc + p.gap, 0)
  const tierMix = pillars.reduce(
    (acc, p) => ({
      haiku: acc.haiku + p.tierMix.haiku,
      sonnet: acc.sonnet + p.tierMix.sonnet,
      opus: acc.opus + p.tierMix.opus,
      unassigned: acc.unassigned + p.tierMix.unassigned,
    }),
    { haiku: 0, sonnet: 0, opus: 0, unassigned: 0 },
  )

  let totalScore = 0
  const pendingGates: CatalogL99['pendingGates'] = []
  for (const p of PILLARS) {
    for (const raw of p.specialists) {
      const slot = enrichedSlot(raw)
      totalScore += slotScore(slot)
      if (slot.status === 'shipped' && slot.ref) {
        const g = slot.gates
        const missing: string[] = []
        if (!g || !g.dispatchable) missing.push('dispatchable')
        if (!g || !g.tested) missing.push('tested')
        if (!g || !g.composed) missing.push('composed')
        if (!g || !g.brand_gated) missing.push('brand_gated')
        if (missing.length) pendingGates.push({ ref: slot.ref, name: slot.name, pillar: p.title, missing })
      }
    }
  }

  const score = totalScore / total
  return {
    score,
    level: Math.floor(score * 100),
    total,
    shipped,
    inProgress,
    gap,
    pillars,
    tierMix,
    pendingGates,
  }
}

/** One-line summary string for /acos-score and CLI surfaces. */
export function l99Headline(c: CatalogL99 = catalogL99()): string {
  const tier = `H${c.tierMix.haiku}/S${c.tierMix.sonnet}/O${c.tierMix.opus}`
  return `ACOS L${c.level} · ${c.shipped} shipped · ${c.inProgress} in-progress · ${c.gap} gap · tiers ${tier} · ${c.pendingGates.length} slots awaiting gate-lit`
}
