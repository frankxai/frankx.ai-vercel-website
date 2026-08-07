export const featuredWorkspaceCase = {
  label: 'Worked example · Published July 16, 2026',
  title: 'Intent Architecture',
  description:
    'A research synthesis for turning human purpose into bounded, reviewable execution across agents, people, tools, and organizational memory.',
  href: '/research/intent-architecture',
  outputLabel: 'Read the research synthesis',
  sources: [
    'DeepMind · Intelligent AI Delegation · 2026 preprint',
    'WORKBank · 1,500 workers across 844 tasks · 2025 preprint',
    'Ulloa et al. · 885 product managers · 2026 conference paper',
    'Quarterly Journal of Economics · Generative AI at Work · 2025',
    'NIST NCCoE · Software and AI Agent Identity and Authorization · 2026',
  ],
  passes: [
    {
      role: 'Evidence Synthesis',
      decision:
        'Mapped what delegation, workplace AI, mixed-initiative systems, and governance research support—and where the evidence is only adjacent.',
    },
    {
      role: 'Contradiction Review',
      decision:
        'Rejected the tempting claim that AI delegation gives introverts a proven advantage; current studies do not establish it.',
    },
    {
      role: 'Editorial Architecture',
      decision:
        'Turned the synthesis into a seven-field intent contract, five decision-right levels, limitations, and open questions.',
    },
  ],
  frankDecision:
    'Present Intent Architecture as a FrankX synthesis—not a settled academic field. Keep the evidence grade at C, name the limits, and make every consequential action cross a human boundary.',
  provenanceNote:
    'The linked synthesis, date, source registry, evidence grade, and limitations are public. This pass map explains the review method; it is not presented as a time-stamped execution log.',
} as const

export type FeaturedWorkspaceCase = typeof featuredWorkspaceCase
