import type { PartnerProposal } from './types'
import { MEET_AND_GROW_URL } from '@/lib/cta-links'

/**
 * Anthropic — independently authored relationship proposal draft.
 *
 * Unlisted. noindex via the layout. Not in sitemap. This file does not claim
 * the draft was sent, reviewed, accepted, or endorsed. Named contacts never
 * appear here — the intended audience is referenced by role only.
 */
export const anthropic2026q2: PartnerProposal = {
  slug: 'anthropic-2026q2',
  partnerSlug: 'anthropic',
  recipientRole: 'Partner Program Lead, EMEA',
  sentDate: 'draft',
  status: 'draft',
  publicationBasis: 'independent-proposal',
  consentStatus: 'not-requested',
  privacyClassification: 'public-only',

  title:
    'Anthropic × FrankX — exploratory collaboration draft',

  intro:
    'This is an unsent FrankX draft for a possible fit conversation. Frank uses Claude Code across public projects and learning material; the program, credits, editorial, and event ideas below are requests for consideration, not commitments or evidence of an Anthropic relationship.',

  whatsAlreadyShared: [
    'Frank uses Claude Code across public site, system, and curriculum work.',
    'FrankX maintains public repositories at github.com/frankxai; any fit review should begin by inspecting the relevant artifacts there.',
    'The Build First AI Agent workshop includes Claude as one possible agent path.',
    'FrankX publishes independent Claude-related notes through the site and GitHub.',
    'FrankX publishes independent observations from daily Claude Code use; no private feedback channel is claimed.',
  ],

  proposalSummary:
    'FrankX proposes a small, evidence-led fit review: first determine whether any Anthropic ecosystem pathway is appropriate; then, only with mutual approval, test one workshop or editorial pilot. Credits, co-marketing, DevRel access, events, and program status are explicit asks rather than assumed outcomes. Each later milestone depends on the previous pilot producing useful results and both sides agreeing in writing.',

  timeline: [
    {
      quarter: 'Phase 1 — fit review',
      milestones: [
        'Proposed: confirm whether an applicable Anthropic ecosystem pathway exists',
        'Proposed: review one FrankX-authored workshop module',
        'Proposed: identify one research topic worth a joint editorial review',
        'Proposed: record a fit or no-fit decision before any public status change',
      ],
    },
    {
      quarter: 'Phase 2 — bounded pilot',
      milestones: [
        'Conditional: run one approved workshop or editorial pilot',
        'Conditional: define attribution and review boundaries in writing',
        'Conditional: measure learning or reader outcomes',
        'Conditional: decide whether a technical feedback channel is useful',
      ],
    },
    {
      quarter: 'Phase 3 — continue or close',
      milestones: [
        'Conditional: continue only if the pilot produced useful evidence',
        'Conditional: publish any attribution only after written approval',
        'Conditional: consider an event or second module as a separate decision',
        'Conditional: close the proposal cleanly if there is no mutual fit',
      ],
    },
  ],

  asks: [
    {
      category: 'Program entry',
      detail:
        'Guidance on whether any Anthropic ecosystem pathway is appropriate for FrankX. No application is claimed; a clear no-fit answer is also useful.',
    },
    {
      category: 'Credits',
      detail:
        'If an approved workshop pilot proceeds, consider limited attendee credits for its Claude path. This is a request, not an existing allocation or scheduled cohort.',
    },
    {
      category: 'Co-marketing',
      detail:
        'Featured customer or featured partner slot on anthropic.com or the learn surface, Q3 timing. The reference implementations are already public; the ask is a discoverability lane on the partner side.',
    },
    {
      category: 'DevRel touchpoint',
      detail:
        'If useful to Anthropic, consider a bounded channel for feedback from FrankX’s independent Claude Code experiments. No customer-engagement evidence or existing roadmap access is claimed.',
    },
  ],

  cta: {
    label: 'Discuss fit for 30 minutes',
    href: 'https://calendar.app.google/xS56zYpYw69R9vQj6',
  },

  postscript:
    'Thirty minutes is enough to test whether there is a useful fit or close the idea cleanly.',
}
