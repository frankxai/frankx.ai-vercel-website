import { NextRequest, NextResponse } from 'next/server';
import { contentManager } from '@/lib/content/manager';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const { status } = await request.json();
    
    await contentManager.moveToStatus(slug, status);
    
    return NextResponse.json({ success: true, slug, status });
  } catch (error) {
    console.error('Failed to update status:', error);
    return NextResponse.json({ error: 'Failed to update status' }, { status: 500 });
  }
}
