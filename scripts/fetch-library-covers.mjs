#!/usr/bin/env node
/**
 * fetch-library-covers.mjs
 *
 * Downloads real book covers for FrankX Library entries into
 * public/images/library/{slug}.jpg and (with --apply) flips the matching
 * `hasCover: false` → `hasCover: true` in data/book-reviews.ts.
 *
 * Why this exists: the Claude Code web sandbox blocks image hosts
 * (Open Library / Google Books / Amazon are not on the network allowlist),
 * so covers can't be fetched during the session. Run this locally once,
 * where outbound access is open, to land the real covers.
 *
 * Usage:
 *   node scripts/fetch-library-covers.mjs            # download only, report results
 *   node scripts/fetch-library-covers.mjs --apply    # download + set hasCover: true
 *   node scripts/fetch-library-covers.mjs --slug life-keith-richards  # one book
 *
 * Strategy: resolve each cover via the Open Library Search API
 * (title + author → cover_i), then download the -L cover. Falls back to a
 * pinned ISBN per book if the search misses. Validates the bytes are a real
 * JPEG above a sane size before writing, so we never ship a 1x1 or an
 * error page. Books that fail are listed so they can be sourced by hand.
 */

import { writeFile, readFile, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const COVERS_DIR = join(ROOT, 'public', 'images', 'library');
const DATA_FILE = join(ROOT, 'data', 'book-reviews.ts');

// slug → search terms + a pinned ISBN fallback (best-effort).
const BOOKS = [
  { slug: 'life-keith-richards', title: 'Life', author: 'Keith Richards', isbn: '9780316034418' },
  { slug: 'just-kids', title: 'Just Kids', author: 'Patti Smith', isbn: '9780060936228' },
  { slug: 'the-creative-act', title: 'The Creative Act A Way of Being', author: 'Rick Rubin', isbn: '9780593652886' },
  { slug: 'how-music-works', title: 'How Music Works', author: 'David Byrne', isbn: '9780804188753' },
  { slug: 'meet-me-in-the-bathroom', title: 'Meet Me in the Bathroom', author: 'Lizzy Goodman', isbn: '9780062234896' },
  { slug: 'please-kill-me', title: 'Please Kill Me', author: 'Legs McNeil Gillian McCain', isbn: '9780802142641' },
  { slug: 'popism', title: 'POPism The Warhol Sixties', author: 'Andy Warhol Pat Hackett', isbn: '9780156031110' },
  { slug: 'miles-the-autobiography', title: 'Miles The Autobiography', author: 'Miles Davis Quincy Troupe', isbn: '9780671725822' },
  { slug: 'our-band-could-be-your-life', title: 'Our Band Could Be Your Life', author: 'Michael Azerrad', isbn: '9780316787536' },
  { slug: 'cant-stop-wont-stop', title: 'Cant Stop Wont Stop History of the Hip-Hop Generation', author: 'Jeff Chang', isbn: '9780312425791' },
  { slug: 'm-train', title: 'M Train', author: 'Patti Smith', isbn: '9781101910573' },
  { slug: 'chronicles-volume-one', title: 'Chronicles Volume One', author: 'Bob Dylan', isbn: '9780743244589' },
  { slug: 'girl-in-a-band', title: 'Girl in a Band', author: 'Kim Gordon', isbn: '9780062295897' },
  { slug: 'beastie-boys-book', title: 'Beastie Boys Book', author: 'Michael Diamond Adam Horovitz', isbn: '9780812995541' },
];

const args = process.argv.slice(2);
const APPLY = args.includes('--apply');
const slugFilter = args.includes('--slug') ? args[args.indexOf('--slug') + 1] : null;

const MIN_BYTES = 3000; // anything smaller is a placeholder / error page

async function fetchBuffer(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'frankx-library-cover-fetcher/1.0 (https://frankx.ai)' },
    redirect: 'follow',
  });
  if (!res.ok) return null;
  const buf = Buffer.from(await res.arrayBuffer());
  return buf;
}

function isJpeg(buf) {
  // JPEG magic: FF D8 FF
  return buf && buf.length >= 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff;
}

async function resolveCoverId(book) {
  const q = new URLSearchParams({
    title: book.title,
    author: book.author,
    limit: '1',
    fields: 'cover_i,title',
  });
  try {
    const res = await fetch(`https://openlibrary.org/search.json?${q}`, {
      headers: { 'User-Agent': 'frankx-library-cover-fetcher/1.0 (https://frankx.ai)' },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.docs?.[0]?.cover_i ?? null;
  } catch {
    return null;
  }
}

async function downloadCover(book) {
  // 1) search → cover_i
  const coverId = await resolveCoverId(book);
  const candidates = [];
  if (coverId) candidates.push(`https://covers.openlibrary.org/b/id/${coverId}-L.jpg?default=false`);
  // 2) pinned ISBN fallback
  if (book.isbn) candidates.push(`https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg?default=false`);

  for (const url of candidates) {
    const buf = await fetchBuffer(url);
    if (isJpeg(buf) && buf.length >= MIN_BYTES) {
      return { buf, url };
    }
  }
  return null;
}

async function setHasCover(slug) {
  let src = await readFile(DATA_FILE, 'utf8');
  // Find the entry block for this slug and flip its hasCover within ~40 lines.
  const slugIdx = src.indexOf(`slug: '${slug}'`);
  if (slugIdx === -1) return false;
  const windowEnd = src.indexOf("slug: '", slugIdx + 1);
  const end = windowEnd === -1 ? src.length : windowEnd;
  const head = src.slice(0, slugIdx);
  const block = src.slice(slugIdx, end);
  const tail = src.slice(end);
  if (!block.includes('hasCover: false')) return false;
  const newBlock = block.replace('hasCover: false', 'hasCover: true');
  await writeFile(DATA_FILE, head + newBlock + tail, 'utf8');
  return true;
}

async function main() {
  // sanity: covers dir exists
  try {
    await access(COVERS_DIR);
  } catch {
    console.error(`Covers dir not found: ${COVERS_DIR}`);
    process.exit(1);
  }

  const books = slugFilter ? BOOKS.filter((b) => b.slug === slugFilter) : BOOKS;
  if (books.length === 0) {
    console.error(`No book matches --slug ${slugFilter}`);
    process.exit(1);
  }

  const ok = [];
  const failed = [];

  for (const book of books) {
    process.stdout.write(`• ${book.slug} … `);
    const result = await downloadCover(book);
    if (!result) {
      console.log('FAILED (no valid cover found)');
      failed.push(book.slug);
      continue;
    }
    const dest = join(COVERS_DIR, `${book.slug}.jpg`);
    await writeFile(dest, result.buf);
    console.log(`saved ${(result.buf.length / 1024).toFixed(0)}KB`);
    if (APPLY) {
      const flipped = await setHasCover(book.slug);
      if (flipped) console.log(`  ↳ hasCover: true set in data/book-reviews.ts`);
    }
    ok.push(book.slug);
  }

  console.log(`\nDone. ${ok.length} downloaded, ${failed.length} failed.`);
  if (failed.length) {
    console.log(`\nManual sourcing needed for: ${failed.join(', ')}`);
    console.log(`Drop a JPEG at public/images/library/{slug}.jpg and set hasCover: true.`);
  }
  if (!APPLY && ok.length) {
    console.log(`\nRe-run with --apply to set hasCover: true for the downloaded covers.`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
