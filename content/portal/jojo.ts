import type { PortalPartner } from './types'

/**
 * Jojo (Johannes Steingrüber) — Harzfenster Hospitality Intelligence.
 *
 * Ported from app/allies/harzfenster/page.tsx + app/friends/jojo/page.tsx.
 * No new claims — only reorganized into the portal schema shape.
 */
export const jojo: PortalPartner = {
  slug: 'jojo',
  name: 'Jojo (Johannes Steingrüber)',
  org: 'Harzfenster / Hotel Görtler',
  relationship: 'ally',
  status: 'building',
  accent: 'bridge',
  noindex: true,
  lastUpdated: '2026-07-01',

  title: 'Harzfenster Hospitality Intelligence',
  tagline: 'Protect the craft. Carry the new attention.',

  provides: [
    {
      title: 'Booking Calm',
      detail: 'An approval-based system for reservation notes, waitlist replies, allergies, arrangements, and guest expectations.',
    },
    {
      title: 'Service Briefings',
      detail: 'Daily prep for the restaurant team: table context, menu stories, local producer notes, risks, and owner priorities.',
    },
    {
      title: 'Hotel Connection',
      detail: 'A cleaner bridge between Harzfenster, Hotel Görtler, arrangements, local suggestions, and the second dining path.',
    },
    {
      title: 'Aftercare and Reviews',
      detail: 'Drafts for thank-you notes, review responses, recurring feedback themes, and approved public story ideas.',
    },
  ],

  projectPlan: [
    {
      phase: 'Starter kit shipped',
      window: 'Live',
      outcome: 'Jojo hospitality intelligence starter kit published (v0.1.0).',
      status: 'done',
    },
    {
      phase: 'Week 1-2: mapping + memory',
      window: 'In progress',
      outcome: 'Map current tools, booking flow, guest messages, service briefings, and review workflow; build a private house memory, response draft library, and weekly owner dashboard.',
      status: 'in-progress',
    },
    {
      phase: 'Week 3-4: pilot + review',
      window: 'Next',
      outcome: 'Pilot one or two workflows (reservation prep, service briefing, or review-response support), then review what actually helped and cut what felt noisy.',
      status: 'next',
    },
  ],

  yearPlan: [
    {
      quarter: 'Q1',
      theme: 'Four-week pilot',
      milestones: [
        'Complete the mapping + house-memory phase',
        'Run the pilot on one or two real workflows and keep only what helped',
      ],
    },
    {
      quarter: 'Q2',
      theme: 'Steady operating rhythm',
      milestones: [
        'Run booking calm and service briefings as a normal part of the week',
        'Draft the first batch of review responses and aftercare notes for owner approval',
      ],
    },
    {
      quarter: 'Q3',
      theme: 'Hotel connection',
      milestones: [
        'Extend the system to bridge Harzfenster and Hotel Görtler bookings and arrangements',
        'Review guest-trust rules against a full season of real use',
      ],
    },
    {
      quarter: 'Q4',
      theme: 'Package the pattern',
      milestones: [
        'Document what worked as a reusable hospitality-intelligence pattern',
        'Evaluate whether the pattern is ready to teach to other owner-led restaurants and hotels',
      ],
    },
  ],

  recommendations: [
    {
      kind: 'download',
      slug: 'jojo-hospitality-intelligence-kit',
      why: "Jojo's own starter kit — the hospitality intelligence pilot described on this page.",
    },
  ],

  compounding: [
    {
      month: 0,
      title: 'Foundations',
      body: 'Starter kit installed. Current tools, booking flow, and service briefings mapped.',
    },
    {
      month: 3,
      title: 'Pilot proven',
      body: 'One or two workflows piloted and kept because they measurably helped, not because the tooling exists.',
    },
    {
      month: 6,
      title: 'Steady rhythm',
      body: 'Booking calm and service briefings run as a normal part of the week; guest-trust rules held under real service pressure.',
    },
    {
      month: 12,
      title: 'Pattern packaged',
      body: 'A hospitality-intelligence pattern documented well enough to become a reusable FrankX vertical for other owner-led houses.',
    },
  ],

  sharedUpside: [
    'The house keeps its craft and its guest experience — the system only handles preparation, memory, and follow-up.',
    'Guest trust stays strict: private guest data never enters public tools, and a person approves anything a guest sees.',
    'A proven pilot for one owner-led restaurant and hotel becomes the template for a hospitality-intelligence vertical FrankX can offer other houses.',
  ],

  team: [
    {
      role: 'Johannes Steingrüber (Jojo) — Owner, Harzfenster / Hotel Görtler',
      howFrankHelps: 'A quiet operating layer for bookings, service prep, and follow-up so the house can carry new attention without diluting the craft.',
    },
  ],

  crossLinks: [
    {
      surface: 'downloads',
      label: 'Starter kit',
      href: '/downloads/jojo-hospitality-intelligence-kit',
      rationale: 'The installable version of the hospitality intelligence pilot described on this page.',
    },
  ],

  alliesHref: '/allies/harzfenster',
  friendsHref: '/friends/jojo',
  downloadHref: '/downloads/jojo-hospitality-intelligence-kit',

  cta: {
    label: 'Download starter kit',
    href: '/downloads/jojo-hospitality-intelligence-kit',
  },

  seo: {
    title: 'Harzfenster Hospitality Intelligence × FrankX | Partner Portal',
    description:
      'A practical hospitality intelligence pilot for Jojo, Harzfenster by Johannes Steingrüber, and Hotel Görtler in Seesen.',
  },
}
