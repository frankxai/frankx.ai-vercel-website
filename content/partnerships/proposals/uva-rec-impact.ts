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

// Public-safe selections. Dates describe only what the linked record establishes.
// Engagement totals, named client delivery and programme oversight are not inferred.
export const experienceCases = [
  {
    id: 'oracle', period: '2024–2026', title: 'Enterprise AI, inside the team',
    role: 'Technical contribution', setting: 'Oracle EMEA AI Center of Excellence',
    text: 'My Oracle chapter moved from cloud adoption into an AI Architect role in the EMEA AI Center of Excellence. It shaped the questions I bring to a build: whose problem is this, what will the system need to connect to, and how will a team judge whether it works?',
    transfer: 'Bring enterprise constraints into student engineering: integration, evaluation, ownership and the handover to the people using the system.',
    boundary: 'The public record establishes the role. Internal customer cases, CoE methodology ownership and wider programme oversight are not asserted here.',
    proof: 'Public professional account; former role also identified by NLdigital.',
    links: [{ label: 'Professional account', url: 'https://www.linkedin.com/posts/frank-x-riemer_after-almost-5-years-today-im-saying-goodbye-activity-7466943560559427584-nEGk' }, { label: 'NLdigital speaker record', url: 'https://nl.linkedin.com/showcase/nldigitalnextgen/' }],
  },
  {
    id: 'students', period: 'Oracle chapter', title: 'AI in a student’s own context',
    role: 'Personal delivery', setting: 'MCI · The Entrepreneurial School',
    text: 'A session with MCI students connected AI to business context, communication and career choices. The starting point was the student’s own direction: what they care about, what they can build and how they explain its value.',
    transfer: 'Let students build around a real question, then explain their decisions to someone outside their discipline.',
    boundary: 'This selected session is documented in a public delivery account. It does not establish a university partnership or an independently verified attendance total.',
    proof: 'Founder-authored public account of delivery.',
    links: [{ label: 'Student session account', url: 'https://www.linkedin.com/posts/frank-x-riemer_geno-university-students-activity-7312738017209733120-duck' }],
  },
  {
    id: 'partners', period: 'Oracle chapter', title: 'A shared technology conversation',
    role: 'Shared programme speaker', setting: 'Oracle Amsterdam Hub · NVIDIA ecosystem',
    text: 'An Oracle Amsterdam programme brought together AI, GPU and data-platform perspectives. The public recap names me among the speakers alongside NVIDIA partner Koen van den Berg and other contributors.',
    transfer: 'Help founders speak across technical and commercial teams, and understand where a cloud or technology partner can contribute.',
    boundary: 'Speaking in the same programme does not establish a jointly authored talk or a current NVIDIA partnership.',
    proof: 'Partner post containing the organiser’s event recap.',
    links: [{ label: 'Programme recap', url: 'https://www.linkedin.com/posts/koen-van-den-berg-161991_oracle-nvidia-ai-activity-7322543494827331586-az_Q' }],
  },
  {
    id: 'forum', period: 'Oracle chapter', title: 'Enterprise questions in the room',
    role: 'Event contribution', setting: 'Oracle AI and Data Forum · Utrecht',
    text: 'An attendee’s public account names me in the Oracle team at the Utrecht forum, alongside sessions on enterprise AI, data platforms and practical use cases.',
    transfer: 'Use the questions raised by enterprise adoption to help founders test whether a technically interesting prototype addresses a useful problem.',
    boundary: 'The attendee record supports an event contribution. It does not establish keynote status or personal delivery of the customer demonstrations.',
    proof: 'Publicly indexed attendee account; LinkedIn may require sign-in.',
    links: [{ label: 'Attendee’s public account', url: 'https://nl.linkedin.com/in/resat-s-581951168' }],
  },
  {
    id: 'challenge', period: 'February 2026', title: 'Build, discover a limit, change course',
    role: 'Team technical contribution', setting: 'NLdigital NextGen AI hackathon',
    text: 'At the NLdigital challenge, our team explored misinformation through a Custom GPT, a Gemini Gem and a visual prototype. The useful lesson was a limitation: a convincing demonstration still needs evidence, evaluation and a clear account of failure.',
    transfer: 'Use short challenge formats to teach both construction and critical evaluation. Make the limitations part of the presentation.',
    boundary: 'Participation and prototype work, not event organisation, a competition win or a validated misinformation detector.',
    proof: 'Public participant account, reposted by a teammate; organiser’s event record.',
    links: [{ label: 'Team’s public build account', url: 'https://nl.linkedin.com/in/tobias-martins-adami' }, { label: 'NLdigital event record', url: 'https://nl.linkedin.com/showcase/nldigitalnextgen/' }],
  },
  {
    id: 'nldigital', period: '19 May 2026', title: 'Purpose becomes a practical exercise',
    role: 'Personal delivery', setting: 'NLdigital NextGen × Young Oracle Board',
    text: 'An interactive AI and Ikigai workshop at Oracle’s Amsterdam office connected purpose, skills and career direction with practical uses of AI. The organiser’s announcement and follow-up support the delivery record.',
    transfer: 'Start a university programme with the people taking part: their interests, capabilities and the contribution they want to make.',
    boundary: 'A selected workshop delivery. No learning outcomes or wider programme ownership are claimed.',
    proof: 'Official speaker announcement and organiser’s follow-up comment.',
    links: [{ label: 'Organiser’s announcement', url: 'https://nl.linkedin.com/showcase/nldigitalnextgen/' }, { label: 'Workshop and follow-up', url: 'https://www.linkedin.com/posts/frank-x-riemer_today-i-get-to-run-an-ikigai-personal-branding-activity-7462405815321378816-pcyi' }],
  },
  {
    id: 'independent', period: 'Now · 2026', title: 'Independent work you can inspect',
    role: 'Independent engineering', setting: 'Starlight Intelligence · FrankX',
    text: 'Today I am turning that experience into independently built systems and reusable working practices. Public repositories expose the instructions, source and licensing; recorded demonstrations show a specific workflow with its limits.',
    transfer: 'Give students and researchers something concrete to challenge, reproduce and improve, with clear ownership of their own work.',
    boundary: 'Public source establishes inspectability. Deployment, performance and adoption need separate evidence.',
    proof: 'Pinned public protocol and repository history.',
    links: [{ label: 'Inspect the protocol', url: 'https://github.com/Starlight-Intelligence/Starlight-Intelligence-System/blob/e159af3f94e93190c4a8ae127884d8f0d560dd5a/SIP.md' }],
  },
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
    id: 'engineering', title: 'Engineering', contribution: 'Applied AI engineering and evaluation',
    question: 'What can we build, inspect and reproduce?',
    idea: 'Students and researchers test a bounded AI workflow against a simpler baseline. Bring enterprise integration questions into the lab, then make the assumptions and failures visible.',
    artifact: 'An inspectable prototype, a reproducible task set and an evaluation note.',
    measure: 'Does it improve quality or effort after accounting for errors and compute cost?',
    boundary: 'The academic lead owns research design, assessment and any ethics review.',
  },
  {
    id: 'entrepreneurship', title: 'Entrepreneurship', contribution: 'Entrepreneurship and enterprise adoption',
    question: 'What makes a prototype useful to someone else?',
    idea: 'Bring an existing idea into a founder clinic. Examine the user need, technical dependencies and route to an enterprise conversation, then choose one customer experiment.',
    artifact: 'A product brief, a reliability check and an experiment with a named learning goal.',
    measure: 'Does the next user conversation resolve an important uncertainty?',
    boundary: 'No investment readiness, commercial outcome or customer introduction is promised.',
  },
  {
    id: 'programmes', title: 'Programmes', contribution: 'Designing and operating interdisciplinary AI programmes',
    question: 'How do different disciplines build something together?',
    idea: 'Combine teaching, technical mentoring and review in a small programme. Give each team a clear question, responsibilities, decision points and a handover another team can follow.',
    artifact: 'A reusable programme brief, facilitator notes and a shared evaluation rubric.',
    measure: 'Can another facilitator run it, and can the people affected explain its benefit?',
    boundary: 'Institutional ownership, supervision, resources and continuation are agreed together.',
  },
] as const

export const pilotSteps = [
  { period: 'Before', title: 'Choose the question', text: 'One university contact and Frank select a useful task, agree the participants, data, ownership and a compute ceiling.' },
  { period: 'Week 1', title: 'Build & inspect', text: 'A proposed 90-minute workshop for two to four small teams. Build from an existing example and record what fails.' },
  { period: 'Week 2', title: 'Test & hand over', text: 'A proposed 60-minute review. Another team follows the instructions, checks the result and identifies what needs work.' },
] as const
