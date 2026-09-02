// FrankX knowledge-to-offer graph — v1.
//
// The site's economic problem is not a missing page, it is a missing edge: a visitor
// can read a thesis and can find a product, but nothing connects "the gap you actually
// have" to "the one thing that closes it". This file is that connective tissue, typed
// so it can be tested rather than asserted.
//
// Shape: Thesis <- Evidence, Thesis <- Method, Method <- Artifact (free proof),
// Method <- Product (paid packaging). The diagnostic in lib/diagnostic/ walks it from a
// named ceiling dimension to exactly one offer.
//
// Every node carries owner, provenance, version, visibility and an evaluation rule
// (the condition under which the node becomes false and must be edited or removed).
// scripts/tests/stack-diagnostic-contract.test.mjs enforces all five.
//
// No framework imports — importable from client components and directly from node:test.

export const KNOWLEDGE_OFFER_GRAPH_VERSION = '1.0.0'

export type NodeKind = 'thesis' | 'evidence' | 'method' | 'artifact' | 'product'
export type Visibility = 'public' | 'internal'

export interface Provenance {
  /** Where the claim came from. A repo path, a registry path, or a live surface. */
  source: string
  /** ISO date the claim was last measured or ruled. Never a guess. */
  measuredAt: string
}

export interface BaseNode {
  id: string
  kind: NodeKind
  title: string
  owner: string
  provenance: Provenance
  version: string
  visibility: Visibility
  /** The condition that makes this node false. Written so a future agent can check it. */
  evaluation: string
}

export interface ThesisNode extends BaseNode {
  kind: 'thesis'
  claim: string
}

export interface EvidenceNode extends BaseNode {
  kind: 'evidence'
  /** The measured number, as a string so units stay attached to the value. */
  measurement: string
  supports: string[]
}

/** The six diagnostic dimensions, mirrored from lib/scorecard/engine.ts. */
export type MethodDimension =
  | 'delegation'
  | 'systemization'
  | 'agentFluency'
  | 'distribution'
  | 'offerClarity'
  | 'runway'

export interface MethodNode extends BaseNode {
  kind: 'method'
  /** The scorecard ceiling this method closes. Exactly one method per dimension. */
  closesDimension: MethodDimension
  /** One sentence a buyer can act on, not a category name. */
  practice: string
  /** Free, already-published proof. Ordered; the first is what the brief links. */
  artifacts: string[]
  /** Paid packaging, ordered by fit. May be empty — then the method is artifact-only. */
  products: string[]
}

export interface ArtifactNode extends BaseNode {
  kind: 'artifact'
  /** In-repo route. Must resolve — the contract test asserts every href is site-relative. */
  href: string
  /** What the visitor leaves with. Never "learn more". */
  gives: string
}

/**
 * Gate state mirrors starlight/graph/products.graph.json. Only 'PASS' may ever route to
 * checkout; everything else routes to the waitlist. There is no third option, because a
 * CTA that goes nowhere is the failure this graph exists to prevent.
 */
export type GateState = 'PASS' | 'FAIL' | 'UNGATED'

export interface ProductNode extends BaseNode {
  kind: 'product'
  /** Matches the row id in starlight/graph/products.graph.json. */
  registryId: string
  gate: GateState
  /** Stated price hypothesis, not a price. Shown as a band with its own uncertainty. */
  priceBand: string
  buyer: string
  /** The named product this must beat, and on what dimension. */
  mustBeat: string
  /** What a founding waitlist member gets, from the registry's `founding` array. */
  foundingBenefit: string
}

export type GraphNode = ThesisNode | EvidenceNode | MethodNode | ArtifactNode | ProductNode

// ---------------------------------------------------------------------------
// Nodes
// ---------------------------------------------------------------------------

const OWNER = 'frankx.ai'
const TRUTH = 'starlight/TRUTH.md §3'
const REGISTRY = 'starlight/graph/products.graph.json'
const MEASURED = '2026-08-19'

