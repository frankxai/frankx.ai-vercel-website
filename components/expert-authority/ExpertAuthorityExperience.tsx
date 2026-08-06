'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useRef, useState } from 'react'
import {
  ArrowRight,
  Brain,
  CheckCircle2,
  Copy,
  Download,
  ExternalLink,
  Github,
  Mail,
  Network,
  Sparkles,
} from 'lucide-react'

type EngineKey = 'expert' | 'audience' | 'authority' | 'product' | 'funnel'
type Answers = Record<EngineKey, number>
type LeadStatus = 'idle' | 'loading' | 'success' | 'error'

type Engine = {
  key: EngineKey
  index: string
  publicName: string
  engineName: string
  purpose: string
  question: string
  options: string[]
  artifact: string
  nextAction: string
}

const engines: Engine[] = [
  {
    key: 'expert',
    index: '01',
    publicName: 'Expert Intelligence',
    engineName: 'Canon Engine',
    purpose: 'Turns your knowledge, proof, stories, methods, and decisions into a governed source of truth.',
    question: 'How executable is your expertise today?',
    options: [
      'It lives mostly in my head and scattered files.',
      'I have content, but no canonical framework or retrieval layer.',
      'My methods, stories, proof, and principles are organized and reusable.',
      'AI agents can retrieve, cite, and apply my canon consistently.',
      'My canon learns from delivery outcomes and updates under governance.',
    ],
    artifact: 'Expert Canon + signature methodology',
    nextAction: 'Extract your 20 highest-value decisions, stories, mechanisms, and proof assets into one canonical expert graph.',
  },
  {
    key: 'audience',
    index: '02',
    publicName: 'Audience Intelligence',
    engineName: 'Signal Engine',
    purpose: 'Captures exact language, objections, desired outcomes, buying signals, and behavioral evidence.',
    question: 'How precisely do you understand audience demand?',
    options: [
      'I infer what people want from intuition and broad market trends.',
      'I have comments, calls, and survey data, but it is not synthesized.',
      'I maintain recurring themes, objections, and language from real conversations.',
      'Audience evidence is clustered by segment, urgency, and commercial value.',
      'Every interaction updates a living demand graph and changes what we build.',
    ],
    artifact: 'Audience signal graph + language bank',
    nextAction: 'Centralize the last 50 audience questions, objections, and buying moments; cluster them by urgency and willingness to pay.',
  },
  {
    key: 'authority',
    index: '03',
    publicName: 'Authority Engine',
    engineName: 'Synthesis Engine',
    purpose: 'Finds the valuable intersection between what you uniquely know and what the market urgently values.',
    question: 'How obvious is your authority position?',
    options: [
      'People struggle to explain what I am the obvious choice for.',
      'I have a niche and message, but it changes often and sounds generic.',
      'I own a clear problem, point of view, mechanism, and body of proof.',
      'My content and offers compound one recognizable category position.',
      'The market repeats my language and routes relevant opportunities to me.',
    ],
    artifact: 'Category position + authority narrative',
    nextAction: 'Define one costly problem, one contrarian point of view, one named mechanism, and three proof patterns that make the position defensible.',
  },
  {
    key: 'product',
    index: '04',
    publicName: 'Product Intelligence',
    engineName: 'Offer Engine',
    purpose: 'Converts authority into a sequenced transformation, curriculum, price ladder, and delivery system.',
    question: 'How engineered is your product ladder?',
    options: [
      'I sell time, custom work, or disconnected offers.',
      'I have one offer, but the transformation and next purchase are unclear.',
      'I have a free experience, entry product, core offer, and premium path.',
      'Each offer is instrumented around activation, completion, proof, and ascension.',
      'Product outcomes continuously update curriculum, positioning, and agent behavior.',
    ],
    artifact: 'Product stepladder + transformation architecture',
    nextAction: 'Design one free diagnostic, one paid activation, one core transformation, and one deployable operating kit around the same mechanism.',
  },
  {
    key: 'funnel',
    index: '05',
    publicName: 'Funnel Intelligence',
    engineName: 'Growth Engine',
    purpose: 'Routes attention through diagnosis, trust, conversion, email, cross-sell, and measurable learning loops.',
    question: 'How compounding is your growth system?',
    options: [
      'I publish inconsistently and rely on referrals or direct outreach.',
      'I have traffic and lead magnets, but weak attribution and follow-up.',
      'LinkedIn, YouTube, and Instagram route into one measured conversion path.',
      'Webinars, challenges, quizzes, email, and cross-sells adapt by segment.',
      'The funnel autonomously identifies bottlenecks and proposes governed experiments.',
    ],
    artifact: 'Traffic-to-revenue loop + experiment backlog',
    nextAction: 'Route every channel into one diagnostic and segment follow-up by authority stage instead of sending every lead the same sequence.',
  },
]

