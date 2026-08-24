import type { ReactNode } from 'react'

const surface =
  'relative overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0d1112] shadow-[0_24px_80px_rgba(0,0,0,0.28)]'

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-emerald-300/70">
      {children}
    </p>
  )
}

function SignalNode({ children, tone = 'neutral' }: { children: ReactNode; tone?: 'emerald' | 'cyan' | 'neutral' }) {
  const toneClass = {
    emerald: 'border-emerald-400/30 bg-emerald-400/[0.08] text-emerald-100',
    cyan: 'border-cyan-400/30 bg-cyan-400/[0.08] text-cyan-100',
    neutral: 'border-white/10 bg-white/[0.035] text-white/[0.78]',
  }[tone]

  return (
    <div className={`flex min-h-12 items-center justify-center rounded-lg border px-3 py-2 text-center text-xs font-semibold leading-snug ${toneClass}`}>
      {children}
    </div>
  )
}

function Connector({ tone = 'neutral' }: { tone?: 'emerald' | 'cyan' | 'neutral' }) {
  const lineClass = {
    emerald: 'from-emerald-400/20 via-emerald-300/90 to-emerald-400/20',
    cyan: 'from-cyan-400/20 via-cyan-300/90 to-cyan-400/20',
    neutral: 'from-white/5 via-white/[0.45] to-white/5',
  }[tone]

  return (
    <div className="flex items-center justify-center" aria-hidden="true">
      <div className={`h-px w-full bg-gradient-to-r ${lineClass}`} />
      <svg className="-ml-1 h-3 w-3 shrink-0 text-white/50" viewBox="0 0 12 12" fill="none">
        <path d="m3 2 4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

export function VoiceArchitectureChoice() {
  return (
    <figure className={`${surface} my-12`} aria-labelledby="voice-architecture-title">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/60 to-transparent" />
      <div className="border-b border-white/[0.07] px-5 py-5 md:px-7">
        <Eyebrow>Architecture decision 01</Eyebrow>
        <h3 id="voice-architecture-title" className="mt-2 text-xl font-semibold tracking-tight text-white md:text-2xl">
          Choose the signal path before the provider
        </h3>
      </div>

      <div className="grid gap-px bg-white/[0.07] lg:grid-cols-2">
        <section className="bg-[#0d1112] p-5 md:p-7" aria-label="Native speech-to-speech architecture">
          <div className="flex items-baseline justify-between gap-4">
            <h4 className="text-sm font-semibold text-emerald-200">Native speech-to-speech</h4>
            <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-300/[0.55]">one live loop</span>
          </div>
          <div className="mt-5 grid grid-cols-[1fr_28px_1.4fr_28px_1fr] items-center gap-1">
            <SignalNode>Mic</SignalNode>
            <Connector tone="emerald" />
            <SignalNode tone="emerald">Realtime model</SignalNode>
            <Connector tone="emerald" />
            <SignalNode>Voice</SignalNode>
          </div>
          <p className="mt-5 text-sm leading-6 text-white/[0.62]">
            Best when interruption, tone, and turn-taking are part of the product. Fewer stage boundaries make the exchange feel continuous.
          </p>
          <p className="mt-3 border-l border-emerald-400/30 pl-3 text-xs leading-5 text-emerald-100/70">
            Tradeoff: transcripts, policy gates, and provider portability require deliberate engineering.
          </p>
        </section>

        <section className="bg-[#0d1112] p-5 md:p-7" aria-label="Chained voice architecture">
          <div className="flex items-baseline justify-between gap-4">
            <h4 className="text-sm font-semibold text-cyan-200">Chained pipeline</h4>
            <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-300/[0.55]">replaceable stages</span>
          </div>
          <div className="mt-5 grid grid-cols-[1fr_18px_1fr_18px_1fr_18px_1fr] items-center gap-1">
            <SignalNode>Mic</SignalNode>
            <Connector tone="cyan" />
            <SignalNode tone="cyan">STT</SignalNode>
            <Connector tone="cyan" />
            <SignalNode tone="cyan">Agent</SignalNode>
            <Connector tone="cyan" />
            <SignalNode>TTS</SignalNode>
          </div>
          <p className="mt-5 text-sm leading-6 text-white/[0.62]">
            Best when durable transcripts, deterministic checks, or stage-level vendor control matter more than conversational fluidity.
          </p>
          <p className="mt-3 border-l border-cyan-400/30 pl-3 text-xs leading-5 text-cyan-100/70">
            Tradeoff: each boundary adds latency, failure modes, and tuning work.
          </p>
        </section>
      </div>

      <figcaption className="border-t border-white/[0.07] px-5 py-4 text-xs leading-5 text-white/[0.42] md:px-7">
        Native and chained systems solve different interaction contracts. A provider comparison is useful only after this split is explicit.
      </figcaption>
    </figure>
  )
}

const costRows = [
  {
    label: 'Grok Voice Think Fast 2.0',
    value: '$0.080',
    width: '100%',
    tone: 'bg-emerald-300',
    note: 'listed audio-minute rate; text inputs extra',
  },
  {
    label: 'OpenAI Realtime 2.1',
    value: '$0.048',
    width: '60%',
    tone: 'bg-cyan-300',
    note: 'balanced media-only lower bound',
  },
  {
    label: 'OpenAI Realtime 2.1 mini',
    value: '$0.015',
    width: '19%',
    tone: 'bg-cyan-200/70',
    note: 'balanced media-only lower bound',
  },
  {
    label: 'ElevenAgents Speech Engine',
    value: '$0.080',
    width: '100%',
    tone: 'bg-white/70',
    note: 'additional usage; LLM and telephony extra',
  },
]

export function VoiceCostBaseline() {
  return (
    <figure className={`${surface} my-12`} aria-labelledby="voice-cost-title">
      <div className="grid border-b border-white/[0.07] md:grid-cols-[1fr_auto] md:items-end">
        <div className="px-5 py-5 md:px-7">
          <Eyebrow>Cost orientation</Eyebrow>
          <h3 id="voice-cost-title" className="mt-2 text-xl font-semibold tracking-tight text-white md:text-2xl">
            One minute is not one billing unit
          </h3>
        </div>
        <div className="border-t border-white/[0.07] px-5 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white/[0.45] md:border-l md:border-t-0 md:px-6 md:py-6">
          USD · checked 24 Aug 2026
        </div>
      </div>

      <div className="space-y-6 px-5 py-6 md:px-7 md:py-8">
        {costRows.map((row) => (
          <div key={row.label}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-white/[0.84]">{row.label}</p>
                <p className="mt-1 text-[11px] leading-4 text-white/[0.42]">{row.note}</p>
              </div>
              <p className="shrink-0 font-mono text-sm font-semibold text-white">{row.value}<span className="text-[10px] font-normal text-white/40"> / min</span></p>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
              <div className={`h-full rounded-full ${row.tone}`} style={{ width: row.width }} />
            </div>
          </div>
        ))}
      </div>

      <figcaption className="border-t border-white/[0.07] bg-white/[0.018] px-5 py-4 text-xs leading-5 text-white/[0.48] md:px-7">
        Orientation, not a quote. The OpenAI figures assume 30 seconds of user audio and 30 seconds of assistant audio, with no history, text, tools, or fixed events. Real sessions rise as conversation history and tool traffic accumulate.
      </figcaption>
    </figure>
  )
}

const providers = [
  {
    index: '01',
    name: 'Grok Voice',
    role: 'Primary native interaction',
    signal: 'Personality + live tools',
    detail: 'Use for authenticated sessions where conversational character, interruption, search, and live tool use define the experience.',
    tone: 'text-emerald-200',
    rail: 'from-emerald-300 via-emerald-400/60 to-transparent',
  },
  {
    index: '02',
    name: 'OpenAI Realtime',
    role: 'Reasoning and volume route',
    signal: 'Approvals + 2.1 mini economics',
    detail: 'Use 2.1 for tool-heavy reasoning and approval-aware actions; route public or high-volume sessions to 2.1 mini when the quality bar holds.',
    tone: 'text-cyan-200',
    rail: 'from-cyan-300 via-cyan-400/60 to-transparent',
  },
  {
    index: '03',
    name: 'ElevenLabs',
    role: 'Voice identity and operations',
    signal: 'Expressive TTS + managed agents',
    detail: 'Use for canonical character voices, narration, multilingual delivery, or a managed telephony and observability surface.',
    tone: 'text-white/[0.86]',
    rail: 'from-white/75 via-white/30 to-transparent',
  },
]

export function VoiceProviderRoles() {
  return (
    <figure className={`${surface} my-12`} aria-labelledby="voice-provider-role-title">
      <div className="px-5 py-5 md:px-7">
        <Eyebrow>Recommended provider fabric</Eyebrow>
        <h3 id="voice-provider-role-title" className="mt-2 text-xl font-semibold tracking-tight text-white md:text-2xl">
          One product, three deliberately narrow jobs
        </h3>
      </div>
      <div className="border-y border-white/[0.07]">
        {providers.map((provider, index) => (
          <section
            key={provider.name}
            className={`relative grid gap-4 px-5 py-6 md:grid-cols-[52px_1.05fr_1fr] md:items-start md:px-7 ${index > 0 ? 'border-t border-white/[0.07]' : ''}`}
            aria-label={`${provider.name}: ${provider.role}`}
          >
            <div className="font-mono text-xs text-white/30">{provider.index}</div>
            <div>
              <p className={`text-lg font-semibold tracking-tight ${provider.tone}`}>{provider.name}</p>
              <p className="mt-1 text-sm font-medium text-white/70">{provider.role}</p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white/[0.38]">{provider.signal}</p>
            </div>
            <p className="text-sm leading-6 text-white/[0.58]">{provider.detail}</p>
            <div className={`absolute inset-x-0 bottom-0 h-px bg-gradient-to-r ${provider.rail}`} aria-hidden="true" />
          </section>
        ))}
      </div>
      <figcaption className="px-5 py-4 text-xs leading-5 text-white/[0.42] md:px-7">
        The provider name belongs in an adapter and routing policy. Product logic should depend on capabilities, receipts, and failure behavior.
      </figcaption>
    </figure>
  )
}

function StackBlock({ label, detail, tone = 'neutral' }: { label: string; detail: string; tone?: 'emerald' | 'cyan' | 'neutral' }) {
  const toneClass = {
    emerald: 'border-emerald-400/25 bg-emerald-400/[0.07]',
    cyan: 'border-cyan-400/25 bg-cyan-400/[0.07]',
    neutral: 'border-white/[0.09] bg-white/[0.025]',
  }[tone]

  return (
    <div className={`rounded-xl border p-4 ${toneClass}`}>
      <p className="text-sm font-semibold text-white/[0.86]">{label}</p>
      <p className="mt-1 text-xs leading-5 text-white/[0.46]">{detail}</p>
    </div>
  )
}

export function VoiceReferenceArchitecture() {
  return (
    <figure className={`${surface} my-12`} aria-labelledby="voice-reference-title">
      <div className="border-b border-white/[0.07] px-5 py-5 md:px-7">
        <Eyebrow>Reference architecture</Eyebrow>
        <h3 id="voice-reference-title" className="mt-2 text-xl font-semibold tracking-tight text-white md:text-2xl">
          Keep policy and evidence above the provider layer
        </h3>
      </div>

      <div className="p-5 md:p-7">
        <div className="grid gap-3 md:grid-cols-3">
          <StackBlock label="Web + mobile" detail="WebRTC or a server-mediated live transport" />
          <StackBlock label="Phone" detail="SIP, telephony carrier, recording policy" />
          <StackBlock label="Studio + narration" detail="Batch or streaming synthesis with versioned voice" />
        </div>

        <div className="my-3 flex justify-center" aria-hidden="true">
          <div className="h-5 w-px bg-gradient-to-b from-white/[0.35] to-emerald-300/70" />
        </div>

        <div className="rounded-xl border border-emerald-400/25 bg-emerald-400/[0.06] p-4 text-center">
          <p className="text-sm font-semibold text-emerald-100">Session gateway + policy router</p>
          <p className="mt-1 text-xs leading-5 text-emerald-100/[0.55]">identity · consent · region · capability · risk · budget · fallback</p>
        </div>

        <div className="my-3 flex justify-center" aria-hidden="true">
          <div className="h-5 w-px bg-gradient-to-b from-emerald-300/70 to-cyan-300/70" />
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          <StackBlock label="xAI adapter" detail="native session, tools, resumption, interruption" tone="emerald" />
          <StackBlock label="OpenAI adapter" detail="Realtime 2.1 / mini, MCP approvals, WebRTC" tone="cyan" />
          <StackBlock label="ElevenLabs adapter" detail="voice version, synthesis, managed agent branch" />
        </div>

        <div className="my-3 flex justify-center" aria-hidden="true">
          <div className="h-5 w-px bg-gradient-to-b from-cyan-300/70 to-white/[0.35]" />
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          <StackBlock label="Tools + knowledge" detail="MCP allowlist, timeouts, idempotency" />
          <StackBlock label="Confirmation gate" detail="read back consequential fields before commit" />
          <StackBlock label="Receipts + evals" detail="p50/p95 audio, barge-in, tool result, cost, fallback" />
        </div>
      </div>

      <figcaption className="border-t border-white/[0.07] px-5 py-4 text-xs leading-5 text-white/[0.42] md:px-7">
        This boundary keeps a provider outage, price change, or model revision from becoming a product rewrite.
      </figcaption>
    </figure>
  )
}
