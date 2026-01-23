'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Twitter, Copy, Check, Share2, Quote } from 'lucide-react';

interface ShareQuoteProps {
  chapterTitle: string;
  chapterSlug: string;
}

export default function ShareQuote({ chapterTitle, chapterSlug }: ShareQuoteProps) {
  const [selectedText, setSelectedText] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleTextSelection = useCallback(() => {
    const selection = window.getSelection();
    const text = selection?.toString().trim() || '';

    if (text.length >= 10 && text.length <= 500) {
      const range = selection?.getRangeAt(0);
      if (range) {
        const rect = range.getBoundingClientRect();
        setTooltipPosition({
          x: Math.min(Math.max(rect.left + rect.width / 2, 100), window.innerWidth - 100),
          y: rect.top - 16,
        });
        setSelectedText(text);
        setShowTooltip(true);
      }
    } else {
      setShowTooltip(false);
      setSelectedText('');
    }
  }, []);

  const handleClickOutside = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      const selection = window.getSelection();
      if (!selection?.toString().trim()) {
        setShowTooltip(false);
        setSelectedText('');
      }
    }, 200);
  }, []);

  useEffect(() => {
    document.addEventListener('mouseup', handleTextSelection);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mouseup', handleTextSelection);
      document.removeEventListener('mousedown', handleClickOutside);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [handleTextSelection, handleClickOutside]);

  const shareUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/golden-age/${chapterSlug}`
    : `https://frankx.ai/golden-age/${chapterSlug}`;

  const shareToTwitter = () => {
    const truncatedText = selectedText.length > 200
      ? selectedText.substring(0, 197) + '...'
      : selectedText;

    const tweetText = `"${truncatedText}"\n\n— From "${chapterTitle}" in The Golden Age of Creators\n\n`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(shareUrl)}`;

    window.open(twitterUrl, '_blank', 'width=550,height=420');
    setShowTooltip(false);
  };

  const copyQuote = async () => {
    const quoteText = `"${selectedText}"\n\n— From "${chapterTitle}" in The Golden Age of Creators\n${shareUrl}`;

    try {
      await navigator.clipboard.writeText(quoteText);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setShowTooltip(false);
      }, 1500);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const nativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Quote from "${chapterTitle}"`,
          text: `"${selectedText}"`,
          url: shareUrl,
        });
        setShowTooltip(false);
      } catch (err) {
        console.log('Share cancelled or failed:', err);
      }
    }
  };

  return (
    <AnimatePresence>
      {showTooltip && (
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.95 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="fixed z-50"
          style={{
            left: tooltipPosition.x,
            top: tooltipPosition.y,
            transform: 'translate(-50%, -100%)',
          }}
        >
          {/* Elegant tooltip card */}
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-orange-400/20 rounded-2xl blur-xl" />

            {/* Main card */}
            <div className="relative flex items-center gap-1 px-2 py-1.5 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 dark:from-white dark:via-gray-50 dark:to-gray-100 rounded-xl shadow-2xl shadow-black/20 dark:shadow-black/10 border border-white/10 dark:border-gray-200/50">
              {/* Quote icon */}
              <div className="px-2 py-1.5 border-r border-white/10 dark:border-gray-300/30">
                <Quote className="w-3.5 h-3.5 text-amber-400 dark:text-amber-600" />
              </div>

              {/* Share to Twitter/X */}
              <motion.button
                type="button"
                onClick={shareToTwitter}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 rounded-lg text-gray-300 dark:text-gray-600 hover:text-white dark:hover:text-gray-900 hover:bg-white/10 dark:hover:bg-gray-200/50 transition-all cursor-pointer"
                title="Share on X (Twitter)"
              >
                <Twitter className="w-4 h-4" />
              </motion.button>

              {/* Copy Quote */}
              <motion.button
                type="button"
                onClick={copyQuote}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 rounded-lg text-gray-300 dark:text-gray-600 hover:text-white dark:hover:text-gray-900 hover:bg-white/10 dark:hover:bg-gray-200/50 transition-all cursor-pointer"
                title="Copy quote"
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.div
                      key="check"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <Check className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="copy"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <Copy className="w-4 h-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Native Share (mobile) */}
              {typeof navigator !== 'undefined' && 'share' in navigator && (
                <motion.button
                  type="button"
                  onClick={nativeShare}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2.5 rounded-lg text-gray-300 dark:text-gray-600 hover:text-white dark:hover:text-gray-900 hover:bg-white/10 dark:hover:bg-gray-200/50 transition-all cursor-pointer"
                  title="Share"
                >
                  <Share2 className="w-4 h-4" />
                </motion.button>
              )}
            </div>

            {/* Arrow pointer */}
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-2">
              <div className="w-4 h-4 bg-gray-900 dark:bg-white rotate-45 rounded-sm border-r border-b border-white/10 dark:border-gray-200/50" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
