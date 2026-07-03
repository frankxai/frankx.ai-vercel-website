import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ClipboardList,
  ExternalLink,
  Layers,
  PlayCircle,
  Terminal,
  Users,
} from 'lucide-react'
import { createMetadata } from '@/lib/seo'
import JsonLd, { FAQPageJsonLd, HowToJsonLd } from '@/components/seo/JsonLd'
import OpenAIAgentWorkbookSignup from '@/components/resources/OpenAIAgentWorkbookSignup'

const pageDescription =
  'Download the free FrankX OpenAI Agent Builder Workbook with DevDay video map, Codex and Agents SDK cheat sheets, Notion-ready guide, and current 2026 migration notes.'

export const metadata = createMetadata({
  title: 'OpenAI Agent Builder Workbook | Free DevDay 2026 Pack',
  description: pageDescription,
  path: '/resources/openai-agent-builder-workbook',
  keywords: [
    'OpenAI DevDay',
    'OpenAI agent builder workbook',
    'Agents SDK',
    'Codex',
    'ChatGPT agents',
    'Apps SDK',
    'AI agent workflow',
  ],
  image: '/hero-intelligence-atlas.png',
})

const packItems = [
  {
    title: 'Workbook',
    description: 'Choose one workflow, define the agent contract, map tools and approvals, then schedule a build sprint.',
    icon: ClipboardList,
  },
  {
    title: 'Cheat sheets',
    description: 'Fast decision matrix for Codex, Agents SDK, Apps SDK, Workspace Agents, and ChatGPT agent mode.',
    icon: Terminal,
  },
  {
    title: 'Notion companion',
    description: 'Importable Markdown structure for tracking use cases, sources, prompts, tests, demos, and community notes.',
    icon: Layers,
  },
  {
    title: 'GenCreator bridge',
    description: 'A simple handoff from solo learning into the upcoming creator community for planning generative culture.',
    icon: Users,
  },
]

const stackRows = [
  ['Codex', 'Use for software tasks, repo work, reviews, CLI/IDE/cloud delegation, and engineering verification loops.'],
  ['Agents SDK', 'Use when your app owns orchestration, tool execution, state, approvals, storage, and observability.'],
  ['Apps SDK', 'Use for interactive apps inside ChatGPT where conversation and UI belong together.'],
  ['Workspace Agents', 'Use for repeatable team workflows published inside ChatGPT and triggered by systems.'],
  ['ChatGPT agent mode', 'Use for operator-style browser, file, connector, and task execution workflows.'],
  ['Agent Builder and hosted Evals', 'Treat as migration context, not a fresh production foundation, because OpenAI is winding them down.'],
]

const videos = [
  ['OpenAI DevDay 2025 Opening Keynote', 'https://www.youtube.com/watch?v=hS1YqcewH0c'],
  ['Developer State Of The Union', 'https://www.youtube.com/watch?v=r1R3RDPvPeg'],
  ['Shipping with Codex', 'https://www.youtube.com/watch?v=Gr41tYOzE20'],
  ['Orchestrating Agents at Scale', 'https://www.youtube.com/watch?v=KplSDxYv9xU'],
  ['Model Behavior: The Science of AI Style', 'https://www.youtube.com/watch?v=ER9Hqly28Qw'],
]

const faqs = [
  {
    question: 'Is this workbook for Agent Builder specifically?',
    answer:
      'It uses the phrase Agent Builder because people search for it, but the workbook routes new 2026 production work toward Codex, Agents SDK, Apps SDK, Workspace Agents, and ChatGPT agent mode. Agent Builder and hosted Evals are treated as migration references.',
  },
  {
    question: 'What should I watch first?',
    answer:
      'Start with Developer State Of The Union for the platform map, then Shipping with Codex for software work or Orchestrating Agents at Scale for production agent systems.',
  },
  {
    question: 'Who is this for?',
    answer:
      'The pack is for creators, AI architects, operators, founders, and technical teams who want to convert OpenAI announcements into practical workflows, assets, and shipped systems.',
  },
]

export default function OpenAIAgentWorkbookPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white">
      <JsonLd
        type="CollectionPage"
        id="openai-agent-workbook-collection"
        data={{
          name: 'OpenAI Agent Builder Workbook',
          description: pageDescription,
          url: 'https://frankx.ai/resources/openai-agent-builder-workbook',
          isPartOf: { '@type': 'WebSite', name: 'FrankX', url: 'https://frankx.ai' },
        }}
      />
      <FAQPageJsonLd faqs={faqs} id="openai-agent-workbook-faq" />
      <HowToJsonLd
        id="openai-agent-workbook-howto"
        data={{
          name: 'How to turn OpenAI DevDay into an agent build plan',
          description: 'A practical process for choosing an OpenAI builder surface and shipping a useful agent workflow.',
          totalTime: 'P7D',
          tool: ['Codex', 'Agents SDK', 'Apps SDK', 'ChatGPT', 'Notion'],
          steps: [
            { name: 'Watch the official map', text: 'Start with DevDay keynote and Developer State Of The Union to understand the current OpenAI stack.' },
            { name: 'Pick one workflow', text: 'Select one recurring task with clear inputs, tools, approval points, and a measurable output.' },
            { name: 'Choose the surface', text: 'Use the workbook matrix to choose Codex, Agents SDK, Apps SDK, Workspace Agents, or ChatGPT agent mode.' },
            { name: 'Write the contract', text: 'Document the agent goal, permissions, context, risks, and done criteria before building.' },
            { name: 'Ship and review', text: 'Run a small demo, record failure modes, and bring the strongest build plan into the GenCreator path.' },
          ],
        }}
      />

      <section className="relative overflow-hidden pt-28 pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(16,185,129,0.18),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(14,165,233,0.12),transparent_30%),#0a0a0b]" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 lg:grid-cols-[1.05fr,0.95fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-emerald-300/80">
              Free OpenAI DevDay Resource
            </p>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              OpenAI Agent Builder Workbook
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/66">
              A current FrankX field guide for turning the official OpenAI DevDay sessions into a real build plan across Codex, Agents SDK, Apps SDK, Workspace Agents, and ChatGPT.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#download"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition-colors hover:bg-white/90"
              >
                Get the free pack
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/learn/openai-devday-agent-stack"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Watch the path
                <PlayCircle className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-full bg-emerald-400/10 blur-3xl" />
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
              <Image
                src="/hero-intelligence-atlas.png"
                alt="FrankX intelligence atlas visual for the OpenAI Agent Builder Workbook"
                width={1000}
                height={700}
                priority
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {packItems.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.title} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="mt-4 text-lg font-semibold text-white">{item.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-white/58">{item.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[0.95fr,1.05fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300/75">
            Current 2026 Route
          </p>
          <h2 className="mt-4 text-3xl font-bold text-white">Choose the surface before you build</h2>
          <p className="mt-4 text-base leading-relaxed text-white/62">
            The strongest FrankX recommendation for this ICP is not one more broad ChatGPT guide. It is a decision resource: builders need to know where a workflow belongs before they waste a week wiring the wrong surface.
          </p>
        </div>
        <div className="overflow-hidden rounded-2xl border border-white/[0.08]">
          {stackRows.map(([name, description]) => (
            <div key={name} className="grid gap-2 border-b border-white/[0.06] bg-white/[0.03] p-4 last:border-b-0 md:grid-cols-[180px,1fr]">
              <div className="font-semibold text-white">{name}</div>
              <div className="text-sm leading-relaxed text-white/60">{description}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[1.05fr,0.95fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300/75">
            Official Video Map
          </p>
          <h2 className="mt-4 text-3xl font-bold text-white">The shortest useful playlist</h2>
          <p className="mt-4 text-base leading-relaxed text-white/62">
            The full path lives on FrankX Learn. This landing page points searchers and AI answer engines at the essential official sessions first, then routes them into the workbook.
          </p>
          <Link
            href="/learn/openai-devday-agent-stack"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-300 hover:text-emerald-200"
          >
            Open the full learning path
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="space-y-3">
          {videos.map(([title, href]) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 text-sm font-medium text-white transition-colors hover:border-white/20 hover:bg-white/[0.05]"
            >
              <span className="inline-flex items-center gap-3">
                <PlayCircle className="h-5 w-5 text-emerald-300" />
                {title}
              </span>
              <ExternalLink className="h-4 w-4 shrink-0 text-white/40" />
            </a>
          ))}
        </div>
      </section>

      <section id="download" className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[0.9fr,1.1fr]">
        <OpenAIAgentWorkbookSignup />
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300/75">
            What you will do with it
          </p>
          <h2 className="mt-4 text-3xl font-bold text-white">Build one clean agent brief</h2>
          <div className="mt-6 space-y-4">
            {[
              'Pick one recurring workflow with real leverage.',
              'Select the right OpenAI surface before writing code or prompts.',
              'Document context, tools, permissions, risks, and approval points.',
              'Turn the brief into a Notion tracker for iteration and community review.',
              'Route the best build into the GenCreator community path for shared practice.',
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 text-white/68">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
                <p className="text-sm leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
          <div className="flex items-start gap-4">
            <BookOpen className="mt-1 h-6 w-6 shrink-0 text-emerald-300" />
            <div>
              <h2 className="text-2xl font-bold text-white">Next step: plan generative culture together</h2>
              <p className="mt-3 text-base leading-relaxed text-white/62">
                The workbook is the solo starting point. The upcoming GenCreator community is where the best builders can compare workflows, remix useful patterns, and plan generative culture with real artifacts instead of abstract takes.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/gencreator"
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-3 text-sm font-semibold text-black transition-colors hover:bg-emerald-300"
                >
                  Explore GenCreator
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/community"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Community hub
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
