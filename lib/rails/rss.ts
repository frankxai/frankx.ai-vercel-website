/**
 * RSS feed generator for the contemplative rails. One combined feed at
 * /rails/feed.xml plus four per-hub feeds at /on-{hub}/feed.xml. Each entry
 * appears in its canonical hub's feed AND in every cross-tagged hub's feed.
 */

import type { RailEntry, HubSlug } from './types';
import { hubUrl } from './types';
import { hubs } from '@/data/rails/hubs';

const SITE = 'https://frankx.ai';

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function generateRailRss(entries: RailEntry[], scope: HubSlug | 'all'): string {
  const sorted = [...entries].sort(
    (a, b) => +new Date(b.datePublished) - +new Date(a.datePublished),
  );

  const title =
    scope === 'all'
      ? 'FrankX — Contemplative Rails'
      : `FrankX — ${hubs[scope].displayTitle}`;

  const description =
    scope === 'all'
      ? 'Cross-tradition contemplative research across /on-god/, /on-reality/, /on-consciousness/, and /on-faith/.'
      : hubs[scope].manifesto.split('\n')[0];

  const feedUrl = scope === 'all' ? `${SITE}/rails/feed.xml` : `${SITE}${hubUrl(scope)}/feed.xml`;

  const items = sorted
    .map((e) => {
      const url = `${SITE}${hubUrl(e.hub)}/${e.slug}`;
      const cats = [e.hub, ...e.crossTags].map((h) => `    <category>${h}</category>`).join('\n');
      return `  <item>
    <title>${escapeXml(e.title)}</title>
    <link>${url}</link>
    <guid isPermaLink="true">${url}</guid>
    <pubDate>${new Date(e.datePublished).toUTCString()}</pubDate>
${cats}
    <description>${escapeXml(e.description)}</description>
  </item>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${escapeXml(title)}</title>
  <link>${SITE}</link>
  <atom:link href="${feedUrl}" rel="self" type="application/rss+xml"/>
  <description>${escapeXml(description)}</description>
  <language>en-us</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
</channel>
</rss>`;
}
