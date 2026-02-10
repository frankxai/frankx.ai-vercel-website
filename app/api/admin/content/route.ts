import { NextResponse } from 'next/server';
import { contentManager } from '@/lib/content/manager';

export async function GET() {
  try {
    const content = await contentManager.getAllContent();
    return NextResponse.json(content);
  } catch (error) {
    console.error('Failed to fetch content:', error);
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
  }
}
