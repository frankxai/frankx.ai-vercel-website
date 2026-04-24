import Link from 'next/link'
import Script from 'next/script'
import {
  ArrowRight,
  Github,
  Download,
  Terminal,
  Users,
  Sparkles,
  Layers,
  Compass,
  Brain,
  BookOpen,
  Target,
  Check,
  FileCode,
  Workflow,
  Shield,
  Zap,
  Network,
  Code2,
} from 'lucide-react'

const REPO = 'https://github.com/frankxai/Starlight-Intelligence-System'
const RELEASE = 'https://github.com/frankxai/Starlight-Intelligence-System/releases/latest'
const PROTOCOL = 'https://starlightintelligence.org/protocol'

const phases = [
  {
    num: '1',
    title: 'Welcome + Intake',
    time: '10 minutes',
    body: 'No form, no quiz. Open a conversation with Starlight and describe — in one paragraph — what you do, what\'s scattered, what you want to build. The intake routes you to one of four paths before you commit.',
    icon: Compass,
  },
  {
    num: '2',
    title: 'Genius Discovery',
    time: '~90 minutes',
    body: 'Drag in 3–5 sources of scattered material. A Canva export, a Drive subtree, a Notion dump. The Genius agent reads across all of it and produces two documents: your Genius Profile (the frameworks you keep rebuilding without realizing) and your Freedom Path (every recurring activity sorted into Keep / Delegate / Automate / Kill).',
    icon: Brain,
  },
  {
    num: '3',
    title: 'Knowledge Reclamation',
    time: '3-hour session',
    body: 'Run `/reclaim-knowledge`. SIS produces a Reclamation Map — a folder tree organized by function, not by where files happen to live today. Explicit drag-and-drop instructions. One focused session, years of material into a coherent architecture.',
    icon: Layers,
  },
  {
    num: '4',
    title: 'Choose your next layer',
    time: 'You decide',
    body: 'With Genius Profile + Freedom Path + reclaimed second brain, the highest-leverage next move becomes obvious. Train an executor, build a creator pipeline, architect your business layer, or define your vision. Each layer is its own Intelligence System. You own it. You take it anywhere.',
    icon: Workflow,
  },
  {
    num: '5',
    title: 'Compound',
    time: 'Ongoing',
    body: 'Every artifact you ship carries a "Built on SIP" attestation. Not a badge — an ambient mark the system writes when a real composition happens. Your ledger compounds into a visible body of sovereign practice. No subscription. No vendor lock-in. A public trail of real work under your own name.',
    icon: Sparkles,
  },
]

const differences = [
  {
    title: 'Memory that\'s yours',
    body: 'Your Genius Profile, frameworks, and voice samples live in structured markdown files on your filesystem. Take them anywhere — Cursor, ChatGPT Projects, Gemini Gems, a tool that doesn\'t exist yet. No vendor owns your second brain. You do.',
    icon: FileCode,
  },
  {
    title: 'Architecture, not chat',
    body: 'SIS isn\'t a chatbot with a clever system prompt. It\'s a nine-layer operating system for your intellectual life: Genius → Second Brain → Vision → Business → Creator → Wealth → Health → Relational → Spiritual. Compose the ones you need, in the order that serves you.',
    icon: Network,
  },
  {
    title: 'Sovereignty as a feature',
    body: 'Your work is your work. No platform tax, no ownership claim, no data lock-in. Attribution via "Built on SIP" is the only compounding mechanism — and you can leave any time. Exit is always available.',
    icon: Shield,
  },
  {
    title: 'Voice preservation',
    body: 'Every output is in your voice, not generic AI voice. The system fingerprints how you uniquely say things — cadence, vocabulary, structural moves — and refuses to ghostwrite over it. If a draft drifts away, the system flags it before you ship.',
    icon: Sparkles,
  },
]

