// AI CoE Readiness Assessment — scoring engine.
//
// Pure, dependency-free, unit-testable. Spec: starlight/factory/ai-coe.product-experience.v1.md
// (§3-6). The enterprise twin of the Operator Scorecard — the qualification gate into the
// Architect Sprint / CoE Retainer lane. 6 dimensions, 12 questions, 5 maturity levels
// (Ad Hoc -> Piloting -> Scaling -> Industrializing -> Autonomous-Ready).
//
// No framework imports here on purpose — this file is imported both by the Next.js client
// component and directly by node:test in scripts/test-ai-coe-readiness-engine.mjs.
//
// Scoring arithmetic (dimension tallying, tier resolution, ceiling selection) is shared with
// the Operator Scorecard via ../scorecard/shared — this is the second concrete product to use
// it, which is what justified extracting it in the first place.

import { tallyScores, resolveTier, lowestScoringDimension } from '../scorecard/shared.ts'

export type DimensionId =
  | 'execSponsorship'
  | 'dataArchitecture'
  | 'useCaseMaturity'
  | 'talentOpModel'
  | 'governanceRisk'
  | 'roiDiscipline'

export interface Dimension {
  id: DimensionId
  label: string
  /** One-line definition shown on the radar / report legend. */
  description: string
}

export const DIMENSIONS: Dimension[] = [
  {
    id: 'execSponsorship',
    label: 'Exec Sponsorship',
    description: 'Does a named executive own outcomes and budget, or is AI everyone’s side project?',
  },
  {
    id: 'dataArchitecture',
    label: 'Data & Architecture',
    description: 'Is there a governed data/model layer use cases build on, or is access ad hoc per team?',
  },
  {
    id: 'useCaseMaturity',
    label: 'Use-Case Maturity',
    description: 'Are use cases running in production with measured outcomes, or still pilots that never graduate?',
  },
  {
    id: 'talentOpModel',
    label: 'Talent & Op Model',
    description: 'Is there a staffed operating model with a real bench, or does it depend on one enthusiast?',
  },
  {
    id: 'governanceRisk',
    label: 'Governance & Risk',
    description: 'Are there real review gates and an incident process, or is this one prompt from a headline?',
  },
  {
    id: 'roiDiscipline',
    label: 'ROI Discipline',
    description: 'Is value measured and attributed per use case, or is "AI ROI" a slide with nothing behind it?',
  },
]

export interface QuestionOption {
  id: string
  label: string
  /** 0-3 readiness points for this answer. */
  points: 0 | 1 | 2 | 3
}

export interface Question {
  id: string
  dimension: DimensionId
  prompt: string
  options: QuestionOption[]
}

const scale = (opts: [string, 0 | 1 | 2 | 3][]): QuestionOption[] =>
  opts.map(([label, points], i) => ({ id: String.fromCharCode(97 + i), label, points }))

