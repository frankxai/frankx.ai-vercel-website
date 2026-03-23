import { NextRequest, NextResponse } from 'next/server';
import { appendFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

// Simple file-based feedback storage
// In production, you'd use a database or analytics service
const FEEDBACK_DIR = join(process.cwd(), 'data', 'feedback');
const FEEDBACK_FILE = join(FEEDBACK_DIR, 'chapter-feedback.jsonl');

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

    // Ensure feedback directory exists
    if (!existsSync(FEEDBACK_DIR)) {
      mkdirSync(FEEDBACK_DIR, { recursive: true });
    }

    // Append feedback as JSON line
    const feedbackEntry = {
      ...body,
      userAgent: request.headers.get('user-agent') || 'unknown',
      receivedAt: new Date().toISOString(),
    };

    appendFileSync(FEEDBACK_FILE, JSON.stringify(feedbackEntry) + '\n', 'utf-8');

    // Log for analytics (could send to external service)
    console.log('[Feedback]', {
      type: body.type,
      chapter: body.chapter,
      feedback: body.feedback,
      hasComment: !!body.comment,
    });

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
