import type { PortalPartner } from './types'

/**
 * Ana Cecilia Cancino — Ana AI Business Kit.
 *
 * Ported from app/allies/ana-cancino/page.tsx + app/friends/ana/page.tsx.
 * The source ally page status is "Noindex draft" — carried through here.
 * No new claims — only reorganized into the portal schema shape.
 */
export const ana: PortalPartner = {
  slug: 'ana',
  name: 'Ana Cecilia Cancino',
  relationship: 'ally',
  status: 'draft',
  accent: 'soul',
  noindex: true,
  lastUpdated: '2026-07-01',

  title: 'Ana AI Business Kit',
  tagline: 'Her voice stays in front. The agents stay backstage.',

  provides: [
    {
      title: 'Mirror Agent',
      detail: 'Reflective drafting support for session prep and follow-up letters.',
    },
    {
      title: 'Research Curator',
      detail: 'Organizes her reading and research into a reusable content library.',
    },
    {
      title: 'Library Cartographer',
      detail: 'Maps existing material into posts, guides, sessions, and small products.',
    },
    {
      title: 'Workshop Architect',
      detail: 'Structures repeatable workshop and circle formats from her existing offers.',
    },
    {
      title: 'Offer Builder',
      detail: 'Turns existing offers into repeatable scripts, intake questions, and follow-up flows.',
    },
    {
      title: 'Brand Guardian',
      detail: 'Keeps public language careful until Ana approves biography, quotes, and deeper personal details.',
    },
  ],

  projectPlan: [
    {
      phase: 'Starter kit shipped',
      window: 'Live',
      outcome: 'Ana AI business kit published (v0.1.0) with agent briefs, offer ladder, and delivery-loop templates.',
      status: 'done',
    },
    {
      phase: 'Intake + follow-up system',
      window: 'In progress',
      outcome: 'Clarify the three core offers (Personal Clarity Session, Guided Reflection Circle, Self-Knowledge Workshop) and install a simple intake + follow-up system.',
      status: 'in-progress',
    },
    {
      phase: 'Guided circle pilot',
      window: 'Next',
      outcome: 'Run the first guided reflection circle, collect feedback, and turn repeated questions into a paid guide.',
      status: 'next',
    },
  ],

  yearPlan: [
    {
      quarter: 'Q1',
      theme: 'Clarify the offer ladder',
      milestones: [
        'Name the three core existing offers in plain language',
        'Install intake questions and an aftercare-letter template',
      ],
    },
    {
      quarter: 'Q2',
      theme: 'Pilot the circle',
      milestones: [
        'Run the first guided reflection circle end to end',
        'Collect feedback and identify the most repeated question worth turning into a guide',
      ],
    },
    {
      quarter: 'Q3',
      theme: 'Light digital shop',
      milestones: [
        'Package reflection cards, session templates, and reading paths as small digital products',
        'Review which agent-pack outputs (Mirror, Research Curator, Offer Builder) actually got used',
      ],
    },
    {
      quarter: 'Q4',
      theme: 'Travel-friendly rhythm',
      milestones: [
        'Run remote-friendly sessions and circles on a schedule that fits her travel',
        'Decide whether the proposed HR/team-clarity offer is worth building out',
      ],
    },
  ],

  recommendations: [
    {
      kind: 'research',
      slug: 'internal-family-systems',
      why: "Ana's self-knowledge and psychology work maps directly onto the IFS model of parts and Self-energy.",
    },
    {
      kind: 'library',
      slug: 'no-bad-parts',
      why: 'The core IFS text behind the self-knowledge and reflective-circle work she already does.',
    },
    {
      kind: 'library',
      slug: 'mans-search-for-meaning',
      why: 'A foundational reference for the meaning-making and self-knowledge framing across her offers.',
    },
    {
      kind: 'blog',
      slug: 'inner-hr-ai-agent',
      why: 'Directly parallels her HR and psychology background — treating the internal system with the same care as a workplace one.',
    },
    {
      kind: 'download',
      slug: 'ana-ai-business-kit',
      why: "Ana's own starter kit — agent briefs, offer ladder, and delivery-loop templates.",
    },
  ],

  compounding: [
    {
      month: 0,
      title: 'Foundations',
      body: 'Starter kit installed. Existing offers named and framed as a repeatable ladder rather than one-off sessions.',
    },
    {
      month: 3,
      title: 'Intake proven',
      body: 'Intake and follow-up system running on real clients across the entry-level offer.',
    },
    {
      month: 6,
      title: 'Circle piloted',
      body: 'First guided reflection circle run end to end, with feedback converted into a paid guide.',
    },
    {
      month: 12,
      title: 'Travel-friendly business',
      body: 'A light digital shop and a remote-friendly session rhythm running alongside her travel — proposed HR/team work evaluated on real demand.',
    },
  ],

  sharedUpside: [
    'Ana keeps her voice, her offers, and her client relationships in front — the agents stay backstage and only draft what she approves.',
    'Every approved client pattern becomes a reusable asset (guide, template, post) instead of starting from zero each time.',
    'A working self-knowledge business pattern becomes a template FrankX can offer other reflective-practice allies.',
  ],

  team: [
    {
      role: 'Ana Cecilia Cancino — Founder',
      howFrankHelps: 'A simple intake-to-follow-up system and a content library built from her existing offers, introduced only where it helps — no technical background required.',
    },
  ],

  crossLinks: [
    {
      surface: 'research',
      label: 'Research Hub',
      href: '/research',
      rationale: 'Internal Family Systems research underneath the self-knowledge and reflective-circle framing.',
    },
    {
      surface: 'downloads',
      label: 'Starter kit',
      href: '/downloads/ana-ai-business-kit',
      rationale: 'The installable version of the business system described on this page.',
    },
  ],

  alliesHref: '/allies/ana-cancino',
  friendsHref: '/friends/ana',
  downloadHref: '/downloads/ana-ai-business-kit',

  cta: {
    label: 'Download the kit',
    href: '/downloads/ana-ai-business-kit',
  },

  seo: {
    title: 'Ana AI Business Kit × FrankX | Partner Portal',
    description:
      "Ana Cecilia Cancino's HR, psychology, and self-knowledge work organized into an offer system, client loop, and travel-friendly business engine.",
  },
}
