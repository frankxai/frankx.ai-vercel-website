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
  tagline: 'One shared client path. Clear owners. Ana keeps the decisions.',

  provides: [
    {
      title: 'Daily client control',
      detail:
        'A client-alias view of stage, owner, due date, blocker, and the approval waiting for Ana.',
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
      phase: 'HR Operations v1',
      window: 'Available now',
      outcome:
        'Eight guided procedures, templates, validation, privacy rules, Google Docs routing, and human approval gates are maintained in the Ana business-kit repository.',
      status: 'done',
    },
    {
      phase: 'Pilot decision',
      window: 'Awaiting Ana',
      outcome:
        'Confirm the team roles, approved source systems, copied rehearsal, and exact success measures for a bounded 30-day pilot.',
      status: 'in-progress',
    },
    {
      phase: 'Copied rehearsal',
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
      theme: 'Copied rehearsal and one live pilot',
      milestones: [
        'Complete the workflow on a practice case with no private details',
        'Guide one approved live engagement with all gates visible',
      ],
    },
    {
      quarter: 'Q3',
      theme: 'Team workspace and learning library',
      milestones: [
        'Keep only the procedures the team actually uses',
        'Add approved templates, examples, and short training paths',
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
      why: 'The plain-language start page for the maintained HR Operations workflow and installation path.',
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
      title: 'One proven path',
      body:
        'A copied rehearsal and controlled live engagement show where the system saves time and where Ana’s judgment must stay explicit.',
    },
    {
      month: 6,
      title: 'Team learning library',
      body:
        'Approved examples and templates help new team members learn the process without relying on Ana’s memory alone.',
    },
    {
      month: 12,
      title: 'Optional client product',
      body:
        'Only after the team is comfortable with the workflow, Ana can decide whether a shareable guide, client workspace, or paid Cecilia experience has earned the next build.',
    },
  ],

  sharedUpside: [
    'Ana’s method becomes teachable without giving software control over hiring, pricing, invoices, or client communication.',
    'The team spends less time rebuilding the same documents and more time on research, candidate care, and client judgment.',
    'Frank can maintain the technical layer while Ana retains her name, method, client relationships, and approval authority.',
  ],

  team: [
    {
      role: 'Ana — accountable lead',
      howFrankHelps:
        'Makes every approval, blocker, and next action visible so Ana can lead by exception instead of reconstructing the process for each person.',
    },
    {
      role: 'HR team — three colleagues',
      howFrankHelps:
        'Provides guided stages, approved templates, quality checks, and a learning path that does not require GitHub expertise.',
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
      surface: 'ai-coe',
      label: 'AI Center of Excellence',
      href: '/ai-coe',
      rationale: 'The broader governance pattern for team adoption, experiments, review, and reusable capability.',
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
      "A private workspace preview for Ana's four-person HR team: shared stages, guided documents, private source boundaries, and explicit human approvals.",
  },
}
