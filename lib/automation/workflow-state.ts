import { z } from 'zod'

/**
 * Typed WorkflowState — LangGraph-style state passed between workflow phases.
 *
 * Today: workflows return one final object. State across phases lives in closure
 * variables. This works but isn't typed at the boundary — a phase can mutate state
 * in ways the downstream phase didn't expect.
 *
 * v0.3 contract: declare a WorkflowState shape per workflow. Each phase receives
 * the prior state, returns the updated state. Validator checks state transitions.
 *
 * This is the substrate. Individual workflows opt in by importing their typed
 * state schema (e.g. NewsletterFridayState).
 *
 * Source pattern: LangGraph State primitive (https://langchain-ai.github.io/langgraph/concepts/low_level/#state).
 */

// Universal envelope present on every WorkflowState
export const baseWorkflowStateSchema = z.object({
  runId: z.string(),
  workflow: z.string(),
  startedAt: z.string(),  // ISO timestamp
  phase: z.string(),       // current phase name
  trajectory: z.object({
    priorRunsSummary: z.string().optional(),
    lessonsLearned: z.array(z.string()).default([]),
  }).optional(),
  humanGate: z.object({
    required: z.boolean(),
    decision: z.enum(['approved', 'rejected', 'pending']).optional(),
    gateId: z.string().optional(),
  }).optional(),
})

export type BaseWorkflowState = z.infer<typeof baseWorkflowStateSchema>

// Per-workflow state schemas extend the base + add domain fields

export const newsletterFridayStateSchema = baseWorkflowStateSchema.extend({
  issueNum: z.number().int().positive(),
  researchStreams: z.array(z.object({
    stream: z.string(),
    items: z.array(z.any()),
  })).default([]),
  synthesis: z.object({
    spotlight: z.array(z.object({
      title: z.string(),
      hook: z.string(),
      sourceUrl: z.string(),
    })),
    essayThesis: z.string(),
  }).optional(),
  draftPath: z.string().optional(),
  integrityVerdict: z.enum(['pass', 'warn', 'fail']).optional(),
})

export type NewsletterFridayState = z.infer<typeof newsletterFridayStateSchema>

export const dependencyAuditStateSchema = baseWorkflowStateSchema.extend({
  mode: z.enum(['audit', 'release']).default('audit'),
  scans: z.array(z.object({
    lens: z.string(),
    findings: z.array(z.any()),
  })).default([]),
  ranked: z.object({
    actions: z.array(z.any()),
    criticalCount: z.number().int().nonnegative(),
    highCount: z.number().int().nonnegative(),
  }).optional(),
})

export type DependencyAuditState = z.infer<typeof dependencyAuditStateSchema>

// Helper to validate state at phase transitions
export function validateStateTransition<T extends z.ZodTypeAny>(
  schema: T,
  fromPhase: string,
  toPhase: string,
  state: unknown,
): z.infer<T> {
  const result = schema.safeParse(state)
  if (!result.success) {
    throw new Error(
      `State transition ${fromPhase} → ${toPhase} failed validation: ${result.error.message}`,
    )
  }
  return result.data
}

/**
 * Future v0.4 work:
 * - Persist state to data/workflow-state/<runId>.json so workflows can resume from
 *   a specific phase rather than re-running everything on retry.
 * - Add state versioning so schema migrations are backward-compatible.
 * - Wire validateStateTransition into workflow-validate.mjs so the static
 *   validator checks every workflow has a typed WorkflowState.
 */
