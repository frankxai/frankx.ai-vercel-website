import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

import { ReferenceStackScene } from './ReferenceStackScene'
import { failureModes, referenceStack, shapeChoices } from './guide-data'

/**
 * The repo ships no global :focus-visible ring, so every interactive element on this
 * page carries its own. Keyboard users get the same affordance mouse users get.
 */
const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-void'

/** The date the external specifications cited on this page were last read end to end. */
export const SOURCES_VERIFIED_ON = '20 August 2026'

export const pillarFaqs = [
  {
    question: 'What is AI architecture?',
    answer:
      'AI architecture is the arrangement of the parts that surround a model — how requests reach it, what context it is given, which tools it may call, who approves side effects, and how the whole run is measured. The model is one component. Architecture is the decision about everything else, and it is where almost all production failure lives.',
  },
  {
    question: 'Should I build a workflow or an agent?',
    answer:
      'Build a fixed workflow when you can name every step before the request arrives. Build an agent loop when the steps are unknown but the task is one coherent piece of work. The test is not how capable the model is; it is whether you can enumerate the path in advance. If you can, the workflow will be cheaper, faster, and easier to debug.',
  },
  {
    question: 'When is a multi-agent system worth the coordination cost?',
    answer:
      'When the work is read-heavy and each unit is genuinely independent — separate lookups, separate documents, separate sources — parallel sub-agents earn their complexity. When the work mutates shared state, they do not: two agents writing the same thing produce lost updates and contradictions no merge step can adjudicate. Parallelise reads, serialise writes.',
  },
  {
    question: 'What changed in the Model Context Protocol in 2026?',
    answer:
      'The 2026-07-28 revision removed protocol-level sessions, the Mcp-Session-Id header, and the initialize handshake, making MCP stateless. Servers that need cross-call state now mint explicit handles passed as ordinary tool arguments. It also added server/discover, replaced resource subscriptions with subscriptions/listen, required a resultType field on every result, and deprecated Roots, Sampling, and Logging.',
  },
  {
    question: 'What are the biggest security risks in an AI system?',
    answer:
      'The OWASP GenAI LLM Top 10 2026, published 4 August 2026, ranks Prompt Injection first, Sensitive Information Disclosure second, and Excessive Agency third. Excessive Agency rising to third is the notable move for architects: it is a design fault, not a model fault, and it is fixed by scoping tool permissions rather than by prompting more carefully.',
  },
  {
    question: 'Why do retrieval systems fail even when search looks healthy?',
    answer:
      'Because retrieval and generation are usually measured together. A generation eval grades the final answer, so it cannot distinguish an answer that was wrong from an answer whose evidence was never retrieved. Measure recall separately. Ingestion and chunking sit upstream of anything the model does, so a failure there reaches you disguised as a generation failure.',
  },
]

/** Only routes that exist today. A reading path that promises unwritten pages is a broken map. */
const readingPath = [
  {
    plane: '04 · Orchestration',
    href: '/guides/agentic-engineering-mastery-2026',
    title: 'The agentic engineering master guide',
    why: 'The full curriculum behind the orchestration decision — primitives, skills, and subagent state machines.',
  },
  {
    plane: '03 · Tool surface',
    href: '/guides/anatomy-of-a-production-skill',
    title: 'Anatomy of a production skill',
    why: 'What a capability has to carry before it is safe to expose to a loop.',
  },
  {
    plane: '03 · Tool surface',
    href: '/guides/agent-card-a2a-spec',
    title: 'The A2A agent card',
    why: 'The other protocol in this layer, and where it stops overlapping with MCP.',
  },
  {
    plane: '01 · Model access',
    href: '/guides/first-agent-primer',
    title: 'First agent primer',
    why: 'Start here if the loop itself is still unfamiliar. Everything above assumes it.',
  },
  {
    plane: 'Applied',
    href: '/ai-architecture/blueprints',
    title: 'Deployable blueprints',
    why: 'The reference designs from the atlas above, worked through to something you can stand up.',
  },
  {
    plane: 'Applied',
    href: '/ai-architect-academy',
    title: 'The architect learning path',
    why: 'The sequenced route through this material if you are building the skill rather than one system.',
  },
]

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] uppercase tracking-[0.25em] text-white/60">{children}</p>
  )
}

