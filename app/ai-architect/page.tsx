import Link from 'next/link'
import { ArrowRight, Download, Terminal } from 'lucide-react'

import ArchitectureStudio from '@/components/ai-architecture/ArchitectureStudio'
import FrankOmega from '@/components/FrankOmega'
import JsonLd, { FAQPageJsonLd } from '@/components/seo/JsonLd'
import { createMetadata } from '@/lib/seo'

import ReviewRunner from './ReviewRunner'

const CANONICAL = 'https://www.frankx.ai/ai-architect'
const SKILL_PATH = '/skills/ai-architect-review/SKILL.md'

export const metadata = createMetadata({
  title: 'AI Architect: Run the Architecture Review Yourself',
  description:
    'The review that checks the four AI architecture decisions that are expensive to reverse — as a page you can work through, and as an MIT-licensed skill your coding agent can read.',
  path: '/ai-architect',
  keywords: [
    'ai architect',
    'ai architecture review',
    'agent architecture audit',
    'ai architecture skill',
    'claude code skill',
    'cursor rules ai architecture',
  ],
})

const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-void'

/** The four checks, in reversal-cost order. Each one names its own evidence. */
const CHECKS = [
  {
    index: '01',
    title: 'Where does the model call go?',
    evidence: 'Grep for the provider SDK import across the repo.',
    command: 'rg -l "from [\'\\"](openai|@anthropic-ai/sdk|@google/gen)"',
    pass: 'One module knows a provider name. The seam exists.',
    fail: 'Ninety call sites. The decision was deferred, and the deferral compounds.',
  },
  {
    index: '02',
    title: 'What shape is the loop?',
    evidence: "Find the loop's exit condition.",
    command: 'Read the control flow, not the prompt.',
    pass: 'A counter, a budget, or a state machine. Bounded in code.',
    fail: 'An instruction to stop when done. An unbounded loop with a polite request attached.',
  },
  {
    index: '03',
    title: 'Where does the trust boundary sit?',
    evidence: 'Trace one retrieved document from the retriever to the context window.',
    command: 'Point at the line where it becomes labelled data.',
    pass: 'Untrusted text stays in the data position. Side effects sit behind a gate.',
    fail: 'You cannot find the line. Then a document can act, and the corpus is attack surface.',
  },
  {
    index: '04',
    title: 'Where does a long run live?',
    evidence: 'The longest real production run, against the platform ceiling.',
    command: 'Not the median. The longest.',
    pass: 'Both numbers known, and the second is larger.',
    fail: 'Neither number known. The platform choice was load-bearing and nobody made it.',
  },
]

const INSTALLS = [
  {
    harness: 'Claude Code',
    where: '.claude/skills/ai-architect-review/SKILL.md',
    note: 'Project-level. Activates from context, or ask for an architecture review.',
  },
  {
    harness: 'Cursor',
    where: '.cursor/rules/ai-architect-review.md',
    note: 'Reads the same file. Add a description line if your rules use frontmatter.',
  },
  {
    harness: 'Codex / Windsurf / Copilot',
    where: 'AGENTS.md, or the rules directory your harness reads',
    note: 'Paste the body, or reference the file. It is plain markdown by design.',
  },
]

const FAQS = [
  {
    question: 'What is an AI architecture review?',
    answer:
      'A pass over the parts that surround a model rather than the model itself: where the model call is made, what shape the control loop is, where untrusted text can and cannot go, and where work that outlives a request runs. It checks those four first because they are the decisions that are expensive to reverse, then walks the seven planes looking for one nobody owns.',
  },
  {
    question: 'Is this an MCP server or a skill?',
    answer:
      'The review is a skill: a file your agent reads. MCP is the right shape for capability with side effects. The nine-stage team is a plugin that writes docs/architecture/ in your repo. An optional local stdio MCP runs the gate checks — it does not call a model and it is not hosted here. A hosted agent on this page would be the wrong shape.',
  },
  {
    question: 'What does the skill cost?',
    answer:
      'Nothing. It is MIT licensed and served as a plain markdown file. The rubric is free because a rubric distributes; what is not free is the judgement of applying it to a system with real constraints, which is what a human review is for.',
  },
  {
    question: 'Which coding agents can use it?',
    answer:
      'Any harness that reads a markdown skill or rules file. That covers Claude Code, Cursor, Codex, Windsurf, and GitHub Copilot today. The file carries standard skill frontmatter with a name and a description, and the body is ordinary markdown with no harness-specific syntax.',
  },
]

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] uppercase tracking-[0.25em] text-white/60">{children}</p>
  )
}

