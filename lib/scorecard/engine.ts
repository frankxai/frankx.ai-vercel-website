// FrankX Operator Scorecard — scoring engine.
//
// Pure, dependency-free, unit-testable. Spec: starlight/factory/frankx.product-experience.v1.md
// (Agent Stack Scorecard, §3-4). Tier names and dimension set per the build brief layered on
// top of that spec: 6 dimensions, ~11 questions, 4 tiers (Solo Operator -> Hybrid Delegator ->
// Agentic Leader -> Ambient Operator).
//
// No framework imports here on purpose — this file is imported both by the Next.js client
// component and directly by node:test in scripts/test-scorecard-engine.mjs.
//
// Scoring arithmetic (dimension tallying, tier resolution, ceiling selection) lives in
// ./shared — extracted once the AI CoE Readiness Assessment became a second product needing
// the identical math. This file keeps its exact public exports so nothing downstream changes.

import { tallyScores, resolveTier, lowestScoringDimension } from './shared.ts'

export type DimensionId =
  | 'delegation'
  | 'systemization'
  | 'agentFluency'
  | 'distribution'
  | 'offerClarity'
  | 'runway'

export interface Dimension {
  id: DimensionId
  label: string
  /** One-line definition shown on the radar / report legend. */
  description: string
}

export const DIMENSIONS: Dimension[] = [
  {
    id: 'delegation',
    label: 'Delegation Reflex',
    description: 'Do you hand tasks to an agent by default, or do you still just do it yourself?',
  },
  {
    id: 'systemization',
    label: 'Systemization',
    description: 'Is your recurring work documented and reusable, or rebuilt from memory every time?',
  },
  {
    id: 'agentFluency',
    label: 'Agent Fluency',
    description: 'Are you running one chat window, or a roster of configured agents with real jobs?',
  },
  {
    id: 'distribution',
    label: 'Owned Distribution',
    description: 'Do you have a direct line to an audience, or are you renting attention from an algorithm?',
  },
  {
    id: 'offerClarity',
    label: 'Offer Clarity',
    description: 'Can you say your offer and price in one sentence, and does a checkout actually work?',
  },
  {
    id: 'runway',
    label: 'Runway',
    description: 'How long could you keep building at this pace if income stopped tomorrow?',
  },
]

export interface QuestionOption {
  id: string
  label: string
  /** 0-3 operator-maturity points for this answer. */
  points: 0 | 1 | 2 | 3
  /**
   * Optional hover/focus microcopy — a single dry aside shown only for the
   * option currently under the cursor or keyboard focus. Reserved for the
   * handful of answers where a sharp observation earns its place; most
   * options carry none. Never shown by default, never emoji, never hype.
   */
  hint?: string
}

export interface Question {
  id: string
  dimension: DimensionId
  prompt: string
  options: QuestionOption[]
}

const scale = (opts: [string, 0 | 1 | 2 | 3, string?][]): QuestionOption[] =>
  opts.map(([label, points, hint], i) => ({ id: String.fromCharCode(97 + i), label, points, hint }))

