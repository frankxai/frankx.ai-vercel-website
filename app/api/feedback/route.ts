import { NextRequest, NextResponse } from 'next/server';
import { appendFileSync, existsSync, mkdirSync, readFileSync } from 'fs';
import { join } from 'path';

const FEEDBACK_DIR = join(process.cwd(), 'data', 'feedback');
const CHAPTER_FEEDBACK_FILE = join(FEEDBACK_DIR, 'chapter-feedback.jsonl');
const BLOG_FEEDBACK_FILE = join(FEEDBACK_DIR, 'blog-post-feedback.jsonl');

interface FeedbackPayload {
  type: 'chapter_feedback' | 'chapter_comment' | 'blog_post_feedback' | 'blog_post_comment';
  book?: string;
  chapter?: string;
  chapterNumber?: number;
  slug?: string;
  feedback: 'positive' | 'negative' | null;
  comment?: string;
  timestamp: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: FeedbackPayload = await request.json();

    // Validate based on type
    const isBlogFeedback = body.type.startsWith('blog_post');
    const isChapterFeedback = body.type.startsWith('chapter');

    if (!body.type || !body.timestamp) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (isBlogFeedback && !body.slug) {
      return NextResponse.json(
        { error: 'Missing slug for blog feedback' },
        { status: 400 }
      );
    }

    if (isChapterFeedback && !body.chapter) {
      return NextResponse.json(
        { error: 'Missing chapter for chapter feedback' },
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

    const targetFile = isBlogFeedback ? BLOG_FEEDBACK_FILE : CHAPTER_FEEDBACK_FILE;
    appendFileSync(targetFile, JSON.stringify(feedbackEntry) + '\n', 'utf-8');

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
  const feedbackType = searchParams.get('type'); // 'blog' or 'chapter'
  const book = searchParams.get('book');
  const chapter = searchParams.get('chapter');
  const slug = searchParams.get('slug');

  // If no params, return API status
  if (!feedbackType) {
    return NextResponse.json({ status: 'ok', message: 'Feedback API is running' });
  }

  try {
    // Choose file based on type
    const targetFile = feedbackType === 'blog' ? BLOG_FEEDBACK_FILE : CHAPTER_FEEDBACK_FILE;

    if (!existsSync(targetFile)) {
      return NextResponse.json({ positive: 0, negative: 0, total: 0 });
    }

    const lines = readFileSync(targetFile, 'utf-8').split('\n').filter(Boolean);
    let positive = 0;
    let negative = 0;

    for (const line of lines) {
      try {
        const entry = JSON.parse(line);

        // Blog post feedback
        if (feedbackType === 'blog' && entry.type === 'blog_post_feedback') {
          if (entry.slug === slug) {
            if (entry.feedback === 'positive') positive++;
            if (entry.feedback === 'negative') negative++;
          }
        }

        // Chapter feedback
        if (feedbackType === 'chapter' && entry.type === 'chapter_feedback') {
          const chapterMatch = entry.chapter === chapter;
          const bookMatch = !entry.book || entry.book === book;
          if (chapterMatch && bookMatch) {
            if (entry.feedback === 'positive') positive++;
            if (entry.feedback === 'negative') negative++;
          }
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
