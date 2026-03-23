'use client';

import { useState, useEffect } from 'react';

interface ChapterFeedbackProps {
  bookSlug: string;
  chapterSlug: string;
  chapterNumber: number;
  themeId: string;
  bookTitle: string;
}

export default function ChapterFeedback({
  bookSlug,
  chapterSlug,
  chapterNumber,
  bookTitle,
}: ChapterFeedbackProps) {
  const [feedback, setFeedback] = useState<'positive' | 'negative' | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [comment, setComment] = useState('');
  const [sending, setSending] = useState(false);
  const [aggregate, setAggregate] = useState<{ positive: number; total: number } | null>(null);

  const storageKey = `feedback-${bookSlug}-${chapterSlug}`;

  // Check if already voted
  useEffect(() => {
    const prev = localStorage.getItem(storageKey);
    if (prev) {
      setFeedback(prev as 'positive' | 'negative');
      setSubmitted(true);
    }
  }, [storageKey]);

  // Fetch aggregate
  useEffect(() => {
    fetch(`/api/feedback?book=${bookSlug}&chapter=${chapterSlug}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.total > 0) setAggregate(data);
      })
      .catch(() => {});
  }, [bookSlug, chapterSlug]);

  const handleVote = async (vote: 'positive' | 'negative') => {
    setFeedback(vote);
    localStorage.setItem(storageKey, vote);

    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'chapter_feedback',
          book: bookSlug,
          chapter: chapterSlug,
          chapterNumber,
          feedback: vote,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch {}

    if (vote === 'negative') {
      setShowComment(true);
    } else {
      setSubmitted(true);
    }
  };

  const handleComment = async () => {
    if (!comment.trim()) {
      setSubmitted(true);
      return;
    }
    setSending(true);
    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'chapter_comment',
          book: bookSlug,
          chapter: chapterSlug,
          chapterNumber,
          feedback,
          comment: comment.trim(),
          timestamp: new Date().toISOString(),
        }),
      });
    } catch {}
    setSending(false);
    setSubmitted(true);
    setShowComment(false);
  };

  if (submitted && !showComment) {
    return (
      <div className="text-center py-6">
        <div className="inline-flex items-center gap-2 text-white/60 text-sm">
          <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Thanks for your feedback on this chapter
          {aggregate && aggregate.total >= 3 && (
            <span className="text-white/40 ml-2">
              ({Math.round((aggregate.positive / aggregate.total) * 100)}% found this helpful)
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="text-center py-6 space-y-4">
      <p className="text-white/50 text-sm font-medium">
        Was this chapter from <span className="text-white/70">{bookTitle}</span> helpful?
      </p>

      <div className="flex items-center justify-center gap-3">
        <button
          onClick={() => handleVote('positive')}
          disabled={feedback !== null}
          className={`group flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
            feedback === 'positive'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              : feedback === null
                ? 'bg-white/5 text-white/60 border border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20 cursor-pointer'
                : 'bg-white/[0.02] text-white/20 border border-white/5'
          }`}
        >
          <svg className={`w-4 h-4 ${feedback === null ? 'group-hover:scale-110' : ''} transition-transform`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
          </svg>
          Helpful
        </button>

        <button
          onClick={() => handleVote('negative')}
          disabled={feedback !== null}
          className={`group flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
            feedback === 'negative'
              ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
              : feedback === null
                ? 'bg-white/5 text-white/60 border border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20 cursor-pointer'
                : 'bg-white/[0.02] text-white/20 border border-white/5'
          }`}
        >
          <svg className={`w-4 h-4 ${feedback === null ? 'group-hover:scale-110' : ''} transition-transform`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
          </svg>
          Needs work
        </button>
      </div>

      {showComment && (
        <div className="max-w-md mx-auto space-y-3 pt-2">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="What could be improved? (optional)"
            rows={2}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white/80 text-sm placeholder:text-white/30 focus:outline-none focus:border-white/20 resize-none"
          />
          <div className="flex justify-between">
            <button
              onClick={() => { setShowComment(false); setSubmitted(true); }}
              className="text-xs text-white/30 hover:text-white/50 transition-colors"
            >
              Skip
            </button>
            <button
              onClick={handleComment}
              disabled={sending}
              className="px-4 py-1.5 bg-white/10 text-white/80 text-xs font-medium rounded-md hover:bg-white/15 transition-colors disabled:opacity-50"
            >
              {sending ? 'Sending...' : 'Send feedback'}
            </button>
          </div>
        </div>
      )}

      {aggregate && aggregate.total >= 3 && !showComment && (
        <p className="text-white/25 text-xs">
          {Math.round((aggregate.positive / aggregate.total) * 100)}% of readers found this chapter helpful
        </p>
      )}
    </div>
  );
}
