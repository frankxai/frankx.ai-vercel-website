import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

const SITE_URL = 'https://www.frankx.ai';

export const metadata: Metadata = {
  title: 'The Starlight Chronicle — A Practice of Witnessing | FrankX',
  description:
    'The reflective layer of the FrankX OS. The State of the Palace as it stands on 2026-05-03 — eight composed operating systems, ratified substrate, and a four-cadence practice of witnessing.',
  keywords: [
    'Starlight Chronicle',
    'reflective practice',
    'creator system',
    'weekly review',
    'witnessing practice',
    'FrankX OS',
    'sovereign workflow',
    'changelog',
  ],
  alternates: { canonical: `${SITE_URL}/chronicle` },
  openGraph: {
    title: 'The Starlight Chronicle — A Practice of Witnessing',
    description:
      'The State of the Palace, witnessed on 2026-05-03. Eight operating systems composed; substrate ratified; the practice of cadence-shaped reflection in motion.',
    type: 'article',
    url: `${SITE_URL}/chronicle`,
    siteName: 'FrankX',
    images: [
      {
        url: `${SITE_URL}/images/chronicle/state-of-the-palace-hero.jpg`,
        width: 2048,
        height: 1152,
        alt: 'A still architectural courtyard at dawn — the Starlight Chronicle hero',
      },
    ],
  },
};

