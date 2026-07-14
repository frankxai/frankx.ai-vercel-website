export type TallinnPersona =
  | 'creator'
  | 'founder'
  | 'team'
  | 'people'
  | 'integration'

export type TallinnOutcome =
  | 'direction'
  | 'artifact'
  | 'workflow'
  | 'team-system'

export type TallinnAccent = 'amber' | 'cyan' | 'emerald'

export interface TallinnProofLink {
  label: string
  href: string
  note: string
}

export interface TallinnSessionBeat {
  minutes: string
  title: string
  detail: string
}

export interface TallinnExperience {
  slug: string
  title: string
  shortTitle: string
  eyebrow: string
  promise: string
  description: string
  audience: string
  personas: readonly TallinnPersona[]
  outcomes: readonly TallinnOutcome[]
  duration: string
  capacity: string
  roomCapacityTarget: number
  accent: TallinnAccent
  reviewRank: number | null
  arriveWith: string
  leaveWith: string
  artifact: string
  sessionArc: readonly TallinnSessionBeat[]
  deliverables: readonly string[]
  frankRole: string
  anaInvitation: string
  proofLinks: readonly TallinnProofLink[]
  aftercare: readonly string[]
  testHypothesis: string
  followOn: string
}

export const TALLINN_EVENT = {
  city: 'Tallinn, Estonia',
  window: '20 July–2 August 2026',
  venueCandidate: 'Tallink Spa & Conference Hotel',
  venueStatus: 'Possible venue only · nothing is reserved',
  independenceNotice:
    'An independent working session for people gathering in Tallinn during Mindvalley U. This experience is not affiliated with, sponsored by, or endorsed by Mindvalley.',
} as const

export const TALLINN_VALIDATION_GATE = {
  minimumConfirmed: 8,
  standbyTarget: 2,
  roomCapacityTarget: 12,
  decisionWindow: '48 hours before the selected session',
  roomOnlyCapEur: 250,
  rule:
    'A venue booking is considered only after eight people reconfirm one compatible time. Venue choice and spend always require Frank’s approval.',
} as const

export const TALLINN_TIME_WINDOWS = [
  {
    id: 'tue-evening',
    label: 'Tuesday 21 July · 18:30–20:00',
  },
  {
    id: 'wed-morning',
    label: 'Wednesday 22 July · 08:00–09:30',
  },
  {
    id: 'thu-evening',
    label: 'Thursday 23 July · 17:30–19:00',
  },
  {
    id: 'other',
    label: 'Another window after the official agenda is clear',
  },
] as const

export const TALLINN_PERSONAS: Record<
  TallinnPersona,
  { label: string; note: string }
> = {
  creator: {
    label: 'Creator',
    note: 'Turn a real point of view into visible work without adding more content noise.',
  },
  founder: {
    label: 'Solo founder',
    note: 'Decide what AI may help with, what stays with you, and how you will review the work.',
  },
  team: {
    label: 'Team lead',
    note: 'Clarify who decides, where knowledge lives, when AI must stop, and who remains accountable.',
  },
  people: {
    label: 'People / HR leader',
    note: 'Clarify roles and working agreements before adding more automation.',
  },
  integration: {
    label: 'Reflective professional',
    note: 'Turn what you have learned into one calm practice and a concrete next step.',
  },
}

export const TALLINN_OUTCOMES: Record<
  TallinnOutcome,
  { label: string; note: string }
> = {
  direction: {
    label: 'Clear direction',
    note: 'A decision, trade-off, and 30-day experiment.',
  },
  artifact: {
    label: 'A completed take-home',
    note: 'A plan, worksheet, or draft you can use and improve.',
  },
  workflow: {
    label: 'A weekly way of working',
    note: 'A repeatable practice with clear limits for AI.',
  },
  'team-system': {
    label: 'A clear team agreement',
    note: 'Who does what, who decides, when AI stops, and when the team reviews.',
  },
}