export const QUESTIONS: Question[] = [
  {
    id: 'execSponsorship-1',
    dimension: 'execSponsorship',
    prompt: 'Who owns AI outcomes at the executive level?',
    options: scale([
      ['No one specific — it is distributed across teams.', 0],
      ['A working group or committee tracks it part-time.', 1],
      ['A named VP or Director owns the mandate and reports on it.', 2],
      ['A named executive owns budget and outcomes, and reports to the CEO or board.', 3],
    ]),
  },
  {
    id: 'execSponsorship-2',
    dimension: 'execSponsorship',
    prompt: 'What happens when an AI initiative needs budget or a policy exception fast?',
    options: scale([
      ['It waits for the next planning cycle.', 0],
      ['It gets raised informally and sometimes moves.', 1],
      ['There is a defined escalation path that usually works.', 2],
      ['The sponsoring executive can approve it directly, the same week.', 3],
    ]),
  },
  {
    id: 'dataArchitecture-1',
    dimension: 'dataArchitecture',
    prompt: 'How would you describe the data and model access layer your use cases actually run on?',
    options: scale([
      ['Ad hoc — each team pulls data its own way, no shared layer.', 0],
      ['Some shared data sources, but access and quality vary by team.', 1],
      ['A defined architecture — gateway, permissions, catalog — most teams use.', 2],
      ['A governed platform — access, lineage, and model routing are centrally managed.', 3],
    ]),
  },
  {
    id: 'dataArchitecture-2',
    dimension: 'dataArchitecture',
    prompt: 'If a new use case needed a new data source tomorrow, how long until it is usable and governed?',
    options: scale([
      ['Weeks to months — every integration is bespoke.', 0],
      ['A couple of weeks, mostly manual wiring.', 1],
      ['Days — there is a repeatable onboarding path.', 2],
      ['Hours — the platform is built for this.', 3],
    ]),
  },
  {
    id: 'useCaseMaturity-1',
    dimension: 'useCaseMaturity',
    prompt: 'How many AI use cases are actually running in production today, not in a pilot or sandbox?',
    options: scale([
      ['None — everything is still a demo or a pilot.', 0],
      ['One, and it took much longer than planned to get there.', 1],
      ['A handful, with a repeatable path from pilot to production.', 2],
      ['Several, with a portfolio view and a pipeline of what is next.', 3],
    ]),
  },
  {
    id: 'useCaseMaturity-2',
    dimension: 'useCaseMaturity',
    prompt: 'What typically happens to a pilot before it would reach production here?',
    options: scale([
      ['We do not really know — pilots quietly stop getting mentioned.', 0],
      ['Unclear ownership of who takes it from pilot to production.', 1],
      ['It usually makes it, sometimes slower than we would like.', 2],
      ['Pilots rarely die — the graduation path is a known process.', 3],
    ]),
  },
  {
    id: 'talentOpModel-1',
    dimension: 'talentOpModel',
    prompt: 'Who runs your AI use cases day to day?',
    options: scale([
      ['A handful of enthusiasts doing it alongside their real job.', 0],
      ['A small informal team, with no defined roles.', 1],
      ['A defined team with clear roles — product, engineering, risk.', 2],
      ['A staffed operating model with a bench deep enough to survive someone leaving.', 3],
    ]),
  },
  {
    id: 'talentOpModel-2',
    dimension: 'talentOpModel',
    prompt: 'What happens to institutional AI knowledge when your best person leaves?',
    options: scale([
      ['It leaves with them.', 0],
      ['Some of it lives in a shared doc; most does not.', 1],
      ['Documented playbooks cover most of what they did.', 2],
      ['The role is designed to be handed off — nothing is a single point of failure.', 3],
    ]),
  },
  {
    id: 'governanceRisk-1',
    dimension: 'governanceRisk',
    prompt: 'What review happens before an agent gets access to a new system or dataset?',
    options: scale([
      ['None — whoever is building it just wires it up.', 0],
      ['An informal check with a colleague or manager.', 1],
      ['A defined review with security or risk sign-off.', 2],
      ['A standing review board with an audit trail and revocation process.', 3],
    ]),
  },
  {
    id: 'governanceRisk-2',
    dimension: 'governanceRisk',
    prompt: 'If an agent took a wrong, costly, or embarrassing action in production today, what would happen?',
    options: scale([
      ['We would probably find out from a customer or the press first.', 0],
      ['We would catch it eventually through normal monitoring.', 1],
      ['We would catch it fast and have a rollback or incident process.', 2],
      ['We would catch it in real time, with an owner and a rehearsed response.', 3],
    ]),
  },
  {
    id: 'roiDiscipline-1',
    dimension: 'roiDiscipline',
    prompt: 'How is AI value measured?',
    options: scale([
      ['It is not, really — we assume it is helping.', 0],
      ['Anecdotes and a few success stories get shared around.', 1],
      ['Specific use cases have real before/after metrics.', 2],
      ['Every production use case has attributed ROI reviewed on a cadence.', 3],
    ]),
  },
  {
    id: 'roiDiscipline-2',
    dimension: 'roiDiscipline',
    prompt: 'When budget gets tight, how does AI spend hold up?',
    options: scale([
      ['It is usually one of the first things cut — no one can defend it with numbers.', 0],
      ['It survives on reputation more than evidence.', 1],
      ['The use cases with clear ROI get protected.', 2],
      ['AI spend is treated like any other line item, with defendable ROI.', 3],
    ]),
  },
]

