/** Published event rates checked 2026-11-15. Estimates never represent a run. */
export const apifyEventRates = {
  FREE: { page: 0.00228, search: 0.00348, start: 0.000225 },
  BRONZE: { page: 0.0019, search: 0.0029, start: 0.000225 },
} as const

export function estimateApifyEvents(tier: keyof typeof apifyEventRates, pages: number, searches: number, starts: number, memoryGb: number) {
  if (![pages, searches, starts].every(n => Number.isSafeInteger(n) && n >= 0 && n <= 10000)
    || !Number.isSafeInteger(memoryGb) || memoryGb <= 0 || memoryGb > 128
    || !Object.hasOwn(apifyEventRates, tier)) return null
  const rates = apifyEventRates[tier]
  return pages * rates.page + searches * rates.search + starts * Math.max(1, memoryGb) * rates.start
}

export function estimateAcceptedCost(eventUsd: number | null, otherUsd: number | null, accepted: number) {
  if (eventUsd === null || !Number.isFinite(eventUsd) || eventUsd < 0 || otherUsd === null || !Number.isFinite(otherUsd) || otherUsd < 0
    || !Number.isSafeInteger(accepted) || accepted <= 0) return null
  return (eventUsd + otherUsd) / accepted
}