function Source({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 rounded-sm text-emerald-300 underline decoration-emerald-300/30 underline-offset-4 transition-colors hover:decoration-emerald-300 ${FOCUS_RING}`}
    >
      {children}
      <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
    </a>
  )
}

/** An answer-first block: the claim stands alone, quotable without the paragraph around it. */
function Answer({ children }: { children: React.ReactNode }) {
  return (
    <p className="glass-emerald rounded-2xl p-5 text-base leading-7 text-slate-200">{children}</p>
  )
}

function Section({
  id,
  eyebrow,
  heading,
  children,
}: {
  id: string
  eyebrow: string
  heading: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-white/5 py-24 lg:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-3 max-w-3xl text-pretty text-3xl font-bold leading-tight text-white sm:text-4xl">
          {heading}
        </h2>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  )
}

export function PillarGuide() {
  return (
    <>
      <Section
        id="what-is-ai-architecture"
        eyebrow="Definition"
        heading="What is AI architecture?"
      >
        <Answer>
          AI architecture is the arrangement of the parts that surround a model — how requests
          reach it, what context it is given, which tools it may call, who approves side effects,
          and how the whole run is measured. The model is one component. Architecture is the
          decision about everything else.
        </Answer>
        <p className="mt-6 max-w-3xl text-base leading-7 text-slate-400">
          This page is about software architecture for systems that call language models. It is not
          about designing buildings, and it is not about accelerator silicon — two different fields
          that share the phrase. If you are here to decide how to structure an application that
          calls a model in production, you are in the right place.
        </p>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-400">
          The reason architecture carries so much weight is that model quality is the part you
          least control and least differentiate on. Everyone can reach a frontier model. What
          separates a system that survives contact with users from one that does not is the
          boundaries around it: what the model is allowed to see, what it is allowed to do, and
          what happens when it is wrong.
        </p>
      </Section>

      <Section
        id="reference-stack"
        eyebrow="Reference architecture"
        heading="Seven planes, and the seams between them."
      >
        <p className="mb-10 max-w-3xl text-base leading-7 text-slate-400">
          Every production system that calls a model has these planes, whether or not anyone drew
          them. Naming them is useful because failures are almost never located where they are
          observed — and because each seam is a boundary where something changes character. Read it
          from the base up: nothing above works if the plane under it is unreliable.
        </p>

        <ReferenceStackScene layers={referenceStack} />

        <p className="mt-10 max-w-3xl text-base leading-7 text-slate-400">
          The trust boundary at the tool surface is the one most systems get wrong. Everything a
          tool returns — a search result, a fetched page, a database row someone else wrote — is
          input from outside your system. Treating it as instruction rather than data is the single
          most common way an agent ends up doing something nobody asked for.
        </p>
      </Section>

      <Section
        id="choosing-a-shape"
        eyebrow="The orchestration decision"
        heading="Workflow, one agent, or many?"
      >
        <Answer>
          Build a fixed workflow when you can name every step before the request arrives. Build an
          agent loop when the steps are unknown but the task is one coherent piece of work. The test
          is not how capable the model is — it is whether you can enumerate the path in advance.
        </Answer>

        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[46rem] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th scope="col" className="py-3 pr-4 font-semibold text-white">Shape</th>
                <th scope="col" className="py-3 pr-4 font-semibold text-white">Use when</th>
                <th scope="col" className="py-3 pr-4 font-semibold text-white">Cost you accept</th>
                <th scope="col" className="py-3 font-semibold text-white">How it fails</th>
              </tr>
            </thead>
            <tbody>
              {shapeChoices.map((choice) => (
                <tr key={choice.shape} className="border-b border-white/5 align-top">
                  <th scope="row" className="py-4 pr-4 font-medium text-emerald-300">
                    {choice.shape}
                  </th>
                  <td className="py-4 pr-4 leading-6 text-slate-300">{choice.useWhen}</td>
                  <td className="py-4 pr-4 leading-6 text-slate-400">{choice.cost}</td>
                  <td className="py-4 leading-6 text-slate-400">{choice.failure}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-8 max-w-3xl text-base leading-7 text-slate-400">
          The multi-agent question is where practitioners most visibly disagree, and the
          disagreement is usually reported as a contradiction when it is really a difference in
          workload. The heuristic that reconciles the two camps:{' '}
          <strong className="font-semibold text-white">parallelise reads, serialise writes.</strong>{' '}
          Independent gathering parallelises cleanly because nothing the sub-agents do can conflict.
          Shared mutation does not, because two agents editing the same state produce lost updates
          that no merge step can adjudicate after the fact. That is our position, not a citation.
        </p>
      </Section>

      <Section
        id="protocol-layer"
        eyebrow={`Protocol layer · verified ${SOURCES_VERIFIED_ON}`}
        heading="MCP became stateless. Most guidance has not caught up."
      >
        <Answer>
          The Model Context Protocol revision dated 2026-07-28 removed protocol-level sessions, the
          <code translate="no" className="mx-1 rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-sm">Mcp-Session-Id</code>
          header, and the <code translate="no" className="mx-1 rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-sm">initialize</code>
          handshake. Servers that need cross-call state now mint explicit handles and pass them as
          ordinary tool arguments.
        </Answer>

        <p className="mt-6 max-w-3xl text-base leading-7 text-slate-400">
          This matters architecturally rather than cosmetically. A stateless protocol core means an
          MCP server can sit behind ordinary HTTP infrastructure — load balancers, caches, retries —
          without session affinity. It also means any design that assumed a connection lifecycle now
          has to carry that state somewhere explicit.
        </p>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {[
            ['Removed', 'Sessions, the initialize/initialized handshake, ping, logging/setLevel, and SSE stream resumability.'],
            ['Added', 'server/discover for version and capability negotiation, and subscriptions/listen in place of resource subscriptions.'],
            ['Required', 'A resultType field on every result. Results from earlier servers that omit it are treated as complete.'],
            ['Deprecated', 'Roots, Sampling, and Logging, under a policy guaranteeing a minimum twelve-month window.'],
          ].map(([label, detail]) => (
            <li key={label} className="surface-2 rounded-2xl border border-white/[0.08] p-5">
              <p className="font-mono text-xs text-emerald-300">{label}</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">{detail}</p>
            </li>
          ))}
        </ul>

        <p className="mt-8 max-w-3xl text-base leading-7 text-slate-400">
          Two additions are easy to miss and worth designing around. Caching became a protocol
          concern: list and read results now carry <code translate="no" className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-sm">ttlMs</code> and{' '}
          <code translate="no" className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-sm">cacheScope</code>, and servers are
          asked to return tools in a deterministic order specifically so client-side and prompt
          caches stay stable. And tracing became one too: OpenTelemetry trace context propagates
          through <code translate="no" className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-sm">_meta</code> keys, so a tool call
          can join the same trace as the request that caused it.
        </p>

        <p className="mt-6 text-sm text-slate-500">
          Source:{' '}
          <Source href="https://modelcontextprotocol.io/specification/2026-07-28/changelog">
            MCP specification 2026-07-28, Key Changes
          </Source>
          . Read in full on {SOURCES_VERIFIED_ON}. The previous revision was 2025-11-25.
        </p>
      </Section>

      <Section
        id="security-baseline"
        eyebrow={`Security baseline · verified ${SOURCES_VERIFIED_ON}`}
        heading="The risks are ranked, and the ranking moved."
      >
        <Answer>
          The OWASP GenAI LLM Top 10 2026 was published on 4 August 2026. Prompt Injection remains
          first. The move architects should read is Excessive Agency at third — a design fault, not
          a model fault, and one that is fixed by scoping permissions rather than by prompting more
          carefully.
        </Answer>

        <ol className="mt-8 grid gap-2 sm:grid-cols-2">
          {[
            'Prompt Injection',
            'Sensitive Information Disclosure',
            'Excessive Agency',
            'Supply Chain',
            'Data and Model Poisoning',
            'Unbounded Consumption',
            'Misinformation',
            'Hidden Context Exposure',
            'Vector and Embedding Weaknesses',
            'Improper Output Handling',
          ].map((risk, i) => (
            <li
              key={risk}
              className="surface-2 flex items-baseline gap-3 rounded-xl border border-white/[0.08] px-4 py-3"
            >
              <span className="font-mono text-xs text-emerald-300/80">
                LLM{String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-sm text-slate-200">{risk}</span>
            </li>
          ))}
        </ol>

        <p className="mt-8 max-w-3xl text-base leading-7 text-slate-400">
          Three of these are architectural rather than behavioural, and they are the three worth
          designing for on day one. Excessive Agency is decided by how narrowly you scope tool
          permissions. Unbounded Consumption is decided by whether loop limits live in code or in a
          prompt. Hidden Context Exposure — broadened this year beyond system-prompt leakage — is
          decided by what you put in the window in the first place.
        </p>

        <p className="mt-6 text-sm text-slate-500">
          Source:{' '}
          <Source href="https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/">
            OWASP GenAI LLM Top 10 2026
          </Source>
          , with the entry list read from the{' '}
          <Source href="https://github.com/GenAI-Security-Project/GenAI-LLM-Top10">
            project repository
          </Source>{' '}
          on {SOURCES_VERIFIED_ON}. Note that the GenAI Security Project also publishes a separate
          list for agentic applications; they are frequently conflated.
        </p>
      </Section>

      <Section
        id="failure-modes"
        eyebrow="Field catalog"
        heading="Where these systems actually break."
      >
        <p className="mb-8 max-w-3xl text-base leading-7 text-slate-400">
          Sorted by what an operator sees first, because the observed symptom and the real cause
          almost never sit in the same plane.
        </p>

        <div className="space-y-4">
          {failureModes.map((mode) => (
            <article
              key={mode.name}
              className="surface-2 rounded-2xl border border-white/[0.08] p-6"
            >
              <h3 className="font-semibold text-white">{mode.name}</h3>
              <dl className="mt-4 grid gap-4 sm:grid-cols-3">
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-wider text-slate-500">
                    Looks like
                  </dt>
                  <dd className="mt-1.5 text-sm leading-6 text-slate-400">{mode.looksLike}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-wider text-slate-500">
                    Actual cause
                  </dt>
                  <dd className="mt-1.5 text-sm leading-6 text-slate-400">{mode.actualCause}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-wider text-emerald-300/70">
                    What fixes it
                  </dt>
                  <dd className="mt-1.5 text-sm leading-6 text-slate-300">{mode.fix}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </Section>

      <Section
        id="contested"
        eyebrow="Contested ground"
        heading="What the field has not settled."
      >
        <p className="max-w-3xl text-base leading-7 text-slate-400">
          Most architecture writing presents the current moment as more settled than it is. These
          are live disagreements between people who have shipped real systems, and you should expect
          to make your own call rather than find a consensus to adopt.
        </p>

        <div className="mt-8 space-y-4">
          {[
            {
              q: 'Do multi-agent systems help or fracture?',
              a: 'Anthropic has published a multi-agent research architecture where sub-agents run in parallel with isolated context. Cognition has argued the opposite case — that parallel sub-agents make independent decisions which then conflict. Both report real results on real systems. The published performance numbers on each side are not independently reproducible, so we do not repeat them here; the workload distinction in the table above is the part that transfers.',
            },
            {
              q: 'Long context or retrieval?',
              a: 'As context windows grow, the argument that retrieval is a workaround gets louder. The counter-argument that has not been answered: you cannot apply access control to a context window. If different users are entitled to different documents, retrieval is not an optimisation, it is the enforcement point.',
            },
            {
              q: 'How much should a framework do?',
              a: 'One camp keeps the agent loop small enough to read in one sitting and treats frameworks as indirection. The other argues that durable execution, checkpointing, and replay are genuinely hard and not worth rebuilding. This one usually resolves on operational maturity rather than taste: if you already run durable workflows, the framework buys less than it costs.',
            },
          ].map((item) => (
            <details
              key={item.q}
              className="surface-2 group rounded-2xl border border-white/[0.08] p-6"
            >
              <summary className={`cursor-pointer list-none rounded-lg font-semibold text-white marker:hidden ${FOCUS_RING}`}>
                {item.q}
              </summary>
              <p className="mt-3 text-sm leading-7 text-slate-400">{item.a}</p>
            </details>
          ))}
        </div>
      </Section>

      <Section id="faq" eyebrow="Questions" heading="Frequently asked">
        <div className="space-y-4">
          {pillarFaqs.map((faq) => (
            <details
              key={faq.question}
              className="surface-2 rounded-2xl border border-white/[0.08] p-6"
            >
              <summary className={`cursor-pointer list-none rounded-lg font-semibold text-white marker:hidden ${FOCUS_RING}`}>
                {faq.question}
              </summary>
              <p className="mt-3 text-sm leading-7 text-slate-400">{faq.answer}</p>
            </details>
          ))}
        </div>

        <p className="mt-10 text-sm leading-6 text-slate-500">
          Specifications cited on this page were read end to end on {SOURCES_VERIFIED_ON}. Where a
          claim is our position rather than a sourced fact, it says so in the sentence. Where a
          widely repeated number could not be traced to a primary source, it has been left out
          rather than repeated.
        </p>
      </Section>

      <Section id="keep-reading" eyebrow="Reading path" heading="Where this goes deeper.">
        <p className="mb-8 max-w-3xl text-base leading-7 text-slate-400">
          This page is the map. Each of these takes one plane of it and goes down a level.
        </p>
        <ul className="grid gap-3 sm:grid-cols-2">
          {readingPath.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`surface-2 block h-full rounded-2xl border border-white/[0.08] p-5 transition-colors hover:border-emerald-300/30 ${FOCUS_RING}`}
              >
                <p className="font-mono text-xs text-emerald-300">{item.plane}</p>
                <p className="mt-2 font-semibold text-white">{item.title}</p>
                <p className="mt-1.5 text-sm leading-6 text-slate-400">{item.why}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  )
}

export default PillarGuide
