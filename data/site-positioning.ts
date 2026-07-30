export const sitePositioning = {
  eyebrow: 'Frank Riemer · AI Architect · Public agentic workspace',
  headline: 'I turn questions into systems—and show the work.',
  introduction:
    'FrankX.ai is my public agentic workspace. I bring the question and point of view. Specialist agents deepen the research, challenge the draft, and build. I choose what becomes public. Follow the work from source to result.',
  shortDescription:
    'Agents extend the reach; Frank chooses what becomes public.',
  primaryAction: {
    label: 'Explore current work',
    href: '#current-work',
  },
  secondaryAction: {
    label: 'See how the workspace runs',
    href: '/workspace',
  },
  roles: [
    {
      label: 'Direction',
      owner: 'Frank',
      detail: 'Sets the question, context, standard, and final decision.',
    },
    {
      label: 'Agent passes',
      owner: 'Specialists',
      detail: 'Research, compare, challenge, structure, test, and build.',
    },
    {
      label: 'Publication',
      owner: 'Human review',
      detail: 'Sources stay visible. Claims, language, and consequences are checked.',
    },
  ],
  workflow: [
    {
      number: '01',
      title: 'Start with live material',
      detail: 'A question, book, conversation, dataset, workshop, or unfinished system.',
    },
    {
      number: '02',
      title: 'Run specialist passes',
      detail: 'Agents gather sources, compare interpretations, expose gaps, and build a testable draft.',
    },
    {
      number: '03',
      title: 'Make the human decision',
      detail: 'Frank challenges the synthesis, cuts what is weak, and chooses what should become public.',
    },
    {
      number: '04',
      title: 'Publish something inspectable',
      detail: 'Research, architecture, a guide, book intelligence, a prototype, or a partnership system.',
    },
  ],
  currentWork: [
    {
      type: 'Research',
      title: 'Evidence-led research hubs',
      description:
        'Source-linked investigations across AI systems, models, creator workflows, and emerging technology.',
      href: '/research',
      action: 'Open research',
    },
    {
      type: 'Book intelligence',
      title: 'The FrankX Library',
      description:
        'Books reconstructed as usable models, with Frank’s interpretation kept separate from the source.',
      href: '/library',
      action: 'Enter the library',
    },
    {
      type: 'Architecture',
      title: 'AI systems you can inspect',
      description:
        'Reference architectures, agent workflows, evaluation boundaries, and production decisions.',
      href: '/ai-architecture',
      action: 'Review architectures',
    },
    {
      type: 'Applied work',
      title: 'Partnership systems',
      description:
        'Focused briefs, prototypes, and operating systems built around a person, mission, or real workflow.',
      href: '/partnerships',
      action: 'See partnership work',
    },
    {
      type: 'Field guides',
      title: 'Methods from the work',
      description:
        'Practical guides that keep the source, decision logic, and next action close to the page.',
      href: '/guides',
      action: 'Browse guides',
    },
    {
      type: 'Working notes',
      title: 'The journal',
      description:
        'Short dated notes from what Frank is testing, noticing, changing, and learning in public.',
      href: '/journal',
      action: 'Read the journal',
    },
  ],
} as const

export type SitePositioning = typeof sitePositioning
