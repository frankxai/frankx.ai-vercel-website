import type { PortalPartner } from './types'

/**
 * Ahmad Hashem — Trinity AI Founder Creator System.
 *
 * Ported from app/allies/trinity-ai/page.tsx + app/friends/ahmad/page.tsx.
 * No new claims — only reorganized into the portal schema shape. The source
 * ally page is careful to separate public signal from FrankX's proposed
 * architecture; this portal entry keeps that same separation.
 */
export const ahmad: PortalPartner = {
  slug: 'ahmad',
  name: 'Ahmad Hashem',
  org: 'Trinity AI',
  relationship: 'ally',
  status: 'building',
  accent: 'tech',
  noindex: true,
  lastUpdated: '2026-07-01',

  title: 'Trinity AI Founder Creator System',
  tagline: "A founder rhythm: decide, build, publish, learn, improve.",

  provides: [
    {
      title: 'Founder operating system',
      detail: 'Mission, audience, offer, roadmap, repo map, proof loop, decisions, and weekly cadence.',
    },
    {
      title: 'Local Jarvis lab',
      detail: 'Mac mini or Mac Studio setup with OpenClaw, voice routines, Hermes-style operator briefs, ACOS, and private repo workflows.',
    },
    {
      title: 'Agent swarm',
      detail: 'Small markdown agents for chief of staff, repo acceleration, content, media, academy, growth, and brand guardrails.',
    },
    {
      title: 'Media engine',
      detail: 'One idea becomes scripts, images, video, carousel, podcast outline, LinkedIn post, and follow-up prompts.',
    },
    {
      title: 'Template library',
      detail: 'FrankX and SIS templates turned into practical startup blueprints, not abstract repo tourism.',
    },
  ],

  projectPlan: [
    {
      phase: 'Starter kit shipped',
      window: 'Live',
      outcome: 'Ahmad founder-creator kit published (v0.1.0) with agent briefs, offer maps, content workflows, and install guidance.',
      status: 'done',
    },
    {
      phase: 'First offer and content loop',
      window: 'In progress',
      outcome: 'Clarify Trinity AI, the first audience, and the one offer that can be explained in normal words; ship the first carousel, founder note, and short-form video from one source idea.',
      status: 'in-progress',
    },
    {
      phase: 'Local Jarvis lab',
      window: 'Next',
      outcome: 'Optional local AI workstation (OpenClaw, ACOS) added once the first offer and content rhythm are proven — power tools introduced after the rhythm is real, not before.',
      status: 'next',
    },
  ],

  yearPlan: [
    {
      quarter: 'Q1',
      theme: 'Clarify the container',
      milestones: [
        'Name the first AI-supported product, audience, and demo in plain language',
        'Install the starter kit, agent briefs, and private content library',
      ],
    },
    {
      quarter: 'Q2',
      theme: 'Ship the first content loop',
      milestones: [
        'Publish the first carousel, founder note, and short-form video from one source idea',
        'Review feedback and tighten the offer',
      ],
    },
    {
      quarter: 'Q3',
      theme: 'Decide on the power stack',
      milestones: [
        'Evaluate whether ACOS, OpenClaw, or a private repo earns its place given the content rhythm so far',
        'If yes, stand up the local Jarvis lab around the proven workflow',
      ],
    },
    {
      quarter: 'Q4',
      theme: 'Academy and podcast groundwork',
      milestones: [
        'Package the learning journey so far into short lessons or a founder-episode format',
        'Review the founder operating system against a full quarter of real use and cut what did not help',
      ],
    },
  ],

  recommendations: [
    {
      kind: 'research',
      slug: 'multi-agent-systems',
      why: 'The agent-swarm layer of the founder system draws directly on multi-agent orchestration patterns.',
    },
    {
      kind: 'research',
      slug: 'ai-ops',
      why: 'The local Jarvis lab is, functionally, a personal AI Ops stack — the 5-layer model applies at founder scale too.',
    },
    {
      kind: 'library',
      slug: 'the-4-hour-workweek',
      why: 'The founder-creator system exists to automate the repeatable parts of running Trinity AI so Ahmad can focus on the parts only he can do.',
    },
    {
      kind: 'blog',
      slug: 'build-your-own-jarvis-claude-code',
      why: 'Direct blueprint for the local Jarvis lab described in the founder system.',
    },
    {
      kind: 'product',
      slug: 'six-primitives-primer',
      why: 'Free entry point for the six-primitives mental model (model, tool, memory, loop, spec, deploy) underneath the agent swarm.',
    },
    {
      kind: 'download',
      slug: 'ahmad-founder-creator-kit',
      why: "Ahmad's own starter kit — agent briefs, offer maps, content workflows, and the first startup roadmap.",
    },
  ],

  compounding: [
    {
      month: 0,
      title: 'Foundations',
      body: 'Starter kit installed. Trinity AI framed as a startup container to clarify, not a finished claim.',
    },
    {
      month: 3,
      title: 'First content loop',
      body: 'First carousel, founder note, and short-form video shipped from one source idea. Offer tightened from real feedback.',
    },
    {
      month: 6,
      title: 'Power stack decision',
      body: 'ACOS and OpenClaw added only if the content rhythm earned it — the local Jarvis lab stands up around a proven workflow, not a hypothetical one.',
    },
    {
      month: 12,
      title: 'Academy groundwork',
      body: 'A founder operating system that has survived a full quarter of real use, plus early material for a creator-academy or podcast format.',
    },
  ],

  sharedUpside: [
    'Ahmad keeps the founder voice and the Trinity AI story public-facing; the AI tooling stays backstage until it earns its place.',
    'Each proven workflow (content loop, agent brief, offer map) becomes a reusable pattern for other founder-creators FrankX supports.',
    'Public story, private tools, and content stay clearly separated so the system never gets ahead of what is actually shipped.',
  ],

  team: [
    {
      role: 'Ahmad Hashem — Founder, Trinity AI',
      howFrankHelps: 'Founder operating system, starter kit, and an agent swarm introduced in the right order — starter kit first, power stack once the rhythm is real.',
    },
  ],

  crossLinks: [
    {
      surface: 'research',
      label: 'Research Hub',
      href: '/research',
      rationale: 'Multi-agent and AI Ops research underneath the agent-swarm and local-lab design.',
    },
    {
      surface: 'downloads',
      label: 'Starter kit',
      href: '/downloads/ahmad-founder-creator-kit',
      rationale: 'The installable version of the founder-creator system described on this page.',
    },
  ],

  alliesHref: '/allies/trinity-ai',
  friendsHref: '/friends/ahmad',
  downloadHref: '/downloads/ahmad-founder-creator-kit',

  cta: {
    label: 'Download the kit',
    href: '/downloads/ahmad-founder-creator-kit',
  },

  seo: {
    title: 'Trinity AI × FrankX — Founder Creator System | Partner Portal',
    description:
      'A practical founder-creator system for Ahmad Hashem and Trinity AI: local AI lab, agent swarm, media loop, and startup offers.',
  },
}
