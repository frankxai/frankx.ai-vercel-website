/** Pure validation helpers. Never log financial payloads or read environment values here. */
export interface WealthData {
  netWorth: { current: number; history: { date: string; amount: number }[] }
  fireTarget: { annualExpenses: number; multiple: number; target: number; currentProgress: number; progressPercent: number }
  propertyTargets: { id: string; type: string; targetArea: string; budgetRange: { min: number; max: number }; targetTimeline: string; status: string; notes: string }[]
  propertyWatchlist: { area: string; avgPriceM2: number; trend: string }[]
  taxStrategy: Record<string, string>
  income: Record<string, number | string | null>
  expenses: { monthly: Record<string, number | null> }
}

function record(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}
const finite = (value: unknown): value is number => typeof value === 'number' && Number.isFinite(value)
const text = (value: unknown): value is string => typeof value === 'string'

export function isWealthAdmin(session: unknown, adminEmail: string | undefined): boolean {
  if (!adminEmail?.trim() || !record(session) || !record(session.user)) return false
  return typeof session.user.email === 'string' && session.user.email === adminEmail
}

/** Missing, oversized, syntactically invalid and structurally invalid values all fail closed. */
export function parseWealthData(raw: string | undefined): WealthData | null {
  if (!raw || raw.length > 256_000) return null
  let value: unknown
  try { value = JSON.parse(raw) } catch { return null }
  if (!record(value)) return null
  const { netWorth, fireTarget, propertyTargets, propertyWatchlist, taxStrategy, income, expenses } = value
  if (!record(netWorth) || !finite(netWorth.current) || !Array.isArray(netWorth.history)
    || !netWorth.history.every(row => record(row) && text(row.date) && finite(row.amount))) return null
  if (!record(fireTarget) || !['annualExpenses', 'multiple', 'target', 'currentProgress', 'progressPercent'].every(key => finite(fireTarget[key]))) return null
  if (!Array.isArray(propertyTargets) || !propertyTargets.every(row => record(row)
    && ['id', 'type', 'targetArea', 'targetTimeline', 'status', 'notes'].every(key => text(row[key]))
    && record(row.budgetRange) && finite(row.budgetRange.min) && finite(row.budgetRange.max))) return null
  if (!Array.isArray(propertyWatchlist) || !propertyWatchlist.every(row => record(row)
    && text(row.area) && finite(row.avgPriceM2) && text(row.trend))) return null
  if (!record(taxStrategy) || !Object.values(taxStrategy).every(text)) return null
  if (!record(income) || !Object.values(income).every(item => item === null || text(item) || finite(item))) return null
  if (!record(expenses) || !record(expenses.monthly)
    || !Object.values(expenses.monthly).every(item => item === null || finite(item))) return null
  return value as unknown as WealthData
}
