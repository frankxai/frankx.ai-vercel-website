/**
 * Hosted investment-intelligence council orchestrator.
 *
 * Pure and dependency-injected (executor + clock + store passed in) so it is
 * unit-testable with `node --experimental-strip-types --test` — this module must
 * not import `next/*` or `ai` at top level. It re-implements the same 3-phase
 * layering as the local SIS council:
 *   phase 1 — analysis: blind-parallel (Promise.all), operator context only
 *   phase 2 — risk:     parallel, prompts include the phase-1 verdicts
 *   phase 3 — synthesis: portfolio-manager (Opus) over the full debate;
 *                        chief-of-staff coherence pass is feature-flagged off in
 *                        v1 to protect the 300s budget.
 *
 * Execution boundary: this produces a run record with proposed actions that all
 * carry `requires_human_approval: true`. It has no path to a broker. Trades
 * execute only via the local trade-gate MCP + a human token.
 */

import type { z } from 'zod'
import type { CatalogAgent, HostedCatalog } from './catalog'
import { agentsByLayer } from './catalog'
import { pricingFor, gatewayModelFor } from './models'
import { AgentVerdict, SynthesisOutput, type AgentVerdictT, type SynthesisOutputT } from './schemas'
import type { AgentRunResult, Executor } from './executor'

export const R5_CLAUSE =
  'This is system architecture, not financial / investment / tax advice. ' +
  'Outputs frame decisions; jurisdiction-specific counsel signs off on instruments. ' +
  'The practitioner accepts capital risk; the substrate accepts no claim.'

const NO_EXECUTION_LINE =
  'You have NO execution tools. You produce analysis only; any resulting action ' +
  'is a pending decision a human approves through the local trade-gate MCP.'

const MAX_TOKENS = { analysis: 2000, risk: 2000, synthesis: 4000 } as const

export interface RunConfig {
  context: string
  /** Per-run USD ceiling (pre-flight refusal). Default 2.00. */
  runCapUsd?: number
  /** Rolling daily USD ceiling. Default 5.00. */
  dailyCapUsd?: number
  /** Restrict to these agent ids (cheap demos). */
  only?: string[]
  includeChiefOfStaff?: boolean
}

export interface RunRecord {
  id: string
  context: string
  startedAt: string
  finishedAt: string
  ok: boolean
  note?: string
  analysis: AgentRunResult<AgentVerdictT>[]
  risk: AgentRunResult<AgentVerdictT>[]
  synthesis: {
    portfolioManager: AgentRunResult<SynthesisOutputT> | null
    chiefOfStaff: AgentRunResult<AgentVerdictT> | null
  }
  costUsd: number
  estimateUsd: number
}

export interface Store {
  /** Today's accumulated spend (USD). Returns 0 if KV unavailable. */
  getDailySpend(day: string): Promise<number>
  addDailySpend(day: string, usd: number): Promise<void>
  saveRun(record: RunRecord): Promise<void>
}

export interface Deps {
  executor: Executor
  store: Store
  now: () => Date
  catalog: HostedCatalog
}

function systemFor(agent: CatalogAgent): string {
  return [
    `You are the "${agent.id}" agent (${agent.layer} layer). Domain: ${agent.domain}.`,
    agent.persona,
    NO_EXECUTION_LINE,
    `[R5] ${R5_CLAUSE}`,
  ].join('\n\n')
}

function analysisPrompt(agent: CatalogAgent, context: string): string {
  return `Task: ${agent.system_prompt_summary}\n\nOperator context: ${context}`
}

function riskPrompt(agent: CatalogAgent, context: string, analysisDigest: string): string {
  return `Task: ${agent.system_prompt_summary}\n\nOperator context: ${context}\n\nAnalysis-layer verdicts:\n${analysisDigest}`
}

function synthesisPrompt(agent: CatalogAgent, context: string, debate: string): string {
  return `Task: ${agent.system_prompt_summary}\n\nOperator context: ${context}\n\nFull debate (analysis + risk):\n${debate}`
}

function digest(results: AgentRunResult<AgentVerdictT>[]): string {
  return results
    .map((r) =>
      r.ok && r.output
        ? `### ${r.id} [${r.output.confidence}] ${r.output.stance}`
        : `### ${r.id} (no verdict: ${r.error ?? 'unknown'})`,
    )
    .join('\n')
}

/** Rough pre-flight estimate: capped output + a fixed input budget per agent. */
function estimateUsd(agents: CatalogAgent[], includeSynthesis: boolean): number {
  let total = 0
  for (const a of agents) {
    const p = pricingFor(gatewayModelFor(a.id, a.recommended_model))
    const outCap = a.layer === 'synthesis' ? MAX_TOKENS.synthesis : MAX_TOKENS.analysis
    const inBudget = 1500 // catalog/system + context + digest, bounded
    total += (inBudget / 1_000_000) * p.input + (outCap / 1_000_000) * p.output
  }
  return Number(total.toFixed(4))
}