const stages = [
  {
    max: 5,
    name: 'Hidden Expert',
    summary: 'Substantial knowledge exists, but the market cannot retrieve, repeat, or buy it reliably.',
  },
  {
    max: 10,
    name: 'Emerging Authority',
    summary: 'The ingredients exist, but they are not yet governed as one commercial system.',
  },
  {
    max: 15,
    name: 'Market Machine',
    summary: 'Positioning, offers, and acquisition work; the next constraint is measurement and compounding intelligence.',
  },
  {
    max: 20,
    name: 'Intelligence Operator',
    summary: 'Your authority business behaves as a learning system rather than a collection of campaigns.',
  },
]

const productLadder = [
  ['Diagnose', 'Authority Map', 'Live', 'Segment the real constraint and deliver an immediate next move.'],
  ['Activate', 'Authority Sprint', 'Next', 'Create the first visible asset, proof event, or named mechanism.'],
  ['Systemize', 'Expert Product Blueprint', 'Planned', 'Build the canon, audience graph, offer ladder, and conversion path.'],
  ['Transform', 'Expert-to-Authority Cohort', 'Evidence-gated', 'Test the complete method with accountable, consent-based learning.'],
  ['Operate', 'Sovereign Authority Kit', 'Research track', 'Package the graphs, skills, workflows, and governance as a deployable operating layer.'],
]

const stack = [
  {
    name: 'Vercel AI SDK',
    repo: 'https://github.com/vercel/ai',
    role: 'Streaming AI interfaces, structured generation, and tool-calling in TypeScript.',
  },
  {
    name: 'OpenAI Agents SDK',
    repo: 'https://github.com/openai/openai-agents-js',
    role: 'Agent orchestration, handoffs, guardrails, tracing, and governed execution.',
  },
  {
    name: 'LangGraph',
    repo: 'https://github.com/langchain-ai/langgraph',
    role: 'Stateful, durable graphs for multi-step expert and audience workflows.',
  },
  {
    name: 'Typebot',
    repo: 'https://github.com/baptisteArno/typebot.io',
    role: 'Open-source conversational quizzes, diagnostics, and branching lead capture.',
  },
  {
    name: 'Formbricks',
    repo: 'https://github.com/formbricks/formbricks',
    role: 'Open-source surveys and product feedback for continuous audience intelligence.',
  },
  {
    name: 'Trigger.dev',
    repo: 'https://github.com/triggerdotdev/trigger.dev',
    role: 'Durable background jobs for enrichment, content repurposing, and follow-up.',
  },
]

