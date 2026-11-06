// Runtime check and display helpers for data/proof/claims.json.
// The file is written by a private ledger. The page renders it as-is and
// never edits numbers, so this module only checks shape and maps labels.

export type ProofClaim = {
  id: string
  text: string
  scope: string
  as_of: string
  method: string
  source: string
}

export type ProofLedger = {
  schema_version: 1
  generated_at: string
  does_not_claim: string[]
  claims: ProofClaim[]
}

export type ProofLedgerResult =
  | { ok: true; ledger: ProofLedger }
  | { ok: false; reason: string }

export const SUPPORTED_SCHEMA_VERSION = 1

const SCOPE_LABELS: Record<string, string> = {
  'codex-cli-local': 'Codex CLI, one machine',
  'chatgpt-account-export': 'ChatGPT account export',
  'codex-cloud': 'Codex cloud tasks',
  'claude-code-usage': 'Claude Code usage',
  'github-reviews': 'GitHub reviews',
  'other-stated': 'As stated',
}

const CLAIM_FIELDS = ['id', 'text', 'scope', 'as_of', 'method', 'source'] as const
const DATE_ONLY_RE = /^\d{4}-\d{2}-\d{2}$/

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

/** Unknown scope values fall back to the raw value instead of failing. */
export function scopeLabel(scope: string): string {
  return Object.prototype.hasOwnProperty.call(SCOPE_LABELS, scope) ? SCOPE_LABELS[scope] : scope
}

export function parseProofLedger(raw: unknown): ProofLedgerResult {
  if (!isRecord(raw)) return { ok: false, reason: 'The ledger file is not a JSON object.' }

  if (raw.schema_version !== SUPPORTED_SCHEMA_VERSION) {
    return {
      ok: false,
      reason: `The ledger uses schema version ${JSON.stringify(raw.schema_version ?? null)}; this page reads version ${SUPPORTED_SCHEMA_VERSION}.`,
    }
  }

  if (!isNonEmptyString(raw.generated_at) || Number.isNaN(Date.parse(raw.generated_at))) {
    return { ok: false, reason: 'The ledger has no valid generated_at timestamp.' }
  }

  if (!Array.isArray(raw.does_not_claim) || !raw.does_not_claim.every(isNonEmptyString)) {
    return { ok: false, reason: 'does_not_claim must be a list of text entries.' }
  }

  if (!Array.isArray(raw.claims)) return { ok: false, reason: 'claims must be a list.' }

  const claims: ProofClaim[] = []
  for (const [index, entry] of raw.claims.entries()) {
    if (!isRecord(entry)) return { ok: false, reason: `Claim ${index + 1} is not an object.` }
    for (const field of CLAIM_FIELDS) {
      if (!isNonEmptyString(entry[field])) {
        return { ok: false, reason: `Claim ${index + 1} is missing ${field}.` }
      }
    }
    const asOf = entry.as_of as string
    if (!DATE_ONLY_RE.test(asOf) || Number.isNaN(Date.parse(`${asOf}T00:00:00Z`))) {
      return { ok: false, reason: `Claim ${index + 1} has an as_of date that is not YYYY-MM-DD.` }
    }
    claims.push({
      id: entry.id as string,
      text: entry.text as string,
      scope: entry.scope as string,
      as_of: entry.as_of as string,
      method: entry.method as string,
      source: entry.source as string,
    })
  }

  return {
    ok: true,
    ledger: {
      schema_version: SUPPORTED_SCHEMA_VERSION,
      generated_at: raw.generated_at,
      does_not_claim: [...raw.does_not_claim],
      claims,
    },
  }
}

/** "22 October 2026, 20:06 UTC" — fixed to UTC so server and reader agree. */
export function formatLedgerTimestamp(iso: string): string {
  const date = new Date(iso)
  const day = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(date)
  const time = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'UTC' }).format(date)
  return `${day}, ${time} UTC`
}

/** "2026-10-22" → "22 October 2026", read as a calendar date with no time zone shift. */
export function formatAsOfDate(dateOnly: string): string {
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(
    new Date(`${dateOnly}T00:00:00Z`),
  )
}
