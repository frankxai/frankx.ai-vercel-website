#!/usr/bin/env node
// Bounded external model-intelligence ingest.
//
// Source eligibility, licences, hosts and limits are declarative in
// data/intelligence/source-policy.json. A scheduled workflow verifies confirmed
// licence evidence, runs deterministic fixtures, fetches enabled sources and
// opens an editorial-review PR. It never writes main directly.

import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { join, dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { fetchJsonBounded } from './network-safety.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..', '..')
const OUT_PATH = join(ROOT, 'data', 'intelligence', 'external.json')
const REGISTRY_PATH = join(ROOT, 'data', 'model-registry.json')
const DEFAULT_POLICY_PATH = join(ROOT, 'data', 'intelligence', 'source-policy.json')
const SCHEMA = 'frankx/external-intelligence@1'
const POLICY_SCHEMA = 'frankx/intelligence-source-policy@1'
const TRANSIENT_STATUS = 'failed'
const BLOCKING_LICENSE_STATES = new Set(['blocked', 'revoked', 'unverified'])

const argv = process.argv.slice(2)
const hasFlag = (name) => argv.includes(name)
const argValue = (name) => {
  const index = argv.indexOf(name)
  return index === -1 ? null : argv[index + 1]
}

const DRY_RUN = hasFlag('--dry-run')
const OFFLINE = hasFlag('--offline')
const FIXTURES = argValue('--fixtures')
const POLICY_PATH = resolve(ROOT, argValue('--policy') || DEFAULT_POLICY_PATH)
const NOW_VALUE = argValue('--now')
const NOW_MS = NOW_VALUE ? Date.parse(NOW_VALUE) : Date.now()
if (!Number.isFinite(NOW_MS)) throw new Error(`invalid --now value: ${NOW_VALUE}`)
const nowIso = () => new Date(NOW_MS).toISOString()

const norm = (value) => String(value || '').toLowerCase().replace(/[^a-z0-9]/g, '')
const asPath = (value) => resolve(ROOT, value)

function requiredString(value, label, maxLength = 512) {
  if (typeof value !== 'string' || !value.trim()) throw new Error(`${label} must be a non-empty string`)
  if (value.length > maxLength) throw new Error(`${label} exceeds ${maxLength} characters`)
  return value
}

function boundedNumber(value, label, { min = 0, max, integer = false } = {}) {
  if (value === null || value === undefined || value === '') return null
  if (typeof value !== 'number' && typeof value !== 'string') {
    throw new Error(`${label} must be a number or strict numeric string`)
  }
  if (typeof value === 'string' && !/^-?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?$/.test(value)) {
    throw new Error(`${label} is not a strict numeric value`)
  }
  const parsed = Number(value)
  if (!Number.isFinite(parsed)) throw new Error(`${label} must be finite`)
  if (integer && !Number.isSafeInteger(parsed)) throw new Error(`${label} must be a safe integer`)
  if (parsed < min || (max !== undefined && parsed > max)) {
    throw new Error(`${label} must be between ${min} and ${max}`)
  }
  return parsed
}

function mergeLimits(defaults, source) {
  const limits = { ...defaults, ...(source.limits || {}) }
  for (const key of [
    'timeout_ms', 'max_response_bytes', 'max_models', 'max_stale_hours',
    'max_context_tokens', 'max_price_usd_per_m', 'max_abs_benchmark_score',
  ]) {
    if (!Number.isSafeInteger(limits[key]) || limits[key] <= 0) {
      throw new Error(`source ${source.id} ${key} must be a positive safe integer`)
    }
  }
  if (!Number.isSafeInteger(limits.max_redirects) || limits.max_redirects < 0) {
    throw new Error(`source ${source.id} max_redirects must be a non-negative safe integer`)
  }
  return limits
}

