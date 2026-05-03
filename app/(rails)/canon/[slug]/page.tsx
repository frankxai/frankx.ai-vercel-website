import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { ContemplativeReader } from '@/components/rails/ContemplativeReader';
import { RailHubHeader } from '@/components/rails/RailHubHeader';
import { RailEntryBody } from '@/components/rails/RailEntryBody';
import {
  getCanonBySlug,
  getAllCanonSlugs,
} from '@/lib/rails/load-canon';
import { loadAllEntries } from '@/lib/rails/load-entries';
import { composeCanonSchema } from '@/lib/rails/schema';
import { traditionLabels } from '@/data/rails/traditions';
import { hubUrl } from '@/lib/rails/types';

const SITE = 'https://frankx.ai';

export function generateStaticParams() {
  return getAllCanonSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const canon = getCanonBySlug(slug);
  if (!canon) return { robots: { index: false, follow: false } };
  const description = `${canon.name} — ${canon.centralClaims[0] ?? ''}`.slice(0, 158);
  return {
    title: `${canon.name} — ${traditionLabels[canon.tradition]} | The Canon`,
    description,
    keywords: [canon.name, traditionLabels[canon.tradition], 'mysticism', 'contemplative canon'],
    alternates: { canonical: `${SITE}/canon/${slug}` },
    robots: { index: false, follow: false },
  };
}

export default async function CanonDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const canon = getCanonBySlug(slug);
  if (!canon) notFound();

  const citingEntries = loadAllEntries().filter((e) => e.canonCited.includes(slug));
  const ld = composeCanonSchema(canon, citingEntries);

  return (
    <>
      <RailHubHeader activeHub="canon" />
      <ContemplativeReader>
        <p className="text-[11px] tracking-[0.25em] uppercase text-ink-contemplative-faint not-prose mb-4">
          /canon/ · {traditionLabels[canon.tradition]}
        </p>
        <h1>{canon.name}</h1>
        {(canon.born || canon.died) && (
          <p className="text-[11px] tracking-[0.25em] uppercase text-ink-contemplative-faint not-prose">
            {canon.born}
            {canon.died ? ` — ${canon.died}` : ''}
          </p>
        )}

        <hr />

        <h2>Central Claims</h2>
        <ul>
          {canon.centralClaims.map((claim, i) => (
            <li key={i}>{claim}</li>
          ))}
        </ul>

        <hr />

        <RailEntryBody html={canon.bodyHtml ?? ''} />

        <hr />

        <h2>Key Works</h2>
        <ul className="not-prose space-y-3">
          {canon.keyWorks.map((w, i) => (
            <li
              key={i}
              className="font-serif-editorial text-[1rem] leading-[1.6] text-ink-contemplative-muted"
            >
              <em>{w.title}</em>
              {w.year ? `, ${w.year}` : ''}
              {w.edition ? ` (${w.edition})` : ''}
              {w.publisher ? `, ${w.publisher}` : ''}
              {w.url ? (
                <>
                  {' · '}
                  <a
                    href={w.url}
                    className="underline underline-offset-4 decoration-ink-contemplative-faint hover:decoration-ink-contemplative"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    link
                  </a>
                </>
              ) : null}
            </li>
          ))}
        </ul>

        {canon.externalLinks.length > 0 && (
          <>
            <h2>External Links</h2>
            <ul className="not-prose space-y-2">
              {canon.externalLinks.map((l) => (
                <li key={l.url}>
                  <a
                    href={l.url}
                    className="font-serif-editorial text-[1rem] text-ink-contemplative-muted hover:text-ink-contemplative underline underline-offset-4 decoration-ink-contemplative-faint hover:decoration-ink-contemplative"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {l.label}
                  </a>
                  <span className="ml-3 text-[10px] tracking-[0.25em] uppercase text-ink-contemplative-faint">
                    {l.kind}
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}

        {citingEntries.length > 0 && (
          <>
            <h2>Cited In</h2>
            <ul className="not-prose space-y-3">
              {citingEntries.map((e) => (
                <li key={`${e.hub}-${e.slug}`} className="flex flex-wrap items-baseline gap-x-3">
                  <Link
                    href={`${hubUrl(e.hub)}/${e.slug}`}
                    className="font-serif-editorial text-[1.0625rem] text-ink-contemplative-muted hover:text-ink-contemplative underline underline-offset-4 decoration-ink-contemplative-faint hover:decoration-ink-contemplative"
                  >
                    {e.title}
                  </Link>
                  <span className="text-[10px] tracking-[0.25em] uppercase text-ink-contemplative-faint">
                    /on-{e.hub}/
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}
      </ContemplativeReader>
      <Script
        id={`ld-canon-${canon.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
    </>
  );
}
