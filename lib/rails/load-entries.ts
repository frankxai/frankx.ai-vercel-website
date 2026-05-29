/**
 * Rail entry loader — reads content/rails/{hub}/*.md, parses frontmatter via
 * gray-matter, returns typed RailEntry[]. Entries with status !== 'live' are
 * filtered from public surfaces but remain available via direct slug lookup
 * for preview rendering.
 *
 * Portable shape: this loader pattern transfers cleanly to any markdown-first
 * static site. RIS extraction substitutes the path constants.
 */

import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';
import type { RailEntry, RailEntryFrontmatter, HubSlug } from './types';
import { HUB_ORDER } from './types';

const ENTRIES_DIR = path.join(process.cwd(), 'content', 'rails');

let cache: RailEntry[] | null = null;

function loadAllUncached(): RailEntry[] {
  if (!fs.existsSync(ENTRIES_DIR)) return [];
  const entries: RailEntry[] = [];
  for (const hub of fs.readdirSync(ENTRIES_DIR)) {
    const hubDir = path.join(ENTRIES_DIR, hub);
    if (!fs.statSync(hubDir).isDirectory()) continue;
    if (!HUB_ORDER.includes(hub as HubSlug)) continue;
    for (const file of fs.readdirSync(hubDir)) {
      if (!file.endsWith('.md')) continue;
      const filePath = path.join(hubDir, file);
      const raw = fs.readFileSync(filePath, 'utf8');
      const parsed = matter(raw);
      const fm = parsed.data as RailEntryFrontmatter;
      const bodyHtml = marked.parse(parsed.content, { async: false }) as string;
      entries.push({ ...fm, body: parsed.content, bodyHtml, filePath });
    }
  }
  return entries;
}

/** All live entries across all hubs. Cached per process. */
export function loadAllEntries(): RailEntry[] {
  if (cache) return cache;
  cache = loadAllUncached().filter((e) => e.status === 'live');
  return cache;
}

/** Entries that should appear on a hub's index — canonical + cross-tagged. */
export function getEntriesByHub(hub: HubSlug): RailEntry[] {
  return loadAllEntries().filter((e) => e.hub === hub || e.crossTags.includes(hub));
}

/** Entries whose canonical hub is this one. */
export function getCanonicalEntriesByHub(hub: HubSlug): RailEntry[] {
  return loadAllEntries().filter((e) => e.hub === hub);
}

/** Single entry by hub + slug. */
export function getEntryBySlug(hub: HubSlug, slug: string): RailEntry | undefined {
  return loadAllEntries().find((e) => e.hub === hub && e.slug === slug);
}

/** Full enumeration for generateStaticParams. */
export function getAllEntrySlugs(): Array<{ hub: HubSlug; slug: string }> {
  return loadAllEntries().map((e) => ({ hub: e.hub, slug: e.slug }));
}

/** Sort newest first. */
export function sortByDate(entries: RailEntry[]): RailEntry[] {
  return [...entries].sort((a, b) => +new Date(b.datePublished) - +new Date(a.datePublished));
}
