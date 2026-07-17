// The gen router — one call resolves backend × lane × pattern × gate into a plan.
//
// This is the keystone the whole gen layer composes into. The /gen command and the
// gen skill call route() to turn a plain request ("a hero for the ACOS page, anime
// lane") into an executable GenPlan: which engine, which pattern, the fully-resolved
// prompt with lane art-direction baked in, and the gate steps that must pass before
// anything ships. Nothing here calls a model — it produces the plan; the skill/scripts
// execute it. Pure and testable.

import { getBackend, type GenBackend } from './backends'
import { getLane, DEFAULT_LANE, type AestheticLane, type LaneId } from './lanes'
import { bestPattern, type RankedPattern, type UseCase, type Format } from './patterns'

export interface GenRequest {
  /** The thing to depict, e.g. "the ACOS orchestrator". */
  subject: string
  /** Scene/context detail the pattern weaves in. Optional. */
  context?: string
  useCase: UseCase
  /** Aesthetic lane. Defaults to liquid-glass. */
  laneId?: LaneId
  format?: Format
  /** Force a specific backend id; otherwise the pattern/lane decide. */
  backendId?: string
}

export interface GenPlan {
  backend: GenBackend
  lane: AestheticLane
  pattern: RankedPattern
  /** The prompt sent to the engine: pattern template (slots filled) + lane fragments. */
  resolvedPrompt: string
  negativePrompt: string
  aspectRatio: string
  imageSize: '1K' | '2K' | '4K'
  /** Ordered checklist the output must pass before publish. */
  gate: string[]
  /** Why these choices — surfaced to the operator. */
  rationale: string[]
}

function fillTemplate(template: string, subject: string, context: string): string {
  return template.replace(/\{subject\}/g, subject).replace(/\{context\}/g, context)
}

function pickBackend(
  explicitId: string | undefined,
  pattern: RankedPattern,
  lane: AestheticLane,
): GenBackend {
  const order = [explicitId, pattern.recommendedBackend, ...lane.bestBackends].filter(
    Boolean,
  ) as string[]
  for (const id of order) {
    const b = getBackend(id)
    if (b) return b
  }
  // Last resort: the lane's first declared backend must resolve, or the registry is broken.
  const fallback = getBackend(lane.bestBackends[0])
  if (!fallback) {
    throw new Error(
      `gen router: no resolvable backend for lane "${lane.id}". Check lib/gen/backends.ts.`,
    )
  }
  return fallback
}

export function route(req: GenRequest): GenPlan {
  const laneId = req.laneId ?? DEFAULT_LANE
  const lane = getLane(laneId)
  if (!lane) throw new Error(`gen router: unknown lane "${laneId}".`)

  const pattern = bestPattern(req.useCase, laneId, req.format)
  if (!pattern) {
    throw new Error(
      `gen router: no pattern for useCase "${req.useCase}" (lane ${laneId}). Add one to lib/gen/patterns.ts.`,
    )
  }

  const backend = pickBackend(req.backendId, pattern, lane)

  const context = req.context?.trim() || `${lane.essence}`
  const body = fillTemplate(pattern.template, req.subject, context)
  const resolvedPrompt = [
    body,
    '## STYLE',
    lane.promptFragments.map((f) => `- ${f}`).join('\n'),
  ].join('\n')

  const gate = [
    'visual-creation: organic-first, no batch before approval',
    'visual-creation: Council review (Brand / Director / Storyteller)',
    `lane "${lane.name}" quality bar:`,
    ...lane.qualityBar.map((q) => `  · ${q}`),
    'brand-voice: alt text + any on-image copy passes the AI-tone refusal list',
    'integrity-guard: final brand/claim/schema gate before publish',
  ]

  const rationale = [
    `Lane: ${lane.name} (${lane.spectrum}) — ${lane.essence}`,
    `Pattern: ${pattern.name}${
      pattern.winRate != null
        ? ` — ${Math.round(pattern.winRate * 100)}% win over ${pattern.evalCount} judged ships`
        : ' — no eval history yet'
    }`,
    `Backend: ${backend.name} (${backend.tier})${
      req.backendId ? ' [forced]' : ' [auto]'
    } — ${backend.tagline}`,
    `Output: ${pattern.aspectRatio} at ${pattern.imageSize}`,
  ]

  return {
    backend,
    lane,
    pattern,
    resolvedPrompt,
    negativePrompt: lane.negativePrompt,
    aspectRatio: pattern.aspectRatio,
    imageSize: pattern.imageSize,
    gate,
    rationale,
  }
}

// ─── Learning loop ────────────────────────────────────────────────────────
// After an output ships and is judged, record the outcome. scripts/gen-rank.mjs
// reads the append-only log and rebuilds data/gen/winrate.json, which patterns.ts
// overlays so the next route() biases toward winners.

export interface GenOutcome {
  patternId: string
  won: boolean
  surface: string
  judge: 'council' | 'hook-learn' | 'operator'
  ts: string
}

/** Build an outcome record. The caller appends the JSON line to data/gen/outcomes.jsonl
 *  (kept out of this pure module so route() never touches the filesystem). */
export function buildOutcome(
  patternId: string,
  won: boolean,
  surface: string,
  judge: GenOutcome['judge'],
  ts: string,
): GenOutcome {
  return { patternId, won, surface, judge, ts }
}
