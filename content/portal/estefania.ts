import type { PortalPartner } from './types'

/**
 * Estefania Badra — TheEpicWays. Leadership, communication, workshops, events.
 *
 * Ported from app/allies/epic-ways/page.tsx + app/friends/estefania/page.tsx.
 * No new claims — only reorganized into the portal schema shape.
 */
export const estefania: PortalPartner = {
  slug: 'estefania',
  name: 'Estefanía Badra',
  org: 'TheEpicWays',
  relationship: 'ally',
  status: 'active',
  accent: 'soul',
  lastUpdated: '2026-07-01',

  title: 'TheEpicWays Intelligence System',
  tagline: 'Better rooms. Stronger follow-through.',

  provides: [
    {
      title: 'Client Signal Agent',
      detail: 'Discovery brief, tension map, and pre-room questions before the offer is written.',
    },
    {
      title: 'Offer Architect',
      detail: 'Proposal, product tier, deliverables, and outcome language.',
    },
    {
      title: 'Workshop Designer',
      detail: 'Agenda, exercises, prompts, slides, and facilitation plan.',
    },
    {
      title: 'Room Memory Agent',
      detail: 'Summary, decisions, action tracker, and manager scripts captured after the room.',
    },
    {
      title: 'Impact Analyst',
      detail: 'Clarity, ownership, decision speed, retention risk, and energy signals.',
    },
    {
      title: 'Content Repurposer',
      detail: 'Approved posts, scripts, newsletters, talks, and event assets from the same source material.',
    },
  ],

  projectPlan: [
    {
      phase: 'Service loop shipped',
      window: 'Live',
      outcome:
        'Signal → Shape → Room → Memory → Growth loop defined and running for TheEpicWays workshops and events, plus a downloadable starter kit.',
      status: 'done',
    },
    {
      phase: 'Agent pack installed',
      window: 'In progress',
      outcome:
        'Codex/Claude-ready agent briefs (client signal, offer architect, workshop designer, room memory, impact analyst, content repurposer) rolled out one at a time as each proves useful in a real room.',
      status: 'in-progress',
    },
    {
      phase: 'Client workspace + dashboard',
      window: 'Next',
      outcome:
        'Notion or Drive client workspace plus a lightweight owner dashboard so follow-up and reuse stop depending on memory.',
      status: 'next',
    },
  ],

  yearPlan: [
    {
      quarter: 'Q1',
      theme: 'Prove the loop on one offer',
      milestones: [
        'Run the Signal → Shape → Room → Memory → Growth loop end to end on one workshop format',
        'Ship the first Room Memory Agent output as a real action tracker for a client',
      ],
    },
    {
      quarter: 'Q2',
      theme: 'Extend across the offer ladder',
      milestones: [
        'Apply the loop to a second offer tier (leadership diagnostic or Leadership Lab)',
        'Stand up the client workspace so briefs and memory persist between engagements',
      ],
    },
    {
      quarter: 'Q3',
      theme: 'Content compounding',
      milestones: [
        'Turn approved room outcomes into a repeatable content pipeline (posts, case studies, talk material)',
        'Review which agent-pack outputs earned their keep and cut the ones that did not',
      ],
    },
    {
      quarter: 'Q4',
      theme: 'Package the pattern',
      milestones: [
        'Document the client-intelligence loop as a reusable pattern for other service-based allies',
        'Decide whether the retainer tier (client intelligence retainer) is ready to formalize',
      ],
    },
  ],

  recommendations: [
    {
      kind: 'library',
      slug: 'atomic-habits',
      why: 'Leadership and communication workshops live or die on follow-through — Atomic Habits is the sharpest public framework for the behavior-change work TheEpicWays does after the room.',
    },
    {
      kind: 'library',
      slug: 'deep-work',
      why: "Room design and facilitation prep need protected focus time — Deep Work is the practical reference for guarding that before a workshop.",
    },
    {
      kind: 'download',
      slug: 'epicways-intelligence',
      why: "Estefania's own starter kit — the client-intelligence system already built for TheEpicWays.",
    },
  ],

  compounding: [
    {
      month: 0,
      title: 'Foundations',
      body: 'Service loop defined. Starter kit published. First agent briefs available for the room-prep and follow-up stages.',
    },
    {
      month: 3,
      title: 'First loop proven',
      body: 'One offer runs the full Signal → Shape → Room → Memory → Growth cycle with a real client, producing a reusable action tracker.',
    },
    {
      month: 6,
      title: 'Workspace live',
      body: 'Client workspace and dashboard replace ad hoc notes. A second offer tier runs through the same loop.',
    },
    {
      month: 12,
      title: 'Pattern packaged',
      body: 'The client-intelligence loop is documented well enough to reuse for other service-based allies, and the retainer tier is either running or clearly scoped.',
    },
  ],

  sharedUpside: [
    'TheEpicWays keeps the room, the voice, and the client relationship — the system only strengthens delivery before and after.',
    'Every approved room outcome becomes reusable content, cutting the cost of the next proposal, post, or case study.',
    'A working client-intelligence pattern for one leadership-and-events business becomes a template FrankX can offer other service-led allies.',
  ],

  team: [
    {
      role: 'Estefanía Badra — Founder, TheEpicWays',
      howFrankHelps: 'Backstage intelligence (research, prep, memory, follow-up, content reuse) so the room stays hers.',
    },
  ],

  crossLinks: [
    {
      surface: 'research',
      label: 'Research Hub',
      href: '/research',
      rationale: 'Background reading on AI-assisted service delivery that informs the client-intelligence loop.',
    },
    {
      surface: 'downloads',
      label: 'Starter kit',
      href: '/downloads/epicways-intelligence',
      rationale: 'The installable version of the system described on this page.',
    },
  ],

  alliesHref: '/allies/epic-ways',
  friendsHref: '/friends/estefania',
  downloadHref: '/downloads/epicways-intelligence',

  cta: {
    label: 'Download starter kit',
    href: '/downloads/epicways-intelligence',
  },

  seo: {
    title: 'TheEpicWays × FrankX — Client Intelligence System | Partner Portal',
    description:
      "Estefanía Badra's leadership and communication workshops, framed as a client-intelligence system: signal, room design, memory, and follow-up.",
  },
}
