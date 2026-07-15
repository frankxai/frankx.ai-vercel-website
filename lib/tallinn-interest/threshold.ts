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
): { state: TallinnThresholdState; confirmed: number; standby: number } {
  const intentByEmail = new Map<string, TallinnThresholdRecord['attendanceIntent']>()
  for (const record of records) {
    if (
      record.experienceSlug !== experienceSlug ||
      !record.slotIds.includes(slotId) ||
      !record.reconfirmed
    ) {
      continue
    }

    const email = record.normalizedEmail.trim().toLowerCase()
    const currentIntent = intentByEmail.get(email)
    if (
      record.attendanceIntent === 'ready-if-time-works' ||
      (record.attendanceIntent === 'likely' && currentIntent === 'exploring') ||
      !currentIntent
    ) {
      intentByEmail.set(email, record.attendanceIntent)
    }
  }

  const confirmed = [...intentByEmail.values()].filter(
    (intent) => intent === 'ready-if-time-works',
  ).length
  const standby = [...intentByEmail.values()].filter(
    (intent) => intent === 'likely',
  ).length
  const roomCapacityTarget =
    tallinnExperiences.find((experience) => experience.slug === experienceSlug)
      ?.roomCapacityTarget ?? TALLINN_VALIDATION_GATE.roomCapacityTarget

  if (confirmed >= roomCapacityTarget) {
    return { state: 'session-full', confirmed, standby }
  }
  if (
    confirmed >= TALLINN_VALIDATION_GATE.minimumConfirmed &&
    standby >= TALLINN_VALIDATION_GATE.standbyTarget
  ) {
    return { state: 'review-venue', confirmed, standby }
  }
  return { state: 'keep-validating', confirmed, standby }
}
