/**
 * Unlisted partner-proposal schema.
 *
 * These pages live at /partnerships/proposal/<slug> and are NOT indexed by
 * search engines. robots.txt disallows /partnerships/proposal/*. No sitemap
 * entry. The URL is shared by Frank directly with one recipient via email
 * or LinkedIn DM.
 *
 * Each proposal is a deepening of the public strategic-alignment page —
 * timeline-specific, ask-specific, sender/recipient context preserved.
 */

import type { Partner } from '../types'

export type ProposalStatus =
  | 'draft'
  | 'sent'
  | 'reviewing'
  | 'closed-won'
  | 'closed-archived'

export type ProposalQuarter = {
  quarter: string // e.g., "2026 Q2 (May-Jul)"
  milestones: string[]
}

export type ProposalAsk = {
  category: string // e.g., "Program entry", "Credits", "Co-marketing", "DevRel touchpoint"
  detail: string
}

export type PartnerProposal = {
  slug: string // e.g., "anthropic-2026q2"
  partnerSlug: Partner['slug'] // links back to content/partnerships/<slug>.ts
  recipientRole: string // e.g., "Partner Program Lead, EMEA" — NEVER named individual
  sentDate: string // ISO date or "draft"
  status: ProposalStatus

  // Hero (proposal-specific)
  title: string
  intro: string // 2-3 sentences specific to this recipient

  // Body
  whatsAlreadyShared: string[] // pulled forward from partner.alreadyShared but proposal-specific
  proposalSummary: string // 100-150 words: the specific shape being proposed
  timeline: ProposalQuarter[] // 2-4 quarters
  asks: ProposalAsk[] // 3-5 explicit asks

  // Closing
  cta: { label: string; href: string }
  postscript?: string // optional 1-2 sentence personal close
}
