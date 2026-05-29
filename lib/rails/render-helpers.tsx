/**
 * Shared page helpers used by every rail route. Keeps the per-hub
 * page.tsx wrappers thin (they exist only to satisfy Next.js's
 * generateStaticParams + generateMetadata + default-export contract).
 */

import type { Metadata } from 'next';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { ContemplativeReader } from '@/components/rails/ContemplativeReader';
import { RailHubHeader } from '@/components/rails/RailHubHeader';
import { RailHubManifesto } from '@/components/rails/RailHubManifesto';
import { RailEntryHeader } from '@/components/rails/RailEntryHeader';
import { RailEntryFooter } from '@/components/rails/RailEntryFooter';
import { RailEntryBody } from '@/components/rails/RailEntryBody';
import {
  getEntriesByHub,
  getCanonicalEntriesByHub,
  getEntryBySlug,
  sortByDate,
} from './load-entries';
import { loadAllCanon } from './load-canon';
import { composeEntrySchema, composeHubSchema } from './schema';
import type { HubSlug } from './types';
import { hubUrl } from './types';
import { hubs } from '@/data/rails/hubs';

const SITE = 'https://frankx.ai';

export function buildHubMetadata(hub: HubSlug): Metadata {
  const config = hubs[hub];
  const description = config.manifesto.split('\n')[0].slice(0, 158);
  return {
    title: `${config.displayTitle} — ${config.question} | FrankX`,
    description,
    keywords: config.keywordSpine,
    alternates: { canonical: `${SITE}${hubUrl(hub)}` },
    openGraph: {
      title: `${config.displayTitle} — ${config.question}`,
      description,
      type: 'website',
      url: `${SITE}${hubUrl(hub)}`,
      siteName: 'FrankX',
    },
    robots: { index: false, follow: false },
  };
}

export function HubPage({ hub }: { hub: HubSlug }) {
  const canonical = sortByDate(getCanonicalEntriesByHub(hub));
  const all = sortByDate(getEntriesByHub(hub));
  const crossTagged = all.filter((e) => e.hub !== hub);
  const ld = composeHubSchema(hub, [...canonical, ...crossTagged]);

  return (
    <>
      <RailHubHeader activeHub={hub} />
      <RailHubManifesto hub={hub} canonical={canonical} crossTagged={crossTagged} />
      <Script
        id={`ld-rails-${hub}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
    </>
  );
}

export function buildEntryMetadata(hub: HubSlug, slug: string): Metadata {
  const entry = getEntryBySlug(hub, slug);
  if (!entry) return { robots: { index: false, follow: false } };
  const url = `${SITE}${hubUrl(hub)}/${slug}`;
  return {
    title: `${entry.title} | ${hubs[hub].displayTitle}`,
    description: entry.description,
    keywords: entry.keywords,
    alternates: { canonical: url, types: { 'application/rss+xml': `${hubUrl(hub)}/feed.xml` } },
    openGraph: {
      title: entry.title,
      description: entry.description,
      type: 'article',
      url,
      publishedTime: entry.datePublished,
      modifiedTime: entry.dateWritten,
      authors: ['Frank Riemer'],
    },
    robots: { index: false, follow: false },
  };
}

export function entryStaticParams(hub: HubSlug) {
  return getCanonicalEntriesByHub(hub).map((e) => ({ slug: e.slug }));
}

export function EntryPage({ hub, slug }: { hub: HubSlug; slug: string }) {
  const entry = getEntryBySlug(hub, slug);
  if (!entry) notFound();

  const allCanon = loadAllCanon();
  const canonRefs = allCanon.filter((c) => entry.canonCited.includes(c.slug));
  const ld = composeEntrySchema(entry, canonRefs);

  return (
    <>
      <RailHubHeader activeHub={hub} />
      <ContemplativeReader>
        <RailEntryHeader entry={entry} />
        <RailEntryBody html={entry.bodyHtml ?? ''} />
        <RailEntryFooter entry={entry} />
      </ContemplativeReader>
      <Script
        id={`ld-${hub}-${slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
    </>
  );
}
