import { NextResponse } from 'next/server';
import { listAllContent } from '@/lib/social/content-parser';

export async function GET() {
  try {
    const content = listAllContent();
    return NextResponse.json({ content });
  } catch (error) {
    console.error('Failed to load content:', error);
    return NextResponse.json({ content: [], error: String(error) });
  }
}