function pickRoster(catalog: HostedCatalog, only?: string[]): {
  analysis: CatalogAgent[]
  risk: CatalogAgent[]
  pm: CatalogAgent | undefined
  cos: CatalogAgent | undefined
} {
  const filt = (arr: CatalogAgent[]) =>
    only && only.length ? arr.filter((a) => only.includes(a.id)) : arr
  const synth = agentsByLayer('synthesis')
  return {
    analysis: filt(agentsByLayer('analysis')),
    risk: filt(agentsByLayer('risk')),
    pm: filt(synth).find((a) => a.id === 'portfolio-manager'),
    cos: filt(synth).find((a) => a.id === 'chief-of-staff'),
  }
}

export async function runHostedCouncil(deps: Deps, cfg: RunConfig): Promise<RunRecord> {
  const { executor, store, now, catalog } = deps
  const startedAt = now().toISOString()
  const day = startedAt.slice(0, 10)
  const runCap = cfg.runCapUsd ?? 2.0
  const dailyCap = cfg.dailyCapUsd ?? 5.0

  const roster = pickRoster(catalog, cfg.only)
  const activeSynth = [roster.pm, cfg.includeChiefOfStaff ? roster.cos : undefined].filter(
    Boolean,
  ) as CatalogAgent[]
  const allAgents = [...roster.analysis, ...roster.risk, ...activeSynth]

  const estimate = estimateUsd(allAgents, activeSynth.length > 0)

  const base: Omit<RunRecord, 'ok' | 'note' | 'finishedAt' | 'costUsd'> = {
    id: `run_${startedAt}`,
    context: cfg.context,
    startedAt,
    analysis: [],
    risk: [],
    synthesis: { portfolioManager: null, chiefOfStaff: null },
    estimateUsd: estimate,
  }

  // Pre-flight cost gate — refuse before dispatch.
  if (estimate > runCap) {
    const rec: RunRecord = { ...base, ok: false, note: `estimate $${estimate} exceeds per-run cap $${runCap}`, finishedAt: now().toISOString(), costUsd: 0 }
    return rec
  }
  const spentToday = await store.getDailySpend(day)
  if (spentToday + estimate > dailyCap) {
    const rec: RunRecord = { ...base, ok: false, note: `daily spend $${spentToday.toFixed(2)} + estimate $${estimate} exceeds daily cap $${dailyCap}`, finishedAt: now().toISOString(), costUsd: 0 }
    return rec
  }

  // Phase 1 — analysis, blind-parallel.
  const analysis = await Promise.all(
    roster.analysis.map((a) =>
      executor.runAgent<AgentVerdictT>({
        agent: a,
        schema: AgentVerdict as z.ZodType<AgentVerdictT>,
        system: systemFor(a),
        prompt: analysisPrompt(a, cfg.context),
        maxOutputTokens: MAX_TOKENS.analysis,
      }),
    ),
  )
  const analysisDigest = digest(analysis)

  // Phase 2 — risk, parallel, sees analysis.
  const risk = await Promise.all(
    roster.risk.map((a) =>
      executor.runAgent<AgentVerdictT>({
        agent: a,
        schema: AgentVerdict as z.ZodType<AgentVerdictT>,
        system: systemFor(a),
        prompt: riskPrompt(a, cfg.context, analysisDigest),
        maxOutputTokens: MAX_TOKENS.risk,
      }),
    ),
  )
  const debate = `${analysisDigest}\n\n## Risk\n${digest(risk)}`

  // Phase 3 — synthesis.
  let portfolioManager: AgentRunResult<SynthesisOutputT> | null = null
  if (roster.pm) {
    portfolioManager = await executor.runAgent<SynthesisOutputT>({
      agent: roster.pm,
      schema: SynthesisOutput as z.ZodType<SynthesisOutputT>,
      system: systemFor(roster.pm),
      prompt: synthesisPrompt(roster.pm, cfg.context, debate),
      maxOutputTokens: MAX_TOKENS.synthesis,
    })
  }
  let chiefOfStaff: AgentRunResult<AgentVerdictT> | null = null
  if (cfg.includeChiefOfStaff && roster.cos) {
    chiefOfStaff = await executor.runAgent<AgentVerdictT>({
      agent: roster.cos,
      schema: AgentVerdict as z.ZodType<AgentVerdictT>,
      system: systemFor(roster.cos),
      prompt: synthesisPrompt(roster.cos, cfg.context, debate),
      maxOutputTokens: MAX_TOKENS.analysis,
    })
  }

  const costUsd = Number(
    [...analysis, ...risk, portfolioManager, chiefOfStaff]
      .filter(Boolean)
      .reduce((n, r) => n + (r as AgentRunResult<unknown>).costUsd, 0)
      .toFixed(4),
  )

  const record: RunRecord = {
    ...base,
    ok: true,
    finishedAt: now().toISOString(),
    analysis,
    risk,
    synthesis: { portfolioManager, chiefOfStaff },
    costUsd,
  }

  await store.addDailySpend(day, costUsd)
  await store.saveRun(record)
  return record
}
