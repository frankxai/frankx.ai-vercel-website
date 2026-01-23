'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThumbsUp, ThumbsDown, MessageSquare, Send, Check, Sparkles, Heart, Star } from 'lucide-react';

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

  // Submitted state - Elegant confirmation
  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative mt-16 overflow-hidden"
      >
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-green-500/10 to-teal-500/10 rounded-3xl blur-2xl" />

        {/* Card */}
        <div className="relative p-8 rounded-3xl bg-gradient-to-br from-emerald-50/80 via-green-50/80 to-teal-50/80 dark:from-emerald-950/40 dark:via-green-950/40 dark:to-teal-950/40 border border-emerald-200/50 dark:border-emerald-800/50 backdrop-blur-sm">
          {/* Decorative sparkles */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute top-4 right-4"
          >
            <Sparkles className="w-5 h-5 text-emerald-400 dark:text-emerald-500" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute bottom-6 left-6"
          >
            <Star className="w-4 h-4 text-teal-400 dark:text-teal-500" />
          </motion.div>

          <div className="flex items-center gap-4">
            {/* Animated check icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.1
              }}
              className="relative"
            >
              <div className="absolute inset-0 bg-emerald-400/30 rounded-full blur-md" />
              <div className="relative p-3 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full shadow-lg shadow-emerald-500/30">
                <Check className="w-6 h-6 text-white" strokeWidth={3} />
              </div>
            </motion.div>

            <div>
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="font-serif text-xl font-bold text-emerald-800 dark:text-emerald-200"
              >
                Thank you for your feedback!
              </motion.p>
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-sm text-emerald-600 dark:text-emerald-400 mt-1"
              >
                Your input helps shape The Golden Age of Creators.
              </motion.p>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative mt-16"
    >
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 rounded-3xl blur-3xl" />

      {/* Paper texture card */}
      <div className="relative overflow-hidden rounded-3xl border border-amber-200/50 dark:border-amber-800/30">
        {/* Paper texture background */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/90 via-orange-50/80 to-yellow-50/90 dark:from-amber-950/50 dark:via-orange-950/40 dark:to-yellow-950/50" />

        {/* Subtle noise texture */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
          <filter id="feedbackNoise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#feedbackNoise)" />
        </svg>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-amber-400/20 to-transparent rounded-br-full" />
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-orange-400/20 to-transparent rounded-tl-full" />

        {/* Content */}
        <div className="relative p-8 md:p-10 text-center">
          {/* Header with icon */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center justify-center mb-4"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-amber-400/30 rounded-full blur-md animate-pulse" />
              <div className="relative p-3 bg-gradient-to-br from-amber-400/20 to-orange-400/20 rounded-full border border-amber-300/30 dark:border-amber-700/30">
                <Heart className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="font-serif text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2"
          >
            Was this chapter helpful?
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-amber-700/70 dark:text-amber-300/70 text-sm md:text-base mb-8"
          >
            Your feedback shapes future chapters
          </motion.p>

          {/* Feedback Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {/* Positive Button */}
            <motion.button
              type="button"
              onClick={() => handleFeedback('positive')}
              disabled={feedback !== null}
              whileHover={feedback === null ? { scale: 1.02, y: -2 } : {}}
              whileTap={feedback === null ? { scale: 0.98 } : {}}
              className={`group relative flex items-center gap-3 px-8 py-4 rounded-2xl font-medium transition-all duration-300 cursor-pointer ${
                feedback === 'positive'
                  ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-xl shadow-emerald-500/30'
                  : feedback === null
                    ? 'bg-white/80 dark:bg-slate-800/80 border-2 border-emerald-200 dark:border-emerald-800 text-gray-700 dark:text-gray-300 hover:border-emerald-400 dark:hover:border-emerald-600 hover:shadow-lg hover:shadow-emerald-500/10'
                    : 'bg-gray-100/50 dark:bg-gray-800/50 text-gray-400 dark:text-gray-600 cursor-not-allowed border-2 border-transparent'
              }`}
            >
              {/* Button glow on hover */}
              {feedback === null && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-400/0 via-emerald-400/0 to-green-400/0 group-hover:from-emerald-400/10 group-hover:via-emerald-400/5 group-hover:to-green-400/10 transition-all duration-300" />
              )}

              <motion.div
                animate={feedback === 'positive' ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                <ThumbsUp className={`w-5 h-5 ${feedback === null ? 'group-hover:scale-110 group-hover:text-emerald-500 dark:group-hover:text-emerald-400' : ''} transition-all duration-200`} />
              </motion.div>
              <span className="relative">Yes, helpful</span>

              {/* Success particles */}
              {feedback === 'positive' && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -right-1 -top-1"
                >
                  <Sparkles className="w-4 h-4 text-white/80" />
                </motion.div>
              )}
            </motion.button>

            {/* Negative Button */}
            <motion.button
              type="button"
              onClick={() => handleFeedback('negative')}
              disabled={feedback !== null}
              whileHover={feedback === null ? { scale: 1.02, y: -2 } : {}}
              whileTap={feedback === null ? { scale: 0.98 } : {}}
              className={`group relative flex items-center gap-3 px-8 py-4 rounded-2xl font-medium transition-all duration-300 cursor-pointer ${
                feedback === 'negative'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-xl shadow-orange-500/30'
                  : feedback === null
                    ? 'bg-white/80 dark:bg-slate-800/80 border-2 border-orange-200 dark:border-orange-800 text-gray-700 dark:text-gray-300 hover:border-orange-400 dark:hover:border-orange-600 hover:shadow-lg hover:shadow-orange-500/10'
                    : 'bg-gray-100/50 dark:bg-gray-800/50 text-gray-400 dark:text-gray-600 cursor-not-allowed border-2 border-transparent'
              }`}
            >
              {/* Button glow on hover */}
              {feedback === null && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-400/0 via-orange-400/0 to-amber-400/0 group-hover:from-orange-400/10 group-hover:via-orange-400/5 group-hover:to-amber-400/10 transition-all duration-300" />
              )}

              <motion.div
                animate={feedback === 'negative' ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                <ThumbsDown className={`w-5 h-5 ${feedback === null ? 'group-hover:scale-110 group-hover:text-orange-500 dark:group-hover:text-orange-400' : ''} transition-all duration-200`} />
              </motion.div>
              <span className="relative">Needs work</span>
            </motion.button>
          </motion.div>

          {/* Positive Feedback Response */}
          <AnimatePresence>
            {feedback === 'positive' && !showComment && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 32 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-emerald-700 dark:text-emerald-400 font-medium text-lg"
                >
                  Thank you! Glad it resonated.
                </motion.p>
                <motion.button
                  type="button"
                  onClick={() => setShowComment(true)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 bg-white/50 dark:bg-slate-800/50 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-xl border border-gray-200/50 dark:border-gray-700/50 hover:border-amber-300 dark:hover:border-amber-700 transition-all duration-200 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Leave a comment (optional)</span>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Comment Box */}
          <AnimatePresence>
            {showComment && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 32 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="relative max-w-lg mx-auto">
                  {/* Textarea with elegant styling */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-white/50 dark:bg-slate-800/50 rounded-2xl" />
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder={
                        feedback === 'negative'
                          ? "What could be improved? We value your honest input..."
                          : "What did you find most valuable? Share your thoughts..."
                      }
                      className="relative w-full p-5 rounded-2xl border-2 border-gray-200/50 dark:border-gray-700/50 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 resize-none focus:outline-none focus:border-amber-400 dark:focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all duration-200 font-sans"
                      rows={4}
                    />
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center justify-between mt-4">
                    <motion.button
                      type="button"
                      onClick={() => {
                        setShowComment(false);
                        setSubmitted(true);
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-200 cursor-pointer"
                    >
                      Skip for now
                    </motion.button>

                    <motion.button
                      type="button"
                      onClick={handleSubmitComment}
                      disabled={loading}
                      whileHover={!loading ? { scale: 1.02 } : {}}
                      whileTap={!loading ? { scale: 0.98 } : {}}
                      className="relative inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium text-white overflow-hidden disabled:cursor-not-allowed cursor-pointer"
                    >
                      {/* Button gradient background */}
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 background-animate" />

                      {/* Shimmer effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                      <span className="relative flex items-center gap-2">
                        {loading ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                            />
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Send Feedback</span>
                          </>
                        )}
                      </span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
