// An unlisted discussion draft, deliberately absent from the public partner registry.
export const proposal = {
  title: 'What becomes possible when we build together?',
  subtitle: 'Exploring new ways to connect university talent, research, entrepreneurship and emerging technology, and turn promising ideas into work that matters.',
  date: '17 November 2026',
  status: 'Independent discussion draft',
  evidence: {
    status: 'reviewed' as const,
    reportUrl: null as string | null,
    label: 'Source and interface audit · 17 November 2026',
    detail: 'The technical audit confirms public source and bounded read-only interfaces. Recorded demos, written profiles and research ambitions are identified separately. Runtime rehearsal remains open; no adoption, performance or learning outcomes are claimed.',
  },
}

export const chapters = [
  { id: 'opportunity', label: 'The shared opportunity', short: 'Opportunity' },
  { id: 'founder', label: 'Frank & Starlight', short: 'The work' },
  { id: 'systems', label: 'Inside the systems', short: 'Explore' },
  { id: 'possibilities', label: 'Places to collaborate', short: 'Possibilities' },
  { id: 'pilot', label: 'One bounded pilot', short: 'The pilot' },
  { id: 'conversation', label: 'Erik’s perspective', short: 'Conversation' },
] as const

const frankxSource = 'https://github.com/frankxai/frankx.ai-vercel-website/blob/a2ecff4adbc548904d1c07821a34e8e2d4095b64'
export const agentContracts = [
  {
    id: 'architect', name: 'Starlight Architect', host: 'Nilo', row: 1, column: 1,
    purpose: 'Inspect how an architecture brief defines its responsibilities and tools.',
    path: '.claude/agents/starlight-architecture-design.md',
    source: `${frankxSource}/.claude/agents/starlight-architecture-design.md`,
    limit: 'A source profile with aspirational capability language. Deployment and performance are not established by this file.',
  },
  {
    id: 'research', name: 'Research Guardian', host: 'Brio', row: 2, column: 2,
    purpose: 'Examine the checks for citations, scope and regressions in a research edit.',
    path: '.claude/agents/research-guardian.md',
    source: `${frankxSource}/.claude/agents/research-guardian.md`,
    limit: 'Review instructions are inspectable. Whether they execute and catch errors requires a separate evaluation.',
  },
  {
    id: 'integrity', name: 'Integrity Guard', host: 'Riff', row: 3, column: 0,
    purpose: 'Read the contract for checking claims and language before publication.',
    path: '.claude/agents/integrity-guard.md',
    source: `${frankxSource}/.claude/agents/integrity-guard.md`,
    limit: 'A written quality gate is not proof of enforcement. A human remains accountable for publication.',
  },
] as const

export const sourceProjects = [
  {
    name: 'Starlight Intelligence System', category: 'Protocol & reference source', status: 'Source verified',
    description: 'A public protocol and reference implementation for shared memory, agent instructions and tool interfaces.',
    inspect: 'Start with SIP.md: which decisions remain with the person running the system?',
    url: 'https://github.com/Starlight-Intelligence/Starlight-Intelligence-System',
    artifact: 'https://github.com/Starlight-Intelligence/Starlight-Intelligence-System/blob/e159af3f94e93190c4a8ae127884d8f0d560dd5a/SIP.md',
    license: 'MIT root license; review file-specific exceptions',
    licenseUrl: 'https://github.com/Starlight-Intelligence/Starlight-Intelligence-System/blob/e159af3f94e93190c4a8ae127884d8f0d560dd5a/LICENSE',
    limit: 'Local execution and hosted runtime are not demonstrated in this proposal.',
  },
  {
    name: 'Agentic Creator OS', category: 'Reusable working practices', status: 'Source verified',
    description: 'Public instructions and tooling for starting work, reviewing changes, checking results and handing work over.',
    inspect: 'Read the practice receipt: what does a successful check actually establish?',
    url: 'https://github.com/frankxai/agentic-creator-os',
    artifact: 'https://github.com/frankxai/agentic-creator-os/blob/6ec5910cd09bb9f7164947f7b48a58595e576423/README.md',
    license: 'Apache-2.0 root license; retain notices and exceptions',
    licenseUrl: 'https://github.com/frankxai/agentic-creator-os/blob/6ec5910cd09bb9f7164947f7b48a58595e576423/LICENSE',
    limit: 'Harness activation and real project outcomes need their own verification.',
  },
] as const

export const collaborationAreas = [
  {
    id: 'education', title: 'Education', verb: 'Learn by making',
    question: 'What should a student be able to explain after building with AI?',
    idea: 'A practical session where teams build a small workflow, inspect its sources, and explain one failure and one design decision.',
    artifact: 'A reusable teaching kit, a working example and an assessment rubric.',
    measure: 'Can another student explain and reproduce the work without its author?',
    boundary: 'Curriculum fit, assessment and supervision belong with the university.',
  },
  {
    id: 'research', title: 'Research', verb: 'Make claims testable',
    question: 'When does a team of agents improve a result, and when does it add noise?',
    idea: 'Compare one person using one assistant with the same person using a bounded agent workflow on a defined task.',
    artifact: 'A reproducible task set, failure analysis and a record of time and compute cost.',
    measure: 'Compare quality, correction effort and cost against a declared baseline.',
    boundary: 'Research design, ethics review and publication require an academic lead.',
  },
  {
    id: 'entrepreneurship', title: 'Entrepreneurship', verb: 'Test a useful idea',
    question: 'Which step between an early prototype and a useful product is hardest for founders?',
    idea: 'Bring one existing prototype into a clinic and leave with a clearer user need, a reliability test and the next customer experiment.',
    artifact: 'A product brief, an inspected prototype and a short experiment plan.',
    measure: 'Does the next user experiment resolve an important uncertainty?',
    boundary: 'No investment readiness, commercial success or introductions are promised.',
  },
  {
    id: 'impact', title: 'Impact', verb: 'Start with who benefits',
    question: 'Whose work becomes easier, and what would count as evidence?',
    idea: 'Choose a need with a community organisation, then test a small workflow using public or synthetic information.',
    artifact: 'A beneficiary-defined brief and an explicit account of benefits, costs and failure.',
    measure: 'Agree the outcome with the people affected before building.',
    boundary: 'No impact totals or health, environmental or social outcomes are asserted.',
  },
] as const

export const pilotSteps = [
  { period: 'Before', title: 'Choose the question', text: 'One university contact and Frank select a useful task, agree the participants, data, ownership and a compute ceiling.' },
  { period: 'Week 1', title: 'Build & inspect', text: 'A proposed 90-minute workshop for two to four small teams. Build from an existing example and record what fails.' },
  { period: 'Week 2', title: 'Test & hand over', text: 'A proposed 60-minute review. Another team follows the instructions, checks the result and identifies what needs work.' },
] as const
