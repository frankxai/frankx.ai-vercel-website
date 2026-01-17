'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { Chapter } from '../types';

interface ChapterNavProps {
  previousChapter?: Chapter;
  nextChapter?: Chapter;
}

export default function ChapterNav({ previousChapter, nextChapter }: ChapterNavProps) {
  return (
    <nav className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-16 pt-12 border-t-2 border-gray-200 dark:border-gray-800">
      {/* Previous Chapter */}
      {previousChapter ? (
        <Link
          href={`/golden-age/${previousChapter.slug}`}
          className="group flex items-center gap-4 p-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-800 rounded-2xl hover:border-amber-500 dark:hover:border-amber-500 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-amber-500/50 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-8 h-8 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white group-hover:-translate-x-1 transition-all flex-shrink-0" />
          <div className="space-y-1">
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Previous Chapter
            </div>
            <div className="font-serif text-lg font-bold text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
              {previousChapter.title}
            </div>
          </div>
        </Link>
      ) : (
        <div />
      )}

      {/* Next Chapter */}
      {nextChapter ? (
        <Link
          href={`/golden-age/${nextChapter.slug}`}
          className="group flex items-center gap-4 p-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-800 rounded-2xl hover:border-amber-500 dark:hover:border-amber-500 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-amber-500/50 transition-all cursor-pointer sm:justify-end sm:text-right"
        >
          <div className="space-y-1">
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Next Chapter
            </div>
            <div className="font-serif text-lg font-bold text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
              {nextChapter.title}
            </div>
          </div>
          <ArrowRight className="w-8 h-8 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white group-hover:translate-x-1 transition-all flex-shrink-0" />
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
