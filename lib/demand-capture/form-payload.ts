/**
 * What the form sends, kept out of the component so the two-step contract is testable
 * without a browser. The API only sees its own URL, so the landing page's utm_* params
 * travel in the body; the handler sanitises them again.
 */

const MAX_UTM = 8

export function landingUtm(search: string): Record<string, string> | undefined {
  const entries = [...new URLSearchParams(search).entries()].filter(([k, v]) => k.startsWith('utm_') && v)
  return entries.length ? Object.fromEntries(entries.slice(0, MAX_UTM)) : undefined
}

export function joinPayload(input: {
  productId: string
  email: string
  consent: boolean
  pathname: string
  search: string
}): Record<string, unknown> {
  const utm = landingUtm(input.search)
  return {
    productId: input.productId,
    email: input.email,
    consent: input.consent,
    source: input.pathname,
    ...(utm ? { utm } : {}),
  }
}

/**
 * Step 2 only refines the signal step 1 stored, so it carries the address that joined,
 * never whatever the input holds now, and says so with step: 'refine'.
 */
export function refinePayload(input: {
  productId: string
  joinedEmail: string
  answers: Record<string, string>
}): Record<string, unknown> {
  return { ...input.answers, productId: input.productId, email: input.joinedEmail, consent: true, step: 'refine' }
}
