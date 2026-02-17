'use client';

import { useState, useEffect } from 'react';

interface BlogReadingProgressProps {
  wordCount: number;
  minWords?: number;
}

export default function BlogReadingProgress({
  wordCount,
  minWords = 1500,
}: BlogReadingProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Don't show on short posts
    if (wordCount < minWords) return;

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollableHeight = documentHeight - windowHeight;
      const scrolled = (scrollTop / scrollableHeight) * 100;
      setProgress(Math.min(scrolled, 100));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, [wordCount, minWords]);

  // Don't render if below minimum word count
  if (wordCount < minWords) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-white/5">
      <div
        className="h-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-emerald-500 transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
