'use client';

import { motion } from 'framer-motion';
import { BookOpen, ExternalLink, Sparkles } from 'lucide-react';

interface Book {
  title: string;
  author: string;
  relevance: string;
  amazonUrl?: string;
}

interface BookRecommendationsProps {
  books: Book[];
  title?: string;
}

function BookCard({ book, index }: { book: Book; index: number }) {
  const searchUrl =
    book.amazonUrl ||
    `https://www.amazon.com/s?k=${encodeURIComponent(book.title + ' ' + book.author)}`;

  return (
    <motion.a
      href={searchUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="group flex gap-4 p-4 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-800 hover:border-amber-400 dark:hover:border-amber-600 hover:shadow-lg transition-all duration-300 cursor-pointer"
    >
      {/* Book spine visualization */}
      <div className="relative flex-shrink-0">
        <div className="w-3 h-32 bg-gradient-to-b from-amber-400 via-orange-500 to-amber-600 rounded-l-sm" />
        <div className="absolute top-0 left-3 w-20 h-32 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/50 dark:to-orange-900/50 rounded-r-sm border-r border-t border-b border-amber-200 dark:border-amber-800 flex items-center justify-center">
          <BookOpen className="w-8 h-8 text-amber-600/50 dark:text-amber-400/50" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 ml-16 py-1">
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-serif text-lg font-bold text-gray-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
            {book.title}
          </h4>
          <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-amber-500 transition-colors flex-shrink-0 mt-1" />
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          by {book.author}
        </p>

        <div className="mt-3 p-2 bg-amber-50/50 dark:bg-amber-950/30 rounded-lg border border-amber-100 dark:border-amber-900/30">
          <div className="flex items-start gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-800 dark:text-amber-200 leading-relaxed">
              {book.relevance}
            </p>
          </div>
        </div>
      </div>
    </motion.a>
  );
}

export default function BookRecommendations({
  books,
  title = 'Recommended Reading',
}: BookRecommendationsProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-xl">
          <BookOpen className="w-5 h-5 text-amber-600 dark:text-amber-400" />
        </div>
        <div>
          <h3 className="font-serif text-xl font-bold text-gray-900 dark:text-white">
            {title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Curated books that inform this chapter
          </p>
        </div>
      </div>

      {/* Books List */}
      <div className="grid gap-4">
        {books.map((book, index) => (
          <BookCard key={book.title} book={book} index={index} />
        ))}
      </div>
    </div>
  );
}