export const QUESTIONS: Question[] = [
  {
    id: 'delegation-1',
    dimension: 'delegation',
    prompt: 'When a task could be done by you or by an agent, what actually happens?',
    options: scale([
      ["I do it myself almost every time — it's faster to just do it.", 0],
      ['I hand off simple, repetitive tasks to a tool or VA sometimes.', 1],
      ['I have specific agents or workflows I hand tasks to by default.', 2],
      [
        "My default question is \"what's the config for this?\" before I touch it myself.",
        3,
        'The instinct that actually compounds. Most people never ask it.',
      ],
    ]),
  },
  {
    id: 'delegation-2',
    dimension: 'delegation',
    prompt: 'What happened the last time you were completely offline for 24+ hours?',
    options: scale([
      ['Nothing moved — everything waits for me.', 0],
      ["A few pre-scheduled posts or emails went out, nothing adaptive.", 1],
      ['An agent or automation worked through a defined task queue without me.', 2],
      ["Real work happened — content, code, replies — that I didn't touch, and it was fine.", 3],
    ]),
  },
  {
    id: 'systemization-1',
    dimension: 'systemization',
    prompt: 'How much of your recurring work lives in a documented, repeatable process — not just in your head?',
    options: scale([
      ['None — I rebuild the approach every time.', 0],
      ['A few notes or templates I sometimes remember to use.', 1],
      ['Defined SOPs or templates for my core repeat tasks.', 2],
      ['A living system — skills, playbooks, configs — that gets reused and improved.', 3],
    ]),
  },
  {
    id: 'systemization-2',
    dimension: 'systemization',
    prompt: 'Does your setup remember anything about you or your work across sessions?',
    options: scale([
      ['No — every new chat or session starts from zero.', 0],
      ['I paste in context by hand each time.', 1],
      ['I have some saved prompts or docs I reference.', 2],
      [
        'I have a persistent memory system that agents actually read.',
        3,
        'Rarer than it should be — most "systems" still live in one human\'s head.',
      ],
    ]),
  },
  {
    id: 'agentFluency-1',
    dimension: 'agentFluency',
    prompt: 'How many AI agents — not chat windows — are actively doing something for you right now?',
    options: scale([
      ['Zero — I use chat, not agents.', 0],
      ['One assistant I prompt manually for most things.', 1],
      ['A couple of configured agents or GPTs for specific jobs.', 2],
      ['A roster of agents with distinct roles, some running unattended.', 3],
    ]),
  },
  {
    id: 'agentFluency-2',
    dimension: 'agentFluency',
    prompt: 'Have you built or configured a skill, custom tool, or MCP-style integration yourself?',
    options: scale([
      ["I don't know what that means yet.", 0],
      ["I've used ones other people built.", 1],
      ["I've customized or lightly built one.", 2],
      [
        'I regularly build and ship my own skills, tools, or agent configs.',
        3,
        "This is the actual unlock — most operators stop at \"used one.\"",
      ],
    ]),
  },
  {
    id: 'distribution-1',
    dimension: 'distribution',
    prompt: 'Where does your audience actually live?',
    options: scale([
      ["I don't really have one yet.", 0],
      ['A social profile I post to occasionally.', 1],
      ['A modest but real following or list I reach regularly.', 2],
      ['An owned list or community I can reach directly, on demand, with real engagement.', 3],
    ]),
  },
  {
    id: 'distribution-2',
    dimension: 'distribution',
    prompt: 'If you published something today, how fast could real people actually see it?',
    options: scale([
      [
        "I'd have to hope the algorithm cooperates.",
        0,
        'Most "direct lines" are actually algorithms wearing a costume.',
      ],
      ['Within a day or two via my usual channel.', 1],
      ['Same day, via multiple channels I control.', 2],
      ['Within the hour — I have a direct line I trust.', 3],
    ]),
  },
  {
    id: 'offerClarity-1',
    dimension: 'offerClarity',
    prompt: 'Can you name your current paid offer and its price in one sentence, no hedging?',
    options: scale([
      ["I don't have a paid offer right now.", 0],
      ['I have something, but the pricing or positioning shifts a lot.', 1],
      ['Yes — one clear offer at a clear price.', 2],
      ['Yes — a ladder (entry, mid, premium) that is clearly named.', 3],
    ]),
  },
  {
    id: 'offerClarity-2',
    dimension: 'offerClarity',
    prompt: 'What happened the last time someone tried to pay you?',
    options: scale([
      ["That hasn't happened yet.", 0],
      ['It was manual and a little awkward — an invoice, a DM, "let me send you a link."', 1],
      ['There is a working checkout, occasionally used.', 2],
      [
        'There is a working checkout that converts routinely.',
        3,
        'The whole business fits in this one sentence.',
      ],
    ]),
  },
  {
    id: 'runway-1',
    dimension: 'runway',
    prompt: 'If income stopped tomorrow, how long could you keep building at this pace?',
    options: scale([
      ['Days to a couple of weeks.', 0, "Most people don't say this out loud. Good that you did."],
      ['About a month.', 1],
      ['A few months.', 2],
      ['Six-plus months, or the business is already cash-flow positive.', 3],
    ]),
  },
]

export type TierId = 'solo-operator' | 'hybrid-delegator' | 'agentic-leader' | 'ambient-operator'

export interface Tier {
  id: TierId
  label: string
  /** Inclusive lower bound, 0-100 scale of total score. */
  minScore: number
  headline: string
  description: string
  /**
   * One sharp line of recognition — calm wit, zero hype, no emoji. Shown as
   * the tier lands in the reveal sequence, separate from `description`'s
   * fuller diagnostic paragraph.
   */
  tierLine: string
}