const layers = [
  { n: '1', name: 'Genius IS', purpose: 'What only you uniquely see', status: 'Alpha (v7.4)' },
  { n: '2', name: 'Second Brain IS', purpose: 'Knowledge architecture', status: 'Alpha' },
  { n: '3', name: 'Vision / Brand IS', purpose: 'Why + how + design', status: 'Month 2' },
  { n: '4', name: 'Business IS', purpose: 'Accounting, taxes, entity, revenue', status: 'Month 2–3' },
  { n: '5', name: 'Creator IS', purpose: 'Content pipeline, multi-modal', status: 'Alpha' },
  { n: '6', name: 'Wealth / Freedom IS', purpose: 'Compounding capital + time', status: 'Month 3' },
  { n: '7', name: 'Health IS', purpose: 'Body is the substrate', status: 'Month 2' },
  { n: '8', name: 'Relational IS', purpose: 'Network + alliance architecture', status: 'Month 3' },
  { n: '9', name: 'Spiritual IS', purpose: 'Meaning layer (optional)', status: 'Always optional' },
]

const stats = [
  { label: 'Layers', value: '9', icon: Layers },
  { label: 'Reference agents', value: '7', icon: Users },
  { label: 'Conformance tests', value: '54', icon: Check },
  { label: 'Vendor lock-in', value: '0', icon: Shield },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://frankx.ai/starlight-intelligence-system/',
      name: 'Starlight Intelligence System',
      description:
        'Free, open substrate for organizing scattered expertise into a second brain you own. 9-layer intelligence architecture, markdown-first, MIT licensed.',
      url: 'https://frankx.ai/starlight-intelligence-system/',
      isPartOf: { '@id': 'https://frankx.ai/#website' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://frankx.ai' },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Starlight Intelligence System',
            item: 'https://frankx.ai/starlight-intelligence-system/',
          },
        ],
      },
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Starlight Intelligence System',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Cross-platform (markdown + MCP)',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      license: 'https://opensource.org/licenses/MIT',
      codeRepository: REPO,
      description:
        'SIP-compliant substrate for sovereign intelligence systems — 9-layer architecture, markdown vaults, MCP server, command taxonomy.',
    },
  ],
}

