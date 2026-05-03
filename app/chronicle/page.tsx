import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

const SITE_URL = 'https://frankx.ai';

export const metadata: Metadata = {
  title: 'The Starlight Chronicle — A Practice of Witnessing | FrankX',
  description:
    'A four-cadence reflective practice for creators with composed systems. Weekly Palace Review, monthly Survey, quarterly Constellation Census, annual Legacy Audit. The reflective layer of the FrankX OS.',
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
      'The reflective layer of the FrankX OS. Four cadences. One discipline: witness what was built; bless what is whole; orient the next move.',
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
        headline: 'The Starlight Chronicle — A Practice of Witnessing',
        description:
          'A four-cadence reflective practice for creators with composed systems. Witness what was built; bless what is whole; orient the next move.',
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

const cadences = [
  {
    index: '01',
    title: 'Weekly — Palace Review',
    when: 'Sunday',
    voice: 'Palace Architect',
    body: 'What to bless, what to ignore, the one highest-leverage path for Monday. Six sections; 800–1500 words; surgical, not exhaustive. The active cadence.',
    command: '/palace',
  },
  {
    index: '02',
    title: 'Monthly — Survey',
    when: 'First Sunday',
    voice: 'Horizon Surveyor',
    body: 'The shape of the month. Themes, drift, the systems that grew quiet and the ones that found their voice. Activates after four weekly Palace Reviews have proven the cadence.',
    command: '/chronicle month',
  },
  {
    index: '03',
    title: 'Quarterly — Constellation Census',
    when: 'Solstice-adjacent',
    voice: 'Constellation Cartographer',
    body: 'What is alive. What is decaying. What is emerging. The kill / keep / promote ritual. Activates only after three months of monthly cadence.',
    command: '/chronicle quarter',
  },
  {
    index: '04',
    title: 'Annual — Legacy Audit',
    when: 'Winter solstice',
    voice: 'Legacy Chronicler',
    body: 'What of this year matters in ten years. The through-line. Activates only when the calendar reaches December 21.',
    command: '/chronicle year',
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

const layers = [
  {
    title: 'Changelog',
    href: '/changelog',
    role: 'Factual',
    body: 'What shipped this week. Auto-mined from git history across canonical repos. Conventional-commit prefixes detected. Never stale by design.',
  },
  {
    title: 'Chronicle',
    href: '/chronicle',
    role: 'Reflective',
    body: 'What was witnessed. Sunday cadence. Sovereign voice. Reflects on top of the changelog; never duplicates it.',
  },
];

const refusals = [
  'No auto-fire hook. The ritual is invoked, not pushed. Skipped Sundays are silent.',
  'No spiritual-bypass vocabulary. No "manifest", "abundance", "vibration", "alignment-with-universe" without grounding.',
  'No public letter without explicit opt-in. Every Palace Review is private by default.',
  'No higher cadence pulled forward. Monthly waits for the weekly to prove itself.',
  'No hagiography. A blessed thing is named, not celebrated.',
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
        <div className="relative max-w-5xl mx-auto px-6 pt-12 pb-20">
          <p className="text-[11px] uppercase tracking-[0.3em] text-amber-400/70 mb-6">
            The Starlight Chronicle
          </p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] mb-8">
            A practice of <span className="text-amber-300">witnessing</span> the work that has been built.
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed">
            Four cadences. One discipline. Weekly, monthly, quarterly, annual — the shapes a complex system needs in order to remain legible to itself. The reflective layer of the FrankX OS.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto px-6 pb-24">
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
      </section>

      {/* Two layers */}
      <section className="border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <p className="text-[11px] uppercase tracking-[0.3em] text-white/40 mb-4">Two surfaces</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Changelog stays factual. Chronicle stays reflective.
          </h2>
          <p className="text-white/50 max-w-2xl mb-12">
            Both surfaces live on the site. Different registers. No duplication. The Chronicle reflects on top of the auto-maintained Changelog underneath.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {layers.map((l) => (
              <Link
                key={l.title}
                href={l.href}
                className="group block p-8 rounded-xl border border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04] transition-colors"
              >
                <p className="text-[10px] uppercase tracking-[0.25em] text-white/40 mb-3">{l.role}</p>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-amber-300 transition-colors">{l.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{l.body}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Cadences */}
      <section>
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
                className="grid md:grid-cols-[auto,1fr,auto] gap-6 p-6 rounded-xl border border-white/10 bg-white/[0.02]"
              >
                <div className="text-amber-400/60 text-xs font-mono mt-1">{c.index}</div>
                <div>
                  <div className="flex flex-wrap items-baseline gap-3 mb-2">
                    <h3 className="text-xl font-bold">{c.title}</h3>
                    <span className="text-xs text-white/40">{c.when} · {c.voice}</span>
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
      <section className="border-y border-white/5 bg-white/[0.02]">
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
      <section>
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
      <section className="border-y border-white/5 bg-white/[0.02]">
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

      {/* Bottom CTA */}
      <section>
        <div className="max-w-3xl mx-auto px-6 py-24 text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-white/40 mb-6">Where to begin</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">The cadence resumes Sunday.</h2>
          <p className="text-white/60 leading-relaxed mb-10 max-w-xl mx-auto">
            The founding witness — <em>State of the Palace</em> — is filed. Each Sunday from now produces a Palace Review. Most stay private. Some become Witness Letters. None are automatic.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link
              href="/changelog"
              className="px-5 py-3 rounded-lg border border-white/15 hover:border-white/30 transition-colors"
            >
              See what shipped → Changelog
            </Link>
            <Link
              href="/os"
              className="px-5 py-3 rounded-lg border border-amber-400/30 bg-amber-400/5 text-amber-300 hover:border-amber-400/50 transition-colors"
            >
              See what was built → FrankX OS
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
