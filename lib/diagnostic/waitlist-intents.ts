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
  // Product launch lists linked from their existing product pages.
  'bv-kit': { label: 'Creator BV Kit', listType: 'premium-packs' },
  'prompt-vault': { label: 'Prompt Vault', listType: 'premium-packs' },
  // Launch lists for products whose checkout or download is not open yet.
  'starter-kit': { label: 'System Architect Starter Kit', listType: 'premium-packs' },
  'visual-creation-loop': { label: 'Visual Creation Loop', listType: 'premium-packs' },
  'income-blueprint': { label: 'Income Architecture Blueprint', listType: 'premium-packs' },
  'dpi-field-kit': { label: 'DPI Field Kit: Wealth Substrate Pro', listType: 'premium-packs' },
  'agent-fleet-pro': { label: 'Agent Fleet Pro: Turnkey Multi-Agent Mesh', listType: 'premium-packs' },
  'memory-palace-os': { label: 'The Sovereign Memory Palace OS', listType: 'premium-packs' },
  'agentic-media-machine': { label: 'The Agentic Media Machine', listType: 'premium-packs' },
  'starlight-operator-pack': { label: 'Starlight Operator Field Kit & Council Harness', listType: 'premium-packs' },
  'stream-atlas': { label: 'The 12-Stream Atlas: Honest Stream Engineering', listType: 'premium-packs' },
  'anti-slop-matrix': { label: 'The Anti-Slop Content Matrix', listType: 'premium-packs' },
  'capability-audit': { label: 'The Capability-to-Cash Inventory Audit', listType: 'premium-packs' },
  'stream-taxonomy': { label: 'The DPI Stream Taxonomy & Progression Map', listType: 'premium-packs' },
  'starlight-spec': { label: 'Starlight Intelligence Protocol (SIP v1.1.1) Spec', listType: 'premium-packs' },
  'mythic-codex': { label: 'The Arcanea Mythic Codex', listType: 'premium-packs' },
  'suno-prompt-library': { label: 'Suno Prompt Library Pack', listType: 'premium-packs' },
  '5-suno-prompts': { label: '5 Suno Prompts', listType: 'premium-packs' },
  'vibe-os': { label: 'Vibe OS: Creative State Management', listType: 'premium-packs' },
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

/** Launch-list intents the /waitlist page routes through this registry (product-launch flow). */
export const LAUNCH_LIST_INTENTS: ReadonlySet<string> = new Set([
  'bv-kit',
  'prompt-vault',
  'starter-kit',
  'visual-creation-loop',
  'income-blueprint',
  'dpi-field-kit',
  'agent-fleet-pro',
  'memory-palace-os',
  'agentic-media-machine',
  'starlight-operator-pack',
  'stream-atlas',
  'anti-slop-matrix',
  'capability-audit',
  'stream-taxonomy',
  'starlight-spec',
  'mythic-codex',
  'suno-prompt-library',
  '5-suno-prompts',
  'vibe-os',
  'creation-chronicles',
])

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
