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
  venueStatus: 'Candidate only · no room is booked',
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
    'A room is considered only after eight people reconfirm one compatible time. Venue choice and spend always require Frank’s approval.',
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
    note: 'Create a small governed agent team around the work only you should own.',
  },
  team: {
    label: 'Team lead',
    note: 'Clarify decisions, knowledge, escalation, and human accountability.',
  },
  people: {
    label: 'People / HR leader',
    note: 'Redesign roles and operating agreements before adding more automation.',
  },
  integration: {
    label: 'Integration-minded',
    note: 'Convert a week of insight into one calm practice and one next move.',
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
    label: 'A finished artifact',
    note: 'Something useful you can inspect, export, and improve.',
  },
  workflow: {
    label: 'A weekly workflow',
    note: 'A repeatable human + AI practice with clear boundaries.',
  },
  'team-system': {
    label: 'A team system',
    note: 'Roles, escalation, shared knowledge, and a review cadence.',
  },
}

export const tallinnExperiences = [
  {
    slug: 'purpose-to-practice',
    title: 'Purpose to Practice',
    shortTitle: 'Purpose to Practice',
    eyebrow: 'Recommended first pilot',
    promise: 'Build a calm Human + AI Practice Map you can use the next morning.',
    description:
      'Start with evidence about what gives meaning, what you can contribute, and what your current season can sustain. Then turn it into one 30-day experiment, three light agent roles, and one weekly practice—with the human-only decisions named explicitly.',
    audience: 'Creators, founders, and people in transition who have insight but no operating shape for it yet.',
    personas: ['creator', 'founder', 'integration'],
    outcomes: ['direction', 'workflow'],
    duration: '90 minutes',
    capacity: '8–12 people',
    accent: 'amber',
    reviewRank: 1,
    arriveWith: 'One real question about the work or chapter you are entering.',
    leaveWith: 'A one-page Human + AI Practice Map and a dated 30-day experiment.',
    artifact: 'Human + AI Practice Map',
    sessionArc: [
      {
        minutes: '0–18',
        title: 'Meaning, without mythology',
        detail:
          'Frame ikigai as a broader Japanese idea of everyday meaning; use the familiar four-circle diagram only as a modern reflection scaffold.',
      },
      {
        minutes: '18–45',
        title: 'Evidence into direction',
        detail:
          'Map energising work, demonstrated strengths, useful service, sustainable livelihood, and one honest trade-off.',
      },
      {
        minutes: '45–72',
        title: 'Direction into a practice',
        detail:
          'Write one purpose-to-practice statement, three agent roles, human-only decisions, and one repeatable weekly workflow.',
      },
      {
        minutes: '72–90',
        title: 'Commit and export',
        detail:
          'Peer-review the map, choose a 30-day experiment, and leave with the artifact—not a longer inspiration list.',
      },
    ],
    deliverables: [
      'Purpose-to-practice statement',
      'Three light agent roles',
      'Human-only decision boundary',
      'One weekly workflow',
      'Dated 30-day experiment',
    ],
    frankRole:
      'Lead facilitator: meaning-to-system synthesis, operating-map demo, and artifact review.',
    anaInvitation:
      'Executive producer by default. If Ana chooses, she may add a brief opening reflection or people lens; no spotlight is assumed and no clinical claim is attached.',
    proofLinks: [
      {
        label: 'Ikigai & Branding workshop',
        href: '/workshops/ikigai-branding',
        note: 'The working reflection and synthesis surface already live.',
      },
      {
        label: 'Blue Zones, Ikigai & the AI Era',
        href: '/research/blue-zones-ikigai-ai-era',
        note: 'Source-aware context behind the purpose material.',
      },
      {
        label: 'Personal AI CoE',
        href: '/workshops/personal-ai-coe',
        note: 'The operating-system pattern adapted into a nontechnical one-pager.',
      },
    ],
    aftercare: [
      'Same-day artifact export and source stack',
      'One implementation prompt after 48 hours, only if requested',
      'Day-7 practice check, only with aftercare consent',
    ],
    testHypothesis:
      'A human-first promise will attract the broadest high-intent group while showing Frank’s distinctive bridge into governed agentic work.',
    followOn:
      'Personal AI CoE, founder implementation sprint, or a later Starlight integration retreat—only after the participant asks for the next layer.',
  },
  {
    slug: 'agentic-creator-studio',
    title: 'Agentic Creator Studio',
    shortTitle: 'Creator Studio',
    eyebrow: 'Creator route',
    promise: 'Turn one sourced idea into one shippable artifact and the recipe to make the next one.',
    description:
      'A focused build room for creators who want evidence, voice, and a repeatable AI-assisted workflow—not another list of content tools.',
    audience: 'Creators, coaches, writers, and educators with one real idea they are ready to shape.',
    personas: ['creator', 'founder'],
    outcomes: ['artifact', 'workflow'],
    duration: '90 minutes',
    capacity: '8–12 people',
    accent: 'cyan',
    reviewRank: 2,
    arriveWith: 'One idea, claim, lesson, or source you genuinely care about.',
    leaveWith: 'One shippable draft, its source trail, voice guardrails, and a reusable creation recipe.',
    artifact: 'Source-to-artifact creator recipe',
    sessionArc: [
      {
        minutes: '0–18',
        title: 'Choose the signal',
        detail: 'Reduce one idea to a useful claim, intended reader, and source boundary.',
      },
      {
        minutes: '18–42',
        title: 'Build the brief',
        detail: 'Define voice, proof, exclusions, format, and the job the artifact must do.',
      },
      {
        minutes: '42–72',
        title: 'Create in three passes',
        detail: 'Draft, inspect, and sharpen with AI assisting the work rather than inventing the point of view.',
      },
      {
        minutes: '72–90',
        title: 'Package the recipe',
        detail: 'Export the artifact and the exact repeatable sequence for next week’s work.',
      },
    ],
    deliverables: [
      'One shippable draft',
      'Source trail',
      'Voice and claim guardrails',
      'Reusable creator workflow',
    ],
    frankRole:
      'Lead facilitator and live builder: research, prompt architecture, editorial review, and workflow packaging.',
    anaInvitation:
      'Experience producer or participant-observer. An audience-empathy question can be added only if she wants a contributor lane.',
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
      'Artifact and recipe export',
      'Optional 48-hour draft review exchange',
      'Day-7 “did the second artifact get easier?” check',
    ],
    testHypothesis:
      'A concrete artifact promise will outperform generic creator-AI education for people who already use the tools but lack a reliable editorial system.',
    followOn: 'GenCreator cohort, creator operating-system install, or a private research-to-release sprint.',
  },
  {
    slug: 'build-your-agentic-team',
    title: 'Build Your Agentic Team',
    shortTitle: 'Agentic Team',
    eyebrow: 'Solo-founder route',
    promise: 'Design four agent roles around your real business—and keep the consequential decisions human.',
    description:
      'Frank opens the exact pattern behind his agentic business operating system, then helps each founder turn one overloaded workflow into roles, instructions, escalation, and a weekly review.',
    audience: 'Solo founders and operators who have several AI tools but no team architecture.',
    personas: ['founder', 'team'],
    outcomes: ['workflow', 'team-system'],
    duration: '90 minutes',
    capacity: '8–12 people',
    accent: 'cyan',
    reviewRank: 3,
    arriveWith: 'One recurring workflow that currently depends on you remembering everything.',
    leaveWith: 'A four-role agent team canvas, first AGENTS/SKILL/SOP skeleton, and one human approval gate.',
    artifact: 'Agentic Team Canvas',
    sessionArc: [
      {
        minutes: '0–18',
        title: 'Show the real system',
        detail: 'Inspect how roles, instructions, evidence, and approvals compose in Frank’s working agent estate.',
      },
      {
        minutes: '18–42',
        title: 'Decompose one workflow',
        detail: 'Separate judgment, creation, mechanics, verification, and the handoff between them.',
      },
      {
        minutes: '42–72',
        title: 'Write the team contract',
        detail: 'Define four roles, their tools, shared knowledge, stop conditions, and human gates.',
      },
      {
        minutes: '72–90',
        title: 'Start the first week',
        detail: 'Choose one bounded task and schedule the review that will keep the system honest.',
      },
    ],
    deliverables: [
      'Four-role team canvas',
      'AGENTS.md starter',
      'SKILL.md / SOP skeleton',
      'Human approval gate',
      'Weekly review cadence',
    ],
    frankRole:
      'Lead architect: live system walkthrough, role decomposition, governance, and first-task design.',
    anaInvitation:
      'Producer and role-clarity reviewer. If she chooses, Ana can challenge whether responsibilities remain legible to the humans around the system.',
    proofLinks: [
      {
        label: 'AI Architecture',
        href: '/ai-architecture',
        note: 'Inspectable architecture patterns behind the session.',
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
      'Starter files and annotated canvas',
      'Optional 48-hour first-task review',
      'Day-7 team health check',
    ],
    testHypothesis:
      'Frank’s actual operating model is more differentiated than a generic AI-agent tutorial and creates a natural path into implementation work.',
    followOn: 'Personal AI CoE install, founder command sprint, or a private agent-team architecture engagement.',
  },
  {
    slug: 'human-agent-team-charter',
    title: 'Human + Agent Team Charter',
    shortTitle: 'Team Charter',
    eyebrow: 'People + systems route',
    promise: 'Decide what agents may do, what humans must own, and how the team knows the difference.',
    description:
      'A joint-ready B2B format that turns an abstract AI ambition into roles, escalation, knowledge ownership, and clear human accountability.',
    audience: 'Founders, team leads, and people leaders introducing agents into real shared work.',
    personas: ['team', 'people', 'founder'],
    outcomes: ['team-system', 'direction'],
    duration: '90 minutes',
    capacity: '8–12 people',
    accent: 'emerald',
    reviewRank: 4,
    arriveWith: 'One team workflow where ownership or AI use is currently ambiguous.',
    leaveWith: 'A one-page charter covering roles, human-only decisions, data boundaries, escalation, and review.',
    artifact: 'Human + Agent Team Charter',
    sessionArc: [
      {
        minutes: '0–20',
        title: 'Name the work and the risk',
        detail: 'Choose one workflow and identify where speed, quality, privacy, or accountability can break.',
      },
      {
        minutes: '20–45',
        title: 'Map responsibilities',
        detail: 'Assign human, agent, shared, and prohibited responsibilities without hiding the handoffs.',
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
      'System architect: agent roles, governance, shared knowledge, evidence, and reversible rollout.',
    anaInvitation:
      'Potential true co-creator: people-operations questions, role clarity, and participant experience. Her title, module, and public credit remain hers to approve.',
    proofLinks: [
      {
        label: 'AI Architecture',
        href: '/ai-architecture',
        note: 'Architecture and governance sources already visible.',
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
      'Editable charter template',
      'Optional 48-hour team review prompt',
      'Day-7 evidence check for the selected trial',
    ],
    testHypothesis:
      'People leaders want a concrete human-accountability contract more than another AI adoption presentation.',
    followOn: 'Private team charter workshop, AI operating-model sprint, or Ana-led people/role engagement.',
  },
  {
    slug: 'founder-integration-salon',
    title: 'Founder Integration Salon',
    shortTitle: 'Integration Salon',
    eyebrow: 'Retreat discovery route',
    promise: 'Turn a week of insight into one decision, one practice, and two useful relationships.',
    description:
      'A quiet, curated salon for founders who do not need another framework. The room uses confidentiality, peer questions, and a compact integration card to convert signal into Monday decisions.',
    audience: 'Founders and operators who value depth, discretion, and useful peer connection.',
    personas: ['integration', 'founder'],
    outcomes: ['direction', 'workflow'],
    duration: '90 minutes',
    capacity: '8–10 people',
    accent: 'amber',
    reviewRank: 5,
    arriveWith: 'One decision you do not want to carry home unresolved.',
    leaveWith: 'A founder integration card, one next move, and two consent-based peer connections.',
    artifact: 'Founder Integration Card',
    sessionArc: [
      {
        minutes: '0–15',
        title: 'Arrival and confidentiality',
        detail: 'Set the boundary: no pitching, no unsolicited coaching, and no stories repeated outside the room.',
      },
      {
        minutes: '15–48',
        title: 'Three founder clinics',
        detail: 'Use precise peer questions to separate the decision, the fear, the evidence, and the reversible move.',
      },
      {
        minutes: '48–72',
        title: 'Integration card',
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
    frankRole: 'Host and systems integrator: decision structure, peer clinic, and operating commitment.',
    anaInvitation:
      'Executive producer and hospitality lead, entirely offstage if preferred. An optional reflective prompt can be co-designed only if she wants it.',
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
      'Private integration-card copy',
      'Chosen introductions only',
      'Optional Day-7 decision check',
    ],
    testHypothesis:
      'A low-tech, high-trust salon is the fastest safe way to learn whether a deeper Starlight Retreat format deserves to exist.',
    followOn: 'A later founder circle or Starlight Retreat discovery conversation—never pitched inside the salon.',
  },
  {
    slug: 'purpose-without-performance',
    title: 'Purpose Without Performance',
    shortTitle: 'Purpose, Quietly',
    eyebrow: 'Message test',
    promise: 'Find language for your next chapter without turning yourself into a content persona.',
    description:
      'A quieter alternative to “personal branding”: evidence, values, audience-of-one, and three small proof artifacts instead of constant visibility.',
    audience: 'Creators and professionals who want expression without performative self-promotion.',
    personas: ['creator', 'integration'],
    outcomes: ['direction', 'artifact'],
    duration: '90 minutes',
    capacity: '8–12 people',
    accent: 'amber',
    reviewRank: null,
    arriveWith: 'A transition, tension, or body of work you are trying to name.',
    leaveWith: 'A positioning sentence, audience-of-one, and three proof artifacts sized for one month.',
    artifact: 'Quiet Authority Map',
    sessionArc: [
      { minutes: '0–20', title: 'Evidence', detail: 'Name real moments, strengths, service, and constraints.' },
      { minutes: '20–45', title: 'Position', detail: 'Write who the work is for, what changes, and what you refuse.' },
      { minutes: '45–70', title: 'Express', detail: 'Design three small artifacts that prove the work without feeding a content treadmill.' },
      { minutes: '70–90', title: 'Choose', detail: 'Select one artifact and a humane publishing cadence.' },
    ],
    deliverables: ['Positioning sentence', 'Audience-of-one', 'Three proof artifacts', 'One-month cadence'],
    frankRole: 'Lead facilitator: purpose, positioning, evidence, and expression system.',
    anaInvitation: 'Optional values and audience-empathy review, or producer-only mode.',
    proofLinks: [
      { label: 'Ikigai & Branding', href: '/workshops/ikigai-branding', note: 'The existing synthesis engine.' },
      { label: 'Creator route', href: '/for/creators', note: 'The practical creator path.' },
    ],
    aftercare: ['Artifact template', 'Optional 48-hour language review', 'Day-7 expression check'],
    testHypothesis: '“Purpose without performance” may resonate more strongly than “personal branding” with this audience.',
    followOn: 'Quiet-authority content sprint or creator operating-system install.',
  },
  {
    slug: 'voice-before-volume',
    title: 'Voice Before Volume',
    shortTitle: 'Voice Charter',
    eyebrow: 'Responsible creator-AI route',
    promise: 'Write the voice and claim rules your AI must follow before it creates at scale.',
    description:
      'Build a compact voice charter, prohibited-claims list, source rule, and review checklist using your own examples.',
    audience: 'Founders and creators who can generate quickly but no longer trust the consistency of the output.',
    personas: ['creator', 'founder', 'team'],
    outcomes: ['artifact', 'team-system'],
    duration: '90 minutes',
    capacity: '8–12 people',
    accent: 'cyan',
    reviewRank: null,
    arriveWith: 'Two examples that sound like you and one that clearly does not.',
    leaveWith: 'A voice charter, claim boundary, source rule, and publish checklist.',
    artifact: 'Voice + Claims Charter',
    sessionArc: [
      { minutes: '0–20', title: 'Hear the difference', detail: 'Compare real examples and extract the useful distinctions.' },
      { minutes: '20–45', title: 'Write the voice', detail: 'Define rhythm, stance, proof, exclusions, and audience.' },
      { minutes: '45–70', title: 'Govern the claims', detail: 'Set source, uncertainty, privacy, and review boundaries.' },
      { minutes: '70–90', title: 'Test the charter', detail: 'Run one draft through the rules and tighten what fails.' },
    ],
    deliverables: ['Voice charter', 'Prohibited-claims list', 'Source rule', 'Publish checklist'],
    frankRole: 'Editorial systems lead: voice extraction, claim governance, and live test.',
    anaInvitation: 'Optional human-language and privacy lens; producer-only remains the default.',
    proofLinks: [
      { label: 'FrankX Research', href: '/research', note: 'Source discipline in public.' },
      { label: 'Prompt Library', href: '/prompt-library', note: 'Prompts that can carry the charter.' },
    ],
    aftercare: ['Editable charter', 'One optional live-draft review', 'Day-7 consistency check'],
    testHypothesis: 'Governance and voice may be a stronger creator pain than another generation tutorial.',
    followOn: 'Voice OS audit, research-to-content sprint, or team editorial governance workshop.',
  },
  {
    slug: 'personal-ai-coe-one-page',
    title: 'Personal AI CoE on One Page',
    shortTitle: 'Personal AI CoE',
    eyebrow: 'Advanced operator route',
    promise: 'Create the charter, tool policy, knowledge sources, and review cadence for your personal AI system.',
    description:
      'The six-pillar enterprise CoE pattern, reduced to one useful page and no terminal requirement.',
    audience: 'Advanced creators and operators who need governance more than another tool.',
    personas: ['founder', 'team'],
    outcomes: ['workflow', 'team-system'],
    duration: '90 minutes',
    capacity: '8–12 people',
    accent: 'cyan',
    reviewRank: null,
    arriveWith: 'Your current AI tools and one failure mode you do not want to repeat.',
    leaveWith: 'A six-pillar personal charter, tool policy, source map, and weekly review.',
    artifact: 'Personal AI CoE One-Pager',
    sessionArc: [
      { minutes: '0–20', title: 'See the pattern', detail: 'Inspect the six CoE pillars and why they exist.' },
      { minutes: '20–45', title: 'Mirror the scale', detail: 'Translate strategy, governance, talent, technology, data, and ethics to one person.' },
      { minutes: '45–72', title: 'Write the one-pager', detail: 'Make the policy and source choices concrete.' },
      { minutes: '72–90', title: 'Install the cadence', detail: 'Schedule a weekly review and one bounded improvement.' },
    ],
    deliverables: ['Six-pillar charter', 'Tool policy', 'Source map', 'Weekly review'],
    frankRole: 'Lead architect: enterprise pattern, personal mirror, and governance review.',
    anaInvitation: 'Optional people and values question, or producer-only mode.',
    proofLinks: [
      { label: 'Personal AI CoE workshop', href: '/workshops/personal-ai-coe', note: 'The full existing 90-minute format.' },
      { label: 'ACOS', href: '/acos', note: 'The public operating-system surface.' },
    ],
    aftercare: ['One-pager template', 'Optional 48-hour policy review', 'Day-7 cadence check'],
    testHypothesis: 'Removing terminal setup makes Frank’s strongest architecture accessible to the MVU audience.',
    followOn: 'Personal AI CoE install or founder operating-system sprint.',
  },
  {
    slug: 'role-clarity-agent-era',
    title: 'Role Clarity in the Agent Era',
    shortTitle: 'Role Clarity',
    eyebrow: 'Ana thought-leadership route',
    promise: 'Redesign one role before automation quietly redesigns it for you.',
    description:
      'Map human judgment, agent assistance, shared work, prohibited delegation, and the 30-day trial that makes a role change observable.',
    audience: 'People leaders, recruiters, founders, and team leads working through real role ambiguity.',
    personas: ['people', 'team'],
    outcomes: ['direction', 'team-system'],
    duration: '90 minutes',
    capacity: '8–12 people',
    accent: 'emerald',
    reviewRank: null,
    arriveWith: 'One real role or responsibility that AI is already changing.',
    leaveWith: 'A human/agent responsibility scorecard, non-delegable judgment list, and reversible 30-day trial.',
    artifact: 'Role Clarity Scorecard',
    sessionArc: [
      { minutes: '0–20', title: 'Describe the real role', detail: 'Start from outcomes, decisions, relationships, and evidence—not the old task list.' },
      { minutes: '20–48', title: 'Map responsibility', detail: 'Separate human, assisted, shared, and prohibited work.' },
      { minutes: '48–72', title: 'Protect accountability', detail: 'Name ownership, escalation, privacy, and review.' },
      { minutes: '72–90', title: 'Run a trial', detail: 'Choose a reversible change and the evidence that will decide its future.' },
    ],
    deliverables: ['Role outcome map', 'Responsibility scorecard', 'Human-only judgment list', '30-day trial'],
    frankRole: 'Agent architecture and governance contributor.',
    anaInvitation:
      'Potential subject lead for the people/HR lens after she approves the scope, public wording, examples, and commercial ownership. No legal or psychological advice is implied.',
    proofLinks: [
      { label: 'AI Architecture', href: '/ai-architecture', note: 'The agent and governance layer.' },
      { label: 'FrankX Library', href: '/library', note: 'The source and learning layer.' },
    ],
    aftercare: ['Editable scorecard', 'Optional trial review', 'Day-7 role evidence check'],
    testHypothesis: 'A concrete role-design artifact can become Ana’s credible bridge into HR thought leadership and future agency work.',
    followOn: 'Ana-owned HR/recruiting engagement, joint people + AI workshop, or team operating-model sprint.',
  },
  {
    slug: 'calm-work-architecture',
    title: 'Calm Work Architecture',
    shortTitle: 'Calm Work',
    eyebrow: 'Integration route',
    promise: 'Move work off your mind without moving judgment out of human hands.',
    description:
      'Design an energy-aware week, explicit AI offload boundaries, two recovery buffers, and a review ritual—without medical or neurological claims.',
    audience: 'Overloaded founders and creators who need a better operating week, not a productivity contest.',
    personas: ['integration', 'founder', 'creator'],
    outcomes: ['workflow', 'direction'],
    duration: '90 minutes',
    capacity: '8–12 people',
    accent: 'amber',
    reviewRank: null,
    arriveWith: 'A normal week and one pattern that repeatedly drains attention.',
    leaveWith: 'A weekly heat map, AI offload boundary, two buffers, and a 20-minute review ritual.',
    artifact: 'Calm Work Week Map',
    sessionArc: [
      { minutes: '0–20', title: 'Map the week', detail: 'See where attention, coordination, and recovery currently break.' },
      { minutes: '20–45', title: 'Set the boundary', detail: 'Choose what AI can assist, what stays human, and what stops entirely.' },
      { minutes: '45–70', title: 'Rebuild the rhythm', detail: 'Place focus blocks, buffers, and one shared capture point.' },
      { minutes: '70–90', title: 'Review the system', detail: 'Write the weekly 20-minute review that keeps the plan alive.' },
    ],
    deliverables: ['Weekly heat map', 'AI offload boundary', 'Two recovery buffers', 'Review ritual'],
    frankRole: 'Operating-system designer: workload map, agent boundary, and cadence.',
    anaInvitation:
      'Optional grounding or people-operations questions after explicit approval. No therapy, IFS, neuroscience, or health outcome is claimed.',
    proofLinks: [
      { label: 'AI contemplative practice', href: '/research/ai-contemplative-practice', note: 'Source-aware attention and AI work.' },
      { label: 'Conscious AI operating systems', href: '/research/conscious-ai-operating-systems', note: 'The operating-system bridge.' },
    ],
    aftercare: ['Week-map export', 'Optional 48-hour implementation prompt', 'Day-7 cadence check'],
    testHypothesis: 'A calm operating promise can open the retreat and people-work pipeline without making clinical claims.',
    followOn: 'Personal AI CoE, integration circle, or later retreat discovery.',
  },
] as const satisfies readonly TallinnExperience[]

export const tallinnReviewExperiences = tallinnExperiences.filter(
  (experience) => experience.reviewRank !== null,
)

export function getTallinnExperience(slug: string) {
  return tallinnExperiences.find((experience) => experience.slug === slug)
}
