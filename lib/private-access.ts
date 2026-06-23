/**
 * Private-access gate for door #3 (Executive Concierge).
 *
 * Lightweight: a passcode set via env var (`PRIVATE_ACCESS_PASSCODE`).
 * If the visitor's cookie holds the passcode (or the URL carries it),
 * they're in. Otherwise they see the gate.
 *
 * This is intentionally not a full auth system. The Executive Concierge
 * door is for pre-qualified visitors who've been given the passcode via
 * Frank or a named partner. The gate is friction, not security — the
 * actual contract is the social one (the passcode arrives in an email
 * or a conversation, not from a public page).
 *
 * For door #4 (Private engagement), use bespoke signed cookies per
 * client at /partners/[slug] — separate concern.
 */

const PASSCODE = process.env.PRIVATE_ACCESS_PASSCODE
export const PRIVATE_ACCESS_COOKIE = 'fx_private_access'

export function isPasscodeConfigured(): boolean {
  return Boolean(PASSCODE)
}

export function checkPasscode(input: string | undefined | null): boolean {
  if (!PASSCODE || !input) return false
  // Constant-time-ish compare — for a passcode, length-leak is acceptable;
  // the value isn't a credential, just a friction gate.
  return input.trim() === PASSCODE
}
