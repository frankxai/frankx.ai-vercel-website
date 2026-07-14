import { NextResponse } from 'next/server'

export const dynamic = 'force-static'

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
    release: {
      tag: 'v1.1.0',
      url: 'https://github.com/frankxai/ana-ai-business-kit/releases/tag/v1.1.0',
      targetCommit: 'faebab8c5ad5cee591b670f39a86163c68cbf745',
      manifestUrl:
        'https://github.com/frankxai/ana-ai-business-kit/releases/download/v1.1.0/kit-manifest.json',
      packages: [
        {
          id: 'operator',
          name: 'Ana Operator Kit',
          audience: 'Ana and the working team',
          shareBoundary: 'Internal to Ana\'s practice; not for client forwarding.',
          entrypoint: 'START-HERE.md',
          url: 'https://github.com/frankxai/ana-ai-business-kit/releases/download/v1.1.0/ana-operator-kit-v1.1.0.zip',
          checksumUrl:
            'https://github.com/frankxai/ana-ai-business-kit/releases/download/v1.1.0/ana-operator-kit-v1.1.0.zip.sha256',
          sha256:
            '8af9231c18969e0e6d646d40d1f98b89bcf0553e204bf3efe9329f265424736b',
        },
        {
          id: 'client-session',
          name: 'Ana Client Session Kit',
          audience: 'A reviewed client handoff',
          shareBoundary:
            'Client-shareable only after Ana or an accountable team member reviews the exact files and recipient.',
          entrypoint: 'README.md',
          url: 'https://github.com/frankxai/ana-ai-business-kit/releases/download/v1.1.0/ana-client-session-kit-v1.1.0.zip',
          checksumUrl:
            'https://github.com/frankxai/ana-ai-business-kit/releases/download/v1.1.0/ana-client-session-kit-v1.1.0.zip.sha256',
          sha256:
            'eebb08c2ea2b896e5cc5ec7f952369946830af44c88c437162367c4eb7f81ec6',
        },
      ],
    },
    install: {
      audience:
        'The guided workflow is the primary entry point; Frank or a designated technical helper can handle setup separately.',
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
        'Client records stay in approved private systems; candidate identities and evidence stay in the approved ATS.',
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
