// Public invitation, proposed study designs and challenge briefs. No results implied.
export const fellowshipUrl = 'https://recimpact.uva.nl/voor-partners/word-onderdeel-van-onze-community/word-impact-fellow'

// Disclosure copy per page context. The public invitation names no institution;
// the unlisted UvA draft keeps its own context-specific disclosure.
export const contextDisclosure = {
  public: {
    banner: 'Independent founder-authored proposal. No institutional endorsement or partnership is implied.',
    status: 'Open invitation · proposed collaborations',
    footerTitle: 'An independent invitation from Frank Riemer.',
    footer: 'Independent founder-authored proposal. No university or other institution has approved or endorsed it. No institutional logos are used.',
    print: 'Independent founder-authored proposal. No institutional endorsement or partnership is implied.',
    printFooter: 'No university or other institution has approved or endorsed this proposal.',
  },
  proposal: {
    banner: 'Independent founder-authored proposal. Not an official UvA partnership.',
    status: 'Unlisted discussion draft',
    footerTitle: 'A conversation proposed by Frank Riemer.',
    footer: 'UvA and Founder Space are named as the context for discussion. Neither has approved or endorsed this proposal. No institutional logos are used.',
    print: 'Independent founder-authored discussion draft. Not an official UvA partnership.',
    printFooter: 'UvA and Founder Space have not approved or endorsed this proposal.',
  },
} as const

export const audiences = [
  { id: 'student', label: 'Student', title: 'Build something you can explain.', offer: 'Explore a supervised challenge, test a workflow or bring your own product question.', bring: 'Your course or discipline, the question you want to explore and your availability.', next: 'We check fit with an academic supervisor before agreeing a student project.' },
  { id: 'academic', label: 'Academic lead', title: 'Turn a question into a study.', offer: 'Shape a guest lecture, a course challenge or a research protocol with inspectable tools.', bring: 'Learning or research objectives, a course or group, and the proposed timing.', next: 'We draft a short scope together. The institution retains supervision, assessment and ethics decisions.' },
  { id: 'technology', label: 'Technology partner', title: 'Bring a challenge worth solving.', offer: 'Contribute a bounded brief, technical mentoring or capped access to infrastructure.', bring: 'A real problem, usable public or synthetic data, and the support you can commit.', next: 'We separate educational goals from promotion and agree support, costs and data boundaries.' },
  { id: 'founder', label: 'Founder or impact partner', title: 'Put a real problem on the table.', offer: 'Explore a digital product, a public-interest challenge or a jointly scoped funding proposal.', bring: 'Who benefits, what you have tried, and what a useful outcome would look like.', next: 'We identify a learning question and a small deliverable. Funding and delivery are agreed separately.' },
] as const
export type AudienceId = (typeof audiences)[number]['id']