export type TierId = 'ad-hoc' | 'piloting' | 'scaling' | 'industrializing' | 'autonomous-ready'

export interface Tier {
  id: TierId
  label: string
  /** Inclusive lower bound, 0-100 scale of total score. */
  minScore: number
  headline: string
  description: string
  /**
   * One sharp line of peer positioning — direct, credibility-first, zero
   * playfulness. Shown as the tier lands in the reveal sequence, separate
   * from `description`'s fuller diagnostic paragraph.
   */
  tierLine: string
}

// Boundaries: 0-19 / 20-39 / 40-59 / 60-79 / 80-100. Clean quintiles matching the spec's
// five-stage maturity curve so the labeled level reads like a benchmark, not a percentile.
export const TIERS: Tier[] = [
  {
    id: 'ad-hoc',
    label: 'Ad Hoc',
    minScore: 0,
    headline: 'There is no operating system yet.',
    description:
      'AI activity here is real but uncoordinated — no named owner, no governed data path, no production use case. This is where most enterprise AI programs actually start. The fix is a scoped first build, not another strategy deck.',
    tierLine: 'This is the stage most CoE charters get written at — and stall at.',
  },
  {
    id: 'piloting',
    label: 'Piloting',
    minScore: 20,
    headline: 'Pilots exist. Production does not.',
    description:
      'The organization can start AI projects. It has not yet proven it can finish one — pilots stall before they reach governed production. The gap is graduation, not another proof of concept.',
    tierLine: 'The pilot-to-production gap is the single most common place enterprise AI programs die.',
  },
  {
    id: 'scaling',
    label: 'Scaling',
    minScore: 40,
    headline: 'Production is real. Governance has not caught up.',
    description:
      'Use cases are live and delivering value, but the review gates, incident response, and ROI instrumentation have not scaled with them. This is precisely the stage where an ungoverned agent becomes a board-level incident.',
    tierLine: 'Proof of value is no longer the question here — proof of control is.',
  },
  {
    id: 'industrializing',
    label: 'Industrializing',
    minScore: 60,
    headline: 'The operating model is real.',
    description:
      'A staffed team, a governed platform, and a portfolio of production use cases are in place. The remaining gap is usually the one dimension no one has touched — closing it compounds everything else already running.',
    tierLine: 'Ahead of most enterprise AI programs we assess. The remaining gap is narrow and named.',
  },
  {
    id: 'autonomous-ready',
    label: 'Autonomous-Ready',
    minScore: 80,
    headline: 'Most CoEs never get here.',
    description:
      'Exec ownership, governed architecture, production use cases, a real bench, standing review gates, and attributed ROI are all in place. The frontier from here is compounding what already runs and publishing the proof.',
    tierLine: 'Fewer enterprise AI programs reach this stage than leadership decks tend to admit.',
  },
]

export interface CeilingCopy {
  dimension: DimensionId
  name: string
  description: string
  /**
   * The named, board-relevant risk this ceiling currently carries — enterprise
   * buyers respond to risk framing more reliably than to upside framing. One
   * sentence, specific, never hypothetical hand-waving.
   */
  riskExposure: string
  actions: [string, string, string]
}