function validatePolicy(policy) {
  if (policy?.schema !== POLICY_SCHEMA) throw new Error(`policy schema must be ${POLICY_SCHEMA}`)
  if (!Array.isArray(policy.sources) || !policy.sources.length) throw new Error('policy.sources must be non-empty')
  if (!Number.isSafeInteger(policy.defaults?.max_output_models) || policy.defaults.max_output_models <= 0) {
    throw new Error('policy defaults.max_output_models must be a positive safe integer')
  }

  const ids = new Set()
  for (const source of policy.sources) {
    requiredString(source.id, 'source id', 128)
    if (!/^[a-z0-9](?:[a-z0-9-]{0,126}[a-z0-9])?$/.test(source.id)) {
      throw new Error(`source id ${source.id} must be a lowercase slug`)
    }
    if (ids.has(source.id)) throw new Error(`duplicate source id ${source.id}`)
    ids.add(source.id)
    if (!['ingest', 'link-only'].includes(source.mode)) throw new Error(`source ${source.id} has invalid mode`)
    if (typeof source.enabled !== 'boolean') throw new Error(`source ${source.id} enabled must be boolean`)
    const url = new URL(requiredString(source.url, `source ${source.id} url`, 2048))
    if (url.protocol !== 'https:') throw new Error(`source ${source.id} URL must use HTTPS`)
    const license = source.license || {}
    requiredString(license.name, `source ${source.id} license name`)
    if (!['confirmed', 'unverified', 'blocked', 'revoked'].includes(license.state)) {
      throw new Error(`source ${source.id} has invalid license state`)
    }
    if (source.mode === 'ingest') {
      source.limits = mergeLimits(policy.defaults, source)
      source.output_scope = source.output_scope || policy.defaults.output_scope
      if (source.output_scope !== 'registry-only') {
        throw new Error(`source ${source.id} output_scope must be registry-only`)
      }
      source.provider_org_map = { ...(policy.defaults.provider_org_map || {}), ...(source.provider_org_map || {}) }
      if (!Object.keys(source.provider_org_map).length) throw new Error(`source ${source.id} provider_org_map is required`)
      for (const [provider, org] of Object.entries(source.provider_org_map)) {
        requiredString(provider, `source ${source.id} provider key`, 128)
        requiredString(org, `source ${source.id} registry org`, 128)
      }
      if (!['none', 'bearer-env'].includes(source.auth?.kind)) throw new Error(`source ${source.id} auth kind is invalid`)
      if (source.auth.kind === 'bearer-env' && !/^[A-Z][A-Z0-9_]{0,127}$/.test(source.auth.env || '')) {
        throw new Error(`source ${source.id} bearer env is invalid`)
      }
      if (!Array.isArray(source.allowed_hosts) || !source.allowed_hosts.includes(url.hostname)) {
        throw new Error(`source ${source.id} allowed_hosts must include ${url.hostname}`)
      }
      if (license.state === 'confirmed') {
        if (license.redistribution_permitted !== true) throw new Error(`source ${source.id} confirmed ingest must permit redistribution`)
        requiredString(license.notice, `source ${source.id} licence notice`, 1024)
        requiredString(license.verified_at, `source ${source.id} verified_at`, 32)
        if (!Array.isArray(license.evidence) || !license.evidence.length) {
          throw new Error(`source ${source.id} confirmed ingest requires evidence documents`)
        }
        const evidenceRoles = new Set()
        for (const document of license.evidence) {
          const role = requiredString(document?.role, `source ${source.id} evidence role`, 128)
          if (evidenceRoles.has(role)) throw new Error(`source ${source.id} has duplicate evidence role ${role}`)
          evidenceRoles.add(role)
          const evidenceUrl = new URL(requiredString(document?.url, `source ${source.id} evidence URL`, 2048))
          if (evidenceUrl.protocol !== 'https:') throw new Error(`source ${source.id} evidence URL must use HTTPS`)
          if (!Array.isArray(document.allowed_hosts) || !document.allowed_hosts.includes(evidenceUrl.hostname)) {
            throw new Error(`source ${source.id} evidence allowed_hosts must include ${evidenceUrl.hostname}`)
          }
          requiredString(document.sha256, `source ${source.id} evidence SHA-256`, 64)
          if (!/^[a-f0-9]{64}$/.test(document.sha256)) throw new Error(`source ${source.id} evidence SHA-256 is invalid`)
        }
        if (!Number.isFinite(Date.parse(license.verified_at))) {
          throw new Error(`source ${source.id} verified_at must be an ISO date`)
        }
      }
    } else {
      requiredString(source.label, `link-only ${source.id} label`)
      requiredString(source.reason, `link-only ${source.id} reason`, 1024)
    }
  }
  return policy
}