export const THESIS: ThesisNode = {
  id: 'thesis/compounding-intelligence',
  kind: 'thesis',
  title: 'Build intelligence that compounds',
  owner: OWNER,
  provenance: { source: 'frankx.ai public positioning', measuredAt: '2026-09-02' },
  version: '1.0.0',
  visibility: 'public',
  evaluation: 'Void if the site stops publishing measured receipts for its own systems.',
  claim:
    'A system compounds when the work you did last month runs without you this month. Every dimension below is a place that loop is either closed or open.',
}

export const EVIDENCE: EvidenceNode[] = [
  {
    id: 'evidence/prompt-patterns',
    kind: 'evidence',
    title: 'Prompt patterns, counted',
    owner: OWNER,
    provenance: { source: TRUTH, measuredAt: MEASURED },
    version: '1.0.0',
    visibility: 'public',
    evaluation: 'Re-count the pattern directories before quoting. The markdown-file count is 312 and is not the pattern count.',
    measurement: '104 patterns, each with examples and a promptfoo eval',
    supports: ['thesis/compounding-intelligence', 'method/systemization'],
  },
  {
    id: 'evidence/suno-catalog',
    kind: 'evidence',
    title: 'Suno catalog, counted',
    owner: OWNER,
    provenance: { source: TRUTH, measuredAt: MEASURED },
    version: '1.0.0',
    visibility: 'public',
    evaluation: 'Void when the catalog export script reports a different number. Do not round up.',
    measurement: '845 tracks, 26,193 plays, 545 followers',
    supports: ['thesis/compounding-intelligence'],
  },
  {
    id: 'evidence/book-manuscripts',
    kind: 'evidence',
    title: 'Prose-complete books, counted',
    owner: OWNER,
    provenance: { source: TRUTH, measuredAt: '2026-08-29' },
    version: '1.0.0',
    visibility: 'public',
    evaluation: 'Only 4 of the 17 clear a 15k-word floor. Any claim implying 17 full-length books is false.',
    measurement: '17 titles, 156 chapters, 265,289 words',
    supports: ['thesis/compounding-intelligence'],
  },
]

export const ARTIFACTS: ArtifactNode[] = [
  {
    id: 'artifact/prompt-library',
    kind: 'artifact',
    title: 'The prompt pattern library',
    owner: OWNER,
    provenance: { source: 'app/prompt-library/page.tsx', measuredAt: '2026-09-02' },
    version: '1.0.0',
    visibility: 'public',
    evaluation: 'Void if the route stops rendering patterns with their evals attached.',
    href: '/prompt-library',
    gives: 'Patterns you can copy today, each with the eval that proves it holds.',
  },
  {
    id: 'artifact/agent-team',
    kind: 'artifact',
    title: 'The agent roster, published',
    owner: OWNER,
    provenance: { source: 'app/agent-team/page.tsx', measuredAt: '2026-09-02' },
    version: '1.0.0',
    visibility: 'public',
    evaluation: 'Void if the roster stops matching the agents actually configured in the estate.',
    href: '/agent-team',
    gives: 'A real roster to copy the shape of, instead of inventing one from scratch.',
  },
  {
    id: 'artifact/stack',
    kind: 'artifact',
    title: 'The working stack',
    owner: OWNER,
    provenance: { source: 'app/stack/page.tsx', measuredAt: '2026-09-02' },
    version: '1.0.0',
    visibility: 'public',
    evaluation: 'Void if it lists tools that are not in daily use.',
    href: '/stack',
    gives: 'The tools actually in use, with what each one is for.',
  },
  {
    id: 'artifact/acos',
    kind: 'artifact',
    title: 'The creator operating system, described',
    owner: OWNER,
    provenance: { source: 'app/acos/page.tsx', measuredAt: '2026-09-02' },
    version: '1.0.0',
    visibility: 'public',
    evaluation: 'Void if the page starts promising a purchasable kit before a gate PASS exists.',
    href: '/acos',
    gives: 'The full shape of the operating system, and the waitlist for the packaged version.',
  },
  {
    id: 'artifact/start-here',
    kind: 'artifact',
    title: 'Start here',
    owner: OWNER,
    provenance: { source: 'app/start-here/page.tsx', measuredAt: '2026-09-02' },
    version: '1.0.0',
    visibility: 'public',
    evaluation: 'Void if it becomes a link list rather than a first move.',
    href: '/start-here',
    gives: 'One ordered path in, when the honest answer is that you have not started.',
  },
]

