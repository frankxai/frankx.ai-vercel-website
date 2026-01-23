'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Twitter, Copy, Check, Share2 } from 'lucide-react';

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

    // Only show tooltip for meaningful selections (10-280 chars for tweet)
    if (text.length >= 10 && text.length <= 500) {
      const range = selection?.getRangeAt(0);
      if (range) {
        const rect = range.getBoundingClientRect();
        setTooltipPosition({
          x: rect.left + rect.width / 2,
          y: rect.top - 10,
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
    // Delay hiding to allow button clicks
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
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
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
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
        // User cancelled or error
        console.log('Share cancelled or failed:', err);
      }
    }
  };

  return (
    <AnimatePresence>
      {showTooltip && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.9 }}
          transition={{ duration: 0.15 }}
          className="fixed z-50 flex items-center gap-1 p-1.5 bg-gray-900 dark:bg-white rounded-lg shadow-xl"
          style={{
            left: tooltipPosition.x,
            top: tooltipPosition.y,
            transform: 'translate(-50%, -100%)',
          }}
        >
          {/* Share to Twitter/X */}
          <button
            type="button"
            onClick={shareToTwitter}
            className="p-2 rounded-md text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors cursor-pointer"
            title="Share on X (Twitter)"
          >
            <Twitter className="w-4 h-4" />
          </button>

          {/* Copy Quote */}
          <button
            type="button"
            onClick={copyQuote}
            className="p-2 rounded-md text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors cursor-pointer"
            title="Copy quote"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-400 dark:text-green-600" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>

          {/* Native Share (mobile) */}
          {typeof navigator !== 'undefined' && 'share' in navigator && (
            <button
              type="button"
              onClick={nativeShare}
              className="p-2 rounded-md text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors cursor-pointer"
              title="Share"
            >
              <Share2 className="w-4 h-4" />
            </button>
          )}

          {/* Arrow */}
          <div
            className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-3 h-3 bg-gray-900 dark:bg-white rotate-45"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
