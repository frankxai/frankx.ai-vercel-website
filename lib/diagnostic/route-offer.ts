// Ceiling -> offer routing for the Operator Scorecard.
//
// This replaces the previous tier -> CTA table, which sent the two highest tiers to
// /workshops/personal-ai-coe ("scope, price and format are set on a short first call").
// That is a 1:1 engagement, which TRUTH.md §2 rules out as a business model, so it could
// never be the economic event of this diagnostic no matter how well it converted.
//
// The replacement routes on the *ceiling* rather than the tier, because the ceiling is
// the thing the diagnostic actually measured. Tier tells you how far along you are;
// ceiling tells you what to do next, and only the second one can be sold against.
//
// Routing is total and deterministic: every dimension resolves to exactly one method,
// every method to at least one free artifact, and a product only ever routes to checkout
// on a gate PASS. Today no FrankX product holds a PASS, so every paid route is a
// waitlist — which is the honest state, not a placeholder.

import type { ScorecardResult } from '../scorecard/engine.ts'
import {
  getMethodForDimension,
  getArtifact,
  getProduct,
  KNOWLEDGE_OFFER_GRAPH_VERSION,
  type ArtifactNode,
  type MethodNode,
  type ProductNode,
} from '../graph/knowledge-offer.ts'

export type OfferKind = 'waitlist' | 'checkout'

export interface Offer {
  kind: OfferKind
  productId: string
  label: string
  href: string
  priceBand: string
  /** Why this product, in the visitor's terms — never "recommended for you". */
  reason: string
  foundingBenefit: string
  /** Plain-language gate state. Shown, not hidden. */
  gateNote: string
}

export interface FreeNext {
  label: string
  href: string
  gives: string
}

export interface OfferRoute {
  graphVersion: string
  methodId: string
  methodTitle: string
  practice: string
  freeNext: FreeNext
  /** Null when the method packages nothing paid yet. The free step still stands. */
  offer: Offer | null
}

function toOffer(product: ProductNode, method: MethodNode): Offer {
  const sellable = product.gate === 'PASS'
  return {
    kind: sellable ? 'checkout' : 'waitlist',
    productId: product.registryId,
    label: product.title,
    href: sellable ? `/checkout/${product.registryId}` : `/waitlist?intent=${product.registryId}`,
    priceBand: product.priceBand,
    reason: `${method.title.toLowerCase()} is the gap this scored lowest on, and ${product.title} is the packaged version of that practice. It has to beat ${product.mustBeat}.`,
    foundingBenefit: product.foundingBenefit,
    gateNote: sellable
      ? 'Available now.'
      : 'Not on sale yet. Joining the list records what you would pay, and that is what decides build order.',
  }
}

function toFreeNext(artifact: ArtifactNode): FreeNext {
  return { label: artifact.title, href: artifact.href, gives: artifact.gives }
}

export function routeOffer(result: ScorecardResult): OfferRoute {
  const method = getMethodForDimension(result.ceiling.dimension)

  const artifact = method.artifacts.map(getArtifact).find(Boolean)
  if (!artifact) throw new Error(`Method has no resolvable artifact: ${method.id}`)

  const product = method.products.map(getProduct).find(Boolean)

  return {
    graphVersion: KNOWLEDGE_OFFER_GRAPH_VERSION,
    methodId: method.id,
    methodTitle: method.title,
    practice: method.practice,
    freeNext: toFreeNext(artifact),
    offer: product ? toOffer(product, method) : null,
  }
}