function ArticleJsonLd() {
  const url = `${SITE_URL}/chronicle`;
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Chronicle', item: url },
        ],
      },
      {
        '@type': 'Article',
        headline: 'The Starlight Chronicle — State of the Palace 2026-05-03',
        description:
          'The reflective layer of the FrankX OS. The founding witness — eight operating systems composed and blessed as whole-at-this-moment.',
        url,
        author: { '@type': 'Person', name: 'Frank', url: SITE_URL },
        publisher: { '@type': 'Organization', name: 'FrankX', url: SITE_URL },
        datePublished: '2026-05-03',
        dateModified: '2026-05-03',
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        keywords:
          'reflective practice, weekly review, witnessing, sovereign workflow, creator systems, FrankX OS',
        articleSection: ['Practice', 'Systems', 'Reflection'],
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const pillars = [
  {
    n: '01',
    title: 'Starlight Intelligence System',
    role: 'Substrate',
    body: 'The protocol beneath everything. SIP v1.1.0 — nine intelligence layers, file-contract rules, sovereignty clause. Markdown-first, MIT, forkable.',
    href: '/starlight-intelligence-system',
  },
  {
    n: '02',
    title: 'ACOS — 99 Agents',
    role: 'Personal AI CoE',
    body: 'The implementation of the same six-pillar AI Center of Excellence framework Frank builds for Fortune 500 enterprises at Oracle — translated to personal scale.',
    href: '/acos/agents',
  },
  {
    n: '03',
    title: 'Library OS',
    role: 'Book intelligence',
    body: 'Open-source system for turning every book read into a permanent owned asset. Four deep-dives, three slash commands, one manifesto.',
    href: '/library',
  },
  {
    n: '04',
    title: 'Workshop OS',
    role: 'Delivery system',
    body: 'Four-tier operating system covering intake → prep → deliver → debrief → amplify. Two real forcing functions on the horizon: NLDigital and Madrid.',
    href: '/workshops',
  },
  {
    n: '05',
    title: 'Watch OS',
    role: 'Video & shorts spine',
    body: 'Per-ID pages, RSS, OG cards, AEO schema. Video stops being episodic; it has a home, an index, and a discovery surface.',
    href: '/watch',
  },
  {
    n: '06',
    title: 'Agentic Content Officer',
    role: 'The factory floor',
    body: 'A recording on a phone becomes a published short with captions, b-roll, and brand consistency, in one command.',
    href: '/blog',
  },
  {
    n: '07',
    title: 'Contemplative Rails',
    role: 'Phase 0 live',
    body: 'A third register, sovereign to itself. Four "/on-…" hubs + canon + study aggregator. Currently noindex’d while the launch gate clears.',
    href: '/study',
  },
  {
    n: '08',
    title: 'The Chronicle',
    role: 'Reflective layer',
    body: 'You are reading it. A four-cadence practice of witnessing what the other seven have built — and what should now be left alone.',
    href: '/chronicle',
  },
];

const cadences = [
  {
    index: '01',
    title: 'Weekly — Palace Review',
    when: 'Sunday',
    voice: 'Palace Architect',
    body: 'What to bless, what to ignore, the one highest-leverage path for Monday. Six sections; 800–1500 words; surgical, not exhaustive. The active cadence.',
    command: '/palace',
    state: 'active',
  },
  {
    index: '02',
    title: 'Monthly — Survey',
    when: 'First Sunday',
    voice: 'Horizon Surveyor',
    body: 'The shape of the month. Themes, drift, the systems that grew quiet and the ones that found their voice. Activates after four weekly Palace Reviews.',
    command: '/chronicle month',
    state: 'gated',
  },
  {
    index: '03',
    title: 'Quarterly — Constellation Census',
    when: 'Solstice-adjacent',
    voice: 'Constellation Cartographer',
    body: 'What is alive. What is decaying. What is emerging. The kill / keep / promote ritual. Activates after three months of monthly cadence.',
    command: '/chronicle quarter',
    state: 'gated',
  },
  {
    index: '04',
    title: 'Annual — Legacy Audit',
    when: 'Winter solstice',
    voice: 'Legacy Chronicler',
    body: 'What of this year matters in ten years. The through-line. Activates only when the calendar reaches December 21.',
    command: '/chronicle year',
    state: 'gated',
  },
];

const principles = [
  {
    head: 'What you witness compounds.',
    body: 'Selective attention is the foundation of every claim about manifestation, attraction, or alignment. Without the witness, you are consuming, not directing. Cognitive science. Defensible.',
  },
  {
    head: 'Systems become legible at the right cadence.',
    body: 'Daily is too noisy; yearly is too sparse. Weekly, monthly, quarterly, annual — these are the natural shapes of cognition meeting complexity. Cybernetics. Defensible.',
  },
  {
    head: 'Closure prevents the next thing from being ruined by the last.',
    body: 'Every system has the right to be considered finished at this moment. Not abandoned — finished. Naming work as whole frees the next move from being seeded by restlessness. Behavioural science. Defensible.',
  },
];

const lineage = [
  { tradition: 'The Stoics', form: 'Evening review (Marcus Aurelius)' },
  { tradition: 'Christian monastics', form: 'The Examen' },
  { tradition: 'Judaism', form: 'Sabbath' },
  { tradition: 'Engineering culture', form: 'The postmortem' },
  { tradition: 'Buddhism', form: 'Sangha ratification' },
];

const refusals = [
  'No auto-fire hook. The ritual is invoked, not pushed. Skipped Sundays are silent.',
  'No spiritual-bypass vocabulary. No "manifest", "abundance", "vibration", "alignment-with-universe" without grounding.',
  'No public letter without explicit opt-in. Every Palace Review is private by default.',
  'No higher cadence pulled forward. Monthly waits for the weekly to prove itself.',
  'No hagiography. A blessed thing is named, not celebrated.',
];

const stats = [
  { label: 'Operating systems composed', value: '8' },
  { label: 'Days of composition', value: '~90' },
  { label: 'Founding witness filed', value: '2026-05-03' },
  { label: 'Active cadence', value: 'Weekly' },
];

export default function ChroniclePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      <ArticleJsonLd />

      {/* Back link */}
      <div className="max-w-6xl mx-auto px-6 pt-28 pb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          Home
        </Link>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="relative max-w-5xl mx-auto px-6 pt-12 pb-16">
          <p className="text-[11px] uppercase tracking-[0.3em] text-amber-400/70 mb-6">
            The Starlight Chronicle
          </p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] mb-8">
            What was built. What is whole. What can be left alone.
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed">
            A practice of witnessing. The reflective layer of the FrankX OS. Below: the State of the Palace as it stands on Sunday, 2026-05-03.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto px-6 pb-12">
          <div className="aspect-[16/9] relative rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
            <Image
              src="/images/chronicle/state-of-the-palace-hero.jpg"
              alt="A still architectural courtyard at dawn — eight stone arches arranged in a wide arc, soft warm light breaking from behind the central arch"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>
          <p className="text-xs text-white/30 mt-4 text-center italic">
            The State of the Palace — 2026-05-03 · the founding witness
          </p>
        </div>

        {/* Stat row */}
        <div className="max-w-5xl mx-auto px-6 pb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 border border-white/5 rounded-xl overflow-hidden">
            {stats.map((s) => (
              <div key={s.label} className="bg-[#0a0a0b] p-6">
                <div className="text-2xl md:text-3xl font-bold text-amber-300 font-mono mb-2">{s.value}</div>
                <div className="text-[11px] uppercase tracking-[0.2em] text-white/40">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE STATE OF THE PALACE — centerpiece */}
      <section className="border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <p className="text-[11px] uppercase tracking-[0.3em] text-amber-400/70 mb-4">
            The State of the Palace · 2026-05-03
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 max-w-3xl">
            Eight pillars. One palace. Whole at this moment.
          </h2>
          <p className="text-white/60 max-w-2xl leading-relaxed mb-12">
            This is not a roadmap. It is not a backlog. It is a witness. Each pillar below is publicly visible. Each is, on this Sunday, ratified as <em>whole at this moment</em> — further iteration would be creator-restlessness, not improvement.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            {pillars.map((p) => (
              <Link
                key={p.n}
                href={p.href}
                className="group p-6 rounded-xl border border-white/10 bg-[#0a0a0b] hover:border-amber-400/30 hover:bg-white/[0.03] transition-colors"
              >
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="text-amber-400/50 text-xs font-mono">{p.n}</span>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-white/40">{p.role}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-amber-300 transition-colors">{p.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{p.body}</p>
                <p className="text-xs text-amber-400/40 mt-4 group-hover:text-amber-300 transition-colors font-mono">{p.href} →</p>
              </Link>
            ))}
          </div>

          {/* Substrate triple */}
          <div className="mt-16 p-8 rounded-xl border border-white/10 bg-[#0a0a0b]">
            <p className="text-[11px] uppercase tracking-[0.3em] text-white/40 mb-4">Beneath the pillars</p>
            <h3 className="text-xl font-bold mb-3">The substrate triple — ratified 2026-05-03</h3>
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-2xl">
              The layer model is no longer informal. Every skill, command, and agent now declares or refuses inheritance from each layer with a single line.
            </p>
            <div className="flex flex-wrap items-center gap-2 font-mono text-sm">
              <span className="px-3 py-1.5 rounded bg-white/5 border border-white/10 text-white/70">arcanea-meta</span>
              <span className="text-white/30">←</span>
              <span className="px-3 py-1.5 rounded bg-white/5 border border-white/10 text-white/70">creator-meta</span>
              <span className="text-white/30">←</span>
              <span className="px-3 py-1.5 rounded bg-amber-400/10 border border-amber-400/30 text-amber-300">frankx-meta</span>
            </div>
            <p className="text-xs text-white/40 mt-4">
              <span className="text-white/60">universal</span> ← <span className="text-white/60">any creator</span> ← <span className="text-amber-300/70">this creator</span>
            </p>
          </div>

          {/* The blessing */}
          <div className="mt-12 p-8 rounded-xl border border-amber-400/20 bg-amber-400/[0.02]">
            <p className="text-[11px] uppercase tracking-[0.3em] text-amber-400/70 mb-4">The blessing</p>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed italic max-w-3xl">
              "Each of the systems above is, at this moment, blessed. This means precisely: <span className="text-amber-200 not-italic">whole</span>. Further iteration is creator-restlessness, not improvement. Future-you may extend it from a new vantage; present-you does not."
            </p>
            <p className="text-xs text-white/40 mt-4">— from <em>State of the Palace</em>, founding witness, 2026-05-03</p>
          </div>
        </div>
      </section>

      {/* Two surfaces */}
      <section>
        <div className="max-w-5xl mx-auto px-6 py-20">
          <p className="text-[11px] uppercase tracking-[0.3em] text-white/40 mb-4">Two surfaces</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Changelog stays factual. Chronicle stays reflective.
          </h2>
          <p className="text-white/50 max-w-2xl mb-12">
            Both live on the site. Different registers. The Chronicle reflects on top of the auto-maintained Changelog underneath.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <Link
              href="/changelog"
              className="group block p-8 rounded-xl border border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04] transition-colors"
            >
              <p className="text-[10px] uppercase tracking-[0.25em] text-white/40 mb-3">Factual</p>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-amber-300 transition-colors">Changelog →</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                What shipped this week. Auto-mined from git history across canonical repos every Sunday. Currently 62 entries for week 2026-W18.
              </p>
            </Link>
            <Link
              href="/chronicle"
              className="group block p-8 rounded-xl border border-amber-400/20 bg-amber-400/[0.02] hover:border-amber-400/40 transition-colors"
            >
              <p className="text-[10px] uppercase tracking-[0.25em] text-amber-300/60 mb-3">Reflective</p>
              <h3 className="text-2xl font-bold mb-3 text-amber-300">Chronicle (you are here)</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                What was witnessed. Sunday cadence. Sovereign voice. Reflects on top of the changelog; never duplicates it.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Cadences */}
      <section className="border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <p className="text-[11px] uppercase tracking-[0.3em] text-white/40 mb-4">The four cadences</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">A cadence for each shape of legibility.</h2>
          <p className="text-white/50 max-w-2xl mb-12">
            Only the weekly is active. Each higher cadence waits for the one below it to prove itself. Anti-leverage to pull them forward.
          </p>
          <div className="space-y-4">
            {cadences.map((c) => (
              <div
                key={c.index}
                className={`grid md:grid-cols-[auto,1fr,auto] gap-6 p-6 rounded-xl border ${
                  c.state === 'active' ? 'border-amber-400/30 bg-amber-400/[0.03]' : 'border-white/10 bg-white/[0.02]'
                }`}
              >
                <div className="text-amber-400/60 text-xs font-mono mt-1">{c.index}</div>
                <div>
                  <div className="flex flex-wrap items-baseline gap-3 mb-2">
                    <h3 className="text-xl font-bold">{c.title}</h3>
                    <span className="text-xs text-white/40">{c.when} · {c.voice}</span>
                    {c.state === 'active' && (
                      <span className="text-[10px] uppercase tracking-wider text-amber-300/80 px-2 py-0.5 rounded bg-amber-400/10 border border-amber-400/20">Active</span>
                    )}
                    {c.state === 'gated' && (
                      <span className="text-[10px] uppercase tracking-wider text-white/40 px-2 py-0.5 rounded bg-white/5 border border-white/10">Gated</span>
                    )}
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed">{c.body}</p>
                </div>
                <code className="text-xs text-amber-300/80 self-start mt-1 font-mono">{c.command}</code>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section>
        <div className="max-w-5xl mx-auto px-6 py-20">
          <p className="text-[11px] uppercase tracking-[0.3em] text-white/40 mb-4">Three claims</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">The principles. Each defensible. None metaphysical.</h2>
          <p className="text-white/50 max-w-2xl mb-12">
            Whatever spiritual or scientific frame you privately hold sits behind these three without needing to be argued.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {principles.map((p, i) => (
              <div key={i} className="p-6 rounded-xl border border-white/10">
                <h3 className="text-base font-bold mb-3 text-amber-300">{p.head}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lineage */}
      <section className="border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-3xl mx-auto px-6 py-20">
          <p className="text-[11px] uppercase tracking-[0.3em] text-white/40 mb-4">The lineage</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">The practice is not invented.</h2>
          <p className="text-white/60 leading-relaxed mb-10">
            The Stoics did the evening review. Christian monastics kept the Examen. Jews keep Sabbath. Engineers do postmortems. Buddhists do sangha ratification. They all encode the same insight — that the work of witnessing is its own work, and complex systems become legible only at the right cadence.
          </p>
          <ul className="divide-y divide-white/5 border-y border-white/5">
            {lineage.map((l, i) => (
              <li key={i} className="py-3 flex justify-between text-sm">
                <span className="text-white/80">{l.tradition}</span>
                <span className="text-white/40">{l.form}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Refusals */}
      <section>
        <div className="max-w-3xl mx-auto px-6 py-20">
          <p className="text-[11px] uppercase tracking-[0.3em] text-white/40 mb-4">What the practice refuses</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-8">The refusals are load-bearing.</h2>
          <ul className="space-y-3">
            {refusals.map((r, i) => (
              <li key={i} className="flex gap-4 text-white/70 text-sm leading-relaxed">
                <span className="text-amber-400/40 font-mono mt-1">—</span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Where the rest lives */}
      <section className="border-t border-white/5 bg-white/[0.02]">
        <div className="max-w-3xl mx-auto px-6 py-20">
          <p className="text-[11px] uppercase tracking-[0.3em] text-white/40 mb-4">Where to read on</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-8">The witness, the changelog, the source.</h2>
          <ul className="space-y-4 text-white/70 text-sm leading-relaxed">
            <li>
              <span className="text-white/40">Public ·</span>{' '}
              <Link href="/changelog" className="text-amber-300 hover:underline">/changelog</Link>{' '}
              — the factual auto-maintained shipping log. Currently fresh through 2026-W18.
            </li>
            <li>
              <span className="text-white/40">Public ·</span>{' '}
              <Link href="/acos/agents" className="text-amber-300 hover:underline">/acos/agents</Link>{' '}
              — the 99-agent catalog (the most representative single proof of the composed palace).
            </li>
            <li>
              <span className="text-white/40">Public ·</span>{' '}
              <Link href="/library/approach" className="text-amber-300 hover:underline">/library/approach</Link>{' '}
              — sister manifesto, same restraint-first register.
            </li>
            <li>
              <span className="text-white/40">Public source ·</span>{' '}
              <a href="https://github.com/frankxai/Starlight-Intelligence-System" target="_blank" rel="noopener" className="text-amber-300 hover:underline">github.com/frankxai/Starlight-Intelligence-System</a>{' '}
              — the substrate underneath the palace, MIT.
            </li>
            <li className="text-white/50 italic">
              Private · weekly Palace Reviews live in Frank&apos;s personal vault. Each is private by default; any single one may be published as a Witness Letter when explicitly opted in. None published yet.
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
