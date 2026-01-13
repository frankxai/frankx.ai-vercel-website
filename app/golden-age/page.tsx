'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Book, FileText, ArrowRight, Clock, Sparkles } from 'lucide-react';
import { bookMetadata, chapters, essays } from './metadata';

export default function GoldenAgePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-gray-200 dark:border-gray-800">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 via-white to-indigo-50/50 dark:from-slate-900 dark:via-slate-950 dark:to-indigo-950/20" />

        <div className="relative max-w-4xl mx-auto px-6 py-24 sm:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-200 text-sm font-medium border border-amber-200 dark:border-amber-800">
              <Sparkles className="w-4 h-4" />
              <span>A Book About Creative Transformation</span>
            </div>

            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
              {bookMetadata.title}
            </h1>

            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
              {bookMetadata.subtitle}
            </p>

            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              {bookMetadata.description}
            </p>

            <div className="flex items-center justify-center gap-4 pt-4">
              <Link
                href="#chapters"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <Book className="w-5 h-5" />
                <span>Start Reading</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="#essays"
                className="group inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg font-medium hover:border-gray-900 dark:hover:border-white transition-colors cursor-pointer"
              >
                <FileText className="w-5 h-5" />
                <span>Explore Essays</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Book Chapters Section */}
      <section id="chapters" className="py-20 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-4 mb-12">
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
              Book Chapters
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              A transformative narrative about the democratization of creative capability.
            </p>
          </div>

          <div className="space-y-6">
            {chapters.map((chapter, index) => (
              <motion.div
                key={chapter.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {chapter.published ? (
                  <Link
                    href={`/golden-age/${chapter.slug}`}
                    className="group block p-8 bg-white dark:bg-slate-900 border-2 border-gray-200 dark:border-gray-800 rounded-xl hover:border-gray-900 dark:hover:border-white transition-all cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-6">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-mono font-medium text-gray-500 dark:text-gray-400">
                            Chapter {chapter.number}
                          </span>
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-700 dark:text-gray-300">
                            <Clock className="w-3.5 h-3.5" />
                            {chapter.readingTime}
                          </span>
                        </div>

                        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                          {chapter.title}
                        </h3>

                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                          {chapter.description}
                        </p>
                      </div>

                      <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white group-hover:translate-x-1 transition-all flex-shrink-0 mt-2" />
                    </div>
                  </Link>
                ) : (
                  <div className="p-8 bg-gray-50 dark:bg-slate-900/50 border-2 border-dashed border-gray-300 dark:border-gray-800 rounded-xl">
                    <div className="flex items-start justify-between gap-6">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-mono font-medium text-gray-400 dark:text-gray-600">
                            Chapter {chapter.number}
                          </span>
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-gray-200 dark:bg-gray-800 text-xs font-medium text-gray-500 dark:text-gray-500">
                            {chapter.readingTime}
                          </span>
                        </div>

                        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-gray-400 dark:text-gray-600">
                          {chapter.title}
                        </h3>

                        <p className="text-gray-500 dark:text-gray-600 leading-relaxed">
                          {chapter.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Essays Section */}
      <section id="essays" className="py-20 bg-gray-50 dark:bg-slate-900/50 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-4 mb-12">
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
              Related Essays
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Deep dives into strategy, implementation, and the intelligence era.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {essays.map((essay, index) => (
              <motion.div
                key={essay.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={`/blog/${essay.slug}`}
                  className="group block h-full p-6 bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-gray-900 dark:hover:border-white transition-all cursor-pointer"
                >
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <span className="inline-block px-2.5 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-900 dark:text-indigo-200 text-xs font-medium border border-indigo-200 dark:border-indigo-800">
                        {essay.category}
                      </span>

                      <h3 className="font-serif text-xl font-bold text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                        {essay.title}
                      </h3>

                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {essay.subtitle}
                      </p>
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {essay.description}
                    </p>

                    <div className="flex items-center justify-between pt-2">
                      <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-500">
                        <Clock className="w-3.5 h-3.5" />
                        {essay.readingTime}
                      </span>

                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-2xl mx-auto px-6 text-center space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Ready to begin your journey?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            Start with Chapter 1 and discover what it means to answer the call to creation.
          </p>
          <Link
            href="/golden-age/chapter-01-when-creation-calls"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-medium text-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <span>Start Reading Chapter 1</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
