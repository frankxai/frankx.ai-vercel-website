/**
 * JSON-LD schema composers for the contemplative rails.
 *
 * Each rail entry emits: BreadcrumbList + Article + Quotation (per quote) +
 * Person (per cited canon) + FAQPage (if faq present).
 *
 * Each canon page emits: BreadcrumbList + Person (with workExample +
 * sameAs Wikipedia/official links) + Article references (to citing entries).
 *
 * The hub indexes emit: BreadcrumbList + CollectionPage + ItemList of entries.
 *
 * Portable: pass SITE_URL via parameter; no FrankX-specific imports.
 */

import type { RailEntry, CanonPage, RailQuote, RailFaq, HubSlug } from './types';
import { hubUrl } from './types';
import { hubs } from '@/data/rails/hubs';

const SITE = 'https://frankx.ai';

function hubLabel(slug: HubSlug): string {
  return hubs[slug].displayTitle;
}

export function articleSchema(entry: RailEntry, siteUrl = SITE): Record<string, unknown> {
  const url = `${siteUrl}${hubUrl(entry.hub)}/${entry.slug}`;
  return {
    '@type': 'Article',
    headline: entry.title,
    description: entry.description,
    url,
    author: { '@type': 'Person', name: 'Frank Riemer', url: siteUrl },
    publisher: { '@type': 'Organization', name: 'FrankX', url: siteUrl },
    datePublished: entry.datePublished,
    dateModified: entry.dateWritten,
    keywords: entry.keywords.join(', '),
    articleSection: [hubLabel(entry.hub), ...entry.traditions],
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    license: 'https://creativecommons.org/licenses/by-nc-nd/4.0/',
  };
}

export function quotationSchema(q: RailQuote, siteUrl = SITE): Record<string, unknown> {
  const citation = [q.source, q.page ? `p. ${q.page}` : null, q.edition ? `(${q.edition})` : null]
    .filter(Boolean)
    .join(', ');
  return {
    '@type': 'Quotation',
    text: q.text,
    spokenByCharacter: { '@type': 'Person', '@id': `${siteUrl}/canon/${q.attribution}` },
    citation,
  };
}

export function personSchema(canon: CanonPage, siteUrl = SITE): Record<string, unknown> {
  return {
    '@type': 'Person',
    '@id': `${siteUrl}/canon/${canon.slug}`,
    name: canon.name,
    ...(canon.born ? { birthDate: canon.born } : {}),
    ...(canon.died ? { deathDate: canon.died } : {}),
    sameAs: canon.externalLinks
      .filter((l) => l.kind === 'wikipedia' || l.kind === 'official')
      .map((l) => l.url),
    knowsAbout: canon.tradition,
    workExample: canon.keyWorks.map((w) => ({
      '@type': 'CreativeWork',
      name: w.title,
      ...(w.year ? { datePublished: String(w.year) } : {}),
      ...(w.publisher ? { publisher: { '@type': 'Organization', name: w.publisher } } : {}),
      ...(w.url ? { url: w.url } : {}),
    })),
  };
}

export function faqPageSchema(faq: RailFaq[]): Record<string, unknown> {
  return {
    '@type': 'FAQPage',
    mainEntity: faq.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

export function breadcrumbSchema(
  crumbs: Array<{ name: string; url: string }>,
  siteUrl = SITE,
): Record<string, unknown> {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: c.url.startsWith('http') ? c.url : `${siteUrl}${c.url}`,
    })),
  };
}

/**
 * Compose the full @graph for a rail entry detail page. Includes Article +
 * BreadcrumbList + Quotation per quote + Person per canon + FAQPage.
 */
export function composeEntrySchema(
  entry: RailEntry,
  canonRefs: CanonPage[],
  siteUrl = SITE,
): Record<string, unknown> {
  const graph: Array<Record<string, unknown>> = [
    breadcrumbSchema(
      [
        { name: 'Home', url: '/' },
        { name: hubLabel(entry.hub), url: hubUrl(entry.hub) },
        { name: entry.title, url: `${hubUrl(entry.hub)}/${entry.slug}` },
      ],
      siteUrl,
    ),
    articleSchema(entry, siteUrl),
    ...canonRefs.map((c) => personSchema(c, siteUrl)),
  ];
  if (entry.quotes?.length) {
    graph.push(...entry.quotes.map((q) => quotationSchema(q, siteUrl)));
  }
  if (entry.faq?.length) {
    graph.push(faqPageSchema(entry.faq));
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}

/**
 * Compose the @graph for a canon detail page. Includes Person + BreadcrumbList
 * + Article references for citing entries.
 */
export function composeCanonSchema(
  canon: CanonPage,
  citingEntries: RailEntry[],
  siteUrl = SITE,
): Record<string, unknown> {
  const graph: Array<Record<string, unknown>> = [
    breadcrumbSchema(
      [
        { name: 'Home', url: '/' },
        { name: 'Canon', url: '/canon' },
        { name: canon.name, url: `/canon/${canon.slug}` },
      ],
      siteUrl,
    ),
    personSchema(canon, siteUrl),
    ...citingEntries.map((e) => articleSchema(e, siteUrl)),
  ];
  return { '@context': 'https://schema.org', '@graph': graph };
}

/** Hub index page schema: BreadcrumbList + CollectionPage + ItemList. */
export function composeHubSchema(
  hub: HubSlug,
  entries: RailEntry[],
  siteUrl = SITE,
): Record<string, unknown> {
  const config = hubs[hub];
  const url = `${siteUrl}${hubUrl(hub)}`;
  const graph: Array<Record<string, unknown>> = [
    breadcrumbSchema(
      [
        { name: 'Home', url: '/' },
        { name: config.displayTitle, url: hubUrl(hub) },
      ],
      siteUrl,
    ),
    {
      '@type': 'CollectionPage',
      name: config.displayTitle,
      description: config.manifesto.split('\n')[0],
      url,
      keywords: config.keywordSpine.join(', '),
      mainEntity: { '@type': 'ItemList', numberOfItems: entries.length },
    },
    {
      '@type': 'ItemList',
      itemListElement: entries.map((e, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${siteUrl}${hubUrl(e.hub)}/${e.slug}`,
        name: e.title,
      })),
    },
  ];
  return { '@context': 'https://schema.org', '@graph': graph };
}
