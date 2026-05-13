import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Prompt Hub — Every prompt evaluated, attributed, lab-tagged, red-teamed | FrankX',
  description:
    'The FrankX Prompt Hub: a 13-agent team that designs, optimizes, evaluates, and red-teams elite prompts across Claude, GPT, Gemini, and open-source models. Plus a Psyche Cartographer for IFS-based introspection. Open source.',
  alternates: { canonical: 'https://www.frankx.ai/prompts' },
  openGraph: {
    title: 'Prompt Hub — FrankX',
    description:
      'Every prompt evaluated, attributed, lab-tagged, red-teamed. Designed by a 13-agent team. Open source.',
    url: 'https://www.frankx.ai/prompts',
    type: 'website',
  },
};

const AGENT_TEAM = [
  {
    cluster: 'Composer',
    agents: [
      { name: '@prompt-conductor', role: 'Opus composer; routes every ask to a flow' },
    ],
  },
  {
    cluster: 'Lab specialists',
    agents: [
      { name: '@prompt-claude-specialist', role: 'XML tags, prefill, extended thinking' },
      { name: '@prompt-gpt-specialist', role: 'developer role, Structured Outputs, contradiction audit' },
      { name: '@prompt-gemini-specialist', role: 'system-at-top, native grounding' },
      { name: '@prompt-oss-specialist', role: 'Llama / Mistral / Qwen / R1 chat templates' },
    ],
  },
  {
    cluster: 'Core builders',
    agents: [
      { name: '@prompt-architect', role: 'designs new prompts from blank' },
      { name: '@prompt-optimizer', role: 'refines existing prompts' },
      { name: '@prompt-evaluator', role: 'wraps promptfoo; scores prompts' },
    ],
  },
  {
    cluster: 'Library curators',
    agents: [
      { name: '@prompt-librarian', role: 'owns the corpus; ranks, tags, attributes' },
      { name: '@prompt-harvester', role: 'bulk-imports from Fabric / awesome-* repos' },
    ],
  },
  {
    cluster: 'Safety + psyche',
    agents: [
      { name: '@prompt-red-team', role: 'adversarial probes; publish gate' },
      { name: '@prompt-psyche-cartographer', role: 'IFS introspection; maps not unburdens' },
      { name: '@prompt-psychometrist', role: 'IPIP-50 / PVQ / ECR-R / VIA — lenses not verdicts' },
    ],
  },
];

const FLOWS = [
  { flow: 'flow-design', trigger: 'design a prompt for X', sequence: 'architect → lab-specialist → red-team → evaluator' },
  { flow: 'flow-optimize', trigger: 'optimize this prompt / /po', sequence: 'optimizer → lab-specialist → evaluator' },
  { flow: 'flow-evaluate', trigger: 'evaluate / score this prompt', sequence: 'evaluator → red-team' },
  { flow: 'flow-harvest', trigger: 'import from Fabric / harvest awesome-*', sequence: 'harvester → red-team → librarian' },
  { flow: 'flow-curate', trigger: 'rerank / rebuild library', sequence: 'librarian → optimizer → evaluator' },
  { flow: 'flow-introspect', trigger: 'IFS session / journal', sequence: 'cartographer (solo)' },
  { flow: 'flow-profile', trigger: 'Big Five / values map', sequence: 'psychometrist → cartographer' },
  { flow: 'flow-knowledge-base', trigger: 'RAG prompts / ingestion', sequence: 'architect → librarian → evaluator' },
];

