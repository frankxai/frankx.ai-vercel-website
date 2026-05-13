/**
 * Prompt Hub — Type Contract
 *
 * This file defines the canonical TypeScript types for the Prompt Hub substrate.
 * Source-of-truth for every consumer: agents, commands, public pages, OSS repos.
 *
 * See: docs/superpowers/specs/2026-05-13-prompt-hub-design.md
 *
 * Conventions:
 * - Pattern IDs follow `<verb>_<topic>` (Fabric-style verb-prefix).
 * - Version follows semver (patch / minor / major bump rules in spec §6).
 * - Lane segments per-model-family doctrine.
 * - Provenance is mandatory for any non-original pattern.
 * - Eval + red_team scores written back by their respective agents.
 */

// ============================================================================
// Pattern (the unit of the library)
// ============================================================================

export type PatternId = string; // e.g. "extract_wisdom", "summarize_podcast"

export type Lane = 'claude' | 'gpt' | 'gemini' | 'oss' | 'cross-lab';

export type Category =
  | 'analyze'
  | 'create'
  | 'extract'
  | 'summarize'
  | 'answer'
  | 'audit'
  | 'check'
  | 'compare'
  | 'improve'
  | 'write'
  | 'rate'
  | 'introspect'    // psyche flows
  | 'profile';      // psychometric flows

export type Technique =
  | 'chain-of-thought'
  | 'tree-of-thought'
  | 'react'
  | 'constitutional'
  | 'self-consistency'
  | 'atom-of-thoughts'
  | 'few-shot'
  | 'zero-shot'
  | 'prefill'
  | 'xml-tags'
  | 'structured-output'
  | 'retrieval-augmented';

export type License = 'MIT' | 'CC0' | 'Apache-2.0' | 'public-domain' | 'original';

export type ProvenanceSource =
  | 'original'
  | 'fabric'
  | 'awesome-chatgpt-prompts'
  | 'awesome-claude-prompts'
  | 'manual'
  | 'harvested-from-paper'
  | 'lab-docs';

export interface Provenance {
  source: ProvenanceSource;
  source_url?: string;
  attribution?: string;   // e.g. "Daniel Miessler / Fabric, MIT"
  license: License;
}

export type EvalVerdict = 'pass' | 'warn' | 'fail';

export interface EvalScore {
  score: number;          // 0-5 weighted average
  last_run: string;       // ISO date
  test_count: number;
  verdict: EvalVerdict;
}

export type RedTeamVerdict = 'pass' | 'warn' | 'fail';

export interface RedTeamReport {
  status: RedTeamVerdict;
  audited: string;        // ISO date
  notes?: string;
  probes_run?: number;
  probes_passed?: number;
  probes_warn?: number;
  probes_failed?: number;
}

export type PsycheBoundary = 'maps-only' | 'instruments-only' | 'n/a';
export type PsycheRisk = 'low' | 'medium' | 'high';

export interface PsycheFlags {
  applicable: boolean;
  boundary: PsycheBoundary;
  risk: PsycheRisk;
}

export interface PatternFrontmatter {
  id: PatternId;
  title: string;
  version: string;        // semver, e.g. "1.0.0"
  description: string;
  lane: Lane;
  category: Category;
  tags: string[];
  techniques: Technique[];
  provenance: Provenance;
  eval?: EvalScore;
  red_team?: RedTeamReport;
  psyche?: PsycheFlags;
  created: string;        // ISO date
  updated: string;        // ISO date
}

export interface Pattern {
  frontmatter: PatternFrontmatter;
  body: string;           // the actual prompt body (markdown)
  examples?: Example[];
  variants?: Partial<Record<Lane, string>>;
  readme?: string;        // 80-word human summary
}

export interface Example {
  input: string;
  output: string;
  notes?: string;
}

// ============================================================================
// Flow + Agent (orchestration types)
// ============================================================================

export type Flow =
  | 'flow-design'
  | 'flow-optimize'
  | 'flow-evaluate'
  | 'flow-harvest'
  | 'flow-curate'
  | 'flow-introspect'
  | 'flow-profile'
  | 'flow-knowledge-base';

export type AgentName =
  | 'prompt-conductor'
  | 'prompt-claude-specialist'
  | 'prompt-gpt-specialist'
  | 'prompt-gemini-specialist'
  | 'prompt-oss-specialist'
  | 'prompt-architect'
  | 'prompt-optimizer'
  | 'prompt-evaluator'
  | 'prompt-librarian'
  | 'prompt-harvester'
  | 'prompt-red-team'
  | 'prompt-psyche-cartographer'
  | 'prompt-psychometrist';

export interface FlowDispatch {
  flow: Flow;
  specialists: AgentName[];
  parallel?: boolean;     // some legs of a flow can parallelize
}

// ============================================================================
// Library invariants
// ============================================================================

/**
 * Required-fields check. Patterns missing any of these MUST NOT publish.
 */
export const REQUIRED_FRONTMATTER_FIELDS: ReadonlyArray<keyof PatternFrontmatter> = [
  'id',
  'title',
  'version',
  'description',
  'lane',
  'category',
  'provenance',
  'created',
  'updated',
] as const;

export const PUBLISH_GATES = {
  MIN_EVAL_SCORE: 3.5,
  REQUIRED_RED_TEAM_STATUS: 'pass' as RedTeamVerdict,
  REQUIRED_VOICE_GATE: 'pass',
} as const;

export function passesPublishGates(p: PatternFrontmatter): boolean {
  if (!p.eval || p.eval.score < PUBLISH_GATES.MIN_EVAL_SCORE) return false;
  if (!p.red_team || p.red_team.status !== PUBLISH_GATES.REQUIRED_RED_TEAM_STATUS) return false;
  return true;
}

// ============================================================================
// Ranking
// ============================================================================

/**
 * Auto-rank score formula. Per spec §9.2.
 *
 * Hand-edits forbidden in rankings/by-eval-score.md — that file is regenerated.
 */
export function computeRankScore(p: PatternFrontmatter): number {
  const evalScore = p.eval?.score ?? 0;
  const variants = 0; // counted from sibling files at index time
  const isOriginal = p.provenance.source === 'original';
  const redTeamPass = p.red_team?.status === 'pass';

  return (
    evalScore * 0.6 +
    (variants >= 1 ? 0.5 : 0) +
    (isOriginal ? 0.3 : 0) +
    (redTeamPass ? 0.2 : 0)
  );
}

// ============================================================================
// SBO bridge (Cartographer + Psychometrist memory)
// ============================================================================

export interface SboReflection {
  type: 'part' | 'theme' | 'reflection' | 'session-close' | 'profile';
  content: string;
  voiceMode?: 'ifs-self' | 'socratic' | 'stoic' | 'jungian' | 'buddhist' | 'shadow-work';
  provenance: 'cartographer' | 'psychometrist';
  privacy: 'local-only' | 'sync-allowed';
  timestamp: string;
}
