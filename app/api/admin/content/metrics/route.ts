import { NextResponse } from 'next/server';
import { contentManager } from '@/lib/content/manager';

export async function GET() {
  try {
    const metrics = await contentManager.getMetrics();
    return NextResponse.json(metrics);
  } catch (error) {
    console.error('Failed to fetch metrics:', error);
    return NextResponse.json({ error: 'Failed to fetch metrics' }, { status: 500 });
  }
}