const COMMITMENTS = [
  {
    title: 'Every published prompt walks the same gate',
    body: 'Designed by the architect, shaped by the lab specialist, optimized for token economy, red-teamed against jailbreaks and prompt injection, evaluated against declarative test cases via promptfoo. Score, verdict, and probe count live in each pattern\'s frontmatter. No vibes.',
  },
  {
    title: 'Every contributor uses the same schema',
    body: 'Frontmatter is the contract: id (verb_topic), version (semver), lane (Claude / GPT / Gemini / OSS / cross-lab), category (analyze / create / extract / ...), provenance (source, URL, attribution, license), eval score, red-team status. Fabric-style folder-per-pattern, promptfoo evals colocated. Bulk imports from awesome-chatgpt-prompts (CC0) and awesome-claude-prompts (MIT) follow the same rules — full attribution, license verified, quality-gated.',
  },
  {
    title: 'Every user can map their own patterns',
    body: 'The Psyche Cartographer offers IFS-based introspection with Socratic / Stoic / Jungian / IFS-Self voice modes. The Psychometrist administers IPIP-50, Schwartz PVQ, ECR-R, VIA, Enneagram. Both frame results as lenses, never verdicts. Hard boundaries: maps only, never unburdens. Crisis triggers route to 988 / Samaritans / Befrienders. Inspired by Mindsera and Anthropic\'s introspection research.',
  },
];

const REPOS = [
  {
    name: 'prompt-engine',
    description: 'The 13-agent team + tooling. Bootable Node project.',
    license: 'MIT',
    status: 'scaffolded',
    url: 'https://github.com/frankxai/prompt-engine',
  },
  {
    name: 'prompt-library',
    description: 'The Library-of-Alexandria corpus. Curated, ranked, attributed.',
    license: 'MIT + CC0 imports with attribution',
    status: 'scaffolded',
    url: 'https://github.com/frankxai/prompt-library',
  },
];

