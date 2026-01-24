'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Minus, Plus, Type } from 'lucide-react';

const FONT_SIZES = ['small', 'medium', 'large'] as const;
type FontSize = (typeof FONT_SIZES)[number];

const FONT_SIZE_CLASSES: Record<FontSize, string> = {
  small: 'prose-sm',
  medium: 'prose-lg',
  large: 'prose-xl',
};

const FONT_SIZE_LABELS: Record<FontSize, string> = {
  small: 'S',
  medium: 'M',
  large: 'L',
};

interface FontSizeControlProps {
  onSizeChange: (sizeClass: string) => void;
}

export default function FontSizeControl({ onSizeChange }: FontSizeControlProps) {
  const [size, setSize] = useState<FontSize>('medium');
  const [isOpen, setIsOpen] = useState(false);

  // Load saved preference
  useEffect(() => {
    const saved = localStorage.getItem('golden-age-font-size') as FontSize | null;
    if (saved && FONT_SIZES.includes(saved)) {
      setSize(saved);
      onSizeChange(FONT_SIZE_CLASSES[saved]);
    }
  }, [onSizeChange]);

  const handleSizeChange = (newSize: FontSize) => {
    setSize(newSize);
    localStorage.setItem('golden-age-font-size', newSize);
    onSizeChange(FONT_SIZE_CLASSES[newSize]);
    setIsOpen(false);
  };

  const adjustSize = (direction: 'up' | 'down') => {
    const currentIndex = FONT_SIZES.indexOf(size);
    const newIndex = direction === 'up'
      ? Math.min(currentIndex + 1, FONT_SIZES.length - 1)
      : Math.max(currentIndex - 1, 0);
    handleSizeChange(FONT_SIZES[newIndex]);
  };

  return (
    <div className="relative">
      {/* Main Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
        aria-label="Adjust font size"
        aria-expanded={isOpen}
      >
        <Type className="w-4 h-4" />
        <span className="text-xs font-medium hidden sm:inline">{FONT_SIZE_LABELS[size]}</span>
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute right-0 top-full mt-2 z-50 bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-3 min-w-[140px]"
          >
            <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 px-1">
              Text Size
            </div>

            {/* Size Buttons */}
            <div className="flex items-center gap-1 mb-3">
              <button
                type="button"
                onClick={() => adjustSize('down')}
                disabled={size === 'small'}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                aria-label="Decrease font size"
              >
                <Minus className="w-4 h-4" />
              </button>

              <div className="flex-1 text-center">
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {FONT_SIZE_LABELS[size]}
                </span>
              </div>

              <button
                type="button"
                onClick={() => adjustSize('up')}
                disabled={size === 'large'}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                aria-label="Increase font size"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Select */}
            <div className="flex gap-1">
              {FONT_SIZES.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => handleSizeChange(s)}
                  className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                    size === s
                      ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {FONT_SIZE_LABELS[s]}
                </button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}
