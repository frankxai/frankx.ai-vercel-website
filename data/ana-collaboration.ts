import { ALLY_SOCIAL_LINKS } from '@/lib/social-links'

export type AnaWorkflowStage = {
  id:
    | 'board'
    | 'first-call'
    | 'kickoff'
    | 'job-description'
    | 'offer'
    | 'recruiting'
    | 'invoice'
    | 'handoff'
  number: string
  shortLabel: string
  title: string
  purpose: string
  teamRole: string
  aiRole: string
  approval: string
  output: string
}

export const anaLinks = {
  friendPage: '/friends/ana',
  teamPlan: '/allies/ana-cancino',
  privateWorkspace: '/portal/ana',
  kitDownload: '/downloads/ana-ai-business-kit',
  tallinnFoundry: '/experiences/tallinn-2026',
  ceciliaRoom: '/alliance/cecilia',
  architectureAtlas: '/ai-architecture',
  website: 'https://www.anaceciliacancino.com/',
  workWithMe: 'https://www.anaceciliacancino.com/work-with-me',
  research: 'https://www.anaceciliacancino.com/research',
  linkedin: ALLY_SOCIAL_LINKS.anaCancino.linkedin,
  kitRepo: 'https://github.com/frankxai/ana-ai-business-kit',
  kitStart:
    'https://github.com/frankxai/ana-ai-business-kit/blob/main/START-HERE-ANA.md',
  kitTeamStart:
    'https://github.com/frankxai/ana-ai-business-kit/blob/main/START-HERE-TEAM.md',
  kitReadingMap:
    'https://github.com/frankxai/ana-ai-business-kit/blob/main/docs/WHO-READS-WHAT.md',
} as const

export const anaWorkflowStages: AnaWorkflowStage[] = [
  {
    id: 'board',
    number: '00',
    shortLabel: 'Daily board',
    title: 'See every engagement without exposing private records',
    purpose:
      'A client-alias view of the current stage, owner, due date, blocker, and approval waiting for Ana.',
    teamRole:
      'Update owners, dates, blockers, and the next action from the approved source systems.',
    aiRole:
      'Create a concise operations view and flag missing decisions. The original tools remain the source of truth.',
    approval: 'Ana resolves the priority order and any commercial or hiring blocker.',
    output: 'Daily operations board with aliases only.',
  },
  {
    id: 'first-call',
    number: '01',
    shortLabel: 'First call',
    title: 'Capture the client need once',
    purpose:
      'Record the business outcome, role or service need, stakeholders, timing, process, privacy expectations, and open decisions.',
    teamRole:
      'Lead the conversation, capture source facts, and assign an owner and due date to every open point.',
    aiRole:
      'Structure the notes, separate facts from assumptions, and prepare a short readback.',
    approval: 'The client and Ana confirm the readback before kickoff.',
    output: 'Private engagement record and confirmed next action.',
  },
  {
    id: 'kickoff',
    number: '02',
    shortLabel: 'Kickoff',
    title: 'Confirm how the work will run',
    purpose:
      'Agree scope, exclusions, decision-makers, cadence, selection stages, document owners, privacy, and billing inputs.',
    teamRole:
      'Resolve missing logistics and identify the approved Google Docs template and private destination.',
    aiRole:
      'Check the entry criteria and show exactly what is still missing.',
    approval: 'Ana approves scope; the client confirms accountable people and process.',
    output: 'Approved kickoff and routes for role brief and/or service offer.',
  },
  {
    id: 'job-description',
    number: '03',
    shortLabel: 'Role brief',
    title: 'Turn the need into job-relevant evidence',
    purpose:
      'Define the role outcome, responsibilities, must-haves, trainable skills, and one consistent evidence standard.',
    teamRole:
      'Supply role facts and challenge vague traits or requirements that are not job-relevant.',
    aiRole:
      'Draft the scorecard and job description without protected-trait or personality proxies.',
    approval: 'Ana and the client approve the requirements and final wording.',
    output: 'Reviewed role scorecard and job-description draft.',
  },
  {
    id: 'offer',
    number: '04',
    shortLabel: 'Service offer',
    title: 'Prepare the offer without guessing the money',
    purpose:
      'Translate the approved kickoff into scope, exclusions, deliverables, timing, dependencies, and commercial terms.',
    teamRole:
      'Provide the approved pricing source, currency, tax treatment, payment terms, and comparable document.',
    aiRole:
      'Draft and reconcile the offer, showing every missing commercial fact.',
    approval: 'Ana separately approves price and wording.',
    output: 'Human-reviewed offer draft in a copy of the approved template.',
  },
  {
    id: 'recruiting',
    number: '05',
    shortLabel: 'Recruiting',
    title: 'Run a consistent search with evidence',
    purpose:
      'Launch the requisition, maintain structured stages, and give the client a useful weekly status without copying candidate data into the workspace.',
    teamRole:
      'Source, interview, and keep candidate identities and evidence in the approved ATS.',
    aiRole:
      'Organize job-relevant evidence and aggregate pipeline status. It does not rank or reject people.',
    approval: 'Humans remain accountable for shortlist, interview, and hiring decisions.',
    output: 'ATS-referenced delivery status and approved client update.',
  },
  {
    id: 'invoice',
    number: '06',
    shortLabel: 'Invoice',
    title: 'Draft from an approved offer or milestone',
    purpose:
      'Reconcile billing identities, invoice number, dates, line items, currency, tax, total, terms, and approved payment reference.',
    teamRole:
      'Supply finance-system facts and confirm the approved milestone.',
    aiRole:
      'Check arithmetic and surface missing data. It never invents bank details or creates a payment.',
    approval: 'Ana approves the invoice facts and final amount.',
    output: 'Checked invoice draft, still unsent.',
  },
  {
    id: 'handoff',
    number: '07',
    shortLabel: 'Handoff',
    title: 'Prepare the exact client handoff',
    purpose:
      'Bring together the latest approved document, recipient, channel, attachment or link, and a concise next-action note.',
    teamRole:
      'Verify the destination and re-read the final artifact immediately before handoff.',
    aiRole:
      'Prepare a draft message and completion receipt only.',
    approval: 'Ana gives fresh approval for the exact recipient and channel.',
    output: 'Approved handoff package; sending remains a separate human action.',
  },
]

export const anaPilot = [
  {
    window: 'Week 1',
    title: 'Map the real setup',
    detail:
      'Confirm who owns each stage, which templates are approved, where private records belong, how the candidate tracker is used, and where prices come from.',
  },
  {
    window: 'Week 2',
    title: 'Rehearse on copies',
    detail:
      'Practice with a past case whose private details have been removed, or a made-up example. Do not edit a master document, contact a client, or use candidate data.',
  },
  {
    window: 'Week 3',
    title: 'Guide one live engagement',
    detail:
      'Use approved data, stop at every gate, and watch where the team needs less complexity or better prompts.',
  },
  {
    window: 'Week 4',
    title: 'Keep only what helps',
    detail:
      'Review time saved, quality, team adoption, and whether a private portal or Cecilia pilot is worth the next build.',
  },
] as const

export const anaInstallCommands = [
  'codex plugin marketplace add frankxai/ana-ai-business-kit --ref main',
  'codex plugin add ana-hr-operations@ana-business-kit',
  'codex plugin list',
] as const
