'use client';

import Link from 'next/link';
import LanguageToggle from './LanguageToggle';
import { familyCopy } from './story-content';
import { useFamilyLocale } from './useFamilyLocale';

type FutureSlug = 'amilina' | 'alea-sophia' | 'adam';

export default function FutureStoryPage({ slug }: { slug: FutureSlug }) {
  const { locale, setLocale } = useFamilyLocale();
  const copy = familyCopy[locale];
  const child = copy.children[slug];

  return (
    <main
      lang={locale}
      className="relative grid min-h-[80svh] place-items-center overflow-hidden bg-[#090908] px-5 pb-16 pt-28 text-stone-100 sm:pt-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(251,191,36,0.13),transparent_38%)]" />
      <div className="relative w-full max-w-2xl rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 shadow-2xl backdrop-blur sm:p-12">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/books/family"
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/10 px-4 text-sm text-stone-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
          >
            <span aria-hidden="true">←</span>
            {locale === 'de' ? 'Familienbibliothek' : 'Family library'}
          </Link>
          <LanguageToggle
            locale={locale}
            onChange={setLocale}
            label={copy.language}
            compact
          />
        </div>
        <p className="mt-16 text-xs font-semibold uppercase tracking-[0.25em] text-amber-300/80">
          {copy.growing}
        </p>
        <h1 className="mt-4 font-display text-5xl font-bold tracking-[-0.04em] sm:text-6xl">
          {child.name}
        </h1>
        <p className="mt-6 text-lg leading-8 text-stone-300">{child.note}</p>
        <p className="mt-12 border-l border-amber-300/40 pl-5 text-sm leading-6 text-stone-400">
          {locale === 'de'
            ? 'Der Name ist schon im Regal. Die Geschichte darf in Ruhe wachsen.'
            : 'The name already has a place on the shelf. Its story has room to grow carefully.'}
        </p>
      </div>
    </main>
  );
}
