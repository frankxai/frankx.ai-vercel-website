import { NextRequest, NextResponse } from 'next/server';
import { notifyAdmin } from '@/lib/notify-admin';

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

    if (!body.type || !body.chapter || !body.timestamp) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const feedbackEntry = {
      ...body,
      userAgent: request.headers.get('user-agent') || 'unknown',
      receivedAt: new Date().toISOString(),
    };

    // Store in KV if available, log otherwise
    try {
      const { kv } = await import('@vercel/kv');
      const key = `feedback:${Date.now()}:${body.chapter}`;
      await kv.set(key, feedbackEntry);
      await kv.lpush('feedback:list', JSON.stringify(feedbackEntry));
    } catch {
      // KV not configured — log only (still better than crashing)
      console.log('[Feedback] KV unavailable, logged to console:', JSON.stringify(feedbackEntry));
    }

    console.log('[Feedback]', {
      type: body.type,
      chapter: body.chapter,
      feedback: body.feedback,
      hasComment: !!body.comment,
    });

    // Notify admin (non-blocking)
    notifyAdmin({
      formType: 'feedback',
      email: 'anonymous@frankx.ai',
      details: {
        Chapter: body.chapter,
        'Feedback Type': body.feedback || body.type,
        ...(body.comment ? { Comment: body.comment } : {}),
      },
    }).catch(console.error);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Feedback Error]', error);
    return NextResponse.json(
      { error: 'Failed to save feedback' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Simple endpoint to check feedback API status
  return NextResponse.json({
    status: 'ok',
    message: 'Feedback API is running',
  });
}
