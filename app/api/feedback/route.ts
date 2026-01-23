import { NextRequest, NextResponse } from 'next/server';

interface FeedbackPayload {
  type: 'chapter_feedback' | 'chapter_comment';
  chapter: string;
  chapterNumber: number;
  feedback: 'positive' | 'negative' | null;
  comment?: string;
  timestamp: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: FeedbackPayload = await request.json();

    // Validate required fields
    if (!body.type || !body.chapter || !body.timestamp) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Log feedback for analytics
    // In production, you could send this to:
    // - A database (Supabase, PlanetScale, etc.)
    // - An analytics service (Mixpanel, Amplitude, etc.)
    // - A simple webhook (Zapier, Make, etc.)
    console.log('[Chapter Feedback]', {
      type: body.type,
      chapter: body.chapter,
      chapterNumber: body.chapterNumber,
      feedback: body.feedback,
      hasComment: !!body.comment,
      timestamp: body.timestamp,
      userAgent: request.headers.get('user-agent')?.substring(0, 100) || 'unknown',
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Feedback Error]', error);
    return NextResponse.json(
      { error: 'Failed to process feedback' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Feedback API is running',
  });
}
