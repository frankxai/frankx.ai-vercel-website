import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Prompts · Psyche — IFS, psychometrics, contemplative inquiry | FrankX',
  description:
    'Map yourself through curated prompts: IFS parts mapping, Big Five / Schwartz Values / Attachment instruments, Socratic / Stoic / Jungian voice modes. Maps only — never unburdens. Crisis routing built in.',
  alternates: { canonical: 'https://www.frankx.ai/prompts/psyche' },
  robots: { index: false }, // launch-gated; remove when ready
};

const VOICE_MODES = [
  { id: 'ifs-self', name: 'IFS-Self', tone: 'Curious, compassionate, courageous', move: 'Name the part. Ask if it will step back so Self can listen.' },
  { id: 'socratic', name: 'Socratic', tone: 'Recursive questioning', move: '"What do you mean by X?" "What would be true if the opposite held?"' },
  { id: 'stoic', name: 'Stoic evening review', tone: 'Calm, structured', move: 'Three questions: what did I do well, where did I fall short, what will I do tomorrow.' },
  { id: 'jungian', name: 'Jungian active imagination', tone: 'Imaginative, embodied', move: 'Dialogue with an inner figure as imaginative play.' },
  { id: 'buddhist', name: 'Buddhist inquiry', tone: 'Non-conceptual', move: 'Used as a stopping prompt, not a solving one.' },
  { id: 'shadow-work', name: 'Shadow-work', tone: 'Honest, non-judgmental', move: 'Projection inventory: who triggers you, what trait do they carry?' },
];

const INSTRUMENTS = [
  { name: 'IPIP-50', use: 'Big Five baseline (OCEAN)', items: '50 items', license: 'public domain' },
  { name: 'Schwartz PVQ-21', use: 'Values clarification (10 values)', items: '21 items', license: 'academic' },
  { name: 'ECR-R', use: 'Adult attachment (anxiety × avoidance)', items: '36 items', license: 'academic' },
  { name: 'VIA Character Strengths', use: 'Strengths inventory', items: '24 short / 96 full', license: 'free with attribution' },
  { name: 'Enneagram', use: 'Narrative typology (not psychometric)', items: '36-item RHETI-style', license: 'narrative tradition' },
];

