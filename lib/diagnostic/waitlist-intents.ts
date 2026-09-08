// Waitlist intents.
//
// /waitlist?intent=<id> is the only paid destination the diagnostic can produce, so an
// intent the page cannot resolve is a silent dead end: the visitor lands on a generic form
// with no sign it received what they clicked, and the signup is written to whatever list the
// page happened to hardcode. Keeping the registry here rather than inline in the page lets
// the contract test assert that every id the graph can route to carries both a label and the
// list its signups belong on.
//
// Ids are the `registryId` of a product node, which is also the row id in
// starlight/graph/products.graph.json; `listType` mirrors that row's `listType` field, so a
// creative-ai-toolkit lead is written to premium-packs and never to the courses list.
// Course ids predate the graph and are kept because existing links use them.

/** Subset of the subscribe route's LIST_CONFIG keys that a waitlist intent may target. */
export type WaitlistListType = 'premium-packs' | 'creation-chronicles' | 'courses-waitlist'

export interface WaitlistIntent {
  label: string
  /** Mirrors the registry row's listType. Must exist in the subscribe route's LIST_CONFIG. */
  listType: WaitlistListType
}

export const WAITLIST_INTENTS: Record<string, WaitlistIntent> = {
  // Product rows in the knowledge-to-offer graph.
  'creative-ai-toolkit': { label: 'Creative AI Toolkit', listType: 'premium-packs' },
  'creation-chronicles': { label: 'Creation Chronicles', listType: 'creation-chronicles' },
  // Pre-existing course intents.
  'course-conscious-ai-foundations': {
    label: 'Conscious AI Foundations',
    listType: 'courses-waitlist',
  },
  'course-agent-architecture-systems': {
    label: 'Agent Architecture Systems',
    listType: 'courses-waitlist',
  },
  'course-creator-business-systems': {
    label: 'Creator Business Systems',
    listType: 'courses-waitlist',
  },
}

export const WAITLIST_INTENT_LABELS: Record<string, string> = Object.fromEntries(
  Object.entries(WAITLIST_INTENTS).map(([id, intent]) => [id, intent.label]),
)

/**
 * Attribution for an intent the registry does not know — /checkout/[slug] sends product
 * slugs that predate this registry. Those get no label and no dedicated list, but the slug
 * is still recorded, because an unattributed signup is a lost signal that cannot be
 * recovered later. Shape-checked rather than trusted: it is written to a contact property.
 */
export function sanitizeIntent(value: unknown): string {
  const intent = typeof value === 'string' ? value.trim() : ''
  return /^[a-z0-9][a-z0-9-]{0,63}$/.test(intent) ? intent : ''
}

/** The list a signup lands on. Falls back to the generic waitlist for an unknown intent. */
export function listTypeForIntent(intent: string | undefined): WaitlistListType {
  return (intent && WAITLIST_INTENTS[intent]?.listType) || 'courses-waitlist'
}
