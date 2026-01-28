import { NextResponse } from 'next/server';
import { contentManager } from '@/lib/content/manager';

export async function GET() {
  try {
    const stats = await contentManager.getPipelineStats();
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Failed to fetch stats:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
