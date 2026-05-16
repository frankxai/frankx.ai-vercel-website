import { NextResponse } from 'next/server';
import { bookReviews } from '@/data/book-reviews';

const SITE_URL = 'https://frankx.ai';

// Runtime: Vercel Fluid Compute (default Node.js). Edge runtime
// deprecated 2026-02-27 per vercel:knowledge-update — Fluid Compute
// runs in same regions, same price, full Node ecosystem, 300s default
// timeout. Static cache via Next.js handles revalidation identically.

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

// Fast, deterministic 32-bit hash — turns YYYY-MM-DD into a stable index
function hashString(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function todayKey(timezone = 'UTC') {
  const now = new Date();
  const fmt = new Intl.DateTimeFormat('en-CA', {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  return fmt.format(now); // YYYY-MM-DD
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const tz = url.searchParams.get('tz') ?? 'UTC';

  const pool = flatten();
  if (pool.length === 0) {
    return NextResponse.json({ error: 'No quotes available', total: 0 }, { status: 503 });
  }

  const day = todayKey(tz);
  const idx = hashString(day) % pool.length;
  const quote = pool[idx];

  return NextResponse.json(
    {
      date: day,
      timezone: tz,
      total: pool.length,
      quote,
      meta: {
        source: 'frankx.ai/library',
        license: 'Quotes excerpted under fair use for review and commentary purposes.',
        attribution_required: true,
        rotation: 'deterministic by UTC date — same quote for every caller within a 24h window',
      },
    },
    {
      headers: {
        // Cache for 5 minutes; the value only changes once per day so this is safe and cheap
        'Cache-Control': 's-maxage=300, stale-while-revalidate=3600',
        'Access-Control-Allow-Origin': '*',
      },
    }
  );
}