const policy = validatePolicy(JSON.parse(await readFile(POLICY_PATH, 'utf8')))
const ingestSources = policy.sources.filter((source) => source.mode === 'ingest')
const sourceById = new Map(ingestSources.map((source) => [source.id, source]))
const LINK_ONLY = policy.sources
  .filter((source) => source.mode === 'link-only' && source.enabled)
  .map(({ id, label, url, reason }) => ({ id, label, url, reason }))

async function loadJsonForSource(source, headers) {
  if (FIXTURES) {
    const path = join(asPath(FIXTURES), `${source.id}.json`)
    const bytes = await readFile(path)
    if (bytes.byteLength > source.limits.max_response_bytes) {
      throw new Error(`fixture response exceeds ${source.limits.max_response_bytes} bytes`)
    }
    try {
      return JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(bytes))
    } catch (error) {
      throw new Error(`invalid fixture JSON: ${error.message}`)
    }
  }
  const result = await fetchJsonBounded(source.url, {
    allowedHosts: source.allowed_hosts,
    maxBytes: source.limits.max_response_bytes,
    maxRedirects: source.limits.max_redirects,
    timeoutMs: source.limits.timeout_ms,
    headers,
  })
  return result.value
}

function provenance(source) {
  return {
    source: source.id,
    source_url: source.url,
    license: source.license.name,
    retrieved_at: nowIso(),
    modified: true,
  }
}

function addUnique(map, key, row, sourceId) {
  if (!key) throw new Error(`${sourceId} produced an empty normalised model key`)
  if (map.has(key)) throw new Error(`${sourceId} produced duplicate normalised key ${key}`)
  map.set(key, row)
}

function fromModelsDev(payload, source) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) throw new Error('models-dev payload must be an object')
  const out = new Map()
  let seen = 0
  for (const [providerId, provider] of Object.entries(payload)) {
    requiredString(providerId, 'models-dev provider id', 128)
    if (!provider?.models || typeof provider.models !== 'object' || Array.isArray(provider.models)) continue
    for (const [modelId, model] of Object.entries(provider.models)) {
      if (++seen > source.limits.max_models) throw new Error(`models-dev exceeds max_models ${source.limits.max_models}`)
      requiredString(modelId, 'models-dev model id', 256)
      const registryOrg = source.provider_org_map[providerId]
      if (!registryOrg) continue
      const input = boundedNumber(model?.cost?.input, `${modelId} input price`, { max: source.limits.max_price_usd_per_m })
      const output = boundedNumber(model?.cost?.output, `${modelId} output price`, { max: source.limits.max_price_usd_per_m })
      if (input === null && output === null) continue
      const rawContext = boundedNumber(model?.limit?.context, `${modelId} context`, {
        min: 0, max: source.limits.max_context_tokens, integer: true,
      })
      addUnique(out, norm(`${providerId}${modelId}`), {
        provider: providerId,
        registry_org: registryOrg,
        name: requiredString(model?.name || modelId, `${modelId} name`, 512),
        pricing: { in_usd_per_m: input, out_usd_per_m: output, ...provenance(source) },
        context_tokens: rawContext === 0 ? null : rawContext,
      }, source.id)
    }
  }
  return out
}

function perMillion(value, label, source) {
  const perToken = boundedNumber(value, label, { max: source.limits.max_price_usd_per_m / 1e6 })
  return perToken === null ? null : +(perToken * 1e6).toFixed(6)
}

function fromOpenRouterModels(payload, source) {
  if (!Array.isArray(payload?.data)) throw new Error('openrouter-models data must be an array')
  if (payload.data.length > source.limits.max_models) throw new Error(`openrouter-models exceeds max_models ${source.limits.max_models}`)
  const out = new Map()
  for (const model of payload.data) {
    const slug = requiredString(model?.id, 'openrouter model id', 256)
    const input = perMillion(model?.pricing?.prompt, `${slug} prompt price`, source)
    const output = perMillion(model?.pricing?.completion, `${slug} completion price`, source)
    if (input === null && output === null) continue
    const rawContext = boundedNumber(model?.context_length, `${slug} context`, {
      min: 0, max: source.limits.max_context_tokens, integer: true,
    })
    const provider = slug.split('/')[0]
    const registryOrg = source.provider_org_map[provider]
    if (!registryOrg) continue
    addUnique(out, norm(slug), {
      slug,
      registry_org: registryOrg,
      name: requiredString(model?.name || slug, `${slug} name`, 512),
      pricing: { in_usd_per_m: input, out_usd_per_m: output, ...provenance(source) },
      context_tokens: rawContext === 0 ? null : rawContext,
    }, source.id)
  }
  return out
}

