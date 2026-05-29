/**
 * Canon loader — reads content/canon/*.md, parses frontmatter, returns typed
 * CanonPage[]. Computes citedIn[] back-references from rail entries that name
 * the canon in their canonCited[] frontmatter.
 *
 * Portable. RIS extraction substitutes the path constants.
 */

import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';
import type { CanonPage, CanonPageFrontmatter } from './types';
import { loadAllEntries } from './load-entries';

const CANON_DIR = path.join(process.cwd(), 'content', 'canon');

let cache: CanonPage[] | null = null;

function loadAllUncached(): CanonPage[] {
  if (!fs.existsSync(CANON_DIR)) return [];
  const pages: CanonPage[] = [];
  for (const file of fs.readdirSync(CANON_DIR)) {
    if (!file.endsWith('.md')) continue;
    const filePath = path.join(CANON_DIR, file);
    const raw = fs.readFileSync(filePath, 'utf8');
    const parsed = matter(raw);
    const fm = parsed.data as CanonPageFrontmatter;
    const bodyHtml = marked.parse(parsed.content, { async: false }) as string;
    pages.push({ ...fm, body: parsed.content, bodyHtml, filePath });
  }
  return pages;
}

/** All canon pages, with citedIn[] computed from rail entries. */
export function loadAllCanon(): CanonPage[] {
  if (cache) return cache;
  const pages = loadAllUncached();
  const entries = loadAllEntries();
  for (const page of pages) {
    page.citedIn = entries
      .filter((e) => e.canonCited.includes(page.slug))
      .map((e) => ({ hub: e.hub, slug: e.slug, title: e.title }));
  }
  cache = pages;
  return pages;
}

export function getCanonBySlug(slug: string): CanonPage | undefined {
  return loadAllCanon().find((c) => c.slug === slug);
}

export function getAllCanonSlugs(): string[] {
  return loadAllCanon().map((c) => c.slug);
}
