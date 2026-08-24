'use client';

import Image from 'next/image';
import Link from 'next/link';
import LanguageToggle from './LanguageToggle';
import { familyCopy } from './story-content';
import { useFamilyLocale } from './useFamilyLocale';

const children = [
  { slug: 'amilina', glyph: 'A', hue: 'from-rose-300/20 via-amber-200/5' },
  { slug: 'alea-sophia', glyph: 'AS', hue: 'from-sky-300/20 via-violet-300/5' },
  { slug: 'david', glyph: 'D', hue: 'from-amber-300/25 via-orange-300/5' },
  { slug: 'adam', glyph: 'A', hue: 'from-emerald-300/20 via-lime-200/5' },
] as const;

export default function FamilyBooksHub() {
  const { locale, setLocale } = useFamilyLocale();
  const copy = familyCopy[locale];

  return (
    <main
      lang={locale}
      className="relative min-h-screen overflow-hidden bg-[#090908] text-stone-100"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(251,191,36,0.13),transparent_32%),radial-gradient(circle_at_8%_70%,rgba(244,114,182,0.08),transparent_26%),radial-gradient(circle_at_90%_74%,rgba(52,211,153,0.07),transparent_26%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(255,255,255,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.5)_1px,transparent_1px)] [background-size:80px_80px]" />

      <div className="relative mx-auto max-w-6xl px-5 pb-24 pt-20 sm:px-8 sm:pt-24 lg:px-10">
        <nav className="mb-16 flex items-center justify-between gap-4" aria-label="Family library navigation">
          <Link
            href="/books"
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/10 px-4 text-sm font-medium text-stone-300 transition-colors hover:border-white/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
          >
            <span aria-hidden="true">←</span>
            {copy.back}
          </Link>
          <LanguageToggle
            locale={locale}
            onChange={setLocale}
            label={copy.language}
          />
        </nav>

        <header className="max-w-4xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-amber-300/80">
            {copy.eyebrow}
          </p>
          <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-[-0.035em] text-balance sm:text-6xl lg:text-7xl">
            {copy.title}
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-stone-300 sm:text-xl">
            {copy.intro}
          </p>
        </header>

        <section className="mt-14 grid gap-5 sm:grid-cols-2" aria-label={copy.eyebrow}>
          {children.map((child, index) => {
            const details = copy.children[child.slug];
            const ready = child.slug === 'david';
            const href = `/books/family/${child.slug}`;

            return (
              <Link
                key={child.slug}
                href={href}
                className={`group relative min-h-[310px] overflow-hidden rounded-[2rem] border p-7 transition-[transform,border-color,background-color] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 sm:p-8 ${
                  ready
                    ? 'border-amber-200/25 bg-amber-100/[0.07] hover:-translate-y-1 hover:border-amber-200/45'
                    : 'border-white/10 bg-white/[0.035] hover:-translate-y-1 hover:border-white/20'
                }`}
              >
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${child.hue} to-transparent opacity-80`}
                />
                {ready && (
                  <Image
                    src="/images/books/family/david/cover.webp"
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover object-[50%_38%] opacity-35 transition-transform duration-700 group-hover:scale-[1.025]"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0907] via-[#0a0907]/75 to-transparent" />

                <div className="relative flex h-full min-h-[254px] flex-col justify-between">
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex h-12 min-w-12 items-center justify-center rounded-2xl border border-white/10 bg-black/35 px-2 font-display text-lg font-semibold text-stone-100 backdrop-blur">
                      {child.glyph}
                    </span>
                    <span
                      className={`rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.13em] ${
                        ready
                          ? 'border-amber-200/30 bg-amber-200/10 text-amber-200'
                          : 'border-white/10 bg-black/20 text-stone-400'
                      }`}
                    >
                      {ready ? copy.available : copy.growing}
                    </span>
                  </div>

                  <div>
                    <p className="mb-2 text-xs tabular-nums text-stone-500">0{index + 1}</p>
                    <h2 className="font-display text-3xl font-semibold tracking-[-0.025em] text-white">
                      {details.name}
                    </h2>
                    <p className="mt-3 max-w-md text-sm leading-6 text-stone-300">
                      {details.note}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-amber-200">
                      {ready ? copy.open : copy.growing}
                      <span
                        aria-hidden="true"
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </section>

        <p className="mt-8 text-sm text-stone-500">{copy.privacy}</p>
      </div>
    </main>
  );
}
