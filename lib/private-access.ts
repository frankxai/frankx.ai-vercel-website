/**
 * Private-access gate for door #3 (Strategic Advisor).
 *
 * Lightweight: a passcode set via env var (`PRIVATE_ACCESS_PASSCODE`).
 * Visitors POST the passcode to /api/private-access, which sets a signed
 * cookie; subsequent requests to /engagements/strategic-advisor read the
 * cookie. The URL-param flow is reserved for door #4 and not implemented here.
 *
 * This is intentionally not a full auth system. The Strategic Advisor door
 * is for pre-qualified visitors who've been given the passcode via Frank or
 * a named partner. The gate is friction, not security — the actual contract
 * is the social one (the passcode arrives in an email or a conversation, not
 * from a public page).
 *
 * For door #4 (private engagement), use bespoke signed cookies per client at
 * /partners/[slug] — separate concern.
 */

// Trim once at load so a passcode env accidentally set with surrounding
// whitespace (a common ops mistake in env-var UIs) doesn't make the gate
// impossible to pass even with the "right" code.
const PASSCODE = process.env.PRIVATE_ACCESS_PASSCODE?.trim() || undefined
export const PRIVATE_ACCESS_COOKIE = 'fx_private_access'

export function isPasscodeConfigured(): boolean {
  return Boolean(PASSCODE)
}

export function checkPasscode(input: string | undefined | null): boolean {
  if (!PASSCODE || !input) return false
  // Plain `===` compare. Not constant-time — that would be misleading to claim,
  // and the passcode is friction (the security model is the social contract by
  // which it's shared), not a credential whose timing must not leak.
  return input.trim() === PASSCODE
}
