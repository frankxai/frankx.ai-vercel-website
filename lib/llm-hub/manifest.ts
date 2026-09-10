import { COMPARISONS } from './comparisons'
import { DECISION_MATRIX } from './decisions'
import { MODEL_EDITORIAL } from './editorial'
import { getProviders, registryLastUpdated } from './registry'
import { buildModelRows } from './rows'
import type { LivePricingMap } from './openrouter'

/** Discovery only. A catalog entry never authorizes a model or tool to act. */
export function buildHubManifest(live: LivePricingMap = {}) {
  return {
    schemaVersion: 'frankx.llm-hub.v1',
    url: 'https://www.frankx.ai/llm-hub/manifest.json',
    registryModifiedAt: registryLastUpdated() || null,
    scope: 'Selected models and editorial candidate policies. Coverage and verification dates vary by entry.',
    interpretation: {
      nullMeans: 'Unknown or unattested; never zero cost, zero failures or a passed evaluation.',
      identifiers: 'IDs identify catalog entries. apiId is a registry-supplied identifier, not a verified executable endpoint. Resolve and validate the provider endpoint before dispatch.',
      capabilities: 'Capability tags are registry assertions or organization-level inferences, not measured tool support; inspect capabilitySource.',
      pricing: 'Generic text rates are USD per million tokens. Image models expose separate imagePricing with modality-specific input, output and cache rates; generic estimates stay null. Provider context tiers, tools, retries and human review may add cost.',
      workflows: 'workflow.status describes a planned workflow evaluation, separately from per-model evaluation and measured receipts. not_run is not an endorsement.',
      evaluation: 'Per-model registry status is separate from the public receipts. Missing registry attestation does not mean a model has never been tested.',
      freshness: 'Registry modification is not a blanket source-verification date. Use pricing.observedAt and pricing.verifiedAt per record.',
      ranking: 'Editorial selections are candidates, not measured universal winners. Compare the same task, model version, tools, context, judge and budget.',
    },
    endpoints: {
      models: 'https://www.frankx.ai/llm-hub.json',
      receipts: 'https://www.frankx.ai/research/model-arena/receipts.json',
      methodology: 'https://www.frankx.ai/research/model-arena',
      imageWorkflowProtocol: 'https://www.frankx.ai/research/image-workflows/protocol.json',
      imageWorkflowGuide: 'https://www.frankx.ai/guides/reference-to-campaign',
      imageWorkflowRoutes: 'https://www.frankx.ai/research/image-workflows/routes.json',
    },
    providers: getProviders().map(({ org }) => ({ id: org.slug, name: org.name, url: org.url, modelIds: org.models })),
    models: buildModelRows(live),
    editorial: { evidenceClass: 'editorial_opinion', entries: MODEL_EDITORIAL },
    candidatePolicies: {
      reviewedAt: '2026-09-10',
      status: 'proposed_unmeasured',
      promotionRule: 'Choose the lowest total cost per accepted outcome after quality, risk and latency gates pass on the workload. Ceiling mode removes the spend constraint, not the evidence gate.',
      entries: DECISION_MATRIX,
    },
    comparisons: {
      evidenceClass: 'historical_editorial',
      reviewedAt: null,
      note: 'Individual comparisons retain their original scope and may contain superseded model claims; follow their sources before adopting a route.',
      entries: COMPARISONS,
    },
  }
}
