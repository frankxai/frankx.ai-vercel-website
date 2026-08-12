import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Future We Choose",
  description:
    "Frank Riemer’s founder position on personal superintelligence, human capability, intelligence sovereignty, and the Starlight portfolio.",
  alternates: { canonical: "https://frankx.ai/the-future-we-choose" },
  openGraph: {
    title: "The Future We Choose",
    description: "Superintelligence should not make humanity a spectator.",
    url: "https://frankx.ai/the-future-we-choose",
    type: "article",
  },
};

const questions = [
  "Who owns the memory?",
  "Who sets the objective?",
  "Who can inspect the action?",
  "Who benefits when it succeeds?",
  "Who carries responsibility when it fails?",
  "Can the person move, refuse, correct, and recover?",
];

const ventures = [
  [
    "Starlight Intelligence",
    "The constitutional and intelligence layer",
    "A mission house for portable context, human capability, plural intelligence, education, and public standards.",
    "https://starlight-intelligence.vercel.app/constitution",
  ],
  [
    "GenCreator",
    "Creative and economic agency",
    "A creator instrument for source, voice, provenance, approval, reusable workflows, and work people can own.",
    "https://gencreator.ai/creator-sovereignty",
  ],
  [
    "Arcanea",
    "Imagination and cultural possibility",
    "Living worlds and creative protocols through which people can examine futures worth choosing.",
    "https://arcanea.ai/imagination-charter",
  ],
];