function fromOpenRouterRankings(payload, source) {
  const rows = payload?.data || payload?.rankings
  if (!Array.isArray(rows)) throw new Error('openrouter-rankings rows must be an array')
  if (rows.length > source.limits.max_models) throw new Error(`openrouter-rankings exceeds max_models ${source.limits.max_models}`)
  const parsed = []
  let total = 0
  for (const row of rows) {
    const slug = requiredString(row?.model_permaslug || row?.model || row?.slug, 'ranking model id', 256)
    const registryOrg = source.provider_org_map[slug.split('/')[0]] || null
    const tokens = boundedNumber(row?.total_tokens ?? row?.tokens ?? 0, `${slug} tokens`, {
      min: 0, max: Number.MAX_SAFE_INTEGER, integer: true,
    })
    if (total > Number.MAX_SAFE_INTEGER - tokens) throw new Error('ranking token total exceeds safe integer range')
    total += tokens
    parsed.push({ slug, registryOrg, tokens })
  }
  if (total === 0) return new Map()
  const out = new Map()
  for (const { slug, registryOrg, tokens } of parsed) {
    if (tokens === 0 || !registryOrg) continue
    const share = +(tokens / total).toFixed(8)
    boundedNumber(share, `${slug} adoption share`, { min: 0, max: 1 })
    addUnique(out, norm(slug), {
      slug,
      registry_org: registryOrg,
      adoption: { share, ...provenance(source) },
    }, source.id)
  }
  const shareTotal = [...out.values()].reduce((sum, row) => sum + row.adoption.share, 0)
  if (shareTotal > 1 + Math.max(1e-7, out.size * 1e-8)) {
    throw new Error(`adoption shares cannot exceed 1; got ${shareTotal}`)
  }
  return out
}

const NORMALISERS = {
  'models-dev': fromModelsDev,
  'openrouter-models': fromOpenRouterModels,
  'openrouter-rankings': fromOpenRouterRankings,
}

function sourceStatusForPolicy(source) {
  if (!source.enabled) return { status: 'skipped', note: 'source disabled by policy' }
  if (BLOCKING_LICENSE_STATES.has(source.license.state)) {
    return { status: source.license.state, note: `licence ${source.license.state}; redistribution is not enabled` }
  }
  if (source.license.state !== 'confirmed' || source.license.redistribution_permitted !== true) {
    return { status: 'blocked', note: 'licence policy does not permit redistribution' }
  }
  return null
}

function baseStatus(source, status, note, retrievedAt = null) {
  return {
    id: source.id,
    url: source.url,
    license: source.license.name,
    license_state: source.license.state,
    license_notice: source.license.notice || null,
    license_evidence: (source.license.evidence || []).map(({ role, url, sha256 }) => ({ role, url, sha256 })),
    attribution: source.attribution,
    retrieved_at: retrievedAt,
    status,
    ...(note ? { note } : {}),
  }
}

function isFreshForCarry(block, source) {
  if (!source?.limits) return false
  const retrieved = Date.parse(block?.retrieved_at)
  if (!Number.isFinite(retrieved)) return false
  const age = NOW_MS - retrieved
  return age >= 0 && age <= source.limits.max_stale_hours * 60 * 60 * 1000
}

function canCarry(block, runtimeById) {
  const source = sourceById.get(block?.source)
  const runtime = runtimeById.get(block?.source)
  return Boolean(
    source && runtime?.status === TRANSIENT_STATUS && source.enabled &&
    source.license.state === 'confirmed' && source.license.redistribution_permitted === true &&
    isFreshForCarry(block, source)
  )
}

