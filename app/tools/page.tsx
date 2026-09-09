import Link from 'next/link'
import {
  ArrowRight,
  ArrowUpRight,
  Calculator,
  Compass,
  Database,
  Layers,
  Network,
  Shield,
  Target,
  Wrench,
} from 'lucide-react'

import Breadcrumbs from '@/components/seo/Breadcrumbs'
import JsonLd from '@/components/seo/JsonLd'
import {
  SOCIAL_MEDIA_TOOLS,
  SOCIAL_TOOL_LAST_VERIFIED,
  SOCIAL_TOOL_ROLES,
} from '@/data/social-media-tools'
import { createMetadata, siteConfig } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Tools — Instruments Built in the FrankX Studio',
  description:
    'Free, in-browser instruments built by FrankX: the AI ROI calculator, the strategy canvas, the social tool decision atlas, and the AI system builder. The third-party stack lives at /stack.',
  path: '/tools',
})

/* One row per live, working instrument. Nothing in-development belongs here. */
const instruments = [
  {
    index: '01',
    name: 'AI ROI Calculator',
    icon: Calculator,
    what: 'A financial model for an AI initiative. Enter team size, salary cost, implementation cost, and expected time savings.',
    output: 'ROI percentage, payback in months, break-even month, and a shareable report view.',
    time: '~10 min',
    href: '/tools/roi-calculator',
  },
  {
    index: '02',
    name: 'AI Strategy Canvas',
    icon: Target,
    what: 'A six-section planning canvas — vision, stakeholders, resources, risks, use cases, roadmap — with guided questions per section.',
    output: 'A completed strategy canvas, from an enterprise, startup, or creator template.',
    time: '~30 min',
    href: '/tools/strategy-canvas',
  },
  {
    index: '03',
    name: 'Social Tool Decision Atlas',
    icon: Compass,
    what: `Evidence-checked comparison of ${SOCIAL_MEDIA_TOOLS.length} social media tools by role, price, API, MCP, approvals, and governance.`,
    output: `A shortlist for your operating role, from ${SOCIAL_TOOL_ROLES.length} routes — solo founder to enterprise.`,
    time: '~5 min',
    href: '/tools/social-media',
  },
  {
    index: '04',
    name: 'AI System Builder',
    icon: Wrench,
    what: 'A guided intake for a full AI system — requirements, architecture, and deployment choices, step by step, with a browsable AI component library.',
    output: 'A worked-through system definition across requirements, architecture, and deployment.',
    time: '~15 min',
    href: '/tools/builder',
  },
]

/* Honest ledger. These preview pages exist; the instruments do not, yet. */
const inDevelopment = [
  {
    name: 'Prompt Optimizer',
    will: 'Structured prompt rework with model-aware checks',
    href: '/tools/prompt-optimizer',
  },
  {
    name: 'AI Risk Analyzer',
    will: 'Pre-deployment risk and compliance review',
    href: '/tools/risk-analyzer',
  },
  {
    name: 'Agent Configuration Builder',
    will: 'Agent capabilities, tools, and safety constraints',
    href: '/tools/agent-builder',
  },
  {
    name: 'AI Performance Tracker',
    will: 'Quality, latency, and reliability trends per workflow',
    href: '/tools/performance-tracker',
  },
  {
    name: 'AI Content Generator',
    will: 'Guided drafts from reusable structures',
    href: '/tools/content-generator',
  },
  {
    name: 'Team Readiness Assessment',
    will: 'AI readiness across roles, skills, and adoption plans',
    href: '/tools/team-readiness',
  },
]

