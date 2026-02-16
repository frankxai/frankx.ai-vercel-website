import { NextRequest, NextResponse } from 'next/server';
import { appendFileSync, existsSync, mkdirSync, readFileSync } from 'fs';
import { join } from 'path';

const FEEDBACK_DIR = join(process.cwd(), 'data', 'feedback');
const FEEDBACK_FILE = join(FEEDBACK_DIR, 'chapter-feedback.jsonl');

interface FeedbackPayload {
  type: 'chapter_feedback' | 'chapter_comment';
  book?: string;
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

    if (!existsSync(FEEDBACK_DIR)) {
      mkdirSync(FEEDBACK_DIR, { recursive: true });
    }

    const feedbackEntry = {
      ...body,
      userAgent: request.headers.get('user-agent') || 'unknown',
      receivedAt: new Date().toISOString(),
    };

    appendFileSync(FEEDBACK_FILE, JSON.stringify(feedbackEntry) + '\n', 'utf-8');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Feedback Error]', error);
    return NextResponse.json(
      { error: 'Failed to save feedback' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const book = searchParams.get('book');
  const chapter = searchParams.get('chapter');

  // If no params, return API status
  if (!book || !chapter) {
    return NextResponse.json({ status: 'ok', message: 'Feedback API is running' });
  }

  // Read JSONL and aggregate feedback for this chapter
  try {
    if (!existsSync(FEEDBACK_FILE)) {
      return NextResponse.json({ positive: 0, negative: 0, total: 0 });
    }

    const lines = readFileSync(FEEDBACK_FILE, 'utf-8').split('\n').filter(Boolean);
    let positive = 0;
    let negative = 0;

    for (const line of lines) {
      try {
        const entry = JSON.parse(line);
        if (entry.type !== 'chapter_feedback') continue;
        // Match by chapter slug (and optionally book slug)
        const chapterMatch = entry.chapter === chapter;
        const bookMatch = !entry.book || entry.book === book;
        if (chapterMatch && bookMatch) {
          if (entry.feedback === 'positive') positive++;
          if (entry.feedback === 'negative') negative++;
        }
      } catch {
        continue;
      }
    }

    return NextResponse.json(
      { positive, negative, total: positive + negative },
      { headers: { 'Cache-Control': 'public, max-age=3600' } }
    );
  } catch {
    return NextResponse.json({ positive: 0, negative: 0, total: 0 });
  }
}
