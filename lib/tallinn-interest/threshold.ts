import {
  TALLINN_VALIDATION_GATE,
  tallinnExperiences,
} from '@/data/tallinn-experiences'

export interface TallinnThresholdRecord {
  normalizedEmail: string
  experienceSlug: string
  slotIds: string[]
  attendanceIntent: 'exploring' | 'likely' | 'ready-if-time-works'
  reconfirmed: boolean
}
export type TallinnThresholdState =
  | 'keep-validating'
  | 'review-venue'
  | 'session-full'

export function evaluateTallinnThreshold(
  records: readonly TallinnThresholdRecord[],
  experienceSlug: string,
  slotId: string,
): { state: TallinnThresholdState; confirmed: number } {
  const unique = new Set(
    records
      .filter(
        (record) =>
          record.experienceSlug === experienceSlug &&
          record.slotIds.includes(slotId) &&
          record.attendanceIntent === 'ready-if-time-works' &&
          record.reconfirmed,
      )
      .map((record) => record.normalizedEmail.trim().toLowerCase()),
  )

  const confirmed = unique.size
  const roomCapacityTarget =
    tallinnExperiences.find((experience) => experience.slug === experienceSlug)
      ?.roomCapacityTarget ?? TALLINN_VALIDATION_GATE.roomCapacityTarget

  if (confirmed >= roomCapacityTarget) {
    return { state: 'session-full', confirmed }
  }
  if (confirmed >= TALLINN_VALIDATION_GATE.minimumConfirmed) {
    return { state: 'review-venue', confirmed }
  }
  return { state: 'keep-validating', confirmed }
}