export default function StarlightIntelligenceSystemPage() {
  return (
    <>
      <Script
        id="sis-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/[0.04] via-transparent to-transparent" aria-hidden />
        <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-28 sm:pt-36 pb-16 sm:pb-24 relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-emerald-300 mb-6">
            <Sparkles className="h-3 w-3" />
            Substrate · Free · MIT
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 text-balance">
            You already have the genius.
            <br />
            <span className="bg-gradient-to-r from-emerald-300 via-cyan-300 to-violet-300 bg-clip-text text-transparent">
              It&apos;s just scattered across ten files you never opened together.
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-4 max-w-3xl">
            Fifteen years of expertise across multiple companies. Three hundred Canva templates. Four Drive accounts. A Notion you abandoned in 2023. You&apos;re not missing intelligence — you&apos;re missing architecture.
          </p>
          <p className="text-base text-slate-400 leading-relaxed mb-10 max-w-3xl">
            Starlight Intelligence System finds your genius inside the mess you already have, sorts every activity into four buckets, and lets you compound — one layer at a time. You keep everything. You can leave anytime. The only thing we ask back is attribution.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href={RELEASE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white transition-all hover:from-emerald-400 hover:to-cyan-400 hover:shadow-lg hover:shadow-emerald-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712]"
            >
              <Download className="h-4 w-4" />
              Get the Starter Pack
            </Link>
            <Link
              href={REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70"
            >
              <Github className="h-4 w-4" />
              Clone the Repo
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {stats.map((s) => {
              const Icon = s.icon
              return (
                <div key={s.label} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                  <Icon className="h-4 w-4 text-emerald-400 mb-2" />
                  <div className="text-2xl font-bold text-white">{s.value}</div>
                  <div className="text-[11px] uppercase tracking-wider text-slate-500">{s.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Who this is for */}
      <section className="border-b border-white/5">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-20">
          <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500 mb-3">Who this is for</div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-8">
            Two people read this page and feel seen.
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-500/[0.04] to-transparent p-6">
              <div className="text-[11px] uppercase tracking-wider text-emerald-300 mb-2 font-semibold">The indispensable professional</div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Psychologist turned consultant. Ex-HR turned solopreneur. Designer turned strategist. You&apos;ve built the same coaching framework four times because you can never find last year&apos;s version. You want to hand off the operational work, reclaim your own frameworks, and build something that&apos;s actually yours.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-500/[0.04] to-transparent p-6">
              <div className="text-[11px] uppercase tracking-wider text-cyan-300 mb-2 font-semibold">The creator with a body of work</div>
              <p className="text-sm text-slate-300 leading-relaxed">
                You have an audience and output. What you don&apos;t have is a system. Every piece starts from a blank page even though you&apos;ve written something structurally similar forty times. You love the work. You&apos;re burning out on it. You don&apos;t want a ghostwriter — you want leverage that preserves you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Journey — 5 phases */}
      <section className="border-b border-white/5">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-20">
          <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500 mb-3">How it works</div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
            Five phases. You don&apos;t have to commit to all of them.
          </h2>
          <p className="text-base text-slate-400 mb-10 max-w-2xl">You just have to start.</p>

          <ol className="space-y-4">
            {phases.map((p) => {
              const Icon = p.icon
              return (
                <li
                  key={p.num}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:bg-white/[0.04]"
                >
                  <div className="flex gap-5 items-start">
                    <div className="shrink-0 flex flex-col items-center gap-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-400/30 text-emerald-300 font-bold text-sm">
                        {p.num}
                      </div>
                      <Icon className="h-4 w-4 text-slate-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-3 mb-2 flex-wrap">
                        <h3 className="text-lg font-semibold text-white">{p.title}</h3>
                        <span className="text-[11px] uppercase tracking-wider text-slate-500 font-mono">
                          {p.time}
                        </span>
                      </div>
                      <p className="text-sm text-slate-300 leading-relaxed">{p.body}</p>
                    </div>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </section>

      {/* Three Paths */}
      <section className="border-b border-white/5">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-20">
          <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500 mb-3">How to start</div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">Three paths. Pick the one that matches how you work.</h2>
          <p className="text-base text-slate-400 mb-10 max-w-2xl">
            All three land you in the same place: owning your own intelligence system foundation. The path is just about how fast you want to move and how comfortable you are with the tools.
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            {/* Path 1 — non-technical */}
            <div className="group relative rounded-2xl border border-emerald-400/30 bg-gradient-to-br from-emerald-500/[0.06] to-transparent p-6 transition-all hover:border-emerald-400/50">
              <div className="absolute -top-3 left-5 inline-block rounded-full bg-emerald-500 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-black">
                Recommended
              </div>
              <BookOpen className="h-5 w-5 text-emerald-300 mb-3" />
              <h3 className="text-lg font-bold text-white mb-1">Claude Desktop</h3>
              <div className="text-[11px] uppercase tracking-wider text-emerald-300 mb-4">Non-technical · Most adopters start here</div>
              <ol className="space-y-2 text-sm text-slate-300 mb-5">
                <li className="flex gap-2">
                  <span className="text-slate-500 font-mono text-xs mt-0.5">1.</span>
                  <span>Install Claude Desktop</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-slate-500 font-mono text-xs mt-0.5">2.</span>
                  <span>Create a new Claude Project</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-slate-500 font-mono text-xs mt-0.5">3.</span>
                  <span>Download the SIS starter pack (.zip)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-slate-500 font-mono text-xs mt-0.5">4.</span>
                  <span>Import → Knowledge → Upload</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-slate-500 font-mono text-xs mt-0.5">5.</span>
                  <span>Say <code className="bg-white/5 rounded px-1 py-0.5 text-[11px] text-emerald-300">/welcome</code> or describe what&apos;s scattered</span>
                </li>
              </ol>
              <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono mb-5">
                <Check className="h-3 w-3 text-emerald-400" />
                15 min setup · 90 min to your first Genius Profile
              </div>
              <Link
                href={RELEASE}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-black transition-all hover:bg-emerald-400"
              >
                <Download className="h-3.5 w-3.5" />
                Starter pack (.zip)
              </Link>
            </div>

            {/* Path 2 — builder */}
            <div className="group relative rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all hover:border-white/20">
              <Terminal className="h-5 w-5 text-cyan-300 mb-3" />
              <h3 className="text-lg font-bold text-white mb-1">Claude Code / Cursor / Gemini CLI</h3>
              <div className="text-[11px] uppercase tracking-wider text-cyan-300 mb-4">Builder path · Fork + wire + go</div>
              <ol className="space-y-2 text-sm text-slate-300 mb-5">
                <li className="flex gap-2">
                  <span className="text-slate-500 font-mono text-xs mt-0.5">1.</span>
                  <span>Fork <code className="bg-white/5 rounded px-1 py-0.5 text-[11px]">frankxai/Starlight-Intelligence-System</code></span>
                </li>
                <li className="flex gap-2">
                  <span className="text-slate-500 font-mono text-xs mt-0.5">2.</span>
                  <span>Drop in the platform adapter (<code className="bg-white/5 rounded px-1 py-0.5 text-[11px]">.claude/</code>, <code className="bg-white/5 rounded px-1 py-0.5 text-[11px]">.cursorrules</code>, or <code className="bg-white/5 rounded px-1 py-0.5 text-[11px]">GEMINI.md</code>)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-slate-500 font-mono text-xs mt-0.5">3.</span>
                  <span>Run commands directly — full substrate + MCP + 10 vault tools</span>
                </li>
              </ol>
              <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono mb-5">
                <Check className="h-3 w-3 text-cyan-400" />
                Frank runs this daily · MIT license · zero runtime deps beyond better-sqlite3
              </div>
              <Link
                href={REPO}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-white/10"
              >
                <Github className="h-3.5 w-3.5" />
                View on GitHub
              </Link>
            </div>

            {/* Path 3 — pilot */}
            <div className="group relative rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all hover:border-white/20">
              <Users className="h-5 w-5 text-violet-300 mb-3" />
              <h3 className="text-lg font-bold text-white mb-1">Let Frank run your first session</h3>
              <div className="text-[11px] uppercase tracking-wider text-violet-300 mb-4">Pilot · Application-based · Limited</div>
              <p className="text-sm text-slate-300 leading-relaxed mb-5">
                Frank runs <code className="bg-white/5 rounded px-1 py-0.5 text-[11px]">/intake</code> + <code className="bg-white/5 rounded px-1 py-0.5 text-[11px]">/discover-genius</code> with you live. Walks through reclamation. Produces the Profile + Freedom Path. Hands them over. You leave owning your own intelligence system foundation. No ongoing engagement required.
              </p>
              <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono mb-5">
                <Check className="h-3 w-3 text-violet-400" />
                Artifact-shaped, not hour-shaped · Named deliverables by named dates
              </div>
              <Link
                href="/contact?topic=sis-pilot"
                className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-2 text-sm font-semibold text-violet-200 transition-all hover:bg-violet-500/20"
              >
                Apply for a pilot
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What's different */}
      <section className="border-b border-white/5">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-20">
          <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500 mb-3">What&apos;s different</div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
            Four differences from &ldquo;just using ChatGPT.&rdquo;
          </h2>
          <p className="text-base text-slate-400 mb-10 max-w-2xl">Specific, not rhetorical.</p>

          <div className="grid md:grid-cols-2 gap-4">
            {differences.map((d) => {
              const Icon = d.icon
              return (
                <div
                  key={d.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
                >
                  <Icon className="h-5 w-5 text-emerald-400 mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">{d.title}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">{d.body}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Nine-layer vision */}
      <section className="border-b border-white/5">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-20">
          <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500 mb-3">The architecture</div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
            Nine layers. You start with one.
          </h2>
          <p className="text-base text-slate-400 mb-10 max-w-2xl">
            You don&apos;t need all nine to start. You need one — Genius — working. The rest compounds when the time is right.
          </p>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.03]">
                  <th className="text-left text-[11px] uppercase tracking-wider text-slate-500 px-4 py-3 font-semibold">#</th>
                  <th className="text-left text-[11px] uppercase tracking-wider text-slate-500 px-4 py-3 font-semibold">Layer</th>
                  <th className="text-left text-[11px] uppercase tracking-wider text-slate-500 px-4 py-3 font-semibold hidden sm:table-cell">Purpose</th>
                  <th className="text-left text-[11px] uppercase tracking-wider text-slate-500 px-4 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {layers.map((l) => (
                  <tr key={l.n} className="border-b border-white/5 last:border-b-0 hover:bg-white/[0.02] transition-colors">
                    <td className="px-4 py-3 text-slate-500 font-mono text-xs">{l.n}</td>
                    <td className="px-4 py-3 text-white font-semibold">{l.name}</td>
                    <td className="px-4 py-3 text-slate-400 hidden sm:table-cell">{l.purpose}</td>
                    <td className="px-4 py-3 text-[12px] text-slate-400 font-mono">{l.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-slate-500">
            Spiritual IS is explicitly optional and never imposed. Founder-layer practice stays at the founder layer.
          </p>
        </div>
      </section>

      {/* What it costs */}
      <section className="border-b border-white/5">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-20">
          <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500 mb-3">What it costs</div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-8">
            The substrate is free. We ask for reciprocity, not payment.
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <Shield className="h-5 w-5 text-emerald-400 mb-3" />
              <h3 className="text-base font-semibold text-white mb-2">Attribution</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Cross-party artifacts carry &ldquo;Built on SIP.&rdquo; Silent composition is a breach of trust, not a legal issue — we treat it accordingly.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <FileCode className="h-5 w-5 text-cyan-400 mb-3" />
              <h3 className="text-base font-semibold text-white mb-2">Sovereignty clause</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Your work is yours. Your vaults stay on your machine. Attribution history remains immutable because it&apos;s how the whole protocol compounds.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <Sparkles className="h-5 w-5 text-violet-400 mb-3" />
              <h3 className="text-base font-semibold text-white mb-2">Optional: feed back</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                If SIS helps you, help the protocol evolve. Pressure-test it. Submit substrate contributions. Or just write about what worked.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* For builders — technical surface */}
      <section className="border-b border-white/5">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-20">
          <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500 mb-3">For builders</div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-8">
            The architecture view.
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <div className="text-[11px] uppercase tracking-wider text-emerald-300 mb-2 font-semibold">Protocol</div>
              <h3 className="text-base font-semibold text-white mb-3">SIP v1.1.0</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-3">Six layers:</p>
              <ul className="space-y-1.5 text-sm text-slate-300">
                <li className="flex gap-2"><Check className="h-3.5 w-3.5 text-emerald-400 mt-0.5 shrink-0" /><span>File contract (SKILL · AGENTS · MEMORY · CANON · SOUL · STACK)</span></li>
                <li className="flex gap-2"><Check className="h-3.5 w-3.5 text-emerald-400 mt-0.5 shrink-0" /><span>Attestation protocol</span></li>
                <li className="flex gap-2"><Check className="h-3.5 w-3.5 text-emerald-400 mt-0.5 shrink-0" /><span>MCP registry standard</span></li>
                <li className="flex gap-2"><Check className="h-3.5 w-3.5 text-emerald-400 mt-0.5 shrink-0" /><span>Command taxonomy</span></li>
                <li className="flex gap-2"><Check className="h-3.5 w-3.5 text-emerald-400 mt-0.5 shrink-0" /><span>Sovereignty clause</span></li>
                <li className="flex gap-2"><Check className="h-3.5 w-3.5 text-emerald-400 mt-0.5 shrink-0" /><span>Optional archetype extension</span></li>
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <div className="text-[11px] uppercase tracking-wider text-cyan-300 mb-2 font-semibold">Stack</div>
              <h3 className="text-base font-semibold text-white mb-3">Markdown + MCP + TS</h3>
              <ul className="space-y-1.5 text-sm text-slate-300">
                <li className="flex gap-2"><Code2 className="h-3.5 w-3.5 text-cyan-400 mt-0.5 shrink-0" /><span>Markdown + JSONL vaults</span></li>
                <li className="flex gap-2"><Code2 className="h-3.5 w-3.5 text-cyan-400 mt-0.5 shrink-0" /><span>TypeScript MCP server — <code className="bg-white/5 rounded px-1 text-[11px]">@arcanea/starlight-intelligence-system</code></span></li>
                <li className="flex gap-2"><Code2 className="h-3.5 w-3.5 text-cyan-400 mt-0.5 shrink-0" /><span>Claude Code commands as reference impl</span></li>
                <li className="flex gap-2"><Code2 className="h-3.5 w-3.5 text-cyan-400 mt-0.5 shrink-0" /><span>Zero runtime deps outside <code className="bg-white/5 rounded px-1 text-[11px]">better-sqlite3</code></span></li>
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <div className="text-[11px] uppercase tracking-wider text-violet-300 mb-2 font-semibold">Runtime coverage</div>
              <h3 className="text-base font-semibold text-white mb-3">8 runtimes, 4 workspace exports</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-3">
                <strong className="text-white">First-class:</strong> Claude Code. <strong className="text-white">Also supported:</strong> Cursor, Codex, Gemini CLI, Cline, Antigravity, OpenCode.
              </p>
              <p className="text-sm text-slate-400 leading-relaxed">
                <strong className="text-white">Workspace exports (v7.4):</strong> Claude Projects, ChatGPT Projects, Gemini Gems, Cowork. <strong className="text-white">Modality attestation (v7.5):</strong> Suno, Udio, Imagen, Midjourney, ElevenLabs.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <div className="text-[11px] uppercase tracking-wider text-amber-300 mb-2 font-semibold">License</div>
              <h3 className="text-base font-semibold text-white mb-3">MIT + CC-BY-NC</h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li><strong className="text-white">MIT</strong> — substrate spec + reference commands + operational layer</li>
                <li><strong className="text-white">CC-BY-NC</strong> — Arcanea canon, if you compose with it</li>
                <li className="pt-2 border-t border-white/5">
                  <strong className="text-white">Test harness:</strong> 35 substrate conformance assertions + 19 v7.3 newcomer-surface assertions. Reference build runs clean.
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-white/10"
            >
              <Github className="h-4 w-4" />
              github.com/frankxai/Starlight-Intelligence-System
            </Link>
            <Link
              href={PROTOCOL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-white/10"
            >
              <FileCode className="h-4 w-4" />
              Protocol spec
            </Link>
          </div>
        </div>
      </section>

      {/* Close + CTA */}
      <section>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-20 sm:py-28 text-center">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 text-balance">
            Sovereignty isn&apos;t a brand.
            <br />
            <span className="bg-gradient-to-r from-emerald-300 via-cyan-300 to-violet-300 bg-clip-text text-transparent">
              It&apos;s an architecture.
            </span>
          </h2>
          <p className="text-lg text-slate-300 mb-2 max-w-2xl mx-auto">
            Nine layers, yours, compounding. Start with one: your genius.
          </p>
          <p className="text-base text-slate-400 mb-10 max-w-2xl mx-auto">
            You already have it. Let&apos;s organize it.
          </p>

          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href={RELEASE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white transition-all hover:from-emerald-400 hover:to-cyan-400 hover:shadow-lg hover:shadow-emerald-500/20"
            >
              <Download className="h-4 w-4" />
              Download Starter Pack
            </Link>
            <Link
              href={REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10"
            >
              <Github className="h-4 w-4" />
              Clone the Repo
            </Link>
          </div>

          <div className="mt-16 pt-8 border-t border-white/5 text-[11px] text-slate-500 font-mono">
            <div>Built on SIP — Starlight Intelligence Protocol</div>
            <div>Substrate: starlightintelligence.org/protocol v1.1.0</div>
            <div>Layers used: file-contract · attestation · commands · sovereignty</div>
          </div>
        </div>
      </section>
    </>
  )
}
