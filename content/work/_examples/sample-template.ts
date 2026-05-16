import type { Engagement } from '../types'

/**
 * Example engagement — substrate type.
 *
 * NOT registered in content/work/index.ts. Copy this file to <slug>.ts
 * one level up and edit when shipping a real engagement. The shape here
 * is the contract; every field is exercised so the renderer paths are
 * obvious for a future operator.
 *
 * Voice rules (from CLAUDE.md):
 *   - peer-architect tone, never vendor-pitch
 *   - no AI-tone phrases (delve, dive into, transform, revolutionize, certainly)
 *   - claims about substrate are provable (open-source under frankxai/*)
 */
export const sampleSubstrateEngagement: Engagement = {
  slug: 'sample-substrate-engagement',
  name: 'Example Coaching Company',
  client: 'Example Coaching Company',
  engagementType: 'substrate',
  status: 'live',
  ndaStatus: 'partial',

  // Hero
  title: 'Substrate provider · AI architecture',
  tagline:
    'Open-source substrate underneath their coaching practice — they keep the brand, the clients, and the equity.',
  subTagline:
    'Frank ships the open substrate (Starlight Intelligence Systems, ACOS). They build the business on top. Both stay sovereign.',

  // Substrate positioning strip (top of page band)
  substratePositioning:
    'Not employee. Not on the deck. Substrate provider.',

  // Body
  contextWindow:
    'Example Coaching Company is building an AI-augmented practice — programmatic intake, agentic case-prep, retention analytics, and a coach-side cockpit. They wanted Frank on their team. Frank offered a different shape: open-source substrate underneath the practice, with a bounded consulting layer on top. The substrate stays MIT-licensed at frankxai/starlight-intelligence-system and frankxai/library-os. The coaching company stays sovereign. Frank stays sovereign. No equity, no deck, no exclusivity — the substrate is open, anyone can build on it. The engagement is the architecture conversation around the substrate, scoped quarter by quarter.',

  shipped: [
    {
      label: 'Substrate baseline',
      detail:
        'Starlight Intelligence System v1.1.0 + ACOS agent harness + Library OS reading layer wired into their dev environment. MIT, public, reviewable.',
      url: 'https://github.com/frankxai/Starlight-Intelligence-System',
    },
    {
      label: 'Architecture review',
      detail:
        'Two 90-minute peer-architect sessions covering data-mesh boundaries, agent-harness selection, and the build-vs-buy line for their internal cockpit.',
    },
    {
      label: 'Open-source contribution path',
      detail:
        'PR template + contribution guide so improvements they make to the substrate can flow back upstream when both sides want them to.',
    },
    {
      label: 'Bounded consulting scope',
      detail:
        'Quarterly architecture review (90 min) + one async week of pairing on a named bottleneck. Documented in a one-page brief, ratified each quarter.',
    },
  ],

  stack: [
    {
      category: 'substrate',
      items: [
        'Starlight Intelligence System (MIT)',
        'ACOS agent harness',
        'Library OS',
      ],
    },
    {
      category: 'agent-harness',
      items: ['Claude Code', 'Codex', 'Gemini CLI'],
    },
    {
      category: 'cloud',
      items: ['Vercel (their app)', 'Oracle Cloud Infrastructure (their data layer)'],
    },
    {
      category: 'models',
      items: ['Claude (Anthropic)', 'Gemini (Google)'],
    },
  ],

  outcome:
    'Example Coaching Company shipped their MVP cockpit on top of the open substrate, with the architecture conversation scoped quarter by quarter rather than a long-tenure contract. Frank stays sovereign and keeps the substrate open-source — anyone else building a coaching practice can pick it up tomorrow. Example Coaching Company stays sovereign too — no equity dilution, no platform lock-in, no exclusivity clause. The bounded consulting layer is renewable, ratified each quarter. The substrate-provider model lets a one-human operator support a real business without trading the open-source thesis for a salary.',

  whatThisIsNot: [
    'Equity in their company',
    'Employment or contractor classification',
    'A mention on their investor deck (unless Frank ratifies the framing)',
    'An exclusive licensing arrangement — the substrate is open',
    'A long-tenure retainer with implicit scope creep',
  ],

  cta: {
    label: 'Open a substrate-provider conversation',
    href: 'https://calendar.app.google/xS56zYpYw69R9vQj6',
  },

  accent: 'tech',

  seo: {
    title: 'Example Coaching Company — substrate-provider engagement | FrankX',
    description:
      'How FrankX supports Example Coaching Company through open-source substrate plus a bounded consulting layer. Sovereign on both sides.',
  },
}
