/** One opt-in, device-local report. No account, cookies or network access. */
export const REVIEW_STORAGE_KEY = 'frankx:architecture-review:v1'
const MAX_REPORT_LENGTH = 65_536

type ReviewStorage = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>
export type SavedReview = { version: 1; report: string; savedAt: string }
export type ReviewLoadResult =
  | { status: 'saved'; review: SavedReview }
  | { status: 'empty' | 'unavailable' | 'invalid' }

function validReview(value: unknown): value is SavedReview {
  if (!value || typeof value !== 'object') return false
  const candidate = value as Partial<SavedReview>
  return candidate.version === 1 &&
    typeof candidate.report === 'string' && candidate.report.trim().length > 0 &&
    candidate.report.length <= MAX_REPORT_LENGTH &&
    typeof candidate.savedAt === 'string' &&
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(candidate.savedAt) &&
    Number.isFinite(Date.parse(candidate.savedAt)) &&
    new Date(candidate.savedAt).toISOString() === candidate.savedAt
}

export function loadReview(storage: ReviewStorage): ReviewLoadResult {
  let raw: string | null
  try { raw = storage.getItem(REVIEW_STORAGE_KEY) } catch { return { status: 'unavailable' } }
  if (raw === null) return { status: 'empty' }
  // Bound parsing of local data, including records written by older builds.
  if (raw.length > MAX_REPORT_LENGTH * 6 + 1024) return { status: 'invalid' }
  try {
    const review: unknown = JSON.parse(raw)
    return validReview(review) ? { status: 'saved', review } : { status: 'invalid' }
  } catch { return { status: 'invalid' } }
}

export function saveReview(storage: ReviewStorage, report: string, savedAt: string): ReviewLoadResult {
  const review = { version: 1, report, savedAt }
  if (!validReview(review)) return { status: 'invalid' }
  try {
    storage.setItem(REVIEW_STORAGE_KEY, JSON.stringify(review))
    // Do not claim success when an unavailable store silently refuses writes.
    const loaded = loadReview(storage)
    return loaded.status === 'saved' && loaded.review.report === report && loaded.review.savedAt === savedAt
      ? loaded : { status: 'unavailable' }
  } catch { return { status: 'unavailable' } }
}

export function removeReview(storage: ReviewStorage): boolean {
  try {
    storage.removeItem(REVIEW_STORAGE_KEY)
    return storage.getItem(REVIEW_STORAGE_KEY) === null
  } catch { return false }
}
