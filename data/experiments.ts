/**
 * FrankX Experiments — public registry
 *
 * Each entry surfaces a hypothesis-driven experiment at /experiments/<slug>
 * with the raw artifact in experiments/<slug>/ on GitHub.
 *
 * Source-of-truth for data lives in:
 *   - experiments/<slug>/hypothesis.md     (pre-registered claims)
 *   - experiments/<slug>/methodology.md    (protocol)
 *   - experiments/<slug>/results.md         (findings)
 *   - experiments/<slug>/recommendations.md (actions)
 *   - experiments/<slug>/replicate.md       (reproducibility)
 *
 * This file is the INDEX — denormalized for the public surface. When an
 * experiment ships, add a new entry; do not edit historical entries
 * (corrections go in a separate results-amendment.md per acos-meta discipline).
 *
 * @see experiments/README.md for the 5-doc pattern and methodology
 */

export type ExperimentStatus =
  | 'pre-registered'   // hypothesis.md committed, no data yet
  | 'data-collection'  // protocol running, intermediate artifacts in data/
  | 'analysis'         // data complete, results being written
  | 'shipped'          // all 5 docs committed, findings public
  | 'paper'            // formal paper artifact in papers/<slug>.pdf

export type HypothesisVerdict =
  | 'supported'
  | 'partial'
  | 'not-supported'
  | 'deferred'

export interface HypothesisOutcome {
  /** H1, H2, etc. */
  id: string
  /** One-line claim */
  claim: string
  verdict: HypothesisVerdict
  /** Quantitative summary (optional — empty if not yet measured) */
  measurement?: string
}

export interface Experiment {
  /** YYYY-MM-DD-<short-slug> matching experiments/<slug>/ */
  slug: string
  /** Headline title */
  title: string
  /** ISO date — START date, locked at registration */
  date: string
  status: ExperimentStatus
  /** 1-line summary for the card / index */
  oneLiner: string
  /** 50-80 word TL;DR for the deep-dive page */
  tldr: string
  /** Headline quantitative finding for the index card */
  headlineMetric: { label: string; value: string; n?: number }
  /** Hypothesis verdicts in order of registration */
  hypotheses: HypothesisOutcome[]
  /** GitHub raw-artifact URL (always points to main branch when shipped) */
  rawArtifactUrl: string
  /** Optional blog post slug for Tier 2 interpretation */
  blogPostSlug?: string
  /** Optional formal paper artifact */
  paperUrl?: string
  /** Tags for filtering */
  tags: string[]
  /** Citation block (auto-rendered on the page) */
  citation: string
}

export const EXPERIMENTS: Experiment[] = [
  {
    slug: '2026-05-15-agent-format-best-practices',
    title:
      'Agent File Format Best Practices: Cross-Corpus Comparison of FrankX vs May 2026 SOTA',
    date: '2026-05-15',
    status: 'shipped',
    oneLiner:
      'Pre-registered hypothesis-driven audit of 76 FrankX subagent files against AGENTS.md, soul.md, wshobson/agents, metaswarm, OpenClaw.',
    tldr:
      'Audited 76 FrankX subagent files against May 2026 SOTA from 5 external corpora. H1 (frontmatter completeness lifts mean ≥0.20) verified empirically at +0.21. H2 (rubric-check correlation ≥0.3) failed — checks measure independent dimensions, informative negative. H4 (single-orchestrator pattern compliance) verified 9/9 on Meta-Infrastructure pillar. FrankX has independently arrived at 3 of 5 May 2026 convergent SOTA patterns.',
    headlineMetric: { label: 'Catalog mean structural score', value: '5.76 → 6.05/9 after R1+R2', n: 76 },
    hypotheses: [
      {
        id: 'H1',
        claim: 'Frontmatter model: patch on 16 affected agents lifts catalog mean ≥0.20',
        verdict: 'supported',
        measurement: '+0.21 measured (predicted +0.20)',
      },
      {
        id: 'H2',
        claim: 'Anti-pattern bullets × tool minimality correlate (Pearson ≥0.3)',
        verdict: 'not-supported',
        measurement: 'Phi = 0.109 (n=76) — checks are non-redundant',
      },
      {
        id: 'H3',
        claim: 'CLAUDE.md ↔ AGENTS.md content overlap ≥50%',
        verdict: 'partial',
        measurement: '27-33% overlap — technical-only sections map; strategic content stays Claude-specific',
      },
      {
        id: 'H4',
        claim: 'Pillar 11 Meta agents comply with Anthropic single-orchestrator pattern',
        verdict: 'supported',
        measurement: '9/9 compliant — Anthropic-converged pattern verified',
      },
      {
        id: 'H5',
        claim: 'L99 gates measurably reduce dispatch-time tokens',
        verdict: 'deferred',
        measurement: 'Requires runtime instrumentation; logged for future experiment',
      },
    ],
    rawArtifactUrl:
      'https://github.com/frankxai/FrankX/tree/main/experiments/2026-05-15-agent-format-best-practices',
    tags: ['agents', 'audit', 'sota-comparison', 'meta'],
    citation:
      'Riemer, F., & Claude Opus 4.7 (2026). Agent File Format Best Practices: A Cross-Corpus Comparison of the FrankX 99-Agent Catalog Against May 2026 SOTA. FrankX Experiments. https://github.com/frankxai/FrankX/tree/main/experiments/2026-05-15-agent-format-best-practices',
  },
]

export function experimentBySlug(slug: string): Experiment | undefined {
  return EXPERIMENTS.find((e) => e.slug === slug)
}

export function experimentsByStatus(status: ExperimentStatus): Experiment[] {
  return EXPERIMENTS.filter((e) => e.status === status)
}

export function experimentCount(): number {
  return EXPERIMENTS.length
}

/** Compute counts by verdict across all experiments — for index page summary */
export function aggregateVerdicts(): Record<HypothesisVerdict, number> {
  const counts: Record<HypothesisVerdict, number> = {
    supported: 0,
    partial: 0,
    'not-supported': 0,
    deferred: 0,
  }
  for (const e of EXPERIMENTS) {
    for (const h of e.hypotheses) {
      counts[h.verdict]++
    }
  }
  return counts
}
