import { NextResponse } from 'next/server';
import { getTodaysDare, resolvePrompt, dateKey, QUEST_LENGTH } from '@/lib/daily-dare';

const SITE_URL = 'https://frankx.ai';

// Runtime: Vercel Fluid Compute (default Node.js) — same rationale as
// app/api/quote/today/route.ts. Rotation is sequential (epoch-day modulo),
// not hash-based: the quest is an ordered 30-day arc.

export async function GET(request: Request) {
  const url = new URL(request.url);
  const tz = url.searchParams.get('tz') ?? 'UTC';

  const key = dateKey(new Date(), tz);
  const { dare, chapter, day, date } = getTodaysDare(key);
  const prompt = resolvePrompt(dare);

  return NextResponse.json(
    {
      date,
      timezone: tz,
      day,
      questLength: QUEST_LENGTH,
      chapter: {
        id: chapter.id,
        title: chapter.title,
        principle: chapter.principle,
        days: chapter.days,
        book: `${SITE_URL}/library/${chapter.bookSlug}`,
      },
      dare: {
        title: dare.title,
        mindStretch: dare.mindStretch,
        prompt: {
          framing: dare.prompt.framing,
          title: prompt?.title ?? null,
          content: prompt?.content ?? null,
        },
        mindConcept: dare.mindConcept,
        goodDeed: dare.goodDeed,
      },
      permalink: `${SITE_URL}/dare`,
      meta: {
        source: 'frankx.ai/dare',
        rotation: `deterministic, sequential by UTC date — day N of ${QUEST_LENGTH}, same dare for every caller within a 24h window`,
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
