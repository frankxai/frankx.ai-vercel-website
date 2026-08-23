'use client'

import { useState } from 'react'
import Link from 'next/link'

const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-void'

type Kit = {
  id: string
  title: string
  plane: string
  summary: string
  steps: string[]
  decisions: { id: string; made: string }[]
  open: { href: string; label: string }
  source: { href: string; label: string }
  deploy: { href: string; label: string; note: string }
}

const KITS: Kit[] = [
  {
    id: 'experience',
    title: 'Request-scoped surface',
    plane: 'Experience',
    summary:
      'The request a person is waiting on. Stream status. Do not run the eleven-minute loop here.',
    steps: ['Browser', 'Experience proxy', 'Enqueue', 'Worker'],
    decisions: [
      { id: 'model', made: 'Not here. The worker owns the provider name.' },
      { id: 'loop', made: 'No loop. This process returns.' },
      { id: 'trust', made: 'Forwards bytes. Does not put retrieved text in a system prompt.' },
      { id: 'run', made: 'Unmade on purpose. Long work is the other kit.' },
    ],
    open: { href: '/ai-architecture/claude-agent-sdk-vercel', label: 'Open the Vercel-lane blueprint' },
    source: {
      href: 'https://github.com/frankxai/ai-architect/tree/main/templates/deploy/request-scoped-agent',
      label: 'Experience kit source',
    },
    deploy: {
      href: 'https://vercel.com/new/clone?repository-url=https://github.com/vercel/chatbot',
      label: 'Clone the official request-scoped starter',
      note: 'Official Vercel chatbot is the maintained experience starter. Our kit is the seam: this process must not import a provider SDK.',
    },
  },
  {
    id: 'runtime',
    title: 'Durable worker plane',
    plane: 'Runtime',
    summary:
      'A process that outlives the request. Bounded steps, a budget, labelled tool data.',
    steps: ['POST /jobs', 'Queue', 'frame → retrieve → reason → stop', 'GET /jobs/:id'],
    decisions: [
      { id: 'model', made: 'src/model.js is the only module that may know a provider.' },
      { id: 'loop', made: 'Fixed workflow. Exit is a counter, not a prompt.' },
      { id: 'trust', made: 'Retrieval enters as { kind: "data" }.' },
      { id: 'run', made: 'This process. No serverless ceiling.' },
    ],
    open: { href: '/ai-architecture/claude-code-multi-agent-team-railway', label: 'Open the Railway-lane blueprint' },
    source: {
      href: 'https://github.com/frankxai/ai-architect/tree/main/templates/deploy/durable-worker',
      label: 'Worker kit source',
    },
    deploy: {
      href: 'https://railway.com/deploy',
      label: 'Railway template marketplace',
      note: 'Publishing our worker as a marketplace template (and earning kickback) is a dashboard action. The source is already in the plugin repo.',
    },
  },
  {
    id: 'atlas',
    title: 'Official source atlas',
    plane: 'Map',
    summary:
      'Maintained vendor architectures, organised by plane. Vendor pages cannot render inside this site — their frame policy, and ours, both forbid it. Walk the atlas here, then open the official repo.',
    steps: ['Experience', 'Runtime', 'Intelligence', 'Keep your seams'],
    decisions: [
      { id: 'model', made: 'Vendor is reversible. The seam is not.' },
      { id: 'loop', made: 'Pick a shape before you pick a framework.' },
      { id: 'trust', made: 'Everything a tool returns is untrusted input.' },
      { id: 'run', made: 'Eleven minutes is a different deployment problem.' },
    ],
    open: { href: '/ai-architecture#official-architectures', label: 'Open the atlas' },
    source: {
      href: '/ai-architecture/blueprints',
      label: 'FrankX blueprints',
    },
    deploy: {
      href: '/ai-architecture',
      label: 'Field guide',
      note: 'Start from a maintained implementation. Replace one boundary at a time.',
    },
  },
]

export default function ArchitectureStudio() {
  const [active, setActive] = useState(KITS[0].id)
  const kit = KITS.find((k) => k.id === active) ?? KITS[0]

  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/[0.08] bg-black/40">
      <div className="flex flex-wrap gap-2 border-b border-white/[0.07] p-3">
        {KITS.map((item) => {
          const selected = item.id === active
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActive(item.id)}
              className={`rounded-full px-4 py-2 text-sm transition-colors ${FOCUS_RING} ${
                selected ? 'bg-white text-slate-950' : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
              aria-pressed={selected}
            >
              {item.title}
            </button>
          )
        })}
      </div>

      <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="border-b border-white/[0.07] p-6 sm:p-8 lg:border-b-0 lg:border-r">
          <p className="font-mono text-xs text-emerald-300">{kit.plane}</p>
          <h3 className="mt-2 text-xl font-semibold text-white">{kit.title}</h3>
          <p className="mt-3 leading-7 text-slate-400">{kit.summary}</p>

          <ol className="mt-8 flex flex-wrap items-center gap-2">
            {kit.steps.map((step, index) => (
              <li key={step} className="flex items-center gap-2">
                <span className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-xs text-slate-200">
                  {step}
                </span>
                {index < kit.steps.length - 1 ? (
                  <span className="text-slate-600" aria-hidden="true">
                    →
                  </span>
                ) : null}
              </li>
            ))}
          </ol>

          <dl className="mt-8 space-y-4">
            {kit.decisions.map((row) => (
              <div key={row.id}>
                <dt className="font-mono text-xs uppercase tracking-wider text-white/50">{row.id}</dt>
                <dd className="mt-1 text-sm leading-6 text-slate-300">{row.made}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="flex flex-col justify-between p-6 sm:p-8">
          <p className="text-sm leading-6 text-slate-400">
            Vendor sites and this site both send <span className="font-mono text-slate-300">frame-ancestors none</span>.
            A v0-style iframe of someone else&apos;s page would be a blank box. The architecture is rendered here;
            the full page stays one click away.
          </p>
          <div className="mt-8 space-y-4">
            <Link
              href={kit.open.href}
              className={`inline-flex text-sm font-medium text-emerald-300 underline decoration-emerald-300/30 underline-offset-4 hover:decoration-emerald-300 ${FOCUS_RING}`}
            >
              {kit.open.label}
            </Link>
            <div>
              <a
                href={kit.source.href}
                className={`inline-flex text-sm text-slate-300 underline decoration-white/20 underline-offset-4 hover:text-white ${FOCUS_RING}`}
              >
                {kit.source.label}
              </a>
            </div>
            <div>
              <a
                href={kit.deploy.href}
                className={`inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-100 ${FOCUS_RING}`}
              >
                {kit.deploy.label}
              </a>
              <p className="mt-3 text-sm leading-6 text-slate-500">{kit.deploy.note}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