// Product rows mirror starlight/graph/products.graph.json. Editing a price band, gate or
// founding benefit here without editing the registry row is a divergence bug.
export const PRODUCTS: ProductNode[] = [
  {
    id: 'product/creative-ai-toolkit',
    kind: 'product',
    title: 'Creative AI Toolkit',
    owner: OWNER,
    provenance: { source: REGISTRY, measuredAt: '2026-07-18' },
    version: '1.0.0',
    visibility: 'public',
    evaluation: 'Gate FAIL since 2026-07-18 (a CTA pointed at a dead link). Waitlist only until a fresh PASS.',
    registryId: 'creative-ai-toolkit',
    gate: 'FAIL',
    priceBand: 'EUR 49-99 (hypothesis, no sale has tested it)',
    buyer: 'Creators using AI daily who want a curated system, not another prompt dump',
    mustBeat: 'God of Prompt (~$97), on shipping evals rather than volume',
    foundingBenefit: 'Every future pattern free for life, and named in the library.',
  },
  {
    id: 'product/creation-chronicles',
    kind: 'product',
    title: 'Creation Chronicles',
    owner: OWNER,
    provenance: { source: REGISTRY, measuredAt: '2026-07-18' },
    version: '1.0.0',
    visibility: 'public',
    evaluation: 'Gate FAIL since 2026-07-18. Waitlist only until a fresh PASS.',
    registryId: 'creation-chronicles',
    gate: 'FAIL',
    priceBand: 'EUR 0-29 (hypothesis, no sale has tested it)',
    buyer: 'Readers following the build-in-public arc who want the long-form record',
    mustBeat: 'Free Substack build logs, on publishing the numbers that were wrong',
    foundingBenefit: 'Lifetime access, and the raw measurement scripts.',
  },
  {
    id: 'product/ai-architect-academy',
    kind: 'product',
    title: 'AI Architect Academy',
    owner: OWNER,
    provenance: { source: REGISTRY, measuredAt: '2026-09-01' },
    version: '1.0.0',
    visibility: 'public',
    evaluation: 'Ungated concept. No cohort is scheduled; do not imply a date.',
    registryId: 'ai-architect-academy',
    gate: 'UNGATED',
    priceBand: 'EUR 299-999 (hypothesis, no cohort has run)',
    buyer: 'Engineers and architects being asked to lead AI work they have not done before',
    mustBeat: 'Maven cohort courses (~$1-2k), on decisions rather than tool tours',
    foundingBenefit: 'Founding cohort price lock, and direct input on curriculum order.',
  },
]

