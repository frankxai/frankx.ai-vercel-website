/** Editorial candidate policies reviewed 2026-09-10. No production qualification is implied. */
export interface DecisionRow {
  constraint: string
  primaryId: string
  altId?: string
  reason: string
}

export const DECISION_MATRIX: DecisionRow[] = [
  { constraint: 'Maximum capability; spend unconstrained', primaryId: 'gpt-6-astra', altId: 'claude-opus-5', reason: 'Compare independent solutions on the hardest real tasks. Accept only after evidence review; extra inference is useful only when it improves the accepted result.' },
  { constraint: 'Software and web development', primaryId: 'claude-sonnet-5', altId: 'gpt-6-astra', reason: 'Start with a bounded implementation candidate. Escalate unresolved failures; require build, regression tests, browser checks and a reviewable diff.' },
  { constraint: 'Game development', primaryId: 'gpt-6-astra', altId: 'claude-sonnet-5', reason: 'Evaluate engine integration, deterministic simulation tests, frame-time budget and playability separately. Code benchmarks cannot establish game quality.' },
  { constraint: 'Books and long-form writing', primaryId: 'claude-opus-5', altId: 'gpt-6-astra', reason: 'Compare voice fidelity, continuity, revision burden and reader preference against a locked chapter brief. Use a manuscript memory system and independent continuity checks.' },
  { constraint: 'Content creation and research', primaryId: 'claude-sonnet-5', altId: 'gemini-3-7-flash', reason: 'Require traceable sources, brand review and editable deliverables. Judge the whole workflow; use specialist image, audio and video tools for media output.' },
  { constraint: 'Bulk extraction and support triage', primaryId: 'gemini-3-7-flash', altId: 'claude-haiku-4-5', reason: 'Measure schema correctness, abstention, escalation and tail latency. Compare total spend per accepted item; preserve a human route for consequential exceptions.' },
  { constraint: 'Self-hosting and data control', primaryId: 'mistral-large-3', altId: 'gpt-oss', reason: 'Inspect model license, deployment location, GPU capacity and operating cost. Open weights alone establish neither free inference nor compliance.' },
  { constraint: 'Long-running xAI agents', primaryId: 'grok-4-6', altId: 'grok-4-3', reason: 'Compare completion, recovery from tool failures, context growth and spending limits on the same task. External benchmarks do not qualify the production route.' },
]
