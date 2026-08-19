/**
 * Founder Signal Scan — diagnostic model.
 *
 * Four dimensions of what makes a founder irreplaceable, and where a generic AI
 * stack flattens each one. Scoring is deliberately transparent: the reader can
 * reconstruct their own number, which is the point of a sovereign system.
 */

export type DimensionId = 'origin' | 'judgment' | 'voice' | 'compounding'

export type ScanQuestion = {
  id: string
  statement: string
}

export type ScanDimension = {
  id: DimensionId
  name: string
  premise: string
  /** What a generic AI stack does to this dimension when it is weak. */
  failure: string
  questions: readonly ScanQuestion[]
}

export const SCALE = [
  { value: 0, label: 'Never' },
  { value: 1, label: 'Rarely' },
  { value: 2, label: 'Sometimes' },
  { value: 3, label: 'Mostly' },
  { value: 4, label: 'Always' },
] as const

export const DIMENSIONS: readonly ScanDimension[] = [
  {
    id: 'origin',
    name: 'Origin',
    premise: 'The specific history that makes your position earned rather than claimed.',
    failure:
      'Without a recorded origin, every model writing in your name reaches for the category story instead of yours. You become interchangeable with anyone who read the same books.',
    questions: [
      {
        id: 'origin-1',
        statement:
          'The story that explains why you do this work exists in writing you could hand to someone today.',
      },
      {
        id: 'origin-2',
        statement:
          'Someone on your team could name the three beliefs you will not trade away for a deal.',
      },
      {
        id: 'origin-3',
        statement:
          'Your strongest material comes from what you lived through, not from what you researched.',
      },
    ],
  },
  {
    id: 'judgment',
    name: 'Judgment',
    premise: 'The decision rules that produce your calls, separate from the calls themselves.',
    failure:
      'Judgment that lives only in your head cannot be delegated to a person or a model. Every piece of work routes back through you, and the business stops scaling at your calendar.',
    questions: [
      {
        id: 'judgment-1',
        statement:
          'When you turn work down, the reason follows a rule you could state out loud.',
      },
      {
        id: 'judgment-2',
        statement:
          'Your team can predict your answer on a hard call without asking you first.',
      },
      {
        id: 'judgment-3',
        statement:
          'The reasoning behind your last major positioning change is written down, not just remembered.',
      },
    ],
  },
  {
    id: 'voice',
    name: 'Voice',
    premise: 'The actual language, not a description of the tone.',
    failure:
      'A tone-of-voice document produces an average. Your real phrasing gets smoothed into the median of everything the model has read, and your audience feels the swap before they can name it.',
    questions: [
      {
        id: 'voice-1',
        statement:
          'You can tell within one sentence whether a draft was written by you or merely about you.',
      },
      {
        id: 'voice-2',
        statement:
          'The words you use for your own method are yours, not the category standard.',
      },
      {
        id: 'voice-3',
        statement:
          'Work published in your name still carries your phrasing rather than a smoothed equivalent.',
      },
    ],
  },
  {
    id: 'compounding',
    name: 'Compounding',
    premise: 'Whether what the audience does changes what the system knows.',
    failure:
      'Without a feedback path, every campaign starts from zero. You publish more and learn nothing, and the tenth month of output is no sharper than the first.',
    questions: [
      {
        id: 'compounding-1',
        statement:
          'Objections you hear on calls visibly change what you publish next.',
      },
      {
        id: 'compounding-2',
        statement:
          'You keep a record of which specific claims move people and which land flat.',
      },
      {
        id: 'compounding-3',
        statement:
          'Your AI tools begin a session already knowing what happened in the previous one.',
      },
    ],
  },
] as const

export const MAX_PER_DIMENSION = 12
export const MAX_TOTAL = MAX_PER_DIMENSION * DIMENSIONS.length

export type Band = {
  id: 'fragile' | 'partial' | 'durable' | 'sovereign'
  name: string
  /** Inclusive lower bound as a percentage of MAX_TOTAL. */
  floor: number
  verdict: string
}

export const BANDS: readonly Band[] = [
  {
    id: 'fragile',
    name: 'Fragile',
    floor: 0,
    verdict:
      'Almost everything that makes you worth hiring is undocumented. Scaling with AI from here does not multiply you, it replaces you with a competent average.',
  },
  {
    id: 'partial',
    name: 'Partial',
    floor: 41,
    verdict:
      'Some of your signal is captured and some of it only exists in your head. The captured half will compound. The rest will quietly drift toward the category default.',
  },
  {
    id: 'durable',
    name: 'Durable',
    floor: 66,
    verdict:
      'Your signal survives delegation in most places. The remaining gap is where the work still stalls on your availability rather than your judgment.',
  },
  {
    id: 'sovereign',
    name: 'Sovereign',
    floor: 86,
    verdict:
      'Your authority is genuinely owned rather than performed. The work now is protecting that as volume increases, because drift arrives through scale, not neglect.',
  },
] as const

export type DimensionScore = {
  dimension: ScanDimension
  raw: number
  percent: number
}

export type ScanResult = {
  total: number
  percent: number
  band: Band
  dimensions: DimensionScore[]
  weakest: DimensionScore
  strongest: DimensionScore
}

export function scoreScan(answers: Record<string, number>): ScanResult {
  const dimensions: DimensionScore[] = DIMENSIONS.map((dimension) => {
    const raw = dimension.questions.reduce(
      (sum, question) => sum + (answers[question.id] ?? 0),
      0
    )
    return {
      dimension,
      raw,
      percent: Math.round((raw / MAX_PER_DIMENSION) * 100),
    }
  })

  const total = dimensions.reduce((sum, entry) => sum + entry.raw, 0)
  const percent = Math.round((total / MAX_TOTAL) * 100)

  // Ties resolve to the earlier dimension, which follows the order a founder
  // has to fix them in: you cannot model judgment before origin is recorded.
  const weakest = dimensions.reduce((low, entry) =>
    entry.raw < low.raw ? entry : low
  )
  const strongest = dimensions.reduce((high, entry) =>
    entry.raw > high.raw ? entry : high
  )

  const band = [...BANDS].reverse().find((entry) => percent >= entry.floor) ?? BANDS[0]

  return { total, percent, band, dimensions, weakest, strongest }
}

export const TOTAL_QUESTIONS = DIMENSIONS.reduce(
  (sum, dimension) => sum + dimension.questions.length,
  0
)

/**
 * The scan and the application form are separate islands on a static page, so
 * the reading travels between them through session storage rather than shared
 * React state. Session-scoped on purpose: a reading is context for one visit,
 * not a profile worth persisting.
 */
const SCAN_STORAGE_KEY = 'frankx.founder-signal.scan'

export type StoredScan = { percent: number; band: string }

export function storeScan(result: ScanResult): void {
  try {
    sessionStorage.setItem(
      SCAN_STORAGE_KEY,
      JSON.stringify({ percent: result.percent, band: result.band.name })
    )
  } catch {
    // Private-mode or storage-disabled browsers just lose the handoff.
  }
}

export function readStoredScan(): StoredScan | null {
  try {
    const raw = sessionStorage.getItem(SCAN_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<StoredScan>
    if (typeof parsed.percent !== 'number' || typeof parsed.band !== 'string') {
      return null
    }
    return { percent: parsed.percent, band: parsed.band }
  } catch {
    return null
  }
}

export function clearStoredScan(): void {
  try {
    sessionStorage.removeItem(SCAN_STORAGE_KEY)
  } catch {
    // Private-mode or storage-disabled browsers just skip the clear.
  }
}