export default function FutureWeChoosePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "The Future We Choose",
    description: "A founder position on intelligence in service of life.",
    datePublished: "2026-08-12",
    dateModified: "2026-08-12",
    author: {
      "@type": "Person",
      name: "Frank Riemer",
      url: "https://frankx.ai",
    },
    publisher: {
      "@type": "Organization",
      name: "FrankX",
      url: "https://frankx.ai",
    },
    mainEntityOfPage: "https://frankx.ai/the-future-we-choose",
  };
  return (
    <main className="min-h-screen bg-void text-slate-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <section className="border-b border-white/10 px-5 pb-20 pt-28 md:px-8 md:pb-32 md:pt-44">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-400">
            A founder position · Frank Riemer
          </p>
          <h1 className="mt-8 max-w-6xl font-display text-6xl font-semibold leading-[0.87] tracking-[-0.065em] text-white sm:text-8xl lg:text-[9.5rem]">
            The future
            <br />
            <span className="font-serif font-normal italic text-emerald-300">
              we choose.
            </span>
          </h1>
          <div className="mt-12 grid gap-8 border-t border-white/10 pt-8 lg:grid-cols-[1fr_1fr]">
            <p className="max-w-xl text-xl leading-8 text-slate-200 md:text-2xl">
              Superintelligence should not make humanity a spectator.
            </p>
            <p className="max-w-2xl text-lg leading-8 text-slate-400">
              It should give more people the power to invent, create, learn,
              protect what matters, and shape reality deliberately.
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 md:px-8 md:py-32">
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[.58fr_1fr]">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-emerald-400">
              My position
            </p>
            <h2 className="mt-6 font-display text-4xl font-semibold tracking-[-0.04em] text-white md:text-6xl">
              Build human leverage without building human dependence.
            </h2>
          </div>
          <div className="space-y-6 text-lg leading-8 text-slate-300">
            <p>
              I have spent my career inside the systems large institutions use
              to turn technology into leverage. The intelligence age changes who
              can hold that leverage.
            </p>
            <p>
              A small team can now build what once required a company. A creator
              can move from an idea to a world, a product, a film, a curriculum,
              or a community. A student can have a patient teacher. A family can
              have a protective intelligence layer. A scientist can search
              spaces no human team could inspect manually.
            </p>
            <p>
              That is the future I want to accelerate. But access to powerful
              models is not the same as a positive future. Tools can expand
              agency or quietly replace it. Personalization can serve the person
              or deepen enclosure. Automation can release human energy or
              concentrate the gains.
            </p>
            <p className="font-serif text-3xl italic leading-tight text-white md:text-4xl">
              I am optimistic because intelligence can multiply ingenuity. I am
              demanding because optimism without product constraints becomes
              marketing.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025] px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <header className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-400">
              The architecture test
            </p>
            <h2 className="mt-6 font-display text-4xl font-semibold tracking-[-0.04em] text-white md:text-6xl">
              Ask who keeps agency when the system works.
            </h2>
          </header>
          <div className="mt-14 grid border-l border-t border-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {questions.map((question, index) => (
              <div
                key={question}
                className="min-h-52 border-b border-r border-white/10 p-6"
              >
                <span className="font-mono text-[10px] text-emerald-400">
                  0{index + 1}
                </span>
                <p className="mt-16 font-display text-xl font-semibold text-white">
                  {question}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <header className="grid gap-8 lg:grid-cols-2">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-emerald-400">
                One thesis · several ventures
              </p>
              <h2 className="mt-6 font-display text-4xl font-semibold tracking-[-0.04em] text-white md:text-6xl">
                A mission house, not a pile of brands.
              </h2>
            </div>
            <p className="max-w-xl self-end text-lg leading-8 text-slate-400">
              Each venture answers a different part of the same question: how do
              people gain capability from advanced intelligence without
              surrendering authorship, privacy, dignity, or responsibility?
            </p>
          </header>
          <div className="mt-14 divide-y divide-white/10 border-y border-white/10">
            {ventures.map(([name, title, body, href], index) => (
              <a
                key={name}
                href={href}
                className="grid gap-5 py-8 transition hover:bg-white/[0.02] md:grid-cols-[60px_220px_1fr_30px] md:gap-8"
              >
                <span className="font-mono text-xs text-emerald-400">
                  0{index + 1}
                </span>
                <span>
                  <strong className="block font-display text-xl text-white">
                    {name}
                  </strong>
                  <small className="mt-1 block font-mono text-[10px] uppercase tracking-[0.1em] text-slate-600">
                    {title}
                  </small>
                </span>
                <span className="max-w-2xl leading-7 text-slate-400">
                  {body}
                </span>
                <span aria-hidden="true" className="text-emerald-400">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[.6fr_1fr]">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-emerald-400">
              Editorial commitments
            </p>
            <h2 className="mt-6 font-display text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl">
              Wonder without surrendered rigor.
            </h2>
          </div>
          <ol className="divide-y divide-white/10 border-y border-white/10 text-lg text-slate-300">
            {[
              "Separate evidence, inference, conviction, and speculation.",
              "Name the systems, incentives, and tradeoffs behind a claim.",
              "Prefer buildable architectures over abstract forecasts.",
              "Show what has shipped and label what has not.",
              "Treat creators and citizens as principals, never endpoints in someone else’s funnel.",
              "Keep wonder without surrendering rigor.",
            ].map((item, index) => (
              <li key={item} className="grid grid-cols-[35px_1fr] gap-4 py-5">
                <span className="font-mono text-xs text-slate-600">
                  0{index + 1}
                </span>
                {item}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-emerald-300 px-5 py-20 text-void md:px-8 md:py-28">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-xs uppercase tracking-[0.18em]">
            Two essays · One public position
          </p>
          <h2 className="mt-6 max-w-5xl font-display text-4xl font-semibold tracking-[-0.045em] md:text-6xl">
            The future is not something an AI lab gives us. It is what billions
            of people gain the power and protection to build.
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <Link
              href="/insights/meta-the-future-is-for-everyone"
              className="border border-void/20 bg-void p-6 text-white"
            >
              <small className="font-mono text-[10px] uppercase tracking-[0.16em] text-emerald-300">
                Essay 01
              </small>
              <h3 className="mt-10 font-display text-2xl font-semibold">
                What Meta Gets Right—and What Comes Next
              </h3>
            </Link>
            <Link
              href="/insights/from-personal-superintelligence-to-human-sovereignty"
              className="border border-void/20 p-6"
            >
              <small className="font-mono text-[10px] uppercase tracking-[0.16em]">
                Essay 02
              </small>
              <h3 className="mt-10 font-display text-2xl font-semibold">
                From Personal Superintelligence to Human Sovereignty
              </h3>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
