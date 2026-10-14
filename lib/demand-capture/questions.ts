import type { PriceBand, Urgency } from './types'

/**
 * Step 2. Five questions, each one answerable in a tap except `pain`.
 * `priceBand` is the load-bearing one: PRODUCT-RELEASE-GATE G5 needs price
 * evidence, and this is the only place the estate generates it before launch.
 */

export const URGENCY: { value: Urgency; label: string }[] = [
  { value: 'now', label: 'I need this now' },
  { value: 'this-quarter', label: 'Within a few months' },
  { value: 'exploring', label: 'Just curious' },
]

export const PRICE_BANDS: { value: PriceBand; label: string }[] = [
  { value: 'free-only', label: 'Only if free' },
  { value: 'under-25', label: 'Under 25' },
  { value: '25-99', label: '25 - 99' },
  { value: '100-299', label: '100 - 299' },
  { value: '300-999', label: '300 - 999' },
  { value: 'over-1000', label: '1000+' },
  { value: 'company-pays', label: 'My company would pay' },
]

export const PAIN_PROMPT = 'What are you trying to do that this would help with?'
export const ALTERNATIVE_PROMPT = 'What do you use for this today?'
export const PRICE_PROMPT = 'What would you expect something like this to cost?'

/** Roles differ per product; a generic set is worse than none. */
export const ROLES: Record<string, string[]> = {
  default: ['Founder / solo operator', 'Engineer', 'Creator', 'Consultant', 'Team lead', 'Student'],
  'ai-architect-academy': ['Engineer', 'Architect / staff+', 'Eng manager', 'Consultant', 'Founder', 'Career switcher'],
  'arcanea-mcp': ['Agent builder', 'Indie hacker', 'Game / world dev', 'Studio', 'Hobbyist'],
  'arcanea-subscription': ['Reader', 'Worldbuilder', 'Roleplayer', 'Writer', 'Game dev'],
  'books-arcanea-legends': ['Fantasy reader', 'Writer', 'Worldbuilder', 'Came for the AI, stayed for the story'],
  'agentic-income': ['Solo operator', 'Agency owner', 'Engineer', 'Creator', 'Exploring'],
  'akamoto-prophecies': ['Reader', 'Writer', 'Worldbuilder', 'Came for the voice', 'Passing through'],
  'portfolio-architecture-audit': ['Solo operator', 'Agency / studio', 'Domain investor', 'Engineer', 'Brand lead', 'Exploring'],
  'starlight-signal': ['Head of events', 'Event ops / production', 'Marketing lead', 'Data / analytics', 'Agency running events for clients', 'Speaker or programme curator'],
}

export const rolesFor = (productId: string) => ROLES[productId] ?? ROLES.default