export default function AIArchitectPage() {
  return (
    <main className="bg-[#0a0a0b] text-white">
      <JsonLd
        type="BreadcrumbList"
        id="ai-architect-breadcrumbs"
        data={{
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'FrankX', item: 'https://www.frankx.ai' },
            { '@type': 'ListItem', position: 2, name: 'AI Architect', item: CANONICAL },
          ],
        }}
      />
      <FAQPageJsonLd faqs={FAQS} id="ai-architect-faq" />

      <section className="relative overflow-hidden border-b border-white/5 pt-28 sm:pt-32">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute left-[10%] top-24 h-72 w-72 rounded-full bg-emerald-500/[0.07] blur-[110px]" />
          <div className="absolute right-[6%] top-40 h-80 w-80 rounded-full bg-cyan-500/[0.05] blur-[130px]" />
        </div>
        <div className="relative mx-auto grid max-w-6xl gap-14 px-6 pb-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <div className="flex items-center gap-4">
              <FrankOmega variant="thinking" size="md" animate glow />
              <Eyebrow>FRANK-Ω hosts the review</Eyebrow>
            </div>
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              The architecture review, as something you can run.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-300">
              Four checks against a real codebase. Each one names something you can grep, measure, or
              point at — because a review with no evidence is an opinion. Work through it here, or
              install the team into the coding agent that already has the repository open.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <a
                href={SKILL_PATH}
                download
                className={`inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-emerald-100 ${FOCUS_RING}`}
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Get the skill (MIT)
              </a>
              <a
                href="https://github.com/frankxai/ai-architect"
                className={`rounded-sm text-sm font-medium text-slate-300 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white ${FOCUS_RING}`}
              >
                Install the team
              </a>
            </div>
          </div>

          {/* Built from CHECKS so the index and the section below cannot disagree. */}
          <div className="surface-3 rounded-[2rem] border border-white/[0.08] p-6 shadow-2xl shadow-black/30 sm:p-8">
            <p className="font-mono text-xs text-emerald-300">What it checks</p>
            <p className="mt-1 text-sm text-slate-400">In order of what it costs to defer.</p>
            <ol className="mt-6 divide-y divide-white/[0.07] border-t border-white/[0.07]">
              {CHECKS.map((check) => (
                <li key={check.index} className="flex gap-4 py-4">
                  <span className="font-mono text-xs leading-6 text-emerald-300">{check.index}</span>
                  <span className="text-sm leading-6 text-slate-200">{check.title}</span>
                </li>
              ))}
            </ol>
            <p className="mt-6 border-t border-white/[0.07] pt-5 text-sm leading-6 text-slate-400">
              Everything else — prompt wording, chunk size, which reranker, which framework — is a
              refactor you can do on a quiet Thursday.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-white/5 py-24 lg:py-32">
        <div className="mx-auto max-w-5xl px-6">
          <Eyebrow>The four checks</Eyebrow>
          <h2 className="mt-4 max-w-3xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Most decisions are reversible in an afternoon. These four are not.
          </h2>
          <p className="mt-5 max-w-2xl leading-7 text-slate-400">
            Run them in order. The cost of deferring rises as you go down the list, and check three
            rises fastest, because it scales with the number of tools already shipped.
          </p>

          <ol className="mt-14 space-y-px">
            {CHECKS.map((check) => (
              <li
                key={check.index}
                className="surface-2 grid gap-6 border border-white/[0.07] p-6 first:rounded-t-2xl last:rounded-b-2xl sm:p-8 lg:grid-cols-[1fr_1fr] lg:gap-12"
              >
                <div>
                  <span className="font-mono text-xs text-emerald-300">{check.index}</span>
                  <h3 className="mt-3 text-xl font-semibold text-white">{check.title}</h3>
                  <p className="mt-3 leading-7 text-slate-400">{check.evidence}</p>
                  <p className="mt-4 overflow-x-auto rounded-lg border border-white/10 bg-black/30 px-3 py-2 font-mono text-xs text-slate-300">
                    {check.command}
                  </p>
                </div>
                <dl className="space-y-5 text-sm leading-6">
                  <div>
                    <dt className="font-mono text-xs text-emerald-300">Made</dt>
                    <dd className="mt-1.5 text-slate-300">{check.pass}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-xs text-amber-400">Deferred</dt>
                    <dd className="mt-1.5 text-slate-400">{check.fail}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ol>

          <p className="mt-10 max-w-2xl leading-7 text-slate-400">
            One question closes the set: what breaks first if your primary model provider is
            unavailable for four hours? If the answer is everything, all four are still open, and
            they are open in the expensive direction.{' '}
            <Link
              href="/blog/ai-architecture-2026-four-decisions-hard-to-reverse"
              className={`rounded-sm text-emerald-300 underline decoration-emerald-300/30 underline-offset-4 transition-colors hover:decoration-emerald-300 ${FOCUS_RING}`}
            >
              The long version of the argument
            </Link>{' '}
            covers why each one is expensive.
          </p>
        </div>
      </section>

      <section id="run" className="scroll-mt-20 border-b border-white/5 py-24 lg:py-32">
        <div className="mx-auto max-w-5xl px-6">
          <Eyebrow>Run it now</Eyebrow>
          <h2 className="mt-4 max-w-3xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Four answers in, one verdict out.
          </h2>
          <p className="mt-5 max-w-2xl leading-7 text-slate-400">
            The same rubric the installable skill runs — deterministic, in your browser, and nothing
            you enter leaves the page. Each option names the evidence it stands on, because a review
            with no evidence is an opinion.
          </p>
          <div className="mt-12">
            <ReviewRunner />
          </div>
        </div>
      </section>

      <section id="studio" className="scroll-mt-20 border-b border-white/5 py-24 lg:py-32">
        <div className="mx-auto max-w-5xl px-6">
          <Eyebrow>Walk an architecture</Eyebrow>
          <h2 className="mt-4 max-w-3xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
            The page is the preview. Not a list of other people&apos;s URLs.
          </h2>
          <p className="mt-5 max-w-2xl leading-7 text-slate-400">
            Three kits. Each one names the four decisions it settles. Open the full blueprint when
            you want the long form. Deploy from the official starter, or from the source that
            encodes the seams.
          </p>
          <div className="mt-12">
            <ArchitectureStudio />
          </div>
        </div>
      </section>

      <section className="border-b border-white/5 py-24 lg:py-32">
        <div className="mx-auto max-w-5xl px-6">
          <Eyebrow>Install</Eyebrow>
          <h2 className="mt-4 max-w-3xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Run it where the architecture actually is.
          </h2>
          <p className="mt-5 max-w-2xl leading-7 text-slate-400">
            The rubric is one file. The team is a plugin: nine gated stages that write
            <span className="font-mono text-slate-300"> docs/architecture/</span> and stop at the
            first red gate. Both run on your keys. Nothing is hosted on this page except the
            interview runner.
          </p>

          <div className="mt-10 overflow-x-auto rounded-2xl border border-white/[0.08] bg-black/40 p-5 sm:p-6">
            <div className="mb-3 flex items-center gap-2 text-slate-500">
              <Terminal className="h-4 w-4" aria-hidden="true" />
              <span className="font-mono text-xs">Claude Code</span>
            </div>
            <pre className="whitespace-pre font-mono text-xs leading-6 text-slate-300 sm:text-sm">
{`mkdir -p .claude/skills/ai-architect-review
curl -sSL https://www.frankx.ai${SKILL_PATH} \\
  -o .claude/skills/ai-architect-review/SKILL.md`}
            </pre>
          </div>

          <div className="mt-6 overflow-x-auto rounded-2xl border border-white/[0.08] bg-black/40 p-5 sm:p-6">
            <div className="mb-3 flex items-center gap-2 text-slate-500">
              <Terminal className="h-4 w-4" aria-hidden="true" />
              <span className="font-mono text-xs">The team (plugin)</span>
            </div>
            <pre className="whitespace-pre font-mono text-xs leading-6 text-slate-300 sm:text-sm">
{`git clone https://github.com/frankxai/ai-architect
cd ai-architect
# Claude Code: add this directory as a local marketplace, then install ai-architect
# Cursor / AGENTS.md:
node scripts/install-cross-harness.mjs --cursor --agents-md --target /path/to/your/repo`}
            </pre>
          </div>

          <dl className="mt-10 divide-y divide-white/[0.07] border-y border-white/[0.07]">
            {INSTALLS.map((item) => (
              <div key={item.harness} className="grid gap-2 py-5 sm:grid-cols-[180px_1fr] sm:gap-8">
                <dt className="text-sm font-semibold text-white">{item.harness}</dt>
                <dd>
                  <p className="break-all font-mono text-xs text-emerald-300">{item.where}</p>
                  <p className="mt-1.5 text-sm leading-6 text-slate-400">{item.note}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-b border-white/5 py-24 lg:py-32">
        <div className="mx-auto max-w-5xl px-6">
          <Eyebrow>The engineering call</Eyebrow>
          <h2 className="mt-4 max-w-3xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
            A rubric is a file. A team is a plugin. A hosted agent is a product you now operate.
          </h2>
          <div className="mt-8 grid gap-10 lg:grid-cols-2">
            <div className="space-y-5 leading-7 text-slate-400">
              <p>
                MCP is the right shape for capability with side effects — something that reads your
                systems, holds state across calls, and acts. It costs a server you host, an auth
                story, and uptime you are now responsible for.
              </p>
              <p>
                A rubric is static knowledge. Shipping it as a file your agent reads is strictly
                better on every axis that matters here: it works offline, it cannot break when a
                server goes down, it costs nothing per run, and one file installs into every harness
                rather than one.
              </p>
              <p className="text-slate-300">
                The threshold to cross is narrow and worth naming: MCP starts earning its complexity
                the day the reviewer needs to read your repository and carry state across a session.
                At that point the value has moved into the reading, and the rubric is still just a
                file.
              </p>
            </div>
            <div className="surface-2 rounded-2xl border border-white/[0.08] p-6 sm:p-8">
              <h3 className="text-sm font-semibold text-white">What is free, and what is not</h3>
              <dl className="mt-6 space-y-6 text-sm leading-6">
                <div>
                  <dt className="font-mono text-xs text-emerald-300">Free, permanently</dt>
                  <dd className="mt-2 text-slate-400">
                    The rubric, the skill file, the field guide, the diagrams. A rubric is only worth
                    something if it travels, and a paywall stops it travelling.
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-xs text-white/60">Not free</dt>
                  <dd className="mt-2 text-slate-400">
                    Applying it to a system with real constraints, real history, and a real team.
                    That is judgement rather than an artifact, and it does not compress into a file.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-5xl px-6">
          <Eyebrow>Questions</Eyebrow>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Before you install it
          </h2>
          <div className="mt-10 divide-y divide-white/[0.07] border-y border-white/[0.07]">
            {FAQS.map((faq) => (
              <details key={faq.question} className="group py-5">
                <summary
                  className={`cursor-pointer list-none rounded-lg font-semibold text-white marker:hidden ${FOCUS_RING}`}
                >
                  {faq.question}
                </summary>
                <p className="mt-3 max-w-3xl leading-7 text-slate-400">{faq.answer}</p>
              </details>
            ))}
          </div>

          <div className="mt-16 flex flex-wrap items-center gap-5">
            <Link
              href="/ai-architecture"
              className={`inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-emerald-100 ${FOCUS_RING}`}
            >
              Open the field guide
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/ai-architecture/blueprints"
              className={`rounded-sm text-sm font-medium text-slate-300 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white ${FOCUS_RING}`}
            >
              Inspect the blueprints
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