export const researchTracks = [
  {
    id: 'founder', label: '01 / Founder capability', title: 'One founder. A professional AI team. What changes?',
    question: 'Can structured AI assistance help a solo founder take a digital product from a clear problem to a tested prototype?',
    hypothesis: 'Explicit roles, shared context and review checkpoints may improve the quality of accepted work. Coordination and verification may also consume the gains.',
    conditions: ['Usual tools, no generative AI', 'One general-purpose assistant', 'Role-based assistants + review'],
    compare: 'Comparable product tasks, balanced across experience levels. Randomise allocation where feasible; keep task scope and time budgets comparable. Log model versions and human intervention.',
    measures: ['Blind assessment of accepted work', 'Human time, including review and rework', 'Compute cost per accepted task', 'Ability to explain and revise the result'],
    output: 'A reproducible task set, prototype artifacts and a study report that includes failures.',
    limit: 'Frank’s own ventures provide an initial observation setting. They cannot represent the wider founder population. A small teaching pilot tests feasibility; it cannot establish general productivity or business success.',
  },
  {
    id: 'reliability', label: '02 / Engineering & evaluation', title: 'When should an assistant stop and ask?',
    question: 'Which handover and approval rules help people detect errors before an agent’s work becomes a consequential action?',
    hypothesis: 'Inspectable evidence and explicit approval boundaries may improve error detection, with a possible cost in effort and speed.',
    conditions: ['Output only', 'Output + cited evidence', 'Evidence + approval checkpoints'],
    compare: 'Use the same seeded failure cases and public or synthetic data. Counterbalance task order, record overrides and have an independent reviewer judge the artifacts.',
    measures: ['Error detection and missed failures', 'Appropriate escalation to a person', 'Review time and task completion', 'Confidence compared with correctness'],
    output: 'A small evaluation suite, a failure taxonomy and documented agent contracts.',
    limit: 'Success in a controlled task is not evidence of safe autonomous deployment. External actions remain disabled in the teaching pilot.',
  },
  {
    id: 'learning', label: '03 / Learning & programme design', title: 'Does the learning remain when the assistant leaves?',
    question: 'How should an interdisciplinary challenge be designed so that students develop judgment as well as a working artifact?',
    hypothesis: 'Reflection, peer review and an unaided follow-up task may make learning more visible than prototype quality alone.',
    conditions: ['Build with a worked example', 'Build + peer explanation', 'Build + critique + transfer task'],
    compare: 'Co-design with teaching staff. Separate voluntary research participation from assessment; compare prior knowledge, disciplinary background and task difficulty.',
    measures: ['Unaided transfer to a new task', 'Explanation of design tradeoffs', 'Quality of peer review', 'Participation across disciplines'],
    output: 'An adaptable teaching note, assessment rubric and analysis of what students could explain.',
    limit: 'Teaching activity and research data collection are separate decisions. A named academic lead determines consent, assessment and ethics requirements.',
  },
] as const

export const challengeBriefs = [
  { id: 'product', title: 'From idea to a testable product', discipline: 'Entrepreneurship × engineering', task: 'Choose one user problem. Build a small digital prototype and a test that could show the idea is wrong.', deliverable: 'Problem brief, working prototype, acceptance criteria and a decision log.', data: 'Public examples or an explicitly licensed, synthetic brief.', review: 'Can another person run it, explain its limitations and test the central assumption?' },
  { id: 'evidence', title: 'An assistant that shows its evidence', discipline: 'Information science × responsible AI', task: 'Build a bounded research assistant that cites a fixed document set and identifies questions it cannot answer.', deliverable: 'Source list, answer rubric, failure cases and an inspectable workflow.', data: 'A small corpus with documented reuse rights. No private student or client records.', review: 'Can independent reviewers distinguish supported answers, errors and justified abstentions?' },
  { id: 'impact', title: 'A small tool for a public-interest problem', discipline: 'Social science × design × technology', task: 'Co-define an information or coordination problem with a community organisation. Prototype one low-risk workflow.', deliverable: 'Stakeholder brief, accessible prototype and a method for evaluating usefulness.', data: 'Public or synthetic information; no automated eligibility or individual decisions.', review: 'Does the intended user find it useful, accessible and understandable? Report unmet needs too.' },
] as const

export const researchReadings = [
  { title: 'AI and teamwork', citation: 'Dell’Acqua et al. · Organization Science, 2026', href: 'https://doi.org/10.1287/orsc.2025.20702', detail: 'A field experiment on product innovation motivates comparisons between individual and team configurations. Its setting does not establish outcomes for solo startups.' },
  { title: 'Compare observed work with perceived progress', citation: 'Becker et al. · METR, July 2025', href: 'https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/', detail: 'A randomised study of experienced open-source developers found a slowdown in that setting, despite perceived gains. Include review time and observed performance.' },
  { title: 'Account for selection and changing tools', citation: 'METR · February 2026 follow-up', href: 'https://metr.org/blog/2026-02-24-uplift-update/', detail: 'The follow-up discusses selection and measurement difficulties as AI use changes. Record who participates, which tasks are selected and what tools are used.' },
] as const

export function buildCollaborationMessage(audience: AudienceId, format: string, challenge: string, message: string) {
  const person = audiences.find(item => item.id === audience)!
  return `University collaboration inquiry\nRole: ${person.label}\nFormat: ${format}\nChallenge: ${challenge}\n\n${message.trim()}`
}
