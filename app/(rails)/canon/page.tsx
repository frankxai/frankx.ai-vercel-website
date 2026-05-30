import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { ContemplativeReader } from '@/components/rails/ContemplativeReader';
import { RailHubHeader } from '@/components/rails/RailHubHeader';
import { loadAllCanon } from '@/lib/rails/load-canon';
import { traditionLabels, traditionDisplayOrder } from '@/data/rails/traditions';
import { breadcrumbSchema } from '@/lib/rails/schema';
import type { TraditionSlug } from '@/lib/rails/types';

const SITE = 'https://frankx.ai';

export const metadata: Metadata = {
  title: 'The Canon — Mystics, Sages, Physicists, Philosophers | FrankX',
  description:
    'The canonical thinkers cited across /on-god/, /on-reality/, /on-consciousness/, /on-faith/. Christian mystics, Advaita teachers, Sufi poets, modern physicists, consciousness scientists.',
  keywords: [
    'contemplative canon',
    'mystical canon',
    'consciousness studies canon',
    'mystics list',
    'non-dual teachers',
    'consciousness scientists',
    'christian mystics',
    'advaita teachers',
  ],
  alternates: { canonical: `${SITE}/canon` },
  robots: { index: false, follow: false },
};

export default function CanonIndexPage() {
  const all = loadAllCanon();
  const grouped = all.reduce<Record<string, typeof all>>((acc, c) => {
    (acc[c.tradition] ??= []).push(c);
    return acc;
  }, {});

  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      breadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Canon', url: '/canon' },
      ]),
      {
        '@type': 'CollectionPage',
        name: 'The Canon',
        description:
          'Canonical thinkers cited across the contemplative rails — mystics, sages, physicists, philosophers.',
        url: `${SITE}/canon`,
      },
      {
        '@type': 'ItemList',
        numberOfItems: all.length,
        itemListElement: all.map((c, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: { '@type': 'Person', name: c.name, url: `${SITE}/canon/${c.slug}` },
        })),
      },
    ],
  };

  return (
    <>
      <RailHubHeader activeHub="canon" />
      <ContemplativeReader>
        <p className="text-[11px] tracking-[0.25em] uppercase text-ink-contemplative-faint not-prose mb-4">
          /canon/
        </p>
        <h1>The Canon</h1>
        <p className="font-serif-editorial italic text-[1.25rem] leading-[1.7] text-ink-contemplative-muted not-prose">
          Every named teacher, mystic, philosopher, and physicist cited across the four rails. One canonical page per voice. Cross-tradition, with sources.
        </p>

        <hr />

        {all.length === 0 && (
          <p className="text-ink-contemplative-faint italic">
            The canon is being written. First entries appear with the first rail entry.
          </p>
        )}

        <div className="not-prose space-y-12">
          {traditionDisplayOrder
            .filter((t): t is TraditionSlug => Boolean(grouped[t]))
            .map((tradition) => (
              <section key={tradition}>
                <h2 className="font-serif-editorial text-[1.333rem] leading-[1.3] font-semibold text-ink-contemplative mb-4">
                  {traditionLabels[tradition]}
                </h2>
                <ul className="space-y-3">
                  {grouped[tradition].map((c) => (
                    <li key={c.slug} className="flex flex-wrap items-baseline gap-x-3">
                      <Link
                        href={`/canon/${c.slug}`}
                        className="font-serif-editorial text-[1.0625rem] text-ink-contemplative-muted hover:text-ink-contemplative underline underline-offset-4 decoration-ink-contemplative-faint hover:decoration-ink-contemplative"
                      >
                        {c.name}
                      </Link>
                      {c.born && (
                        <span className="text-[11px] tracking-[0.25em] uppercase text-ink-contemplative-faint">
                          {c.born}
                          {c.died ? ` — ${c.died}` : ''}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
        </div>
      </ContemplativeReader>
      <Script
        id="ld-canon-index"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
    </>
  );
}
