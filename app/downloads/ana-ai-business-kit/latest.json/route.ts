import { NextResponse } from 'next/server'

const installCommands = [
  'codex plugin marketplace add frankxai/ana-ai-business-kit --ref main',
  'codex plugin add ana-hr-operations@ana-business-kit',
  'codex plugin list',
] as const

export function GET() {
  return NextResponse.json({
    name: 'ana-ai-business-kit',
    version: '1.1.0',
    releaseDate: '2026-07-14',
    status: 'current',
    publicPage: 'https://frankx.ai/downloads/ana-ai-business-kit',
    sourceRepo: 'https://github.com/frankxai/ana-ai-business-kit',
    startGuide:
      'https://github.com/frankxai/ana-ai-business-kit/blob/main/START-HERE-ANA.md',
    teamStartGuide:
      'https://github.com/frankxai/ana-ai-business-kit/blob/main/START-HERE-TEAM.md',
    readingMap:
      'https://github.com/frankxai/ana-ai-business-kit/blob/main/docs/WHO-READS-WHAT.md',
    install: {
      audience:
        'Ana and her team can use the guided start page; GitHub knowledge is not required.',
      commands: installCommands,
      firstPrompt:
        'Use Ana HR Operations. Guide me through the first-call capture one section at a time. Separate facts from assumptions and stop for every human approval.',
    },
    workflow: [
      'daily multi-client control',
      'first client call',
      'approved kickoff',
      'role brief and job description',
      'service offer and pricing approval',
      'recruiting delivery and weekly status',
      'invoice draft and reconciliation',
      'approved client handoff',
    ],
    guardrails: {
      humanApproval:
        'Required for hiring judgments, scope, price, invoices, final wording, recipients, and sends.',
      privateRecords:
        'Client and candidate records stay in approved private systems, outside GitHub.',
      aiRole:
        'Structure, draft, reconcile, and flag missing facts. Never rank candidates, invent prices, create payments, or send autonomously.',
    },
    legacyArchive: {
      version: '0.1.0',
      recommended: false,
      purpose: 'Reference archive; not the current HR Operations workflow.',
      name: 'ana-ai-business-kit-v0.1.0.zip',
      url: 'https://frankx.ai/downloads/ana-ai-business-kit-v0.1.0.zip',
      checksumSha256:
        '1a32030bb99f90f5b2a7c2d5dd82822ab7b686a59c105524dfcee5e52d0f979d',
      checksumUrl:
        'https://frankx.ai/downloads/ana-ai-business-kit-v0.1.0.sha256',
    },
  })
}