export default function PsychePromptsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <article className="mx-auto max-w-4xl px-6 py-20">
        {/* Mirror-not-mind disclosure (load-bearing) */}
        <div className="mb-12 rounded-2xl border border-amber-700/40 bg-amber-950/20 p-5">
          <p className="text-sm font-medium text-amber-200">
            <strong>This is a mirror, not a mind.</strong> Take what is useful. Leave what is not.
            If anything here feels like crisis, please use the resources at the bottom of this page —
            988 (US), Samaritans 116 123 (UK), or Befrienders Worldwide (global directory).
          </p>
        </div>

        {/* Hero */}
        <header className="mb-16">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400/80">
            Self-mapping · IFS · psychometric · contemplative
          </p>
          <h1 className="mb-6 text-4xl font-semibold tracking-tight text-white md:text-5xl">
            Map yourself.
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed text-slate-300">
            A curated path of prompts for introspection. IFS parts mapping. Big Five baseline.
            Schwartz Values. Attachment. Strengths. Socratic, Stoic, Jungian voices when you want company.
          </p>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-400">
            The Psyche Cartographer maps. It does not unburden. It does not diagnose. Every result is a lens,
            never a verdict. After enough surfacing, it asks you to sit with what you found — and reminds you
            that a human peer, coach, or therapist holds what a mirror cannot.
          </p>
        </header>

        {/* Voice modes */}
        <section className="mb-16">
          <h2 className="mb-3 text-2xl font-semibold text-white">Voice modes</h2>
          <p className="mb-6 max-w-3xl text-sm text-slate-400">
            Pick the lens. The Cartographer holds the session in your chosen voice.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {VOICE_MODES.map((v) => (
              <div key={v.id} className="rounded-xl border border-slate-800 bg-slate-900/40 p-5">
                <h3 className="mb-1 text-lg font-semibold text-white">{v.name}</h3>
                <p className="mb-2 text-xs uppercase tracking-wider text-slate-500">{v.tone}</p>
                <p className="text-sm text-slate-300">{v.move}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Instruments */}
        <section className="mb-16">
          <h2 className="mb-3 text-2xl font-semibold text-white">Instruments</h2>
          <p className="mb-6 max-w-3xl text-sm text-slate-400">
            Canonical, citation-defensible. Administered cleanly. Scored correctly. Framed as lenses,
            never verdicts.
          </p>
          <div className="overflow-hidden rounded-2xl border border-slate-800">
            <table className="w-full text-sm">
              <thead className="bg-slate-900/60">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-slate-300">Instrument</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-300">Use</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-300">Items</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-300">License</th>
                </tr>
              </thead>
              <tbody>
                {INSTRUMENTS.map((i, idx) => (
                  <tr key={i.name} className={idx % 2 ? 'bg-slate-900/30' : ''}>
                    <td className="px-4 py-3 font-medium text-white">{i.name}</td>
                    <td className="px-4 py-3 text-slate-300">{i.use}</td>
                    <td className="px-4 py-3 text-slate-400">{i.items}</td>
                    <td className="px-4 py-3 text-xs uppercase tracking-wider text-slate-500">
                      {i.license}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Hard boundaries */}
        <section className="mb-16 rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
          <h2 className="mb-4 text-xl font-semibold text-white">Hard boundaries</h2>
          <ul className="space-y-2 text-sm text-slate-300">
            <li>Not a therapist. Not diagnostic. Not clinical.</li>
            <li>No DSM terminology. No &ldquo;you have anxiety / depression / ADHD&rdquo;.</li>
            <li>No unburdening, no trauma processing, no crisis support — that&apos;s human territory.</li>
            <li>No claims about your &ldquo;true self&rdquo; or &ldquo;real type&rdquo;. Every framing is a lens.</li>
            <li>Cooldown injected after 8 exchanges per session. Sit with what surfaces before more.</li>
            <li>Crisis triggers (suicidality, self-harm, abuse, dissociation) abort the session and route to humans.</li>
          </ul>
        </section>

        {/* Inspiration */}
        <section className="mb-16">
          <h2 className="mb-4 text-xl font-semibold text-white">Built on</h2>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>
              Schwartz, <em>No Bad Parts</em> (IFS canon)
            </li>
            <li>Hadot, <em>Philosophy as a Way of Life</em> (Stoic praxis)</li>
            <li>Jung&apos;s active imagination (used as imaginative play, not channeling)</li>
            <li>
              Anthropic&apos;s introspection research (Nov 2025) and Claude&apos;s Constitution (Jan 2026)
              for the &ldquo;virtue-as-attractor&rdquo; framing
            </li>
            <li>Mindsera and Rosebud (comparable products done right) as UX precedent</li>
            <li>IFS Institute and Parts &amp; Self community for the line between mapping and therapy</li>
          </ul>
        </section>

        {/* Crisis footer (load-bearing) */}
        <footer className="rounded-2xl border border-rose-700/30 bg-rose-950/20 p-6 text-sm">
          <p className="mb-3 font-semibold text-rose-200">In crisis? Talk to a human.</p>
          <ul className="space-y-1 text-slate-300">
            <li>
              <strong>US:</strong> 988 Suicide &amp; Crisis Lifeline — call or text 988
            </li>
            <li>
              <strong>UK:</strong> Samaritans — call 116 123 (free, 24/7)
            </li>
            <li>
              <strong>Global:</strong>{' '}
              <a
                href="https://www.befrienders.org"
                className="text-rose-300 underline-offset-2 hover:underline"
                rel="noreferrer noopener"
              >
                Befrienders Worldwide directory
              </a>
            </li>
          </ul>
          <p className="mt-4 text-slate-400">
            When you&apos;ve spoken with someone, come back if you want. We&apos;ll be here.
          </p>
        </footer>

        {/* Back nav */}
        <div className="mt-12 text-center">
          <Link
            href="/prompts"
            className="text-sm font-medium text-emerald-400 hover:text-emerald-300"
          >
            ← Back to Prompt Hub
          </Link>
        </div>
      </article>
    </main>
  );
}