function validateEnvelope(envelope, { allowSeed = false } = {}) {
  const problems = []
  const modelIds = new Set()
  const linkOnlyIds = new Set(LINK_ONLY.map((source) => source.id))
  const runtimeById = new Map((envelope.sources || []).map((source) => [source.id, source]))
  if (envelope.schema !== SCHEMA) problems.push(`schema must be ${SCHEMA}`)
  if (!Array.isArray(envelope.models)) problems.push('models must be an array')
  if ((envelope.models || []).length > policy.defaults.max_output_models) {
    problems.push(`model output exceeds ${policy.defaults.max_output_models}`)
  }
  const actualLinkOnly = new Set((envelope.link_only || []).map((source) => source.id))
  for (const id of linkOnlyIds) if (!actualLinkOnly.has(id)) problems.push(`missing link-only source ${id}`)
  for (const id of actualLinkOnly) if (!linkOnlyIds.has(id)) problems.push(`unknown link-only source ${id}`)

  const expectedSourceIds = new Set(ingestSources.map((source) => source.id))
  for (const runtime of envelope.sources || []) {
    const declared = sourceById.get(runtime?.id)
    if (!declared) {
      problems.push(`snapshot declares unknown source ${runtime?.id}`)
      continue
    }
    expectedSourceIds.delete(runtime.id)
    if (runtime.url !== declared.url) problems.push(`source ${runtime.id} URL does not match policy`)
    if (runtime.license !== declared.license.name) problems.push(`source ${runtime.id} licence does not match policy`)
    if (runtime.license_state !== declared.license.state) problems.push(`source ${runtime.id} licence state does not match policy`)
    if (runtime.license_notice !== (declared.license.notice || null)) problems.push(`source ${runtime.id} licence notice does not match policy`)
    const expectedEvidence = (declared.license.evidence || []).map(({ role, url, sha256 }) => ({ role, url, sha256 }))
    if (JSON.stringify(runtime.license_evidence) !== JSON.stringify(expectedEvidence)) {
      problems.push(`source ${runtime.id} licence evidence does not match policy`)
    }
    if (!['pending', 'ok', 'failed', 'skipped', 'unverified', 'blocked', 'revoked'].includes(runtime.status)) {
      problems.push(`source ${runtime.id} has invalid runtime status ${runtime.status}`)
    }
  }
  for (const id of expectedSourceIds) problems.push(`snapshot is missing source ${id}`)

  for (const model of envelope.models || []) {
    if (typeof model.id !== 'string' || !model.id || model.id.length > 256) problems.push('model has invalid id')
    else if (modelIds.has(model.id)) problems.push(`duplicate model id ${model.id}`)
    else modelIds.add(model.id)
    if (Object.hasOwn(model, 'external_refs')) problems.push(`${model.id} repeats top-level link_only as external_refs`)
    if (model.context_tokens !== null && model.context_tokens !== undefined) {
      if (!Number.isSafeInteger(model.context_tokens) || model.context_tokens < 1 || model.context_tokens > policy.defaults.max_context_tokens) {
        problems.push(`${model.id}.context_tokens outside bounds`)
      }
    }
    for (const field of ['pricing', 'adoption']) {
      const block = model[field]
      if (!block) continue
      for (const key of ['source', 'source_url', 'license', 'retrieved_at']) {
        if (!block[key]) problems.push(`${model.id}.${field} missing ${key}`)
      }
      if (block.modified !== true) problems.push(`${model.id}.${field} must declare modified:true`)
      const source = sourceById.get(block.source)
      if (!source) problems.push(`${model.id}.${field} uses unknown source ${block.source}`)
      else if (source.license.state !== 'confirmed' || source.license.redistribution_permitted !== true) {
        problems.push(`${model.id}.${field} uses ${source.license.state} source ${block.source}`)
      } else {
        if (block.source_url !== source.url) problems.push(`${model.id}.${field} source URL does not match policy`)
        if (block.license !== source.license.name) problems.push(`${model.id}.${field} licence does not match policy`)
      }
      if (linkOnlyIds.has(block.source)) problems.push(`${model.id}.${field} ingests link-only source ${block.source}`)
      const runtime = runtimeById.get(block.source)
      if (runtime?.status === TRANSIENT_STATUS && !isFreshForCarry(block, source)) {
        problems.push(`${model.id}.${field} exceeds stale carry-forward limit`)
      }
    }
    if (model.pricing) {
      for (const [key, value] of Object.entries({ input: model.pricing.in_usd_per_m, output: model.pricing.out_usd_per_m })) {
        if (value !== null && (!Number.isFinite(value) || value < 0 || value > policy.defaults.max_price_usd_per_m)) {
          problems.push(`${model.id}.pricing ${key} outside bounds`)
        }
      }
    }
    if (model.adoption && (!Number.isFinite(model.adoption.share) || model.adoption.share < 0 || model.adoption.share > 1)) {
      problems.push(`${model.id}.adoption.share outside [0,1]`)
    }
    for (const benchmark of model.benchmarks || []) {
      for (const key of ['name', 'score', 'source', 'source_url', 'license', 'retrieved_at']) {
        if (benchmark[key] === undefined || benchmark[key] === null || benchmark[key] === '') {
          problems.push(`${model.id} benchmark missing ${key}`)
        }
      }
      if (!Number.isFinite(benchmark.score)) problems.push(`${model.id} benchmark score must be finite`)
      const source = sourceById.get(benchmark.source)
      if (!source || source.license.state !== 'confirmed' || source.license.redistribution_permitted !== true) {
        problems.push(`${model.id} benchmark uses ineligible source ${benchmark.source}`)
      } else {
        if (benchmark.source_url !== source.url) problems.push(`${model.id} benchmark source URL does not match policy`)
        if (benchmark.license !== source.license.name) problems.push(`${model.id} benchmark licence does not match policy`)
        if (Number.isFinite(benchmark.score) && Math.abs(benchmark.score) > source.limits.max_abs_benchmark_score) {
          problems.push(`${model.id} benchmark score outside bounds`)
        }
      }
      if (runtimeById.get(benchmark.source)?.status === TRANSIENT_STATUS && !isFreshForCarry(benchmark, source)) {
        problems.push(`${model.id} benchmark exceeds stale carry-forward limit`)
      }
    }
  }
  if (!allowSeed && envelope.generated_at !== nowIso()) problems.push('generated_at does not match this run')
  return problems
}

