import Link from "next/link";
import type { ReactNode } from "react";

type FutureEssayProps = {
  eyebrow: string;
  title: string;
  accent: string;
  dek: string;
  published: string;
  readingTime: string;
  children: ReactNode;
};

export function FutureEssay({
  eyebrow,
  title,
  accent,
  dek,
  published,
  readingTime,
  children,
}: FutureEssayProps) {
  return (
    <main className="min-h-screen bg-void text-slate-100">
      <header className="border-b border-white/10 px-5 pb-20 pt-28 md:px-8 md:pb-28 md:pt-40">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1fr_310px] lg:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-400">
              {eyebrow}
            </p>
            <h1 className="mt-8 max-w-5xl font-display text-5xl font-semibold leading-[0.96] tracking-[-0.055em] text-white sm:text-7xl lg:text-8xl">
              {title}
              <br />
              <span className="font-serif font-normal italic text-emerald-300">
                {accent}
              </span>
            </h1>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-300 md:text-xl">
              {dek}
            </p>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.12em] text-slate-500">
              <span>Frank Riemer · AI Architect</span>
              <span>{published}</span>
              <span>{readingTime}</span>
            </div>
          </div>
          <div
            className="relative hidden h-72 overflow-hidden border border-white/10 lg:block"
            aria-hidden="true"
          >
            <span className="absolute left-0 top-1/2 h-px w-[46%] bg-emerald-300" />
            <span className="absolute left-[42%] top-1/2 grid h-16 w-16 -translate-y-1/2 rotate-45 place-items-center border border-emerald-300/50 bg-emerald-300/[0.08] font-serif text-xl italic text-emerald-300">
              F
            </span>
            <span className="absolute left-[56%] top-1/2 h-px w-3/4 origin-left -rotate-[13deg] bg-cyan-400/70" />
            <span className="absolute left-[56%] top-1/2 h-px w-3/4 origin-left rotate-[9deg] bg-emerald-300/70" />
            <span className="absolute bottom-5 left-5 font-mono text-[9px] uppercase tracking-[0.18em] text-slate-600">
              One claim / several consequences
            </span>
          </div>
        </div>
      </header>

      <article className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[180px_minmax(0,760px)] lg:justify-center">
          <aside className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-600 lg:sticky lg:top-28 lg:self-start">
            <p>Filed under</p>
            <p className="mt-3 text-slate-400">Intelligence sovereignty</p>
            <Link
              href="/the-future-we-choose"
              className="mt-8 inline-block text-emerald-400 underline decoration-emerald-400/30 underline-offset-8"
            >
              The larger thesis
            </Link>
          </aside>
          <div className="future-prose space-y-16">{children}</div>
        </div>
      </article>

      <section className="border-t border-white/10 bg-white/[0.025] px-5 py-20 text-center md:px-8 md:py-28">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-emerald-400">
          The Starlight portfolio
        </p>
        <h2 className="mx-auto mt-6 max-w-4xl font-display text-4xl font-semibold tracking-[-0.04em] text-white md:text-6xl">
          The frontier labs are accelerating intelligence. We are building for
          the people who will direct it.
        </h2>
        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/the-future-we-choose"
            className="rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-void"
          >
            Read the founder position
          </Link>
          <a
            href="https://starlight-intelligence.vercel.app/constitution"
            className="text-sm font-semibold text-slate-300 underline decoration-white/20 underline-offset-8"
          >
            Read the Starlight Accord
          </a>
        </div>
      </section>
    </main>
  );
}

export function EssaySection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="font-display text-3xl font-semibold leading-tight tracking-[-0.035em] text-white md:text-5xl">
        {title}
      </h2>
      <div className="mt-7 space-y-6 text-lg leading-8 text-slate-300 [&_strong]:font-semibold [&_strong]:text-white [&_a]:text-emerald-300 [&_a]:underline [&_a]:decoration-emerald-300/30 [&_a]:underline-offset-4 [&_li]:mb-3">
        {children}
      </div>
    </section>
  );
}

export function PullQuote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="border-l-2 border-emerald-300 pl-7 font-serif text-3xl italic leading-tight text-white md:text-4xl">
      {children}
    </blockquote>
  );
}

export function Sources({ children }: { children: ReactNode }) {
  return (
    <section className="border-t border-white/10 pt-10">
      <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-slate-500">
        Primary sources
      </h2>
      <ul className="mt-6 space-y-4 text-sm leading-6 text-slate-400 [&_a]:text-slate-300 [&_a]:underline [&_a]:decoration-white/20 [&_a]:underline-offset-4">
        {children}
      </ul>
    </section>
  );
}
