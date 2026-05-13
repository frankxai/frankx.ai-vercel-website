import type { Platform, OperatorArchetype, Spectrum } from './types'

// Source of truth: data/forcing-functions.json
// Loaded at build time. The classifier reads this to bias dispatch
// during cross-reference phase.

export type ForcingFunctionKind =
  | 'workshop-delivery'
  | 'launch-deadline'
  | 'recurring-release'
  | 'recurring-content'
  | 'content-batch'

export type ForcingFunctionState = 'active' | 'planned' | 'completed' | 'cancelled'

export interface ForcingFunction {
  id: string
  label: string
  kind: ForcingFunctionKind
  date: string // YYYY-MM-DD — for recurring, the next occurrence
  recurrence?: 'weekly-friday' | 'weekly-sunday' | 'monthly' | 'quarterly'
  platforms: Platform[]
  archetype: OperatorArchetype
  spectrum: Spectrum
  state: ForcingFunctionState
  biasInstruction: string
}

import forcingFunctionsData from '../../data/forcing-functions.json'

export const forcingFunctions: ForcingFunction[] = forcingFunctionsData.functions as ForcingFunction[]

/**
 * Returns active forcing functions ordered by closest date first.
 */
export function activeForcingFunctions(): ForcingFunction[] {
  return forcingFunctions
    .filter((f) => f.state === 'active' || f.state === 'planned')
    .sort((a, b) => a.date.localeCompare(b.date))
}

/**
 * Returns forcing functions within `daysFromNow` days of `referenceDate`
 * (default today). Used by classifier to find "what's about to fire".
 */
export function forcingFunctionsInWindow(
  daysFromNow: number,
  referenceDate: Date = new Date(),
): ForcingFunction[] {
  const cutoff = new Date(referenceDate)
  cutoff.setUTCDate(cutoff.getUTCDate() + daysFromNow)
  const cutoffStr = cutoff.toISOString().slice(0, 10)
  const refStr = referenceDate.toISOString().slice(0, 10)
  return activeForcingFunctions().filter((f) => f.date >= refStr && f.date <= cutoffStr)
}

/**
 * Returns forcing functions matching a platform.
 * Used by producers to check "is there a forcing function for my target platform?"
 */
export function forcingFunctionsForPlatform(platform: Platform): ForcingFunction[] {
  return activeForcingFunctions().filter((f) => f.platforms.includes(platform))
}

/**
 * Returns the most urgent forcing function for a given archetype, or null.
 * Most urgent = closest active or planned date.
 */
export function mostUrgentForArchetype(
  archetype: OperatorArchetype,
): ForcingFunction | null {
  const matches = activeForcingFunctions().filter((f) => f.archetype === archetype)
  return matches[0] ?? null
}

/**
 * Days until a forcing function fires (negative if past).
 */
export function daysUntil(forcingFunction: ForcingFunction, referenceDate: Date = new Date()): number {
  const ff = new Date(forcingFunction.date + 'T00:00:00Z')
  const ref = new Date(referenceDate.toISOString().slice(0, 10) + 'T00:00:00Z')
  return Math.round((ff.getTime() - ref.getTime()) / (1000 * 60 * 60 * 24))
}
