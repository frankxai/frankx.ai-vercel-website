import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { pathToFileURL } from 'node:url'

const hash = value => createHash('sha256').update(JSON.stringify(value)).digest('hex')
const ACTOR = 'apify/rag-web-browser'

/** Teaching-only planner. It never reads credentials or sends requests. */
export function makeResearchPlan({ missionId, sourceUrl, allowedHosts, build, maxTotalChargeUsd = 0.10 }) {
  if (!/^[a-zA-Z0-9_-]{1,100}$/.test(missionId ?? '')) throw new Error('Invalid mission ID')
  const url = new URL(sourceUrl)
  if (url.protocol !== 'https:' || url.username || url.password || url.port || url.hash) {
    throw new Error('Use an https source without credentials, custom port or fragment')
  }
  if (!Array.isArray(allowedHosts) || !allowedHosts.includes(url.hostname)) throw new Error('Source host is not approved')
  if (!/^\d+\.\d+\.\d+$/.test(build ?? '')) throw new Error('Resolve a numbered Actor build; mutable tags are refused')
  if (!Number.isFinite(maxTotalChargeUsd) || maxTotalChargeUsd <= 0 || maxTotalChargeUsd > 0.25) {
    throw new Error('Example ceiling must be positive and no more than $0.25')
  }
  const input = {
    query: url.href,
    maxResults: 1,
    outputFormats: ['markdown'],
    scrapingTool: 'raw-http',
    requestTimeoutSecs: 30,
    maxRequestRetries: 0,
    desiredConcurrency: 1,
  }
  const callOptions = { build, timeout: 60, memory: 1024, maxTotalChargeUsd }
  const query = new URLSearchParams({
    ...Object.fromEntries(Object.entries(callOptions).map(([key, value]) => [key, String(value)])),
    waitForFinish: '0',
    restartOnError: 'false',
    forcePermissionLevel: 'LIMITED_PERMISSIONS',
  })
  return {
    kind: 'offline-request-plan', executionEnabled: false, requiresApproval: true,
    missionId, sourceUrl: url.href,
    inputSha256: hash(input),
    // This is a local dispatch key. No Apify idempotency guarantee is implied.
    dispatchKey: hash({ missionId, actor: ACTOR, input, callOptions }),
    mcp: { tool: 'call-actor', arguments: { actor: ACTOR, input, callOptions, waitSecs: 0 } },
    api: {
      method: 'POST',
      url: `https://api.apify.com/v2/actors/apify~rag-web-browser/runs?${query}`,
      headers: { 'Content-Type': 'application/json' },
      auth: 'Execution adapter must inject a scoped Bearer token from its secret manager',
      body: input,
    },
    results: { actorRunId: null, datasetId: null, actualCostUsd: null, acceptedRecords: null },
  }
}

/** Hypothetical arithmetic only. null is deliberately retained for unknown costs. */
export function costPerAcceptedArtifact({ apifyUsd, inferenceUsd, storageUsd, reviewUsd, acceptedArtifacts }) {
  const costs = [apifyUsd, inferenceUsd, storageUsd, reviewUsd]
  if (costs.some(value => value === null) || acceptedArtifacts === null || acceptedArtifacts === 0) return null
  if (!Number.isSafeInteger(acceptedArtifacts) || acceptedArtifacts < 0 || costs.some(value => !Number.isFinite(value) || value < 0)) {
    throw new Error('Cost and acceptance measurements must be non-negative')
  }
  return costs.reduce((sum, value) => sum + value, 0) / acceptedArtifacts
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const file = process.argv[2]
  if (!file) throw new Error('Usage: node examples/apify-research/request-plan.mjs <mission.json>')
  console.log(JSON.stringify(makeResearchPlan(JSON.parse(readFileSync(file, 'utf8'))), null, 2))
}