const prompts = [
  {
    title: 'Extract the Expert Canon',
    body: `Act as an expert-canon architect. From the supplied material, identify: recurring decisions, named and unnamed methods, contrarian beliefs, proof, stories, diagnostic questions, failure modes, and language that should remain verbatim. Produce a governed canon with provenance, confidence, contradictions, and missing evidence. Do not generate positioning until the canon is complete.`,
  },
  {
    title: 'Synthesize Audience Demand',
    body: `Act as an audience-intelligence analyst. Cluster the supplied calls, comments, emails, surveys, and sales notes by desired outcome, triggering event, current workaround, objection, urgency, willingness to pay, and exact language. Separate frequently mentioned problems from commercially valuable problems. Return evidence counts and representative quotes.`,
  },
  {
    title: 'Build the Authority Position',
    body: `Using the expert canon and audience signal graph, select one authority position. State the costly problem, ideal buyer, existing alternatives, contrarian point of view, named mechanism, proof stack, category language, and claims that must not be made yet. Optimize for recognizability and defensibility, not breadth.`,
  },
  {
    title: 'Engineer the Product Ladder',
    body: `Convert the authority position into a product stepladder. Define the free diagnosis, paid activation, core transformation, deployable operating kit, and continuity layer. For each: buyer state, promised transition, mechanism, time-to-value, evidence required, delivery model, price logic, next purchase, and the metric that proves the offer works.`,
  },
  {
    title: 'Design the Funnel Learning Loop',
    body: `Design one traffic-to-revenue system across LinkedIn, YouTube, and Instagram. Route every channel into one diagnostic, segment by authority constraint, prescribe the correct next experience, and define the webinar, challenge, quiz, email, cross-sell, and retargeting logic. Include attribution, experiment cadence, stop conditions, and how new evidence updates the canon and offers.`,
  },
]

const initialAnswers: Answers = {
  expert: -1,
  audience: -1,
  authority: -1,
  product: -1,
  funnel: -1,
}