let previous = null
try { previous = JSON.parse(await readFile(OUT_PATH, 'utf8')) } catch { /* first run */ }

if (OFFLINE) {
  if (!previous) {
    console.error('--offline: no existing snapshot at data/intelligence/external.json to validate')
    process.exit(1)
  }
  const problems = validateEnvelope(previous, { allowSeed: true })
  console.log(JSON.stringify({
    mode: 'offline-validate', schema: previous.schema, generated_at: previous.generated_at,
    models: previous.models?.length || 0,
    sources: (previous.sources || []).map((source) => `${source.id}:${source.status}`),
    problems,
  }, null, 2))
  process.exit(problems.length ? 1 : 0)
}

let registry = { models: {} }
try { registry = JSON.parse(await readFile(REGISTRY_PATH, 'utf8')) } catch { /* optional join */ }

const sourceStatus = []
const collected = new Map()
for (const source of ingestSources) {
  const blocked = sourceStatusForPolicy(source)
  if (blocked) {
    sourceStatus.push(baseStatus(source, blocked.status, blocked.note))
    continue
  }
  const headers = { 'user-agent': 'frankx.ai intelligence refresh (https://frankx.ai)' }
  if (source.auth?.kind === 'bearer-env' && !FIXTURES) {
    const key = process.env[source.auth.env]
    if (!key) {
      sourceStatus.push(baseStatus(source, 'skipped', `${source.auth.env} not set`))
      continue
    }
    headers.Authorization = `Bearer ${key}`
  }
  try {
    const payload = await loadJsonForSource(source, headers)
    const normaliser = NORMALISERS[source.id]
    if (!normaliser) throw new Error(`no normaliser registered for ${source.id}`)
    const rows = normaliser(payload, source)
    if (rows.size > source.limits.max_models) throw new Error(`normalised rows exceed max_models ${source.limits.max_models}`)
    collected.set(source.id, rows)
    sourceStatus.push(baseStatus(source, 'ok', null, nowIso()))
  } catch (error) {
    const priorStatus = previous?.sources?.find((candidate) => candidate.id === source.id)
    sourceStatus.push(baseStatus(source, TRANSIENT_STATUS, String(error.message || error), priorStatus?.retrieved_at || null))
  }
}

// Do not mutate the snapshot when no enabled ingest completed. This gate is
// deliberately before envelope construction and writeFile; a prior snapshot is
// left byte-for-byte intact on a total outage or policy-wide hold.
const enabledIngest = ingestSources.filter((source) => source.enabled)
if (!enabledIngest.length || !sourceStatus.some((source) => source.status === 'ok')) {
  for (const source of sourceStatus) {
    console.error(`[${source.id}] ${source.status}${source.note ? ` — ${source.note}` : ''}`)
  }
  console.error('No enabled source completed successfully — snapshot not written.')
  process.exit(1)
}