export default function PromptHubPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <article className="mx-auto max-w-5xl px-6 py-20">
        {/* Hero */}
        <header className="mb-20">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400/80">
            Horizontal substrate · 13 agents · 2 OSS repos · 8 flows
          </p>
          <h1 className="mb-6 text-5xl font-semibold tracking-tight text-white md:text-6xl">
            The Prompt Hub
          </h1>
          <p className="max-w-3xl text-xl leading-relaxed text-slate-300">
            Every prompt evaluated, attributed, lab-tagged, red-teamed.
            A 13-agent team handling design, optimization, evaluation, harvest, curation, introspection,
            and psychometric profiling across Claude, GPT, Gemini, and open-source models.
          </p>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-400">
            Built on the same Personal AI CoE framework as ACOS. Open source. No vibes. No clinical drift.
          </p>
        </header>

        {/* Three commitments */}
        <section className="mb-20">
          <h2 className="mb-8 text-2xl font-semibold text-white">Three commitments</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {COMMITMENTS.map((c) => (
              <div
                key={c.title}
                className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6"
              >
                <h3 className="mb-3 text-lg font-semibold text-white">{c.title}</h3>
                <p className="text-sm leading-relaxed text-slate-300">{c.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Agent team */}
        <section className="mb-20">
          <h2 className="mb-2 text-2xl font-semibold text-white">The 13-agent team</h2>
          <p className="mb-8 max-w-3xl text-sm text-slate-400">
            One top-level Opus composer routes every ask to 2-5 specialists.
            Lab quirks (Claude XML, GPT Structured Outputs, Gemini grounding, OSS chat templates) each get their own home.
          </p>

          {AGENT_TEAM.map((cluster) => (
            <div key={cluster.cluster} className="mb-8">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-emerald-400">
                {cluster.cluster}
              </h3>
              <ul className="space-y-2">
                {cluster.agents.map((a) => (
                  <li key={a.name} className="flex items-start gap-4 rounded-lg border border-slate-800/60 bg-slate-900/30 px-4 py-3">
                    <code className="shrink-0 font-mono text-sm text-emerald-300">{a.name}</code>
                    <span className="text-sm text-slate-300">{a.role}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Flows */}
        <section className="mb-20">
          <h2 className="mb-8 text-2xl font-semibold text-white">The 8 canonical flows</h2>
          <div className="overflow-hidden rounded-2xl border border-slate-800">
            <table className="w-full text-sm">
              <thead className="bg-slate-900/60">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-slate-300">Flow</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-300">Trigger</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-300">Sequence</th>
                </tr>
              </thead>
              <tbody>
                {FLOWS.map((f, i) => (
                  <tr key={f.flow} className={i % 2 ? 'bg-slate-900/30' : ''}>
                    <td className="px-4 py-3 font-mono text-emerald-300">{f.flow}</td>
                    <td className="px-4 py-3 text-slate-300">{f.trigger}</td>
                    <td className="px-4 py-3 text-slate-400">{f.sequence}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Repos */}
        <section className="mb-20">
          <h2 className="mb-8 text-2xl font-semibold text-white">Open source</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {REPOS.map((r) => (
              <div
                key={r.name}
                className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6"
              >
                <h3 className="mb-1 font-mono text-base text-emerald-300">frankxai/{r.name}</h3>
                <p className="mb-3 text-xs uppercase tracking-wider text-slate-500">
                  {r.license} · {r.status}
                </p>
                <p className="mb-4 text-sm leading-relaxed text-slate-300">{r.description}</p>
                <a
                  href={r.url}
                  className="inline-flex items-center gap-2 text-sm font-medium text-emerald-400 hover:text-emerald-300"
                  rel="noreferrer noopener"
                >
                  View repo →
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* CTAs */}
        <section className="mb-20">
          <h2 className="mb-8 text-2xl font-semibold text-white">Use it</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Link
              href="/prompt-library"
              className="group rounded-2xl border border-slate-800 bg-slate-900/40 p-6 transition hover:border-emerald-500/40 hover:bg-slate-900/60"
            >
              <h3 className="mb-2 text-lg font-semibold text-white">Browse the library</h3>
              <p className="text-sm text-slate-400">
                Filter by lane (Claude / GPT / Gemini / OSS) or category. Every entry has eval score + provenance.
              </p>
              <span className="mt-4 inline-flex text-sm font-medium text-emerald-400 group-hover:text-emerald-300">
                Open library →
              </span>
            </Link>

            <Link
              href="/prompts/psyche"
              className="group rounded-2xl border border-slate-800 bg-slate-900/40 p-6 transition hover:border-emerald-500/40 hover:bg-slate-900/60"
            >
              <h3 className="mb-2 text-lg font-semibold text-white">Self-mapping</h3>
              <p className="text-sm text-slate-400">
                IFS journal prompts, psychometric instruments, contemplative inquiry. Maps, not verdicts.
                Crisis routing built in.
              </p>
              <span className="mt-4 inline-flex text-sm font-medium text-emerald-400 group-hover:text-emerald-300">
                Open psyche path →
              </span>
            </Link>

            <Link
              href="/os"
              className="group rounded-2xl border border-slate-800 bg-slate-900/40 p-6 transition hover:border-emerald-500/40 hover:bg-slate-900/60"
            >
              <h3 className="mb-2 text-lg font-semibold text-white">How it fits the OS</h3>
              <p className="text-sm text-slate-400">
                The Prompt Hub is one of FrankX&apos;s horizontal substrates — sibling to SIS, Library OS,
                Visual Intelligence System.
              </p>
              <span className="mt-4 inline-flex text-sm font-medium text-emerald-400 group-hover:text-emerald-300">
                See the OS →
              </span>
            </Link>
          </div>
        </section>

        {/* Spec */}
        <footer className="border-t border-slate-800 pt-10 text-sm text-slate-400">
          <p className="mb-2">
            Master spec:{' '}
            <code className="font-mono text-emerald-300">
              docs/superpowers/specs/2026-05-13-prompt-hub-design.md
            </code>
          </p>
          <p className="mb-2">
            Skill: <code className="font-mono">prompt-hub</code> · Command:{' '}
            <code className="font-mono">/prompt-hub</code>
          </p>
          <p className="mb-2">
            Types: <code className="font-mono">lib/prompt-hub/types.ts</code>
          </p>
          <p>Inspired by Fabric (Daniel Miessler, MIT) · evaluated via promptfoo (MIT).</p>
        </footer>
      </article>
    </main>
  );
}