export default function ExpertAuthorityExperience() {
  const [answers, setAnswers] = useState<Answers>(initialAnswers)
  const [submitted, setSubmitted] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [researchInvitationOptIn, setResearchInvitationOptIn] = useState(false)
  const [website, setWebsite] = useState('')
  const [leadStatus, setLeadStatus] = useState<LeadStatus>('idle')
  const [leadMessage, setLeadMessage] = useState('')
  const [copied, setCopied] = useState<string | null>(null)
  const submissionIdRef = useRef<string | null>(null)

  const complete = engines.every((engine) => answers[engine.key] >= 0)
  const score = useMemo(
    () => engines.reduce((total, engine) => total + Math.max(0, answers[engine.key]), 0),
    [answers]
  )
  const weakest = useMemo(
    () => [...engines].sort((a, b) => answers[a.key] - answers[b.key])[0],
    [answers]
  )
  const stage = stages.find((item) => score <= item.max) ?? stages[stages.length - 1]

  function resetDeliveryAttempt() {
    submissionIdRef.current = null
    setLeadStatus('idle')
    setLeadMessage('')
  }

  function submitDiagnostic() {
    if (!complete) return
    setSubmitted(true)
    window.setTimeout(() => {
      const result = document.getElementById('authority-result')
      result?.focus()
      result?.scrollIntoView({ behavior: 'smooth' })
    }, 50)
  }

  function downloadBlueprint() {
    const output = [
      '# Expert Authority Intelligence Blueprint',
      '',
      `Name: ${name || 'Operator'}`,
      `Authority stage: ${stage.name}`,
      `System score: ${score}/20`,
      `Primary constraint: ${weakest.publicName} (${weakest.engineName})`,
      '',
      '## Scores',
      ...engines.map((engine) => `- ${engine.publicName}: ${Math.max(0, answers[engine.key])}/4`),
      '',
      '## Immediate move',
      weakest.nextAction,
      '',
      '## Five-engine architecture',
      ...engines.map((engine) => `- ${engine.publicName} / ${engine.engineName}: ${engine.purpose}`),
      '',
      '## Required artifact',
      weakest.artifact,
      '',
      'Generated by the Expert Authority Intelligence System at https://frankx.ai/mvu/expert-authority',
    ].join('\n')

    const blob = new Blob([output], { type: 'text/markdown;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = 'expert-authority-blueprint.md'
    anchor.click()
    URL.revokeObjectURL(url)
  }

  async function captureLead(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!submitted || !name.trim() || !email.trim()) return

    setLeadStatus('loading')
    setLeadMessage('')
    const submissionId = submissionIdRef.current ?? crypto.randomUUID()
    submissionIdRef.current = submissionId

    try {
      const response = await fetch('/api/expert-authority/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          researchInvitationOptIn,
          answers,
          submissionId,
          website,
        }),
      })
      const payload = await response.json()
      if (!response.ok) throw new Error(payload.error || 'Unable to save your result.')
      setLeadStatus('success')
      setLeadMessage('Your result and resource links are on their way.')
    } catch (error) {
      setLeadStatus('error')
      setLeadMessage(error instanceof Error ? error.message : 'Unable to save your result.')
    }
  }

  async function copyPrompt(title: string, body: string) {
    await navigator.clipboard.writeText(body)
    setCopied(title)
    window.setTimeout(() => setCopied(null), 1600)
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <section className="border-b border-white/10">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:py-28">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              FrankX field system
            </div>
            <h1 className="max-w-5xl text-4xl font-semibold tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
              Turn what you know into an authority business that learns.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-zinc-300 sm:text-xl">
              One Expert Authority Intelligence System. Five engines. Your knowledge becomes canonical, audience demand becomes visible, authority becomes defensible, products become sequenced, and every funnel interaction improves the next decision.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="#diagnostic"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-cyan-100"
              >
                Map my authority system
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href="/skills/expert-authority/SKILL.md"
                download
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-cyan-300/60 hover:bg-white/5"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Download the free skill
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-4 shadow-2xl shadow-cyan-950/30">
            <Image
              src="/images/expert-authority/system-map.svg"
              alt="Expert Authority Intelligence System showing five connected engines"
              width={1600}
              height={900}
              priority
              className="h-auto w-full rounded-[1.4rem]"
            />
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-zinc-900/20">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">System hierarchy</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              Do not market five systems. Operate five engines.
            </h2>
            <p className="mt-5 text-lg leading-8 text-zinc-400">
              The system is the commercial product and persistent memory. Each engine owns one transformation and produces a governed artifact consumed by the next engine.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {engines.map((engine) => (
              <article key={engine.key} className="rounded-3xl border border-white/10 bg-zinc-950/70 p-6">
                <p className="text-xs font-semibold tracking-[0.2em] text-cyan-300">{engine.index}</p>
                <h3 className="mt-4 text-xl font-semibold text-white">{engine.publicName}</h3>
                <p className="mt-1 text-sm font-medium text-violet-300">{engine.engineName}</p>
                <p className="mt-4 text-sm leading-6 text-zinc-400">{engine.purpose}</p>
                <div className="mt-5 border-t border-white/10 pt-4 text-xs leading-5 text-zinc-400">
                  Output: {engine.artifact}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="diagnostic" className="scroll-mt-8 border-b border-white/10">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <div className="flex items-start gap-4">
            <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-3 text-cyan-200">
              <Brain className="h-6 w-6" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Five-minute diagnostic</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-5xl">Find the constraint that governs everything else.</h2>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-zinc-400">
                Score the current operating reality, not the ambition. The weakest engine becomes the next build priority.
              </p>
            </div>
          </div>

          <div className="mt-12 space-y-6">
            {engines.map((engine) => (
              <fieldset key={engine.key} className="rounded-3xl border border-white/10 bg-white/[0.025] p-6 sm:p-8">
                <legend className="px-1 text-xl font-semibold text-white">
                  {engine.index}. {engine.question}
                </legend>
                <div className="mt-6 grid gap-3">
                  {engine.options.map((option, optionIndex) => {
                    const selected = answers[engine.key] === optionIndex
                    return (
                      <label
                        key={option}
                        className={`flex min-h-14 w-full cursor-pointer items-start gap-4 rounded-2xl border p-4 text-left transition focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-cyan-200 ${
                          selected
                            ? 'border-cyan-300/70 bg-cyan-300/10 text-white'
                            : 'border-white/10 bg-zinc-950/50 text-zinc-400 hover:border-white/25 hover:text-zinc-200'
                        }`}
                      >
                        <input
                          type="radio"
                          name={`engine-${engine.key}`}
                          value={optionIndex}
                          checked={selected}
                          onChange={() => {
                            setAnswers((current) => ({ ...current, [engine.key]: optionIndex }))
                            setSubmitted(false)
                            resetDeliveryAttempt()
                          }}
                          className="sr-only"
                        />
                        <span className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${selected ? 'bg-cyan-200 text-zinc-950' : 'bg-white/5 text-zinc-400'}`}>
                          {optionIndex}
                        </span>
                        <span className="text-sm leading-6 sm:text-base">{option}</span>
                      </label>
                    )
                  })}
                </div>
              </fieldset>
            ))}
          </div>

          <button
            type="button"
            onClick={submitDiagnostic}
            disabled={!complete}
            className="mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 text-sm font-semibold text-zinc-950 transition enabled:hover:bg-cyan-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Generate my authority map
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </section>

      {submitted && (
        <section
          id="authority-result"
          tabIndex={-1}
          className="scroll-mt-8 border-b border-white/10 bg-cyan-950/10 focus:outline-none"
        >
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
              <div className="rounded-[2rem] border border-cyan-300/25 bg-zinc-950 p-7 sm:p-10">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Your current stage</p>
                    <h2 className="mt-3 text-4xl font-semibold tracking-tight text-white">{stage.name}</h2>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-center">
                    <div className="text-3xl font-semibold text-white">{score}<span className="text-base text-zinc-400">/20</span></div>
                    <div className="mt-1 text-xs uppercase tracking-[0.16em] text-zinc-400">System score</div>
                  </div>
                </div>

                <p className="mt-6 text-lg leading-8 text-zinc-300">{stage.summary}</p>

                <div className="mt-8 rounded-3xl border border-violet-300/20 bg-violet-300/5 p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-300">Primary constraint</p>
                  <h3 className="mt-3 text-2xl font-semibold text-white">{weakest.publicName}</h3>
                  <p className="mt-1 text-sm text-violet-200">{weakest.engineName}</p>
                  <p className="mt-5 leading-7 text-zinc-300">{weakest.nextAction}</p>
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-5">
                  {engines.map((engine) => (
                    <div key={engine.key} className="rounded-2xl border border-white/10 bg-white/[0.025] p-4 text-center">
                      <div className="text-2xl font-semibold text-white">{answers[engine.key]}</div>
                      <div className="mt-2 text-xs leading-4 text-zinc-400">{engine.publicName.replace(' Intelligence', '')}</div>
                    </div>
                  ))}
                </div>

                <p className="mt-4 text-xs leading-5 text-zinc-400">
                  Scores run from 0 to 4. If two engines share the lowest score,
                  the earlier upstream engine becomes the first constraint to resolve.
                </p>

                <button
                  type="button"
                  onClick={downloadBlueprint}
                  className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan-300/60 hover:bg-white/5"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Download personalized blueprint
                </button>
              </div>

              <form onSubmit={captureLead} className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-7 sm:p-9">
                <Mail className="h-7 w-7 text-cyan-300" aria-hidden="true" />
                <h3 className="mt-5 text-2xl font-semibold text-white">Receive the complete build kit.</h3>
                <p className="mt-3 leading-7 text-zinc-400">
                  Get the skill, prompt pack, architecture map, and your diagnostic result in one email.
                </p>

                <label
                  aria-hidden="true"
                  className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden"
                >
                  Website
                  <input
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={website}
                    onChange={(event) => setWebsite(event.target.value)}
                  />
                </label>

                <label className="mt-7 block text-sm font-medium text-zinc-300">
                  Name
                  <input
                    name="name"
                    autoComplete="name"
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value)
                      resetDeliveryAttempt()
                    }}
                    required
                    className="mt-2 w-full rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none transition placeholder:text-zinc-700 focus:border-cyan-300/60"
                    placeholder="Your name"
                  />
                </label>
                <label className="mt-4 block text-sm font-medium text-zinc-300">
                  Email
                  <input
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value)
                      resetDeliveryAttempt()
                    }}
                    required
                    type="email"
                    className="mt-2 w-full rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none transition placeholder:text-zinc-700 focus:border-cyan-300/60"
                    placeholder="you@company.com"
                  />
                </label>
                <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-2xl border border-white/10 bg-zinc-950/60 p-4 text-sm leading-6 text-zinc-400">
                  <input
                    type="checkbox"
                    name="research-invitation-opt-in"
                    checked={researchInvitationOptIn}
                    onChange={(event) => {
                      setResearchInvitationOptIn(event.target.checked)
                      resetDeliveryAttempt()
                    }}
                    className="mt-1 h-4 w-4 accent-cyan-300"
                  />
                  Frank may receive my name, email, and answers and contact me once about product research. This is optional.
                </label>

                <button
                  type="submit"
                  disabled={leadStatus === 'loading' || leadStatus === 'success'}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-200 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-white disabled:opacity-60"
                >
                  {leadStatus === 'loading'
                    ? 'Sending result...'
                    : leadStatus === 'success'
                      ? 'Build kit sent'
                      : 'Send my build kit'}
                  {leadStatus === 'idle' || leadStatus === 'error' ? <ArrowRight className="h-4 w-4" aria-hidden="true" /> : null}
                </button>
                <p className="mt-4 text-xs leading-5 text-zinc-400">
                  One results email. No newsletter. Frank receives your details
                  only if you opt into the research invitation. See the{' '}
                  <Link href="/privacy" className="underline underline-offset-4 hover:text-zinc-300">
                    privacy policy
                  </Link>
                  .
                </p>
                {leadMessage && (
                  <p
                    role={leadStatus === 'success' ? 'status' : 'alert'}
                    className={`mt-4 text-sm ${leadStatus === 'success' ? 'text-emerald-300' : 'text-rose-300'}`}
                  >
                    {leadMessage}
                  </p>
                )}
              </form>
            </div>
          </div>
        </section>
      )}

      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Product intelligence</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-5xl">One mechanism. Five buyer states.</h2>
            <p className="mt-5 text-lg leading-8 text-zinc-400">
              The ladder is not a stack of unrelated products. Each tier resolves the next constraint while increasing evidence, commitment, and implementation depth.
            </p>
          </div>

          <div className="mt-12 overflow-hidden rounded-3xl border border-white/10">
            {productLadder.map(([stageName, product, status, purpose], index) => (
              <div key={product} className={`grid gap-3 p-6 md:grid-cols-[0.65fr_1.1fr_0.6fr_2fr] md:items-center ${index > 0 ? 'border-t border-white/10' : ''}`}>
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">{stageName}</div>
                <div className="font-semibold text-white">{product}</div>
                <div className="text-sm text-violet-300">{status}</div>
                <div className="text-sm leading-6 text-zinc-400">{purpose}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-zinc-900/20">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Funnel intelligence</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-5xl">Three channels. One diagnostic. Segmented conversion.</h2>
              <p className="mt-5 text-lg leading-8 text-zinc-400">
                LinkedIn creates category authority. YouTube creates depth and trust. Instagram creates identity and reach. They should not lead to three separate funnels.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ['LinkedIn', 'Argument', 'Point of view, proof, operator lessons, and category language.'],
                ['YouTube', 'Depth', 'Framework walkthroughs, transformations, teardown, and long-form trust.'],
                ['Instagram', 'Identity', 'Visible life, compressed insight, social proof, and emotional recognition.'],
              ].map(([channel, role, description]) => (
                <article key={channel} className="rounded-3xl border border-white/10 bg-zinc-950/80 p-6">
                  <p className="text-sm font-semibold text-cyan-300">{channel}</p>
                  <h3 className="mt-3 text-xl font-semibold text-white">{role}</h3>
                  <p className="mt-4 text-sm leading-6 text-zinc-400">{description}</p>
                </article>
              ))}
              <div className="rounded-3xl border border-cyan-300/25 bg-cyan-300/10 p-6 sm:col-span-3">
                <div className="flex items-start gap-4">
                  <Network className="mt-1 h-6 w-6 shrink-0 text-cyan-200" aria-hidden="true" />
                  <div>
                    <h3 className="text-xl font-semibold text-white">Shared conversion spine</h3>
                    <p className="mt-3 leading-7 text-zinc-300">
                      Diagnostic → personalized result → free skill → activation → core transformation → operating kit → consented evidence returned to the system.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Open implementation stack</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-5xl">Use proven substrates. Build the proprietary intelligence graph.</h2>
            <p className="mt-5 text-lg leading-8 text-zinc-400">
              Your moat is not a form builder, email sender, or generic agent runtime. It is the governed expert canon, audience evidence, transformation data, and learning loop.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {stack.map((item) => (
              <a
                key={item.name}
                href={item.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-3xl border border-white/10 bg-white/[0.025] p-6 transition hover:border-cyan-300/40 hover:bg-white/[0.045]"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Github className="h-5 w-5 text-zinc-400 group-hover:text-cyan-300" aria-hidden="true" />
                    <h3 className="font-semibold text-white">{item.name}</h3>
                  </div>
                  <ExternalLink className="h-4 w-4 text-zinc-400 group-hover:text-cyan-300" aria-hidden="true" />
                </div>
                <p className="mt-4 text-sm leading-6 text-zinc-400">{item.role}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-zinc-900/20">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Prompt pack</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-5xl">Prompts are interfaces. Evidence is the substrate.</h2>
              <p className="mt-5 text-lg leading-8 text-zinc-400">
                These prompts work because they enforce sequence and output contracts. They become substantially stronger when grounded in the expert and audience graphs.
              </p>
              <a
                href="/skills/expert-authority/PROMPT-PACK.md"
                download
                className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan-300/60"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Download all prompts
              </a>
            </div>
            <div className="space-y-4">
              {prompts.map((prompt) => (
                <article key={prompt.title} className="rounded-3xl border border-white/10 bg-zinc-950/80 p-6">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-semibold text-white">{prompt.title}</h3>
                    <button
                      type="button"
                      onClick={() => copyPrompt(prompt.title, prompt.body)}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-xs font-medium text-zinc-400 transition hover:border-cyan-300/50 hover:text-cyan-200"
                    >
                      {copied === prompt.title ? <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
                      {copied === prompt.title ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-zinc-400">{prompt.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-20 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Live field test</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-5xl">Put the diagnostic in the room.</h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-400">
              Every completion creates a private result for the participant. Only consented, minimized signals should inform the next version of the product.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white p-4">
            <Image
              src="/api/qr/expert-authority"
              alt="QR code for the Expert Authority Intelligence diagnostic"
              width={220}
              height={220}
              unoptimized
              className="h-[220px] w-[220px]"
            />
          </div>
        </div>
      </section>

      <footer className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-10 text-sm text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
        <p>FrankX.ai presents the Expert Authority Intelligence System. Powered by Starlight Labs.</p>
        <div className="flex gap-5">
          <Link href="/research" className="transition hover:text-white">Research</Link>
          <Link href="/agents" className="transition hover:text-white">Agents</Link>
          <Link href="/start" className="transition hover:text-white">Work with Frank</Link>
        </div>
      </footer>
    </main>
  )
}