export const CEILINGS: Record<DimensionId, CeilingCopy> = {
  execSponsorship: {
    dimension: 'execSponsorship',
    name: 'Exec Sponsorship',
    description:
      'Nothing durable gets built without a named owner who controls budget and answers for outcomes. Right now AI here is everyone’s initiative and no one’s job.',
    riskExposure:
      'Named risk: initiative churn. Without one accountable executive, AI programs restart every reorg — the capability never compounds long enough to earn the board’s confidence.',
    actions: [
      'Name one executive as the single accountable owner of AI outcomes this quarter — not a committee.',
      'Give that owner a real budget line and a report-out cadence to the board, not just a channel.',
      'Write the one-sentence mandate: what they own, what they can approve without escalation.',
    ],
  },
  dataArchitecture: {
    dimension: 'dataArchitecture',
    name: 'Data & Architecture',
    description:
      'Every use case is currently rebuilding its own path to data and models. That is not a governance gap — it is the reason nothing scales past the team that built it.',
    riskExposure:
      'Named risk: shadow data pipelines. Ungoverned, team-by-team data access is how sensitive data ends up in an uncontrolled model call — the incident that turns into a regulatory conversation.',
    actions: [
      'Inventory every data source currently feeding an AI use case, and who approved that access.',
      'Stand up one shared gateway or catalog for the next new use case instead of another bespoke integration.',
      'Assign an architecture owner accountable for model and data access decisions across teams.',
    ],
  },
  useCaseMaturity: {
    dimension: 'useCaseMaturity',
    name: 'Use-Case Maturity',
    description:
      'Pilots keep launching and quietly stalling before production. The organization has proven it can start AI projects — not that it can finish them.',
    riskExposure:
      'Named risk: credibility decay. Every pilot that dies quietly without a stated reason spends down the board’s patience for the next one.',
    actions: [
      'Pick the single pilot closest to production and name what is actually blocking graduation.',
      'Define pilot-to-production graduation criteria before starting the next pilot.',
      'Kill or ship every pilot older than one quarter — no permanent pilots.',
    ],
  },
  talentOpModel: {
    dimension: 'talentOpModel',
    name: 'Talent & Op Model',
    description:
      'The work currently depends on a small number of individuals doing this alongside their day job. That is not a team — it is a single point of failure with a headcount of one or two.',
    riskExposure:
      'Named risk: key-person exposure. If your most capable AI operator left tomorrow, most of what they built would stop improving — and no one could tell you why it broke.',
    actions: [
      'Document the playbook your best AI operator runs — the one currently only in their head.',
      'Define at least one explicit role, even part-time, with AI delivery as a real job description.',
      'Cross-train a second person on the highest-value use case before adding a new one.',
    ],
  },
  governanceRisk: {
    dimension: 'governanceRisk',
    name: 'Governance & Risk',
    description:
      'There is no standing review before an agent gets access to something new, and no rehearsed response if it does something wrong in production.',
    riskExposure:
      'Named risk: unowned incident. The first time an agent takes a costly or embarrassing action, the board’s question is who approved its access — and right now that question has no clean answer.',
    actions: [
      'Stand up a lightweight review gate — even a single sign-off — before any agent gets new system or data access.',
      'Write the one-page incident response: who is paged, who can revoke access, who talks to the board.',
      'Run one tabletop exercise: simulate an agent’s costly mistake and time your actual response.',
    ],
  },
  roiDiscipline: {
    dimension: 'roiDiscipline',
    name: 'ROI Discipline',
    description:
      'AI value is currently a story, not a number. That is the exact reason AI budget is first on the cut list the moment finance tightens.',
    riskExposure:
      'Named risk: unattributed spend. Without per-use-case ROI, every dollar of AI spend is defended by anecdote — the weakest possible position when budgets get reviewed.',
    actions: [
      'Pick your single highest-visibility use case and instrument a real before/after metric this month.',
      'Put AI spend on the same reporting cadence and rigor as any other line item.',
      'Kill the use case with the weakest evidence of value before defending a new one.',
    ],
  },
}

export interface DimensionScore {
  dimension: DimensionId
  label: string
  raw: number
  max: number
  pct: number
}

export interface ReadinessResult {
  totalRaw: number
  totalMax: number
  /** 0-100, rounded. */
  totalScore: number
  tier: Tier
  dimensionScores: DimensionScore[]
  ceiling: CeilingCopy
}

export function getTierForScore(score: number): Tier {
  return resolveTier(TIERS, score)
}

/**
 * Scores a completed (or partial) assessment.
 * `answers` maps questionId -> optionId. Unanswered questions score 0.
 */
export function scoreReadiness(answers: Record<string, string>): ReadinessResult {
  const { dimensionScores, totalRaw, totalMax, totalScore } = tallyScores(DIMENSIONS, QUESTIONS, answers)
  const tier = getTierForScore(totalScore)

  // The ONE named ceiling + risk-exposure callout = lowest-scoring dimension.
  // Ties break toward the dimension listed first in DIMENSIONS (exec
  // sponsorship first — nothing else durably fixes without it).
  const ceiling = CEILINGS[lowestScoringDimension(dimensionScores)]

  return { totalRaw, totalMax, totalScore, tier, dimensionScores, ceiling }
}