export const tallinnExperiences = [
  {
    slug: 'purpose-to-practice',
    title: 'Purpose to Practice',
    shortTitle: 'Purpose to Practice',
    eyebrow: 'Recommended first pilot',
    promise: 'Leave with a clear 30-day practice you can start the next morning—with AI supporting only the parts you choose.',
    description:
      'Start with real examples of what matters, what you do well, who you want to help, and what your current life can sustain. Turn those insights into one clear statement, a weekly practice, and a 30-day trial. You decide where AI may help and which decisions stay yours.',
    audience: 'Creators, founders, and people in transition who have insight but want a clear next step.',
    personas: ['creator', 'founder', 'integration'],
    outcomes: ['direction', 'workflow'],
    duration: '90 minutes',
    capacity: '8–12 people',
    roomCapacityTarget: 12,
    accent: 'amber',
    reviewRank: 1,
    arriveWith: 'One real question about the work or chapter you are entering.',
    leaveWith: 'A two-page Purpose-to-Practice Plan and a dated 30-day trial.',
    artifact: 'Purpose-to-Practice Plan',
    sessionArc: [
      {
        minutes: '0–18',
        title: 'What matters now',
        detail:
          'Frame ikigai as a broader Japanese idea of everyday meaning; use the familiar four-circle diagram only as a modern reflection scaffold.',
      },
      {
        minutes: '18–45',
        title: 'From real examples to a clear direction',
        detail:
          'Map energising work, demonstrated strengths, useful service, sustainable livelihood, and one honest trade-off.',
      },
      {
        minutes: '45–72',
        title: 'Build your weekly practice',
        detail:
          'Write one purpose-to-practice statement, choose three ways AI may help, and name the decisions that stay yours.',
      },
      {
        minutes: '72–90',
        title: 'Choose the next 30 days',
        detail:
          'Review the plan with a partner, choose a 30-day trial, and set the first date you will revisit it.',
      },
    ],
    deliverables: [
      'Purpose-to-practice statement',
      'Three ways AI may support you',
      'Decisions that stay yours',
      'One weekly practice',
      'Dated 30-day trial',
    ],
    frankRole:
      'Frank guides the session, introduces the worksheet, and helps each participant turn reflection into a clear next step.',
    anaInvitation:
      'Ana is invited to shape the session as a partner. She may offer a short opening or people perspective only if she chooses and approves it; no public role or clinical claim is assumed.',
    proofLinks: [
      {
        label: 'Ikigai & Branding workshop',
        href: '/workshops/ikigai-branding',
        note: 'An existing workshop with the core reflection exercises.',
      },
      {
        label: 'Blue Zones, Ikigai & the AI Era',
        href: '/research/blue-zones-ikigai-ai-era',
        note: 'Background reading and sources for the purpose material.',
      },
      {
        label: 'Personal AI CoE',
        href: '/workshops/personal-ai-coe',
        note: 'A practical one-page approach to personal AI use.',
      },
    ],
    aftercare: [
      'Completed worksheet and reading list',
      'One implementation prompt after 48 hours, only if requested',
      'Day-7 practice check, only with aftercare consent',
    ],
    testHypothesis:
      'Test whether this clear, human-first outcome attracts eight confirmed participants and helps them complete the worksheet.',
    followOn:
      'If participants ask for more, offer a personal AI session, a founder implementation session, or a later retreat. No automatic upsell.',
  },
  {
    slug: 'agentic-creator-studio',
    title: 'Creator Studio: From Idea to Draft',
    shortTitle: 'Creator Studio',
    eyebrow: 'For creators and educators',
    promise: 'Turn one well-sourced idea into a finished draft and a simple process you can repeat next week.',
    description:
      'Bring one idea. Leave with a finished draft, the sources behind it, clear voice rules, and a repeatable way to create with AI.',
    audience: 'Creators, coaches, writers, and educators with one real idea they are ready to shape.',
    personas: ['creator', 'founder'],
    outcomes: ['artifact', 'workflow'],
    duration: '90 minutes',
    capacity: '8–12 people',
    roomCapacityTarget: 12,
    accent: 'cyan',
    reviewRank: 2,
    arriveWith: 'One idea, claim, lesson, or source you genuinely care about.',
    leaveWith: 'One finished draft, its source list, voice rules, and a reusable creation process.',
    artifact: 'Idea-to-Draft Playbook',
    sessionArc: [
      {
        minutes: '0–18',
        title: 'Choose the idea',
        detail: 'Reduce one idea to a useful claim, intended reader, and trusted source set.',
      },
      {
        minutes: '18–42',
        title: 'Build the brief',
        detail: 'Define voice, proof, exclusions, format, and what the draft should help the reader do.',
      },
      {
        minutes: '42–72',
        title: 'Create in three passes',
        detail: 'Draft, inspect, and sharpen with AI assisting the work rather than inventing the point of view.',
      },
      {
        minutes: '72–90',
        title: 'Save the process',
        detail: 'Save the draft and the exact sequence you can repeat for next week’s work.',
      },
    ],
    deliverables: [
      'One finished draft',
      'Source list',
      'Voice and claim rules',
      'Reusable creation process',
    ],
    frankRole:
      'Frank guides source selection, the brief, the AI-assisted draft, and the final review.',
    anaInvitation:
      'Ana may help shape the participant experience or join as an observer. Any public contribution requires her approval first.',
    proofLinks: [
      {
        label: 'FrankX Research',
        href: '/research',
        note: 'The source and research discipline behind the studio.',
      },
      {
        label: 'Prompt Library',
        href: '/prompt-library',
        note: 'Reusable building blocks already available.',
      },
      {
        label: 'GenCreator principles',
        href: '/gencreator/principles',
        note: 'The creator operating philosophy behind the workflow.',
      },
    ],
    aftercare: [
      'Draft and playbook export',
      'Optional 48-hour draft review exchange',
      'Day-7 “did the second artifact get easier?” check',
    ],
    testHypothesis:
      'Test whether a finished-draft outcome attracts creators more than a general AI tools session.',
    followOn: 'If requested: a GenCreator cohort, a private creation-process session, or a research-to-release sprint.',
  },
  {
    slug: 'build-your-agentic-team',
    title: 'Build Your AI Support Team',
    shortTitle: 'AI Support Team',
    eyebrow: 'For solo founders and operators',
    promise: 'Choose four clear AI support roles for one recurring workflow, while keeping important decisions with you.',
    description:
      'Frank shares a practical example, then helps each founder divide one recurring workflow into clear roles, instructions, handoffs, and a weekly review.',
    audience: 'Solo founders and operators who use several AI tools but still carry too much of the process themselves.',
    personas: ['founder', 'team'],
    outcomes: ['workflow', 'team-system'],
    duration: '90 minutes',
    capacity: '8–12 people',
    roomCapacityTarget: 12,
    accent: 'cyan',
    reviewRank: 3,
    arriveWith: 'One recurring workflow that currently depends on you remembering everything.',
    leaveWith: 'A one-page team plan with four roles, clear instructions, handoffs, and one human approval point.',
    artifact: 'AI Support Team Plan',
    sessionArc: [
      {
        minutes: '0–18',
        title: 'See a working example',
        detail: 'See how clear roles, instructions, evidence, and approval points fit together in a real workflow.',
      },
      {
        minutes: '18–42',
        title: 'Break one workflow into steps',
        detail: 'Separate judgment, creation, routine work, quality checks, and the handoffs between them.',
      },
      {
        minutes: '42–72',
        title: 'Write clear role instructions',
        detail: 'Define four support roles, the tools and sources they may use, when they stop, and where a human decides.',
      },
      {
        minutes: '72–90',
        title: 'Start with one task',
        detail: 'Choose one limited task and schedule the review that will keep the process useful and responsible.',
      },
    ],
    deliverables: [
      'Four-role team plan',
      'Clear role instructions',
      'Sources each role may use',
      'One human approval point',
      'Weekly review',
    ],
    frankRole:
      'Frank shows a working example and helps participants define the roles, handoffs, limits, and first task.',
    anaInvitation:
      'Ana may review the role-clarity questions only if she chooses. No operational or public role is assumed.',
    proofLinks: [
      {
        label: 'AI Architecture',
        href: '/ai-architecture',
        note: 'Practical role and approval patterns behind the session.',
      },
      {
        label: 'Agentic Builder Lab',
        href: '/agentic-builder-lab',
        note: 'The applied builder route.',
      },
      {
        label: 'ACOS',
        href: '/acos',
        note: 'Frank’s personal AI operating-system work.',
      },
    ],
    aftercare: [
      'Team plan and annotated example',
      'Optional 48-hour first-task review',
      'Day-7 process check',
    ],
    testHypothesis:
      'Test whether a practical four-role plan is more useful to founders than a general AI tools tutorial.',
    followOn: 'If requested: a personal AI session, founder implementation session, or private AI-team design engagement.',
  },
  {
    slug: 'human-agent-team-charter',
    title: 'Human + AI Team Agreement',
    shortTitle: 'Team Agreement',
    eyebrow: 'For teams and people leaders',
    promise: 'Agree what AI may help with, what people must own, and how the team knows when to stop.',
    description:
      'A practical workshop that turns a broad AI plan into a one-page agreement about roles, data, decisions, and accountability.',
    audience: 'Founders, team leads, and people leaders introducing AI into real shared work.',
    personas: ['team', 'people', 'founder'],
    outcomes: ['team-system', 'direction'],
    duration: '90 minutes',
    capacity: '8–12 people',
    roomCapacityTarget: 12,
    accent: 'emerald',
    reviewRank: 4,
    arriveWith: 'One team workflow where ownership or AI use is currently ambiguous.',
    leaveWith: 'A one-page charter covering roles, human-only decisions, data boundaries, escalation, and review.',
    artifact: 'Human + AI Team Agreement',
    sessionArc: [
      {
        minutes: '0–20',
        title: 'Name the work and the risk',
        detail: 'Choose one workflow and identify where speed, quality, privacy, or accountability can break.',
      },
      {
        minutes: '20–45',
        title: 'Map responsibilities',
        detail: 'Assign human, AI-assisted, shared, and prohibited responsibilities without hiding the handoffs.',
      },
      {
        minutes: '45–72',
        title: 'Write the operating agreement',
        detail: 'Set knowledge sources, evidence requirements, escalation, and human approval boundaries.',
      },
      {
        minutes: '72–90',
        title: 'Choose the trial',
        detail: 'Define a reversible 30-day team experiment and the evidence needed to continue.',
      },
    ],
    deliverables: [
      'Responsibility map',
      'Human-only decision list',
      'Data and knowledge boundary',
      'Escalation rule',
      '30-day trial',
    ],
    frankRole:
      'Frank guides the role, data, evidence, approval, and review decisions in the team agreement.',
    anaInvitation:
      'Ana may co-design the people and role-clarity parts. Her title, contribution, public credit, fee, and reuse rights require her approval before any announcement.',
    proofLinks: [
      {
        label: 'AI Architecture',
        href: '/ai-architecture',
        note: 'Role, accountability, and approval patterns behind the session.',
      },
      {
        label: 'Personal AI CoE',
        href: '/workshops/personal-ai-coe',
        note: 'The six-pillar source pattern at personal scale.',
      },
      {
        label: 'Research library',
        href: '/library',
        note: 'The shared-knowledge discipline behind the charter.',
      },
    ],
    aftercare: [
      'Editable team-agreement template',
      'Optional 48-hour team review prompt',
      'Day-7 evidence check for the selected trial',
    ],
    testHypothesis:
      'Test whether people leaders prefer a concrete accountability agreement to another AI adoption presentation.',
    followOn: 'If requested and separately agreed: a private team workshop, implementation session, or people-and-role engagement.',
  },
  {
    slug: 'founder-integration-salon',
    title: 'Founder Decision Circle',
    shortTitle: 'Decision Circle',
    eyebrow: 'For founders and operators',
    promise: 'Turn what you learned in Tallinn into one decision you can act on when you return.',
    description:
      'A quiet session that uses careful peer questions and a compact decision card to turn reflection into a practical next step. Participants are asked to respect one another’s privacy, but confidentiality cannot be guaranteed.',
    audience: 'Founders and operators who value depth, discretion, and useful peer connection.',
    personas: ['integration', 'founder'],
    outcomes: ['direction', 'workflow'],
    duration: '90 minutes',
    capacity: '8–10 people',
    roomCapacityTarget: 10,
    accent: 'amber',
    reviewRank: 5,
    arriveWith: 'One decision you do not want to carry home unresolved.',
    leaveWith: 'A founder decision card, one next move, and up to two consent-based peer connections.',
    artifact: 'Founder Decision Card',
    sessionArc: [
      {
        minutes: '0–15',
        title: 'Arrival and privacy expectations',
        detail: 'Set the boundary: no pitching or unsolicited coaching. Ask everyone to respect privacy while making clear that confidentiality cannot be guaranteed.',
      },
      {
        minutes: '15–48',
        title: 'Three peer decision rounds',
        detail: 'Use precise peer questions to separate the decision, the fear, the evidence, and the reversible move.',
      },
      {
        minutes: '48–72',
        title: 'Decision card',
        detail: 'Write the decision, what stops, what starts, one weekly practice, and one request for support.',
      },
      {
        minutes: '72–90',
        title: 'Connection with consent',
        detail: 'Make only the introductions people explicitly choose and close without a sales pitch.',
      },
    ],
    deliverables: [
      'One clarified decision',
      'Start / stop boundary',
      'One weekly practice',
      'Consent-based peer connections',
    ],
    frankRole: 'Frank hosts the decision rounds and helps each participant define a practical next step.',
    anaInvitation:
      'Ana may support hospitality and participant care, entirely behind the scenes if she prefers. Any reflective prompt is co-designed only with her approval.',
    proofLinks: [
      {
        label: 'Conscious AI operating systems',
        href: '/research/conscious-ai-operating-systems',
        note: 'The reflection-to-system research lane.',
      },
      {
        label: 'AI contemplative practice',
        href: '/research/ai-contemplative-practice',
        note: 'A source-aware bridge between attention and tools.',
      },
      {
        label: 'FrankX Library',
        href: '/library',
        note: 'The books and field notes informing the salon.',
      },
    ],
    aftercare: [
      'Private copy of the decision card',
      'Chosen introductions only',
      'Optional Day-7 decision check',
    ],
    testHypothesis:
      'Test whether founders value a quiet, practical decision session after a full week of learning.',
    followOn: 'If participants ask for more: a later founder circle or a separate retreat conversation. Nothing is pitched inside the session.',
  },
  {
    slug: 'purpose-without-performance',
    title: 'Purpose Without Performance',
    shortTitle: 'Purpose, Quietly',
    eyebrow: 'For creators and professionals',
    promise: 'Find language for your next chapter without turning yourself into a content persona.',
    description:
      'A quieter alternative to “personal branding”: real examples of your work, your values, one person you want to help, and three small ways to express the work without constant visibility.',
    audience: 'Creators and professionals who want expression without performative self-promotion.',
    personas: ['creator', 'integration'],
    outcomes: ['direction', 'artifact'],
    duration: '90 minutes',
    capacity: '8–12 people',
    roomCapacityTarget: 12,
    accent: 'amber',
    reviewRank: null,
    arriveWith: 'A transition, tension, or body of work you are trying to name.',
    leaveWith: 'A positioning sentence, one person you want to help, and three small examples of your work sized for one month.',
    artifact: 'Purpose & Expression Plan',
    sessionArc: [
      { minutes: '0–20', title: 'Evidence', detail: 'Name real moments, strengths, service, and constraints.' },
      { minutes: '20–45', title: 'Position', detail: 'Write who the work is for, what changes, and what you refuse.' },
      { minutes: '45–70', title: 'Express', detail: 'Design three small examples that demonstrate the work without feeding a content treadmill.' },
      { minutes: '70–90', title: 'Choose', detail: 'Select one example and a sustainable publishing rhythm.' },
    ],
    deliverables: ['Positioning sentence', 'One person you want to help', 'Three examples of your work', 'One-month rhythm'],
    frankRole: 'Frank guides the purpose, positioning, evidence, and expression exercises.',
    anaInvitation: 'Ana may review the values or audience questions only if she chooses. No role is assumed.',
    proofLinks: [
      { label: 'Ikigai & Branding', href: '/workshops/ikigai-branding', note: 'The existing synthesis engine.' },
      { label: 'Creator route', href: '/for/creators', note: 'The practical creator path.' },
    ],
    aftercare: ['Plan template', 'Optional 48-hour language review', 'Day-7 expression check'],
    testHypothesis: 'Test whether “purpose without performance” feels more useful than “personal branding” to this audience.',
    followOn: 'If requested: a quiet-authority content session or creator workflow engagement.',
  },
  {
    slug: 'voice-before-volume',
    title: 'Voice Before Volume',
    shortTitle: 'Voice Charter',
    eyebrow: 'For creators and founders',
    promise: 'Write clear voice, source, and claim rules before using AI for more content.',
    description:
      'Build a compact voice charter, prohibited-claims list, source rule, and review checklist using your own examples.',
    audience: 'Founders and creators who can generate quickly but no longer trust the consistency of the output.',
    personas: ['creator', 'founder', 'team'],
    outcomes: ['artifact', 'team-system'],
    duration: '90 minutes',
    capacity: '8–12 people',
    roomCapacityTarget: 12,
    accent: 'cyan',
    reviewRank: null,
    arriveWith: 'Two examples that sound like you and one that clearly does not.',
    leaveWith: 'A voice charter, claim boundary, source rule, and publish checklist.',
    artifact: 'Voice & Claims Guide',
    sessionArc: [
      { minutes: '0–20', title: 'Hear the difference', detail: 'Compare real examples and extract the useful distinctions.' },
      { minutes: '20–45', title: 'Write the voice', detail: 'Define rhythm, stance, proof, exclusions, and audience.' },
      { minutes: '45–70', title: 'Set the claim rules', detail: 'Set source, uncertainty, privacy, and review limits.' },
      { minutes: '70–90', title: 'Test the guide', detail: 'Run one draft through the rules and tighten what fails.' },
    ],
    deliverables: ['Voice charter', 'Prohibited-claims list', 'Source rule', 'Publish checklist'],
    frankRole: 'Frank guides voice extraction, source and claim rules, and the live draft review.',
    anaInvitation: 'Ana may review the human-language or privacy questions only if she chooses. No role is assumed.',
    proofLinks: [
      { label: 'FrankX Research', href: '/research', note: 'Source discipline in public.' },
      { label: 'Prompt Library', href: '/prompt-library', note: 'Prompts that can carry the charter.' },
    ],
    aftercare: ['Editable guide', 'One optional live-draft review', 'Day-7 consistency check'],
    testHypothesis: 'Test whether voice and claim rules solve a more urgent creator problem than another generation tutorial.',
    followOn: 'If requested: a voice audit, research-to-content session, or team editorial workshop.',
  },
  {
    slug: 'personal-ai-coe-one-page',
    title: 'Your Personal AI Rules on One Page',
    shortTitle: 'Personal AI Plan',
    eyebrow: 'For experienced AI users',
    promise: 'Decide which tools you use, which sources they may rely on, what stays human, and how you review the results.',
    description:
      'Turn your current AI setup into one practical page covering purpose, tools, trusted sources, privacy, human decisions, and review.',
    audience: 'Experienced creators and operators who need clear rules more than another tool.',
    personas: ['founder', 'team'],
    outcomes: ['workflow', 'team-system'],
    duration: '90 minutes',
    capacity: '8–12 people',
    roomCapacityTarget: 12,
    accent: 'cyan',
    reviewRank: null,
    arriveWith: 'Your current AI tools and one failure mode you do not want to repeat.',
    leaveWith: 'A one-page personal AI plan with tool, source, privacy, decision, and review rules.',
    artifact: 'Personal AI Plan',
    sessionArc: [
      { minutes: '0–20', title: 'See the six decisions', detail: 'Review purpose, tools, sources, privacy, human decisions, and quality checks.' },
      { minutes: '20–45', title: 'Review your current setup', detail: 'Choose what stays, what changes, and what you will stop using.' },
      { minutes: '45–72', title: 'Write the one-page plan', detail: 'Make the tool, source, privacy, and approval choices concrete.' },
      { minutes: '72–90', title: 'Set the weekly review', detail: 'Schedule one short review and one limited improvement.' },
    ],
    deliverables: ['One-page personal AI plan', 'Tool rules', 'Trusted source list', 'Weekly review'],
    frankRole: 'Frank guides the six decisions, the one-page plan, and the weekly review.',
    anaInvitation: 'Ana may contribute one people or values question only if she chooses and approves it. No role is assumed.',
    proofLinks: [
      { label: 'Personal AI CoE workshop', href: '/workshops/personal-ai-coe', note: 'The full existing 90-minute format.' },
      { label: 'ACOS', href: '/acos', note: 'The public operating-system surface.' },
    ],
    aftercare: ['One-page template', 'Optional 48-hour plan review', 'Day-7 review check'],
    testHypothesis: 'Test whether a clear one-page plan makes responsible personal AI use easier to begin.',
    followOn: 'If requested: a personal AI implementation session or founder workflow engagement.',
  },
  {
    slug: 'role-clarity-agent-era',
    title: 'Role Clarity in the AI Era',
    shortTitle: 'Role Clarity',
    eyebrow: 'For people and HR leaders',
    promise: 'Clarify one role before AI quietly changes who decides and who remains accountable.',
    description:
      'Map human judgment, AI assistance, shared work, work that must not be delegated, and a 30-day trial that makes the role change easy to review.',
    audience: 'People leaders, recruiters, founders, and team leads working through real role ambiguity.',
    personas: ['people', 'team'],
    outcomes: ['direction', 'team-system'],
    duration: '90 minutes',
    capacity: '8–12 people',
    roomCapacityTarget: 12,
    accent: 'emerald',
    reviewRank: null,
    arriveWith: 'One real role or responsibility that AI is already changing.',
    leaveWith: 'A role-clarity worksheet, non-delegable decision list, and reversible 30-day trial.',
    artifact: 'Role Clarity Worksheet',
    sessionArc: [
      { minutes: '0–20', title: 'Describe the real role', detail: 'Start from outcomes, decisions, relationships, and evidence—not the old task list.' },
      { minutes: '20–48', title: 'Map responsibility', detail: 'Separate human, assisted, shared, and prohibited work.' },
      { minutes: '48–72', title: 'Protect accountability', detail: 'Name ownership, escalation, privacy, and review.' },
      { minutes: '72–90', title: 'Run a trial', detail: 'Choose a reversible change and the evidence that will decide its future.' },
    ],
    deliverables: ['Role outcome map', 'Responsibility scorecard', 'Human-only judgment list', '30-day trial'],
    frankRole: 'Frank guides the AI-role, accountability, privacy, and review questions.',
    anaInvitation:
      'Ana may lead or co-design the people and HR perspective only after she approves the scope, public wording, examples, fee, credit, and ownership. No legal or psychological advice is implied.',
    proofLinks: [
      { label: 'AI Architecture', href: '/ai-architecture', note: 'The agent and governance layer.' },
      { label: 'FrankX Library', href: '/library', note: 'The source and learning layer.' },
    ],
    aftercare: ['Editable worksheet', 'Optional trial review', 'Day-7 role check'],
    testHypothesis: 'Test whether people leaders value a practical role-clarity worksheet and whether Ana wants to develop the format further.',
    followOn: 'Possible next step, only with Ana’s approval: a private HR engagement, a joint workshop, or a team role-design session.',
  },
  {
    slug: 'calm-work-architecture',
    title: 'A Calmer Working Week',
    shortTitle: 'Calmer Working Week',
    eyebrow: 'For overloaded founders and creators',
    promise: 'Move work off your mind without moving judgment out of human hands.',
    description:
      'A practical planning session for focus blocks, clear AI limits, two recovery buffers, and a weekly review. It is not health or medical advice.',
    audience: 'Overloaded founders and creators who need a better operating week, not a productivity contest.',
    personas: ['integration', 'founder', 'creator'],
    outcomes: ['workflow', 'direction'],
    duration: '90 minutes',
    capacity: '8–12 people',
    roomCapacityTarget: 12,
    accent: 'amber',
    reviewRank: null,
    arriveWith: 'A normal week and one pattern that repeatedly drains attention.',
    leaveWith: 'A weekly heat map, AI offload boundary, two buffers, and a 20-minute review ritual.',
    artifact: 'Calm Work Week Plan',
    sessionArc: [
      { minutes: '0–20', title: 'Map the week', detail: 'See where attention, coordination, and recovery currently break.' },
      { minutes: '20–45', title: 'Set the boundary', detail: 'Choose what AI can assist, what stays human, and what stops entirely.' },
      { minutes: '45–70', title: 'Rebuild the rhythm', detail: 'Place focus blocks, buffers, and one shared capture point.' },
      { minutes: '70–90', title: 'Review the plan', detail: 'Write the weekly 20-minute review that keeps the plan useful.' },
    ],
    deliverables: ['Weekly heat map', 'AI offload boundary', 'Two recovery buffers', 'Review ritual'],
    frankRole: 'Frank guides the workload map, AI limits, buffers, and weekly review.',
    anaInvitation:
      'Ana may contribute a short grounding or people-operations question only after she approves the wording and role. No health or therapy claims.',
    proofLinks: [
      { label: 'AI contemplative practice', href: '/research/ai-contemplative-practice', note: 'Source-aware attention and AI work.' },
      { label: 'Conscious AI operating systems', href: '/research/conscious-ai-operating-systems', note: 'The operating-system bridge.' },
    ],
    aftercare: ['Week-plan export', 'Optional 48-hour implementation prompt', 'Day-7 review check'],
    testHypothesis: 'Test whether participants want a practical, non-clinical way to redesign a demanding week.',
    followOn: 'If requested: a personal AI session, integration circle, or separate retreat conversation.',
  },
] as const satisfies readonly TallinnExperience[]

export const tallinnReviewExperiences = tallinnExperiences.filter(
  (experience) => experience.reviewRank !== null,
)

export function getTallinnExperience(slug: string) {
  return tallinnExperiences.find((experience) => experience.slug === slug)
}
