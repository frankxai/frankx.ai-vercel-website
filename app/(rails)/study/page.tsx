/**
 * /study/ — the quiet aggregator hub.
 *
 * Surfaces the four contemplative rails + canon library + key research and
 * library deep-dives in one place. Frank's private menu entry — not surfaced
 * in main navigation, not promoted, not Google-bait. Direct URL only.
 *
 * Per safety stance: noindex'd alongside the rails. The hub exists so Frank
 * can navigate to his own work without typing six different URLs.
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { ContemplativeReader } from '@/components/rails/ContemplativeReader';
import { RailHubHeader } from '@/components/rails/RailHubHeader';
import { loadAllEntries, sortByDate } from '@/lib/rails/load-entries';
import { loadAllCanon } from '@/lib/rails/load-canon';
import { hubs } from '@/data/rails/hubs';
import { HUB_ORDER, hubUrl } from '@/lib/rails/types';
import { breadcrumbSchema } from '@/lib/rails/schema';
import { traditionLabels } from '@/data/rails/traditions';

const SITE = 'https://frankx.ai';

export const metadata: Metadata = {
  title: 'Study — Notes & Canon | FrankX',
  description:
    'Quiet hub for the contemplative rails — Notes on God / Reality / Consciousness / Faith — plus the canonical thinkers cited across them.',
  alternates: { canonical: `${SITE}/study` },
  robots: { index: false, follow: false },
};

export default function StudyPage() {
  const allEntries = sortByDate(loadAllEntries());
  const canon = loadAllCanon();
  const recentEntries = allEntries.slice(0, 6);

  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      breadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Study', url: '/study' },
      ]),
      {
        '@type': 'CollectionPage',
        name: 'Study',
        description:
          'Aggregator hub for the contemplative rails and canon library on frankx.ai.',
        url: `${SITE}/study`,
      },
    ],
  };

  return (
    <>
      <RailHubHeader />
      <ContemplativeReader>
        <p className="text-[11px] tracking-[0.25em] uppercase text-ink-contemplative-faint not-prose mb-4">
          /study/
        </p>
        <h1>Study</h1>
        <p className="font-serif-editorial italic text-[1.25rem] leading-[1.7] text-ink-contemplative-muted not-prose">
          A quiet hub for the slow work — the four contemplative rails, the canonical thinkers cited across them, and the deep-dives that compose into something like a research life.
        </p>

        <hr />

        <h2>The four rails</h2>
        <div className="not-prose space-y-1">
          {HUB_ORDER.map((slug) => {
            const config = hubs[slug];
            const canonicalCount = allEntries.filter((e) => e.hub === slug).length;
            return (
              <Link
                key={slug}
                href={hubUrl(slug)}
                className="block py-6 border-b border-white/8 group"
              >
                <div className="flex items-baseline justify-between gap-6">
                  <h3 className="font-serif-editorial text-[1.333rem] leading-[1.3] font-semibold text-ink-contemplative group-hover:text-white transition-colors">
                    {config.displayTitle}
                  </h3>
                  <span className="text-[10px] tracking-[0.25em] uppercase text-ink-contemplative-faint shrink-0">
                    {canonicalCount === 0
                      ? 'pending'
                      : `${canonicalCount} ${canonicalCount === 1 ? 'entry' : 'entries'}`}
                  </span>
                </div>
                <p className="mt-2 font-serif-editorial text-[1rem] leading-[1.65] text-ink-contemplative-muted">
                  {config.question}
                </p>
              </Link>
            );
          })}
        </div>

        {recentEntries.length > 0 && (
          <>
            <h2>Recent walks</h2>
            <div className="not-prose space-y-1">
              {recentEntries.map((e) => (
                <Link
                  key={`${e.hub}-${e.slug}`}
                  href={`${hubUrl(e.hub)}/${e.slug}`}
                  className="block py-5 border-b border-white/8 group"
                >
                  <div className="flex items-baseline justify-between gap-6">
                    <h3 className="font-serif-editorial text-[1.0625rem] leading-[1.4] text-ink-contemplative-muted group-hover:text-ink-contemplative">
                      {e.title}
                    </h3>
                    <span className="text-[10px] tracking-[0.25em] uppercase text-ink-contemplative-faint shrink-0">
                      /on-{e.hub}/
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

        <h2>The canon</h2>
        <p className="not-prose font-serif-editorial text-[1rem] leading-[1.65] text-ink-contemplative-muted mb-4">
          Mystics, sages, philosophers, and physicists cited across the rails. One canonical page per voice, with central claims, key works, and back-references to the entries that cite them.
        </p>
        <div className="not-prose space-y-1">
          {canon.map((c) => (
            <Link
              key={c.slug}
              href={`/canon/${c.slug}`}
              className="block py-4 border-b border-white/8 group"
            >
              <div className="flex items-baseline justify-between gap-6">
                <span className="font-serif-editorial text-[1.0625rem] text-ink-contemplative-muted group-hover:text-ink-contemplative">
                  {c.name}
                </span>
                <span className="text-[10px] tracking-[0.25em] uppercase text-ink-contemplative-faint shrink-0">
                  {traditionLabels[c.tradition]}
                </span>
              </div>
            </Link>
          ))}
          <Link
            href="/canon"
            className="block py-5 mt-2 text-[11px] tracking-[0.25em] uppercase text-ink-contemplative-muted hover:text-ink-contemplative"
          >
            All canon &rarr;
          </Link>
        </div>

        <h2>Companion systems</h2>
        <p className="not-prose font-serif-editorial text-[1rem] leading-[1.65] text-ink-contemplative-muted mb-4">
          The rails cite books I&rsquo;ve reviewed in the Library, and questions I&rsquo;ve tracked in the Research Hub. The three together compose into something like a research life.
        </p>
        <ul className="not-prose space-y-3">
          <li>
            <Link
              href="/library"
              className="font-serif-editorial text-[1.0625rem] text-ink-contemplative-muted hover:text-ink-contemplative underline underline-offset-4 decoration-ink-contemplative-faint"
            >
              Library &mdash; book reviews and key insights
            </Link>
          </li>
          <li>
            <Link
              href="/research"
              className="font-serif-editorial text-[1.0625rem] text-ink-contemplative-muted hover:text-ink-contemplative underline underline-offset-4 decoration-ink-contemplative-faint"
            >
              Research Hub &mdash; daily intelligence operations
            </Link>
          </li>
        </ul>

        <hr />

        <p className="text-[11px] tracking-[0.25em] uppercase text-ink-contemplative-faint">
          /study/ is noindexed and unlinked from the main navigation. Direct URL only. License on prose: CC BY-NC-ND 4.0.
        </p>
      </ContemplativeReader>
      <Script
        id="ld-study"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
    </>
  );
}