const models = new Map()
for (const [registryId, model] of Object.entries(registry.models || {})) {
  models.set(registryId, {
    id: registryId,
    name: model?.name || registryId,
    org: model?.organization || null,
    in_registry: true,
    names: {},
    pricing: null,
    adoption: null,
    context_tokens: model?.context_window ?? null,
    benchmarks: [],
  })
}

const registryKeys = new Map()
for (const [registryId, model] of Object.entries(registry.models || {})) {
  for (const candidate of [model?.id || registryId, registryId, model?.name || '']) {
    if (norm(candidate)) registryKeys.set(norm(candidate), registryId)
  }
}

for (const [sourceId, rows] of collected) {
  for (const [key, row] of rows) {
    let registryId = registryKeys.get(key)
    if (!registryId && row.slug) registryId = registryKeys.get(norm(row.slug.split('/').pop()))
    if (!registryId && row.name) registryId = registryKeys.get(norm(row.name))
    if (registryId && row.registry_org && registry.models?.[registryId]?.organization !== row.registry_org) registryId = null
    if (!registryId) continue
    const id = registryId
    const target = models.get(id)
    target.names[sourceId] = row.slug || row.name || key
    if (row.pricing && !target.pricing) target.pricing = row.pricing
    if (row.adoption) target.adoption = row.adoption
    if (row.context_tokens && !target.context_tokens) target.context_tokens = row.context_tokens
  }
}

// Carry forward only fresh fields from a transiently failed source whose
// current declarative policy still confirms redistribution. Blocked, revoked,
// unverified, disabled and skipped sources are intentionally purged.
const runtimeById = new Map(sourceStatus.map((source) => [source.id, source]))
const carriedBySource = new Map()
if (previous) {
  for (const prior of previous.models || []) {
    const pricing = canCarry(prior.pricing, runtimeById) ? prior.pricing : null
    const adoption = canCarry(prior.adoption, runtimeById) ? prior.adoption : null
    const benchmarks = (prior.benchmarks || []).filter((benchmark) => canCarry(benchmark, runtimeById))
    if (!pricing && !adoption && !benchmarks.length) continue
    if (!models.has(prior.id)) {
      models.set(prior.id, {
        id: prior.id, name: prior.name || prior.id, org: prior.org || null,
        in_registry: Boolean(prior.in_registry), names: prior.names || {},
        pricing: null, adoption: null, context_tokens: prior.context_tokens || null, benchmarks: [],
      })
    }
    const target = models.get(prior.id)
    if (!target.pricing && pricing) target.pricing = pricing
    if (!target.adoption && adoption) target.adoption = adoption
    if (!target.benchmarks.length && benchmarks.length) target.benchmarks = benchmarks
    for (const block of [pricing, adoption, ...benchmarks].filter(Boolean)) {
      carriedBySource.set(block.source, (carriedBySource.get(block.source) || 0) + 1)
    }
  }
}
for (const status of sourceStatus) {
  if (status.status === TRANSIENT_STATUS) status.carried_forward = carriedBySource.get(status.id) || 0
}

const envelope = {
  schema: SCHEMA,
  _description:
    'External model intelligence from policy-approved public sources. Every ingested figure carries source, licence and retrieval time. Link-only sources are normalised once at the top level and never ingested.',
  generated_at: nowIso(),
  sources: sourceStatus,
  link_only: LINK_ONLY,
  models: [...models.values()].sort((a, b) => a.id.localeCompare(b.id)),
}

const problems = validateEnvelope(envelope)
if (problems.length) {
  console.error('External-intelligence validation FAILED — refusing to write:')
  for (const problem of problems.slice(0, 30)) console.error(`  - ${problem}`)
  process.exit(1)
}

const summary = {
  mode: DRY_RUN ? 'dry-run' : 'write', schema: SCHEMA,
  sources: sourceStatus.map((source) => `${source.id}:${source.status}`),
  models: envelope.models.length,
  with_pricing: envelope.models.filter((model) => model.pricing).length,
  with_adoption: envelope.models.filter((model) => model.adoption).length,
  carried_forward: Object.fromEntries(carriedBySource),
  link_only: LINK_ONLY.map((source) => source.id),
  out: DRY_RUN ? null : 'data/intelligence/external.json',
}

if (!DRY_RUN) {
  await mkdir(dirname(OUT_PATH), { recursive: true })
  await writeFile(OUT_PATH, JSON.stringify(envelope, null, 2) + '\n')
}
console.log(JSON.stringify(summary, null, 2))
