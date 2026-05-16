import { NextResponse } from 'next/server';
import { bookReviews } from '@/data/book-reviews';

const SITE_URL = 'https://frankx.ai';

// Runtime: Vercel Fluid Compute (default Node.js). Edge deprecated
// 2026-02-27 per vercel:knowledge-update. Fluid Compute matches edge
// latency profile while keeping the full Node ecosystem.
//
// 5-minute static cache — random doesn't need to be perfectly random
// per call, and caching dramatically reduces invocation cost.
export const revalidate = 300;

type ApiQuote = {
  text: string;
  chapter: string | null;
  context: string | null;
  author: string;
  source: string;
  sourceSlug: string;
  permalink: string;
  shareImage: string;
};

function flatten(): ApiQuote[] {
  const all: ApiQuote[] = [];
  for (const book of bookReviews) {
    if (!book.quotes) continue;
    book.quotes.forEach((q, i) => {
      const n = i + 1;
      all.push({
        text: q.text,
        chapter: q.chapter ?? null,
        context: q.context ?? null,
        author: book.author,
        source: book.title,
        sourceSlug: book.slug,
        permalink: `${SITE_URL}/library/${book.slug}/q/${n}`,
        shareImage: `${SITE_URL}/library/${book.slug}/q/${n}/opengraph-image`,
      });
    });
  }
  return all;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const author = url.searchParams.get('author');
  const slug = url.searchParams.get('book');
  const count = Math.min(Math.max(parseInt(url.searchParams.get('count') ?? '1', 10), 1), 20);

  let pool = flatten();
  if (author) {
    pool = pool.filter((q) => q.author.toLowerCase().includes(author.toLowerCase()));
  }
  if (slug) {
    pool = pool.filter((q) => q.sourceSlug === slug);
  }

  if (pool.length === 0) {
    return NextResponse.json(
      { error: 'No quotes match the given filters', total: 0 },
      { status: 404 }
    );
  }

  const picks: ApiQuote[] = [];
  const taken = new Set<number>();
  while (picks.length < count && taken.size < pool.length) {
    const idx = Math.floor(Math.random() * pool.length);
    if (taken.has(idx)) continue;
    taken.add(idx);
    picks.push(pool[idx]);
  }

  return NextResponse.json(
    {
      count: picks.length,
      total: pool.length,
      quotes: picks,
      meta: {
        source: 'frankx.ai/library',
        license: 'Quotes excerpted under fair use for review and commentary purposes.',
        attribution_required: true,
      },
    },
    {
      headers: {
        'Cache-Control': 's-maxage=60, stale-while-revalidate=300',
        'Access-Control-Allow-Origin': '*',
      },
    }
  );
}