export default function ToolsPage() {
  const canonicalUrl = `${siteConfig.url}/tools`

  return (
    <main id="main" className="min-h-screen bg-void text-slate-100">
      <JsonLd
        type="CollectionPage"
        data={{
          name: 'FrankX Tools',
          description:
            'Free, in-browser instruments built by FrankX: calculators, planning canvases, tool decision atlases, and a system builder.',
          url: canonicalUrl,
          dateModified: SOCIAL_TOOL_LAST_VERIFIED,
          mainEntity: {
            '@type': 'ItemList',
            numberOfItems: instruments.length,
            itemListElement: instruments.map((tool, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: tool.name,
              url: `${siteConfig.url}${tool.href}`,
            })),
          },
        }}
      />

      {/* Hero */}
      <section className="border-b border-white/5 pt-28 pb-20 lg:pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }]} />
          <p className="text-[11px] font-semibold tracking-[0.08em] text-emerald-300/60">
            FrankX tools
          </p>
          <h1 className="mt-5 max-w-3xl text-balance font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            The <span className="font-serif font-medium italic text-emerald-200">instrument</span> room
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            Calculators, canvases, decision atlases, and a system builder — built in this
            studio. Free, in the browser, no signup. The third-party stack that runs the
            studio is a different page — the fork at the end of this one points there.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-5">
            <Link
              href="/tools/roi-calculator"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-emerald-950 transition-colors hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300"
            >
              Open the ROI calculator
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/stack"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 transition-colors hover:text-emerald-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300"
            >
              Or browse the stack I run
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>

          <dl className="mt-14 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-white/5 pt-8 sm:grid-cols-4">
            {[
              { value: String(instruments.length), label: 'Instruments live' },
              { value: String(SOCIAL_MEDIA_TOOLS.length), label: 'Tools compared in the atlas' },
              { value: SOCIAL_TOOL_LAST_VERIFIED, label: 'Last evidence check' },
              { value: String(inDevelopment.length), label: 'On the bench' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <dt className="order-last mt-2 text-[11px] font-semibold tracking-[0.04em] text-slate-500">
                  {stat.label}
                </dt>
                <dd className="font-mono text-2xl font-medium text-slate-100">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Live instruments */}
      <section aria-labelledby="instruments-title" className="border-b border-white/5 py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-[11px] font-semibold tracking-[0.08em] text-emerald-300/60">
            Built here / live now
          </p>
          <h2 id="instruments-title" className="mt-4 max-w-2xl text-balance font-display text-3xl font-bold text-white sm:text-4xl">
            Each instrument has one job
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400">
            Everything in this section works today. Each row says what goes in and what
            comes out — if a tool can&apos;t answer that, it isn&apos;t listed here.
          </p>

          <div className="mt-14 divide-y divide-white/5 border-y border-white/5">
            {instruments.map((tool) => (
              <Link
                key={tool.index}
                href={tool.href}
                className="group grid gap-6 py-10 transition-colors hover:bg-white/[0.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300 lg:grid-cols-[64px_1fr_280px] lg:gap-10"
              >
                <span className="font-mono text-sm text-emerald-300/50" aria-hidden="true">
                  {tool.index}
                </span>
                <div>
                  <span className="flex items-center gap-3">
                    <tool.icon className="h-5 w-5 text-emerald-300/80" aria-hidden="true" />
                    <span className="font-display text-xl font-semibold text-white transition-colors group-hover:text-emerald-100">
                      {tool.name}
                    </span>
                  </span>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">{tool.what}</p>
                  <p className="mt-3 max-w-xl font-mono text-xs leading-5 text-emerald-200/70">
                    → {tool.output}
                  </p>
                </div>
                <div className="flex items-start justify-between gap-4 lg:flex-col lg:items-end lg:text-right">
                  <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.02em] text-emerald-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                    Live
                  </span>
                  <span className="font-mono text-xs text-slate-500">{tool.time}</span>
                  <span className="hidden items-center gap-1.5 text-xs font-semibold tracking-[0.02em] text-slate-500 transition-colors group-hover:text-emerald-200 lg:inline-flex">
                    Open
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:transform-none"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <p className="mt-8 text-sm text-slate-500">
            System documentation, not an instrument:{' '}
            <Link
              href="/tools/visual-intelligence"
              className="font-medium text-slate-300 underline decoration-white/20 underline-offset-4 transition-colors hover:text-emerald-200 hover:decoration-emerald-300/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300"
            >
              the Visual Intelligence System
            </Link>{' '}
            — the image pipeline behind this site, explained layer by layer.
          </p>
        </div>
      </section>

      {/* Tool intelligence */}
      <section aria-labelledby="tool-intelligence-title" className="border-b border-white/5 py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="bg-void p-8 sm:p-12">
              <p className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.08em] text-emerald-300/60">
                <Compass className="h-4 w-4" aria-hidden="true" />
                Tool intelligence / current evidence
              </p>
              <h2
                id="tool-intelligence-title"
                className="mt-7 max-w-2xl text-balance font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl"
              >
                A decision atlas, not a logo cloud.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-7 text-slate-400">
                The atlases are instruments too — first-party research on third-party
                categories. Product fit is scored before commercial status is shown, and
                every record links an official source, not a tracked link.
              </p>
              <p className="mt-4 max-w-xl text-base leading-7 text-slate-400">
                First category: social media tools. Compare Metricool, Pallyy, Postiz,
                Buffer, and {SOCIAL_MEDIA_TOOLS.length - 4} more by role, price, API, MCP,
                approvals, and governance.
              </p>
              <Link
                href="/tools/social-media"
                className="mt-9 inline-flex items-center gap-3 rounded-full border border-emerald-300/40 px-6 py-3 text-xs font-semibold tracking-[0.02em] text-emerald-200 transition-colors hover:border-emerald-300 hover:text-emerald-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300"
              >
                Open the social tool atlas
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="grid bg-white/10 gap-px sm:grid-cols-3 lg:grid-cols-1">
              {[
                {
                  icon: Database,
                  value: String(SOCIAL_MEDIA_TOOLS.length),
                  label: 'Official-source records',
                },
                {
                  icon: Network,
                  value: String(SOCIAL_TOOL_ROLES.length),
                  label: 'Operating-role routes',
                },
                { icon: Shield, value: SOCIAL_TOOL_LAST_VERIFIED, label: 'Last evidence check' },
              ].map((item) => (
                <div key={item.label} className="bg-void p-7 sm:p-8">
                  <item.icon className="mb-6 h-5 w-5 text-emerald-300/70" aria-hidden="true" />
                  <strong className="block font-mono text-2xl font-medium text-white">
                    {item.value}
                  </strong>
                  <span className="mt-2 block text-[10px] font-semibold tracking-[0.04em] text-slate-500">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* In development */}
      <section aria-labelledby="bench-title" className="border-b border-white/5 py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-[11px] font-semibold tracking-[0.08em] text-slate-500">
            On the bench / not live yet
          </p>
          <h2 id="bench-title" className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">
            In development
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400">
            {inDevelopment.length} instruments are in build. No screenshots of things that
            don&apos;t exist — each row opens a preview page where you can join the waitlist.
          </p>

          <ul className="mt-12 border-t border-white/5">
            {inDevelopment.map((tool, index) => (
              <li key={tool.name} className="border-b border-white/5">
                <Link
                  href={tool.href}
                  className="group flex flex-wrap items-baseline gap-x-6 gap-y-1 py-5 transition-colors hover:bg-white/[0.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300 sm:flex-nowrap"
                >
                  <span className="w-8 shrink-0 font-mono text-xs text-slate-600" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="w-64 shrink-0 text-sm font-semibold text-slate-200 transition-colors group-hover:text-white">
                    {tool.name}
                  </span>
                  <span className="min-w-0 flex-1 text-sm text-slate-500">{tool.will}</span>
                  <span className="ml-auto shrink-0 font-mono text-[11px] tracking-[0.02em] text-amber-300/70">
                    In build
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* The fork: built here vs runs the studio */}
      <section aria-labelledby="fork-title" className="py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-[11px] font-semibold tracking-[0.08em] text-emerald-300/60">
            Two kinds of tools
          </p>
          <h2 id="fork-title" className="mt-4 max-w-2xl text-balance font-display text-3xl font-bold text-white sm:text-4xl">
            Built here, or runs the studio
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400">
            This page is the first kind. The second kind — the third-party tools behind the
            work — has its own page, so neither pretends to be the other.
          </p>

          <div className="mt-12 grid gap-px overflow-hidden border border-white/10 bg-white/10 lg:grid-cols-2">
            <div className="flex flex-col bg-void p-8 sm:p-10">
              <span className="flex items-center gap-2.5">
                <Layers className="h-5 w-5 text-emerald-300/80" aria-hidden="true" />
                <span className="font-display text-lg font-semibold text-white">Built in this studio</span>
              </span>
              <p className="mt-4 text-sm leading-6 text-slate-400">
                First-party instruments — designed, coded, and maintained by FrankX. Free to
                use, no account. The wider library of playbooks, prompt packs, and templates
                lives in the resource hub.
              </p>
              <Link
                href="/resources"
                className="mt-auto inline-flex items-center gap-1.5 pt-6 text-xs font-semibold tracking-[0.02em] text-emerald-300 transition-colors hover:text-emerald-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300"
              >
                Browse the resource hub
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
            <div className="flex flex-col bg-void p-8 sm:p-10">
              <span className="flex items-center gap-2.5">
                <Database className="h-5 w-5 text-emerald-300/80" aria-hidden="true" />
                <span className="font-display text-lg font-semibold text-white">Runs the studio</span>
              </span>
              <p className="mt-4 text-sm leading-6 text-slate-400">
                The FrankX Stack: third-party templates, agent frameworks, infrastructure,
                databases, and dev tools I actually use and recommend. Some links are
                affiliate links —{' '}
                <Link
                  href="/affiliates"
                  className="text-slate-300 underline decoration-white/20 underline-offset-4 transition-colors hover:text-emerald-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
                >
                  the policy is public
                </Link>
                .
              </p>
              <Link
                href="/stack"
                className="mt-auto inline-flex items-center gap-1.5 pt-6 text-xs font-semibold tracking-[0.02em] text-emerald-300 transition-colors hover:text-emerald-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300"
              >
                Browse the stack
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <p className="mt-12 text-sm text-slate-500">
            Need an instrument that doesn&apos;t exist yet?{' '}
            <Link
              href="/contact"
              className="font-medium text-slate-300 underline decoration-white/20 underline-offset-4 transition-colors hover:text-emerald-200 hover:decoration-emerald-300/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300"
            >
              Tell me what it should do
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  )
}