// Boundaries: 0-24 / 25-49 / 50-74 / 75-100. Kept as round quartiles so the
// labeled level reads like a clean benchmark, not an arbitrary percentile.
export const TIERS: Tier[] = [
  {
    id: 'solo-operator',
    label: 'Solo Operator',
    minScore: 0,
    headline: 'You are the system.',
    description:
      'Every output in your business currently depends on you being in the room. That is not a character flaw — it is the default starting point. The fix is one delegation, not a rebuild.',
    tierLine: 'You are the org chart. Every box reports to you, including the ones that shouldn\'t.',
  },
  {
    id: 'hybrid-delegator',
    label: 'Hybrid Delegator',
    minScore: 25,
    headline: "You've started handing off pieces.",
    description:
      "Some tasks move without you now, but nothing runs end-to-end without your hand on it. You're one step from a roster, not a rebuild.",
    tierLine: "Delegation exists. It just hasn't become the default yet.",
  },
  {
    id: 'agentic-leader',
    label: 'Agentic Leader',
    minScore: 50,
    headline: 'You run a real roster.',
    description:
      'Multiple agents, a system that remembers, and a channel you own. The remaining gap is usually the one dimension you have not touched yet.',
    tierLine: "You run a roster now, not a routine. Most of the estate isn't there.",
  },
  {
    id: 'ambient-operator',
    label: 'Ambient Operator',
    minScore: 75,
    headline: 'Work happens while you sleep.',
    description:
      "You've closed the loop from delegation to distribution to revenue. The frontier from here is compounding what already runs, and publishing the proof.",
    tierLine: "Things ship on days you don't open a laptop. That's the actual bar.",
  },
]

export interface CeilingCopy {
  dimension: DimensionId
  name: string
  description: string
  actions: [string, string, string]
}

export const CEILINGS: Record<DimensionId, CeilingCopy> = {
  delegation: {
    dimension: 'delegation',
    name: 'Delegation Reflex',
    description:
      "Your default is still \"I'll just do it\" — until that flips, nothing scales past your own hours.",
    actions: [
      'Pick one task you did manually this week and hand it to a single-purpose agent tomorrow — not a whole workflow, just one task.',
      'Install one copy-paste skill and run it once, unattended, before you touch the task yourself.',
      'Write down the recurring task you resent most — that is your first delegation target, not the interesting one.',
    ],
  },
  systemization: {
    dimension: 'systemization',
    name: 'Systemization',
    description:
      "You're rebuilding your approach from memory every time — nothing compounds because nothing is written down.",
    actions: [
      'Turn your last three ad-hoc prompts into one reusable skill or template file.',
      'Set up a persistent memory file — even a single markdown doc — that your agent reads before each session.',
      'Document the one process you repeat weekly as a numbered SOP, five steps or fewer.',
    ],
  },
  agentFluency: {
    dimension: 'agentFluency',
    name: 'Agent Fluency',
    description:
      "You're still driving one chat window at a time — the leverage is in running more than one thing at once.",
    actions: [
      'Configure a second agent with one narrow job this week: research, drafts, or triage. Pick one.',
      'Run one real task through an agent CLI or MCP server instead of a toy example.',
      'Give an agent a task and walk away for an hour. Measure what it produced without you.',
    ],
  },
  distribution: {
    dimension: 'distribution',
    name: 'Owned Distribution',
    description:
      "You don't have a direct line to an audience yet — every other fix is capped until people can actually hear you.",
    actions: [
      'Start a single-field email capture today, tied to one piece of proof you publish weekly.',
      'Publish something you already built — a config, a result, a teardown — natively where your audience already is.',
      'Pick one channel and post there daily for two weeks before adding a second.',
    ],
  },
  offerClarity: {
    dimension: 'offerClarity',
    name: 'Offer Clarity',
    description:
      "If you can't say your offer and price in one sentence, neither can the person about to pay you.",
    actions: [
      'Write your offer as one sentence: what it is, who it is for, what it costs. No hedging.',
      'Cut your offer list to one entry point and one upgrade. Kill the middle.',
      'Get a real checkout link working today, even if the product behind it is rough.',
    ],
  },
  runway: {
    dimension: 'runway',
    name: 'Runway',
    description: 'Your runway is short enough that panic, not strategy, is setting your priorities.',
    actions: [
      'Write down your real number: months of runway at current burn, no rounding up.',
      'Ship the smallest paid thing you can today — proof of a buyer beats a bigger roadmap.',
      "Cut one recurring cost this week that isn't earning its keep.",
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

export interface ScorecardResult {
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
 * Scores a completed (or partial) scorecard.
 * `answers` maps questionId -> optionId. Unanswered questions score 0.
 */
export function scoreScorecard(answers: Record<string, string>): ScorecardResult {
  const { dimensionScores, totalRaw, totalMax, totalScore } = tallyScores(DIMENSIONS, QUESTIONS, answers)
  const tier = getTierForScore(totalScore)

  // The ONE named ceiling = lowest-scoring dimension. Ties break toward the
  // dimension listed first in DIMENSIONS (delegation first — it is the
  // highest-leverage fix per the spec's moment-of-proof framing).
  const ceiling = CEILINGS[lowestScoringDimension(dimensionScores)]

  return { totalRaw, totalMax, totalScore, tier, dimensionScores, ceiling }
}
