'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThumbsUp, ThumbsDown, MessageSquare, Send, Check, X } from 'lucide-react';

interface ChapterFeedbackProps {
  chapterSlug: string;
  chapterNumber: number;
}

type FeedbackType = 'positive' | 'negative' | null;

export default function ChapterFeedback({ chapterSlug, chapterNumber }: ChapterFeedbackProps) {
  const [feedback, setFeedback] = useState<FeedbackType>(null);
  const [showComment, setShowComment] = useState(false);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFeedback = async (type: FeedbackType) => {
    setFeedback(type);

    // Track the feedback
    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'chapter_feedback',
          chapter: chapterSlug,
          chapterNumber,
          feedback: type,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (error) {
      console.error('Failed to submit feedback:', error);
    }

    // Show comment option after feedback
    if (type === 'negative') {
      setShowComment(true);
    }
  };

  const handleSubmitComment = async () => {
    if (!comment.trim()) return;

    setLoading(true);
    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'chapter_comment',
          chapter: chapterSlug,
          chapterNumber,
          feedback,
          comment: comment.trim(),
          timestamp: new Date().toISOString(),
        }),
      });
      setSubmitted(true);
      setShowComment(false);
    } catch (error) {
      console.error('Failed to submit comment:', error);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800"
      >
        <div className="flex items-center gap-3 text-green-700 dark:text-green-400">
          <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
            <Check className="w-5 h-5" />
          </div>
          <div>
            <p className="font-medium">Thank you for your feedback!</p>
            <p className="text-sm text-green-600 dark:text-green-500">
              Your input helps improve The Golden Age of Creators.
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800"
    >
      <div className="text-center">
        <p className="font-serif text-xl font-bold text-gray-900 dark:text-white mb-2">
          Was this chapter helpful?
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Your feedback shapes future chapters
        </p>

        {/* Feedback Buttons */}
        <div className="flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => handleFeedback('positive')}
            disabled={feedback !== null}
            className={`group flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all cursor-pointer ${
              feedback === 'positive'
                ? 'bg-green-500 text-white shadow-lg'
                : feedback === null
                  ? 'bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-green-500 hover:text-green-600 dark:hover:text-green-400'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
            }`}
          >
            <ThumbsUp className={`w-5 h-5 ${feedback === 'positive' ? '' : 'group-hover:scale-110'} transition-transform`} />
            <span>Yes, helpful</span>
          </button>

          <button
            type="button"
            onClick={() => handleFeedback('negative')}
            disabled={feedback !== null}
            className={`group flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all cursor-pointer ${
              feedback === 'negative'
                ? 'bg-orange-500 text-white shadow-lg'
                : feedback === null
                  ? 'bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-orange-500 hover:text-orange-600 dark:hover:text-orange-400'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
            }`}
          >
            <ThumbsDown className={`w-5 h-5 ${feedback === 'negative' ? '' : 'group-hover:scale-110'} transition-transform`} />
            <span>Needs work</span>
          </button>
        </div>

        {/* Positive Feedback Response */}
        <AnimatePresence>
          {feedback === 'positive' && !showComment && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6"
            >
              <p className="text-green-700 dark:text-green-400 font-medium">
                Thank you! Glad it resonated.
              </p>
              <button
                type="button"
                onClick={() => setShowComment(true)}
                className="mt-3 inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Leave a comment (optional)</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Comment Box */}
        <AnimatePresence>
          {showComment && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6"
            >
              <div className="relative">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder={
                    feedback === 'negative'
                      ? "What could be improved? (optional)"
                      : "What did you find most valuable? (optional)"
                  }
                  className="w-full p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 resize-none focus:outline-none focus:border-amber-500 dark:focus:border-amber-500 transition-colors"
                  rows={3}
                />
                <div className="flex items-center justify-between mt-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowComment(false);
                      setSubmitted(true);
                    }}
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer"
                  >
                    Skip
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmitComment}
                    disabled={loading}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  >
                    {loading ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
