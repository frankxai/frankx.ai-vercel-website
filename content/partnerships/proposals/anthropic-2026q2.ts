import type { PartnerProposal } from './types'
import { MEET_AND_GROW_URL } from '@/lib/cta-links'

/**
 * Anthropic — Claude for Work Partner Program proposal, Q2 2026 onwards.
 *
 * Unlisted. noindex via the layout. Not in sitemap. URL is shared directly
 * with the recipient by Frank. Named contacts never appear here — recipient
 * is referenced by role only.
 */
export const anthropic2026q2: PartnerProposal = {
  slug: 'anthropic-2026q2',
  partnerSlug: 'anthropic',
  recipientRole: 'Partner Program Lead, EMEA',
  sentDate: '2026-05-16',
  status: 'draft',

  title:
    'Anthropic × FrankX — Claude for Work Partner Program proposal, Q2 2026 onwards',

  intro:
    "Sending this in Q2 2026 with a specific shape in mind. The practice is already Claude-Code-native — every shipped artifact on frankx.ai ships through Claude Code today. What follows is the formalization lane: Claude for Work Partner Program entry, workshop attendee credits for the EMEA Build First AI Agent cohort, and a quarterly co-published deep-dive on Claude-native AI CoE patterns. The work is in motion; this proposal makes the alignment formal.",

  whatsAlreadyShared: [
    'Claude Code is the harness for every shipped FrankX project — frankx.ai, ACOS, SIS, Library OS, the workshop curriculum, the partnership system itself.',
    'ACOS, SIS, and Library OS are three Claude-Code-native open-source systems, all public on github.com/frankxai.',
    'The Build First AI Agent workshop teaches Claude as a primary agent path to the EMEA enterprise architect audience.',
    'Public builder channels across the site, newsletter, GitHub, and LinkedIn already carry Claude-native CoE patterns.',
    'Active feedback loop on Claude Code skills and the MCP roadmap from daily delivery use in FrankX work.',
    'A2A protocol guide and the agent-framework comparison content publish Claude as the reasoning-lane benchmark.',
  ],

  proposalSummary:
    "Frank's practice is already strongly Anthropic-aligned. This proposal formalizes that alignment via Claude for Work Partner Program entry with workshop attendee credits, co-marketing on the Build First AI Agent workshop (Claude branch), DevRel touchpoint for Claude Code skill pack feedback, and a quarterly co-published deep-dive on Claude-native AI CoE patterns. The shape is three quarters — Q2 application and first deep-dive, Q3 program entry confirmed and EMEA cohort live, Q4 joint EMEA event at NLDigital or Madrid with the Claude Code skill pack v2 published as a partner-tier reference. The surfaces listed are already running.",

  timeline: [
    {
      quarter: '2026 Q2 (May–Jul)',
      milestones: [
        'Claude for Work Partner Program application submitted',
        'First Build First AI Agent workshop launch with the Claude branch featured (EMEA cohort)',
        'First co-published architecture deep-dive on Claude-native AI CoE patterns landed on /research',
        'Partner-tier intake call scheduled with the program team',
      ],
    },
    {
      quarter: '2026 Q3 (Aug–Oct)',
      milestones: [
        'Partner Program entry confirmed; tier and onboarding milestones defined',
        'Workshop attendee credits live for the EMEA Build First AI Agent cohort',
        'Second co-published deep-dive — Claude Code patterns inside multi-cloud agent harnesses',
        'DevRel intro arranged for the Claude Code skill pack feedback loop and MCP roadmap visibility',
      ],
    },
    {
      quarter: '2026 Q4 (Nov–Jan)',
      milestones: [
        'Joint EMEA event at NLDigital or Madrid sequence with a Claude-native CoE keynote',
        'Claude Code skill pack v2 published as an Anthropic-partner-tier reference asset',
        'Third deep-dive on Claude-native CoE EMEA case studies, co-branded',
        'Partner-tier renewal conversation at expanded scope',
      ],
    },
  ],

  asks: [
    {
      category: 'Program entry',
      detail:
        'Claude for Work Partner Program approval for the FrankX practice. The application will be submitted in Q2; the ask is a clean path through review and a defined partner tier with onboarding milestones.',
    },
    {
      category: 'Credits',
      detail:
        'Workshop attendee credit allocation for the Build First AI Agent Claude branch, EMEA cohort. Cohort runs Q3 onwards; credits make the Claude path the lowest-friction option for cohort participants.',
    },
    {
      category: 'Co-marketing',
      detail:
        'Featured customer or featured partner slot on anthropic.com or the learn surface, Q3 timing. The reference implementations are already public; the ask is a discoverability lane on the partner side.',
    },
    {
      category: 'DevRel touchpoint',
      detail:
        'Direct touchpoint with the Claude Code team for skill pack feedback and MCP roadmap visibility. Daily delivery use across customer engagements produces signal; the ask is a clean channel for it.',
    },
  ],

  cta: {
    label: 'Schedule a 30-min peer-level conversation',
    href: 'https://calendar.app.google/xS56zYpYw69R9vQj6',
  },

  postscript:
    'Aware of how full the program-side calendar is — 30 minutes is enough to either move this forward or close it cleanly.',
}
