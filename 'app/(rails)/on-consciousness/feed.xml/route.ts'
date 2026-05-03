import { getEntriesByHub } from '@/lib/rails/load-entries';
import { generateRailRss } from '@/lib/rails/rss';

export const dynamic = 'force-static';

export async function GET() {
  const xml = generateRailRss(getEntriesByHub('consciousness'), 'consciousness');
  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