export const METHODS: MethodNode[] = [
  {
    id: 'method/delegation',
    kind: 'method',
    title: 'Delegate one task, unattended',
    owner: OWNER,
    provenance: { source: 'lib/scorecard/engine.ts CEILINGS.delegation', measuredAt: '2026-09-02' },
    version: '1.0.0',
    visibility: 'public',
    evaluation: 'Void if the scorecard drops the delegation dimension.',
    closesDimension: 'delegation',
    practice:
      'Hand a single recurring task to one narrow agent and let it run once without you touching it.',
    artifacts: ['artifact/agent-team', 'artifact/start-here'],
    products: ['product/creative-ai-toolkit'],
  },
  {
    id: 'method/systemization',
    kind: 'method',
    title: 'Turn repeated work into a tested pattern',
    owner: OWNER,
    provenance: { source: 'lib/scorecard/engine.ts CEILINGS.systemization', measuredAt: '2026-09-02' },
    version: '1.0.0',
    visibility: 'public',
    evaluation: 'Void if the pattern library stops shipping evals alongside patterns.',
    closesDimension: 'systemization',
    practice:
      'Write your three most-repeated prompts down as one reusable pattern, then write the check that proves it still works.',
    artifacts: ['artifact/prompt-library'],
    products: ['product/creative-ai-toolkit'],
  },
  {
    id: 'method/agent-fluency',
    kind: 'method',
    title: 'Run a roster, not a chat window',
    owner: OWNER,
    provenance: { source: 'lib/scorecard/engine.ts CEILINGS.agentFluency', measuredAt: '2026-09-02' },
    version: '1.0.0',
    visibility: 'public',
    evaluation: 'Void if the published roster stops reflecting agents in real use.',
    closesDimension: 'agentFluency',
    practice:
      'Configure a second agent with one narrow job, and run a real task through it rather than a demo.',
    artifacts: ['artifact/agent-team', 'artifact/stack'],
    products: ['product/ai-architect-academy'],
  },
  {
    id: 'method/distribution',
    kind: 'method',
    title: 'Publish the proof you already have',
    owner: OWNER,
    provenance: { source: 'lib/scorecard/engine.ts CEILINGS.distribution', measuredAt: '2026-09-02' },
    version: '1.0.0',
    visibility: 'public',
    evaluation: 'Void if the site stops publishing its own measured receipts.',
    closesDimension: 'distribution',
    practice:
      'Publish one thing you already built — a config, a result, a teardown — and put a single email field next to it.',
    artifacts: ['artifact/prompt-library', 'artifact/stack'],
    products: ['product/creation-chronicles'],
  },
  {
    id: 'method/offer-clarity',
    kind: 'method',
    title: 'Say the offer and the price in one sentence',
    owner: OWNER,
    provenance: { source: 'lib/scorecard/engine.ts CEILINGS.offerClarity', measuredAt: '2026-09-02' },
    version: '1.0.0',
    visibility: 'public',
    evaluation:
      'Void if this site itself carries an offer it cannot price. That has been true before and is the reason the dimension exists.',
    closesDimension: 'offerClarity',
    practice:
      'Cut the list to one entry point and one upgrade, then write what each costs in a single sentence with no hedging.',
    artifacts: ['artifact/acos'],
    products: ['product/ai-architect-academy'],
  },
  {
    id: 'method/runway',
    kind: 'method',
    title: 'Ship the smallest paid thing',
    owner: OWNER,
    provenance: { source: 'lib/scorecard/engine.ts CEILINGS.runway', measuredAt: '2026-09-02' },
    version: '1.0.0',
    visibility: 'public',
    evaluation: 'Void if it ever implies a guaranteed revenue outcome.',
    closesDimension: 'runway',
    practice:
      'Write the real number of months you have, then ship the smallest thing someone can pay for this week.',
    artifacts: ['artifact/start-here', 'artifact/acos'],
    products: ['product/creation-chronicles'],
  },
]

export const NODES: GraphNode[] = [THESIS, ...EVIDENCE, ...METHODS, ...ARTIFACTS, ...PRODUCTS]

const BY_ID = new Map<string, GraphNode>(NODES.map((n) => [n.id, n]))

export function getNode(id: string): GraphNode | undefined {
  return BY_ID.get(id)
}

export function getMethodForDimension(dimension: MethodDimension): MethodNode {
  const method = METHODS.find((m) => m.closesDimension === dimension)
  // Every dimension has exactly one method; the contract test asserts it, so a miss here
  // is a programming error rather than a runtime condition to handle gracefully.
  if (!method) throw new Error(`No method closes dimension: ${dimension}`)
  return method
}

export function getArtifact(id: string): ArtifactNode | undefined {
  const node = BY_ID.get(id)
  return node?.kind === 'artifact' ? node : undefined
}

export function getProduct(id: string): ProductNode | undefined {
  const node = BY_ID.get(id)
  return node?.kind === 'product' ? node : undefined
}
