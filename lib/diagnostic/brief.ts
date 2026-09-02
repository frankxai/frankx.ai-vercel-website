// The portable architecture brief — the activation event of the diagnostic.
//
// A score on a screen is not an artifact. A file the visitor keeps, pastes into their own
// agent, and acts on next week is. This builds both representations from the same typed
// result: Markdown for a human or an agent prompt, JSON for a tool.
//
// Two rules hold this honest:
//  1. Nothing in the brief is invented. Every line is either the visitor's own answers,
//     scored copy from lib/scorecard/engine.ts, or a graph node with provenance.
//  2. `generatedAt` is passed in, never read from the clock here, so the same result
//     always produces byte-identical output and the contract test can assert on it.

import type { ScorecardResult } from '../scorecard/engine.ts'
import { routeOffer, type OfferRoute } from './route-offer.ts'

export interface Brief {
  markdown: string
  json: BriefJson
  /** Safe download filename, no spaces. */
  filename: string
}

export interface BriefJson {
  schema: 'frankx.stack-diagnostic.brief'
  schemaVersion: '1.0.0'
  graphVersion: string
  generatedAt: string
  score: { total: number; raw: number; max: number }
  tier: { id: string; label: string }
  dimensions: { id: string; label: string; pct: number }[]
  ceiling: { id: string; name: string; why: string; actions: string[] }
  method: { id: string; title: string; practice: string }
  freeNext: { label: string; href: string; gives: string }
  offer: OfferRoute['offer']
}

const SITE = 'https://frankx.ai'

function absolute(href: string): string {
  return href.startsWith('/') ? `${SITE}${href}` : href
}

function dimensionTable(result: ScorecardResult): string {
  const rows = result.dimensionScores
    .map((d) => `| ${d.label} | ${d.pct}% |`)
    .join('\n')
  return `| Dimension | Score |\n| --- | --- |\n${rows}`
}

export function buildBrief(result: ScorecardResult, generatedAt: string): Brief {
  const route = routeOffer(result)

  const offerBlock = route.offer
    ? [
        '## If you want it packaged',
        '',
        `**${route.offer.label}** — ${route.offer.priceBand}`,
        '',
        route.offer.reason,
        '',
        `${route.offer.gateNote} ${route.offer.foundingBenefit}`,
        '',
        absolute(route.offer.href),
      ].join('\n')
    : ['## If you want it packaged', '', 'Nothing is packaged for this gap yet. The free step above is the whole recommendation.'].join('\n')

  const markdown = [
    '# Architecture brief',
    '',
    `Generated ${generatedAt} from the FrankX operator diagnostic. Everything below comes from your own answers — nothing about you was inferred.`,
    '',
    `**Level:** ${result.tier.label} · **Score:** ${result.totalScore}/100`,
    '',
    result.tier.description,
    '',
    '## Where you scored',
    '',
    dimensionTable(result),
    '',
    '## Your ceiling',
    '',
    `**${result.ceiling.name}** — ${result.ceiling.description}`,
    '',
    'Three moves, in order:',
    '',
    ...result.ceiling.actions.map((a, i) => `${i + 1}. ${a}`),
    '',
    '## The practice that closes it',
    '',
    `**${route.methodTitle}.** ${route.practice}`,
    '',
    '## Free next step',
    '',
    `**${route.freeNext.label}** — ${route.freeNext.gives}`,
    '',
    absolute(route.freeNext.href),
    '',
    offerBlock,
    '',
    '---',
    '',
    `Knowledge-to-offer graph v${route.graphVersion}. This brief was produced in your browser; no copy of it was sent anywhere.`,
    '',
  ].join('\n')

  const json: BriefJson = {
    schema: 'frankx.stack-diagnostic.brief',
    schemaVersion: '1.0.0',
    graphVersion: route.graphVersion,
    generatedAt,
    score: { total: result.totalScore, raw: result.totalRaw, max: result.totalMax },
    tier: { id: result.tier.id, label: result.tier.label },
    dimensions: result.dimensionScores.map((d) => ({ id: d.dimension, label: d.label, pct: d.pct })),
    ceiling: {
      id: result.ceiling.dimension,
      name: result.ceiling.name,
      why: result.ceiling.description,
      actions: [...result.ceiling.actions],
    },
    method: { id: route.methodId, title: route.methodTitle, practice: route.practice },
    freeNext: route.freeNext,
    offer: route.offer,
  }

  return { markdown, json, filename: `frankx-architecture-brief-${result.ceiling.dimension}` }
}
