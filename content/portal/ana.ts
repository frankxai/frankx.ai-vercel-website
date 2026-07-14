import type { PortalPartner } from './types'

/**
 * Ana Cecilia Cancino — private-team workspace preview.
 *
 * This is intentionally noindex and contains no live client or candidate data.
 * The source of truth for the operating sequence is Ana HR Operations v1.
 */
export const ana: PortalPartner = {
  slug: 'ana',
  name: 'Ana Cecilia Cancino',
  relationship: 'ally',
  status: 'draft',
  accent: 'soul',
  noindex: true,
  lastUpdated: '2026-07-14',

  title: 'Ana Team Workspace',
  tagline: 'One shared client path. Clear ownership. Decisions stay with the right people.',

  provides: [
    {
      title: 'Daily client control',
      detail:
        'A client-alias view of stage, owner, due date, blocker, and the decision waiting for its named owner.',
    },
    {
      title: 'First-call capture',
      detail:
        'Guided discovery that separates client facts, assumptions, open decisions, owners, and dates.',
    },
    {
      title: 'Kickoff and role brief',
      detail:
        'A repeatable route from confirmed scope to job-relevant requirements and structured evidence.',
    },
    {
      title: 'Offer and pricing draft',
      detail:
        'Scope, exclusions, deliverables, timing, and commercial terms prepared from Ana-approved sources only.',
    },
    {
      title: 'Recruiting delivery',
      detail:
        'Consistent stages and aggregate client status while candidate identities and evidence remain in the approved ATS.',
    },
    {
      title: 'Invoice and handoff checks',
      detail:
        'Reconciled invoice drafts and exact recipient/channel checks before Ana gives a fresh send approval.',
    },
  ],

  projectPlan: [
    {
      phase: 'Current working flow',
      window: 'Available now',
      outcome:
        'Eight guided procedures, templates, validation, privacy rules, Google Docs routing, and human approval gates are maintained in the Ana business-kit repository.',
      status: 'done',
    },
    {
      phase: 'Working-trial decision',
      window: 'Review together',
      outcome:
        'Confirm ownership, approved source systems, a privacy-safe practice case, and the exact success measures for a focused 30-day trial.',
      status: 'in-progress',
    },
    {
      phase: 'Privacy-safe practice',
      window: 'Next',
      outcome:
        'Run a past case with private details removed, or a made-up practice case, before connecting master templates, live candidate data, or external sends.',
      status: 'next',
    },
  ],

  yearPlan: [
    {
      quarter: 'Q1',
      theme: 'Source of truth and roles',
      milestones: [
        'Name one owner and one approver for every stage',
        'Confirm Drive, ATS, finance, and private-record boundaries',
      ],
    },
    {
      quarter: 'Q2',
      theme: 'Practice case and one approved engagement',
      milestones: [
        'Complete the workflow on a practice case with no private details',
        'Guide one approved live engagement with all gates visible',
      ],
    },
    {
      quarter: 'Q3',
      theme: 'Shared work view and reference library',
      milestones: [
        'Keep only the steps that earn their place in daily work',
        'Organize approved templates and examples so they are easy to find and reuse',
      ],
    },
    {
      quarter: 'Q4',
      theme: 'Client experience and product decision',
      milestones: [
        'Test a shareable guide using approved example content only',
        'Decide whether the Cecilia name, paid access, and commercial model should proceed',
      ],
    },
  ],

  recommendations: [
    {
      kind: 'download',
      slug: 'ana-ai-business-kit',
      why: 'The team guide, client path, and optional technical setup for the maintained HR Operations workflow.',
    },
    {
      kind: 'blog',
      slug: 'inner-hr-ai-agent',
      why: 'A useful reflection on human judgment and internal clarity; not a substitute for the operating SOPs.',
    },
  ],

  compounding: [
    {
      month: 0,
      title: 'Shared sequence',
      body:
        'The team can see the same client stages, source facts, missing decisions, owners, dates, and approvals.',
    },
    {
      month: 3,
      title: 'A better working rhythm',
      body:
        'A privacy-safe practice case and one controlled engagement show where the team gains time and where Ana’s judgment must stay explicit.',
    },
    {
      month: 6,
      title: 'Reusable team knowledge',
      body:
        'Approved examples and templates make the team’s best work easier to find, reuse, and improve together.',
    },
    {
      month: 12,
      title: 'Optional client experience',
      body:
        'If clients benefit from the working trial, Ana can decide whether a shareable guide, client workspace, or Cecilia experience deserves further investment.',
    },
  ],

  sharedUpside: [
    'Ana’s method becomes easier to run consistently without giving software control over hiring, pricing, invoices, or client communication.',
    'The team spends less time rebuilding the same documents and more time on research, candidate care, and client judgment.',
    'Frank can maintain the technical layer while Ana retains her name, method, client relationships, and approval authority.',
  ],

  team: [
    {
      role: 'Ana — accountable lead',
      howFrankHelps:
        'Keeps the decisions Ana chooses to retain visible while ownership and routine work remain clear across the team.',
    },
    {
      role: 'HR team — delivery owners',
      howFrankHelps:
        'Keeps stages, approved templates, quality checks, and pending decisions visible in plain language; GitHub is not part of the team’s daily work.',
    },
  ],

  crossLinks: [
    {
      surface: 'downloads',
      label: 'Start Ana HR Operations',
      href: '/downloads/ana-ai-business-kit',
      rationale: 'The current install path, first prompt, and human-control boundaries.',
    },
    {
      surface: 'research',
      label: 'FrankX Research',
      href: '/research',
      rationale: 'Public research context; Ana’s future private library remains a separate, permissioned workspace.',
    },
  ],

  alliesHref: '/allies/ana-cancino',
  friendsHref: '/friends/ana',
  downloadHref: '/downloads/ana-ai-business-kit',

  cta: {
    label: 'Review the operating proposal',
    href: '/allies/ana-cancino',
  },

  seo: {
    title: 'Ana Team Workspace × FrankX',
    description:
      "An unlisted workspace preview for Ana and her team: shared stages, clear ownership, private source boundaries, and explicit human approvals.",
  },
}
